import { GitPullRequest, GitCommit, ExternalLink } from "lucide-react";
import { Contribution } from "@/lib/github-contributions-service";

interface ContributionCardProps {
    contribution: Contribution;
}

export function ContributionCard({ contribution }: ContributionCardProps) {
    const Icon = contribution.type === "pr" ? GitPullRequest : GitCommit;
    const iconColor = contribution.type === "pr" ? "text-purple-500" : "text-green-500";

    return (
        <div className="relative group">
            <div className="flex items-start space-x-3">
                <Icon className={`w-4 h-4 mt-1 ${iconColor} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                    <a
                        href={contribution.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-white hover:underline inline-flex items-center gap-1 group/link"
                    >
                        <span className="break-words">{contribution.title}</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                    <p className="mt-1 font-mono text-xs text-zinc-500 leading-relaxed line-clamp-2">
                        {contribution.description}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-zinc-600">
                        {contribution.repo}
                    </p>
                </div>
                <span className="font-mono text-xs text-zinc-600 flex-shrink-0">
                    #{contribution.number}
                </span>
            </div>
        </div>
    );
}
