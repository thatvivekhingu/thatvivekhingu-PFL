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
        return sessionStorage.getItem("hasSeenIntro_blur_transition_v10") !== "true";
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
      const hasSeen = sessionStorage.getItem("hasSeenIntro_blur_transition_v10");
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

    // Index 5: DARK BLURRY ARC REACTOR BLINK -> SMOOTH BLUR EXIT TO DASHBOARD
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
      sessionStorage.setItem("hasSeenIntro_blur_transition_v10", "true");
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

  // Generate 12 Copper Coils (Lightweight clean SVG)
  const coilElements = Array.from({ length: 12 }).map((_, i) => {
    const angle = (360 / 12) * i;
    return (
      <rect
        key={`coil-${i}`}
        x={185}
        y={18}
        width={30}
        height={42}
        rx={3}
        fill="#c9773f"
        stroke="#5c3a1a"
        strokeWidth={1.5}
        transform={`rotate(${angle} 200 200)`}
      />
    );
  });

  // Generate 28 Glowing Slot Dashes
  const slotElements = Array.from({ length: 28 }).map((_, i) => {
    const angle = (360 / 28) * i;
    return (
      <rect
        key={`slot-${i}`}
        x={197}
        y={72}
        width={6}
        height={10}
        rx={2}
        fill="#5fe0ff"
        opacity={0.85}
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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05070a] text-[#F8FAFC] select-none overflow-hidden transform-gpu will-change-[opacity,filter,transform]"
        >
          {/* Cyan Anamorphic Radial Flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(95,224,255,0.18)_0%,rgba(5,7,10,0)_65%)] pointer-events-none opacity-80" />
          
          {/* Dotted Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-[#5fe0ff]/40 bg-black/80 backdrop-blur-md text-xs font-mono text-[#5fe0ff] hover:text-white hover:border-[#5fe0ff] hover:bg-black/95 transition-all duration-300 shadow-2xl cursor-pointer"
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
                  className="flex items-center text-2xl sm:text-4xl font-mono text-[#5fe0ff] font-bold tracking-wider"
                >
                  <span>{questionText}</span>
                  <span className="inline-block w-3 h-7 sm:h-9 ml-2.5 bg-[#5fe0ff] animate-pulse shadow-[0_0_12px_rgba(95,224,255,0.9)]" />
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
                  <p className="text-xs sm:text-base font-mono text-[#5fe0ff]/90 tracking-widest uppercase">
                    — {activeCard.sub ?? ""} —
                  </p>
                </motion.div>
              )}

              {/* ARC REACTOR SVG BLINK + ACCESS GRANTED BELOW */}
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
                    className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#5fe0ff] tracking-[0.18em] sm:tracking-[0.3em] uppercase font-bold drop-shadow-[0_0_10px_rgba(95,224,255,0.8)] text-center px-2"
                  >
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#5fe0ff] animate-ping flex-shrink-0" />
                    <span>SYSTEM INITIALIZATION // NEURAL CORE MAXIMUM OUTPUT</span>
                  </motion.div>

                  {/* Lightweight Zero-Lag Arc Reactor Graphic Wrapper */}
                  <div className="relative flex items-center justify-center">
                    {/* Dark Blurry Pulsing Ambient Halo (CSS Powered - 0 Lag) */}
                    <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-[radial-gradient(circle,rgba(95,224,255,0.35)_0%,rgba(56,189,248,0.15)_45%,transparent_75%)] pointer-events-none animate-pulse blur-xl" />

                    {/* Pure High-Performance Lightweight Arc Reactor SVG */}
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
                      className="relative w-52 h-52 sm:w-72 sm:h-72 drop-shadow-[0_0_35px_rgba(95,224,255,0.8)] transform-gpu will-change-transform"
                    >
                      <svg viewBox="0 0 400 400" className="w-full h-full block overflow-visible">
                        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="50%" stopColor="#8fefff" />
                          <stop offset="100%" stopColor="#0f4a5c" stopOpacity="0" />
                        </radialGradient>
                        <pattern
                          id="hex"
                          width="14"
                          height="12"
                          patternUnits="userSpaceOnUse"
                        >
                          <polygon
                            points="7,0 14,3.5 14,8.5 7,12 0,8.5 0,3.5"
                            fill="none"
                            stroke="#1c5b6e"
                            strokeWidth="0.8"
                          />
                        </pattern>

                        {/* Outer metal housing */}
                        <circle cx="200" cy="200" r="192" fill="#0a0d10" stroke="#3a4048" strokeWidth="2" />
                        <circle cx="200" cy="200" r="184" fill="#12161a" stroke="#4a525c" strokeWidth="1.5" />

                        {/* 60 FPS CSS Spin Rotating copper coil ring */}
                        <g className="animate-[spin_12s_linear_infinite] origin-center transform-gpu will-change-transform" id="coilRing">
                          {coilElements}
                        </g>

                        {/* 60 FPS CSS Spin Counter-rotating slot ring */}
                        <g className="animate-[spin_8s_linear_infinite_reverse] origin-center transform-gpu will-change-transform" id="slotRing">
                          {slotElements}
                        </g>

                        {/* Concentric cyan glow rings */}
                        <circle cx="200" cy="200" r="105" fill="none" stroke="#5fe0ff" strokeWidth="3" opacity="0.65" />
                        <circle cx="200" cy="200" r="82" fill="none" stroke="#5fe0ff" strokeWidth="2.5" opacity="0.8" />
                        <circle cx="200" cy="200" r="58" fill="none" stroke="#5fe0ff" strokeWidth="2" opacity="0.95" />

                        {/* Inner Core */}
                        <circle cx="200" cy="200" r="52" fill="url(#coreGlow)" />
                        <circle cx="200" cy="200" r="44" fill="#081014" stroke="#2a3238" strokeWidth="2" />
                        <circle cx="200" cy="200" r="40" fill="url(#hex)" />
                        <circle cx="200" cy="200" r="40" fill="url(#coreGlow)" opacity="0.45" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* ACCESS GRANTED BADGE PLACED DIRECTLY BELOW ARC REACTOR */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="z-10 relative mt-2 px-5 sm:px-14 py-3 sm:py-4 rounded-2xl bg-[#081014]/90 border-2 border-[#5fe0ff]/80 backdrop-blur-2xl shadow-[0_0_50px_rgba(95,224,255,0.5)] text-center max-w-[92vw] sm:max-w-none"
                  >
                    {/* Futuristic Corner Brackets */}
                    <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#5fe0ff]" />
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#5fe0ff]" />
                    <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#5fe0ff]" />
                    <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#5fe0ff]" />

                    {/* ACCESS GRANTED Main Bold Header */}
                    <span className="font-mono text-2xl sm:text-4xl font-black tracking-[0.35em] bg-gradient-to-r from-cyan-300 via-white to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(95,224,255,0.95)] uppercase block">
                      ACCESS GRANTED
                    </span>

                    {/* Vivek Hingu Subtitle */}
                    <span className="mt-1.5 block font-mono text-[10px] sm:text-xs text-[#5fe0ff] tracking-[0.3em] uppercase font-extrabold">
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
