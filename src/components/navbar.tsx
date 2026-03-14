"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-between h-14" />
        </div>
      </nav>
    );
  }

  const linkClass = (active: boolean) =>
    `text-sm transition-colors font-mono tracking-wide ${active ? "text-white" : "text-white/45 hover:text-white/80"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left: Text links */}
          <div className="flex items-center gap-6">
            <Link href="/" className={linkClass(pathname === "/")}>
              home
            </Link>
            <Link href="/#projects" className={linkClass(false)}>
              projects
            </Link>
            <Link href="/blog" className={linkClass(pathname === "/blog")}>
              blogs
            </Link>
          </div>

          {/* Right: Theme toggle */}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
