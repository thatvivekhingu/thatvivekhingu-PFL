import { ApiResponse } from "@/lib/server/api-response";
import { ServerLogger } from "@/lib/server/logger";

export async function GET(request: Request) {
  const host = request.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  try {
    const [githubRes, starsRes, spotifyRes, visitorRes] = await Promise.allSettled([
      fetch(`${baseUrl}/api/github`, { signal: AbortSignal.timeout(4000) }),
      fetch(`${baseUrl}/api/github-stars`, { signal: AbortSignal.timeout(4000) }),
      fetch(`${baseUrl}/api/spotify`, { signal: AbortSignal.timeout(4000) }),
      fetch(`${baseUrl}/api/visitor-count`, { signal: AbortSignal.timeout(4000) }),
    ]);

    const githubData = githubRes.status === "fulfilled" && githubRes.value.ok ? await githubRes.value.json().catch(() => null) : null;
    const starsData = starsRes.status === "fulfilled" && starsRes.value.ok ? await starsRes.value.json().catch(() => null) : null;
    const spotifyData = spotifyRes.status === "fulfilled" && spotifyRes.value.ok ? await spotifyRes.value.json().catch(() => null) : null;
    const visitorData = visitorRes.status === "fulfilled" && visitorRes.value.ok ? await visitorRes.value.json().catch(() => null) : null;

    return ApiResponse.success({
      github: {
        totalContributions: githubData?.totalContributions || 148,
        period: githubData?.period || "7 weeks",
      },
      stars: {
        totalStars: starsData?.stars || 12,
      },
      spotify: spotifyData || {
        isPlaying: false,
        title: "Yalgaar",
        artist: "CarryMinati",
      },
      telemetry: visitorData || {
        totalVisits: 1250,
        activeNow: 1,
      },
    });
  } catch (error) {
    ServerLogger.error("StatsAPI", "Batch telemetry error:", error);
    return ApiResponse.error("Failed to aggregate live stats", 500, "ERR_STATS_FAILED");
  }
}
