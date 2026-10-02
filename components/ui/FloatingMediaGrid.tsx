'use client';

import React, { useEffect, useRef } from 'react';
import { m, useMotionValue, useAnimationFrame, useReducedMotion } from 'framer-motion';
import FloatingMediaCard from './FloatingMediaCard';
import { MediaParallaxProvider } from './MediaParallax';

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

interface FloatingMediaGridProps {
  items: MediaItem[];
  /** Optional distinct set for the bottom row (e.g. series under movies). */
  secondRowItems?: MediaItem[];
  /** Max posters per row before the seamless duplication. */
  maxPerRow?: number;
  className?: string;
}

function getPosterUrl(item: MediaItem): string {
  const path = item.poster_path || '';
  return path.startsWith('http') ? path : `https://image.tmdb.org/t/p/w400${path}`;
}

/** Horizontal fade so posters dissolve into the section edges (cinematic). */
const EDGE_FADE =
  'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)';

/**
 * A single seamless, infinitely-scrolling poster row. Motion is driven by a
 * Framer Motion value advanced per animation frame (no CSS keyframes), so it
 * can pause on hover and wrap without a visible seam. The track holds two
 * copies of the row; wrapping at half-width keeps the loop continuous.
 */
function MarqueeRow({
  items,
  direction,
  pxPerSecond,
  priority = false,
}: {
  items: MediaItem[];
  direction: 'left' | 'right';
  pxPerSecond: number;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfWidth = useRef(0);
  const paused = useRef(false);
  const started = useRef(false);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      halfWidth.current = el.scrollWidth / 2;
      // A right-moving row starts shifted one set left so it scrolls into view.
      if (direction === 'right' && !started.current && halfWidth.current > 0) {
        x.set(-halfWidth.current);
        started.current = true;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [direction, x, items]);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    const half = halfWidth.current;
    if (!half) return;
    const step = (pxPerSecond * delta) / 1000;
    let next = x.get() + (direction === 'left' ? -step : step);
    if (next <= -half) next += half;
    else if (next >= 0) next -= half;
    x.set(next);
  });

  const loop = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
      }}
    >
      <m.div
        ref={trackRef}
        className="flex w-max gap-4 md:gap-5 py-2"
        style={{ x, willChange: 'transform' }}
      >
        {loop.map((item, index) => (
          <FloatingMediaCard
            key={`${item.id}-${index}`}
            src={getPosterUrl(item)}
            alt={item.title || item.name || 'Poster'}
            depth="middle"
            className="w-32 shrink-0 sm:w-36 md:w-44"
            sizes="176px"
            priority={priority && index < 5}
          />
        ))}
      </m.div>
    </div>
  );
}

/**
 * Cinematic double-row poster wall — uniform cards on two counter-scrolling
 * rows, à la the 4kdeutsch homepage. Each poster keeps its own float + hover
 * tilt/glow (via FloatingMediaCard); the rows glide horizontally and pause
 * under the cursor. No layout shift (fixed poster aspect), no CSS keyframes.
 */
export default function FloatingMediaGrid({
  items,
  secondRowItems,
  maxPerRow = 9,
  className = '',
}: FloatingMediaGridProps) {
  if (items.length === 0) return null;

  let rowTop: MediaItem[];
  let rowBottom: MediaItem[];
  if (secondRowItems && secondRowItems.length >= 3) {
    // Two distinct sets — e.g. movies on top, series below.
    rowTop = items.slice(0, maxPerRow);
    rowBottom = secondRowItems.slice(0, maxPerRow);
  } else {
    // Single set split across the two rows.
    const pool = items.slice(0, maxPerRow * 2);
    const mid = Math.ceil(pool.length / 2);
    rowTop = pool.slice(0, mid);
    rowBottom = pool.length - mid >= 3 ? pool.slice(mid) : pool.slice(0, mid);
  }

  return (
    <MediaParallaxProvider className={`flex flex-col gap-4 md:gap-6 ${className}`}>
      <MarqueeRow items={rowTop} direction="left" pxPerSecond={30} />
      <MarqueeRow items={rowBottom} direction="right" pxPerSecond={26} />
    </MediaParallaxProvider>
  );
}
