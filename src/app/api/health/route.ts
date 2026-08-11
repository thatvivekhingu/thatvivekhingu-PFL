import { ApiResponse } from "@/lib/server/api-response";

const startTime = Date.now();

export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  return ApiResponse.success({
    status: "operational",
    system: "Vivek Hingu Portfolio Backend Core",
    version: "2.0.0",
    environment: process.env.NODE_ENV || "development",
    uptimeSeconds,
    services: {
      groqApiConfigured: Boolean(process.env.GROQ_API_KEY),
      geminiApiConfigured: Boolean(process.env.GEMINI_API_KEY),
      githubTokenConfigured: Boolean(process.env.GITHUB_TOKEN),
      spotifyConfigured: Boolean(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET),
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
    },
  });
}
