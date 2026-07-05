// Built by ATLAS — 2026-07-05
// Contact form submission handler — sends via Resend to the dealer's inbox
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { DEALER_INFO } from '@/lib/types'

export async function POST(request: Request) {
  const body = await request.json()
  const { firstName, lastName, phone, email, subject, message } = body

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Demo SIRVMarine <onboarding@resend.dev>',
      to: DEALER_INFO.email,
      replyTo: email,
      subject: `Website Inquiry: ${subject || 'General question'} — ${firstName} ${lastName}`,
      text: [
        `New inquiry from the website contact form.`,
        ``,
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Phone: ${phone || '(not provided)'}`,
        `Interested in: ${subject || '(not specified)'}`,
        ``,
        `Message:`,
        message || '(no message)',
      ].join('\n'),
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
