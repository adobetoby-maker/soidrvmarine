// ISR revalidation endpoint — called by scripts/deskmanager-sync.ts after upsert
// POST /api/revalidate — triggers Next.js on-demand revalidation for inventory paths
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    revalidatePath('/rvs')
    revalidatePath('/boats')
    revalidatePath('/inventory/[slug]', 'page')
    revalidatePath('/')
    return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
