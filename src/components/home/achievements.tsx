"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { data } from "@/data/data";
import {
  IconCertificate,
  IconX,
  IconMaximize,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { Marquee } from "@/components/ui/marquee";
import { useRouter } from "next/navigation";

interface AchievementPanelItem {
  id: string;
  num: string;
  badge: string;
  title: string;
  subtitle: string;
  tags: string;
  image: string;
  alt: string;
  date: string;
  description: string;
  metrics: string;
  accentColor: string;
}

const PANELS: AchievementPanelItem[] = [
  {
    id: "google-cloud-arcade",
    num: "01",
    badge: "CLOUD MILESTONE",
    title: "GOOGLE CLOUD ARCADE 2025",
    subtitle: "// ★ GOOGLE CLOUD ARCADE CHAMPION",
    tags: "CLOUD • ARCADES • HANDS-ON LABS",
    image: "/achievements/google-cloud-arcade.jpg",
    alt: "Google Cloud Arcade Champion 2025",
    date: "2025",
    description:
      "Achieved Champion status in Google Cloud Arcade 2025 by completing intensive hands-on cloud labs, DevOps automation workflows, and production AI infrastructure challenges across Google Cloud Platform.",
    metrics: "🏆 Google Cloud Arcade Champion",
    accentColor: "text-blue-400 bg-blue-950/40 border-blue-500/50",
  },
  {
    id: "robo-soccer",
    num: "02",
    badge: "CHAMPION",
    title: "ROBO SOCCER CHAMPIONSHIP",
    subtitle: "// 🏆 1ST PRIZE WINNER",
    tags: "EMBEDDED SYSTEMS • IOT • ROBOTICS",
    image: "/achievements/robo-soccer.jpg",
    alt: "Robo Soccer Competition",
    date: "2024",
    description:
      "Engineered and piloted high-torque robotics hardware in real-time competitive matches, winning 1st Prize in the university-wide Robo Soccer engineering championship.",
    metrics: "🥇 1st Prize Winner",
    accentColor: "text-amber-400 bg-amber-950/40 border-amber-500/50",
  },
  {
    id: "flinders-ai",
    num: "03",
    badge: "INTERNATIONAL AWARD",
    title: "FLINDERS INTERNATIONAL AI HACKATHON",
    subtitle: "// 🥈 2ND PLACE | AUD 300 CASH PRIZE",
    tags: "ARTIFICIAL INTELLIGENCE • PITCHING • PYTHON",
    image: "/achievements/flinders-ai.jpg",
    alt: "Flinders University AI Hackathon",
    date: "2026",
    description:
      "Secured 2nd Place in the prestigious International AI Hackathon hosted by Flinders University, recognized for creating high-impact predictive AI models and delivering an executive pitch.",
    metrics: "🥈 2nd Place | AUD 300 Cash Prize",
    accentColor: "text-emerald-400 bg-emerald-950/40 border-emerald-500/50",
  },
  {
    id: "ait-hackathon",
    num: "04",
    badge: "FINALIST",
    title: "AIT HACKATHON 2K25",
    subtitle: "// 🏅 TOP 10 FINALIST OUT OF 500+ TEAMS",
    tags: "HACKATHON • PROTOTYPING • APPS",
    image: "/achievements/ait-hackathon.jpg",
    alt: "Top 10 Finalist – AIT Hackathon 2K25",
    date: "2025",
    description:
      "Selected as Top 10 Finalist out of 500+ competing engineering teams at AIT Hackathon 2K25 after developing an end-to-end full-stack prototype in a 36-hour sprint.",
    metrics: "🏅 Top 10 Finalist Out of 500+ Teams",
    accentColor: "text-emerald-400 bg-emerald-950/40 border-emerald-500/50",
  },
];

export default function Achievements() {
  const [selectedPanel, setSelectedPanel] = useState<AchievementPanelItem | null>(null);
  const [isSpideyHovered, setIsSpideyHovered] = useState(false);
  const router = useRouter();

  const handleOpenPanel = (panel: AchievementPanelItem) => {
    playTapSound("pop");
    setSelectedPanel(panel);
  };

  const handleNavClick = (link: string) => {
    playTapSound("pop");
    if (link.startsWith("/")) {
      router.push(link);
      return;
    }
    const section = document.getElementById(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col space-y-12 w-full">
      {/* ============================================================== */}
      {/* EDITORIAL MANGA CHAPTER FRAME (EXACT REPLICA OF REFERENCE)     */}
      {/* ============================================================== */}
      <div className="relative w-full rounded-xl sm:rounded-2xl border-2 sm:border-[3px] border-black bg-[#EAE6DF] text-black shadow-[0_20px_50px_rgba(0,0,0,0.65)] select-none overflow-hidden">
        {/* 1. TOP EDITORIAL CREAM BAR WITH MONOGRAM, NAV & SPIDER-MAN */}
        <div className="w-full bg-[#EAE6DF] border-b-2 border-black px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between z-20 relative">
          {/* Left: Square Black "VH" Monogram Badge */}
          <div
            onClick={() => handleNavClick("hero")}
            className="w-8 h-8 bg-black text-[#FAF9F5] flex items-center justify-center font-black text-xs tracking-widest font-sans cursor-pointer hover:scale-105 transition-transform shadow-sm rounded-[2px]"
            title="Vivek Hingu"
          >
            VH
          </div>

          {/* Right: Monospace Nav Links + Color Dots + Gujjuverse */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 font-mono text-[11px] font-bold text-black/80">
            <nav className="hidden sm:flex items-center gap-5 lg:gap-7">
              <button
                type="button"
                onClick={() => handleNavClick("projects")}
                className="hover:text-black hover:underline underline-offset-4 transition-all"
              >
                02 WORK
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("skills")}
                className="hover:text-black hover:underline underline-offset-4 transition-all"
              >
                03 STACK
              </button>
              <button
                type="button"
                onClick={() => handleNavClick("hero")}
                className="hover:text-black hover:underline underline-offset-4 transition-all"
              >
                04 ABOUT
              </button>
              <a
                href="mailto:hinguvivek05@gmail.com"
                className="hover:text-black hover:underline underline-offset-4 transition-all"
              >
                05 CONTACT
              </a>
            </nav>

            {/* Theme Switcher Dots */}
            <div className="flex items-center gap-1.5 px-1.5 py-1">
              <span className="w-3 h-3 rounded-full bg-[#B92B27] ring-1 ring-black/40" />
              <span className="w-3 h-3 rounded-full bg-[#2563EB] ring-1 ring-black/40" />
              <span className="w-3 h-3 rounded-full bg-[#10B981] ring-1 ring-black/40" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B] ring-1 ring-black/40" />
            </div>

            {/* GujjuVerse Link */}
            <button
              type="button"
              onClick={() => handleNavClick("/gujjuverse")}
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="tracking-wider">GUJJUVERSE</span>
            </button>
          </div>

          {/* Hanging Spider-Man Suspended from the Top-Right of the Frame */}
          <div
            className="absolute -top-1 right-6 sm:right-10 lg:right-12 z-30 pointer-events-auto cursor-pointer"
            onMouseEnter={() => setIsSpideyHovered(true)}
            onMouseLeave={() => setIsSpideyHovered(false)}
            onClick={() => playTapSound("chime")}
            title="Friendly Neighborhood Spidey"
          >
            {/* Ceiling Anchor */}
            <div className="w-3 h-1 bg-neutral-800 rounded-b-sm mx-auto shadow-sm" />

            {/* Swinging Web Line & Spider-Man */}
            <motion.div
              animate={{
                rotate: [-3.5, 3.5, -3.5],
                transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ transformOrigin: "top center" }}
              className="flex flex-col items-center"
            >
              <div className="w-0.5 h-10 sm:h-12 bg-gradient-to-b from-neutral-600 via-neutral-300 to-white shadow-[0_0_3px_rgba(255,255,255,0.8)] relative" />

              {/* Spider-Man Character Illustration */}
              <div className="relative -mt-1 w-11 h-13 sm:w-13 sm:h-15 drop-shadow-[0_8px_14px_rgba(0,0,0,0.85)]">
                <svg viewBox="0 0 120 150" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="frameSpideyRed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="50%" stopColor="#e11d48" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>
                    <linearGradient id="frameSpideyNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="100%" stopColor="#090d16" />
                    </linearGradient>
                  </defs>
                  {/* Legs */}
                  <path d="M 42 36 C 22 22 28 6 44 14 Z" fill="url(#frameSpideyNavy)" stroke="#0f172a" strokeWidth="1.2" />
                  <path d="M 78 36 C 98 22 92 6 76 14 Z" fill="url(#frameSpideyNavy)" stroke="#0f172a" strokeWidth="1.2" />
                  {/* Arms */}
                  <path d="M 44 48 C 36 34 46 16 54 8 L 57 11 Z" fill="url(#frameSpideyRed)" stroke="#881337" strokeWidth="1.2" />
                  <path d="M 76 48 C 84 34 74 16 66 8 L 63 11 Z" fill="url(#frameSpideyRed)" stroke="#881337" strokeWidth="1.2" />
                  {/* Torso */}
                  <path d="M 44 36 Q 60 30 76 36 L 79 72 Q 60 78 41 72 Z" fill="url(#frameSpideyRed)" stroke="#881337" strokeWidth="1.2" />
                  {/* Inverted Head Mask */}
                  <path d="M 34 72 C 30 92 37 132 60 142 C 83 132 90 92 86 72 C 77 66 43 66 34 72 Z" fill="url(#frameSpideyRed)" stroke="#881337" strokeWidth="1.8" />
                  <path d="M 60 98 L 60 142 M 60 98 L 38 126 M 60 98 L 82 126 M 60 98 L 33 96 M 60 98 L 87 96" stroke="#4c0519" strokeWidth="1" opacity="0.65" />
                  {/* Eyes */}
                  <path d={isSpideyHovered ? "M 37 93 Q 51 86 58 103 Q 48 111 37 93 Z" : "M 38 94 Q 51 88 57 103 Q 48 110 38 94 Z"} fill="#020617" stroke="#020617" strokeWidth="2" />
                  <path d={isSpideyHovered ? "M 39 94 Q 50 88 56 102 Q 48 109 39 94 Z" : "M 40 95 Q 50 89 55 102 Q 48 108 40 95 Z"} fill="#ffffff" />
                  <path d={isSpideyHovered ? "M 83 93 Q 69 86 62 103 Q 72 111 83 93 Z" : "M 82 94 Q 69 88 63 103 Q 72 110 82 94 Z"} fill="#020617" stroke="#020617" strokeWidth="2" />
                  <path d={isSpideyHovered ? "M 81 94 Q 70 88 64 102 Q 72 109 81 94 Z" : "M 80 95 Q 70 89 65 102 Q 72 108 80 95 Z"} fill="#ffffff" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 2. EDITORIAL CHAPTER HEADER */}
        <div className="relative p-6 sm:p-8 lg:px-10 lg:pt-8 lg:pb-7 border-b-2 border-black bg-[#EAE6DF] overflow-hidden">
          {/* Chapter Monospace Tag: 第三章 // CHAPTER 03 - HONORS & RECOGNITION */}
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#B92B27] uppercase">
              第三章 {"//"} CHAPTER 03 - HONORS &amp; RECOGNITION
            </span>
          </div>

          {/* Massive Display Headline: AWARDS & ACHIEVEMENTS */}
          <h2 className="font-[family-name:var(--font-anton)] text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[0.9] uppercase relative z-10">
            <span className="text-[#1E3A8A]">AWARDS</span>{" "}
            <span className="text-[#121212]">&amp; ACHIEVEMENTS</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-[15px] text-neutral-800 font-sans font-medium mt-2 max-w-2xl leading-relaxed relative z-10">
            Celebrating the milestones, victories, and team triumphs that push my engineering boundary.
          </p>
        </div>

        {/* 3. ASYMMETRIC MANGA BENTO COMIC STRIP GRID (Matte Black #121212 Gutter) */}
        <div className="bg-[#121212] p-2 sm:p-3 lg:p-3.5 border-t-2 border-black">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
            {/* ============================================================== */}
            {/* COLUMN 1: PANEL 01 & PANEL 02 STACKED (lg:col-span-5)          */}
            {/* ============================================================== */}
            <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3 justify-between">
              {/* --- PANEL 01: GOOGLE CLOUD ARCADE 2025 --- */}
              <motion.div
                onClick={() => handleOpenPanel(PANELS[0])}
                className="group/panel relative rounded-[2px] border-2 border-black bg-[#ECE7DC] text-black overflow-hidden flex flex-col justify-between shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#B92B27] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer lg:[clip-path:polygon(0_0,100%_0,97.5%_98%,0_100%)]"
              >
                {/* Photo Area */}
                <div className="relative w-full h-44 sm:h-48 md:h-52 bg-[#0c0c0c] overflow-hidden flex items-center justify-center">
                  {/* Halftone Comic Screen Texture */}
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                      backgroundSize: "6px 6px",
                    }}
                  />

                  {/* Swag Kit Photo */}
                  <Image
                    src={PANELS[0].image}
                    alt={PANELS[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    priority
                    className="object-cover group-hover/panel:scale-105 transition-transform duration-500 filter contrast-[1.08] brightness-[0.98]"
                  />

                  {/* Top-Left: Black Square 01 Badge */}
                  <div className="absolute top-2.5 left-2.5 z-20 bg-black text-[#FAF9F5] font-mono font-black text-sm sm:text-base px-2.5 py-0.5 border border-white/20 shadow-md">
                    01
                  </div>

                  {/* Top-Right: Blue Pill Badge (CLOUD MILESTONE) */}
                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-500/60 text-blue-400 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
                    <span className="text-[9.5px] font-mono font-bold tracking-wider uppercase">
                      CLOUD MILESTONE
                    </span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/panel:bg-black/25 transition-colors z-20 flex items-center justify-center opacity-0 group-hover/panel:opacity-100">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl border border-white/20">
                      <IconMaximize className="w-3.5 h-3.5" />
                      <span>EXPAND DOSSIER</span>
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-3 sm:p-3.5 bg-[#ECE7DC] border-t-2 border-black flex flex-col justify-between">
                  <div>
                    <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-black tracking-tight uppercase leading-none group-hover/panel:text-[#B92B27] transition-colors">
                      GOOGLE CLOUD ARCADE 2025
                    </h3>
                    <p className="text-[11px] sm:text-xs font-mono font-bold text-neutral-800 tracking-tight mt-1 flex items-center gap-1">
                      <span>{"//"}</span>
                      <span className="text-[#B92B27] text-sm leading-none">★</span>
                      <span>GOOGLE CLOUD ARCADE CHAMPION</span>
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-black/20 flex items-center justify-between font-mono">
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-neutral-600 uppercase tracking-tight">
                      CLOUD • ARCADES • HANDS-ON LABS
                    </span>
                    <span className="bg-black text-white text-[10px] sm:text-[11px] font-black px-2.5 py-1 uppercase tracking-wider flex items-center gap-1 group-hover/panel:bg-[#B92B27] transition-colors shadow-sm rounded-[1px]">
                      <span>READ</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* --- PANEL 02: ROBO SOCCER CHAMPIONSHIP --- */}
              <motion.div
                onClick={() => handleOpenPanel(PANELS[1])}
                className="group/panel relative rounded-[2px] border-2 border-black bg-[#ECE7DC] text-black overflow-hidden flex flex-col justify-between shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#B92B27] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer lg:[clip-path:polygon(0_2.5%,100%_0,95%_100%,0_100%)]"
              >
                {/* Photo Area */}
                <div className="relative w-full h-44 sm:h-48 md:h-52 bg-[#0c0c0c] overflow-hidden flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                      backgroundSize: "6px 6px",
                    }}
                  />

                  {/* Team Photo */}
                  <Image
                    src={PANELS[1].image}
                    alt={PANELS[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    priority
                    className="object-cover group-hover/panel:scale-105 transition-transform duration-500 filter contrast-[1.08] brightness-[0.98]"
                  />

                  {/* Top-Left: Black Square 02 Badge */}
                  <div className="absolute top-2.5 left-2.5 z-20 bg-black text-[#FAF9F5] font-mono font-black text-sm sm:text-base px-2.5 py-0.5 border border-white/20 shadow-md">
                    02
                  </div>

                  {/* Top-Right: Amber Pill Badge (CHAMPION) */}
                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-500/60 text-amber-400 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
                    <span className="text-[9.5px] font-mono font-bold tracking-wider uppercase">
                      CHAMPION
                    </span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/panel:bg-black/25 transition-colors z-20 flex items-center justify-center opacity-0 group-hover/panel:opacity-100">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl border border-white/20">
                      <IconMaximize className="w-3.5 h-3.5" />
                      <span>EXPAND DOSSIER</span>
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-3 sm:p-3.5 bg-[#ECE7DC] border-t-2 border-black flex flex-col justify-between">
                  <div>
                    <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-black tracking-tight uppercase leading-none group-hover/panel:text-[#B92B27] transition-colors">
                      ROBO SOCCER CHAMPIONSHIP
                    </h3>
                    <p className="text-[11px] sm:text-xs font-mono font-bold text-neutral-800 tracking-tight mt-1 flex items-center gap-1">
                      <span>{"//"}</span>
                      <span className="text-base leading-none">🏆</span>
                      <span>1ST PRIZE WINNER</span>
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-black/20 flex items-center justify-between font-mono">
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-neutral-600 uppercase tracking-tight">
                      EMBEDDED SYSTEMS • IOT • ROBOTICS
                    </span>
                    <span className="bg-black text-white text-[10px] sm:text-[11px] font-black px-2.5 py-1 uppercase tracking-wider flex items-center gap-1 group-hover/panel:bg-[#B92B27] transition-colors shadow-sm rounded-[1px]">
                      <span>READ</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ============================================================== */}
            {/* COLUMN 2: PANEL 03 TALL HERO (lg:col-span-3 or 3.5)            */}
            {/* ============================================================== */}
            <div className="lg:col-span-3 flex flex-col">
              <motion.div
                onClick={() => handleOpenPanel(PANELS[2])}
                className="group/panel relative h-full rounded-[2px] border-2 border-black bg-[#ECE7DC] text-black overflow-hidden flex flex-col justify-between shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#B92B27] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer lg:[clip-path:polygon(4%_0,100%_0,100%_100%,0_100%)]"
              >
                {/* Photo Area */}
                <div className="relative w-full h-64 sm:h-72 md:h-80 lg:flex-1 min-h-[260px] bg-[#0c0c0c] overflow-hidden flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                      backgroundSize: "6px 6px",
                    }}
                  />

                  {/* Stage Photo */}
                  <Image
                    src={PANELS[2].image}
                    alt={PANELS[2].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    priority
                    className="object-cover group-hover/panel:scale-105 transition-transform duration-500 filter contrast-[1.08] brightness-[0.98]"
                  />

                  {/* Top-Left: Black Square 03 Badge */}
                  <div className="absolute top-2.5 left-2.5 z-20 bg-black text-[#FAF9F5] font-mono font-black text-sm sm:text-base px-2.5 py-0.5 border border-white/20 shadow-md">
                    03
                  </div>

                  {/* Top-Right: Green Pill Badge (INTERNATIONAL AWARD) */}
                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/60 text-emerald-400 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                    <span className="text-[9.5px] font-mono font-bold tracking-wider uppercase">
                      INTERNATIONAL AWARD
                    </span>
                  </div>

                  {/* Bottom-Right of Photo: Secondary Green Pill Badge */}
                  <div className="absolute bottom-2.5 right-2.5 z-20 hidden sm:flex items-center gap-1.5 bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/60 text-emerald-400 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase">
                      INTERNATIONAL AWARD
                    </span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/panel:bg-black/25 transition-colors z-20 flex items-center justify-center opacity-0 group-hover/panel:opacity-100">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl border border-white/20">
                      <IconMaximize className="w-3.5 h-3.5" />
                      <span>EXPAND DOSSIER</span>
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-3 sm:p-3.5 bg-[#ECE7DC] border-t-2 border-black flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="bg-black text-[#FAF9F5] font-mono font-black text-xs sm:text-sm px-2 py-0.5 border border-white/20 shrink-0">
                        03
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-600 text-[9px] font-mono font-bold tracking-wider uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        INTERNATIONAL AWARD
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-black tracking-tight uppercase leading-[0.95] group-hover/panel:text-[#B92B27] transition-colors">
                      FLINDERS INTERNATIONAL<br />AI HACKATHON
                    </h3>
                    <p className="text-[11px] sm:text-xs font-mono font-bold text-neutral-800 tracking-tight mt-1 flex items-center gap-1">
                      <span>{"//"}</span>
                      <span className="text-base leading-none">🥈</span>
                      <span>2ND PLACE | AUD 300 CASH PRIZE</span>
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-black/20 flex flex-wrap items-center justify-between gap-1.5 font-mono">
                    <span className="text-[9px] sm:text-[9.5px] font-bold text-neutral-600 uppercase tracking-tight">
                      ARTIFICIAL INTELLIGENCE • PITCHING • PYTHON
                    </span>
                    <span className="bg-black text-white text-[10px] sm:text-[11px] font-black px-2.5 py-1 uppercase tracking-wider flex items-center gap-1 group-hover/panel:bg-[#B92B27] transition-colors shadow-sm rounded-[1px]">
                      <span>READ</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ============================================================== */}
            {/* COLUMN 3: PANEL 04 TALL (lg:col-span-4)                         */}
            {/* ============================================================== */}
            <div className="lg:col-span-4 flex flex-col">
              <motion.div
                onClick={() => handleOpenPanel(PANELS[3])}
                className="group/panel relative h-full rounded-[2px] border-2 border-black bg-[#ECE7DC] text-black overflow-hidden flex flex-col justify-between shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#B92B27] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                {/* Photo Area */}
                <div className="relative w-full h-64 sm:h-72 md:h-80 lg:flex-1 min-h-[260px] bg-[#0c0c0c] overflow-hidden flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                      backgroundSize: "6px 6px",
                    }}
                  />

                  {/* Team around Laptop Photo */}
                  <Image
                    src={PANELS[3].image}
                    alt={PANELS[3].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    priority
                    className="object-cover group-hover/panel:scale-105 transition-transform duration-500 filter contrast-[1.08] brightness-[0.98]"
                  />

                  {/* Top-Left: Black Square 04 Badge */}
                  <div className="absolute top-2.5 left-2.5 z-20 bg-black text-[#FAF9F5] font-mono font-black text-sm sm:text-base px-2.5 py-0.5 border border-white/20 shadow-md">
                    04
                  </div>

                  {/* Top-Right: Green Pill Badge (FINALIST) */}
                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-black/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/60 text-emerald-400 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                    <span className="text-[9.5px] font-mono font-bold tracking-wider uppercase">
                      FINALIST
                    </span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/panel:bg-black/25 transition-colors z-20 flex items-center justify-center opacity-0 group-hover/panel:opacity-100">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl border border-white/20">
                      <IconMaximize className="w-3.5 h-3.5" />
                      <span>EXPAND DOSSIER</span>
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-3 sm:p-3.5 bg-[#ECE7DC] border-t-2 border-black flex flex-col justify-between relative">
                  {/* Subtle 4-pointed silver star sparkle decoration */}
                  <div className="absolute bottom-2 right-2 pointer-events-none opacity-20 select-none text-neutral-600">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-start gap-2">
                      <div className="bg-black text-[#FAF9F5] font-mono font-black text-xs sm:text-sm px-2 py-0.5 border border-white/20 shrink-0 mt-0.5">
                        04
                      </div>
                      <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-black tracking-tight uppercase leading-[0.95] group-hover/panel:text-[#B92B27] transition-colors">
                        AIT HACKATHON<br />2K25
                      </h3>
                    </div>

                    <div className="mt-1.5 text-[11px] sm:text-xs font-mono font-bold text-neutral-800 tracking-tight leading-snug">
                      <p className="flex items-center gap-1">
                        <span>{"//"}</span>
                        <span className="text-base leading-none">🎖️</span>
                        <span>TOP 10 FINALIST</span>
                      </p>
                      <p className="pl-5 text-neutral-700">
                        OUT OF 500+ TEAMS
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-black/20 flex items-center justify-between font-mono relative z-10">
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-neutral-600 uppercase tracking-tight">
                      HACKATHON • PROTOTYPING • APPS
                    </span>
                    <span className="bg-black text-white text-[10px] sm:text-[11px] font-black px-2.5 py-1 uppercase tracking-wider flex items-center gap-1 group-hover/panel:bg-[#B92B27] transition-colors shadow-sm rounded-[1px]">
                      <span>READ</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 4. FRAME BOTTOM INK BAR WITH COPYRIGHT */}
        <div className="w-full bg-[#121212] border-t-2 border-black px-4 py-2 flex items-center justify-between text-neutral-400 font-mono text-[11px]">
          <span className="flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} Vivek Hingu</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 hidden sm:inline-block">
            HONORS &amp; RECOGNITION VAULT
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. CERTIFICATIONS & SPECIALIZATIONS MARQUEE */}
      {/* ============================================================== */}
      <div className="space-y-6 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <IconCertificate className="h-5 w-5 text-amber-400" />
            Certifications &amp; Specializations
          </h3>
          <span className="text-xs text-muted-foreground hidden sm:inline-block font-mono">
            {"// Click Card for 3D Flip View"}
          </span>
        </div>

        <Marquee reverse pauseOnHover repeat={4} className="[--duration:30s] [--gap:1.5rem] py-2">
          {data.certificates.map((cert) => (
            <div key={cert.title} className="shrink-0">
              <CertFlipCard cert={cert} />
            </div>
          ))}
        </Marquee>
      </div>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE LIGHTBOX MODAL */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedPanel && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-3 sm:p-6 lg:p-8 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPanel(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-[#FAF9F5] text-black border-2 border-black rounded-2xl overflow-hidden shadow-[12px_14px_0px_#B92B27,18px_22px_45px_rgba(0,0,0,0.85)] z-10 flex flex-col max-h-[92vh]"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-black text-[#FAF9F5] flex items-center justify-between border-b-2 border-black">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-[#B92B27] tracking-widest uppercase">
                      CHAPTER 03 DOSSIER // RECORD {selectedPanel.num}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B92B27] animate-pulse" />
                  </div>
                  <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-white uppercase tracking-tight">
                    {selectedPanel.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    {selectedPanel.subtitle} • {selectedPanel.date}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPanel(null)}
                  className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              {/* Full-Resolution Photo Viewer Frame */}
              <div className="relative flex-1 bg-neutral-950 p-3 sm:p-6 flex items-center justify-center overflow-auto min-h-[320px] sm:min-h-[440px]">
                <div className="relative w-full h-full max-h-[62vh] aspect-[1.42/1] rounded-lg overflow-hidden border-2 border-neutral-700 shadow-2xl">
                  <Image
                    src={selectedPanel.image}
                    alt={selectedPanel.alt}
                    fill
                    sizes="100vw"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Achievement Story & Details */}
              <div className="p-4 sm:p-5 bg-[#FAF9F5] border-t-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
                <div className="space-y-1.5 text-xs max-w-2xl font-sans">
                  <p className="text-neutral-800 leading-relaxed font-medium">
                    {selectedPanel.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#B92B27] text-white">
                      {selectedPanel.metrics}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-200 text-neutral-800 border border-neutral-300">
                      {selectedPanel.tags}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono text-neutral-600 shrink-0 select-none">
                  <span className="font-bold text-black uppercase">
                    ★ VERIFIED MILESTONE
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CertFlipCard({
  cert,
}: {
  cert: (typeof data.certificates)[number];
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-72 sm:w-80 h-[340px] shrink-0 group perspective-1000 select-none cursor-pointer"
      onClick={() => {
        playTapSound("pop");
        setIsFlipped((prev) => !prev);
      }}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border-2 border-black/80 dark:border-white/20 bg-[#FAF9F5] dark:bg-zinc-950 p-4 flex flex-col justify-between overflow-hidden shadow-md group-hover:border-[#B92B27] transition-colors">
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-neutral-900 border border-black/20">
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-contain p-2"
              sizes="320px"
            />
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/85 text-amber-300 text-[10px] font-bold backdrop-blur-sm border border-amber-500/30 flex items-center gap-1">
              <span>3D Flip</span>
              <span>↻</span>
            </div>
            <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-[#1E3A8A] text-white text-[10px] font-extrabold uppercase tracking-wider">
              {cert.issuer}
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-zinc-300 text-[10px] font-mono">
              {cert.date}
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <h4 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-[#B92B27] transition-colors">
              {cert.title}
            </h4>
            <p className="text-xs text-muted-foreground font-medium">{cert.issuer}</p>
          </div>

          <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-[#B92B27] font-semibold">
            <span>Flip for Skills</span>
            <span>→</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 border-[#B92B27] bg-zinc-950 p-5 flex flex-col justify-between text-white shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/20 pb-2">
              <span className="text-xs font-mono font-bold text-[#B92B27] uppercase tracking-wider">
                {cert.issuer}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">{cert.date}</span>
            </div>

            <h4 className="text-base font-bold text-white leading-snug">{cert.title}</h4>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                Key Skills Verified:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-950/40 text-red-300 border border-red-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/20 flex items-center justify-between">
            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playTapSound("pop");
                }}
                className="text-xs font-bold text-[#B92B27] hover:underline flex items-center gap-1"
              >
                <span>Verify Credential</span>
                <span>↗</span>
              </a>
            ) : (
              <span className="text-xs text-zinc-400">Verified Certificate</span>
            )}
            <span className="text-[10px] font-mono text-zinc-400">Click to flip ↻</span>
          </div>
        </div>
      </div>
    </div>
  );
}
