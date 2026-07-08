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
import { getRvInventory } from '@/lib/db'
import { applyExtraFilters } from '@/lib/inventory-filters'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'RVs for Sale — Travel Trailers, Fifth Wheels, Motorhomes',
  description: `Shop new and used RVs at ${DEALER_INFO.shortName} in Jerome, Idaho. Travel trailers, fifth wheels, Class A/C motorhomes. Financing on-site. Serving Twin Falls, Burley, Boise.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/rvs` },
  openGraph: {
    title: 'RVs for Sale | Southern Idaho RV & Marine — Jerome, ID',
    description: 'Shop new and used RVs at Magic Valley\'s most trusted dealer. Travel trailers, fifth wheels, motorhomes. Financing available.',
    url: `https://${DEALER_INFO.domain}/rvs`,
    images: [{ url: '/og-rvs.jpg', width: 1200, height: 630, alt: 'RVs for Sale at Southern Idaho RV & Marine' }],
  },
}

export const revalidate = 600

const KNOWN_CATEGORIES = ['Travel Trailer', 'Fifth Wheel', 'Class A', 'Class B', 'Class C', 'Toy Hauler']

interface Props {
  searchParams: Promise<{ condition?: string; category?: string; sort?: string; brand?: string; priceMin?: string; priceMax?: string; lengthMin?: string; lengthMax?: string; paymentMin?: string; paymentMax?: string; sleepsMin?: string; sleepsMax?: string; slidesMin?: string; slidesMax?: string }>
}

export default async function RvsPage({ searchParams }: Props) {
  const params = await searchParams
  const condition = (params.condition as ConditionFilter) || 'All'
  const category = (params.category as RvCategory) || 'All'
  const sort = (params.sort as SortOption) || 'price-desc'
  const brand = params.brand || 'All'
  const num = (v?: string) => (v ? Number(v) : undefined)
  const priceMin = num(params.priceMin), priceMax = num(params.priceMax)
  const lengthMin = num(params.lengthMin), lengthMax = num(params.lengthMax)
  const paymentMin = num(params.paymentMin), paymentMax = num(params.paymentMax)
  const sleepsMin = num(params.sleepsMin), sleepsMax = num(params.sleepsMax)
  const slidesMin = num(params.slidesMin), slidesMax = num(params.slidesMax)

  const inventory = await getRvInventory()
  const filtered = applyExtraFilters(
    filterAndSortRvs(inventory, condition, category, sort, brand),
    { priceMin, priceMax, lengthMin, lengthMax, paymentMin, paymentMax, sleepsMin, sleepsMax, slidesMin, slidesMax },
  )
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
            RVs for Sale
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'oklch(80% 0.01 220)', maxWidth: 540, lineHeight: 1.6 }}>
            New and used travel trailers, fifth wheels, and motorhomes. Financing available on-site. Serving Magic Valley since 1993.
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
              priceMin={priceMin}
              priceMax={priceMax}
              lengthMin={lengthMin}
              lengthMax={lengthMax}
              paymentMin={paymentMin}
              paymentMax={paymentMax}
              sleepsMin={sleepsMin}
              sleepsMax={sleepsMax}
              slidesMin={slidesMin}
              slidesMax={slidesMax}
              showSpecFilters
              label="RVs"
            />
          </Suspense>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '0.5rem' }}>
              No RVs match these filters
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

        {/* Specs strip under grid */}
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
            name: 'RVs for Sale — Southern Idaho RV & Marine',
            url: `https://${DEALER_INFO.domain}/rvs`,
            numberOfItems: inventory.length,
          }),
        }}
      />
    </>
  )
}
