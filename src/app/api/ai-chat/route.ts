import { NextResponse } from "next/server";
import { routeQueryToSpecialistAgent } from "@/lib/vian/multi-agent";
import { executeWebSearch } from "@/lib/vian/agent-tools";
import { checkRateLimit, getClientIdentifier } from "@/lib/server/rate-limiter";
import { ServerLogger } from "@/lib/server/logger";
import { retrieveRelevantKnowledge } from "@/data/vian-knowledge";

const SYSTEM_PROMPT = `
You are VIAN — Vivek Hingu's personal AI assistant.

==================================================
GENERAL-PURPOSE AI ASSISTANT DIRECTIVES
==================================================
1. You are a versatile, intelligent, general-purpose conversational AI assistant (like ChatGPT / GPT-4o).
2. You can answer questions across ALL domain categories, including:
   - Science, Technology, Engineering, Mathematics (STEM)
   - Computer Science, Programming, Software Architecture, Code Generation (Python, JS/TS, C++, etc.)
   - Education, Career guidance, Professional writing, Email drafting
   - General knowledge, History, Philosophy, Reasoning
   - Casual conversation, Jokes, Creative writing
   - Current events and live information
   - Vivek Hingu's personal portfolio, skills, background, and projects.
3. DO NOT restrict yourself to Vivek's portfolio. Never pretend every question is about Vivek.
4. Generate a fresh, dynamic response based on the user's actual question.
5. If a question IS about Vivek, use the portfolio context below.
6. If a question is general knowledge (e.g., "What is machine learning?", "Explain black holes", "Write a binary search in Python"), answer naturally and accurately using your full knowledge base.
7. Understand spelling mistakes, Hindi, and Hinglish. Match the user's language tone naturally (English, Hindi, or Hinglish).
8. Maintain conversation context and understand follow-up questions naturally (e.g., if asked "What is Python?" followed by "Why is it popular?", understand that "it" refers to Python).
9. If you do not know something or if information is missing, be honest.

==================================================
PORTFOLIO CONTEXT (VIVEK HINGU)
==================================================
- Principal Engineer: Vivek Hingu
- Role: AI & Machine Learning Engineer / Full-Stack Developer
- Location: Ahmedabad, Gujarat, India
- Education: B.E. in Information Technology, SAL College of Engineering (CGPA: 8.61 / 10), July 2023 – June 2027.
- Core Technical Stack:
  - AI/ML & GenAI: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, LLMs, RAG Architecture, LangChain, LangGraph, Agentic AI, Vector DBs, Prompt Engineering, Cosine Similarity, NLP.
  - Web & Systems: Next.js 15, React, TypeScript, Node.js, Express.js, Flask, FastAPI, Docker, REST APIs, Tailwind CSS.
- Verified Projects:
  1. BharatBhasha AI — Multilingual Voice & Text AI OS (Node.js, Express.js, Grok API)
  2. Reverse Recipe Engine — Local Flavor AI Recommendation System (Python, Flask, Gemini API, Unsplash API)
  3. Book Recommender System — Machine Learning Engine (Python, Pandas, Scikit-learn, Cosine Similarity)
  4. AI Startup Success Predictor — Predictive Analytics Engine (Python, Scikit-learn, Pandas)
- Competition Honors & Achievements:
  1. Flinders University AI Hackathon (2nd Place Winner, AUD 300 Cash Prize) 🏆
  2. Google Cloud Arcade Champion 2025 ☁️
  3. Top 10 Finalist – AIT Hackathon 2K25 🏅
  4. Robo Soccer Competition (1st Prize Winner) 🥇
  5. TIC-TECH-TOE '25 (IEEE SB DAIICT) — Certificate of Appreciation
  6. tarkShaastra 2k26 (LDCE 24 Hours Hackathon)
  7. HACKOUT '25 (DA-IICT)
- Direct Contacts:
  - Email: hinguvivek05@gmail.com
  - GitHub: https://github.com/thatvivekhingu
  - LinkedIn: https://linkedin.com/in/vivekhingu
`;

