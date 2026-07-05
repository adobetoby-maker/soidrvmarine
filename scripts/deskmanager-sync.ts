#!/usr/bin/env npx ts-node
// Built by ATLAS — 2026-07-05
// DeskManager → Supabase propagation demo
//
// THE IN-BETWEEN PIECE: DeskManager is the dealer's source of truth.
// This script pulls an XML export, transforms it to our DB schema,
// upserts to Supabase, then tells Next.js to show the new data within seconds.
//
// REAL OPERATION: DeskManager pushes XML to an FTP/SFTP endpoint nightly.
// We pick it up, run this, the site updates automatically.
//
// IRON RULE: We never write back to DeskManager. It is always the master.
//
// Usage:
//   npx ts-node scripts/deskmanager-sync.ts             # dry-run with sample data
//   npx ts-node scripts/deskmanager-sync.ts --live      # upsert to Supabase
//   npx ts-node scripts/deskmanager-sync.ts --revalidate # also trigger ISR

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

// ── Config ────────────────────────────────────────────────────────────────────
const DRY_RUN    = !process.argv.includes('--live')
const REVALIDATE = process.argv.includes('--revalidate')
const SITE_URL   = process.env.SITE_URL ?? 'https://soidrvmarine.worker-bee.app'
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET ?? 'demo-secret'

// ── DeskManager XML format (realistic replica of their export format) ──────────
// Real DeskManager export arrives as XML over SFTP or HTTP POST webhook.
// Format follows the ATC Standard Dealer Exchange Protocol (SDXP).
const SAMPLE_DESKMANAGER_XML = `<?xml version="1.0" encoding="UTF-8"?>
<DealerExport dealer_id="SOIDRV-001" exported_at="2026-07-05T06:00:00Z">
  <Units>

    <!-- NEW UNIT: Just arrived at the lot this morning -->
    <Unit action="ADD">
      <StockNumber>TG250101</StockNumber>
      <DmsId>dms-2026-passport-2450rkwe-b</DmsId>
      <UnitType>rv</UnitType>
      <Condition>new</Condition>
      <Status>active</Status>
      <Category>travel-trailer</Category>
      <Year>2026</Year>
      <Make>Keystone</Make>
      <Model>Passport 2450RKWE</Model>
      <Trim></Trim>
      <Price>33995</Price>
      <MSRP>39500</MSRP>
      <LengthFt>27</LengthFt>
      <Sleeps>4</Sleeps>
      <SlideOuts>1</SlideOuts>
      <Mileage></Mileage>
      <PostingProfile>FULL</PostingProfile>
      <Description>2026 Keystone Passport 2450RKWE — rear kitchen layout, residential fridge, frameless windows. Sleeps 4. One slide out. Perfect for couples and weekend trips.</Description>
      <Media>
        <Photo sort="0" primary="true">https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14375679/fb64fef3-834d-427d-880f-ab03a787a5e9.jpeg</Photo>
      </Media>
    </Unit>

    <!-- PRICE UPDATE: Existing unit, price reduced -->
    <Unit action="UPDATE">
      <StockNumber>TG240740</StockNumber>
      <DmsId>rv001</DmsId>
      <UnitType>rv</UnitType>
      <Condition>new</Condition>
      <Status>active</Status>
      <Category>travel-trailer</Category>
      <Year>2026</Year>
      <Make>Keystone</Make>
      <Model>Hideout 21BWE</Model>
      <Price>21999</Price>
      <MSRP>28000</MSRP>
      <LengthFt>24</LengthFt>
      <Sleeps>6</Sleeps>
      <SlideOuts>1</SlideOuts>
      <PostingProfile>FULL</PostingProfile>
      <Description>2026 Keystone Hideout 21BWE — lightweight bunkhouse, perfect for families. Price reduced for quick sale.</Description>
      <Media>
        <Photo sort="0" primary="true">https://picsum.photos/id/167/800/560</Photo>
      </Media>
    </Unit>

    <!-- SOLD: Remove from site immediately -->
    <Unit action="REMOVE">
      <StockNumber>BOAT009</StockNumber>
      <DmsId>boat009</DmsId>
      <UnitType>boat</UnitType>
      <Status>sold</Status>
    </Unit>

    <!-- NEW BOAT: MirroCraft just landed -->
    <Unit action="ADD">
      <StockNumber>BOAT011</StockNumber>
      <DmsId>boat011</DmsId>
      <UnitType>boat</UnitType>
      <Condition>new</Condition>
      <Status>active</Status>
      <Category>fishing</Category>
      <Year>2026</Year>
      <Make>MirroCraft</Make>
      <Model>F1868</Model>
      <Price>44250</Price>
      <MSRP>51000</MSRP>
      <LengthFt>18</LengthFt>
      <PostingProfile>FULL</PostingProfile>
      <Description>2026 MirroCraft F1868 — deep-V aluminum hull, Mercury outboard, livewells, aerated. The workhorse for Snake River walleye.</Description>
      <Media>
        <Photo sort="0" primary="true">https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13844153/3d894568-6112-4531-b3aa-b912c478eb5b.jpeg</Photo>
      </Media>
    </Unit>

  </Units>
</DealerExport>`

