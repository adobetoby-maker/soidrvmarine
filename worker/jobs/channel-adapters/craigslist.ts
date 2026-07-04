// Built by ATLAS — 2026-07-04
// Channel adapter: craigslist — BAPI (Bulk Posting API)
// RV category: rvd | Boat category: bod
// 60-90 day approval process — LONGEST POLE in Week 0 checklist
// Apply day 1: 415-399-5200 x8283
// Supports: rv (rvd), boat (bod), pwc (bod)

import type PgBoss from 'pg-boss'

interface CraigslistJobData {
  unitId: string
  action: 'publish' | 'update' | 'unpublish'
}

// Craigslist BAPI category codes
const CATEGORY_MAP: Record<string, string> = {
  'Travel Trailer': 'rvd',
  'Fifth Wheel':    'rvd',
  'Class A':        'rvd',
  'Class B':        'rvd',
  'Class C':        'rvd',
  'Toy Hauler':     'rvd',
  'Pontoon':        'bod',
  'Bass Boat':      'bod',
  'Fishing':        'bod',
  'PWC':            'bod',
}

export async function handler(job: PgBoss.Job<CraigslistJobData>) {
  const { unitId, action } = job.data
  console.log('[adapt-craigslist]', { unitId, action })

  // TODO(Phase 3): wire Craigslist BAPI
  // Endpoint: https://post.craigslist.org/bulk-rss/post (or current BAPI endpoint from approval docs)
  // Auth: BAPI token from Craigslist approval process
  // Rate limit: enforced by Craigslist per-account
  // Posting limits: per-category, per-area (craigslist_area from dealer location)

  // Per-unit flow:
  // publish → POST new listing via BAPI → store external_id in channel_listings
  // update → DELETE old listing → POST new listing (BAPI has no edit endpoint)
  // unpublish → DELETE listing via BAPI external_id

  // Jerome, ID craigslist area: 'twinfalls' (southern Idaho)

  console.log('[adapt-craigslist] stub — Phase 3 (requires 60-90 day BAPI approval)')
}
