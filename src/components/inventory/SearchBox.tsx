// Built by ATLAS — 2026-07-07
'use client'

// Instant, client-side keyword search across an inventory array — no page
// reload, no Apply button, filters on every keystroke. Meant to be mounted by
// Integration on listing pages (/rvs, /boats, /powersports), receiving the
// already server-filtered array (condition/category/brand/price/length) so
// the keyword layer applies on top of whatever the URL-param filters already
// narrowed down. Renders its own result grid so the two filter layers
// compose without either owner editing the other's file.

import { useMemo, useState } from 'react'
import { UnitCard } from './UnitCard'
import type { InventoryUnit } from '@/lib/inventory'
import { filterByKeyword } from '@/lib/inventory-filters'

interface Props {
  items: InventoryUnit[]
  /** "RVs", "boats", "powersports units" — used in the empty/count copy. */
  label?: string
}

export function SearchBox({ items, label = 'units' }: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => filterByKeyword(items, query), [items, query])

  return (
    <div>
      {/* Search input */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden
          style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={`Search by make, model, or year…`}
          aria-label={`Search ${label}`}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            border: '1.5px solid var(--color-parchment-dark)',
            borderRadius: 10,
            fontSize: '0.9375rem',
            color: 'var(--color-navy)',
            background: 'white',
            boxSizing: 'border-box',
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            style={{
              position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-sage)',
              display: 'flex', alignItems: 'center', padding: 4,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {query && (
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', marginBottom: '1rem' }}>
          {filtered.length === 0
            ? `No ${label} match "${query}"`
            : `${filtered.length} ${label} match "${query}"`}
        </p>
      )}

      {/* Results grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '0.5rem' }}>
            No matches
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)' }}>Try a different make, model, or year — or clear the search.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {filtered.map(unit => (
            <UnitCard
              key={unit.slug}
              year={unit.year}
              make={unit.make}
              model={unit.model}
              type={unit.category}
              condition={unit.condition}
              price={unit.price ?? 0}
              callForPrice={unit.price === null}
              photo={unit.photo}
              slug={unit.slug}
            />
          ))}
        </div>
      )}
    </div>
  )
}
