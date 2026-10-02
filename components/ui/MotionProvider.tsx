'use client';

import React from 'react';
import { LazyMotion } from 'framer-motion';

const loadFeatures = () => import('./motion-features').then((mod) => mod.default);

/** Provides framer-motion features asynchronously (`m` components animate once loaded). */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
