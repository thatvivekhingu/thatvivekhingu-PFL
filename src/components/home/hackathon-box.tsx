"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  IconTrophy,
  IconChevronDown,
  IconChevronUp,
  IconExternalLink,
  IconMaximize,
  IconX,
  IconShieldCheck,
} from "@tabler/icons-react";
import { data, HackathonCertificateItem } from "@/data/data";
import { cn } from "@/lib/utils";
import { playTapSound } from "@/lib/sound";

export default function HackathonBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<HackathonCertificateItem | null>(null);

  const hackathons = data.hackathons || [];

  const toggleOpen = () => {
    playTapSound("access_granted");
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      {/* MAIN EXPANDABLE HORIZONTAL BOX */}
      <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-cyan-500/40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-lg hover:shadow-xl dark:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300">
        {/* TOP ACCENT LINE */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600" />

        {/* CLICKABLE HEADER BAR (TOGGLE BOX) */}
        <div
          onClick={toggleOpen}
          className="p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none bg-gradient-to-r from-cyan-50/50 via-transparent to-blue-50/50 dark:from-cyan-950/20 dark:to-blue-950/20 hover:bg-cyan-500/5 transition-colors"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 shrink-0 group-hover:scale-110 transition-transform">
              <IconTrophy className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  Hackathon Vault • {hackathons.length} Certificates
                </span>
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              </div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                Hackathon Achievements & Certificates
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-0.5">
                Flinders AI Competition &apos;26 (2nd Winner) • IEEE SB DA-IICT (TIC-TECH-TOE &apos;25) • LDCE (tarkShaastra 2k26)
              </p>
            </div>
          </div>

          {/* TOGGLE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-extrabold text-xs sm:text-sm font-mono tracking-wide shadow-lg shadow-cyan-500/20 transition-all shrink-0 cursor-pointer"
          >
            <span>{isOpen ? "HIDE CERTIFICATES" : "VIEW CERTIFICATES"}</span>
            {isOpen ? <IconChevronUp className="h-4 w-4" /> : <IconChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {/* EXPANDABLE CERTIFICATES GRID CONTENT */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden border-t border-zinc-800/80 bg-zinc-950/60"
            >
              <div className="p-5 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <IconShieldCheck className="h-4 w-4" />
                    <span>Digitally Verified Participation & Awards</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
                    Click certificate image for full-screen view
                  </span>
                </div>

                {/* CERTIFICATE CARDS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {hackathons.map((cert) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group/card relative bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 rounded-2xl p-3.5 transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        {/* Certificate Image Box */}
                        <div
                          onClick={() => {
                            playTapSound("pop");
                            setActiveCertificate(cert);
                          }}
                          className="relative w-full aspect-[1.41/1] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 group-hover/card:border-cyan-500/40 cursor-pointer transition-all"
                        >
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={true}
                            loading="eager"
                            className="object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Metadata */}
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border",
                                cert.badgeType === "Winner"
                                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                                  : cert.badgeType === "Appreciation"
                                  ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                                  : "bg-purple-500/10 text-purple-300 border-purple-500/30"
                              )}
                            >
                              {cert.award}
                            </span>
                            <span className="text-[11px] font-mono text-zinc-400">
                              {cert.date}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white group-hover/card:text-cyan-300 transition-colors line-clamp-1">
                            {cert.title}
                          </h4>

                          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                            {cert.organizer}
                          </p>
                        </div>
                      </div>

                      {/* Footer Action */}
                      <div className="pt-2.5 mt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                        <button
                          onClick={() => {
                            playTapSound("pop");
                            setActiveCertificate(cert);
                          }}
                          className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <IconMaximize className="h-3.5 w-3.5" />
                          <span>View</span>
                        </button>

                        {cert.verificationUrl && (
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
                          >
                            <span>Verify</span>
                            <IconExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeCertificate && (
          <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCertificate(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.3)] z-10 flex flex-col max-h-[90vh]"
            >
              {/* Lightbox Header */}
              <div className="p-4 sm:p-6 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    {activeCertificate.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mt-0.5">
                    {activeCertificate.organizer} • {activeCertificate.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {activeCertificate.verificationUrl && (
                    <a
                      href={activeCertificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                    >
                      <IconExternalLink className="h-3.5 w-3.5" />
                      <span>Verify Certificate</span>
                    </a>
                  )}

                  <button
                    onClick={() => setActiveCertificate(null)}
                    className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    <IconX className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Image */}
              <div className="relative flex-1 bg-black p-2 sm:p-4 min-h-[350px] sm:min-h-[500px] flex items-center justify-center overflow-auto">
                <div className="relative w-full h-full max-h-[70vh] aspect-[1.41/1]">
                  <Image
                    src={activeCertificate.image}
                    alt={activeCertificate.title}
                    fill
                    sizes="100vw"
                    priority={true}
                    loading="eager"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Lightbox Footer */}
              <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">● Digitally Verified</span>
                  {activeCertificate.team && (
                    <span>• Team: <strong className="text-white">{activeCertificate.team}</strong></span>
                  )}
                </div>
                <span>Click outside to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
