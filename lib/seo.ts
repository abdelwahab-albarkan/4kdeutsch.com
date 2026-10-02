import type { Metadata } from 'next';

/**
 * Social/OpenGraph normalisation for page metadata.
 *
 * Next.js replaces the layout's `openGraph`/`twitter` objects as soon as a page defines its own, which silently drops
 * og:image, og:type, locale and the Twitter image. `withSocial()` completes every page's metadata from its own
 * title/description/canonical so that all pages ship the same, consistent set:
 *   og:title, og:description, og:url (= canonical), og:type, og:image, og:locale, og:site_name,
 *   twitter:card (summary_large_image), twitter:title, twitter:description, twitter:image.
 *
 * Page-specific values (openGraph.title/description/images/type, twitter.*) are preserved when present.
 * Meta keywords are intentionally not emitted (ignored by search engines).
 */
const SITE = 'https://4kdeutsch.com';
/** Production path of app/opengraph-image.jpg (1200×630). */
export const OG_IMAGE = {
  url: `${SITE}/opengraph-image.jpg`,
  width: 1200,
  height: 630,
  alt: '4kdeutsch – Premium IPTV-Abonnement in Deutschland',
};

function absolute(c: unknown): string | undefined {
  if (!c) return undefined;
  const s = String(c);
  if (/^https?:\/\//.test(s)) return s.replace(/\/$/, '') || SITE;
  return `${SITE}${s === '/' ? '' : s}`;
}

export function withSocial(meta: Metadata): Metadata {
  const { keywords: _keywords, ...m } = meta;
  const og = (m.openGraph ?? {}) as Record<string, unknown>;
  const tw = (m.twitter ?? {}) as Record<string, unknown>;
  const title = typeof m.title === 'string' ? m.title : undefined;
  const description = typeof m.description === 'string' ? m.description : undefined;
  const url = absolute(m.alternates?.canonical) ?? (og.url as string | undefined);
  const ogTitle = (og.title as string | undefined) ?? title;
  const ogDescription = (og.description as string | undefined) ?? description;

  return {
    ...m,
    openGraph: {
      type: 'website',
      locale: 'de_DE',
      siteName: '4kdeutsch',
      ...og,
      title: ogTitle,
      description: ogDescription,
      url,
      images: (og.images as never) ?? [OG_IMAGE],
    } as Metadata['openGraph'],
    twitter: {
      card: 'summary_large_image',
      ...tw,
      title: (tw.title as string | undefined) ?? ogTitle,
      description: (tw.description as string | undefined) ?? ogDescription,
      images: (tw.images as never) ?? [OG_IMAGE.url],
    } as Metadata['twitter'],
  };
}
