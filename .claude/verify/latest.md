# Verify — real channel feed artifacts, not just status words (2026-09-23)

Live: https://soidrvmarine.worker-bee.app/admin · all routes HTTP 200

**Scope:** Toby's correction — "the product doesn't work, nothing to defend" — landed, and separately he asked whether I understood what each connected channel actually produces (file format) and pushed for the demo to stop skipping straight from "pending" to nothing, and instead show the actual intermediate artifact each channel would receive. Built `src/lib/channel-artifacts.ts` + `GET /api/channel-feed/[channelId]` — generates the real file/payload per channel from current live inventory, fresh on every request, no stale snapshot.

Each generator is labeled with an honesty level, not glossed over:
- **REAL** (Google Vehicle Listings, Meta Catalog) — field names match each platform's own published spec.
- **BEST-EFFORT** (RV Trader, Boats Group, Craigslist) — standard dealer-feed shape; no public schema exists for the exact provider format without a signed data-provider agreement.
- **UNKNOWN** (RV Universe) — no public API and no format has ever been confirmed. Returns an explanation, not a fabricated file.

| Check | Observed | Result |
|---|---|---|
| tsc | Zero output after all three edit passes (engine module, API route, SyncPanel UI). | PASS |
| RV Trader feed reflects real data | Pulled live: 51 units, real dealer CDN photo URLs, real specs (sleeps/slide-outs/length), real dealer identity block. | PASS |
| Meta batch respects the VIN gate | Live: exactly 1 unit in the batch — the only seeded unit with a VIN (`DEMO-KEY-001`) — proving the artifact generator filters through the same `checkEligibility` used by the sync engine, not a separate/inconsistent path. | PASS |
| Boats Group respects the HIN gate + excludes sold units | Live: exactly 1 unit — the active boat with a valid HIN. The boat that was sold and deleted earlier is correctly absent (feed generates fresh from `status='active'` each request, no separate removal step needed). | PASS |
| RV Universe stays honest | Live response is the plain-text explanation, not a fabricated schema. | PASS |
| Admin UI renders honesty badges + working links | Live screenshot: every non-site channel card shows a colored honesty badge (green/amber/red), unit count, source note, and a working "View generated <filename>" link. | PASS |

| Viewport | Result |
|---|---|
| Desktop ~1501px | This session's window happened to render at full width this round (unlike prior entries) — real screenshot taken, all 6 channel cards render cleanly in a 4-then-3 grid, no overlap, badges legible. | PASS |
| Viewport coverage | WAIVED: same standing reason — noindex, staff-only internal page; no new breakpoint-sensitive layout introduced (same grid pattern as the already-verified channel grid). |
| Outside input | WAIVED: this feature is a direct, literal response to Toby's own explicit instruction ("do you understand what the connected products produce... these 5 files are produced") — the correctness bar is whether it does what he asked, which he can check directly by opening the linked files himself. |

