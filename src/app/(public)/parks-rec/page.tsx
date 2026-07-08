// Built by ATLAS — 2026-07-07
import type { Metadata } from 'next'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Idaho Parks & Recreation Fees — Registration Guide | Southern Idaho RV & Marine',
  description: 'Idaho boat registration, invasive species stickers, OHV, and snowmobile permit fees explained. A local guide from Southern Idaho RV & Marine in Jerome, Idaho.',
  alternates: { canonical: `https://${DEALER_INFO.domain}/parks-rec` },
  openGraph: {
    title: 'Idaho Parks & Recreation Fees | Southern Idaho RV & Marine',
    description: 'Boat registration, invasive species stickers, OHV, and snowmobile permit fees — a Magic Valley local’s guide.',
    url: `https://${DEALER_INFO.domain}/parks-rec`,
  },
}

const MARINE_FEES = [
  { item: 'Jet ski / 12′ and under', fee: '$31.50' },
  { item: '13′ – 30′ (increases $2.00 per foot)', fee: '$33.50 – $67.50' },
  { item: 'Each additional foot beyond 30′', fee: '+$2.00' },
]

const INVASIVE_FEES = [
  { item: 'Non-motorized vessel sticker (canoe, kayak, paddleboard, raft)', fee: '$7.00' },
  { item: 'Motorized vessel not registered in Idaho', fee: '$30.00' },
  { item: 'Idaho-registered motorized vessels', fee: 'Included in registration — no separate sticker' },
]

const OHV_FEES = [
  { item: '1-year registration (resident or non-resident)', fee: '$12.00' },
  { item: '2-year registration (resident or non-resident)', fee: '$22.50' },
]

const SNOWMOBILE_FEES = [
  { item: '1-year, resident', fee: '$45.50' },
  { item: '1-year, non-resident', fee: '$59.50' },
  { item: '2-year, resident', fee: '$89.50' },
  { item: '2-year, non-resident', fee: '$117.50' },
]

function FeeTable({ title, note, rows }: { title: string; note: string; rows: { item: string; fee: string }[] }) {
  return (
    <div style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-parchment-dark)', borderRadius: 16, padding: '2rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>{title}</h2>
      <p style={{ fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.55, marginBottom: '1.25rem' }}>{note}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {rows.map(row => (
          <div key={row.item} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'baseline', padding: '0.75rem 0', borderBottom: '1px solid var(--color-parchment-dark)' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-navy)', lineHeight: 1.4 }}>{row.item}</span>
            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ocean)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{row.fee}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ParksRecPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', color: 'white', padding: '4rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', marginBottom: '0.75rem' }}>
            Idaho Department of Parks &amp; Recreation
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
            Registration &amp; Permit Fees
          </h1>
          <p style={{ fontSize: '1rem', color: 'oklch(78% 0.01 220)', maxWidth: 600, lineHeight: 1.65 }}>
            Before you launch a boat, ride an OHV, or trailer a snowmobile in Idaho, the state requires registration or a permit sticker. Here&apos;s what each one costs and where it applies — straight from our years registering units for Magic Valley customers.
          </p>
        </div>
      </div>

      {/* Fee tables */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(360px, 100%), 1fr))', gap: '2rem' }}>
          <FeeTable
            title="Marine (Boat) Registration"
            note="Idaho Department of Parks and Recreation registration for motorized vessels. Fee scales with hull length; a $1.50 vendor processing fee and applicable sales tax apply on top. Registration is valid through December 31 of the year issued."
            rows={MARINE_FEES}
          />
          <FeeTable
            title="Invasive Species Stickers"
            note="Required for any vessel launched on Idaho waters — motorized or not — to fund aquatic invasive species prevention. Exempt: non-motorized, inflatable craft under 10 feet."
            rows={INVASIVE_FEES}
          />
          <FeeTable
            title="Off-Highway Vehicle (OHV) Registration"
            note="Required to legally operate an ATV, UTV, or dirt bike off-road on Idaho public land. Same rate for residents and non-residents."
            rows={OHV_FEES}
          />
          <FeeTable
            title="Snowmobile Certificate of Number"
            note="Required to operate a snowmobile in Idaho. Choose a 1-year or 2-year term; non-resident rates are higher."
            rows={SNOWMOBILE_FEES}
          />
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.8125rem', color: 'var(--color-sage)', lineHeight: 1.6, maxWidth: 760 }}>
          {/* [DEMO] fees set by the State of Idaho and subject to change — verify current amounts at parksandrecreation.idaho.gov or (208) 514-2150 before quoting a customer */}
          Fees are set by the State of Idaho and can change from year to year. We keep our registration counter current, but always confirm the live rate at{' '}
          <a href="https://parksandrecreation.idaho.gov/registration-permits/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-amber)', fontWeight: 600, textDecoration: 'none' }}>
            parksandrecreation.idaho.gov
          </a>{' '}
          or by calling (208) 514-2150.
        </p>
      </div>

      {/* Local hook / CTA */}
      <div style={{ background: 'var(--color-parchment-dark)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', background: 'var(--color-navy)', borderRadius: 16, padding: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>We Handle Registration On-Site</p>
            <p style={{ fontSize: '0.875rem', color: 'oklch(72% 0.01 220)', lineHeight: 1.65, maxWidth: 520 }}>
              Buy a boat, OHV, or snowmobile from us and we&apos;ll walk you through Idaho registration before you ever leave the lot — no separate trip to a county office.
            </p>
          </div>
          <a
            href={DEALER_INFO.phoneHref}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--color-amber)', color: 'white', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}
          >
            {DEALER_INFO.phone}
          </a>
        </div>
      </div>
    </>
  )
}
