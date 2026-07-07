// Built by ATLAS — 2026-07-07
// Generalized lead-capture route — Resend-backed, shared by every site form.
// Accepts a `formType` field so one route serves contact/parts/service/financing/careers/trade-in/general.
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { DEALER_INFO } from '@/lib/types'

type FormType = 'contact' | 'parts' | 'service' | 'financing' | 'careers' | 'trade-in' | 'general'

const SUBJECT_LABELS: Record<FormType, string> = {
  contact: 'Website Contact Form',
  parts: 'Parts Request',
  service: 'Service Request',
  financing: 'Financing Inquiry',
  careers: 'Careers Application',
  'trade-in': 'Trade-In Valuation Request',
  general: 'General Inquiry',
}

function labelize(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

export async function POST(request: Request) {
  const body = await request.json()
  const { formType, firstName, lastName, name, phone, email, ...rest } = body

  const type: FormType = (SUBJECT_LABELS as Record<string, string>)[formType]
    ? (formType as FormType)
    : 'general'

  const displayName = name || [firstName, lastName].filter(Boolean).join(' ') || '(no name provided)'

  if (!email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  // Every remaining field (unit info, description, employment status, etc.) is
  // rendered generically so each form type doesn't need its own template.
  const detailLines = Object.entries(rest)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${labelize(k)}: ${v}`)

  try {
    await resend.emails.send({
      from: 'Demo SIRVMarine <onboarding@resend.dev>',
      to: DEALER_INFO.email,
      replyTo: email,
      subject: `${SUBJECT_LABELS[type]}: ${displayName}`,
      text: [
        `New ${SUBJECT_LABELS[type].toLowerCase()} from the website.`,
        ``,
        `Name: ${displayName}`,
        `Email: ${email}`,
        `Phone: ${phone || '(not provided)'}`,
        ``,
        ...detailLines,
      ].join('\n'),
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
