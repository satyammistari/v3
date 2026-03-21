"use client";

import { Star, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";

const LANG_COLORS: Record<string, string> = {
  Python: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  TypeScript: "bg-blue-600/20 text-blue-300 border-blue-600/30",
  JavaScript: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Rust: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Go: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "C++": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  C: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  Java: "bg-red-500/20 text-red-300 border-red-500/30",
  Jupyter: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

function getLangColor(lang: string): string {
  return LANG_COLORS[lang] || "bg-violet-500/20 text-violet-300 border-violet-500/30";
}

interface PixperkProjectCardProps {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  href?: string;
  githubUrl?: string;
  stars?: number;
}

export function PixperkProjectCard({
  title,
  description,
  image,
  technologies,
  href,
  githubUrl,
  stars,
}: PixperkProjectCardProps) {
  return (
    <Link
      href={href || githubUrl || "#"}
      className="group block rounded-xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:bg-[#0f0f0f]"
    >
      {/* Cover Image */}
      <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-blue-500/10">
            <span className="text-4xl opacity-20">🚀</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />

        {/* GitHub icon overlay */}
        {githubUrl && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Tech Pills */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${getLangColor(
                  tech
                )}`}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          className="text-[15px] font-bold tracking-tight text-white/90 group-hover:text-white transition-colors leading-snug"
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 text-white/30 text-xs">
          <div className="flex items-center gap-3">
            {stars !== undefined && stars > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400/60" />
                <span>{stars}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-white/30 group-hover:text-white/60 transition-colors">
            <span>View</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
