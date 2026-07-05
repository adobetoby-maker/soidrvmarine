// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { UnitCard } from '@/components/inventory/UnitCard'
import { InventoryFilters } from '@/components/inventory/InventoryFilters'
import {
  filterAndSortRvs,
  type ConditionFilter,
  type RvCategory,
  type SortOption,
} from '@/lib/inventory'
import { getBoatInventory } from '@/lib/db'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Boats for Sale — Pontoon, Bass & Fishing Boats',
  description: `Shop new and used boats at ${DEALER_INFO.shortName} in Jerome, Idaho. Pontoon boats, bass boats, and fishing boats. On-site financing. Serving Twin Falls, Burley, and Magic Valley.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/boats` },
  openGraph: {
    title: 'Boats for Sale | Southern Idaho RV & Marine — Jerome, ID',
    description: 'Shop new and used boats at Magic Valley\'s trusted dealer. Pontoon, bass, and fishing boats. Financing available.',
    url: `https://${DEALER_INFO.domain}/boats`,
  },
}

interface Props {
  searchParams: Promise<{ condition?: string; category?: string; sort?: string; brand?: string }>
}

export default async function BoatsPage({ searchParams }: Props) {
  const params = await searchParams
  const condition = (params.condition as ConditionFilter) || 'All'
  const category = (params.category as RvCategory) || 'All'
  const sort = (params.sort as SortOption) || 'price-desc'
  const brand = params.brand || 'All'

  const inventory = await getBoatInventory()
  const filtered = filterAndSortRvs(inventory, condition, category, sort, brand)
  const allCategories = [...new Set(inventory.map(u => u.category))].sort()
  const allBrands = [...new Set(inventory.map(u => u.make))].sort()

  return (
    <>
      {/* Page header */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
            Jerome, Idaho · {inventory.length}+ Units
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Boats for Sale
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'oklch(80% 0.01 220)', maxWidth: 540, lineHeight: 1.6 }}>
            New and used pontoon boats, bass boats, and fishing boats. Idaho&apos;s best lake and reservoir country — we&apos;ll get you on the water.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {/* Filters */}
        <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-parchment-dark)' }}>
          <Suspense fallback={<div style={{ height: 80, background: 'var(--color-parchment-dark)', borderRadius: 8, opacity: 0.4 }} />}>
            <InventoryFilters
              condition={condition}
              category={category}
              sort={sort}
              brand={brand}
              totalCount={inventory.length}
              filteredCount={filtered.length}
              categories={allCategories}
              brands={allBrands}
              label="boats"
            />
          </Suspense>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '0.5rem' }}>
              No boats match these filters
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)' }}>Try removing a filter to see more results.</p>
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

        {filtered.length > 0 && (
          <p style={{ marginTop: '2.5rem', fontSize: '0.8125rem', color: 'var(--color-sage)', textAlign: 'center', lineHeight: 1.6 }}>
            All prices exclude tax, title, license, and doc fees. Contact us to confirm availability. Financing subject to credit approval.
          </p>
        )}
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Boats for Sale — Southern Idaho RV & Marine',
            url: `https://${DEALER_INFO.domain}/boats`,
            numberOfItems: inventory.length,
          }),
        }}
      />
    </>
  )
}
