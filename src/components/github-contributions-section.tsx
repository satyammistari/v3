import { fetchGitHubContributions } from "@/lib/github-contributions-service";
import { OrgContribution } from "./org-contribution";
import { GitBranch } from "lucide-react";

export async function GitHubContributionsSection() {
    const contributions = await fetchGitHubContributions();

    if (contributions.length === 0) {
        return null;
    }

    return (
        <section className="w-full max-w-4xl mx-auto py-12 px-6">
            <div className="relative w-full bg-zinc-950/15 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <GitBranch className="w-6 h-6 text-white/80" />
                        <h2 className="text-3xl font-serif text-white/90">
                            Featured Open Source Work
                        </h2>
                    </div>
                    <p className="text-sm text-zinc-500 font-mono">
                        Real-time contributions from leading AI/ML organizations
                    </p>
                </div>

                {/* Organizations List */}
                <div className="space-y-2">
                    {contributions.map((orgData) => (
                        <OrgContribution key={orgData.org} orgData={orgData} />
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-8 pt-6 border-t border-zinc-800/50">
                    <p className="text-xs text-zinc-600 font-mono text-center">
                        Synced with GitHub • Updates every hour
                    </p>
                </div>
            </div>
        </section>
    );
}
