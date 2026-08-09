"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconX,
  IconSend,
  IconSparkles,
  IconMinus,
  IconVolume,
  IconVolumeOff,
  IconPlus,
  IconHistory,
  IconCopy,
  IconCheck,
  IconTrash,
  IconEdit,
  IconExternalLink,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  dateGroup: "Today" | "Yesterday" | "Earlier";
  timestamp: number;
  messages: ChatMessage[];
}

const PRESET_PROMPTS = [
  "⚡ Featured AI Projects",
  "🎓 Tech Stack & Skills",
  "🏆 Hackathon Victories",
  "📬 Contact Vivek",
];

// Helper to generate unique conversation IDs
const generateId = () => `conv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

// Format date into Today / Yesterday / Earlier
const getGroupForTimestamp = (ts: number): "Today" | "Yesterday" | "Earlier" => {
  const now = new Date();
  const date = new Date(ts);
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return "Earlier";
};

export function VianAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHistorySidebar, setShowHistorySidebar] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Chat Sessions Storage
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat sessions from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vian_chat_sessions_v2");
      if (saved) {
        const parsed: ChatSession[] = JSON.parse(saved);
        if (parsed.length > 0) {
          setSessions(parsed);
          setActiveSessionId(parsed[0].id);
          setMessages(parsed[0].messages);
          return;
        }
      }
    } catch {
      // Ignore storage errors
    }

    // Default Initial Session
    const initId = generateId();
    const initialSession: ChatSession = {
      id: initId,
      title: "New Chat",
      dateGroup: "Today",
      timestamp: Date.now(),
      messages: [
        {
          id: "init-msg",
          role: "assistant",
          content: "Greetings! I am **VIAN** — Vivek Hingu's Real-Time AI Assistant. 🤖 How can I assist you with Vivek's AI/ML projects, skills, or engineering background today?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    };
    setSessions([initialSession]);
    setActiveSessionId(initId);
    setMessages(initialSession.messages);
  }, []);

  // Save sessions to localStorage whenever they update
  useEffect(() => {
    if (sessions.length > 0) {
      try {
        localStorage.setItem("vian_chat_sessions_v2", JSON.stringify(sessions));
      } catch {
        // Ignore storage errors
      }
    }
  }, [sessions]);

  // Sync messages to active session
  useEffect(() => {
    if (!activeSessionId) return;
    setSessions((prev) =>
      prev.map((s) => (s.id === activeSessionId ? { ...s, messages } : s))
    );
  }, [messages, activeSessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isGenerating, isOpen]);

  // Web Speech Synthesis (Text To Speech)
  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*#_`\[\]()]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech errors
    }
  };

  const handleToggle = () => {
    playTapSound("chime");
    setIsOpen((prev) => !prev);
  };

  const toggleVoice = () => {
    playTapSound("pop");
    setVoiceEnabled((prev) => !prev);
  };

  // 4. NEW CHAT FUNCTION
  const handleNewChat = () => {
    playTapSound("pop");
    const newId = generateId();
    const newSession: ChatSession = {
      id: newId,
      title: "New Chat",
      dateGroup: "Today",
      timestamp: Date.now(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: "Fresh conversation started! ⚡ Ask me anything about Vivek Hingu's projects, skills, or hackathon achievements.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    setMessages(newSession.messages);
    setShowHistorySidebar(false);
  };

  // Switch Active Chat Session
  const handleSelectSession = (session: ChatSession) => {
    playTapSound("hover");
    setActiveSessionId(session.id);
    setMessages(session.messages);
    setShowHistorySidebar(false);
  };

  // Delete Chat Session
  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playTapSound("pop");
    const updated = sessions.filter((s) => s.id !== sessionId);
    setSessions(updated);

    if (activeSessionId === sessionId) {
      if (updated.length > 0) {
        setActiveSessionId(updated[0].id);
        setMessages(updated[0].messages);
      } else {
        handleNewChat();
      }
    }
  };

  // Rename Session
  const handleStartRename = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditingTitle(session.title);
  };

  const handleSaveRename = (sessionId: string) => {
    if (!editingTitle.trim()) return;
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, title: editingTitle.trim() } : s))
    );
    setEditingSessionId(null);
  };

  // 1 & 2. REAL-TIME AI CHAT & STREAMING (POST /api/chat)
  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isGenerating) return;

    playTapSound("pop");

    const userMessageId = `usr-${Date.now()}`;
    const assistantMessageId = `ast-${Date.now()}`;
    const userTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newUserMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: textToSend,
      timestamp: userTimestamp,
    };

    const newAssistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: userTimestamp,
    };

    // Auto-update session title if it's "New Chat"
    const activeSession = sessions.find((s) => s.id === activeSessionId);
    if (activeSession && (activeSession.title === "New Chat" || activeSession.messages.length <= 1)) {
      const generatedTitle = textToSend.length > 28 ? textToSend.slice(0, 28) + "..." : textToSend;
      setSessions((prev) =>
        prev.map((s) => (s.id === activeSessionId ? { ...s, title: generatedTitle } : s))
      );
    }

    // Build chat history payload for API
    const formattedHistory = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    setMessages((prev) => [...prev, newUserMessage, newAssistantMessage]);
    if (!customText) setInput("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          conversation_id: activeSessionId,
          history: formattedHistory,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Network response error");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedContent += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId ? { ...m, content: streamedContent } : m
          )
        );
      }

      speakText(streamedContent);
    } catch {
      // Graceful fallback response
      const fallbackText = "VIAN Neural Core active. Systems online! Vivek Hingu is an AI/ML Engineer specializing in Autonomous Systems, PyTorch models, and Full-Stack apps!";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId ? { ...m, content: fallbackText } : m
        )
      );
      speakText(fallbackText);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99990] flex flex-col items-end select-none">
      {/* Pop-Over Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative mb-4 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl border border-cyan-500/40 bg-zinc-950/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.35)] flex flex-col overflow-hidden text-slate-100 font-sans"
          >
            {/* Header Bar */}
            <div className="px-4 py-3 bg-zinc-900/90 border-b border-cyan-500/30 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.6)]">
                  <Image
                    src="/vian-avatar.png"
                    alt="VIAN Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm tracking-wider text-cyan-300">
                      VIAN
                    </span>
                    <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest border border-cyan-500/40">
                      AI CORE
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-Time Streaming Active</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {/* New Chat Button */}
                <button
                  onClick={handleNewChat}
                  className="p-1.5 rounded-full text-cyan-400 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
                  title="Start New Chat"
                >
                  <IconPlus className="w-4 h-4" />
                </button>

                {/* History Sidebar Toggle */}
                <button
                  onClick={() => setShowHistorySidebar((prev) => !prev)}
                  className={`p-1.5 rounded-full transition-colors ${
                    showHistorySidebar
                      ? "text-cyan-300 bg-cyan-500/20 border border-cyan-500/40"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                  title="Chat History"
                >
                  <IconHistory className="w-4 h-4" />
                </button>

                {/* Voice Speech Toggle */}
                <button
                  onClick={toggleVoice}
                  className={`p-1.5 rounded-full transition-colors ${
                    voiceEnabled
                      ? "text-cyan-300 bg-cyan-500/20 border border-cyan-500/40"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                  title={voiceEnabled ? "Voice Output Active" : "Enable Voice Speech"}
                >
                  {voiceEnabled ? (
                    <IconVolume className="w-4 h-4 text-cyan-400 animate-pulse" />
                  ) : (
                    <IconVolumeOff className="w-4 h-4" />
                  )}
                </button>

                {/* Minimize & Close */}
                <button
                  onClick={handleToggle}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Minimize"
                >
                  <IconMinus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleToggle}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  title="Close"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 5. CHAT HISTORY SIDEBAR OVERLAY */}
            <AnimatePresence>
              {showHistorySidebar && (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute inset-y-0 left-0 w-64 bg-zinc-950/98 border-r border-zinc-800 z-30 flex flex-col p-3 shadow-2xl backdrop-blur-3xl pt-16"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <IconHistory className="w-3.5 h-3.5" />
                      Chat History
                    </span>
                    <button
                      onClick={handleNewChat}
                      className="px-2 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1 transition-all"
                    >
                      <IconPlus className="w-3 h-3" />
                      New
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto mt-3 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
                    {(["Today", "Yesterday", "Earlier"] as const).map((group) => {
                      const groupSessions = sessions.filter(
                        (s) => getGroupForTimestamp(s.timestamp) === group
                      );
                      if (groupSessions.length === 0) return null;

                      return (
                        <div key={group} className="space-y-1.5">
                          <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest px-2">
                            {group}
                          </p>
                          {groupSessions.map((session) => (
                            <div
                              key={session.id}
                              onClick={() => handleSelectSession(session)}
                              className={`group relative flex items-center justify-between px-2.5 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                                session.id === activeSessionId
                                  ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-semibold"
                                  : "bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-800/60"
                              }`}
                            >
                              {editingSessionId === session.id ? (
                                <input
                                  type="text"
                                  value={editingTitle}
                                  onChange={(e) => setEditingTitle(e.target.value)}
                                  onBlur={() => handleSaveRename(session.id)}
                                  onKeyDown={(e) => e.key === "Enter" && handleSaveRename(session.id)}
                                  autoFocus
                                  className="w-full bg-zinc-950 border border-cyan-500 rounded px-1.5 py-0.5 text-xs text-white outline-none"
                                />
                              ) : (
                                <span className="truncate pr-2">{session.title}</span>
                              )}

                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={(e) => handleStartRename(session, e)}
                                  className="p-1 text-zinc-400 hover:text-cyan-300"
                                  title="Rename"
                                >
                                  <IconEdit className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteSession(session.id, e)}
                                  className="p-1 text-zinc-400 hover:text-red-400"
                                  title="Delete"
                                >
                                  <IconTrash className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 6. MESSAGE STREAMING UI & MARKDOWN RENDERING */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-cyan-400/60 mt-1">
                      <Image
                        src="/vian-avatar.png"
                        alt="VIAN"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-cyan-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-tl-none"
                    }`}
                  >
                    {/* Rendered Markdown & Code Blocks */}
                    {msg.role === "assistant" ? (
                      <MarkdownRenderer content={msg.content} />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}

                    <span
                      className={`block text-[9px] mt-1.5 ${
                        msg.role === "user" ? "text-cyan-200 text-right" : "text-zinc-500"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Streaming / Typing Indicator */}
              {isGenerating && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-2.5 items-center text-xs text-cyan-400 font-mono animate-pulse">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-cyan-400/60">
                    <Image src="/vian-avatar.png" alt="VIAN" fill className="object-cover" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>VIAN is thinking</span>
                    <span className="inline-flex gap-0.5">
                      <span className="w-1 h-3 bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-3 bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-3 bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Preset Chips */}
            <div className="px-3 py-2 bg-zinc-950 border-t border-zinc-900 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {PRESET_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={isGenerating}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-cyan-500/20 border border-zinc-800 hover:border-cyan-500/50 text-[10px] font-mono text-zinc-300 hover:text-cyan-300 transition-all cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask VIAN anything..."
                disabled={isGenerating}
                className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-full px-4 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={isGenerating || !input.trim()}
                className="p-2 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)] cursor-pointer"
                title="Send Message"
              >
                <IconSend className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleToggle}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-zinc-950/90 border border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all cursor-pointer"
      >
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]">
          <Image
            src="/vian-avatar.png"
            alt="VIAN AI Assistant"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-black tracking-wider text-cyan-300">
              VIAN
            </span>
            <IconSparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-200">
            Ask AI Assistant
          </span>
        </div>

        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
      </motion.button>
    </div>
  );
}

// 6 & 7. MARKDOWN & CODE BLOCK RENDERER
function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  // Split content by code block delimiters (```lang ... ```)
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-xs">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          // Extract language and code body
          const firstLineEnd = part.indexOf("\n");
          const lang = part.slice(3, firstLineEnd).trim() || "code";
          const codeBody = part.slice(firstLineEnd + 1, -3);

          return <CodeBlock key={index} lang={lang} code={codeBody} />;
        }

        // Render standard Markdown formatted text
        return <FormattedText key={index} text={part} />;
      })}
    </div>
  );
}

