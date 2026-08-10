import { NextResponse } from "next/server";
import { data } from "@/data/data";
import { routeQueryToSpecialistAgent } from "@/lib/vian/multi-agent";
import { executeWebSearch, executeCalculator } from "@/lib/vian/agent-tools";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are VIAN — Vivek's Intelligent Agentic Neural Assistant.

You are a professional, highly capable, proactive AI agent built using the Agno Agent framework and powered by Groq's llama-3.1-8b-instant inference engine.

Your purpose is not simply to generate text. Your purpose is to understand the user's goal, reason about the task, use appropriate tools/knowledge, execute actions when possible, verify results, remember useful context, and provide the best possible response.

==================================================
IDENTITY & PERSONA
==================================================

Name: VIAN
Full Name: Vivek's Intelligent Agentic Neural Assistant
Creator & Principal: Vivek Hingu (AI/ML Engineer & Full-Stack Developer)

You are an independent AI assistant.
Do not pretend to be ChatGPT, Claude, Gemini, Grok, Siri, or another assistant.
Your identity is always VIAN.

Personality:
- Intelligent
- Natural
- Helpful
- Proactive
- Calm
- Professional
- Friendly
- Technically strong
- Context-aware
- Honest

Do not constantly mention that you are an AI.

==================================================
CORE AGENT LOOP
==================================================

For every user request, follow this internal process:
UNDERSTAND → PLAN → ACT → VERIFY → RESPOND

Do not expose private chain-of-thought or hidden reasoning.
Only provide concise reasoning summaries when they help the user understand the result.

==================================================
PRINCIPAL KNOWLEDGE BASE (VIVEK HINGU)
==================================================

- Principal Engineer: Vivek Hingu
- Role: AI/ML Engineer & Full-Stack Developer
- Location: Ahmedabad, Gujarat, India (Global availability)
- Degree: Bachelor of Engineering (B.E.) in Information Technology, SAL College of Engineering (CGPA: 8.61 / 10), July 2023 – June 2027
- Core Capabilities: Agentic AI, PyTorch, TensorFlow, OpenCV, RAG Pipelines, Scikit-learn, Next.js 15, React, TypeScript, FastAPI, Docker, C++
- Verified Builds & Systems:
  1. BharatBhasha AI — Multilingual Voice & Text AI OS (Grok API, Node.js, Express.js)
  2. Reverse Recipe Engine — Local Flavor AI Recommendation System (Python, Flask, Gemini API)
  3. Book Recommender System — Machine Learning Engine (Python, Scikit-learn, Cosine Similarity)
  4. AI Startup Success Predictor — Predictive Analytics Engine
- Competition Honors & Milestones:
  1. Flinders University AI Hackathon (2nd Place Winner, AUD 300 Cash Prize) 🏆
  2. Google Cloud Arcade Champion 2025 ☁️
  3. Top 10 Finalist – AIT Hackathon 2K25 🏅
  4. Robo Soccer Competition (1st Prize Winner) 🥇
  5. TIC-TECH-TOE '25 (IEEE SB DAIICT) — Certificate of Appreciation
  6. tarkShaastra 2k26 (LDCE 24 Hours Hackathon)
- Direct Action Endpoints:
  - Email: hinguvivek05@gmail.com
  - GitHub: https://github.com/thatvivekhingu
  - LinkedIn: https://linkedin.com/in/vivekhingu

==================================================
PROGRAMMING & PROJECT DEVELOPMENT MODE
==================================================

When the user asks programming or project development questions:
- Act as a senior software engineer and AI engineering partner.
- Provide correct code, clear explanations, practical commands, debugging steps, and production-quality solutions.

==================================================
LANGUAGE & RESPONSE STYLE
==================================================

- Match the user's language automatically (English, Hindi, Hinglish).
- Use structured explanations, clear headings, bullet points, and code blocks.
- Avoid repeating the question, unnecessary filler, generic disclaimers ("As an AI language model..."), fake enthusiasm, or unnecessary emojis.

