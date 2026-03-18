"use client";

import { Badge } from "@/components/ui/badge";
import { Globe, Bookmark, FileText, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PublicationCardProps {
  title: string;
  venue: string;
  year: string;
  status?: string;
  tags: string[];
  paperUrl?: string;
  arxivUrl?: string;
  codeUrl?: string;
  details?: string;
}

export function PublicationCard({
  title,
  venue,
  year,
  status = "Published",
  tags,
  paperUrl,
  arxivUrl,
  codeUrl,
  details,
}: PublicationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div 
      className={`p-5 bg-[#111111] border border-white/10 rounded-lg hover:bg-[#151515] hover:border-white/20 transition-all group cursor-pointer ${isExpanded ? 'ring-1 ring-amber-500/30' : ''}`}
      onClick={() => details && setIsExpanded(!isExpanded)}
    >
      <div className="space-y-4">
        {/* Title & Venue */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-base font-bold text-white leading-tight mb-2">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <span className="font-bold text-white/80">{venue}</span>
              {venue && <span>•</span>}
              <span>{year}</span>
              {status !== "Published" && (
                <>
                  <span>•</span>
                  <Badge className={`px-2 py-0 text-[10px] ${
                    status === "Publish Soon"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-green-500/10 text-green-500 border-green-500/20"
                  }`}>
                    {status}
                  </Badge>
                </>
              )}
            </div>
          </div>
          {details && (
            <div className="text-white/40 pt-1">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          )}
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && details && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pb-1 text-sm text-white/60 border-t border-white/5 pt-3 leading-relaxed italic">
                {details}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="px-2.5 py-1 text-[11px] bg-white/5 border-white/10 text-white/70 font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1" onClick={(e) => e.stopPropagation()}>
          {paperUrl && (
            <Link
              href={paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <Globe className="w-4 h-4" />
            </Link>
          )}
          {arxivUrl && (
            <Link
              href={arxivUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <FileText className="w-4 h-4" />
            </Link>
          )}
          {codeUrl && (
            <Link
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
