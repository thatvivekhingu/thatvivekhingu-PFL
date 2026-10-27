"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

const SPIDEY_QUOTES = [
  "With great models comes great inference! ⚡",
  "Friendly Neighborhood AI Engineer! 🕷️",
  "Shhh... Vivek is training neural nets right now! 🧠",
  "Web-slinging code & building autonomous agents! 🚀",
  "THWIP! You found Vivek's easter egg! 🕸️",
  "Desi Karodiya on duty! 🇮🇳",
  "Need an ML system built? I know a guy! 😉",
];

export function HangingMascot() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isUnmasked, setIsUnmasked] = useState(false);
  const [showThwip, setShowThwip] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowQuote(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    playTapSound("chime");
    setIsFlipped(true);
    setShowThwip(true);
    setQuoteIndex((prev) => (prev + 1) % SPIDEY_QUOTES.length);
    setShowQuote(true);

    setTimeout(() => {
      setShowThwip(false);
    }, 1200);
  };

  const toggleMask = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTapSound("pop");
    setIsUnmasked((prev) => !prev);
  };

  return (
    <div
      className="fixed top-0 right-3 sm:right-10 md:right-16 lg:right-24 z-[4500] pointer-events-auto select-none"
      style={{ perspective: 1000 }}
    >
      {/* PENDULUM SWING WRAPPER (Pivots from top center web anchor) */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 80 }}
        dragElastic={0.4}
        animate={{
          rotate: isHovered ? [-14, 14, -14] : [-6, 6, -6],
          y: isHovered ? -10 : [0, 6, 0],
          rotateY: isFlipped ? 360 : 0,
        }}
        transition={{
          rotate: {
            duration: isHovered ? 2.2 : 3.6,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: isHovered ? 1.5 : 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotateY: {
            duration: 0.8,
            ease: "easeInOut",
          },
        }}
        onAnimationComplete={() => setIsFlipped(false)}
        style={{ transformOrigin: "top center" }}
        className="relative flex flex-col items-center cursor-pointer group"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title="Friendly Neighborhood Easter Egg • Click or Tug to interact!"
      >
        {/* Top Ceiling Anchor Tack */}
        <div className="relative -top-1 w-3.5 h-2 rounded-b-md bg-gradient-to-b from-slate-400 to-slate-600 shadow-sm border-x border-b border-white/30 z-20 flex items-center justify-center">
          <div className="w-1.5 h-1 rounded-full bg-cyan-400/80 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
        </div>

        {/* --- SILKY SPIDER WEB STRAND --- */}
        <div className="relative w-4 h-16 sm:h-22 flex items-center justify-center overflow-visible">
          {/* Silky Web Thread Line */}
          <div className="w-[1.5px] h-full bg-gradient-to-b from-white/90 via-cyan-200/80 to-white/95 shadow-[0_0_6px_rgba(255,255,255,0.7)]" />

          {/* Web Silk Droplets / Micro Knots */}
          <span className="absolute top-1/4 w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_4px_rgba(34,211,238,0.8)]" />
          <span className="absolute top-2/3 w-1 h-1 rounded-full bg-cyan-200/90 shadow-[0_0_3px_rgba(34,211,238,0.8)]" />

          {/* Web Sparkle on hover */}
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute top-1/2 text-[10px] text-cyan-300 pointer-events-none"
            >
              ✦
            </motion.span>
          )}
        </div>

        {/* --- UPSIDE-DOWN SPIDER-MAN MASCOT --- */}
        <div className="relative flex flex-col items-center -mt-1">
          {/* Hands Holding Web Strand */}
          <div className="relative z-20 flex items-center gap-1 -mb-1.5">
            <div className="w-2.5 h-2 rounded-full bg-red-600 border border-red-800 shadow-xs" />
            <div className="w-2.5 h-2 rounded-full bg-red-600 border border-red-800 shadow-xs" />
          </div>

          {/* Mascot Body Container */}
          <div className="relative w-12 h-16 sm:w-14 sm:h-18 flex items-center justify-center">
            {/* If unmasked: Shows Vivek's Spider-Man Avatar */}
            {isUnmasked ? (
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] bg-slate-950 rotate-180 transition-transform duration-300">
                <Image
                  src="/avatars/spiderman.jpg"
                  alt="Spider-Vivek"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            ) : (
              /* Vector Upside-Down Spider-Man Mascot */
              <svg
                viewBox="0 0 100 130"
                className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] overflow-visible"
              >
                <defs>
                  {/* Eye Glow Filter */}
                  <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" floodColor="#ffffff" floodOpacity="0.8" stdDeviation="2" />
                  </filter>
                  <linearGradient id="suitRed" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e11d48" />
                    <stop offset="60%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>
                  <linearGradient id="suitBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* --- TORSO & LEGS (HANGING INVERTED) --- */}
                {/* Upper legs bent in hanging crouch */}
                <path
                  d="M 32 30 C 20 20 25 5 38 12 C 45 16 48 24 45 32 Z"
                  fill="url(#suitBlue)"
                  stroke="#0f172a"
                  strokeWidth="1.5"
                />
                <path
                  d="M 68 30 C 80 20 75 5 62 12 C 55 16 52 24 55 32 Z"
                  fill="url(#suitBlue)"
                  stroke="#0f172a"
                  strokeWidth="1.5"
                />
                {/* Red boots / feet */}
                <ellipse cx="32" cy="8" rx="5" ry="7" fill="url(#suitRed)" stroke="#7f1d1d" strokeWidth="1" />
                <ellipse cx="68" cy="8" rx="5" ry="7" fill="url(#suitRed)" stroke="#7f1d1d" strokeWidth="1" />

                {/* Torso */}
                <path
                  d="M 35 25 Q 50 20 65 25 L 68 55 Q 50 62 32 55 Z"
                  fill="url(#suitRed)"
                  stroke="#7f1d1d"
                  strokeWidth="1.5"
                />
                {/* Blue sides on torso */}
                <path d="M 35 25 L 32 55 Q 38 52 40 38 Z" fill="url(#suitBlue)" />
                <path d="M 65 25 L 68 55 Q 62 52 60 38 Z" fill="url(#suitBlue)" />

                {/* Spider Chest Symbol */}
                <g transform="translate(50, 42) scale(0.7)">
                  <ellipse cx="0" cy="0" rx="3" ry="5" fill="#0f172a" />
                  <path d="M -2 -3 Q -8 -8 -10 -4" stroke="#0f172a" strokeWidth="1.2" fill="none" />
                  <path d="M 2 -3 Q 8 -8 10 -4" stroke="#0f172a" strokeWidth="1.2" fill="none" />
                  <path d="M -3 0 Q -10 0 -12 4" stroke="#0f172a" strokeWidth="1.2" fill="none" />
                  <path d="M 3 0 Q 10 0 12 4" stroke="#0f172a" strokeWidth="1.2" fill="none" />
                  <path d="M -2 3 Q -8 8 -10 12" stroke="#0f172a" strokeWidth="1.2" fill="none" />
                  <path d="M 2 3 Q 8 8 10 12" stroke="#0f172a" strokeWidth="1.2" fill="none" />
                </g>

                {/* --- HEAD / MASK (UPSIDE-DOWN) --- */}
                <path
                  d="M 28 58 C 24 75 30 115 50 122 C 70 115 76 75 72 58 C 65 52 35 52 28 58 Z"
                  fill="url(#suitRed)"
                  stroke="#7f1d1d"
                  strokeWidth="2"
                />

                {/* Webbing Lines on Mask */}
                <path d="M 50 82 L 50 122" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.6" />
                <path d="M 50 82 L 30 108" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.6" />
                <path d="M 50 82 L 70 108" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.6" />
                <path d="M 50 82 L 26 80" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.6" />
                <path d="M 50 82 L 74 80" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.6" />
                <path d="M 50 82 L 32 58" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.6" />
                <path d="M 50 82 L 68 58" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.6" />
                <path d="M 38 72 Q 50 68 62 72" stroke="#1e293b" strokeWidth="1" fill="none" strokeOpacity="0.6" />
                <path d="M 33 88 Q 50 82 67 88" stroke="#1e293b" strokeWidth="1" fill="none" strokeOpacity="0.6" />
                <path d="M 36 102 Q 50 96 64 102" stroke="#1e293b" strokeWidth="1" fill="none" strokeOpacity="0.6" />

                {/* --- EXPRESSIVE SPIDER-MAN EYES --- */}
                <path
                  d={
                    isHovered
                      ? "M 32 80 Q 42 74 46 86 Q 40 92 32 80 Z"
                      : "M 30 78 Q 42 70 47 88 Q 38 96 30 78 Z"
                  }
                  fill="#020617"
                  stroke="#020617"
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                />
                <path
                  d={
                    isHovered
                      ? "M 33 80 Q 41 75 44 85 Q 39 90 33 80 Z"
                      : "M 32 79 Q 41 72 45 87 Q 38 93 32 79 Z"
                  }
                  fill="#ffffff"
                  filter="url(#eyeGlow)"
                  className="transition-all duration-200"
                />

                <path
                  d={
                    isHovered
                      ? "M 68 80 Q 58 74 54 86 Q 60 92 68 80 Z"
                      : "M 70 78 Q 58 70 53 88 Q 62 96 70 78 Z"
                  }
                  fill="#020617"
                  stroke="#020617"
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                />
                <path
                  d={
                    isHovered
                      ? "M 67 80 Q 59 75 56 85 Q 61 90 67 80 Z"
                      : "M 68 79 Q 59 72 55 87 Q 62 93 68 79 Z"
                  }
                  fill="#ffffff"
                  filter="url(#eyeGlow)"
                  className="transition-all duration-200"
                />
              </svg>
            )}
          </div>

          {/* Quick Unmask Icon Button Badge */}
          <button
            type="button"
            onClick={toggleMask}
            title={isUnmasked ? "Put Mask Back On" : "Unmask Vivek Hingu!"}
            className="mt-1 px-1.5 py-0.5 rounded-full bg-slate-900/90 hover:bg-red-600 text-[9px] font-mono font-bold text-white border border-white/20 shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            {isUnmasked ? "🎭 Mask" : "👀 Reveal"}
          </button>
        </div>

        {/* --- COMIC ACTION THWIP ON CLICK --- */}
        <AnimatePresence>
          {showThwip && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10, rotate: -15 }}
              animate={{ scale: [0, 1.25, 1], opacity: 1, y: -25, rotate: 8 }}
              exit={{ scale: 0.5, opacity: 0, y: -40 }}
              transition={{ duration: 0.35 }}
              className="absolute -top-6 -left-12 z-50 pointer-events-none"
            >
              <div className="relative px-3 py-1 bg-gradient-to-r from-red-600 to-amber-500 rounded-lg border-2 border-white text-white font-black text-xs tracking-wider uppercase shadow-[0_4px_15px_rgba(239,68,68,0.8)] rotate-[-8deg] flex items-center gap-1">
                <span>🕸️ THWIP!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- COMIC SPEECH BUBBLE ON HOVER / CLICK --- */}
        <AnimatePresence>
          {(isHovered || showQuote) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 right-16 sm:right-20 z-50 w-52 sm:w-60 pointer-events-auto"
            >
              {/* Comic Speech Bubble */}
              <div className="relative rounded-2xl bg-white dark:bg-[#121824] border-2 border-slate-900 dark:border-cyan-400/80 p-3 shadow-2xl text-slate-900 dark:text-zinc-100 text-xs font-sans leading-snug">
                {/* Bubble Pointer Arrow Tail */}
                <div className="absolute top-6 -right-2 w-3.5 h-3.5 bg-white dark:bg-[#121824] border-t-2 border-r-2 border-slate-900 dark:border-cyan-400/80 rotate-45 transform" />

                <div className="relative z-10 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-red-600 dark:text-cyan-400 uppercase tracking-wider font-mono">
                    <span>Spider-Mascot</span>
                    <span className="text-[9px] text-slate-400 dark:text-zinc-500">Tap to cycle</span>
                  </div>
                  <p className="font-medium text-slate-800 dark:text-zinc-200">
                    &ldquo;{SPIDEY_QUOTES[quoteIndex]}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}