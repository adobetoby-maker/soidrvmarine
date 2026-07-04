// Built by ATLAS — 2026-07-04
// Channel adapter: boats_group — single feed to Boats Group
// Boats Group owns: Boat Trader + YachtWorld + boats.com — one feed covers all three
// NOT Trader Interactive — completely separate company
// Supports: boat, pwc (NOT rv, NOT motor)
// Week 0: dealer feed agreement required at boatsgroup.com

import type PgBoss from 'pg-boss'

interface BoatsGroupJobData {
  unitId: string
  action: 'publish' | 'update' | 'unpublish'
}

export async function handler(job: PgBoss.Job<BoatsGroupJobData>) {
  const { unitId, action } = job.data
  console.log('[adapt-boats-group]', { unitId, action })

  // TODO(Phase 2): regenerate Boats Group XML feed + upload
  // 1. Load all active boat/pwc units from Supabase
  // 2. Map to Boats Group XML schema (includes HIN validation — 12-char /^[A-Z]{3}[A-Z0-9]{5}[A-Z0-9]{4}$/)
  // 3. Upload to Boats Group FTP endpoint (credentials via dealer agreement)
  // 4. Single feed propagates automatically to Boat Trader, YachtWorld, boats.com

  // IMPORTANT: Boats use Hull ID Number (HIN), NOT VIN.
  // HIN format: manufacturer code (3) + hull serial (5) + model year (2) + production month (2)

  console.log('[adapt-boats-group] stub — Phase 2 wiring pending (requires dealer agreement)')
}