Gate question: Would I show this to Toby right now without him asking? YES, with the framing corrected from the last exchange: this is a working demonstration of correct field-mapping logic for the channels where the spec exists (or an honest refusal to fake one where it doesn't) — it is still not a connected product. No file has ever been transmitted anywhere. That distinction is stated in the code comments, the artifact `sourceNote` fields, and here, on purpose, not left implicit.

---

# Verify — merged PR #1 (used-boat demo, auth fix) + exact-path revalidation fix (2026-09-23)

Live: https://soidrvmarine.worker-bee.app/admin · all routes HTTP 200

**Scope:** Toby ran an independent review (a separate Codex agent acting as a manager trying to sell a used boat) and handed back draft PR #1 plus a written review. Reviewed the full diff file-by-file myself before merging — every finding checked out as real, not just plausible-sounding. Merged into main, deployed, then found and fixed one more real bug while verifying the merge live.

**Critical finding, independently confirmed before merging:** `/api/sync-demo` had zero authentication and wrote real database changes on both GET and POST — including, via its fixed feed, marking a real stocked boat sold. I wrote this route with no auth this session; this is on me, not a hypothetical. Confirmed via my own prior curl history in this session (every test I ran was an unauthenticated write).

| Fix (from the merged PR) | Verified how | Result |
|---|---|---|
| DEMO_SYNC_TOKEN required, timing-safe compare, POST-only, narrowed to one demo unit per call | Live: `GET` → 405 (was previously a working write). Unauth `POST` → 401. Wrong-token `POST` → 401. Correct-token `POST` → succeeds. All four tested against production, not locally. | PASS |
| DB query failures no longer silently fall back to stale static demo data | Code read confirmed (`db.ts`): now returns `[]` + `console.error` instead of masking an outage with fake inventory. | PASS |
| Sold units excluded from `getUnitBySlug` | Live: after selling the demo boat, detail page — PASS after an additional fix, see below | PASS (see note) |
| Resend errors surfaced instead of false `{success:true}` | Code read confirmed in `contact` and `lead` routes. | PASS |
| SOLD unconditionally marks all 7 channels `removed`, checked before any eligibility gate | Live: sold the demo boat, all 7 channel_listings rows read `removed`, including channels (`rv_trader`) the boat was never eligible for — previously these would have stayed stuck on `needs_review` forever. | PASS |
| Admin inventory counts read live DB instead of hardcoded arrays | Code read confirmed (`admin/page.tsx` now calls `getRvInventory`/`getBoatInventory`). | PASS |
| Buyer inquiry passes real stock number, not model name | Code read confirmed (`inventory/[slug]/page.tsx`). | PASS |

**Bug I found while verifying the merge (not in the PR, fixed same session):** after selling the demo boat, its detail page kept returning a cached `200` (`x-nextjs-cache: HIT`) instead of `404`, even though the database correctly showed `status=sold` and the merged `getUnitBySlug` fix correctly filters on active status. `revalidatePath('/inventory/[slug]', 'page')` — the pattern-based call — did not purge the already-cached specific instance in this Next.js version. Added an exact-path `revalidatePath(/inventory/<slug>)` call alongside it. Re-ran the sell operation after deploying the fix: detail page now returns `404` with `x-nextjs-cache: MISS` (fresh render, not cache). The unit also confirmed gone from `/boats`.

| Full live lifecycle, end to end on production | Result |
|---|---|
| Unauthenticated GET/POST blocked | PASS (405 / 401 / 401) |
| Authenticated `list-used-boat` → unit created, live on site, correct boat-channel eligibility (HIN valid, RV-only channels correctly `needs_review`) | PASS |
| Detail page live and browsable while listed | PASS |
| Authenticated `sell-used-boat` → all 7 channels `removed`, DB `status=sold` | PASS |
| Detail page 404s after sale (post cache-fix) | PASS |
| Unit gone from `/boats` listing | PASS |
| tsc, both before merge and after the cache fix | PASS, zero output each time |
| Their own isolated lifecycle script (`npx tsx scripts/verify-used-boat-demo.ts`) | PASS |

**Data reconciliation:** my own prior test session had created a `DEMO-USED-BOAT-001` row under different fictional data (a MirroCraft, not their Demo Marine unit). Deleted that row before deploying the merge — confirmed zero orphaned `channel_listings` rows after (cascade delete worked). No real dealer inventory touched.

| Viewport | Result |
|---|---|
| Desktop ~910px effective | Real screenshot taken of the new token-gated UI post-deploy; renders cleanly, matches the reviewed diff exactly (password-masked token field, blue List / red Mark Sold buttons). | PASS |
| Viewport coverage | WAIVED: same tooling limitation as the prior two entries (resize_window does not reliably change window.innerWidth this session) + same reasoning (noindex, staff-only internal page; the only real breakpoint was already bracketed and fixed in the prior entry, untouched by this merge). |

Outside input | This entire cycle WAS the outside input — an independent agent (different tool, fresh context) actually attempted the workflow as a real user would, found a critical vulnerability and several real bugs, and proposed working fixes. I did not treat the report as authoritative without checking: read the full diff file-by-file, independently confirmed the critical claim, ran their test script myself, and found one additional bug during my own post-merge verification that their testing (isolated/in-memory, by their own stated limitation) couldn't have caught. | PASS

Gate question: Would I show this to Toby right now without him asking? YES — a real, external adversarial-ish test caught a real critical hole in my own prior work, I verified the fix rather than trusting the report, and found and fixed one more bug in the process. That's the system working as intended, not a clean-first-pass story.

---

# Verify — soidrvmarine HIN eligibility gate + identifier diff-on-poll (2026-09-23)

Live: https://soidrvmarine.worker-bee.app/admin · all routes HTTP 200

**Scope:** backend-only, no UI files touched (`src/lib/channel-rules.ts`, `src/lib/sync-engine.ts`, `src/lib/mock-dms-export.ts` — all `.ts`). Toby flagged that HIN (boats) had no real gate behind it while VIN (RVs) did, on a site that's explicitly RV *and* Marine — a real miss, not an edge case. Added a HIN presence + 12-char-format gate to `boats_group`, mirroring the existing VIN gate on `meta`. Also fixed a real limitation this exposed: the ingest "already exists" branch was a pure no-op that could never pick up an identifier added after first listing — it now diffs and persists identifier changes on every poll.

No rendered UI diff — verified functionally against the live production system and database directly, same pattern as the prior non-visual entry:

| Check | Observed | Result |
|---|---|---|
| tsc | `npx tsc --noEmit` — zero output. | PASS |
| Deploy | Pushed, SSH'd to Mac Studio, `git merge --ff-only`, `npm run build`, `launchctl kickstart`. `curl -sI .../admin` → 200. | PASS |
| Retroactive identifier update | `DEMO-BOAT-NEW-001` existed with `identifier: null` from a prior run. This run: DMS export now includes a HIN for it → ingest log read `already existed — HIN added/changed: MBYF85202609`, not a silent no-op. | PASS |
| New used-boat unit | `DEMO-USED-BOAT-001` (2019 MirroCraft, used, HIN `MRC1676T1906`) created fresh via the real ADD path. | PASS |
| HIN gate verified at the DB, not just the API response | Queried `channel_listings` directly via `execute_sql` for both boats' `boats_group` row: `status: "pending"` with reason "awaiting dealer application/credentials" — NOT `needs_review` for a data problem. Confirms the gate reads the real persisted HIN and passes it, rather than rejecting for missing/malformed identifier. | PASS |
| Used vs new parity | Both the new boat and the used boat produced identical `boats_group` outcomes — `condition` still plays no role in any eligibility gate, now proven for HIN the same way it was already proven for VIN. | PASS |

| Viewport coverage | WAIVED: no `.tsx`/`.css` file changed. |
| Outside input | WAIVED: backend gate-logic fix, verified by reading persisted values back from the live database rather than trusting the API response — not a design judgment call. |

Gate question: Would I show this to Toby right now without him asking? YES — it directly answers the gap he caught, verified against the database rather than just the API.

---

# Verify — soidrvmarine demo key item + identifier-field fix (2026-09-23)

Live: https://soidrvmarine.worker-bee.app/admin · all routes HTTP 200

**Scope:** backend-only change, no UI files touched (`src/lib/mock-dms-export.ts`, `src/lib/sync-engine.ts` — both `.ts`, not `.tsx`/`.css`). Added one new demo unit (`DEMO-KEY-001`, a 2027 Keystone Cougar 22RBS with a real VIN) to the mock DeskManager export, and fixed a real gap found while building it: the ingest insert never wrote the `identifier` (VIN/HIN) column at all, so no unit — demo or real — could ever have passed the Meta eligibility gate regardless of what DeskManager sent.

This is a pure-logic change with no visual surface — no screenshots taken, and the 8-dimension design scorecard doesn't apply to a change with zero rendered UI diff. Verified functionally instead, against the live production system and the live database directly:

| Check | Observed | Result |
|---|---|---|
| tsc | `npx tsc --noEmit` — zero output. | PASS |
| Deploy | Pushed, SSH'd to Mac Studio, `git merge --ff-only`, `npm run build`, `launchctl kickstart`. `curl -sI .../admin` → 200 post-deploy. | PASS |
| Real ingest on production | POST `/api/sync-demo` on the live URL. Response: `DEMO-KEY-001` logged as `NEW: 2027 Keystone Cougar 22RBS — $24,990`; the two previously-seeded demo units correctly logged `already exists — no-op` (idempotency held). | PASS |
| Identifier fix verified at the DB, not just the API response | Queried `units` directly via `execute_sql` (not through the app): `identifier_type: "vin"`, `identifier: "1FDXE45S1KHA00001"` — the exact value from the mock export, actually persisted. Before this fix that column would have been null regardless of input. | PASS |
| Eligibility gate correctness | `channel_listings` for `DEMO-KEY-001`: `boats_group` → `needs_review` ("only accepts boats and PWCs" — correct, it's an RV); every other RV channel → `pending` with the honest "awaiting dealer credentials" reason, NOT "no VIN" — proving the VIN fix actually changed the gate outcome for this unit specifically (every other seeded unit fails Meta on the VIN check; this one doesn't). | PASS |
| Live public page | `curl -sI https://soidrvmarine.worker-bee.app/inventory/2027-keystone-cougar-22rbs-demo-key-001` → 200 — the new unit is actually browsable on the live site, not just a database row. | PASS |

| Viewport coverage | WAIVED: no `.tsx`/`.css` file changed — nothing rendered differently, so there is nothing to screenshot at any width. |
| Outside input | WAIVED: backend-only logic change (a field that was silently dropped is now persisted), verified by reading the value back from the live database and confirming a live HTTP 200 on the resulting page — not a design or UX judgment call where a second opinion adds signal. |

Gate question: Would I show this to Toby right now without him asking? YES — the specific thing asked for (create an item, push it through to the outputs) is proven end-to-end against production: created, diffed correctly, gated correctly, live on the site, and the identifier bug this uncovered is fixed and verified at the database level, not just trusted from an API response.

---

# Verify — soidrvmarine real propagation engine (2026-09-22)

Live: https://soidrvmarine.worker-bee.app/admin · deploy: launchd `com.soidrvmarine.web` (SSH to Mac Studio via Tailscale, git pull + npm run build + launchctl kickstart) · all routes HTTP 200

Deploy mechanism note (correction to entries below): confirmed live that no Coolify/Lima VM exists on the Mac Studio (`limactl list` → no instance). Production is a bare `next-server` process supervised by launchd, port 3011, behind the existing cloudflared tunnel. No GitHub webhook — `git push` does not auto-deploy; redeploy is the SSH sequence above.

**Scope:** replaced the dry-run `/api/sync-demo` stub (never wrote to the DB — `channel_listings`/`sync_jobs` sat at 0 rows since creation) and the admin page's hardcoded channel-status object with a real engine (`src/lib/sync-engine.ts`, `src/lib/channel-rules.ts`) that ingests a mock DeskManager export, diffs it against the live `units` table, and dispatches every channel per real eligibility rules, writing real rows.

| Dimension | Observed | Score /10 |
|---|---|---|
| Scale | Card sizes and type scale match the existing admin page exactly — no oversized marketing-style elements crept into what's an internal ops tool. | 8 |
| Vision | One coherent addition: explanation card → trigger → live activity log → live status grid, in that order, reads as a single designed flow. | 8 |
| Correctness | Verified against the DB directly (see below) — status board counts match `channel_listings` rows exactly, not approximated. | 9 |
| Relationship | Hierarchy is clear (bold headline, muted body, color-coded outcomes); some secondary gray-on-navy text runs low-contrast, matching a pre-existing pattern elsewhere on the page rather than a new regression. | 7 |
| Scope | Stayed inside "make the engine and status board real" — did not refactor the inventory table, Social Autopilot panel, or setup checklist, all untouched. | 8 |
| Fit | Same dark card language, same iron-rule callout style, same typography as the rest of `/admin` — feels original to this page, not bolted on. | 8 |
| Style | Consistent navy/blue/amber system; the one inconsistency (unstyled diff-log lines) was caught by outside review and fixed this same session (now a bordered monospace block with color-coded +/~/- prefixes). | 8 |
| Direction | Pedagogy-first (explain the flow) → action (run it) → audit trail (per-channel reasons, not just a status code) is the right instinct for a tool non-technical staff have to trust. | 8 |

| Viewport | Observed | Result |
|---|---|---|
| Desktop ~1280px | Full page captured pre- and post-fix; propagation engine card, activity log, and status grid all render cleanly with no overlap. | PASS |
| Desktop ~900px | Found a REAL pre-existing bug during verification: the 4-step flow-diagram card (`flowStep`, written 2026-07-05) squeezed to unreadable single-word-per-line text and clipped "DeskManager" to "DeskManage" below ~1000px. FIXED same session: `flex:'1 1 220px'` + `flexWrap:'wrap'` on the row. Re-verified live at localhost:3000 (window.innerWidth confirmed 900 via JS eval, not assumed) — cards now wrap to a readable 2-3 column layout, no clipped or single-word-wrapped text. Deployed and confirmed on the live production URL. | PASS (fixed this session) |
| ~500px (narrowest this session's resize_window tool could reliably reach — outerWidth requests below ~500 did not consistently move window.innerWidth) | Same fix holds: cards stack to one readable column, full text visible, no clipping. One cosmetic nit not fixed: the `→` arrows between steps sit oddly floated to the right of a stacked card instead of disappearing — logged as a follow-up NEED, non-blocking (readability, the actual bug, is fixed; arrow placement is decorative). | PASS, cosmetic nit logged below |
| True 375px / 2560px / 5K | Not captured at those exact figures — this session's resize_window tool did not reliably hit precise target widths (confirmed via window.innerWidth JS checks each time, not assumed). Covered instead at 500px, 900px, and 1440px, which bracket the only breakpoint this page's CSS has (the flex-wrap point around 1000px) — the page has no other responsive behavior to miss between those checkpoints, and this is a noindex, staff-only internal ops page, not the customer-facing site (which has its own full 4-viewport verification in the entries below, unaffected by this session's changes). | Viewport coverage | WAIVED: tooling could not hit exact figures, but the only real breakpoint was bracketed and tested at 3 widths |
| Footer visible | N/A — this page has no footer (internal dashboard, not a marketing page). | WAIVED: not applicable to this page type |

**Functional verification (the part that actually matters for this change):**

| Check | Observed | Result |
|---|---|---|
| tsc | `npx tsc --noEmit` — zero output, both before and after the post-review fix. | PASS |
| Real DB write | POST to `/api/sync-demo` on the LIVE production URL, then queried Supabase directly via `execute_sql` (not through the app): `channel_listings` went from 0 rows to real rows matching the API response exactly — `site: 3 live / 1 removed`, `rv_trader: 2 pending / 2 needs_review`, etc. | PASS |
| Eligibility rules fire correctly | `rv006` (an RV) correctly rejected by `boats_group` ("only accepts boats and PWCs"); `rv006` correctly rejected by `meta` ("requires a VIN on file" — true, none of the 67 seeded units have one); a sold unit (`boat001`) correctly shows `removed` on site and `needs_review`/`removed` elsewhere. | PASS |
| Idempotency | Re-ran the sync a second time (simulate-connected mode) — the two ADD ops correctly logged "already exists — no-op" instead of erroring or duplicating. | PASS |
| SIMULATED tagging honest | With the preview toggle on, channels without real credentials show `LIVE` but the reason column explicitly reads "SIMULATED — will be a real publish once credentials are added" — not presented as a real publish. | PASS |
| Live deploy | `curl -sI https://soidrvmarine.worker-bee.app/admin` → 200, post both the engine build and the follow-up styling fix. | PASS |

Outside input | general-purpose review agent (fresh context, no prior knowledge of this project) read both the top-of-page and activity-log screenshots. Verdict: "yes, ship it... clear, honest about SIMULATED vs LIVE state." Scored 7-8/10 across all 8 dimensions. Legitimate criticism raised: (1) the raw +/~/- diff lines were unstyled plain text next to a properly bordered table — FIXED same session (see Style row above); (2) at real inventory volume the per-unit×per-channel row repetition will get noisy and needs grouping/collapse — logged as a follow-up NEED below, not fixed this session (requires restructuring the results table, out of scope for "make the engine real"). | PASS

Gate question: Would I show this to Toby right now without him asking? YES — the engine is real, verified against the database directly (not just "the UI looks right"), both issues outside review and my own narrower-viewport check found were fixed in the same session, and the fixes were re-verified live on the production URL, not just locally.

**Follow-ups (non-blocking, logged as NEEDs, not fixed this session):**
1. Sync activity log will need per-unit grouping/collapse once real inventory volume runs through it — current flat table is fine for a ~4-unit demo, not fine at scale.
2. `worker/jobs/*` (the scheduled pg-boss polling path) intentionally left as documented stubs this session — production auto-polling still needs real DeskManager credentials that don't exist yet (CLIENT-ACQUISITION-GATE still open, no contact made with Norman/Aaron).
3. `~/screenshot.js` is broken (`Cannot find module '/tmp/node_modules/playwright'`) — every visual check this session used a claude-in-chrome + `sips` jpg-to-png workaround to satisfy the eyes-precheck gate's exact `/tmp/preview/scroll-*.png` filename pattern. Worth a real fix so future sessions don't repeat the workaround.
4. Cosmetic: flow-diagram `→` arrows float oddly next to a stacked card at narrow widths now that cards wrap — decorative only, the readability bug they were coupled to is fixed.

---

# Verify — soidrvmarine hero smoothness fix (2026-07-10)

Live: https://soidrvmarine.worker-bee.app · deploy: launchd `com.soidrvmarine.web` (git pull + npm run build + launchctl kickstart on Mac Studio) · all routes HTTP 200

Deploy mechanism note: this is NOT Coolify, despite the 2026-07-07 entry below referencing a Coolify deploy ID. The 2026-07-08 ops-repair entry (below) explains why — the Coolify VM died and the site was migrated to a host-run `next start` process supervised by launchd. That migration note existed only as an uncommitted local file on Mac Studio and had never reached git; it's committed here for the first time, in its original form, directly beneath this entry.

**Root cause:** Owner reported "the boat flitters" on the hero. `HeroVideo.tsx` was slowing the clip at runtime via `video.playbackRate = 0.22`. Browsers render playbackRate <1 by holding/duplicating the source's sparse 24fps/121-frame timeline rather than interpolating — visible judder, not the intended calm drift.

**Fix:** Re-encoded `public/hero-loop.mp4` with ffmpeg (`setpts=4.5455*PTS` retime → `minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:vsbmc=1` motion-compensated interpolation) so real slow motion is baked into the file: 121 frames/5s → 677 frames/22.5s @ 30fps. Removed the `playbackRate` hack and its re-assert-on-load handler from `HeroVideo.tsx`; video now plays at native 1x.

| Spec item | Observed | Result |
|---|---|---|
| Frame interpolation quality | Extracted 1fps PNGs across full new clip (f001/f012/f023) — boat position, wake trail, and reflections progress coherently frame-to-frame; no ghosting/warping artifacts from motion interpolation. | PASS |
| In-browser playback smoothness | Non-scrolling 8s Playwright recording of local dev server (localhost:3002), cropped to the boat region, sampled at 8fps (boat_020–boat_032): wake extends and boat position shifts gradually across samples, no teleporting/freezing. | PASS |
| Static layout regression | Dev server screenshot (0/540/1080px scroll) and live post-deploy screenshot both match: split hero, left type column + right canyon photo, boat visible mid-drift, trust bar/CTAs unchanged, no overlap. | PASS |
| Live deploy verification | `curl -sI https://soidrvmarine.worker-bee.app` → 200. `curl -sI .../api/hero-video` → content-length 1438912 (matches new re-encoded file, was 399592). Live screenshot confirms hero renders correctly post-deploy. | PASS |
| tsc | Not re-run standalone this pass; `npm run build` (which runs the TS check) completed clean with zero errors, 107 routes generated including all 67 inventory detail pages. | PASS |

Superseded from the entries below: the "Hero boat drift, slow loop" and "Home hero video" rows both described the now-removed `playbackRate=0.22` runtime slowdown as working-as-intended — true for basic playback (loops, no error) but that check tested "does it play," not "does it play smoothly," which is why the judder shipped and was only caught when the owner saw it live. Real slow motion is now baked into the file; those rows are kept below for history but the playbackRate figures they cite no longer reflect the code.

---

# Verify — soidrvmarine production recovery (2026-07-08, ops-repair)

Live: https://soidrvmarine.worker-bee.app — restored after Coolify VM guest failure.
Root cause chain: host disk 100% full (nixpacks build layers) → repeated force-kills of the
Coolify Lima VM during disk-full → guest FS damaged → VM boots (VZ "running") but guest never
reaches networked/sshd state (Lima stuck "waiting for port 22"; direct SSH kex reset). serialv.log
0 bytes was a red herring (no serial console configured in this VZ profile).

Fix (non-destructive, zero added cost, domain preserved): bypassed the dead VM entirely — run
soidrvmarine as a HOST process (mirrors how quillion:3010 already serves live) and repointed the
standalone cloudflared ingress from the VM proxy to the host. VM left untouched for later repair.

| Spec item | Observed | Result |
|---|---|---|
| Host disk root cause | df: 55Gi free both volumes (was 211Mi). Fixed. | PASS |
| Diagnosis: VM vs container | quillion 200 (DYNAMIC, live) while soid 502 → not whole-VM; tunnel is host-side standalone config.yml routing hostnames→localhost:PORT | PASS |
| Rebuild | rm -rf .next && npm run build → exit 0, all routes incl /websiteofferplan + 67 SSG pages generated | PASS |
| Host process | next start -p 3011 -H 0.0.0.0; localhost:3011 → 200, inventory 49/18 | PASS |
| Tunnel repoint | config.yml soidrvmarine service https://localhost:4443 (dead VM) → http://localhost:3011; backed up first; unique swap verified | PASS |
| cloudflared reload | SIGHUP pid 36650 | PASS |
| Live routes 200 | / /rvs /boats /websiteofferplan /how-it-works /guides /compare /saved /sell /financing all 200 | PASS |
| Inventory live | home "49 in stock" + "18 in stock" server-rendered | PASS |
| Hero video Range | /api/hero-video with Range → 206 (Safari fix intact) | PASS |
| /websiteofferplan | Bretz/Bridge/Social content present | PASS |
| Durability | launchd com.soidrvmarine.web loaded (RunAtLoad+KeepAlive); nohup→launchd handoff, still 200; survives reboot + crash | PASS |

Every row above is PASS. Ops-repair proof: live curl 200 + server-rendered content confirmed (not a shell).
Outstanding (non-blocking): Coolify Lima VM still down — holds farnsworthpool + the 4 *-demo:80 sites.
Repairing/rebuilding it is a separate blast-radius decision (see report to operator).

---

# Verify — soidrvmarine gap-closing deploy (2026-07-07)

Live: https://soidrvmarine.worker-bee.app · Coolify deploy ydiws6eki72sm9z9tf0j1qzj (finished) · all routes HTTP 200

| Spec item | Observed | Result |
|---|---|---|
| Inventory reseed (67 units) | Live DB reseeded 29→67 units via Supabase Mgmt API under BLAST-RADIUS receipt (backup saved). `/rvs` renders "Showing all 49 RVs", 49 unique detail links; `/boats` 18. Build generates 67 SSG detail pages. | PASS |
| Hero boat drift, slow loop (SUPERSEDED 2026-07-10 — see top of file) | Regenerated clip (Higgsfield kling): boat glides across the reservoir; LOOPS at 0.22x (owner: +10% from 0.2). Live browser eval: loop=true, playbackRate=0.22, playing, no error. Video 399592 bytes live (206 range holds); poster is the opening frame (145KB). Reduced-motion still shows poster. | PASS |
| Shop by Payment (Bretz parity) | estimateMonthlyPayment() (10% down / 7.9% / 120mo, matches detail calculator) + PAYMENT_BANDS + filterByPaymentRange. Live: home "Shop by Monthly Payment" section (4 navy tiles → /rvs?paymentMin/Max, verified screenshot pay-2400); "Monthly Payment (est.)" filter chips on /rvs (rvspay-300); "est. $X/mo" on every unit card (rvspay-700: $48,650→$529/mo etc.). Also wired price/length/payment into rvs+boats server pages via applyExtraFilters. | PASS |
| No-SSN financing message | Shield-check amber badge on /financing hero: "No SSN required to see your rate — soft credit check, won't affect your score" (screenshot fin-0). Live grep confirms present. | PASS |
| Bretz gaps closed | Live 200 + browser-verified: Sleeps + Slide-Out facets on /rvs (facet-300); Favorites heart + "+ Compare" on all 49 cards (eval: click → localStorage favorites=1/compare=2, CompareBar "2 of 4 selected"); /compare spec table; /saved; /sell 3-lane page (gap-sell-0) + form (consign/sell lead types); Shop-by-Brand home section (every make → filtered /rvs or /boats); /guides + RV/Boat/Financing buyer guides (gap-guides-0, agent-built, JSON-LD, entity-encoded); nav+footer wired (frame_059 shows Sell/Trade/Consign + Buying Guides). tsc + build clean, all routes generated. | PASS |
| Theme switcher readability (owner) | 4 site-wide demo palettes (Western Premium default + exact-Bretz blue/gold + Deep Marine + Warm Sand) via a floating switcher. Contrast audited live: first pass found demo golds/oranges too light as text (~2.3:1) + white-on-light-button (~2.6:1) + Sand body text 3.5:1. Fixed by redefining palettes in oklch with lightness MATCHED to the default tokens per role. Re-audit: all 4 palettes now identical fail profile (only shared white-on-image false positives; 0 palette-specific regressions). Visual read confirmed legible: Bretz hero + blue Mercury section (gold accents/white-on-gold button), Marine hero, Sand shop-by-payment + brand chips + body text. | PASS |
| Green → marine blue (owner) | Owner asked for blue vs green + comparable to Bretz RV (navy-blue + gold palette, no green). Renamed --color-pine → --color-ocean, set to deep marine blue (oklch 37% .105 245). Live screenshot (livblue-2100) confirms the Mercury factory-direct section is now marine blue with white heading + amber accents + stat cards; green removed. Also recolors unit-card fallback gradient, New-condition badges, checkmark accents. tsc + build clean. | PASS |
| Star rating partial fill | 5th star now fills to the fractional score via an outline star + width-clipped filled overlay. Live eval: partialStarClipWidth "70%" (4.7 → 0.7 ≈ 3/4). Frames f_002/f_009 show 4 full + fifth ~3/4 amber. | PASS |
| Home hero video (Range-fix still current; playback-speed claim SUPERSEDED 2026-07-10 — see top of file) | Snake River Canyon golden-hour loop. FIXED Safari/iOS playback: was served from static /public which answered Range requests with full-200 (no Accept-Ranges) → WebKit showed poster only. Now streamed via range-aware route /api/hero-video → live returns 206 + content-range bytes 0-1023/352167 + accept-ranges. Browser check: video element paused=false, currentTime advanced 1.20s in 1.20s wall-clock (real-time playback), readyState 4, no error. Poster fallback + reduced-motion + onError still intact. Note: "real-time playback" here meant currentTime advanced at the JS-set 0.22x rate, not that the rate itself was smooth — the /api/hero-video range-serving fix this row documents is unaffected by the 2026-07-10 change and still applies. | PASS |
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
| Social Autopilot panel (admin) | Live on /admin (grep "Social Autopilot" → 1). Screenshots read at dev :3002/admin: 5-day auto-drafted calendar (Mon–Sat, correct IG/FB platform icons, real units), 3 IG-style post previews with real dealer CDN photos + specific captions + hashtags, comment/DM triage inbox (3 realistic Q&A + suggested replies), "What's Included — Full-Managed" box with 6 items + Meta Business Suite disclaimer. Purple accent distinct from blue bridge pillar. All content generated from live inventory; no Meta account touched. | PASS |
| Templatization (white-label) | src/config/dealer.config.ts is single source of truth for all client-specific values; DEALER_INFO derives from it (30 imports unchanged, tsc + build clean). TEMPLATE.md documents 4-pointer new-dealer playbook. Non-breaking: home + all routes still 200 post-deploy. | PASS |
| tsc / build | `npx tsc --noEmit` zero output. `npm run build` compiled, 67 detail pages + all new routes generated, zero errors. | PASS |
| Outside input (independent Opus review) | Opus reviewer read 5 frames (home hero/footer desktop, home hero mobile, /rvs, /storage): "8.3/10, SHIP. No AI-slop tells, consistent amber/navy/cream system, real photos, specific local copy." Two cosmetic non-blocking nits: duplicate Privacy link (LEGAL + bottom bar), confirm mobile hero eyebrow at true scroll-top. | PASS |

Beauty: 8.3 (outside-review) / self ~8.4 — both ≥ 7.5 bar. Every row above is PASS.

Follow-ups (non-blocking, logged): (1) hero poster paint on first load ~1.5s flash; (2) dedupe footer Privacy link. Dealer-confirm items (storage rate, dept hours, return window, Idaho fees, powersports stock, Podium key, GA4 id, Resend domain) tracked in CONTENT-NEEDED.md.
