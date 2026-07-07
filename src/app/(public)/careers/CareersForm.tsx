'use client'
// Built by ATLAS — 2026-07-07
// Careers application form — posts to /api/lead with formType=careers

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.75rem', border: '1.5px solid var(--color-parchment-dark)',
  borderRadius: 8, fontSize: '0.9375rem', color: 'var(--color-navy)', background: 'white', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.375rem',
}

export function CareersForm() {
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
        body: JSON.stringify({ ...payload, formType: 'careers' }),
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
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Application Received</h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)' }}>Thank you for your interest — we review every application and will reach out if it's a fit.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label htmlFor="cf-first" style={labelStyle}>First Name</label>
          <input id="cf-first" name="firstName" type="text" required autoComplete="given-name" style={inputStyle} />
        </div>
        <div>
          <label htmlFor="cf-last" style={labelStyle}>Last Name</label>
          <input id="cf-last" name="lastName" type="text" required autoComplete="family-name" style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-address" style={labelStyle}>Street Address</label>
        <input id="cf-address" name="address" type="text" autoComplete="street-address" style={inputStyle} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.8fr', gap: '0.75rem' }}>
        <div>
          <label htmlFor="cf-city" style={labelStyle}>City</label>
          <input id="cf-city" name="city" type="text" autoComplete="address-level2" style={inputStyle} />
        </div>
        <div>
          <label htmlFor="cf-state" style={labelStyle}>State</label>
          <input id="cf-state" name="state" type="text" defaultValue="ID" autoComplete="address-level1" style={inputStyle} />
        </div>
        <div>
          <label htmlFor="cf-zip" style={labelStyle}>ZIP</label>
          <input id="cf-zip" name="zip" type="text" autoComplete="postal-code" style={inputStyle} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label htmlFor="cf-phone" style={labelStyle}>Phone</label>
          <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" style={inputStyle} />
        </div>
        <div>
          <label htmlFor="cf-email" style={labelStyle}>Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-position" style={labelStyle}>Desired Position</label>
        <select id="cf-position" name="desiredPosition" defaultValue="Sales" style={{ ...inputStyle, appearance: 'none' }}>
          <option value="Sales">Sales</option>
          <option value="Service Technician">Service Technician</option>
          <option value="Parts Department">Parts Department</option>
          <option value="Finance">Finance</option>
          <option value="Detail / Lot Attendant">Detail / Lot Attendant</option>
          <option value="Administrative">Administrative</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="cf-availability" style={labelStyle}>Availability Date</label>
        <input id="cf-availability" name="availabilityDate" type="date" style={inputStyle} />
      </div>

      <div>
        <p style={{ ...labelStyle, marginBottom: '0.5rem' }}>Have You Applied With Us Before?</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-navy)', cursor: 'pointer' }}>
            <input type="radio" name="appliedBefore" value="Yes" style={{ accentColor: 'var(--color-amber)' }} />
            Yes
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-navy)', cursor: 'pointer' }}>
            <input type="radio" name="appliedBefore" value="No" defaultChecked style={{ accentColor: 'var(--color-amber)' }} />
            No
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="cf-contribute" style={labelStyle}>What Would You Contribute to Our Team?</label>
        <textarea
          id="cf-contribute" name="contribution" rows={4} required
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
          placeholder="Tell us about your experience and what you'd bring to the team…"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', background: 'var(--color-navy)', color: 'white', fontWeight: 700, borderRadius: 8, border: 'none', fontSize: '0.9375rem', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        {status === 'sending' ? 'Sending…' : 'Submit Application'}
      </button>

      {status === 'error' && (
        <p style={{ fontSize: '0.8125rem', color: '#b91c1c' }}>Something went wrong — please try again or call us directly.</p>
      )}
    </form>
  )
}
