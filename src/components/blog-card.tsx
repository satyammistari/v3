"use client";

import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  image?: string;
  tags?: string[];
  slug: string;
  readTime?: number;
}

export function BlogCard({ title, description, date, image, tags, slug, readTime }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden hover:bg-zinc-900 transition-all duration-300 group h-full flex flex-col shadow-xl hover:shadow-2xl hover:border-white/20 relative p-5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Icon + Title */}
        <div className="flex flex-row items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden bg-white/5 border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xl">📝</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white tracking-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-zinc-400 mb-5 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-2 py-0.5 bg-white/5 border-white/10 text-zinc-400 capitalize transition-colors group-hover:border-white/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
            <span>{date}</span>
            {readTime && (
              <>
                <span className="opacity-50">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{readTime} min</span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}




