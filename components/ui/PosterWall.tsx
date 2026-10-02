'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion';
import { TMDBMediaItem } from '@/lib/tmdb';

function posterUrl(item: TMDBMediaItem): string {
  const path = item.poster_path || '';
  return path.startsWith('http') ? path : `https://image.tmdb.org/t/p/w400${path}`;
}

const COL_FADE =
  'linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)';

/** One seamless vertical poster column (Framer Motion value, no CSS keyframes). */
function Column({
  items,
  pxPerSecond,
  direction,
  priority = false,
}: {
  items: TMDBMediaItem[];
  pxPerSecond: number;
  direction: 'up' | 'down';
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const y = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const halfHeight = useRef(0);
  const started = useRef(false);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      halfHeight.current = el.scrollHeight / 2;
      if (direction === 'down' && !started.current && halfHeight.current > 0) {
        y.set(-halfHeight.current);
        started.current = true;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [direction, y, items]);

  useAnimationFrame((_, delta) => {
    if (reduce || !halfHeight.current) return;
    const step = (pxPerSecond * delta) / 1000;
    let next = y.get() + (direction === 'up' ? -step : step);
    if (next <= -halfHeight.current) next += halfHeight.current;
    else if (next >= 0) next -= halfHeight.current;
    y.set(next);
  });

  const loop = [...items, ...items];

  return (
    <div className="h-full overflow-hidden" style={{ maskImage: COL_FADE, WebkitMaskImage: COL_FADE }}>
      <m.div ref={trackRef} className="flex flex-col gap-3 md:gap-4" style={{ y, willChange: 'transform' }}>
        {loop.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="group relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-white/10 bg-surface-card shadow-[0_16px_36px_-14px_rgba(0,0,0,0.85)] transition-colors hover:border-primary-500/50"
          >
            <Image
              src={posterUrl(item)}
              alt={item.title || item.name || 'Poster'}
              fill
              sizes="150px"
              priority={priority && i < 2}
              className="object-cover"
            />
            {/* Glass reflection + bottom vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10" />
          </div>
        ))}
      </m.div>
    </div>
  );
}

/**
 * Cinematic 3D poster wall for the hero: three vertical, counter-scrolling
 * columns rendered on a perspective-tilted plane that leans toward the cursor.
 * Fixed square stage + reserved poster aspect ⇒ no layout shift. Transforms
 * only (GPU); honours reduced-motion.
 */
export default function PosterWall({ items, className = '' }: { items: TMDBMediaItem[]; className?: string }) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  // Pointer → subtle tilt around a fixed cinematic base angle.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, (v) => 6 - v * 10), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, (v) => -20 + v * 10), { stiffness: 120, damping: 18 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const pool = items?.slice(0, 15) || [];
  if (pool.length === 0) return null;
  const cols: TMDBMediaItem[][] = [[], [], []];
  pool.forEach((item, i) => cols[i % 3].push(item));

  return (
    <div
      ref={stageRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative mx-auto w-full max-w-[460px] aspect-square [perspective:1200px] ${className}`}
    >
      {/* Ambient brand glow behind the wall */}
      <div className="absolute inset-8 -z-10 rounded-full bg-primary-500/20 blur-3xl opacity-60" />

      <m.div
        className="grid h-full grid-cols-3 grid-rows-1 gap-3 md:gap-4 [transform-style:preserve-3d]"
        style={
          reduce
            ? { transform: 'rotateY(-14deg) rotateX(5deg)' }
            : { rotateX, rotateY, transformPerspective: 1200 }
        }
      >
        <Column items={cols[0]} pxPerSecond={18} direction="up" priority />
        <Column items={cols[1]} pxPerSecond={24} direction="down" priority />
        <Column items={cols[2]} pxPerSecond={16} direction="up" />
      </m.div>

      {/* Floating glass focal badge */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold text-white shadow-premium">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
        </span>
        HD · 4K · Live
      </div>
    </div>
  );
}
