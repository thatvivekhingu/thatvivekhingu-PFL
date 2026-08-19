import { NextResponse } from "next/server";
import { ServerLogger } from "@/lib/server/logger";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO ?? "thatvivekhingu/thatvivekhingu-PFL";

interface RepoResponse {
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "Portfolio-App",
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers,
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });

    if (response.ok) {
      const data: RepoResponse = await response.json();

      return NextResponse.json(
        {
          stars: data.stargazers_count,
          forks: data.forks_count,
          url: data.html_url,
          repo: GITHUB_REPO,
        },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
        }
      );
    }
  } catch (error) {
    ServerLogger.warn("GitHubStarsAPI", "GitHub API fetch error, using fallback:", error);
  }

  // Graceful fallback for thatvivekhingu repository stars
  return NextResponse.json(
    {
      stars: 12,
      forks: 4,
      url: `https://github.com/${GITHUB_REPO}`,
      repo: GITHUB_REPO,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    }
  );
}
