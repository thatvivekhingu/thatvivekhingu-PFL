"use client";

import React from "react";
import { IconSparkles, IconTerminal2, IconCpu, IconLanguage, IconBolt } from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { playTapSound } from "@/lib/sound";

const QUICK_PROMPTS = [
  {
    icon: <IconBolt className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
    label: "Top AI Projects",
    query: "What are Vivek's top AI projects and engineering highlights?",
  },
  {
    icon: <IconTerminal2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
    label: "Core Tech Stack",
    query: "Explain Vivek's core tech stack, backend skills, and AI architecture.",
  },
  {
    icon: <IconLanguage className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
    label: "ગુજરાતીમાં વાત કરો",
    query: "વિવેક હિંગુ વિશે ગુજરાતીમાં વિગતવાર જણાવો (Tell me about Vivek Hingu in Gujarati)",
  },
  {
    icon: <IconCpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />,
    label: "Collaborate / Hire",
    query: "How can I collaborate with or hire Vivek for AI engineering roles?",
  },
];

export default function VianSection() {
  const handleOpenVian = () => {
    playTapSound("chime");
    window.dispatchEvent(new CustomEvent("openVianFresh"));
  };

  const handleQuickPrompt = (query: string) => {
    playTapSound("chime");
    window.dispatchEvent(new CustomEvent("openVianWithQuery", { detail: { query } }));
  };

  return (
    <div className="flex flex-col w-full">
      <SectionHeading>
        <span className="text-[#3B82F6]">TALK WITH</span>{" "}
        <span className="text-white">VIAN COPILOT</span>
      </SectionHeading>

      {/* Main Container - Compact, zero wasted empty padding, naturally sized */}
      <div className="group/glow relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-500/40 p-3 sm:p-5 md:p-6">
        <SpotlightGlow color="rgba(34, 211, 238, 0.12)" size={500} />

        {/* Ambient Top Glow Accent */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl" />

        {/* Side-by-Side Grid Layout: 7 Cols Video on Left, 5 Cols Interactive Copilot on Right */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
          {/* --- LEFT: Developer Typing Video Card (Snug 16:9, Watermark Cropped, Zero Dead Space) --- */}
          <div className="lg:col-span-7 relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800/80 bg-slate-950 shadow-xl">
            {/* Video scaled & aligned top-left to crop out bottom-right Gemini star logo */}
            <video
              src="/developer-typing.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-[1.12] origin-top-left pointer-events-none"
            />

            {/* Subtle Vignette Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

            {/* Live Indicator Badge on Video Top */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 rounded-full bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-mono text-white shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-semibold">Autonomous Copilot Live</span>
              </div>
              <span className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-wider text-white/70 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-full">
                LLaMA 3.3 Core
              </span>
            </div>

            {/* Interactive Stream Bar on Video Bottom */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg w-full">
                <span className="text-cyan-400 font-bold font-mono text-xs">❯</span>
                <p className="text-[11px] font-mono text-white/90 truncate">
                  Ready to answer questions about architecture, code &amp; experience...
                </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Interactive Copilot Command Center (Fills the space smartly) --- */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 py-1">
            {/* Header: Agent Identity & Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-sm">
                  <IconSparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <span>VIAN Copilot</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                      AI
                    </span>
                  </h3>
                  <p className="text-[11px] font-mono text-muted-foreground">
                    Personal AI Agent // Trained on Vivek
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
              Ask anything about Vivek&apos;s builds, machine learning research, core tech stack, or engineering philosophy in English or Gujarati.
            </p>

            {/* Clickable Quick Prompts */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                <span>Quick Inquiries</span>
                <span className="text-cyan-400/80">Click to ask ➔</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickPrompt(prompt.query)}
                    className="flex items-center gap-2 text-left text-[11px] font-mono px-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-800/80 hover:border-cyan-500/50 bg-slate-100/60 dark:bg-zinc-900/60 hover:bg-cyan-500/10 text-slate-700 dark:text-zinc-300 hover:text-cyan-400 transition-all cursor-pointer group shadow-xs truncate"
                  >
                    {prompt.icon}
                    <span className="truncate group-hover:translate-x-0.5 transition-transform">
                      {prompt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleOpenVian}
              className="group relative w-full inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-cyan-500/60 bg-cyan-500/15 dark:bg-cyan-950/70 backdrop-blur-md px-6 py-3.5 text-sm sm:text-base font-bold text-cyan-800 dark:text-cyan-200 transition-all duration-300 hover:scale-[1.01] hover:bg-cyan-500/25 dark:hover:bg-cyan-900/90 hover:text-cyan-950 dark:hover:text-white hover:border-cyan-400 shadow-xl dark:shadow-[0_0_30px_rgba(34,211,238,0.25)] cursor-pointer"
            >
              <IconSparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
              <span>Let&apos;s talk with VIAN</span>
              <span className="rounded-md border border-cyan-500/40 bg-cyan-500/20 dark:bg-cyan-900/70 px-2 py-0.5 text-xs font-mono text-cyan-900 dark:text-cyan-300">
                ⌘K
              </span>
            </button>

            {/* Agent Telemetry Footer Specs */}
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1 border-t border-slate-200 dark:border-zinc-800/80">
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                Latency: ~300ms
              </span>
              <span>Context: 128K</span>
              <span>Bilingual: EN / GUJ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
