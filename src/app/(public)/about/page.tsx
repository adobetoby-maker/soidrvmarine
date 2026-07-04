// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'About Us — Southern Idaho RV & Marine | Jerome, Idaho',
  description: `${DEALER_INFO.shortName} has served Jerome and the Magic Valley since 1993. Veteran-owned, 3rd-generation family dealership. RVs, boats, and Mercury outboards.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/about` },
  openGraph: {
    title: 'About Southern Idaho RV & Marine | Jerome, ID',
    description: 'Veteran-owned, family dealership since 1993. Jerome, Idaho\'s trusted source for RVs, boats, and Mercury outboards.',
    url: `https://${DEALER_INFO.domain}/about`,
  },
}

const MILESTONES = [
  { year: '1993', title: 'Founded in Jerome',         desc: 'Started with 12 travel trailers on a half-acre lot on Bob Barton Road. Family-run from day one.' },
  { year: '2001', title: 'Mercury Exclusive',          desc: 'Awarded factory-direct Mercury Marine dealership status — the only Mercury dealer in Magic Valley.' },
  { year: '2008', title: 'Service Center Opens',       desc: 'Built a full service bay staffed by ASE-certified technicians. In-house storage and winterization begin.' },
  { year: '2015', title: 'Veteran Certification',      desc: 'Formally certified as a Veteran-Owned Small Business (VOSB). Launched veteran purchasing programs.' },
  { year: '2019', title: '1,000 Reviews Milestone',    desc: 'Crossed 1,000 Google reviews — every one from a real Southern Idaho customer.' },
  { year: '2024', title: 'Third Generation',           desc: 'Third generation of the family takes on sales and operations. The work ethic travels with the family name.' },
]

const VALUES = [
  { title: 'Straight Talk',    desc: 'We tell you what fits your budget and lifestyle — not what earns us the biggest commission.' },
  { title: 'Service First',    desc: 'We service everything we sell. No sending you elsewhere. No excuses.' },
  { title: 'Community Root',   desc: 'We sponsor 4-H, FFA, and Magic Valley Rodeo. Jerome made us. We invest in Jerome.' },
  { title: 'Veteran Values',   desc: 'Mission focus. Follow-through. Accountability. That\'s how we run our dealership and our service bay.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Jerome, Idaho · Since 1993
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Southern Idaho&apos;s Trusted<br />RV &amp; Marine Dealer
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 560, lineHeight: 1.65 }}>
            Three generations. Thirty-two years. One address: 60 Bob Barton Road, Jerome, Idaho. We have sold and serviced more RVs and boats in Magic Valley than anyone else — and we still answer our own phone.
          </p>
        </div>
      </div>

      {/* Trust stats */}
      <div style={{ background: 'var(--color-amber)', padding: '1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', textAlign: 'center' }}>
          {[
            { value: '32+',   label: 'Years in Business' },
            { value: '1,247', label: 'Google Reviews' },
            { value: '4.6★',  label: 'Average Rating' },
            { value: '3',     label: 'Generations of Family' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'white', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{s.value}</p>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>Our Story</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Started with a Handshake and Twelve Travel Trailers
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.7, marginBottom: '1rem' }}>
            In 1993, a veteran with a half-acre lot and a belief that southern Idaho deserved a better dealership experience opened our doors. No fleets of salespeople. No high-pressure tactics. Just straight talk about what was on the lot.
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.7, marginBottom: '1rem' }}>
            Eight years in, Mercury Marine came calling. They needed a factory-direct dealer for Magic Valley — a dealer willing to hold real inventory and invest in certified technicians. We were the only call they needed to make.
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', lineHeight: 1.7 }}>
            Today, the third generation has grown up behind the counter and in the service bay. They learned from their grandfather that a reputation is built one customer at a time — and 1,247 Google reviews say it stuck.
          </p>
        </div>

        {/* Values */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {VALUES.map(v => (
            <div key={v.title} style={{ padding: '1.25rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 10, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 3, height: 40, background: 'var(--color-amber)', borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{v.title}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: 'var(--color-parchment)', borderTop: '1px solid var(--color-parchment-dark)', padding: '3.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>History</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: '2.5rem' }}>
            Thirty-Two Years, Six Milestones
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: '0 3rem' }}>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Continuous amber spine */}
              <div style={{ position: 'absolute', left: 7, top: 10, bottom: 10, width: 2, background: 'var(--color-amber)' }} />
              {MILESTONES.map(m => (
                <div key={m.year} style={{ position: 'relative', paddingLeft: '1.25rem', paddingBottom: '2rem' }}>
                  {/* Dot centered on spine (spine at left:7+1=8px from wrapper border; item starts at 32px padding; dot left = 8-5-32 = -29) */}
                  <div style={{ position: 'absolute', left: -29, top: 8, width: 10, height: 10, borderRadius: '50%', background: 'var(--color-amber)', border: '2px solid var(--color-parchment)', zIndex: 1 }} />
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-amber)', lineHeight: 1, marginBottom: '0.375rem', fontVariantNumeric: 'tabular-nums' }}>{m.year}</p>
                  <p style={{ fontWeight: 700, color: 'var(--color-navy)', fontSize: '0.9375rem', marginBottom: '0.375rem' }}>{m.title}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Veteran badge */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ background: 'var(--color-navy)', borderRadius: 16, padding: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
          <div style={{ width: 72, height: 72, background: 'rgba(193, 122, 47, 0.15)', border: '2px solid var(--color-amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Veteran-Owned Small Business</p>
            <p style={{ fontSize: '0.9375rem', color: 'oklch(72% 0.01 220)', lineHeight: 1.65, maxWidth: 600 }}>
              Certified VOSB under federal standards. Active duty, veterans, and their families receive exclusive pricing programs. Bring your DD-214 or military ID — ask us what&apos;s available.
            </p>
          </div>
          <a
            href={DEALER_INFO.phoneHref}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
            Ask About Veteran Pricing
          </a>
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
            foundingDate: '1993',
            description: 'Veteran-owned, family-operated RV and marine dealership in Jerome, Idaho since 1993.',
            numberOfEmployees: { '@type': 'QuantitativeValue', value: 12 },
            address: {
              '@type': 'PostalAddress',
              streetAddress: DEALER_INFO.address,
              addressLocality: DEALER_INFO.city,
              addressRegion: DEALER_INFO.state,
              postalCode: DEALER_INFO.zip,
            },
          }),
        }}
      />
    </>
  )
}
