// Built by ATLAS — 2026-07-07
// Social Autopilot panel for the admin dashboard. Demonstrates the full-managed
// social tier: the same inventory database auto-drafts a week of IG/FB posts,
// generates the creative, and triages incoming questions — dealer approves,
// we handle the rest. All previews are built from REAL inventory; no live Meta
// account is touched (that requires the dealer's Business Suite access).
import { RV_INVENTORY, BOAT_INVENTORY } from '@/lib/inventory'
import { weeklyPlan, engagementQueue, type Platform } from '@/lib/social'

const card: React.CSSProperties = {
  background: '#1a1f2e',
  border: '1px solid #2d3748',
  borderRadius: '10px',
  padding: '1.5rem',
}
const label12: React.CSSProperties = {
  fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', display: 'block',
}

function PlatformDot({ p }: { p: Platform }) {
  const isIg = p === 'instagram'
  return (
    <span title={p} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 18, height: 18, borderRadius: 5, flexShrink: 0,
      background: isIg ? 'linear-gradient(45deg,#f09433,#dc2743,#bc1888)' : '#1877f2',
    }}>
      {isIg ? (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="white" />
        </svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M13 22v-8h3l.5-3H13V9c0-.9.3-1.5 1.6-1.5H17V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H8v3h2.6v8H13z" /></svg>
      )}
    </span>
  )
}

const PILLAR = '#a855f7' // social accent — distinct from the blue "bridge" pillar

export function SocialAutopilot() {
  const plan = weeklyPlan(RV_INVENTORY, BOAT_INVENTORY)
  const queue = engagementQueue()
  const preview = plan.slice(0, 3)

  return (
    <div style={{ ...card, marginBottom: '2rem', borderColor: PILLAR }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <span style={{ background: PILLAR, borderRadius: 6, padding: '0.375rem', display: 'flex' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" />
          </svg>
        </span>
        <div>
          <p style={{ ...label12, marginBottom: 0, color: '#c084fc' }}>Add-On Service — Full-Managed Social</p>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#f1f5f9', margin: 0 }}>
            Social Autopilot — Facebook &amp; Instagram, Done For You
          </h2>
        </div>
        <span style={{
          marginLeft: 'auto', fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.08em',
          color: PILLAR, background: `${PILLAR}20`, padding: '0.25rem 0.5rem', borderRadius: 4,
        }}>
          DEMO
        </span>
      </div>
      <p style={{ fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.55, marginBottom: '1.5rem', maxWidth: '68ch' }}>
        The same database that feeds your website feeds your social. Every week we draft the posts from your real
        inventory, design the creative, schedule to Facebook + Instagram, and reply to comments and DMs. You approve
        the week in one tap — or let it run. Nothing is posted to your accounts until you grant access.
      </p>

      {/* This week's calendar */}
      <p style={label12}>This Week — Auto-Drafted from Inventory</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.625rem', marginBottom: '1.5rem' }}>
        {plan.map((post, i) => (
          <div key={i} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8, padding: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#e2e8f0' }}>{post.day} · {post.time}</span>
              <span style={{ display: 'flex', gap: 3 }}>{post.platforms.map(p => <PlatformDot key={p} p={p} />)}</span>
            </div>
            <span style={{
              fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: '#c084fc', background: `${PILLAR}18`, padding: '0.125rem 0.375rem', borderRadius: 3,
            }}>
              {post.kindLabel}
            </span>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.5rem 0 0', lineHeight: 1.4 }}>
              {post.unit.year} {post.unit.make} {post.unit.model}
            </p>
          </div>
        ))}
      </div>

      {/* Post previews */}
      <p style={label12}>Generated Post Previews</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {preview.map((post, i) => (
          <div key={i} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
            {/* faux post header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 0.75rem' }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.625rem', fontWeight: 700, color: 'white' }}>SI</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f1f5f9' }}>soidrvmarine</span>
              <span style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>{post.platforms.map(p => <PlatformDot key={p} p={p} />)}</span>
            </div>
            {/* photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.photo} alt={`${post.unit.year} ${post.unit.make} ${post.unit.model}`} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', background: '#1e293b' }} />
            {/* caption */}
            <div style={{ padding: '0.75rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 0.5rem' }}>{post.caption}</p>
              <p style={{ fontSize: '0.6875rem', color: '#818cf8', lineHeight: 1.5, margin: 0 }}>
                {post.hashtags.map(t => `#${t}`).join(' ')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement triage */}
      <p style={label12}>Comment &amp; DM Triage — Suggested Replies</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.5rem' }}>
        {queue.map((item, i) => (
          <div key={i} style={{ background: '#111827', border: '1px solid #1e293b', borderRadius: 8, padding: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <PlatformDot p={item.platform} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e2e8f0' }}>{item.handle}</span>
              <span style={{ fontSize: '0.6875rem', color: '#475569' }}>· {item.minutesAgo}m ago</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#cbd5e1', margin: '0 0 0.5rem', lineHeight: 1.45 }}>&ldquo;{item.question}&rdquo;</p>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 6, padding: '0.625rem 0.75rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>
              <div>
                <span style={{ ...label12, marginBottom: 2, color: '#22c55e', fontSize: '0.5625rem' }}>Suggested reply</span>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineHeight: 1.45 }}>{item.suggestedReply}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What's included */}
      <div style={{ background: '#0f172a', border: `1px solid ${PILLAR}40`, borderRadius: 8, padding: '1rem 1.25rem' }}>
        <span style={{ ...label12, color: '#c084fc' }}>What&apos;s Included — Full-Managed</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.5rem' }}>
          {[
            'Weekly content calendar from live inventory',
            'Post creative + captions designed for you',
            'Auto-scheduling to Facebook + Instagram',
            'Comment & DM monitoring and replies',
            'New-arrival + price-drop + sold posts',
            'Monthly performance report',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PILLAR} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>
              <span style={{ fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.4 }}>{t}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: '#475569', margin: '0.875rem 0 0', lineHeight: 1.5 }}>
          Requires the dealer to add us as a partner in Meta Business Suite (Instagram must be a Business account
          linked to the Facebook Page). No posts go live until that access is granted and the first week is approved.
        </p>
      </div>
    </div>
  )
}
