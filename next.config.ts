import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/rv-dealer-twin-falls-id', destination: '/rvs', permanent: false },
      { source: '/boat-dealer-twin-falls-id', destination: '/boats', permanent: false },
      { source: '/mercury-dealer-magic-valley', destination: '/motors/mercury-outboards', permanent: false },
      { source: '/rv-dealer-burley-id', destination: '/rvs', permanent: false },
      { source: '/rv-dealer-boise-id', destination: '/rvs', permanent: false },
      { source: '/service', destination: '/contact', permanent: false },
      { source: '/parts', destination: '/contact', permanent: false },
    ]
  },
}

export default nextConfig;