// 7. CODE BLOCK COMPONENT WITH COPY BUTTON & HIGHLIGHTING
function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    playTapSound("pop");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 font-mono text-[11px]">
      {/* Code Block Header */}
      <div className="flex items-center justify-between bg-zinc-900/90 px-3 py-1.5 border-b border-zinc-800">
        <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <IconCheck className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <IconCopy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Block Body */}
      <pre className="p-3 overflow-x-auto text-zinc-200 leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// 6. FORMATTED TEXT MARKDOWN PARSER (BOLD, BULLETS, LINKS)
function FormattedText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <br key={lIdx} />;

        // Bulleted lists
        if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <div key={lIdx} className="flex gap-2 pl-1">
              <span className="text-cyan-400">•</span>
              <span>{parseInlineMarkdown(line.slice(2))}</span>
            </div>
          );
        }

        // Headings
        if (line.startsWith("### ")) {
          return <h4 key={lIdx} className="font-bold text-cyan-300 mt-2 text-xs">{parseInlineMarkdown(line.slice(4))}</h4>;
        }
        if (line.startsWith("## ") || line.startsWith("# ")) {
          return <h3 key={lIdx} className="font-extrabold text-white mt-2 text-sm">{parseInlineMarkdown(line.replace(/^#+\s*/, ""))}</h3>;
        }

        return <p key={lIdx}>{parseInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

// Inline Markdown Parser for bold **text**, inline `code`, and links [label](url)
function parseInlineMarkdown(text: string): React.ReactNode {
  // Regex to split by bold (**), code (`), or links ([...](...))
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1 py-0.5 rounded bg-zinc-800 text-cyan-300 font-mono text-[11px]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline font-semibold inline-flex items-center gap-0.5"
          >
            <span>{match[1]}</span>
            <IconExternalLink className="w-2.5 h-2.5" />
          </a>
        );
      }
    }
    return part;
  });
}
