// Built by ATLAS — 2026-07-08
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { RV_INVENTORY, BOAT_INVENTORY, type InventoryUnit } from '@/lib/inventory'
import { estimateMonthlyPayment } from '@/lib/inventory-filters'
import { getList, toggle, clear, subscribe } from '@/lib/shoplist'

const ALL = [...RV_INVENTORY, ...BOAT_INVENTORY]
const usd = (n?: number | null) => (n == null ? '—' : `$${n.toLocaleString()}`)

type Row = { label: string; get: (u: InventoryUnit) => string }
const ROWS: Row[] = [
  { label: 'Price', get: (u) => (u.price == null ? 'Call' : usd(u.price)) },
  { label: 'Est. payment', get: (u) => { const p = estimateMonthlyPayment(u.price); return p == null ? '—' : `$${p.toLocaleString()}/mo` } },
  { label: 'Condition', get: (u) => u.condition },
  { label: 'Type', get: (u) => u.category },
  { label: 'Year', get: (u) => String(u.year) },
  { label: 'Length', get: (u) => (u.lengthFt ? `${u.lengthFt} ft` : '—') },
  { label: 'Sleeps', get: (u) => (u.sleeps ? String(u.sleeps) : '—') },
  { label: 'Slide-outs', get: (u) => (u.slideOuts != null ? String(u.slideOuts) : '—') },
  { label: 'Stock #', get: (u) => u.stockNumber ?? '—' },
]

export function CompareTable() {
  const [slugs, setSlugs] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const sync = () => setSlugs(getList('compare'))
    sync(); setReady(true)
    return subscribe(sync)
  }, [])

  const units = slugs.map((s) => ALL.find((u) => u.slug === s)).filter(Boolean) as InventoryUnit[]

  if (ready && units.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '0.5rem' }}>
          Nothing to compare yet
        </p>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', marginBottom: '1.5rem' }}>
          Tap &ldquo;+ Compare&rdquo; on up to four RVs or boats and see them side by side here.
        </p>
        <Link href="/rvs" style={{ display: 'inline-block', background: 'var(--color-amber)', color: '#fff', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}>
          Browse Inventory
        </Link>
      </div>
    )
  }

  const cell: React.CSSProperties = { padding: '0.7rem 0.9rem', borderBottom: '1px solid var(--color-parchment-dark)', fontSize: '0.875rem', verticalAlign: 'top', minWidth: 160 }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
        <button onClick={() => clear('compare')} style={{ background: 'transparent', border: '1px solid var(--color-parchment-dark)', color: 'var(--color-navy)', borderRadius: 8, padding: '0.4rem 0.9rem', fontWeight: 600, fontSize: '0.8125rem', cursor: 'pointer' }}>
          Clear all
        </button>
      </div>
      <div style={{ overflowX: 'auto', border: '1px solid var(--color-parchment-dark)', borderRadius: 12, background: 'var(--color-parchment)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...cell, textAlign: 'left', background: 'var(--color-parchment-dark)', position: 'sticky', left: 0 }}></th>
              {units.map((u) => (
                <th key={u.slug} style={{ ...cell, textAlign: 'left', background: 'var(--color-parchment-dark)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.photo} alt={`${u.year} ${u.make} ${u.model}`} style={{ width: '100%', maxWidth: 200, aspectRatio: '4/3', objectFit: 'cover', borderRadius: 8, display: 'block', marginBottom: 8, background: 'var(--color-navy)' }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem', lineHeight: 1.25 }}>{u.year} {u.make} {u.model}</div>
                  <button onClick={() => toggle('compare', u.slug)} style={{ marginTop: 6, background: 'transparent', border: 'none', color: 'var(--color-amber-dark)', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Remove</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label}>
                <td style={{ ...cell, fontWeight: 700, color: 'var(--color-sage)', textTransform: 'uppercase', fontSize: '0.6875rem', letterSpacing: '0.06em', background: 'var(--color-parchment)', position: 'sticky', left: 0 }}>{r.label}</td>
                {units.map((u) => (
                  <td key={u.slug} style={{ ...cell, color: 'var(--color-navy)', fontVariantNumeric: 'tabular-nums' }}>{r.get(u)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td style={{ ...cell, background: 'var(--color-parchment)', position: 'sticky', left: 0 }}></td>
              {units.map((u) => (
                <td key={u.slug} style={cell}>
                  <Link href={`/inventory/${u.slug}`} style={{ display: 'inline-block', background: 'var(--color-navy)', color: '#fff', fontWeight: 700, fontSize: '0.8125rem', padding: '0.5rem 1rem', borderRadius: 8, textDecoration: 'none' }}>View details</Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
