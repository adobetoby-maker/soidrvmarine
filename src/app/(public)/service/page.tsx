// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'
import { ServiceForm } from './ServiceForm'

export const metadata: Metadata = {
  title: 'RV & Boat Service Request — Southern Idaho RV & Marine',
  description: `Schedule maintenance, repair, or winterization for your RV or boat at ${DEALER_INFO.shortName} in Jerome, Idaho. Factory-direct Mercury service.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/service` },
  openGraph: {
    title: 'Service Request | Southern Idaho RV & Marine — Jerome, ID',
    description: 'Maintenance, repair, winterization, warranty work, and rigging for RVs, boats, and Mercury outboards.',
    url: `https://${DEALER_INFO.domain}/service`,
  },
}

const SERVICES = [
  { label: 'Routine Maintenance', desc: 'Oil changes, filters, inspections — keep your unit running right.' },
  { label: 'Winterization',        desc: 'Protect your RV or boat before the Idaho winter hits.' },
  { label: 'Warranty Work',        desc: 'Factory-authorized warranty repair on eligible units.' },
  { label: 'Rigging & Installation', desc: 'Mercury outboard rigging, electronics, and accessory installs.' },
]

export default function ServicePage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Maintenance · Repair · Winterization
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Schedule Service
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            Tell us what your RV, boat, or outboard needs and pick a drop-off date. Our service department confirms within one business day.
          </p>
        </div>
      </div>

      {/* Service types */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '1.75rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {SERVICES.map(s => (
            <div key={s.label} style={{ padding: '1.25rem', background: 'var(--color-parchment)', borderRadius: 10, border: '1px solid rgba(28,43,56,0.08)' }}>
              <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem', marginBottom: '0.375rem' }}>{s.label}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main: info + form */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Need It Sooner?</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.25, marginBottom: '0.75rem' }}>
            Call Our Service Department
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            Service department hours may vary from our sales floor — call ahead to confirm same-week availability.
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
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Request Service</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
            We'll Confirm a Drop-Off Time
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
            Give us the details below and we'll reach out to lock in a date.
          </p>
          <ServiceForm />
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'RV, Boat, and Mercury Outboard Service & Repair',
            provider: { '@type': 'AutoDealer', name: DEALER_INFO.name },
            areaServed: 'Magic Valley, Idaho',
            url: `https://${DEALER_INFO.domain}/service`,
          }),
        }}
      />
    </>
  )
}
