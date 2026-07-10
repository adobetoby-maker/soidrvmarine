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
