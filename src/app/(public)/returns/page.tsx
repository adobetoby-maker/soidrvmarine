// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Return Policy | Southern Idaho RV & Marine',
  description: `Return and restocking policy for parts, accessories, and merchandise purchased at ${DEALER_INFO.name} in Jerome, Idaho.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/returns` },
  robots: { index: true, follow: true },
}

const POLICY_POINTS = [
  { title: '30-Day Return Window',      desc: 'Unused, unopened parts and accessories may be returned within 30 days of purchase with the original receipt.' },
  { title: '15% Restocking Fee',        desc: 'A 15% restocking fee applies to returned parts and accessories, deducted from the refund amount.' },
  { title: 'Original Condition Required', desc: 'Items must be returned in original packaging, unused, and in resalable condition. Installed or used parts cannot be returned.' },
  { title: 'Special-Order Parts',       desc: 'Parts special-ordered for your unit are non-returnable once ordered, unless the part arrives defective or incorrect.' },
  { title: 'Units (RVs, Boats, Motors)', desc: 'Vehicle and vessel sales are final once the purchase agreement is signed and delivery is accepted, except as required by manufacturer warranty or applicable law.' },
  { title: 'Defective Merchandise',     desc: 'Defective parts are covered by the manufacturer\'s warranty, not this return policy. Bring the item in and we\'ll process the warranty claim for you.' },
]

export default function ReturnsPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Legal
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Return Policy
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            Our policy on returning parts and accessories purchased from {DEALER_INFO.shortName}.
          </p>
        </div>
      </div>

      {/* Quick summary card */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem 1rem' }}>
        <div style={{ background: 'var(--color-parchment)', border: '1.5px solid var(--color-amber)', borderRadius: 16, padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1 }}>30 Days</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', marginTop: '0.375rem' }}>Return window from date of purchase</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1 }}>15%</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', marginTop: '0.375rem' }}>Restocking fee on eligible returns</p>
          </div>
        </div>
        <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-sage)' }}>
          {/* [DEMO] confirm exact return window and restocking fee percentage with dealer before publishing live */}
        </p>
      </div>

      {/* Policy details */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem 3.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {POLICY_POINTS.map(p => (
            <div key={p.title} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ocean)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }} aria-hidden><polyline points="20 6 9 17 4 12"/></svg>
              <div>
                <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '1rem', marginBottom: '0.25rem' }}>{p.title}</p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 12 }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-navy)', lineHeight: 1.65 }}>
            Questions about a return or a specific part? Call our parts counter at{' '}
            <a href={DEALER_INFO.phoneHref} style={{ color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>{DEALER_INFO.phone}</a>{' '}
            — we&apos;ll walk you through it before you make the trip.
          </p>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-parchment-dark)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/terms" style={{ fontSize: '0.875rem', color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>Terms &amp; Conditions →</Link>
          <Link href="/parts" style={{ fontSize: '0.875rem', color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>Request Parts →</Link>
        </div>
      </div>
    </>
  )
}
