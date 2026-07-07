// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'
import { CareersForm } from './CareersForm'

export const metadata: Metadata = {
  title: 'Careers — Join Our Team | Southern Idaho RV & Marine',
  description: `Join the team at ${DEALER_INFO.shortName} in Jerome, Idaho. Sales, service, parts, and finance openings at Southern Idaho's only factory-direct Mercury dealer.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/careers` },
  openGraph: {
    title: 'Careers | Southern Idaho RV & Marine — Jerome, ID',
    description: `Join our team of ${DEALER_INFO.yearsInBusiness}+ years serving Magic Valley families.`,
    url: `https://${DEALER_INFO.domain}/careers`,
  },
}

const WHY_WORK_HERE = [
  { label: 'Locally Owned',    desc: `${DEALER_INFO.yearsInBusiness}+ years serving Magic Valley — not a corporate chain.` },
  { label: 'Veteran-Friendly', desc: 'Veterans Serving Idaho Families — we value discipline and service backgrounds.' },
  { label: 'Growing Business', desc: 'Southern Idaho\'s only factory-direct Mercury dealer, with room to grow.' },
]

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            {DEALER_INFO.heroLine}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Join Our Team
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            We're always looking for people who care about doing right by customers. Sales, service, parts, and finance roles open at our Jerome location.
          </p>
        </div>
      </div>

      {/* Why work here */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '1.75rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {WHY_WORK_HERE.map(w => (
            <div key={w.label} style={{ padding: '1.25rem', background: 'var(--color-parchment)', borderRadius: 10, border: '1px solid rgba(28,43,56,0.08)' }}>
              <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem', marginBottom: '0.375rem' }}>{w.label}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Application form */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 16, padding: '2rem' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Apply Now</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
            Employment Application
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
            Fill out the form below — we review every application personally.
          </p>

          <CareersForm />
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            title: 'Employment Opportunities',
            description: `Sales, service, parts, and finance positions at ${DEALER_INFO.name} in Jerome, Idaho.`,
            hiringOrganization: {
              '@type': 'Organization',
              name: DEALER_INFO.name,
              sameAs: `https://${DEALER_INFO.domain}`,
            },
            jobLocation: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                streetAddress: DEALER_INFO.address,
                addressLocality: DEALER_INFO.city,
                addressRegion: DEALER_INFO.state,
                postalCode: DEALER_INFO.zip,
                addressCountry: 'US',
              },
            },
          }),
        }}
      />
    </>
  )
}
