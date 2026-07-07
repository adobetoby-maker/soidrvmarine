# Content Needed — Southern Idaho RV & Marine
Generated: 2026-07-05 · Updated: 2026-07-07 (gap-closing build)
Status: Live at https://soidrvmarine.worker-bee.app · Inventory now 67 units (49 RV / 18 boat) matching the dealer's own "1–30 of 67" count

## Priority 1 — Replace Before Full Launch

- [ ] **Phone number discrepancy — confirm with dealer.** We use (208) 324-4661 everywhere (matches the physical yard signage visible in the dealer's own inventory photos). But the live soidrvmarine.com header/nav currently shows a different clickable number, (208) 795-3119 — this has the signature of a call-tracking number (e.g. CallRail) swapped in via JS for a specific ad channel. Ask the dealer: is 795-3119 a tracking number for a particular campaign, or has their primary line actually changed? Do not swap our number until confirmed.
- [ ] **Podium webchat widget** — not active. Add `NEXT_PUBLIC_PODIUM_API_KEY` to Coolify env vars to turn on live chat (code is already wired in `src/app/layout.tsx:38-46`, gated behind this env var so it silently stays off until the real key lands — no fake widget id has been used).
- [ ] **2 RV photos — genuinely unavailable, not a placeholder oversight**:
  - 2026 Forest River Palomino SZSS-1240 ($19,420) — dealer's own website serves a placeholder for every current listing of this unit
  - 2026 Forest River Palomino SZSS-500 ($16,420) — same, both active stock numbers (TN120610, TN120374) have no real photo on soidrvmarine.com
  - Ask the dealer directly for phone photos of these two units, or wait until DeskManager picks up new photography from the manufacturer feed.
- [ ] **Google Maps embed** — contact page currently shows a styled address card instead of a live map iframe (`src/app/(public)/contact/page.tsx` — search `[DEMO] replace this block with a real Google Maps embed iframe`).

## Priority 2 — Verify Before Launch

- [ ] **rv008 trim code** — we matched "Passport 253RD" to the dealer's current "Passport 253RDWE" listing (same price, $34,250) — confirm this is the same floorplan, just a fuller trim code.
- [ ] **rv015 model year** — our data said "2020 CrossRoads Cruiser 22BBH" but the dealer's current lot only has a 2022 of the same floorplan/price ($21,750). Photo now shown is the 2022 unit. Confirm the actual unit on the lot is 2022, or correct the model year in the DB.
- [ ] **GA4 measurement ID** — `.env.local` has `NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX` placeholder. Needs a real property ID.

## Priority 2 — New Pages Awaiting Dealer Confirmation (gap-closing build, 2026-07-07)

These pages are live with plausible, clearly-labeled values shown to the dealer for confirmation — nothing is passed off as final. Each carries a `[DEMO]` code comment at the exact line.

- [ ] **Storage rate** (`/storage`) — monthly outdoor storage price shown is last-audit advertised rate. Confirm current per-unit monthly rate.
- [ ] **Parts & Service department hours** (`/locations`) — shown at parity with Sales hours (Mon–Fri 9–6 · Sat 9–5). Confirm actual department hours; they often differ from Sales.
- [ ] **Return policy** (`/returns`) — return window and restocking-fee percentage are placeholders. Confirm exact terms before this page is treated as binding.
- [ ] **Idaho Parks & Rec fees** (`/parks-rec`) — state-set registration/sticker fees shown; subject to change by the State of Idaho. Verify current amounts before quoting a customer.
- [ ] **Powersports stock** (`/powersports`) — real nav category on the live site but returned zero live units on every filtered URL during the scrape. Page renders an honest empty/"call for availability" state. Send current powersports inventory (or DeskManager will populate it once syncing).
- [ ] **Resend sending domain** — lead forms (`/api/lead`: parts, service, careers, financing, trade-in, storage, contact) send via Resend. Confirm the verified sending domain / `RESEND_API_KEY` in Coolify env so submissions deliver to the dealer's real inbox.

## Priority 3 — Nice to Have

- [ ] Real photos for all 29 units directly from DeskManager feed once the live sync is turned on (currently 27 of 29 have confirmed CDN photos scraped from soidrvmarine.com; 2 are documented gaps above).
- [ ] Facebook/Google Business Profile URLs in `src/lib/types.ts` (`DEALER_INFO.gbpUrl`, `fbUrl`) are best-guess placeholders — confirm with dealer.

## How to Send Content

Reply with photos, a real Podium API key, or corrections to the items above, and they'll be swapped in the same day.
