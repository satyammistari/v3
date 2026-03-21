"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface LatestWritingSectionProps {
  title: string;
  description: string;
  slug: string;
  mediumUrl?: string;
}

export function LatestWritingSection({
  title,
  description,
  slug,
  mediumUrl,
}: LatestWritingSectionProps) {
  return (
    <div className="space-y-4 py-4">
      {/* Label */}
      <div className="text-xs font-semibold tracking-widest text-white/30 uppercase">
        Latest Writing
      </div>

      {/* Title */}
      <h3
        className="text-2xl md:text-3xl font-bold text-white/85 tracking-tight leading-tight"
        style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-base text-white/40 leading-relaxed max-w-2xl">
        {description}
      </p>

      {/* Read More Link */}
      <Link
        href={`/blog/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors group/link pt-1"
      >
        <span>Read more</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
