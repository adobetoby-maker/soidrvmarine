// Built by ATLAS — 2026-09-22
// GET /api/sync-status — real current state of the propagation backbone:
// every channel_listings row (joined to its unit), the last 25 sync_jobs,
// and channel_settings. Read-only. Powers the admin status board.
import { NextResponse } from 'next/server'
import { getSyncStatus } from '@/lib/sync-engine'

export async function GET() {
  try {
    const status = await getSyncStatus()
    return NextResponse.json(status)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'status failed' }, { status: 500 })
  }
}
