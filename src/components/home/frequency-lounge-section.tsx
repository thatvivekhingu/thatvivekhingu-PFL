"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBroadcast, IconPlayerPlay, IconClock, IconSparkles } from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { STUDIO_SCENES, getISTNow, indexForHour } from "@/lib/studio-scenes";
import { TRACKS } from "@/lib/music-data";
import { playTapSound } from "@/lib/sound";

export default function FrequencyLoungeSection() {
  const [currentSlot, setCurrentSlot] = useState(0);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const istDate = getISTNow();
      setCurrentSlot(indexForHour(istDate.getHours()));
      setTimeStr(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scene = STUDIO_SCENES[currentSlot] || STUDIO_SCENES[0];

  return (
    <div className="flex flex-col w-full select-none">
      <SectionHeading
        number="09"
        chapter="CHAPTER 09 — THE FREQUENCY DECK"
      >
        <span className="text-[#06B6D4]">AUDIO FREQUENCY</span>{" "}
        <span className="text-white">{"// STUDIO 88.5"}</span>
      </SectionHeading>

      {/* Cybernetic Studio Showcase Card */}
      <Link
        href="/music"
        onClick={() => playTapSound("chime")}
        className="group relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/90 hover:border-cyan-500/50 bg-black shadow-2xl transition-all duration-500 cursor-pointer block"
      >
        {/* Background Atmospheric Architectural Studio Scene */}
        <Image
          src={scene.src}
          alt={scene.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
        />

        {/* Ambient Gradient Scrims & High-Tech Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/20 to-black/70 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/75 backdrop-blur-md text-cyan-400 border border-cyan-500/40 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            {"LIVE ON AIR //"} {scene.slot}
          </span>

          {timeStr && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-300 bg-black/70 backdrop-blur-md border border-white/10 shadow-md">
              <IconClock className="w-3.5 h-3.5 text-zinc-400" />
              {timeStr} IST
            </span>
          )}

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-emerald-400 bg-black/70 backdrop-blur-md border border-emerald-500/30">
            88.5 — 108.0 MHz FM
          </span>
        </div>

        {/* Bottom Station Details & Action Pill */}
        <div className="absolute bottom-4 sm:bottom-7 left-4 sm:left-8 right-4 sm:right-8 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 tracking-widest mb-1.5">
              <IconBroadcast className="w-4 h-4" />
              <span>{scene.title} • {scene.vibe}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-tight drop-shadow-md">
              THE FREQUENCY DECK
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 mt-1 leading-relaxed">
              Curated analog &amp; cyber soundscapes calibrated for high-velocity engineering, deep focus, and midnight flow.
            </p>

            <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-400 font-mono">
              <span className="text-cyan-400 font-semibold">{TRACKS.length} Master Channels</span>
              <span>•</span>
              <span>HOME, Anuv Jain, Hans Zimmer, Prateek Kuhad &amp; more</span>
            </div>
          </div>

          {/* Action Button Pill */}
          <div className="shrink-0 flex items-center gap-3 px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_10px_35px_rgba(6,182,212,0.35)] group-hover:scale-105 active:scale-95 transition-all">
            <IconPlayerPlay className="w-4 h-4 fill-black" />
            <span>Launch Frequency Deck</span>
            <IconSparkles className="w-4 h-4 text-black" />
          </div>
        </div>
      </Link>
    </div>
  );
}
