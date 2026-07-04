// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import { RV_INVENTORY, BOAT_INVENTORY } from '@/lib/inventory'
import type { ChannelId } from '@/lib/types'

export const metadata: Metadata = { title: 'Status Board' }
export const revalidate = 60

// ── Mock channel sync state (replaced by Supabase query once provisioned) ──
const CHANNELS: { id: ChannelId; label: string; color: string }[] = [
  { id: 'site',        label: 'Website',          color: '#22c55e' },
  { id: 'rv_trader',   label: 'RV Trader',         color: '#3b82f6' },
  { id: 'rv_universe', label: 'RV Universe',       color: '#3b82f6' },
  { id: 'boats_group', label: 'Boats Group',       color: '#3b82f6' },
  { id: 'meta',        label: 'Meta (Facebook)',   color: '#6366f1' },
  { id: 'google_vl',   label: 'Google VL',         color: '#f59e0b' },
  { id: 'craigslist',  label: 'Craigslist',        color: '#94a3b8' },
]

const MOCK_CHANNEL_STATUS: Record<ChannelId, { live: number; pending: number; failed: number; lastSync: string }> = {
  site:        { live: 16, pending: 0, failed: 0, lastSync: '—' },
  rv_trader:   { live: 0,  pending: 0, failed: 0, lastSync: 'Not configured' },
  rv_universe: { live: 0,  pending: 0, failed: 0, lastSync: 'Not configured' },
  boats_group: { live: 0,  pending: 0, failed: 0, lastSync: 'Not configured' },
  meta:        { live: 0,  pending: 0, failed: 0, lastSync: 'Not configured' },
  google_vl:   { live: 0,  pending: 0, failed: 0, lastSync: 'Not configured' },
  craigslist:  { live: 0,  pending: 0, failed: 0, lastSync: 'Not configured' },
}

// ── Inventory summary from static data ──
const ALL = [...RV_INVENTORY, ...BOAT_INVENTORY]
const rvCount   = RV_INVENTORY.length
const boatCount = BOAT_INVENTORY.length
const newCount  = ALL.filter(u => u.condition === 'New').length
const usedCount = ALL.filter(u => u.condition === 'Used').length

const categoryBreakdown = Object.entries(
  ALL.reduce<Record<string, number>>((acc, u) => {
    acc[u.category] = (acc[u.category] ?? 0) + 1
    return acc
  }, {})
).sort((a, b) => b[1] - a[1])

// ── UI helpers ──
const card = {
  background: '#1a1f2e',
  border: '1px solid #2d3748',
  borderRadius: '10px',
  padding: '1.25rem',
} as const

const label12: React.CSSProperties = {
  fontSize: '0.6875rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#64748b',
  marginBottom: '0.375rem',
}

const bigNum: React.CSSProperties = {
  fontSize: '2.25rem',
  fontWeight: 700,
  lineHeight: 1,
  fontVariantNumeric: 'tabular-nums',
  color: '#e2e8f0',
}

