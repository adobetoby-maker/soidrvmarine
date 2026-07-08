// Built by ATLAS — 2026-07-08
'use client'

import { useEffect, useState } from 'react'

const PALETTES: { id: string; label: string; swatches: [string, string, string] }[] = [
  { id: 'default', label: 'Western Premium', swatches: ['#12293d', '#b0722c', '#f3ede2'] },
  { id: 'bretz', label: 'Bretz Blue & Gold', swatches: ['#14257a', '#f7d449', '#eef1f8'] },
  { id: 'marine', label: 'Deep Marine', swatches: ['#10394a', '#e08a2e', '#eef3f3'] },
  { id: 'sand', label: 'Warm Sand', swatches: ['#33291f', '#bf6f36', '#f4ecdd'] },
]

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('default')

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('soid-palette')) || 'default'
    setActive(saved)
  }, [])

  function pick(id: string) {
    setActive(id)
    try { localStorage.setItem('soid-palette', id) } catch { /* no-op */ }
    if (id === 'default') document.documentElement.removeAttribute('data-palette')
    else document.documentElement.setAttribute('data-palette', id)
  }

  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 60 }}>
      {open && (
        <div style={{ position: 'absolute', bottom: 52, right: 0, width: 230, background: 'var(--color-navy)', borderRadius: 12, padding: '0.75rem', boxShadow: '0 14px 40px -18px rgba(10,24,38,0.6)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-amber-light)' }}>Preview a color theme</p>
          {PALETTES.map(p => (
            <button key={p.id} onClick={() => pick(p.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '0.5rem', borderRadius: 8, marginBottom: 2, cursor: 'pointer',
                background: active === p.id ? 'rgba(255,255,255,0.1)' : 'transparent', border: '1px solid ' + (active === p.id ? 'var(--color-amber)' : 'transparent'), color: '#fff', textAlign: 'left' }}>
              <span style={{ display: 'flex', flexShrink: 0 }}>
                {p.swatches.map((c, i) => <span key={i} style={{ width: 16, height: 16, background: c, borderRadius: i === 0 ? '4px 0 0 4px' : i === 2 ? '0 4px 4px 0' : 0, border: '1px solid rgba(0,0,0,0.15)' }} />)}
              </span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{p.label}</span>
            </button>
          ))}
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.625rem', color: 'oklch(70% 0.01 220)', lineHeight: 1.4 }}>Demo preview &mdash; saved on this device.</p>
        </div>
      )}
      <button aria-label="Preview color themes" onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-navy)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 24, padding: '0.6rem 1rem', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', boxShadow: '0 8px 24px -12px rgba(10,24,38,0.5)' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-amber)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2h2.4A4.6 4.6 0 0 0 22 10.6C22 5.9 17.5 2 12 2z"/></svg>
        Theme
      </button>
    </div>
  )
}
