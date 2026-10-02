import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/mongodb';
import { publicPosts } from '@/lib/blog-visibility';
import { SITE_CONFIG } from '@/lib/constants';
import { CITIES, CITY_PAGES_INDEXABLE } from '@/lib/cities';
import { SPORTS, SPORTS_NOINDEX } from '@/lib/sports';
import { COMBOS, APP_PAGES, DEVICES } from '@/lib/apps';
import { PROBLEMS, SETUP_TOPICS } from '@/lib/help';

const BASE_URL = SITE_CONFIG.domain;

// Stable modification dates for trustworthy search engine crawling
const LAUNCH = new Date('2026-08-15T00:00:00Z');
const SEO_UPDATE = new Date('2026-09-10T00:00:00Z');

// Routes modified in the on-page SEO optimization pass (2026-09-10)
const EDITED_STATIC_ROUTES = new Set<string>([
  '/',
  '/bestes-iptv',
  '/iptv-vergleich',
  '/iptv-android-tv',
  '/iptv-apple-tv',
  '/iptv-lg-tv',
  '/iptv-samsung-tv',
  '/iptv-sicherheit',
  '/features',
  '/about',
  '/affiliate',
  '/reseller',
]);

const EDITED_BLOG_SLUGS = new Set<string>([
  'bestes-iptv-deutschland-2026',
  'iptv-kaufen-leitfaden-2026',
  'iptv-legal-deutschland-2026',
  'watch-champions-league-iptv',
  'how-to-install-iptv-on-firestick',
  'iptv-smarters-pro-test-2026',
  'tivimate-test-2026',
  'iptv-vpn-deutschland-2026',
  'sky-iptv-roadmap-2026',
  'dazn-iptv-roadmap-2026',
  'iptvx-test-2026',
  'iptv-android-tv-2026',
  'iptv-lg-smart-tv-2026',
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Core Public, Indexable Static Marketing & Conversion Pages (33 URLs)
  const staticMarketingRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' },
    { path: '/iptv-kaufen', priority: 0.95, changeFrequency: 'weekly' },
    { path: '/bestes-iptv', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/features', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/devices', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/iptv-fire-stick', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/iptv-samsung-tv', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/iptv-lg-tv', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/iptv-android-tv', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/iptv-apple-tv', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/iptv-windows', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/iptv-android-handy', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/iptv-legal-deutschland', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/kostenloses-iptv', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/sky-dazn-iptv', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/iptv-sicherheit', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/iptv-vpn', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/iptv-sport', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/bundesliga-live-stream', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/champions-league-live-stream', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/iptv-apps', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tivimate-iptv', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/iptv-smarters-pro', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/was-ist-iptv', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/iptv-vergleich', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/iptv-erfahrungen', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/install', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
    { path: '/about', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/reseller', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/affiliate', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/restream', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/legal/acceptable-use', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/legal/dmca', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/agb', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/widerruf', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/refund', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const marketingEntries: MetadataRoute.Sitemap = staticMarketingRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: EDITED_STATIC_ROUTES.has(route.path) ? SEO_UPDATE : LAUNCH,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. Dynamic & Fallback Blog Articles (25 URLs)
  let blogPosts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    blogPosts = publicPosts(await getBlogPosts());
  } catch {
    blogPosts = [];
  }

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    let lastModifiedDate = LAUNCH;
    if (EDITED_BLOG_SLUGS.has(post.slug)) {
      lastModifiedDate = SEO_UPDATE;
    } else if (post.publishedAt) {
      lastModifiedDate = new Date(post.publishedAt);
    }

    // High-priority guide pages receive priority 0.85-0.90; standard posts receive 0.75
    let priority = 0.75;
    if (
      post.slug === 'bestes-iptv-deutschland-2026' ||
      post.slug === 'iptv-kaufen-leitfaden-2026' ||
      post.slug === 'iptv-anbieter-vergleich-2026' ||
      post.slug === 'beste-iptv-apps-2026'
    ) {
      priority = 0.9;
    } else if (
      post.slug === 'iptv-legal-deutschland-2026' ||
      post.slug === 'watch-champions-league-iptv' ||
      post.slug === 'how-to-install-iptv-on-firestick'
    ) {
      priority = 0.85;
    }

    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: lastModifiedDate,
      changeFrequency: 'weekly' as const,
      priority,
    };
  });

  // Programmatic city landing pages
  const cityEntries: MetadataRoute.Sitemap = [
    // City pages stay out of the sitemap while they are noindex (see lib/cities.ts)
    ...(CITY_PAGES_INDEXABLE
      ? [
          { url: `${BASE_URL}/iptv-in`, lastModified: SEO_UPDATE, changeFrequency: 'monthly' as const, priority: 0.7 },
          ...CITIES.map((c) => ({
            url: `${BASE_URL}/iptv-in/${c.slug}`,
            lastModified: SEO_UPDATE,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          })),
        ]
      : []),
    ...SPORTS.filter((s) => !SPORTS_NOINDEX.has(s.slug)).map((s) => ({
      url: `${BASE_URL}/live/${s.slug}`,
      lastModified: SEO_UPDATE,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...COMBOS.map((c) => ({
      url: `${BASE_URL}/iptv-app/${c.app}/${c.geraet}`,
      lastModified: SEO_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...APP_PAGES.map((a) => ({
      url: `${BASE_URL}/iptv-app/${a.slug}`,
      lastModified: SEO_UPDATE,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];

  // Help & setup guides (troubleshooting and configuration)
  const guidePaths: string[] = [
    '/iptv-hilfe',
    '/einrichtung',
    '/iptv-app',
    '/live',
    ...PROBLEMS.flatMap((p) => [`/iptv-hilfe/${p.slug}`, ...DEVICES.map((d) => `/iptv-hilfe/${p.slug}/${d.slug}`)]),
    ...SETUP_TOPICS.flatMap((t) => [
      `/einrichtung/${t.slug}`,
      ...(t.perDevice ? DEVICES.map((d) => `/einrichtung/${t.slug}/${d.slug}`) : []),
    ]),
  ];
  const guideEntries: MetadataRoute.Sitemap = guidePaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: SEO_UPDATE,
    changeFrequency: 'monthly' as const,
    priority: path === '/iptv-hilfe' || path === '/einrichtung' ? 0.7 : 0.6,
  }));

  // 3. De-duplicate and combine all genuine public indexable URLs
  const sitemapMap = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [...marketingEntries, ...blogEntries, ...cityEntries, ...guideEntries]) {
    sitemapMap.set(entry.url, entry);
  }

  return Array.from(sitemapMap.values());
}
