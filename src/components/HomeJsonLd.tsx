// Built by ATLAS — 2026-07-07
// LocalBusiness/AutoDealer structured data for the home page — built from DEALER_INFO, no invented facts.
import { DEALER_INFO } from '@/lib/types'

export function HomeJsonLd() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: DEALER_INFO.name,
    alternateName: DEALER_INFO.shortName,
    telephone: DEALER_INFO.phone,
    email: DEALER_INFO.email,
    url: `https://${DEALER_INFO.domain}`,
    image: `https://${DEALER_INFO.domain}/og-default.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: DEALER_INFO.address,
      addressLocality: DEALER_INFO.city,
      addressRegion: DEALER_INFO.state,
      postalCode: DEALER_INFO.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: DEALER_INFO.lat,
      longitude: DEALER_INFO.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: DEALER_INFO.reviewScore,
      reviewCount: DEALER_INFO.reviewCount,
    },
    sameAs: [
      DEALER_INFO.gbpUrl,
      DEALER_INFO.fbUrl,
      DEALER_INFO.instagramUrl,
      DEALER_INFO.youtubeUrl,
      DEALER_INFO.xUrl,
    ].filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
