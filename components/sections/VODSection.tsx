import React from 'react';
import { TMDBMediaItem } from '@/lib/tmdb';
import { Reveal } from '@/components/ui/motion';
import FloatingMediaGrid from '@/components/ui/FloatingMediaGrid';

interface VODSectionProps {
  movies: TMDBMediaItem[];
  series: TMDBMediaItem[];
}

export default function VODSection({ movies, series }: VODSectionProps) {
  return (
    <section className="py-24 bg-surface/30 border-y border-border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <Reveal>
          <h2 className="font-spartan text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Ihre Mediathek kennt <span className="text-gradient">keine Öffnungszeiten</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
            Filme und Serienstaffeln auf Abruf – in 4K, mit Untertiteln und ständig um die neuesten Titel erweitert. Anschauen, wann Sie wollen.
          </p>
        </Reveal>
      </div>

      {/* Cinematic double-row poster wall — movies on top, series below */}
      <FloatingMediaGrid items={movies} secondRowItems={series} maxPerRow={9} />
    </section>
  );
}
