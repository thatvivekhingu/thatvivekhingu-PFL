"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/layout/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { playTapSound } from "@/lib/sound";

interface SquircleItem {
  name: string;
  category: string;
  bg: string;
  border?: string;
  shadow?: string;
  icon: React.ReactNode;
}

// ============================================================================
// HIGH-FIDELITY VECTOR APP SYMBOLS (MATCHING FRAMER MCP SQUIRCLE STYLE)
// ============================================================================

// 1. Claude (Coral Terracotta Sunburst)
const ClaudeCoralIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" fill="none">
    <circle cx="24" cy="24" r="2.8" fill="#F4ECE1" />
    {/* 16 radiating organic oval rays */}
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => (
      <ellipse
        key={i}
        cx="24"
        cy={i % 2 === 0 ? "11" : "13.5"}
        rx={i % 2 === 0 ? "2.6" : "2.2"}
        ry={i % 2 === 0 ? "7.5" : "5.5"}
        transform={`rotate(${deg} 24 24)`}
        fill="#F4ECE1"
      />
    ))}
  </svg>
);

// 2. Claude Dark (Copper Sunburst on Charcoal)
const ClaudeCopperIcon = () => (
  <svg viewBox="0 0 48 48" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" fill="none">
    <circle cx="24" cy="24" r="2.8" fill="#C98658" />
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => (
      <ellipse
        key={i}
        cx="24"
        cy={i % 2 === 0 ? "11" : "13.5"}
        rx={i % 2 === 0 ? "2.6" : "2.2"}
        ry={i % 2 === 0 ? "7.5" : "5.5"}
        transform={`rotate(${deg} 24 24)`}
        fill="#C98658"
      />
    ))}
  </svg>
);

// 3. ChatGPT / OpenAI (Black on Crisp Off-White)
const OpenAIIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path
      d="M39.6 20.4a8.8 8.8 0 0 0-.7-6.8 9 9 0 0 0-8.2-4.5 9.2 9.2 0 0 0-3.3.6A8.9 8.9 0 0 0 20.2 6a9 9 0 0 0-8.6 6.3 8.8 8.8 0 0 0-4.6 3.4 8.9 8.9 0 0 0-.8 7.3 8.9 8.9 0 0 0 .7 6.8 9 9 0 0 0 8.2 4.5 9.2 9.2 0 0 0 3.3-.6A8.9 8.9 0 0 0 25.6 37a9 9 0 0 0 8.6-6.3 8.8 8.8 0 0 0 4.6-3.4 8.9 8.9 0 0 0 .8-6.9zm-15.6 14a6.4 6.4 0 0 1-3.6-1.1l-1.2-.8v-4.8l2.9 1.7a3.8 3.8 0 0 0 3.8 0l4.3-2.5v2.9a6.4 6.4 0 0 1-6.2 4.6zm-8.8-4.2a6.3 6.3 0 0 1-.9-3.7v-1.4l4.2 2.4a3.8 3.8 0 0 0 3.8 0l4.3-2.5v2.9l-6.2 3.6a6.4 6.4 0 0 1-5.2-1.3zm-2.4-11.2a6.4 6.4 0 0 1 2.8-2.6l1.2-.7 4.2 2.4v4.9l-4.3-2.5a3.8 3.8 0 0 0-3.9 0v-1.5zm18.3 4.2-4.3-2.5 4.3-2.5a3.8 3.8 0 0 0 1.9-3.3v-1.5a6.4 6.4 0 0 1 4.5 6.1c0 1.3-.4 2.6-1.1 3.7l-5.3-3zm5.3-7.4-4.2-2.4a3.8 3.8 0 0 0-3.8 0l-4.3 2.5v-2.9l6.2-3.6a6.4 6.4 0 0 1 6.1 6.4zm-14.8-4.3a6.4 6.4 0 0 1 3.6 1.1l1.2.8v4.8l-2.9-1.7a3.8 3.8 0 0 0-3.8 0l-4.3 2.5v-2.9a6.4 6.4 0 0 1 6.2-4.6zm-2.6 10 3.8-2.2 3.8 2.2v4.4l-3.8 2.2-3.8-2.2z"
      fill="#111111"
    />
  </svg>
);

