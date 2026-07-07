// Built by ATLAS — 2026-07-07
'use client'

// Monthly payment estimator — standard amortization math. Neither competitor
// offers this. Meant to be mounted by Integration on unit-detail pages
// (prefilled with that unit's price via the `initialPrice` prop) and on
// /financing (unprefilled). Purely client-side, no network call, no lead
// capture — this is a planning tool, not a form.

import { useMemo, useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.75rem', border: '1.5px solid var(--color-parchment-dark)',
  borderRadius: 8, fontSize: '0.9375rem', color: 'var(--color-navy)', background: 'white', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.375rem',
}

const TERM_OPTIONS = [
  { label: '36 months (3 yr)', months: 36 },
  { label: '60 months (5 yr)', months: 60 },
  { label: '84 months (7 yr)', months: 84 },
  { label: '120 months (10 yr)', months: 120 },
  { label: '180 months (15 yr)', months: 180 },
  { label: '240 months (20 yr)', months: 240 },
]

interface Props {
  /** Prefill from a specific unit's price — Integration passes this on unit-detail pages. */
  initialPrice?: number
  /** Compact mode for embedding inside a card/sidebar (unit-detail) vs full width (/financing). */
  compact?: boolean
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export function PaymentCalculator({ initialPrice, compact = false }: Props) {
  const [price, setPrice] = useState(initialPrice ?? 30000)
  const [downPayment, setDownPayment] = useState(Math.round((initialPrice ?? 30000) * 0.1))
  const [apr, setApr] = useState(7.9)
  const [termMonths, setTermMonths] = useState(120)

  const result = useMemo(() => {
    const loanAmount = Math.max(0, price - downPayment)
    const monthlyRate = apr / 100 / 12
    const n = termMonths

    let monthlyPayment: number
    if (loanAmount <= 0) {
      monthlyPayment = 0
    } else if (monthlyRate === 0) {
      monthlyPayment = loanAmount / n
    } else {
      const factor = Math.pow(1 + monthlyRate, n)
      monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1)
    }

    const totalPaid = monthlyPayment * n
    const totalInterest = Math.max(0, totalPaid - loanAmount)

    return { loanAmount, monthlyPayment, totalPaid, totalInterest }
  }, [price, downPayment, apr, termMonths])

  return (
    <div style={{
      background: 'var(--color-parchment)',
      border: '1px solid var(--color-parchment-dark)',
      borderRadius: 16,
      padding: compact ? '1.5rem' : '2rem',
    }}>
      <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>
        Estimate Your Payment
      </p>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: compact ? '1.125rem' : '1.375rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
        Payment Calculator
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label htmlFor="calc-price" style={labelStyle}>Unit Price</label>
          <input
            id="calc-price" type="number" min={0} step={500}
            value={price}
            onChange={e => setPrice(Math.max(0, Number(e.target.value) || 0))}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="calc-down" style={labelStyle}>Down Payment</label>
          <input
            id="calc-down" type="number" min={0} step={500}
            value={downPayment}
            onChange={e => setDownPayment(Math.max(0, Number(e.target.value) || 0))}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="calc-apr" style={labelStyle}>APR (%)</label>
          <input
            id="calc-apr" type="number" min={0} max={30} step={0.1}
            value={apr}
            onChange={e => setApr(Math.max(0, Number(e.target.value) || 0))}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="calc-term" style={labelStyle}>Loan Term</label>
          <select
            id="calc-term"
            value={termMonths}
            onChange={e => setTermMonths(Number(e.target.value))}
            style={{ ...inputStyle, appearance: 'none' }}
          >
            {TERM_OPTIONS.map(t => <option key={t.months} value={t.months}>{t.label}</option>)}
          </select>
        </div>
      </div>

      {/* Result */}
      <div style={{ background: 'var(--color-navy)', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.75rem', color: 'oklch(72% 0.01 220)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          Estimated Monthly Payment
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: compact ? '1.75rem' : '2.25rem', fontWeight: 700, color: 'var(--color-amber)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
          {formatCurrency(result.monthlyPayment)}<span style={{ fontSize: '0.9375rem', color: 'oklch(72% 0.01 220)', fontWeight: 500 }}>/mo</span>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
        <div>
          <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-navy)', fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(result.loanAmount)}</p>
          <p style={{ fontSize: '0.6875rem', color: 'var(--color-sage)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Loan Amount</p>
        </div>
        <div>
          <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-navy)', fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(result.totalInterest)}</p>
          <p style={{ fontSize: '0.6875rem', color: 'var(--color-sage)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Interest</p>
        </div>
        <div>
          <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-navy)', fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(result.totalPaid)}</p>
          <p style={{ fontSize: '0.6875rem', color: 'var(--color-sage)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Paid</p>
        </div>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-sage)', lineHeight: 1.5 }}>
        Estimate only — excludes tax, title, license, and doc fees. Actual rate and terms depend on credit approval. Contact us for a firm quote.
      </p>
    </div>
  )
}
