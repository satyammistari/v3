import BlurFade from "@/components/magicui/blur-fade";
import { EnhancedProjectCard } from "@/components/enhanced-project-card";
import { Icons } from "@/components/icons";

export const metadata = {
  title: "Projects",
  description: "A collection of my recent projects, open-source work, and experiments.",
};

const BLUR_FADE_DELAY = 0.04;

async function getGitHubRepos() {
  const res = await fetch("https://api.github.com/users/satyammistari/repos?per_page=100&sort=updated", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const repos = await res.json();
  
  // Exact requested projects to show
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

  return repos
    .filter((repo: any) => requestedRepos.includes(repo.name))
    .sort((a: any, b: any) => {
      // Maintain the exact order of the requestedRepos array
      return requestedRepos.indexOf(a.name) - requestedRepos.indexOf(b.name);
    });
}

function getRepoEmoji(language: string) {
  const emojis: Record<string, string> = {
    Python: "🐍",
    TypeScript: "📘",
    JavaScript: "🟨",
    Rust: "🦀",
    Go: "🐹",
    "C++": "⚙️",
    C: "🔧",
    Java: "☕",
    HTML: "🌐",
    CSS: "🎨",
    Shell: "🐚",
    Ruby: "💎",
  };
  return emojis[language] || "🚀";
}

const PROJECT_DATA: Record<string, { description: string, image: string }> = {
  "End-to-End-Support-Agent-MLOps-": {
    description: "A full-stack MLOps pipeline for an AI support agent, featuring automated retraining, model monitoring, and seamless deployment using ZenML and BentoML.",
    image: "/projects/kid.jpg"
  },
  "REM": {
    description: "Recursive Episodic Memory (REM) implementation for autonomous agents, enabling long-term memory retrieval and coherent behavior over extended horizons.",
    image: "/projects/collage.jpg"
  },
  "End-to-End-ML-Feature-Pipeline-Online-Serving": {
    description: "A real-time machine learning feature pipeline that processes streaming data and serves features with sub-millisecond latency for online inference.",
    image: "/projects/office.jpg"
  },
  "RUST-CHASH": {
    description: "A high-performance consistent hashing implementation in Rust, designed for distributed systems and load balancing with minimal overhead.",
    image: "/projects/casey_sign.jpg"
  },
  "ML-Math": {
    description: "A collection of core mathematical concepts for machine learning implemented from scratch, covering linear algebra, calculus, and optimization algorithms.",
    image: "/projects/casey_diagram.jpg"
  },
  "db-seed-ai": {
    description: "An AI-powered tool for generating realistic synthetic database records, helping developers seed their environments with meaningful test data.",
    image: "/projects/kid.jpg"
  },
  "env-sync-in-go": {
    description: "A lightning-fast CLI tool written in Go for synchronizing environment variables across different machines and team members securely.",
    image: "/projects/collage.jpg"
  },
  "Writer-Flow-Deepseek-r1": {
    description: "An automated content creation workflow powered by DeepSeek-R1, designed to generate high-quality technical blog posts and documentation.",
    image: "/projects/office.jpg"
  },
  "Implement-Research-Papers-into-from-scratch": {
    description: "A repository dedicated to implementing cutting-edge AI research papers from scratch in PyTorch, focusing on clarity and correctness.",
    image: "/projects/casey_sign.jpg"
  },
  "DDQN-paper-into-code": {
    description: "An implementation of Double Deep Q-Networks (DDQN) for reinforcement learning, applied to classic control problems with benchmarks.",
    image: "/projects/casey_diagram.jpg"
  }
};

export default async function ProjectsPage() {
  const repos = await getGitHubRepos();

  return (
    <section className="max-w-[800px] mx-auto pb-24">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-4 tracking-tighter" style={{ fontFamily: "var(--font-geist-mono)" }}>
          Projects
        </h1>
        <p className="text-zinc-400 mb-8 max-w-2xl leading-relaxed">
          Here is a collection of my open-source projects, experiments, and active repositories fetched directly from GitHub.
        </p>
      </BlurFade>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((repo: any, id: number) => {
          const projectInfo = PROJECT_DATA[repo.name] || {};
          
          return (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={repo.id}>
              <EnhancedProjectCard
                title={repo.name.replace(/-/g, ' ')}
                description={projectInfo.description || repo.description || "No description provided."}
                image={projectInfo.image}
                technologies={[repo.language, ...(repo.topics || [])].filter(Boolean)}
                href={`/projects/${repo.name}`}
                links={[
                  {
                    type: "GitHub",
                    href: repo.html_url,
                    icon: <Icons.github className="w-4 h-4" />,
                  },
                  ...(repo.homepage && repo.homepage !== "" ? [{
                    type: "Website",
                    href: repo.homepage,
                    icon: <Icons.globe className="w-4 h-4" />,
                  }] : [])
                ]}
              />
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
