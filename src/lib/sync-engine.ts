// Built by ATLAS — 2026-09-22
// The real propagation backbone: DeskManager export -> diff -> canonical DB
// -> per-channel eligibility -> channel adapter -> channel_listings status
// board. This is the same logic worker/jobs/* runs on a schedule via pg-boss
// in production — this module is the shared implementation both call.
//
// Outbound marketplace adapters are not wired here. Eligible external channels
// remain pending; only the site listing is published by this engine.

import { createServiceClient } from './supabase/server'
import type { ChannelId, ListingStatus, Unit } from './types'
import { resolvePostingChannels } from './types'
import { checkEligibility } from './channel-rules'
import { buildMockDmsExport, type DmsExportOp } from './mock-dms-export'

const ALL_CHANNELS: ChannelId[] = ['site', 'rv_trader', 'boats_group', 'rv_universe', 'meta', 'google_vl', 'craigslist']

export interface ChannelRunResult {
  dms_id: string
  unit_type: string
  channel_id: ChannelId
  outcome: ListingStatus
  reason: string
}

export interface SyncResult {
  startedAt: string
  completedAt: string
  ingest: {
    added: { dms_id: string; summary: string }[]
    updated: { dms_id: string; summary: string }[]
    sold: { dms_id: string; summary: string }[]
  }
  channelRuns: ChannelRunResult[]
}

