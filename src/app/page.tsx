// Built by ATLAS — 2026-07-04
import Link from 'next/link'
import { Phone, MapPin, Clock, ChevronRight, Star } from 'lucide-react'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { UnitCard } from '@/components/inventory/UnitCard'
import { HeroVideo } from '@/components/HeroVideo'
import { BrandStrip } from '@/components/BrandStrip'
import { HomeJsonLd } from '@/components/HomeJsonLd'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Southern Idaho RV & Marine | Jerome & Twin Falls, ID',
  description:
    "Southern Idaho's only factory-direct Mercury dealer. Shop new and used RVs, boats, and Mercury outboard motors in Jerome, Idaho. 4.7★ from 1,200+ reviews. Serving Twin Falls, Burley, and all of Magic Valley.",
  alternates: { canonical: `https://${DEALER_INFO.domain}` },
}

const CATEGORIES = [
  {
    label: 'RVs',
    sub: 'Travel Trailers · Fifth Wheels · Pop-Ups',
    count: '49 in stock',
    href: '/rvs',
    photo: 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14102224/7b08527f-22da-42a2-9bb0-42cda7be18d3.jpeg',
    size: 'large',
  },
  {
    label: 'Boats',
    sub: 'Pontoon · Fishing · MirroCraft',
    count: '18 in stock',
    href: '/boats',
    photo: 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13844153/3d894568-6112-4531-b3aa-b912c478eb5b.jpeg',
    size: 'small',
  },
  {
    label: 'Mercury Outboards',
    sub: 'Factory-direct · Sales · Service',
    count: 'In-stock motors',
    href: '/motors/mercury-outboards',
    photo: '',
    size: 'small',
  },
]

const CDN = 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory'

const FEATURED = [
  {
    year: 2026, make: 'Keystone', model: 'Hideout 262BHSWE',
    type: 'Travel Trailer', condition: 'New' as const,
    price: 25250,
    photo: `${CDN}/14102224/7b08527f-22da-42a2-9bb0-42cda7be18d3.jpeg`,
    slug: '2026-keystone-hideout-262bhswe-new-rv003',
  },
  {
    year: 2022, make: 'Heartland', model: 'Bighorn 37TB',
    type: 'Fifth Wheel', condition: 'Used' as const,
    price: 38850,
    photo: `${CDN}/14334871/c3cf23b3-c218-47fc-9d03-ea8a6411498a.jpeg`,
    slug: '2022-heartland-bighorn-37tb-used-fifth-wheel-rv014',
  },
  {
    year: 2026, make: 'Montego Bay', model: 'C8516',
    type: 'Pontoon', condition: 'New' as const,
    price: 31668,
    photo: `${CDN}/13800664/721a2c73-de8e-4279-9d0c-18e5c5b6dd3d.jpeg`,
    slug: '2026-montego-bay-c8516-new-boat004',
  },
  {
    year: 2026, make: 'MirroCraft', model: 'F176',
    type: 'Fishing', condition: 'New' as const,
    price: 40977,
    photo: `${CDN}/13844153/3d894568-6112-4531-b3aa-b912c478eb5b.jpeg`,
    slug: '2026-mirrocraft-f176-new-boat001',
  },
]

const TRUST_ITEMS = [
  { icon: '★', label: '4.7 Stars', sub: '1,203 Google reviews' },
  { icon: '⚑', label: 'Veteran-Owned', sub: 'US Military family business' },
  { icon: '⚓', label: 'Mercury-Exclusive', sub: "Magic Valley's only factory-direct" },
  { icon: '◈', label: 'Third Generation', sub: 'Family-owned since 1993' },
]

