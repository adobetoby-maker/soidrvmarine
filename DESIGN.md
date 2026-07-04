# Design System — Southern Idaho RV & Marine

Direction: Warm-Western Heritage
Mode: BRAND (public site) + PRODUCT (admin layer)
Built: 2026-07-04

## Palette

| Token | Hex | Role |
|---|---|---|
| `parchment` | `#F5F1EB` | Page ground — warm off-white, Idaho dust |
| `navy` | `#1C2B38` | Primary ink — mountain lake, authority, trust |
| `amber` | `#C17A2F` | Accent — Idaho wheat, Mercury gold (≤2 uses/screen) |
| `pine` | `#2D4A36` | Secondary — Snake River pine, nature |
| `sage` | `#8B7355` | Muted — weathered sagebrush, secondary text |
| `parchment-dark` | `#E8E3DB` | Subtle borders, dividers |
| `ink-light` | `#6B7E8D` | Caption, meta text |

Dark mode (admin preference, not public default):
| `navy-950` | `#0D1820` | Dark ground |
| `navy-900` | `#152130` | Dark surface |
| `amber-dark` | `#E89340` | Accent on dark (lighter for contrast) |

## Typography

Display: Playfair Display (slab-serif, inline @font-face, 600/700 weights)
Body: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui — fast, no FOUT
Data/mono: ui-monospace, "JetBrains Mono", monospace — stock numbers, prices, VINs
Caption: system-ui at 0.75rem / 0.875rem

Scale:
- xs: 0.75rem
- sm: 0.875rem
- base: 1rem
- lg: 1.125rem
- xl: 1.25rem
- 2xl: 1.5rem
- 3xl: 1.875rem
- 4xl: 2.25rem (section headings)
- 5xl: 3rem (hero supporting)
- 6xl: clamp(2.5rem, 5vw, 4rem) (hero headline)
- hero: clamp(2.75rem, 6vw, 5rem) (homepage H1 only)

## Layout

Grid: 12-column, max-width 1400px, px-4 md:px-8 lg:px-16
Asymmetric hero: 55/45 split (text/image) on desktop, stacked on mobile
Section rhythm: py-16 md:py-24
Card radius: rounded-xl (12px crisp) for inventory cards
Button radius: rounded-lg (8px)
Border: 1px solid parchment-dark / navy/10

## Motion (MOTION_INTENSITY: 4)

Default transition: 200ms ease-out
Hover lifts: translateY(-2px) + subtle shadow
Image overlays: opacity 200ms
Entrance reveals: IntersectionObserver, translateY(20px) → 0, opacity 0 → 1
NO parallax on public site (mobile performance)

## Anti-slop compliance

✓ Playfair Display as display (NOT Inter/Roboto/Arial)
✓ No purple/violet (amber + pine + navy palette)
✓ No 3-column equal cards (asymmetric inventory masonry)
✓ No centered hero on dark image (split layout)
✓ No box-shadow outer glows (elevation via color)
✓ No emoji icons (Lucide SVG only)
✓ Real stats: 1,200+ reviews, 4.6★, 60+ years, Magic Valley only Mercury dealer
✓ No AI clichés in copy

## Admin (Product Mode)

Product mode overrides:
- Background: white / navy-950 dark
- No display serif — Geist or system-ui only
- Dense layout: py-4 px-4 grid
- Tabular-nums for all data
- Status colors: green #16A34A, amber #D97706, red #DC2626, neutral #6B7280
