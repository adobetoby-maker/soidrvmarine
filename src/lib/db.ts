// Built by ATLAS — 2026-07-04
// Supabase-backed inventory queries — replaces static arrays from lib/inventory.ts
// Falls back to static data when NEXT_PUBLIC_SUPABASE_URL is not set (CI / preview)

import { createClient } from '@supabase/supabase-js'
import type { InventoryUnit } from './inventory'
import { RV_INVENTORY, BOAT_INVENTORY, POWERSPORTS_INVENTORY, MOTOR_INVENTORY } from './inventory'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

type DbRow = {
  id: string
  slug: string | null
  dms_id: string
  year: number
  make: string
  model: string
  trim: string | null
  category: string
  condition: 'new' | 'used'
  price: number | null
  length_ft: number | null
  sleeps: number | null
  slide_outs: number | null
  mileage: number | null
  media: { url: string; sort_order: number }[]
}

const CATEGORY_MAP: Record<string, string> = {
  'fifth-wheel':      'Fifth Wheel',
  'travel-trailer':   'Travel Trailer',
  'pop-up-camper':    'Pop-Up Camper',
  'class-a':          'Class A',
  'class-b':          'Class B',
  'class-c':          'Class C',
  'toy-hauler':       'Toy Hauler',
  'utility-trailer':  'Utility Trailer',
  'pontoon':          'Pontoon',
  'bass-boat':        'Bass Boat',
  'fishing':          'Fishing',
  'powersports':      'Powersports',
  'atv':              'ATV',
  'utv':              'UTV',
  'snowmobile':       'Snowmobile',
  'motorcycle':       'Motorcycle',
  'outboard-motor':   'Outboard Motor',
}

function rowToUnit(row: DbRow): InventoryUnit {
  const primaryPhoto = row.media?.find(m => m.sort_order === 0)?.url
    ?? `https://picsum.photos/id/28/600/420`

  return {
    slug: row.slug ?? row.dms_id,
    year: row.year,
    make: row.make,
    model: row.model,
    trim: row.trim ?? undefined,
    category: CATEGORY_MAP[row.category] ?? row.category,
    condition: row.condition === 'new' ? 'New' : 'Used',
    price: row.price ?? null,
    photo: primaryPhoto,
    lengthFt: row.length_ft ?? undefined,
    sleeps: row.sleeps ?? undefined,
    slideOuts: row.slide_outs ?? undefined,
    mileage: row.mileage ?? undefined,
  }
}

export async function getRvInventory(): Promise<InventoryUnit[]> {
  const client = getAdminClient()
  if (!client) return RV_INVENTORY

  const { data, error } = await client
    .from('units')
    .select('*, media(url, sort_order)')
    .eq('unit_type', 'rv')
    .eq('status', 'active')
    .order('year', { ascending: false })

  if (error || !data?.length) {
    console.warn('[db] RV query failed, using static fallback:', error?.message)
    return RV_INVENTORY
  }

  return (data as DbRow[]).map(rowToUnit)
}

export async function getBoatInventory(): Promise<InventoryUnit[]> {
  const client = getAdminClient()
  if (!client) return BOAT_INVENTORY

  const { data, error } = await client
    .from('units')
    .select('*, media(url, sort_order)')
    .eq('unit_type', 'boat')
    .eq('status', 'active')
    .order('year', { ascending: false })

  if (error || !data?.length) {
    console.warn('[db] Boat query failed, using static fallback:', error?.message)
    return BOAT_INVENTORY
  }

  return (data as DbRow[]).map(rowToUnit)
}

// Powersports (ATV/UTV/snowmobile/motorcycle) — real category on the live dealer nav.
// Zero live units as of the 2026-07-07 scrape; falls back to the (currently empty)
// static array so the page renders cleanly and picks up real stock the moment the
// DMS sync populates the `units` table with unit_type = 'powersports'.
export async function getPowersportsInventory(): Promise<InventoryUnit[]> {
  const client = getAdminClient()
  if (!client) return POWERSPORTS_INVENTORY

  const { data, error } = await client
    .from('units')
    .select('*, media(url, sort_order)')
    .eq('unit_type', 'powersports')
    .eq('status', 'active')
    .order('year', { ascending: false })

  if (error || !data?.length) {
    if (error) console.warn('[db] Powersports query failed, using static fallback:', error.message)
    return POWERSPORTS_INVENTORY
  }

  return (data as DbRow[]).map(rowToUnit)
}

// Used outboard motors as individual browsable units (distinct from the informational
// /motors/mercury-outboards page). Same zero-live-inventory situation as powersports.
export async function getMotorInventory(): Promise<InventoryUnit[]> {
  const client = getAdminClient()
  if (!client) return MOTOR_INVENTORY

  const { data, error } = await client
    .from('units')
    .select('*, media(url, sort_order)')
    .eq('unit_type', 'motor')
    .eq('status', 'active')
    .order('year', { ascending: false })

  if (error || !data?.length) {
    if (error) console.warn('[db] Motor query failed, using static fallback:', error.message)
    return MOTOR_INVENTORY
  }

  return (data as DbRow[]).map(rowToUnit)
}

export async function getUnitBySlug(slug: string): Promise<InventoryUnit | null> {
  const client = getAdminClient()
  if (!client) {
    return [...RV_INVENTORY, ...BOAT_INVENTORY, ...POWERSPORTS_INVENTORY, ...MOTOR_INVENTORY].find(u => u.slug === slug) ?? null
  }

  const { data, error } = await client
    .from('units')
    .select('*, media(url, sort_order)')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return rowToUnit(data as DbRow)
}
