// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'RV & Boat Storage — Jerome, Idaho | Southern Idaho RV & Marine',
  description: `Secure on-site RV and boat storage at ${DEALER_INFO.shortName} in Jerome, Idaho. Monthly rates, fenced lot, easy load-in/load-out. Serving Magic Valley.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/storage` },
  openGraph: {
    title: 'RV & Boat Storage | Southern Idaho RV & Marine — Jerome, ID',
    description: 'Secure on-site storage for RVs and boats in Jerome, Idaho. Fenced lot, easy access, monthly rates.',
    url: `https://${DEALER_INFO.domain}/storage`,
  },
}

const INCLUDED = [
  { title: 'Fenced, Gated Lot',        desc: 'Our storage yard sits behind the same fence line as the dealership — not a separate unmonitored field.' },
  { title: 'Easy Load-In / Load-Out',  desc: 'Wide gravel lanes sized for full-length travel trailers and dual-axle boat trailers. No tight turns, no backing through mud.' },
  { title: 'On-Site During Business Hours', desc: 'Staff on the property during business hours — someone is here to notice if something looks wrong.' },
  { title: 'Month-to-Month',           desc: 'No long-term contract required. Pay monthly, leave whenever your unit is back on the road or water.' },
  { title: 'Winterization Add-On',     desc: 'Ask our service department to winterize your RV or boat before it goes into storage for the season.' },
]

export default function StoragePage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            On-Site · Fenced · Month-to-Month
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            RV &amp; Boat Storage<br />Right Here in Jerome
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65, marginBottom: '2rem' }}>
            No room in the driveway? No problem. Store your RV or boat on our fenced lot at 60 Bob Barton Road — close enough to check on, secure enough not to worry about.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={DEALER_INFO.phoneHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              Call About Storage
            </a>
            <Link
              href="/service"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              Ask About Winterization
            </Link>
          </div>
        </div>
      </div>

      {/* Rate card */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Pricing</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
              One Simple Monthly Rate
            </h2>
            <div style={{ background: 'var(--color-navy)', borderRadius: 16, padding: '2rem', marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'white', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                $75<span style={{ fontSize: '1rem', fontWeight: 600, color: 'oklch(72% 0.01 220)' }}>/mo</span>
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'oklch(72% 0.01 220)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                Standard outdoor storage space, per unit, billed monthly. {/* [DEMO] confirm current storage rate with dealer — advertised rate as of last audit */}
              </p>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.65 }}>
              Rate applies to a single RV or boat and trailer combination. Oversized units, indoor/covered space, or long-term contracts may be priced differently — call for an exact quote on your unit.
            </p>
          </div>

          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>What&apos;s Included</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              What You Get
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
              {INCLUDED.map(item => (
                <div key={item.title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ocean)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden><polyline points="20 6 9 17 4 12"/></svg>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{item.title}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 16, padding: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'var(--color-navy)', fontWeight: 700, marginBottom: '0.5rem' }}>Ready to Reserve a Space?</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.65, maxWidth: 520 }}>
              Call or stop by 60 Bob Barton Road. We&apos;ll walk the lot with you and confirm space for your unit&apos;s length.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={DEALER_INFO.phoneHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}
            >
              {DEALER_INFO.phone}
            </a>
            <Link
              href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '1.5px solid var(--color-navy)', color: 'var(--color-navy)', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}
            >
              Send a Message
            </Link>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'RV and Boat Storage',
            provider: { '@type': 'AutoDealer', name: DEALER_INFO.name },
            areaServed: 'Jerome, Idaho',
            url: `https://${DEALER_INFO.domain}/storage`,
            offers: {
              '@type': 'Offer',
              price: '75',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '75',
                priceCurrency: 'USD',
                billingIncrement: 1,
                unitCode: 'MON',
              },
            },
          }),
        }}
      />
    </>
  )
}
