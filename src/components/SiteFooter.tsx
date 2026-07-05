// Built by ATLAS — 2026-07-04
'use client'

import Link from 'next/link'
import { Phone, MapPin, Clock, Star } from 'lucide-react'
import { DEALER_INFO } from '@/lib/types'

export function SiteFooter() {
  return (
    <footer style={{
      background: 'var(--color-navy)',
      color: 'oklch(85% 0.012 220)',
      marginTop: 'auto',
    }}>
      {/* Trust bar */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '1.5rem',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem' }}>
            <Star size={14} fill="var(--color-amber)" color="var(--color-amber)" />
            <span style={{ color: 'white', fontWeight: 600 }}>{DEALER_INFO.reviewScore}★</span>
            <span>from {DEALER_INFO.reviewCount.toLocaleString()}+ reviews</span>
          </div>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} aria-hidden />
          <span style={{ fontSize: '0.875rem' }}>Veteran-Owned &amp; Operated</span>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} aria-hidden />
          <span style={{ fontSize: '0.875rem' }}>Magic Valley's Only Factory-Direct Mercury Dealer</span>
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} aria-hidden />
          <span style={{ fontSize: '0.875rem' }}>Third-Generation Family Business</span>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '3rem 1.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>

        {/* Brand column */}
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: 'white', marginBottom: 8 }}>
            Southern Idaho RV &amp; Marine
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem', color: 'oklch(75% 0.012 220)' }}>
            Serving Jerome, Twin Falls, Burley, and Magic Valley since 1993. New and used RVs, boats, and Mercury outboard motors.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href={DEALER_INFO.phoneHref} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-amber-dark)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>
              <Phone size={14} />
              {DEALER_INFO.phone}
            </a>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.875rem', color: 'oklch(75% 0.012 220)' }}>
              <MapPin size={14} style={{ marginTop: 2, flexShrink: 0, color: 'var(--color-sage)' }} />
              <span>{DEALER_INFO.address}<br />Jerome, ID 83338</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.875rem', color: 'oklch(75% 0.012 220)' }}>
              <Clock size={14} style={{ marginTop: 2, flexShrink: 0, color: 'var(--color-sage)' }} />
              <span>Mon–Fri 9–6 · Sat 9–5 · Sun Closed</span>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-sage)', marginBottom: '0.875rem' }}>
            Inventory
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }} aria-label="Inventory links">
            {[
              ['Travel Trailers', '/rvs'],
              ['Fifth Wheels', '/rvs'],
              ['Class A Motorhomes', '/rvs'],
              ['Class C Motorhomes', '/rvs'],
              ['Pontoon Boats', '/boats'],
              ['Bass Boats', '/boats'],
              ['Mercury Outboards', '/motors/mercury-outboards'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: '0.875rem', color: 'oklch(80% 0.012 220)', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'oklch(80% 0.012 220)')}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Company */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-sage)', marginBottom: '0.875rem' }}>
            Company
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }} aria-label="Company links">
            {[
              ['About Us', '/about'],
              ['Financing', '/financing'],
              ['Service Department', '/contact'],
              ['Parts &amp; Accessories', '/contact'],
              ['Contact', '/contact'],
              ['Directions from Twin Falls', '/contact#directions'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: '0.875rem', color: 'oklch(80% 0.012 220)', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'oklch(80% 0.012 220)')}
                dangerouslySetInnerHTML={{ __html: label }}
              />
            ))}
          </nav>
        </div>

        {/* Geo + Social */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-sage)', marginBottom: '0.875rem' }}>
            Service Area
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: '1.5rem' }}>
            {[
              ['RV Dealer — Twin Falls', '/rv-dealer-twin-falls-id'],
              ['Boat Dealer — Twin Falls', '/boat-dealer-twin-falls-id'],
              ['Mercury Dealer — Magic Valley', '/mercury-dealer-magic-valley'],
              ['Serving Burley, ID', '/rv-dealer-burley-id'],
              ['Serving Boise, ID', '/rv-dealer-boise-id'],
            ].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: '0.8125rem', color: 'oklch(75% 0.012 220)', textDecoration: 'none', transition: 'color 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'oklch(75% 0.012 220)')}
              >
                {label}
              </Link>
            ))}
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-sage)', marginBottom: '0.75rem' }}>
            Connect
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href={DEALER_INFO.gbpUrl} target="_blank" rel="noopener noreferrer"
              style={{ padding: '0.375rem 0.75rem', background: 'rgba(255,255,255,0.06)', borderRadius: 6, fontSize: '0.8125rem', color: 'oklch(80% 0.012 220)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
              Google
            </a>
            <a href={DEALER_INFO.fbUrl} target="_blank" rel="noopener noreferrer"
              style={{ padding: '0.375rem 0.75rem', background: 'rgba(255,255,255,0.06)', borderRadius: 6, fontSize: '0.8125rem', color: 'oklch(80% 0.012 220)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.25rem 1.5rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', color: 'oklch(55% 0.012 220)' }}>
          <span>© {new Date().getFullYear()} Southern Idaho RV &amp; Marine LLC. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/privacy" style={{ color: 'oklch(55% 0.012 220)', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/sitemap.xml" style={{ color: 'oklch(55% 0.012 220)', textDecoration: 'none' }}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
