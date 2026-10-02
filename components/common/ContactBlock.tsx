import React from 'react';
import { Mail, MessageCircle, Globe } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]';

export const waLink = (text?: string) => (text ? `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(text)}` : SITE_CONFIG.whatsappUrl);

/** WhatsApp call-to-action button (confirmed business number). */
export function WhatsAppCta({
  label = 'Über WhatsApp kontaktieren',
  message,
  variant = 'primary',
  className = '',
}: {
  label?: string;
  message?: string;
  variant?: 'primary' | 'outline';
  className?: string;
}) {
  const style =
    variant === 'primary'
      ? 'bg-primary-500 text-black shadow-lg shadow-primary-500/20 hover:bg-primary-600'
      : 'border border-primary-500/50 text-primary-500 hover:bg-primary-500/10';
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 text-sm font-bold transition-all active:scale-95 ${FOCUS} ${style} ${className}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}

/** Contact details list: WhatsApp, E-Mail, Website. */
export function ContactDetails({ className = '' }: { className?: string }) {
  const row = 'flex items-start gap-3';
  const icon = 'mt-0.5 h-4 w-4 shrink-0 text-primary-500';
  const link = 'inline-block py-1.5 text-gray-300 hover:text-primary-500 transition-colors';
  return (
    <dl className={`flex flex-col gap-2.5 text-sm ${className}`}>
      <div className={row}>
        <MessageCircle className={icon} aria-hidden="true" />
        <div>
          <dt className="text-xs uppercase tracking-wider text-gray-500">WhatsApp</dt>
          <dd>
            <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className={link}>
              {SITE_CONFIG.whatsappDisplay}
            </a>
          </dd>
        </div>
      </div>
      <div className={row}>
        <Mail className={icon} aria-hidden="true" />
        <div>
          <dt className="text-xs uppercase tracking-wider text-gray-500">E-Mail</dt>
          <dd>
            <a href={`mailto:${SITE_CONFIG.supportEmail}`} className={link}>
              {SITE_CONFIG.supportEmail}
            </a>
          </dd>
        </div>
      </div>
      <div className={row}>
        <Globe className={icon} aria-hidden="true" />
        <div>
          <dt className="text-xs uppercase tracking-wider text-gray-500">Website</dt>
          <dd>
            <a href={SITE_CONFIG.domain} className={link}>
              {SITE_CONFIG.websiteDisplay}
            </a>
          </dd>
        </div>
      </div>
    </dl>
  );
}

/** Marker for legally required business details that are not available. Never replace with invented data. */
export function RequiredInfo({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-5 text-sm text-gray-300 leading-relaxed">
      <p className="mb-2 font-bold text-amber-400">[REQUIRED BUSINESS INFORMATION]</p>
      {children}
    </div>
  );
}
