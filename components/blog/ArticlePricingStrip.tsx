import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ArticlePricingStrip() {
  return (
    <div className="my-12 p-8 rounded-xl border border-primary-500/30 bg-primary-500/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-primary-500/5">
      <div className="absolute inset-0 -z-10 bg-radial from-primary-500/5 via-transparent to-transparent" />
      
      <div>
        <div className="inline-flex items-center gap-1 text-xs font-bold text-primary-500 uppercase tracking-wider mb-2">
          <Sparkles className="h-3.5 w-3.5" />
          Zeitlich begrenztes Angebot
        </div>
        <h4 className="text-lg font-bold text-white mb-2">
          Starten Sie mit 4kdeutsch Premium IPTV
        </h4>
        <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
          Live-TV, Filme und Serien in 4K (je nach Sender) mit automatischer Freischaltung. Schon ab 5,92 € / Monat.
        </p>
      </div>

      <Link
        href="/pricing"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary-500 px-6 text-sm font-bold text-black hover:bg-primary-600 transition-all active:scale-95 shrink-0"
      >
        Tarife ansehen
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
