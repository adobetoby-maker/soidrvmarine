// Built by ATLAS — 2026-07-04
// Channel adapter: meta — Meta Catalog API (Facebook / Instagram)
// IMPORTANT: Meta free Marketplace dealer listings were KILLED in January 2023.
// This adapter is for AIA (Automotive Inventory Ads) catalog only — paid campaign layer.
// Boats are INELIGIBLE — boats use HIN, not VIN. Meta Catalog requires VIN.
// Supports: rv only (Class A, B, C, travel trailer, 5th wheel, toy hauler)
// Week 0: Meta Business Manager system user token required

import type PgBoss from 'pg-boss'

interface MetaJobData {
  unitId: string
  action: 'publish' | 'update' | 'unpublish'
}

export async function handler(job: PgBoss.Job<MetaJobData>) {
  const { unitId, action } = job.data
  console.log('[adapt-meta]', { unitId, action })

  // TODO(Phase 3): wire Meta Catalog API
  // Endpoint: https://graph.facebook.com/v19.0/{catalog-id}/items_batch
  // Auth: system user access token from Meta Business Manager
  // Schema: https://developers.facebook.com/docs/marketing-api/catalog/reference
  // Only RVs with a valid VIN are eligible. Filter: unit_type='rv' AND identifier_type='vin' AND identifier IS NOT NULL

  // Eligibility gate (enforce in supports() before queuing):
  // - unit_type must be 'rv'
  // - identifier_type must be 'vin'
  // - identifier must not be null

  console.log('[adapt-meta] stub — Phase 3 (requires Meta Business Manager system user token)')
}
