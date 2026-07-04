// Built by ATLAS — 2026-07-04
// Channel adapter: google_vl — Google Vehicle Listings (SFTP CSV/TSV upload)
// 2025 policy expanded to include RVs and campers (previously automotive only)
// Boats EXCLUDED from Google VL
// Supports: rv only (travel trailers, 5th wheels, motorhomes)
// Week 0: SFTP provisioning required — contact Google dealer support

import type PgBoss from 'pg-boss'

interface GoogleVlJobData {
  unitId: string
  action: 'publish' | 'update' | 'unpublish'
}

export async function handler(job: PgBoss.Job<GoogleVlJobData>) {
  const { unitId, action } = job.data
  console.log('[adapt-google-vl]', { unitId, action })

  // TODO(Phase 3): generate CSV/TSV feed + SFTP upload to Google
  // 1. Load all active rv units from Supabase
  // 2. Map to Google Vehicle Listings schema (price, VIN, condition, year, make, model, image_link)
  // 3. Upload via SFTP to Google-provisioned endpoint
  // 4. Schedule: daily re-upload (Google processes feeds on a schedule, not per-event)

  // Feed format: tab-separated values or CSV
  // Required fields: id, title, description, link, image_link, price, condition, brand, model, year, vin
  // Docs: https://support.google.com/merchants/answer/13203023

  console.log('[adapt-google-vl] stub — Phase 3 (requires Google SFTP provisioning)')
}
