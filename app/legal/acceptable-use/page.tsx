import React from 'react';
import type { Metadata } from 'next';
import { withSocial } from '@/lib/seo';

export const metadata: Metadata = withSocial({
  title: 'Nutzungsrichtlinien (Acceptable Use Policy) | 4kdeutsch',
  description: 'Unsere Richtlinien zur zulässigen Nutzung (Acceptable Use Policy). Erfahren Sie, welche Aktivitäten bei der Nutzung unserer IPTV-Dienste untersagt sind.',
  alternates: { canonical: '/legal/acceptable-use' },
});

export default function AcceptableUsePage() {
  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-6">
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-8">
        Nutzungs<span className="text-primary-500">richtlinien</span>
      </h1>

      <div className="prose prose-invert flex flex-col gap-6 text-sm sm:text-base text-gray-400 leading-relaxed">
        <p className="font-semibold text-white">
          Stand: August 2026
        </p>
        <p>
          Diese Richtlinien beschreiben die Regeln für die rechtmäßige und vertragsgemäße Nutzung unserer IPTV-Infrastruktur und Dienstleistungen.
        </p>

        <h3 className="text-xl font-bold text-white mt-6">1. Fair-Use & Verbindungslimits</h3>
        <p>
          Ihr Abonnement (SOLO) darf ausschließlich auf einem Gerät zur gleichen Zeit genutzt werden. Das gleichzeitige Streamen auf mehreren Geräten unter Verwendung derselben Zugangsdaten verstößt gegen das Verbindungslimit und führt zu einer automatischen Systemsperrung.
        </p>

        <h3 className="text-xl font-bold text-white mt-6">2. Verbotene Netzwerkaktivitäten</h3>
        <p>
          Folgende netzwerkbezogene Aktivitäten sind strengstens untersagt und führen zum sofortigen, fristlosen Entzug des Zugangs ohne Anspruch auf Rückerstattung:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>Die unbefugte Weiterverteilung, das Re-Streaming oder der kommerzielle Wiederverkauf unserer rohen Server-Feeds.</li>
          <li>Sicherheitsanalysen, Port-Scans, Denial-of-Service-Angriffe (DDoS) oder Reverse Engineering unserer CDN-Server und Verschlüsselungsmethoden.</li>
          <li>Die Nutzung automatisierter Bots oder Skripte zum systematischen Scraping oder Massen-Download unseres VOD-Mediathek-Inhalts.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-6">3. Missbrauch von Reseller-Panels</h3>
        <p>
          Reseller sind dazu verpflichtet, Accounts nur für reale Endkunden anzulegen. Die Erstellung fiktiver Accounts zur Lastmanipulation unserer Server oder sonstige betrügerische Handlungen innerhalb des Reseller-Panels führen zur fristlosen Sperrung des gesamten Panels.
        </p>

        <h3 className="text-xl font-bold text-white mt-6">4. Durchsetzung und Sanktionen</h3>
        <p>
          Wir behalten uns das Recht vor, Aktivitäten bei Anzeichen von Missbrauch zu prüfen. Verstöße gegen diese Nutzungsrichtlinien führen je nach Schwere zu einer Verwarnung, einer temporären Sperre oder der dauerhaften Deaktivierung des Benutzerkontos.
        </p>
      </div>
    </div>
  );
}
