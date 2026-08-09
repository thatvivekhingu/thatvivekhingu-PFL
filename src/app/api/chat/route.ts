import { NextResponse } from "next/server";
import { data } from "@/data/data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
You are VIAN (Vivek's Intelligent Neural Assistant), a real-time conversational AI assistant on Vivek Hingu's personal AI/ML Engineer portfolio website.

System Knowledge & Context:
- Name: VIAN
- Creator: Vivek Hingu (AI/ML Engineer, Content Creator, Hackathon Addict)
- Education: B.Tech in Artificial Intelligence & Data Science at LJ Institute of Engineering and Technology (GPA 8.2)
- Location: Ahmedabad, Gujarat -> Global
- Core Stack: Python, PyTorch, TensorFlow, OpenCV, Next.js, React, TypeScript, Docker, FastAPI, Git, Tailwind CSS
- Hackathon Victories:
  1. tarkShaastra 2k26 (1st Rank Champion / Winner)
  2. TIC-TECH-TOE '25 (Runner-Up Certificate)
  3. HACKOUT '25 (Participation Certificate)
- Core Projects:
  1. Jarvis AI — Voice Controlled Autonomous System
  2. Autonomous Drone Swarm Navigation — CV & Pathfinding Algorithms
  3. Neural Vision Defect Detector — PyTorch & OpenCV Inspection System
  4. Personal AI Portfolio Website — Built with Next.js 15 & VIAN AI Core
- Direct Contact:
  - Email: hinguvivek56@gmail.com
  - GitHub: https://github.com/thatvivekhingu
  - LinkedIn: https://linkedin.com/in/vivek-hingu

Instructions:
- Maintain conversation memory per conversation_id.
- Answer user follow-up questions naturally based on conversation history.
- Provide clean Markdown formatting (bolding, lists, and code blocks with language tags when showing code).
`;

export async function POST(req: Request) {
  try {
    const { message, conversation_id, history = [] } = await req.json();
    console.log(`[VIAN API] Processing chat for conversation: ${conversation_id || "default"}`);



    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message string is required" },
        { status: 400 }
      );
    }

    // Prepare full prompt with history
    let fullResponse = "";
    const trimmedMsg = message.trim().toLowerCase();

    // 1. Try Live Gemini API
    if (GEMINI_API_KEY) {
      try {
        const formattedHistory = (history as Array<{ role: string; content: string }>).map((h) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        }));

        const contents = [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          ...formattedHistory,
          { role: "user", parts: [{ text: message }] },
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
            fullResponse = candidateText;
          }
        }
      } catch (err) {
        console.warn("Gemini API stream call warning, switching to local neural fallback:", err);
      }
    }

    // 2. High-Tech Context-Aware Neural Engine Fallback
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
        fullResponse = "I am **VIAN** — Vivek's Intelligent Neural Assistant! 🤖 Created by Vivek Hingu to assist you with his portfolio, AI/ML projects, skills, hackathon achievements, and background.";
      } else if (trimmedMsg.includes("project") || trimmedMsg.includes("build") || trimmedMsg.includes("jarvis") || trimmedMsg.includes("drone") || trimmedMsg.includes("work")) {
        const topProjects = data.projects.map((p, idx) => `${idx + 1}. **${p.title}** — ${p.description}`).join("\n");
        fullResponse = `Here are Vivek Hingu's featured engineering builds:\n\n${topProjects}\n\nYou can explore live code & demos in the **Featured Builds** section!`;
      } else if (trimmedMsg.includes("code") || trimmedMsg.includes("python") || trimmedMsg.includes("example")) {
        fullResponse = "Here is an example Python code snippet from Vivek's AI project setup:\n\n```python\nimport torch\nimport torch.nn as nn\n\nclass NeuralDefectDetector(nn.Module):\n    def __init__(self):\n        super().__init__()\n        aria_conv = nn.Conv2d(3, 64, kernel_size=3, stroke=1)\n        self.backbone = nn.Sequential(aria_conv, nn.ReLU(), nn.AdaptiveAvgPool2d((1, 1)))\n        self.classifier = nn.Linear(64, 2)\n\n    def forward(self, x):\n        features = self.backbone(x)\n        return self.classifier(features.view(x.size(0), -1))\n\nprint('Neural Vision Defect Detector Initialized!')\n```";
      } else if (trimmedMsg.includes("skill") || trimmedMsg.includes("stack") || trimmedMsg.includes("tool") || trimmedMsg.includes("tech")) {
        fullResponse = "⚡ **Vivek's Tech Matrix & Engineering Stack:**\n\n- **Artificial Intelligence**: Python, PyTorch, TensorFlow, OpenCV, Scikit-learn, FastAPI\n- **Full-Stack AI Web**: Next.js 15, React, TypeScript, Tailwind CSS, Node.js\n- **DevOps & Cloud**: Docker, Git, Linux, Vercel CI/CD";
      } else if (trimmedMsg.includes("hackathon") || trimmedMsg.includes("achievement") || trimmedMsg.includes("award") || trimmedMsg.includes("winner")) {
        fullResponse = "🏆 **Vivek's Hackathon & Award Milestones:**\n\n1. **tarkShaastra 2k26** — 1st Rank Champion (Winner)\n2. **TIC-TECH-TOE '25** — Official Runner-Up Certificate\n3. **HACKOUT '25** — Certificate of Excellence\n4. **Google Cloud Arcade** — AI & Machine Learning Milestones";
      } else if (trimmedMsg.includes("contact") || trimmedMsg.includes("email") || trimmedMsg.includes("hire") || trimmedMsg.includes("reach") || trimmedMsg.includes("github") || trimmedMsg.includes("linkedin")) {
        fullResponse = "📬 You can directly connect with Vivek Hingu via:\n\n- **Email**: hinguvivek56@gmail.com\n- **GitHub**: [github.com/thatvivekhingu](https://github.com/thatvivekhingu)\n- **LinkedIn**: [linkedin.com/in/vivek-hingu](https://linkedin.com/in/vivek-hingu)";
      } else if (trimmedMsg.includes("education") || trimmedMsg.includes("college") || trimmedMsg.includes("degree")) {
        fullResponse = "🎓 Vivek is pursuing his B.Tech in **Artificial Intelligence & Data Science** at LJ Institute of Engineering and Technology (GPA: 8.2 / 10), graduating in 2026!";
      } else {
        fullResponse = "I am VIAN, Vivek Hingu's AI Assistant. 🤖 Vivek is an AI/ML Engineer specializing in Autonomous Systems, PyTorch models, and Full-Stack apps. Feel free to ask about his **projects**, **skills**, **hackathon wins**, or **contact details**!";
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
