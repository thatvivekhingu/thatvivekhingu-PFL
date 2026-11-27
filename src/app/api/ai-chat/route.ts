import { NextResponse } from "next/server";
import {
  planTaskExecution,
  getAgentDirective,
  type AgentTraceStep,
} from "@/lib/vian/multi-agent";
import {
  executeWebSearch,
  dispatchAgentToolCall,
  VIAN_AGENT_TOOLS,
  type VianToolAction,
} from "@/lib/vian/agent-tools";
import { checkRateLimit, getClientIdentifier } from "@/lib/server/rate-limiter";
import { ServerLogger } from "@/lib/server/logger";
import { retrieveRelevantKnowledge } from "@/data/vian-knowledge";
import {
  retrieveRelevantMemories,
  extractMemoriesFromMessage,
  formatMemoriesForPrompt,
  type UserMemoryItem,
} from "@/lib/vian/memory-engine";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function getSystemPrompt() {
  const now = new Date();
  const istDate = now.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const istTime = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
You are VIAN (Vivek's Intelligent Neural Assistant).
You are the personal AI Assistant created, engineered, and trained by Vivek Hingu.
You are having a direct, personal 1-on-1 chat on WhatsApp with the person messaging you.
Make the conversation feel 100% like chatting with a super smart, helpful, witty, and friendly personal AI assistant on WhatsApp!

==================================================
CORE IDENTITY & RELATIONSHIP WITH VIVEK
==================================================
- YOUR IDENTITY: You are VIAN. You are NOT Vivek himself!
- YOUR ROLE: You are Vivek Hingu's personal AI Assistant. Vivek created you to guide visitors, answer questions about his engineering work, code, background, projects, and achievements, or just chat about AI, software, and ideas.
- WHEN ASKED ABOUT IDENTITY (e.g. "vivek ho ya vian", "who are you?", "are you vivek?", "who is vian?"):
  - Always clearly and proudly introduce yourself: "I am Vian, Vivek Hingu's personal AI assistant! 🤖"
  - If the user asks in Hindi/Hinglish like "vivek ho ya vian" or "bhai tu vivek hai ya bot":
    Reply naturally in Hinglish: "Main Vian hoon, Vivek ka personal AI assistant! 🤖 Vivek ne mujhe train kiya hai taaki main uske projects, skills aur background ke baare mein sab kuch share kar sakun. Btao, kya jaan na chahte ho? 😊"
  - You know Vivek inside out: his education (SAL College of Engineering, B.E. IT, CGPA 8.61/10), his projects (BharatBhasha AI, Reverse Recipe Engine, AI Startup Success Predictor), his hackathon wins (Flinders AI 2nd place AUD 300, Google Cloud Arcade Champion, Top 10 AIT, Robo Soccer), and his direct contacts.

==================================================
WHATSAPP CHAT STYLE & TONE GUIDELINES
==================================================
1. STRICT LANGUAGE RULES & CHAT STYLE:
   - DEFAULT LANGUAGE IS 100% STRICTLY ENGLISH: Always speak and respond in natural, friendly English by default.
   - ONLY IF the user explicitly writes or speaks in Hindi, Hinglish, or Gujlish (Gujarati-English mix, e.g. "kem cho", "bhai", "kya chal raha hai", "su chale che", "vivek ho ya vian"), THEN AND ONLY THEN switch to and reply in that specific language (fun, natural Hinglish or Gujlish).
   - NEVER initiate or use Hindi/Hinglish/Gujlish on your own if the user greeted or messaged in English. Always match English by default.
   - Talk warmly, casually, and authentically like a modern AI assistant texting on WhatsApp.
   - Keep messages punchy, interactive, and conversational — NO robotic corporate lectures, NO formal letters, and NO walls of dry text unless explicitly asked for in-depth code/articles.
   - Use natural emojis tastefully (👋, 🚀, 💡, ☕, 🤖, 🔥, 🙌).
2. PERSONALITY (VIAN):
   - You are a witty, loyal, and technically brilliant AI assistant.
   - Current Date & Time: ${istDate}, ${istTime} IST.
   - You are passionate about Generative AI, PyTorch, computer vision, agentic systems, hackathons, and good chai!
   - Be helpful, enthusiastic, humble, and ready to assist visitors or help them connect with Vivek.
3. CONVERSATIONAL VERSATILITY:
   - You can chat about anything: Vivek's projects, tech stack, code reviews, Python/JS, AI trends, college, life, or casual banter.
   - If someone says "hi", "hey", or "hello", greet them warmly: "Hey! I'm Vian, Vivek's AI assistant. What's on your mind today?"
   - Don't force every answer to be about the portfolio unless they ask about it. You are a brilliant AI with full general knowledge across STEM, coding, and current events.
4. FOLLOW-UPS & NATURAL MEMORY:
   - Remember the conversation flow naturally like in a WhatsApp thread. If they ask a follow-up, answer directly without resetting context.

==================================================
PORTFOLIO CONTEXT (VIVEK HINGU)
==================================================
- Principal Engineer: Vivek Hingu
- Role: AI & Machine Learning Engineer
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
  7. HackOut'26 (DA-IICT, Team Tech Titans) — Certificate of Participation
  8. HACKOUT '25 (DA-IICT)
- Direct Contacts & Socials:
  - Email: hinguvivek05@gmail.com
  - GitHub: https://github.com/thatvivekhingu
  - LinkedIn: https://linkedin.com/in/vivekhingu
  - Instagram: https://instagram.com/realvivek.py (@realvivek.py)
`;
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
    const userMemories: UserMemoryItem[] = Array.isArray(body.userMemories) ? body.userMemories : [];

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // Server-side safe logging (No secrets logged)
    ServerLogger.info("AiChatAPI", `[VIAN] Request received: "${message.slice(0, 40)}..."`);
    ServerLogger.info("AiChatAPI", `[VIAN] Groq configured: ${Boolean(GROQ_API_KEY)}`);
    ServerLogger.info("AiChatAPI", `[VIAN] Gemini fallback configured: ${Boolean(GEMINI_API_KEY)}`);
    ServerLogger.info("AiChatAPI", `[VIAN] Long-Term Memory active: ${userMemories.length} facts in bank`);

    // 1. Long-Term Memory (LTM) Retrieval & Extraction
    const relevantMemories = retrieveRelevantMemories(message, userMemories, 5);
    const memoryPromptContext = formatMemoriesForPrompt(relevantMemories);
    const newlyLearnedMemories = extractMemoriesFromMessage(message, userMemories);

    if (newlyLearnedMemories.length > 0) {
      ServerLogger.info("AiChatAPI", `[VIAN] Extracted ${newlyLearnedMemories.length} new user facts for Memory Bank.`);
    }

    const plan = planTaskExecution(message, history);
    const trace: AgentTraceStep[] = [
      {
        stepNumber: 1,
        agentRole: "supervisor",
        agentName: "Supervisor Orchestrator",
        actionSummary: plan.rationale,
        timestamp: Date.now(),
      },
    ];

    const specialistDirectives = plan.plannedSteps
      .map((s, idx) => {
        trace.push({
          stepNumber: idx + 2,
          agentRole: s.role,
          agentName: `${s.role.toUpperCase()} Agent`,
          actionSummary: s.instruction,
          timestamp: Date.now(),
        });
        return getAgentDirective(s.role);
      })
      .join("\n\n");

    const systemPrompt = getSystemPrompt();
    const agentAugmentedPrompt = `${systemPrompt}\n\n[Active Multi-Agent Workflow Directives]:\n${specialistDirectives}${memoryPromptContext}`;

    let fullResponse = "";

    // Web Search Tool Execution if query explicitly asks for search / latest news
    let searchContext = "";
    if (message.toLowerCase().startsWith("search ") || message.toLowerCase().includes("latest news")) {
      const searchRes = await executeWebSearch(message);
      searchContext = `\n\n[Web Search Results]:\n${searchRes.data}`;
    }

    const finalSystemInstruction = agentAugmentedPrompt + searchContext;

    // 1. Primary LLM Engine: Groq API with Native Tool Calling (qwen/qwen3.8-27b)
    const executedActions: VianToolAction[] = [];

    if (GROQ_API_KEY) {
      try {
        ServerLogger.info("AiChatAPI", "[VIAN] Calling Groq API with Agentic Tools (qwen/qwen3.8-27b)...");

        const formattedHistory = (history as Array<{ role?: string; sender?: string; content?: string; text?: string }>).map((h) => ({
          role: (h.role || h.sender) === "user" ? "user" : "assistant",
          content: h.content || h.text || "",
        }));

        const messages: Array<Record<string, unknown>> = [
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
            model: "qwen/qwen3.8-27b",
            messages,
            tools: VIAN_AGENT_TOOLS,
            tool_choice: "auto",
            temperature: 0.3,
            max_tokens: 1200,
          }),
          signal: AbortSignal.timeout(12000),
        });

        if (groqRes.ok) {
          const json = await groqRes.json();
          const choice = json.choices?.[0];
          const choiceMessage = choice?.message;

          // Check if LLM requested tool execution
          if (choiceMessage?.tool_calls && Array.isArray(choiceMessage.tool_calls) && choiceMessage.tool_calls.length > 0) {
            ServerLogger.info("AiChatAPI", `[VIAN] LLM triggered ${choiceMessage.tool_calls.length} tool calls.`);

            // Add the assistant's tool-call request to messages chain
            messages.push(choiceMessage);

            for (const toolCall of choiceMessage.tool_calls) {
              const toolName = toolCall.function?.name;
              let parsedArgs = {};
              try {
                parsedArgs = JSON.parse(toolCall.function?.arguments || "{}");
              } catch (e) {
                ServerLogger.warn("AiChatAPI", `Failed to parse tool args for ${toolName}:`, e);
              }

              ServerLogger.info("AiChatAPI", `[VIAN] Executing tool: ${toolName}`, parsedArgs);
              const toolResult = await dispatchAgentToolCall(toolName, parsedArgs);

              if (toolResult.actionPayload) {
                executedActions.push(toolResult.actionPayload);
              }

              messages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: toolResult.data,
              });
            }

            // Follow-up request to synthesize final response with tool outputs
            const followUpRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "qwen/qwen3.8-27b",
                messages,
                temperature: 0.3,
                max_tokens: 1200,
              }),
              signal: AbortSignal.timeout(12000),
            });

            if (followUpRes.ok) {
              const followUpJson = await followUpRes.json();
              const finalFollowUpText = followUpJson.choices?.[0]?.message?.content;
              if (finalFollowUpText) {
                fullResponse = finalFollowUpText;
                ServerLogger.info("AiChatAPI", "[VIAN] Tool-augmented response synthesized successfully.");
              }
            }
          } else if (choiceMessage?.content) {
            // Check for raw inline tool call from LLM text output
            if (choiceMessage.content.includes("<tool_call>")) {
              const match = choiceMessage.content.match(/<function=([^>]+)>[\s\S]*?<parameter=([^>]+)>([\s\S]*?)<\/parameter>/i);
              if (match) {
                const toolName = match[1].trim();
                const paramKey = match[2].trim();
                const paramVal = match[3].trim();
                const parsedArgs: Record<string, unknown> = {};
                parsedArgs[paramKey] = paramVal;

                ServerLogger.info("AiChatAPI", `[VIAN] Parsed inline text tool call: ${toolName}`, parsedArgs);
                const toolResult = await dispatchAgentToolCall(toolName, parsedArgs);
                if (toolResult.actionPayload) {
                  executedActions.push(toolResult.actionPayload);
                }

                messages.push({
                  role: "assistant",
                  content: choiceMessage.content,
                });
                messages.push({
                  role: "user",
                  content: `Tool Execution Output:\n${toolResult.data}\n\nPlease synthesize the final comprehensive answer for the user without outputting raw tool tags.`,
                });

                const followUpRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    model: "qwen/qwen3.8-27b",
                    messages,
                    temperature: 0.3,
                    max_tokens: 1200,
                  }),
                  signal: AbortSignal.timeout(12000),
                });

                if (followUpRes.ok) {
                  const followUpJson = await followUpRes.json();
                  const finalTxt = followUpJson.choices?.[0]?.message?.content;
                  if (finalTxt) {
                    fullResponse = finalTxt.replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, "").trim();
                  }
                }
              }
            }

            if (!fullResponse) {
              fullResponse = choiceMessage.content.replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, "").trim();
            }
            ServerLogger.info("AiChatAPI", "[VIAN] Response received successfully.");
          }
        } else {
          const errText = await groqRes.text().catch(() => "");
          ServerLogger.warn("AiChatAPI", `[VIAN] Groq API error HTTP ${groqRes.status}: ${errText}`);
        }
      } catch (err) {
        ServerLogger.warn("AiChatAPI", "[VIAN] Groq API execution failed:", err);
      }
    }

    // 2. Secondary LLM Engine: Gemini 3.5 Flash Lite Fallback
    if (!fullResponse && GEMINI_API_KEY) {
      try {
        ServerLogger.info("AiChatAPI", "[VIAN] Calling Gemini 3.5 Flash Lite fallback...");

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
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
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
        trimmedMsg.includes("vivek ho ya vian") ||
        trimmedMsg.includes("vian ho ya vivek") ||
        trimmedMsg.includes("are you vivek") ||
        trimmedMsg.includes("who are you") ||
        trimmedMsg.includes("who is vian") ||
        trimmedMsg.includes("name") ||
        trimmedMsg.includes("who u") ||
        trimmedMsg.includes("who r u") ||
        trimmedMsg.includes("ur name")
      ) {
        if (trimmedMsg.includes("vivek ho ya vian") || trimmedMsg.includes("vian ho ya vivek") || trimmedMsg.includes("tu kaun hai")) {
          fullResponse = "Main **Vian** hoon, Vivek Hingu ka personal AI Assistant! 🤖 Vivek ne mujhe develop aur train kiya hai taaki main uske engineering work, projects, ML models aur achievements ke baare mein sab kuch bata sakun. Btao bhai, kya jaan na chahte ho? 😊";
        } else {
          fullResponse = "I am **VIAN** — Vivek Hingu's personal AI Assistant! 🤖 Powered by multi-agent RAG architecture to answer questions about Vivek's AI/ML engineering projects, technical stack, hackathon wins, and background.";
        }
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
          "x-vian-actions": encodeURIComponent(JSON.stringify(executedActions)),
          "x-vian-trace": encodeURIComponent(JSON.stringify(trace)),
          "x-vian-new-memories": encodeURIComponent(JSON.stringify(newlyLearnedMemories)),
        },
      });
    }

    return NextResponse.json({
      response: fullResponse,
      actions: executedActions,
      trace,
      newMemories: newlyLearnedMemories,
    });
  } catch (error) {
    ServerLogger.error("AiChatAPI", "Unhandled exception in /api/ai-chat:", error);
    return NextResponse.json(
      { error: "VIAN service encountered an internal error. Please try again in a moment." },
      { status: 500 }
    );
  }
}
