// Built by ATLAS — 2026-09-23
// Produces the ACTUAL file/payload each channel would receive — not a status
// word. This is the step the engine was skipping: "pending" told you nothing
// about whether the underlying transformation logic was even correct. These
// generators run the real field-mapping and can be inspected directly.
//
// Honesty levels, stated per generator, not glossed over:
//   REAL       — field names/shape come from a published, citable spec.
//   BEST-EFFORT — shape follows standard dealer-feed convention; the exact
//                 schema requires the provider's own documentation, which we
//                 don't have without a signed data-provider agreement.
//   UNKNOWN    — no public spec exists at all; fabricating one would be
//                 dishonest, so this returns an explanation, not a fake file.
//
// None of this transmits anywhere. It answers "what WOULD we send" so the
// transformation logic can be checked before a single credential exists.

import type { ChannelId, Unit } from './types'
import { craigslistCategory } from './channel-rules'
import { DEALER } from '@/config/dealer.config'

export interface ChannelArtifact {
  channelId: ChannelId
  honesty: 'REAL' | 'BEST-EFFORT' | 'UNKNOWN'
  sourceNote: string
  filename: string
  contentType: string
  content: string
  unitCount: number
}

function esc(v: unknown): string {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function primaryPhoto(unit: Unit): string {
  return (unit.media?.find(m => m.is_primary)?.url) ?? unit.media?.[0]?.url ?? ''
}

function detailUrl(unit: Unit, slug: string): string {
  return `https://${DEALER.identity.domain}/inventory/${slug}`
}

// ── RV Trader (Trader Interactive) — BEST-EFFORT ───────────────────────────
// Trader Interactive's exact provider XSD is not public; this follows the
// standard shape used across RV/auto dealer feeds (dealer block + repeated
// vehicle nodes). Confirming the real schema is a Week-0 task: provider
// registration at traderinteractive.com/dealer.
export function buildRvTraderFeed(units: (Unit & { slug: string })[]): ChannelArtifact {
  const vehicles = units
    .map(u => `  <Vehicle>
    <StockNumber>${esc(u.stock_number)}</StockNumber>
    <VIN>${esc(u.identifier_type === 'vin' ? u.identifier : '')}</VIN>
    <Year>${esc(u.year)}</Year>
    <Make>${esc(u.make)}</Make>
    <Model>${esc(u.model)}</Model>
    <Type>${esc(u.rv_class ?? u.category)}</Type>
    <Condition>${esc(u.condition)}</Condition>
    <Price>${esc(u.price)}</Price>
    <LengthFt>${esc(u.length_ft ?? '')}</LengthFt>
    <Sleeps>${esc(u.sleeps ?? '')}</Sleeps>
    <SlideOuts>${esc(u.slide_outs ?? '')}</SlideOuts>
    <Description>${esc(u.description ?? '')}</Description>
    <PhotoURL>${esc(primaryPhoto(u))}</PhotoURL>
    <DetailURL>${esc(detailUrl(u, u.slug))}</DetailURL>
  </Vehicle>`)
    .join('\n')

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<Inventory>
  <Dealer>
    <Name>${esc(DEALER.identity.name)}</Name>
    <Phone>${esc(DEALER.identity.phone)}</Phone>
    <Address>${esc(DEALER.identity.address)}</Address>
  </Dealer>
${vehicles}
</Inventory>
`
  return {
    channelId: 'rv_trader',
    honesty: 'BEST-EFFORT',
    sourceNote: 'Shape follows standard RV/auto dealer feed convention. Trader Interactive\'s actual provider XSD requires provider registration to obtain — not fabricated here.',
    filename: 'rv-trader-feed.xml',
    contentType: 'application/xml',
    content,
    unitCount: units.length,
  }
}

// ── Google Vehicle Listings — REAL (documented columns) ────────────────────
// Columns per Google's published Vehicle Listings feed spec:
// https://support.google.com/merchants/answer/13203023
export function buildGoogleVehicleListingsFeed(units: (Unit & { slug: string })[]): ChannelArtifact {
  const header = ['id', 'title', 'description', 'link', 'image_link', 'price', 'condition', 'brand', 'model', 'year', 'vin'].join('\t')
  const rows = units.map(u => {
    const title = `${u.year} ${u.make} ${u.model}${u.trim ? ` ${u.trim}` : ''}`
    return [
      u.dms_id,
      title,
      (u.description ?? '').replace(/\t|\n/g, ' '),
      detailUrl(u, u.slug),
      primaryPhoto(u),
      `${u.price ?? ''} USD`,
      u.condition,
      u.make,
      u.model,
      u.year,
      u.identifier_type === 'vin' ? u.identifier ?? '' : '',
    ].join('\t')
  })

  return {
    channelId: 'google_vl',
    honesty: 'REAL',
    sourceNote: 'Column set matches Google\'s published Vehicle Listings feed spec (support.google.com/merchants/answer/13203023).',
    filename: 'google-vehicle-listings.tsv',
    contentType: 'text/tab-separated-values',
    content: [header, ...rows].join('\n') + '\n',
    unitCount: units.length,
  }
}

// ── Meta Catalog (AIA) — REAL (documented batch shape) ──────────────────────
// items_batch endpoint shape per Meta's Marketing API vehicle catalog docs.
export function buildMetaCatalogBatch(units: (Unit & { slug: string })[]): ChannelArtifact {
  const requests = units.map(u => ({
    method: 'UPDATE',
    data: {
      id: u.dms_id,
      vin: u.identifier,
      make: u.make,
      model: u.model,
      year: u.year,
      title: `${u.year} ${u.make} ${u.model}`,
      price: `${u.price ?? ''} USD`,
      condition: u.condition === 'new' ? 'EXCELLENT' : 'USED',
      availability: 'AVAILABLE',
      body_style: u.rv_class ?? u.category,
      url: detailUrl(u, u.slug),
      image_url: primaryPhoto(u),
    },
  }))

  return {
    channelId: 'meta',
    honesty: 'REAL',
    sourceNote: 'Batch shape matches Meta\'s documented Marketing API vehicle catalog items_batch endpoint (developers.facebook.com/docs/marketing-api/catalog/reference).',
    filename: 'meta-catalog-batch.json',
    contentType: 'application/json',
    content: JSON.stringify({ requests }, null, 2),
    unitCount: units.length,
  }
}

// ── Boats Group — BEST-EFFORT ───────────────────────────────────────────────
// No public schema. Shape follows standard marine dealer feed convention and
// the one confirmed real constraint (12-char HIN, validated in channel-rules.ts).
// The real schema requires the Boats Group dealer feed agreement.
export function buildBoatsGroupFeed(units: (Unit & { slug: string })[]): ChannelArtifact {
  const boats = units
    .map(u => `  <Boat>
    <HIN>${esc(u.identifier)}</HIN>
    <Make>${esc(u.make)}</Make>
    <Model>${esc(u.model)}</Model>
    <Year>${esc(u.year)}</Year>
    <Category>${esc(u.boat_class ?? u.category)}</Category>
    <Condition>${esc(u.condition)}</Condition>
    <Price>${esc(u.price)}</Price>
    <BeamFt>${esc(u.beam_ft ?? '')}</BeamFt>
    <HullMaterial>${esc(u.hull_material ?? '')}</HullMaterial>
    <EngineHP>${esc(u.engine_hp ?? '')}</EngineHP>
    <PhotoURL>${esc(primaryPhoto(u))}</PhotoURL>
    <DetailURL>${esc(detailUrl(u, u.slug))}</DetailURL>
  </Boat>`)
    .join('\n')

  return {
    channelId: 'boats_group',
    honesty: 'BEST-EFFORT',
    sourceNote: 'No public Boats Group schema exists. Shape follows standard marine dealer feed convention; the confirmed real constraint is 12-char HIN validation (channel-rules.ts). The actual schema requires the signed Boats Group dealer feed agreement.',
    filename: 'boats-group-feed.xml',
    contentType: 'application/xml',
    content: `<?xml version="1.0" encoding="UTF-8"?>\n<Inventory>\n${boats}\n</Inventory>\n`,
    unitCount: units.length,
  }
}

// ── Craigslist BAPI — BEST-EFFORT (per-listing, not a batch feed) ──────────
export function buildCraigslistPayloads(units: (Unit & { slug: string })[]): ChannelArtifact {
  const posts = units.map(u => {
    const category = craigslistCategory(u) ?? 'unknown'
    return `<post category="${esc(category)}" area="${esc(DEALER.identity.address /* craigslist_area lives on unit.location in the real schema */)}">
  <heading>${esc(`${u.year} ${u.make} ${u.model} - $${u.price ?? 'Call'}`)}</heading>
  <price>${esc(u.price ?? '')}</price>
  <body>${esc(u.description ?? '')}</body>
  <image>${esc(primaryPhoto(u))}</image>
</post>`
  })

  return {
    channelId: 'craigslist',
    honesty: 'BEST-EFFORT',
    sourceNote: 'Craigslist BAPI posts one listing at a time via its Bulk Posting API, not a batch feed like the others — this file shows what each individual POST body would contain. Exact field names require the BAPI approval docs (60-90 day process, not yet filed).',
    filename: 'craigslist-posts.xml',
    contentType: 'application/xml',
    content: `<?xml version="1.0" encoding="UTF-8"?>\n<Posts>\n${posts.join('\n')}\n</Posts>\n`,
    unitCount: units.length,
  }
}

// ── RV Universe (Sandhills) — UNKNOWN ────────────────────────────────────────
// No fabrication. This channel's format has never been confirmed.
export function buildRvUniverseArtifact(units: (Unit & { slug: string })[]): ChannelArtifact {
  return {
    channelId: 'rv_universe',
    honesty: 'UNKNOWN',
    sourceNote: 'Sandhills Global (RV Universe) has no public API. No feed format has ever been confirmed for this channel — that requires a rep call that has not happened. Generating a fake schema here would be dishonest, so this artifact states that plainly instead of pretending to know the shape.',
    filename: 'rv-universe-UNKNOWN.txt',
    contentType: 'text/plain',
    content: `RV Universe (Sandhills Global) feed format: UNKNOWN.\n\n${units.length} unit(s) would be eligible to send once a format exists.\nNext step to resolve: contact Sandhills Global for dealer feed documentation (sandhills.com).\nThis is not a placeholder for a format we know and haven't typed out — the format itself has never been confirmed.\n`,
    unitCount: units.length,
  }
}

export function buildArtifact(channelId: ChannelId, units: (Unit & { slug: string })[]): ChannelArtifact | null {
  switch (channelId) {
    case 'rv_trader': return buildRvTraderFeed(units)
    case 'google_vl': return buildGoogleVehicleListingsFeed(units)
    case 'meta': return buildMetaCatalogBatch(units)
    case 'boats_group': return buildBoatsGroupFeed(units)
    case 'craigslist': return buildCraigslistPayloads(units)
    case 'rv_universe': return buildRvUniverseArtifact(units)
    default: return null // 'site' isn't a file — it's the live page itself.
  }
}
