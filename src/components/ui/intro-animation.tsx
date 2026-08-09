"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

interface IntroCardItem {
  id: string;
  text?: string;
  title?: string;
  sub?: string;
  isQuestion?: boolean;
  isGranted?: boolean;
}

const INTRO_CARDS: IntroCardItem[] = [
  { id: "q", text: "> Who am I?", isQuestion: true },
  { id: "aiml", title: "AI/ML Engineer", sub: "Autonomous Systems & Neural Models" },
  { id: "creator", title: "Content Creator", sub: "Sharing Tech & AI Knowledge" },
  { id: "hackathon", title: "Hackathon Addict", sub: "Building Intelligent Software Under Pressure" },
  { id: "explorer", title: "Tech Explorer", sub: "Pushing the Frontiers of Innovation" },
  { id: "granted", title: "ACCESS GRANTED.", isGranted: true },
];

const INTRO_STORAGE_KEY = "hasSeenIntro_v18_css_spin_guaranteed";

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem(INTRO_STORAGE_KEY) !== "true";
      } catch {
        return true;
      }
    }
    return true;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionChars, setQuestionChars] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem(INTRO_STORAGE_KEY);
      if (hasSeen === "true") {
        setShouldShow(false);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);




  // Timeline Engine (Starts IMMEDIATELY at millisecond 0)
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    let timer: NodeJS.Timeout;

    // Index 0: Typing out "> Who am I?"
    if (currentIndex === 0) {
      const qText = INTRO_CARDS[0]?.text ?? "> Who am I?";
      if (questionChars < qText.length) {
        timer = setTimeout(() => {
          setQuestionChars((prev) => prev + 1);
          playTapSound("hover");
        }, 45);
      } else {
        timer = setTimeout(() => {
          setCurrentIndex(1);
          playTapSound("pop");
        }, 600);
      }
      return () => clearTimeout(timer);
    }

    // Index 1 to 4: Single line role cards (1.2s display per card)
    if (currentIndex >= 1 && currentIndex <= 4) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        playTapSound("pop");
      }, 1200);
      return () => clearTimeout(timer);
    }

    // Index 5: REAL HARDWARE ARC REACTOR -> ACCESS GRANTED -> EXIT
    if (currentIndex === 5) {
      playTapSound("access_granted");
      timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          handleComplete();
        }, 900);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, currentIndex, questionChars, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
    setIsComplete(true);
  };


  const handleSkip = () => {
    playTapSound("pop");
    handleComplete();
  };

  if (!shouldShow || isComplete) return null;

  const activeCard = INTRO_CARDS[currentIndex] ?? INTRO_CARDS[0];
  const questionText = (INTRO_CARDS[0]?.text ?? "> Who am I?").slice(0, questionChars);

  // Generate 10 Photorealistic 3D Copper Hardware Wire Coils with Metallic Brackets & Highlights
  const copperCoilBlocks = Array.from({ length: 10 }).map((_, i) => {
    const angle = (360 / 10) * i;
    return (
      <g key={`copper-coil-${i}`} transform={`rotate(${angle} 200 200)`}>
        {/* Metal Mount Bracket Base */}
        <rect
          x={176}
          y={12}
          width={48}
          height={52}
          rx={6}
          fill="url(#metalBracketGrad)"
          stroke="#475569"
          strokeWidth={1.5}
        />

        {/* Outer Steel Clamp Ends */}
        <rect x={174} y={14} width={52} height={10} rx={2} fill="url(#metalBevelGrad)" stroke="#64748b" strokeWidth={1} />
        <rect x={174} y={52} width={52} height={10} rx={2} fill="url(#metalBevelGrad)" stroke="#64748b" strokeWidth={1} />

        {/* 3D Copper Wire Winding Block */}
        <rect x={180} y={22} width={40} height={32} rx={4} fill="url(#copperWireGrad)" stroke="#78350f" strokeWidth={1.2} />

        {/* Individual Wound Copper Wire Ribs */}
        {Array.from({ length: 9 }).map((_, w) => (
          <line
            key={`wire-rib-${i}-${w}`}
            x1={183 + w * 4}
            y1={23}
            x2={183 + w * 4}
            y2={53}
            stroke="#451a03"
            strokeWidth={1.2}
          />
        ))}

        {/* Specular Light Reflection Streak on Copper Wire */}
        <rect x={185} y={23} width={5} height={30} rx={1} fill="#fef08a" opacity={0.5} />
      </g>
    );
  });

  // Generate 20 Outer Steel Screw Rivets around Chassis
  const screwRivets = Array.from({ length: 20 }).map((_, i) => {
    const angle = (360 / 20) * i;
    return (
      <g key={`screw-${i}`} transform={`rotate(${angle} 200 200)`}>
        <circle cx="200" cy="8" r="3.5" fill="#334155" stroke="#94a3b8" strokeWidth="0.8" />
        <line x1="198" y1="8" x2="202" y2="8" stroke="#1e293b" strokeWidth="0.8" />
      </g>
    );
  });

  // Generate 30 Glowing LED Slots
  const slotNodes = Array.from({ length: 30 }).map((_, i) => {
    const angle = (360 / 30) * i;
    return (
      <rect
        key={`slot-node-${i}`}
        x={197}
        y={68}
        width={6}
        height={10}
        rx={2}
        fill="#38bdf8"
        stroke="#e0f2fe"
        strokeWidth={0.8}
        opacity={0.9}
        transform={`rotate(${angle} 200 200)`}
      />
    );
  });

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="intro-viewport"
          initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          animate={
            isTransitioning
              ? {
                  opacity: 0,
                  filter: "blur(28px)",
                  scale: 1.08,
                }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                }
          }
          exit={{ opacity: 0, filter: "blur(30px)" }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020617] text-[#F8FAFC] select-none overflow-hidden transform-gpu will-change-[opacity,filter,transform]"
        >
          <style>{`
            @keyframes spinCoils {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes spinLedSlots {
              0% { transform: rotate(360deg); }
              100% { transform: rotate(0deg); }
            }
            .arc-spin-coils {
              animation: spinCoils 10s linear infinite !important;
              transform-origin: 200px 200px !important;
            }
            .arc-spin-slots {
              animation: spinLedSlots 6s linear infinite !important;
              transform-origin: 200px 200px !important;
            }
          `}</style>
          {/* Cyan Anamorphic Radial Ambient Energy Glow */}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.25)_0%,rgba(2,6,23,0)_68%)] pointer-events-none opacity-90" />
          
          {/* High Tech Cyber Dot Matrix Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-[#38bdf8]/40 bg-black/80 backdrop-blur-md text-xs font-mono text-[#38bdf8] hover:text-white hover:border-[#38bdf8] hover:bg-black/95 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* Main Stage Container */}
          <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center min-h-[380px] text-center">
            <AnimatePresence mode="wait">
              {/* Question Phase */}
              {currentIndex === 0 && (
                <motion.div
                  key="question-card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center text-2xl sm:text-4xl font-mono text-[#38bdf8] font-bold tracking-wider"
                >
                  <span>{questionText}</span>
                  <span className="inline-block w-3 h-7 sm:h-9 ml-2.5 bg-[#38bdf8] animate-pulse shadow-[0_0_15px_rgba(56,189,248,0.9)]" />
                </motion.div>
              )}

              {/* Single Line Role Cards */}
              {currentIndex >= 1 && currentIndex <= 4 && (
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, y: 25, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -25, scale: 1.06 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center space-y-3"
                >
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-100 drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]">
                    {activeCard.title ?? ""}
                  </h2>
                  <p className="text-xs sm:text-base font-mono text-[#38bdf8]/90 tracking-widest uppercase">
                    — {activeCard.sub ?? ""} —
                  </p>
                </motion.div>
              )}

              {/* PHOTOREALISTIC HARDWARE ARC REACTOR + CLEAN ACCESS GRANTED TEXT */}
              {currentIndex === 5 && (
                <motion.div
                  key="real-hardware-arc-stage"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative flex flex-col items-center"
                >
                  {/* Photorealistic 3D Metallic Arc Reactor Graphic Wrapper */}
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing Core Energy Halo Background */}
                    <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.5)_0%,rgba(14,165,233,0.2)_45%,transparent_75%)] pointer-events-none animate-pulse blur-2xl" />

                    {/* Photorealistic 3D Arc Reactor Hardware SVG */}
                    <motion.div
                      animate={
                        isTransitioning
                          ? { scale: [1, 1.35, 1.9], opacity: [1, 0.8, 0], rotate: 360 }
                          : { scale: [0.98, 1.02, 0.98], rotate: [0, 360] }
                      }
                      transition={
                        isTransitioning
                          ? { duration: 0.8, ease: "easeIn" }
                          : {
                              scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                            }
                      }
                      className="relative w-64 h-64 sm:w-84 sm:h-84 drop-shadow-[0_0_50px_rgba(56,189,248,0.9)] transform-gpu will-change-transform"
                    >
                      <svg viewBox="0 0 400 400" className="w-full h-full block overflow-visible">


                        <defs>
                          {/* Outer Heavy Steel Chassis Metallic Gradients */}
                          <radialGradient id="metalBevelGrad" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#94a3b8" />
                            <stop offset="35%" stopColor="#334155" />
                            <stop offset="75%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#020617" />
                          </radialGradient>
                          <linearGradient id="metalBracketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#64748b" />
                            <stop offset="40%" stopColor="#1e293b" />
                            <stop offset="80%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#475569" />
                          </linearGradient>
                          {/* Photorealistic 3D Copper Wire Metallic Gradient */}
                          <linearGradient id="copperWireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="25%" stopColor="#f59e0b" />
                            <stop offset="65%" stopColor="#b45309" />
                            <stop offset="100%" stopColor="#78350f" />
                          </linearGradient>
                          {/* Vibrant Energy Plasma Glow */}
                          <radialGradient id="vibraniumCoreGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="25%" stopColor="#e0f2fe" />
                            <stop offset="50%" stopColor="#38bdf8" />
                            <stop offset="80%" stopColor="#0284c7" />
                            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                          </radialGradient>
                          {/* 3D Metallic Honeycomb Grid */}
                          <pattern
                            id="vibraniumHex"
                            width="14"
                            height="12"
                            patternUnits="userSpaceOnUse"
                          >
                            <polygon
                              points="7,0 14,3.5 14,8.5 7,12 0,8.5 0,3.5"
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="1.1"
                            />
                          </pattern>
                        </defs>

                        {/* Outer Hardware Steel Chassis Ring */}
                        <circle cx="200" cy="200" r="196" fill="url(#metalBevelGrad)" stroke="#64748b" strokeWidth="3" />
                        <circle cx="200" cy="200" r="184" fill="#090d14" stroke="#334155" strokeWidth="2.5" />
                        
                        {/* Outer Chassis Screws */}
                        <g id="screwRivetsGroup">{screwRivets}</g>

                        <circle cx="200" cy="200" r="164" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.65" strokeDasharray="8 5" />

                        {/* 10 Photorealistic 3D Copper Wire Hardware Coils (Rotates smoothly 360 degrees) */}
                        <g className="arc-spin-coils" id="hardwareCopperRing">
                          {copperCoilBlocks}
                        </g>

                        {/* 30 Counter-Rotating LED Slots */}
                        <g className="arc-spin-slots" id="hardwareLedRing">
                          {slotNodes}
                        </g>


                        {/* 3D Concentric Neon Glass Lens Rings */}
                        <circle cx="200" cy="200" r="106" fill="none" stroke="#38bdf8" strokeWidth="3.5" opacity="0.8" />
                        <circle cx="200" cy="200" r="82" fill="none" stroke="#e0f2fe" strokeWidth="2.5" opacity="0.9" />
                        <circle cx="200" cy="200" r="60" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.95" />

                        {/* Center Vibranium Plasma Core with Glass Reflection */}
                        <circle cx="200" cy="200" r="54" fill="url(#vibraniumCoreGlow)" />
                        <circle cx="200" cy="200" r="46" fill="#081014" stroke="#334155" strokeWidth="2" />
                        <circle cx="200" cy="200" r="42" fill="url(#vibraniumHex)" />
                        <circle cx="200" cy="200" r="42" fill="url(#vibraniumCoreGlow)" opacity="0.55" />

                        {/* Specular Curved Glass Lens Highlight */}
                        <path
                          d="M 165 170 A 40 40 0 0 1 235 170"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="3"
                          strokeLinecap="round"
                          opacity="0.75"
                        />

                        {/* Central Plasma Energy Orb */}
                        <circle cx="200" cy="200" r="22" fill="#ffffff" className="animate-pulse shadow-[0_0_25px_#ffffff]" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* CLEAN SLEEK ACCESS GRANTED TEXT (NO BULKY BOX OUTLINE) */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-6 flex flex-col items-center text-center gap-1.5"
                  >
                    <h2 className="font-mono text-3xl sm:text-5xl font-black tracking-[0.3em] bg-gradient-to-r from-cyan-300 via-white to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.95)] uppercase">
                      ACCESS GRANTED
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-[#38bdf8] tracking-[0.35em] uppercase font-bold opacity-90">
                      VIVEK HINGU // PORTFOLIO UNLOCKED
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
