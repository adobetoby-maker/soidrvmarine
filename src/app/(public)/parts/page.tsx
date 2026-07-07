// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'
import { PartsForm } from './PartsForm'

export const metadata: Metadata = {
  title: 'RV & Boat Parts Request — Southern Idaho RV & Marine',
  description: `Request RV, boat, and Mercury outboard parts from ${DEALER_INFO.shortName} in Jerome, Idaho. Tell us what you need — our parts department follows up fast.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/parts` },
  openGraph: {
    title: 'Parts Request | Southern Idaho RV & Marine — Jerome, ID',
    description: 'Request RV, boat, and Mercury outboard parts. We source from our supplier network and Mercury factory-direct.',
    url: `https://${DEALER_INFO.domain}/parts`,
  },
}

const CATEGORIES = [
  { label: 'RV Parts',        desc: 'Appliances, awnings, slide-out hardware, plumbing, electrical, and more.' },
  { label: 'Boat Parts',      desc: 'Hull hardware, trailer parts, upholstery, electronics, and rigging.' },
  { label: 'Mercury Outboard', desc: 'Factory-direct Mercury parts and accessories — props, lower units, controls.' },
]

export default function PartsPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            RV · Boat · Mercury Outboard
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Parts Request
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            Tell us what you need — model, part number if you have it, or just describe the problem. As a factory-direct Mercury dealer we can usually source it fast.
          </p>
        </div>
      </div>

      {/* Category cards */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '1.75rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {CATEGORIES.map(c => (
            <div key={c.label} style={{ padding: '1.25rem', background: 'var(--color-parchment)', borderRadius: 10, border: '1px solid rgba(28,43,56,0.08)' }}>
              <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem', marginBottom: '0.375rem' }}>{c.label}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main: info + form */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Need It Faster?</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.25, marginBottom: '0.75rem' }}>
            Call Our Parts Department
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            For urgent needs, a phone call is fastest — we can check stock while you're on the line.
          </p>
          <a
            href={DEALER_INFO.phoneHref}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
            {DEALER_INFO.phone}
          </a>
        </div>

        <div style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 16, padding: '2rem' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Request a Part</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
            We'll Respond Within One Business Day
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
            The more detail you give us, the faster we can confirm availability and price.
          </p>
          <PartsForm />
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'RV, Boat, and Mercury Outboard Parts',
            provider: { '@type': 'AutoDealer', name: DEALER_INFO.name },
            areaServed: 'Magic Valley, Idaho',
            url: `https://${DEALER_INFO.domain}/parts`,
          }),
        }}
      />
    </>
  )
}
