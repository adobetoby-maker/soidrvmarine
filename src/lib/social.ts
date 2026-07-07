// Built by ATLAS — 2026-07-07
// Social Autopilot — auto-generates branded IG/FB posts from the same inventory
// database that feeds the website. Deterministic (no randomness): the same unit
// always produces the same post, so the demo is stable and the real system is
// auditable. This is the "full-managed" social tier: calendar + creative + triage.
import type { InventoryUnit } from './inventory'
import { DEALER_INFO } from './types'

export type PostKind = 'new-arrival' | 'weekend-feature' | 'value-highlight' | 'just-sold' | 'seasonal'
export type Platform = 'instagram' | 'facebook'

export interface GeneratedPost {
  kind: PostKind
  kindLabel: string
  platforms: Platform[]
  unit: InventoryUnit
  photo: string
  caption: string
  hashtags: string[]
  day: string // e.g. "Mon"
  time: string // e.g. "8:00 AM"
}

const usd = (n: number | null) =>
  n == null ? 'Call for price' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const CORE_TAGS = ['MagicValley', 'JeromeIdaho', 'TwinFalls', 'IdahoOutdoors']
const RV_TAGS = ['RVLife', 'TravelTrailer', 'CampingIdaho', 'RVForSale']
const BOAT_TAGS = ['BoatLife', 'MercuryMarine', 'LakeLife', 'BoatForSale']

function tagsFor(u: InventoryUnit): string[] {
  const isBoat = /boat|pontoon|fishing/i.test(u.category) || /mirrocraft|sury|mercury/i.test(u.make)
  return [...CORE_TAGS, ...(isBoat ? BOAT_TAGS : RV_TAGS)]
}

// A believable, non-fabricated caption built from the unit's real fields.
function caption(kind: PostKind, u: InventoryUnit): string {
  const name = `${u.year} ${u.make} ${u.model}`
  const specs: string[] = []
  if (u.sleeps) specs.push(`sleeps ${u.sleeps}`)
  if (u.lengthFt) specs.push(`${u.lengthFt} ft`)
  if (u.slideOuts) specs.push(`${u.slideOuts} slide${u.slideOuts > 1 ? 's' : ''}`)
  const specLine = specs.length ? ` — ${specs.join(' · ')}` : ''
  const price = usd(u.price)

  switch (kind) {
    case 'new-arrival':
      return `Just rolled onto the lot: the ${name}${specLine}. ${price}. Family-owned since 1993 and priced to move — come walk through it in Jerome. Call ${DEALER_INFO.phone} or tap the link in bio.`
    case 'weekend-feature':
      return `Weekend on the water starts here 🌅 The ${name}${specLine} is ready for the reservoir. ${price}. Factory-direct Mercury service in-house. Stop by ${DEALER_INFO.address}, Jerome.`
    case 'value-highlight':
      return `Smart buy of the week: ${name}${specLine} at ${price}. Financing available on-site — ask us what your monthly payment looks like. ${DEALER_INFO.phone}.`
    case 'just-sold':
      return `SOLD 🎉 Another ${u.make} ${u.model} headed to a great Idaho family. Thinking about upgrading? We take trade-ins — get your value in minutes at ${DEALER_INFO.domain}.`
    case 'seasonal':
      return `Idaho summer is calling. Whether it's the ${name} or one of ${'{n}'}+ others on the lot, we'll get you set up right. Veteran-owned, third generation, Magic Valley's own.`
  }
}

const KIND_LABEL: Record<PostKind, string> = {
  'new-arrival': 'New Arrival',
  'weekend-feature': 'Weekend Feature',
  'value-highlight': 'Value Highlight',
  'just-sold': 'Just Sold',
  'seasonal': 'Seasonal',
}

// Deterministic weekly plan: pick real units to fill a believable 7-day calendar.
export function weeklyPlan(rvs: InventoryUnit[], boats: InventoryUnit[]): GeneratedPost[] {
  const newRvs = rvs.filter(u => u.condition === 'New' && u.photo && !u.photo.includes('picsum'))
  const usedRvs = rvs.filter(u => u.condition === 'Used' && u.photo && !u.photo.includes('picsum'))
  const realBoats = boats.filter(u => u.photo && !u.photo.includes('picsum'))

  const pick = (arr: InventoryUnit[], i: number, fallback: InventoryUnit[]) =>
    (arr.length ? arr[i % arr.length] : fallback[i % fallback.length])

  const plan: { kind: PostKind; day: string; time: string; platforms: Platform[]; unit: InventoryUnit }[] = [
    { kind: 'new-arrival',     day: 'Mon', time: '8:00 AM',  platforms: ['instagram', 'facebook'], unit: pick(newRvs, 0, rvs) },
    { kind: 'value-highlight', day: 'Tue', time: '12:30 PM', platforms: ['facebook'],              unit: pick(usedRvs, 0, rvs) },
    { kind: 'weekend-feature', day: 'Thu', time: '5:00 PM',  platforms: ['instagram', 'facebook'], unit: pick(realBoats, 0, boats) },
    { kind: 'new-arrival',     day: 'Fri', time: '9:00 AM',  platforms: ['instagram'],             unit: pick(newRvs, 1, rvs) },
    { kind: 'weekend-feature', day: 'Sat', time: '10:00 AM', platforms: ['instagram', 'facebook'], unit: pick(realBoats, 1, boats) },
  ]

  return plan.map(p => ({
    kind: p.kind,
    kindLabel: KIND_LABEL[p.kind],
    platforms: p.platforms,
    unit: p.unit,
    photo: p.unit.photo,
    caption: caption(p.kind, p.unit),
    hashtags: tagsFor(p.unit),
    day: p.day,
    time: p.time,
  }))
}

// Mock engagement queue — realistic questions a dealer gets, with the suggested
// reply the managed service would send after approval. Content-only demo.
export interface EngagementItem {
  platform: Platform
  handle: string
  question: string
  suggestedReply: string
  minutesAgo: number
}

export function engagementQueue(): EngagementItem[] {
  return [
    {
      platform: 'instagram', handle: '@boisecampfam', minutesAgo: 14,
      question: 'Is the Hideout 262BHSWE still available? What\'s your best cash price?',
      suggestedReply: `Hi! Yes, the 2026 Keystone Hideout 262BHSWE is on the lot. Best to talk numbers by phone — give us a ring at ${DEALER_INFO.phone} and ask for the sales desk. We also finance on-site.`,
    },
    {
      platform: 'facebook', handle: 'Dave R.', minutesAgo: 47,
      question: 'Do you service Mercury outboards or just sell them?',
      suggestedReply: 'Both — we\'re Magic Valley\'s only factory-direct Mercury dealer, with certified techs in-house for service and repower. Happy to get you scheduled.',
    },
    {
      platform: 'instagram', handle: '@twinfallsangler', minutesAgo: 92,
      question: 'Any used pontoons under $25k coming in?',
      suggestedReply: 'We rotate used inventory weekly — a couple pontoons are due in this month. Want us to text you when one lands? Send your number to our page and we\'ll keep you posted.',
    },
  ]
}
