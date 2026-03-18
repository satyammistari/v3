"use client";

import { Icons } from "@/components/icons";
import { TechBadge } from "@/components/tech-badge";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LANG_ICONS: Record<string, string> = {
  Python: "🐍",
  TypeScript: "📘",
  JavaScript: "🟨",
  Rust: "🦀",
  Go: "🐹",
  "C++": "⚙️",
  C: "🔧",
  Java: "☕",
  HTML: "🌐",
  CSS: "🎨",
  Shell: "🐚",
  Ruby: "💎",
  MLOps: "🤖",
  SQL: "🗄️",
  LLM: "🧠",
  AWS: "☁️",
  Docker: "🐳",
};

function getProjectEmoji(technologies: string[]): string {
  for (const tech of technologies) {
    if (LANG_ICONS[tech]) return LANG_ICONS[tech];
  }
  return "🚀";
}

interface EnhancedProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  href?: string;
  image?: string;
  video?: string;
  status?: "operational" | "development";
  links?: {
    type: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export function EnhancedProjectCard({
  title,
  description,
  technologies,
  href,
  image,
  video,
  status = "operational",
  links,
}: EnhancedProjectCardProps) {
  return (
    <div className="bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden hover:bg-zinc-900 transition-all duration-300 group h-full flex flex-col shadow-xl hover:shadow-2xl hover:border-white/20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="p-6 flex-1 flex flex-col relative z-10">
        <div className="flex flex-row items-center gap-4 mb-5">
          <div className="relative w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden bg-white/5 border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                <span className="text-2xl drop-shadow-sm">{getProjectEmoji(technologies)}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white tracking-tight truncate group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <div className="flex items-center space-x-3 mt-1.5">
              {links?.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 6).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>

        {/* Status & View Details */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-500/90 tracking-wide">
              Live
            </span>
          </div>
          {href && (
            <Link
              href={href}
              className="group/btn flex items-center space-x-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <span>View Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:text-blue-400 transition-all" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
