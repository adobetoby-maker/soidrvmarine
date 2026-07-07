// Built by ATLAS — 2026-07-07
// Range-aware hero video route.
//
// Why this exists: Next's static /public serving behind the Cloudflare tunnel
// answered `Range:` requests with a full `200` and no `Accept-Ranges` header.
// WebKit (macOS/iOS Safari) refuses to START playing a <video> unless the
// server returns `206 Partial Content` to its opening range probe — so Safari
// users only ever saw the poster still ("nice river image, no video").
// Chrome tolerates a full 200 for small files, which masked the bug.
//
// This handler always advertises `Accept-Ranges: bytes` and honours range
// requests with a real 206 + Content-Range, so the hero plays on every browser.
import type { NextRequest } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

const FILE = join(process.cwd(), 'public', 'hero-loop.mp4')

// Read once at module load — file is ~352KB, cheap to hold in memory.
// Stored as Uint8Array (a valid Response BodyInit; Buffer is not, per TS DOM types).
let CACHE: Uint8Array | null = null
function load(): Uint8Array | null {
  if (CACHE) return CACHE
  try {
    CACHE = new Uint8Array(readFileSync(FILE))
    return CACHE
  } catch {
    return null
  }
}

// Copy a view into a fresh, standalone ArrayBuffer — the one body type the
// TS DOM lib accepts unambiguously (Uint8Array<ArrayBufferLike> is rejected).
function toArrayBuffer(u: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(u.byteLength)
  new Uint8Array(ab).set(u)
  return ab
}

const BASE = {
  'Content-Type': 'video/mp4',
  'Accept-Ranges': 'bytes',
  // no-transform stops any proxy from gzipping the stream (which strips ranges)
  'Cache-Control': 'public, max-age=86400, no-transform',
}

export async function GET(req: NextRequest) {
  const data = load()
  if (!data) return new Response('Not found', { status: 404 })
  const total = data.length
  const range = req.headers.get('range')

  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range)
    const start = m && m[1] ? parseInt(m[1], 10) : 0
    const end = m && m[2] ? parseInt(m[2], 10) : total - 1
    if (Number.isNaN(start) || Number.isNaN(end) || start >= total || start > end) {
      return new Response(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${total}`, 'Accept-Ranges': 'bytes' },
      })
    }
    const clampedEnd = Math.min(end, total - 1)
    const chunk = data.subarray(start, clampedEnd + 1)
    return new Response(toArrayBuffer(chunk), {
      status: 206,
      headers: {
        ...BASE,
        'Content-Range': `bytes ${start}-${clampedEnd}/${total}`,
        'Content-Length': String(chunk.length),
      },
    })
  }

  return new Response(toArrayBuffer(data), {
    status: 200,
    headers: { ...BASE, 'Content-Length': String(total) },
  })
}
