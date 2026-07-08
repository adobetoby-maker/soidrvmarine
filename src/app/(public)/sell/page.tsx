// Built by ATLAS — 2026-07-08
import type { Metadata } from 'next'
import { SellForm } from './SellForm'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Sell, Trade or Consign Your RV or Boat | Southern Idaho RV & Marine',
  description: `Trade toward a purchase, consign, or sell your RV or boat outright to ${DEALER_INFO.shortName} in Jerome, Idaho. Fast appraisal, three ways to cash out.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/sell` },
}

const LANES = [
  { title: 'Trade It In', desc: 'Apply your current RV or boat directly toward your next one. We appraise it on-site and roll the value into your deal &mdash; often the simplest, most tax-advantaged path.' },
  { title: 'Consign It', desc: 'Let us sell it for you. We market it across our channels, handle the calls and showings, and you get paid when it sells &mdash; no tire-kickers in your driveway.' },
  { title: 'Sell It Outright', desc: 'Want cash and done? We buy quality RVs and boats outright. Send us the details and we&rsquo;ll make you an offer, no purchase required.' },
]

export default function SellPage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Trade &middot; Consign &middot; Sell
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Three ways to cash out<br />your RV or boat
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            Trade it toward a purchase, let us consign it, or sell it to us outright. One form, fast appraisal, no obligation.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {LANES.map((l) => (
            <div key={l.title} style={{ padding: '1.5rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderTop: '3px solid var(--color-ocean)', borderRadius: 12 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-navy)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{l.title}</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-sage)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: l.desc }} />
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem', maxWidth: 640 }}>
          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Get Started</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: '1.25rem' }}>Tell us about your unit</h2>
            <SellForm />
          </div>
        </div>
      </div>
    </>
  )
}
