// Built by ATLAS — 2026-07-04
// Channel adapter: rv_trader — XML/FTP feed to Trader Interactive (RV Trader)
// Supports: rv only (travel trailers, 5th wheels, motorhomes, toy haulers)
// Week 0: provider registration required at traderinteractive.com/dealer

import type PgBoss from 'pg-boss'

interface RvTraderJobData {
  unitId: string
  action: 'publish' | 'update' | 'unpublish'
}

export async function handler(job: PgBoss.Job<RvTraderJobData>) {
  const { unitId, action } = job.data
  console.log('[adapt-rv-trader]', { unitId, action })

  // TODO(Phase 2): regenerate the full RV Trader XML feed file
  // 1. Load all active RV units from Supabase (status=active, unit_type=rv)
  // 2. Map canonical unit fields → Trader Interactive XML schema
  // 3. Upload to Trader Interactive FTP endpoint via SFTP/FTP client
  // 4. Update channel_listings row: status=live, last_synced_at=now()

  // NOTE: Feed-based channels regenerate the entire feed, not individual records.
  // Individual unit job just triggers a full regeneration + upload.

  console.log('[adapt-rv-trader] stub — Phase 2 wiring pending (requires provider registration)')
}
