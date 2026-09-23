// Built by ATLAS — 2026-09-22
// POST /api/sync-demo — runs the REAL propagation engine (src/lib/sync-engine.ts):
// ingests the mock DeskManager export, diffs it against the live `units` table,
// and dispatches every eligible channel adapter. This writes real rows to
// units / channel_listings / sync_jobs. It is no longer a dry run.
//
// Body: { simulateConnected?: boolean } — when true, channels without real
// credentials are treated as connected for this run only, clearly tagged
// SIMULATED in the response and in channel_listings.last_error/reason.
import { NextRequest, NextResponse } from 'next/server'
import { runSync } from '@/lib/sync-engine'

export async function POST(req: NextRequest) {
  let simulateConnected = false
  try {
    const body = await req.json()
    simulateConnected = !!body?.simulateConnected
  } catch {
    // no body — default run
  }

  try {
    const result = await runSync({ simulateConnected })
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'sync failed' }, { status: 500 })
  }
}

// GET kept for manual/browser testing — same real engine, no simulate flag.
export async function GET() {
  try {
    const result = await runSync({})
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'sync failed' }, { status: 500 })
  }
}
