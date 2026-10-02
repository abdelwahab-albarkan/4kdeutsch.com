import React from 'react';
import { WifiOff } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Offline | 4kdeutsch',
  description: 'Sie sind derzeit offline. Bitte überprüfen Sie Ihre Internetverbindung.',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-8 border border-red-500/25">
        <WifiOff className="h-10 w-10" />
      </div>
      <h1 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
        Sie sind <span className="text-red-500">Offline</span>
      </h1>
      <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed mb-8">
        Wir konnten keine Verbindung zu den 4kdeutsch-Servern herstellen. Bitte überprüfen Sie Ihre Netzwerkverbindung und laden Sie die Seite neu.
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-md bg-primary-500 px-6 text-sm font-semibold text-black hover:bg-primary-600 transition-colors"
      >
        Verbindung erneut versuchen
      </Link>
    </div>
  );
}
