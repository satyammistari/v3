import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { TechBadge } from "@/components/tech-badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { CheckCircle2, Globe, GitBranch, Repeat, ArrowRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface ProjectDetailPageProps {
  params: {
    slug: string; // The GitHub Repository Name
  };
}

// Ensure exact subset is available for related projects
const requestedRepos = [
  "End-to-End-Support-Agent-MLOps-",
  "REM",
  "End-to-End-ML-Feature-Pipeline-Online-Serving",
  "RUST-CHASH",
  "ML-Math",
  "db-seed-ai",
  "env-sync-in-go",
  "Writer-Flow-Deepseek-r1",
  "Implement-Research-Papers-into-from-scratch",
  "DDQN-paper-into-code",
];

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = params;

  // 1. Fetch Repository Metadata
  const repoRes = await fetch(`https://api.github.com/repos/satyammistari/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!repoRes.ok) {
    notFound();
  }

  const repo = await repoRes.json();

  // 2. Fetch README content
  let readme = "";
  // Try main branch first
  let readmeRes = await fetch(`https://raw.githubusercontent.com/satyammistari/${slug}/main/README.md`);
  if (!readmeRes.ok) {
    // Fallback to master
    readmeRes = await fetch(`https://raw.githubusercontent.com/satyammistari/${slug}/master/README.md`);
  }
  if (readmeRes.ok) {
    readme = await readmeRes.text();
  } else {
    readme = "*No README.md found for this repository.*";
  }

  // Related projects (next items in array)
  const currentIndex = requestedRepos.indexOf(slug) !== -1 ? requestedRepos.indexOf(slug) : 0;
  const nextProjectSlug = requestedRepos[(currentIndex + 1) % requestedRepos.length];
  
  const relatedProjectsSlugs = requestedRepos
    .filter((s) => s !== slug && s !== nextProjectSlug)
    .slice(0, 3);

  const technologies = [repo.language, ...(repo.topics || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 space-y-12">
        {/* Header Section with Hero Placeholder */}
        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border border-white/10">
          <div className="w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center">
             <div className="text-center">
               <span className="text-6xl md:text-8xl opacity-30 drop-shadow-xl">{repo.language === "Python" ? "🐍" : repo.language === "Rust" ? "🦀" : repo.language === "Go" ? "🐹" : "🚀"}</span>
               <h1 className="mt-4 font-mono text-xl opacity-50">{slug}</h1>
             </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="bg-white text-black px-3 py-1 rounded-md text-xs font-medium">
            Open Source
          </div>
          {technologies.slice(0, 5).map((tech: string) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        {/* Hero Info */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            {repo.name.replace(/-/g, " ")}
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            {repo.description || "No description provided on GitHub."}
          </p>

          {/* Info Card */}
          <div className="bg-[#0c0c0c] border border-white/10 rounded-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-white/60 mb-1">Created</div>
              <div className="text-sm font-medium text-white">
                {new Date(repo.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </div>
            </div>
            <div>
               <div className="text-xs text-white/60 mb-1">Last Updated</div>
               <div className="text-sm font-medium text-white">
                 {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
               </div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Stars</div>
              <div className="text-sm font-medium text-white">{repo.stargazers_count} ⭐</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Status</div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Available</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-start gap-4">
            {repo.homepage && repo.homepage !== "" && (
              <Button
                asChild
                className="bg-white text-black hover:bg-white/90 border-0"
              >
                <Link
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Live Demo
                </Link>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="border border-white/10 bg-[#0c0c0c] hover:bg-[#111111] text-white"
            >
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                View Source on GitHub
              </Link>
            </Button>
          </div>
        </div>

        {/* README Section */}
        <div className="space-y-8 pt-8">
             <div className="prose prose-invert prose-zinc max-w-none prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-a:text-blue-400 hover:prose-a:text-blue-300">
               <ReactMarkdown 
                 remarkPlugins={[remarkGfm]} 
                 rehypePlugins={[rehypeRaw]}
               >
                 {readme}
               </ReactMarkdown>
             </div>
        </div>

        {/* Next Project Card */}
        {nextProjectSlug && (
           <div className="pt-16">
             <Link
               href={`/projects/${nextProjectSlug}`}
               className="block bg-[#0c0c0c] border border-white/10 rounded-lg p-6 hover:bg-[#111111] hover:border-white/20 transition-all group"
             >
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <Repeat className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                   <div>
                     <div className="text-sm text-zinc-500 mb-1">Next Project</div>
                     <div className="text-lg font-bold text-white tracking-tight">{nextProjectSlug.replace(/-/g, " ")}</div>
                   </div>
                 </div>
                 <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
               </div>
             </Link>
           </div>
        )}

        {/* Related Projects */}
        {relatedProjectsSlugs.length > 0 && (
          <section className="pt-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Other Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedProjectsSlugs.map((relatedSlug) => (
                <Link
                  key={relatedSlug}
                  href={`/projects/${relatedSlug}`}
                  className="bg-[#0c0c0c] border border-white/10 rounded-lg p-4 hover:bg-[#111111] hover:border-white/20 transition-all group"
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/5 rounded mb-3 flex items-center justify-center group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-colors">
                    <span className="text-2xl opacity-50">🚀</span>
                  </div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-blue-400 truncate">
                     {relatedSlug.replace(/-/g, " ")}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
}

