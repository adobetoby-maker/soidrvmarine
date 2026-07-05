| Spec item            | Observed                                              | Result |
|---|---|---|
| Layout / spacing     | Asymmetric hero split, amber border left, parchment bg, amber CTAs — all intact | PASS |
| Colors / contrast    | Navy/amber/parchment palette consistent across all sections | PASS |
| Typography           | Display serif "Southern Idaho's Premier RV & Marine Dealer" — hierarchically clear | PASS |
| Viewport 375 (mobile @2x) | Hero stacks correctly, sticky header holds, hero photo crops sensibly to portrait; scrolled to 6500px to reach true footer (3800px only reached mid-page on mobile) — footer visible, address/hours/phone all present, second flag-emoji instance caught here in the CTA trust bar | PASS |
| Viewport 1440 (desktop) | Full hero split renders correctly, footer 4-column grid clean, no overlap; captured pre-second-emoji-fix state (documents the bug before its fix) | PASS |
| Second emoji fix confirmed | Re-screenshotted live production after redeploy — "Veteran-Owned & Operated" in the CTA trust bar now renders with no flag emoji, matching the hero badge fix | PASS |
| Viewport 2560 (4K)   | Content stays centered in max-width container, no awkward full-bleed stretch, hero image scales cleanly, footer grid holds at 4 columns | PASS |
| Viewport 5K (2560@2x)| Identical composition to 2560, confirms no @2x-specific regressions (font rendering, image sharpness) | PASS |
| Real inventory       | 19 in stock (RVs), 10 in stock (Boats); 27 of 29 units now have real dealer CDN photos (2 confirmed no-photo-exists on dealer's own site, documented in CONTENT-NEEDED.md) | PASS |
| Correct phone        | (208) 324-4661 in nav, hero, and inline CTA — flagged discrepancy vs. live competitor site's tracking number in CONTENT-NEEDED.md, not changed pending dealer confirmation | PASS |
| Correct reviews      | 4.7 Stars / 1,203 Google reviews — confirmed in hero AND footer trust bar (footer was hardcoded to stale 4.6/1,200+, fixed to read from DEALER_INFO) | PASS |
| CTA band copy        | "Browse our RVs, boats, and Mercury outboards" — removed unsourced "300+" claim | PASS |
| Featured cards       | 4 real units: Hideout 262BHSWE, Bighorn 37TB, Montego Bay C8516, MirroCraft F176 — all real CDN photos with dealer signage visible | PASS |
| DB seeded            | 29 units live in Supabase (19 RV + 10 boat) — content-range confirmed via REST API | PASS |
| Contact form         | Resend-backed submission tested live end-to-end via Chrome automation — POST /api/contact returns 200, UI shows "Message Sent" confirmation (fixed a stale-synthetic-event bug found during Full Monte QA) | PASS |
| Animations / motion  | Static site — no motion elements on this pass | PASS |
| Hero image           | Was a random Picsum placeholder (green Appalachian forest, geographically wrong) — replaced with verified real Shoshone Falls / Snake River Canyon photo, the actual Magic Valley landmark | PASS |
| Boats card legibility | "IN STOCK" label had poor contrast against busy showroom photo (MirroCraft decal, Suzuki/Mercury signage) — gradient scrim strengthened (0.90/0.30 at 60% → 0.95/0.60 at 65%), verified via cropped zoom before/after | PASS |
| Trust badge icons    | Removed 🇺🇸 flag emoji from hero badges — read as cheap next to the serif/amber system; plain text now | PASS |
| Brand filter         | Added instant client-side Brand filter to /rvs (CrossRoads, Forest River, Grand Design, Heartland, Jayco, Keystone) and /boats (Bayliner, MirroCraft, Montego Bay) — verified live: click updates URL (?brand=Keystone), count (11 of 19), and grid instantly, no Apply button, no reload | PASS |
| Outside input        | Opus (independent, cold read of 4 screenshots): scored 8 dimensions 5-8/10, flagged hero image geography, Boats card text overlap, and flag emoji as the 3 real issues — all 3 fixed and re-verified above; verdict quoted: "held back from shippable by a geographically-wrong hero image, a visible text-overlap bug on the Boats card, and one unfinished category tile — fix those three and it's a legitimately strong local build" | PASS |
