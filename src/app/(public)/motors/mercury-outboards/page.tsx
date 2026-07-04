// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Mercury Outboard Motors — Factory-Direct Dealer Jerome, Idaho',
  description: `${DEALER_INFO.shortName} is Magic Valley's only factory-direct Mercury outboard dealer. New and in-stock motors, parts, and ASE-certified service in Jerome, Idaho.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/motors/mercury-outboards` },
  openGraph: {
    title: 'Mercury Outboards | Southern Idaho RV & Marine — Jerome, ID',
    description: "Magic Valley's only factory-direct Mercury dealer. New outboards, parts, factory-direct pricing.",
    url: `https://${DEALER_INFO.domain}/motors/mercury-outboards`,
  },
}

const MODELS = [
  { series: 'SeaPro',         range: '25–115 HP',   use: 'Commercial & Work',   note: 'Designed for demanding workloads. Preferred by guides and outfitters.' },
  { series: 'FourStroke',     range: '2.5–350 HP',  use: 'All-Purpose',         note: 'Clean, fuel-efficient power for any boat application.' },
  { series: 'Pro XS',         range: '150–200 HP',  use: 'Bass & Performance',  note: 'Competition-tuned. Hole-shot acceleration, top-end speed.' },
  { series: 'Verado',         range: '135–600 HP',  use: 'Premium / Offshore',  note: 'Supercharged inline-6. Whisper quiet at cruise.' },
  { series: 'Command Thrust', range: '40–150 HP',   use: 'Pontoon & Aluminum',  note: 'High-thrust gearcase designed for heavy loads and slow speeds.' },
]

const SERVICES = [
  { label: 'Factory Maintenance',  desc: 'Factory-scheduled service intervals for warranty compliance.' },
  { label: 'Winterization',        desc: 'Full winterization including fogging, flushing, and corrosion protection.' },
  { label: 'Spring Commissioning', desc: 'Tune-up, impeller inspection, gear oil, and test run before launch season.' },
  { label: 'Parts & Accessories',  desc: 'Genuine Mercury parts and accessories — in stock or ordered overnight.' },
  { label: 'Propeller Service',    desc: 'Prop repair, pitch changes, and stainless upgrades for performance.' },
  { label: 'Rigging & Installation', desc: 'New motor rigging, controls, gauges, and electrical — done right the first time.' },
]

export default function MercuryOutboardsPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', background: 'rgba(193, 122, 47, 0.15)', border: '1px solid rgba(193, 122, 47, 0.3)', borderRadius: 6, padding: '0.25rem 0.75rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-amber)" aria-hidden><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)' }}>
              Magic Valley's Factory-Direct Mercury Dealer
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Mercury Outboard Motors
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 580, lineHeight: 1.65, marginBottom: '2rem' }}>
            We are the only factory-direct Mercury dealer between Twin Falls and Boise. Factory-direct pricing, in-stock motors, genuine parts, and ASE-certified technicians.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={DEALER_INFO.phoneHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              {DEALER_INFO.phone}
            </a>
            <Link
              href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '0.75rem 1.5rem', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Why Mercury / factory-direct */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {[
            { icon: '★', label: 'Factory-Direct Pricing',  desc: 'No middleman markup. MSRP pricing with factory incentives passed directly to you.' },
            { icon: '✓', label: 'In-Stock Inventory',      desc: 'Motors in stock and ready to rig. No waiting weeks for a dealer transfer.' },
            { icon: '◆', label: 'Warranty Authorized',     desc: 'Full Mercury factory warranty honored and serviced here.' },
            { icon: '⊕', label: 'Dealer-Exclusive Parts',  desc: 'Genuine Mercury parts and Mercury Precision Lubricants — only available through authorized dealers.' },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ fontSize: '1.25rem', color: 'var(--color-amber)', marginBottom: '0.5rem', lineHeight: 1 }}>{item.icon}</p>
              <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem', marginBottom: '0.375rem' }}>{item.label}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Motor series */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
          What We Carry
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '2rem', lineHeight: 1.15 }}>
          Mercury Motor Series
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--color-parchment-dark)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--color-parchment-dark)' }}>
          {MODELS.map((m, i) => (
            <div key={m.series} style={{
              display: 'grid',
              gridTemplateColumns: '160px 110px 1fr',
              gap: '1rem',
              alignItems: 'center',
              background: i % 2 === 0 ? 'var(--color-parchment)' : 'white',
              padding: '1rem 1.25rem',
            }}>
              <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem' }}>{m.series}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-amber)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{m.range}</p>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-sage)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.125rem' }}>{m.use}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-navy)', lineHeight: 1.5 }}>{m.note}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--color-sage)' }}>
          Don't see your horsepower range? Call us — we can order any Mercury model direct from the factory.
        </p>
      </div>

      {/* Service */}
      <div style={{ background: 'var(--color-parchment)', padding: '3rem 1.5rem', borderTop: '1px solid var(--color-parchment-dark)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
            ASE-Certified Technicians
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '2rem', lineHeight: 1.15 }}>
            Mercury Service Center
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {SERVICES.map(s => (
              <div key={s.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-pine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden><polyline points="20 6 9 17 4 12"/></svg>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{s.label}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--color-navy)', borderRadius: 12, display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'white', fontWeight: 700, marginBottom: '0.25rem' }}>Ready to Schedule Service?</p>
              <p style={{ fontSize: '0.875rem', color: 'oklch(72% 0.01 220)' }}>Call ahead for a drop-off appointment. Most service completed within 3–5 business days.</p>
            </div>
            <a
              href={DEALER_INFO.phoneHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              {DEALER_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AutoDealer',
            name: DEALER_INFO.name,
            description: 'Factory-direct Mercury outboard motor dealer in Jerome, Idaho. Serving Magic Valley and the Snake River Plain.',
            brand: { '@type': 'Brand', name: 'Mercury Marine' },
            areaServed: ['Jerome', 'Twin Falls', 'Burley', 'Rupert', 'Magic Valley'],
          }),
        }}
      />
    </>
  )
}
