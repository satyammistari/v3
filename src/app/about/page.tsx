import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import BlurFade from "@/components/magicui/blur-fade";

export const metadata = {
  title: "About | Satyam Mistari",
  description: "The journey, the tools, and the philosophy behind what I build.",
};

const BLUR_FADE_DELAY = 0.04;

export default function AboutPage() {
  return (
    <div className="w-full max-w-7xl mx-auto pb-24 pt-4 px-4 sm:px-6 md:px-8">
      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-14">
          <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase mb-4">
            About
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-white/90 mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            About Me
          </h1>
          <p className="text-xl text-white/40 max-w-2xl leading-relaxed">
            The journey, the tools, and the philosophy behind what I build.
          </p>
        </div>
      </BlurFade>

      <div className="flex flex-col gap-16 relative mt-10">
        
        {/* Horizontal Profile Header */}
        <BlurFade delay={BLUR_FADE_DELAY * 2} className="w-full">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl md:rounded-full overflow-hidden bg-black border border-white/10 shadow-2xl flex-shrink-0">
              <Image
                src={DATA.avatarUrl}
                alt={DATA.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-white/90 font-medium text-2xl md:text-3xl">{DATA.name.toLowerCase()}</h2>
                  <p className="text-white/40 italic text-lg mt-1" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                    engineering my way through
                  </p>
                  <p className="text-white/30 text-xs font-mono uppercase mt-3 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    {DATA.location}
                  </p>
                </div>

                <Link href="/hi" className="group hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all hover:scale-[1.02]">
                  <span className="text-sm font-medium text-white/80">View at a glance</span>
                  <span className="text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all">→</span>
                </Link>
              </div>
              
              <div className="pt-6 mt-6 flex flex-wrap gap-4 border-t border-white/5">
                {DATA.contact.social.GitHub?.url && (
                  <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noreferrer" className="text-sm px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white/90 hover:bg-white/10 hover:border-white/10 transition-all">
                    GitHub
                  </a>
                )}
                {((DATA.contact.social as any).X?.url || (DATA.contact.social as any).Twitter?.url) && (
                  <a href={(DATA.contact.social as any).X?.url || (DATA.contact.social as any).Twitter?.url} target="_blank" rel="noreferrer" className="text-sm px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white/90 hover:bg-white/10 hover:border-white/10 transition-all">
                    Twitter
                  </a>
                )}
                {(DATA.contact.social as any).LinkedIn?.url && (
                  <a href={(DATA.contact.social as any).LinkedIn?.url} target="_blank" rel="noreferrer" className="text-sm px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white/90 hover:bg-white/10 hover:border-white/10 transition-all">
                    LinkedIn
                  </a>
                )}
                <Link href="/hi" className="group md:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                  <span className="text-sm font-medium text-white/80">Glance</span>
                  <span className="text-white/40 group-hover:translate-x-0.5 transition-all">→</span>
                </Link>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Content Flow */}
        <div className="flex-1 space-y-20">
          
          {/* My Journey Section */}
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <section className="space-y-6 max-w-4xl">
              <h2 
                className="text-3xl font-bold text-white/90 mb-8" 
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                My Journey
              </h2>
              
              <div className="space-y-6 text-white/60 leading-relaxed text-base md:text-lg">
                <p>
                  Programming wasn&apos;t just a hobby; it quickly became an obsession. The idea of taking an abstract concept and engineering it into a functional, scalable system from nothing was fascinating. My early exposure to structural coding evolved into a deep dive into backend development and artificial intelligence.
                </p>
                <p>
                  From there, I dove into robust architectures, building everything from a Recursive Episodic Memory (REM) framework for autonomous agents to a high-performance MLOps pipeline using ZenML and BentoML. I started documenting my learnings and open-source projects, focusing on clarity over cleverness.
                </p>
                <p>
                  Today, I&apos;m focused on distributed systems, AI infrastructure, and building extremely fast APIs. I believe in continuous learning, breaking things down to first principles, and sharing knowledge through code.
                </p>
                <p>
                  I&apos;m always open to new opportunities, collaborations, and discussions about complex scalable architectures. If you&apos;re building something interesting, feel free to reach out!
                </p>
              </div>
            </section>
          </BlurFade>

          {/* Stack & Style Section */}
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <section className="space-y-8">
              <div className="mb-8">
                <h2 
                  className="text-3xl font-bold text-white/90 mb-4" 
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Stack & Style
                </h2>
                <p className="text-base md:text-lg text-white/50 leading-relaxed">
                  I believe in choosing the right tool for the job, but these are the technologies I&apos;m currently most excited about and experienced with:
                </p>
              </div>

              <div className="space-y-8 divide-y divide-white/5 border-t border-white/5 pt-2">
                
                {/* AI & ML */}
                <div className="pt-6 first:pt-0">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">
                    AI & Machine Learning
                  </h3>
                  <p className="text-base md:text-lg text-white/70">
                    PyTorch, TensorFlow, Scikit-learn, LangChain, OpenAI APIs, Computer Vision, MLOps (ZenML, BentoML)
                  </p>
                </div>

                {/* Backend & Systems */}
                <div className="pt-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">
                    Backend & Systems
                  </h3>
                  <p className="text-base md:text-lg text-white/70">
                    Python, Go, Rust, TypeScript, Node.js, FastAPI, Flask, C++
                  </p>
                </div>

                {/* Data & Storage */}
                <div className="pt-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">
                    Data & Storage
                  </h3>
                  <p className="text-base md:text-lg text-white/70">
                    PostgreSQL, MySQL, Redis, MongoDB, Vector Databases, ORMs
                  </p>
                </div>

                {/* Infrastructure */}
                <div className="pt-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">
                    Infrastructure & Ops
                  </h3>
                  <p className="text-base md:text-lg text-white/70">
                    Docker, Kubernetes, AWS, GCP, CI/CD, GitHub Actions
                  </p>
                </div>

                {/* Frontend */}
                <div className="pt-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">
                    Frontend
                  </h3>
                  <p className="text-base md:text-lg text-white/70">
                    React, Next.js, Tailwind CSS, TypeScript
                  </p>
                </div>

              </div>
            </section>
          </BlurFade>

          {/* Philosophy Section */}
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <section className="space-y-6 pt-10 border-t border-white/5">
              <h2 
                className="text-3xl font-bold text-white/90 mb-8" 
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Philosophy
              </h2>
              
              <div className="space-y-6 text-white/60 leading-relaxed text-base md:text-lg mb-12">
                <p>
                  I approach software engineering as a craft that requires rigorous problem-solving. While I appreciate elegant code, I never lose sight of system reliability and the end-user impact. 
                </p>
                <p>
                  I believe in writing clean, maintainable architecture. I also love breaking systems intentionally to understand failure modes, and rebuilding them stronger. 
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-white/80 font-medium text-base mb-3">Deep Understanding</h4>
                  <p className="text-base text-white/50 leading-relaxed">Knowing not just how to use a technology, but structurally how it works underneath.</p>
                </div>
                <div>
                  <h4 className="text-white/80 font-medium text-base mb-3">Pragmatic Solutions</h4>
                  <p className="text-base text-white/50 leading-relaxed">Choosing clarity over cleverness, and simplicity over unnecessary complexity.</p>
                </div>
                <div>
                  <h4 className="text-white/80 font-medium text-base mb-3">Continuous Learning</h4>
                  <p className="text-base text-white/50 leading-relaxed">Staying curious in a rapidly evolving field of AI and distributed systems.</p>
                </div>
                <div>
                  <h4 className="text-white/80 font-medium text-base mb-3">Systematic Build</h4>
                  <p className="text-base text-white/50 leading-relaxed">Engineering systems that scale predictably and fail gracefully.</p>
                </div>
              </div>
            </section>
          </BlurFade>

        </div>
      </div>
      
      {/* Footer copyright */}
      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          <p>© {new Date().getFullYear()} {DATA.name}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
