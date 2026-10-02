import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import GuideArticle from '@/components/sections/GuideArticle';
import { PROBLEMS, getProblem } from '@/lib/help';
import { DEVICES } from '@/lib/apps';
import { withSocial } from '@/lib/seo';

type Params = { problem: string };

export const dynamicParams = false;

const IMAGE_BY_PROBLEM: Record<string, string> = {
  'bild-bleibt-schwarz': 'iptv-kein-bild',
  'ruckeln-und-puffern': 'iptv-verbindung',
  'senderliste-laedt-nicht': 'iptv-sender',
  'epg-wird-nicht-angezeigt': 'iptv-epg',
};

export function generateStaticParams() {
  return PROBLEMS.map((p) => ({ problem: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProblem((await params).problem);
  if (!p) return {};
  const title = `${p.title}? Ursachen & Lösungen | 4kdeutsch`;
  const description = `${p.title}: Mögliche Ursachen und Schritt-für-Schritt-Lösungen. Mit geräte-spezifischen Anleitungen für Fire TV, Smart TV, Apple TV und Handy.`;
  return withSocial({
    title,
    description,
    alternates: { canonical: `/iptv-hilfe/${p.slug}` },
    openGraph: { title, description, url: `https://4kdeutsch.com/iptv-hilfe/${p.slug}` },
  });
}

export default async function ProblemPage({ params }: { params: Promise<Params> }) {
  const p = getProblem((await params).problem);
  if (!p) notFound();
  const path = `/iptv-hilfe/${p.slug}`;
  const related = p.related.map((s) => getProblem(s)).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Hilfe', path: '/iptv-hilfe' },
          { name: p.title, path },
        ]}
      />
      <GuideArticle
        imageId={IMAGE_BY_PROBLEM[p.slug] ?? 'iptv-probleme'}
        tagline="Fehlerbehebung"
        h1={<>{p.title}</>}
        intro={[p.symptom, 'Die folgenden Schritte gehen von den häufigsten zu den selteneren Ursachen. Für gerätespezifische Menüpfade wählen Sie unten Ihr Gerät.']}
        sections={[
          { title: 'Mögliche Ursachen', bullets: p.causes },
          { title: 'Das können Sie prüfen', steps: p.checks },
          {
            title: 'Anleitung für Ihr Gerät',
            paragraphs: ['Die Schritte unterscheiden sich je nach Gerät. Wählen Sie Ihre Plattform:'],
            bullets: DEVICES.map((d) => `${d.name}: siehe Anleitung „${p.title} auf ${d.name}“ unten`),
          },
          {
            title: 'Wann Sie den Support kontaktieren sollten',
            paragraphs: [
              'Wenn das Problem nach diesen Schritten bestehen bleibt, kontaktieren Sie unseren Support und nennen Sie Gerät, App und die genaue Fehlermeldung. So lässt sich die Ursache schneller eingrenzen.',
            ],
          },
        ]}
        related={[
          ...DEVICES.map((d) => ({ href: `${path}/${d.slug}`, title: `${p.title} auf ${d.name}`, desc: 'Gerätespezifische Schritte' })),
          ...related.map((r) => ({ href: `/iptv-hilfe/${r.slug}`, title: r.title, desc: 'Verwandtes Problem' })),
          { href: '/einrichtung', title: 'Einrichtungs-Anleitungen', desc: 'Setup Schritt für Schritt' },
          { href: '/contact', title: 'Support kontaktieren', desc: 'Wir helfen weiter' },
        ]}
      />
    </>
  );
}
