// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'RV & Boat Financing — On-Site Approval | Southern Idaho RV & Marine',
  description: `Finance your next RV or boat at ${DEALER_INFO.shortName} in Jerome, Idaho. On-site approval, competitive rates, and trade-ins welcome. Serving Magic Valley.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/financing` },
  openGraph: {
    title: 'RV & Boat Financing | Southern Idaho RV & Marine — Jerome, ID',
    description: 'On-site financing with competitive rates. Fast approval, trade-ins welcome, all credit situations considered. Jerome, Idaho.',
    url: `https://${DEALER_INFO.domain}/financing`,
  },
}

const STEPS = [
  { step: '01', title: 'Choose Your Unit',         desc: 'Browse RVs and boats online or come in. We help you find the right fit for your lifestyle and budget — no pressure.' },
  { step: '02', title: 'Apply In-Store',            desc: 'Fill out our credit application on-site. Takes about 10 minutes. We work with multiple lenders to find you the best rate.' },
  { step: '03', title: 'Get Your Answer Fast',      desc: 'Most approvals in 1–2 hours during business hours. We call you — you don\'t wait by the phone wondering.' },
  { step: '04', title: 'Drive or Trailer It Home',  desc: 'Sign docs, take delivery. We walk you through your new unit before you leave the lot.' },
]

const BENEFITS = [
  { label: 'Multiple Lenders',       desc: 'We shop your application across our lender network to get you the most competitive rate available.' },
  { label: 'Trade-Ins Welcome',      desc: 'Trading in your current RV or boat? We appraise it and apply it directly to your purchase.' },
  { label: 'All Credit Considered',  desc: 'Good credit, first-time buyer, or rebuilding — we have lender relationships for every situation.' },
  { label: 'Extended Warranties',    desc: 'Ask about extended service contracts that cover parts and labor beyond the factory warranty.' },
  { label: 'GAP Coverage',           desc: 'Protect yourself in case of a total loss — we offer GAP coverage through our finance partners.' },
  { label: 'No Prepayment Penalty',  desc: 'Pay off early whenever you\'re ready. Most of our lender agreements have no prepayment penalty.' },
]

export default function FinancingPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            On-Site · Fast · Competitive
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            RV &amp; Boat Financing<br />Made Simple
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65, marginBottom: '2rem' }}>
            We handle financing right here at the dealership. No trips to your bank. No waiting weeks. Most customers drive home the same day they apply.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={DEALER_INFO.phoneHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              Call to Get Started
            </a>
            <a
              href={DEALER_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              Visit Us In Jerome
            </a>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '1.75rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', textAlign: 'center' }}>
          {[
            { value: '1–2 hrs', label: 'Typical Approval Time' },
            { value: '10+',     label: 'Lender Partners' },
            { value: '0',       label: 'Prepayment Penalties' },
            { value: 'Same Day', label: 'Delivery Available' },
          ].map(s => (
            <div key={s.label} style={{ padding: '1rem', background: 'var(--color-parchment)', borderRadius: 10, border: '1px solid rgba(28,43,56,0.08)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{s.value}</p>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-sage)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.375rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Process</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: '2.5rem' }}>
          How It Works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {STEPS.map(s => (
            <div key={s.step} style={{ padding: '1.5rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 12 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-parchment-dark)', lineHeight: 1, marginBottom: '0.75rem', fontVariantNumeric: 'tabular-nums' }}>{s.step}</p>
              <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '1rem', marginBottom: '0.5rem' }}>{s.title}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits grid */}
      <div style={{ background: 'var(--color-parchment)', borderTop: '1px solid var(--color-parchment-dark)', padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Why Finance Here</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: '2rem' }}>
            Dealer Financing Advantages
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {BENEFITS.map(b => (
              <div key={b.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-pine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden><polyline points="20 6 9 17 4 12"/></svg>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{b.label}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer + CTA */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ background: 'var(--color-navy)', borderRadius: 16, padding: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>Ready to Apply?</p>
            <p style={{ fontSize: '0.875rem', color: 'oklch(72% 0.01 220)', lineHeight: 1.65, maxWidth: 520 }}>
              Stop in or call during business hours. Bring your driver's license and insurance information. We'll handle the rest.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={DEALER_INFO.phoneHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              {DEALER_INFO.phone}
            </a>
          </div>
        </div>
        <p style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--color-sage)', lineHeight: 1.6 }}>
          All financing is subject to credit approval. Rates and terms vary by lender, credit profile, and unit type. Contact us for current offers. Not all applicants will qualify for advertised terms.
        </p>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FinancialService',
            name: `${DEALER_INFO.name} — Financing`,
            description: 'On-site RV and boat financing. Competitive rates, multiple lenders, trade-ins welcome.',
            url: `https://${DEALER_INFO.domain}/financing`,
            provider: { '@type': 'AutoDealer', name: DEALER_INFO.name },
          }),
        }}
      />
    </>
  )
}
