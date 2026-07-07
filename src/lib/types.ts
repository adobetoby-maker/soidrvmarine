// Built by ATLAS — 2026-07-04
// Canonical TypeScript types for Southern Idaho RV & Marine DB schema

export type UnitType = 'rv' | 'boat' | 'motor' | 'trailer'
export type IdentifierType = 'vin' | 'hin' | 'serial'
export type UnitStatus = 'draft' | 'active' | 'pending_sale' | 'sold' | 'pending_removal' | 'archived'
export type Condition = 'new' | 'used'
export type PostingProfile = 'FULL' | 'LOCAL' | 'FREE' | 'SITE_ONLY' | 'CUSTOM'
export type ProfileSource = 'dms' | 'manual'
export type TitleStatus = 'clean' | 'salvage' | 'flood' | 'na'
export type ChannelId = 'site' | 'rv_trader' | 'boats_group' | 'rv_universe' | 'meta' | 'google_vl' | 'craigslist'
export type ListingStatus = 'queued' | 'live' | 'pending' | 'failed' | 'needs_review' | 'removed'

export interface UnitLocation {
  address: string
  city: string
  state: string
  zip: string
  county: string
  lat: number
  lng: number
  craigslist_area: string
}

export interface Unit {
  id: string
  dms_id: string
  stock_number: string
  unit_type: UnitType
  identifier_type: IdentifierType
  identifier: string | null
  condition: Condition
  status: UnitStatus
  category: string
  title_status: TitleStatus
  year: number
  make: string
  model: string
  trim: string | null
  price: number | null
  msrp: number | null
  sale_price: number | null
  description: string | null
  location: UnitLocation
  posting_profile: PostingProfile
  custom_channels: string[] | null
  profile_source: ProfileSource
  dms_profile_raw: string | null
  profile_updated_at: string | null

  // RV extensions
  rv_class: string | null
  length_ft: number | null
  sleeps: number | null
  slide_outs: number | null
  gvwr_lbs: number | null
  dry_weight_lbs: number | null
  fresh_water_gal: number | null
  black_water_gal: number | null
  fuel_type: string | null
  mileage: number | null
  engine_make: string | null
  chassis: string | null
  awnings: number | null
  ac_units: number | null
  generator: boolean | null
  floorplan_name: string | null

  // Boat extensions
  boat_class: string | null
  beam_ft: number | null
  hull_material: string | null
  engine_count: number | null
  engine_model: string | null
  engine_hp: number | null
  engine_hours: number | null
  drive_type: string | null
  trailer_included: boolean | null
  trailer_vin: string | null
  max_capacity_persons: number | null

  // Motor extensions
  motor_hp: number | null
  shaft_length: string | null
  motor_stroke: string | null
  motor_weight_lbs: number | null
  warranty_months: number | null

  created_at: string
  updated_at: string
  sold_at: string | null
  dms_last_seen_at: string | null

  // Relations (populated via joins)
  media?: Media[]
  channel_listings?: ChannelListing[]
}

export interface Media {
  id: string
  unit_id: string
  url: string
  width: number | null
  height: number | null
  sort_order: number
  is_primary: boolean
  source: string
  created_at: string
}

export interface ChannelListing {
  id: string
  unit_id: string
  channel_id: ChannelId
  status: ListingStatus
  external_id: string | null
  external_url: string | null
  last_synced_at: string | null
  last_error: string | null
  first_published_at: string | null
  removed_at: string | null
  created_at: string
  updated_at: string
}

export interface ChannelCategoryMap {
  id: string
  canonical_category: string
  channel_id: ChannelId
  channel_code: string
  channel_label: string | null
  notes: string | null
}

export interface ChannelSettings {
  channel_id: ChannelId
  enabled: boolean
  credentials: Record<string, unknown> | null
  config: Record<string, unknown> | null
  last_feed_at: string | null
  last_error: string | null
  notes: string | null
  updated_at: string
}

