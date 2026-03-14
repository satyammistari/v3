"use client";

import { TechLogoIcon } from "@/components/tech-logo-icon";
import { DATA } from "@/data/resume";
import { motion } from "framer-motion";
import { FileText, Send } from "lucide-react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { SpotifyWidget } from "@/components/spotify-widget";
import { PixelCat } from "@/components/pixel-cat";
import { FlipCard } from "@/components/flip-card";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="hero" className="pt-6 relative">
      {/* Floating Cat - Fixed Left Side */}
      <motion.div
        className="fixed left-8 top-1/2 -translate-y-1/2 cursor-pointer group z-50"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Link href="/magic" className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-1 group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/delusional-cat.gif"
              alt="Click for magic"
              width={64}
              height={64}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
          <span className="text-[9px] text-white/30 group-hover:text-white/50 transition-colors font-mono">
            magic ✨
          </span>
        </Link>
      </motion.div>

      {/* Hero Header: Avatar + Name/Title */}
      <div className="flex items-start gap-5 py-16">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          <div className="bg-yellow-400 rounded-xl border border-white/10 overflow-hidden">
            <FlipCard
              frontImage="/me.png"
              backImage="/goku.gif"
              alt="Satyam"
              size={80}
            />
          </div>
        </motion.div>

        {/* Name + Title + Bio */}
        <div className="flex-1 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                {DATA.name}
              </h1>
              {/* Verified badge style */}
              <span className="text-xs text-white/40 font-mono border border-white/10 rounded px-1.5 py-0.5">
                Engineer
              </span>
            </div>
            <p className="text-sm text-white/50 font-mono">
              A{" "}
              <span className="text-white/90 gold-underline">
                ML &amp; MLOps Engineer
              </span>{" "}
              building intelligent systems &amp; infra.
            </p>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {Object.entries(DATA.contact.social).map(([key, social]) => {
              if (!social.navbar) return null;
              const Icon = social.icon;
              return (
                <Link
                  key={key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/35 hover:text-white/80 transition-colors"
                  title={key}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              );
            })}
            {/* Resume link */}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 hover:text-white/80 transition-colors"
              title="Resume"
            >
              <FileText className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-shrink-0 hidden sm:flex"
        >
          <Link
            href="mailto:mistarisatyam@gmail.com"
            className="flex items-center gap-2 text-xs font-mono border border-white/15 rounded-full px-4 py-2 text-white/60 hover:text-white hover:border-white/30 transition-all"
          >
            <Send className="w-3 h-3" />
            get in touch
          </Link>
        </motion.div>
      </div>

      {/* Full bio paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="text-sm text-white/55 leading-relaxed -mt-8 mb-8"
      >
        {DATA.description}
      </motion.p>

      {/* Tech Logos */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="flex flex-wrap gap-2 mb-12"
      >
        <TechLogoIcon
          name="PyTorch"
          logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg"
        />
        <TechLogoIcon
          name="TensorFlow"
          logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
        />
        <TechLogoIcon
          name="Hugging Face"
          logo="https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
        />
        <TechLogoIcon
          name="OpenCV"
          logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg"
        />
        <TechLogoIcon
          name="AWS"
          logo="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
        />
        <TechLogoIcon
          name="Docker"
          logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
        />
      </motion.div>

      {/* Spotify Widget */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="relative"
      >
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <PixelCat />
        </div>
        <SpotifyWidget />
      </motion.div>
    </section>
  );
}
