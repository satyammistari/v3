"use client";

import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { VisitorCounter } from "@/components/visitor-counter";
import { WisdomQuote } from "@/components/wisdom-quote";

export function Footer() {
  return (
    <footer className="w-full py-12">
      <div className="max-w-[800px] mx-auto px-6 space-y-8">
        {/* Fused Wisdom & Visitor Section */}
        <div className="flex flex-col items-center justify-center space-y-3 pt-8 pb-4">
          <WisdomQuote />
          <VisitorCounter />
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col items-center space-y-4 pt-8 border-t border-white/10">
          <div className="flex items-center space-x-4">
            {Object.entries(DATA.contact.social).map(([key, social]) => {
              if (!social.navbar) return null;
              const Icon = social.icon;
              return (
                <Link
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glassmorphism border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
          <div className="text-center text-sm text-white/40">
            <p>
              Design & Developed by <span className="font-semibold text-white/60">Satyam</span>
            </p>
            <p className="mt-1">© {new Date().getFullYear()}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

