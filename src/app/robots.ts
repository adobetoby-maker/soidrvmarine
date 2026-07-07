// Built by ATLAS — 2026-07-07
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://soidrvmarine.worker-bee.app/sitemap.xml',
  }
}
