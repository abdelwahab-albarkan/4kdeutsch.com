'use client';

import React from 'react';

/**
 * Isolates non-critical widgets (analytics, cookie banner, decorative effects).
 * If a wrapped widget throws during render/hydration — a real risk in Facebook /
 * Instagram in-app browsers — this renders `fallback` (null by default) so the
 * rest of the page keeps working instead of going blank.
 */
export default class SafeBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Log for monitoring; never rethrow.
    console.error('SafeBoundary caught a non-critical widget error:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
