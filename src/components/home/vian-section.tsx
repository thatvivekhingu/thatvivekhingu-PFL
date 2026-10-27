"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconSparkles,
  IconSend,
  IconArrowRight,
  IconMaximize,
  IconCornerDownLeft,
} from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { playTapSound } from "@/lib/sound";

const PROMPT_CHIPS = [
  {
    label: "🏆 Flinders AI Win",
    query: "Tell me about your 2nd place win at Flinders University AI Hackathon!",
  },
  {
    label: "🤖 Agentic AI Stack",
    query: "How do you build autonomous multi-agent systems and tool-calling pipelines?",
  },
  {
    label: "⚡ Top ML Builds",
    query: "What are your top ML builds like BharatBhasha AI and Reverse Recipe Engine?",
  },
  {
    label: "💼 Hire or Collaborate",
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
        subtitle="AUTONOMOUS COPILOT"
      >
        Let&apos;s talk with VIAN
      </SectionHeading>

      {/* 16:9 Rectangular Frame Container */}
      <div className="group/glow relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-[#0c1015]/95 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-500/40 p-4 sm:p-6 md:p-8 lg:p-10 md:aspect-[16/9] flex flex-col justify-center">
        <SpotlightGlow color="rgba(34, 211, 238, 0.12)" size={500} />

        {/* Ambient Top Glow Accent */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl" />

        {/* Side-by-Side 16:9 Split Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-center h-full">
          {/* --- LEFT: Developer Typing Video (16:9 Frame) --- */}
          <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800/80 bg-slate-950 shadow-xl group/video">
            <video
              src="/developer-typing.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
            />

            {/* Subtle Vignette Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

            {/* Top Live Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11px] font-mono text-white shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Autonomous Coding Agent</span>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-300">
              <span className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[10px]">
                1080p • Real-Time AI
              </span>
              <span className="bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 backdrop-blur-md px-2 py-0.5 rounded text-[10px]">
                VIAN Engine v2.5
              </span>
            </div>
          </div>

          {/* --- RIGHT: Clean Chatbot Interface ("bajume") --- */}
          <div className="flex flex-col justify-between h-full space-y-4 sm:space-y-5">
            {/* Header & Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>Autonomous Agent Online</span>
                </div>

                {/* Direct Launch Modal Button */}
                <button
                  type="button"
                  onClick={handleOpenVian}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-100/80 dark:bg-zinc-900/80 px-2 py-1 text-[11px] font-medium text-slate-700 dark:text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all cursor-pointer"
                  title="Expand full screen chat"
                >
                  <IconMaximize className="h-3 w-3" />
                  <span>⌘K</span>
                </button>
              </div>

              {/* Title & Avatar */}
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-cyan-500/50 shadow-md">
                  <Image
                    src="/vian-avatar.jpg"
                    alt="VIAN Avatar"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
                    Let&apos;s talk with VIAN
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                    Portfolio Copilot & Technical Agent
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed pt-1">
                Chat with Vivek&apos;s AI engineering assistant to explore system architectures, analyze production ML projects, or schedule collaborations in real time.
              </p>
            </div>

            {/* Quick Prompt Suggestion Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-zinc-500">
                Quick prompts to start:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {PROMPT_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => handleSendPrompt(chip.query)}
                    className="px-2.5 py-1 rounded-full bg-slate-100/90 dark:bg-zinc-900/90 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border border-slate-200/80 dark:border-zinc-800 hover:border-cyan-500/50 text-xs font-medium text-slate-700 dark:text-zinc-300 hover:text-cyan-900 dark:hover:text-cyan-200 transition-all duration-150 shadow-2xs hover:scale-[1.02] active:scale-95 cursor-pointer text-left"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Prompt Input Bar */}
            <form onSubmit={handleSubmit} className="relative flex items-center pt-1">
              <div className="group/input relative flex flex-1 items-center rounded-xl border border-slate-300 dark:border-zinc-700/80 bg-slate-50 dark:bg-zinc-900/90 px-3.5 py-2.5 shadow-inner transition-all focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
                <IconSparkles className="h-4 w-4 shrink-0 text-cyan-500 mr-2.5 transition-transform group-focus-within/input:rotate-12" />
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask VIAN anything about Vivek's work..."
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none"
                />
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 px-1 py-0.2 text-[9px] font-mono text-slate-500 dark:text-zinc-400">
                    <IconCornerDownLeft className="h-2 w-2" />
                    Enter
                  </span>
                  <button
                    type="submit"
                    aria-label="Send message to VIAN"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <IconSend className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Action Footer */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-500 pt-0.5">
              <button
                type="button"
                onClick={handleOpenVian}
                className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold cursor-pointer"
              >
                <span>Launch interactive assistant</span>
                <IconArrowRight className="h-3.5 w-3.5" />
              </button>
              <span className="font-mono text-[10px]">Press ⌘K anywhere</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
