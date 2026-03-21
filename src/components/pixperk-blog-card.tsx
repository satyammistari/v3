"use client";

import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PixperkBlogCardProps {
  title: string;
  description: string;
  date: string;
  image?: string;
  tags?: string[];
  slug: string;
  readTime?: number;
  featured?: boolean;
}

const TAG_COLORS: Record<string, string> = {
  Python: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Machine Learning": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Deep Learning": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  AI: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  MLOps: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  PyTorch: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  TensorFlow: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  NLP: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Computer Vision": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Go: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Rust: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Backend: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Auth: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  gRPC: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Docker: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  AWS: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Data: "bg-green-500/20 text-green-300 border-green-500/30",
};

function getTagColor(tag: string): string {
  return TAG_COLORS[tag] || "bg-violet-500/20 text-violet-300 border-violet-500/30";
}

export function PixperkBlogCard({
  title,
  description,
  date,
  image,
  tags,
  slug,
  readTime,
  featured = false,
}: PixperkBlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={`group block rounded-xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-[#0f0f0f] ${
        featured ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      {/* Cover Image */}
      <div
        className={`relative w-full overflow-hidden bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent ${
          featured ? "h-56 md:h-72" : "h-44"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-30">📝</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category Pills */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${getTagColor(
                  tag
                )} transition-colors`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          className={`font-bold tracking-tight text-white/90 group-hover:text-white transition-colors leading-snug ${
            featured ? "text-xl md:text-2xl" : "text-[15px]"
          }`}
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Footer: Date & Read Time */}
        <div className="flex items-center gap-3 pt-2 text-white/30 text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
          {readTime && (
            <>
              <span className="opacity-50">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <span>{readTime} min read</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
