/**
 * Server Rate Limiter (Sliding Window IP & Session Rate Limiting)
 * Prevents API abuse, spam, and DDoS attacks on contact form and AI endpoints.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Cleanup stale records every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
      const valid = record.timestamps.filter((ts) => now - ts < 900000); // 15 mins
      if (valid.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, { timestamps: valid });
      }
    }
  }, 300000);
}

export interface RateLimitOptions {
  windowMs: number; // Time window in ms (e.g. 60,000 for 1 min)
  maxRequests: number; // Maximum allowed requests in window
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 60000, maxRequests: 30 }
): { allowed: boolean; currentCount: number; remaining: number; resetMs: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier) || { timestamps: [] };

  // Filter timestamps within the current window
  const validTimestamps = record.timestamps.filter((ts) => now - ts < options.windowMs);

  if (validTimestamps.length >= options.maxRequests) {
    const oldestTimestamp = validTimestamps[0];
    const resetMs = options.windowMs - (now - oldestTimestamp);

    return {
      allowed: false,
      currentCount: validTimestamps.length,
      remaining: 0,
      resetMs: Math.max(0, resetMs),
    };
  }

  validTimestamps.push(now);
  rateLimitMap.set(identifier, { timestamps: validTimestamps });

  return {
    allowed: true,
    currentCount: validTimestamps.length,
    remaining: options.maxRequests - validTimestamps.length,
    resetMs: options.windowMs,
  };
}

export function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";
  const userAgent = request.headers.get("user-agent") || "unknown-ua";

  return `${ip}:${userAgent.slice(0, 32)}`;
}
