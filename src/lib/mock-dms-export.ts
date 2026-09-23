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

// Two changes against real seeded units (rv006, boat001) + two brand-new
// units DeskManager would report as never-seen-before. This is what a real
// diff against the DMS export would look like on a normal day.
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
  ]
}
