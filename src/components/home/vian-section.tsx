"use client";

import React from "react";
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
      <SectionHeading
        number="02"
        chapter="CHAPTER 02 — AUTONOMOUS AGENT"
      >
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

        {/* Subtle Ambient Dark Gradient Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Apple iPhone Dynamic Island Pill: lets talk with vian */}
        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenVian();
            }}
            aria-label="lets talk with vian"
            className="group/island relative flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-black/90 hover:bg-black backdrop-blur-2xl border border-white/20 hover:border-cyan-400/60 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(34,211,238,0.25)] hover:shadow-[0_16px_50px_rgba(34,211,238,0.45)] transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Dynamic Island Pulsing AI Sensor Dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </span>

            {/* Exact User Text: lets talk with vian */}
            <span className="text-xs sm:text-sm font-medium tracking-wide text-white/95 group-hover/island:text-white transition-colors capitalize font-sans">
              lets talk with vian
            </span>

            {/* Apple Dynamic Island Live Audio Waveform Bars */}
            <div className="flex items-center gap-0.5 pl-1 shrink-0">
              <span className="w-0.5 h-3 bg-cyan-400/90 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
              <span className="w-0.5 h-4.5 bg-cyan-300 rounded-full animate-[pulse_1.4s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-2.5 bg-cyan-400/90 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
              <span className="w-0.5 h-3.5 bg-cyan-300 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.1s]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
