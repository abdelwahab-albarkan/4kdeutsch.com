import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { ContactDetails, RequiredInfo } from '@/components/common/ContactBlock';
import { LegalSlot, LegalTestBanner } from '@/components/common/LegalBlocks';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Impressum | 4kdeutsch',
  description: 'Anbieterkennzeichnung gemäß § 5 DDG (Digitale-Dienste-Gesetz).',
  alternates: { canonical: '/impressum' },
});

const H2 = 'text-xl font-bold text-white mt-6';

export default function ImpressumPage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-8">
        Impres<span className="text-primary-500">sum</span>
      </h1>

      <LegalTestBanner />

      <div className="prose prose-invert flex flex-col gap-6 text-sm sm:text-base text-gray-400 leading-relaxed">
        <p className="font-semibold text-white">
          Anbieterkennzeichnung gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 Medienstaatsvertrag (MStV)
        </p>

        <h2 className={H2}>Diensteanbieter</h2>
        <p>
          Diese Website ({SITE_CONFIG.domain}, Marke „{SITE_CONFIG.name}“) wird betrieben von:
        </p>
        <LegalSlot slot="provider">
          <RequiredInfo>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vollständiger Name bzw. Firma des Betreibers</li>
            <li>Rechtsform</li>
            <li>Ladungsfähige Anschrift (Straße, Hausnummer, Postleitzahl, Ort, Land)</li>
          </ul>
          <p className="mt-3">Diese Pflichtangaben sind einzutragen, bevor die Seite veröffentlicht wird. Es werden keine Angaben ersetzt oder geschätzt.</p>
        </RequiredInfo>
        </LegalSlot>

        <h2 className={H2}>Kontakt</h2>
        <ContactDetails />

        <h2 className={H2}>Vertretungsberechtigte Person</h2>
        <LegalSlot slot="representative">
          <RequiredInfo>
          <p>Name der vertretungsberechtigten Person(en). Falls journalistisch-redaktionelle Inhalte angeboten werden: inhaltlich Verantwortliche(r) gemäß § 18 Abs. 2 MStV mit Anschrift.</p>
        </RequiredInfo>
        </LegalSlot>

        <h2 className={H2}>Registereintrag und Umsatzsteuer</h2>
        <LegalSlot slot="register">
          <RequiredInfo>
          <p>
            Sofern vorhanden: Registergericht und Registernummer sowie Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG. Nur eintragen, wenn zutreffend – andernfalls entfällt dieser Abschnitt.
          </p>
        </RequiredInfo>
        </LegalSlot>

        <h2 className={H2}>Aufsichtsbehörde</h2>
        <RequiredInfo>
          <p>Nur erforderlich, wenn die Tätigkeit einer behördlichen Zulassung bedarf: zuständige Aufsichtsbehörde. Andernfalls entfällt dieser Abschnitt.</p>
        </RequiredInfo>

        <h2 className={H2}>Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>

        <h2 className={H2}>Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
          Betreiber der Seiten verantwortlich.
        </p>

        <h2 className={H2}>Online-Streitbeilegung und Verbraucherschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>
        <LegalSlot slot="arbitration">
          <RequiredInfo>
          <p>Angabe, ob der Betreiber bereit oder verpflichtet ist, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).</p>
        </RequiredInfo>
        </LegalSlot>
      </div>
    </div>
  );
}
