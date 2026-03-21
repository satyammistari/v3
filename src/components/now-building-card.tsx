"use client";

import Link from "next/link";

interface NowBuildingCardProps {
  title: string;
  description: string;
  technologies: string[];
  progress: number;
  href?: string;
}

export function NowBuildingCard({
  title,
  description,
  technologies,
  progress,
  href,
}: NowBuildingCardProps) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href
    ? { href, className: "block group" }
    : { className: "block group" };

  return (
    <Wrapper {...(wrapperProps as any)}>
      <div className="relative rounded-xl border border-amber-500/20 bg-[#0a0a0a] p-6 overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:bg-[#0f0f0f]">
        {/* Decorative dots */}
        <div className="absolute top-4 right-12 w-2 h-2 rounded-full bg-amber-400/60" />
        <div className="absolute top-5 right-8 w-1.5 h-1.5 rounded-full bg-amber-400/30" />

        {/* Label */}
        <div className="text-xs font-semibold tracking-widest text-amber-500/80 uppercase mb-4">
          Building
        </div>

        {/* Project Title */}
        <h3
          className="text-xl font-bold text-white/90 mb-2 group-hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/40 leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300/80 border border-amber-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-amber-400/70">
            {progress}%
          </span>
        </div>
      </div>
    </Wrapper>
  );
}
