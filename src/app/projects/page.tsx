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
          const emoji = getRepoEmoji(repo.language);
          
          return (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={repo.id}>
              <EnhancedProjectCard
                title={repo.name.replace(/-/g, ' ')}
                description={repo.description || "No description provided."}
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
