'use client';

import React from 'react';
import { m } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <m.div
      initial={{ y: 15 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex-grow flex flex-col"
    >
      {children}
    </m.div>
  );
}
