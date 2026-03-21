import BlurFade from "@/components/magicui/blur-fade";
import { PixperkProjectCard } from "@/components/pixperk-project-card";

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
      return requestedRepos.indexOf(a.name) - requestedRepos.indexOf(b.name);
    });
}

const PROJECT_DATA: Record<string, { description: string; image: string }> = {
  "End-to-End-Support-Agent-MLOps-": {
    description:
      "A full-stack MLOps pipeline for an AI support agent, featuring automated retraining, model monitoring, and seamless deployment using ZenML and BentoML.",
    image: "/projects/kid.jpg",
  },
  REM: {
    description:
      "Recursive Episodic Memory (REM) implementation for autonomous agents, enabling long-term memory retrieval and coherent behavior over extended horizons.",
    image: "/projects/collage.jpg",
  },
  "End-to-End-ML-Feature-Pipeline-Online-Serving": {
    description:
      "A real-time machine learning feature pipeline that processes streaming data and serves features with sub-millisecond latency for online inference.",
    image: "/projects/office.jpg",
  },
  "RUST-CHASH": {
    description:
      "A high-performance consistent hashing implementation in Rust, designed for distributed systems and load balancing with minimal overhead.",
    image: "/projects/casey_sign.jpg",
  },
  "ML-Math": {
    description:
      "A collection of core mathematical concepts for machine learning implemented from scratch, covering linear algebra, calculus, and optimization algorithms.",
    image: "/projects/casey_diagram.jpg",
  },
  "db-seed-ai": {
    description:
      "An AI-powered tool for generating realistic synthetic database records, helping developers seed their environments with meaningful test data.",
    image: "/projects/kid.jpg",
  },
  "env-sync-in-go": {
    description:
      "A lightning-fast CLI tool written in Go for synchronizing environment variables across different machines and team members securely.",
    image: "/projects/collage.jpg",
  },
  "Writer-Flow-Deepseek-r1": {
    description:
      "An automated content creation workflow powered by DeepSeek-R1, designed to generate high-quality technical blog posts and documentation.",
    image: "/projects/office.jpg",
  },
  "Implement-Research-Papers-into-from-scratch": {
    description:
      "A repository dedicated to implementing cutting-edge AI research papers from scratch in PyTorch, focusing on clarity and correctness.",
    image: "/projects/casey_sign.jpg",
  },
  "DDQN-paper-into-code": {
    description:
      "An implementation of Double Deep Q-Networks (DDQN) for reinforcement learning, applied to classic control problems with benchmarks.",
    image: "/projects/casey_diagram.jpg",
  },
};

export default async function ProjectsPage() {
  const repos = await getGitHubRepos();

  return (
    <section className="max-w-[1000px] mx-auto pb-24">
      {/* Header */}
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="mb-10">
          <h1
            className="text-2xl font-bold tracking-tight text-white/90 mb-3"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            satyam<span className="text-violet-400">/projects</span>
          </h1>
          <p className="text-sm text-white/40 max-w-xl leading-relaxed">
            Open-source projects, experiments, and active repositories fetched directly from GitHub.
          </p>
        </div>
      </BlurFade>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {repos.map((repo: any, id: number) => {
          const projectInfo = PROJECT_DATA[repo.name] || {};

          return (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={repo.id}>
              <PixperkProjectCard
                title={repo.name.replace(/-/g, " ")}
                description={
                  projectInfo.description ||
                  repo.description ||
                  "No description provided."
                }
                image={projectInfo.image}
                technologies={[repo.language, ...(repo.topics || [])].filter(
                  Boolean
                )}
                href={`/projects/${repo.name}`}
                githubUrl={repo.html_url}
                stars={repo.stargazers_count}
              />
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
