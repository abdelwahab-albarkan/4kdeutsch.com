import React from 'react';
import PageFigure from '@/components/ui/PageFigure';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data';
import DeviceGuide from '@/components/sections/DeviceGuide';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import { SPORTS, SPORTS_NOINDEX, getSport, isLinkableSport, sportHref } from '@/lib/sports';
import { withSocial } from '@/lib/seo';

type Params = { wettbewerb: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return SPORTS.map((s) => ({ wettbewerb: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const ev = getSport((await params).wettbewerb);
  if (!ev) return {};
  const title = `${ev.name} Live Stream mit IPTV 2026 | 4kdeutsch`;
  const description = `${ev.name} live per IPTV verfolgen: ${ev.sport} in HD & 4K auf Smart TV, Fire Stick & Handy. Ohne Vertrag, sofort startklar.`;
  return withSocial({
    title,
    description,
    alternates: { canonical: `/live/${ev.slug}` },
    robots: SPORTS_NOINDEX.has(ev.slug) ? { index: false, follow: true } : undefined,
    keywords: [`${ev.name} live stream`, `${ev.name} IPTV`, `${ev.name} streamen`],
    openGraph: { title, description, url: `https://4kdeutsch.com/live/${ev.slug}` },
  });
}

export default async function SportPage({ params }: { params: Promise<Params> }) {
  const ev = getSport((await params).wettbewerb);
  if (!ev) notFound();

  const related = SPORTS.filter((s) => s.slug !== ev.slug && isLinkableSport(s.slug));
  const faq = [
    {
      question: `Kann ich die ${ev.name} mit IPTV live schauen?`,
      answer: `Sport ist ein Schwerpunkt unseres Angebots. Welche Übertragungen und Kanäle für ${ev.name} aktuell enthalten sind, klären Sie am besten vor der Bestellung mit unserem Support.`,
    },
    {
      question: 'Welche Internetgeschwindigkeit brauche ich für Live-Sport?',
      answer: 'Für stabile HD-Übertragungen empfehlen wir mindestens 15 Mbit/s, für 4K mindestens 25 Mbit/s – am besten per Kabel oder gutem WLAN.',
    },
    {
      question: 'Auf welchen Geräten funktioniert das?',
      answer: 'Auf Smart TVs (Samsung, LG), Fire Stick, Android TV, Apple TV sowie Smartphone und Tablet.',
    },
  ];
  const path = `/live/${ev.slug}`;

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faq),
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'IPTV Sport', path: '/iptv-sport' },
            { name: ev.name, path },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Sport', path: '/iptv-sport' },
          { name: ev.name, path },
        ]}
      />

      <DeviceGuide
        tagline={`${ev.sport} · Live`}
        h1={
          <>
            <span className="text-gradient">{ev.name}</span> live streamen
          </>
        }
        intro={
          <>
            <p>
              {ev.blurb} Mit <strong className="text-gray-200">4kdeutsch</strong> verfolgen Sie {ev.name} bequem auf
              Smart TV, Fire Stick, Android TV, Apple TV und Smartphone.
            </p>
            <p>Ohne Vertrag, monatlich kündbar und mit deutschsprachigem Support.</p>
          </>
        }
        steps={[
          'Wählen Sie Ihr Abo auf der Preisseite und schließen Sie die Bestellung ab.',
          'Ihre Zugangsdaten erhalten Sie automatisch per E-Mail.',
          'Installieren Sie eine IPTV-App wie IPTV Smarters Pro oder TiviMate.',
          'Zugangsdaten eintragen und die Sport-Kanäle in der Senderliste öffnen.',
          `Fertig: ${ev.name} live in bester Qualität genießen.`,
        ]}
        apps={[
          { name: 'IPTV Smarters Pro', note: 'Xtream-Codes-Login mit EPG – ideal, um Anstoßzeiten im Blick zu behalten.' },
          { name: 'TiviMate', note: 'Komfortabler Player für Android TV und Fire Stick mit Programmführer.' },
          { name: 'IBO Player', note: 'Schnelle Oberfläche für viele Smart TVs.' },
        ]}
        benefits={[...ev.facts, 'EPG-Programmführer', 'Ohne Vertrag – monatlich kündbar']}
        related={[
          ...related.map((s) => ({
            href: sportHref(s.slug),
            title: `${s.name} live`,
            desc: `${s.sport}: ${s.name} per IPTV verfolgen.`,
          })),
          { href: '/live', title: 'Alle Wettbewerbe', desc: 'Übersicht der Sport-Wettbewerbe.' },
          { href: '/iptv-sport', title: 'IPTV Sport', desc: 'Alle Sport-Angebote im Überblick.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag.' },
        ]}
      />

      <PageFigure id={ev.slug === 'bundesliga' || ev.slug === '2-bundesliga' ? 'iptv-bundesliga' : 'iptv-fussball'} />
      <PricingSection />
      <CTASection />
    </>
  );
}
