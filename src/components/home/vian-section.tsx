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
    <div className="flex flex-col w-full">
      <SectionHeading>
        <span className="text-[#3B82F6]">TALK WITH</span>{" "}
        <span className="text-white">VIAN</span>
      </SectionHeading>

      {/* Full-Width End-to-End Cinematic Video Container */}
      <div
        onClick={handleOpenVian}
        className="group relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 dark:border-zinc-800/80 bg-slate-950 shadow-2xl transition-all duration-300 hover:border-cyan-500/50 cursor-pointer select-none"
      >
        <SpotlightGlow color="rgba(34, 211, 238, 0.18)" size={600} />

        {/* Cinematic Video Layer (Watermark Cropped, Edge-to-Edge) */}
        <video
          src="/developer-typing.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.12] origin-top-left transition-transform duration-700 group-hover:scale-[1.15] pointer-events-none"
        />

        {/* Ambient Dark Gradient Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60" />

        {/* Top Floating Telemetry Badges */}
        <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-mono text-white shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold tracking-wide">Autonomous Agent Live</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-white/80 bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>LLaMA 3.3 Engine • 128K Context</span>
          </div>
        </div>

        {/* Center Floating Primary CTA: Let's talk with VIAN */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-20 pointer-events-none">
          <div className="pointer-events-auto transform transition-transform duration-300 group-hover:scale-105">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenVian();
              }}
              className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-cyan-400/80 bg-black/85 hover:bg-black/95 backdrop-blur-xl px-7 sm:px-10 py-3.5 sm:py-4 text-base sm:text-xl font-bold text-white shadow-[0_0_40px_rgba(34,211,238,0.45)] hover:shadow-[0_0_65px_rgba(34,211,238,0.7)] transition-all cursor-pointer"
            >
              <IconSparkles className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-125" />
              <span>Let&apos;s talk with VIAN</span>
              <span className="rounded-md border border-cyan-500/40 bg-cyan-500/20 px-2 sm:px-2.5 py-0.5 text-xs font-mono text-cyan-300">
                ⌘K
              </span>
            </button>
          </div>

          <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs font-mono text-white/80 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 pointer-events-none">
            Click anywhere on the stream to launch interactive session
          </p>
        </div>

        {/* Bottom Floating Telemetry Bar */}
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/15 px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono text-white/90 max-w-full truncate">
            <span className="text-cyan-400 font-bold">❯</span>
            <span className="truncate">
              Trained on Vivek&apos;s codebase, research, architectures &amp; background
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-zinc-400 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg">
            <span>Latency: ~300ms</span>
            <span>•</span>
            <span>Bilingual: EN / GUJ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
