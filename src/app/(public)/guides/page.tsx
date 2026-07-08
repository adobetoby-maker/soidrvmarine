// Built by ATLAS — 2026-07-08
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'RV & Boat Buying Guides | Southern Idaho RV & Marine',
  description: `Free RV and boat buying guides from ${DEALER_INFO.shortName} in Jerome, Idaho. How to choose, tow, finance, and enjoy your unit in the Magic Valley.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/guides` },
  openGraph: {
    title: 'RV & Boat Buying Guides | Southern Idaho RV & Marine — Jerome, ID',
    description: 'Straight-talk buying guides for RVs, boats, and financing. Written for Magic Valley buyers by a local Idaho dealer.',
    url: `https://${DEALER_INFO.domain}/guides`,
  },
}

const GUIDES = [
  {
    slug: 'rv-buyers-guide',
    kicker: 'RVs',
    title: "RV Buyer's Guide",
    desc: 'Travel trailer, fifth wheel, or motorhome? How to match an RV to your tow vehicle, what to check on used units, and Idaho winterizing basics.',
    readTime: '6 min read',
  },
  {
    slug: 'boat-buyers-guide',
    kicker: 'Boats',
    title: "Boat Buyer's Guide",
    desc: 'Pontoon, fishing, or sport boat? How to size an outboard, match a boat to Snake River and local reservoirs, and trailer it without the stress.',
    readTime: '6 min read',
  },
  {
    slug: 'financing-guide',
    kicker: 'Financing',
    title: 'RV & Boat Financing Guide',
    desc: 'How dealer financing actually works, what moves your rate, term lengths, trade-ins, and how to see your rate with a soft pull — no SSN required.',
    readTime: '5 min read',
  },
]

export default function GuidesIndexPage() {
  return (
    <>
      {/* Header */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Resources &middot; Buying Guides
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            RV &amp; Boat Buying Guides
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 620, lineHeight: 1.65 }}>
            No jargon, no pressure &mdash; just the questions a Magic Valley buyer should ask before signing anything. Written by the team at {DEALER_INFO.shortName} in Jerome, Idaho.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem 3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {GUIDES.map(g => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              style={{ display: 'flex', flexDirection: 'column', padding: '1.75rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 14, textDecoration: 'none' }}
            >
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>{g.kicker}</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, marginBottom: '0.625rem' }}>{g.title}</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.6, marginBottom: '1.25rem', flexGrow: 1 }}>{g.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-sage)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{g.readTime}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-ocean)' }}>
                  Read guide
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'RV & Boat Buying Guides',
            description: 'Buying guides for RVs, boats, and financing from Southern Idaho RV & Marine.',
            url: `https://${DEALER_INFO.domain}/guides`,
            itemListElement: GUIDES.map((g, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: g.title,
              url: `https://${DEALER_INFO.domain}/guides/${g.slug}`,
            })),
          }),
        }}
      />
    </>
  )
}