// 4. Figma (3D Metallic Finish)
const FigmaIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" fill="none">
    <path d="M16 36a6 6 0 0 0 6 6v-6h-6z" fill="#0ACF83" />
    <path d="M16 24h6v6h-6a6 6 0 1 1 0-6z" fill="#A259FF" />
    <path d="M16 12h6v6h-6a6 6 0 1 1 0-6z" fill="#F24E1E" />
    <path d="M22 12h6a6 6 0 0 1 0 12h-6V12z" fill="#FF7262" />
    <path d="M34 24a6 6 0 1 1-6-6v6h6z" fill="#1ABCFE" />
  </svg>
);

// 5. Notion (Embossed "N")
const NotionIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path
      d="M13.2 12.8h4.6l14.4 17.6V12.8h4.6v22.4h-4.4L17.8 17.4v17.8h-4.6V12.8z"
      fill="#FFFFFF"
    />
  </svg>
);

// 6. Framer (Silver / White Layered Triangles)
const FramerIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" fill="none">
    <path d="M14 10h20v14H24l10 14H14l10-14H14V10z" fill="#FFFFFF" />
  </svg>
);

// 7. VS Code (Blue Folded Ribbon)
const VSCodeIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path d="M35.5 8.2 27 15l-10.4-8-3.4 1.7L21 19.5 13.2 29.8l3.4 1.7 10.4-8 8.5 6.8 2.5-1.2V9.4z" fill="#0065A9" />
    <path d="m35.5 8.2-8.5 6.8v18l8.5 6.8 2.5-1.2V9.4z" fill="#007ACC" />
    <path d="m27 15-13.8-6.3-3.4 1.7L18.4 24l-8.6 13.6 3.4 1.7L27 33z" fill="#1F9CF0" />
  </svg>
);

// 8. Ghost AI (Purple with Cute Ghost)
const GhostIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path
      d="M24 8c-7.2 0-13 5.8-13 13v17l4.3-3.5L19.7 38l4.3-3.5 4.3 3.5 4.3-3.5 4.4 3.5V21c0-7.2-5.8-13-13-13z"
      fill="#FFFFFF"
    />
    <ellipse cx="19.5" cy="20.5" rx="2.5" ry="3.8" fill="#1E1B4B" />
    <ellipse cx="28.5" cy="20.5" rx="2.5" ry="3.8" fill="#1E1B4B" />
  </svg>
);

// 9. Cloud Terminal (Blue Cloud with >_)
const CloudTerminalIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path
      d="M34.5 18a8.5 8.5 0 0 0-16.2-2.5A7 7 0 0 0 9 22.5 7 7 0 0 0 16 29.5h18.5a6.5 6.5 0 0 0 0-13z"
      fill="#FFFFFF"
      fillOpacity="0.25"
    />
    <path d="m19 22 3.5 3.5L19 29m6 0h4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 10. Three.js (3D Wireframe Polyhedron)
const ThreeJSIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path d="M24 8 38 16v16L24 40 10 32V16L24 8z" stroke="#FFFFFF" strokeWidth="1.8" fill="#FFFFFF" fillOpacity="0.08" />
    <path d="M24 8v32M10 16l14 8 14-8M10 32l14-8 14 8" stroke="#FFFFFF" strokeWidth="1.8" />
  </svg>
);

// 11. Arc / Raycast Ribbon (Chromatic Gradient Wave)
const ArcRibbonIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <defs>
      <linearGradient id="arcGrad" x1="10" y1="36" x2="38" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F97316" />
        <stop offset="0.33" stopColor="#EAB308" />
        <stop offset="0.66" stopColor="#06B6D4" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    <path
      d="M12 34c4-12 12-22 24-22m-24 10c4-8 10-14 20-14"
      stroke="url(#arcGrad)"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

