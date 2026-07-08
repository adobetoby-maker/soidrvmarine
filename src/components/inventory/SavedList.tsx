// Built by ATLAS — 2026-07-08
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { RV_INVENTORY, BOAT_INVENTORY } from '@/lib/inventory'
import { UnitCard } from '@/components/inventory/UnitCard'
import { CompareBar } from '@/components/inventory/CompareBar'
import { getList, subscribe } from '@/lib/shoplist'

const ALL = [...RV_INVENTORY, ...BOAT_INVENTORY]

export function SavedList() {
  const [slugs, setSlugs] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const sync = () => setSlugs(getList('favorites'))
    sync(); setReady(true)
    return subscribe(sync)
  }, [])

  const units = slugs.map((s) => ALL.find((u) => u.slug === s)).filter(Boolean) as typeof ALL

  if (ready && units.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '0.5rem' }}>
          You haven&rsquo;t saved anything yet
        </p>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', marginBottom: '1.5rem' }}>
          Tap the heart on any RV or boat to save it here for later.
        </p>
        <Link href="/rvs" style={{ display: 'inline-block', background: 'var(--color-amber)', color: '#fff', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}>
          Browse Inventory
        </Link>
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {units.map((unit) => (
          <UnitCard key={unit.slug} year={unit.year} make={unit.make} model={unit.model}
            type={unit.category} condition={unit.condition} price={unit.price ?? 0}
            callForPrice={unit.price === null} photo={unit.photo} slug={unit.slug} />
        ))}
      </div>
      <CompareBar />
    </>
  )
}
