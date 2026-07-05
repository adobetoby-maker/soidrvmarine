# Southern Idaho RV & Marine — Strategic Project Review

> Built by Fable (review pass for ATLAS)

| Field | Value |
|---|---|
| Project | soidrvmarine — dealer website + inventory sync system |
| Path | /Users/drive/soidrvmarine |
| Live URL | https://soidrvmarine.worker-bee.app |
| Client | Southern Idaho RV & Marine, 60 Bob Barton Road, Jerome ID 83338, (208) 324-4661 |
| Stack | Next.js 16.2.10 App Router, React 19, Supabase (scjqstfatugqjzgzpkgg), Tailwind v4, pg-boss worker, Coolify (Lima VM) + cloudflared tunnel |
| Review date | 2026-07-05 |
| Reviewed against | Actual source tree, migrations, live HTTP responses, git state — not the mission brief alone |

---

## 0. Executive Summary — Read This First

The bones of this project are unusually good for a dealer demo. The Supabase schema
(migrations 001–004) is a genuine production-grade inventory model — VIN/HIN validation,
posting profiles, channel listings, audit log, RLS. The design system passed EYES at 8.2.
The worker architecture (pg-boss, per-channel adapters, 60-minute ingest cron) is the
right shape for the DeskManager sync story.

But there is **one critical production defect and one strategic gap** that must be fixed
before anything else on the wish list:

1. **CRITICAL — The live site is serving invented inventory, not the real inventory.**
   The real 19 RVs + 10 boats exist only in uncommitted local changes to
   `src/lib/inventory.ts`. Production reads from Supabase, and Supabase still holds the
   old `seed.sql` data — 14 invented RVs (Grand Design Reflection 311BHS, Thor Windsport
   34J, Keystone Montana 3855BR…) and 2 invented boats. Verified live at 15:19 UTC today:
   `/rvs` renders Reflection 311BHS, Windsport 34J, Fuzion 427. Deploying the static file
   changes nothing — the DB wins. A prospective client (or the dealer) opening this site
   today sees units the dealer does not own, priced with numbers we made up.

2. **STRATEGIC — The "in-between piece" is scaffolded but hollow.** Every worker job
   handler is a TODO stub. There is no `/api/revalidate` route even though
   `REVALIDATION_SECRET` is provisioned. The admin Status Board renders mock channel
   data from hardcoded constants. The single thing that differentiates this pitch from
   "another dealer template" — DeskManager → site automation — currently does not
   execute a single line of real logic.

The good news: **fixing #1 and building #2 are the same task.** The DeskManager sync
demo, run against a dummy XML file containing the real inventory, is exactly the
mechanism that should replace the stale seed data. Build the demo, run it for real,
and the sync becomes both the sales pitch and the production data path in one motion.

---

## 1. Current State Assessment

### 1.1 What's Working

| Area | State | Evidence |
|---|---|---|
| Live deployment | HTTP/2 200, Coolify + cloudflared stable | `curl -sI` returns 200; date header current |
| Design system | 8.2 beauty score, 4 viewports verified | `.claude/verify/latest.md` — all rows PASS |
| Public pages (9) | `/`, `/rvs`, `/boats`, `/inventory/[slug]`, `/motors/mercury-outboards`, `/about`, `/financing`, `/contact`, `/privacy` | All present in `src/app/(public)/` |
| DB read path | `src/lib/db.ts` queries `units` + `media` with static fallback when env unset | Clean pattern; production confirmed using DB (ISR cache HIT noted in verify) |
| Schema | 4 migrations: canonical units, channel infra, RLS, slugs | See §2 — best asset in the repo |
| Worker skeleton | pg-boss entry + ingest job + 7 channel adapters registered, cron scheduled | `worker/index.ts` — handlers are stubs but topology is right |
| SEO metadata | Per-page titles, descriptions, canonicals, OG images; `sitemap.ts` covers static + unit pages | Read directly from page sources |
| Admin route | `(admin)/admin/page.tsx` "Status Board" exists | Renders — but see gaps below |

### 1.2 What's Incomplete

