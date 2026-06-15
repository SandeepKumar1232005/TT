import React from 'react';
import { LanguageProvider } from '../LanguageContext';
import '../index.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata = {
  title: 'VEDAN TRAVELS | Coimbatore Premium Luxury Outstation Travels',
  description: 'Premium outstation taxi and tourist car rentals starting from Coimbatore. Book luxury cabs with experienced mountain & highway drivers.',
  keywords: 'Coimbatore travels, outstation taxi, luxury cabs, Coimbatore airport taxi, mountain driver, car rental Coimbatore',
  authors: [{ name: 'VEDAN TRAVELS' }],
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
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
