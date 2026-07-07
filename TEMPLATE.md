# Dealer Site Template — White-Label Playbook

This repo is a **productizable dealer storefront + inventory bridge**. It was built
for Southern Idaho RV & Marine, but every client-specific value is isolated so a
new dealer can be stood up in an afternoon.

> The product is the **bridge**: DMS (DeskManager) → Supabase → website + channels
> + admin dashboard. The storefront is data-driven off the database, so cloning a
> dealer is mostly configuration, not code.

---

## The four pointers you change per dealer

Everything client-specific lives in exactly four places. Change these four, and
you have a new dealer site.

| # | What | File | Effort |
|---|---|---|---|
| 1 | **Identity, brand, social, features** | `src/config/dealer.config.ts` | 10 min — one flat object |
| 2 | **Theme tokens** (colors, fonts) | `src/app/globals.css` → `:root` block (12 OKLch vars + 3 font vars) | 15 min |
| 3 | **Inventory data** | `src/lib/inventory.ts` + `supabase/seed.sql` | Feed-driven — see below |
| 4 | **Hero media** | `public/hero-loop.mp4` + `public/hero-poster.jpg` | Generate or supply |

Nothing else in `src/` assumes a specific dealer. `DEALER_INFO` (imported in ~30
files) is now derived from pointer #1, so those files never need editing.

---

## New-dealer checklist

### 1. Config (`src/config/dealer.config.ts`)
- [ ] `identity` — name, address, phone (+ `phoneHref`), email, lat/lng, domain, directionsUrl
- [ ] `brand` — tagline, heroLine, yearsInBusiness, reviewCount, reviewScore
- [ ] `social` — GBP / Facebook / Instagram / YouTube / X URLs
- [ ] `features` — flip `boats` / `powersports` / `mercuryOutboards` / `storage` / `financing` per what the dealer actually sells
- [ ] `inventory.cdnBase` — the dealer's photo CDN prefix; `inventory.dmsName` — their DMS

### 2. Theme (`src/app/globals.css`)
- [ ] Replace the `:root` OKLch palette (`--color-navy`, `--color-amber`, `--color-sage`, `--color-parchment`, …) with the dealer's brand palette
- [ ] Set `--font-display` / `--font-sans` if the brand calls for it

### 3. Inventory
- [ ] Point the nightly sync at the dealer's DMS export (see `src/app/api/sync-demo` for the shape)
- [ ] Seed initial units: `supabase/seed.sql` (or run the real sync once)
- [ ] Confirm photo URLs resolve from `inventory.cdnBase`

### 4. Hero media
- [ ] Supply `public/hero-poster.jpg` (a strong local scene) and `public/hero-loop.mp4` (5s loop, H.264, faststart, ≤400KB — see the ffmpeg recipe in git history)

### 5. Infrastructure
- [ ] New Supabase project (single-tenant DB per dealer keeps blast-radius clean — see BLAST-RADIUS below)
- [ ] `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`
- [ ] New Coolify app → `<dealer-slug>.worker-bee.app` via the cloudflared tunnel (same recipe as soidrvmarine)
- [ ] DNS CNAME → the shared tunnel target

---

## Serving the hero video (already solved here)

The hero `<video>` is served through a range-aware route (`src/app/api/hero-video/route.ts`)
because static `/public` serving behind the Cloudflare tunnel answered `Range:`
requests with a full 200 and no `Accept-Ranges` — which stops Safari/iOS from ever
starting playback. Keep this route; it's browser-agnostic and reusable as-is.

---

## When this goes multi-tenant (⚠️ read before scaling)

Today each dealer is a **dedicated single-tenant Supabase project** — clean isolation,
zero cross-dealer blast radius. If you move to one shared control-plane DB:

- Add `dealer_id` (or `org_id`) to **every** table from day one.
- Every query filters on it. No exceptions.
- Reference incident: a shared multi-tenant DB with no tenant filter had a
  destructive query wipe a different client's catalog. Design isolation in — don't
  retrofit it.

---

## What's reusable vs client-specific (at a glance)

| Layer | Reusable | Per-client |
|---|---|---|
| Bridge (sync → DB → channels + admin) | ~95% | DMS type, feed URL |
| Storefront (Next.js, filters, pages, lead forms) | ~90% | config + theme + copy + photos |
| Lead pipeline (`/api/lead` + Resend) | 100% | inbox, sending domain |
| Social Autopilot panel | 100% | inventory-driven |
| Deploy (Coolify + tunnel) | 100% | slug + DNS record |

_Built by ATLAS — 2026-07-07._
