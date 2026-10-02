import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import GuideArticle, { type GuideSection } from '@/components/sections/GuideArticle';
import { SETUP_TOPICS, getSetupTopic, type SetupTopic } from '@/lib/help';
import { APPS, DEVICES, MENU_NOTE, getDevice, type Device } from '@/lib/apps';
import { withSocial } from '@/lib/seo';

type Params = { thema: string; geraet: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return SETUP_TOPICS.filter((t) => t.perDevice).flatMap((t) => DEVICES.map((d) => ({ thema: t.slug, geraet: d.slug })));
}

function deviceSections(t: SetupTopic, d: Device): GuideSection[] {
  switch (t.slug) {
    case 'app-installieren':
      return [
        {
          title: `Installation auf ${d.name}`,
          steps: [
            `Öffnen Sie ${d.store}.`,
            'Suchen Sie nach dem Namen der IPTV-App und prüfen Sie den Entwickler.',
            'Installieren Sie die App und öffnen Sie sie zum ersten Mal.',
            `Bedienung: ${d.nav}`,
          ],
        },
        { title: 'Wenn die App nicht erscheint', bullets: [`Neu installieren: ${d.reinstall}.`, `Gerät neu starten: ${d.restart}.`] },
      ];
    case 'geraet-vorbereiten':
      return [{ title: `${d.name} vorbereiten`, steps: d.prep }];
    case 'wlan-und-netzwerk-optimieren':
      return [
        {
          title: `Netzwerk auf ${d.name} prüfen`,
          steps: [`Netzwerkeinstellungen öffnen: ${d.network}.`, 'Verbindung testen und Signalstärke prüfen.', `Gerät neu starten: ${d.restart}.`],
        },
        { title: 'Empfehlung', paragraphs: [d.tip] },
      ];
    case 'epg-einrichten':
      return [
        {
          title: `EPG auf ${d.name}`,
          steps: [
            'Öffnen Sie die Einstellungen der IPTV-App und aktivieren Sie den Programmführer.',
            'Starten Sie die EPG-Aktualisierung und warten Sie den Download ab.',
            d.category === 'smart-tv'
              ? 'Prüfen Sie Uhrzeit und Zeitzone im Fernseher-Menü, da falsche Werte alle Sendungszeiten verschieben.'
              : 'Stellen Sie sicher, dass Datum, Uhrzeit und Zeitzone (Europe/Berlin) automatisch gesetzt werden.',
            `Bedienung: ${d.nav}`,
          ],
        },
      ];
    default:
      return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { thema, geraet } = await params;
  const t = getSetupTopic(thema);
  const d = getDevice(geraet);
  if (!t || !d || !t.perDevice) return {};
  const title = `${t.title} auf ${d.name} – Anleitung | 4kdeutsch`;
  const description = `${t.title} auf ${d.name}: konkrete Schritte und Menüpfade für ${d.name}. Verständlich erklärt.`;
  return withSocial({
    title,
    description,
    alternates: { canonical: `/einrichtung/${t.slug}/${d.slug}` },
    openGraph: { title, description, url: `https://4kdeutsch.com/einrichtung/${t.slug}/${d.slug}` },
  });
}

export default async function SetupDevicePage({ params }: { params: Promise<Params> }) {
  const { thema, geraet } = await params;
  const t = getSetupTopic(thema);
  const d = getDevice(geraet);
  if (!t || !d || !t.perDevice) notFound();
  const path = `/einrichtung/${t.slug}/${d.slug}`;
  const apps = APPS.filter((a) => a.devices.includes(d.slug)).slice(0, 3);
  const related = t.related.map((s) => getSetupTopic(s)).filter((x): x is NonNullable<typeof x> => !!x && x.perDevice);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Einrichtung', path: '/einrichtung' },
          { name: t.title, path: `/einrichtung/${t.slug}` },
          { name: d.name, path },
        ]}
      />
      <GuideArticle
        tagline={`${d.name} · Einrichtung`}
        h1={
          <>
            {t.title} <span className="text-gradient">auf {d.name}</span>
          </>
        }
        intro={[t.intro, `Diese Seite zeigt die konkreten Schritte für ${d.name}. ${MENU_NOTE}`]}
        sections={[...deviceSections(t, d), { title: 'Allgemeine Hinweise', bullets: t.tips }]}
        related={[
          { href: `/einrichtung/${t.slug}`, title: t.title, desc: 'Allgemeine Anleitung' },
          ...related.slice(0, 2).map((r) => ({ href: `/einrichtung/${r.slug}/${d.slug}`, title: `${r.title} auf ${d.name}`, desc: r.desc })),
          ...SETUP_TOPICS.filter((x) => x.perDevice && x.slug !== t.slug && !related.slice(0, 2).some((r) => r.slug === x.slug)).map((x) => ({ href: `/einrichtung/${x.slug}/${d.slug}`, title: `${x.title} auf ${d.name}` })),
          ...apps.map((a) => ({ href: `/iptv-app/${a.slug}/${d.slug}`, title: `${a.name} auf ${d.name}`, desc: 'App einrichten' })),
          { href: `/iptv-hilfe/app-laedt-nicht/${d.slug}`, title: `Probleme auf ${d.name}`, desc: 'Fehlerbehebung' },
        ]}
      />
    </>
  );
}
