import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import MarkdownPreview from '@/components/blog/MarkdownPreview';
import ArticleFAQ from '@/components/blog/ArticleFAQ';
import ArticlePricingStrip from '@/components/blog/ArticlePricingStrip';
import AuthorCard from '@/components/blog/AuthorCard';
import AuthorAvatar from '@/components/blog/AuthorAvatar';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import MobileTOC from '@/components/blog/MobileTOC';
import { getBlogPosts, getPostBySlug } from '@/lib/mongodb';
import { isPublicBlogSlug, publicPosts } from '@/lib/blog-visibility';
import { withSocial } from '@/lib/seo';
import JsonLd from '@/components/common/JsonLd';
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data';

// Awaitable params type matching Next.js 15+ App Router patterns
type PageParams = Promise<{ slug: string }>;

// Pre-render all known slugs at build time; unknown slugs fall back to SSR
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Allow runtime rendering for any slug not in the static list
export const dynamicParams = true;

// ISR: revalidate every hour
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    return {
      title: 'Article Not Found | 4kdeutsch',
    };
  }

  const cover = post.coverImage.startsWith('http') ? post.coverImage : `https://4kdeutsch.com${post.coverImage}`;
  // seoTitle often already ends with the brand – avoid "| 4kdeutsch | 4kdeutsch Blog"
  const baseTitle = post.seoTitle.replace(/\s*\|\s*4kdeutsch(\s+Blog)?\s*$/i, '').trim();
  const title = `${baseTitle} | 4kdeutsch Blog`;

  return withSocial({
    title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    // internal research/keyword documents are not public articles
    ...(isPublicBlogSlug(post.slug) ? {} : { robots: { index: false, follow: false } }),
    openGraph: {
      type: 'article',
      title: baseTitle,
      description: post.description,
      publishedTime: post.publishedAt,
      authors: ['4kdeutsch'],
      images: [{ url: cover, width: 1600, height: 900, alt: post.title }],
    },
    twitter: { images: [cover] },
  });
}

export default async function BlogPostPage({ params }: { params: PageParams }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    notFound();
  }

  const postUrl = `https://4kdeutsch.com/blog/${post.slug}`;

  // Internal linking: three other editorial posts (roadmap/keyword-table drafts are not promoted)
  const allPosts = await getBlogPosts();
  const eligible = publicPosts(allPosts);
  const at = eligible.findIndex((p) => p.slug === post.slug);
  // rotate by position so every article receives internal links (not always the same three)
  const moreReading = [...eligible.slice(at + 1), ...eligible.slice(0, Math.max(at, 0))].filter((p) => p.slug !== post.slug).slice(0, 3);

  const structuredData: Record<string, unknown>[] = [
    articleSchema(post),
    breadcrumbSchema([
      { name: 'Startseite', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];
  if (post.faqs && post.faqs.length > 0) {
    structuredData.push(faqSchema(post.faqs));
  }

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-6">
      <JsonLd data={structuredData} />
      {/* Header and Hero Image */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-semibold uppercase tracking-wider">
          <span className="text-primary-500">{post.category}</span>
          <span>&bull;</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-8 leading-tight">
          {post.title}
        </h1>
        
        {/* Author header */}
        <div className="flex items-center gap-4 mb-8">
          <AuthorAvatar size={40} />
          <div>
            <div className="text-sm font-bold text-white">{post.authorName}</div>
            <div className="text-xs text-gray-500">Veröffentlicht am {post.publishedAt}</div>
          </div>
        </div>

        {/* Cover image banner */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border-subtle bg-black/20">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        <article className="lg:col-span-8">
          <MarkdownPreview content={post.content} />
          
          <ArticlePricingStrip />
          
          {post.faqs && <ArticleFAQ faqs={post.faqs} />}
          
          <div className="my-12">
            <AuthorCard
              name={post.authorName}
              role={post.authorRole}
              avatar={post.authorAvatar}
            />
          </div>
        </article>

        {/* Sticky Desktop TOC Sidebar */}
        <aside className="hidden lg:col-span-4 lg:flex lg:flex-col lg:gap-8 self-start lg:sticky lg:top-24">
          <TableOfContents content={post.content} />
          <ShareButtons title={post.title} url={postUrl} />
        </aside>
      </div>

      {/* Mobile Drawer TOC */}
      <MobileTOC content={post.content} />

      {/* Internal links: more articles + matching guide pages */}
      <section aria-labelledby="weiterlesen" className="max-w-4xl mx-auto mt-16 border-t border-border-subtle pt-10">
        <h2 id="weiterlesen" className="font-spartan text-2xl font-black text-white uppercase tracking-tight mb-5">
          Weiterlesen
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {moreReading.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="block h-full rounded-xl border border-border-subtle bg-surface-card/60 p-4 transition-colors hover:border-primary-500/40">
                <span className="block font-bold text-white">{p.title}</span>
                <span className="mt-1 block text-sm text-gray-400">{p.category}</span>
              </Link>
            </li>
          ))}
          {[
            { href: '/iptv-kaufen', t: 'IPTV kaufen', d: 'Abo und Laufzeiten im Überblick' },
            { href: '/iptv-apps', t: 'Beste IPTV Apps', d: 'Player und Geräte im Überblick' },
            { href: '/einrichtung', t: 'IPTV einrichten', d: 'Schritt-für-Schritt-Anleitungen' },
            { href: '/iptv-legal-deutschland', t: 'Ist IPTV legal?', d: 'Rechtslage und seriöse Anbieter' },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block h-full rounded-xl border border-border-subtle bg-surface-card/60 p-4 transition-colors hover:border-primary-500/40">
                <span className="block font-bold text-white">{l.t}</span>
                <span className="mt-1 block text-sm text-gray-400">{l.d}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
