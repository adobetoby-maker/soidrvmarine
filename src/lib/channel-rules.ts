// Built by ATLAS — 2026-09-22
// Real per-channel eligibility gates, mirrored from the adapter specs in
// worker/jobs/channel-adapters/*.ts. This is the actual business logic that
// decides whether a unit qualifies for a channel — not a stub.

import type { ChannelId, Unit } from './types'

export interface EligibilityResult {
  eligible: boolean
  reason?: string // populated when eligible === false
}

// 3-char manufacturer code + 5-char hull serial + 2-digit model year +
// 2-digit production month, per the Boats Group feed spec noted in the
// original boats-group.ts adapter stub.
const HIN_PATTERN = /^[A-Z]{3}[A-Z0-9]{5}[A-Z0-9]{4}$/

export function checkEligibility(channelId: ChannelId, unit: Unit): EligibilityResult {
  switch (channelId) {
    case 'site':
      return { eligible: true }

    case 'rv_trader':
      if (unit.unit_type !== 'rv') {
        return { eligible: false, reason: 'RV Trader (Trader Interactive) only accepts RVs' }
      }
      return { eligible: true }

    case 'boats_group':
      if (unit.unit_type !== 'boat') {
        return { eligible: false, reason: 'Boats Group (Boat Trader + YachtWorld + boats.com) only accepts boats and PWCs' }
      }
      if (unit.identifier_type !== 'hin' || !unit.identifier) {
        return { eligible: false, reason: 'Boats Group requires a HIN on file — DeskManager has not supplied one for this unit' }
      }
      if (!HIN_PATTERN.test(unit.identifier)) {
        return { eligible: false, reason: `Boats Group requires a valid 12-character HIN — "${unit.identifier}" does not match the manufacturer+serial+year+month format` }
      }
      return { eligible: true }

    case 'rv_universe':
      if (unit.unit_type !== 'rv') {
        return { eligible: false, reason: 'RV Universe (Sandhills Global) only accepts RVs' }
      }
      return { eligible: true }

    case 'meta':
      if (unit.unit_type !== 'rv') {
        return { eligible: false, reason: 'Meta Catalog (AIA) only accepts RVs — boats use HIN, not VIN, and are ineligible' }
      }
      if (unit.identifier_type !== 'vin' || !unit.identifier) {
        return { eligible: false, reason: 'Meta requires a VIN on file — DeskManager has not supplied one for this unit' }
      }
      return { eligible: true }

    case 'google_vl':
      if (unit.unit_type !== 'rv') {
        return { eligible: false, reason: 'Google Vehicle Listings excludes boats by policy' }
      }
      return { eligible: true }

    case 'craigslist':
      if (unit.unit_type !== 'rv' && unit.unit_type !== 'boat') {
        return { eligible: false, reason: 'Craigslist BAPI dealer categories cover RVs (rvd) and boats (bod) only' }
      }
      return { eligible: true }

    default:
      return { eligible: false, reason: 'Unknown channel' }
  }
}

export function craigslistCategory(unit: Unit): 'rvd' | 'bod' | null {
  if (unit.unit_type === 'rv') return 'rvd'
  if (unit.unit_type === 'boat') return 'bod'
  return null
}
