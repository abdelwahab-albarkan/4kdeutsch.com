import React from 'react';
import Link from 'next/link';
import LibImage from '@/components/ui/LibImage';
import { Reveal } from '@/components/ui/motion';
import TrialButton from '@/components/ui/TrialButton';

const H2 = 'font-spartan text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6';
const H3 = 'font-spartan text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-3';
const P = 'text-gray-400 text-base md:text-lg leading-relaxed';
const A = 'text-primary-500 hover:underline';
const CARD =
  'group rounded-xl border border-border-subtle bg-surface-card/50 p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary-500/40';

function Banner({ id }: { id: string }) {
  return (
    <div className="relative mb-12 h-52 overflow-hidden rounded-2xl border border-border-subtle sm:h-72">
      <LibImage id={id} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1232px" className="object-cover object-center" />
    </div>
  );
}

function Wrap({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {children}
    </section>
  );
}

/** 1) Was ist IPTV – Grundlagen und Technik (after features). */
export function HomeIntroSection() {
  return (
    <Wrap id="was-ist-iptv">
      <Reveal>
        <h2 className={H2}>
          Was ist <span className="text-gradient">IPTV</span> – und wie funktioniert es?
        </h2>
      </Reveal>
      <Banner id="iptv-streaming-erlebnis" />
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal className="space-y-4">
          <p className={P}>
            <strong className="text-gray-200">IPTV</strong> steht für <em>Internet Protocol Television</em>: Fernsehen und Videoinhalte kommen nicht über
            Kabel, Satellit oder Antenne, sondern über Ihre Internetverbindung zu Ihnen. Ein IPTV-Anbieter stellt dafür Streams bereit, die Sie mit einer
            App oder einem Player auf Fernseher, Streaming-Stick, Smartphone, Tablet oder PC ansehen.
          </p>
          <p className={P}>
            Wichtig: IPTV ist zunächst nur eine <strong className="text-gray-200">Übertragungstechnik</strong>. Ob ein Angebot rechtmäßig ist, hängt davon ab, ob der
            Anbieter die Inhalte lizenziert hat. Wie Sie seriöse Angebote erkennen, lesen Sie unter{' '}
            <Link href="/iptv-legal-deutschland" className={A}>
              Ist IPTV legal?
            </Link>{' '}
            und in unserem Ratgeber <Link href="/was-ist-iptv" className={A}>Was ist IPTV?</Link>.
          </p>
          <h3 className={`${H3} pt-4`}>Was Sie für IPTV brauchen</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-400 text-base md:text-lg leading-relaxed">
            <li>eine stabile Internetverbindung (für HD und 4K bevorzugt per LAN-Kabel oder starkes WLAN),</li>
            <li>ein kompatibles Gerät – Fernseher mit App-Store, Fire TV Stick, Android-TV-Box, Apple TV, Smartphone, Tablet oder Computer,</li>
            <li>eine IPTV-App bzw. einen Player,</li>
            <li>Ihre Zugangsdaten (Xtream Codes oder M3U-Link), die Sie nach der Bestellung per E-Mail erhalten.</li>
          </ul>
        </Reveal>
        <Reveal className="space-y-4" delay={0.1}>
          <h3 className={H3}>Die Technik dahinter in Kürze</h3>
          <p className={P}>
            <strong className="text-gray-200">M3U</strong> ist eine Playlist – eine Liste mit den Adressen der Sender. Sie fügen den M3U-Link in Ihren Player
            ein, der die Senderliste lädt. <strong className="text-gray-200">Xtream Codes</strong> ist ein Anmeldeformat mit Server-URL, Benutzername und Passwort;
            viele Apps laden damit Senderliste, Programmführer und Filmbereich automatisch. Den Unterschied erklären wir unter{' '}
            <Link href="/blog/m3u-vs-xtream-codes" className={A}>M3U vs. Xtream Codes</Link>.
          </p>
          <p className={P}>
            Der <strong className="text-gray-200">EPG</strong> (Electronic Program Guide) zeigt, was gerade und als Nächstes läuft – sofern die Playlist
            Programmdaten enthält. So richten Sie ihn ein: <Link href="/einrichtung/epg-einrichten" className={A}>EPG einrichten</Link>.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 pt-4">
            <Link href="/einrichtung/m3u-einrichten" className={CARD}>
              <div className="font-bold text-white group-hover:text-primary-500 transition-colors mb-1">M3U einrichten</div>
              <p className="text-sm text-gray-400">Playlist-Link in der App hinzufügen.</p>
            </Link>
            <Link href="/einrichtung/xtream-codes-einrichten" className={CARD}>
              <div className="font-bold text-white group-hover:text-primary-500 transition-colors mb-1">Xtream Codes</div>
              <p className="text-sm text-gray-400">Anmeldung mit Server, Benutzer, Passwort.</p>
            </Link>
            <Link href="/einrichtung/epg-einrichten" className={CARD}>
              <div className="font-bold text-white group-hover:text-primary-500 transition-colors mb-1">EPG einrichten</div>
              <p className="text-sm text-gray-400">Programmführer aktivieren.</p>
            </Link>
          </div>
        </Reveal>
      </div>
    </Wrap>
  );
}

