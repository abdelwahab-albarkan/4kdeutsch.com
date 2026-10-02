import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import GuideArticle, { type GuideSection } from '@/components/sections/GuideArticle';
import { PROBLEMS, getProblem } from '@/lib/help';
import { APPS, DEVICES, MENU_NOTE, getDevice } from '@/lib/apps';
import { withSocial } from '@/lib/seo';

type Params = { problem: string; geraet: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROBLEMS.flatMap((p) => DEVICES.map((d) => ({ problem: p.slug, geraet: d.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { problem, geraet } = await params;
  const p = getProblem(problem);
  const d = getDevice(geraet);
  if (!p || !d) return {};
  const title = `${p.title} auf ${d.name}: Lösung Schritt für Schritt | 4kdeutsch`;
  const description = `${p.title} auf ${d.name}? Ursachen prüfen und mit den passenden Menüpfaden für ${d.name} beheben – Neustart, Netzwerk, Cache und Neuinstallation.`;
  return withSocial({
    title,
    description,
    alternates: { canonical: `/iptv-hilfe/${p.slug}/${d.slug}` },
    openGraph: { title, description, url: `https://4kdeutsch.com/iptv-hilfe/${p.slug}/${d.slug}` },
  });
}

export default async function ProblemDevicePage({ params }: { params: Promise<Params> }) {
  const { problem, geraet } = await params;
  const p = getProblem(problem);
  const d = getDevice(geraet);
  if (!p || !d) notFound();
  const path = `/iptv-hilfe/${p.slug}/${d.slug}`;

  const actionSteps: string[] = [];
  if (p.actions.includes('restart')) actionSteps.push(`Gerät neu starten: ${d.restart}.`);
  if (p.actions.includes('network')) actionSteps.push(`Netzwerk prüfen: ${d.network}.`);
  if (p.actions.includes('cache')) actionSteps.push(`Cache bzw. App-Daten zurücksetzen: ${d.cache}.`);
  if (p.actions.includes('reinstall')) actionSteps.push(`App neu installieren: ${d.reinstall}.`);

  const sections: GuideSection[] = [
    { title: 'Mögliche Ursachen', bullets: p.causes },
    { title: 'Allgemeine Prüfschritte', steps: p.checks },
    {
      title: `Schritte speziell für ${d.name}`,
      paragraphs: [MENU_NOTE],
      steps: [...actionSteps, ...p.extra[d.category]],
    },
    {
      title: `Bedienung auf ${d.name}`,
      paragraphs: [d.nav, d.tip],
    },
    {
      title: 'Wann Sie den Support kontaktieren sollten',
      paragraphs: [
        `Bleibt „${p.title}“ auf ${d.name} bestehen, kontaktieren Sie unseren Support. Nennen Sie das Gerät, die genutzte App und die genaue Fehlermeldung.`,
      ],
    },
  ];

  const appLinks = APPS.filter((a) => a.devices.includes(d.slug)).slice(0, 2).map((a) => ({
    href: `/iptv-app/${a.slug}/${d.slug}`,
    title: `${a.name} auf ${d.name}`,
    desc: 'Einrichtung der App',
  }));
  const siblings = p.related.map((s) => getProblem(s)).filter((x): x is NonNullable<typeof x> => !!x).slice(0, 2);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Hilfe', path: '/iptv-hilfe' },
          { name: p.title, path: `/iptv-hilfe/${p.slug}` },
          { name: d.name, path },
        ]}
      />
      <GuideArticle
        tagline={`${d.name} · Fehlerbehebung`}
        h1={
          <>
            {p.title} <span className="text-gradient">auf {d.name}</span>
          </>
        }
        intro={[p.symptom, `Diese Anleitung fasst die Lösungsschritte für ${d.name} zusammen – vom Neustart bis zur Neuinstallation.`]}
        sections={sections}
        related={[
          { href: `/iptv-hilfe/${p.slug}`, title: p.title, desc: 'Allgemeine Anleitung für alle Geräte' },
          ...siblings.map((s) => ({ href: `/iptv-hilfe/${s.slug}/${d.slug}`, title: `${s.title} auf ${d.name}`, desc: 'Verwandtes Problem' })),
          ...PROBLEMS.filter((x) => x.slug !== p.slug && !siblings.some((s) => s.slug === x.slug)).map((x) => ({ href: `/iptv-hilfe/${x.slug}/${d.slug}`, title: `${x.title} auf ${d.name}` })),
          ...appLinks,
          { href: `/einrichtung/geraet-vorbereiten/${d.slug}`, title: `${d.name} vorbereiten`, desc: 'Vorbereitung vor der Einrichtung' },
          { href: d.page, title: `IPTV auf ${d.name}`, desc: 'Überblick zum Gerät' },
        ]}
      />
    </>
  );
}
