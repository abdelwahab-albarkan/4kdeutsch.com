/**
 * Which blog posts are public editorial content.
 * (Audit 2026-10: see LAUNCH_BLOCKERS_REPORT.md)
 *
 * - RESEARCH_DRAFT_SLUGS: internal keyword/content-roadmap documents ("50 Artikelideen", keyword tables). They are not
 *   articles for readers: noindex, not in the sitemap, not listed on /blog, the home page or "more reading".
 * - REDIRECTED_BLOG_SLUGS: thin (~200 word) duplicates of better pages; permanently redirected in next.config.mjs
 *   (keep both lists in sync). Not in the sitemap and not listed.
 */
export const RESEARCH_DRAFT_SLUGS: ReadonlySet<string> = new Set([
  'dazn-iptv-roadmap-2026',
  'sky-iptv-roadmap-2026',
  'ipad-iptv-roadmap-2026',
  'iphone-iptv-roadmap-2026',
  'macos-iptv-roadmap-2026',
  'windows-iptv-roadmap-2026',
  'iptv-vpn-deutschland-2026',
  'iptv-legal-deutschland-2026',
]);

export const REDIRECTED_BLOG_SLUGS: Readonly<Record<string, string>> = {
  'best-iptv-players-smart-tv': '/blog/beste-iptv-apps-2026',
  'how-to-install-iptv-on-firestick': '/blog/iptv-fire-tv-stick-2026',
  'watch-champions-league-iptv': '/champions-league-live-stream',
};

export function isPublicBlogSlug(slug: string): boolean {
  return !RESEARCH_DRAFT_SLUGS.has(slug) && !(slug in REDIRECTED_BLOG_SLUGS);
}

export function publicPosts<T extends { slug: string }>(posts: T[]): T[] {
  return posts.filter((p) => isPublicBlogSlug(p.slug));
}
