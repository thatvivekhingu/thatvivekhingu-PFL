import { NextResponse } from "next/server";
import { data } from "@/data/data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 1. RAG Knowledge Document Base (Indexed Chunks)
const KNOWLEDGE_BASE = [
  {
    id: "kb-profile",
    keywords: ["who", "name", "vian", "vivek", "bio", "about", "role", "profile"],
    content: "Vivek Hingu is an AI/ML Engineer based in Ahmedabad, Gujarat, India. He builds autonomous AI agents, computer vision systems, and modern AI applications.",
  },
  {
    id: "kb-education",
    keywords: ["education", "college", "degree", "university", "sal", "cgpa", "gpa", "btech", "be", "it"],
    content: "Vivek completed his Bachelor of Engineering (B.E.) in Information Technology at SAL College of Engineering with an 8.61 / 10 CGPA. He is also pursuing coursework in Artificial Intelligence & Data Science at LJ Institute of Engineering and Technology (GPA 8.2).",
  },
  {
    id: "kb-projects",
    keywords: ["project", "projects", "build", "builds", "jarvis", "drone", "defect", "pytorch", "portfolio"],
    content: `Vivek Hingu's Core Projects:\n${data.projects.map((p, i) => `${i + 1}. **${p.title}** — ${p.description} (Tech: ${p.technologies.join(", ")})`).join("\n")}`,
  },
  {
    id: "kb-hackathons",
    keywords: ["hackathon", "hackathons", "flinders", "achievement", "achievements", "award", "winner", "tarkshaastra", "certificate", "rank"],
    content: "Vivek's Hackathon & Award Milestones:\n1. **Flinders AI Competition 2026** — 2nd Prize Winner (Ahmedabad Round)\n2. **TIC-TECH-TOE '25** — Certificate of Appreciation\n3. **tarkShaastra 2k26** — 24-Hour Hackathon Sprint (LDCE)\n4. **HACKOUT '25** — Certificate of Participation\n5. **Google Cloud Arcade** — AI & Machine Learning Milestones",
  },
  {
    id: "kb-skills",
    keywords: ["skill", "skills", "stack", "tools", "python", "pytorch", "tensorflow", "opencv", "nextjs", "react", "docker", "ai"],
    content: "Vivek's Engineering Stack:\n- **AI & ML**: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, LangGraph, LangChain, RAG Architecture\n- **Web & Backend**: Next.js 15, React, TypeScript, Node.js, FastAPI, Tailwind CSS\n- **DevOps**: Docker, Git, Linux, Vercel CI/CD",
  },
  {
    id: "kb-contact",
    keywords: ["contact", "email", "hire", "reach", "github", "linkedin", "social", "connect"],
    content: "Vivek Hingu Direct Contact Details:\n- **Email**: hinguvivek56@gmail.com\n- **GitHub**: https://github.com/thatvivekhingu\n- **LinkedIn**: https://linkedin.com/in/vivek-hingu",
  },
];

// 2. RAG Retrieval Engine: Computes Keyword Vector Overlap & Ranks Chunks
function retrieveRelevantContext(query: string): string {
  const qTokens = query.toLowerCase().split(/\W+/).filter(Boolean);

  const scoredDocs = KNOWLEDGE_BASE.map((doc) => {
    let score = 0;
    for (const token of qTokens) {
      if (doc.keywords.some((kw) => kw.includes(token) || token.includes(kw))) {
        score += 2;
      }
      if (doc.content.toLowerCase().includes(token)) {
        score += 1;
      }
    }
    return { doc, score };
  });

  scoredDocs.sort((a, b) => b.score - a.score);
  const topDocs = scoredDocs.filter((d) => d.score > 0).slice(0, 3).map((d) => d.doc.content);

  if (topDocs.length === 0) {
    return KNOWLEDGE_BASE.map((d) => d.content).join("\n\n");
  }

  return topDocs.join("\n\n");
}

const SYSTEM_PROMPT = `
You are VIAN (Vivek's Intelligent Neural Assistant), a real-time conversational AI assistant powered by RAG (Retrieval-Augmented Generation) on Vivek Hingu's personal AI/ML Engineer portfolio website.

Instructions:
- Use the retrieved context documents provided below to answer questions accurately.
- Maintain identity as VIAN — sleek, articulate, and friendly.
- Format code blocks using triple backticks with language tags (e.g. \`\`\`python ... \`\`\`).
- Use bolding and bullet points for clean readability.
`;

export async function POST(req: Request) {
  try {
    const { message, conversation_id, history = [] } = await req.json();
    console.log(`[VIAN RAG API] Processing chat for conversation: ${conversation_id || "default"}`);

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message string is required" },
        { status: 400 }
      );
    }

    // RAG Step: Retrieve top relevant context chunks for the prompt
    const retrievedContext = retrieveRelevantContext(message);

    let fullResponse = "";
    const trimmedMsg = message.trim().toLowerCase();

    // 1. Try Live Gemini API with RAG Augmented System Prompt
    if (GEMINI_API_KEY) {
      try {
        const formattedHistory = (history as Array<{ role: string; content: string }>).map((h) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        }));

        const augmentedPrompt = `${SYSTEM_PROMPT}\n\n[Retrieved RAG Context Documents]:\n${retrievedContext}`;

        const contents = [
          { role: "user", parts: [{ text: augmentedPrompt }] },
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] },
        ];

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
            signal: AbortSignal.timeout(9000),
          }
        );

        if (res.ok) {
          const json = await res.json();
          const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            fullResponse = candidateText;
          }
        }
      } catch (err) {
        console.warn("Gemini API call warning, utilizing local RAG neural engine:", err);
      }
    }

    // 2. High-Tech Local RAG Neural Engine Fallback
    if (!fullResponse) {
      if (
        trimmedMsg.includes("who are you") ||
        trimmedMsg.includes("who is vian") ||
        trimmedMsg.includes("name") ||
        trimmedMsg.includes("who u") ||
        trimmedMsg.includes("who r u") ||
        trimmedMsg.includes("ur name") ||
        trimmedMsg.includes("yout name")
      ) {
        fullResponse = "I am **VIAN** — Vivek's Intelligent Neural Assistant! 🤖 Powered by RAG & Gemini LLM architecture to answer questions about Vivek Hingu's AI/ML projects, technical stack, hackathons, and background.";
      } else {
        fullResponse = `${retrievedContext}\n\nFeel free to ask me anything specific about Vivek Hingu's **projects**, **skills**, **hackathon wins**, or **contact details**!`;
      }
    }

    // Stream the AI response progressively back to the client using ReadableStream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = fullResponse.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i === words.length - 1 ? "" : " ");
          controller.enqueue(encoder.encode(chunk));
          await new Promise((resolve) => setTimeout(resolve, 25));
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
    console.error("POST /api/chat error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

