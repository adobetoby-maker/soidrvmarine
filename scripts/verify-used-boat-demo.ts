import assert from 'node:assert/strict'
import { buildUsedBoatDemoOperation, DEMO_USED_BOAT_HIN, DEMO_USED_BOAT_ID } from '../src/lib/demo-used-boat'
import { runSync } from '../src/lib/sync-engine'

type Row = Record<string, any>

class FakeDatabase {
  units = new Map<string, Row>()
  listings = new Map<string, Row>()
  media: Row[] = []
  jobs: Row[] = []

  from(table: string) {
    const db = this
    let action = 'select'
    let values: Row = {}
    const filters: [string, unknown][] = []

    const execute = () => {
      if (table === 'channel_settings') return { data: [], error: null }
      if (table === 'units') {
        if (action === 'insert') {
          const row = { ...values, id: `unit-${db.units.size + 1}` }
          db.units.set(row.dms_id, row)
          return { data: row, error: null }
        }
        const row = [...db.units.values()].find(item => filters.every(([key, value]) => item[key] === value))
        if (action === 'update' && row) Object.assign(row, values)
        return { data: row ?? null, error: null }
      }
      if (table === 'channel_listings' && action === 'upsert') {
        const key = `${values.unit_id}:${values.channel_id}`
        db.listings.set(key, { ...db.listings.get(key), ...values })
        return { data: db.listings.get(key), error: null }
      }
      if (table === 'media' && action === 'insert') db.media.push(values)
      if (table === 'sync_jobs' && action === 'insert') db.jobs.push(values)
      return { data: values, error: null }
    }

    const query = {
      select: (_columns?: string) => query,
      eq: (key: string, value: unknown) => { filters.push([key, value]); return query },
      maybeSingle: () => Promise.resolve(execute()),
      single: () => Promise.resolve(execute()),
      insert: (row: Row) => { action = 'insert'; values = row; return query },
      update: (row: Row) => { action = 'update'; values = row; return query },
      upsert: (row: Row) => { action = 'upsert'; values = row; return query },
      then: (resolve: (value: { data: Row | Row[] | null; error: null }) => void) => Promise.resolve(execute()).then(resolve),
    }
    return query
  }
}

async function main() {
  assert.match(DEMO_USED_BOAT_HIN, /^[A-Z]{3}[A-Z0-9]{5}[A-Z0-9]{4}$/)
  const db = new FakeDatabase()
  const client = db as unknown as Parameters<typeof runSync>[0]['client']

  const listed = await runSync({ client, operations: [buildUsedBoatDemoOperation('list-used-boat')] })
  assert.equal(db.units.get(DEMO_USED_BOAT_ID)?.status, 'active')
  assert.equal(db.units.get(DEMO_USED_BOAT_ID)?.condition, 'used')
  assert.equal(db.units.get(DEMO_USED_BOAT_ID)?.identifier_type, 'hin')
  assert.equal(db.media[0]?.url, '/demo-used-boat.svg')
  assert.equal(listed.channelRuns.find(run => run.channel_id === 'site')?.outcome, 'live')
  assert.equal(listed.channelRuns.find(run => run.channel_id === 'boats_group')?.outcome, 'pending')
  assert.equal(listed.channelRuns.find(run => run.channel_id === 'meta')?.outcome, 'needs_review')

  const sold = await runSync({ client, operations: [buildUsedBoatDemoOperation('sell-used-boat')] })
  assert.equal(db.units.get(DEMO_USED_BOAT_ID)?.status, 'sold')
  assert.ok(db.units.get(DEMO_USED_BOAT_ID)?.sold_at)
  assert.equal(sold.channelRuns.length, 7)
  assert.ok(sold.channelRuns.every(run => run.outcome === 'removed'))
  assert.ok([...db.listings.values()].every(listing => listing.status === 'removed'))

  console.log(`PASS ${DEMO_USED_BOAT_ID}: HIN validated; listed on site; boat channels queued; sold; all 7 local channel statuses removed`)
}

main().catch(error => { console.error(error); process.exitCode = 1 })
