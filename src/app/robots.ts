import type { MetadataRoute } from 'next';

/**
 * Robots.txt generation for SEO.
 * Next.js automatically serves this at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  // TODO: Replace with real domain before deployment
  const baseUrl = 'https://vedantravels.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
