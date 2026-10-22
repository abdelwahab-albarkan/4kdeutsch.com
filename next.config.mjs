/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// Content Security Policy — pragmatic, hardening-focused, and compatible with
// Next.js inline bootstrap scripts + Tailwind/Framer inline styles + next/image.
// `unsafe-eval` and websockets are dev-only (Turbopack HMR); production is stricter.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://image.tmdb.org https://images.unsplash.com",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  "media-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  images: {
    // Serve modern formats first; Next negotiates by Accept header.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return [
      // Canonical host normalization: redirect www.4kdeutsch.com -> 4kdeutsch.com
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.4kdeutsch.com' }],
        destination: 'https://4kdeutsch.com/:path*',
        permanent: true,
      },
      // Rebrand 301 redirects: legacy domain germanystreamtv.com -> 4kdeutsch.com
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'germanystreamtv.com' }],
        destination: 'https://4kdeutsch.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.germanystreamtv.com' }],
        destination: 'https://4kdeutsch.com/:path*',
        permanent: true,
      },
      // Legacy English and short URL redirects
      { source: '/best-iptv', destination: '/bestes-iptv', permanent: true },
      { source: '/iptv', destination: '/iptv-kaufen', permanent: true },
      { source: '/iptv-deutschland', destination: '/iptv-kaufen', permanent: true },
      { source: '/plans', destination: '/pricing', permanent: true },
      { source: '/subscription', destination: '/pricing', permanent: true },
      { source: '/subscriptions', destination: '/pricing', permanent: true },
      // Old /legal/* paths → new German-slug legal routes (permanent).
      { source: '/legal/impressum', destination: '/impressum', permanent: true },
      { source: '/legal/privacy', destination: '/datenschutz', permanent: true },
      { source: '/legal/terms', destination: '/agb', permanent: true },
      { source: '/legal/refunds', destination: '/refund', permanent: true },
      { source: '/legal/cookies', destination: '/cookies', permanent: true },
      // Misspelled blog slug discovered in GSC ("xstream") → correct article ("xtream").
      { source: '/blog/m3u-vs-xstream-codes', destination: '/blog/m3u-vs-xtream-codes', permanent: true },
      // Thin (~200 word) blog duplicates → the equivalent, fuller page (keep in sync with lib/blog-visibility.ts).
      { source: '/blog/best-iptv-players-smart-tv', destination: '/blog/beste-iptv-apps-2026', permanent: true },
      { source: '/blog/how-to-install-iptv-on-firestick', destination: '/blog/iptv-fire-tv-stick-2026', permanent: true },
      { source: '/blog/watch-champions-league-iptv', destination: '/champions-league-live-stream', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Apply security headers to every route.
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Cache local images aggressively (filenames are stable).
        source: '/:all*(png|jpg|jpeg|webp|avif|svg|ico|gif)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
