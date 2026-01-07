"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { VisitorCounter } from "@/components/visitor-counter";
import { WisdomQuote } from "@/components/wisdom-quote";
import { DATA } from "@/data/resume";

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <footer
      ref={containerRef}
      className="relative w-full min-h-[500px] mt-24 overflow-hidden border-t border-zinc-900 group"
    >
      {/* The Pixel Art GIF Asset - Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0 h-[120%]" // Made slightly taller for parallax
      >
        <img
          src="/lofi.gif"
          className="w-full h-full object-cover object-bottom opacity-80"
          alt="Atmospheric Footer Background"
        />
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
      </motion.div>

      {/* Seamless Transition Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-black/40 to-transparent" />

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col items-center justify-end h-full w-full min-h-[500px] pb-12 text-center space-y-8">

        {/* Wisdom & Visitor Counter - Integrated into the sky/room */}
        <div className="flex flex-col items-center gap-4 mb-4">
          <WisdomQuote />
          <VisitorCounter />
        </div>

        {/* Footer Links */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            {Object.entries(DATA.contact.social).map(([key, social]) => {
              if (!social.navbar) return null;
              return (
                <Link
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-zinc-400 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {key}
                </Link>
              );
            })}
          </div>

          <p className="font-mono text-xs text-zinc-500 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Satyam
          </p>
        </div>
      </div>
    </footer>
  );
}

