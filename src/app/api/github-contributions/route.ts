import { NextResponse } from "next/server";
import { fetchGitHubContributions } from "@/lib/github-contributions-service";

export const revalidate = 3600; // Revalidate every 60 minutes

export async function GET() {
    try {
        const contributions = await fetchGitHubContributions();

        return NextResponse.json(contributions, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
            },
        });
    } catch (error) {
        console.error("Error in GitHub contributions API:", error);
        return NextResponse.json(
            { error: "Failed to fetch contributions" },
            { status: 500 }
        );
    }
}
