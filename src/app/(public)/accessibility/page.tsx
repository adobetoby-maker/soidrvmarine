// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Accessibility Statement | Southern Idaho RV & Marine',
  description: `${DEALER_INFO.name}'s commitment to a website accessible to all visitors, including those using assistive technology. Report an issue and we'll fix it.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/accessibility` },
  robots: { index: true, follow: true },
}

const COMMITMENTS = [
  { title: 'Ongoing Effort',        desc: 'We are actively working to increase the accessibility and usability of our website and follow available accessibility standards, including the Web Content Accessibility Guidelines (WCAG).' },
  { title: 'Keyboard Navigation',    desc: 'We aim to ensure all interactive elements — menus, forms, buttons — can be reached and operated using a keyboard alone.' },
  { title: 'Readable Text & Contrast', desc: 'We use legible type sizes and color contrast intended to be readable for visitors with low vision.' },
  { title: 'Alt Text on Images',      desc: 'We strive to provide descriptive alternative text for meaningful images, including unit photos.' },
  { title: 'Assistive Technology',    desc: 'We test with common assistive technologies where practical and welcome feedback from visitors using screen readers or other tools.' },
]

export default function AccessibilityPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Legal
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Accessibility Statement
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            {DEALER_INFO.shortName} is committed to making {DEALER_INFO.domain} usable for every visitor, regardless of ability.
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.75, marginBottom: '2rem' }}>
          We want every visitor — including people who use screen readers, screen magnification, voice control, or keyboard-only navigation — to be able to browse our inventory, read about our dealership, and reach us. Accessibility is an ongoing effort, not a one-time fix, and we continue to review and improve the site.
        </p>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '1.25rem' }}>
          Our Commitments
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {COMMITMENTS.map(c => (
            <div key={c.title} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-pine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }} aria-hidden><polyline points="20 6 9 17 4 12"/></svg>
              <div>
                <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{c.title}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback CTA */}
        <div style={{ background: 'var(--color-navy)', borderRadius: 16, padding: '2rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'white', fontWeight: 700, marginBottom: '0.625rem' }}>
            Found an Accessibility Barrier?
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'oklch(78% 0.01 220)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            If you encounter a page or feature that&apos;s difficult to use with assistive technology, tell us. Include the page and what happened, and we&apos;ll look into it.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              Send Accessibility Feedback
            </Link>
            <a
              href={DEALER_INFO.phoneHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}
            >
              {DEALER_INFO.phone}
            </a>
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-parchment-dark)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/terms" style={{ fontSize: '0.875rem', color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>Terms &amp; Conditions →</Link>
          <Link href="/privacy" style={{ fontSize: '0.875rem', color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy →</Link>
        </div>
      </div>
    </>
  )
}