// 12. Next.js (Black with White N Slash)
const NextJSIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <circle cx="24" cy="24" r="18" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" />
    <path d="M19 15v18h3V21.5l11.5 13.2a18 18 0 0 0 2.2-2.2L22 15h-3z" fill="#FFFFFF" />
    <path d="M27.5 15h3v9.5h-3z" fill="#FFFFFF" />
  </svg>
);

// 13. TypeScript (Cobalt Blue with "TS")
const TypeScriptIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path d="M11 18h12v3.5h-4.2V32H15.2V21.5H11V18z" fill="#FFFFFF" />
    <path d="M25 28.5c1 .9 2.4 1.5 3.8 1.5 1.5 0 2.4-.7 2.4-1.7 0-2.8-6.2-2.2-6.2-6.8 0-2.4 2-4 5.2-4 1.8 0 3.2.5 4.3 1.2l-1 2.8c-.9-.6-2-1-3.3-1-1.3 0-2 .6-2 1.4 0 2.6 6.2 2 6.2 6.7 0 2.6-2.1 4.2-5.5 4.2-2.1 0-3.9-.6-5-1.5z" fill="#FFFFFF" />
  </svg>
);

// 14. Python (Dual Snake Emblem)
const PythonIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path
      d="M23.6 10c-5.8 0-5.5 2.5-5.5 2.5l.02 2.6h5.6v.8h-7.8c-2.5 0-4.6 1.5-4.6 4.3 0 2.8 2 4.2 4.6 4.2h1.6v-2.3c0-2.6 2.3-2.6 2.3-2.6h5.5c2.2 0 2.2-2.1 2.2-2.1v-4.9c0-2.5-3.9-2.5-3.9-2.5zm-1.5 1.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
      fill="#387EB8"
    />
    <path
      d="M24.4 38c5.8 0 5.5-2.5 5.5-2.5l-.02-2.6h-5.6v-.8h7.8c2.5 0 4.6-1.5 4.6-4.3 0-2.8-2-4.2-4.6-4.2h-1.6v2.3c0 2.6-2.3 2.6-2.3 2.6h-5.5c-2.2 0-2.2 2.1-2.2 2.1v4.9c0 2.5 3.9 2.5 3.9 2.5zm1.5-1.7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
      fill="#FFE052"
    />
  </svg>
);

// 15. Tailwind CSS (Cyan Double Wave)
const TailwindIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path
      d="M18.5 18c2-3.5 5-5 9-4.5 5.5.7 7 4.5 9 8.5 2.5 5 5.5 6 9.5 5-2 3.5-5 5-9 4.5-5.5-.7-7-4.5-9-8.5-2.5-5-5.5-6-9.5-5zM10 27c2-3.5 5-5 9-4.5 5.5.7 7 4.5 9 8.5 2.5 5 5.5 6 9.5 5-2 3.5-5 5-9 4.5-5.5-.7-7-4.5-9-8.5-2.5-5-5.5-6-9.5-5z"
      fill="#38BDF8"
    />
  </svg>
);

// 16. Google Gemini (Radiant Stellar Star)
const GeminiIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <defs>
      <radialGradient id="geminiGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#93C5FD" />
        <stop offset="70%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </radialGradient>
    </defs>
    <path
      d="M24 6c0 9.9 8.1 18 18 18-9.9 0-18 8.1-18 18 0-9.9-8.1-18-18-18 9.9 0 18-8.1 18-18z"
      fill="url(#geminiGrad)"
    />
  </svg>
);

// 17. Supabase (Neon Green Lightning)
const SupabaseIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path d="M26.5 8 13 25.5h10.5L20 40l15-18.5H24L26.5 8z" fill="#3ECF8E" />
  </svg>
);

