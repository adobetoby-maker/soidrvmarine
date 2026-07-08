// Built by ATLAS — 2026-07-08
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: "RV Buyer's Guide for Idaho | Southern Idaho RV & Marine",
  description: 'Travel trailer vs fifth wheel vs motorhome, matching an RV to your tow vehicle, new vs used, and Idaho winterizing. A plain-English guide for Magic Valley buyers.',
  alternates: { canonical: `https://${DEALER_INFO.domain}/guides/rv-buyers-guide` },
  openGraph: {
    title: "RV Buyer's Guide for Idaho | Southern Idaho RV & Marine",
    description: 'How to choose the right RV, match it to your tow vehicle, and get it ready for Idaho winters. From your local Jerome dealer.',
    url: `https://${DEALER_INFO.domain}/guides/rv-buyers-guide`,
  },
}

const H2 = { fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, margin: '2.25rem 0 0.75rem' } as const
const P = { fontSize: '1rem', color: 'var(--color-sage)', lineHeight: 1.75, marginBottom: '1rem' } as const
const LI = { fontSize: '1rem', color: 'var(--color-sage)', lineHeight: 1.7, marginBottom: '0.5rem' } as const

export default function RvBuyersGuidePage() {
  return (
    <>
      {/* Header */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            <Link href="/guides" style={{ color: 'var(--color-amber)', textDecoration: 'none' }}>Guides</Link> &middot; RVs
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.2vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            The Idaho RV Buyer&rsquo;s Guide
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 620, lineHeight: 1.65 }}>
            Which RV fits your family, your truck, and your budget &mdash; and how to buy one without any surprises. Written for Magic Valley buyers.
          </p>
        </div>
      </div>

      {/* Article body */}
      <article style={{ maxWidth: 820, margin: '0 auto', padding: '2.5rem 1.5rem 1rem' }}>
        <p style={P}>
          Buying an RV is a bigger decision than buying a car, and the right choice depends less on which unit looks best on the lot and more on how you&rsquo;ll actually use it. Weekend trips to Redfish Lake ask for something different than a snowbird run to Arizona. Here is how we walk local buyers through it.
        </p>

        <h2 style={H2}>Travel Trailer vs. Fifth Wheel vs. Motorhome</h2>
        <p style={P}>
          Almost every RV falls into one of three families. Start here, because it narrows everything else.
        </p>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Travel trailers</strong> are the most popular for good reason: they are the most affordable way into RVing, they cover a huge range of sizes (from 16&nbsp;ft you can tow with a mid-size SUV up to 35&nbsp;ft), and you unhitch at camp and keep your tow vehicle for errands. The trade-off is that longer trailers can sway and take practice to back up.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Fifth wheels</strong> hitch to a puck in the bed of a pickup, which puts the pivot point over the rear axle. That makes them far more stable to tow and easier to maneuver than a long travel trailer of the same length. They also give you the most living space and residential-style interiors. The catch: you need a capable pickup, and you lose your truck bed.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Motorhomes</strong> (Class&nbsp;A, B, and C) are self-powered &mdash; drive and camp in one unit, no towing. Class&nbsp;B camper vans are nimble and easy to park; Class&nbsp;C is the family sweet spot; Class&nbsp;A is the big-rig experience. Motorhomes cost the most up front and add engine and chassis maintenance, and you&rsquo;ll usually want to tow a small car for day trips.</li>
        </ul>
        <p style={P}>
          Rule of thumb: if you already own a capable truck, a fifth wheel gives you the most comfort per dollar. If you want the lowest entry cost and flexibility, start with a travel trailer. If you never want to tow anything, look at a Class&nbsp;C.
        </p>

        <h2 style={H2}>Match the RV to Your Tow Vehicle (This Is the Big One)</h2>
        <p style={P}>
          The single most common mistake we see is buying a trailer the tow vehicle can&rsquo;t safely pull. It is also the easiest to avoid &mdash; the numbers are printed right on your vehicle.
        </p>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Tow rating</strong> is the max weight your vehicle can pull, listed in the owner&rsquo;s manual or on the manufacturer&rsquo;s towing chart for your exact configuration.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>GVWR</strong> (Gross Vehicle Weight Rating) is the most weight the loaded vehicle itself can carry. <strong style={{ color: 'var(--color-navy)' }}>GCWR</strong> (Gross Combined Weight Rating) is the most the truck and trailer can weigh together, loaded.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Tongue / pin weight</strong> is the downward load the trailer puts on the hitch &mdash; roughly 10&ndash;15% of trailer weight for a travel trailer, 15&ndash;25% for a fifth wheel. This counts against your truck&rsquo;s payload.</li>
        </ul>
        <p style={P}>
          The key move: compare the RV&rsquo;s <em>loaded</em> weight, not its dry weight. A trailer with a 6,000&nbsp;lb dry weight can easily hit 7,500&nbsp;lb once you add water, propane, gear, and food. Aim to stay under about 80% of your tow rating for comfortable, safe towing over Idaho&rsquo;s grades &mdash; that margin is what keeps you relaxed on a mountain pass, not white-knuckled. Bring your vehicle&rsquo;s year, make, model, and package when you come in and we&rsquo;ll pull the exact numbers with you.
        </p>

        <h2 style={H2}>New vs. Used</h2>
        <p style={P}>
          New units come with a full factory warranty, the latest floorplans, and no history to worry about &mdash; you pay for that in a steeper first-year depreciation. Used units let someone else absorb that drop and stretch your budget further, but the inspection matters more.
        </p>
        <p style={P}>
          On any used RV, the thing that quietly wrecks value is water. Check the ceiling corners, around every window and vent, and the exterior seams for soft spots or staining. Look at the roof membrane, test every slide-out and the awning, run the fridge on both propane and electric, and confirm the furnace, water heater, and A/C all cycle. A clean, well-documented used unit from a dealer that inspects and services what it sells is often the smartest buy on the lot.
        </p>

        <h2 style={H2}>Questions Worth Asking Before You Sign</h2>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li style={LI}>What does this weigh fully loaded, and will my tow vehicle handle it with margin?</li>
          <li style={LI}>How many does it actually sleep comfortably &mdash; not just the maximum listed?</li>
          <li style={LI}>What&rsquo;s the fresh, gray, and black tank capacity for the trips I take?</li>
          <li style={LI}>Has it been inspected and serviced, and what&rsquo;s covered if something fails?</li>
          <li style={LI}>Does it come winter-ready, and can you walk me through de-winterizing in spring?</li>
        </ul>

        <h2 style={H2}>Idaho Seasons &amp; Winterizing</h2>
        <p style={P}>
          This is where local matters. Magic Valley winters get cold enough to freeze and split any water line left full &mdash; a burst pipe or cracked water heater is one of the most expensive, and most preventable, RV repairs. Before the first hard freeze, the water system needs to be blown out with air or protected with RV antifreeze, the water heater drained, and the low-point drains opened.
        </p>
        <p style={P}>
          If you camp into the shoulder seasons, ask about heated and enclosed underbellies, which protect tanks and lines when temperatures drop. And when spring comes, de-winterize and check every seal before your first trip &mdash; a bead of fresh sealant on the roof each year is the cheapest insurance in RVing. We winterize and de-winterize units for local customers every season, so if that&rsquo;s not your idea of a good Saturday, we&rsquo;ve got you.
        </p>
      </article>

      {/* Soft CTA */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.5rem 1.5rem 3.5rem' }}>
        <div style={{ background: 'var(--color-navy)', borderRadius: 16, padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>Ready to look at some RVs?</p>
            <p style={{ fontSize: '0.875rem', color: 'oklch(72% 0.01 220)', lineHeight: 1.6, maxWidth: 460 }}>
              Bring your tow vehicle details and we&rsquo;ll match you to units that pull safely. No pressure, just straight answers.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/rvs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}>
              Browse RVs
            </Link>
            <a href={DEALER_INFO.phoneHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              {DEALER_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: "The Idaho RV Buyer's Guide",
            description: 'Travel trailer vs fifth wheel vs motorhome, matching an RV to your tow vehicle, new vs used, and Idaho winterizing.',
            author: { '@type': 'Organization', name: DEALER_INFO.name },
            publisher: { '@type': 'AutoDealer', name: DEALER_INFO.name },
            mainEntityOfPage: `https://${DEALER_INFO.domain}/guides/rv-buyers-guide`,
            url: `https://${DEALER_INFO.domain}/guides/rv-buyers-guide`,
          }),
        }}
      />
    </>
  )
}