export default function AdminPage() {
  return (
    <>
      {/* Page header */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ ...label12, marginBottom: '0.25rem' }}>Southern Idaho RV &amp; Marine</p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
          Operations Dashboard
        </h1>
        <p style={{ fontSize: '0.8125rem', color: '#475569', marginTop: '0.25rem' }}>
          Static mock data — wire to Supabase once provisioned
        </p>
      </div>

      {/* Inventory summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Units', value: ALL.length, accent: '#e2e8f0' },
          { label: 'RVs',         value: rvCount,    accent: '#3b82f6' },
          { label: 'Boats',       value: boatCount,  accent: '#06b6d4' },
          { label: 'New',         value: newCount,   accent: '#22c55e' },
          { label: 'Used',        value: usedCount,  accent: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={card}>
            <p style={label12}>{s.label}</p>
            <p style={{ ...bigNum, color: s.accent }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Two-column: channel health + category breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>

        {/* Channel sync health */}
        <div style={card}>
          <p style={{ ...label12, marginBottom: '1rem' }}>Channel Sync Health</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: '0 1rem', alignItems: 'center' }}>
            {/* Header row */}
            {['Channel', 'Live', 'Pending', 'Failed', 'Last Sync'].map(h => (
              <p key={h} style={{ ...label12, marginBottom: '0.5rem', fontSize: '0.625rem' }}>{h}</p>
            ))}
            {/* Data rows */}
            {CHANNELS.map(ch => {
              const s = MOCK_CHANNEL_STATUS[ch.id]
              return (
                <>
                  <div key={`${ch.id}-name`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.625rem', borderBottom: '1px solid #1e293b' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.live > 0 ? ch.color : '#334155', flexShrink: 0, display: 'inline-block' }} />
                    <span style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>{ch.label}</span>
                  </div>
                  <p key={`${ch.id}-live`}    style={{ fontSize: '0.875rem', fontWeight: 600, color: s.live > 0    ? '#22c55e' : '#334155', fontVariantNumeric: 'tabular-nums', paddingBottom: '0.625rem', borderBottom: '1px solid #1e293b' }}>{s.live}</p>
                  <p key={`${ch.id}-pending`} style={{ fontSize: '0.875rem', fontWeight: 600, color: s.pending > 0 ? '#f59e0b' : '#334155', fontVariantNumeric: 'tabular-nums', paddingBottom: '0.625rem', borderBottom: '1px solid #1e293b' }}>{s.pending}</p>
                  <p key={`${ch.id}-failed`}  style={{ fontSize: '0.875rem', fontWeight: 600, color: s.failed > 0  ? '#ef4444' : '#334155', fontVariantNumeric: 'tabular-nums', paddingBottom: '0.625rem', borderBottom: '1px solid #1e293b' }}>{s.failed}</p>
                  <p key={`${ch.id}-sync`}    style={{ fontSize: '0.75rem', color: '#475569', paddingBottom: '0.625rem', borderBottom: '1px solid #1e293b' }}>{s.lastSync}</p>
                </>
              )
            })}
          </div>
        </div>

        {/* Category breakdown */}
        <div style={card}>
          <p style={{ ...label12, marginBottom: '1rem' }}>Inventory by Category</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {categoryBreakdown.map(([cat, count]) => (
              <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{cat}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{ width: 80, height: 4, background: '#1e293b', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${(count / ALL.length) * 100}%`, height: '100%', background: '#3b82f6', borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#e2e8f0', fontVariantNumeric: 'tabular-nums', minWidth: 20, textAlign: 'right' }}>{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Setup checklist */}
      <div style={card}>
        <p style={{ ...label12, marginBottom: '1rem' }}>Setup Checklist — Week 0</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.5rem' }}>
          {[
            { done: false, text: 'Provision Supabase project' },
            { done: false, text: 'Run 3 DB migration files' },
            { done: false, text: 'Configure DeskManager API credentials' },
            { done: false, text: 'Wire ingest-deskmanager worker' },
            { done: false, text: 'File RV Trader access request (60-90 day clock)' },
            { done: false, text: 'File Craigslist BAPI access request' },
            { done: false, text: 'Configure Meta catalog feed URL' },
            { done: false, text: 'Wire Google Vehicle Listings feed' },
            { done: false, text: 'Deploy to Coolify → soidrvmarine.worker-bee.app' },
            { done: true,  text: 'Home page live' },
            { done: true,  text: 'RVs browse page live' },
            { done: true,  text: 'Boats browse page live' },
            { done: true,  text: 'Unit detail page live' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
              <span style={{
                width: 16, height: 16, borderRadius: '3px', flexShrink: 0, marginTop: 1,
                background: item.done ? '#22c55e' : 'transparent',
                border: item.done ? '1.5px solid #22c55e' : '1.5px solid #334155',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {item.done && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </span>
              <span style={{ fontSize: '0.8125rem', color: item.done ? '#4ade80' : '#94a3b8' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
