// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: { default: 'Admin — SI RV & Marine', template: '%s | Admin' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Admin nav */}
      <header style={{
        background: '#1a1f2e',
        borderBottom: '1px solid #2d3748',
        padding: '0.875rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b' }}>
            {DEALER_INFO.shortName}
          </span>
          <span style={{ color: '#2d3748' }}>|</span>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94a3b8' }}>Ops Dashboard</span>
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <Link href="/admin" style={{ fontSize: '0.8125rem', color: '#94a3b8', textDecoration: 'none' }}>Status</Link>
          <Link href="/" style={{ fontSize: '0.8125rem', color: '#64748b', textDecoration: 'none' }}>← Public site</Link>
        </div>
      </header>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {children}
      </main>
    </div>
  )
}
