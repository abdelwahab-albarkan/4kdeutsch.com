import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { faqSchema } from '@/lib/structured-data';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import { APP_PAGES, AVAILABILITY_NOTE, MENU_NOTE, getApp, getDevice } from '@/lib/apps';
import { withSocial } from '@/lib/seo';

type Params = { app: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return APP_PAGES.map((a) => ({ app: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const a = getApp((await params).app);
  if (!a || a.existingPage) return {};
  const hubOnly = !!a.guide;
  const title = hubOnly
    ? `${a.name.replace(/ \(.*\)/, '')} einrichten: Playlist & Installation | 4kdeutsch`
    : `${a.name} einrichten – Anleitung für alle Geräte | 4kdeutsch`;
  const description = hubOnly
    ? `${a.name} erklärt: Was die App kann, wie Sie sie installieren und Ihre IPTV-Playlist hinzufügen (M3U/Xtream). ${AVAILABILITY_NOTE}`
    : `${a.name}: ${a.strength}. Einrichtung auf ${a.devices.length} Geräten Schritt für Schritt erklärt.`;
  return withSocial({
    title,
    description,
    alternates: { canonical: `/iptv-app/${a.slug}` },
    openGraph: { title, description, url: `https://4kdeutsch.com/iptv-app/${a.slug}` },
  });
}

export default async function AppPage({ params }: { params: Promise<Params> }) {
  const a = getApp((await params).app);
  if (!a || a.existingPage) notFound();
  const devices = a.devices.map((s) => getDevice(s)!);
  const path = `/iptv-app/${a.slug}`;
  const g = a.guide;

  const faq = g
    ? g.faq
    : [
        { question: `Wie melde ich mich in ${a.name} an?`, answer: a.login },
        { question: `Auf welchen Geräten läuft ${a.name}?`, answer: `${a.name} nutzen Sie auf: ${devices.map((d) => d.name).join(', ')}.` },
      ];

  return (
    <>
      <JsonLd data={faqSchema(faq)} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Apps', path: '/iptv-apps' },
          { name: a.name, path },
        ]}
      />
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="font-spartan text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
          <span className="text-gradient">{a.name}</span> einrichten
        </h1>
        {g ? (
          <>
            {g.about.map((p, i) => (
              <p key={i} className="text-gray-400 text-lg leading-relaxed mb-4">
                {p}
              </p>
            ))}
            <p className="text-sm text-gray-500 mb-10">
              {AVAILABILITY_NOTE} {MENU_NOTE}
            </p>
            <h2 className="font-spartan text-2xl font-black text-white uppercase mb-4">Installation und Playlist hinzufügen</h2>
            <ol className="space-y-3 mb-10">
              {g.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4 rounded-xl border border-border-subtle bg-surface-card/50 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-black text-black">{i + 1}</span>
                  <span className="text-sm md:text-base text-gray-300 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <h2 className="font-spartan text-2xl font-black text-white uppercase mb-4">Wichtige Hinweise</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 leading-relaxed mb-10">
              {g.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              {a.name} ist eine IPTV App und überzeugt mit {a.strength}.{a.slug === 'smart-iptv' ? ' Die App wird auch SIPTV oder SmartIPTV geschrieben.' : ''} Mit Ihren 4kdeutsch-Zugangsdaten sind Sie in wenigen Minuten startklar.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              <strong className="text-gray-200">Anmeldung:</strong> {a.login}
            </p>
          </>
        )}

        {a.extra?.map((s) => (
          <div key={s.title} className="mb-10">
            <h2 className="font-spartan text-2xl font-black text-white uppercase mb-4">{s.title}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-400 leading-relaxed mb-3">
                {p}
              </p>
            ))}
          </div>
        ))}

        {devices.length > 0 && (
          <>
            <h2 className="font-spartan text-2xl font-black text-white uppercase mb-4">Anleitung nach Gerät</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {devices.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/iptv-app/${a.slug}/${d.slug}`}
                    className="block rounded-xl border border-border-subtle bg-surface-card/60 p-5 hover:border-primary-500/40 transition-colors"
                  >
                    <span className="block text-lg font-bold text-white">{a.name} auf {d.name}</span>
                    <span className="block text-sm text-gray-400">Installation und Einrichtung</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {g && (
          <>
            <h2 className="font-spartan text-2xl font-black text-white uppercase mb-4">Häufige Fragen zu {a.name}</h2>
            <dl className="space-y-4 mb-10">
              {g.faq.map((f) => (
                <div key={f.question} className="rounded-xl border border-border-subtle bg-surface-card/40 p-5">
                  <dt className="font-bold text-white mb-1">{f.question}</dt>
                  <dd className="text-gray-400 leading-relaxed">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        <h2 className="font-spartan text-2xl font-black text-white uppercase mb-4">Weiterführende Anleitungen</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { href: '/iptv-apps', t: 'Beste IPTV Apps im Überblick' },
            { href: '/iptv-app', t: 'Apps und Geräte: Kompatibilität' },
            { href: '/einrichtung/m3u-einrichten', t: 'M3U-Link einrichten' },
            { href: '/einrichtung/xtream-codes-einrichten', t: 'Xtream Codes einrichten' },
            { href: '/einrichtung/epg-einrichten', t: 'EPG einrichten' },
            { href: '/iptv-hilfe', t: 'IPTV Probleme lösen' },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-primary-500 underline">
                {l.t}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <PricingSection />
      <CTASection />
    </>
  );
}
