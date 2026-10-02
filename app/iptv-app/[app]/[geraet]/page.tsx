import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import JsonLd from '@/components/common/JsonLd';
import { productSchema, faqSchema } from '@/lib/structured-data';
import DeviceGuide from '@/components/sections/DeviceGuide';
import PricingSection from '@/components/sections/PricingSection';
import CTASection from '@/components/sections/CTASection';
import { APPS, AVAILABILITY_NOTE, COMBOS, COMBO_EXTRA, MENU_NOTE, getApp, getDevice } from '@/lib/apps';
import { withSocial } from '@/lib/seo';

type Params = { app: string; geraet: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return COMBOS.map((c) => ({ app: c.app, geraet: c.geraet }));
}

function resolve({ app, geraet }: Params) {
  const a = getApp(app);
  const d = getDevice(geraet);
  if (!a || !d || !a.devices.includes(d.slug)) return null;
  return { a, d };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const r = resolve(await params);
  if (!r) return {};
  const { a, d } = r;
  const title = `${a.name}${/iptv/i.test(a.name) ? '' : ' IPTV'} auf ${d.name}: IPTV App einrichten 2026 | 4kdeutsch`;
  const description = `IPTV App ${a.name} auf ${d.name} installieren und einrichten: Schritt für Schritt, mit Xtream Codes oder M3U. ${AVAILABILITY_NOTE}`;
  const path = `/iptv-app/${a.slug}/${d.slug}`;
  return withSocial({
    title,
    description,
    alternates: { canonical: path },
    keywords: [`${a.name} ${d.name}`, `${a.name} installieren`, `IPTV ${d.name}`],
    openGraph: { title, description, url: `https://4kdeutsch.com${path}` },
  });
}

export default async function AppDevicePage({ params }: { params: Promise<Params> }) {
  const r = resolve(await params);
  if (!r) notFound();
  const { a, d } = r;
  const path = `/iptv-app/${a.slug}/${d.slug}`;

  const otherApps = APPS.filter((x) => x.slug !== a.slug && x.devices.includes(d.slug)).slice(0, 3);
  const otherDevices = a.devices.filter((s) => s !== d.slug).slice(0, 2).map((s) => getDevice(s)!);

  const faq = [
    {
      question: `Ist ${a.name} auf ${d.name} verfügbar?`,
      answer: `${a.name} lässt sich auf ${d.name} so installieren: ${a.installOverride?.[d.slug] ?? d.store}. ${AVAILABILITY_NOTE} Bei Fragen hilft unser Support.`,
    },
    {
      question: `Wie melde ich mich in ${a.name} an?`,
      answer: a.login,
    },
    {
      question: `Brauche ich für ${a.name} ein separates Abo?`,
      answer: `Die App selbst ist nur der Player. Für die Sender benötigen Sie ein IPTV-Abo, z. B. von 4kdeutsch – die Zugangsdaten erhalten Sie sofort per E-Mail.`,
    },
  ];

  return (
    <>
      <JsonLd data={[productSchema(), faqSchema(faq)]} />
      <Breadcrumbs
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'IPTV Apps', path: '/iptv-apps' },
          { name: `${a.name} auf ${d.name}`, path },
        ]}
      />
      <DeviceGuide
        tagline={`${a.name} · ${d.name}`}
        h1={
          <>
            <span className="text-gradient">{a.name}</span> auf {d.name}
          </>
        }
        intro={
          <>
            <p>
              {a.name} überzeugt mit {a.strength}. Auf <strong className="text-gray-200">{d.name}</strong> richten Sie die App in
              wenigen Minuten ein und nutzen Ihre <strong className="text-gray-200">4kdeutsch</strong>-Zugangsdaten.
            </p>
            <p>{d.tip}</p>
          </>
        }
        steps={[
          a.installOverride?.[d.slug] ? `${a.installOverride[d.slug]}.` : `Öffnen Sie ${d.store} und installieren Sie ${a.name}.`,
          'Starten Sie die App und erlauben Sie ggf. die angeforderten Berechtigungen.',
          a.login,
          'Warten Sie, bis die Senderliste und der Programmführer geladen sind.',
          `Fertig: Wählen Sie einen Sender und genießen Sie IPTV auf ${d.name}.`,
        ]}
        apps={[
          { name: a.name, note: `Stärke: ${a.strength}.` },
          ...otherApps.map((x) => ({ name: x.name, note: `Alternative für ${d.name}: ${x.strength}.` })),
        ].slice(0, 3)}
        benefits={[
          `Läuft auf ${d.name}`,
          'Zugangsdaten sofort per E-Mail',
          'Ohne Vertrag – monatlich kündbar',
          'Deutschsprachiger Support',
        ]}
        related={[
          { href: d.page, title: `IPTV auf ${d.name}`, desc: `Alle Infos zu IPTV auf ${d.name}.` },
          ...(a.existingPage ? [{ href: a.existingPage, title: a.name, desc: `Alles über ${a.name}.` }] : []),
          ...otherDevices.map((o) => ({
            href: `/iptv-app/${a.slug}/${o.slug}`,
            title: `${a.name} auf ${o.name}`,
            desc: `Einrichtung von ${a.name} auf ${o.name}.`,
          })),
          ...otherApps.slice(0, 2).map((o) => ({
            href: `/iptv-app/${o.slug}/${d.slug}`,
            title: `${o.name} auf ${d.name}`,
            desc: `Alternative App für ${d.name}.`,
          })),
          { href: '/iptv-kaufen', title: 'IPTV kaufen', desc: 'Premium-IPTV-Abo ohne Vertrag.' },
          { href: a.existingPage ? '/iptv-app' : `/iptv-app/${a.slug}`, title: a.existingPage ? 'Alle Apps im Überblick' : `Alles zu ${a.name}`, desc: 'Kompatibilität und Anleitungen.' },
        ].slice(0, 7)}
      />
      <section className="max-w-4xl mx-auto px-6 py-10">
        {(COMBO_EXTRA[`${a.slug}/${d.slug}`] ?? []).map((s) => (
          <div key={s.title} className="mb-8">
            <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">{s.title}</h2>
            {s.paragraphs.map((t) => (
              <p key={t} className="text-gray-400 leading-relaxed mb-3">
                {t}
              </p>
            ))}
          </div>
        ))}
        <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
          Vorbereitung auf {d.name}
        </h2>
        <p className="text-sm text-gray-500 mb-3">
          {AVAILABILITY_NOTE} {MENU_NOTE}
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300 leading-relaxed mb-8">
          {d.prep.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <h2 className="font-spartan text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">
          Bedienung und häufige Probleme
        </h2>
        <p className="text-gray-400 leading-relaxed mb-3">{d.nav}</p>
        <p className="text-gray-400 leading-relaxed">
          Läuft {a.name} auf {d.name} nicht wie erwartet, helfen diese Anleitungen weiter:{' '}
          <Link href={`/iptv-hilfe/app-laedt-nicht/${d.slug}`} className="text-primary-500 underline">
            App lädt nicht
          </Link>
          ,{' '}
          <Link href={`/iptv-hilfe/login-funktioniert-nicht/${d.slug}`} className="text-primary-500 underline">
            Login funktioniert nicht
          </Link>{' '}
          und{' '}
          <Link href={`/einrichtung/epg-einrichten/${d.slug}`} className="text-primary-500 underline">
            EPG einrichten
          </Link>
          .
        </p>
      </section>
      <PricingSection />
      <CTASection />
    </>
  );
}