// ── Types ─────────────────────────────────────────────────────────────────────

interface ParsedUnit {
  action: 'ADD' | 'UPDATE' | 'REMOVE'
  dmsId: string
  stockNumber: string
  unitType: string
  condition?: string
  status: string
  category?: string
  year?: number
  make?: string
  model?: string
  trim?: string
  price?: number | null
  msrp?: number | null
  lengthFt?: number | null
  sleeps?: number | null
  slideOuts?: number | null
  mileage?: number | null
  postingProfile?: string
  description?: string
  photos: { url: string; sortOrder: number; isPrimary: boolean }[]
}

interface SyncResult {
  action: string
  dmsId: string
  stockNumber: string
  status: 'success' | 'dry-run' | 'error' | 'skipped'
  detail: string
}

// ── XML parser (lightweight — no xml2js dependency needed for demo) ────────────

function extractText(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, 'i'))
  return m ? m[1].trim() : ''
}

function extractAllTags(xml: string, tag: string): string[] {
  const results: string[] = []
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'gi')
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) results.push(m[0])
  return results
}

function attr(xml: string, attrName: string): string {
  const m = xml.match(new RegExp(`${attrName}="([^"]*)"`, 'i'))
  return m ? m[1] : ''
}

function num(s: string): number | null {
  const n = parseFloat(s)
  return isNaN(n) ? null : n
}

function int(s: string): number | null {
  const n = parseInt(s, 10)
  return isNaN(n) ? null : n
}

function parseXml(xml: string): ParsedUnit[] {
  const unitBlocks = extractAllTags(xml, 'Unit')
  return unitBlocks.map(block => {
    const photos = extractAllTags(block, 'Photo').map(ph => ({
      url: ph.replace(/<[^>]+>/g, '').trim(),
      sortOrder: parseInt(attr(ph, 'sort') || '0', 10),
      isPrimary: attr(ph, 'primary') === 'true',
    }))

    return {
      action:         (extractText(block, 'Unit').match(/action="(\w+)"/) ?? [])[1] as 'ADD'|'UPDATE'|'REMOVE'
                      ?? attr(block, 'action') as 'ADD'|'UPDATE'|'REMOVE',
      dmsId:          extractText(block, 'DmsId'),
      stockNumber:    extractText(block, 'StockNumber'),
      unitType:       extractText(block, 'UnitType'),
      condition:      extractText(block, 'Condition') || undefined,
      status:         extractText(block, 'Status') || 'active',
      category:       extractText(block, 'Category') || undefined,
      year:           int(extractText(block, 'Year')) ?? undefined,
      make:           extractText(block, 'Make') || undefined,
      model:          extractText(block, 'Model') || undefined,
      trim:           extractText(block, 'Trim') || undefined,
      price:          num(extractText(block, 'Price')),
      msrp:           num(extractText(block, 'MSRP')),
      lengthFt:       num(extractText(block, 'LengthFt')),
      sleeps:         int(extractText(block, 'Sleeps')),
      slideOuts:      int(extractText(block, 'SlideOuts')),
      mileage:        int(extractText(block, 'Mileage')),
      postingProfile: extractText(block, 'PostingProfile') || 'FULL',
      description:    extractText(block, 'Description') || undefined,
      photos,
    }
  })
}

// ── Slug generator ─────────────────────────────────────────────────────────────

function makeSlug(unit: ParsedUnit): string {
  const year   = unit.year ?? 'unknown'
  const make   = (unit.make ?? '').toLowerCase().replace(/\s+/g, '-')
  const model  = (unit.model ?? '').toLowerCase().replace(/[\s/]+/g, '-').replace(/[^a-z0-9-]/g, '')
  const stock  = (unit.stockNumber ?? '').toLowerCase()
  const cond   = unit.condition === 'new' ? 'new' : 'used'
  const type   = unit.unitType === 'boat' ? 'boat' : 'rv'
  return `${year}-${make}-${model}-${cond}-${type}-${stock}`
}

