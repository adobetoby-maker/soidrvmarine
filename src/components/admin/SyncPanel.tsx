'use client'
// Built by ATLAS — 2026-09-22
// Real status board + sync trigger. Replaces the old hardcoded SITE_STATUS
// object — every badge on this page reflects an actual channel_listings row.

import { useEffect, useState, useCallback } from 'react'
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
  simulateConnected: boolean
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
  const [status, setStatus] = useState<SyncStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [simulateConnected, setSimulateConnected] = useState(false)
  const [lastRun, setLastRun] = useState<SyncResult | null>(null)
  const [error, setError] = useState<string | null>(null)

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

  const runSync = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/sync-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulateConnected }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'sync failed')
      setLastRun(data)
      await fetchStatus()
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
              Simulates a DeskManager export, writes real rows to the database, dispatches every eligible channel
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={runSync}
            disabled={loading}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: loading ? '#1e40af' : '#3b82f6', color: 'white', fontWeight: 600,
              fontSize: '0.875rem', padding: '0.5rem 1rem', borderRadius: '6px',
              border: 'none', cursor: loading ? 'default' : 'pointer',
            }}
          >
            {loading ? 'Running sync…' : 'Run Demo Sync'}
          </button>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#94a3b8', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={simulateConnected}
              onChange={e => setSimulateConnected(e.target.checked)}
            />
            Preview: treat unconnected channels as live (clearly tagged SIMULATED)
          </label>
        </div>

        {error && (
          <p style={{ color: '#f87171', fontSize: '0.8125rem', marginTop: '0.75rem' }}>Error: {error}</p>
        )}

        {lastRun && (
          <div style={{ marginTop: '1.25rem', background: '#111827', border: '1px solid #1e293b', borderRadius: '8px', padding: '1rem' }}>
            <p style={{ ...label12, color: '#94a3b8' }}>
              Last run — {new Date(lastRun.completedAt).toLocaleTimeString()}
              {lastRun.simulateConnected ? ' (simulate-connected mode)' : ''}
            </p>
            <div style={{ display: 'grid', gap: '0.25rem', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
              {lastRun.ingest.added.map((a, i) => <div key={`a${i}`}>+ {a.summary}</div>)}
              {lastRun.ingest.updated.map((u, i) => <div key={`u${i}`}>~ {u.summary}</div>)}
              {lastRun.ingest.sold.map((s, i) => <div key={`s${i}`}>- {s.summary}</div>)}
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
            const connected = enabledSet.has(ch)
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
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
