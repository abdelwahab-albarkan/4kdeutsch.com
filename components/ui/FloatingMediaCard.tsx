'use client';

import React, { useMemo, useRef } from 'react';
import Image from 'next/image';
import { m, useMotionValue, useSpring, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import MediaGlow from './MediaGlow';
import { useMediaParallax } from './MediaParallax';

interface FloatingMediaCardProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  rating?: number;
  depth?: 'background' | 'middle' | 'front';
  aspectRatio?: string; // e.g. 'aspect-[2/3]' (default) or 'aspect-video'
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * FloatingMediaCard represents a premium cinematic card with:
 * 1. Scroll-reveal entrance.
 * 2. Section-level mouse-parallax depth translation.
 * 3. Infinite periodic floating translation and rotation cycle.
 * 4. Local mouse interactive 3D tilt, spring scaling, spotlight overlay, and border glow.
 */
export default function FloatingMediaCard({
  src,
  alt,
  title,
  subtitle,
  rating,
  depth = 'middle',
  aspectRatio = 'aspect-[2/3]',
  className = '',
  sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw',
  priority = false,
}: FloatingMediaCardProps) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Grid-Level Parallax Translation based on depth layer
  const parallax = useMediaParallax(depth);

  // 2. Stable, staggered infinite floating movement parameters (staggered delay prevents lockstep motion)
  const floatParams = useMemo(() => {
    // Math.sin-based delay offsets
    const duration = 7 + Math.random() * 5; // 7s to 12s
    const delay = Math.random() * -12; // Start mid-cycle
    const floatRange = 6 + Math.random() * 8; // 6px to 14px
    const rotateRange = -2 + Math.random() * 4; // -2° to +2°
    return { duration, delay, floatRange, rotateRange };
  }, []);

  // 3. Local Card 3D Tilt Motion Values
  const localMouseX = useMotionValue(0);
  const localMouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20, mass: 0.4 };
  const tiltX = useSpring(localMouseX, springConfig);
  const tiltY = useSpring(localMouseY, springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative offset from center [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Apply tilt limit
    const maxTilt = 8; // Max tilt in degrees
    localMouseX.set(-relativeY * maxTilt); // Tilt around X-axis based on Y-mouse position
    localMouseY.set(relativeX * maxTilt);  // Tilt around Y-axis based on X-mouse position
  }

  function handleMouseLeave() {
    localMouseX.set(0);
    localMouseY.set(0);
  }

  // Scroll reveal variants — fade + scale only. The `y` axis is reserved for the
  // grid parallax motion value bound in `style` below, so animating `y` here too
  // would conflict on the same transform channel.
  const revealVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  // Construct depth-based z-index
  const zIndexMap = {
    background: 'z-0',
    middle: 'z-10',
    front: 'z-20',
  };

  return (
    <m.div
      ref={cardRef}
      variants={revealVariants}
      className={`relative select-none ${zIndexMap[depth]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        // Combine grid-level parallax and manual will-change optimization
        x: reduceMotion ? 0 : parallax.x,
        y: reduceMotion ? 0 : parallax.y,
        willChange: 'transform, opacity',
      }}
    >
      {/* Infinite Floating Cycle Wrapper */}
      <m.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -floatParams.floatRange, 0],
                rotate: [0, floatParams.rotateRange, 0],
              }
        }
        transition={{
          duration: floatParams.duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatParams.delay,
        }}
        style={{
          willChange: 'transform',
        }}
      >
        {/* Local 3D Hover Tilt & Scale Interactive Card */}
        <m.div
          style={{
            rotateX: reduceMotion ? 0 : tiltX,
            rotateY: reduceMotion ? 0 : tiltY,
            transformStyle: 'preserve-3d',
            transformPerspective: 900,
            willChange: 'transform',
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.05, translateZ: 10 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="group cursor-pointer"
        >
          <MediaGlow
            glowColor="rgba(16, 217, 111, 0.12)"
            borderColor="rgba(16, 217, 111, 0.45)"
            className="shadow-premium transition-all duration-300 border border-white/10 hover:border-primary-500/40"
          >
            {/* Poster Aspect Ratio Image Container */}
            <div className={`relative ${aspectRatio} w-full overflow-hidden bg-black/40`}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover transition-transform duration-500 hover:scale-102"
              />
              
              {/* Premium Top Light reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none mix-blend-overlay transition-opacity duration-300" />
              
              {/* Rating badge if provided */}
              {rating !== undefined && (
                <div 
                  className="absolute top-3 left-3 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs font-bold text-amber-400 backdrop-blur-sm shadow-sm z-20 border border-white/5"
                  style={{ transform: 'translateZ(15px)' }}
                >
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {rating.toFixed(1)}
                </div>
              )}

              {/* Text overlays for larger sizes or when title is provided */}
              {title && (
                <div 
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-12 flex flex-col justify-end z-20"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <h4 className="text-sm font-bold text-white leading-tight truncate group-hover:text-primary-500 transition-colors">
                    {title}
                  </h4>
                  {subtitle && (
                    <p className="text-xs text-gray-400 truncate mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </MediaGlow>
        </m.div>
      </m.div>
    </m.div>
  );
}
