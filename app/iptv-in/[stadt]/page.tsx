import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, faqSchema } from '@/lib/structured-data';
import DeviceGuide from '@/components/sections/DeviceGuide';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { CITIES, CITY_PAGES_INDEXABLE, getCity } from '@/lib/cities';
import { withSocial } from '@/lib/seo';

type Params = { stadt: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((c) => ({ stadt: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const city = getCity((await params).stadt);
  if (!city) return {};
  const title = `IPTV in ${city.name} kaufen 2026 – Premium IPTV-Abo | 4kdeutsch`;
  const description = `IPTV in ${city.name}: Live-TV, Sport & VOD in 4K auf Smart TV, Fire Stick & Handy. Ohne Vertrag, sofortige Freischaltung, deutscher Support.`;
  return withSocial({
    title,
    description,
    alternates: { canonical: `/iptv-in/${city.slug}` },
    robots: CITY_PAGES_INDEXABLE ? undefined : { index: false, follow: true },
    keywords: [`IPTV ${city.name}`, `IPTV kaufen ${city.name}`, `IPTV Abo ${city.name}`, `IPTV ${city.state}`],
    openGraph: { title, description, url: `https://4kdeutsch.com/iptv-in/${city.slug}` },
  });
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const city = getCity((await params).stadt);
  if (!city) notFound();

  const nearby = city.nearby.map((s) => getCity(s)).filter((c): c is NonNullable<typeof c> => !!c);
  const faq = [
    {
      question: `Funktioniert IPTV in ${city.name} auf jedem Internetanschluss?`,
      answer: `Ja. Ob DSL, Kabel oder Glasfaser – IPTV läuft in ${city.name} über jede stabile Internetverbindung. Für HD empfehlen wir mindestens 15 Mbit/s, für 4K mindestens 25 Mbit/s.`,
    },
    {
      question: `Kann ich ${city.broadcaster}-Programme und regionale Sender aus ${city.state} sehen?`,
      answer: `Unser Angebot enthält deutsche Sender inklusive der öffentlich-rechtlichen Programme. Die regionale Verfügbarkeit einzelner Sender können Sie vorab beim Support erfragen.`,
    },
    {
      question: `Kann ich Spiele von ${city.clubs.join(' und ')} live verfolgen?`,
      answer: `Sport ist ein Schwerpunkt unseres Angebots – inklusive Live-Übertragungen und Sportkanälen. Welche Wettbewerbe genau enthalten sind, sehen Sie auf unserer Sport-Seite.`,
    },
    {
      question: 'Wie schnell bin ich freigeschaltet?',
      answer: 'Nach der Bestellung erhalten Sie Ihre Zugangsdaten automatisch per E-Mail und können sofort starten.',
    },
  ];

  const path = `/iptv-in/${city.slug}`;

  return (
    <>
      <JsonLd data={[productSchema(), faqSchema(faq)]} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV nach Stadt', path: '/iptv-in' },
          { name: `IPTV ${city.name}`, path },
        ]}
      />

      <DeviceGuide
        tagline={`${city.name} · ${city.state}`}
        h1={
          <>
            IPTV in <span className="text-gradient">{city.name}</span> kaufen
          </>
        }
        intro={
          <>
            <p>
              {city.blurb} Mit <strong className="text-gray-200">4kdeutsch</strong> streamen Sie in {city.name} Live-TV,
              Sport und Filme in hoher Qualität – auf Smart TV, Fire Stick, Android TV, Apple TV und Smartphone.
            </p>
            <p>
              Fans von {city.clubs.join(' und ')} finden Live-Sport, dazu deutsche Sender wie {city.broadcaster} und tausende weitere
              Kanäle. Ohne Vertrag, monatlich kündbar, mit deutschsprachigem Support.
            </p>
          </>
        }
        steps={[
          'Wählen Sie auf der Preisseite Ihr Abo und schließen Sie die Bestellung ab.',
          'Sie erhalten Ihre Zugangsdaten (M3U-Link oder Xtream Codes) automatisch per E-Mail.',
          'Installieren Sie eine IPTV-App wie IPTV Smarters Pro, TiviMate oder IBO Player auf Ihrem Gerät.',
          'Tragen Sie Ihre Zugangsdaten ein – die Senderliste wird automatisch geladen.',
          `Fertig: Genießen Sie Live-TV und Sport in ${city.name} in bester Qualität.`,
        ]}
        apps={[
          { name: 'IPTV Smarters Pro', note: 'Xtream-Codes-Login mit EPG und VOD – für Smart TV, Android und iOS.' },
          { name: 'TiviMate', note: 'Beliebter Player für Android TV und Fire Stick mit komfortabler Oberfläche.' },
          { name: 'IBO Player', note: 'Schnell und aufgeräumt, mit stabilem Playback auf vielen Smart TVs.' },
        ]}
        benefits={[
          'Live-Sport inkl. Bundesliga-Fokus',
          'Deutsche Sender & regionale Programme',
          'EPG-Programmführer & Catch-Up TV',
          'Funktioniert mit DSL, Kabel & Glasfaser',
          'Ohne Vertrag – monatlich kündbar',
          'Deutschsprachiger Support',
        ]}
        related={[
          ...nearby.map((c) => ({
            href: `/iptv-in/${c.slug}`,
            title: `IPTV in ${c.name}`,
            desc: `Premium-IPTV-Abo für ${c.name} und ${c.state}.`,
          })),
          { href: '/iptv-in', title: 'Alle Städte', desc: 'IPTV-Angebote nach Stadt im Überblick.' },
          { href: '/iptv-sport', title: 'IPTV Sport', desc: 'Live-Fußball und Sport in Top-Qualität.' },
          { href: '/devices', title: 'Kompatible Geräte', desc: 'Alle unterstützten Geräte & Apps.' },
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag.' },
        ]}
      />

      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
