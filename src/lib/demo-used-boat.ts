import type { DmsExportOp } from './mock-dms-export'

export type UsedBoatDemoStage = 'list-used-boat' | 'sell-used-boat'

// Deliberately fictional inventory. A boat has a HIN; VINs identify RVs here.
export const DEMO_USED_BOAT_ID = 'DEMO-USED-BOAT-001'
export const DEMO_USED_BOAT_HIN = 'DMO00001A121'

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