// 18. GitHub (Octocat Silver)
const GitHubIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 10C16.3 10 10 16.3 10 24c0 6.2 4 11.4 9.6 13.3 0.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2.1-1.5-2.1-1.3-.9.1-.9.1-.9 1.4.1 2.2 1.4 2.2 1.4 1.3 2.2 3.3 1.5 4.1 1.2.1-.9.5-1.5 1-1.9-3.1-.3-6.4-1.6-6.4-7 0-1.5.5-2.8 1.4-3.8-.1-.4-.6-1.8.1-3.7 0 0 1.2-.4 3.9 1.4a13.5 13.5 0 0 1 7 0c2.7-1.8 3.9-1.4 3.9-1.4.7 1.9.3 3.3.1 3.7.9 1 1.4 2.3 1.4 3.8 0 5.4-3.3 6.6-6.5 7 .5.4 1 1.3 1 2.6v3.9c0 .4.3.8 1 .7A14 14 0 0 0 38 24c0-7.7-6.3-14-14-14z"
      fill="#E6EDF3"
    />
  </svg>
);

// 19. Docker (Cyan Whale)
const DockerIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path d="M12 24h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm-8-4h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm-4-4h3v3h-3z" fill="#008FE2" />
    <path d="M37.5 24c-.5-3.5-3.5-5.5-6.5-5.5H10v7c0 4.5 4.5 8.5 13.5 8.5 8.5 0 13-4 14-8 1.5-.5 3-1.8 3.5-3.5-.8-.3-2.3-.3-3.5 1.5z" fill="#008FE2" />
  </svg>
);

// 20. Groq (Orange Speed Chip)
const GroqIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <rect x="11" y="11" width="26" height="26" rx="6" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M26 14 18 26h6l-2 8 8-12h-6l2-8z" fill="#FFFFFF" />
  </svg>
);

// 21. PostgreSQL (Classic Elephant Silhouette)
const PostgresIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path
      d="M24 10c-7.7 0-14 5.8-14 13 0 4.2 2.2 7.9 5.6 10.3l-1.6 3.7h4.8l1.4-2.8c1.2.5 2.5.8 3.8.8 7.7 0 14-5.8 14-13S31.7 10 24 10z"
      fill="#336791"
    />
    <path d="M32 23c0 4.5-3.5 8-8 8s-8-3.5-8-8c0-3.5 2.5-6.5 6-7.5l-2-2.5h8l-2 2.5c3.5 1 6 4 6 7.5z" fill="#FFFFFF" fillOpacity="0.85" />
  </svg>
);

// 22. Cursor / AI Cube
const CursorIcon = () => (
  <svg viewBox="0 0 48 48" className="w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15" fill="none">
    <path d="M24 10 36 17v14L24 38 12 31V17L24 10z" stroke="#38BDF8" strokeWidth="2" fill="#0EA5E9" fillOpacity="0.2" />
    <path d="M24 10v28M12 17l24 14M12 31l24-14" stroke="#38BDF8" strokeWidth="1.8" />
  </svg>
);

// ============================================================================
// STACK SQUIRCLE CATALOG (2 STAGGERED CONTINUOUS MARQUEE ROWS)
// ============================================================================

