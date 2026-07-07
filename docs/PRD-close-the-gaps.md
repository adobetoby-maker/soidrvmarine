# PRD — Close Every Gap, Ship a Better Product

**Project:** soidrvmarine (Southern Idaho RV & Marine rebuild)
**Author:** ATLAS · 2026-07-07
**Source of truth:** the competitive audit (soidrvmarine.com vs our rebuild)
**Mandate:** Leave no gap unfilled. Match everything their live site does that customers use daily, keep every advantage we already hold, and pull ahead with features neither site has. After this build, switching to us must be pure upside with zero downgrade.

---

## 0. Non-negotiable principles

1. **Reuse, don't reinvent.** A working Resend-backed form route already exists at `src/app/api/contact/route.ts` + `src/app/(public)/contact/ContactForm.tsx`. Every new form (parts, service, financing, careers) is a thin variant of this, not a new backend.
2. **Don't regress our wins.** Keep: instant client-side filtering (no Apply button), the 4.7★/1,203 rating surfaced up front, clean listings (no raw DMS field leakage), one clear CTA per unit, the Shoshone Falls / new hero, and the admin dashboard + DeskManager propagation bridge. Nothing in this build may remove or degrade these.
3. **Real content only.** No lorem, no fake stats. Real Idaho copy, real inventory, real dealer facts from `src/lib/types.ts` `DEALER_INFO`.
4. **Design system is locked.** Navy `--color-navy` / amber `--color-amber` / parchment palette, `var(--font-display)` serif for headings. New pages match existing pages exactly (study `/financing` and `/about` as the template).
5. **Verify everything.** `npx tsc --noEmit` clean, `npm run build` succeeds, every new route returns 200, visual QA on each new page before "done".
6. **Honesty on placeholders.** Anything that needs a dealer-supplied secret (Podium key, real GA4 ID, DeskManager creds, Resend DNS) is wired behind an env var and gated off cleanly — never faked. Document each in `CONTENT-NEEDED.md`.

---

## 1. Workstreams

Each workstream lists: **what**, **files (owned exclusively by that stream — no other stream touches them)**, **acceptance criteria**. New files = no cross-stream conflict. Shared-file edits are quarantined to Workstream 7 (Integration), run last, single-owner.

### WS1 — Lead-capture forms (reuse the Resend route)

**What:** Add the customer-facing forms their site has and we lack. All post to a shared, generalized email API.

- Generalize the contact API into `src/app/api/lead/route.ts` that accepts a `formType` field (contact | parts | service | financing | careers | trade-in | general) and routes the subject line accordingly. Keep `/api/contact` working as a thin alias (back-compat) OR migrate the contact form to `/api/lead`. Sender stays "Demo SIRVMarine <onboarding@resend.dev>" until a verified domain exists.
- **Parts Request page** `/parts` — form fields: name, phone*, email*, unit year/make/model, part description*, VIN/stock# (optional), preferred contact method. `src/app/(public)/parts/page.tsx` + `PartsForm.tsx`.
- **Service Request page** `/service` — fields: name, phone*, email*, unit year/make/model, service type (select: maintenance / repair / winterization / warranty / rigging / other), description*, preferred drop-off date. `src/app/(public)/service/page.tsx` + `ServiceForm.tsx`.
- **Financing application page** `/financing/apply` — a real intake form (NOT a credit pull): name*, phone*, email*, employment status, desired unit / budget, trade-in Y/N, best time to call. Clear disclaimer: "This is an inquiry, not a credit application — a finance specialist follows up." `src/app/(public)/financing/apply/page.tsx` + `FinanceForm.tsx`. Add a prominent "Apply / Get Pre-Qualified" CTA on the existing `/financing` page pointing here.
- **Careers page** `/careers` — the working 11-field employment form pattern from their site (first/last name*, address, city, state, zip, phone*, email*, desired position select, availability date, applied-before Y/N, "what would you contribute" textarea). `src/app/(public)/careers/page.tsx` + `CareersForm.tsx`.

