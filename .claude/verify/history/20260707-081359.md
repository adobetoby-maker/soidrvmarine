# Verify — soidrvmarine gap-closing deploy (2026-07-07)

Live: https://soidrvmarine.worker-bee.app · Coolify deploy ydiws6eki72sm9z9tf0j1qzj (finished) · all routes HTTP 200

| Spec item | Observed | Result |
|---|---|---|
| Inventory reseed (67 units) | Live DB reseeded 29→67 units via Supabase Mgmt API under BLAST-RADIUS receipt (backup saved). `/rvs` renders "Showing all 49 RVs", 49 unique detail links; `/boats` 18. Build generates 67 SSG detail pages. | PASS |
| Home hero video | Desktop scroll video (eyes-desktop.webm, 56 frames): frame_006 shows Snake River Canyon golden-hour hero fully rendered with boat on water + reflections. hero-loop.mp4 serves 200 live. ~1.5s empty-cream flash on first uncached load (frames 1–3) before poster/video paints — noted, non-blocking. | PASS |
| Home counts | 49 RVs / 18 boats surfaced in category cards (grep live HTML: "49 in stock" ×2, "18 in stock" ×2). Matches inventory.ts + live DB. | PASS |
| Footer (final frame) | frame_056: 5-column footer (Brand/Inventory/Services/Company/Legal+Connect) present in final scroll frame — harness reaches bottom. New links live: Powersports, Get a Trade-In Value, Parts/Service Request, RV & Boat Storage, Careers, Idaho Parks & Rec Fees, Terms/Return Policy/Accessibility. "Ready to find your next adventure?" CTA above. No overlap. | PASS |
| Mobile (390px) | eyes-mobile.webm: mframe_006 above-fold — hamburger + Call Us header, amber serif hero, stacked CTAs, trust chips wrap, canyon image below. mframe_044 footer — all columns stack, social buttons wrap, copyright at bottom. Single-column, no overflow. | PASS |
| New page — /storage | sframe_002: navy hero "RV & Boat Storage Right Here in Jerome", real local copy (60 Bob Barton Road), dual CTAs, $75/mo pricing card ([DEMO] rate, dealer to confirm), "What You Get" checklist. Brand-consistent. | PASS |
| New routes 200 | / /rvs /boats /parts /service /careers /financing/apply /trade-in /storage /locations /parks-rec /powersports /terms /returns /accessibility /robots.txt /sitemap.xml all 200. /api/lead 405 on GET (correct — POST-only). | PASS |
| Lead forms | Generalized /api/lead (Resend, formType field) wired to parts/service/careers/financing/trade-in/storage/contact. Resend sending domain listed in CONTENT-NEEDED for dealer. | PASS |
| Colors / contrast | Navy hero/footer, amber CTAs, parchment body across all pages. Serif display headings. No AI-slop tells (no purple glow, no 3-col equal cards, no emoji icons) — confirmed by outside review. | PASS |
| Viewport 375 (mobile @2x) | vp375-0.png: full headline "Southern Idaho's Premier RV & Marine Dealer" + eyebrow visible at true scroll-top (confirms the earlier mid-scroll frame was an artifact, not clipping), subhead legible, both CTAs full-width, trust chips wrap to 2 rows, no overflow. | PASS |
| Viewport 1440 (desktop) | vp1440-0.png: split hero — left type column + right canyon photo (boat on water), soft gradient seam at photo's left edge (intentional fade), trust bar spans full width. All legible, no overlap. | PASS |
| Viewport 2560 (4K) | vp2560-0.png: content caps at ~1400px max-width and centers with balanced parchment margins; hero photo holds as right column, type crisp, trust bar full-width. No stretch, no overlap. | PASS |
| Viewport 5K (2560@2x) | vp5K-0.png: identical composition to 4K at 2x density — canyon photo and serif type render sharp, no retina degradation, container centered. | PASS |
| tsc / build | `npx tsc --noEmit` zero output. `npm run build` compiled, 67 detail pages + all new routes generated, zero errors. | PASS |
| Outside input (independent Opus review) | Opus reviewer read 5 frames (home hero/footer desktop, home hero mobile, /rvs, /storage): "8.3/10, SHIP. No AI-slop tells, consistent amber/navy/cream system, real photos, specific local copy." Two cosmetic non-blocking nits: duplicate Privacy link (LEGAL + bottom bar), confirm mobile hero eyebrow at true scroll-top. | PASS |

Beauty: 8.3 (outside-review) / self ~8.4 — both ≥ 7.5 bar. Every row above is PASS.

Follow-ups (non-blocking, logged): (1) hero poster paint on first load ~1.5s flash; (2) dedupe footer Privacy link. Dealer-confirm items (storage rate, dept hours, return window, Idaho fees, powersports stock, Podium key, GA4 id, Resend domain) tracked in CONTENT-NEEDED.md.
