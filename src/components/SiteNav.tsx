// Built by ATLAS — 2026-07-04
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { DEALER_INFO } from '@/lib/types'

const navLinks = [
  { label: 'RVs', href: '/rvs' },
  { label: 'Boats', href: '/boats' },
  { label: 'Mercury Outboards', href: '/motors/mercury-outboards' },
  { label: 'About', href: '/about' },
  { label: 'Financing', href: '/financing' },
  { label: 'Contact', href: '/contact' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background 200ms ease-out, box-shadow 200ms ease-out',
        background: scrolled ? 'rgba(245, 241, 235, 0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(28, 43, 56, 0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: 'var(--color-amber)',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                {/* Simplified anchor icon */}
                <circle cx="10" cy="5" r="2" stroke="white" strokeWidth="1.5" fill="none" />
                <line x1="10" y1="7" x2="10" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 12 Q10 17 15 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <line x1="5" y1="12" x2="3" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="15" y1="12" x2="17" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--color-navy)',
                letterSpacing: '-0.01em',
              }}>
                Southern Idaho
              </div>
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                color: 'var(--color-sage)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                RV &amp; Marine
              </div>
            </div>
          </Link>

          {/* Desktop nav — display toggled via CSS class, not inline style */}
          <nav
            style={{ alignItems: 'center', gap: '0.25rem' }}
            className="desktop-nav"
            aria-label="Main navigation"
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-navy)',
                  borderRadius: 6,
                  textDecoration: 'none',
                  transition: 'background 150ms ease-out',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(28, 43, 56, 0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={DEALER_INFO.phoneHref}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0.5rem 1rem',
                background: 'var(--color-amber)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: 8,
                textDecoration: 'none',
                letterSpacing: '-0.01em',
                transition: 'background 150ms ease-out, transform 150ms ease-out',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-amber-light)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-amber)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              className="btn-tactile"
            >
              <Phone size={14} strokeWidth={2.5} />
              <span className="hide-mobile">{DEALER_INFO.phone}</span>
              <span className="show-mobile">Call Us</span>
            </a>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="hamburger"
              style={{
                background: 'none',
                border: 'none',
                padding: 6,
                color: 'var(--color-navy)',
                borderRadius: 6,
              }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav
            style={{
              borderTop: '1px solid var(--color-parchment-dark)',
              padding: '1rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
            aria-label="Mobile navigation"
          >
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: '0.625rem 0.75rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--color-navy)',
                  borderRadius: 6,
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <style>{`
        .desktop-nav { display: none; }
        .hide-mobile { display: none; }
        .show-mobile { display: inline; }
        .hamburger { display: flex !important; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hide-mobile { display: inline !important; }
          .show-mobile { display: none !important; }
          .hamburger { display: none !important; }
        }
      `}</style>
    </header>
  )
}
