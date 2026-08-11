import { NextResponse } from "next/server";
import { data } from "@/data/data";
import { routeQueryToSpecialistAgent } from "@/lib/vian/multi-agent";
import { executeWebSearch, executeCalculator } from "@/lib/vian/agent-tools";
import { checkRateLimit, getClientIdentifier } from "@/lib/server/rate-limiter";
import { ServerLogger } from "@/lib/server/logger";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are VIAN — Vivek Hingu's Personal AI Assistant.

==================================================
CONVERSATIONAL STYLE & CHATGPT PERSONALITY
==================================================
1. Speak naturally, warmly, fluidly, and intelligently — exactly like ChatGPT (GPT-4o).
2. Avoid robotic disclaimers, rigid template headers (do NOT use headers like "🤖 Profile Overview" or "### 🛠️ Portfolio Projects"), and formal database dumps.
3. Adapt seamlessly to the user's language (English, Hindi, Hinglish).
4. For simple questions or greetings, answer directly and warmly.
5. For technical or portfolio questions, explain in clear, engaging, well-formatted paragraphs with markdown bolding.
6. Keep answers concise by default, but provide comprehensive details when requested.

==================================================
KNOWLEDGE BASE (VIVEK HINGU)
==================================================
- Principal Engineer: Vivek Hingu
- Role: AI & Machine Learning Engineer / Full-Stack Developer
- Location: Ahmedabad, Gujarat, India
- Education: B.E. in Information Technology, SAL College of Engineering (CGPA: 8.61 / 10), July 2023 – June 2027.
- Core Technical Stack:
  - AI/ML & GenAI: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, LLMs, RAG Architecture, LangChain, LangGraph, Agentic AI, Vector DBs, Prompt Engineering, Cosine Similarity, NLP.
  - Web & Systems: Next.js 15, React, TypeScript, Node.js, Express.js, Flask, FastAPI, Docker, REST APIs, Tailwind CSS.
- Verified Builds & Systems:
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