function StarRow({ score, count }: { score: number; count: number }) {
  const full = Math.floor(score)
  const frac = score - full // e.g. 4.7 → 0.7 fill on the 5th star
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {[1, 2, 3, 4, 5].map(i => {
        if (i <= full) {
          return <Star key={i} size={16} fill="var(--color-amber)" color="var(--color-amber)" />
        }
        if (i === full + 1 && frac > 0) {
          // Partial star: empty outline with a filled star clipped to `frac` width on top.
          return (
            <span key={i} style={{ position: 'relative', display: 'inline-flex', width: 16, height: 16 }}>
              <Star size={16} fill="none" color="var(--color-amber)" style={{ position: 'absolute', inset: 0 }} />
              <span style={{ position: 'absolute', inset: 0, width: `${frac * 100}%`, overflow: 'hidden' }} aria-hidden>
                <Star size={16} fill="var(--color-amber)" color="var(--color-amber)" />
              </span>
            </span>
          )
        }
        return <Star key={i} size={16} fill="none" color="var(--color-amber)" />
      })}
      <span style={{ fontSize: '0.875rem', color: 'var(--color-ink-light)', marginLeft: 4 }}>
        {score.toFixed(1)} ({count.toLocaleString()} reviews)
      </span>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <SiteNav />

      <main>
        {/* ── Hero: asymmetric split ── */}
        <section style={{ background: 'var(--color-parchment)', overflow: 'hidden' }}>
          <div
            style={{
              maxWidth: 1400,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr',
              minHeight: '85vh',
            }}
            className="hero-grid"
          >
            {/* Left: content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '5rem 3rem 5rem 2.5rem',
                borderLeft: '4px solid var(--color-amber)',
              }}
              className="hero-content"
            >
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-amber)',
                marginBottom: '1.25rem',
              }}>
                Jerome, Idaho · Magic Valley's Dealer
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--color-navy)',
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                maxWidth: '16ch',
              }}>
                Southern Idaho's&nbsp;Premier
                <span style={{ display: 'block', color: 'var(--color-amber)' }}>
                  RV &amp; Marine Dealer
                </span>
              </h1>

              <p style={{
                fontSize: '1.0625rem',
                color: 'var(--color-ink-light)',
                lineHeight: 1.65,
                maxWidth: '44ch',
                marginBottom: '1.75rem',
              }}>
                New and used RVs, boats, and Mercury outboard motors — serviced by ASE-certified technicians.
                Financing available on-site. Jerome, Idaho.
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <StarRow score={DEALER_INFO.reviewScore} count={DEALER_INFO.reviewCount} />
              </div>

              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <Link href="/rvs" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '0.75rem 1.5rem',
                  background: 'var(--color-amber)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                  boxShadow: 'var(--shadow-amber)',
                }}>
                  Browse Inventory <ChevronRight size={16} />
                </Link>
                <a href={DEALER_INFO.phoneHref} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: 'var(--color-navy)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1.5px solid var(--color-navy)',
                }}>
                  <Phone size={15} strokeWidth={2.5} />
                  {DEALER_INFO.phone}
                </a>
              </div>

              {/* Inline trust badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {['Veteran-Owned', 'Mercury-Exclusive', '3rd-Generation Family'].map(badge => (
                  <span key={badge} style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--color-navy)',
                    background: 'white',
                    padding: '0.3125rem 0.75rem',
                    borderRadius: '20px',
                    border: '1px solid var(--color-parchment-dark)',
                  }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: photo/video */}
            <div style={{ position: 'relative', minHeight: 400, overflow: 'hidden' }} className="hero-photo">
              <HeroVideo
                poster="/hero-poster.jpg"
                videoSrc="/api/hero-video"
                alt="A boat on a Southern Idaho reservoir and an RV camped on the shore at golden hour — Magic Valley"
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, var(--color-parchment) 0%, transparent 20%)',
              }} />
            </div>
          </div>

          <style>{`
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-content { padding: 3rem 1.5rem !important; border-left: 4px solid var(--color-amber); }
            .hero-photo { min-height: 320px !important; }
            @media (min-width: 900px) {
              .hero-grid { grid-template-columns: 55fr 45fr !important; min-height: 85vh !important; }
              .hero-content { padding: 5rem 3rem 5rem 2.5rem !important; }
              .hero-photo { min-height: unset !important; }
            }
          `}</style>
        </section>

        {/* ── Trust band ── */}
        <div style={{ background: 'var(--color-navy)', padding: '1.5rem' }}>
          <div style={{
            maxWidth: 1400, margin: '0 auto',
            display: 'flex', flexWrap: 'wrap', gap: '1rem',
            justifyContent: 'center', alignItems: 'center',
          }}>
            {TRUST_ITEMS.map((item, i) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {i > 0 && (
                  <div
                    style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.12)' }}
                    aria-hidden
                    className="trust-divider"
                  />
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    color: 'white', fontWeight: 600, fontSize: '0.9375rem',
                  }}>
                    {item.icon} {item.label}
                  </span>
                  <span style={{ color: 'oklch(70% 0.015 220)', fontSize: '0.75rem' }}>{item.sub}</span>
                </div>
              </div>
            ))}
            <style>{`
              .trust-divider { display: none !important; }
              @media (min-width: 600px) { .trust-divider { display: block !important; } }
            `}</style>
          </div>
        </div>

        {/* ── Category Bento ── */}
        <section style={{ background: 'var(--color-parchment)', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: 8,
              }}>
                What We Carry
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                color: 'var(--color-navy)', letterSpacing: '-0.02em', lineHeight: 1.15,
              }}>
                Shop by Category
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1rem',
              }}
              className="bento-grid"
            >
              {CATEGORIES.map((cat, i) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  style={{
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    gridRow: i === 0 ? 'span 2' : undefined,
                    minHeight: i === 0 ? 420 : 200,
                    background: 'var(--color-navy)',
                  }}
                  className={i === 0 ? 'bento-large' : 'bento-small'}
                >
                  {cat.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cat.photo}
                      alt={cat.label}
                      style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 400ms ease',
                      }}
                    />
                  )}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(28,43,56,0.95) 0%, rgba(28,43,56,0.60) 65%, transparent 100%)',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: i === 0 ? '2rem' : '1.25rem',
                  }}>
                    <div style={{
                      fontSize: '0.75rem', color: 'var(--color-amber)',
                      fontWeight: 600, letterSpacing: '0.08em',
                      textTransform: 'uppercase', marginBottom: 4,
                    }}>
                      {cat.count}
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      color: 'white', fontWeight: 700,
                      fontSize: i === 0 ? '1.75rem' : '1.25rem',
                      lineHeight: 1.2, marginBottom: 4,
                    }}>
                      {cat.label}
                    </h3>
                    <div style={{ color: 'rgba(255,255,255,0.70)', fontSize: '0.875rem', marginBottom: 12 }}>
                      {cat.sub}
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-amber)',
                    }}>
                      Shop Now <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <style>{`
              .bento-grid { grid-template-columns: 1fr !important; }
              @media (min-width: 768px) {
                .bento-grid {
                  grid-template-columns: 55fr 45fr !important;
                  grid-template-rows: 260px 260px !important;
                }
                .bento-large { min-height: unset !important; }
                .bento-small { min-height: unset !important; }
              }
            `}</style>
          </div>
        </section>

        <BrandStrip />

        {/* ── Featured Inventory ── */}
        <section style={{ background: 'white', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{
              display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between', marginBottom: '2.5rem',
              flexWrap: 'wrap', gap: 12,
            }}>
              <div>
                <div style={{
                  fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: 8,
                }}>
                  Just In
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  color: 'var(--color-navy)', letterSpacing: '-0.02em',
                }}>
                  Featured Inventory
                </h2>
              </div>
              <Link href="/rvs" style={{
                fontSize: '0.875rem', fontWeight: 600,
                color: 'var(--color-amber)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                View All Inventory <ChevronRight size={14} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}>
              {FEATURED.map(unit => (
                <UnitCard key={unit.slug} {...unit} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Shop by Payment ── */}
        <section style={{ background: 'var(--color-parchment)', padding: '4.5rem 1.5rem', borderTop: '1px solid var(--color-parchment-dark)' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-amber-dark)', marginBottom: 12 }}>
              Flexible Financing
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-navy)', letterSpacing: '-0.02em', lineHeight: 1.12, marginBottom: '0.75rem' }}>
              Shop by Monthly Payment
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)', maxWidth: 560, lineHeight: 1.6, marginBottom: '2rem' }}>
              Know your budget? Browse RVs and boats by estimated monthly payment. On-site financing, all credit considered.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'Under', amount: '$200', href: '/rvs?paymentMax=200' },
                { label: 'From', amount: '$200', href: '/rvs?paymentMin=200&paymentMax=300' },
                { label: 'From', amount: '$300', href: '/rvs?paymentMin=300&paymentMax=400' },
                { label: 'From', amount: '$400', href: '/rvs?paymentMin=400' },
              ].map(tier => (
                <Link
                  key={tier.href}
                  href={tier.href}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: 4,
                    background: 'var(--color-navy)', color: 'white',
                    borderRadius: 14, padding: '1.5rem 1.5rem 1.25rem',
                    textDecoration: 'none', border: '1px solid var(--color-navy)',
                    transition: 'transform 180ms ease, box-shadow 180ms ease',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  className="pay-tier"
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-amber-light)' }}>{tier.label}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                    {tier.amount}<span style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'oklch(80% 0.01 220)' }}>/mo</span>
                  </span>
                  <span style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-amber-light)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Browse <ChevronRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-sage)', marginTop: '1.25rem' }}>
              Estimated payments assume 10% down, 7.9% APR, 120-month term. Not a credit offer — actual terms subject to approval.
            </p>
          </div>
        </section>

        {/* ── Mercury Exclusive ── */}
        <section style={{
          background: 'var(--color-ocean)',
          padding: '5rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 8px)',
          }} aria-hidden />

          <div
            style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}
            className="mercury-grid"
          >
            <div>
              <div style={{
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: 12,
              }}>
                Factory-Direct Partnership
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}>
                Magic Valley's Only<br />
                <span style={{ color: 'var(--color-amber)' }}>Factory-Direct</span> Mercury Dealer
              </h2>
              <p style={{
                color: 'oklch(80% 0.020 155)', lineHeight: 1.7,
                fontSize: '1.0625rem', maxWidth: '50ch', marginBottom: '2rem',
              }}>
                As the region's only authorized factory-direct Mercury Marine dealer, we carry the full lineup of outboard motors — and our certified technicians provide warranty service, parts, and the kind of expertise that comes only from being in the business for thirty years.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Full lineup: 2.5hp to 600hp V12 Verado',
                  'Factory-warranty service on every motor',
                  'In-stock parts for same-week repairs',
                  'Rigging, installation, and winterization',
                ].map(item => (
                  <li key={item} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    color: 'oklch(85% 0.018 155)', fontSize: '0.9375rem',
                  }}>
                    <span style={{ color: 'var(--color-amber)', fontWeight: 700, fontSize: '1rem', flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/motors/mercury-outboards" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0.75rem 1.75rem',
                background: 'var(--color-amber)',
                color: 'white', fontWeight: 700,
                fontSize: '0.9375rem', borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-amber)',
              }}>
                Shop Mercury Outboards <ChevronRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
              {[
                { num: '30+', label: 'Years as Mercury dealer' },
                { num: '#1', label: 'Mercury seller in Magic Valley' },
                { num: '48h', label: 'Average service turnaround' },
              ].map(stat => (
                <div key={stat.num} style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '10px',
                  padding: '1.5rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem', fontWeight: 700,
                    color: 'var(--color-amber)', lineHeight: 1, marginBottom: 4,
                  }}>
                    {stat.num}
                  </div>
                  <div style={{ color: 'oklch(75% 0.018 155)', fontSize: '0.875rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .mercury-grid { grid-template-columns: 1fr !important; }
            @media (min-width: 900px) {
              .mercury-grid { grid-template-columns: 60fr 40fr !important; }
            }
          `}</style>
        </section>

        {/* ── Directions ── */}
        <section style={{ background: 'var(--color-parchment)', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: 8,
              }}>
                Visit Us
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                color: 'var(--color-navy)', letterSpacing: '-0.02em',
              }}>
                Come See Us in Jerome
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="contact-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--color-amber)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: 2 }}>Address</div>
                    <div style={{ color: 'var(--color-ink-light)' }}>{DEALER_INFO.address}<br />Jerome, ID 83338</div>
                    <a
                      href={DEALER_INFO.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        marginTop: 8, color: 'var(--color-amber)',
                        textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem',
                      }}
                    >
                      Get Directions <ChevronRight size={13} />
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Phone size={20} color="var(--color-amber)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: 2 }}>Phone</div>
                    <a href={DEALER_INFO.phoneHref} style={{
                      color: 'var(--color-amber)', textDecoration: 'none',
                      fontWeight: 600, fontSize: '1.125rem',
                    }}>
                      {DEALER_INFO.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Clock size={20} color="var(--color-amber)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: 8 }}>Hours</div>
                    {[
                      ['Monday – Friday', '9:00 AM – 6:00 PM'],
                      ['Saturday', '9:00 AM – 5:00 PM'],
                      ['Sunday', 'Closed'],
                    ].map(([day, hours]) => (
                      <div key={day} style={{ display: 'flex', gap: 16, fontSize: '0.9375rem', marginBottom: 4 }}>
                        <span style={{ color: 'var(--color-navy)', fontWeight: 600, minWidth: 160 }}>{day}</span>
                        <span style={{ color: 'var(--color-ink-light)' }}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                minHeight: 300,
                background: 'var(--color-parchment-dark)',
                border: '1px solid var(--color-parchment-dark)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <a
                  href={DEALER_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', gap: 8,
                  }}
                >
                  <MapPin size={32} color="var(--color-amber)" />
                  <span style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.9375rem' }}>
                    {DEALER_INFO.address}
                  </span>
                  <span style={{
                    color: 'var(--color-amber)', fontWeight: 600,
                    fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    Open in Google Maps <ChevronRight size={13} />
                  </span>
                </a>
              </div>
            </div>

            <style>{`
              .contact-grid { grid-template-columns: 1fr !important; }
              @media (min-width: 768px) {
                .contact-grid { grid-template-columns: 1fr 1fr !important; }
              }
            `}</style>
          </div>
        </section>

        {/* ── Final CTA strip ── */}
        <div style={{ background: 'var(--color-navy)', padding: '3rem 1.5rem', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            color: 'white', fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: '0.75rem',
          }}>
            Ready to find your next adventure?
          </h2>
          <p style={{ color: 'oklch(72% 0.015 220)', marginBottom: '1.75rem', fontSize: '1.0625rem' }}>
            Browse our RVs, boats, and Mercury outboards — or call us to talk with a specialist.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/rvs" style={{
              padding: '0.75rem 2rem', background: 'var(--color-amber)',
              color: 'white', fontWeight: 700, borderRadius: '8px',
              textDecoration: 'none', fontSize: '0.9375rem',
              boxShadow: 'var(--shadow-amber)',
            }}>
              Browse RVs
            </Link>
            <Link href="/boats" style={{
              padding: '0.75rem 2rem',
              background: 'transparent',
              color: 'white', fontWeight: 600,
              borderRadius: '8px', textDecoration: 'none',
              fontSize: '0.9375rem',
              border: '1.5px solid rgba(255,255,255,0.35)',
            }}>
              Browse Boats
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />

      <HomeJsonLd />
    </>
  )
}
