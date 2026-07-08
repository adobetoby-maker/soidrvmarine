// Built by ATLAS — 2026-07-08
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'RV & Boat Financing Guide | Southern Idaho RV & Marine',
  description: 'How dealer financing works, what affects your rate, term lengths, trade-ins, and how to see your rate with a soft pull. A plain-English guide for Idaho buyers.',
  alternates: { canonical: `https://${DEALER_INFO.domain}/guides/financing-guide` },
  openGraph: {
    title: 'RV & Boat Financing Guide | Southern Idaho RV & Marine',
    description: 'Understand rates, terms, trade-ins, and soft-pull pre-qualification before you finance an RV or boat. From your local Jerome dealer.',
    url: `https://${DEALER_INFO.domain}/guides/financing-guide`,
  },
}

const H2 = { fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, margin: '2.25rem 0 0.75rem' } as const
const P = { fontSize: '1rem', color: 'var(--color-sage)', lineHeight: 1.75, marginBottom: '1rem' } as const
const LI = { fontSize: '1rem', color: 'var(--color-sage)', lineHeight: 1.7, marginBottom: '0.5rem' } as const

export default function FinancingGuidePage() {
  return (
    <>
      {/* Header */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            <Link href="/guides" style={{ color: 'var(--color-amber)', textDecoration: 'none' }}>Guides</Link> &middot; Financing
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4.2vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            RV &amp; Boat Financing Guide
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 620, lineHeight: 1.65 }}>
            How dealer financing actually works, what moves your rate, and how to see your number before you commit &mdash; explained plainly, with no pressure.
          </p>
        </div>
      </div>

      {/* Article body */}
      <article style={{ maxWidth: 820, margin: '0 auto', padding: '2.5rem 1.5rem 1rem' }}>
        <p style={P}>
          Financing an RV or boat isn&rsquo;t as different from a car loan as people expect, but the terms run longer and the numbers are bigger, so understanding a few basics puts you in control of the conversation. Here&rsquo;s what&rsquo;s worth knowing before you sign anything.
        </p>

        <h2 style={H2}>How Dealer Financing Works</h2>
        <p style={P}>
          When you finance through a dealer, we don&rsquo;t lend the money ourselves &mdash; we submit your application to a network of banks and lenders that specialize in RVs and boats, and they compete to offer you terms. Because we send one application to several lenders at once, you often get a better rate than walking into a single bank, and you do it all in one sitting instead of driving around town. Recreational lenders also understand these units in a way a general bank may not, which can mean longer terms and approvals a regular auto lender wouldn&rsquo;t offer.
        </p>

        <h2 style={H2}>What Affects Your Rate</h2>
        <p style={P}>
          Your interest rate isn&rsquo;t random. A handful of factors drive it, and most are things you can see and plan around:
        </p>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Credit profile</strong> &mdash; your score and history are the biggest lever. Stronger credit means lower rates.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Down payment</strong> &mdash; more money down lowers the lender&rsquo;s risk and usually your rate, and it keeps you from owing more than the unit is worth early on.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Loan term</strong> &mdash; longer terms lower the monthly payment but often carry a slightly higher rate and more total interest.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>New vs. used and age of the unit</strong> &mdash; newer units typically qualify for better rates than older ones.</li>
          <li style={LI}><strong style={{ color: 'var(--color-navy)' }}>Loan amount</strong> &mdash; very small and very large loans can be priced differently depending on the lender.</li>
        </ul>

        <h2 style={H2}>Term Lengths &amp; the Monthly-Payment Trap</h2>
        <p style={P}>
          RV and boat loans commonly run anywhere from about 5 years on smaller amounts up to 15 or even 20 years on larger units. A longer term is a real tool &mdash; it can make a great unit affordable month to month &mdash; but it&rsquo;s easy to focus only on the payment and ignore the total. Stretching a loan out lowers the monthly number while raising the total interest you pay and keeping you &ldquo;upside down&rdquo; (owing more than it&rsquo;s worth) for longer. The smart move is to pick the shortest term whose monthly payment still fits comfortably, then know you can pay extra whenever you want.
        </p>

        <h2 style={H2}>Trade-Ins</h2>
        <p style={P}>
          If you already own an RV or boat, trading it in can lower the amount you finance &mdash; and it&rsquo;s simpler than a private sale. We appraise your current unit and apply its value directly to your purchase, which reduces your loan amount (and, with it, your interest and often your rate). It also saves you the hassle of listing, showing, and negotiating a private sale, and handling the title and payoff paperwork. Even a unit that needs work usually has trade value, so it&rsquo;s worth asking before you assume it&rsquo;s not.
        </p>

        <h2 style={H2}>See Your Rate First &mdash; No SSN Required</h2>
        <p style={P}>
          You don&rsquo;t have to apply blind. A pre-qualification uses a <strong style={{ color: 'var(--color-navy)' }}>soft credit check</strong>, which lets you see your estimated rate and terms without a full application and <em>without affecting your credit score</em>. It&rsquo;s a no-risk way to shop with real numbers instead of guesses. A soft pull is different from the <strong style={{ color: 'var(--color-navy)' }}>hard inquiry</strong> that happens when you formally apply to finalize a purchase &mdash; that one does show on your report. Starting soft means you can compare, plan your budget, and walk in already knowing roughly where you stand.
        </p>

        <h2 style={H2}>Finance vs. Pay Cash</h2>
        <p style={P}>
          Paying cash means no interest and no monthly payment &mdash; hard to argue with if it doesn&rsquo;t drain your emergency savings. But financing has real advantages beyond just spreading the cost: it keeps your cash available for the things that come up, it lets you buy a better-built unit that lasts longer and holds value rather than settling for whatever cash on hand allows, and consistent, on-time payments can help build your credit. Many buyers who could pay cash choose to finance part of the purchase for exactly these reasons. There&rsquo;s no single right answer &mdash; it depends on your rate, your savings, and what else you&rsquo;d do with the money.
        </p>

        <p style={{ ...P, fontSize: '0.8125rem', color: 'var(--color-sage)', marginTop: '2rem' }}>
          This guide is educational and general in nature. All financing is subject to credit approval; rates and terms vary by lender, credit profile, and unit. Contact us for current offers &mdash; not all applicants will qualify for advertised terms.
        </p>
      </article>

      {/* Soft CTA */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '1.5rem 1.5rem 3.5rem' }}>
        <div style={{ background: 'var(--color-navy)', borderRadius: 16, padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>See your rate &mdash; no obligation</p>
            <p style={{ fontSize: '0.875rem', color: 'oklch(72% 0.01 220)', lineHeight: 1.6, maxWidth: 460 }}>
              Browse our inventory or call and we&rsquo;ll walk you through pre-qualification with a soft credit check. It won&rsquo;t affect your score.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/financing" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}>
              Get Pre-Qualified
            </Link>
            <Link href="/rvs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontWeight: 600, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}>
              Browse Inventory
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
            headline: 'RV & Boat Financing Guide',
            description: 'How dealer financing works, what affects your rate, term lengths, trade-ins, and soft-pull pre-qualification.',
            author: { '@type': 'Organization', name: DEALER_INFO.name },
            publisher: { '@type': 'AutoDealer', name: DEALER_INFO.name },
            mainEntityOfPage: `https://${DEALER_INFO.domain}/guides/financing-guide`,
            url: `https://${DEALER_INFO.domain}/guides/financing-guide`,
          }),
        }}
      />
    </>
  )
}
