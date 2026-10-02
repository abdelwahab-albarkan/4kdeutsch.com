import React from 'react';
import AuthorAvatar from '@/components/blog/AuthorAvatar';

interface AuthorCardProps {
  name: string;
  role: string;
  avatar?: string;
}

export default function AuthorCard({ name, role }: AuthorCardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl border border-border-subtle bg-surface-card/60 items-center sm:items-start text-center sm:text-left">
      <AuthorAvatar size={64} />
      <div>
        <h4 className="text-base font-bold text-white mb-1">{name}</h4>
        <p className="text-xs text-primary-500 font-semibold mb-3">{role}</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          Anleitungen und Ratgeber rund um IPTV, Geräte und Einrichtung von 4kdeutsch.
        </p>
      </div>
    </div>
  );
}
