import React from 'react';
import type { Metadata } from 'next';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Cookie-Information | 4kdeutsch',
  description: 'Informationen zum Einsatz von Cookies und ähnlichen Technologien auf dieser Website.',
  alternates: { canonical: '/cookies' },
});

export default function CookiesPage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-8">
        Cookie-<span className="text-primary-500">Information</span>
      </h1>

      <div className="prose prose-invert flex flex-col gap-6 text-sm sm:text-base text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-white mt-6">Einwilligung erforderlich</h2>
        <p>
          Diese Website setzt einwilligungspflichtige Cookies <strong>ausschließlich mit Ihrer vorherigen
          Zustimmung</strong>. Beim ersten Besuch erscheint ein Einwilligungsbanner. Google Analytics wird
          mit <strong>Google Consent Mode v2</strong> eingebunden und ist standardmäßig auf „denied“ gesetzt:
          Erst wenn Sie auf „Akzeptieren“ klicken, werden Analyse-Cookies gesetzt. Klicken Sie auf „Ablehnen“
          (oder treffen Sie keine Auswahl), werden <strong>keine</strong> Analyse-Cookies gesetzt und keine
          personenbezogenen Kennungen gespeichert.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">1. Technisch notwendige Speicherung</h2>
        <p>
          Ihre Cookie-Entscheidung selbst wird lokal in Ihrem Browser gespeichert (<code>localStorage</code>-
          Eintrag <code>gsttv-consent</code>), damit das Banner nicht bei jedem Seitenaufruf erneut erscheint.
          Diese Speicherung ist für den von Ihnen gewünschten Betrieb erforderlich und setzt keine Cookies
          Dritter.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">2. Analyse-Cookies (nur nach Einwilligung)</h2>
        <p>
          Nach Ihrer Einwilligung nutzen wir <strong>Google Analytics 4</strong> (Anbieter: Google Ireland
          Limited), um die Nutzung unserer Website pseudonym auszuwerten und sie zu verbessern. Dabei können
          folgende Cookies gesetzt werden:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li><code>_ga</code> – unterscheidet Besucher (Speicherdauer bis zu 2 Jahre).</li>
          <li><code>_ga_&lt;ID&gt;</code> – hält den Sitzungsstatus (Speicherdauer bis zu 2 Jahre).</li>
        </ul>
        <p>
          Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Details zur
          Verarbeitung, zur Übermittlung in die USA und zu Ihren Rechten finden Sie in unserer{' '}
          <a href="/datenschutz" className="text-primary-500 hover:underline">Datenschutzerklärung</a>.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">3. Einwilligung widerrufen oder ändern</h2>
        <p>
          Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen: über den Link
          <strong> „Cookie-Einstellungen“</strong> im Seitenfuß (öffnet das Banner erneut) oder indem Sie die
          Cookies bzw. den lokalen Speicher in Ihrem Browser löschen. Zusätzlich können Sie in Ihren
          Browsereinstellungen das Speichern von Cookies generell einschränken.
        </p>

        <h2 className="text-xl font-bold text-white mt-6">4. Nicht eingesetzte Dienste</h2>
        <p>Es sind insbesondere <strong>keine</strong> der folgenden Dienste eingebunden:</p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>Google Tag Manager, Meta/Facebook Pixel oder sonstige Werbe- und Retargeting-Skripte,</li>
          <li>eingebettete YouTube-, Karten- oder Chat-Widgets, die Cookies setzen,</li>
          <li>externe Schriftarten-Server (die Schriften werden lokal ausgeliefert).</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-6">Externe Inhalte</h2>
        <p>
          Auf einzelnen Seiten werden Vorschaubilder von externen Bild-Servern (z. B. TMDB, Unsplash)
          geladen. Hierbei wird technisch bedingt Ihre IP-Adresse an den jeweiligen Anbieter übermittelt;
          es werden dabei jedoch keine Cookies auf dieser Website gesetzt. Einzelheiten hierzu finden Sie
          in unserer{' '}
          <a href="/datenschutz" className="text-primary-500 hover:underline">Datenschutzerklärung</a>.
        </p>
      </div>
    </div>
  );
}
