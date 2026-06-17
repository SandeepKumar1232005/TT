import React from 'react';
import { LanguageProvider } from '../LanguageContext';
import '../index.css';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#050505',
};

export const metadata: Metadata = {
  title: 'VEDAN TRAVELS | Coimbatore Travels & Cab Service',
  description:
    'Travel from Coimbatore to destinations across Tamil Nadu, Kerala, Karnataka and India. Safe drivers, clean vehicles and comfortable travel. Book outstation cabs, airport pickup, temple tours and family trips.',
  keywords: [
    'Coimbatore travels',
    'Coimbatore cab service',
    'Coimbatore taxi service',
    'Coimbatore airport pickup',
    'Coimbatore to Ooty taxi',
    'Coimbatore to Bangalore taxi',
    'Coimbatore to Chennai cab',
    'Coimbatore to Munnar taxi',
    'Coimbatore to Madurai cab',
    'Coimbatore to Kodaikanal taxi',
    'Coimbatore to Mysore cab',
    'Coimbatore travel agency',
    'outstation taxi Coimbatore',
    'car rental Coimbatore',
    'Coimbatore cab booking',
    'Vedan Travels',
    'Tamil Nadu outstation cab',
    'airport taxi Coimbatore',
    'Coimbatore tour package',
    'family trip Coimbatore',
    'temple tour Coimbatore',
  ].join(', '),
  authors: [{ name: 'VEDAN TRAVELS' }],
  creator: 'VEDAN TRAVELS',
  publisher: 'VEDAN TRAVELS',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: 'ta_IN',
    // TODO: Replace with real domain
    url: 'https://vedantravels.in',
    siteName: 'VEDAN TRAVELS',
    title: 'VEDAN TRAVELS | Coimbatore Travels & Cab Service',
    description:
      'Travel from Coimbatore to destinations across Tamil Nadu, Kerala, Karnataka and India. Safe drivers, clean vehicles and comfortable travel.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VEDAN TRAVELS | Coimbatore Travels & Cab Service',
    description:
      'Book outstation cabs from Coimbatore. Airport pickup, temple tours, family trips across South India. Clean vehicles, safe drivers.',
    creator: '@vedantravels',
  },
  // TODO: Replace with real domain
  metadataBase: new URL('https://vedantravels.in'),
  alternates: {
    canonical: '/',
  },
  category: 'travel',
};

/**
 * JSON-LD structured data for LocalBusiness schema.
 * Helps Google understand the business for local search results.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Vedan Travels',
  description:
    'Premium outstation taxi and car rental service in Coimbatore, Tamil Nadu. Airport pickup, temple tours, family trips across South India.',
  url: 'https://vedantravels.in',
  telephone: '+919363499428',
  email: 'vedantravels.booking@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Avinashi Road',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    postalCode: '641018',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '11.0168',
    longitude: '76.9558',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  priceRange: '$$',
  areaServed: [
    { '@type': 'City', name: 'Coimbatore' },
    { '@type': 'State', name: 'Tamil Nadu' },
    { '@type': 'State', name: 'Kerala' },
    { '@type': 'State', name: 'Karnataka' },
  ],
  serviceType: [
    'Outstation Taxi',
    'Airport Pickup and Drop',
    'Car Rental',
    'Temple Tour',
    'Family Trip',
    'Corporate Travel',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
