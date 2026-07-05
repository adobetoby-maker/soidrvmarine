// Built by ATLAS — 2026-07-05
import type { Metadata } from 'next'
import Link from 'next/link'
import { RV_INVENTORY, BOAT_INVENTORY } from '@/lib/inventory'
import type { ChannelId } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Admin — Southern Idaho RV & Marine',
  robots: 'noindex',
}
export const revalidate = 60

const ALL  = [...RV_INVENTORY, ...BOAT_INVENTORY]
const rvs  = RV_INVENTORY.length
const boats = BOAT_INVENTORY.length

const CHANNELS: { id: ChannelId; label: string; note: string }[] = [
  { id: 'site',        label: 'This Website',       note: 'Live now' },
  { id: 'rv_trader',   label: 'RV Trader',           note: 'Apply for access →' },
  { id: 'rv_universe', label: 'RV Universe',         note: 'Free — enable when ready' },
  { id: 'boats_group', label: 'Boats Group',         note: 'Apply for access →' },
  { id: 'meta',        label: 'Facebook/Instagram',  note: 'Configure catalog feed' },
  { id: 'google_vl',   label: 'Google Vehicle Ads',  note: 'Wire feed URL' },
  { id: 'craigslist',  label: 'Craigslist',          note: 'Apply for BAPI access' },
]

const SITE_STATUS: Record<ChannelId, 'live' | 'ready' | 'pending' | 'off'> = {
  site:        'live',
  rv_trader:   'pending',
  rv_universe: 'ready',
  boats_group: 'pending',
  meta:        'ready',
  google_vl:   'ready',
  craigslist:  'pending',
}

