// Built by ATLAS — 2026-07-04
import type { MetadataRoute } from 'next'
import { DEALER_INFO } from '@/lib/types'
import { RV_INVENTORY, BOAT_INVENTORY } from '@/lib/inventory'

const BASE = `https://${DEALER_INFO.domain}`

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE}/rvs`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${BASE}/boats`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${BASE}/motors/mercury-outboards`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/financing`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const rvPages = RV_INVENTORY.map(unit => ({
    url: `${BASE}/inventory/${unit.slug}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }))

  const boatPages = BOAT_INVENTORY.map(unit => ({
    url: `${BASE}/inventory/${unit.slug}`,
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  }))

  return [...staticPages, ...rvPages, ...boatPages]
}
