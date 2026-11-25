"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/layout/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { playTapSound } from "@/lib/sound";

interface TechIconItem {
  name: string;
  category: string;
  src: string;
  alt: string;
}

// ============================================================================
// 100% ORIGINAL 3D APP SQUIRCLE ASSETS DIRECT FROM FRAMER MCP
// ============================================================================

const ROW_1: TechIconItem[] = [
  {
    name: "Claude",
    category: "Anthropic Foundation Model",
    src: "/tech-icons/claude.png",
    alt: "Claude app logo",
  },
  {
    name: "Claude Code",
    category: "Autonomous CLI Agent",
    src: "/tech-icons/claude-code.png",
    alt: "Claude Code app logo",
  },
  {
    name: "Framer",
    category: "Interactive Prototyping",
    src: "/tech-icons/framer.png",
    alt: "Framer app logo",
  },
  {
    name: "Pi AI",
    category: "Conversational Intelligence",
    src: "/tech-icons/pi.png",
    alt: "Pi app logo",
  },
  {
    name: "Notion",
    category: "Architecture & Systems Docs",
    src: "/tech-icons/notion.png",
    alt: "Notion app logo",
  },
  {
    name: "Antigravity",
    category: "Agentic Engineering Platform",
    src: "/tech-icons/antigravity.png",
    alt: "Google Antigravity app logo",
  },
  {
    name: "Codex",
    category: "Code Intelligence Engine",
    src: "/tech-icons/codex.png",
    alt: "OpenAI Codex app logo",
  },
  {
    name: "OpenCode",
    category: "Open Agent Framework",
    src: "/tech-icons/opencode.png",
    alt: "OpenCode app logo",
  },
];

const ROW_2: TechIconItem[] = [
  {
    name: "VS Code",
    category: "Primary Development IDE",
    src: "/tech-icons/vscode.png",
    alt: "VS Code app logo",
  },
  {
    name: "Kiro",
    category: "Autonomous Agent Tooling",
    src: "/tech-icons/kiro.png",
    alt: "Kiro app logo",
  },
  {
    name: "ChatGPT",
    category: "OpenAI Reasoning & Multimodal",
    src: "/tech-icons/chatgpt.png",
    alt: "ChatGPT app logo",
  },
  {
    name: "Warp",
    category: "Modern AI Terminal",
    src: "/tech-icons/warp.png",
    alt: "Warp app logo",
  },
  {
    name: "Devin",
    category: "Autonomous Software Engineer",
    src: "/tech-icons/devin.png",
    alt: "Devin app logo",
  },
  {
    name: "Grok Bot",
    category: "xAI Autonomous Agent",
    src: "/tech-icons/grok-bot.png",
    alt: "Grok Bot app logo",
  },
  {
    name: "Grok",
    category: "Real-Time Reasoning Engine",
    src: "/tech-icons/grok.png",
    alt: "Grok app logo",
  },
  {
    name: "Cursor",
    category: "AI-Powered Code Synthesis",
    src: "/tech-icons/cursor.png",
    alt: "Cursor app logo",
  },
  {
    name: "Windsurf",
    category: "Agentic IDE & Flow Control",
    src: "/tech-icons/windsurf.png",
    alt: "Windsurf app logo",
  },
];

export default function SkillsStack() {
  const [hoveredItem, setHoveredItem] = useState<TechIconItem | null>(null);

  const handleTileClick = (item: TechIconItem) => {
    playTapSound("pop");
    setHoveredItem(item);
  };

  const renderIconTile = (item: TechIconItem, idx: number) => (
    <div
      key={`${item.name}-${idx}`}
      onClick={() => handleTileClick(item)}
      onMouseEnter={() => setHoveredItem(item)}
      onMouseLeave={() => setHoveredItem(null)}
      className="group relative shrink-0 cursor-pointer select-none p-1"
    >
      {/* Original 3D Glossy App Squircle Icon from Framer */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-[22px] sm:rounded-[26px] md:rounded-[30px] overflow-hidden transition-all duration-300 transform group-hover:scale-115 group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] shadow-[0_12px_28px_rgba(0,0,0,0.7)]">
        <Image
          src={item.src}
          alt={item.alt}
          width={112}
          height={112}
          sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
          className="w-full h-full object-cover rounded-[22px] sm:rounded-[26px] md:rounded-[30px] transition-transform duration-300 group-hover:scale-105 pointer-events-none"
        />

        {/* Subtle 3D Top Specular Shine */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-t-[22px] sm:rounded-t-[26px] md:rounded-t-[30px]" />
      </div>

      {/* Floating Tooltip Tag on Hover */}
      <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 whitespace-nowrap">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/90 backdrop-blur-md border border-white/20 text-[10.5px] font-mono text-white shadow-xl">
          <span className="font-bold text-cyan-400">{item.name}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300">{item.category}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full" id="skills">
      {/* STANDARDIZED ANTON HEADLINE */}
      <SectionHeading>
        <span className="text-[#3B82F6]">TECH STACK</span>{" "}
        <span className="text-white">&amp; ARSENAL</span>
      </SectionHeading>

      {/* DUAL-ROW CONTINUOUS MARQUEE RUNWAY WITH FADE EDGES */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6 select-none">
        {/* Left Edge Gradient Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-background via-background/70 to-transparent z-20" />

        {/* Right Edge Gradient Fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-background via-background/70 to-transparent z-20" />

        {/* Row 1: Leftward Infinite Marquee */}
        <Marquee pauseOnHover className="[--duration:36s] [--gap:1.25rem] sm:[--gap:1.5rem] py-2">
          {ROW_1.map((item, idx) => renderIconTile(item, idx))}
        </Marquee>

        {/* Row 2: Rightward Reverse Infinite Marquee (Staggered Offset) */}
        <Marquee reverse pauseOnHover className="[--duration:38s] [--gap:1.25rem] sm:[--gap:1.5rem] py-2 mt-2 sm:mt-3">
          {ROW_2.map((item, idx) => renderIconTile(item, idx))}
        </Marquee>
      </div>

      {/* TACTILE ACTIVE INSPECTOR BAR */}
      <div className="flex items-center justify-center pt-3 sm:pt-5 text-center">
        <p className="font-mono text-xs sm:text-[13px] text-zinc-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            {hoveredItem ? (
              <>
                <strong className="text-white font-bold">{hoveredItem.name}</strong>
                <span className="text-zinc-500 mx-1.5">{"//"}</span>
                <span className="text-cyan-400">{hoveredItem.category}</span>
              </>
            ) : (
              "Hover or tap any 3D squircle to inspect engineering tools & AI engines"
            )}
          </span>
        </p>
      </div>
    </div>
  );
}
