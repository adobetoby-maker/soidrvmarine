// Built by ATLAS — 2026-07-08
import type { Metadata } from 'next'
import { OfferPlan } from '@/components/OfferPlan'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Website Offer & Plan — Southern Idaho RV & Marine',
  description: 'What we built for Southern Idaho RV & Marine, how it compares to Bretz RV, the inventory bridge, and the managed social system.',
  robots: 'noindex, nofollow',
  alternates: { canonical: `https://${DEALER_INFO.domain}/websiteofferplan` },
}

export default function WebsiteOfferPlanPage() {
  return <OfferPlan />
}