**Files owned:** `src/app/api/lead/route.ts`, and each new page dir under `src/app/(public)/{parts,service,careers}/` and `src/app/(public)/financing/apply/`, plus their `*Form.tsx` client components. Do NOT edit `SiteFooter.tsx` or the header nav here — that's WS7.

**Acceptance:** each form renders in the site design, validates required fields, posts to `/api/lead`, shows a success state, returns tsc-clean. A real test submission returns 200.

### WS2 — Inventory expansion to the full lot

**What:** Close the 67-vs-29 unit gap with real data, and add the missing categories (powersports, used outboard motors).

- Scrape the remaining real units from their live inventory (`https://www.soidrvmarine.com/search/inventory/...` — the unfiltered search returns 67; used-RV returns 21, etc.). For each additional unit extract: year, make, model, condition, category, price, stock#, and the real Endeavor Suite CDN photo URL (`cdnmedia.endeavorsuite.com/.../inventory/{productId}/{imageId}.jpeg`). Aim to reach parity on unit count with real photos; where a real photo genuinely doesn't exist on their site, keep a labeled Picsum placeholder (do not invent).
- Add **powersports** and **used outboard motors** as real categories: extend `UnitType`/category handling in `src/lib/inventory.ts`, `src/lib/db.ts` CATEGORY_MAP, and `src/lib/types.ts` as needed. Add browsable pages/sections for them (a `/powersports` listing reusing the inventory grid + filters, and surface used outboard motors either on `/boats` or a `/motors` browse view).
- Update `supabase/seed.sql` with the expanded inventory so the live DB can be reseeded (BLAST-RADIUS receipt required before any live DB mutation — see §4).

**Files owned:** `src/lib/inventory.ts`, `supabase/seed.sql`, new `src/app/(public)/powersports/page.tsx`. Coordinate CATEGORY_MAP additions in `src/lib/db.ts` — if WS3 also needs db.ts, WS2 owns db.ts and WS3 requests changes via the PRD, not by editing it.

**Acceptance:** inventory count materially higher (target: full lot), new categories filterable, real CDN photos where available, tsc-clean, seed.sql valid SQL.

### WS3 — Inventory UX: search, filters, and beyond-parity tools

**What:** Match their search + our-better filtering, then pull ahead with tools neither site has.

