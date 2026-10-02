import React from 'react';
import { PenLine } from 'lucide-react';

/** Neutral icon avatar for the editorial byline (no person photos). */
export default function AuthorAvatar({ size = 40 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-500"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <PenLine style={{ width: size * 0.45, height: size * 0.45 }} strokeWidth={2} />
    </div>
  );
}
