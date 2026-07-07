'use client'
// Built by ATLAS — 2026-07-07
// Service request form — posts to /api/lead with formType=service

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.75rem', border: '1.5px solid var(--color-parchment-dark)',
  borderRadius: 8, fontSize: '0.9375rem', color: 'var(--color-navy)', background: 'white', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.375rem',
}

export function ServiceForm() {
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
        body: JSON.stringify({ ...payload, formType: 'service' }),
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
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Request Sent</h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)' }}>Our service department will follow up within one business day to confirm a drop-off time.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label htmlFor="service-name" style={labelStyle}>Name</label>
        <input id="service-name" name="name" type="text" autoComplete="name" style={inputStyle} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label htmlFor="service-phone" style={labelStyle}>Phone</label>
          <input id="service-phone" name="phone" type="tel" required autoComplete="tel" style={inputStyle} />
        </div>
        <div>
          <label htmlFor="service-email" style={labelStyle}>Email</label>
          <input id="service-email" name="email" type="email" required autoComplete="email" style={inputStyle} />
        </div>
      </div>

      <div>
        <p style={{ ...labelStyle, marginBottom: '0.5rem' }}>Unit Year / Make / Model</p>
        <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1fr 1fr', gap: '0.75rem' }}>
          <input name="unitYear" type="text" placeholder="Year" style={inputStyle} />
          <input name="unitMake" type="text" placeholder="Make" style={inputStyle} />
          <input name="unitModel" type="text" placeholder="Model" style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="service-type" style={labelStyle}>Service Type</label>
        <select id="service-type" name="serviceType" defaultValue="maintenance" style={{ ...inputStyle, appearance: 'none' }}>
          <option value="maintenance">Routine Maintenance</option>
          <option value="repair">Repair</option>
          <option value="winterization">Winterization</option>
          <option value="warranty">Warranty Work</option>
          <option value="rigging">Rigging / Installation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="service-description" style={labelStyle}>Describe the Issue or Service Needed</label>
        <textarea
          id="service-description" name="description" rows={4} required
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
          placeholder="What's going on with your unit? Any symptoms, noises, or specific requests…"
        />
      </div>

      <div>
        <label htmlFor="service-dropoff" style={labelStyle}>Preferred Drop-Off Date</label>
        <input id="service-dropoff" name="preferredDropOffDate" type="date" style={inputStyle} />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', background: 'var(--color-navy)', color: 'white', fontWeight: 700, borderRadius: 8, border: 'none', fontSize: '0.9375rem', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        {status === 'sending' ? 'Sending…' : 'Send Service Request'}
      </button>

      {status === 'error' && (
        <p style={{ fontSize: '0.8125rem', color: '#b91c1c' }}>Something went wrong — please call our service department directly or try again.</p>
      )}
    </form>
  )
}