- **Keyword search** across inventory (make/model/year/type) — a search box on `/rvs`, `/boats`, `/powersports` that filters client-side instantly (keep our no-reload advantage).
- **More filter dimensions:** price range and length — add to `InventoryFilters.tsx` and `filterAndSortRvs` in `inventory.ts` (WS2 owns inventory.ts data; WS3 owns `InventoryFilters.tsx` and adds the filter fns — coordinate: WS3 adds pure filter helper functions to a NEW file `src/lib/inventory-filters.ts` to avoid editing WS2's file; the page components import from both).
- **Trade-in valuation tool** `/trade-in` — neither competitor has this. A guided form (unit type, year, make, model, condition, mileage/hours, photos-optional note) that posts to `/api/lead` with formType=trade-in and gives an instant "a specialist will send your range within one business day" confirmation. This makes us *ahead*, not even.
- **Payment calculator** — a client-side monthly-payment estimator (price, down payment, APR, term) shown on unit detail pages and/or `/financing`. Neither competitor has it. `src/components/PaymentCalculator.tsx`.
- **Save / compare (light):** a "favorites" toggle using localStorage on unit cards + a simple compare view, if time permits within the workflow (nice-to-have, lowest priority in this WS).

**Files owned:** `src/components/inventory/InventoryFilters.tsx`, `src/components/inventory/SearchBox.tsx` (new), `src/lib/inventory-filters.ts` (new), `src/app/(public)/trade-in/` (new), `src/components/PaymentCalculator.tsx` (new). Unit-detail integration of the calculator: WS3 creates the component; WS7 wires it into the detail page (shared file).

**Acceptance:** instant keyword search works, price/length filters work without page reload, trade-in form posts, calculator math is correct (standard amortization), tsc-clean.

### WS4 — Content & service pages

**What:** Every informational/service page their site has that builds trust and captures the long tail.

- **Storage page** `/storage` — RV & boat storage, $75/mo (match their advertised rate — confirm in CONTENT-NEEDED.md), what's included, CTA to the lead form. `src/app/(public)/storage/page.tsx`.
- **Locations page** `/locations` — address, hours (sales/parts/service), a REAL embedded Google Maps iframe (replace the placeholder currently on `/contact`), directions CTA. `src/app/(public)/locations/page.tsx`.
- **Idaho Parks & Rec page** `/parks-rec` — informational fee tables (marine registration, invasive-species stickers, OHV, snowmobile permits) — a genuine local hook. Info-only, matching their page. `src/app/(public)/parks-rec/page.tsx`.
- **Legal pages:** `/terms` (Terms & Conditions), `/returns` (Return Policy — 30-day / 15% restocking, match their stated policy), and `/accessibility` (accessibility statement + link to the lead form for feedback). Each its own dir under `src/app/(public)/`.

**Files owned:** new dirs `src/app/(public)/{storage,locations,parks-rec,terms,returns,accessibility}/`. Do not edit the footer here (WS7).

**Acceptance:** all pages render in-design, `/locations` has a working embedded map iframe, legal pages have real policy copy, all return 200, tsc-clean.

### WS5 — Tech, trust & SEO hygiene

**What:** Analytics, crawlability, trust signals, performance — and fix real defects in our current build.

- **GA4 wiring:** add a GA4 component gated behind `NEXT_PUBLIC_GA4_ID` in `src/app/layout.tsx` (WS7 owns layout.tsx — WS5 creates `src/components/Analytics.tsx`, WS7 mounts it). Fix the privacy-policy mismatch: `/privacy` currently *claims* GA4 is active; make the claim conditional/accurate.
- **robots.txt:** add `src/app/robots.ts` returning a valid robots directive that points at the sitemap.
- **Home-page JSON-LD:** add the LocalBusiness/AutoDealer structured-data block the layout comment promises but never emits (WS5 writes the JSON-LD as a component/snippet; WS7 injects into home `page.tsx`).
- **Listing performance:** make `/rvs` and `/boats` fast — set `export const revalidate` (ISR) so the live-DB query is cached instead of running on every request. Target: listings no longer slower than the competitor.
- **Trust/social:** add the remaining social links (Instagram, YouTube, X) to `DEALER_INFO` + footer (WS7 wires footer), and a brand-logo strip component (Keystone, Mercury, Montego Bay, MirroCraft, Palomino, Passport) — `src/components/BrandStrip.tsx`.
- **Brand-logo strip** placed on the home page (component by WS5; mount by WS7).

**Files owned:** `src/app/robots.ts`, `src/components/Analytics.tsx`, `src/components/BrandStrip.tsx`, `src/components/HomeJsonLd.tsx` (new). Privacy copy fix: WS5 may edit `src/app/(public)/privacy/page.tsx` (single-owner, no other WS touches it).

**Acceptance:** robots.txt serves valid content, GA4 component no-ops cleanly when env unset, ISR set on listings, brand strip renders, privacy copy accurate, tsc-clean.

### WS6 — Hero video

**What:** Replace the still hero image with an autoplay, muted, looping cinematic video of the Idaho boat+RV scene (generated separately via Higgsfield — ATLAS supplies the file).

- Add a `<video autoplay muted loop playsinline poster="...">` hero on the home page with the still Shoshone Falls image as the `poster` fallback (so there's never a blank hero, and reduced-motion users get the still). Respect `prefers-reduced-motion` — show the poster still, not the video, when set.
- Optimize: the video must be a compressed web-ready mp4/webm, lazy/priority-balanced so it doesn't tank load. Keep the existing hero layout, copy, CTAs, and trust bar exactly.

**Files owned:** hero `<video>` markup lives in home `page.tsx` (shared — WS7 executes the swap using the component/markup WS6 specifies). WS6 delivers: the video asset path in `public/`, the exact markup, and the reduced-motion handling.

**Acceptance:** hero autoplays muted+looping on desktop and mobile, poster still shows instantly and for reduced-motion users, no layout shift, no load regression.

### WS7 — Integration (SINGLE OWNER, runs LAST — all shared-file edits)

**What:** Every edit to a file more than one workstream would otherwise touch. Run after WS1–WS6 produce their new files.

- **Header nav + `SiteFooter.tsx`:** add nav/footer links to all new pages (parts, service, storage, locations, careers, trade-in, financing/apply, parks-rec, powersports, terms, returns, accessibility). **Fix the dead footer geo-SEO links** (`/rv-dealer-twin-falls-id` etc. currently 404) — either build minimal real geo landing pages or remove/repoint the links. Add the new social links.
- **`src/app/layout.tsx`:** mount `<Analytics/>`, mount Podium chat (already gated behind `NEXT_PUBLIC_PODIUM_API_KEY` — leave gated, do not fake a key).
- **Home `src/app/page.tsx`:** swap in the hero `<video>` (WS6 spec), mount `<BrandStrip/>`, inject `<HomeJsonLd/>`.
- **Unit detail page:** mount `<PaymentCalculator/>` (WS3 component).
- **`src/lib/types.ts` `DEALER_INFO`:** add social URLs (single edit, here).
- **`src/app/(public)/contact/page.tsx`:** replace the map placeholder with the real embedded map (or link to `/locations`).

**Acceptance:** full `npm run build` succeeds, `npx tsc --noEmit` clean, every route in the sitemap returns 200 locally, no dead links (`grep` for the old geo hrefs returns only real routes), visual QA on home + 3 new pages, then deploy.

---

## 2. Beyond-parity summary (the "better product" delta)

After this build we have things **neither** site has: a **trade-in valuation tool**, a **payment calculator**, an **admin ops dashboard + DeskManager→site→multi-channel propagation bridge**, a surfaced **4.7★ live rating**, **instant** (no-reload) filtering + keyword search, clean listings, and a cinematic **hero video** matched to real Idaho geography. That is the "offer a better product" mandate met — not just parity.

## 3. Explicitly out of scope / needs the dealer (document in CONTENT-NEEDED.md, gate cleanly)

- Podium chat **API key** (widget already coded + gated)
- Real **GA4 measurement ID** (plumbing built; ID is theirs)
- **DeskManager credentials** + the nightly sync cron (bridge code exists; creds are theirs)
- **Resend verified sending domain** (needs DNS on their domain)
- Confirmation of live **storage rate**, **powersports** stock, exact **return policy**, and the **(208) 795-3119 vs 324-4661** phone question already flagged

## 4. Live-DB safety

Any reseed of the live Supabase (`scjqstfatugqjzgzpkgg`) to load the expanded inventory requires a fresh **BLAST-RADIUS receipt** (`~/.atlas/blast-radius/<host>.md`) with all four rows (tenant column, shared-by, rows-affected, backup) before the DELETE/INSERT runs. Localhost is exempt. Do NOT skip.

## 5. Definition of done

- [ ] Every WS1–WS7 acceptance criterion met
- [ ] `npx tsc --noEmit` → zero errors
- [ ] `npm run build` → succeeds
- [ ] Every sitemap route returns 200 (local, then live)
- [ ] No dead links (old geo hrefs gone)
- [ ] Visual QA: home + every new page, 4 viewports, footer present
- [ ] Deployed to Coolify, live URL 200
- [ ] `CONTENT-NEEDED.md` updated with the §3 dealer-supplied items
- [ ] Nothing from Principle 2 (our existing wins) regressed
