import type { Metadata } from 'next';
import { Cairo, Tajawal } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import MotionProvider from '@/components/ui/MotionProvider';
import LayoutWrapper from '@/components/common/LayoutWrapper';
import JsonLd from '@/components/common/JsonLd';
import { siteGraphSchema } from '@/lib/structured-data';

// German-only site: load the Latin subset only. Dropping the unused Arabic
// glyph range keeps the identical typeface while cutting font payload (perf/LCP).
const cairo = Cairo({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-cairo',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const tajawal = Tajawal({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const SITE_NAME = '4kdeutsch';
const DEFAULT_TITLE = '4kdeutsch | Premium IPTV-Abonnement in Deutschland';
const DEFAULT_DESCRIPTION =
  'Streamen Sie Live-TV, Sportkanäle sowie Filme & Serien in HD und 4K (abhängig von Sender, Gerät und Internetverbindung). Einfache Einrichtung auf Firestick, Smart-TVs, Apple TV und mehr.';

export const metadata: Metadata = {
  metadataBase: new URL('https://4kdeutsch.com'),
  // Each page provides its own full title (already brand-suffixed); no template
  // to avoid a doubled "| 4kdeutsch".
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://4kdeutsch.com',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport = {
  themeColor: '#10D96F',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" dir="ltr" className={`${cairo.variable} ${tajawal.variable}`}>
      <body className="bg-background text-gray-100 font-sans antialiased overflow-x-hidden">
        <JsonLd data={siteGraphSchema()} />
        <MotionProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </MotionProvider>
        {/* Vercel Web Analytics — cookieless, no persistent identifiers */}
        <Analytics />
      </body>
    </html>
  );
}
