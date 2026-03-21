import { BentoCard } from "@/components/bento-card";
import { NowBuildingCard } from "@/components/now-building-card";
import { LatestWritingSection } from "@/components/latest-writing-section";
import { PixperkProjectCard } from "@/components/pixperk-project-card";
import { ExperienceCard } from "@/components/experience-card";
import { Footer } from "@/components/footer";
import { GitHubHeatmap } from "@/components/github-heatmap-live";
import { CategorizedSkills } from "@/components/categorized-skills";
import { PublicationCard } from "@/components/publication-card";
import { ResearchProjectCard } from "@/components/research-project-card";
import { OpenSourceStats } from "@/components/opensource-stats";
import { SpotifyWidget } from "@/components/spotify-widget";
import { DATA } from "@/data/resume";
import { fetchMediumPosts } from "@/lib/medium-service";
import { BookOpen, Film, FileText, Settings, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SectionsWrapper } from "@/components/sections-wrapper";
import { Badge } from "@/components/ui/badge";
import { GitHubContributionsSection } from "@/components/github-contributions-section";

async function getTopProjects() {
  try {
    const res = await fetch("https://api.github.com/users/satyammistari/repos?per_page=100&sort=updated", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const repos = await res.json();
    const featured = ["End-to-End-Support-Agent-MLOps-", "REM", "RUST-CHASH", "ML-Math"];
    return repos
      .filter((repo: any) => featured.includes(repo.name))
      .sort((a: any, b: any) => featured.indexOf(a.name) - featured.indexOf(b.name));
  } catch {
    return [];
  }
}

const PROJECT_DATA: Record<string, { description: string; image: string }> = {
  "End-to-End-Support-Agent-MLOps-": {
    description: "A full-stack MLOps pipeline for an AI support agent, featuring automated retraining and deployment.",
    image: "/projects/kid.jpg",
  },
  REM: {
    description: "Recursive Episodic Memory for autonomous agents, enabling long-term memory retrieval.",
    image: "/projects/collage.jpg",
  },
  "RUST-CHASH": {
    description: "High-performance consistent hashing in Rust for distributed systems.",
    image: "/projects/casey_sign.jpg",
  },
  "ML-Math": {
    description: "Core mathematical concepts for ML implemented from scratch.",
    image: "/projects/casey_diagram.jpg",
  },
};

export default async function Page() {
  const posts = await fetchMediumPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;
  const repos = await getTopProjects();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full mx-auto py-12 space-y-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Categorized Skills */}
        <section id="skills">
          <SectionsWrapper>
            <div className="border-b border-white/10 pb-2 mb-6">
              <h2 className="text-2xl font-bold tracking-tight section-hash">Skills</h2>
            </div>
            <CategorizedSkills />
          </SectionsWrapper>
        </section>

        {/* Academic Publications */}
        <section id="publications">
          <SectionsWrapper>
            <div className="border-b border-white/10 pb-2 mb-6">
              <h2 className="text-2xl font-bold tracking-tight section-hash">Publications</h2>
            </div>
            <div className="space-y-4">
              <PublicationCard
                title="Recursive Episodic Memory (REM)"
                venue=""
                year="2023"
                status="Publish Soon"
                tags={["Long-term Memory", "Recursive Retrieval", "Episodic Memory"]}
                paperUrl="https://arxiv.org"
                arxivUrl="https://arxiv.org"
                codeUrl="https://github.com"
                details="REM (Recursive Episodic Memory) is a novel architecture for autonomous agents that recursively stores and retrieves episodic experiences. By organizing memories into a hierarchical structure, REM enables agents to handle long-term dependencies and maintain coherence over extended task horizons, overcoming the limitations of fixed-length context windows in large language models."
              />
            </div>
          </SectionsWrapper>
        </section>

        {/* Research Projects */}
        <section id="research">
          <SectionsWrapper>
            <div className="border-b border-white/10 pb-2 mb-6">
              <h2 className="text-2xl font-bold tracking-tight section-hash">Research</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <ResearchProjectCard
                title="Recursive Episodic Memory (REM)"
                description="Long-term memory for autonomous agents using recursive retrieval."
                metric="Significant improvement in long-term coherence"
                tags={["Long-term Memory", "Recursive Retrieval", "Episodic Memory"]}
                demoUrl="https://demo.com"
                codeUrl="https://github.com"
                status="Publish Soon"
                details="REM utilizes a recursive tree structure to index episodic experiences, allowing for constant-time complexity retrieval of relevant memories. This research focus on optimizing retrieval precision and efficiency in multi-agent environments where agents must coordinate over days or weeks of simulated time."
              />
              <ResearchProjectCard
                title="Test-Time Compute for Code Generation"
                description="A coding agent that generates an internal Verification Plan and uses a Tree of Thoughts approach to backtrack if unit tests fail."
                novelty="Critic-Actor Loop"
                tags={["Code Generation", "Tree of Thoughts", "Reasoning"]}
                codeUrl="https://github.com"
                status="Publish Soon"
              />
              <ResearchProjectCard
                title="Quadruped (Spot Robot) Moon Surface Simulation"
                description="Simulation of Boston Dynamics' Spot robot navigating lunar terrain using NVIDIA Isaac Sim and ROS for autonomous exploration and terrain adaptation."
                metric="Real-time physics simulation"
                tags={["Robotics", "NVIDIA Isaac Sim", "ROS", "Simulation"]}
                codeUrl="https://github.com"
                status="Publish Soon"
              />
            </div>
          </SectionsWrapper>
        </section>

        {/* Featured Open Source Work */}
        <GitHubContributionsSection />

        {/* Now Section — Building + Featured Projects */}
        <section id="projects">
          <SectionsWrapper className="space-y-6">
            <div className="border-b border-white/10 pb-2 mb-2">
              <h2 className="text-2xl font-bold tracking-tight section-hash" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>Now</h2>
              <p className="text-sm text-white/35 mt-1">A snapshot of what I&apos;m building right now.</p>
            </div>

            {/* Building Card — pixperk style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <NowBuildingCard
                title="Recursive Episodic Memory"
                description="Novel architecture for autonomous agents with recursive memory storage and retrieval for long-term coherence."
                technologies={["Python", "PyTorch", "RAG", "LLM"]}
                progress={72}
                href="/projects/REM"
              />

              {/* Reading Card */}
              <div className="rounded-xl border border-cyan-500/20 bg-[#0a0a0a] p-6 overflow-hidden">
                <div className="absolute top-4 right-12 w-2 h-2 rounded-full bg-cyan-400/40" />
                <div className="text-xs font-medium tracking-widest text-cyan-400/60 uppercase mb-4" style={{ fontStyle: "italic" }}>
                  Reading
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white/80" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>Designing Data-Intensive Applications</h4>
                    <p className="text-xs text-white/30 italic">Martin Kleppmann</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white/80" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>Deep Learning</h4>
                    <p className="text-xs text-white/30 italic">Ian Goodfellow et al.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white/80" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>Attention Is All You Need</h4>
                    <p className="text-xs text-white/30 italic">Vaswani et al. (research deep-dive)</p>
                  </div>
                </div>
              </div>

              {/* Thoughts Card */}
              <div className="rounded-xl border border-rose-500/20 bg-[#0a0a0a] p-6 overflow-hidden">
                <div className="text-xs font-mono tracking-widest text-rose-400/60 uppercase mb-4">
                  // Thoughts
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                  Test-time compute is underexplored for code generation. Giving models a verification loop changes the game.
                </p>
                <p className="text-sm text-white/40 leading-relaxed">
                  Recursive memory might be the right abstraction for long-horizon agents. Fixed context windows are fundamentally limiting.
                </p>
              </div>
            </div>

            {/* Featured Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              {repos.map((repo: any) => {
                const projInfo = PROJECT_DATA[repo.name] || {};
                return (
                  <PixperkProjectCard
                    key={repo.id}
                    title={repo.name.replace(/-/g, " ")}
                    description={projInfo.description || repo.description || "No description provided."}
                    image={projInfo.image}
                    technologies={[repo.language, ...(repo.topics || [])].filter(Boolean)}
                    href={`/projects/${repo.name}`}
                    githubUrl={repo.html_url}
                    stars={repo.stargazers_count}
                  />
                );
              })}
            </div>

            {/* View All Projects */}
            <div className="flex justify-center pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors border border-white/[0.06] rounded-lg px-5 py-2.5 hover:border-white/[0.12] hover:bg-white/[0.02]"
              >
                View all projects
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </SectionsWrapper>
        </section>

        {/* GitHub Activity */}
        <section id="github">
          <GitHubHeatmap />
        </section>

        {/* Latest Writing — pixperk style */}
        <section id="blogs">
          <SectionsWrapper className="space-y-4">
            {latestPost ? (
              <LatestWritingSection
                title={latestPost.title}
                description={latestPost.description}
                slug={latestPost.slug}
                mediumUrl={latestPost.mediumUrl}
              />
            ) : (
              <div className="text-white/40 text-sm">No blog posts available.</div>
            )}

            <div className="flex justify-start pt-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors border border-white/[0.06] rounded-lg px-5 py-2.5 hover:border-white/[0.12] hover:bg-white/[0.02]"
              >
                All posts
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </SectionsWrapper>
        </section>

        {/* Bento Grid - Setup & Life */}
        <section id="setup-life">
          <div className="space-y-12">
            {/* Setup & Life */}
            <SectionsWrapper className="space-y-4">
              <div className="border-b border-white/10 pb-2 mb-6">
                <h2 className="text-2xl font-bold tracking-tight section-hash">Setup</h2>
              </div>
              <div className="space-y-3">
                <BentoCard
                  icon={<Settings className="w-5 h-5 text-white/80" />}
                  title="Gears Used"
                  description="Productivity Tools, Gears i use daily."
                />
                <BentoCard
                  icon={<FileText className="w-5 h-5 text-white/80" />}
                  title="VSCode / Cursor Setup"
                  description="VSCode / Cursor setup i use daily."
                />
              </div>
            </SectionsWrapper>

            {/* Personal Section */}
            <SectionsWrapper className="space-y-4">
              <div className="border-b border-white/10 pb-2 mb-6">
                <h2 className="text-2xl font-bold tracking-tight section-hash">Life</h2>
              </div>
              <div className="space-y-3">
                <BentoCard
                  icon={<BookOpen className="w-5 h-5 text-white/80" />}
                  title="Books"
                  description="Books that have influenced my thinking and growth."
                  href="/books"
                  showCat
                />
                <BentoCard
                  icon={<Film className="w-5 h-5 text-white/80" />}
                  title="Movies"
                  description="Movies and shows that have inspired and entertained me."
                  href="/movies"
                  showCat
                />
                <BentoCard
                  icon={<Eye className="w-5 h-5 text-white/80" />}
                  title="Wall of Vouches"
                  description="Kind words and shitposts from friends."
                  href="/vouches"
                  showCat
                />
              </div>
            </SectionsWrapper>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
