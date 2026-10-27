"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconSparkles,
  IconCpu,
  IconBolt,
  IconBrain,
  IconSend,
  IconMaximize,
  IconCornerDownLeft,
  IconMessageDots,
  IconTerminal2,
  IconArrowRight,
} from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { playTapSound } from "@/lib/sound";

const PROMPT_SUGGESTIONS = [
  {
    icon: "🏆",
    label: "Flinders AI Hackathon Win",
    query: "Tell me about your 2nd place win at Flinders University AI Hackathon!",
  },
  {
    icon: "🤖",
    label: "Autonomous Multi-Agent Stack",
    query: "How do you build autonomous multi-agent systems and tool-calling pipelines?",
  },
  {
    icon: "⚡",
    label: "Top AI & ML Projects",
    query: "What are your top ML builds like BharatBhasha AI and Reverse Recipe Engine?",
  },
  {
    icon: "💼",
    label: "Collaborate or Hire Vivek",
    query: "I'd love to collaborate with you on an AI/ML project. How can we connect?",
  },
];

export default function VianSection() {
  const [inputQuery, setInputQuery] = useState("");

  const handleOpenVian = () => {
    playTapSound("chime");
    window.dispatchEvent(new CustomEvent("openVianFresh"));
  };

  const handleSendPrompt = (prompt: string) => {
    playTapSound("chime");
    window.dispatchEvent(
      new CustomEvent("openVianWithQuery", {
        detail: { query: prompt },
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputQuery.trim();
    if (query) {
      handleSendPrompt(query);
      setInputQuery("");
    } else {
      handleOpenVian();
    }
  };

  return (
    <div className="flex flex-col">
      <SectionHeading
        color="indigo"
        subtitle="AUTONOMOUS AGENTIC INTELLIGENCE"
      >
        Talk with VIAN — AI Engineering Assistant
      </SectionHeading>

      {/* Main Chatbot Window Container */}
      <div className="group/glow relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-zinc-800/90 bg-white/95 dark:bg-[#0c1015]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-500/50 dark:hover:border-cyan-500/40">
        <SpotlightGlow color="rgba(34, 211, 238, 0.12)" size={400} />

        {/* Ambient Top Glow / Grid Accent */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl" />

        {/* --- Chat Window Header --- */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-200/70 dark:border-zinc-800/80 bg-slate-100/70 dark:bg-zinc-900/60 px-4 py-3 sm:px-6">
          {/* Left: Window Controls + Bot Identity */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* macOS-style terminal dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 border border-rose-600/40" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
            </div>

            <div className="h-4 w-px bg-slate-300 dark:bg-zinc-700 hidden sm:block" />

            {/* Avatar & Online Status */}
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-cyan-500/50 shadow-sm">
                <Image
                  src="/vian-avatar.jpg"
                  alt="VIAN Avatar"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
                    VIAN Copilot
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/40 px-2 py-0.5 text-[10px] font-semibold text-cyan-700 dark:text-cyan-300">
                    <IconSparkles className="h-2.5 w-2.5 text-cyan-500" />
                    Agent v2.5
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span>Online · Multi-Agent Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Expand / Launch Full Chat Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenVian}
              title="Open full interactive chat window"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-zinc-200 shadow-xs hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all cursor-pointer"
            >
              <IconMaximize className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Expand Chat</span>
              <span className="rounded border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-900 px-1 py-0.2 text-[9px] font-mono text-slate-500 dark:text-zinc-400">
                ⌘K
              </span>
            </button>
          </div>
        </div>

        {/* --- Chat Conversation Preview Body --- */}
        <div className="relative z-10 p-4 sm:p-6 space-y-4">
          {/* Assistant Message Bubble */}
          <div className="flex items-start gap-3 sm:gap-3.5">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-cyan-500/40 shadow-sm mt-0.5">
              <Image
                src="/vian-avatar.jpg"
                alt="VIAN"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">
                  VIAN
                </span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500">
                  Portfolio Copilot
                </span>
              </div>

              {/* Speech Bubble */}
              <div className="rounded-2xl rounded-tl-sm border border-slate-200/90 dark:border-zinc-800/80 bg-slate-100/90 dark:bg-zinc-900/80 p-3.5 sm:p-4 text-xs sm:text-sm text-slate-800 dark:text-zinc-200 shadow-xs leading-relaxed space-y-2.5">
                <p>
                  Hey there! 👋 I&apos;m <span className="font-semibold text-cyan-600 dark:text-cyan-400">VIAN</span>, Vivek&apos;s autonomous AI copilot.
                  I have full context on his production ML systems, agentic architectures, hackathon achievements, and engineering stack.
                </p>

                {/* Agent Tool & Context Badge */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/80 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 px-2 py-0.5 text-cyan-700 dark:text-cyan-300">
                    <IconCpu className="h-3 w-3 text-cyan-500" />
                    Agent Tools Ready
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/80 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 px-2 py-0.5 text-emerald-700 dark:text-emerald-300">
                    <IconBrain className="h-3 w-3 text-emerald-500" />
                    Full Portfolio Knowledge Base
                  </span>
                </div>
              </div>

              {/* Quick Prompt Suggestion Chips */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                  <IconMessageDots className="h-3.5 w-3.5 text-cyan-500" />
                  Quick prompts to start chatting:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROMPT_SUGGESTIONS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleSendPrompt(item.query)}
                      className="group/chip flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 hover:border-cyan-500/50 p-2.5 text-left text-xs font-medium text-slate-700 dark:text-zinc-300 hover:text-cyan-900 dark:hover:text-cyan-200 transition-all duration-200 shadow-2xs hover:shadow-xs hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm shrink-0">{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                      </div>
                      <IconArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-zinc-600 transition-transform duration-200 group-hover/chip:translate-x-0.5 group-hover/chip:text-cyan-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- Interactive Chat Input Bar --- */}
          <form
            onSubmit={handleSubmit}
            className="pt-2 relative flex items-center"
          >
            <div className="group/input relative flex flex-1 items-center rounded-xl sm:rounded-2xl border border-slate-300 dark:border-zinc-700/80 bg-white dark:bg-zinc-900/90 px-3.5 py-2.5 sm:py-3 shadow-inner transition-all duration-200 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
              <IconSparkles className="h-4 w-4 shrink-0 text-cyan-500 mr-2.5 transition-transform duration-200 group-focus-within/input:rotate-12" />

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask VIAN about Vivek's experience, ML projects, or tech stack..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none"
              />

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                  <IconCornerDownLeft className="h-2.5 w-2.5" />
                  Enter
                </span>

                <button
                  type="submit"
                  aria-label="Send message to VIAN"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <IconSend className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Capabilities Footer Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/50 dark:border-zinc-800/50 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <IconCpu className="h-3 w-3 text-cyan-500" /> Multi-Agent Reasoning
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <IconBolt className="h-3 w-3 text-cyan-500" /> Tool Execution
              </span>
              <span className="hidden md:flex items-center gap-1">
                <IconBrain className="h-3 w-3 text-cyan-500" /> Adaptive Memory
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-zinc-500">
              <IconTerminal2 className="h-3 w-3 text-slate-400 dark:text-zinc-500" />
              <span>Press <kbd className="font-sans font-semibold">⌘K</kbd> anywhere</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
