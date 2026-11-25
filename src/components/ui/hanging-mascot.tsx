"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
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
  const [isSquinting, setIsSquinting] = useState(false);

  // Scroll tracking to make Spidey lower down as user scrolls down the page
  const { scrollY } = useScroll();
  const rawScrollDrop = useTransform(scrollY, [0, 600, 1500], [0, 45, 80]);
  const scrollDrop = useSpring(rawScrollDrop, { stiffness: 120, damping: 18 });

  useEffect(() => {
    setMounted(true);

    // Periodic eye squinting / blink animation like comic / movie Spidey
    const blinkInterval = setInterval(() => {
      setIsSquinting(true);
      setTimeout(() => setIsSquinting(false), 320);
    }, 4200);

    return () => clearInterval(blinkInterval);
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
      className="fixed top-0 right-4 sm:right-12 md:right-20 lg:right-28 z-[4500] pointer-events-auto select-none"
      style={{ perspective: 1200 }}
    >
      {/* Ceiling Anchor Point (Solidly pinned to viewport ceiling) */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
        <div className="w-5 h-2.5 rounded-b-lg bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 shadow-[0_3px_8px_rgba(0,0,0,0.8)] border-x border-b border-cyan-400/40 flex items-center justify-center">
          <div className="w-2 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
        </div>
        {/* Subtle ceiling web splatter */}
        <svg viewBox="0 0 40 16" className="w-8 h-3 text-cyan-200/40 -mt-0.5 fill-current opacity-70">
          <path d="M20 0 L15 10 L5 6 L12 12 L0 16 L16 14 L20 16 L24 14 L40 16 L28 12 L35 6 L25 10 Z" />
        </svg>
      </div>

      {/* 
        PENDULUM & DESCENDING CONTAINER
        - Starts above screen (-240px) on load and descends smoothly with elastic bounce.
        - Continues a natural descending & ascending sway loop (hangs and lowers down).
        - Connects with user scroll to lower down as user reads down the page.
      */}
      <motion.div
        style={{
          transformOrigin: "top center",
          y: scrollDrop,
        }}
        className="relative flex flex-col items-center"
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 120 }}
          dragElastic={0.5}
          // Initial entry: Drops from above ceiling (-240) into position with elastic bounce
          initial={{ y: -240, rotate: 18, opacity: 0 }}
          animate={{
            opacity: 1,
            // DESCENDING HANG ANIMATION:
            // Naturally bobs down (descends further down the web thread), hovers, and pulls back up slightly
            y: isHovered ? [35, 45, 35] : [0, 48, 80, 48, 0],
            rotate: isHovered ? [-10, 10, -10] : [-5, 5, -5],
            rotateY: isFlipped ? 360 : 0,
          }}
          transition={{
            opacity: { duration: 0.4 },
            y: {
              duration: isHovered ? 2 : 6.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: isHovered ? 2.2 : 4.5,
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
          title="Friendly Neighborhood Spidey • Click to spin or pull down!"
        >
          {/* --- LUMINOUS SPIDER WEB STRAND --- */}
          {/* The web thread extends seamlessly from the top anchor down to Spidey's hands */}
          <div className="relative w-6 h-28 sm:h-36 flex items-center justify-center overflow-visible">
            {/* Silky Web Core Thread */}
            <div className="w-[1.5px] h-full bg-gradient-to-b from-white/95 via-cyan-100/90 to-white/95 shadow-[0_0_8px_rgba(255,255,255,0.8),0_0_15px_rgba(34,211,238,0.5)]" />

            {/* Glowing Micro Silk Droplets along the strand */}
            <span className="absolute top-1/5 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(34,211,238,1)]" />
            <span className="absolute top-2/5 w-1 h-1 rounded-full bg-cyan-200 shadow-[0_0_4px_rgba(34,211,238,0.9)]" />
            <span className="absolute top-3/4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(34,211,238,1)]" />

            {/* Intermittent Web Sparkles */}
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 text-[9px] text-cyan-300 pointer-events-none drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]"
            >
              ✦
            </motion.span>
          </div>

          {/* --- REALISTIC UPSIDE-DOWN SPIDER-MAN --- */}
          <div className="relative flex flex-col items-center -mt-2">
            {/* Hands grasping the web strand with crimson gloves */}
            <div className="relative z-20 flex items-center gap-0.5 -mb-2">
              <div className="w-3 h-2.5 rounded-full bg-gradient-to-b from-red-600 to-red-800 border border-red-950 shadow-md transform -rotate-12" />
              <div className="w-3 h-2.5 rounded-full bg-gradient-to-b from-red-600 to-red-800 border border-red-950 shadow-md transform rotate-12" />
            </div>

            {/* Mascot Body Container */}
            <div className="relative w-16 h-22 sm:w-20 sm:h-26 flex items-center justify-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]">
              {/* If unmasked: Shows Vivek's Spider-Man Avatar with glowing holographic rim */}
              {isUnmasked ? (
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)] bg-slate-950 rotate-180 transition-transform duration-300">
                  <Image
                    src="/avatars/spiderman.jpg"
                    alt="Spider-Vivek"
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-transparent pointer-events-none" />
                </div>
              ) : (
                /* High-Definition Stylized Inverted Spider-Man Vector */
                <svg
                  viewBox="0 0 120 150"
                  className="w-full h-full overflow-visible"
                >
                  <defs>
                    {/* Glowing Lens Filter */}
                    <filter id="spideyEyeGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="0" floodColor="#ffffff" floodOpacity="0.9" stdDeviation="3" />
                      <feDropShadow dx="0" dy="0" floodColor="#38bdf8" floodOpacity="0.6" stdDeviation="6" />
                    </filter>

                    {/* Suit Gradients */}
                    <linearGradient id="suitCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="45%" stopColor="#e11d48" />
                      <stop offset="85%" stopColor="#be123c" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>

                    <linearGradient id="suitNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="50%" stopColor="#172554" />
                      <stop offset="100%" stopColor="#090d16" />
                    </linearGradient>

                    <linearGradient id="lensReflect" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="65%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#cbd5e1" />
                    </linearGradient>
                  </defs>

                  {/* --- INVERTED BENT LEGS (CLASSIC SPIDEY HANG CROUCH) --- */}
                  {/* Left Leg */}
                  <g className="transition-transform duration-300">
                    {/* Thigh (bent outward) */}
                    <path
                      d="M 42 36 C 22 22 28 6 44 14 C 52 18 56 26 52 38 Z"
                      fill="url(#suitNavy)"
                      stroke="#0f172a"
                      strokeWidth="1.5"
                    />
                    {/* Shin & Boot tucked upward */}
                    <path
                      d="M 34 16 Q 26 8 36 2 Q 44 4 42 14 Z"
                      fill="url(#suitCrimson)"
                      stroke="#881337"
                      strokeWidth="1.2"
                    />
                    {/* Boot Webbing */}
                    <path d="M 33 8 Q 38 7 40 10" stroke="#4c0519" strokeWidth="0.8" fill="none" opacity="0.6" />
                  </g>

                  {/* Right Leg */}
                  <g className="transition-transform duration-300">
                    {/* Thigh (bent outward) */}
                    <path
                      d="M 78 36 C 98 22 92 6 76 14 C 68 18 64 26 68 38 Z"
                      fill="url(#suitNavy)"
                      stroke="#0f172a"
                      strokeWidth="1.5"
                    />
                    {/* Shin & Boot tucked upward */}
                    <path
                      d="M 86 16 Q 94 8 84 2 Q 76 4 78 14 Z"
                      fill="url(#suitCrimson)"
                      stroke="#881337"
                      strokeWidth="1.2"
                    />
                    {/* Boot Webbing */}
                    <path d="M 87 8 Q 82 7 80 10" stroke="#4c0519" strokeWidth="0.8" fill="none" opacity="0.6" />
                  </g>

                  {/* --- ARMS EXTENDING UP TO HOLD WEB --- */}
                  {/* Left Arm */}
                  <path
                    d="M 44 48 C 36 34 46 16 54 8 L 57 11 C 51 18 44 32 50 48 Z"
                    fill="url(#suitCrimson)"
                    stroke="#881337"
                    strokeWidth="1.2"
                  />
                  {/* Right Arm */}
                  <path
                    d="M 76 48 C 84 34 74 16 66 8 L 63 11 C 69 18 76 32 70 48 Z"
                    fill="url(#suitCrimson)"
                    stroke="#881337"
                    strokeWidth="1.2"
                  />

                  {/* --- ATHLETIC TORSO --- */}
                  <path
                    d="M 44 36 Q 60 30 76 36 L 79 72 Q 60 78 41 72 Z"
                    fill="url(#suitCrimson)"
                    stroke="#881337"
                    strokeWidth="1.5"
                  />
                  {/* Navy Blue Torso Flanks */}
                  <path d="M 44 36 L 41 72 Q 47 67 49 50 Z" fill="url(#suitNavy)" />
                  <path d="M 76 36 L 79 72 Q 73 67 71 50 Z" fill="url(#suitNavy)" />

                  {/* Spider Chest Emblem (Inverted perspective) */}
                  <g transform="translate(60, 52) scale(0.85)">
                    <ellipse cx="0" cy="0" rx="3.5" ry="6" fill="#020617" />
                    {/* Spider Legs */}
                    <path d="M -2 -4 Q -10 -10 -13 -5" stroke="#020617" strokeWidth="1.5" fill="none" />
                    <path d="M 2 -4 Q 10 -10 13 -5" stroke="#020617" strokeWidth="1.5" fill="none" />
                    <path d="M -3 0 Q -12 -1 -15 4" stroke="#020617" strokeWidth="1.5" fill="none" />
                    <path d="M 3 0 Q 12 -1 15 4" stroke="#020617" strokeWidth="1.5" fill="none" />
                    <path d="M -3 3 Q -11 9 -13 14" stroke="#020617" strokeWidth="1.4" fill="none" />
                    <path d="M 3 3 Q 11 9 13 14" stroke="#020617" strokeWidth="1.4" fill="none" />
                    <path d="M -2 5 Q -8 13 -9 17" stroke="#020617" strokeWidth="1.3" fill="none" />
                    <path d="M 2 5 Q 8 13 9 17" stroke="#020617" strokeWidth="1.3" fill="none" />
                  </g>

                  {/* --- INVERTED SPIDER-MAN HEAD & MASK --- */}
                  <g>
                    {/* Mask Base Contour */}
                    <path
                      d="M 34 72 C 30 92 37 132 60 142 C 83 132 90 92 86 72 C 77 66 43 66 34 72 Z"
                      fill="url(#suitCrimson)"
                      stroke="#881337"
                      strokeWidth="2"
                    />

                    {/* Mask Webbing Symmetry */}
                    <path d="M 60 98 L 60 142" stroke="#4c0519" strokeWidth="1.2" opacity="0.75" />
                    <path d="M 60 98 L 38 126" stroke="#4c0519" strokeWidth="1.1" opacity="0.75" />
                    <path d="M 60 98 L 82 126" stroke="#4c0519" strokeWidth="1.1" opacity="0.75" />
                    <path d="M 60 98 L 33 96" stroke="#4c0519" strokeWidth="1.1" opacity="0.75" />
                    <path d="M 60 98 L 87 96" stroke="#4c0519" strokeWidth="1.1" opacity="0.75" />
                    <path d="M 60 98 L 40 70" stroke="#4c0519" strokeWidth="1.1" opacity="0.75" />
                    <path d="M 60 98 L 80 70" stroke="#4c0519" strokeWidth="1.1" opacity="0.75" />

                    {/* Concentric Web Arcs */}
                    <path d="M 46 86 Q 60 82 74 86" stroke="#4c0519" strokeWidth="1.1" fill="none" opacity="0.75" />
                    <path d="M 40 106 Q 60 98 80 106" stroke="#4c0519" strokeWidth="1.1" fill="none" opacity="0.75" />
                    <path d="M 45 124 Q 60 116 75 124" stroke="#4c0519" strokeWidth="1.1" fill="none" opacity="0.75" />
                  </g>

                  {/* --- EXPRESSIVE SPIDER-MAN EYES (LENSES) --- */}
                  {/* Left Lens */}
                  <g className="transition-all duration-200">
                    {/* Black Outer Bevel Frame */}
                    <path
                      d={
                        isSquinting
                          ? "M 39 96 Q 51 92 56 102 Q 48 106 39 96 Z"
                          : isHovered
                          ? "M 37 93 Q 51 86 58 103 Q 48 111 37 93 Z"
                          : "M 38 94 Q 51 88 57 103 Q 48 110 38 94 Z"
                      }
                      fill="#020617"
                      stroke="#020617"
                      strokeWidth="2.5"
                    />
                    {/* Glowing Reflective White Lens */}
                    <path
                      d={
                        isSquinting
                          ? "M 41 96 Q 50 93 54 101 Q 48 104 41 96 Z"
                          : isHovered
                          ? "M 39 94 Q 50 88 56 102 Q 48 109 39 94 Z"
                          : "M 40 95 Q 50 89 55 102 Q 48 108 40 95 Z"
                      }
                      fill="url(#lensReflect)"
                      filter="url(#spideyEyeGlow)"
                    />
                  </g>

                  {/* Right Lens */}
                  <g className="transition-all duration-200">
                    {/* Black Outer Bevel Frame */}
                    <path
                      d={
                        isSquinting
                          ? "M 81 96 Q 69 92 64 102 Q 72 106 81 96 Z"
                          : isHovered
                          ? "M 83 93 Q 69 86 62 103 Q 72 111 83 93 Z"
                          : "M 82 94 Q 69 88 63 103 Q 72 110 82 94 Z"
                      }
                      fill="#020617"
                      stroke="#020617"
                      strokeWidth="2.5"
                    />
                    {/* Glowing Reflective White Lens */}
                    <path
                      d={
                        isSquinting
                          ? "M 79 96 Q 70 93 66 101 Q 72 104 79 96 Z"
                          : isHovered
                          ? "M 81 94 Q 70 88 64 102 Q 72 109 81 94 Z"
                          : "M 80 95 Q 70 89 65 102 Q 72 108 80 95 Z"
                      }
                      fill="url(#lensReflect)"
                      filter="url(#spideyEyeGlow)"
                    />
                  </g>
                </svg>
              )}
            </div>

            {/* Quick Unmask Icon Button Badge */}
            <button
              type="button"
              onClick={toggleMask}
              title={isUnmasked ? "Put Mask Back On" : "Unmask Vivek Hingu!"}
              className="mt-1.5 px-2 py-0.5 rounded-full bg-zinc-950/90 hover:bg-red-600 text-[9px] font-mono font-bold text-white border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span>{isUnmasked ? "🎭" : "👀"}</span>
              <span>{isUnmasked ? "Mask" : "Unmask"}</span>
            </button>
          </div>

          {/* --- COMIC ACTION THWIP! WEB POP ON CLICK --- */}
          <AnimatePresence>
            {showThwip && (
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 15, rotate: -20 }}
                animate={{ scale: [0, 1.3, 1], opacity: 1, y: -25, rotate: 6 }}
                exit={{ scale: 0.5, opacity: 0, y: -45 }}
                transition={{ duration: 0.35 }}
                className="absolute -top-6 -left-14 z-50 pointer-events-none"
              >
                <div className="relative px-3 py-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-lg border-2 border-white text-white font-black text-xs tracking-wider uppercase shadow-[0_6px_20px_rgba(239,68,68,0.9)] rotate-[-8deg] flex items-center gap-1">
                  <span>🕸️ THWIP!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- COMIC SPEECH BUBBLE ON HOVER / CLICK --- */}
          <AnimatePresence>
            {(isHovered || showQuote) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 25 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 25 }}
                transition={{ duration: 0.22 }}
                className="absolute top-28 right-20 sm:right-24 z-50 w-56 sm:w-64 pointer-events-auto"
              >
                {/* Comic Speech Bubble */}
                <div className="relative rounded-2xl bg-white dark:bg-[#0c121e] border-2 border-slate-900 dark:border-cyan-400/90 p-3.5 shadow-2xl text-slate-900 dark:text-zinc-100 text-xs font-sans leading-snug">
                  {/* Bubble Pointer Arrow Tail */}
                  <div className="absolute top-6 -right-2.5 w-4 h-4 bg-white dark:bg-[#0c121e] border-t-2 border-r-2 border-slate-900 dark:border-cyan-400/90 rotate-45 transform" />

                  <div className="relative z-10 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-red-600 dark:text-cyan-400 uppercase tracking-wider font-mono">
                      <span className="flex items-center gap-1">
                        <span>🕷️</span> Spider-Mascot
                      </span>
                      <span className="text-[9px] text-slate-400 dark:text-zinc-400">Click to cycle</span>
                    </div>
                    <p className="font-semibold text-slate-800 dark:text-zinc-100 italic">
                      &ldquo;{SPIDEY_QUOTES[quoteIndex]}&rdquo;
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}