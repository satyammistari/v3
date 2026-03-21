import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Mail, Github, Twitter, Linkedin, PenTool, ExternalLink } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";

export const metadata = {
  title: "Glance | Satyam Mistari",
  description: "Quick introduction to Satyam Mistari - AI/ML Engineer.",
};

const BLUR_FADE_DELAY = 0.04;

function SectionHeader({ title, highlight }: { title: string; highlight: string }) {
  return (
    <h2 className="text-lg text-white/80 mb-4" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
      {title} <span className="font-bold text-white">{highlight}</span>
    </h2>
  );
}

export default function HiPage() {
  return (
    <div className="w-full max-w-xl mx-auto pb-24 pt-4">
      <BlurFade delay={BLUR_FADE_DELAY}>
        {/* Profile Header Card */}
        <div className="group relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden mb-8 transition-all hover:border-white/[0.15] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)]">
          {/* Cover Image */}
          <div className="h-48 sm:h-56 w-full relative bg-gradient-to-r from-violet-600/10 via-blue-500/10 to-cyan-400/10">
            <Image 
              src="/operate-shadows.jpg" 
              alt="Operate in the Shadows" 
              fill 
              priority
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
            />
            {/* Subtle bottom gradient to blend image into background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
          </div>
          
          <div className="px-6 pb-6 relative">
            {/* Profile Avatar (Overlapping) */}
            <div className="absolute -top-12 left-6">
              <div className="relative w-24 h-24 rounded-2xl border-4 border-[#0a0a0a] bg-black overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-14 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-1" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  {DATA.name.split(" ")[0]} <span className="text-white/80">{DATA.name.split(" ")[1]}</span>
                </h1>
                <p className="text-sm text-white/50">@satyammistari</p>
                <p className="text-xs text-white/30 mt-1">Systems & AI/ML</p>
              </div>
              <a 
                href={(DATA.contact.social as any).Resume?.url || DATA.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/20 transition-all text-white/60 hover:text-white"
              >
                <ExternalLink className="w-3 h-3" />
                Resume
              </a>
            </div>

            {/* Bio */}
            <p className="text-sm text-white/70 leading-relaxed mt-5">
              {DATA.description} I obsess over clean architecture, robust machine learning pipelines, and building systems that scale.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Link 
                href="/about" 
                className="relative flex-1 flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 text-white text-sm font-medium py-2.5 transition-all hover:shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-0 transition-opacity hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-base">👋</span> Let&apos;s talk
                </span>
              </Link>
              <a 
                href={`mailto:${DATA.contact.email}`} 
                className="flex-1 flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white/90 text-sm font-medium py-2.5 rounded-xl transition-colors hover:border-white/20"
              >
                <Mail className="w-4 h-4" /> Drop a mail
              </a>
            </div>
          </div>
        </div>
      </BlurFade>
      {/* Inline styles for Marquee and EQ animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .pause-on-hover:hover { animation-play-state: paused; }
        @keyframes eq { 0%, 100% { height: 4px; } 50% { height: 16px; } }
        .animate-eq-1 { animation: eq 1s ease-in-out infinite; }
        .animate-eq-2 { animation: eq 0.8s ease-in-out infinite 0.2s; }
        .animate-eq-3 { animation: eq 1.2s ease-in-out infinite 0.4s; }
        .animate-eq-4 { animation: eq 0.9s ease-in-out infinite 0.1s; }
      `}} />

      {/* Social Links & Widgets Bento Grid */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="mb-10 flex flex-col gap-4">
          <SectionHeader title="Find me on the" highlight="internet" />
          
          <div className="flex flex-wrap gap-2.5 mb-2">
            {Object.entries(DATA.contact.social).filter(([name]) => name !== "Email").map(([name, social]) => {
              let Icon = Github;
              if (name === "X" || name === "Twitter") Icon = Twitter;
              if (name === "LinkedIn") Icon = Linkedin;
              
              return (
                <a
                  key={name}
                  href={social.url as string}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-[#0a0a0a] hover:bg-white/5 hover:border-white/15 transition-all text-sm text-white/60 hover:text-white/90"
                >
                  <Icon className="w-4 h-4" />
                  {name}
                </a>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location & Time Widget */}
            <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0a0a0a] flex items-center gap-4 hover:border-white/[0.15] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50" />
              <div className="relative w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="relative">
                <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">Status</p>
                <h3 className="text-white/90 font-medium text-sm">Online & Building</h3>
                <p className="text-white/50 text-xs mt-0.5">{DATA.location} • Local Time {new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            {/* Spotify "Now Playing" Widget */}
            <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0a0a0a] flex items-center justify-between hover:border-white/[0.15] transition-colors relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-full h-full bg-green-500/5 transition-opacity group-hover:opacity-100 opacity-0" />
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#111] overflow-hidden flex-shrink-0 relative shadow-md">
                   {/* Fallback mock album cover using gradients */}
                   <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black p-2 flex items-center justify-center">
                     <div className="w-4 h-4 rounded-full border-[3px] border-white/20" />
                   </div>
                </div>
                <div>
                  <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
                    <svg className="w-3 h-3 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.9c.42.18.6.78.3 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                    Listening to
                  </p>
                  <h3 className="text-white/90 font-medium text-sm">Operate in the Shadows</h3>
                  <p className="text-white/50 text-xs mt-0.5">Deep Focus</p>
                </div>
              </div>
              <div className="relative flex items-end gap-[3px] h-4">
                 <div className="w-[3px] bg-green-500 rounded-full animate-eq-1" />
                 <div className="w-[3px] bg-green-500 rounded-full animate-eq-2" />
                 <div className="w-[3px] bg-green-500 rounded-full animate-eq-3" />
                 <div className="w-[3px] bg-green-500 rounded-full animate-eq-4" />
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Toolkit Marquee */}
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="mb-12">
          <SectionHeader title="My everyday" highlight="toolkit" />
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] py-5">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-max animate-marquee pause-on-hover">
              {/* Duplicate the list twice to create smooth infinite scroll */}
              <div className="flex w-max gap-4 pr-4">
                {DATA.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] text-white/70 text-sm font-medium whitespace-nowrap">
                    {skill}
                  </div>
                ))}
              </div>
              <div className="flex w-max gap-4 pr-4">
                {DATA.skills.map((skill) => (
                  <div key={`${skill}-dup`} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] text-white/70 text-sm font-medium whitespace-nowrap">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Experience Timeline */}
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-blue-500 rounded-full" />
            <SectionHeader title="Where I've" highlight="worked" />
          </div>
          
          <div className="space-y-3">
            {DATA.work.slice(0, 3).map((job, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/[0.08] bg-[#0a0a0a] flex justify-between items-center group hover:border-white/[0.15] transition-colors">
                <div>
                  <h3 className="text-white/90 font-medium text-sm flex items-center gap-2">
                    {job.company} 
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/40 border border-white/10 group-hover:bg-white/10">
                      {job.title}
                    </span>
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50">{job.start} - {job.end}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{job.location}</p>
                </div>
              </div>
            ))}
            <Link href="/about" className="block text-center mt-2 w-full py-3 rounded-xl bg-[#0a0a0a] border border-white/[0.08] hover:bg-white/5 hover:border-white/10 transition-colors text-sm text-blue-400 group">
              View full experience <ExternalLink className="inline w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </BlurFade>

      {/* Featured Projects */}
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-cyan-500 rounded-full" />
            <SectionHeader title="Things I've" highlight="built" />
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors">
              <h3 className="text-white/90 font-bold mb-2">REM (Recursive Episodic Memory)</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                A novel architecture for autonomous agents that recursively stores and retrieves episodic experiences. Built from scratch.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors">
              <h3 className="text-white/90 font-bold mb-2">End-to-End MLOps Pipeline</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Full-stack pipeline for an AI support agent with automated retraining, monitoring, and deployment using ZenML.
              </p>
            </div>

            <Link href="/projects" className="block text-center mt-2 w-full py-3 rounded-xl bg-[#0a0a0a] border border-white/[0.08] hover:bg-white/5 hover:border-white/10 transition-colors text-sm text-cyan-400 group">
              Explore all projects <ExternalLink className="inline w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </BlurFade>

      {/* Footer */}
      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <div className="text-center pt-8 border-t border-white/5">
          <p className="text-xs text-white/30 italic mb-4">"curiosity drives purpose"</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="text-white/50 hover:text-white/90 transition-colors">Explore the full experience</Link>
          </div>
          <p className="text-xs text-white/20 mt-8">crafted with curiosity — @satyammistari</p>
        </div>
      </BlurFade>
    </div>
  );
}
