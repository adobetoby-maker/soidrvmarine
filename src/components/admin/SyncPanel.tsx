'use client'
// Built by ATLAS — 2026-09-22
// Real status board + sync trigger. Replaces the old hardcoded SITE_STATUS
// object — every badge on this page reflects an actual channel_listings row.

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { ChannelId, ListingStatus } from '@/lib/types'

type Listing = {
  id: string
  channel_id: ChannelId
  status: ListingStatus
  last_error: string | null
  last_synced_at: string | null
  units: { dms_id: string; year: number; make: string; model: string; unit_type: string; slug: string; status: string } | null
}

type SyncStatus = {
  listings: Listing[]
  recentJobs: { id: string; channel_id: ChannelId | null; action: string; queued_at: string; result: Record<string, unknown> | null }[]
  settings: { channel_id: ChannelId; enabled: boolean }[]
}

type ChannelRun = { dms_id: string; unit_type: string; channel_id: ChannelId; outcome: ListingStatus; reason: string }
type SyncResult = {
  startedAt: string
  completedAt: string
  ingest: { added: { dms_id: string; summary: string }[]; updated: { dms_id: string; summary: string }[]; sold: { dms_id: string; summary: string }[] }
  channelRuns: ChannelRun[]
}

const CHANNEL_LABEL: Record<ChannelId, string> = {
  site: 'This Website',
  rv_trader: 'RV Trader',
  boats_group: 'Boats Group',
  rv_universe: 'RV Universe',
  meta: 'Facebook / Instagram',
  google_vl: 'Google Vehicle Ads',
  craigslist: 'Craigslist',
}

const STATUS_COLOR: Record<ListingStatus, string> = {
  live: '#22c55e',
  pending: '#f59e0b',
  needs_review: '#eab308',
  failed: '#ef4444',
  queued: '#64748b',
  removed: '#334155',
}

const HONESTY_COLOR: Record<string, string> = {
  REAL: '#22c55e',
  'BEST-EFFORT': '#f59e0b',
  UNKNOWN: '#ef4444',
}

const FILE_CHANNELS: ChannelId[] = ['rv_trader', 'boats_group', 'rv_universe', 'meta', 'google_vl', 'craigslist']

type ArtifactInfo = { honesty: string; sourceNote: string; unitCount: number; filename: string }

const card: React.CSSProperties = {
  background: '#1a1f2e',
  border: '1px solid #2d3748',
  borderRadius: '10px',
  padding: '1.5rem',
}
const label12: React.CSSProperties = {
  fontSize: '0.6875rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#64748b',
  marginBottom: '0.5rem',
  display: 'block',
}

