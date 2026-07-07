// Built by ATLAS — 2026-07-07
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
import { getPowersportsInventory } from '@/lib/db'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Powersports for Sale — ATVs, UTVs & More',
  description: `Shop powersports inventory at ${DEALER_INFO.shortName} in Jerome, Idaho. ATVs, UTVs, and more. On-site financing. Serving Twin Falls, Burley, and Magic Valley.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/powersports` },
  openGraph: {
    title: 'Powersports | Southern Idaho RV & Marine — Jerome, ID',
    description: 'Shop powersports inventory at Magic Valley\'s trusted dealer. Financing available.',
    url: `https://${DEALER_INFO.domain}/powersports`,
  },
}

export const revalidate = 600

interface Props {
  searchParams: Promise<{ condition?: string; category?: string; sort?: string; brand?: string }>
}

export default async function PowersportsPage({ searchParams }: Props) {
  const params = await searchParams
  const condition = (params.condition as ConditionFilter) || 'All'
  const category = (params.category as RvCategory) || 'All'
  const sort = (params.sort as SortOption) || 'price-desc'
  const brand = params.brand || 'All'

  const inventory = await getPowersportsInventory()
  const filtered = filterAndSortRvs(inventory, condition, category, sort, brand)
  const allCategories = [...new Set(inventory.map(u => u.category))].sort()
  const allBrands = [...new Set(inventory.map(u => u.make))].sort()

  return (
    <>
      {/* Page header */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
            Jerome, Idaho
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Powersports
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'oklch(80% 0.01 220)', maxWidth: 540, lineHeight: 1.6 }}>
            ATVs, UTVs, and more for Idaho trails and backcountry. Financing available on-site. Serving Magic Valley since 1993.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {inventory.length > 0 && (
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
                label="units"
              />
            </Suspense>
          </div>
        )}

        {/* Grid / empty state */}
        {inventory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 12 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '0.75rem' }}>
              New Powersports Inventory Coming Soon
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', maxWidth: 480, margin: '0 auto 1.5rem', lineHeight: 1.65 }}>
              We&apos;re expanding our powersports lineup. Call us to ask about upcoming ATV and UTV arrivals, or let us know what you&apos;re looking for and we&apos;ll reach out the moment it lands.
            </p>
            <a
              href={DEALER_INFO.phoneHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              {DEALER_INFO.phone}
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '0.5rem' }}>
              No units match these filters
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
            name: 'Powersports — Southern Idaho RV & Marine',
            url: `https://${DEALER_INFO.domain}/powersports`,
            numberOfItems: inventory.length,
          }),
        }}
      />
    </>
  )
}
