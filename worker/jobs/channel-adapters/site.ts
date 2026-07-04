// Built by ATLAS — 2026-07-04
// Channel adapter: site — triggers ISR revalidation on soidrvmarine.com
// Fires for all unit types (rv, boat, pwc, trailer)

import type PgBoss from 'pg-boss'

interface SiteJobData {
  unitId: string
  slug: string
  action: 'publish' | 'update' | 'unpublish'
}

export async function handler(job: PgBoss.Job<SiteJobData>) {
  const { unitId, slug, action } = job.data
  console.log('[adapt-site]', { unitId, slug, action })

  // TODO(Phase 2): trigger Next.js ISR revalidation
  // await fetch(`https://soidrvmarine.com/api/revalidate?path=/inventory/${slug}&secret=${process.env.REVALIDATION_SECRET}`, { method: 'POST' })
  // On publish/update: revalidate /inventory/[slug], /rvs, /boats
  // On unpublish: redirect slug to /rvs or /boats (404 page handled by notFound())

  console.log('[adapt-site] stub — Phase 2 wiring pending')
}
