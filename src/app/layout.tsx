// Built by ATLAS — 2026-07-04
import type { Metadata } from 'next'
import './globals.css'
import { DEALER_INFO } from '@/lib/types'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${DEALER_INFO.domain}`),
  title: {
    default: `${DEALER_INFO.name} | Jerome & Twin Falls, ID`,
    template: `%s | ${DEALER_INFO.shortName} — Jerome, ID`,
  },
  description: `${DEALER_INFO.shortName} in Jerome, Idaho — Southern Idaho's only factory-direct Mercury dealer. Shop RVs, boats, and Mercury outboard motors. 4.6★ from 1,200+ reviews. Serving Twin Falls, Burley, Boise.`,
  keywords: ['RV dealer Twin Falls Idaho', 'boat dealer Twin Falls', 'Mercury outboard dealer Idaho', 'RV for sale Jerome Idaho', 'travel trailer Idaho', 'pontoon boat Idaho'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${DEALER_INFO.domain}`,
    siteName: DEALER_INFO.name,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: DEALER_INFO.name }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: `https://${DEALER_INFO.domain}` },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Preconnect for Supabase Storage CDN — only when env var is set */}
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}
        {/* LocalBusiness + AutoDealer schema — injected server-side on home page */}
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  )
}
