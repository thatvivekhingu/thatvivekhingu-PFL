"use client";

import React from "react";
import { IconSparkles } from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { playTapSound } from "@/lib/sound";

export default function VianSection() {
  const handleOpenVian = () => {
    playTapSound("chime");
    window.dispatchEvent(new CustomEvent("openVianFresh"));
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
      <div className="group/glow relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-500/40 p-4 sm:p-6 md:p-8 md:aspect-[16/9] flex flex-col justify-center">
        <SpotlightGlow color="rgba(34, 211, 238, 0.12)" size={500} />

        {/* Ambient Top Glow Accent */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl" />

        {/* Side-by-Side: Video on Left, Button on Right */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 h-full">
          {/* --- LEFT: Developer Typing Video (16:9 Frame, Gemini logo cropped) --- */}
          <div className="relative w-full md:w-3/5 aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800/80 bg-slate-950 shadow-xl">
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
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Live Indicator Badge on Video */}
            <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-1 text-[11px] font-mono text-white shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Autonomous Agent Online</span>
            </div>
          </div>

          {/* --- RIGHT: Let's talk with VIAN Button --- */}
          <div className="flex flex-col items-center justify-center w-full md:w-2/5 text-center px-2 py-4">
            <button
              type="button"
              onClick={handleOpenVian}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-cyan-500/60 bg-cyan-500/15 dark:bg-cyan-950/60 backdrop-blur-md px-7 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-bold text-cyan-800 dark:text-cyan-200 transition-all duration-300 hover:scale-105 hover:bg-cyan-500/25 dark:hover:bg-cyan-900/80 hover:text-cyan-950 dark:hover:text-white hover:border-cyan-400 shadow-xl dark:shadow-[0_0_35px_rgba(34,211,238,0.35)] cursor-pointer"
            >
              <IconSparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
              <span>Let&apos;s talk with VIAN</span>
              <span className="rounded-md border border-cyan-500/40 bg-cyan-500/20 dark:bg-cyan-900/70 px-2 py-0.5 text-xs font-mono text-cyan-900 dark:text-cyan-300 shadow-xs">
                ⌘K
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
