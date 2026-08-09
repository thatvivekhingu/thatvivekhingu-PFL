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

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("hasSeenIntro_3d_arc_v11") !== "true";
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
      const hasSeen = sessionStorage.getItem("hasSeenIntro_3d_arc_v11");
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

    // Index 5: 3D REAL ARC REACTOR BLINK -> SMOOTH BLUR EXIT TO DASHBOARD
    if (currentIndex === 5) {
      playTapSound("access_granted");
      timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          handleComplete();
        }, 900);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, currentIndex, questionChars, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem("hasSeenIntro_3d_arc_v11", "true");
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

  // Generate 12 Photorealistic 3D Copper Coils SVG elements with wire strands & metallic brackets
  const coilElements = Array.from({ length: 12 }).map((_, i) => {
    const angle = (360 / 12) * i;
    return (
      <g key={`coil-${i}`} transform={`rotate(${angle} 200 200)`}>
        {/* Outer Coil Metallic Bracket Base */}
        <rect
          x={180}
          y={14}
          width={40}
          height={48}
          rx={5}
          fill="url(#metalBracGrad)"
          stroke="#475569"
          strokeWidth={1.5}
        />
        {/* 3D Copper Coil Body */}
        <rect
          x={184}
          y={18}
          width={32}
          height={40}
          rx={3}
          fill="url(#copperGrad)"
          stroke="#92400e"
          strokeWidth={1.2}
        />
        {/* Specular Highlight on Copper Coil */}
        <rect
          x={186}
          y={20}
          width={4}
          height={36}
          rx={1}
          fill="#fef08a"
          opacity={0.4}
        />
        {/* Individual Copper Wires */}
        {Array.from({ length: 7 }).map((_, w) => (
          <line
            key={`wire-${i}-${w}`}
            x1={187 + w * 4}
            y1={19}
            x2={187 + w * 4}
            y2={57}
            stroke="#78350f"
            strokeWidth={1}
          />
        ))}
      </g>
    );
  });

  // Generate 28 Glowing 3D Cyan Slot Dashes
  const slotElements = Array.from({ length: 28 }).map((_, i) => {
    const angle = (360 / 28) * i;
    return (
      <rect
        key={`slot-${i}`}
        x={196.5}
        y={68}
        width={7}
        height={12}
        rx={2.5}
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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030712] text-[#F8FAFC] select-none overflow-hidden transform-gpu will-change-[opacity,filter,transform]"
        >
          {/* Cyan Anamorphic Radial Flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22)_0%,rgba(3,7,18,0)_65%)] pointer-events-none opacity-85" />
          
          {/* Suitable Dark Dot Matrix Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-[#38bdf8]/40 bg-black/80 backdrop-blur-md text-xs font-mono text-[#38bdf8] hover:text-white hover:border-[#38bdf8] hover:bg-black/95 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* Stage Container */}
          <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center min-h-[360px] text-center gap-4">
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

              {/* 3D REAL ARC REACTOR BLINK + ACCESS GRANTED BELOW */}
              {currentIndex === 5 && (
                <motion.div
                  key="clean-arc-stage"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative flex flex-col items-center space-y-3"
                >
                  {/* HUD Header Status Line */}
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#38bdf8] tracking-[0.18em] sm:tracking-[0.3em] uppercase font-bold drop-shadow-[0_0_10px_rgba(56,189,248,0.8)] text-center px-2"
                  >
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#38bdf8] animate-ping flex-shrink-0" />
                    <span>SYSTEM INITIALIZATION // NEURAL CORE MAXIMUM OUTPUT</span>
                  </motion.div>

                  {/* Photorealistic 3D Metallic Arc Reactor Graphic Wrapper */}
                  <div className="relative flex items-center justify-center">
                    {/* Dark Blurry Pulsing Ambient Halo (CSS Powered - 0 Lag) */}
                    <div className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.45)_0%,rgba(14,165,233,0.18)_45%,transparent_75%)] pointer-events-none animate-pulse blur-xl" />

                    {/* Pure High-Performance Photorealistic 3D Arc Reactor SVG */}
                    <motion.div
                      animate={
                        isTransitioning
                          ? { scale: [1, 1.3, 1.8], opacity: [1, 0.8, 0] }
                          : { scale: [0.97, 1.03, 0.97] }
                      }
                      transition={
                        isTransitioning
                          ? { duration: 0.8, ease: "easeIn" }
                          : { duration: 2.0, repeat: Infinity, ease: "easeInOut" }
                      }
                      className="relative w-56 h-56 sm:w-76 sm:h-76 drop-shadow-[0_0_40px_rgba(56,189,248,0.85)] transform-gpu will-change-transform"
                    >
                      <svg viewBox="0 0 400 400" className="w-full h-full block overflow-visible">
                        <defs>
                          {/* Outer Metal Chassis Bevel Gradient */}
                          <linearGradient id="metalOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#475569" />
                            <stop offset="30%" stopColor="#1e293b" />
                            <stop offset="70%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#334155" />
                          </linearGradient>
                          <radialGradient id="metalBevelGrad" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#64748b" />
                            <stop offset="50%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#020617" />
                          </radialGradient>
                          {/* 3D Copper Coil Metallic Gradient */}
                          <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="20%" stopColor="#f59e0b" />
                            <stop offset="60%" stopColor="#b45309" />
                            <stop offset="100%" stopColor="#78350f" />
                          </linearGradient>
                          <linearGradient id="metalBracGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="50%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#475569" />
                          </linearGradient>
                          {/* Vibrant Core Plasma Gradient */}
                          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="25%" stopColor="#bae6fd" />
                            <stop offset="55%" stopColor="#38bdf8" />
                            <stop offset="85%" stopColor="#0284c7" />
                            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                          </radialGradient>
                          {/* 3D Metallic Honeycomb Mesh Grid */}
                          <pattern
                            id="hex"
                            width="14"
                            height="12"
                            patternUnits="userSpaceOnUse"
                          >
                            <polygon
                              points="7,0 14,3.5 14,8.5 7,12 0,8.5 0,3.5"
                              fill="none"
                              stroke="#0284c7"
                              strokeWidth="1.1"
                            />
                          </pattern>
                        </defs>

                        {/* Outer 3D Metallic Chassis Housing */}
                        <circle cx="200" cy="200" r="194" fill="url(#metalBevelGrad)" stroke="#64748b" strokeWidth="2.5" />
                        <circle cx="200" cy="200" r="184" fill="#090d12" stroke="#334155" strokeWidth="2" />
                        <circle cx="200" cy="200" r="162" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" strokeDasharray="6 4" />

                        {/* 60 FPS CSS Spin 12 Photorealistic 3D Copper Coils */}
                        <g className="animate-[spin_14s_linear_infinite] origin-center transform-gpu will-change-transform" id="coilRing">
                          {coilElements}
                        </g>

                        {/* 60 FPS CSS Spin 28 Counter-Rotating Glowing Slot Dashes */}
                        <g className="animate-[spin_9s_linear_infinite_reverse] origin-center transform-gpu will-change-transform" id="slotRing">
                          {slotElements}
                        </g>

                        {/* 3D Concentric Neon Blue Glass Rings */}
                        <circle cx="200" cy="200" r="106" fill="none" stroke="#38bdf8" strokeWidth="3.5" opacity="0.75" />
                        <circle cx="200" cy="200" r="84" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.85" />
                        <circle cx="200" cy="200" r="60" fill="none" stroke="#38bdf8" strokeWidth="2.5" opacity="0.95" />

                        {/* 3D Vibranium Core with Honeycomb Grid & Central Glowing Plasma Orb */}
                        <circle cx="200" cy="200" r="54" fill="url(#coreGlow)" />
                        <circle cx="200" cy="200" r="46" fill="#081014" stroke="#334155" strokeWidth="2" />
                        <circle cx="200" cy="200" r="42" fill="url(#hex)" />
                        <circle cx="200" cy="200" r="42" fill="url(#coreGlow)" opacity="0.5" />
                        <circle cx="200" cy="200" r="22" fill="#ffffff" className="animate-pulse shadow-[0_0_20px_#ffffff]" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* ACCESS GRANTED BADGE PLACED DIRECTLY BELOW ARC REACTOR */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="z-10 relative mt-2 px-5 sm:px-14 py-3 sm:py-4 rounded-2xl bg-[#081014]/90 border-2 border-[#38bdf8]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(56,189,248,0.5)] text-center max-w-[92vw] sm:max-w-none"
                  >
                    {/* Futuristic Corner Brackets */}
                    <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#38bdf8]" />
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#38bdf8]" />
                    <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#38bdf8]" />
                    <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#38bdf8]" />

                    {/* ACCESS GRANTED Main Bold Header */}
                    <span className="font-mono text-2xl sm:text-4xl font-black tracking-[0.35em] bg-gradient-to-r from-cyan-300 via-white to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.95)] uppercase block">
                      ACCESS GRANTED
                    </span>

                    {/* Vivek Hingu Subtitle */}
                    <span className="mt-1.5 block font-mono text-[10px] sm:text-xs text-[#38bdf8] tracking-[0.3em] uppercase font-extrabold">
                      VIVEK HINGU // PORTFOLIO UNLOCKED
                    </span>
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
