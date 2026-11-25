"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";

export function EditorialTapes() {
  return (
    <div className="relative w-full overflow-x-clip py-8 sm:py-12 select-none pointer-events-none">
      <div className="relative w-full flex items-center justify-center min-h-[110px] sm:min-h-[130px]">
        {/* Tape A: Dark / Ink Tape (-2.2deg) */}
        <div className="absolute w-[250vw] min-w-[2200px] -rotate-[2.2deg] bg-black border-y border-white/20 py-2.5 sm:py-3 shadow-[0_6px_25px_rgba(0,0,0,0.6)] z-[1]">
          <Marquee
            repeat={8}
            className="[--duration:28s] py-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-anton)] tracking-wider text-white uppercase leading-none"
          >
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>TYPESCRIPT</span>
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>NODE.JS</span>
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>GO</span>
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>REACT</span>
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>MONGODB</span>
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>POSTGRESQL</span>
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>DOCKER</span>
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>NEXT.JS</span>
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>PYTHON</span>
            <span className="mx-3 sm:mx-4.5 text-zinc-400 font-normal">✦</span>
            <span>PYTORCH</span>
          </Marquee>
        </div>

        {/* Tape B: Paper / Cream Tape (+1.6deg) Crossing in Front */}
        <div className="absolute w-[250vw] min-w-[2200px] rotate-[1.6deg] bg-[#ECE7DC] border-y-2 border-black py-2.5 sm:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.45)] z-[2]">
          <Marquee
            reverse
            repeat={8}
            className="[--duration:32s] py-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-anton)] tracking-tight text-black uppercase leading-none"
          >
            <span className="mx-3 sm:mx-4.5 text-black font-normal">✦</span>
            <span>NO FLUFF</span>
            <span className="mx-3 sm:mx-4.5 text-black font-normal">✦</span>
            <span>REAL SHIP</span>
            <span className="mx-3 sm:mx-4.5 text-black font-normal">✦</span>
            <span>OPEN TO FREELANCE</span>
            <span className="mx-3 sm:mx-4.5 text-black font-normal">✦</span>
            <span>FULL STACK</span>
            <span className="mx-3 sm:mx-4.5 text-black font-normal">✦</span>
            <span>AI THAT SHIPS</span>
            <span className="mx-3 sm:mx-4.5 text-black font-normal">✦</span>
            <span>SYSTEM ARCHITECT</span>
          </Marquee>
        </div>
      </div>
    </div>
  );
}
