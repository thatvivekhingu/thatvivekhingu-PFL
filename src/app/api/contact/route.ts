import { NextRequest } from "next/server";
import { ApiResponse } from "@/lib/server/api-response";
import { checkRateLimit, getClientIdentifier } from "@/lib/server/rate-limiter";
import { sendContactEmail, ContactSubmission } from "@/lib/server/email-service";
import { ServerLogger } from "@/lib/server/logger";

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIdentifier(request);

    // Rate limit: Max 5 contact submissions per 15 minutes per IP
    const rateLimit = checkRateLimit(`contact:${clientIp}`, {
      windowMs: 15 * 60 * 1000,
      maxRequests: 5,
    });

    if (!rateLimit.allowed) {
      ServerLogger.warn("ContactAPI", `Rate limit exceeded for IP: ${clientIp}`);
      return ApiResponse.error(
        "Too many contact submissions. Please wait a few minutes before trying again.",
        429,
        "ERR_RATE_LIMIT",
        { resetMs: rateLimit.resetMs }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return ApiResponse.error("Invalid JSON body payload", 400, "ERR_INVALID_BODY");
    }

    const { name, email, subject, message } = body as Record<string, string>;

    // Field Validation & Sanitization
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return ApiResponse.error("Name is required and must be at least 2 characters", 400, "ERR_INVALID_NAME");
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return ApiResponse.error("A valid email address is required", 400, "ERR_INVALID_EMAIL");
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return ApiResponse.error("Message is required and must be at least 5 characters", 400, "ERR_INVALID_MESSAGE");
    }

    const submission: ContactSubmission = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      subject: subject ? subject.trim().slice(0, 150) : undefined,
      message: message.trim().slice(0, 3000),
      ip: clientIp,
      submittedAt: new Date().toISOString(),
    };

    const dispatchResult = await sendContactEmail(submission);

    return ApiResponse.success(
      {
        received: true,
        message: "Thank you for reaching out! Your message has been received successfully.",
        provider: dispatchResult.provider,
      },
      200
    );
  } catch (error) {
    ServerLogger.error("ContactAPI", "Unhandled exception in contact endpoint:", error);
    return ApiResponse.error("Internal Server Error processing contact message", 500, "ERR_INTERNAL_SERVER");
  }
}
