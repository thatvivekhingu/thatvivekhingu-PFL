"use client";

import React from "react";
import { SectionHeading } from "@/components/layout/section-heading";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { playTapSound } from "@/lib/sound";
import { TiltCard } from "@/components/ui/tilt-card";
import { Magnetic } from "@/components/ui/magnetic";

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

      {/* 3D Tilt Cinematic Video Container */}
      <TiltCard
        maxTilt={3.5}
        glareOpacity={0.08}
        dataCursor="Talk"
        className="w-full"
      >
        <div
          onClick={handleOpenVian}
          className="group relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 dark:border-zinc-800/80 bg-slate-950 shadow-2xl transition-all duration-300 hover:border-cyan-500/50 cursor-pointer select-none"
        >
          <SpotlightGlow color="rgba(34, 211, 238, 0.18)" size={600} />

          {/* Cinematic Video Layer */}
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

          {/* Apple iPhone Dynamic Island Pill positioned at TOP of Video with Magnetic Physics */}
          <div className="absolute top-2.5 sm:top-5 md:top-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-auto">
            <Magnetic strength={0.35}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenVian();
                }}
                aria-label="Say hi to Vian"
                className="group/island relative flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-0.5 sm:px-4 sm:py-1.5 h-6 sm:h-8.5 rounded-full bg-black/95 hover:bg-black backdrop-blur-2xl border border-white/15 hover:border-cyan-400/50 shadow-[0_4px_24px_rgba(0,0,0,0.85),0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_6px_28px_rgba(34,211,238,0.4)] transition-all duration-300 ease-out active:scale-95 cursor-pointer select-none"
              >
                {/* iPhone TrueDepth Camera & Sensor Pinhole Cutout */}
                <div className="relative flex items-center justify-center shrink-0">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#18181b] ring-1 ring-white/15 flex items-center justify-center">
                    <span className="h-0.5 w-0.5 sm:h-1 sm:w-1 rounded-full bg-cyan-400/90 shadow-[0_0_4px_#22d3ee] animate-pulse" />
                  </span>
                </div>

                {/* Sleek Linear Island Label */}
                <span className="text-[9.5px] sm:text-xs font-mono font-medium tracking-tight text-white/90 group-hover/island:text-white transition-colors whitespace-nowrap">
                  Say hi to Vian
                </span>

                {/* Apple Dynamic Island Live Audio Waveform Bars */}
                <div className="flex items-center gap-[2px] pl-0.5 shrink-0">
                  <span className="w-[1.5px] h-1.5 sm:h-2.5 bg-cyan-400/90 rounded-full animate-[pulse_0.9s_ease-in-out_infinite]" />
                  <span className="w-[1.5px] h-2.5 sm:h-3.5 bg-cyan-300 rounded-full animate-[pulse_1.3s_ease-in-out_infinite_0.15s]" />
                  <span className="w-[1.5px] h-1 sm:h-2 bg-cyan-400/90 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.3s]" />
                </div>
              </button>
            </Magnetic>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
