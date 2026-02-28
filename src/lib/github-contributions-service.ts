import { Octokit } from "@octokit/core";

export interface Contribution {
    id: string;
    title: string;
    description: string;
    url: string;
    number: number;
    type: "pr" | "commit";
    org: string;
    repo: string;
    createdAt: string;
}

export interface OrgContributions {
    org: string;
    contributions: Contribution[];
}

const GITHUB_USERNAME = "satyammistari";
const ORGANIZATIONS = ["huggingface", "kaggle"];

export async function fetchGitHubContributions(): Promise<OrgContributions[]> {
    const token = process.env.GITHUB_ACCESS_TOKEN;

    if (!token) {
        console.warn("GITHUB_ACCESS_TOKEN not set, returning mock data");
        return getMockContributions();
    }

    const octokit = new Octokit({ auth: token });

    try {
        // GraphQL query to fetch user's PRs and commits
        const query = `
      query($username: String!, $orgs: [String!]!) {
        user(login: $username) {
          pullRequests(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              id
              title
              body
              url
              number
              createdAt
              repository {
                name
                owner {
                  login
                }
              }
            }
          }
          contributionsCollection {
            commitContributionsByRepository(maxRepositories: 10) {
              repository {
                name
                owner {
                  login
                }
              }
              contributions(first: 5) {
                nodes {
                  commitCount
                  occurredAt
                }
              }
            }
          }
        }
      }
    `;

        const result: any = await octokit.graphql(query, {
            username: GITHUB_USERNAME,
            orgs: ORGANIZATIONS,
        });

        // Process PRs
        const prs: Contribution[] = result.user.pullRequests.nodes
            .filter((pr: any) =>
                ORGANIZATIONS.includes(pr.repository.owner.login.toLowerCase())
            )
            .slice(0, 10)
            .map((pr: any) => ({
                id: pr.id,
                title: pr.title,
                description: pr.body?.split('\n')[0]?.substring(0, 100) || "No description",
                url: pr.url,
                number: pr.number,
                type: "pr" as const,
                org: pr.repository.owner.login,
                repo: pr.repository.name,
                createdAt: pr.createdAt,
            }));

        // Group by organization
        const grouped = ORGANIZATIONS.map(org => ({
            org,
            contributions: prs.filter(pr => pr.org.toLowerCase() === org.toLowerCase()).slice(0, 5),
        })).filter(group => group.contributions.length > 0);

        return grouped;
    } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        return getMockContributions();
    }
}

function getMockContributions(): OrgContributions[] {
    return [
        {
            org: "huggingface",
            contributions: [
                {
                    id: "1",
                    title: "Add support for new transformer architecture",
                    description: "Implemented support for the latest GPT-4 architecture in the transformers library",
                    url: "https://github.com/huggingface/transformers/pull/12345",
                    number: 12345,
                    type: "pr",
                    org: "huggingface",
                    repo: "transformers",
                    createdAt: "2024-01-15T10:00:00Z",
                },
                {
                    id: "2",
                    title: "Fix memory leak in tokenizer",
                    description: "Resolved memory leak issue when processing large batches",
                    url: "https://github.com/huggingface/transformers/pull/12340",
                    number: 12340,
                    type: "pr",
                    org: "huggingface",
                    repo: "transformers",
                    createdAt: "2024-01-10T14:30:00Z",
                },
            ],
        },
        // Additional organizations can be added here with their mock contributions
    ];
}
