// Demo sync endpoint — triggered by the admin dashboard "Run Demo Sync" button
// GET /api/sync-demo — runs a dry-run simulation of the DeskManager sync flow
// Returns a structured JSON log showing what would change, safe to call anytime.
import { NextResponse } from 'next/server'
import { getRvInventory, getBoatInventory } from '@/lib/db'

type DmsOp = { dms_id: string; operation: string; [key: string]: unknown }

const SAMPLE_DMS_EXPORT: DmsOp[] = [
  {
    dms_id: 'DEMO-RV-NEW-001',
    operation: 'ADD' as const,
    year: 2027,
    make: 'Keystone',
    model: 'Hideout 19BKWE',
    category: 'travel-trailer',
    condition: 'new',
    price: 21495,
    unit_type: 'rv',
  },
  {
    dms_id: 'rv006',
    operation: 'UPDATE' as const,
    field: 'price',
    old_value: 32995,
    new_value: 31450,
    note: 'Price reduction — end of model year',
  },
  {
    dms_id: 'DEMO-BOAT-SOLD-001',
    operation: 'REMOVE' as const,
    reason: 'SOLD',
    unit_type: 'boat',
    make: 'MirroCraft',
    model: 'F176 (used)',
  },
  {
    dms_id: 'DEMO-BOAT-NEW-001',
    operation: 'ADD' as const,
    year: 2026,
    make: 'Montego Bay',
    model: 'F8520',
    category: 'pontoon',
    condition: 'new',
    price: 34990,
    unit_type: 'boat',
  },
]

export async function GET() {
  const startedAt = new Date().toISOString()

  const [rvs, boats] = await Promise.all([getRvInventory(), getBoatInventory()])
  const currentInventory = [...rvs, ...boats]

  const results = SAMPLE_DMS_EXPORT.map(op => {
    if (op.operation === 'ADD') {
      return {
        operation: 'ADD',
        dms_id: op.dms_id,
        description: `Would INSERT: ${op.year} ${op.make} ${op.model} (${op.condition} ${op.category ?? op.unit_type}) — $${op.price?.toLocaleString()}`,
        wouldWrite: true,
        dryRunOnly: true,
      }
    }
    if (op.operation === 'UPDATE') {
      const existing = currentInventory.find(u => u.slug?.includes(op.dms_id.replace('rv', 'rv0')))
      return {
        operation: 'UPDATE',
        dms_id: op.dms_id,
        description: `Would UPDATE price: $${(op.old_value as number)?.toLocaleString()} → $${(op.new_value as number)?.toLocaleString()} — ${op.note}`,
        existingFound: !!existing,
        wouldWrite: true,
        dryRunOnly: true,
      }
    }
    if (op.operation === 'REMOVE') {
      return {
        operation: 'REMOVE (SOLD)',
        dms_id: op.dms_id,
        description: `Would SET status=sold: ${op.make} ${op.model}`,
        wouldWrite: true,
        dryRunOnly: true,
      }
    }
    return { operation: 'UNKNOWN', dms_id: op.dms_id }
  })

  return NextResponse.json({
    mode: 'DRY RUN — no changes written to database',
    startedAt,
    completedAt: new Date().toISOString(),
    currentInventoryCount: { rvs: rvs.length, boats: boats.length, total: currentInventory.length },
    dmsExportOperations: SAMPLE_DMS_EXPORT.length,
    results,
    nextSteps: [
      'Run `npx ts-node scripts/deskmanager-sync.ts --live` to write to Supabase',
      'Add --revalidate flag to also trigger ISR revalidation on the live site',
      'Wire a nightly cron to automate this sync',
    ],
  })
}
