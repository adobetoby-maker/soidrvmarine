// Built by ATLAS — 2026-07-08
'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { has, toggle, subscribe, COMPARE_MAX } from '@/lib/shoplist'

/** Heart (save) + Compare toggle, overlaid on a unit card photo. Stops the parent
 *  <Link> from navigating when tapped. Reflects localStorage state live. */
export function ShopListButtons({ slug }: { slug: string }) {
  const [fav, setFav] = useState(false)
  const [cmp, setCmp] = useState(false)

  useEffect(() => {
    const sync = () => { setFav(has('favorites', slug)); setCmp(has('compare', slug)) }
    sync()
    return subscribe(sync)
  }, [slug])

  const stop = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation() }

  return (
    <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, zIndex: 2 }}>
      <button
        aria-label={fav ? 'Remove from saved' : 'Save this unit'}
        aria-pressed={fav}
        onClick={(e) => { stop(e); setFav(toggle('favorites', slug)) }}
        style={{
          width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: 'rgba(18,41,61,0.55)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Heart size={17} color="#fff" fill={fav ? 'var(--color-amber)' : 'transparent'} strokeWidth={2} />
      </button>
      <button
        aria-label={cmp ? 'Remove from compare' : 'Add to compare'}
        aria-pressed={cmp}
        onClick={(e) => { stop(e); setCmp(toggle('compare', slug)) }}
        title={`Compare up to ${COMPARE_MAX} units`}
        style={{
          fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.03em', cursor: 'pointer',
          padding: '0.25rem 0.5rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.5)',
          background: cmp ? 'var(--color-amber)' : 'rgba(18,41,61,0.55)', backdropFilter: 'blur(4px)',
          color: '#fff',
        }}
      >
        {cmp ? '✓ Compare' : '+ Compare'}
      </button>
    </div>
  )
}