const ROW_1: SquircleItem[] = [
  {
    name: "Claude AI",
    category: "Anthropic LLM",
    bg: "bg-[#D97757]",
    border: "border-[#E88C6E]/60",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_28px_rgba(217,119,87,0.35)]",
    icon: <ClaudeCoralIcon />,
  },
  {
    name: "ChatGPT / OpenAI",
    category: "Foundation Models",
    bg: "bg-[#ECE7DF]",
    border: "border-white/80",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_12px_28px_rgba(0,0,0,0.5)]",
    icon: <OpenAIIcon />,
  },
  {
    name: "Figma",
    category: "Interface Design",
    bg: "bg-[#1E1E1E]",
    border: "border-white/15",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(0,0,0,0.6)]",
    icon: <FigmaIcon />,
  },
  {
    name: "Next.js",
    category: "React Framework",
    bg: "bg-black",
    border: "border-white/20",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_28px_rgba(0,0,0,0.7)]",
    icon: <NextJSIcon />,
  },
  {
    name: "TypeScript",
    category: "Type Safety",
    bg: "bg-[#2563EB]",
    border: "border-blue-400/50",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_12px_28px_rgba(37,99,235,0.4)]",
    icon: <TypeScriptIcon />,
  },
  {
    name: "Notion",
    category: "Docs & Architecture",
    bg: "bg-[#181818]",
    border: "border-white/15",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(0,0,0,0.6)]",
    icon: <NotionIcon />,
  },
  {
    name: "Three.js",
    category: "WebGL & 3D",
    bg: "bg-[#141414]",
    border: "border-white/15",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(0,0,0,0.6)]",
    icon: <ThreeJSIcon />,
  },
  {
    name: "Python",
    category: "AI & Fast Backend",
    bg: "bg-[#161E2E]",
    border: "border-blue-500/30",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(0,0,0,0.6)]",
    icon: <PythonIcon />,
  },
  {
    name: "Supabase",
    category: "Postgres & Auth",
    bg: "bg-[#102018]",
    border: "border-emerald-500/30",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(16,185,129,0.2)]",
    icon: <SupabaseIcon />,
  },
  {
    name: "Arc / Raycast",
    category: "Power Tools",
    bg: "bg-[#1A1A22]",
    border: "border-purple-500/30",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(147,51,234,0.25)]",
    icon: <ArcRibbonIcon />,
  },
  {
    name: "Docker",
    category: "Containerization",
    bg: "bg-[#0B1728]",
    border: "border-sky-500/30",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(14,165,233,0.25)]",
    icon: <DockerIcon />,
  },
  {
    name: "Groq LPU",
    category: "Ultra-Fast Inference",
    bg: "bg-[#F55036]",
    border: "border-orange-400/50",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_28px_rgba(245,80,54,0.35)]",
    icon: <GroqIcon />,
  },
];

const ROW_2: SquircleItem[] = [
  {
    name: "VS Code",
    category: "Primary IDE",
    bg: "bg-[#131B2E]",
    border: "border-blue-500/40",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(30,58,138,0.35)]",
    icon: <VSCodeIcon />,
  },
  {
    name: "Ghost AI",
    category: "Autonomous Agent",
    bg: "bg-[#5B50E6]",
    border: "border-indigo-400/50",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_12px_28px_rgba(91,80,230,0.4)]",
    icon: <GhostIcon />,
  },
  {
    name: "Cloud Terminal",
    category: "CLI & Cloud APIs",
    bg: "bg-[#2563EB]",
    border: "border-blue-400/50",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_12px_28px_rgba(37,99,235,0.4)]",
    icon: <CloudTerminalIcon />,
  },
  {
    name: "Claude Copper",
    category: "Anthropic Reasoning",
    bg: "bg-[#1E1B18]",
    border: "border-[#4A3B31]",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(201,134,88,0.2)]",
    icon: <ClaudeCopperIcon />,
  },
  {
    name: "Framer",
    category: "Interactive Animation",
    bg: "bg-[#0A0A0A]",
    border: "border-white/20",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_28px_rgba(0,0,0,0.7)]",
    icon: <FramerIcon />,
  },
  {
    name: "Tailwind CSS",
    category: "Modern Styling",
    bg: "bg-[#0F172A]",
    border: "border-cyan-500/30",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(56,189,248,0.25)]",
    icon: <TailwindIcon />,
  },
  {
    name: "Google Gemini",
    category: "Multimodal AI",
    bg: "bg-[#0E152E]",
    border: "border-indigo-500/40",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_12px_28px_rgba(99,102,241,0.3)]",
    icon: <GeminiIcon />,
  },
  {
    name: "GitHub",
    category: "Version Control & CI",
    bg: "bg-[#151921]",
    border: "border-white/15",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(0,0,0,0.6)]",
    icon: <GitHubIcon />,
  },
  {
    name: "PostgreSQL",
    category: "Relational DB",
    bg: "bg-[#121E2E]",
    border: "border-sky-600/30",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(51,103,145,0.3)]",
    icon: <PostgresIcon />,
  },
  {
    name: "Cursor AI",
    category: "AI Code Editor",
    bg: "bg-[#13151A]",
    border: "border-cyan-400/30",
    shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(14,165,233,0.25)]",
    icon: <CursorIcon />,
  },
];