export async function POST(req: Request) {
  try {
    const clientIp = getClientIdentifier(req);
    const rateLimit = checkRateLimit(`ai-chat:${clientIp}`, {
      windowMs: 60 * 1000,
      maxRequests: 30,
    });

    if (!rateLimit.allowed) {
      ServerLogger.warn("AiChatAPI", `Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body || typeof body.message !== "string" || !body.message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const message = (body.message as string).trim();
    const history = body.history || [];

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // Server-side safe logging (No secrets logged)
    ServerLogger.info("AiChatAPI", `[VIAN] Request received: "${message.slice(0, 40)}..."`);
    ServerLogger.info("AiChatAPI", `[VIAN] Groq configured: ${Boolean(GROQ_API_KEY)}`);
    ServerLogger.info("AiChatAPI", `[VIAN] Gemini fallback configured: ${Boolean(GEMINI_API_KEY)}`);

    const specialist = routeQueryToSpecialistAgent(message);
    const agentAugmentedPrompt = `${SYSTEM_PROMPT}\n\n[Active Specialist Directive]:\n${specialist.systemDirective}`;

    let fullResponse = "";

    // Web Search Tool Execution if query explicitly asks for search / latest news
    let searchContext = "";
    if (message.toLowerCase().startsWith("search ") || message.toLowerCase().includes("latest news")) {
      const searchRes = await executeWebSearch(message);
      searchContext = `\n\n[Web Search Results]:\n${searchRes.data}`;
    }

    const finalSystemInstruction = agentAugmentedPrompt + searchContext;

    // 1. Primary LLM Engine: Groq API (llama-3.1-8b-instant)
    if (GROQ_API_KEY) {
      try {
        ServerLogger.info("AiChatAPI", "[VIAN] Calling Groq API (llama-3.1-8b-instant)...");

        const formattedHistory = (history as Array<{ role?: string; sender?: string; content?: string; text?: string }>).map((h) => ({
          role: (h.role || h.sender) === "user" ? "user" : "assistant",
          content: h.content || h.text || "",
        }));

        const messages = [
          { role: "system", content: finalSystemInstruction },
          ...formattedHistory,
          { role: "user", content: message },
        ];

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages,
            temperature: 0.3,
            max_tokens: 1000,
          }),
          signal: AbortSignal.timeout(10000),
        });

        if (groqRes.ok) {
          const json = await groqRes.json();
          const candidateText = json.choices?.[0]?.message?.content;
          if (candidateText) {
            fullResponse = candidateText;
            ServerLogger.info("AiChatAPI", "[VIAN] Groq response received successfully.");
          }
        } else {
          const errText = await groqRes.text().catch(() => "");
          ServerLogger.warn("AiChatAPI", `[VIAN] Groq API error HTTP ${groqRes.status}: ${errText}`);
        }
      } catch (err) {
        ServerLogger.warn("AiChatAPI", "[VIAN] Groq API execution failed:", err);
      }
    }

    // 2. Secondary LLM Engine: Gemini 1.5 Flash Fallback
    if (!fullResponse && GEMINI_API_KEY) {
      try {
        ServerLogger.info("AiChatAPI", "[VIAN] Calling Gemini 1.5 Flash fallback...");

        const formattedHistory = (history as Array<{ role?: string; sender?: string; content?: string; text?: string }>).map((h) => ({
          role: (h.role || h.sender) === "user" ? "user" : "model",
          parts: [{ text: h.content || h.text || "" }],
        }));

        const contents = [
          { role: "user", parts: [{ text: finalSystemInstruction }] },
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] },
        ];

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
            signal: AbortSignal.timeout(10000),
          }
        );

        if (geminiRes.ok) {
          const json = await geminiRes.json();
          const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            fullResponse = candidateText;
            ServerLogger.info("AiChatAPI", "[VIAN] Gemini fallback response received successfully.");
          }
        }
      } catch (err) {
        ServerLogger.warn("AiChatAPI", "[VIAN] Gemini API execution failed:", err);
      }
    }

    // 3. High-Tech Local RAG Neural Engine Fallback (Zero Downtime Guarantee)
    if (!fullResponse) {
      ServerLogger.info("AiChatAPI", "[VIAN] LLMs unconfigured/unavailable. Utilizing built-in RAG Neural Engine...");

      const trimmedMsg = message.trim().toLowerCase();

      if (
        trimmedMsg.includes("who are you") ||
        trimmedMsg.includes("who is vian") ||
        trimmedMsg.includes("name") ||
        trimmedMsg.includes("who u") ||
        trimmedMsg.includes("who r u") ||
        trimmedMsg.includes("ur name")
      ) {
        fullResponse = "I am **VIAN** — Vivek's Intelligent Neural Assistant! 🤖 Powered by RAG architecture to answer questions about Vivek Hingu's AI/ML projects, skills, hackathon wins, and background.";
      } else if (
        trimmedMsg.includes("hi") ||
        trimmedMsg.includes("hello") ||
        trimmedMsg.includes("hey") ||
        trimmedMsg === "hlo"
      ) {
        fullResponse = "Hello! 👋 I am **VIAN**, Vivek Hingu's AI Assistant. How can I help you today? You can ask me about Vivek's **projects**, **AI/ML skills**, **hackathon wins**, or **contact info**!";
      } else {
        const localContext = retrieveRelevantKnowledge(message);
        fullResponse = `${localContext}\n\n*Feel free to ask me any specific question about Vivek Hingu's projects, technical stack, or background!*`;
      }
    }

    // Support both JSON response `{ "response": "..." }` and streaming
    const wantStream = req.headers.get("accept")?.includes("text/plain") || req.headers.get("x-stream") === "true";

    if (wantStream) {
      const encoder = new TextEncoder();
      const words = fullResponse.split(" ");

      const stream = new ReadableStream({
        async start(controller) {
          for (let i = 0; i < words.length; i++) {
            const chunk = words[i] + (i === words.length - 1 ? "" : " ");
            controller.enqueue(encoder.encode(chunk));
            await new Promise((resolve) => setTimeout(resolve, 15));
          }
          controller.close();
        },
      });

      return new NextResponse(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    return NextResponse.json({
      response: fullResponse,
    });
  } catch (error) {
    ServerLogger.error("AiChatAPI", "Unhandled exception in /api/ai-chat:", error);
    return NextResponse.json(
      { error: "VIAN service encountered an internal error. Please try again in a moment." },
      { status: 500 }
    );
  }
}