const statusColor: Record<string, string> = {
  live:    '#22c55e',
  ready:   '#3b82f6',
  pending: '#f59e0b',
  off:     '#334155',
}
const statusLabel: Record<string, string> = {
  live:    'LIVE',
  ready:   'READY',
  pending: 'APPLY',
  off:     'OFF',
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

const flowStep: React.CSSProperties = {
  flex: '1',
  background: '#111827',
  border: '1px solid #2d3748',
  borderRadius: '8px',
  padding: '1.25rem',
  minWidth: 0,
}

export default function AdminPage() {
  const newCount  = ALL.filter(u => u.condition === 'New').length
  const usedCount = ALL.filter(u => u.condition === 'Used').length

  return (
    <>
      {/* Top nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <span style={label12}>Southern Idaho RV &amp; Marine</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
            Operations Dashboard
          </h1>
        </div>
        <Link
          href="/"
          style={{
            fontSize: '0.8125rem', color: '#64748b', textDecoration: 'none',
            border: '1px solid #334155', borderRadius: '6px', padding: '0.375rem 0.75rem',
          }}
        >
          ← View Live Site
        </Link>
      </div>

      {/* ── THE IN-BETWEEN PIECE ──────────────────────────────────────────── */}
      <div style={{ ...card, marginBottom: '2rem', borderColor: '#3b82f6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <span style={{ background: '#3b82f6', borderRadius: '6px', padding: '0.375rem', display: 'flex' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </span>
          <div>
            <p style={{ ...label12, marginBottom: 0, color: '#60a5fa' }}>How Your Inventory Gets to the Website</p>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#f1f5f9', margin: 0 }}>
              The In-Between Piece — DeskManager → Database → Site
            </h2>
          </div>
        </div>

        {/* Flow diagram */}
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {/* Step 1: DeskManager */}
          <div style={{ ...flowStep }}>
            <p style={{ ...label12, color: '#94a3b8' }}>Step 1</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.375rem' }}>DeskManager</p>
            <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
              You sell it, price it, receive it in your DMS as always. Nothing changes in your workflow.
            </p>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', color: '#3b82f6', flexShrink: 0, fontSize: '1.25rem' }}>→</div>

          {/* Step 2: Sync */}
          <div style={{ ...flowStep, borderColor: '#3b82f6', background: '#0f172a' }}>
            <p style={{ ...label12, color: '#60a5fa' }}>Step 2 — The In-Between Piece</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.375rem' }}>Sync Script</p>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Every night at 2 AM, our script reads DeskManager&apos;s export, finds what changed (new units, sold units, price updates), and writes those changes to the database. <strong style={{ color: '#60a5fa' }}>You never touch this.</strong>
            </p>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', color: '#3b82f6', flexShrink: 0, fontSize: '1.25rem' }}>→</div>

          {/* Step 3: Supabase */}
          <div style={{ ...flowStep }}>
            <p style={{ ...label12, color: '#94a3b8' }}>Step 3</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.375rem' }}>Database</p>
            <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
              Your inventory lives here in a structured database — prices, photos, specs, availability. One source of truth for all channels.
            </p>
          </div>

          {/* Arrow */}
          <div style={{ display: 'flex', alignItems: 'center', color: '#3b82f6', flexShrink: 0, fontSize: '1.25rem' }}>→</div>

          {/* Step 4: Site */}
          <div style={{ ...flowStep }}>
            <p style={{ ...label12, color: '#94a3b8' }}>Step 4</p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.375rem' }}>Website + Channels</p>
            <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
              The site, RV Trader, Facebook, and Google all pull from the same database. Sell a unit — it disappears everywhere automatically.
            </p>
          </div>
        </div>

        {/* Key rule */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '6px', padding: '0.875rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
            <strong style={{ color: '#f1f5f9' }}>Iron Rule:</strong> DeskManager is always the master. We read from it — we never write back to it. Your DMS workflow stays exactly the same.
          </p>
        </div>

        {/* Demo sync CTA */}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/api/sync-demo"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#3b82f6', color: 'white', fontWeight: 600,
              fontSize: '0.875rem', padding: '0.5rem 1rem', borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
              <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
              <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
              <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
              <path d="M15.5 9H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S16.33 9 15.5 9z"/>
              <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
              <path d="M8.5 15H10v-1.5c0-.83-.67-1.5-1.5-1.5S7 12.67 7 13.5 7.67 15 8.5 15z"/>
            </svg>
            Run Demo Sync
          </a>
          <p style={{ fontSize: '0.75rem', color: '#475569', margin: 0 }}>
            Simulates a DeskManager export: 1 new unit, 1 price change, 1 sold unit
          </p>
        </div>
      </div>

      {/* ── Inventory summary ───────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Units', value: ALL.length,  accent: '#e2e8f0' },
          { label: 'RVs',         value: rvs,          accent: '#3b82f6' },
          { label: 'Boats',       value: boats,        accent: '#06b6d4' },
          { label: 'New',         value: newCount,     accent: '#22c55e' },
          { label: 'Used',        value: usedCount,    accent: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={card}>
            <span style={label12}>{s.label}</span>
            <p style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: s.accent, margin: 0 }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Inventory table ─────────────────────────────────────────────────── */}
      <div style={{ ...card, marginBottom: '2rem' }}>
        <p style={label12}>Active Inventory</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead>
              <tr>
                {['Year', 'Make', 'Model', 'Category', 'Cond.', 'Price', 'Link'].map(h => (
                  <th key={h} style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#64748b', textAlign: 'left', padding: '0 0.75rem 0.625rem 0', borderBottom: '1px solid #1e293b' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL.map((unit, i) => (
                <tr key={unit.slug}>
                  <td style={{ padding: '0.5rem 0.75rem 0.5rem 0', color: '#94a3b8', borderBottom: '1px solid #0f172a' }}>{unit.year}</td>
                  <td style={{ padding: '0.5rem 0.75rem 0.5rem 0', color: '#e2e8f0', fontWeight: 500, borderBottom: '1px solid #0f172a' }}>{unit.make}</td>
                  <td style={{ padding: '0.5rem 0.75rem 0.5rem 0', color: '#e2e8f0', borderBottom: '1px solid #0f172a' }}>{unit.model}</td>
                  <td style={{ padding: '0.5rem 0.75rem 0.5rem 0', color: '#64748b', borderBottom: '1px solid #0f172a' }}>{unit.category}</td>
                  <td style={{ padding: '0.5rem 0.75rem 0.5rem 0', borderBottom: '1px solid #0f172a' }}>
                    <span style={{
                      fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const,
                      color: unit.condition === 'New' ? '#4ade80' : '#fbbf24',
                    }}>
                      {unit.condition}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem 0.5rem 0', color: '#f1f5f9', fontVariantNumeric: 'tabular-nums', borderBottom: '1px solid #0f172a' }}>
                    {unit.price != null
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(unit.price)
                      : <span style={{ color: '#475569' }}>Call</span>
                    }
                  </td>
                  <td style={{ padding: '0.5rem 0 0.5rem 0', borderBottom: '1px solid #0f172a' }}>
                    <Link
                      href={`/inventory/${unit.slug}`}
                      target="_blank"
                      style={{ fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'none' }}
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Channel distribution ────────────────────────────────────────────── */}
      <div style={{ ...card, marginBottom: '2rem' }}>
        <p style={label12}>Distribution Channels</p>
        <p style={{ fontSize: '0.8125rem', color: '#475569', marginBottom: '1rem', lineHeight: 1.5 }}>
          Once the sync is running, one database push broadcasts to all active channels automatically.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.625rem' }}>
          {CHANNELS.map(ch => {
            const s = SITE_STATUS[ch.id]
            return (
              <div key={ch.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: '#111827', border: '1px solid #1e293b', borderRadius: '6px',
                padding: '0.625rem 0.875rem',
              }}>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: s === 'live' ? '#f1f5f9' : '#475569', margin: '0 0 0.125rem' }}>{ch.label}</p>
                  <p style={{ fontSize: '0.6875rem', color: '#334155', margin: 0 }}>{ch.note}</p>
                </div>
                <span style={{
                  fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.08em',
                  color: statusColor[s], background: `${statusColor[s]}18`,
                  padding: '0.25rem 0.5rem', borderRadius: '4px',
                }}>
                  {statusLabel[s]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Week 0 Setup checklist ──────────────────────────────────────────── */}
      <div style={card}>
        <p style={label12}>Setup Checklist — Getting to Production</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
          {[
            { done: true,  text: 'Supabase project provisioned' },
            { done: true,  text: 'DB migrations run (3 files)' },
            { done: true,  text: 'Real inventory seeded (19 RVs + 10 boats)' },
            { done: true,  text: 'Home, RVs, Boats, Detail pages live' },
            { done: true,  text: 'Photo CDN wired (Endeavor Suite)' },
            { done: false, text: 'DeskManager API credentials — get from DMS admin' },
            { done: false, text: 'Nightly sync cron — wire to Coolify scheduler' },
            { done: false, text: 'File RV Trader access request (60–90 day wait)' },
            { done: false, text: 'File Craigslist BAPI access request' },
            { done: false, text: 'Configure Meta catalog feed URL' },
            { done: false, text: 'Podium webchat API key — add to .env.local' },
            { done: false, text: 'Contact form → Resend email delivery' },
            { done: false, text: 'Go live on soidrvmarine.com (DNS transfer)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
              <span style={{
                width: 16, height: 16, borderRadius: '3px', flexShrink: 0, marginTop: 1,
                background: item.done ? '#22c55e' : 'transparent',
                border: `1.5px solid ${item.done ? '#22c55e' : '#334155'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {item.done && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </span>
              <span style={{ fontSize: '0.8125rem', color: item.done ? '#4ade80' : '#94a3b8', lineHeight: 1.4 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
