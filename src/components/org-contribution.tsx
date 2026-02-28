"use client";

import { ChevronDown } from "lucide-react";
import { OrgContributions } from "@/lib/github-contributions-service";
import { ContributionCard } from "./contribution-card";
import Image from "next/image";

interface OrgContributionProps {
    orgData: OrgContributions;
}

const ORG_LOGOS: Record<string, string> = {
    huggingface: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
    kaggle: "https://www.kaggle.com/static/images/site-logo.svg",
};

const ORG_METADATA: Record<string, { period: string; description: string }> = {
    huggingface: {
        period: "2023 - Present",
        description: "Active contributor to the Hugging Face ecosystem with multiple repositories and models for NLP and multimodal AI.",
    },
    kaggle: {
        period: "2023 - Present",
        description: "Active contributor to the Kaggle ecosystem with comprehensive tutorials, notebooks, and competition solutions.",
    },
};

export function OrgContribution({ orgData }: OrgContributionProps) {
    const orgName = orgData.org.charAt(0).toUpperCase() + orgData.org.slice(1);
    const formattedName = orgName.replace("-", " ");
    const metadata = ORG_METADATA[orgData.org] || { period: "Present", description: "" };

    return (
        <details className="group border-b border-zinc-800/50 py-5">
            <summary className="flex items-center justify-between cursor-pointer list-none group-hover:opacity-80 transition-opacity">
                <div className="flex items-center space-x-4 flex-1">
                    {ORG_LOGOS[orgData.org] && (
                        <div className="w-7 h-7 relative flex-shrink-0">
                            <Image
                                src={ORG_LOGOS[orgData.org]}
                                alt={`${formattedName} logo`}
                                width={28}
                                height={28}
                                className="object-contain"
                            />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                            <h3 className="font-serif text-lg text-white group-hover:text-zinc-400 transition-colors">
                                {formattedName}
                            </h3>
                            <span className="font-mono text-xs text-zinc-600 bg-zinc-900/50 px-2 py-0.5 rounded-full flex-shrink-0">
                                {orgData.contributions.length} contribution{orgData.contributions.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                            <p className="font-mono text-xs text-zinc-500">{metadata.period}</p>
                            <span className="text-zinc-700">•</span>
                            <p className="font-mono text-xs text-zinc-600 line-clamp-1">{metadata.description}</p>
                        </div>
                    </div>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
            </summary>

            <div className="mt-6 space-y-6 pl-11">
                {orgData.contributions.map((contribution) => (
                    <ContributionCard key={contribution.id} contribution={contribution} />
                ))}
            </div>
        </details>
    );
}
