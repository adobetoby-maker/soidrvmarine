// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'
import { TradeInForm } from './TradeInForm'

export const metadata: Metadata = {
  title: 'Trade-In Valuation — Get Your RV or Boat’s Range | Southern Idaho RV & Marine',
  description: `Trading in an RV, boat, or outboard motor? Tell us about your unit and ${DEALER_INFO.shortName} in Jerome, Idaho will send a trade-in range within one business day.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/trade-in` },
  openGraph: {
    title: 'Trade-In Valuation | Southern Idaho RV & Marine — Jerome, ID',
    description: 'Get a trade-in range on your current RV, boat, or outboard motor. A specialist responds within one business day.',
    url: `https://${DEALER_INFO.domain}/trade-in`,
  },
}

const STEPS = [
  { step: '01', title: 'Tell Us About Your Unit', desc: 'Type, year, make, model, condition, and mileage or engine hours. Takes about two minutes.' },
  { step: '02', title: 'A Specialist Reviews It', desc: 'We compare it against current market data and our own lot needs — no lowball guesswork.' },
  { step: '03', title: 'Get Your Range', desc: 'We call or email with a trade-in range within one business day, before you ever step on the lot.' },
]

export default function TradeInPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Free · No Obligation · One Business Day
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            What&rsquo;s Your Trade-In Worth?
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            Tell us about your current RV, boat, or outboard motor and a specialist will send your trade-in range within one business day — before you ever drive out here.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {STEPS.map(s => (
              <div key={s.step} style={{ padding: '1.25rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 12 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-parchment-dark)', lineHeight: 1, marginBottom: '0.5rem', fontVariantNumeric: 'tabular-nums' }}>{s.step}</p>
                <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem', marginBottom: '0.375rem' }}>{s.title}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 16, padding: '2rem' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Trade-In Details</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
            Tell Us About Your Unit
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
            Prefer to talk it through? Call <a href={DEALER_INFO.phoneHref} style={{ color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>{DEALER_INFO.phone}</a> during business hours.
          </p>

          <TradeInForm />
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Trade-In Valuation',
            name: `${DEALER_INFO.name} — Trade-In Valuation`,
            description: 'Free trade-in valuation for RVs, boats, and outboard motors. Response within one business day.',
            url: `https://${DEALER_INFO.domain}/trade-in`,
            provider: { '@type': 'AutoDealer', name: DEALER_INFO.name },
          }),
        }}
      />
    </>
  )
}
