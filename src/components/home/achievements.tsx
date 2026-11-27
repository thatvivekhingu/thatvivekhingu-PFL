"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { data } from "@/data/data";
import { SectionHeading } from "@/components/layout/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { playTapSound } from "@/lib/sound";
import { cn } from "@/lib/utils";

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
  return (
    <div className="flex flex-col space-y-6 sm:space-y-10 w-full">
      {/* ============================================================== */}
      {/* EDITORIAL MANGA CHAPTER FRAME (EDGE-TO-EDGE)                   */}
      {/* ============================================================== */}
      <div className="relative w-full select-none overflow-hidden">
        {/* AWARDS & ACHIEVEMENTS HEADLINE */}
        <div className="relative px-3 sm:px-6 md:px-8 lg:px-12 pt-3 sm:pt-6 pb-2 sm:pb-4 overflow-hidden">
          <SectionHeading
            number="06"
            chapter="CHAPTER 06 — HONORS & RECOGNITION"
          >
            <span className="text-[#3B82F6]">AWARDS</span>{" "}
            <span className="text-white">&amp; ACHIEVEMENTS</span>
          </SectionHeading>
        </div>

        {/* OUTER COMIC CONTAINER */}
        <div className="w-full bg-[#0A0A0A] px-0 pb-3 sm:pb-4 lg:pb-[32px] pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.22fr_1fr_1fr] gap-[10px] items-stretch lg:min-h-[640px] w-full">
            {/* ============================================================== */}
            {/* COLUMN 1: LEFT COLUMN WRAPPER (PANEL 01 & PANEL 02)            */}
            {/* ============================================================== */}
            <div className="flex flex-col h-full bg-[#0A0A0A] gap-2 lg:gap-0">
              {/* --- PANEL 01: GOOGLE CLOUD ARCADE --- */}
              <motion.div
                className="group/panel relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  flex: 1.15,
                  background: "#F3F0E8",
                  padding: "12px 14px 20px 14px",
                  clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 26px), 0 100%)",
                }}
              >
                {/* Photo Box: Increased height, NO extra tag on image */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "235px", border: "2px solid #0A0A0A" }}
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
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3
                      className="font-[family-name:var(--font-anton)] text-black uppercase tracking-tight group-hover/panel:text-[#3B82F6] transition-colors"
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

                  {/* Bottom Row: Clean Tags without expand button */}
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
                      className="font-mono font-bold text-neutral-500 uppercase tracking-wider text-[10px]"
                    >
                      2025
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* --- PANEL 02: ROBO SOCCER --- */}
              <motion.div
                className="group/panel relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl mt-0 lg:-mt-[16px]"
                style={{
                  flex: 1,
                  background: "#F3F0E8",
                  padding: "26px 14px 12px 14px",
                  clipPath: "polygon(0 26px, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                {/* Photo Box: Increased height, NO extra tag on image */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "205px", border: "2px solid #0A0A0A" }}
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
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3
                      className="font-[family-name:var(--font-anton)] text-black uppercase tracking-tight group-hover/panel:text-[#3B82F6] transition-colors"
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

                  {/* Bottom Row: Clean Tags without expand button */}
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
                      className="font-mono font-bold text-neutral-500 uppercase tracking-wider text-[10px]"
                    >
                      2024
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ============================================================== */}
            {/* COLUMN 2: PANEL 03 FLINDERS HACKATHON                          */}
            {/* ============================================================== */}
            <div className="flex flex-col h-full">
              <motion.div
                className="group/panel relative flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: "#F3F0E8",
                  padding: "12px 14px 14px 14px",
                }}
              >
                {/* Photo Box: Increased height, NO extra tag on image */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "76%", minHeight: "480px", border: "2px solid #0A0A0A" }}
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
                </div>

                {/* Content Below Photo */}
                <div className="flex flex-col flex-1 justify-between pt-2.5">
                  <div>
                    <h3
                      className="font-[family-name:var(--font-anton)] text-black uppercase tracking-tight group-hover/panel:text-[#3B82F6] transition-colors"
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

                  {/* Bottom Row: Clean Tags without expand button */}
                  <div
                    className="flex items-center justify-between font-mono border-t border-black/15 pt-2"
                    style={{ marginTop: "auto" }}
                  >
                    <span
                      className="font-bold text-neutral-600 uppercase tracking-tight"
                      style={{ fontSize: "9px" }}
                    >
                      ARTIFICIAL INTELLIGENCE • PITCHING
                    </span>
                    <span
                      className="font-mono font-bold text-neutral-500 uppercase tracking-wider text-[10px]"
                    >
                      2026
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ============================================================== */}
            {/* COLUMN 3: PANEL 04 AIT HACKATHON 2K25                           */}
            {/* ============================================================== */}
            <div className="flex flex-col h-full">
              <motion.div
                className="group/panel relative flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: "#F3F0E8",
                  padding: "12px 14px 14px 14px",
                }}
              >
                {/* Photo Box: Increased height, NO extra tag on image */}
                <div
                  className="relative w-full overflow-hidden shrink-0"
                  style={{ height: "76%", minHeight: "480px", border: "2px solid #0A0A0A" }}
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
                </div>

                {/* Content Below Photo */}
                <div className="flex flex-col flex-1 justify-between pt-2.5">
                  <div>
                    <h3
                      className="font-[family-name:var(--font-anton)] text-black uppercase tracking-tight group-hover/panel:text-[#3B82F6] transition-colors"
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
                        <span>TOP 10 FINALIST (500+ TEAMS)</span>
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Clean Tags without expand button */}
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
                      className="font-mono font-bold text-neutral-500 uppercase tracking-wider text-[10px]"
                    >
                      2025
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
      {/* 3. CERTIFICATIONS & SPECIALIZATIONS MARQUEE                     */}
      {/* ============================================================== */}
      <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-8 w-full px-2 sm:px-6 md:px-8 lg:px-12">
        <SectionHeading
          number="07"
          chapter="CHAPTER 07 — LICENSES & CREDENTIALS"
        >
          <span className="text-[#3B82F6]">CERTIFICATIONS</span>{" "}
          <span className="text-white">&amp; SPECIALIZATIONS</span>
        </SectionHeading>

        <div className="relative w-full overflow-hidden py-2 select-none">
          {/* Left Edge Gradient Fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-black via-black/80 to-transparent z-20" />

          {/* Right Edge Gradient Fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-black via-black/80 to-transparent z-20" />

          <Marquee pauseOnHover repeat={3} className="[--duration:55s] [--gap:1.5rem] py-3">
            {data.certificates.map((cert, idx) => (
              <div key={`${cert.title}-${idx}`} className="shrink-0">
                <CertFlipCard cert={cert} index={idx} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

const CERT_PALETTES = [
  {
    name: "cyan",
    hex: "#06B6D4",
    borderHover: "group-hover:border-cyan-400/90",
    textHover: "group-hover:text-cyan-300",
    badgeBorder: "border-cyan-400/60",
    badgeText: "text-cyan-400",
    backBorder: "border-cyan-400/90",
    shadowHover: "group-hover:shadow-[0_16px_48px_rgba(6,182,212,0.3)]",
    linkText: "text-cyan-400 hover:text-cyan-300",
  },
  {
    name: "purple",
    hex: "#A855F7",
    borderHover: "group-hover:border-purple-400/90",
    textHover: "group-hover:text-purple-300",
    badgeBorder: "border-purple-400/60",
    badgeText: "text-purple-400",
    backBorder: "border-purple-400/90",
    shadowHover: "group-hover:shadow-[0_16px_48px_rgba(168,85,247,0.3)]",
    linkText: "text-purple-400 hover:text-purple-300",
  },
  {
    name: "emerald",
    hex: "#10B981",
    borderHover: "group-hover:border-emerald-400/90",
    textHover: "group-hover:text-emerald-300",
    badgeBorder: "border-emerald-400/60",
    badgeText: "text-emerald-400",
    backBorder: "border-emerald-400/90",
    shadowHover: "group-hover:shadow-[0_16px_48px_rgba(16,185,129,0.3)]",
    linkText: "text-emerald-400 hover:text-emerald-300",
  },
  {
    name: "rose",
    hex: "#F43F5E",
    borderHover: "group-hover:border-rose-400/90",
    textHover: "group-hover:text-rose-300",
    badgeBorder: "border-rose-400/60",
    badgeText: "text-rose-400",
    backBorder: "border-rose-400/90",
    shadowHover: "group-hover:shadow-[0_16px_48px_rgba(244,63,94,0.3)]",
    linkText: "text-rose-400 hover:text-rose-300",
  },
  {
    name: "blue",
    hex: "#3B82F6",
    borderHover: "group-hover:border-blue-400/90",
    textHover: "group-hover:text-blue-300",
    badgeBorder: "border-blue-400/60",
    badgeText: "text-blue-400",
    backBorder: "border-blue-400/90",
    shadowHover: "group-hover:shadow-[0_16px_48px_rgba(59,130,246,0.3)]",
    linkText: "text-blue-400 hover:text-blue-300",
  },
  {
    name: "amber",
    hex: "#F59E0B",
    borderHover: "group-hover:border-amber-400/90",
    textHover: "group-hover:text-amber-300",
    badgeBorder: "border-amber-400/60",
    badgeText: "text-amber-400",
    backBorder: "border-amber-400/90",
    shadowHover: "group-hover:shadow-[0_16px_48px_rgba(245,158,11,0.3)]",
    linkText: "text-amber-400 hover:text-amber-300",
  },
];

function CertFlipCard({
  cert,
  index = 0,
}: {
  cert: (typeof data.certificates)[number];
  index?: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = CERT_PALETTES[index % CERT_PALETTES.length];

  return (
    <div
      className="w-72 sm:w-80 md:w-[330px] h-[450px] shrink-0 group perspective-1000 select-none cursor-pointer"
      onClick={() => {
        playTapSound("pop");
        setIsFlipped((prev) => !prev);
      }}
      data-cursor="Flip"
    >
      <div
        className={cn(
          "relative w-full h-full duration-700 transform-style-3d transition-transform",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* ============================================================ */}
        {/* FRONT SIDE                                                   */}
        {/* ============================================================ */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden bg-[#0E0E10] border-2 border-[#FAF9F5]/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.85)] transition-all",
            theme.borderHover,
            theme.shadowHover
          )}
        >
          {/* Upper Halftone / Carbon Texture Frame */}
          <div
            className="w-full relative rounded-xl border border-white/10 p-3 sm:p-4 flex items-center justify-center min-h-[175px] sm:min-h-[185px] overflow-hidden"
            style={{
              backgroundColor: "#161618",
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.18) 1.2px, transparent 1.2px)",
              backgroundSize: "6px 6px",
            }}
          >
            {/* 3D FLIP Badge */}
            <div
              className={cn(
                "absolute top-2.5 right-2.5 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/85 font-mono font-bold text-[9.5px] tracking-wider uppercase shadow-md pointer-events-none select-none border",
                theme.badgeBorder,
                theme.badgeText
              )}
            >
              <span>3D FLIP</span>
              <span className="text-xs">⟳</span>
            </div>

            {/* Framed Certificate Document Image */}
            <div className="relative w-full aspect-[16/10] max-h-[145px] rounded-xs border-2 border-white/95 shadow-2xl overflow-hidden bg-white">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-contain p-1"
                sizes="(max-width: 640px) 280px, 340px"
              />
            </div>
          </div>

          {/* Middle Section: Anton Title & Issuer */}
          <div className="space-y-1 relative z-10">
            <h3
              className={cn(
                "font-[family-name:var(--font-anton)] text-2xl sm:text-[25px] uppercase tracking-wide text-[#FAF9F5] leading-[1.08] line-clamp-2 min-h-[3.4rem] flex items-center mt-2.5 transition-colors",
                theme.textHover
              )}
            >
              {cert.title}
            </h3>
            <p className="font-sans text-sm sm:text-base text-zinc-400 font-medium tracking-normal">
              {cert.issuer}
            </p>
          </div>

          {/* Bottom Footer Row */}
          <div className="border-t border-white/20 mt-3 pt-3 flex items-center justify-between relative z-10">
            <span
              className={cn(
                "font-[family-name:var(--font-anton)] text-sm sm:text-base tracking-wider uppercase text-[#FAF9F5] flex items-center gap-1.5 transition-colors",
                theme.textHover
              )}
            >
              <span>FLIP FOR SKILLS</span>
              <span className="text-base font-sans">→</span>
            </span>
            <span className="text-[#FAF9F5] text-lg font-bold group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BACK SIDE                                                    */}
        {/* ============================================================ */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#0E0E10] border-2 rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.85)]",
            theme.backBorder
          )}
        >
          <div className="space-y-3">
            {/* Top Meta Row */}
            <div className="flex items-center justify-between border-b border-white/15 pb-2">
              <span
                style={{ color: theme.hex }}
                className="text-xs font-mono font-black uppercase tracking-wider"
              >
                {cert.issuer}
              </span>
              <span className="text-xs font-mono text-zinc-400 font-semibold">
                {cert.date}
              </span>
            </div>

            {/* Anton Title */}
            <h4 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl uppercase tracking-wide text-white leading-tight">
              {cert.title}
            </h4>

            {/* Verified Skills Pills */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                Key Skills Verified:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-[#18181C] text-zinc-200 border border-white/15 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
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
                className={cn(
                  "font-mono text-xs font-bold hover:underline flex items-center gap-1 transition-colors",
                  theme.linkText
                )}
              >
                <span>VERIFY CREDENTIAL</span>
                <span>↗</span>
              </a>
            ) : (
              <span className="font-mono text-xs text-zinc-400">
                VERIFIED CREDENTIAL
              </span>
            )}
            <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1">
              <span>FLIP BACK</span>
              <span>↻</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
