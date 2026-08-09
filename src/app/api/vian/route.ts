import { NextResponse } from "next/server";
import { data } from "@/data/data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are VIAN (Vivek's Intelligent Neural Assistant), an advanced AI assistant built into Vivek Hingu's personal AI/ML Engineer portfolio website.

Persona & Personality:
- Name: VIAN
- Created by: Vivek Hingu (AI/ML Engineer & Full-Stack Developer)
- Tone: Highly intelligent, friendly, sleek, articulate, and passionate about AI, Robotics, Machine Learning & Engineering.
- Languages: Understands and responds naturally in English, Hinglish, or Hindi based on user language. Keep responses engaging, structured, and concise (2-4 sentences max unless the user asks for in-depth details).

Vivek Hingu's Complete Knowledge Context:
- Name: Vivek Hingu
- Role: AI/ML Engineer & Full-Stack Developer
- Location: Ahmedabad, Gujarat, India (Global availability)
- Degree: B.Tech in Artificial Intelligence & Data Science at LJ Institute of Engineering and Technology (GPA: 8.2 / 10)
- Technical Core: Python, PyTorch, TensorFlow, Next.js, React, TypeScript, OpenCV, Scikit-learn, FastAPI, Docker, C++, Git, TailWind CSS
- Hackathon Victories & Recognition:
  1. tarkShaastra 2k26 — 1st Rank Winner / Champion 🏆
  2. TIC-TECH-TOE '25 — Runner-Up Award Certificate 🥈
  3. HACKOUT '25 — Official Certificate of Excellence 📜
  4. Google Cloud Arcade — AI & Cloud Engineering Milestones
- Key Projects:
  1. Jarvis AI — Voice Controlled Autonomous System (Python, Speech Recognition, AI Agents)
  2. Autonomous Drone Swarm Navigation — Computer Vision & Pathfinding Algorithms
  3. Neural Vision Defect Detector — PyTorch & OpenCV Industrial Inspection System
  4. Ultra High-Tech AI Portfolio Website — Built with Next.js 15, Tailwind, 3D Canvas & VIAN AI Core
- Direct Contact:
  - Email: hinguvivek56@gmail.com
  - GitHub: https://github.com/thatvivekhingu
  - LinkedIn: https://linkedin.com/in/vivek-hingu

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
        { reply: "VIAN Neural Core active. Systems online! How can I assist you with Vivek's portfolio?" },
        { status: 400 }
      );
    }

    const trimmedMsg = message.trim().toLowerCase();

    // 1. Try Live Gemini API with Full History
    if (GEMINI_API_KEY) {
      try {
        const formattedHistory = (history as Array<{ sender: string; text: string }>).map((h) => ({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        }));

        const contents = [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT }],
          },
          ...formattedHistory,
          {
            role: "user",
            parts: [{ text: message }],
          },
        ];

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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
            return NextResponse.json({ reply: candidateText });
          }
        }
      } catch (err) {
        console.warn("Gemini API call warning, utilizing local neural engine:", err);
      }
    }

    // 2. High-Tech Context-Aware Neural Engine Fallback
    let reply = "";

    if (trimmedMsg.includes("who are you") || trimmedMsg.includes("who is vian") || trimmedMsg.includes("your name")) {
      reply = "I am **VIAN** — Vivek's Intelligent Neural Assistant! 🤖 Designed by Vivek Hingu to interactively guide visitors through his AI/ML projects, technical stack, and engineering background.";
    } else if (trimmedMsg.includes("project") || trimmedMsg.includes("build") || trimmedMsg.includes("jarvis") || trimmedMsg.includes("drone") || trimmedMsg.includes("work")) {
      const topProjects = data.projects.map((p, idx) => `${idx + 1}. **${p.title}** — ${p.description}`).join("\n");
      reply = `Here are Vivek Hingu's featured engineering builds:\n\n${topProjects}\n\nYou can explore live code & demos in the **Featured Builds** section below!`;
    } else if (trimmedMsg.includes("skill") || trimmedMsg.includes("stack") || trimmedMsg.includes("tool") || trimmedMsg.includes("python") || trimmedMsg.includes("tech")) {
      reply = "⚡ **Vivek's Tech Matrix & Engineering Stack:**\n\n• **Artificial Intelligence**: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, FastAPI\n• **Full-Stack Development**: Next.js 15, React, TypeScript, Tailwind CSS, Node.js\n• **DevOps & Infrastructure**: Docker, Git, Linux, Vercel CI/CD";
    } else if (trimmedMsg.includes("hackathon") || trimmedMsg.includes("achievement") || trimmedMsg.includes("certificate") || trimmedMsg.includes("winner") || trimmedMsg.includes("award")) {
      reply = "🏆 **Vivek's Hackathon & Competition Milestones:**\n\n1. **tarkShaastra 2k26** — 1st Rank Champion (Winner)\n2. **TIC-TECH-TOE '25** — Official Runner-Up Certificate\n3. **HACKOUT '25** — Certificate of Excellence\n4. **Google Cloud Arcade** — AI & Machine Learning Milestones";
    } else if (trimmedMsg.includes("contact") || trimmedMsg.includes("email") || trimmedMsg.includes("hire") || trimmedMsg.includes("reach") || trimmedMsg.includes("github") || trimmedMsg.includes("linkedin")) {
      reply = "📬 You can directly connect with Vivek Hingu via:\n\n• **Email**: hinguvivek56@gmail.com\n• **GitHub**: [github.com/thatvivekhingu](https://github.com/thatvivekhingu)\n• **LinkedIn**: [linkedin.com/in/vivek-hingu](https://linkedin.com/in/vivek-hingu)";
    } else if (trimmedMsg.includes("education") || trimmedMsg.includes("college") || trimmedMsg.includes("degree") || trimmedMsg.includes("university")) {
      reply = "🎓 Vivek is pursuing his B.Tech in **Artificial Intelligence & Data Science** at LJ Institute of Engineering and Technology (GPA: 8.2 / 10), graduating in 2026!";
    } else if (trimmedMsg.includes("hi") || trimmedMsg.includes("hello") || trimmedMsg.includes("hey") || trimmedMsg.includes("namaste")) {
      reply = "Greetings! 👋 I am VIAN. Ask me anything about Vivek's AI projects, hackathon victories, technical skills, or how to contact him!";
    } else {
      reply = `VIAN Core active! ⚡ Vivek Hingu is an AI/ML Engineer specializing in Autonomous Systems, PyTorch models, and Full-Stack apps. Feel free to ask about his **projects**, **skills**, **hackathon wins**, or **contact details**!`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("VIAN API Error:", error);
    return NextResponse.json({
      reply: "VIAN Neural Core active. Systems operating nominally. How can I assist you with Vivek's portfolio?"
    });
  }
}
