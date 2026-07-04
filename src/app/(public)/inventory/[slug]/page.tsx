// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getUnitBySlug, getRvInventory, getBoatInventory } from '@/lib/db'
import { DEALER_INFO } from '@/lib/types'

export const revalidate = 3600 // ISR: revalidate hourly

const BOAT_CATEGORIES = new Set(['Pontoon', 'Bass Boat', 'Fishing'])

export async function generateStaticParams() {
  const [rvs, boats] = await Promise.all([getRvInventory(), getBoatInventory()])
  return [...rvs, ...boats].map(u => ({ slug: u.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const unit = await getUnitBySlug(slug)
  if (!unit) return { title: 'Unit Not Found' }

  const title = `${unit.year} ${unit.make} ${unit.model}${unit.trim ? ` ${unit.trim}` : ''} — ${unit.condition} ${unit.category}`
  const priceStr = unit.price
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(unit.price)
    : 'Call for Price'
  const description = `${unit.year} ${unit.make} ${unit.model} — ${unit.condition.toLowerCase()} ${unit.category.toLowerCase()} at ${DEALER_INFO.shortName} in Jerome, Idaho. ${priceStr}. Financing available.`

  return {
    title,
    description,
    alternates: { canonical: `https://${DEALER_INFO.domain}/inventory/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://${DEALER_INFO.domain}/inventory/${slug}`,
      images: [{ url: unit.photo, width: 600, height: 420, alt: title }],
    },
  }
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default async function UnitDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const unit = await getUnitBySlug(slug)
  if (!unit) notFound()

  const isRv = !BOAT_CATEGORIES.has(unit.category)
  const backHref = isRv ? '/rvs' : '/boats'
  const backLabel = isRv ? 'RVs' : 'Boats'

  const conditionColor = unit.condition === 'New' ? 'var(--color-pine)' : 'var(--color-navy)'
  const title = `${unit.year} ${unit.make} ${unit.model}${unit.trim ? ` ${unit.trim}` : ''}`

  const specs: { label: string; value: string }[] = [
    { label: 'Year', value: String(unit.year) },
    { label: 'Condition', value: unit.condition },
    { label: 'Category', value: unit.category },
    ...(unit.lengthFt ? [{ label: 'Length', value: `${unit.lengthFt} ft` }] : []),
    ...(unit.sleeps ? [{ label: 'Sleeps', value: String(unit.sleeps) }] : []),
    ...(unit.slideOuts !== undefined ? [{ label: 'Slide-Outs', value: String(unit.slideOuts) }] : []),
    ...(unit.mileage !== undefined ? [{ label: 'Mileage', value: `${unit.mileage.toLocaleString()} mi` }] : []),
  ]

  return (
    <>
      {/* Breadcrumb + header */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <nav style={{ marginBottom: '1rem', fontSize: '0.8125rem', color: 'oklch(70% 0.01 220)' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 0.5rem' }}>›</span>
            <Link href={backHref} style={{ color: 'inherit', textDecoration: 'none' }}>{backLabel}</Link>
            <span style={{ margin: '0 0.5rem' }}>›</span>
            <span style={{ color: 'var(--color-amber)' }}>{title}</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              background: conditionColor,
              color: 'white',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              padding: '0.25rem 0.625rem',
              borderRadius: '4px',
            }}>
              {unit.condition}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-amber)', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              {unit.category}
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.1,
          }}>
            {title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: '2.5rem',
          alignItems: 'start',
        }}>

          {/* Left — photo */}
          <div>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'var(--color-parchment-dark)',
              aspectRatio: '600 / 420',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={unit.photo}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Spec table — below photo on desktop */}
            <div style={{
              marginTop: '1.5rem',
              background: 'var(--color-parchment)',
              border: '1px solid var(--color-parchment-dark)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-parchment-dark)' }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-sage)' }}>
                  Specifications
                </p>
              </div>
              {specs.map((s, i) => (
                <div key={s.label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1.25rem',
                  borderBottom: i < specs.length - 1 ? '1px solid var(--color-parchment-dark)' : 'none',
                  fontSize: '0.875rem',
                }}>
                  <span style={{ color: 'var(--color-sage)', fontWeight: 500 }}>{s.label}</span>
                  <span style={{ color: 'var(--color-navy)', fontWeight: 600 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — price + CTA card */}
          <div style={{ position: 'sticky', top: '1.5rem' }}>
            <div style={{
              background: 'var(--color-parchment)',
              border: '1px solid var(--color-parchment-dark)',
              borderRadius: '12px',
              padding: '1.75rem',
            }}>
              {/* Price */}
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-sage)', marginBottom: '0.375rem' }}>
                  {unit.condition} Price
                </p>
                {unit.price ? (
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    fontWeight: 700,
                    color: 'var(--color-amber)',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1,
                  }}>
                    {fmt(unit.price)}
                  </p>
                ) : (
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--color-navy)',
                    lineHeight: 1,
                  }}>
                    Call for Price
                  </p>
                )}
                <p style={{ fontSize: '0.75rem', color: 'var(--color-sage)', marginTop: '0.375rem' }}>
                  Excludes tax, title, license &amp; doc fees
                </p>
              </div>

              {/* Primary CTA */}
              <a
                href={DEALER_INFO.phoneHref}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '0.875rem',
                  background: 'var(--color-amber)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  marginBottom: '0.75rem',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 11.95a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.96a16 16 0 0 0 5.95 5.95l1.1-1.12a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
                </svg>
                {DEALER_INFO.phone}
              </a>

              {/* Secondary CTA */}
              <Link
                href={`/contact?unit=${encodeURIComponent(title)}`}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem',
                  border: '1.5px solid var(--color-navy)',
                  color: 'var(--color-navy)',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Request More Info
              </Link>

              {/* Trust signals */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-parchment-dark)' }}>
                {[
                  'On-site financing available',
                  'Trade-ins welcome',
                  'ASE-certified service',
                  'Veteran-owned dealership',
                ].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8125rem', color: 'var(--color-sage)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-pine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Back link */}
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Link
                href={backHref}
                style={{ fontSize: '0.875rem', color: 'var(--color-sage)', textDecoration: 'none', fontWeight: 500 }}
              >
                ← Back to {backLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: title,
            image: unit.photo,
            description: `${unit.condition} ${unit.category} — ${unit.year} ${unit.make} ${unit.model}`,
            brand: { '@type': 'Brand', name: unit.make },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: unit.price ?? undefined,
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'AutoDealer',
                name: DEALER_INFO.name,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: DEALER_INFO.address,
                  addressLocality: DEALER_INFO.city,
                  addressRegion: DEALER_INFO.state,
                  postalCode: DEALER_INFO.zip,
                },
              },
            },
          }),
        }}
      />
    </>
  )
}
