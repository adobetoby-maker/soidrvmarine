// Built by ATLAS — 2026-07-08
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: "Boat Buyer's Guide for Idaho | Southern Idaho RV & Marine",
  description: 'Pontoon vs fishing vs sport boat, matching a boat to Idaho reservoirs and the Snake River, outboard sizing, trailering, and new vs used. For Magic Valley boaters.',
  alternates: { canonical: `https://${DEALER_INFO.domain}/guides/boat-buyers-guide` },
  openGraph: {
    title: "Boat Buyer's Guide for Idaho | Southern Idaho RV & Marine",
    description: 'How to pick the right boat for Idaho water, size a Mercury outboard, and trailer with confidence. From your local Jerome dealer.',
    url: `https://${DEALER_INFO.domain}/guides/boat-buyers-guide`,
  },
}

const H2 = { fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, margin: '2.25rem 0 0.75rem' } as const
const P = { fontSize: '1rem', color: 'var(--color-sage)', lineHeight: 1.75, marginBottom: '1rem' } as const
const LI = { fontSize: '1rem', color: 'var(--color-sage)', lineHeight: 1.7, marginBottom: '0.5rem' } as const

export default function BoatBuyersGuidePage() {
  return (
    <>
      {/* Header */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            <Link href="/guides" style={{ color: 'var(--color-amber)', textDecoration: 'none' }}>Guides</Link> &middot; Boats
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.2vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            The Idaho Boat Buyer&rsquo;s Guide
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 620, lineHeight: 1.65 }}>
            Pick the right hull for the water you actually run, size the outboard correctly, and tow it home with confidence. Written for Magic Valley boaters.
          </p>
        </div>
      </div>

      {/* Article body */}
      <article style={{ maxWidth: 820, margin: '0 auto', padding: '2.5rem 1.5rem 1rem' }}>
        <p style={P}>
          The best boat is the one that matches how and where you&rsquo;ll use it. A rig built for chasing bass on a quiet reservoir is a very different animal from one built to pull a wakeboarder or seat the whole family for a Sunday cruise. Decide how you&rsquo;ll spend most of your time on the water first, and the rest of the decision gets a lot simpler.
        </p>

        <h2 style={H2}>Pontoon vs. Fishing vs. Sport Boat</h2>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Pontoons</strong> are the family favorite for a reason: flat, stable decks, tons of seating, and shade. They&rsquo;re ideal for relaxed cruising, swimming, and entertaining on calmer reservoirs. Modern tri-toon models with enough horsepower will even pull tubes and skiers. If your days are more &ldquo;float and grill&rdquo; than &ldquo;chase the fish,&rdquo; start here.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Fishing / bass boats</strong> are purpose-built to fish: low profile, casting decks, livewells, rod storage, and a trolling motor up front. Aluminum models are lighter, tougher on submerged rocks, and easier to tow with a smaller vehicle; fiberglass bass boats ride smoother and run faster on open water. Great for the angler who wants to cover water and fish hard.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Sport / bowrider boats</strong> are the do-it-all crossover: seating for the family, a bow for lounging, and the power to pull skiers, wakeboarders, and tubes. If you want one boat that does watersports and casual cruising, this is usually it.</li>
        </ul>

        <h2 style={H2}>Match the Boat to Idaho Water</h2>
        <p style={P}>
          Where you launch shapes what you should buy. Magic Valley boaters run a real mix of water, and each rewards a different rig.
        </p>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li style={LI}>Larger reservoirs like Salmon Falls Creek, Magic, and Lake Walcott give you room to open up &mdash; a bowrider or a well-powered tri-toon shines here.</li>
          <li style={LI}>The Snake River and its calmer stretches and canyon pools favor shallower-draft aluminum boats that handle current, wind chop, and the occasional rocky spot.</li>
          <li style={LI}>Smaller local reservoirs and mountain lakes reward a lighter, nimble fishing boat that&rsquo;s easy to launch at a rough ramp and simple to tow up the grade.</li>
        </ul>
        <p style={P}>
          One local note: our reservoirs can draw down through late summer, so ramps get shallow and rocky. A boat that&rsquo;s easy to launch and doesn&rsquo;t need a deep, perfect ramp saves you a lot of frustration in August.
        </p>

        <h2 style={H2}>Outboard Sizing Basics (Mercury)</h2>
        <p style={P}>
          Every boat has a maximum horsepower rating on its capacity plate &mdash; never exceed it. Within that limit, more power isn&rsquo;t always the answer; the right size depends on how you load and use the boat.
        </p>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li style={LI}>For watersports or a boat you often run fully loaded, size toward the higher end of the rating so it planes quickly and holds speed with a full crew.</li>
          <li style={LI}>For a fishing boat where you value fuel economy and quiet trolling, a mid-range outboard paired with a trolling motor is usually plenty.</li>
          <li style={LI}>Pontoons scale with use: 40&ndash;90&nbsp;hp is fine for relaxed cruising, while 115&nbsp;hp and up (especially on a tri-toon) is what you want to pull tubes and skiers.</li>
        </ul>
        <p style={P}>
          As a factory-direct Mercury dealer, we&rsquo;ll match the right outboard and propeller to your hull and how you plan to run it &mdash; the prop choice alone can transform how a boat holds plane and sips fuel. Ask us to dial it in rather than guessing from horsepower alone.
        </p>

        <h2 style={H2}>Trailering &amp; Getting It Home</h2>
        <p style={P}>
          The trailer is part of the purchase, not an afterthought. Confirm the loaded boat, motor, gear, and full fuel tank stay within your tow vehicle&rsquo;s rating, and make sure the trailer has working brakes if it needs them, good bearings, and tires with real tread. At the ramp, keep your bearings greased and rinse everything &mdash; trailer, hull, and lower unit &mdash; after every outing to fight corrosion and to stop the spread of invasive mussels between waters (Idaho takes its inspection stations seriously). A boat that&rsquo;s easy to launch and load solo is a boat you&rsquo;ll actually use.
        </p>

        <h2 style={H2}>New vs. Used</h2>
        <p style={P}>
          New boats bring a full warranty, current features, and a fresh Mercury outboard with no hours on it. Used boats stretch your budget, but the engine is where the value lives or dies &mdash; ask for the hours, service records, and a compression check, and look hard for corrosion on the powerhead and lower unit. Inspect the hull for stress cracks, check that the transom is solid, and test every system on the water if you can. A used boat that&rsquo;s been serviced and inspected by a dealer with a real service department is a far safer bet than a driveway sale.
        </p>
      </article>

      {/* Soft CTA */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.5rem 1.5rem 3.5rem' }}>
        <div style={{ background: 'var(--color-navy)', borderRadius: 16, padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>Ready to find your boat?</p>
            <p style={{ fontSize: '0.875rem', color: 'oklch(72% 0.01 220)', lineHeight: 1.6, maxWidth: 460 }}>
              Tell us where you run and how you&rsquo;ll use it, and we&rsquo;ll match you to the right hull and Mercury power. No pressure.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/boats" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}>
              Browse Boats
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
            headline: "The Idaho Boat Buyer's Guide",
            description: 'Pontoon vs fishing vs sport boat, matching a boat to Idaho reservoirs and the Snake River, Mercury outboard sizing, trailering, and new vs used.',
            author: { '@type': 'Organization', name: DEALER_INFO.name },
            publisher: { '@type': 'AutoDealer', name: DEALER_INFO.name },
            mainEntityOfPage: `https://${DEALER_INFO.domain}/guides/boat-buyers-guide`,
            url: `https://${DEALER_INFO.domain}/guides/boat-buyers-guide`,
          }),
        }}
      />
    </>
  )
}
