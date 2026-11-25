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

  const handleOpenPanel = (panel: AchievementPanelItem) => {
    playTapSound("pop");
    setSelectedPanel(panel);
  };

  return (
    <div className="flex flex-col space-y-6 sm:space-y-10 w-full">
      {/* ============================================================== */}
      {/* EDITORIAL MANGA CHAPTER FRAME (EDGE-TO-EDGE)                   */}
      {/* ============================================================== */}
      <div className="relative w-full select-none overflow-hidden">
        {/* AWARDS & ACHIEVEMENTS HEADLINE (NO BACKGROUND COLOR, CLEAN & BOLD) */}
        <div className="relative px-3 sm:px-6 md:px-8 lg:px-12 pt-3 sm:pt-6 pb-2 sm:pb-4 overflow-hidden">
          <h2 className="font-[family-name:var(--font-anton)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none uppercase">
            <span className="text-[#3B82F6]">AWARDS</span>{" "}
            <span className="text-white">&amp; ACHIEVEMENTS</span>
          </h2>
        </div>

        {/* OUTER COMIC CONTAINER (PITCH-BLACK GUTTER FRAME #0A0A0A - BLEEDS EDGE-TO-EDGE) */}
        <div className="w-full bg-[#0A0A0A] px-0 pb-3 sm:pb-4 lg:pb-[32px] pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.22fr_1fr_1fr] gap-[10px] items-stretch lg:min-h-[640px] w-full">
            {/* ============================================================== */}
            {/* COLUMN 1: LEFT COLUMN WRAPPER (PANEL 01 & PANEL 02 WITH SLASH) */}
            {/* ============================================================== */}
            <div className="flex flex-col h-full bg-[#0A0A0A] gap-2 lg:gap-0">
              {/* --- PANEL 01: GOOGLE CLOUD ARCADE (54% height, flex: 1.15) --- */}
              <motion.div
                onClick={() => handleOpenPanel(PANELS[0])}
                className="group/panel relative flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  flex: 1.15,
                  background: "#F3F0E8",
                  padding: "12px 14px 22px 14px",
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 26px), 0 100%)",
                }}
              >
                {/* Photo Box: width: 100%, height: 165px, border: 2px solid #0A0A0A */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "165px", border: "2px solid #0A0A0A" }}
                >
                  <Image
                    src={PANELS[0].image}
                    alt={PANELS[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    priority
                    className="object-cover w-full h-full group-hover/panel:scale-105 transition-transform duration-500"
                  />

                  {/* 01 Badge */}
                  <div
                    className="absolute top-2 left-2 z-20 font-[family-name:var(--font-anton)] font-bold text-[#F3F0E8] bg-[#0A0A0A] leading-none select-none"
                    style={{ padding: "3px 8px", fontSize: "18px" }}
                  >
                    01
                  </div>

                  {/* Status Pill: ● CLOUD MILESTONE */}
                  <div
                    className="absolute top-2 right-2 z-20 flex items-center gap-1.5 rounded-full text-blue-400 font-mono font-bold uppercase tracking-wider"
                    style={{ padding: "4px 10px", background: "#141A18", fontSize: "9px" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa] animate-pulse" />
                    <span>CLOUD MILESTONE</span>
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
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3
                      className="font-[family-name:var(--font-anton)] text-black uppercase tracking-tight group-hover/panel:text-[#B92B27] transition-colors"
                      style={{ fontSize: "28px", lineHeight: 0.95, marginTop: "10px" }}
                    >
                      GOOGLE CLOUD ARCADE 2025
                    </h3>
                    <p
                      className="font-mono font-bold text-neutral-800 tracking-tight flex items-center gap-1"
                      style={{ fontSize: "11px", marginTop: "6px" }}
                    >
                      <span>{"//"}</span>
                      <span className="text-[#B92B27] text-sm leading-none">★</span>
                      <span>GOOGLE CLOUD ARCADE CHAMPION</span>
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div
                    className="flex items-center justify-between font-mono border-t border-black/15 pt-2"
                    style={{ marginTop: "auto" }}
                  >
                    <span
                      className="font-bold text-neutral-600 uppercase tracking-tight"
                      style={{ fontSize: "9.5px" }}
                    >
                      CLOUD • ARCADES • HANDS-ON LABS
                    </span>
                    <span
                      className="bg-[#0A0A0A] text-white font-black uppercase tracking-wider flex items-center gap-1 group-hover/panel:bg-[#B92B27] transition-colors rounded-[1px]"
                      style={{ padding: "6px 12px", fontSize: "10px" }}
                    >
                      <span>READ</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* --- PANEL 02: ROBO SOCCER (46% height, flex: 1, margin-top: -16px) --- */}
              <motion.div
                onClick={() => handleOpenPanel(PANELS[1])}
                className="group/panel relative flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-0.5 mt-0 lg:-mt-[16px]"
                style={{
                  flex: 1,
                  background: "#F3F0E8",
                  padding: "26px 14px 12px 14px",
                  clipPath: "polygon(0 26px, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                {/* Photo Box: width: 100%, height: 145px, border: 2px solid #0A0A0A */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "145px", border: "2px solid #0A0A0A" }}
                >
                  <Image
                    src={PANELS[1].image}
                    alt={PANELS[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    priority
                    className="object-cover w-full h-full group-hover/panel:scale-105 transition-transform duration-500"
                  />

                  {/* 02 Badge */}
                  <div
                    className="absolute top-2 left-2 z-20 font-[family-name:var(--font-anton)] font-bold text-[#F3F0E8] bg-[#0A0A0A] leading-none select-none"
                    style={{ padding: "3px 8px", fontSize: "18px" }}
                  >
                    02
                  </div>

                  {/* Status Pill: ● CHAMPION */}
                  <div
                    className="absolute top-2 right-2 z-20 flex items-center gap-1.5 rounded-full text-amber-400 font-mono font-bold uppercase tracking-wider"
                    style={{ padding: "4px 10px", background: "#141A18", fontSize: "9px" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
                    <span>CHAMPION</span>
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
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3
                      className="font-[family-name:var(--font-anton)] text-black uppercase tracking-tight group-hover/panel:text-[#B92B27] transition-colors"
                      style={{ fontSize: "28px", lineHeight: 0.95, marginTop: "10px" }}
                    >
                      ROBO SOCCER CHAMPIONSHIP
                    </h3>
                    <p
                      className="font-mono font-bold text-neutral-800 tracking-tight flex items-center gap-1"
                      style={{ fontSize: "11px", marginTop: "6px" }}
                    >
                      <span>{"//"}</span>
                      <span className="text-base leading-none">🏆</span>
                      <span>1ST PRIZE WINNER</span>
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div
                    className="flex items-center justify-between font-mono border-t border-black/15 pt-2"
                    style={{ marginTop: "auto" }}
                  >
                    <span
                      className="font-bold text-neutral-600 uppercase tracking-tight"
                      style={{ fontSize: "9.5px" }}
                    >
                      EMBEDDED SYSTEMS • IOT • ROBOTICS
                    </span>
                    <span
                      className="bg-[#0A0A0A] text-white font-black uppercase tracking-wider flex items-center gap-1 group-hover/panel:bg-[#B92B27] transition-colors rounded-[1px]"
                      style={{ padding: "6px 12px", fontSize: "10px" }}
                    >
                      <span>READ</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ============================================================== */}
            {/* COLUMN 2: PANEL 03 FLINDERS HACKATHON (100% height)            */}
            {/* ============================================================== */}
            <div className="flex flex-col h-full">
              <motion.div
                onClick={() => handleOpenPanel(PANELS[2])}
                className="group/panel relative flex flex-col justify-between h-full cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  background: "#F3F0E8",
                  padding: "12px 14px 14px 14px",
                }}
              >
                {/* Photo Box: width: 100%, height: 67% (~410px), border: 2px solid #0A0A0A */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "67%", minHeight: "410px", border: "2px solid #0A0A0A" }}
                >
                  <Image
                    src={PANELS[2].image}
                    alt={PANELS[2].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    priority
                    className="object-cover w-full h-full group-hover/panel:scale-105 transition-transform duration-500"
                  />

                  {/* Top-Left: 03 Badge */}
                  <div
                    className="absolute top-2 left-2 z-20 font-[family-name:var(--font-anton)] font-bold text-[#F3F0E8] bg-[#0A0A0A] leading-none select-none"
                    style={{ padding: "3px 8px", fontSize: "18px" }}
                  >
                    03
                  </div>

                  {/* Top-Right: INTERNATIONAL AWARD Pill */}
                  <div
                    className="absolute top-2 right-2 z-20 flex items-center gap-1.5 rounded-full text-emerald-400 font-mono font-bold uppercase tracking-wider"
                    style={{ padding: "4px 10px", background: "#141A18", fontSize: "9px" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                    <span>INTERNATIONAL AWARD</span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/panel:bg-black/25 transition-colors z-20 flex items-center justify-center opacity-0 group-hover/panel:opacity-100">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl border border-white/20">
                      <IconMaximize className="w-3.5 h-3.5" />
                      <span>EXPAND DOSSIER</span>
                    </span>
                  </div>
                </div>

                {/* Content Below Photo */}
                <div className="flex flex-col flex-1 justify-between pt-2.5">
                  <div>
                    <h3
                      className="font-[family-name:var(--font-anton)] text-black uppercase tracking-tight group-hover/panel:text-[#B92B27] transition-colors"
                      style={{ fontSize: "28px", lineHeight: 0.95 }}
                    >
                      FLINDERS INTERNATIONAL<br />AI HACKATHON
                    </h3>
                    <p
                      className="font-mono font-bold text-neutral-800 tracking-tight flex items-center gap-1"
                      style={{ fontSize: "11px", marginTop: "6px" }}
                    >
                      <span>{"//"}</span>
                      <span className="text-base leading-none">🥈</span>
                      <span>2ND PLACE | AUD 300 CASH PRIZE</span>
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div
                    className="flex items-center justify-between font-mono border-t border-black/15 pt-2"
                    style={{ marginTop: "auto" }}
                  >
                    <span
                      className="font-bold text-neutral-600 uppercase tracking-tight"
                      style={{ fontSize: "9px" }}
                    >
                      ARTIFICIAL INTELLIGENCE • PITCHING • PYTHON
                    </span>
                    <span
                      className="bg-[#0A0A0A] text-white font-black uppercase tracking-wider flex items-center gap-1 group-hover/panel:bg-[#B92B27] transition-colors rounded-[1px]"
                      style={{ padding: "6px 12px", fontSize: "10px" }}
                    >
                      <span>READ</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ============================================================== */}
            {/* COLUMN 3: PANEL 04 AIT HACKATHON 2K25 (100% height)             */}
            {/* ============================================================== */}
            <div className="flex flex-col h-full">
              <motion.div
                onClick={() => handleOpenPanel(PANELS[3])}
                className="group/panel relative flex flex-col justify-between h-full cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  background: "#F3F0E8",
                  padding: "12px 14px 14px 14px",
                }}
              >
                {/* Photo Box: width: 100%, height: 67% (~410px), border: 2px solid #0A0A0A */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "67%", minHeight: "410px", border: "2px solid #0A0A0A" }}
                >
                  <Image
                    src={PANELS[3].image}
                    alt={PANELS[3].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    priority
                    className="object-cover w-full h-full group-hover/panel:scale-105 transition-transform duration-500"
                  />

                  {/* Top-Left: 04 Badge */}
                  <div
                    className="absolute top-2 left-2 z-20 font-[family-name:var(--font-anton)] font-bold text-[#F3F0E8] bg-[#0A0A0A] leading-none select-none"
                    style={{ padding: "3px 8px", fontSize: "18px" }}
                  >
                    04
                  </div>

                  {/* Top-Right: FINALIST Pill */}
                  <div
                    className="absolute top-2 right-2 z-20 flex items-center gap-1.5 rounded-full text-emerald-400 font-mono font-bold uppercase tracking-wider"
                    style={{ padding: "4px 10px", background: "#141A18", fontSize: "9px" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                    <span>FINALIST</span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/panel:bg-black/25 transition-colors z-20 flex items-center justify-center opacity-0 group-hover/panel:opacity-100">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl border border-white/20">
                      <IconMaximize className="w-3.5 h-3.5" />
                      <span>EXPAND DOSSIER</span>
                    </span>
                  </div>
                </div>

                {/* Content Below Photo */}
                <div className="flex flex-col flex-1 justify-between pt-2.5">
                  <div>
                    <h3
                      className="font-[family-name:var(--font-anton)] text-black uppercase tracking-tight group-hover/panel:text-[#B92B27] transition-colors"
                      style={{ fontSize: "28px", lineHeight: 0.95 }}
                    >
                      AIT HACKATHON<br />2K25
                    </h3>

                    <div
                      className="font-mono font-bold text-neutral-800 tracking-tight leading-snug"
                      style={{ fontSize: "11px", marginTop: "6px" }}
                    >
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

                  {/* Bottom Row */}
                  <div
                    className="flex items-center justify-between font-mono border-t border-black/15 pt-2"
                    style={{ marginTop: "auto" }}
                  >
                    <span
                      className="font-bold text-neutral-600 uppercase tracking-tight"
                      style={{ fontSize: "9.5px" }}
                    >
                      HACKATHON • PROTOTYPING • APPS
                    </span>
                    <span
                      className="bg-[#0A0A0A] text-white font-black uppercase tracking-wider flex items-center gap-1 group-hover/panel:bg-[#B92B27] transition-colors rounded-[1px]"
                      style={{ padding: "6px 12px", fontSize: "10px" }}
                    >
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
        <div className="w-full bg-[#0A0A0A] flex items-center justify-between text-neutral-400 font-mono text-[11px] px-4 sm:px-8 lg:px-12 py-3 border-t border-white/10">
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
      <div className="space-y-4 sm:space-y-6 pt-2 w-full px-2 sm:px-6 md:px-8 lg:px-12">
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