// ── Supabase upsert ────────────────────────────────────────────────────────────

async function upsertUnit(
  supabase: ReturnType<typeof createClient>,
  unit: ParsedUnit,
): Promise<SyncResult> {
  const slug = makeSlug(unit)

  if (unit.action === 'REMOVE') {
    if (DRY_RUN) {
      return { action: 'REMOVE', dmsId: unit.dmsId, stockNumber: unit.stockNumber, status: 'dry-run', detail: `Would mark ${unit.dmsId} as sold` }
    }
    const { error } = await supabase
      .from('units')
      .update({ status: unit.status ?? 'sold' })
      .eq('dms_id', unit.dmsId)
    return {
      action: 'REMOVE', dmsId: unit.dmsId, stockNumber: unit.stockNumber,
      status: error ? 'error' : 'success',
      detail: error ? error.message : `Marked ${unit.dmsId} as ${unit.status}`,
    }
  }

  const row = {
    dms_id:          unit.dmsId,
    stock_number:    unit.stockNumber,
    slug:            slug,
    unit_type:       unit.unitType,
    identifier_type: unit.unitType === 'boat' ? 'hin' : 'serial',
    condition:       unit.condition ?? 'new',
    status:          unit.status ?? 'active',
    category:        unit.category ?? 'travel-trailer',
    year:            unit.year,
    make:            unit.make,
    model:           unit.model,
    trim:            unit.trim ?? null,
    price:           unit.price ?? null,
    msrp:            unit.msrp ?? null,
    description:     unit.description ?? null,
    length_ft:       unit.lengthFt ?? null,
    sleeps:          unit.sleeps ?? null,
    slide_outs:      unit.slideOuts ?? null,
    mileage:         unit.mileage ?? null,
    posting_profile: unit.postingProfile ?? 'FULL',
    profile_source:  'dms',
    profile_updated_at: new Date().toISOString(),
  }

  if (DRY_RUN) {
    return {
      action: unit.action, dmsId: unit.dmsId, stockNumber: unit.stockNumber,
      status: 'dry-run',
      detail: `Would upsert: ${unit.year} ${unit.make} ${unit.model} @ $${unit.price?.toLocaleString() ?? 'call for price'}`,
    }
  }

  const { data: upserted, error: upsertError } = await supabase
    .from('units')
    .upsert(row, { onConflict: 'dms_id' })
    .select('id')
    .single()

  if (upsertError || !upserted) {
    return { action: unit.action, dmsId: unit.dmsId, stockNumber: unit.stockNumber, status: 'error', detail: upsertError?.message ?? 'Unknown error' }
  }

  // Insert/replace primary media
  if (unit.photos.length > 0) {
    await supabase.from('media').delete().eq('unit_id', upserted.id)
    await supabase.from('media').insert(
      unit.photos.map(p => ({
        unit_id:    upserted.id,
        url:        p.url,
        sort_order: p.sortOrder,
        is_primary: p.isPrimary,
        source:     'dms',
      }))
    )
  }

  return {
    action: unit.action, dmsId: unit.dmsId, stockNumber: unit.stockNumber,
    status: 'success',
    detail: `${unit.action} complete: ${unit.year} ${unit.make} ${unit.model} — slug: ${slug}`,
  }
}

// ── ISR revalidation ───────────────────────────────────────────────────────────

