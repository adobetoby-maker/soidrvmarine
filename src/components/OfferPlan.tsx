// Built by ATLAS — 2026-07-08
'use client'

import { useState } from 'react'

type Verdict = 'win' | 'par' | 'gap'
const VC: Record<Verdict, { bg: string; label: string }> = {
  win: { bg: '#2f7d5b', label: 'We win' },
  par: { bg: '#5f7180', label: 'Parity' },
  gap: { bg: '#b4562c', label: 'Bretz' },
}
function Chip({ v, eff }: { v: Verdict; eff?: string }) {
  return (
    <span style={{ display: 'inline-block' }}>
      <span style={{ display: 'inline-block', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '0.2rem 0.5rem', borderRadius: 5, color: '#fff', background: VC[v].bg, whiteSpace: 'nowrap' }}>{VC[v].label}</span>
      {eff && <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--color-sage)', marginTop: 2 }}>{eff}</span>}
    </span>
  )
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'bretz', label: 'vs Bretz RV' },
  { id: 'bridge', label: 'The Bridge' },
  { id: 'social', label: 'Social Autopilot' },
  { id: 'admin', label: 'Your Admin Pages' },
] as const
type TabId = typeof TABS[number]['id']

const GROUPS: { title: string; rows: [string, string, string, Verdict, string?][] }[] = [
  { title: 'Navigation & browsing', rows: [
    ['Dropdown nav', '10 groups', 'Inventory / Services / Company', 'par'],
    ['Shop by Payment', '6 bands ($199–$750+)', 'Home tiles + payment filter + est. $/mo on cards', 'par'],
    ['Shop by Brand', 'Brand index', 'Home brand section → filtered inventory', 'par'],
    ['Instant keyword search', 'Structured filters only', 'Instant search', 'win'],
  ]},
  { title: 'Inventory experience', rows: [
    ['Filter depth', 'Sleeps, slides, weight, floorplan', 'Condition, type, brand, price, payment, length, sleeps, slides', 'par', 'weight/floorplan pending data'],
    ['Payment on cards', '“From $X/mo”', '“est. $X/mo” on every card', 'par'],
    ['Compare + Favorites', 'Yes (sign-in)', 'Compare (up to 4) + Save — no sign-in', 'win'],
    ['Payment calculator', 'Copy example only', 'Interactive on every unit', 'win'],
    ['Inventory source', 'Opaque backend', 'DeskManager→DB→channels bridge', 'win'],
    ['Catalog size', '~1,804', '67 (single store)', 'gap', 'scale, not a web fix'],
  ]},
  { title: 'Financing, trust & the back office', rows: [
    ['No-SSN pre-qual', 'Yes', '“No SSN to see your rate” soft pull', 'par'],
    ['Sell / consign / trade', '3 lanes', '/sell — trade, consign, sell outright', 'par'],
    ['Star rating shown', 'Testimonials', '4.7★ / 1,203 up front', 'win'],
    ['Buying guides', 'Blog', '/guides — RV, boat, financing', 'par'],
    ['Video hero', 'Static banner', 'Golden-hour canyon video', 'win'],
    ['Managed social', 'None', 'Social Autopilot', 'win'],
    ['Inventory bridge', 'Templated', 'DeskManager sync + admin dashboard', 'win'],
  ]},
]

