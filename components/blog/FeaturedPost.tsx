import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/mongodb';
import AuthorAvatar from '@/components/blog/AuthorAvatar';

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="relative rounded-2xl border border-border-subtle bg-surface-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
      {/* Cover Image Frame */}
      <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-7 bg-black/20 w-full min-h-[300px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>

      {/* Info Column */}
      <div className="p-6 md:p-8 lg:p-12 lg:col-span-5 flex flex-col justify-center">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-semibold uppercase tracking-wider">
          <span className="text-primary-500">{post.category}</span>
          <span>&bull;</span>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4 hover:text-primary-500 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 line-clamp-4">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 border-t border-border-subtle/50 pt-6">
          <AuthorAvatar size={40} />
          <div>
            <div className="text-sm font-bold text-white">{post.authorName}</div>
            <div className="text-xs text-gray-500">{post.publishedAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
