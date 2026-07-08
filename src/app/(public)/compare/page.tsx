// Built by ATLAS — 2026-07-08
import type { Metadata } from 'next'
import { CompareTable } from '@/components/inventory/CompareTable'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Compare Units — Southern Idaho RV & Marine',
  description: 'Compare RVs and boats side by side at Southern Idaho RV & Marine.',
  robots: 'noindex',
}

export default function ComparePage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
            {DEALER_INFO.shortName}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1 }}>
            Compare Units
          </h1>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <CompareTable />
      </div>
    </>
  )
}
