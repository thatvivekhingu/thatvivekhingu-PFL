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
  gridClass: string;
  accentColor: string;
}

const PANELS: AchievementPanelItem[] = [
  {
    id: "google-cloud-arcade",
    num: "01",
    badge: "• CLOUD MILESTONE",
    title: "GOOGLE CLOUD ARCADE 2025",
    subtitle: "// ★ GOOGLE CLOUD ARCADE CHAMPION",
    tags: "CLOUD • ARCADES • HANDS-ON LABS",
    image: "/achievements/google-cloud-arcade.jpg",
    alt: "Google Cloud Arcade Champion 2025",
    date: "2025",
    description:
      "Achieved Champion status in Google Cloud Arcade 2025 by completing intensive hands-on cloud labs, DevOps automation workflows, and production AI infrastructure challenges across Google Cloud Platform.",
    metrics: "🏆 Google Cloud Arcade Champion",
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[300px] sm:min-h-[320px]",
    accentColor: "text-cyan-600 bg-cyan-950/20 border-cyan-500/40",
  },
  {
    id: "robo-soccer",
    num: "02",
    badge: "• CHAMPION",
    title: "ROBO SOCCER CHAMPIONSHIP",
    subtitle: "// 🏆 1ST PRIZE WINNER",
    tags: "EMBEDDED SYSTEMS • IOT • ROBOTICS",
    image: "/achievements/robo-soccer.jpg",
    alt: "Robo Soccer Competition",
    date: "2024",
    description:
      "Engineered and piloted high-torque robotics hardware in real-time competitive matches, winning 1st Prize in the university-wide Robo Soccer engineering championship.",
    metrics: "🥇 1st Prize Winner",
    gridClass: "lg:col-span-2 lg:row-span-1 min-h-[300px] sm:min-h-[320px]",
    accentColor: "text-amber-600 bg-amber-950/20 border-amber-500/40",
  },
  {
    id: "flinders-ai",
    num: "03",
    badge: "• INTERNATIONAL AWARD",
    title: "FLINDERS INTERNATIONAL AI HACKATHON",
    subtitle: "// 🥈 2ND PLACE | AUD 300 CASH PRIZE",
    tags: "ARTIFICIAL INTELLIGENCE • PITCHING • PYTHON",
    image: "/achievements/flinders-ai.jpg",
    alt: "Flinders University AI Hackathon",
    date: "2026",
    description:
      "Secured 2nd Place in the prestigious International AI Hackathon hosted by Flinders University, recognized for creating high-impact predictive AI models and delivering an executive pitch.",
    metrics: "🥈 2nd Place | AUD 300 Cash Prize",
    gridClass: "lg:col-span-1 lg:row-span-2 min-h-[460px] sm:min-h-[520px]",
    accentColor: "text-[#B92B27] bg-red-950/20 border-red-500/40",
  },
  {
    id: "ait-hackathon",
    num: "04",
    badge: "• FINALIST",
    title: "AIT HACKATHON 2K25",
    subtitle: "// 🏅 TOP 10 FINALIST OUT OF 500+ TEAMS",
    tags: "HACKATHON • PROTOTYPING • APPS",
    image: "/achievements/ait-hackathon.jpg",
    alt: "Top 10 Finalist – AIT Hackathon 2K25",
    date: "2025",
    description:
      "Selected as Top 10 Finalist out of 500+ competing engineering teams at AIT Hackathon 2K25 after developing an end-to-end full-stack prototype in a 36-hour sprint.",
    metrics: "🏅 Top 10 Finalist Out of 500+ Teams",
    gridClass: "lg:col-span-1 lg:row-span-2 min-h-[460px] sm:min-h-[520px]",
    accentColor: "text-emerald-600 bg-emerald-950/20 border-emerald-500/40",
  },
];

