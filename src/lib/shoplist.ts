// Built by ATLAS — 2026-07-08
// Client-only shopping lists (Favorites + Compare) persisted in localStorage.
// No account needed — matches the "save" / "compare" tools competitors gate behind
// sign-in. Each list is a set of unit slugs. A storage event + a custom event let
// any mounted component (heart buttons, the compare bar, the saved page) stay in sync.

const KEYS = { favorites: 'soid-favorites', compare: 'soid-compare' } as const
export type ListKey = keyof typeof KEYS
export const COMPARE_MAX = 4

function read(key: ListKey): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(KEYS[key])
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr.filter((s) => typeof s === 'string') : []
  } catch {
    return []
  }
}

function write(key: ListKey, slugs: string[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEYS[key], JSON.stringify(slugs))
  } catch {
    /* quota / private mode — no-op */
  }
  // Notify same-tab listeners (storage event only fires cross-tab).
  window.dispatchEvent(new CustomEvent('shoplist:change', { detail: { key } }))
}

export function getList(key: ListKey): string[] {
  return read(key)
}

export function has(key: ListKey, slug: string): boolean {
  return read(key).includes(slug)
}

/** Toggle a slug in a list. Returns the new membership state. Compare is capped at COMPARE_MAX. */
export function toggle(key: ListKey, slug: string): boolean {
  const cur = read(key)
  const idx = cur.indexOf(slug)
  if (idx >= 0) {
    cur.splice(idx, 1)
    write(key, cur)
    return false
  }
  if (key === 'compare' && cur.length >= COMPARE_MAX) {
    return false // at cap — don't add, stays unselected
  }
  cur.push(slug)
  write(key, cur)
  return true
}

export function clear(key: ListKey) {
  write(key, [])
}

/** Subscribe to changes (same-tab custom event + cross-tab storage event). Returns unsubscribe. */
export function subscribe(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const onCustom = () => cb()
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEYS.favorites || e.key === KEYS.compare) cb()
  }
  window.addEventListener('shoplist:change', onCustom)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener('shoplist:change', onCustom)
    window.removeEventListener('storage', onStorage)
  }
}
