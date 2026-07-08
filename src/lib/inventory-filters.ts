// Built by ATLAS — 2026-07-07
// Pure helper functions for extra inventory filter dimensions (price range, length,
// keyword search). Kept separate from lib/inventory.ts (owned by WS2) so both
// workstreams can extend inventory filtering without touching the same file.

import type { InventoryUnit } from './inventory'

export interface Band {
  label: string
  min?: number
  max?: number
}

// ── Price bands ─────────────────────────────────────────────────────────────

export const PRICE_BANDS: Band[] = [
  { label: 'Any Price' },
  { label: 'Under $20K', max: 20000 },
  { label: '$20K – $40K', min: 20000, max: 40000 },
  { label: '$40K – $60K', min: 40000, max: 60000 },
  { label: '$60K+', min: 60000 },
]

/**
 * Filters units whose price falls within [min, max] (inclusive).
 * Units with a null price ("Call for Price") are excluded whenever a real
 * range is requested, since they can't be evaluated against a number.
 * Passing both min and max as undefined is a no-op (returns inventory unchanged).
 */
export function filterByPriceRange(inventory: InventoryUnit[], min?: number, max?: number): InventoryUnit[] {
  if (min == null && max == null) return inventory
  return inventory.filter(u => {
    if (u.price == null) return false
    if (min != null && u.price < min) return false
    if (max != null && u.price > max) return false
    return true
  })
}

// ── Estimated monthly payment ("Shop by Payment", Bretz-style) ─────────────
// Uses the same assumptions as the unit-detail PaymentCalculator defaults so the
// browse-by-payment estimate matches what a shopper sees on the detail page:
// 10% down, 7.9% APR, 120-month term. Always labeled "est." — not a quote.
const EST_DOWN_PCT = 0.10
const EST_APR = 0.079
const EST_TERM_MONTHS = 120

export function estimateMonthlyPayment(price: number | null | undefined): number | null {
  if (price == null || price <= 0) return null
  const loan = price * (1 - EST_DOWN_PCT)
  const r = EST_APR / 12
  const n = EST_TERM_MONTHS
  const factor = Math.pow(1 + r, n)
  return Math.round((loan * r * factor) / (factor - 1))
}

// Monthly-payment bands (dollars/month). min/max are payment thresholds, not price.
export const PAYMENT_BANDS: Band[] = [
  { label: 'Any Payment' },
  { label: 'Under $200/mo', max: 200 },
  { label: '$200 – $300/mo', min: 200, max: 300 },
  { label: '$300 – $400/mo', min: 300, max: 400 },
  { label: '$400+/mo', min: 400 },
]

/** Filters units whose ESTIMATED monthly payment falls within [min, max]. */
export function filterByPaymentRange(inventory: InventoryUnit[], min?: number, max?: number): InventoryUnit[] {
  if (min == null && max == null) return inventory
  return inventory.filter(u => {
    const pay = estimateMonthlyPayment(u.price)
    if (pay == null) return false
    if (min != null && pay < min) return false
    if (max != null && pay > max) return false
    return true
  })
}

// ── Length bands (feet) — applies to both RVs and boats ────────────────────

export const LENGTH_BANDS: Band[] = [
  { label: 'Any Length' },
  { label: 'Under 20 ft', max: 20 },
  { label: '20 – 30 ft', min: 20, max: 30 },
  { label: '30 – 40 ft', min: 30, max: 40 },
  { label: '40 ft+', min: 40 },
]

/**
 * Filters units whose lengthFt falls within [min, max] (inclusive).
 * Units missing lengthFt are excluded whenever a real range is requested.
 * Passing both min and max as undefined is a no-op (returns inventory unchanged).
 */
export function filterByLengthRange(inventory: InventoryUnit[], min?: number, max?: number): InventoryUnit[] {
  if (min == null && max == null) return inventory
  return inventory.filter(u => {
    if (u.lengthFt == null) return false
    if (min != null && u.lengthFt < min) return false
    if (max != null && u.lengthFt > max) return false
    return true
  })
}

// ── Keyword search (make / model / year / trim / category) ─────────────────

export function matchesKeyword(unit: InventoryUnit, keyword: string): boolean {
  const q = keyword.trim().toLowerCase()
  if (!q) return true
  const haystack = `${unit.year} ${unit.make} ${unit.model} ${unit.trim ?? ''} ${unit.category}`.toLowerCase()
  return haystack.includes(q)
}

/**
 * Instant, client-side keyword filter across make/model/year/trim/type.
 * No page reload, no Apply button — matches on every keystroke.
 */
export function filterByKeyword(inventory: InventoryUnit[], keyword: string): InventoryUnit[] {
  if (!keyword.trim()) return inventory
  return inventory.filter(u => matchesKeyword(u, keyword))
}

// ── Combined helper — applies whichever extra filters are present ──────────

export interface ExtraFilterOptions {
  priceMin?: number
  priceMax?: number
  lengthMin?: number
  lengthMax?: number
  paymentMin?: number
  paymentMax?: number
  keyword?: string
}

export function applyExtraFilters(inventory: InventoryUnit[], opts: ExtraFilterOptions): InventoryUnit[] {
  let result = inventory
  if (opts.priceMin != null || opts.priceMax != null) {
    result = filterByPriceRange(result, opts.priceMin, opts.priceMax)
  }
  if (opts.lengthMin != null || opts.lengthMax != null) {
    result = filterByLengthRange(result, opts.lengthMin, opts.lengthMax)
  }
  if (opts.paymentMin != null || opts.paymentMax != null) {
    result = filterByPaymentRange(result, opts.paymentMin, opts.paymentMax)
  }
  if (opts.keyword) {
    result = filterByKeyword(result, opts.keyword)
  }
  return result
}

/** Finds which preset band (from PRICE_BANDS/LENGTH_BANDS) matches a given min/max pair. */
export function findActiveBand(bands: Band[], min?: number, max?: number): Band {
  return bands.find(b => b.min === min && b.max === max) ?? bands[0]
}