You are VIAN. You are an Agentic AI Assistant.
`;

/**
 * Dynamic Multi-Agent Synthesizer: Synthesizes a query-specific response by extracting relevant portfolio data
 */
function synthesizeDynamicAgentResponse(query: string): string {
  const qLower = query.trim().toLowerCase();

  // Clean greeting intent check
  if (/^(hi|hello|hey|greetings|namaste|hola|good\s*(morning|afternoon|evening))[\s!.?]*$/i.test(qLower)) {
    return "Greetings! 👋 I am **VIAN** — Vivek Hingu's Intelligent Agentic Neural Assistant (powered by Agno Framework & Groq `llama-3.1-8b-instant`).\n\nHow can I assist you with Vivek's **engineering projects**, **machine learning stack**, **hackathons**, or **contact details** today?";
  }

  const qTokens = qLower.split(/\W+/).filter((t) => t.length >= 3);
  const hasWord = (text: string, token: string) => new RegExp(`\\b${token}\\b`, "i").test(text);

  // Dynamic matching against projects
  const matchingProjects = data.projects.filter((p) => {
    const text = `${p.title} ${p.description} ${p.technologies.join(" ")}`;
    return qTokens.some((token) => hasWord(text, token));
  });

  // Dynamic matching against achievements & hackathons
  const matchingAchievements = data.achievements.filter((a) => {
    const text = `${a.title} ${a.description} ${a.metrics} ${a.category}`;
    return qTokens.some((token) => hasWord(text, token));
  });

  const matchingHackathons = data.hackathons.filter((h) => {
    const text = `${h.title} ${h.description} ${h.award} ${h.organizer} ${h.tags.join(" ")}`;
    return qTokens.some((token) => hasWord(text, token));
  });

  const sections: string[] = [];

  // Profile / Bio intent
  if (qLower.includes("who") || qLower.includes("about") || qLower.includes("bio") || qLower.includes("vian") || qLower.includes("vivek")) {
    sections.push(`🤖 **Agent Resolution: Profile Synthesis**\n\n- **Principal**: Vivek Hingu (AI & Machine Learning Engineer)\n- **Overview**: ${data.summary}\n- **Location**: Ahmedabad, Gujarat, India`);
  }

  // Projects intent or keyword match
  if (matchingProjects.length > 0 || (qLower.includes("project") && !qLower.includes("skill"))) {
    const targetProjs = matchingProjects.length > 0 ? matchingProjects : data.projects;
    const projList = targetProjs
      .map((p) => `• **${p.title}** (${p.technologies.join(", ")})\n  - *Description*: ${p.description}\n  - *Link*: [GitHub Repository](${p.href})`)
      .join("\n\n");
    sections.push(`### 🛠️ Agent Query Match: Engineering Systems\n\n${projList}`);
  }

  // Hackathons & Awards intent
  if (matchingAchievements.length > 0 || matchingHackathons.length > 0 || qLower.includes("hackathon") || qLower.includes("award") || qLower.includes("winner")) {
    const achList = [
      ...matchingAchievements.map((a) => `• **${a.title}** (${a.date}) — ${a.description} (${a.metrics})`),
      ...matchingHackathons.map((h) => `• **${h.title}** (${h.award}, ${h.organizer}) — ${h.description}`),
    ].join("\n");
    sections.push(`### 🏆 Agent Query Match: Competition Honors\n\n${achList}`);
  }

  // Education intent
  if (qLower.includes("education") || qLower.includes("college") || qLower.includes("degree") || qLower.includes("cgpa") || qLower.includes("sal")) {
    sections.push(`### 🎓 Agent Query Match: Academic Credentials\n\n- **Degree**: Bachelor of Engineering (B.E.) in Information Technology\n- **Institution**: SAL College of Engineering, Ahmedabad\n- **CGPA**: **8.61 / 10** (July 2023 – June 2027)\n- **Core Focus**: Machine Learning, Artificial Intelligence, Data Structures & Algorithms, Python.`);
  }

  // Skills intent
  if (qLower.includes("skill") || qLower.includes("stack") || qLower.includes("tool") || qLower.includes("python") || qLower.includes("tech") || qLower.includes("pytorch")) {
    sections.push(`### ⚡ Agent Query Match: Technical Stack\n\n- **AI & ML**: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, LLMs, RAG Architecture, LangChain, Agentic AI\n- **Web Engineering**: Next.js 15, React, TypeScript, Node.js, Express.js, Flask, FastAPI, Tailwind CSS\n- **DevOps**: Docker, Git, Linux, Vercel CI/CD`);
  }

  // Contact intent
  if (qLower.includes("contact") || qLower.includes("email") || qLower.includes("reach") || qLower.includes("hire") || qLower.includes("github") || qLower.includes("linkedin") || qLower.includes("mail")) {
    sections.push(`### 📬 Agent Direct Action Endpoints\n\n- **Email**: [hinguvivek05@gmail.com](mailto:hinguvivek05@gmail.com)\n- **GitHub**: [github.com/thatvivekhingu](https://github.com/thatvivekhingu)\n- **LinkedIn**: [linkedin.com/in/vivekhingu](https://linkedin.com/in/vivekhingu)`);
  }

  // Age / Creation intent
  if (qLower.includes("age") || qLower.includes("old") || qLower.includes("created")) {
    sections.push(`🤖 **Agent Status**: As **VIAN**, I am an Agentic AI Assistant built by Vivek Hingu (AI/ML Engineer). I don't have a physical human age, but I was deployed as part of Vivek's modern portfolio architecture!\n\nIf you're asking about Vivek Hingu's academic background, he is currently pursuing his B.E. in IT (2023 – 2027) at SAL College of Engineering (CGPA 8.61/10).`);
  }

  // General conversational intent
  if (qLower.includes("how are you") || qLower.includes("whats up") || qLower.includes("what's up") || qLower.includes("how r u")) {
    sections.push(`🤖 **VIAN Agent Status**: Systems fully operational and running on Agno Framework & Groq \`llama-3.1-8b-instant\` core!\n\nHow can I help you evaluate Vivek Hingu's **AI projects**, **technical stack**, or **hackathons**?`);
  }

  if (sections.length > 0) {
    return sections.join("\n\n---\n\n");
  }

  // Natural query fallback response
  return `I am **VIAN** — Vivek Hingu's Agentic AI Assistant (Agno Framework / Groq \`llama-3.1-8b-instant\`).\n\nRegarding **"${query}"**: Vivek Hingu is an AI/ML Engineer based in Ahmedabad, building intelligent software, autonomous models, and full-stack applications. Feel free to ask me anything specific about his **projects**, **skills**, **hackathons**, or **contact details**!`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return new NextResponse("🤖 **VIAN Agent Online** | Agno Core // llama-3.1-8b-instant active. State your query.", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const specialist = routeQueryToSpecialistAgent(message);
    const agentAugmentedPrompt = `${SYSTEM_PROMPT}\n\n[Active Multi-Agent Router Directive]:\n${specialist.systemDirective}`;

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
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages,
            temperature: 0.2,
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
        console.warn("Agno / Groq API call warning, using Gemini fallback:", err);
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
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:key=${GEMINI_API_KEY}`,
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
        console.warn("Gemini API call warning, utilizing dynamic agent synthesizer:", err);
      }
    }

    // 3. Dynamic Multi-Agent Synthesizer Fallback & Agentic Tool Execution
    if (!fullResponse) {
      if (/^[0-9+\-*/().^%\s]+$/.test(message.trim()) && message.trim().length > 1) {
        const calcRes = executeCalculator(message.trim());
        fullResponse = `🧮 **Agent Tool Execution (Calculator)**:\n\n\`${calcRes.data}\``;
      } else if (message.toLowerCase().startsWith("search ") || message.toLowerCase().includes("latest news")) {
        const searchRes = await executeWebSearch(message);
        fullResponse = `🌐 **Agent Tool Execution (WebSearch)**:\n\n${searchRes.data}\n\n${synthesizeDynamicAgentResponse(message)}`;
      } else {
        fullResponse = synthesizeDynamicAgentResponse(message);
      }
    }

    // 4. Return Real-Time Progressive ReadableStream
    const encoder = new TextEncoder();
    const words = fullResponse.split(" ");

    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i === words.length - 1 ? "" : " ");
          controller.enqueue(encoder.encode(chunk));
          await new Promise((resolve) => setTimeout(resolve, 18));
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
  } catch (error) {
    console.error("VIAN Agent API Error:", error);
    return new NextResponse("🤖 **VIAN Agent Core Active** | State your query regarding Vivek Hingu's portfolio.", {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
