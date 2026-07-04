// Built by ATLAS — 2026-07-04
// pg-boss worker entry point — runs on Coolify (Mac Studio)
// Polls DeskManager XML/FTP export every 60 min, diffs against DB, fires channel adapters

import PgBoss from 'pg-boss'

// ── Job name constants ────────────────────────────────────────────────────────

export const JOBS = {
  INGEST_DESKMANAGER:   'ingest-deskmanager',
  ADAPT_SITE:           'adapt-site',
  ADAPT_RV_TRADER:      'adapt-rv-trader',
  ADAPT_BOATS_GROUP:    'adapt-boats-group',
  ADAPT_RV_UNIVERSE:    'adapt-rv-universe',
  ADAPT_META:           'adapt-meta',
  ADAPT_GOOGLE_VL:      'adapt-google-vl',
  ADAPT_CRAIGSLIST:     'adapt-craigslist',
} as const

export type JobName = (typeof JOBS)[keyof typeof JOBS]

// ── Bootstrap ─────────────────────────────────────────────────────────────────

async function start() {
  const boss = new PgBoss({
    connectionString: process.env.DATABASE_URL,
    schema: 'pgboss',
  })

  boss.on('error', err => console.error('[pg-boss] error', err))
  await boss.start()

  // Register job handlers
  await boss.work(JOBS.INGEST_DESKMANAGER, { teamSize: 1, teamConcurrency: 1 }, require('./jobs/ingest-deskmanager').handler)
  await boss.work(JOBS.ADAPT_SITE,         { teamSize: 5 },                     require('./jobs/channel-adapters/site').handler)
  await boss.work(JOBS.ADAPT_RV_TRADER,    { teamSize: 3 },                     require('./jobs/channel-adapters/rv-trader').handler)
  await boss.work(JOBS.ADAPT_BOATS_GROUP,  { teamSize: 3 },                     require('./jobs/channel-adapters/boats-group').handler)
  await boss.work(JOBS.ADAPT_RV_UNIVERSE,  { teamSize: 2 },                     require('./jobs/channel-adapters/rv-universe').handler)
  await boss.work(JOBS.ADAPT_META,         { teamSize: 3 },                     require('./jobs/channel-adapters/meta').handler)
  await boss.work(JOBS.ADAPT_GOOGLE_VL,    { teamSize: 2 },                     require('./jobs/channel-adapters/google-vl').handler)
  await boss.work(JOBS.ADAPT_CRAIGSLIST,   { teamSize: 2 },                     require('./jobs/channel-adapters/craigslist').handler)

  // Schedule ingest poll every 60 minutes
  await boss.schedule(JOBS.INGEST_DESKMANAGER, '*/60 * * * *', {}, {
    retryLimit: 3,
    retryDelay: 300, // 5 min backoff
    singletonKey: 'ingest-deskmanager-singleton',
  })

  console.log('[worker] started — polling DeskManager every 60 min')
}

start().catch(err => {
  console.error('[worker] fatal startup error', err)
  process.exit(1)
})
