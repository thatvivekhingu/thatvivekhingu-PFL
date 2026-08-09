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
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";

interface Message {
  id: string;
  sender: "user" | "vian";
  text: string;
  isStreaming?: boolean;
  timestamp: string;
}

const INITIAL_PROMPTS = [
  "⚡ Featured AI Projects",
  "🎓 Tech Stack & Skills",
  "🏆 Hackathon Wins",
  "📬 Contact Vivek",
];

export function VianAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "vian",
      text: "Greetings! I am **VIAN** — Vivek Hingu's Neural AI Assistant. 🤖 How can I assist you with Vivek's AI/ML projects, skills, or background today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Web Speech Synthesis (Text To Speech)
  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop current speech
      const cleanText = text.replace(/[*#_`\[\]()]/g, ""); // Strip markdown tags
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

  // Word-by-word streaming effect
  const streamTextResponse = (fullText: string, messageId: string) => {
    const words = fullText.split(" ");
    let currentWordIndex = 0;

    const interval = setInterval(() => {
      if (currentWordIndex >= words.length) {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, text: fullText, isStreaming: false }
              : msg
          )
        );
        speakText(fullText);
        setIsLoading(false);
        return;
      }

      currentWordIndex++;
      const partialText = words.slice(0, currentWordIndex).join(" ");
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, text: partialText } : msg
        )
      );
      if (currentWordIndex % 4 === 0) {
        playTapSound("hover");
      }
    }, 35);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    playTapSound("pop");

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const currentHistory = messages.map((m) => ({
      sender: m.sender,
      text: m.text,
    }));

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/vian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: currentHistory,
        }),
      });

      const data = await res.json();
      const rawReply = data.reply || "VIAN systems online. How can I assist you with Vivek's portfolio?";
      const vianMsgId = `vian-${Date.now()}`;

      const vianMsg: Message = {
        id: vianMsgId,
        sender: "vian",
        text: "",
        isStreaming: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, vianMsg]);
      streamTextResponse(rawReply, vianMsgId);
    } catch {
      const fallbackText = "VIAN Neural Core online. Vivek Hingu is an AI/ML Engineer specializing in Autonomous Systems, PyTorch models, and Full-Stack apps!";
      const vianMsgId = `vian-err-${Date.now()}`;

      const errorMsg: Message = {
        id: vianMsgId,
        sender: "vian",
        text: "",
        isStreaming: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, errorMsg]);
      streamTextResponse(fallbackText, vianMsgId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99990] flex flex-col items-end select-none">
      {/* Pop-Over Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-4 w-[92vw] sm:w-[390px] h-[540px] max-h-[82vh] rounded-3xl border border-cyan-500/40 bg-zinc-950/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.35)] flex flex-col overflow-hidden text-slate-100 font-sans"
          >
            {/* Drawer Header */}
            <div className="px-4 py-3 bg-zinc-900/90 border-b border-cyan-500/30 flex items-center justify-between">
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
                      AI STREAMING
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Neural Core Active</span>
                  </div>
                </div>
              </div>

              {/* Voice & Window Controls */}
              <div className="flex items-center gap-1">
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

            {/* Chat History Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {msg.sender === "vian" && (
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
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-cyan-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">
                      {msg.text}
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-3 ml-1 bg-cyan-400 animate-pulse" />
                      )}
                    </p>
                    <span
                      className={`block text-[9px] mt-1 ${
                        msg.sender === "user" ? "text-cyan-200 text-right" : "text-zinc-500"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && messages[messages.length - 1]?.sender !== "vian" && (
                <div className="flex gap-2.5 items-center text-xs text-cyan-400 font-mono animate-pulse">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-cyan-400/60">
                    <Image src="/vian-avatar.png" alt="VIAN" fill className="object-cover" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span>VIAN Neural Core processing</span>
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
              {INITIAL_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
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
                disabled={isLoading}
                className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-cyan-500 rounded-full px-4 py-2 text-xs text-white placeholder-zinc-500 outline-none transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.5)] cursor-pointer"
                title="Send Message"
              >
                <IconSend className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Badge Button (Bottom Right) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleToggle}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-zinc-950/90 border border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all cursor-pointer"
      >
        {/* Glowing Avatar */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]">
          <Image
            src="/vian-avatar.png"
            alt="VIAN AI Assistant"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Label */}
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

        {/* Online Status Ping */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
      </motion.button>
    </div>
  );
}