/** 2) Geräte, Apps und Einrichtung (after devices). */
export function HomeGuideSection() {
  const devices = [
    { href: '/iptv-fire-stick', t: 'Fire TV Stick', d: 'Installation mit Downloader und Player-App.' },
    { href: '/iptv-android-tv', t: 'Android TV & Google TV', d: 'Apps direkt aus dem Play Store.' },
    { href: '/iptv-samsung-tv', t: 'Samsung Smart TV', d: 'Player für Tizen-Fernseher.' },
    { href: '/iptv-lg-tv', t: 'LG Smart TV', d: 'Player für webOS-Fernseher.' },
    { href: '/iptv-apple-tv', t: 'Apple TV', d: 'Einrichtung unter tvOS.' },
    { href: '/iptv-windows', t: 'Windows & Mac', d: 'VLC und Desktop-Player am Computer.' },
    { href: '/iptv-android-handy', t: 'Android Handy & Tablet', d: 'App, APK-Sicherheit, mobile Daten.' },
    { href: '/devices', t: 'Alle Geräte', d: 'Übersicht der kompatiblen Plattformen.' },
  ];
  const apps = [
    { href: '/iptv-smarters-pro', t: 'IPTV Smarters Pro' },
    { href: '/tivimate-iptv', t: 'TiviMate' },
    { href: '/iptv-app/smart-iptv', t: 'Smart IPTV' },
    { href: '/iptv-app/ibo-player', t: 'IBO Player' },
    { href: '/iptv-app/smarters-player-lite', t: 'Smarters Player Lite' },
    { href: '/iptv-app/kodi', t: 'Kodi (PVR IPTV Simple Client)' },
    { href: '/iptv-app/net-iptv', t: 'Net IPTV' },
    { href: '/iptv-app/ss-iptv', t: 'SS IPTV' },
    { href: '/iptv-app/televizo', t: 'Televizo' },
    { href: '/iptv-app/iptvnator', t: 'IPTVnator' },
    { href: '/iptv-app/flix-iptv', t: 'Flix IPTV' },
    { href: '/iptv-app/vlc', t: 'VLC' },
  ];
  return (
    <Wrap id="geraete-apps">
      <Reveal>
        <h2 className={H2}>
          IPTV auf <span className="text-gradient">jedem Gerät</span> – die passende App
        </h2>
        <p className={`${P} max-w-3xl mb-10`}>
          Für IPTV brauchen Sie keine spezielle Box: Ein Fernseher mit App-Store, ein Streaming-Stick oder ein Smartphone genügen. Welche App auf Ihrem Gerät
          läuft, hängt von Plattform, Modell und Region ab – die Verfügbarkeit kann variieren. Wählen Sie Ihr Gerät für eine Schritt-für-Schritt-Anleitung.
        </p>
      </Reveal>
      <Banner id="iptv-apps" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {devices.map((d) => (
          <Link key={d.href} href={d.href} className={CARD}>
            <div className="text-base font-bold text-white group-hover:text-primary-500 transition-colors mb-1.5">{d.t}</div>
            <p className="text-sm text-gray-400 leading-relaxed">{d.d}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h3 className={H3}>Beliebte IPTV Apps und Player</h3>
          <p className={`${P} mb-5`}>
            Die App ist nur der Player – die Sender kommen über Ihr Abo. Ob Sie lieber eine Xtream-Codes-Anmeldung (z. B. IPTV Smarters Pro, TiviMate) oder
            einen Playlist-Upload per MAC-Adresse (z. B. Smart IPTV, IBO Player, Net IPTV) nutzen, hängt vom Gerät ab. Einen Überblick finden Sie unter{' '}
            <Link href="/iptv-apps" className={A}>Beste IPTV Apps</Link> und{' '}
            <Link href="/iptv-app" className={A}>Apps &amp; Geräte</Link>.
          </p>
          <ul className="flex flex-wrap gap-2">
            {apps.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="inline-block rounded-full border border-border-subtle px-3.5 py-1.5 text-sm text-gray-300 transition-colors hover:border-primary-500/50 hover:text-white"
                >
                  {a.t}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className={H3}>In vier Schritten zum Fernsehen per Internet</h3>
          <ol className="space-y-3">
            {[
              ['Abo wählen', 'Tarif auswählen und bestellen – die Zugangsdaten kommen per E-Mail.'],
              ['App installieren', 'Player aus dem Store Ihres Geräts oder über den vom Hersteller vorgesehenen Weg installieren.'],
              ['Zugang eintragen', 'Xtream Codes oder M3U-Link in der App eintragen.'],
              ['Loslegen', 'Senderliste und Programmführer laden – fertig.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex items-start gap-4 rounded-xl border border-border-subtle bg-surface-card/50 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-black text-black">{i + 1}</span>
                <span className="text-gray-300 leading-relaxed">
                  <strong className="text-white">{t}:</strong> {d}
                </span>
              </li>
            ))}
          </ol>
          <p className="text-gray-400 mt-5 leading-relaxed">
            Ausführlich erklärt in der <Link href="/install" className={A}>Installationsanleitung</Link> und den{' '}
            <Link href="/einrichtung" className={A}>Einrichtungs-Guides</Link>. Läuft etwas nicht rund, hilft{' '}
            <Link href="/iptv-hilfe" className={A}>IPTV Probleme lösen</Link> weiter.
          </p>
        </Reveal>
      </div>
    </Wrap>
  );
}

/** 3) Sport, Recht, Sicherheit, Anbieter prüfen (after compare). */
export function HomeTrustSection() {
  return (
    <Wrap id="recht-sicherheit">
      <Reveal>
        <h2 className={H2}>
          IPTV <span className="text-gradient">sicher und seriös</span> nutzen
        </h2>
        <p className={`${P} max-w-3xl mb-10`}>
          Rund um IPTV gibt es viele Angebote – seriöse und unseriöse. Diese Hinweise helfen bei der Einordnung. Sie sind allgemeine Information und
          ersetzen keine Rechtsberatung.
        </p>
      </Reveal>
      <Banner id="iptv-sicherheit" />
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal className="space-y-4">
          <h3 className={H3}>Woran Sie einen seriösen IPTV-Anbieter erkennen</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-400 text-base md:text-lg leading-relaxed">
            <li>vollständiges Impressum und nachvollziehbare Firmendaten,</li>
            <li>transparente Tarife und Kündigungsbedingungen,</li>
            <li>erreichbarer, deutschsprachiger Support,</li>
            <li>übliche, sichere Zahlungsmethoden,</li>
            <li>keine Versprechen wie „alle Sender, alle Sportrechte, fast gratis“.</li>
          </ul>
          <p className={P}>
            Mehr dazu: <Link href="/iptv-legal-deutschland" className={A}>Rechtsratgeber</Link>,{' '}
            <Link href="/iptv-sicherheit" className={A}>IPTV Sicherheit</Link>,{' '}
            <Link href="/iptv-vergleich" className={A}>Anbietervergleich</Link> und{' '}
            <Link href="/iptv-erfahrungen" className={A}>IPTV Erfahrungen</Link>.
          </p>
        </Reveal>
        <Reveal className="space-y-4" delay={0.1}>
          <h3 className={H3}>Kostenloses IPTV, Gratis-Listen und Sport</h3>
          <p className={P}>
            Kostenlose M3U-Listen und „Gratis-IPTV“ im Netz stammen meist aus unklaren Quellen: Sie fallen häufig aus, bergen Sicherheitsrisiken und
            enthalten oft nicht lizenzierte Inhalte. Was dahintersteckt und welche legalen Alternativen es gibt, erklärt der Beitrag{' '}
            <Link href="/kostenloses-iptv" className={A}>Kostenloses IPTV: Risiken und Alternativen</Link>.
          </p>
          <p className={P}>
            Bei Sport gilt: Übertragungsrechte liegen bei bestimmten Anbietern und ändern sich von Saison zu Saison. Wie IPTV und Sport zusammenhängen und
            was bei Sky und DAZN zu beachten ist, lesen Sie unter <Link href="/sky-dazn-iptv" className={A}>Sky &amp; DAZN über IPTV</Link>,{' '}
            <Link href="/iptv-sport" className={A}>IPTV Sport</Link>,{' '}
            <Link href="/bundesliga-live-stream" className={A}>Bundesliga</Link> und{' '}
            <Link href="/champions-league-live-stream" className={A}>Champions League</Link>.
          </p>
          <p className={P}>
            Ihre Privatsphäre schützen Sie zusätzlich mit sicheren Passwörtern und – wenn Sie möchten – einem VPN:{' '}
            <Link href="/iptv-vpn" className={A}>VPN für IPTV</Link>.
          </p>
        </Reveal>
      </div>
    </Wrap>
  );
}

/** 4) Link hub for crawl depth (before final CTA). */
export function HomeLinkHub() {
  const groups: { title: string; links: { href: string; t: string }[] }[] = [
    {
      title: 'Abo & Vergleich',
      links: [
        { href: '/iptv-kaufen', t: 'IPTV kaufen' },
        { href: '/pricing', t: 'Tarife & Preise' },
        { href: '/bestes-iptv', t: 'Bestes IPTV' },
        { href: '/iptv-vergleich', t: 'IPTV Vergleich' },
        { href: '/iptv-erfahrungen', t: 'IPTV Erfahrungen' },
        { href: '/features', t: 'Funktionen' },
      ],
    },
    {
      title: 'Geräte',
      links: [
        { href: '/iptv-fire-stick', t: 'Fire TV Stick' },
        { href: '/iptv-android-tv', t: 'Android TV' },
        { href: '/iptv-samsung-tv', t: 'Samsung TV' },
        { href: '/iptv-lg-tv', t: 'LG TV' },
        { href: '/iptv-apple-tv', t: 'Apple TV' },
        { href: '/iptv-windows', t: 'Windows & Mac' },
        { href: '/iptv-android-handy', t: 'Android Handy' },
      ],
    },
    {
      title: 'Anleitungen',
      links: [
        { href: '/install', t: 'Installationsanleitung' },
        { href: '/einrichtung/app-installieren', t: 'App installieren' },
        { href: '/einrichtung/m3u-einrichten', t: 'M3U einrichten' },
        { href: '/einrichtung/xtream-codes-einrichten', t: 'Xtream Codes einrichten' },
        { href: '/einrichtung/epg-einrichten', t: 'EPG einrichten' },
        { href: '/iptv-hilfe', t: 'Probleme lösen' },
      ],
    },
    {
      title: 'Ratgeber & Sport',
      links: [
        { href: '/was-ist-iptv', t: 'Was ist IPTV?' },
        { href: '/iptv-legal-deutschland', t: 'Ist IPTV legal?' },
        { href: '/kostenloses-iptv', t: 'Kostenloses IPTV' },
        { href: '/sky-dazn-iptv', t: 'Sky & DAZN über IPTV' },
        { href: '/iptv-sport', t: 'IPTV Sport' },
        { href: '/blog', t: 'Blog' },
        { href: '/faq', t: 'FAQ' },
      ],
    },
  ];
  return (
    <Wrap id="alle-themen">
      <Reveal>
        <h2 className={H2}>
          Alle Themen <span className="text-gradient">auf einen Blick</span>
        </h2>
      </Reveal>
      <Banner id="iptv-smart-tv" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">{g.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 transition-colors hover:text-primary-500">
                    {l.t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

/** 5) IPTV testen – 24h Testzugang (after pricing). Only facts confirmed by the business: 24h free test access via WhatsApp. */
export function HomeTrialSection() {
  const steps = [
    { n: '1', t: 'Testzugang anfragen', d: 'Schreiben Sie uns per WhatsApp, dass Sie den 24h kostenlosen Testzugang anfragen möchten.' },
    { n: '2', t: 'Nächste Schritte erhalten', d: 'Wir melden uns mit den Informationen zum weiteren Vorgehen für Ihren IPTV-Test.' },
    { n: '3', t: 'IPTV-App einrichten', d: 'Richten Sie IPTV auf Ihrem Gerät ein – Anleitungen finden Sie für Fire Stick, Smart TV, Android TV und Apple TV.' },
    { n: '4', t: '24 Stunden testen', d: 'Prüfen Sie Senderauswahl, Bildqualität und Bedienung auf Ihrem eigenen Gerät und Ihrer Internetverbindung.' },
  ];
  return (
    <Wrap id="iptv-testen">
      <Reveal>
        <h2 className={H2}>
          IPTV testen: <span className="text-gradient">24h kostenloser Testzugang</span>
        </h2>
        <p className={`${P} max-w-3xl`}>
          Sie möchten IPTV erst ausprobieren, bevor Sie ein Abo abschließen? Für einen <strong className="text-gray-200">IPTV Test</strong> bieten wir einen{' '}
          <strong className="text-gray-200">24h kostenlosen Testzugang</strong> an. So können Sie IPTV kostenlos testen und selbst beurteilen, ob Senderauswahl,
          Bildqualität und Einrichtung zu Ihrem Gerät und Ihrem Anschluss passen.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className={CARD}>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 font-spartan text-lg font-black text-primary-500">{s.n}</div>
            <h3 className={H3}>{s.t}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{s.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <TrialButton variant="primary" size="lg" />
        <p className="text-sm text-gray-400">
          Mehr zum Thema: <Link href="/kostenloses-iptv" className={A}>IPTV kostenlos testen – worauf Sie achten sollten</Link>,{' '}
          <Link href="/install" className={A}>Installationsanleitungen</Link> und <Link href="/pricing" className={A}>Tarife &amp; Preise</Link>.
        </p>
      </div>
    </Wrap>
  );
}