export default function Achievements() {
  const [selectedPanel, setSelectedPanel] = useState<AchievementPanelItem | null>(null);
  const [isSpideyHovered, setIsSpideyHovered] = useState(false);
  const [motionEnabled] = useState(true);

  const handleOpenPanel = (panel: AchievementPanelItem) => {
    playTapSound("pop");
    setSelectedPanel(panel);
  };

  return (
    <div className="flex flex-col space-y-12 w-full">
      {/* ============================================================== */}
      {/* 1. EDITORIAL MANGA CHAPTER HEADER & BENTO PANEL CONTAINER */}
      {/* ============================================================== */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl border-2 border-black/85 bg-[#EAE6DF] text-black shadow-[0_16px_40px_rgba(0,0,0,0.6)] select-none overflow-hidden">
        {/* Top Header Surface on Warm Archival Cream Paper (#EAE6DF) */}
        <div className="relative p-6 sm:p-8 lg:p-10 border-b-2 border-[#121212] bg-[#EAE6DF] overflow-hidden">
          {/* Large Outlined Background Chapter Numeral "03" */}
          <span className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 font-[family-name:var(--font-anton)] text-8xl sm:text-9xl md:text-[140px] lg:text-[170px] text-black/5 pointer-events-none select-none leading-none tracking-tight">
            03
          </span>

          {/* Top-Right Hanging Spider-Man Suspended by Web Line */}
          <div
            className="absolute top-0 right-4 sm:right-12 z-20 pointer-events-auto cursor-pointer"
            onMouseEnter={() => setIsSpideyHovered(true)}
            onMouseLeave={() => setIsSpideyHovered(false)}
            onClick={() => playTapSound("chime")}
            title="Friendly Neighborhood Spidey"
          >
            <div className="w-3 h-1.5 bg-neutral-700 rounded-b-sm mx-auto shadow-sm" />
            <motion.div
              animate={
                motionEnabled
                  ? {
                      rotate: [-3.5, 3.5, -3.5],
                      transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
                    }
                  : { rotate: 0 }
              }
              style={{ transformOrigin: "top center" }}
              className="flex flex-col items-center"
            >
              {/* Web line */}
              <div className="w-0.5 h-12 sm:h-14 bg-gradient-to-b from-neutral-500 via-neutral-300 to-white shadow-[0_0_3px_rgba(255,255,255,0.8)] relative" />

              {/* Spider-Man Hanging Mask */}
              <div className="relative -mt-1 w-12 h-14 sm:w-14 sm:h-16 drop-shadow-[0_6px_12px_rgba(0,0,0,0.7)]">
                <svg viewBox="0 0 120 150" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="achieveSpideyRed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="50%" stopColor="#e11d48" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>
                    <linearGradient id="achieveSpideyNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="100%" stopColor="#090d16" />
                    </linearGradient>
                  </defs>
                  {/* Legs */}
                  <path d="M 42 36 C 22 22 28 6 44 14 Z" fill="url(#achieveSpideyNavy)" stroke="#0f172a" strokeWidth="1.2" />
                  <path d="M 78 36 C 98 22 92 6 76 14 Z" fill="url(#achieveSpideyNavy)" stroke="#0f172a" strokeWidth="1.2" />
                  {/* Arms */}
                  <path d="M 44 48 C 36 34 46 16 54 8 L 57 11 Z" fill="url(#achieveSpideyRed)" stroke="#881337" strokeWidth="1.2" />
                  <path d="M 76 48 C 84 34 74 16 66 8 L 63 11 Z" fill="url(#achieveSpideyRed)" stroke="#881337" strokeWidth="1.2" />
                  {/* Torso */}
                  <path d="M 44 36 Q 60 30 76 36 L 79 72 Q 60 78 41 72 Z" fill="url(#achieveSpideyRed)" stroke="#881337" strokeWidth="1.2" />
                  {/* Inverted Head Mask */}
                  <path d="M 34 72 C 30 92 37 132 60 142 C 83 132 90 92 86 72 C 77 66 43 66 34 72 Z" fill="url(#achieveSpideyRed)" stroke="#881337" strokeWidth="1.8" />
                  <path d="M 60 98 L 60 142 M 60 98 L 38 126 M 60 98 L 82 126 M 60 98 L 33 96 M 60 98 L 87 96" stroke="#4c0519" strokeWidth="1" opacity="0.65" />
                  {/* Eyes (animate on hover) */}
                  <path d={isSpideyHovered ? "M 37 93 Q 51 86 58 103 Q 48 111 37 93 Z" : "M 38 94 Q 51 88 57 103 Q 48 110 38 94 Z"} fill="#020617" stroke="#020617" strokeWidth="2" />
                  <path d={isSpideyHovered ? "M 39 94 Q 50 88 56 102 Q 48 109 39 94 Z" : "M 40 95 Q 50 89 55 102 Q 48 108 40 95 Z"} fill="#ffffff" />
                  <path d={isSpideyHovered ? "M 83 93 Q 69 86 62 103 Q 72 111 83 93 Z" : "M 82 94 Q 69 88 63 103 Q 72 110 82 94 Z"} fill="#020617" stroke="#020617" strokeWidth="2" />
                  <path d={isSpideyHovered ? "M 81 94 Q 70 88 64 102 Q 72 109 81 94 Z" : "M 80 95 Q 70 89 65 102 Q 72 108 80 95 Z"} fill="#ffffff" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Chapter Monospace Tag */}
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#B92B27] uppercase">
              CHAPTER 03 // HONORS &amp; RECOGNITION
            </span>
            <span className="w-2 h-2 rounded-full bg-[#B92B27] animate-pulse" />
          </div>

          {/* Massive Display Headline */}
          <h2 className="font-[family-name:var(--font-anton)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.92] uppercase relative z-10">
            <span className="text-[#1E3A8A]">AWARDS</span>{" "}
            <span className="text-[#121212]">&amp; ACHIEVEMENTS</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-neutral-700 font-sans font-medium mt-2 max-w-2xl leading-relaxed relative z-10">
            Celebrating the milestones, victories, and team triumphs that push my engineering boundary.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2. ASYMMETRIC MANGA BENTO PANEL GRID (Dark Ink Gutter #121212) */}
        {/* ============================================================== */}
        <div className="bg-[#121212] p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PANELS.map((panel) => (
              <motion.div
                key={panel.id}
                onClick={() => handleOpenPanel(panel)}
                className={`group/panel relative rounded-xl border-2 border-black bg-[#FAF9F5] text-black overflow-hidden flex flex-col justify-between shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#B92B27] hover:-translate-y-1 transition-all duration-300 cursor-pointer ${panel.gridClass}`}
              >
                {/* Image Section */}
                <div className="relative w-full h-52 sm:h-60 md:h-64 bg-neutral-950 overflow-hidden flex items-center justify-center">
                  {/* Subtle Background Halftone Dots */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                      backgroundSize: "6px 6px",
                    }}
                  />

                  {/* Main High-Contrast Achievement Photo */}
                  <Image
                    src={panel.image}
                    alt={panel.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2.5 group-hover/panel:scale-105 transition-transform duration-500 filter contrast-[1.08] brightness-[0.98]"
                  />

                  {/* Square Black Index Number Badge (Top-Left) */}
                  <div className="absolute top-3 left-3 z-20 bg-black text-[#FAF9F5] font-mono font-black text-xs sm:text-sm px-2.5 py-1 rounded-[2px] shadow-md border border-white/20">
                    {panel.num}
                  </div>

                  {/* Category Pill Badge (Top-Right) */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                      {panel.badge}
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

                {/* Cream Paper Info Block at the Bottom */}
                <div className="p-3.5 sm:p-4 bg-[#FAF9F5] border-t-2 border-black flex flex-col justify-between">
                  <div>
                    {/* Bold Title */}
                    <h3 className="font-[family-name:var(--font-anton)] text-lg sm:text-xl text-black tracking-tight uppercase leading-snug group-hover/panel:text-[#B92B27] transition-colors line-clamp-1">
                      {panel.title}
                    </h3>

                    {/* Monospace Subtitle */}
                    <p className="text-[11px] sm:text-xs font-mono font-bold text-neutral-700 tracking-wider mt-0.5 line-clamp-1">
                      {panel.subtitle}
                    </p>

                    {/* Tags */}
                    <p className="text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-tight mt-1 line-clamp-1">
                      {panel.tags}
                    </p>
                  </div>

                  {/* Action Link: READ → */}
                  <div className="pt-2.5 mt-2.5 border-t border-dashed border-black/25 flex items-center justify-between font-mono text-xs font-extrabold text-black">
                    <span className="text-[#B92B27] text-[10px] tracking-wider uppercase">
                      {panel.date} RECORD
                    </span>
                    <span className="group-hover/panel:translate-x-1 transition-transform inline-flex items-center gap-1 text-black group-hover/panel:text-[#B92B27]">
                      <span>READ</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
