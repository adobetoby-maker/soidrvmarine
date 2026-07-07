// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Privacy Policy — Southern Idaho RV & Marine',
  description: `Privacy policy for ${DEALER_INFO.name}. Learn how we collect and use your information.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/privacy` },
}

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1.5rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', marginBottom: '2.5rem' }}>
        Last updated: July 4, 2026
      </p>

      {[
        {
          title: 'Information We Collect',
          body: `When you contact us, request a quote, or submit a financing inquiry, we collect information you provide: name, phone number, email address, and details about the unit you are interested in. We also collect standard web analytics data (page visits, referral source) to understand how visitors use our site.`,
        },
        {
          title: 'How We Use Your Information',
          body: `We use your information solely to respond to your inquiries, provide financing pre-qualification, and follow up on inventory you have expressed interest in. We do not sell your personal information to third parties. We do not send unsolicited marketing emails.`,
        },
        {
          title: 'Cookies',
          body: process.env.NEXT_PUBLIC_GA4_ID
            ? `Our website uses cookies for basic analytics (Google Analytics 4). These cookies collect anonymized data about site usage. You may disable cookies in your browser settings. We do not use advertising or tracking cookies beyond standard GA4.`
            : `Our website does not currently run any analytics or tracking cookies. If that changes, this policy will be updated to describe what is collected and why.`,
        },
        {
          title: 'Data Retention',
          body: `Inquiry data is retained for up to 24 months or until the transaction is complete, whichever is longer. You may request deletion of your data at any time by contacting us by phone or email.`,
        },
        {
          title: 'Third-Party Services',
          body: `Our site may link to third-party platforms including Google Maps, RV Trader, Boat Trader, and Facebook. Those platforms have their own privacy policies. We are not responsible for their practices.`,
        },
        {
          title: 'Contact Us',
          body: `Questions about this policy? Reach us at:\n\n${DEALER_INFO.name}\n${DEALER_INFO.address}, ${DEALER_INFO.city}, ${DEALER_INFO.state} ${DEALER_INFO.zip}\nPhone: ${DEALER_INFO.phone}\nEmail: ${DEALER_INFO.email}`,
        },
      ].map(section => (
        <section key={section.title} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-parchment-dark)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
            {section.title}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
            {section.body}
          </p>
        </section>
      ))}
    </div>
  )
}
