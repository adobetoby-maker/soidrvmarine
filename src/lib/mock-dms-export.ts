// Built by ATLAS — 2026-09-22
// Stand-in for a real DeskManager XML/FTP export until we have the client's
// feed URL + credentials (Week 0 checklist, still pending). Shape matches the
// DmsUnit interface the real ingest job expects — swapping this fixture for a
// real feed parser is the only change needed once credentials arrive.

import type { UnitType, IdentifierType, Condition } from './types'

export interface DmsExportOp {
  dms_id: string
  operation: 'ADD' | 'UPDATE_PRICE' | 'SOLD'
  // ADD
  unit_type?: UnitType
  identifier_type?: IdentifierType
  identifier?: string
  category?: string
  condition?: Condition
  year?: number
  make?: string
  model?: string
  price?: number
  stock_number?: string
  // UPDATE_PRICE
  new_price?: number
}

// Two changes against real seeded units (rv006, boat001) + brand-new units
// DeskManager would report as never-seen-before. This is what a real diff
// against the DMS export would look like on a normal day.
export function buildMockDmsExport(): DmsExportOp[] {
  return [
    { dms_id: 'rv006', operation: 'UPDATE_PRICE', new_price: 31450 },
    { dms_id: 'boat001', operation: 'SOLD' },
    {
      dms_id: 'DEMO-RV-NEW-001',
      operation: 'ADD',
      unit_type: 'rv',
      identifier_type: 'serial',
      category: 'travel-trailer',
      condition: 'new',
      year: 2027,
      make: 'Keystone',
      model: 'Hideout 19BKWE',
      price: 21495,
      stock_number: 'DEMO-RV-NEW-001',
    },
    {
      dms_id: 'DEMO-BOAT-NEW-001',
      operation: 'ADD',
      unit_type: 'boat',
      identifier_type: 'hin',
      category: 'pontoon',
      condition: 'new',
      year: 2026,
      make: 'Montego Bay',
      model: 'F8520',
      price: 34990,
      stock_number: 'DEMO-BOAT-NEW-001',
    },
    {
      // The demo key: a brand-new unit DeskManager has never reported before,
      // with a real VIN on file — the one unit in this export that's actually
      // eligible for every RV channel including Meta (which every other seeded
      // unit fails, since none of them carry a VIN).
      dms_id: 'DEMO-KEY-001',
      operation: 'ADD',
      unit_type: 'rv',
      identifier_type: 'vin',
      identifier: '1FDXE45S1KHA00001',
      category: 'travel-trailer',
      condition: 'new',
      year: 2027,
      make: 'Keystone',
      model: 'Cougar 22RBS',
      price: 24990,
      stock_number: 'DEMO-KEY-001',
    },
    {
      // Proves used inventory runs through the identical path as new —
      // `condition` is stored but never checked by any eligibility gate.
      dms_id: 'DEMO-USED-RV-001',
      operation: 'ADD',
      unit_type: 'rv',
      identifier_type: 'vin',
      identifier: '4X4TDMPU9NG012345',
      category: 'fifth-wheel',
      condition: 'used',
      year: 2021,
      make: 'Keystone',
      model: 'Montana 3121RL',
      price: 38900,
      stock_number: 'DEMO-USED-RV-001',
    },
  ]
}
