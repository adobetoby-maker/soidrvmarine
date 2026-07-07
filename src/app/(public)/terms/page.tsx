// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Southern Idaho RV & Marine',
  description: `Terms and conditions for using the ${DEALER_INFO.name} website and doing business with our dealership in Jerome, Idaho.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/terms` },
  robots: { index: true, follow: true },
}

const SECTIONS = [
  {
    heading: '1. Acceptance of Terms',
    body: `By accessing or using ${DEALER_INFO.domain} (the "Site"), you agree to these Terms & Conditions. If you do not agree, please do not use the Site. We may update these terms at any time; continued use of the Site after changes means you accept the revised terms.`,
  },
  {
    heading: '2. Inventory & Pricing Accuracy',
    body: 'We make every effort to keep unit listings, pricing, specifications, and photos accurate and current. Units sell quickly and some information is supplied by manufacturers or a third-party dealer management system — errors can occur. Prices, availability, and specifications are subject to change without notice and do not constitute a binding offer. Please confirm exact pricing, availability, and unit condition with our sales team before making a purchase decision.',
  },
  {
    heading: '3. No Warranty on Website Content',
    body: 'The Site and its content are provided "as is" without warranties of any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.',
  },
  {
    heading: '4. Vehicle & Vessel Sales',
    body: 'All RV, boat, motor, and trailer sales are subject to a separate written purchase agreement executed in person or via our finance office. Nothing on this Site constitutes a binding sales contract, financing approval, or warranty of any unit\'s condition. Financing is subject to credit approval by our lending partners; terms vary by lender and applicant.',
  },
  {
    heading: '5. Intellectual Property',
    body: `All text, graphics, logos, and images on this Site are the property of ${DEALER_INFO.name} or its licensors and may not be copied, reproduced, or distributed without written permission.`,
  },
  {
    heading: '6. Third-Party Links',
    body: 'This Site may link to third-party websites (manufacturers, lenders, review platforms, social media). We do not control and are not responsible for the content or practices of those sites.',
  },
  {
    heading: '7. Limitation of Liability',
    body: `To the fullest extent permitted by law, ${DEALER_INFO.name} is not liable for any indirect, incidental, or consequential damages arising from your use of the Site or reliance on information found on it.`,
  },
  {
    heading: '8. Governing Law',
    body: 'These Terms are governed by the laws of the State of Idaho, without regard to its conflict-of-law provisions. Any dispute arising under these Terms will be resolved in the courts of Jerome County, Idaho.',
  },
  {
    heading: '9. Contact',
    body: `Questions about these Terms? Contact us at ${DEALER_INFO.email} or ${DEALER_INFO.phone}.`,
  },
]

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Legal
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            Last updated July 2026. Applies to your use of {DEALER_INFO.domain} and any inquiry or purchase made through {DEALER_INFO.shortName}.
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {SECTIONS.map(s => (
            <div key={s.heading}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.625rem' }}>{s.heading}</h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-parchment-dark)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/returns" style={{ fontSize: '0.875rem', color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>Return Policy →</Link>
          <Link href="/privacy" style={{ fontSize: '0.875rem', color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy →</Link>
          <Link href="/accessibility" style={{ fontSize: '0.875rem', color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>Accessibility →</Link>
        </div>
      </div>
    </>
  )
}