==================================================
STRICT HONESTY DIRECTIVE
==================================================
If the user asks a question about Vivek that is not covered in your knowledge base, respond naturally and state that you don't have that specific detail in Vivek's portfolio context.
`;

/**
 * Natural Conversational RAG Synthesizer (ChatGPT Style)
 */
function synthesizeDynamicAgentResponse(query: string): string {
  const qLower = query.trim().toLowerCase();

  // Natural greeting
  if (/^(hi|hello|hey|greetings|namaste|hola|good\s*(morning|afternoon|evening))[\s!.?]*$/i.test(qLower)) {
    return "Hello! 👋 I am **VIAN**, Vivek Hingu's personal AI assistant. How can I help you explore Vivek's AI/ML projects, technical stack, hackathons, or contact details today?";
  }

  // General conversational queries ("how are you", "who created you", "what is your age")
  if (qLower.includes("how are you") || qLower.includes("whats up") || qLower.includes("what's up")) {
    return "I'm doing great and fully operational! 🚀 How can I assist you with Vivek Hingu's portfolio or engineering work today?";
  }

  if (qLower.includes("age") || qLower.includes("old")) {
    return "I don't have a human age since I'm VIAN, an AI assistant built for Vivek Hingu's portfolio! However, if you're interested in Vivek's background, he is currently pursuing his B.E. in IT (2023–2027) at SAL College of Engineering with an 8.61/10 CGPA.";
  }

  const qTokens = qLower.split(/\W+/).filter((t) => t.length >= 3);
  const hasWord = (text: string, token: string) => new RegExp(`\\b${token}\\b`, "i").test(text);

  const matchingProjects = data.projects.filter((p) => {
    const text = `${p.title} ${p.description} ${p.technologies.join(" ")}`;
    return qTokens.some((token) => hasWord(text, token));
  });

  const matchingAchievements = data.achievements.filter((a) => {
    const text = `${a.title} ${a.description} ${a.metrics} ${a.category}`;
    return qTokens.some((token) => hasWord(text, token));
  });

  const matchingHackathons = data.hackathons.filter((h) => {
    const text = `${h.title} ${h.description} ${h.award} ${h.organizer} ${h.tags.join(" ")}`;
    return qTokens.some((token) => hasWord(text, token));
  });

  const paragraphs: string[] = [];

  // Profile intent
  if (qLower.includes("who") || qLower.includes("about") || qLower.includes("bio") || qLower.includes("vian") || qLower.includes("vivek")) {
    paragraphs.push(`Vivek Hingu is an **AI & Machine Learning Engineer** based in Ahmedabad, India. He specializes in building intelligent software, autonomous Agentic AI models, RAG pipelines, and high-performance web systems.\n\nHe is currently pursuing his **B.E. in Information Technology** at SAL College of Engineering (CGPA: 8.61 / 10).`);
  }

  // Projects intent
  if (matchingProjects.length > 0 || (qLower.includes("project") && !qLower.includes("skill"))) {
    const targetProjs = matchingProjects.length > 0 ? matchingProjects : data.projects;
    const projDetails = targetProjs
      .map((p) => `• **${p.title}** (${p.technologies.join(", ")})\n  ${p.description}\n  [View GitHub Repository](${p.href})`)
      .join("\n\n");
    paragraphs.push(`Here are Vivek's featured engineering builds:\n\n${projDetails}`);
  }

  // Hackathons & Achievements intent
  if (matchingAchievements.length > 0 || matchingHackathons.length > 0 || qLower.includes("hackathon") || qLower.includes("award") || qLower.includes("winner")) {
    const achDetails = [
      ...matchingAchievements.map((a) => `• **${a.title}** (${a.date}) — ${a.description} (${a.metrics})`),
      ...matchingHackathons.map((h) => `• **${h.title}** (${h.award}, ${h.organizer}) — ${h.description}`),
    ].join("\n");
    paragraphs.push(`Here are Vivek's major competition awards and hackathon recognitions:\n\n${achDetails}`);
  }

  // Education intent
  if (qLower.includes("education") || qLower.includes("college") || qLower.includes("degree") || qLower.includes("cgpa") || qLower.includes("sal")) {
    paragraphs.push(`Vivek is pursuing a **Bachelor of Engineering (B.E.) in Information Technology** at **SAL College of Engineering**, Ahmedabad (CGPA: **8.61 / 10**), spanning July 2023 to June 2027.`);
  }

  // Skills intent
  if (qLower.includes("skill") || qLower.includes("stack") || qLower.includes("tool") || qLower.includes("python") || qLower.includes("tech") || qLower.includes("pytorch")) {
    paragraphs.push(`Vivek's core technical stack includes:\n\n• **AI & ML**: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, LLMs, RAG Architecture, LangChain, LangGraph, Agentic AI, Vector Databases.\n• **Web Engineering**: Next.js 15, React, TypeScript, Node.js, Express.js, Flask, FastAPI, Docker, Tailwind CSS.`);
  }

  // Contact intent
  if (qLower.includes("contact") || qLower.includes("email") || qLower.includes("reach") || qLower.includes("hire") || qLower.includes("github") || qLower.includes("linkedin") || qLower.includes("mail")) {
    paragraphs.push(`You can get in touch with Vivek directly via:\n\n• **Email**: [hinguvivek05@gmail.com](mailto:hinguvivek05@gmail.com)\n• **GitHub**: [github.com/thatvivekhingu](https://github.com/thatvivekhingu)\n• **LinkedIn**: [linkedin.com/in/vivekhingu](https://linkedin.com/in/vivekhingu)`);
  }

  if (paragraphs.length > 0) {
    return paragraphs.join("\n\n");
  }

  return `Regarding **"${query}"**: I don't have that specific detail in Vivek's portfolio context. Feel free to ask me anything about Vivek's **AI/ML projects**, **technical skills**, **education**, **hackathons**, or **contact information**!`;
}

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
        { response: "⚠️ **Rate Limit Exceeded**: Too many requests in a short period. Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body || typeof body.message !== "string" || !body.message.trim()) {
      return NextResponse.json(
        { response: "Hello! 👋 I am **VIAN**, Vivek Hingu's personal AI assistant. How can I help you today?" },
        { status: 400 }
      );
    }

    const message = (body.message as string).trim();
    const history = body.history || [];

    const specialist = routeQueryToSpecialistAgent(message);
    const agentAugmentedPrompt = `${SYSTEM_PROMPT}\n\n[Active Specialist Directive]:\n${specialist.systemDirective}`;

    let fullResponse = "";

    // 1. Primary Engine: Agno Agent / Groq API (llama-3.1-8b-instant)
    if (GROQ_API_KEY) {
      try {
        const formattedHistory = (history as Array<{ role?: string; sender?: string; content?: string; text?: string }>).map((h) => ({
          role: (h.role || h.sender) === "user" ? "user" : "assistant",
          content: h.content || h.text || "",
        }));

        const messages = [
          { role: "system", content: agentAugmentedPrompt },
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
          signal: AbortSignal.timeout(8000),
        });

        if (groqRes.ok) {
          const json = await groqRes.json();
          const candidateText = json.choices?.[0]?.message?.content;
          if (candidateText) {
            fullResponse = candidateText;
          }
        }
      } catch (err) {
        ServerLogger.warn("AiChatAPI", "Groq API call failed, falling back to Gemini/RAG:", err);
      }
    }

    // 2. Secondary Engine: Gemini 1.5 Flash Fallback
    if (!fullResponse && GEMINI_API_KEY) {
      try {
        const formattedHistory = (history as Array<{ role?: string; sender?: string; content?: string; text?: string }>).map((h) => ({
          role: (h.role || h.sender) === "user" ? "user" : "model",
          parts: [{ text: h.content || h.text || "" }],
        }));

        const contents = [
          { role: "user", parts: [{ text: agentAugmentedPrompt }] },
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] },
        ];

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
            signal: AbortSignal.timeout(8000),
          }
        );

        if (geminiRes.ok) {
          const json = await geminiRes.json();
          const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            fullResponse = candidateText;
          }
        }
      } catch (err) {
        ServerLogger.warn("AiChatAPI", "Gemini API call failed, falling back to RAG:", err);
      }
    }

    // 3. Natural Conversational Synthesizer Fallback & Tool Execution
    if (!fullResponse) {
      if (/^[0-9+\-*/().^%\s]+$/.test(message) && message.length > 1) {
        const calcRes = executeCalculator(message);
        fullResponse = `Here is the result of your calculation:\n\n\`${calcRes.data}\``;
      } else if (message.toLowerCase().startsWith("search ") || message.toLowerCase().includes("latest news")) {
        const searchRes = await executeWebSearch(message);
        fullResponse = `Here is what I found on the web:\n\n${searchRes.data}\n\n${synthesizeDynamicAgentResponse(message)}`;
      } else {
        fullResponse = synthesizeDynamicAgentResponse(message);
      }
    }

    // Support both JSON response format `{ "response": "..." }` and streaming
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
      { response: "Hello! 👋 I am **VIAN**, Vivek Hingu's personal AI assistant. How can I assist you with Vivek's portfolio today?" },
      { status: 500 }
    );
  }
}
