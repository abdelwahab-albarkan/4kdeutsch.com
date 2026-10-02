export interface NavItem {
  label: string;
  href: string;
  desc?: string;
}

/** Primary horizontal navigation – existing routes only. */
export const NAV_MAIN: NavItem[] = [
  { label: 'Startseite', href: '/' },
  { label: 'IPTV kaufen', href: '/iptv-kaufen' },
  { label: 'Preise', href: '/pricing' },
  { label: 'Apps', href: '/iptv-apps' },
  { label: 'Geräte', href: '/devices' },
  { label: 'Einrichtung', href: '/einrichtung' },
  { label: 'Sport', href: '/iptv-sport' },
  { label: 'Reseller', href: '/reseller' },
];

/** Secondary "Mehr" group (desktop dropdown / mobile section) – keeps guides and advice pages one click away. */
export const NAV_MORE: NavItem[] = [
  { label: 'Was ist IPTV?', href: '/was-ist-iptv', desc: 'Grundlagen erklärt' },
  { label: 'Ist IPTV legal?', href: '/iptv-legal-deutschland', desc: 'Rechtslage in Deutschland' },
  { label: 'Kostenloses IPTV', href: '/kostenloses-iptv', desc: 'Risiken und Alternativen' },
  { label: 'Sky & DAZN über IPTV', href: '/sky-dazn-iptv', desc: 'Technik vs. Lizenzen' },
  { label: 'Windows & Mac', href: '/iptv-windows', desc: 'IPTV am Computer' },
  { label: 'Android Handy & Tablet', href: '/iptv-android-handy', desc: 'IPTV unterwegs' },
  { label: 'Probleme lösen', href: '/iptv-hilfe', desc: 'Hilfe bei Fehlern' },
  { label: 'Funktionen', href: '/features', desc: '4K, EPG und mehr' },
  { label: 'IPTV Vergleich', href: '/iptv-vergleich', desc: 'Anbieter im Vergleich' },
  { label: 'Blog', href: '/blog', desc: 'Ratgeber und News' },
  { label: 'FAQ & Hilfe', href: '/faq', desc: 'Häufige Fragen' },
  { label: 'Kontakt', href: '/contact', desc: 'Support per WhatsApp & E-Mail' },
];
