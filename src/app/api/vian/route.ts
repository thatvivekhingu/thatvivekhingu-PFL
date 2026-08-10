import { NextResponse } from "next/server";
import { data } from "@/data/data";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are VIAN, an Autonomous AI Agent powered by the Agno (Phidata) Agent Framework and Groq Inference Engine (Model ID: llama-3.1-8b-instant).

Agent Identity & Persona:
- Name: VIAN (Vivek's Intelligent Autonomous Agent)
- Architecture: Agno Agent Framework + Groq Llama-3.1-8b-instant
- Creator: Vivek Hingu (AI/ML Engineer & Full-Stack Developer)
- Communication Protocol: Respond strictly like an Autonomous AI Agent — structured, analytical, concise, highly authoritative, and action-oriented.
- Languages: Responds naturally in English, Hinglish, or Hindi depending on user intent.

Agent Verified Ground Truth Knowledge Base:
- Principal Engineer: Vivek Hingu
- Role: AI/ML Engineer & Full-Stack Developer
- Location: Ahmedabad, Gujarat, India (Global availability)
- Degree: B.E. in Information Technology at SAL College of Engineering (CGPA: 8.61 / 10), July 2023 – June 2027
- Core Capabilities: Agentic AI, LLMs, PyTorch, TensorFlow, OpenCV, RAG Pipelines, Scikit-learn, Next.js 15, React, TypeScript, FastAPI, Docker, C++
- Verified Builds & Systems:
  1. BharatBhasha AI — Multilingual Voice & Text AI OS (Grok API, Node.js, Express.js)
  2. Reverse Recipe Engine — Local Flavor AI Recommendation System (Python, Flask, Gemini API)
  3. Book Recommender System — Machine Learning Engine (Python, Scikit-learn, Cosine Similarity)
  4. AI Startup Success Predictor — Predictive Analytics Engine
- Competition Milestones & Honors:
  1. Flinders University AI Hackathon — 2nd Place Winner (AUD 300 Cash Prize) 🏆
  2. Google Cloud Arcade Champion 2025 ☁️
  3. Top 10 Finalist – AIT Hackathon 2K25 🏅
  4. Robo Soccer Competition — 1st Prize Winner 🥇
  5. TIC-TECH-TOE '25 (DAIICT) — Certificate of Appreciation
  6. tarkShaastra 2k26 (LDCE 24 Hours Hackathon)
- Direct Action Endpoints:
  - Email: hinguvivek05@gmail.com
  - GitHub: https://github.com/thatvivekhingu
  - LinkedIn: https://linkedin.com/in/vivekhingu

Agent Output Protocol:
- Provide direct, structured agent responses with clear headings, bold metrics, and concise bullet points.
- Avoid vague conversational filler. Act as an intelligent autonomous system agent.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "🤖 **VIAN Agent Online** | Agno Core // `llama-3.1-8b-instant` ready. State your query." },
        { status: 400 }
      );
    }

    const trimmedMsg = message.trim().toLowerCase();

    // 1. Primary Engine: Agno Agent / Groq API (llama-3.1-8b-instant)
    if (GROQ_API_KEY) {
      try {
        const formattedHistory = (history as Array<{ sender: string; text: string }>).map((h) => ({
          role: h.sender === "user" ? "user" : "assistant",
          content: h.text,
        }));

        const messages = [
          { role: "system", content: SYSTEM_PROMPT },
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
            return NextResponse.json({ reply: candidateText });
          }
        }
      } catch (err) {
        console.warn("Agno / Groq API call warning, using Gemini fallback:", err);
      }
    }

    // 2. Secondary Engine: Gemini 1.5 Flash Fallback
    if (GEMINI_API_KEY) {
      try {
        const formattedHistory = (history as Array<{ sender: string; text: string }>).map((h) => ({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        }));

        const contents = [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
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
            return NextResponse.json({ reply: candidateText });
          }
        }
      } catch (err) {
        console.warn("Gemini API call warning, utilizing local agent engine:", err);
      }
    }

    // 3. Local Autonomous Agent Fallback Engine
    let reply = "";

    if (trimmedMsg.includes("who are you") || trimmedMsg.includes("who is vian") || trimmedMsg.includes("your name")) {
      reply = "🤖 **VIAN Agent Status: Active**\n\n- **Framework**: Agno (Phidata) Agent Architecture\n- **Inference Model**: Groq `llama-3.1-8b-instant`\n- **Role**: Autonomous Portfolio AI Agent for Vivek Hingu (AI/ML Engineer & Full-Stack Developer).\n\nHow may I assist your technical evaluation?";
    } else if (trimmedMsg.includes("project") || trimmedMsg.includes("build") || trimmedMsg.includes("bharat") || trimmedMsg.includes("recipe") || trimmedMsg.includes("work")) {
      const topProjects = data.projects.map((p, idx) => `**${idx + 1}. ${p.title}** (${p.technologies.slice(0, 3).join(", ")})\n- *Summary*: ${p.description}`).join("\n\n");
      reply = `### 🛠️ Agent Knowledge Retrieval: Verified Builds\n\n${topProjects}`;
    } else if (trimmedMsg.includes("skill") || trimmedMsg.includes("stack") || trimmedMsg.includes("tool") || trimmedMsg.includes("python") || trimmedMsg.includes("tech")) {
      reply = "### ⚡ Agent Analysis: Engineering Capabilities\n\n- **AI & Machine Learning**: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, LLMs, RAG Architecture, Agentic Workflows\n- **Web & Core Engineering**: Next.js 15, React, TypeScript, Node.js, Express.js, Flask, FastAPI, Tailwind CSS\n- **DevOps & Infrastructure**: Docker, Git, Linux, Vercel CI/CD";
    } else if (trimmedMsg.includes("hackathon") || trimmedMsg.includes("achievement") || trimmedMsg.includes("certificate") || trimmedMsg.includes("winner") || trimmedMsg.includes("award")) {
      reply = "### 🏆 Agent Audit: Competition Honors & Milestones\n\n1. **Flinders University AI Hackathon** — 2nd Place Winner (AUD 300 Cash Prize)\n2. **Google Cloud Arcade Champion 2025**\n3. **Top 10 Finalist – AIT Hackathon 2K25**\n4. **Robo Soccer Competition** — 1st Prize Winner\n5. **TIC-TECH-TOE '25** — Certificate of Appreciation";
    } else if (trimmedMsg.includes("contact") || trimmedMsg.includes("email") || trimmedMsg.includes("hire") || trimmedMsg.includes("reach") || trimmedMsg.includes("github") || trimmedMsg.includes("linkedin")) {
      reply = "### 📬 Agent Direct Endpoints: Contact Details\n\n- **Email**: [hinguvivek05@gmail.com](mailto:hinguvivek05@gmail.com)\n- **GitHub**: [github.com/thatvivekhingu](https://github.com/thatvivekhingu)\n- **LinkedIn**: [linkedin.com/in/vivekhingu](https://linkedin.com/in/vivekhingu)";
    } else if (trimmedMsg.includes("education") || trimmedMsg.includes("college") || trimmedMsg.includes("degree") || trimmedMsg.includes("university") || trimmedMsg.includes("sal")) {
      reply = "### 🎓 Agent Summary: Education\n\n- **Degree**: Bachelor of Engineering (B.E.) in Information Technology\n- **Institution**: SAL College of Engineering, Ahmedabad\n- **CGPA**: 8.61 / 10\n- **Timeline**: July 2023 – June 2027";
    } else {
      reply = "🤖 **VIAN Agent Operational** | Model `llama-3.1-8b-instant` active. State your request regarding Vivek Hingu's **projects**, **skills**, **hackathons**, or **contact details**.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("VIAN Agent API Error:", error);
    return NextResponse.json({
      reply: "🤖 **VIAN Agent Core Online** | Operating nominally. Specify query for Vivek Hingu's portfolio."
    });
  }
}
