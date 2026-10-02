import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import GuideArticle from '@/components/sections/GuideArticle';
import { SETUP_TOPICS, getSetupTopic } from '@/lib/help';
import { DEVICES } from '@/lib/apps';
import { withSocial } from '@/lib/seo';

type Params = { thema: string };

export const dynamicParams = false;

const IMAGE_BY_TOPIC: Record<string, string> = {
  'm3u-einrichten': 'iptv-m3u',
  'epg-einrichten': 'iptv-epg',
  'app-installieren': 'iptv-installieren',
  'wlan-und-netzwerk-optimieren': 'iptv-heimnetzwerk',
};

export function generateStaticParams() {
  return SETUP_TOPICS.map((t) => ({ thema: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const t = getSetupTopic((await params).thema);
  if (!t) return {};
  const title = `${t.title} – Schritt-für-Schritt-Anleitung | 4kdeutsch`;
  const description = `${t.title}: ${t.desc}. Verständliche Anleitung mit Tipps für Fire TV, Smart TV, Apple TV und Handy.`;
  return withSocial({
    title,
    description,
    alternates: { canonical: `/einrichtung/${t.slug}` },
    openGraph: { title, description, url: `https://4kdeutsch.com/einrichtung/${t.slug}` },
  });
}

export default async function SetupTopicPage({ params }: { params: Promise<Params> }) {
  const t = getSetupTopic((await params).thema);
  if (!t) notFound();
  const path = `/einrichtung/${t.slug}`;
  const related = t.related.map((s) => getSetupTopic(s)).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Einrichtung', path: '/einrichtung' },
          { name: t.title, path },
        ]}
      />
      <GuideArticle
        imageId={IMAGE_BY_TOPIC[t.slug] ?? 'iptv-einrichten'}
        tagline="Einrichtung"
        h1={<>{t.title}</>}
        intro={[t.intro]}
        sections={[
          { title: 'Anleitung', steps: t.steps },
          { title: 'Tipps', bullets: t.tips },
          ...(t.extra ?? []),
          ...(t.perDevice
            ? [{ title: 'Anleitung für Ihr Gerät', paragraphs: ['Die genauen Menüpfade unterscheiden sich je nach Gerät. Wählen Sie unten Ihre Plattform.'] }]
            : []),
        ]}
        related={[
          ...(t.perDevice ? DEVICES.map((d) => ({ href: `${path}/${d.slug}`, title: `${t.title} auf ${d.name}`, desc: 'Gerätespezifische Anleitung' })) : []),
          ...related.map((r) => ({ href: `/einrichtung/${r.slug}`, title: r.title, desc: r.desc })),
          { href: '/iptv-hilfe', title: 'IPTV Probleme lösen', desc: 'Hilfe bei Fehlern' },
          { href: '/iptv-apps', title: 'IPTV Apps', desc: 'Kompatible Apps im Überblick' },
        ]}
      />
    </>
  );
}
