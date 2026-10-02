'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform, type MotionValue, useReducedMotion } from 'framer-motion';

interface MediaParallaxContextProps {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  enabled: boolean;
}

const MediaParallaxContext = createContext<MediaParallaxContextProps | null>(null);

/**
 * MediaParallaxProvider tracks pointer movement across a layout/grid container
 * and exposes normalized pointer coordinates to all parallax elements inside it.
 */
export function MediaParallaxProvider({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    const handlePointerMove = (e: PointerEvent) => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = 0;
        const rect = container.getBoundingClientRect();
        // Calculate normalized offset from center: [-0.5, 0.5]
        const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
        mx.set(relativeX);
        my.set(relativeY);
      });
    };

    const handlePointerLeave = () => {
      mx.set(0);
      my.set(0);
    };

    // Listen globally for smoother mouse tracking outside boundaries
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [mx, my, reduceMotion]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <MediaParallaxContext.Provider value={{ mx, my, enabled: !reduceMotion }}>
        {children}
      </MediaParallaxContext.Provider>
    </div>
  );
}

/**
 * useMediaParallax computes spring-smoothed translation offsets (x, y)
 * based on the depth layer specified (front, middle, background).
 */
export function useMediaParallax(strength: number | 'background' | 'middle' | 'front') {
  const context = useContext(MediaParallaxContext);
  const fallback = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  let finalStrength = 0;
  if (typeof strength === 'number') {
    finalStrength = strength;
  } else {
    switch (strength) {
      case 'front':
        finalStrength = 35; // Largest movement
        break;
      case 'middle':
        finalStrength = 18; // Medium movement
        break;
      case 'background':
        finalStrength = 6;  // Subtle background shift
        break;
    }
  }

  const mx = context?.mx ?? fallback;
  const my = context?.my ?? fallback;

  // Use a premium spring config for buttery smooth cinematic motion
  const springConfig = { stiffness: 90, damping: 22, mass: 0.3 };
  
  const rawX = useTransform(mx, (v) => v * finalStrength);
  const rawY = useTransform(my, (v) => v * finalStrength);

  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  return { x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y };
}