export interface SyncJob {
  id: string
  job_id: string | null
  unit_id: string | null
  channel_id: ChannelId | null
  action: string
  attempts: number
  result: Record<string, unknown> | null
  queued_at: string
  started_at: string | null
  completed_at: string | null
  failed_at: string | null
}

// ── Channel adapter interface ─────────────────────────────────────────────

export interface FieldError {
  field: string
  message: string
}

export interface ChannelResult {
  success: boolean
  externalId?: string
  externalUrl?: string
  error?: string
  rawResponse?: unknown
}

export interface ChannelAdapter {
  channelId: ChannelId
  supports(unit: Unit): boolean
  validate(unit: Unit): FieldError[]
  publish(unit: Unit): Promise<ChannelResult>
  update(unit: Unit): Promise<ChannelResult>
  unpublish(unit: Unit): Promise<ChannelResult>
}

// ── Posting profile helpers ───────────────────────────────────────────────

const ALL_CHANNELS: ChannelId[] = ['site', 'rv_trader', 'boats_group', 'rv_universe', 'meta', 'google_vl', 'craigslist']
const LOCAL_CHANNELS: ChannelId[] = ['site', 'craigslist']
const FREE_CHANNELS: ChannelId[] = ['site', 'rv_universe', 'google_vl']

export function resolvePostingChannels(unit: Unit): ChannelId[] {
  switch (unit.posting_profile) {
    case 'FULL': return ALL_CHANNELS
    case 'LOCAL': return LOCAL_CHANNELS
    case 'FREE': return FREE_CHANNELS
    case 'SITE_ONLY': return ['site']
    case 'CUSTOM': return (unit.custom_channels ?? ['site']) as ChannelId[]
    default: return ALL_CHANNELS
  }
}

// ── Inventory display helpers ─────────────────────────────────────────────

export function formatPrice(price: number | null): string {
  if (price == null) return 'Call for price'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
}

export function getUnitSlug(unit: Unit): string {
  const year = unit.year
  const make = unit.make.toLowerCase().replace(/\s+/g, '-')
  const model = unit.model.toLowerCase().replace(/\s+/g, '-')
  const stock = unit.stock_number
  return `${year}-${make}-${model}-${stock}`
}

export function getUnitTitle(unit: Unit): string {
  return `${unit.year} ${unit.make} ${unit.model}${unit.trim ? ` ${unit.trim}` : ''}`
}

export function getUnitTypeLabel(type: UnitType): string {
  switch (type) {
    case 'rv': return 'RV'
    case 'boat': return 'Boat'
    case 'motor': return 'Outboard Motor'
    case 'trailer': return 'Trailer'
  }
}

export function getPrimaryImage(unit: Unit): string | null {
  const media = unit.media ?? []
  const primary = media.find(m => m.is_primary)
  return primary?.url ?? media[0]?.url ?? null
}

// ── SEO helpers ───────────────────────────────────────────────────────────

export const DEALER_INFO = {
  name: 'Southern Idaho RV & Marine',
  shortName: 'SI RV & Marine',
  address: '60 Bob Barton Road',
  city: 'Jerome',
  state: 'ID',
  zip: '83338',
  phone: '(208) 324-4661',
  phoneHref: 'tel:+12083244661',
  email: 'info@soidrvmarine.com',
  lat: 42.7258,
  lng: -114.5191,
  tagline: 'Southern Idaho\'s Only Factory-Direct Mercury Dealer',
  heroLine: 'Veterans Serving Idaho Families',
  reviewCount: 1203,
  reviewScore: 4.7,
  yearsInBusiness: 32,
  domain: 'soidrvmarine.com',
  gbpUrl: 'https://g.page/southern-idaho-rv-marine',
  fbUrl: 'https://facebook.com/soidrvmarine',
  instagramUrl: 'https://instagram.com/soidrvmarine',
  youtubeUrl: 'https://youtube.com/@soidrvmarine',
  xUrl: 'https://x.com/soidrvmarine',
  directionsUrl: 'https://maps.google.com/?q=60+Bob+Barton+Road+Jerome+ID+83338',
}
