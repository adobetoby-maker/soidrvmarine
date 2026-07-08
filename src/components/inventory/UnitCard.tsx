// Built by ATLAS — 2026-07-04
'use client'

import Link from 'next/link'
import { estimateMonthlyPayment } from '@/lib/inventory-filters'
import { ShopListButtons } from '@/components/inventory/ShopListButtons'

export interface UnitCardProps {
  year: number
  make: string
  model: string
  type: string
  condition: 'New' | 'Used'
  price: number
  photo: string
  slug: string
  /** Show a "Call for Price" label instead of price number */
  callForPrice?: boolean
  /** Compact mode for denser grids */
  compact?: boolean
}

export function UnitCard({ year, make, model, type, condition, price, photo, slug, callForPrice, compact }: UnitCardProps) {
  const conditionColor = condition === 'New' ? 'var(--color-ocean)' : 'var(--color-navy)'

  return (
    <Link
      href={`/inventory/${slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: compact ? '8px' : '10px',
        overflow: 'hidden',
        background: 'var(--color-parchment)',
        border: '1px solid var(--color-parchment-dark)',
        textDecoration: 'none',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(28,43,56,0.14)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', aspectRatio: compact ? '16/9' : '4/3', overflow: 'hidden', background: 'var(--color-navy)' }}>
        <ShopListButtons slug={slug} />
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={`${year} ${make} ${model}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-ocean) 100%)',
            color: 'oklch(60% 0.012 220)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Photo Coming Soon
          </div>
        )}

        {/* Condition badge */}
        <div style={{
          position: 'absolute',
          top: compact ? 8 : 10,
          left: compact ? 8 : 10,
          padding: compact ? '0.1875rem 0.5rem' : '0.25rem 0.625rem',
          borderRadius: '20px',
          fontSize: compact ? '0.6875rem' : '0.75rem',
          fontWeight: 700,
          background: conditionColor,
          color: 'white',
          letterSpacing: '0.04em',
        }}>
          {condition}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: compact ? '0.875rem' : '1.125rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{
          fontSize: '0.6875rem',
          color: 'var(--color-sage)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          {type}
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: compact ? '0.9375rem' : '1rem',
          fontWeight: 700,
          color: 'var(--color-navy)',
          lineHeight: 1.3,
        }}>
          {year} {make} {model}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 4 }}>
          <div style={{
            fontSize: compact ? '1.0625rem' : '1.25rem',
            fontWeight: 700,
            color: 'var(--color-amber)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {callForPrice ? 'Call for Price' : `$${price.toLocaleString()}`}
          </div>
          {!callForPrice && estimateMonthlyPayment(price) != null && (
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--color-sage)',
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              marginTop: 1,
            }}>
              est. ${estimateMonthlyPayment(price)!.toLocaleString()}/mo
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
