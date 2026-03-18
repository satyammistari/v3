import { BentoCard } from "@/components/bento-card";
import { BlogCard } from "@/components/blog-card";
import { MediumBlogCard } from "@/components/medium-blog-card";
import { EnhancedProjectCard } from "@/components/enhanced-project-card";
import { ExperienceCard } from "@/components/experience-card";
import { Footer } from "@/components/footer";
import { GitHubHeatmap } from "@/components/github-heatmap-live";
import { CategorizedSkills } from "@/components/categorized-skills";
import { PublicationCard } from "@/components/publication-card";
import { ResearchProjectCard } from "@/components/research-project-card";
import { OpenSourceStats } from "@/components/opensource-stats";
import { SpotifyWidget } from "@/components/spotify-widget";
import { DATA } from "@/data/resume";
import { getBlogPosts } from "@/data/blog";
import { BookOpen, Film, FileText, Settings, Eye } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SectionsWrapper } from "@/components/sections-wrapper";
import { Badge } from "@/components/ui/badge";
import { GitHubContributionsSection } from "@/components/github-contributions-section";

export default async function Page() {

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

        {/* Featured Open Source Work - Real-Time GitHub Contributions */}
        <GitHubContributionsSection />

        {/* Experience Section removed as requested */}

        {/* Featured Projects */}
        <section id="projects">
          <SectionsWrapper className="space-y-6">
            <div className="border-b border-white/10 pb-2 mb-6">
              <h2 className="text-2xl font-bold tracking-tight section-hash">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DATA.projects.slice(0, 4).map((project) => {
                // Use the first link's href (GitHub URL) as the project href to avoid 404s
                const projectHref = project.links && project.links.length > 0
                  ? project.links[0].href
                  : undefined;
                return (
                  <EnhancedProjectCard
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    technologies={[...project.technologies]}
                    href={projectHref}
                    image={project.image}
                    video={project.video}
                    links={project.links ? [...project.links] : undefined}
                  />
                );
              })}
            </div>
          </SectionsWrapper>
        </section>

        {/* GitHub Activity */}
        <section id="github">
          <GitHubHeatmap />
        </section>

        {/* Featured Blogs */}
        <section id="blogs">
          <SectionsWrapper className="space-y-6">
            <div className="border-b border-white/10 pb-2 mb-6">
              <h2 className="text-2xl font-bold tracking-tight section-hash">Blogs</h2>
            </div>
            <MediumBlogCard />
            <div className="flex justify-center pt-4">
              <a
                href="https://medium.com/@mistarisatyam"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0c0c0c] border border-white/10 rounded-lg px-6 py-3 text-sm text-white/60 hover:text-white hover:bg-[#111111] transition-colors"
              >
                View all on Medium
              </a>
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