function slugify(year: number, make: string, model: string, stock: string) {
  return `${year}-${make}-${model}-${stock}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function runSync(opts: { operations?: DmsExportOp[]; client?: ReturnType<typeof createServiceClient> } = {}): Promise<SyncResult> {
  const startedAt = new Date().toISOString()
  const supabase = opts.client ?? createServiceClient()

  const ops = opts.operations ?? buildMockDmsExport()

  const { data: settingsRows } = await supabase.from('channel_settings').select('channel_id, enabled')
  const enabledMap = new Map<ChannelId, boolean>(
    (settingsRows ?? []).map((r: { channel_id: ChannelId; enabled: boolean }) => [r.channel_id, r.enabled])
  )

  const ingest: SyncResult['ingest'] = { added: [], updated: [], sold: [] }
  const channelRuns: ChannelRunResult[] = []
  const touchedUnits: Unit[] = []

  // ── Step 1: ingest the DMS export, diff against the DB ───────────────────
  for (const op of ops) {
    if (op.operation === 'ADD') {
      const slug = slugify(op.year!, op.make!, op.model!, op.stock_number!)
      const { data: existing } = await supabase.from('units').select('*').eq('dms_id', op.dms_id).maybeSingle()

      if (existing) {
        ingest.added.push({ dms_id: op.dms_id, summary: `${op.year} ${op.make} ${op.model} already exists — no-op` })
        touchedUnits.push(existing as Unit)
        continue
      }

      const { data: inserted, error } = await supabase
        .from('units')
        .insert({
          dms_id: op.dms_id,
          stock_number: op.stock_number,
          unit_type: op.unit_type,
          identifier_type: op.identifier_type,
          identifier: op.identifier ?? null,
          category: op.category,
          condition: op.condition,
          status: 'active',
          year: op.year,
          make: op.make,
          model: op.model,
          price: op.price,
          description: op.description ?? null,
          slug,
          posting_profile: 'FULL',
          dms_last_seen_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error || !inserted) {
        ingest.added.push({ dms_id: op.dms_id, summary: `FAILED to insert: ${error?.message ?? 'unknown error'}` })
        continue
      }
      ingest.added.push({ dms_id: op.dms_id, summary: `NEW: ${op.year} ${op.make} ${op.model} — $${op.price?.toLocaleString()}` })
      if (op.photo_url) {
        const { error: mediaError } = await supabase.from('media').insert({
          unit_id: inserted.id,
          url: op.photo_url,
          sort_order: 0,
          is_primary: true,
          source: 'demo',
        })
        if (mediaError) throw new Error(`Failed to attach demo image: ${mediaError.message}`)
      }
      touchedUnits.push(inserted as Unit)
    }

    if (op.operation === 'UPDATE_PRICE') {
      const { data: before } = await supabase.from('units').select('*').eq('dms_id', op.dms_id).maybeSingle()
      if (!before) {
        ingest.updated.push({ dms_id: op.dms_id, summary: 'SKIPPED — unit not found in DB (run the ADD ops first)' })
        continue
      }
      const { data: after } = await supabase
        .from('units')
        .update({ price: op.new_price, dms_last_seen_at: new Date().toISOString() })
        .eq('dms_id', op.dms_id)
        .select()
        .single()

      ingest.updated.push({
        dms_id: op.dms_id,
        summary: `${before.year} ${before.make} ${before.model}: $${Number(before.price).toLocaleString()} -> $${op.new_price?.toLocaleString()}`,
      })
      if (after) touchedUnits.push(after as Unit)
    }

    if (op.operation === 'SOLD') {
      const { data: before } = await supabase.from('units').select('*').eq('dms_id', op.dms_id).maybeSingle()
      if (!before) {
        ingest.sold.push({ dms_id: op.dms_id, summary: 'SKIPPED — unit not found in DB' })
        continue
      }
      if (before.status === 'sold') {
        ingest.sold.push({ dms_id: op.dms_id, summary: `${before.year} ${before.make} ${before.model} already marked sold — no-op` })
        touchedUnits.push(before as Unit)
        continue
      }
      const { data: after, error } = await supabase
        .from('units')
        .update({ status: 'sold', sold_at: new Date().toISOString() })
        .eq('dms_id', op.dms_id)
        .select()
        .single()

      if (error || !after) {
        ingest.sold.push({ dms_id: op.dms_id, summary: `FAILED to mark sold: ${error?.message ?? 'unknown error'}` })
        continue
      }
      ingest.sold.push({ dms_id: op.dms_id, summary: `SOLD: ${before.year} ${before.make} ${before.model} — removing from every channel` })
      if (after) touchedUnits.push(after as Unit)
    }
  }

  // ── Step 2: for every touched unit, dispatch every eligible channel ──────
  for (const unit of touchedUnits) {
    const isSold = unit.status === 'sold'
    const profileChannels = resolvePostingChannels(unit)

    for (const channelId of ALL_CHANNELS) {
      // Removal is unconditional: a previously published listing must not be
      // left live because a profile or eligibility rule later changed.
      if (isSold) {
        const { error } = await supabase.from('channel_listings').upsert(
          {
            unit_id: unit.id,
            channel_id: channelId,
            status: 'removed',
            removed_at: new Date().toISOString(),
            last_synced_at: new Date().toISOString(),
            last_error: null,
          },
          { onConflict: 'unit_id,channel_id' }
        )
        if (error) throw new Error(`Failed to remove ${unit.dms_id} from ${channelId}: ${error.message}`)
        channelRuns.push({
          dms_id: unit.dms_id,
          unit_type: unit.unit_type,
          channel_id: channelId,
          outcome: 'removed',
          reason: 'Marked removed locally; external unpublish is not connected',
        })
        continue
      }

      if (channelId === 'site') {
        const { error } = await supabase.from('channel_listings').upsert(
          {
            unit_id: unit.id,
            channel_id: 'site',
            status: 'live',
            last_synced_at: new Date().toISOString(),
            removed_at: null,
            first_published_at: new Date().toISOString(),
          },
          { onConflict: 'unit_id,channel_id' }
        )
        if (error) throw new Error(`Failed to publish ${unit.dms_id} on site: ${error.message}`)
        channelRuns.push({
          dms_id: unit.dms_id,
          unit_type: unit.unit_type,
          channel_id: 'site',
          outcome: 'live',
          reason: 'Published on soidrvmarine',
        })
        continue
      }

      if (!profileChannels.includes(channelId)) {
        channelRuns.push({
          dms_id: unit.dms_id,
          unit_type: unit.unit_type,
          channel_id: channelId,
          outcome: 'removed',
          reason: `Skipped — posting profile ${unit.posting_profile} excludes this channel`,
        })
        continue
      }

      const gate = checkEligibility(channelId, unit)
      if (!gate.eligible) {
        const { error } = await supabase.from('channel_listings').upsert(
          {
            unit_id: unit.id,
            channel_id: channelId,
            status: 'needs_review',
            last_error: gate.reason,
            last_synced_at: new Date().toISOString(),
          },
          { onConflict: 'unit_id,channel_id' }
        )
        if (error) throw new Error(`Failed to flag ${unit.dms_id} for ${channelId}: ${error.message}`)
        channelRuns.push({
          dms_id: unit.dms_id,
          unit_type: unit.unit_type,
          channel_id: channelId,
          outcome: 'needs_review',
          reason: gate.reason!,
        })
        continue
      }

      const enabled = enabledMap.get(channelId) ?? false
      const reason = enabled
        ? 'Credentials enabled, but outbound publishing is not implemented'
        : 'Channel not connected — awaiting dealer credentials'

      const { error: listingError } = await supabase.from('channel_listings').upsert(
        {
          unit_id: unit.id,
          channel_id: channelId,
          status: 'pending',
          external_id: null,
          external_url: null,
          last_error: reason,
          last_synced_at: new Date().toISOString(),
        },
        { onConflict: 'unit_id,channel_id' }
      )
      if (listingError) throw new Error(`Failed to queue ${unit.dms_id} for ${channelId}: ${listingError.message}`)

      await supabase.from('sync_jobs').insert({
        unit_id: unit.id,
        channel_id: channelId,
        action: 'publish',
        attempts: 0,
        result: { status: 'pending', reason },
      })

      channelRuns.push({
        dms_id: unit.dms_id,
        unit_type: unit.unit_type,
        channel_id: channelId,
        outcome: 'pending',
        reason,
      })
    }
  }

  return { startedAt, completedAt: new Date().toISOString(), ingest, channelRuns }
}

export async function getSyncStatus() {
  const supabase = createServiceClient()
  const [{ data: listings }, { data: recentJobs }, { data: settings }] = await Promise.all([
    supabase
      .from('channel_listings')
      .select('*, units(dms_id, year, make, model, unit_type, slug, status)')
      .order('updated_at', { ascending: false }),
    supabase.from('sync_jobs').select('*').order('queued_at', { ascending: false }).limit(25),
    supabase.from('channel_settings').select('*'),
  ])
  return { listings: listings ?? [], recentJobs: recentJobs ?? [], settings: settings ?? [] }
}
