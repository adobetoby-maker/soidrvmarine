// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Location & Hours — Jerome, Idaho | Southern Idaho RV & Marine',
  description: `Visit ${DEALER_INFO.shortName} at ${DEALER_INFO.address}, Jerome, ID. Sales, parts, and service hours, directions, and a map to our lot off US-93.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/locations` },
  openGraph: {
    title: 'Location & Hours | Southern Idaho RV & Marine — Jerome, ID',
    description: `${DEALER_INFO.address}, Jerome, Idaho. Sales, parts, and service hours plus directions.`,
    url: `https://${DEALER_INFO.domain}/locations`,
  },
}

const DEPARTMENT_HOURS: { department: string; rows: { day: string; hours: string }[]; note: string }[] = [
  {
    department: 'Sales',
    rows: [
      { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
      { day: 'Saturday',         hours: '9:00 AM – 5:00 PM' },
      { day: 'Sunday',           hours: 'Closed' },
    ],
    note: 'Walk the lot anytime we’re open — no appointment needed to look.',
  },
  {
    department: 'Parts',
    rows: [
      { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
      { day: 'Saturday',         hours: '9:00 AM – 5:00 PM' },
      { day: 'Sunday',           hours: 'Closed' },
    ],
    note: 'Call ahead to confirm a part is in stock before you drive out.',
  },
  {
    department: 'Service',
    rows: [
      { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
      { day: 'Saturday',         hours: '9:00 AM – 5:00 PM' },
      { day: 'Sunday',           hours: 'Closed' },
    ],
    note: 'Service department hours may vary seasonally — call ahead to confirm availability for drop-offs.',
  },
]

const MAP_QUERY = encodeURIComponent(`${DEALER_INFO.address}, ${DEALER_INFO.city}, ${DEALER_INFO.state} ${DEALER_INFO.zip}`)

export default function LocationsPage() {
  return (
    <>
      {/* [DEMO] Parts and Service hours shown here assume parity with Sales hours — confirm actual department hours with dealer, they may differ */}
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            60 Bob Barton Road · Jerome, Idaho
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Our Location &amp; Hours
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65, marginBottom: '2rem' }}>
            One lot, off US-93 south of Jerome — easy access from Twin Falls, Gooding, and the rest of Magic Valley.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={DEALER_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Get Directions
            </a>
            <a
              href={DEALER_INFO.phoneHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              {DEALER_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Map embed */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 0' }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--color-parchment-dark)', height: 420 }}>
            <iframe
              title={`Map to ${DEALER_INFO.name}`}
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Address + department hours */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '2rem', alignItems: 'start' }}>

          {/* Address card */}
          <div style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 16, padding: '2rem' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.625rem' }}>Address</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.3, marginBottom: '0.375rem' }}>
              Southern Idaho RV &amp; Marine
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.65, marginBottom: '1rem' }}>
              {DEALER_INFO.address}<br />
              {DEALER_INFO.city}, {DEALER_INFO.state} {DEALER_INFO.zip}
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.65 }}>
              Off US-93, south of Jerome. Watch for our sign at the entrance — the lot sits back from the highway with plenty of room to pull a trailer around.
            </p>
          </div>

          {/* Department hours cards */}
          {DEPARTMENT_HOURS.map(dept => (
            <div key={dept.department} style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 16, padding: '2rem' }}>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.875rem' }}>{dept.department} Hours</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {dept.rows.map(row => (
                  <div key={row.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-parchment-dark)' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-navy)', fontWeight: 600 }}>{row.day}</span>
                    <span style={{ fontSize: '0.875rem', color: row.hours === 'Closed' ? '#94a3b8' : 'var(--color-sage)', fontVariantNumeric: 'tabular-nums' }}>{row.hours}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>{dept.note}</p>
            </div>
          ))}
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
            url: `https://${DEALER_INFO.domain}/locations`,
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
          }),
        }}
      />
    </>
  )
}
