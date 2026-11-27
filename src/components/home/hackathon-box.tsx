"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  IconExternalLink,
  IconMaximize,
  IconX,
  IconBarcode,
  IconChevronDown,
} from "@tabler/icons-react";
import { data, HackathonCertificateItem } from "@/data/data";
import { cn } from "@/lib/utils";
import { playTapSound } from "@/lib/sound";
import { Magnetic } from "@/components/ui/magnetic";
import { TiltCard } from "@/components/ui/tilt-card";

export default function HackathonBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<HackathonCertificateItem | null>(null);

  const hackathons = data.hackathons || [];

  const toggleOpen = () => {
    playTapSound("pop");
    setIsOpen(!isOpen);
  };

  const getStampConfig = (cert: HackathonCertificateItem) => {
    if (cert.badgeType === "Winner" || cert.award.toLowerCase().includes("winner") || cert.award.toLowerCase().includes("prize")) {
      return {
        label: "2ND PRIZE ★ WINNER",
        border: "border-[#B92B27]",
        text: "text-[#B92B27]",
        bg: "bg-[#B92B27]/10",
        shadow: "shadow-red-900/20",
        rotation: -7,
      };
    }
    if (cert.badgeType === "Appreciation" || cert.award.toLowerCase().includes("appreciation")) {
      return {
        label: "APPRECIATION VERIFIED",
        border: "border-teal-700",
        text: "text-teal-700",
        bg: "bg-teal-700/10",
        shadow: "shadow-teal-900/20",
        rotation: 6,
      };
    }
    return {
      label: "PARTICIPATION MERIT",
      border: "border-purple-700",
      text: "text-purple-700",
      bg: "bg-purple-700/10",
      shadow: "shadow-purple-900/20",
      rotation: -5,
    };
  };

  return (
    <div className="w-full">
      {/* MAIN MANGA ARCHIVE VAULT CONTAINER */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0E0E10] text-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
        {/* TOP ACCENT RULE */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent" />

        {/* ============================================================== */}
        {/* SECTION HEADER */}
        {/* ============================================================== */}
        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 bg-[#0E0E10] select-none">
          <div className="space-y-2 max-w-3xl">
            {/* Top Monospace Tag */}
            <div className="flex items-center gap-2">
              <span className="text-[#3B82F6] font-bold font-mono text-xs">{"//"}</span>
              <span className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                HACKATHON VAULT &amp; SPRINT RECORDS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-1" />
            </div>

            {/* Left-Aligned Headline in Anton matching Portfolio standards */}
            <h3 className="font-[family-name:var(--font-anton)] text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase leading-none">
              <span className="text-[#3B82F6]">HACKATHON ACHIEVEMENTS</span>{" "}
              <span className="text-white">&amp; CERTIFICATES</span>
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              Flinders AI &apos;26 (2nd Winner) • DA-IICT (HackOut &apos;26 &amp; TIC-TECH-TOE) • LDCE (tarkShaastra 2k26)
            </p>
          </div>

          {/* Right-Aligned Cream Pill Toggle Button with Magnetic Physics */}
          <Magnetic strength={0.35}>
            <button
              type="button"
              onClick={toggleOpen}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full bg-[#FAF9F5] hover:bg-white text-black font-mono font-bold text-xs sm:text-sm tracking-wider border-2 border-black shadow-[4px_4px_0px_#3B82F6] hover:shadow-[5px_5px_0px_#3B82F6] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer shrink-0"
            >
              <span>{isOpen ? "HIDE CERTIFICATES" : "VIEW CERTIFICATES"}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="inline-flex items-center justify-center"
              >
                <IconChevronDown className="w-4 h-4 text-black stroke-[2.5]" />
              </motion.span>
            </button>
          </Magnetic>
        </div>

        {/* ============================================================== */}
        {/* 3-COLUMN MANGA DOSSIER CARD GRID */}
        {/* ============================================================== */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden bg-[#0A0A0C] p-5 sm:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {hackathons.map((cert, idx) => {
                  const stamp = getStampConfig(cert);
                  const recordCode = `REC HKT ${String(idx + 1).padStart(2, "0")}`;

                  return (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      className="h-full"
                    >
                      <TiltCard maxTilt={5} glareOpacity={0.06} dataCursor="Inspect" className="h-full">
                        <div className="group/card relative bg-[#FAF9F5] text-black rounded-xl border-2 border-black p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-[5px_5px_0px_#000] hover:-translate-y-1.5 hover:shadow-[7px_7px_0px_#B92B27] select-none overflow-hidden h-full">
                      {/* Subtle Manga Halftone Corner Accent */}
                      <div
                        className="absolute top-0 right-0 w-20 h-20 pointer-events-none opacity-20"
                        style={{
                          backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
                          backgroundSize: "5px 5px",
                        }}
                      />

                      {/* Angled Rubber Stamp Badge in Top-Right Corner */}
                      <div
                        className={cn(
                          "absolute top-12 right-2 z-20 pointer-events-none select-none px-2.5 py-0.5 rounded border-2 font-mono font-black text-[9px] sm:text-[10px] tracking-wider uppercase backdrop-blur-xs shadow-md transition-transform duration-300 group-hover/card:scale-105",
                          stamp.border,
                          stamp.text,
                          stamp.bg,
                          stamp.shadow
                        )}
                        style={{ transform: `rotate(${stamp.rotation}deg)` }}
                      >
                        {stamp.label}
                      </div>

                      <div className="space-y-3 relative z-10">
                        {/* Top Meta Row */}
                        <div className="flex items-center justify-between font-mono text-[11px] font-bold border-b-2 border-black/15 pb-2 mb-2">
                          <span className="text-[#B92B27] tracking-wider">
                            {recordCode}
                          </span>
                          <span className="text-black/80 font-black">
                            {cert.date}
                          </span>
                        </div>

                        {/* Certificate Thumbnail Preview (Click opens lightbox) */}
                        <div
                          onClick={() => {
                            playTapSound("pop");
                            setActiveCertificate(cert);
                          }}
                          className="relative w-full aspect-[1.42/1] rounded-lg overflow-hidden bg-neutral-900 border-2 border-black cursor-pointer group/thumb shadow-sm"
                          title="Click to view full docket certificate"
                        >
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-500"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover/thumb:opacity-100">
                            <span className="px-3 py-1 rounded bg-black/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg">
                              <IconMaximize className="w-3.5 h-3.5" />
                              <span>INSPECT DOCKET</span>
                            </span>
                          </div>
                        </div>

                        {/* Title & Organization */}
                        <div className="pt-1">
                          <h4 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-black uppercase tracking-tight line-clamp-1 group-hover/card:text-[#B92B27] transition-colors">
                            {cert.title}
                          </h4>
                          <p className="text-xs font-mono text-neutral-600 font-semibold mt-0.5 line-clamp-1">
                            {cert.organizer}
                          </p>
                        </div>
                      </div>

                      {/* Footer Action Row */}
                      <div className="pt-3 mt-3 border-t-2 border-dashed border-black/20 flex items-center justify-between font-mono text-xs font-bold relative z-10">
                        <button
                          type="button"
                          onClick={() => {
                            playTapSound("pop");
                            setActiveCertificate(cert);
                          }}
                          className="text-black hover:text-[#B92B27] inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>VIEW DOCKET</span>
                          <span>↗</span>
                        </button>

                        {cert.verificationUrl && (
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#B92B27] hover:underline inline-flex items-center gap-1 transition-colors"
                          >
                            <span>VERIFY</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE DOCKET LIGHTBOX MODAL */}
      {/* ============================================================== */}
      <AnimatePresence>
        {activeCertificate && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-3 sm:p-6 lg:p-8 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCertificate(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-[#FAF9F5] text-black border-2 border-black rounded-2xl overflow-hidden shadow-[12px_14px_0px_#B92B27,18px_22px_40px_rgba(0,0,0,0.8)] z-10 flex flex-col max-h-[92vh]"
            >
              {/* Modal Crimson Header Banner */}
              <div className="p-4 sm:p-5 bg-black text-[#FAF9F5] flex items-center justify-between border-b-2 border-black">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-[#B92B27] tracking-widest uppercase">
                      OFFICIAL DOSSIER RECORD
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B92B27] animate-pulse" />
                  </div>
                  <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-white uppercase tracking-tight">
                    {activeCertificate.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    {activeCertificate.organizer} • {activeCertificate.date} • {activeCertificate.location}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {activeCertificate.verificationUrl && (
                    <a
                      href={activeCertificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#B92B27] hover:bg-[#9E2420] text-white text-xs font-mono font-bold shadow transition-colors"
                    >
                      <span>Verify Official Record</span>
                      <IconExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveCertificate(null)}
                    className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                    title="Close Docket"
                  >
                    <IconX className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Certificate Image Frame */}
              <div className="relative flex-1 bg-neutral-950 p-3 sm:p-6 flex items-center justify-center overflow-auto min-h-[300px] sm:min-h-[420px]">
                <div className="relative w-full h-full max-h-[60vh] aspect-[1.42/1] rounded-lg overflow-hidden border-2 border-neutral-700 shadow-2xl">
                  <Image
                    src={activeCertificate.image}
                    alt={activeCertificate.title}
                    fill
                    sizes="100vw"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Modal Information & Metadata Footer */}
              <div className="p-4 sm:p-5 bg-[#FAF9F5] border-t-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
                <div className="space-y-1 text-xs">
                  <p className="text-neutral-800 leading-relaxed font-sans max-w-xl">
                    {activeCertificate.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {activeCertificate.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-200 text-neutral-800 border border-neutral-300"
                      >
                        #{tag}
                      </span>
                    ))}
                    {activeCertificate.team && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#B92B27]/15 text-[#B92B27] border border-[#B92B27]/30">
                        Team: {activeCertificate.team}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 shrink-0 select-none">
                  <IconBarcode className="h-4 w-7 text-neutral-700" />
                  <span className="font-bold text-black uppercase">
                    ★ ARCHIVED RECORD
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
