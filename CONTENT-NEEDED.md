# Content Needed — Southern Idaho RV & Marine
Generated: 2026-07-05
Status: Live at https://soidrvmarine.worker-bee.app

## Priority 1 — Replace Before Full Launch

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

## Priority 3 — Nice to Have

- [ ] Real photos for all 29 units directly from DeskManager feed once the live sync is turned on (currently 27 of 29 have confirmed CDN photos scraped from soidrvmarine.com; 2 are documented gaps above).
- [ ] Facebook/Google Business Profile URLs in `src/lib/types.ts` (`DEALER_INFO.gbpUrl`, `fbUrl`) are best-guess placeholders — confirm with dealer.

## How to Send Content

Reply with photos, a real Podium API key, or corrections to the items above, and they'll be swapped in the same day.
