// Built by ATLAS — 2026-09-22
// Authenticated, single-unit demo. These actions write to the configured DB.
// External channel adapters are not connected; their statuses stay pending.
import { timingSafeEqual } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { runSync } from '@/lib/sync-engine'
import { buildUsedBoatDemoOperation, DEMO_USED_BOAT_SLUG, type UsedBoatDemoStage } from '@/lib/demo-used-boat'

function authorized(req: NextRequest): boolean {
  const expected = process.env.DEMO_SYNC_TOKEN
  const provided = req.headers.get('x-demo-sync-token')
  if (!expected || !provided) return false
  const a = Buffer.from(expected)
  const b = Buffer.from(provided)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  if (!process.env.DEMO_SYNC_TOKEN) {
    return NextResponse.json({ error: 'Demo sync is disabled until DEMO_SYNC_TOKEN is configured' }, { status: 503 })
  }
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let stage: UsedBoatDemoStage | undefined
  try {
    const body = await req.json()
    if (body?.stage === 'list-used-boat' || body?.stage === 'sell-used-boat') stage = body.stage
  } catch {
    // Invalid JSON is rejected below.
  }
  if (!stage) {
    return NextResponse.json({ error: 'Choose list-used-boat or sell-used-boat' }, { status: 400 })
  }

  try {
    const result = await runSync({ operations: [buildUsedBoatDemoOperation(stage)] })
    const siteOutcome = result.channelRuns.find(run => run.channel_id === 'site')?.outcome
    const expectedOutcome = stage === 'sell-used-boat' ? 'removed' : 'live'
    if (siteOutcome !== expectedOutcome) {
      return NextResponse.json({ error: 'Demo unit did not reach the requested state', result }, { status: 409 })
    }
    revalidatePath('/boats')
    revalidatePath('/inventory/[slug]', 'page')
    revalidatePath(`/inventory/${DEMO_USED_BOAT_SLUG}`) // exact-path purge -- the pattern alone left a stale cached copy live
    revalidatePath('/admin')
    revalidatePath('/')
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'sync failed' }, { status: 500 })
  }
}
