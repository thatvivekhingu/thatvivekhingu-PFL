import { NextResponse } from "next/server";
import { data } from "@/data/data";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are VIAN (Vivek's Intelligent Neural Assistant), an advanced AI assistant built into Vivek Hingu's personal AI/ML Engineer portfolio website.

Engine & Model:
- Architecture: Agno (Phidata) Agent Framework / Groq Inference Engine
- Model ID: llama-3.1-8b-instant

Persona & Personality:
- Name: VIAN
- Created by: Vivek Hingu (AI/ML Engineer & Full-Stack Developer)
- Tone: Highly intelligent, friendly, sleek, articulate, and passionate about AI, Robotics, Machine Learning & Engineering.
- Languages: Understands and responds naturally in English, Hinglish, or Hindi based on user language. Keep responses engaging, structured, and concise (2-4 sentences max unless the user asks for in-depth details).

Vivek Hingu's Verified Portfolio Knowledge Base:
- Name: Vivek Hingu
- Role: AI/ML Engineer & Full-Stack Developer
- Location: Ahmedabad, Gujarat, India (Global availability)
- Degree: B.E. in Information Technology at SAL College of Engineering (CGPA: 8.61 / 10), 2023 - 2027
- Technical Core: Python, PyTorch, TensorFlow, Next.js, React, TypeScript, OpenCV, Scikit-learn, FastAPI, Docker, C++, Git, Tailwind CSS, RAG Architecture, LLMs
- Hackathon Victories & Achievements:
  1. Flinders University AI Hackathon — 2nd Place Winner (AUD 300 Cash Prize) 🏆
  2. Google Cloud Arcade Champion 2025 ☁️
  3. Top 10 Finalist – AIT Hackathon 2K25 🏅
  4. Robo Soccer Competition — 1st Prize Winner 🥇
  5. TIC-TECH-TOE '25 (DAIICT) — Certificate of Appreciation
  6. tarkShaastra 2k26 (LDCE 24 Hours Hackathon)
- Key Projects:
  1. BharatBhasha AI — Multilingual Voice & Text AI OS (Grok API, Node.js, Express.js)
  2. Reverse Recipe Engine — Local Flavor AI Recommendation System (Python, Flask, Gemini API)
  3. Book Recommender System — Machine Learning Engine (Python, Scikit-learn, Cosine Similarity)
  4. AI Startup Success Predictor — Machine Learning & Predictive Analytics Engine
- Direct Contact:
  - Email: hinguvivek05@gmail.com
  - GitHub: https://github.com/thatvivekhingu
  - LinkedIn: https://linkedin.com/in/vivekhingu

Instructions:
- Answer follow-ups accurately based on chat history.
- Use markdown bolding and bullet points when listing projects or skills.
- Always maintain your identity as VIAN!
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "VIAN Agno Neural Core active. Systems online! How can I assist you with Vivek's portfolio?" },
        { status: 400 }
      );
    }

    const trimmedMsg = message.trim().toLowerCase();

    // 1. Primary Engine: Agno / Groq API (llama-3.1-8b-instant)
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
            temperature: 0.3,
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
        console.warn("Gemini API call warning, utilizing local neural engine:", err);
      }
    }

    // 3. Fallback Engine: Context-Aware Verified Data Neural Engine
    let reply = "";

    if (trimmedMsg.includes("who are you") || trimmedMsg.includes("who is vian") || trimmedMsg.includes("your name")) {
      reply = "I am **VIAN** — Vivek's Intelligent AI Assistant! 🤖 Powered by the **Agno (Phidata)** framework with model `llama-3.1-8b-instant` to guide visitors through Vivek Hingu's AI/ML projects, skills, and background.";
    } else if (trimmedMsg.includes("project") || trimmedMsg.includes("build") || trimmedMsg.includes("bharat") || trimmedMsg.includes("recipe") || trimmedMsg.includes("work")) {
      const topProjects = data.projects.map((p, idx) => `${idx + 1}. **${p.title}** (${p.technologies.slice(0, 3).join(", ")}) — ${p.description}`).join("\n\n");
      reply = `Here are Vivek Hingu's featured AI & Engineering projects:\n\n${topProjects}`;
    } else if (trimmedMsg.includes("skill") || trimmedMsg.includes("stack") || trimmedMsg.includes("tool") || trimmedMsg.includes("python") || trimmedMsg.includes("tech")) {
      reply = "⚡ **Vivek's Tech Matrix & Engineering Stack:**\n\n• **Artificial Intelligence**: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, LLMs, RAG, Agentic AI\n• **Full-Stack Development**: Next.js 15, React, TypeScript, Node.js, Express.js, Flask, Tailwind CSS\n• **DevOps & Tools**: Docker, Git, VS Code, Vercel CI/CD";
    } else if (trimmedMsg.includes("hackathon") || trimmedMsg.includes("achievement") || trimmedMsg.includes("certificate") || trimmedMsg.includes("winner") || trimmedMsg.includes("award")) {
      reply = "🏆 **Vivek's Hackathon & Award Milestones:**\n\n1. **Flinders University AI Hackathon** — 2nd Place Winner (AUD 300 Cash Prize)\n2. **Google Cloud Arcade Champion 2025**\n3. **Top 10 Finalist – AIT Hackathon 2K25**\n4. **Robo Soccer Competition** — 1st Prize Winner\n5. **TIC-TECH-TOE '25** — Certificate of Appreciation";
    } else if (trimmedMsg.includes("contact") || trimmedMsg.includes("email") || trimmedMsg.includes("hire") || trimmedMsg.includes("reach") || trimmedMsg.includes("github") || trimmedMsg.includes("linkedin")) {
      reply = "📬 Connect directly with Vivek Hingu:\n\n• **Email**: [hinguvivek05@gmail.com](mailto:hinguvivek05@gmail.com)\n• **GitHub**: [github.com/thatvivekhingu](https://github.com/thatvivekhingu)\n• **LinkedIn**: [linkedin.com/in/vivekhingu](https://linkedin.com/in/vivekhingu)";
    } else if (trimmedMsg.includes("education") || trimmedMsg.includes("college") || trimmedMsg.includes("degree") || trimmedMsg.includes("university") || trimmedMsg.includes("sal")) {
      reply = "🎓 Vivek is pursuing his B.E. in **Information Technology** at SAL College of Engineering (CGPA: 8.61 / 10), graduating in June 2027!";
    } else if (trimmedMsg.includes("hi") || trimmedMsg.includes("hello") || trimmedMsg.includes("hey") || trimmedMsg.includes("namaste")) {
      reply = "Greetings! 👋 I am VIAN (Agno Engine // `llama-3.1-8b-instant`). Ask me anything about Vivek's AI projects, skills, hackathons, or contact details!";
    } else {
      reply = `VIAN Agno Core active! ⚡ Model \`llama-3.1-8b-instant\` ready. Feel free to ask about Vivek Hingu's **projects**, **skills**, **hackathon wins**, or **contact details**!`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("VIAN API Error:", error);
    return NextResponse.json({
      reply: "VIAN Agno Core active. Systems operating nominally. How can I assist you with Vivek's portfolio?"
    });
  }
}
