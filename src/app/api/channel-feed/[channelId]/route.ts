// Built by ATLAS — 2026-09-23
// Generates the REAL file/payload a channel would receive, from current live
// inventory, on demand -- not a stored stale snapshot. Read-only: never
// writes anywhere, never transmits anywhere. Answers "what would we
// actually send" so the transformation logic is inspectable before a single
// external credential exists.
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { checkEligibility } from '@/lib/channel-rules'
import { buildArtifact } from '@/lib/channel-artifacts'
import type { ChannelId, Unit } from '@/lib/types'

const VALID_CHANNELS: ChannelId[] = ['rv_trader', 'boats_group', 'rv_universe', 'meta', 'google_vl', 'craigslist']

export async function GET(req: NextRequest, ctx: { params: Promise<{ channelId: string }> }) {
  const { channelId } = await ctx.params
  if (!VALID_CHANNELS.includes(channelId as ChannelId)) {
    return NextResponse.json({ error: `Unknown or non-file channel: ${channelId}` }, { status: 404 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('units')
    .select('*, media(url, sort_order, is_primary)')
    .eq('status', 'active')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const eligible = ((data ?? []) as (Unit & { slug: string })[]).filter(
    u => checkEligibility(channelId as ChannelId, u).eligible
  )

  const artifact = buildArtifact(channelId as ChannelId, eligible)
  if (!artifact) {
    return NextResponse.json({ error: 'No artifact generator for this channel' }, { status: 404 })
  }

  if (req.nextUrl.searchParams.get('info') === '1') {
    return NextResponse.json({
      channelId: artifact.channelId,
      honesty: artifact.honesty,
      sourceNote: artifact.sourceNote,
      filename: artifact.filename,
      contentType: artifact.contentType,
      unitCount: artifact.unitCount,
    })
  }

  const download = req.nextUrl.searchParams.get('download') === '1'

  return new NextResponse(artifact.content, {
    headers: {
      'Content-Type': artifact.contentType,
      'X-Artifact-Honesty': artifact.honesty,
      'X-Artifact-Unit-Count': String(artifact.unitCount),
      ...(download ? { 'Content-Disposition': `attachment; filename="${artifact.filename}"` } : {}),
    },
  })
}
