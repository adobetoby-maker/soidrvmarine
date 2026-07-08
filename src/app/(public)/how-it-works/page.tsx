// Built by ATLAS — 2026-07-08
import type { Metadata } from 'next'
import Link from 'next/link'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'How It Works — The Inventory Bridge | Southern Idaho RV & Marine',
  description: `How ${DEALER_INFO.shortName} keeps its website, RV Trader, and social in sync automatically — one DeskManager, one database, every channel. Jerome, Idaho.`,
  alternates: { canonical: `https://${DEALER_INFO.domain}/how-it-works` },
}

const STEPS = [
  { n: '1', title: 'DeskManager', body: 'You sell, price, and receive units in your DMS exactly as you do today. Nothing changes in your workflow.' },
  { n: '2', title: 'Sync Script', body: 'Every night the script reads DeskManager&rsquo;s export, finds what changed, and writes it to the database. You never touch this.', mid: true },
  { n: '3', title: 'Database', body: 'One structured source of truth &mdash; prices, photos, specs, availability &mdash; for everything downstream.' },
  { n: '4', title: 'Website + Channels', body: 'The site, RV Trader, Facebook, Instagram, and Google all pull from the same database. Sell a unit and it disappears everywhere.' },
]

export default function HowItWorksPage() {
  return (
    <>
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            The In-Between Piece
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            One DeskManager. One database.<br />Every channel.
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 620, lineHeight: 1.65 }}>
            You keep working in DeskManager. Overnight, a sync reads what changed and updates one database &mdash; and the website plus every listing channel pull from it automatically.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {STEPS.map(s => (
            <div key={s.n} style={{ background: 'var(--color-parchment)', border: `1px solid ${s.mid ? 'var(--color-ocean)' : 'var(--color-parchment-dark)'}`, borderRadius: 12, padding: '1.25rem 1.35rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-amber)' }}>{s.n}</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)', margin: '0.4rem 0 0.4rem' }}>{s.title}</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-sage)', lineHeight: 1.55, margin: 0 }} dangerouslySetInnerHTML={{ __html: s.body }} />
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderLeft: '3px solid var(--color-amber)', borderRadius: 10, padding: '1.1rem 1.35rem', marginBottom: '2.5rem' }}>
          <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--color-navy)', lineHeight: 1.6 }}>
            <strong>The iron rule:</strong> DeskManager is always the master. We read from it &mdash; we never write back to it. Your DMS workflow stays exactly the same.
          </p>
        </div>

        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.5rem' }}>What it means for you</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: '1.25rem' }}>Post once. Everywhere. Automatically.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            ['No double entry', 'You already enter units in DeskManager. That&rsquo;s the only place you type it &mdash; the site and channels follow.'],
            ['Nothing goes stale', 'Sold a unit? It leaves the website, RV Trader, and Facebook on the next sync. No orphan listings.'],
            ['One source of truth', 'Prices, photos, and specs match everywhere because they all come from the same database.'],
            ['Social, from the same data', 'The optional Social Autopilot drafts Facebook & Instagram posts from this same inventory.'],
          ].map(([t, d]) => (
            <div key={t} style={{ padding: '1.1rem 1.25rem', background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 10 }}>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.98rem', color: 'var(--color-navy)', fontWeight: 700 }}>{t}</h3>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--color-sage)', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: d }} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link href="/rvs" style={{ background: 'var(--color-amber)', color: '#fff', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}>Browse Inventory</Link>
          <a href={DEALER_INFO.phoneHref} style={{ border: '1.5px solid var(--color-parchment-dark)', color: 'var(--color-navy)', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem' }}>Call {DEALER_INFO.phone}</a>
        </div>
      </div>
    </>
  )
}