export default function SkillsStack() {
  const [hoveredItem, setHoveredItem] = useState<SquircleItem | null>(null);

  const handleTileClick = (item: SquircleItem) => {
    playTapSound("pop");
    setHoveredItem(item);
  };

  const renderSquircle = (item: SquircleItem, idx: number) => (
    <div
      key={`${item.name}-${idx}`}
      onClick={() => handleTileClick(item)}
      onMouseEnter={() => setHoveredItem(item)}
      onMouseLeave={() => setHoveredItem(null)}
      className="group relative shrink-0 cursor-pointer select-none"
    >
      {/* 3D Glossy App Squircle Tile (Identical to Framer MCP visual language) */}
      <div
        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-[22px] sm:rounded-[26px] md:rounded-[30px] ${item.bg} border ${item.border || "border-white/15"} ${item.shadow} flex items-center justify-center transition-all duration-300 transform group-hover:scale-115 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.85)] relative overflow-hidden`}
      >
        {/* Subtle 3D Top-Edge Bevel Highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/20 to-transparent rounded-t-[22px] sm:rounded-t-[26px] md:rounded-t-[30px]" />

        {/* Icon */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
          {item.icon}
        </div>
      </div>

      {/* Floating Tooltip Pill */}
      <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 whitespace-nowrap">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/90 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white shadow-xl">
          <span className="font-bold text-cyan-400">{item.name}</span>
          <span className="text-zinc-400">•</span>
          <span className="text-zinc-300">{item.category}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full" id="skills">
      {/* SECTION HEADER MATCHING AWARDS & ACHIEVEMENTS */}
      <SectionHeading>
        <span className="text-[#3B82F6]">TECH STACK</span>{" "}
        <span className="text-white">&amp; ARSENAL</span>
      </SectionHeading>

      {/* MARQUEE RUNWAY WITH FADED EDGES */}
      <div className="relative w-full overflow-hidden py-3 sm:py-6 select-none">
        {/* Left Edge Gradient Fade Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-background via-background/70 to-transparent z-20" />

        {/* Right Edge Gradient Fade Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-background via-background/70 to-transparent z-20" />

        {/* Row 1: Leftward Infinite Marquee */}
        <Marquee pauseOnHover className="[--duration:40s] [--gap:1.1rem] sm:[--gap:1.4rem] py-3">
          {ROW_1.map((item, idx) => renderSquircle(item, idx))}
        </Marquee>

        {/* Row 2: Rightward Reverse Infinite Marquee (Staggered) */}
        <Marquee reverse pauseOnHover className="[--duration:42s] [--gap:1.1rem] sm:[--gap:1.4rem] py-3 mt-1 sm:mt-2">
          {ROW_2.map((item, idx) => renderSquircle(item, idx))}
        </Marquee>
      </div>

      {/* ACTIVE SELECTION CALLOUT (Subtle tactile feedback) */}
      <div className="flex items-center justify-center pt-2 sm:pt-4 text-center">
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
              "Hover or tap any squircle to inspect engineering tools & AI engines"
            )}
          </span>
        </p>
      </div>
    </div>
  );
}