export function OfferPlan() {
  const [tab, setTab] = useState<TabId>('overview')

  const kick: React.CSSProperties = { fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--color-amber-dark)', margin: '0 0 0.6rem' }
  const h2: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.95rem)', lineHeight: 1.15, margin: '0 0 0.8rem', fontWeight: 700, color: 'var(--color-navy)' }
  const card: React.CSSProperties = { background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 12, padding: '1.1rem 1.25rem' }
  const wrap: React.CSSProperties = { maxWidth: 1080, margin: '0 auto', padding: '0 1.5rem' }
  const btnPrimary: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--color-amber)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', borderRadius: 8, padding: '0.7rem 1.25rem' }
  const btnGhost: React.CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8, border: '1.5px solid var(--color-parchment-dark)', color: 'var(--color-navy)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', borderRadius: 8, padding: '0.7rem 1.25rem' }

  return (
    <>
      {/* Header band */}
      <div style={{ background: 'var(--color-navy)', color: '#f3ede2', borderBottom: '3px solid var(--color-amber)', padding: '2.75rem 0 0' }}>
        <div style={wrap}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.04em', color: 'oklch(75% 0.02 240)', margin: '0 0 1.2rem' }}>Southern Idaho RV &amp; Marine &middot; Jerome, Idaho</p>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-amber-light)', margin: '0 0 0.7rem' }}>The New Site &middot; What We Built &amp; How It Works</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 4.4vw, 2.9rem)', lineHeight: 1.05, margin: '0 0 0.6rem', fontWeight: 700 }}>You asked for a site like Bretz. Here&rsquo;s a better one &mdash; plus the system behind it.</h1>
          <p style={{ color: 'oklch(80% 0.02 240)', maxWidth: '62ch', margin: '0 0 1.5rem', fontSize: '1.03rem' }}>Everything in one place: the comparison, the inventory bridge and what it needs, the social-media system, and your real admin pages.</p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }} role="tablist">
            {TABS.map(t => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
                style={{ appearance: 'none', border: 0, background: tab === t.id ? 'rgba(255,255,255,0.06)' : 'transparent', color: tab === t.id ? '#fff' : 'oklch(75% 0.02 240)', font: 'inherit', fontWeight: 600, fontSize: '0.9rem', padding: '0.85rem 1.05rem', cursor: 'pointer', borderBottom: `3px solid ${tab === t.id ? 'var(--color-amber)' : 'transparent'}`, marginBottom: -3, borderRadius: '6px 6px 0 0', whiteSpace: 'nowrap' }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ ...wrap, padding: '2.5rem 1.5rem 4rem' }}>

        {tab === 'overview' && (
          <>
            <p style={kick}>The short version</p>
            <h2 style={h2}>A best-in-class storefront, plus a back office the template dealers can&rsquo;t match.</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-sage)', maxWidth: '68ch', marginBottom: '1.25rem' }}>You wanted a site like Bretz RV. The new build matches or beats Bretz on the storefront &mdash; and adds two things a template can&rsquo;t: an inventory <em>bridge</em> that syncs your DeskManager to the website and every channel, and a managed social-media system driven by that same data.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', margin: '1.25rem 0 2rem' }}>
              {[['12', 'Where we beat Bretz', '#2f7d5b'], ['19', 'At parity with Bretz', '#5f7180'], ['67', 'Real units live', 'var(--color-ocean)'], ['4.7★', '1,203 reviews surfaced', 'var(--color-ocean)']].map(([n, l, c]) => (
                <div key={l} style={card}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, lineHeight: 1, color: c as string, fontVariantNumeric: 'tabular-nums' }}>{n}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-sage)', marginTop: '0.4rem' }}>{l}</div>
                </div>
              ))}
            </div>
            <p style={kick}>Everything in one place</p>
            <h2 style={h2}>Links &amp; the pertinent info</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {[['The live site', 'soidrvmarine.worker-bee.app', '/'], ['Your admin dashboard', '/admin — the bridge + social', '/admin'], ['How it works', '/how-it-works', '/how-it-works'], ['Buying guides', '/guides — RV, boat, financing', '/guides']].map(([t, u, href]) => (
                <a key={t} href={href} style={{ display: 'block', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 10, padding: '1rem 1.15rem', textDecoration: 'none', color: 'var(--color-navy)' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t}</span>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--color-amber-dark)', marginTop: '0.25rem' }}>{u}</span>
                </a>
              ))}
            </div>
            <div style={{ ...card, borderLeft: '3px solid var(--color-amber)', marginTop: '1.5rem' }}>
              <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--color-navy)', lineHeight: 1.6 }}><strong>What&rsquo;s live right now:</strong> 67 real units with photos, instant filters (type, brand, price, monthly payment, sleeps, slide-outs), a payment calculator on every unit, save &amp; compare tools, Shop-by-Payment and Shop-by-Brand, financing with soft-pull &ldquo;no SSN&rdquo; pre-qual, sell/trade/consign, storage, buying guides, and a cinematic video hero.</p>
            </div>
          </>
        )}

        {tab === 'bretz' && (
          <>
            <p style={kick}>The comparison you asked for</p>
            <h2 style={h2}>Southern Idaho RV &amp; Marine vs Bretz RV</h2>
            <p style={{ color: 'var(--color-sage)', marginBottom: '1.5rem' }}>Bretz runs on Interact RV (an off-the-shelf RV-dealer CMS), 8 stores, ~1,804 RVs, since 1967. Verdicts: <Chip v="win" /> <Chip v="par" /> <Chip v="gap" />.</p>
            {GROUPS.map(g => (
              <div key={g.title} style={{ marginBottom: '1.75rem' }}>
                <h3 style={{ margin: '0 0 0.6rem', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ocean)' }}>{g.title}</h3>
                <div style={{ overflowX: 'auto', border: '1px solid var(--color-parchment-dark)', borderRadius: 12, background: 'var(--color-parchment)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', minWidth: 560 }}>
                    <thead><tr>{['Feature', 'Bretz', 'Your new site', 'Verdict'].map(h => <th key={h} style={{ textAlign: 'left', padding: '0.7rem 0.9rem', borderBottom: '1px solid var(--color-parchment-dark)', fontSize: '0.66rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 700, background: 'var(--color-parchment-dark)' }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {g.rows.map((r, i) => (
                        <tr key={i}>
                          <td style={{ padding: '0.7rem 0.9rem', borderBottom: '1px solid var(--color-parchment-dark)', fontWeight: 600, color: 'var(--color-navy)', width: '26%', verticalAlign: 'top' }}>{r[0]}</td>
                          <td style={{ padding: '0.7rem 0.9rem', borderBottom: '1px solid var(--color-parchment-dark)', color: 'var(--color-sage)', verticalAlign: 'top' }}>{r[1]}</td>
                          <td style={{ padding: '0.7rem 0.9rem', borderBottom: '1px solid var(--color-parchment-dark)', color: 'var(--color-navy)', verticalAlign: 'top' }}>{r[2]}</td>
                          <td style={{ padding: '0.7rem 0.9rem', borderBottom: '1px solid var(--color-parchment-dark)', verticalAlign: 'top' }}><Chip v={r[3]} eff={r[4]} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
            <div style={{ ...card, borderLeft: '3px solid var(--color-amber)' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-navy)', lineHeight: 1.6 }}><strong>Bottom line:</strong> the storefront is at parity or ahead, and the two things Bretz structurally can&rsquo;t match on-site &mdash; the bridge and managed social &mdash; are yours. The only real &ldquo;Bretz wins&rdquo; are scale (1,804 units, 8 stores), which is business size, not web capability.</p>
            </div>
          </>
        )}

        {tab === 'bridge' && (
          <>
            <p style={kick}>The in-between piece</p>
            <h2 style={h2}>The inventory bridge &mdash; how it works</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-sage)', maxWidth: '68ch', marginBottom: '1.25rem' }}>You keep working in DeskManager exactly as you do today. Overnight, a sync script reads what changed and updates one database. The website and every channel pull from that database &mdash; so a unit you sell disappears everywhere, automatically.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', margin: '1.25rem 0' }}>
              {[['1', 'DeskManager', 'You sell, price, and receive units in your DMS as always. Nothing changes in your workflow.'], ['2', 'Sync script', 'Every night it reads DeskManager’s export, finds what changed, and writes it to the database. You never touch this.'], ['3', 'Database', 'One structured source of truth — prices, photos, specs, availability — for everything downstream.'], ['4', 'Website + channels', 'The site, RV Trader, Facebook/Instagram, and Google all pull from the same database.']].map(([n, t, d], i) => (
                <div key={n} style={{ ...card, borderColor: i === 1 ? 'var(--color-ocean)' : 'var(--color-parchment-dark)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--color-amber)', fontWeight: 700 }}>{n}</span>
                  <h4 style={{ margin: '0.3rem 0 0.35rem', fontSize: '0.98rem', color: 'var(--color-navy)' }}>{t}</h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-sage)', lineHeight: 1.5 }}>{d}</p>
                </div>
              ))}
            </div>
            <div style={{ ...card, borderLeft: '3px solid var(--color-amber)', marginBottom: '2rem' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-navy)', lineHeight: 1.6 }}><strong>Iron rule:</strong> DeskManager is always the master. We read from it &mdash; we never write back to it. Your DMS workflow stays exactly the same.</p>
            </div>
            <p style={kick}>What we&rsquo;ll need from you</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {[['DeskManager export/API access', 'So the nightly sync can read your inventory.'], ['Podium chat key', 'To turn on live chat (already wired, gated behind the key).'], ['GA4 measurement ID', 'To connect analytics to your Google account.'], ['Resend sending domain', 'So lead forms deliver to your real inbox.'], ['Channel accounts', 'RV Trader / Boats Group / Marketplace logins to broadcast listings.'], ['A few real facts', 'Storage rate, department hours, return policy, lender details.']].map(([t, d]) => (
                <div key={t} style={card}><span style={{ fontWeight: 700, color: 'var(--color-navy)', display: 'block', marginBottom: '0.15rem', fontSize: '0.9rem' }}>{t}</span><span style={{ color: 'var(--color-sage)', fontSize: '0.86rem' }}>{d}</span></div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href="/how-it-works" style={btnPrimary}>See the How-It-Works page</a>
              <a href="/admin" style={btnGhost}>Open the admin dashboard</a>
            </div>
          </>
        )}

        {tab === 'social' && (
          <>
            <p style={kick}>Add-on service</p>
            <h2 style={h2}>Social Autopilot &mdash; how it works</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-sage)', maxWidth: '68ch', marginBottom: '1.25rem' }}>The same database that runs your website runs your social. We draft, design, post, and reply &mdash; you approve. It&rsquo;s the differentiator no template dealer, including Bretz, offers on-site.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[['1 · We draft the week', 'Every Monday your inventory becomes a week of posts — new arrivals, weekend features, value picks. Photos, captions, hashtags.'], ['2 · You approve in a tap', 'Glance from your phone, change anything or approve it all. Nothing posts until you grant access.'], ['3 · We post & reply', 'Scheduled to Facebook + Instagram; we answer comments & DMs and route real buyers to your sales desk.']].map(([t, d]) => (
                <div key={t} style={{ ...card, borderLeft: '3px solid var(--color-ocean)' }}><h4 style={{ margin: '0 0 0.35rem', fontSize: '0.98rem', color: 'var(--color-navy)' }}>{t}</h4><p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--color-sage)', lineHeight: 1.5 }}>{d}</p></div>
              ))}
            </div>
            <div style={{ background: 'var(--color-navy)', color: '#f3ede2', borderRadius: 14, padding: '1.5rem 1.75rem', display: 'grid', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', fontWeight: 700, lineHeight: 1 }}>$750<span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-amber-light)', marginTop: '0.3rem' }}>per month</span></div>
              <div>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.9rem', color: '#cdd8df' }}><strong style={{ color: '#fff' }}>Month-to-month</strong>, no contract. First month covers setup.</p>
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.9rem', color: '#cdd8df' }}>Weekly calendar &middot; creative &amp; captions &middot; auto-scheduling &middot; comment &amp; DM replies &middot; monthly report.</p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#cdd8df' }}><strong style={{ color: '#fff' }}>What we need:</strong> partner access in Meta Business Suite. Nothing posts until you approve week one.</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href="https://claude.ai/code/artifact/92614dbd-d575-44d0-96a8-1d2171e389ac" target="_blank" rel="noopener noreferrer" style={btnPrimary}>Full offering one-pager</a>
              <a href="/admin" style={btnGhost}>See the live demo panel</a>
            </div>
          </>
        )}

        {tab === 'admin' && (
          <>
            <p style={kick}>Your real back office</p>
            <h2 style={h2}>The admin pages &mdash; live today</h2>
            <p style={{ color: 'var(--color-sage)', marginBottom: '1.5rem' }}>These aren&rsquo;t mockups. This is the actual operations dashboard running behind your site right now, at <a href="/admin" style={{ color: 'var(--color-amber-dark)', fontWeight: 600 }}>/admin</a>.</p>
            {[['/offerplan/admin-1.jpg', 'The bridge, front and center.', 'The DeskManager → Database → Website + Channels flow, the “iron rule,” a one-click demo sync, and your live inventory counts (67 units).'], ['/offerplan/admin-2.jpg', 'One push, every channel.', 'The full inventory table plus the distribution panel — website, RV Trader, Facebook/Instagram, Google — each with a status you control.'], ['/offerplan/admin-3.jpg', 'Social Autopilot, built in.', 'A week of posts auto-drafted from your real inventory, generated post previews, and a comment/DM triage queue with suggested replies.']].map(([src, t, d]) => (
              <figure key={src} style={{ margin: '0 0 1.75rem' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={t} style={{ width: '100%', border: '1px solid var(--color-parchment-dark)', borderRadius: 12, display: 'block', boxShadow: '0 10px 30px -18px rgba(10,24,38,0.5)' }} />
                <figcaption style={{ fontSize: '0.85rem', color: 'var(--color-sage)', marginTop: '0.6rem' }}><strong style={{ color: 'var(--color-navy)' }}>{t}</strong> {d}</figcaption>
              </figure>
            ))}
            <a href="/admin" style={btnPrimary}>Open your admin dashboard</a>
          </>
        )}
      </div>
    </>
  )
}
