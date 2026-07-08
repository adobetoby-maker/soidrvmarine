// Built by ATLAS — 2026-07-08
'use client'

import { useState } from 'react'

type Path = 'trade-in' | 'consign' | 'sell'
const PATHS: { value: Path; label: string }[] = [
  { value: 'trade-in', label: 'Trade toward a purchase' },
  { value: 'consign', label: 'Consign (we sell it for you)' },
  { value: 'sell', label: 'Sell it to us outright' },
]

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.75rem', borderRadius: 8,
  border: '1.5px solid var(--color-parchment-dark)', background: 'var(--color-parchment)',
  color: 'var(--color-navy)', fontSize: '0.9375rem',
}

export function SellForm() {
  const [path, setPath] = useState<Path>('trade-in')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, formType: path }),
      })
      setStatus(res.ok ? 'ok' : 'error')
      if (res.ok) e.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div style={{ padding: '1.5rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 12 }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-navy)', fontSize: '1.125rem', marginBottom: '0.25rem' }}>Thanks &mdash; we&rsquo;ll be in touch.</p>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-sage)' }}>Our team will review your unit and reach out with next steps, usually within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.875rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.375rem' }}>What would you like to do?</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PATHS.map((p) => (
            <button type="button" key={p.value} onClick={() => setPath(p.value)}
              style={{
                padding: '0.5rem 0.875rem', borderRadius: 20, fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                border: '1.5px solid ' + (path === p.value ? 'var(--color-navy)' : 'var(--color-parchment-dark)'),
                background: path === p.value ? 'var(--color-navy)' : 'transparent',
                color: path === p.value ? '#fff' : 'var(--color-navy)',
              }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
        <div><label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>Name</label><input name="name" type="text" required autoComplete="name" style={inputStyle} /></div>
        <div><label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>Phone</label><input name="phone" type="tel" required autoComplete="tel" style={inputStyle} /></div>
      </div>
      <div><label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>Email</label><input name="email" type="email" required autoComplete="email" style={inputStyle} /></div>
      <div>
        <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>Your unit</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          <input name="unitYear" type="text" placeholder="Year" style={inputStyle} />
          <input name="unitMake" type="text" placeholder="Make" style={inputStyle} />
          <input name="unitModel" type="text" placeholder="Model" style={inputStyle} />
        </div>
      </div>
      <div><label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>Anything else? (condition, mileage/hours, payoff)</label><textarea name="message" rows={3} style={inputStyle} /></div>
      <button type="submit" disabled={status === 'sending'} style={{ justifySelf: 'start', background: 'var(--color-amber)', color: '#fff', fontWeight: 700, fontSize: '0.9375rem', padding: '0.75rem 1.75rem', borderRadius: 8, border: 'none', cursor: 'pointer', opacity: status === 'sending' ? 0.7 : 1 }}>
        {status === 'sending' ? 'Sending…' : 'Get My Offer'}
      </button>
      {status === 'error' && <p style={{ color: 'var(--color-error)', fontSize: '0.875rem' }}>Something went wrong &mdash; please call us at the number above.</p>}
    </form>
  )
}
