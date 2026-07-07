// Built by ATLAS — 2026-07-04
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import type { ConditionFilter, RvCategory, SortOption } from '@/lib/inventory'
import { PRICE_BANDS, LENGTH_BANDS, findActiveBand, type Band } from '@/lib/inventory-filters'

interface Props {
  condition: ConditionFilter
  category: RvCategory
  sort: SortOption
  brand: string
  totalCount: number
  filteredCount: number
  categories: string[]
  brands: string[]
  label?: string
  /** Extra filter dimensions — all optional, parsed from URL params (priceMin/priceMax/lengthMin/lengthMax) by the page. */
  priceMin?: number
  priceMax?: number
  lengthMin?: number
  lengthMax?: number
  /** Set false to hide the length band filter (e.g. for a category with no lengthFt data). */
  showLengthFilter?: boolean
}

export function InventoryFilters({
  condition, category, sort, brand, totalCount, filteredCount, categories, brands, label = 'units',
  priceMin, priceMax, lengthMin, lengthMax, showLengthFilter = true,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value === 'All' || value === 'price-desc') {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    startTransition(() => { router.push(`${pathname}?${next.toString()}`) })
  }

  /** Sets/clears a paired min/max URL param (price + length bands) — instant, no Apply button, no reload. */
  function updateRange(minKey: string, maxKey: string, band: Band) {
    const next = new URLSearchParams(params.toString())
    if (band.min == null) next.delete(minKey); else next.set(minKey, String(band.min))
    if (band.max == null) next.delete(maxKey); else next.set(maxKey, String(band.max))
    startTransition(() => { router.push(`${pathname}?${next.toString()}`) })
  }

  const activePriceBand = findActiveBand(PRICE_BANDS, priceMin, priceMax)
  const activeLengthBand = findActiveBand(LENGTH_BANDS, lengthMin, lengthMax)

  const chipBase: React.CSSProperties = {
    padding: '0.375rem 0.875rem',
    borderRadius: '20px',
    fontSize: '0.8125rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: '1.5px solid',
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap',
  }
  const chipActive: React.CSSProperties = {
    ...chipBase,
    background: 'var(--color-navy)',
    borderColor: 'var(--color-navy)',
    color: 'white',
  }
  const chipInactive: React.CSSProperties = {
    ...chipBase,
    background: 'transparent',
    borderColor: 'var(--color-parchment-dark)',
    color: 'var(--color-navy)',
  }

  const CONDITIONS: ConditionFilter[] = ['All', 'New', 'Used']
  const CATS: RvCategory[] = ['All', ...categories as RvCategory[]]
  const BRANDS: string[] = ['All', ...brands]
  const SORTS: { value: SortOption; label: string }[] = [
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'year-desc', label: 'Newest First' },
    { value: 'year-asc', label: 'Oldest First' },
  ]

  return (
    <div style={{ opacity: isPending ? 0.6 : 1, transition: 'opacity 200ms ease' }}>
      {/* Result count */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', fontWeight: 500 }}>
          {filteredCount === totalCount
            ? `Showing all ${totalCount} ${label}`
            : `${filteredCount} of ${totalCount} ${label}`}
        </p>
        <select
          value={sort}
          onChange={e => update('sort', e.target.value)}
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--color-navy)',
            background: 'var(--color-parchment)',
            border: '1.5px solid var(--color-parchment-dark)',
            borderRadius: '8px',
            padding: '0.3125rem 0.75rem',
            cursor: 'pointer',
          }}
        >
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Condition chips */}
      <div style={{ marginBottom: '0.75rem' }}>
        <p style={{ fontSize: '0.6875rem', color: 'var(--color-sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Condition</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CONDITIONS.map(c => (
            <button key={c} style={c === condition ? chipActive : chipInactive} onClick={() => update('condition', c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div style={{ marginBottom: '0.75rem' }}>
        <p style={{ fontSize: '0.6875rem', color: 'var(--color-sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Type</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c} style={c === category ? chipActive : chipInactive} onClick={() => update('category', c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Brand chips */}
      {brands.length > 1 && (
        <div style={{ marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.6875rem', color: 'var(--color-sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Brand</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {BRANDS.map(b => (
              <button key={b} style={b === brand ? chipActive : chipInactive} onClick={() => update('brand', b)}>
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price range chips */}
      <div style={{ marginBottom: showLengthFilter ? '0.75rem' : 0 }}>
        <p style={{ fontSize: '0.6875rem', color: 'var(--color-sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Price</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PRICE_BANDS.map(band => (
            <button
              key={band.label}
              style={band.label === activePriceBand.label ? chipActive : chipInactive}
              onClick={() => updateRange('priceMin', 'priceMax', band)}
            >
              {band.label}
            </button>
          ))}
        </div>
      </div>

      {/* Length range chips */}
      {showLengthFilter && (
        <div>
          <p style={{ fontSize: '0.6875rem', color: 'var(--color-sage)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Length</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {LENGTH_BANDS.map(band => (
              <button
                key={band.label}
                style={band.label === activeLengthBand.label ? chipActive : chipInactive}
                onClick={() => updateRange('lengthMin', 'lengthMax', band)}
              >
                {band.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
