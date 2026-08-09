"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  IconTrophy,
  IconX,
  IconExternalLink,
  IconMaximize,
  IconAward,
  IconCalendar,
  IconUsers,
  IconShieldCheck,
} from "@tabler/icons-react";

import { data, HackathonCertificateItem } from "@/data/data";
import { cn } from "@/lib/utils";

export const openHackathonVault = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-hackathon-vault"));
  }
};

export const HackathonVaultDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [activeCertificate, setActiveCertificate] = useState<HackathonCertificateItem | null>(null);

  // Listen for global custom trigger event
  useEffect(() => {
    const handleOpenVault = () => setIsOpen(true);
    window.addEventListener("open-hackathon-vault", handleOpenVault);
    return () => window.removeEventListener("open-hackathon-vault", handleOpenVault);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeCertificate) {
          setActiveCertificate(null);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeCertificate]);


  // Lock body scroll when drawer or modal is open
  useEffect(() => {
    if (isOpen || activeCertificate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, activeCertificate]);

  const hackathons = data.hackathons || [];

  // Filter options
  const filterOptions = ["All", "DA-IICT", "LDCE", "2025", "2026"];

  const filteredHackathons = hackathons.filter((item) => {
    if (selectedTag === "All") return true;
    if (selectedTag === "DA-IICT") return item.organizer.includes("DAIICT") || item.organizer.includes("DA-IICT") || item.location.includes("DA-IICT");
    if (selectedTag === "LDCE") return item.organizer.includes("LDCE") || item.location.includes("LDCE");
    if (selectedTag === "2025") return item.date.includes("2025");
    if (selectedTag === "2026") return item.date.includes("2026");
    return true;
  });

  return (
    <>
      {/* FLOATING SIDE DOCK TRIGGER BADGE (Fixed Right Edge) */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[4000] hidden sm:block"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-zinc-950/90 dark:bg-zinc-900/95 border-y border-l border-cyan-500/40 hover:border-cyan-400 py-3.5 px-3 rounded-l-2xl shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] backdrop-blur-xl transition-all duration-300 cursor-pointer"
          title="Open Hackathon Vault"
        >
          {/* Glowing pulse indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>

          <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider">
            <IconTrophy className="h-4 w-4 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
            <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-semibold tracking-widest text-zinc-300 group-hover:text-cyan-300 transition-colors">
              HACKATHON VAULT
            </span>
            <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-1.5 py-0.5 rounded-full border border-cyan-500/40 font-mono">
              {hackathons.length}
            </span>
          </div>

          {/* Hover highlight bar */}
          <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 rounded-l opacity-80 group-hover:opacity-100 transition-opacity" />
        </button>
      </motion.div>

      {/* MOBILE FLOATING TRIGGER BUTTON (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[4000] sm:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-zinc-900 border border-cyan-500/40 text-cyan-400 px-4 py-2.5 rounded-full shadow-lg shadow-cyan-500/20 active:scale-95 transition-all text-xs font-mono font-bold"
        >
          <IconTrophy className="h-4 w-4 text-cyan-400" />
          <span>HACKATHON VAULT ({hackathons.length})</span>
        </button>
      </div>

      {/* SLIDE-OVER DRAWER OVERLAY & PANEL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[6000] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-zinc-950/95 border-l border-cyan-500/30 text-zinc-100 h-full shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col z-10 overflow-hidden"
            >
              {/* Sci-Fi Top Accent Line */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

              {/* DRAWER HEADER */}
              <div className="p-6 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                      STARK SECURITY PROTOCOL • VERIFIED
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white flex items-center gap-2 mt-1">
                    <IconTrophy className="h-5 w-5 text-cyan-400" />
                    Hackathon Certificates Vault
                  </h2>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/50 transition-colors"
                  aria-label="Close drawer"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              {/* FILTER TABS & METRICS */}
              <div className="px-6 py-4 border-b border-zinc-800/60 bg-zinc-900/40 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {filterOptions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer border",
                        selectedTag === tag
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-bold"
                          : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <IconShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{filteredHackathons.length} Verified Records</span>
                </div>
              </div>

              {/* CERTIFICATE CARDS LIST */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {filteredHackathons.length === 0 ? (
                  <div className="py-12 text-center text-zinc-500 text-sm">
                    No certificates found for this filter.
                  </div>
                ) : (
                  filteredHackathons.map((cert) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800/90 hover:border-cyan-500/50 rounded-2xl p-4 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col gap-4 overflow-hidden"
                    >
                      {/* Top status bar */}
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase border",
                            cert.badgeType === "Appreciation"
                              ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                              : "bg-purple-500/10 text-purple-300 border-purple-500/30"
                          )}
                        >
                          {cert.award}
                        </span>

                        <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                          <IconCalendar className="h-3 w-3 text-cyan-400" />
                          {cert.date}
                        </span>
                      </div>

                      {/* CERTIFICATE PREVIEW IMAGE */}
                      <div
                        onClick={() => setActiveCertificate(cert)}
                        className="relative w-full aspect-[1.41/1] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 group-hover:border-cyan-500/40 cursor-pointer transition-all"
                      >
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <span className="bg-cyan-500/90 text-zinc-950 px-3 py-1.5 rounded-full text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg">
                            <IconMaximize className="h-3.5 w-3.5" /> Fullscreen View
                          </span>
                        </div>
                      </div>

                      {/* DETAILS CONTENT */}
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {cert.title}
                        </h3>

                        <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                          <IconAward className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                          <span>{cert.organizer}</span>
                        </p>

                        {cert.team && (
                          <p className="text-xs text-amber-400/90 mt-1 flex items-center gap-1.5 font-mono">
                            <IconUsers className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                            <span>Team: <strong>{cert.team}</strong></span>
                          </p>
                        )}

                        <p className="text-xs text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>

                      {/* TAGS & VERIFICATION */}
                      <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {cert.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] bg-zinc-800/80 text-zinc-400 px-2 py-0.5 rounded font-mono"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        {cert.verificationUrl && (
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                          >
                            <span>Verify QR</span>
                            <IconExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* FOOTER */}
              <div className="p-4 border-t border-zinc-800/80 bg-zinc-950 text-center text-xs font-mono text-zinc-500">
                STARK LABS • HACKATHON ARCHIVE PROTOCOL v2.0
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeCertificate && (
          <div className="fixed inset-0 z-[7000] flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCertificate(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.3)] z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
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

              {/* Full Image */}
              <div className="relative flex-1 bg-black p-2 sm:p-4 min-h-[350px] sm:min-h-[500px] flex items-center justify-center overflow-auto">
                <div className="relative w-full h-full max-h-[70vh] aspect-[1.41/1]">
                  <Image
                    src={activeCertificate.image}
                    alt={activeCertificate.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Footer details */}
              <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">● Digitally Verified</span>
                  {activeCertificate.team && (
                    <span>• Team: <strong className="text-white">{activeCertificate.team}</strong></span>
                  )}
                </div>

                <span>Press ESC or click anywhere outside to exit</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
