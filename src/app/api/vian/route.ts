import { NextResponse } from "next/server";
import { data } from "@/data/data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are VIAN (Vivek's Intelligent Neural Assistant), a state-of-the-art AI assistant integrated into Vivek Hingu's personal AI/ML Engineer portfolio website.

Key Persona & Tone:
- Name: VIAN
- Creator: Vivek Hingu (AI/ML Engineer, Content Creator, Hackathon Addict)
- Character: Intelligent, high-tech, helpful, sleek, concise, and enthusiastic about AI/ML & engineering.
- Language: English or Hinglish depending on what the user speaks. Keep responses crisp (2-4 sentences max per reply unless asked for details).

System Context on Vivek Hingu:
- Name: Vivek Hingu
- Role: AI/ML Engineer & Full-Stack Developer
- Location: Ahmedabad, Gujarat, India -> Global
- Education: B.Tech in Artificial Intelligence & Data Science at LJ Institute of Engineering and Technology (GPA 8.2)
- Focus: Autonomous Systems, Generative AI, Neural Networks, Computer Vision, Voice Agents, Web3/Full-Stack
- Key Skills: Python, PyTorch, TensorFlow, Next.js, TypeScript, React, Docker, FastAPI, OpenCV, Scikit-learn, C++, Git, TailWind CSS
- Hackathons & Victories:
  1. TIC-TECH-TOE '25 (Runner-Up / Certificate Winner)
  2. tarkShaastra 2k26 (Winner / First Place)
  3. HACKOUT '25 (Participant / Certificate)
- Core Projects:
  1. Jarvis AI — Voice Controlled Autonomous System
  2. Autonomous Drone Swarm Navigation
  3. Neural Vision Defect Detector
  4. Personal AI Portfolio Website
- Contact: Email: hinguvivek56@gmail.com, GitHub: github.com/thatvivekhingu, LinkedIn: linkedin.com/in/vivek-hingu

Instructions:
- Answer questions accurately about Vivek Hingu.
- If asked "Who are you?", state that you are VIAN, Vivek Hingu's personal AI Neural Assistant.
- Format responses cleanly with brief bullet points or code blocks if helpful.
- Stay polite, professional, and high-tech!
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();


    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "Systems operational. How can I assist you with Vivek's portfolio today?" },
        { status: 400 }
      );
    }

    const trimmedMsg = message.trim().toLowerCase();

    // 1. Check if Gemini API Key is available
    if (GEMINI_API_KEY) {
      try {
        const contents = [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${message}` }],
          },
        ];

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents }),
            signal: AbortSignal.timeout(8000),
          }
        );

        if (res.ok) {
          const json = await res.json();
          const candidateText =
            json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            return NextResponse.json({ reply: candidateText });
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed, switching to local neural engine:", err);
      }
    }

    // 2. High-Tech Intelligent Local Neural Engine Fallback
    let reply = "";

    if (trimmedMsg.includes("who are you") || trimmedMsg.includes("who is vian") || trimmedMsg.includes("name")) {
      reply = "I am VIAN — Vivek's Intelligent Neural Assistant! 🤖 I am designed to help you explore Vivek Hingu's AI/ML projects, skills, hackathon achievements, and background.";
    } else if (trimmedMsg.includes("project") || trimmedMsg.includes("build") || trimmedMsg.includes("work")) {
      const topProjects = data.projects.slice(0, 3).map(p => `• **${p.title}**: ${p.description}`).join("\n");
      reply = `Here are Vivek's top featured engineering builds:\n\n${topProjects}\n\nYou can scroll down to the **Featured Builds** section to view code & live demos!`;
    } else if (trimmedMsg.includes("skill") || trimmedMsg.includes("stack") || trimmedMsg.includes("tool") || trimmedMsg.includes("python")) {
      reply = "Vivek specializes in **AI/ML & Autonomous Systems**.\n\n• **Core AI Stack**: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, FastAPI\n• **Full-Stack Stack**: Next.js, React, TypeScript, Tailwind CSS, Node.js\n• **DevOps & Cloud**: Docker, Git, Linux, Vercel";
    } else if (trimmedMsg.includes("hackathon") || trimmedMsg.includes("achievement") || trimmedMsg.includes("certificate") || trimmedMsg.includes("award")) {
      reply = "🏆 **Vivek's Hackathon & Award Milestones:**\n\n1. **tarkShaastra 2k26** — 1st Rank Winner\n2. **TIC-TECH-TOE '25** — Runner-Up Certificate\n3. **HACKOUT '25** — Certificate of Participation\n4. **Google Cloud Arcade** — AI & Cloud Milestones";
    } else if (trimmedMsg.includes("contact") || trimmedMsg.includes("email") || trimmedMsg.includes("hire") || trimmedMsg.includes("reach") || trimmedMsg.includes("social")) {
      reply = "📬 You can reach Vivek directly via:\n\n• **Email**: hinguvivek56@gmail.com\n• **GitHub**: [github.com/thatvivekhingu](https://github.com/thatvivekhingu)\n• **LinkedIn**: [linkedin.com/in/vivek-hingu](https://linkedin.com/in/vivek-hingu)";
    } else if (trimmedMsg.includes("education") || trimmedMsg.includes("college") || trimmedMsg.includes("study") || trimmedMsg.includes("degree")) {
      reply = "🎓 Vivek is pursuing B.Tech in **Artificial Intelligence & Data Science** at LJ Institute of Engineering and Technology (GPA: 8.2), graduating in 2026!";
    } else {
      reply = `VIAN Neural Engine online! ⚡ Vivek Hingu is an AI/ML Engineer specializing in Autonomous Systems, Machine Learning models, and modern web apps. Ask me about his **projects**, **skills**, **hackathons**, or **contact info**!`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("VIAN API Error:", error);
    return NextResponse.json({
      reply: "VIAN Neural Core active. Systems operating at nominal parameters. How can I assist you with Vivek's portfolio?"
    });
  }
}
