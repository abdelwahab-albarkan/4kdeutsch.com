import React from 'react';
import { Mail, MessageCircle, Globe } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import ContactForm from '@/components/common/ContactForm';
import PageFigure from '@/components/ui/PageFigure';
import { WhatsAppCta } from '@/components/common/ContactBlock';
import TrialButton from '@/components/ui/TrialButton';
import { withSocial } from '@/lib/seo';

export const metadata = withSocial({
  title: 'IPTV Support & Kontakt: Hilfe auf Deutsch | 4kdeutsch',
  description: 'Haben Sie Fragen zu unseren IPTV-Tarifen oder benötigen Sie Hilfe bei der Einrichtung auf Ihrem Smart TV oder Fire Stick? Unser deutscher Kundenservice ist per WhatsApp und E-Mail für Sie erreichbar.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'IPTV Support & Kontakt: Hilfe auf Deutsch | 4kdeutsch',
    description: 'Haben Sie Fragen zu unseren IPTV-Tarifen oder benötigen Sie Hilfe bei der Einrichtung auf Ihrem Smart TV oder Fire Stick? Unser deutscher Kundenservice ist per WhatsApp und E-Mail für Sie erreichbar.',
    url: 'https://4kdeutsch.com/contact',
  },
  keywords: ['IPTV Support', 'IPTV Kontakt', 'IPTV Hilfe', 'IPTV Anbieter Kontakt', 'IPTV WhatsApp Support'],
});

const CARD = 'p-6 rounded-xl border border-border-subtle bg-surface-card/40 flex gap-4 items-start';
const ICON = 'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500';

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-spartan text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mb-6">
          <span className="text-primary-500">Kontakt</span> &amp; Support
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          Fragen vor dem Kauf oder Unterstützung bei der App-Konfiguration? Schreiben Sie uns per WhatsApp oder E-Mail – wir helfen Ihnen auf Deutsch weiter.
        </p>
      </div>
      <PageFigure id="iptv-support" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Free trial */}
          <div className="rounded-xl border border-primary-500/40 bg-primary-500/5 p-6">
            <h2 className="text-base font-bold text-white mb-1">24h kostenloser Testzugang</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">Testen Sie den Dienst 24 Stunden kostenlos. Die Anfrage läuft über WhatsApp.</p>
            <TrialButton variant="primary" size="lg" label="Jetzt 24h kostenlos testen" />
          </div>

          {/* WhatsApp */}
          <div className={CARD}>
            <div className={ICON}>
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white mb-1">WhatsApp</h2>
              <p className="text-lg font-bold text-primary-500 mb-2">{SITE_CONFIG.whatsappDisplay}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Schnelle Hilfe bei Fragen zum Abo oder zur Einrichtung.
              </p>
              <WhatsAppCta message="Hallo, ich habe eine Frage zu den 4kdeutsch IPTV-Abonnements." />
            </div>
          </div>

          {/* E-Mail */}
          <div className={CARD}>
            <div className={ICON}>
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white mb-1">E-Mail</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">Senden Sie uns Ihre Anfrage per E-Mail – am besten mit Gerät, App und einer kurzen Beschreibung.</p>
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="inline-block py-1.5 text-sm font-bold text-primary-500 hover:underline">
                {SITE_CONFIG.supportEmail}
              </a>
            </div>
          </div>

          {/* Website */}
          <div className={CARD}>
            <div className={ICON}>
              <Globe className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white mb-1">Website</h2>
              <a href={SITE_CONFIG.domain} className="inline-block py-1.5 text-sm font-bold text-primary-500 hover:underline">
                {SITE_CONFIG.websiteDisplay}
              </a>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                Rechtliche Angaben finden Sie im{' '}
                <a href="/impressum" className="text-primary-500 hover:underline">Impressum</a>, in der{' '}
                <a href="/datenschutz" className="text-primary-500 hover:underline">Datenschutzerklärung</a> und in den{' '}
                <a href="/agb" className="text-primary-500 hover:underline">AGB</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 rounded-xl border border-border-subtle bg-surface-card/60">
          <h2 className="text-lg font-bold text-white mb-6">Nachricht senden</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
