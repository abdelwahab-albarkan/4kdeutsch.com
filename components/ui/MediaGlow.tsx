'use client';

import React, { useRef } from 'react';
import { m, useMotionTemplate, useMotionValue } from 'framer-motion';

interface MediaGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderColor?: string;
}

/**
 * MediaGlow wraps content with a premium hardware-accelerated radial cursor light
 * that projects a soft spotlight glow overlay and a sharp, responsive border outline highlight.
 */
export default function MediaGlow({
  children,
  className = '',
  glowColor = 'rgba(16, 217, 111, 0.12)',
  borderColor = 'rgba(16, 217, 111, 0.35)',
}: MediaGlowProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top } = el.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const bgGradient = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      ${glowColor},
      transparent 80%
    )
  `;

  const borderGradient = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}px ${mouseY}px,
      ${borderColor},
      transparent 80%
    )
  `;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group/glow relative rounded-2xl border border-white/10 bg-surface-card overflow-hidden ${className}`}
    >
      {/* Soft spotlight overlay */}
      <m.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/glow:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: bgGradient,
          willChange: 'background',
        }}
      />
      
      {/* Sharp border glow line using a CSS mask */}
      <m.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover/glow:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: borderGradient,
          padding: '1px',
          maskImage: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
          WebkitMaskImage: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'destination-out',
          willChange: 'background',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
