'use client'
// Built by ATLAS — 2026-07-07
// Trade-in valuation request — posts to /api/lead with formType=trade-in.
// NOTE: /api/lead is owned by WS1 (generalized Resend lead route accepting a
// formType field). This form is built against that contract; until WS1's
// route lands, submissions will 404/error at the network layer only — the
// form itself is complete and follows the same idle/sending/sent/error
// pattern as ContactForm.tsx.

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.75rem', border: '1.5px solid var(--color-parchment-dark)',
  borderRadius: 8, fontSize: '0.9375rem', color: 'var(--color-navy)', background: 'white', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.375rem',
}

export function TradeInForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    setStatus('sending')
    const form = new FormData(formEl)
    const payload = { formType: 'trade-in', ...Object.fromEntries(form.entries()) }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('sent')
      formEl.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem' }} aria-hidden><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Request Received</h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)' }}>A specialist will send your trade-in range within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label htmlFor="ti-unit-type" style={labelStyle}>Unit Type</label>
        <select id="ti-unit-type" name="unitType" required defaultValue="" style={{ ...inputStyle, appearance: 'none' }}>
          <option value="" disabled>Select unit type…</option>
          <option value="RV">RV</option>
          <option value="Boat">Boat</option>
          <option value="Outboard Motor">Outboard Motor</option>
          <option value="Trailer">Trailer</option>
          <option value="Powersports">Powersports</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label htmlFor="ti-year" style={labelStyle}>Year</label>
          <input id="ti-year" name="year" type="number" min={1950} max={2027} required style={inputStyle} />
        </div>
        <div>
          <label htmlFor="ti-condition" style={labelStyle}>Condition</label>
          <select id="ti-condition" name="condition" required defaultValue="" style={{ ...inputStyle, appearance: 'none' }}>
            <option value="" disabled>Select condition…</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Needs Work">Needs Work</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label htmlFor="ti-make" style={labelStyle}>Make</label>
          <input id="ti-make" name="make" type="text" required style={inputStyle} />
        </div>
        <div>
          <label htmlFor="ti-model" style={labelStyle}>Model</label>
          <input id="ti-model" name="model" type="text" required style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="ti-mileage" style={labelStyle}>Mileage / Engine Hours</label>
        <input id="ti-mileage" name="mileageOrHours" type="text" placeholder="e.g. 24,000 miles or 310 hours" style={inputStyle} />
      </div>

      <div>
        <label htmlFor="ti-notes" style={labelStyle}>Notes <span style={{ fontWeight: 400, color: 'var(--color-sage)' }}>(optional)</span></label>
        <textarea
          id="ti-notes" name="notes" rows={3}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
          placeholder="Any upgrades, damage, or details worth knowing about?"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label htmlFor="ti-name" style={labelStyle}>Your Name</label>
          <input id="ti-name" name="name" type="text" required autoComplete="name" style={inputStyle} />
        </div>
        <div>
          <label htmlFor="ti-phone" style={labelStyle}>Phone</label>
          <input id="ti-phone" name="phone" type="tel" required autoComplete="tel" style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="ti-email" style={labelStyle}>Email</label>
        <input id="ti-email" name="email" type="email" required autoComplete="email" style={inputStyle} />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', background: 'var(--color-navy)', color: 'white', fontWeight: 700, borderRadius: 8, border: 'none', fontSize: '0.9375rem', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        {status === 'sending' ? 'Sending…' : 'Get My Trade-In Range'}
      </button>

      {status === 'error' && (
        <p style={{ fontSize: '0.8125rem', color: '#b91c1c' }}>Something went wrong — please call us directly or try again.</p>
      )}

      <p style={{ fontSize: '0.75rem', color: 'var(--color-sage)', lineHeight: 1.5 }}>
        This is a free, no-obligation estimate — not a binding offer. Final value confirmed on inspection.
      </p>
    </form>
  )
}
