// Built by ATLAS — 2026-07-04
// Channel adapter: rv_universe — Sandhills Global (NOT Trader Interactive)
// Sandhills is a Lincoln, NE company — owns RV Universe, Machinery Trader, etc.
// No public API — submission via Sandhills-provided app / FTP path
// Feed path TBD — Week 0 rep call needed
// Supports: rv only

import type PgBoss from 'pg-boss'

interface RvUniverseJobData {
  unitId: string
  action: 'publish' | 'update' | 'unpublish'
}

export async function handler(job: PgBoss.Job<RvUniverseJobData>) {
  const { unitId, action } = job.data
  console.log('[adapt-rv-universe]', { unitId, action })

  // TODO(Phase 3): wire Sandhills feed path once rep call is done
  // Feed path unknown until dealer rep engagement confirms format + endpoint
  // Contact: sandhills.com — request RV Universe dealer feed documentation

  console.log('[adapt-rv-universe] stub — Phase 3 (requires Sandhills rep call)')
}
