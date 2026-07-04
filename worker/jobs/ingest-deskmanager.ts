// Built by ATLAS — 2026-07-04
// Ingest job: polls DeskManager XML/FTP export, diffs against DB, emits change events to pg-boss

import type PgBoss from 'pg-boss'
import { JOBS } from '../index'

// DeskManager AutoManager XML/FTP export shape (partial — extend once feed URL received)
interface DmsUnit {
  StockNumber: string
  Year: string
  Make: string
  Model: string
  Trim?: string
  Type: string          // DMS category code — mapped to our canonical category via channel_category_map
  Condition: 'N' | 'U' // N=New, U=Used
  Price?: string
  MSRP?: string
  VIN?: string
  HIN?: string          // Hull ID Number — boats only
  LengthFt?: string
  Sleeps?: string
  SlideOuts?: string
  Mileage?: string
  Description?: string
  PhotoUrls?: string[]  // Already hosted by DeskManager / Dealer Spike CDN
}

type ChangeAction = 'upsert' | 'sold' | 'removed'

interface ChangeEvent {
  action: ChangeAction
  dmsId: string
  unit?: DmsUnit
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function handler(job: PgBoss.Job<Record<string, never>>) {
  console.log('[ingest-deskmanager] starting', { jobId: job.id })

  // TODO(Phase 1): fetch XML/FTP export from DeskManager
  // const feedUrl = process.env.DESKMANAGER_FEED_URL
  // const feedAuth = process.env.DESKMANAGER_FEED_AUTH  // HTTP Basic or token
  // const rawXml = await fetchDmsFeed(feedUrl, feedAuth)
  // const dmsUnits: DmsUnit[] = parseDmsXml(rawXml)

  // TODO(Phase 1): load existing active units from Supabase
  // const { data: dbUnits } = await supabase.from('units').select('dms_id, updated_at').eq('status', 'active')

  // TODO(Phase 1): diff — detect new, updated, sold, removed units
  // const changes: ChangeEvent[] = diffUnits(dmsUnits, dbUnits)

  // TODO(Phase 1): for each change, upsert Supabase + emit adapter jobs
  // for (const change of changes) {
  //   if (change.action === 'upsert') {
  //     await upsertUnit(change.unit!)
  //     await emitAdapterJobs(boss, change.dmsId)
  //   }
  //   if (change.action === 'sold') {
  //     await markSold(change.dmsId)
  //     await emitUnpublishJobs(boss, change.dmsId)
  //   }
  // }

  console.log('[ingest-deskmanager] stub — Phase 1 wiring pending')
}

// ── Helpers (Phase 1 TODO) ────────────────────────────────────────────────────

// async function fetchDmsFeed(url: string, auth: string): Promise<string>
// async function parseDmsXml(raw: string): Promise<DmsUnit[]>
// function diffUnits(dms: DmsUnit[], db: DbUnit[]): ChangeEvent[]
// async function upsertUnit(unit: DmsUnit): Promise<void>
// async function markSold(dmsId: string): Promise<void>
// async function emitAdapterJobs(boss: PgBoss, dmsId: string): Promise<void>
// async function emitUnpublishJobs(boss: PgBoss, dmsId: string): Promise<void>

// NOTE: We never write back to DeskManager — it is always the master.
// Our tool is a read-only consumer of the DMS export plus a channel multiplexer.
