// Built by ATLAS — 2026-07-08
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getList, clear, subscribe, COMPARE_MAX } from '@/lib/shoplist'

/** Fixed bottom bar showing the current compare selection. Renders nothing when empty. */
export function CompareBar() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const sync = () => setCount(getList('compare').length)
    sync()
    return subscribe(sync)
  }, [])

  if (count === 0) return null
  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 40,
      background: 'var(--color-navy)', color: '#fff',
      borderTop: '2px solid var(--color-amber)', boxShadow: '0 -8px 28px rgba(10,24,38,0.35)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
          {count} of {COMPARE_MAX} selected to compare
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.6rem' }}>
          <button onClick={() => clear('compare')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
            Clear
          </button>
          <Link href="/compare" style={{ background: 'var(--color-amber)', color: '#fff', borderRadius: 8, padding: '0.5rem 1.25rem', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
            Compare {count > 1 ? `(${count})` : ''}
          </Link>
        </div>
      </div>
    </div>
  )
}