| Item | Detail |
|---|---|
| Real inventory in DB | `seed.sql` = 14+2 invented units. Real 19+10 units live only in uncommitted `src/lib/inventory.ts`. Never propagated to Supabase. |
| Photos | **14 of 29 units still on picsum** (`F()` calls), 15 on real Endeavor Suite CDN (`P()` calls). Note: the mission brief said 7 remaining — the actual count in the file is 14 (10 RVs at lines 34, 40, 54, 60, 80, 86, 93, 99, 105, 126; 4 boats at 170, 176, 189, 195). |
| Worker handlers | `ingest-deskmanager.ts` = 79 lines, all logic commented out as `TODO(Phase 1)`. All 7 adapters log-and-exit stubs. |
| ISR revalidation | No `src/app/api/` directory at all. `REVALIDATION_SECRET` is set in `.env.local` but nothing consumes it. `adapt-site` adapter references a route that does not exist. |
| Contact form | `action={mailto:…}` — tagged `[DEMO]`. mailto form posts are broken UX (opens the visitor's mail client with garbled query-string body; silently fails on machines with no mail client — i.e., most phones in a dealership parking lot). |
| Admin Status Board | Channel grid is `MOCK_CHANNEL_STATUS` hardcoded constants; inventory counts computed from **static arrays**, not the DB — so the admin page and the public site can disagree about how many units exist. No auth, no nav link, no "how it works" content, no sync trigger. |
| Podium | Zero traces in the codebase. Not started. |
| Git hygiene | Working tree dirty: `src/lib/inventory.ts`, `src/lib/types.ts`, `.claude/verify/latest.md` modified, uncommitted. Only 2 commits total. |

### 1.3 What's Wrong (defects, not gaps)

| # | Defect | Severity | Why it matters |
|---|---|---|---|
| D1 | **Live site shows invented units at real prices** ($159,995 Thor Windsport the dealer doesn't stock) | CRITICAL | If the dealer — or a real shopper who finds the URL — sees this, trust is gone. This is the demo-to-live protocol's exact nightmare: demo content presenting as real. |
| D2 | Home bento claims "220+ units" RVs / "80+" boats — actual real inventory is 19 + 10 | HIGH | Fake metric, no source. Violates the no-fake-metrics rule and is falsifiable by the dealer in one click. |
| D3 | `sitemap.ts` builds unit URLs from **static arrays** while pages render from **DB** | HIGH | Sitemap currently advertises 29 slugs that 404 (real-inventory slugs not in DB) while the 16 DB slugs that actually render are missing from the sitemap. Google gets the exact inverse of reality. |
| D4 | `generateStaticParams` in `[slug]/page.tsx` reads DB at build time, browse pages read DB at request time, sitemap reads static file | HIGH | Three sources of truth for "what units exist." They already disagree (see D3). |
| D5 | `db.ts` `getUnitBySlug` uses `.single()` with no status filter | MEDIUM | A `sold`/`archived` unit remains reachable by direct URL forever. RLS saves the anon key path, but db.ts uses the **service role** key, which bypasses RLS entirely. |
| D6 | Public read path uses `SUPABASE_SERVICE_ROLE_KEY` | MEDIUM | Works because it's server-only, but it wastes the RLS work in migration 003 and makes D5 possible. The anon key + RLS policy ("active, pending_sale only") is the correct client here. |
| D7 | `DEALER_INFO.reviewScore` = 4.7 / `reviewCount` = 1203, verify file says trust bar renders "4.6 Stars" | LOW | One of these is wrong; both are unverified against the dealer's actual GBP. Pick the real number. |
| D8 | `worker/index.ts` uses `require()` inside an ES-typed TS module and `boss.schedule` cron `*/60 * * * *` | LOW | `*/60` in the minutes field is nonstandard (intent is hourly — write `0 * * * *`). The require() calls will fail under ESM compilation; the worker has likely never been executed. |

### 1.4 Honest one-line assessment

A beautiful, well-modeled shell whose data pipeline — the entire reason this project
wins the client — is still a diagram. Ship the pipeline before touching anything else.

---

## 2. Architecture Review

### 2.1 The overall shape (correct — keep it)

```
DeskManager (DMS)  ──XML/FTP export──▶  Ingest job (pg-boss, hourly)
   [MASTER]                                   │ parse → validate (zod) → diff
   never written back                         ▼
                                        Supabase `units` + `media`
                                        [CANONICAL COPY]
                                              │ change events
              ┌───────────────┬───────────────┼───────────────┬─────────────┐
              ▼               ▼               ▼               ▼             ▼
         adapt-site      adapt-rv-trader  adapt-boats-group  adapt-meta   adapt-craigslist …
         (ISR reval)     (feed gen)       (feed gen)         (catalog)    (post/renew)
              │
              ▼
      soidrvmarine.worker-bee.app  (Next.js ISR pages)
```

This is the right architecture. Specifically right:

- **DeskManager as immutable master.** One-way flow kills an entire class of sync bugs
  (write conflicts, echo loops, "who changed the price?"). The comment at the bottom of
  `ingest-deskmanager.ts` — "We never write back to DeskManager" — should be promoted to
  the top of every sync file and the admin How-It-Works page.
- **`dms_id` as the diff key** with a partial-unique VIN index and a separate HIN index.
  Stock numbers get reused across years at real dealers; keying on the DMS's own ID is correct.
- **`channel_listings` as the status board table.** One row per (unit, channel) with
  status enum + `last_error` — the admin UI is just a SELECT over this. No extra state machine needed.
- **`audit_log` with old/new JSONB values.** When the dealer calls asking "why did the
  Bighorn's price change?", the answer is one query. This is a sellable feature, not plumbing.
- **pg-boss over an external queue.** Queue lives in the same Postgres as the data —
  one backup, one connection string, transactional job emission. Right call at this scale.

### 2.2 Schema fit — grade: A-

`units` is a wide single-table design with typed extension columns per unit type
(RV / boat / motor sharing `length_ft`, `fuel_type`, `engine_make`). For a 30–300 unit
dealer this beats EAV or per-type tables: every query is one table, filters are indexed
columns, and the FTS index covers make/model/trim/description/category.

Strengths worth calling out:
- `posting_profile` enum (FULL/LOCAL/FREE/SITE_ONLY/CUSTOM) with `profile_source` +
  `profile_updated_at` for last-write-wins between DMS and manual override — this is
  the mechanism that lets the dealer keep a clearance unit off RV Trader (which charges
  per listing) while still on the free site. Most competitors don't have this.
- `pending_removal` status + `dms_last_seen_at` — a unit vanishing from one export
  doesn't nuke the listing (exports hiccup); it enters a grace state. Correct.
- `channel_category_map` — canonical taxonomy → per-channel codes as data, not code.

Weaknesses to fix:
- **W1 — `slug` has no verified uniqueness or immutability guarantee** (migration 004
  added the column; confirm it carries `unique`). Slugs are SEO capital; once a unit URL
  is indexed, the slug must never change even if the model name is corrected. Enforce
  `slug text unique not null` + generate once at first ingest, never regenerate.
- **W2 — `media` diffing has no content key.** On re-ingest, how do we know photo 3
  changed? Use the CDN URL as the natural key (or add `source_url_hash`) so ingest can
  diff media without delete-all-reinsert (which would churn `is_primary` and sort order).
- **W3 — No `sync_runs` table.** `sync_jobs` tracks per-unit jobs, but the admin page
  needs "last sync: 7:02 AM, 31 units, 2 new, 1 price change, 0 errors" — a run-level
  summary row. Add it (see §3 spec).
- **W4 — RLS is written but bypassed** (D6). Point `db.ts` at the anon key. Keep the
  service key for the worker only.

### 2.3 ISR strategy — grade: B, needs one addition

Current: `revalidate = 3600` on unit detail; browse pages are request-time dynamic
(they await `searchParams`); admin has `revalidate = 60`.

Assessment: hourly ISR is fine as a **safety net**, but it must not be the primary
freshness mechanism — a unit sold at 9 AM staying "available" until 10 AM generates
the worst kind of dealer phone call. The design already anticipates this: `adapt-site`
is meant to POST to a revalidation endpoint on every change event. That endpoint does
not exist. Build `src/app/api/revalidate/route.ts`:

```ts
// POST /api/revalidate  { paths: string[], secret: string }
// verifies secret === process.env.REVALIDATION_SECRET
// calls revalidatePath(p) for each path
// returns { revalidated: paths, at: ISO timestamp }
```

Then event-driven freshness is seconds, and the hourly ISR only covers missed events.
Also consider raising detail-page `revalidate` to 86400 once the endpoint exists —
hourly background regeneration of ~30 pages is wasted work when events do the real updating.

### 2.4 Data-flow contradiction that must be resolved this week

Right now the repo holds **three inventories**:

| Source | Contents | Used by |
|---|---|---|
| Supabase `units` (from stale seed.sql) | 14+2 invented units | Production pages, admin "Supabase source: PASS" |
| `src/lib/inventory.ts` (uncommitted) | 19+10 REAL units, 15 real photos | Sitemap, static fallback, admin counts |
| `seed.sql` (committed) | Same invented 14+2 | Anyone re-provisioning the DB |

Decision: **Supabase is the only runtime source of truth.** Consequences:
1. `sitemap.ts` must read from `db.ts`, not the static arrays.
2. Admin counts must read from the DB.
3. `inventory.ts` static arrays get demoted to explicit `FALLBACK_*` naming and are used
   only when env vars are absent (CI). Better: after the sync demo works, delete the
   fallback entirely and let CI use a seeded local Supabase.
4. `seed.sql` gets replaced by the DeskManager demo XML + sync script (§3) —
   the demo IS the new seed path.

---

## 3. DeskManager Sync Spec — the "In-Between Piece"

### 3.1 The pitch, in dealer language (put this verbatim on the admin page)

> You already manage inventory in DeskManager — that never changes. Today, when a unit
> arrives or sells, someone also has to update the website, and Craigslist, and Facebook,
> and the listing sites. That's re-typing, and re-typing means the website shows a trailer
> you sold last Tuesday.
>
> This system watches DeskManager's export. When you add a unit in DeskManager, it appears
> on your website automatically. When you mark it sold, it comes off — everywhere — within
> minutes. You keep working exactly the way you work now. The in-between piece does the rest.
> Nobody ever types a stock number twice.

### 3.2 Deliverable 1 — dummy DeskManager export: `scripts/fixtures/deskmanager-export.xml`

DeskManager (AutoManager) exports a flat XML of vehicle records. The dummy file should
contain **the real 29 units currently in `inventory.ts`**, so running the demo fixes
defect D1 at the same time. Shape (matching the `DmsUnit` interface already defined in
`worker/jobs/ingest-deskmanager.ts`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<DeskManagerExport dealer="Southern Idaho RV and Marine" generated="2026-07-05T06:00:00-06:00">
  <Unit>
    <StockNumber>TG240740</StockNumber>
    <Type>TRAVEL TRAILER</Type>
    <Condition>N</Condition>
    <Year>2026</Year>
    <Make>Keystone</Make>
    <Model>Hideout 21BWE</Model>
    <VIN>4YDTHDZ2XR1234567</VIN>
    <Price>22850.00</Price>
    <MSRP>28995.00</MSRP>
    <LengthFt>24</LengthFt>
    <Sleeps>6</Sleeps>
    <SlideOuts>1</SlideOuts>
    <Description>Half-ton towable bunkhouse travel trailer...</Description>
    <PhotoUrls>
      <Url>https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-.../inventory/14102224/7b08527f-....jpeg</Url>
    </PhotoUrls>
  </Unit>
  <!-- ... 28 more units ... -->
</DeskManagerExport>
```

Also produce a **second fixture**, `deskmanager-export-day2.xml`, identical except:
one unit removed (→ sold flow), one price dropped $1,000 (→ price-change flow), one new
unit added (→ new-listing flow). The two-file pair is what makes the demo *show
propagation* rather than just show an import.

### 3.3 Deliverable 2 — `scripts/deskmanager-sync.ts`

One file, runnable via `npx tsx scripts/deskmanager-sync.ts [--file <path>] [--dry-run]`.
Reuse it as the body of the worker's ingest handler later — write it as a pure module
with a CLI wrapper so the pg-boss job imports the same `runSync()` function.

Pipeline (each step logs a numbered line so the demo output reads as a story):

| Step | Action | Detail |
|---|---|---|
| 1. FETCH | Read XML (file path now; `DESKMANAGER_FEED_URL` + auth later) | Log byte size + generated timestamp |
| 2. PARSE | XML → `DmsUnit[]` (use `fast-xml-parser`, ~zero deps) | Log unit count by type/condition |
| 3. VALIDATE | zod schema per unit: VIN regex `^[A-HJ-NPR-Z0-9]{17}$`, HIN `^[A-Z]{3}[A-Z0-9]{5}[A-Z0-9]{4}$`, year 1950–2100, price ≥ 0 | Invalid units → `needs_review` list, never dropped silently |
| 4. DIFF | Compare against `select dms_id, price, status, updated_at from units` keyed on `dms_id` | Classify: NEW / CHANGED (field-level) / UNCHANGED / MISSING-FROM-FEED |
| 5. UPSERT | NEW → insert `units` + `media` rows, status `active`, generate slug once. CHANGED → update only changed columns. MISSING → set `pending_removal`, stamp `dms_last_seen_at`; missing 2 consecutive runs → `sold` + `sold_at` | One transaction per unit; write `audit_log` row per mutation with old/new JSONB |
| 6. REVALIDATE | POST `/api/revalidate` with affected paths: each `/inventory/<slug>`, plus `/rvs` and/or `/boats`, plus `/` | Log HTTP status + paths |
| 7. RECORD | Insert one `sync_runs` row: counts, duration, error list | This row powers the admin "Last sync" card |

`--dry-run` prints the step-4 diff table and exits before step 5 — that's the mode you
run live in front of the dealer first ("here's what WOULD change"), then run for real.

New table (migration 005):

```sql
create table sync_runs (
  id            uuid primary key default gen_random_uuid(),
  source        text not null default 'deskmanager',      -- 'deskmanager' | 'manual_demo'
  started_at    timestamptz not null default now(),
  finished_at   timestamptz,
  units_in_feed integer,
  new_count     integer default 0,
  changed_count integer default 0,
  sold_count    integer default 0,
  error_count   integer default 0,
  errors        jsonb,
  dry_run       boolean not null default false
);
```

### 3.4 Tables touched, exhaustively

| Table | Operation | When |
|---|---|---|
| `units` | insert / update / status transitions | step 5 |
| `media` | insert; diff by URL; update sort_order | step 5, NEW + photo changes |
| `audit_log` | insert one row per mutation | step 5 |
| `sync_runs` | insert one row per run | step 7 |
| `channel_listings` | insert `(unit, 'site', 'queued')` on NEW; flip to `live` after revalidate returns 200 | steps 5–6 (site channel only for the demo; other channels stay `Not configured`) |

### 3.5 Definition of done for the demo

- [ ] `npx tsx scripts/deskmanager-sync.ts --dry-run` against the day-1 fixture prints
      the diff table. Note: against the stale seed this legitimately shows 29 NEW +
      16 MISSING — which is actually the more honest demo of the sold-flow. Either
      pre-truncate the seed or embrace the 16 MISSING as the first sold-flow proof;
      **document which**.
- [ ] Real run: DB holds 29 real units; live `/rvs` shows Keystone Hideout/Passport,
      `/boats` shows MirroCraft/Montego Bay. `curl` the live pages to confirm (EYES).
- [ ] Day-2 fixture run: price change visible on the affected unit page within 60 s;
      removed unit → `pending_removal`; second run → gone from browse pages.
- [ ] `audit_log` and `sync_runs` populated; admin page reflects them.

---

## 4. Admin Dashboard Spec

### 4.1 What exists vs what's needed

Exists: `(admin)/admin/page.tsx` — a dark "Status Board" with channel cards (all mock),
inventory summary (from static arrays), category breakdown. It is a good visual skeleton.
It answers "what is the state?" but not the client's actual question: **"how do we get to
our product? the in-between piece"** — i.e., *teach me the workflow*.

### 4.2 Page structure

```
/admin                       — Dashboard (upgrade existing Status Board)
/admin/inventory             — Full unit table (live DB)
/admin/how-it-works          — The onboarding/teaching page (NEW, the key deliverable)
/admin/sync                  — Sync history + "Run Demo Sync" button
```

Keep it to these four. A dealer admin with 12 sections is a dealer admin nobody opens.

### 4.3 Component spec

**`/admin` (dashboard)**
- Last-sync card: from `sync_runs` latest row — time, counts, green/red status dot.
- Inventory stat row: total / RVs / boats / new / used — **from DB, not static arrays**.
- Channel grid: keep the existing cards but drive from `channel_listings` GROUP BY;
  channels with zero rows render "Not configured" honestly.
- Attention list: units where `channel_listings.status IN ('failed','needs_review')`,
  or `price IS NULL` ("Call for price" units), or the primary photo is a picsum URL.
  This list is the dealer's daily to-do and the single most useful thing on the page.

**`/admin/inventory`**
- Table: photo thumb, stock #, year/make/model, type, condition, price, status,
  channels (dot per channel colored by status), `dms_last_seen_at`.
- Filters: type, condition, status. Search over make/model/stock (the FTS index exists — use it).
- Row click → opens the public `/inventory/[slug]` in a new tab (admins think in terms
  of "what does the customer see").
- No editing in v1. DeskManager is the master; an edit box here would betray the
  architecture. The only mutations ever allowed in admin: `posting_profile` override
  and photo reorder — and neither in the demo phase.

**`/admin/sync`**
- `sync_runs` table (last 20): time, source, in-feed, new/changed/sold, errors, duration, dry-run badge.
- **"Run Demo Sync" button** → POST `/api/admin/demo-sync` → executes `runSync()` against
  the day-2 fixture (alternate fixtures per run so the button always shows changes),
  then returns the step log. Render the log as a terminal-style block — the numbered
  FETCH→PARSE→VALIDATE→DIFF→UPSERT→REVALIDATE story is the sales moment.
- After the run completes, show "View the change live →" links to the affected unit pages.

**`/admin/how-it-works`** — the teaching page. Flow rendering:

```
   ┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
   │   DESKMANAGER    │  export │   THIS SYSTEM    │ publish │   YOUR WEBSITE   │
   │                  │ ──────▶ │                  │ ──────▶ │                  │
   │  You work here.  │  hourly │  Reads the file. │ seconds │  Customers here. │
   │  Add units, set  │         │  Finds what's    │         │  Always current. │
   │  prices, mark    │         │  new, changed,   │         │  Sold units gone │
   │  sold. Nothing   │         │  or sold. Updates│         │  automatically.  │
   │  changes for you.│         │  everything else.│    ┌──▶ │                  │
   └──────────────────┘         └──────────────────┘    │    └──────────────────┘
                                         │              │    ┌──────────────────┐
                                         └──────────────┴──▶ │ LATER: RV Trader,│
                                            same pipeline    │ Facebook, Google,│
                                                             │ Craigslist       │
                                                             └──────────────────┘
        THE ONE RULE: information flows LEFT → RIGHT only.
        We never touch your DeskManager. It is always the boss.
```

Below the diagram, three numbered scenarios written for a non-technical owner:
"You take in a used Bighorn on trade → …", "You sell the Montego Bay → …",
"You drop a price $1,000 → …" — each ending with the elapsed time to site update.
Then an FAQ: *What if the export is late? (nothing breaks — the site holds last-known-good)*,
*What if a unit has a typo? (fix it in DeskManager; it flows through next sync)*,
*Can the website disagree with DeskManager? (only for up to one sync interval, then never)*.

### 4.4 Auth approach

| Phase | Approach | Rationale |
|---|---|---|
| Demo (now) | **No login, but not naked either**: put `/admin` behind a single shared secret — middleware checks `?key=<ADMIN_DEMO_KEY>` once, sets an httpOnly cookie. The link sent to the dealer includes the key. | Zero-friction for the pitch ("tap this link"), but the URL isn't guessable/crawlable. Add `robots: noindex` meta + disallow `/admin` in robots.txt regardless. |
| Production | Supabase Auth (email magic-link) for dealer staff; migration 003's `authenticated` policies already anticipate exactly this. `(admin)/layout.tsx` gains a session check + redirect. | The RLS staff policies are pre-written — the cheapest possible production auth path. |

Do NOT ship the cookie-admin-auth module for the demo phase — more ceremony than a demo
needs, and Supabase Auth supersedes it in production anyway. One middleware file now,
Supabase Auth at contract-signing.

### 4.5 Nav treatment

The user asked to "put a link here to teach and show how to use it." Put an **"Admin"
link in the site footer only** (not the header) — visible enough to demo ("scroll down,
tap Admin"), invisible enough not to distract retail shoppers. The How-It-Works page is
the landing target for first-time visitors; the dashboard thereafter.

---

## 5. Podium Integration Spec

### 5.1 What Podium does for this dealer

Podium is already their tool for **webchat → SMS conversion** and **text-to-pay small
payments** (deposits, parts, service invoices). For the website, three surfaces matter:

| Capability | What it looks like on the site | Effort |
|---|---|---|
| Webchat widget | Floating bubble, bottom-right; visitor types, conversation continues over SMS — critical for RV shoppers who browse at 10 PM and buy on Saturday | One `<script>` embed |
| Text-to-pay | Staff-initiated from the Podium dashboard; the site's role is only messaging: "Put a deposit down by text" line on unit detail pages | Copy only (v1) |
| Reviews | Podium aggregates GBP reviews; the trust bar's 4.7★ (or 4.6 — see D7) claim can cite Podium's review count for verifiability | Optional widget, or just verified static numbers |

### 5.2 Embed approach

Podium's standard embed is one script tag with a per-organization token. Implementation
in `src/app/(public)/layout.tsx` (public layout only — never load a chat widget on `/admin`):

```tsx
{process.env.NEXT_PUBLIC_PODIUM_ORG_TOKEN && (
  <Script
    id="podium-widget"
    src={`https://connect.podium.com/widget.js#${process.env.NEXT_PUBLIC_PODIUM_ORG_TOKEN}`}
    strategy="lazyOnload"      // chat must never compete with LCP
  />
)}
```

- Gate on the env var → nothing renders until the client hands over the token. No broken
  placeholder bubble in the demo.
- `strategy="lazyOnload"` — Podium's widget is heavy; loading after idle protects the
  perf substrate under the 8.2 beauty score.
- Add `NEXT_PUBLIC_PODIUM_ORG_TOKEN=` (empty) to `.env.local.example` with a comment:
  `# From client: Podium → Settings → Channels → Webchat → copy website widget token`.

### 5.3 Onboarding note (goes on /admin/how-it-works)

> **Podium**: Your existing Podium account plugs straight in. Send us the "Website
> Widget" token from your Podium settings (Settings → Channels → Webchat) and the chat
> bubble appears on every page — conversations land in the same Podium inbox your team
> already uses, and you can send payment links in-thread exactly as you do today.
> Nothing new to learn.

### 5.4 What NOT to build

No custom Podium API integration (payments API, review API) in this phase. The dealer's
staff already lives in the Podium dashboard; the site only needs to *host the widget*.
Custom API work is a post-contract upsell (e.g., auto-opening a chat pre-filled with
"I'm asking about the 2022 Bighorn 37TB, stock #…" from unit detail pages — a one-line
`window.Podium` call when the time comes, and genuinely valuable).

---

## 6. Photo Completion Plan

### 6.1 Current state (recounted from source, 2026-07-05)

| Metric | Count |
|---|---|
| Units total | 29 (19 RV + 10 boat) |
| Real Endeavor Suite CDN photos — `P(productId, imgId)` | 15 |
| Picsum placeholders — `F(n)` | **14** (mission brief said 7 — the file says 14) |

Picsum units: RVs at lines 34 (Hideout 21BWE), 40 (Hideout 224MLWE), 54 (Passport
170BHWE), 60 (Passport 210RKCWE), 80 (Passport 253RD), 86 (Passport 2605RB), 93
(Palomino RCSS-1605), 99 (SZSS-1240), 105 (SZSS-500), 126 (Cruiser 22BBH); boats at
170 (F1768), 176 (F1768 BLK), 189 (F8518), 195 (F8522).

### 6.2 How to get the remaining CDN product IDs

The dealer's existing site (soidrvmarine.com) runs on Endeavor Suite — the CDN org ID
`bf41b29b-1565-450b-9e8b-110c69e10a95` is already known. Every inventory page on their
current site embeds `.../inventory/<productId>/<imageId>.jpeg`.

Recipe (30–45 min, one pass):
1. Fetch their live inventory list pages (firecrawl-scrape or plain curl) — the
   soidrvmarine.com inventory URLs contain the productId.
2. For each of the 14 units, match on year+make+model (stock number where shown).
3. Grep the unit page HTML for
   `cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-…/inventory/(\d+)/([a-f0-9-]+)\.jpeg`
   — capture ALL image IDs, not just the first (detail pages need galleries later).
4. Replace `F(n)` with `P(id, img)` in `inventory.ts` **and** put the full URL list into
   the demo XML fixture's `<PhotoUrls>` — so the sync writes real `media` rows and the
   DB (the actual source of truth) gets galleries, not just hero shots.
5. Verify each URL returns 200 + `content-type: image/jpeg` in a loop before committing.

### 6.3 Units that may genuinely have no photo yet

New-order units sometimes have zero dealer photos (only manufacturer stock images).
Fallback ladder, in order: (1) manufacturer floorplan/stock image for the exact model
(Keystone and Forest River publish these per-floorplan), (2) same-model different-year
dealer photo clearly captioned "Similar unit shown," (3) branded "Photos Coming Soon"
placeholder card in the amber/navy system. **Never picsum in production** — a random
landscape photo on a $40k boat listing reads as a scam. The branded placeholder is the
floor.

### 6.4 Definition of done

`grep -c "photo: F(" src/lib/inventory.ts` → 0, AND
`select count(*) from units u where not exists (select 1 from media m where m.unit_id = u.id and m.url not like '%picsum%')` → 0.
Both checks, because after the sync ships, the DB is what customers see.

---

## 7. Full-Monte QA Checklist

Run AFTER the sync demo replaces the stale data — QA'ing the invented inventory wastes a pass.

### 7.1 Every URL (curl + Wizard 4-viewport)

| URL | Checks |
|---|---|
| `/` | 200; hero renders; trust bar numbers match verified GBP data (resolve D7); bento counts are REAL (fix D2); all 3 bento links navigate |
| `/rvs` | 200; unit count matches `select count(*) from units where unit_type='rv' and status='active'`; every card photo non-picsum; filter chips: condition × category × sort combinations change the grid (spot-check 6 combos); empty state renders when a filter yields zero |
| `/boats` | Same battery as /rvs |
| `/inventory/[slug]` × ALL active slugs | Script the loop: every slug from the DB → 200. Known-sold slug → 404. Garbage slug → 404 (not 500). Price null → "Call for price" renders |
| `/motors/mercury-outboards` | 200; Mercury factory-direct warranty claims consistent with `warranty_months` intent |
| `/about`, `/financing`, `/contact`, `/privacy` | 200 each; no `[DEMO]` markers surviving into visible copy |
| `/admin`, `/admin/inventory`, `/admin/sync`, `/admin/how-it-works` | 200 with key; 302/403 without; `noindex` present |
| `/sitemap.xml` | 200; every URL in it returns 200 (loop); slug set exactly equals active DB slugs (D3 regression check) |
| `/robots.txt` | exists (currently NOT confirmed — likely missing; add `src/app/robots.ts`); disallows `/admin` |
| `/api/revalidate` | 401 without secret; 200 with; actually busts cache (edit a price in DB, hit endpoint, curl the page, see the new price) |

### 7.2 Every interactive element

- [ ] Nav: all links + logo, desktop and hamburger; phone pill launches `tel:+12083244661` on mobile.
- [ ] Footer: every link; Admin link; GBP/Facebook/directions URLs resolve to the real
      dealer properties (`g.page/southern-idaho-rv-marine` in DEALER_INFO is currently
      UNVERIFIED — click it).
- [ ] Filter chips: back/forward preserves `searchParams` state; direct-loading a
      filtered URL renders filtered.
- [ ] Unit cards: whole card clickable; hover state; `cursor-pointer`.
- [ ] Contact form: **replace mailto first** (Resend server action — `resend-email`
      module exists in the worker-bee registry), then: submit → success state → email
      arrives in inbox (Iron Law: confirmed received, not "API called"); validation
      errors render; honeypot/rate-limit present (`upstash-ratelimit` module).
- [ ] Admin "Run Demo Sync": click → log renders → counts change → linked unit page
      reflects the change.
- [ ] Podium bubble (once token exists): loads after idle; opens; doesn't cover the
      mobile sticky CTA.

### 7.3 Console / network / SEO / perf

- [ ] Zero console errors + zero failed requests on all routes (chrome-devtools pass,
      desktop + 375px).
- [ ] All CDN image URLs 200 (loop the `media` table).
- [ ] Per page: title 30–60 chars, meta description 120–160, canonical, og:*,
      twitter:card, single H1, `lang` attr.
- [ ] JSON-LD: **currently absent — add** `AutoDealer`/`LocalBusiness` on `/`,
      `Product` + `Offer` + `Vehicle` on unit pages (vehicle structured data is how
      units reach Google's vehicle-listing surfaces — revenue-relevant for a dealer,
      not checkbox SEO), `BreadcrumbList` on detail pages.
- [ ] GA4: `NEXT_PUBLIC_GA4_ID` is set in env — verify the tag actually renders in the
      HTML (grep `G-` in curl output) and is the dealer's own property, not another site's.
- [ ] Lighthouse mobile on `/`, `/rvs`, one unit page: LCP < 2.5 s (hero + card images
      are plain `<img>` from a remote CDN — evaluate `next/image` with a remotePatterns
      entry for cdnmedia.endeavorsuite.com).
- [ ] `prefers-reduced-motion` respected on any animation.
- [ ] EYES full protocol: 4 viewports, scroll videos, footer in final frame, verify
      table written to `.claude/verify/latest.md`, beauty ≥ 7.5 re-confirmed AFTER real
      photos land (real photos will *raise* it — jr already predicted 8.5+).

### 7.4 Data integrity spot-checks

- [ ] Three random units: site price/specs vs demo XML vs the dealer's live
      soidrvmarine.com — three-way match.
- [ ] `audit_log` rows exist for every unit (proves everything flowed through the
      pipeline, not hand-inserted).
- [ ] Sold-flow rehearsal: mark one unit missing in the fixture → two sync runs → gone
      from browse, 404 on detail, absent from sitemap.

---

## 8. Prioritized Action Plan

Ordered so each item unblocks the next; effort assumes ATLAS at normal cadence.

| # | Item | Effort | Why this order |
|---|---|---|---|
| 1 | **Commit the dirty working tree** (`inventory.ts`, `types.ts`, verify file) on a `feature/deskmanager-sync` branch | 10 min | The real inventory data currently exists ONLY as uncommitted local changes. One `git checkout` accident destroys it. Do this before anything. |
| 2 | **Photo completion** (§6): scrape the remaining 14 CDN IDs from the dealer's live site, replace all `F()` | 1–2 h | Must precede the fixture build — the demo XML should carry real photo URLs so the sync writes a fully real DB. |
| 3 | **Build `/api/revalidate` route** | 30 min | Sync step 6 depends on it; trivially small; unblocks everything event-driven. |
| 4 | **Migration 005** (`sync_runs`, slug unique constraint, media natural key) | 45 min | The sync script writes to these. |
| 5 | **DeskManager demo: fixtures + `scripts/deskmanager-sync.ts`** (§3), then **run it for real** → stale seed replaced by 29 real units; defect D1 dead | 4–6 h | The centerpiece. Fixes the critical production defect and creates the demo asset in one move. |
| 6 | **Fix the three-sources-of-truth defects**: sitemap → DB (D3/D4), db.ts → anon key + status filter (D5/D6), home bento real counts (D2), review score verified (D7) | 2 h | Fast follow while the sync's data model is fresh in context. |
| 7 | **Contact form → Resend server action** (registry module `resend-email`) + rate limit | 1–2 h | The only remaining `[DEMO]` tag on a revenue path; leads are the site's entire job. |
| 8 | **Admin build-out** (§4): how-it-works page, DB-driven dashboard, inventory table, sync page + Run Demo Sync button, shared-key middleware, footer link | 5–7 h | Needs sync_runs + real DB data to be honest, hence after #5. This is what the user explicitly asked to be shown/taught. |
| 9 | **Podium embed** (§5): gated Script tag, env example, onboarding note | 45 min | Blocked on the client token for the live bubble, but ship the gated code + note now so it lights up the day the token arrives. |
| 10 | **JSON-LD structured data** (Vehicle/Product/AutoDealer/Breadcrumb) + `robots.ts` | 2 h | Dealer-revenue-relevant SEO; independent of everything above. |
| 11 | **Full-monte QA** (§7) — the complete battery, EYES re-verify, fresh verify/latest.md | 3–4 h | Last, on purpose: QA the real thing once, not the placeholder thing twice. |
| 12 | Worker productionization (wire `runSync()` into the pg-boss handler, fix `require()`/ESM + cron `0 * * * *`, deploy the worker service on Coolify) — **post-demo / contract-signing** | 3–4 h | Not needed for the pitch; the script IS the demo. Don't spend it before the dealer says yes. |
| 13 | Backlog (post-contract): Supabase Auth on admin, channel adapters (RV Trader feed first — a nightly FTP CSV, easiest real win), photo galleries on detail pages, Podium deep-link per unit, `motor` unit-type inventory for the Mercury page | — | Priced work, not demo work. |

**Total to demo-ready: roughly 2–3 focused days (items 1–11).**

---

## 9. Business Context — What This Site Must Do

### 9.1 What an RV/marine dealer website is actually for

It is **not** an e-commerce store. Nobody checks out a $75,966 tritoon in a cart. The
site has exactly three jobs, in order:

1. **Prove the unit exists and is really available.** The #1 dealer-site sin is stale
   inventory — a buyer drives 40 minutes from Twin Falls for a trailer that sold last
   week, and that dealer is dead to them. This is why the DeskManager sync is not a
   technical nicety; it is the product. Freshness = trust = showroom visits.
2. **Convert browsing into a low-friction human contact.** The conversion events, ranked
   by intent: phone call > webchat/text (Podium) > form lead > directions tap. Every
   unit page needs all four within one thumb-reach on mobile. RV buyers shop at night
   and on weekends — Podium's chat-to-SMS is disproportionately valuable because the
   conversation survives the visitor closing the tab.
3. **Feed the marketplaces.** The majority of RV/boat demand starts on RV Trader, Boat
   Trader, Facebook Marketplace, and Craigslist — not on dealer sites. The dealer site
   is the canonical hub; the channel adapters are the spokes. The schema already models
   this (`posting_profile`, `channel_listings`, `channel_category_map`) — that's the
   growth story to sell: "one entry in DeskManager, everywhere your buyers actually look."

What converts a browse visitor, concretely: real photos (14 picsum units are active
conversion poison), a visible price or an honest "Call for price," payment-per-month
framing (the financing page exists — add a monthly-estimate line to unit cards later),
trust signals (veteran-owned, 32 years, Mercury factory-direct — already well played in
the design), and a sticky mobile call/text bar.

### 9.2 The dealer's day-to-day admin workflow (design target)

Morning, 5 minutes, coffee in hand:
1. Open `/admin`. Glance at the last-sync card — green, 7:02 AM, "2 changes."
2. Scan the attention list: one unit flagged `needs_review` (bad VIN in the export —
   fix it in DeskManager, it clears itself next sync), one unit still missing photos.
3. Done. Everything else — new arrivals appearing, sold units vanishing, price changes
   propagating — happened without them.

That's the whole pitch: *the admin is a place you glance, not a place you work.* The
work stays in DeskManager where it already lives. Any admin design that asks the dealer
to re-enter data has failed; that's why v1 admin is read-only plus one demo button.

### 9.3 Why the "in-between piece" wins the contract (say it this way)

Competing dealer-site vendors (Dealer Spike, ARI, Level 5) charge $500–1,500/mo and
*also* do DMS ingestion — but as an opaque black box with overnight batch lag and
per-channel upcharges. Our differentiators to state out loud in the demo:

- **Speed**: minutes from a DeskManager change to the live site (event revalidation),
  vs overnight batch.
- **Transparency**: the admin shows every sync, every change, every error, with an
  audit trail — "you can see exactly what the robot did and when."
- **Control**: posting profiles per unit — keep the cheap unit off the paid channels,
  put the clearance unit everywhere. Their current vendor doesn't give them that switch.
- **No lock-in on their master data**: we never touch DeskManager; leave anytime,
  lose nothing.

The Run-Demo-Sync button exists to make this visceral: the dealer watches a price change
in a mock export appear on their phone's browser in under a minute. That moment is the
close.

### 9.4 Risks to flag honestly

| Risk | Mitigation |
|---|---|
| DeskManager export format is assumed, not confirmed (the `DmsUnit` interface is an educated guess) | The demo runs on our fixture, which is fine for the pitch; contract contingency: "final field mapping upon receipt of one real export file" — make that file the first onboarding ask |
| Endeavor Suite CDN hotlinking could break if the dealer cancels their current vendor | Post-contract task: mirror media into Supabase Storage during ingest (`media.source` column already anticipates this) |
| worker-bee.app subdomain is a demo address | Production = soidrvmarine.com DNS cutover; standard go-live protocol applies |
| Trust-bar numbers (4.7★ / 1,203 reviews / 220+ units) unverified | Verify against the real GBP before the dealer sees it — they know their own numbers instantly |

---

## Appendix A — File Map (for the next session picking this up)

| Path | Role | State |
|---|---|---|
| `src/lib/inventory.ts` | Real 29-unit static data + filter/sort helpers | UNCOMMITTED — commit first |
| `src/lib/db.ts` | Supabase queries w/ static fallback | Works; switch to anon key, add status filter |
| `src/lib/types.ts` | Canonical Unit types, DEALER_INFO, helpers | UNCOMMITTED |
| `src/app/(public)/…` | 9 public pages | Live; contact form is mailto [DEMO] |
| `src/app/(admin)/admin/page.tsx` | Status Board | Mock data; expand per §4 |
| `src/app/sitemap.ts` | Sitemap | Reads static arrays — defect D3; point at DB |
| `src/app/api/` | — | DOES NOT EXIST — create revalidate + admin demo-sync routes |
| `supabase/migrations/001–004` | Schema | Applied; excellent |
| `supabase/seed.sql` | Old invented 14+2 units | STALE — currently what production serves; superseded by the sync demo |
| `worker/index.ts` | pg-boss bootstrap, 8 jobs, hourly cron | Stub; ESM/require + cron-syntax fixes needed; deploy post-contract |
| `worker/jobs/ingest-deskmanager.ts` | Ingest handler | All-TODO stub; will import `runSync()` from scripts |
| `worker/jobs/channel-adapters/*.ts` (7) | Per-channel publish | Stubs; site adapter first, rest post-contract |
| `scripts/` | — | DOES NOT EXIST — home of `deskmanager-sync.ts` + `fixtures/` |
| `.env.local` | Supabase keys, REVALIDATION_SECRET, GA4 | Present; add DESKMANAGER_*, PODIUM token, ADMIN_DEMO_KEY |
| `.claude/verify/latest.md` | EYES proof (2026-07-04, 8.2) | Re-run after real data lands (§7) |

## Appendix B — Verification Commands Used for This Review

```bash
# Live-site inventory check (revealed D1):
curl -s https://soidrvmarine.worker-bee.app/rvs | grep -oE '(Keystone|Grand Design|Thor|Hideout|Reflection|Montana|Passport)[^<]{0,25}' | sort | uniq -c
# → Reflection 311BHS, Montana 3855BR, Windsport 34J, Fuzion 427 (invented seed) — NOT Hideout/Passport (real)

# Placeholder photo count (revealed 14, not 7):
grep -c "photo: F(" src/lib/inventory.ts   # → 14
grep -c "photo: P(" src/lib/inventory.ts   # → 15

# Git state:
git status --short   # → inventory.ts, types.ts, verify/latest.md dirty; real data uncommitted
```

---

*Review complete. Priority zero is item #1 in §8 — commit the real inventory data before
it can be lost. Priority one is the sync demo, which retires the critical defect and
creates the sales asset simultaneously.*
