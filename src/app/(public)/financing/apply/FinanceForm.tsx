'use client'
// Built by ATLAS — 2026-07-07
// Financing inquiry form — posts to /api/lead with formType=financing.
// This is an INQUIRY, not a credit application — no SSN, no credit pull.

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.75rem', border: '1.5px solid var(--color-parchment-dark)',
  borderRadius: 8, fontSize: '0.9375rem', color: 'var(--color-navy)', background: 'white', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.375rem',
}

export function FinanceForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    setStatus('sending')
    const form = new FormData(formEl)
    const payload = Object.fromEntries(form.entries())

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, formType: 'financing' }),
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
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Inquiry Received</h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)' }}>A finance specialist will call you within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Disclaimer — prominent, above the fields */}
      <div style={{ padding: '1rem 1.25rem', background: 'oklch(97% 0.015 80)', border: '1.5px solid var(--color-amber)', borderRadius: 10, display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-navy)', lineHeight: 1.55 }}>
          <strong>This is an inquiry, not a credit application.</strong> We won't run your credit or ask for a Social Security number here — a finance specialist follows up with next steps and the full application if you'd like to proceed.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label htmlFor="fin-name" style={labelStyle}>Name</label>
          <input id="fin-name" name="name" type="text" required autoComplete="name" style={inputStyle} />
        </div>
        <div>
          <label htmlFor="fin-phone" style={labelStyle}>Phone</label>
          <input id="fin-phone" name="phone" type="tel" required autoComplete="tel" style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="fin-email" style={labelStyle}>Email</label>
        <input id="fin-email" name="email" type="email" required autoComplete="email" style={inputStyle} />
      </div>

      <div>
        <label htmlFor="fin-employment" style={labelStyle}>Employment Status</label>
        <select id="fin-employment" name="employmentStatus" defaultValue="Employed Full-Time" style={{ ...inputStyle, appearance: 'none' }}>
          <option value="Employed Full-Time">Employed Full-Time</option>
          <option value="Employed Part-Time">Employed Part-Time</option>
          <option value="Self-Employed">Self-Employed</option>
          <option value="Retired">Retired</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="fin-desired-unit" style={labelStyle}>Desired Unit / Budget</label>
        <input id="fin-desired-unit" name="desiredUnitOrBudget" type="text" placeholder="e.g. 2025 Keystone travel trailer, around $40,000" style={inputStyle} />
      </div>

      <div>
        <p style={{ ...labelStyle, marginBottom: '0.5rem' }}>Do You Have a Trade-In?</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-navy)', cursor: 'pointer' }}>
            <input type="radio" name="hasTradeIn" value="Yes" defaultChecked style={{ accentColor: 'var(--color-amber)' }} />
            Yes
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-navy)', cursor: 'pointer' }}>
            <input type="radio" name="hasTradeIn" value="No" style={{ accentColor: 'var(--color-amber)' }} />
            No
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="fin-best-time" style={labelStyle}>Best Time to Call</label>
        <select id="fin-best-time" name="bestTimeToCall" defaultValue="Morning" style={{ ...inputStyle, appearance: 'none' }}>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
          <option value="Anytime">Anytime</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', background: 'var(--color-navy)', color: 'white', fontWeight: 700, borderRadius: 8, border: 'none', fontSize: '0.9375rem', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        {status === 'sending' ? 'Sending…' : 'Send Financing Inquiry'}
      </button>

      {status === 'error' && (
        <p style={{ fontSize: '0.8125rem', color: '#b91c1c' }}>Something went wrong — please call us directly or try again.</p>
      )}
    </form>
  )
}
