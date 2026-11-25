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

        {/* Subtle Ambient Dark Gradient Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Corner Circular Action Button: TALK WITH VIAN */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenVian();
          }}
          aria-label="Talk with VIAN"
          className="group/btn absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full border-2 border-cyan-400/80 bg-black/85 hover:bg-black backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:shadow-[0_0_55px_rgba(34,211,238,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer p-2 text-center"
        >
          <IconSparkles className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-125 mb-0.5 sm:mb-1" />
          <span className="font-[family-name:var(--font-anton)] text-[9.5px] sm:text-[11px] uppercase tracking-wider text-white leading-tight">
            TALK WITH<br />VIAN
          </span>
          <span className="mt-1 rounded border border-cyan-500/40 bg-cyan-500/20 px-1.5 py-0.2 text-[8px] sm:text-[9px] font-mono text-cyan-300 font-bold">
            ⌘K
          </span>
        </button>
      </div>
    </div>
  );
}
