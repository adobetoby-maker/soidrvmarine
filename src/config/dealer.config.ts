// Built by ATLAS — 2026-07-07
// ─────────────────────────────────────────────────────────────────────────────
// DEALER CONFIG — the single source of truth for everything client-specific.
//
// This file is the white-label seam. To stand up a NEW dealer site, this is the
// primary file you edit. Everything below is safe to change per client; nothing
// below is wired to app logic that assumes a specific dealer. See TEMPLATE.md at
// the repo root for the full new-dealer checklist (config + theme + data + deploy).
//
// Kept intentionally flat and boring — no logic, just values — so a non-engineer
// can clone a dealer by editing this one file plus the three pointers noted at the
// bottom (theme tokens, inventory data, hero media).
// ─────────────────────────────────────────────────────────────────────────────

export interface DealerConfig {
  identity: {
    name: string
    shortName: string
    address: string
    city: string
    state: string
    zip: string
    phone: string
    phoneHref: string
    email: string
    lat: number
    lng: number
    domain: string
    directionsUrl: string
  }
  brand: {
    tagline: string
    heroLine: string
    yearsInBusiness: number
    reviewCount: number
    reviewScore: number
  }
  social: {
    gbpUrl: string
    fbUrl: string
    instagramUrl: string
    youtubeUrl: string
    xUrl: string
  }
  // Feature flags — flip per client without touching component code.
  features: {
    boats: boolean
    powersports: boolean
    mercuryOutboards: boolean
    storage: boolean
    financing: boolean
    socialAutopilot: boolean // admin demo panel
  }
  // Where inventory photos come from. New dealers plug their own CDN prefix here.
  inventory: {
    cdnBase: string
    dmsName: string // the DMS the nightly sync reads from ("DeskManager", etc.)
  }
}

export const DEALER: DealerConfig = {
  identity: {
    name: 'Southern Idaho RV & Marine',
    shortName: 'SI RV & Marine',
    address: '60 Bob Barton Road',
    city: 'Jerome',
    state: 'ID',
    zip: '83338',
    phone: '(208) 324-4661',
    phoneHref: 'tel:+12083244661',
    email: 'info@soidrvmarine.com',
    lat: 42.7258,
    lng: -114.5191,
    domain: 'soidrvmarine.com',
    directionsUrl: 'https://maps.google.com/?q=60+Bob+Barton+Road+Jerome+ID+83338',
  },
  brand: {
    tagline: "Southern Idaho's Only Factory-Direct Mercury Dealer",
    heroLine: 'Veterans Serving Idaho Families',
    yearsInBusiness: 32,
    reviewCount: 1203,
    reviewScore: 4.7,
  },
  social: {
    gbpUrl: 'https://g.page/southern-idaho-rv-marine',
    fbUrl: 'https://facebook.com/soidrvmarine',
    instagramUrl: 'https://instagram.com/soidrvmarine',
    youtubeUrl: 'https://youtube.com/@soidrvmarine',
    xUrl: 'https://x.com/soidrvmarine',
  },
  features: {
    boats: true,
    powersports: true,
    mercuryOutboards: true,
    storage: true,
    financing: true,
    socialAutopilot: true,
  },
  inventory: {
    cdnBase: 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory',
    dmsName: 'DeskManager',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// The other three per-client pointers (documented here so nothing is hidden):
//   1. THEME TOKENS  → src/app/globals.css  (the :root OKLch color + font vars)
//   2. INVENTORY DATA → src/lib/inventory.ts + supabase/seed.sql (the units)
//   3. HERO MEDIA     → public/hero-loop.mp4 + public/hero-poster.jpg
// Change those three plus this file, and you have a new dealer site.
// ─────────────────────────────────────────────────────────────────────────────
