// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us — Southern Idaho RV & Marine | Jerome, Idaho',
  description: `Contact ${DEALER_INFO.shortName} in Jerome, Idaho. Call ${DEALER_INFO.phone}, get directions to 60 Bob Barton Road, or send us a message. Serving Magic Valley.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/contact` },
  openGraph: {
    title: 'Contact Southern Idaho RV & Marine | Jerome, ID',
    description: `Call, visit, or message us. ${DEALER_INFO.address}, Jerome, Idaho. ${DEALER_INFO.phone}.`,
    url: `https://${DEALER_INFO.domain}/contact`,
  },
}

const HOURS = [
  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Saturday',         hours: '9:00 AM – 5:00 PM' },
  { day: 'Sunday',           hours: 'Closed' },
]

interface Props {
  searchParams: Promise<{ unit?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams
  const unitRef = params.unit ?? null

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            60 Bob Barton Road · Jerome, Idaho
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 520, lineHeight: 1.65 }}>
            Call us, stop by, or send a message. We answer our own phone — no call centers, no hold queues.
          </p>
        </div>
      </div>

      {/* Quick contact bar */}
      <div style={{ background: 'var(--color-amber)', padding: '1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
          <a
            href={DEALER_INFO.phoneHref}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'white', color: 'var(--color-navy)', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontSize: '1rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
            {DEALER_INFO.phone}
          </a>
          <a
            href={`mailto:${DEALER_INFO.email}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontSize: '1rem', border: '1.5px solid rgba(255,255,255,0.35)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            {DEALER_INFO.email}
          </a>
          <a
            href={DEALER_INFO.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontSize: '1rem', border: '1.5px solid rgba(255,255,255,0.35)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Get Directions
          </a>
        </div>
      </div>

      {/* Main grid: info + inquiry form */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))', gap: '2.5rem', alignItems: 'start' }}>

        {/* Left: location + hours */}
        <div>
          {/* Unit reference banner */}
          {unitRef && (
            <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: 'oklch(97% 0.015 80)', border: '1.5px solid var(--color-amber)', borderRadius: 10, display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-navy)', lineHeight: 1.5 }}>
                <strong>Inquiring about unit #{unitRef}</strong> — mention this stock number when you reach us and we'll pull it up right away.
              </p>
            </div>
          )}

          {/* Address block */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.625rem' }}>Location</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.3, marginBottom: '0.375rem' }}>
              Southern Idaho RV &amp; Marine
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.65 }}>
              {DEALER_INFO.address}<br />
              {DEALER_INFO.city}, {DEALER_INFO.state} {DEALER_INFO.zip}
            </p>
            <a
              href={DEALER_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              Directions from Twin Falls
            </a>
          </div>

          {/* Hours */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.875rem' }}>Business Hours</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {HOURS.map(h => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-parchment-dark)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-navy)', fontWeight: 600 }}>{h.day}</span>
                  <span style={{ fontSize: '0.875rem', color: h.hours === 'Closed' ? '#94a3b8' : 'var(--color-sage)', fontVariantNumeric: 'tabular-nums' }}>{h.hours}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>
              Service department hours may vary. Call ahead to confirm availability for drop-offs.
            </p>
          </div>

          {/* Social + review links */}
          <div>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>Connect</p>
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
              <a href={DEALER_INFO.gbpUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 8, textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                Google Reviews
              </a>
              <a href={DEALER_INFO.fbUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 8, textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Right: inquiry card */}
        <div style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 16, padding: '2rem' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Send a Message</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
            We'll Respond Within One Business Day
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
            Prefer a call? Dial <a href={DEALER_INFO.phoneHref} style={{ color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>{DEALER_INFO.phone}</a> — we answer during business hours.
          </p>

          <ContactForm unitRef={unitRef} />
        </div>
      </div>

      {/* Map embed — real Google Maps iframe, no API key required */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '0 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--color-parchment-dark)', height: 320, position: 'relative' }}>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${DEALER_INFO.address}, ${DEALER_INFO.city}, ${DEALER_INFO.state} ${DEALER_INFO.zip}`)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map to ${DEALER_INFO.name} — ${DEALER_INFO.address}, ${DEALER_INFO.city}, ${DEALER_INFO.state}`}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <a
              href={DEALER_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none', fontSize: '0.875rem' }}
            >
              Open in Google Maps
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
            telephone: DEALER_INFO.phone,
            email: DEALER_INFO.email,
            url: `https://${DEALER_INFO.domain}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: DEALER_INFO.address,
              addressLocality: DEALER_INFO.city,
              addressRegion: DEALER_INFO.state,
              postalCode: DEALER_INFO.zip,
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: DEALER_INFO.lat,
              longitude: DEALER_INFO.lng,
            },
            openingHoursSpecification: [
              { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '18:00' },
              { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '17:00' },
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: DEALER_INFO.reviewScore,
              reviewCount: DEALER_INFO.reviewCount,
            },
          }),
        }}
      />
    </>
  )
}
