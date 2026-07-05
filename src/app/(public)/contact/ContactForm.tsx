'use client'
// Built by ATLAS — 2026-07-05
// Client-side contact form — posts to /api/contact (Resend-backed)

import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.75rem', border: '1.5px solid var(--color-parchment-dark)',
  borderRadius: 8, fontSize: '0.9375rem', color: 'var(--color-navy)', background: 'white', boxSizing: 'border-box',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.375rem',
}

export function ContactForm({ unitRef }: { unitRef: string | null }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('sent')
      e.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem' }} aria-hidden><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Message Sent</h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)' }}>We'll respond within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div>
          <label htmlFor="contact-first" style={labelStyle}>First Name</label>
          <input id="contact-first" name="firstName" type="text" required autoComplete="given-name" style={inputStyle} />
        </div>
        <div>
          <label htmlFor="contact-last" style={labelStyle}>Last Name</label>
          <input id="contact-last" name="lastName" type="text" required autoComplete="family-name" style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" style={labelStyle}>Phone</label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" style={inputStyle} />
      </div>

      <div>
        <label htmlFor="contact-email" style={labelStyle}>Email</label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" style={inputStyle} />
      </div>

      <div>
        <label htmlFor="contact-subject" style={labelStyle}>I'm interested in…</label>
        <select id="contact-subject" name="subject" defaultValue={unitRef ? `Unit #${unitRef}` : 'General'} style={{ ...inputStyle, appearance: 'none' }}>
          {unitRef ? <option value={`Unit #${unitRef}`}>{`Unit #${unitRef} — specific unit inquiry`}</option> : null}
          <option value="RV">A specific RV</option>
          <option value="Boat">A specific boat</option>
          <option value="Mercury">Mercury outboard motors</option>
          <option value="Trade-In">Trading in my current unit</option>
          <option value="Financing">Financing options</option>
          <option value="Service">Service &amp; repair</option>
          <option value="General">General question</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" style={labelStyle}>Message</label>
        <textarea
          id="contact-message" name="message" rows={4}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
          placeholder={unitRef ? `I'd like to know more about unit #${unitRef}…` : 'How can we help you?'}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem 1.5rem', background: 'var(--color-navy)', color: 'white', fontWeight: 700, borderRadius: 8, border: 'none', fontSize: '0.9375rem', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'error' && (
        <p style={{ fontSize: '0.8125rem', color: '#b91c1c' }}>Something went wrong — please call us directly or try again.</p>
      )}

      <p style={{ fontSize: '0.75rem', color: 'var(--color-sage)', lineHeight: 1.5 }}>
        By sending a message you agree we may contact you about your inquiry.
      </p>
    </form>
  )
}
