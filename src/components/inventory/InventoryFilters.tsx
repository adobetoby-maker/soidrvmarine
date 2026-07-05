// Built by ATLAS — 2026-07-04
'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import type { ConditionFilter, RvCategory, SortOption } from '@/lib/inventory'

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
}

export function InventoryFilters({ condition, category, sort, brand, totalCount, filteredCount, categories, brands, label = 'units' }: Props) {
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
        <div>
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
    </div>
  )
}
