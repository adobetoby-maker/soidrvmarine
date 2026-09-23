import type { DmsExportOp } from './mock-dms-export'

export type UsedBoatDemoStage = 'list-used-boat' | 'sell-used-boat'

// Deliberately fictional inventory. A boat has a HIN; VINs identify RVs here.
export const DEMO_USED_BOAT_ID = 'DEMO-USED-BOAT-001'
export const DEMO_USED_BOAT_HIN = 'DMO00001A121'

// Matches slugify() in sync-engine.ts exactly (year-make-model-stock, lowercased,
// non-alnum -> '-'). Kept as a literal constant, not recomputed, so the API route
// can revalidatePath() this unit's EXACT resolved path. revalidatePath('/inventory/[slug]',
// 'page') alone does not reliably purge an already-cached specific instance of a
// dynamic route in this Next.js version -- confirmed live: after selling the demo
// unit, its detail page kept serving a stale 200 (x-nextjs-cache: HIT) instead of
// re-rendering to a 404, until the exact path below was also revalidated.
export const DEMO_USED_BOAT_SLUG = '2021-demo-marine-river-18-test-unit-demo-used-boat-001'

export function buildUsedBoatDemoOperation(stage: UsedBoatDemoStage): DmsExportOp {
  if (stage === 'sell-used-boat') {
    return { dms_id: DEMO_USED_BOAT_ID, operation: 'SOLD' }
  }

  return {
    dms_id: DEMO_USED_BOAT_ID,
    operation: 'ADD',
    unit_type: 'boat',
    identifier_type: 'hin',
    identifier: DEMO_USED_BOAT_HIN,
    category: 'fishing',
    condition: 'used',
    year: 2021,
    make: 'Demo Marine',
    model: 'River 18 TEST UNIT',
    price: 18900,
    stock_number: DEMO_USED_BOAT_ID,
    description: 'DEMO TEST LISTING — fictional boat for workflow testing, not available for purchase.',
    photo_url: '/demo-used-boat.svg',
  }
}
