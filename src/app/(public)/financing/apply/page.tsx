// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'
import { FinanceForm } from './FinanceForm'

export const metadata: Metadata = {
  title: 'Financing Inquiry — Get Pre-Qualified | Southern Idaho RV & Marine',
  description: `Start your RV or boat financing inquiry with ${DEALER_INFO.shortName} in Jerome, Idaho. Not a credit application — a finance specialist follows up fast.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/financing/apply` },
  openGraph: {
    title: 'Financing Inquiry | Southern Idaho RV & Marine — Jerome, ID',
    description: 'Start your financing inquiry online. A finance specialist follows up with next steps — this is not a credit application.',
    url: `https://${DEALER_INFO.domain}/financing/apply`,
  },
}

export default function FinancingApplyPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Start Your Financing Inquiry
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Get Pre-Qualified
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            Tell us a bit about what you're looking for and how to reach you. A finance specialist calls you back — no credit pull, no paperwork yet.
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 16, padding: '2rem' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>Financing Inquiry</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
            We'll Call You Within One Business Day
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
            Prefer to talk now? Call <a href={DEALER_INFO.phoneHref} style={{ color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>{DEALER_INFO.phone}</a> during business hours.
          </p>

          <FinanceForm />
        </div>

        <p style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--color-sage)', lineHeight: 1.6, textAlign: 'center' }}>
          All financing is subject to credit approval. Rates and terms vary by lender, credit profile, and unit type. Not all applicants will qualify for advertised terms.
        </p>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FinancialService',
            name: `${DEALER_INFO.name} — Financing Inquiry`,
            description: 'Online financing inquiry form — not a credit application. A finance specialist follows up.',
            url: `https://${DEALER_INFO.domain}/financing/apply`,
            provider: { '@type': 'AutoDealer', name: DEALER_INFO.name },
          }),
        }}
      />
    </>
  )
}
