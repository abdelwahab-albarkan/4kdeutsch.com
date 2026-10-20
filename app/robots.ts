import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

const BASE_URL = SITE_CONFIG.domain;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Keep offline page and API routes out of search index; DO NOT block /_next/ (needed for CSS/JS rendering)
        disallow: ['/offline', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: '4kdeutsch.com',
  };
}