export function SyncPanel() {
  const router = useRouter()
  const [status, setStatus] = useState<SyncStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [demoToken, setDemoToken] = useState('')
  const [lastRun, setLastRun] = useState<SyncResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [artifacts, setArtifacts] = useState<Partial<Record<ChannelId, ArtifactInfo>>>({})

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/sync-status')
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'status fetch failed')
      setStatus(data)
      setError(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'status fetch failed')
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  useEffect(() => {
    let cancelled = false
    Promise.all(
      FILE_CHANNELS.map(async ch => {
        try {
          const res = await fetch(`/api/channel-feed/${ch}?info=1`)
          const data = await res.json()
          return [ch, data] as const
        } catch {
          return null
        }
      })
    ).then(results => {
      if (cancelled) return
      const next: Partial<Record<ChannelId, ArtifactInfo>> = {}
      for (const r of results) {
        if (r) next[r[0]] = r[1]
      }
      setArtifacts(next)
    })
    return () => { cancelled = true }
  }, [status])

  const runSync = async (stage: 'list-used-boat' | 'sell-used-boat') => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/sync-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-demo-sync-token': demoToken },
        body: JSON.stringify({ stage }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'sync failed')
      setLastRun(data)
      await fetchStatus()
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'sync failed')
    } finally {
      setLoading(false)
    }
  }

  // Roll listings up per channel for the status grid.
  const channels: ChannelId[] = ['site', 'rv_trader', 'boats_group', 'rv_universe', 'meta', 'google_vl', 'craigslist']
  const rollup = new Map<ChannelId, Record<ListingStatus, number>>()
  for (const ch of channels) {
    rollup.set(ch, { live: 0, pending: 0, needs_review: 0, failed: 0, queued: 0, removed: 0 })
  }
  for (const l of status?.listings ?? []) {
    const bucket = rollup.get(l.channel_id)
    if (bucket) bucket[l.status] += 1
  }
  const enabledSet = new Set((status?.settings ?? []).filter(s => s.enabled).map(s => s.channel_id))

  return (
    <>
      {/* ── Sync trigger ─────────────────────────────────────────────────── */}
      <div style={{ ...card, marginBottom: '2rem', borderColor: '#3b82f6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <p style={{ ...label12, marginBottom: 0, color: '#60a5fa' }}>The Propagation Engine</p>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#f1f5f9', margin: 0 }}>
              Test a fictional used boat from listing through sale and channel removal
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="password"
            aria-label="Demo sync token"
            placeholder="Demo sync token"
            value={demoToken}
            onChange={e => setDemoToken(e.target.value)}
            autoComplete="off"
            style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
          />
          <button
            onClick={() => runSync('list-used-boat')}
            disabled={loading}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: loading ? '#1e40af' : '#3b82f6', color: 'white', fontWeight: 600,
              fontSize: '0.875rem', padding: '0.5rem 1rem', borderRadius: '6px',
              border: 'none', cursor: loading ? 'default' : 'pointer',
            }}
          >
            {loading ? 'Running sync…' : 'List Demo Used Boat'}
          </button>
          <button
            onClick={() => runSync('sell-used-boat')}
            disabled={loading}
            style={{ background: '#991b1b', color: 'white', fontWeight: 600, fontSize: '0.875rem', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: loading ? 'default' : 'pointer' }}
          >
            Mark Demo Boat Sold
          </button>

        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.75rem' }}>
          Demo Marine River 18 TEST UNIT · used fishing boat · HIN DMO00001A121 · stock DEMO-USED-BOAT-001. List first, inspect the public page, then mark sold.
        </p>

        {error && (
          <p style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '0.75rem' }}>Error: {error}</p>
        )}

        {lastRun && (
          <div style={{ marginTop: '1.25rem', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '1rem' }}>
            <p style={{ ...label12, color: '#94a3b8' }}>
              Last run — {new Date(lastRun.completedAt).toLocaleTimeString()}
            </p>
            <div style={{
              display: 'grid', gap: '0.375rem', fontSize: '0.75rem', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              background: '#0b1120', border: '1px solid #1e293b', borderRadius: '6px', padding: '0.75rem 0.875rem', marginBottom: '1rem',
            }}>
              {lastRun.ingest.added.map((a, i) => (
                <div key={`a${i}`}><span style={{ color: '#4ade80', fontWeight: 700 }}>+</span> <span style={{ color: '#cbd5e1' }}>{a.summary}</span></div>
              ))}
              {lastRun.ingest.updated.map((u, i) => (
                <div key={`u${i}`}><span style={{ color: '#facc15', fontWeight: 700 }}>~</span> <span style={{ color: '#cbd5e1' }}>{u.summary}</span></div>
              ))}
              {lastRun.ingest.sold.map((s, i) => (
                <div key={`s${i}`}><span style={{ color: '#f87171', fontWeight: 700 }}>-</span> <span style={{ color: '#cbd5e1' }}>{s.summary}</span></div>
              ))}
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                <thead>
                  <tr>
                    {['Unit', 'Channel', 'Outcome', 'Reason'].map(h => (
                      <th key={h} style={{ textAlign: 'left', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' as const, fontSize: '0.625rem', padding: '0 0.5rem 0.375rem 0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lastRun.channelRuns.map((r, i) => (
                    <tr key={i}>
                      <td style={{ padding: '0.2rem 0.5rem 0.2rem 0', color: '#94a3b8', borderBottom: '1px solid #0f172a' }}>{r.dms_id}</td>
                      <td style={{ padding: '0.2rem 0.5rem 0.2rem 0', color: '#e2e8f0', borderBottom: '1px solid #0f172a' }}>{CHANNEL_LABEL[r.channel_id]}</td>
                      <td style={{ padding: '0.2rem 0.5rem 0.2rem 0', borderBottom: '1px solid #0f172a' }}>
                        <span style={{ color: STATUS_COLOR[r.outcome], fontWeight: 700, textTransform: 'uppercase' as const, fontSize: '0.625rem' }}>{r.outcome}</span>
                      </td>
                      <td style={{ padding: '0.2rem 0 0.2rem 0', color: '#64748b', borderBottom: '1px solid #0f172a' }}>{r.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── Real status board ───────────────────────────────────────────── */}
      <div style={{ ...card, marginBottom: '2rem' }}>
        <p style={label12}>Distribution Channels — live from channel_listings</p>
        <p style={{ fontSize: '0.8125rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.5 }}>
          Run a sync above to populate this from zero. Counts are real rows, not placeholders.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.625rem' }}>
          {channels.map(ch => {
            const counts = rollup.get(ch)!
            const total = Object.values(counts).reduce((a, b) => a + b, 0)
            const connected = ch === 'site' || enabledSet.has(ch)
            return (
              <div key={ch} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: '6px', padding: '0.75rem 0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: total ? '0.5rem' : 0 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#f1f5f9', margin: 0 }}>{CHANNEL_LABEL[ch]}</p>
                  <span style={{
                    fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.06em',
                    color: connected ? '#4ade80' : '#64748b',
                    background: connected ? '#4ade8018' : '#64748b18',
                    padding: '0.2rem 0.4rem', borderRadius: '4px',
                  }}>
                    {connected ? 'CREDENTIALS ON FILE' : 'NOT CONNECTED'}
                  </span>
                </div>
                {total === 0 ? (
                  <p style={{ fontSize: '0.75rem', color: '#334155', margin: 0 }}>No listings yet — run a sync</p>
                ) : (
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {(Object.keys(counts) as ListingStatus[]).filter(s => counts[s] > 0).map(s => (
                      <span key={s} style={{ fontSize: '0.75rem', color: STATUS_COLOR[s] }}>
                        {counts[s]} {s.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                )}

                {artifacts[ch] && (
                  <div style={{ marginTop: '0.625rem', paddingTop: '0.625rem', borderTop: '1px solid #1e293b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <span style={{
                        fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.05em',
                        color: HONESTY_COLOR[artifacts[ch]!.honesty], background: `${HONESTY_COLOR[artifacts[ch]!.honesty]}18`,
                        padding: '0.15rem 0.35rem', borderRadius: '3px',
                      }}>
                        {artifacts[ch]!.honesty}
                      </span>
                      <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>{artifacts[ch]!.unitCount} unit(s) in feed</span>
                    </div>
                    <p style={{ fontSize: '0.6875rem', color: '#475569', lineHeight: 1.4, margin: '0 0 0.4rem' }}>{artifacts[ch]!.sourceNote}</p>
                    <a
                      href={`/api/channel-feed/${ch}?download=1`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.75rem', color: '#60a5fa', textDecoration: 'none' }}
                    >
                      View generated {artifacts[ch]!.filename} →
                    </a>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
