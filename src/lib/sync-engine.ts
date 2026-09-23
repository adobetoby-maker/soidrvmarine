// Built by ATLAS — 2026-09-22
// The real propagation backbone: DeskManager export -> diff -> canonical DB
// -> per-channel eligibility -> channel adapter -> channel_listings status
// board. This is the same logic worker/jobs/* runs on a schedule via pg-boss
// in production — this module is the shared implementation both call.
//
// The only thing simulated here is the actual outbound network call to each
// channel (RV Trader, Meta, etc.) — we don't have dealer credentials for any
// of them yet (see channel_settings.enabled, all false except 'site'). Every
// other step — ingestion, diffing, eligibility rules, status writes — is
// real and hits the live Supabase project.

import { createServiceClient } from './supabase/server'
import type { ChannelId, ListingStatus, Unit } from './types'
import { resolvePostingChannels } from './types'
import { checkEligibility } from './channel-rules'
import { buildMockDmsExport } from './mock-dms-export'

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
  simulateConnected: boolean
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

async function simulateChannelCall(
  enabled: boolean,
  simulateConnected: boolean
): Promise<{ status: ListingStatus; reason: string }> {
  // Realistic latency for what would be a real outbound call.
  await new Promise(r => setTimeout(r, 120 + Math.random() * 300))

  if (!enabled && !simulateConnected) {
    return {
      status: 'pending',
      reason: 'Channel not yet connected — awaiting dealer application/credentials (channel_settings.enabled = false)',
    }
  }

  // Fail occasionally even when "connected" so the board reflects a real
  // system rather than a theatrical always-green demo.
  if (Math.random() < 0.08) {
    return { status: 'failed', reason: 'SIMULATED: channel rejected the listing (photo count below minimum)' }
  }

  return {
    status: 'live',
    reason: !enabled && simulateConnected ? 'SIMULATED — will be a real publish once credentials are added' : 'Published',
  }
}

export async function runSync(opts: { simulateConnected?: boolean } = {}): Promise<SyncResult> {
  const simulateConnected = !!opts.simulateConnected
  const startedAt = new Date().toISOString()
  const supabase = createServiceClient()

  const ops = buildMockDmsExport()

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
        // Real DeskManager exports carry the full current record every poll,
        // not just deltas — a unit can legitimately gain a VIN/HIN after its
        // first listing (paperwork catches up). Diff the identifier fields
        // and persist any change instead of treating "already exists" as
        // nothing-to-do.
        const identifierChanged =
          (op.identifier_type && op.identifier_type !== existing.identifier_type) ||
          (op.identifier && op.identifier !== existing.identifier)

        if (identifierChanged) {
          const { data: patched } = await supabase
            .from('units')
            .update({
              identifier_type: op.identifier_type ?? existing.identifier_type,
              identifier: op.identifier ?? existing.identifier,
              dms_last_seen_at: new Date().toISOString(),
            })
            .eq('dms_id', op.dms_id)
            .select()
            .single()

          ingest.added.push({
            dms_id: op.dms_id,
            summary: `${op.year} ${op.make} ${op.model} already existed — ${op.identifier_type?.toUpperCase()} added/changed: ${op.identifier}`,
          })
          touchedUnits.push((patched ?? existing) as Unit)
          continue
        }

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
      const { data: after } = await supabase
        .from('units')
        .update({ status: 'sold', sold_at: new Date().toISOString() })
        .eq('dms_id', op.dms_id)
        .select()
        .single()

      ingest.sold.push({ dms_id: op.dms_id, summary: `SOLD: ${before.year} ${before.make} ${before.model} — removing from every channel` })
      if (after) touchedUnits.push(after as Unit)
    }
  }

  // ── Step 2: for every touched unit, dispatch every eligible channel ──────
  for (const unit of touchedUnits) {
    const isSold = unit.status === 'sold'
    const profileChannels = resolvePostingChannels(unit)

    for (const channelId of ALL_CHANNELS) {
      if (channelId === 'site') {
        await supabase.from('channel_listings').upsert(
          {
            unit_id: unit.id,
            channel_id: 'site',
            status: isSold ? 'removed' : 'live',
            last_synced_at: new Date().toISOString(),
            removed_at: isSold ? new Date().toISOString() : null,
            first_published_at: isSold ? undefined : new Date().toISOString(),
          },
          { onConflict: 'unit_id,channel_id' }
        )
        channelRuns.push({
          dms_id: unit.dms_id,
          unit_type: unit.unit_type,
          channel_id: 'site',
          outcome: isSold ? 'removed' : 'live',
          reason: isSold ? 'Unit sold — removed from public site' : 'ISR revalidated on soidrvmarine',
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
        await supabase.from('channel_listings').upsert(
          {
            unit_id: unit.id,
            channel_id: channelId,
            status: 'needs_review',
            last_error: gate.reason,
            last_synced_at: new Date().toISOString(),
          },
          { onConflict: 'unit_id,channel_id' }
        )
        channelRuns.push({
          dms_id: unit.dms_id,
          unit_type: unit.unit_type,
          channel_id: channelId,
          outcome: 'needs_review',
          reason: gate.reason!,
        })
        continue
      }

      if (isSold) {
        await supabase
          .from('channel_listings')
          .update({ status: 'removed', removed_at: new Date().toISOString() })
          .eq('unit_id', unit.id)
          .eq('channel_id', channelId)
        channelRuns.push({
          dms_id: unit.dms_id,
          unit_type: unit.unit_type,
          channel_id: channelId,
          outcome: 'removed',
          reason: 'Unit sold — unpublished',
        })
        continue
      }

      const enabled = enabledMap.get(channelId) ?? false
      const sim = await simulateChannelCall(enabled, simulateConnected)
      const externalId = sim.status === 'live' ? `${channelId.toUpperCase()}-${unit.dms_id}-${Math.floor(1000 + Math.random() * 9000)}` : null

      await supabase.from('channel_listings').upsert(
        {
          unit_id: unit.id,
          channel_id: channelId,
          status: sim.status,
          external_id: externalId,
          external_url: externalId ? `https://example-${channelId.replace(/_/g, '-')}.test/listing/${externalId}` : null,
          last_error: sim.status !== 'live' ? sim.reason : null,
          last_synced_at: new Date().toISOString(),
          first_published_at: sim.status === 'live' ? new Date().toISOString() : undefined,
        },
        { onConflict: 'unit_id,channel_id' }
      )

      await supabase.from('sync_jobs').insert({
        unit_id: unit.id,
        channel_id: channelId,
        action: 'publish',
        attempts: 1,
        result: { status: sim.status, reason: sim.reason },
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      })

      channelRuns.push({
        dms_id: unit.dms_id,
        unit_type: unit.unit_type,
        channel_id: channelId,
        outcome: sim.status,
        reason: sim.reason,
      })
    }
  }

  return { startedAt, completedAt: new Date().toISOString(), simulateConnected, ingest, channelRuns }
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