async function triggerRevalidation(paths: string[]): Promise<void> {
  console.log('\n🔄 Triggering ISR revalidation...')
  for (const path of paths) {
    try {
      const res = await fetch(`${SITE_URL}/api/revalidate?path=${encodeURIComponent(path)}&secret=${REVALIDATE_SECRET}`)
      const body = await res.json()
      console.log(`  ✓ ${path} — ${JSON.stringify(body)}`)
    } catch (err) {
      console.log(`  ✗ ${path} — fetch failed (site may be offline)`)
    }
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const startedAt = Date.now()

  console.log('═══════════════════════════════════════════════════════════════')
  console.log('  DeskManager → Supabase → Site Propagation Demo')
  console.log('  Southern Idaho RV & Marine')
  console.log(`  Mode: ${DRY_RUN ? '🔍 DRY RUN (no DB writes)' : '🚀 LIVE (writing to Supabase)'}`)
  console.log('═══════════════════════════════════════════════════════════════\n')

  // 1. PARSE — read DeskManager XML export
  console.log('Step 1: Parsing DeskManager XML export...')
  const units = parseXml(SAMPLE_DESKMANAGER_XML)
  console.log(`  Found ${units.length} units in export:`)
  units.forEach(u => console.log(`    ${u.action.padEnd(7)} ${u.stockNumber.padEnd(12)} ${u.year ?? ''} ${u.make ?? ''} ${u.model ?? ''}`))

  // 2. VALIDATE — check required fields
  console.log('\nStep 2: Validating required fields...')
  const valid:   ParsedUnit[] = []
  const invalid: { unit: ParsedUnit; reason: string }[] = []

  for (const unit of units) {
    if (!unit.dmsId)   { invalid.push({ unit, reason: 'missing DmsId' }); continue }
    if (unit.action !== 'REMOVE' && !unit.make)  { invalid.push({ unit, reason: 'missing Make' }); continue }
    if (unit.action !== 'REMOVE' && !unit.model) { invalid.push({ unit, reason: 'missing Model' }); continue }
    valid.push(unit)
  }

  if (invalid.length > 0) {
    console.log(`  ⚠️  ${invalid.length} invalid units (skipped):`)
    invalid.forEach(e => console.log(`    ${e.unit.dmsId} — ${e.reason}`))
  }
  console.log(`  ✓ ${valid.length} units pass validation`)

  // 3. UPSERT — write to Supabase
  console.log('\nStep 3: Upserting to Supabase...')

  let supabase: ReturnType<typeof createClient> | null = null
  if (!DRY_RUN) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      console.error('  ✗ NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing')
      console.error('    Run: source /Users/drive/soidrvmarine/.env.local && npx ts-node scripts/deskmanager-sync.ts --live')
      process.exit(1)
    }
    supabase = createClient(url, key, { auth: { persistSession: false } })
  }

  const results: SyncResult[] = []
  for (const unit of valid) {
    const result = supabase
      ? await upsertUnit(supabase, unit)
      : { action: unit.action, dmsId: unit.dmsId, stockNumber: unit.stockNumber, status: 'dry-run' as const, detail: `Would ${unit.action.toLowerCase()}: ${unit.year} ${unit.make} ${unit.model}` }
    results.push(result)
    const icon = result.status === 'success' ? '✓' : result.status === 'dry-run' ? '○' : '✗'
    console.log(`  ${icon} ${result.action.padEnd(7)} ${result.stockNumber.padEnd(12)} ${result.detail}`)
  }

  // 4. REVALIDATE — tell Next.js to serve fresh data
  const affectedPaths = ['/rvs', '/boats', '/inventory']
  if (REVALIDATE && !DRY_RUN) {
    await triggerRevalidation(affectedPaths)
  } else if (DRY_RUN) {
    console.log(`\nStep 4: ISR revalidation (dry-run — would ping ${SITE_URL}/api/revalidate)`)
    console.log(`  Paths that would be revalidated: ${affectedPaths.join(', ')}`)
    console.log('  After revalidation, the website reflects the DB within ~1 second')
  }

  // 5. SUMMARY
  const elapsed = Date.now() - startedAt
  const succeeded = results.filter(r => r.status === 'success').length
  const dryRuns   = results.filter(r => r.status === 'dry-run').length
  const errors    = results.filter(r => r.status === 'error').length

  console.log('\n═══════════════════════════════════════════════════════════════')
  console.log('  Sync Complete')
  console.log(`  Time: ${elapsed}ms`)
  if (DRY_RUN) {
    console.log(`  Dry-run: ${dryRuns} operations previewed (no DB changes)`)
    console.log('\n  To run live:')
    console.log('    npx ts-node scripts/deskmanager-sync.ts --live')
    console.log('    npx ts-node scripts/deskmanager-sync.ts --live --revalidate')
  } else {
    console.log(`  Succeeded: ${succeeded}`)
    console.log(`  Errors: ${errors}`)
  }
  console.log('═══════════════════════════════════════════════════════════════')

  // Write sync log
  const logEntry = {
    timestamp:   new Date().toISOString(),
    mode:        DRY_RUN ? 'dry-run' : 'live',
    totalIn:     units.length,
    valid:       valid.length,
    succeeded,
    errors,
    elapsedMs:   elapsed,
    results,
  }
  const logPath = '/tmp/deskmanager-sync-log.json'
  fs.writeFileSync(logPath, JSON.stringify(logEntry, null, 2))
  console.log(`\n  Log written to ${logPath}`)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
