// Built by ATLAS — 2026-07-07
// Manufacturer brand strip — the lines Southern Idaho RV & Marine actually carries.
// Text wordmarks only (no logo image rights secured) — tasteful, matches financing/contact page rhythm.

const BRANDS = ['Keystone', 'Mercury', 'Montego Bay', 'MirroCraft', 'Palomino', 'Passport']

export function BrandStrip() {
  return (
    <div style={{ background: 'var(--color-parchment)', borderTop: '1px solid var(--color-parchment-dark)', borderBottom: '1px solid var(--color-parchment-dark)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-amber)', textAlign: 'center', marginBottom: '1.25rem' }}>
          Brands We Carry
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem 2.5rem' }}>
          {BRANDS.map(brand => (
            <span
              key={brand}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.0625rem',
                fontWeight: 700,
                color: 'var(--color-navy)',
                opacity: 0.55,
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
