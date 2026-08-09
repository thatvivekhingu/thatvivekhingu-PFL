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
        return sessionStorage.getItem("hasSeenIntro_4dx_v3") !== "true";
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
      const hasSeen = sessionStorage.getItem("hasSeenIntro_4dx_v3");
      if (hasSeen === "true") {
        setShouldShow(false);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  // Timeline Engine
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
        }, 60);
      } else {
        timer = setTimeout(() => {
          setCurrentIndex(1);
          playTapSound("pop");
        }, 700);
      }
      return () => clearTimeout(timer);
    }

    // Index 1 to 4: Single line role cards (1.4s display per card)
    if (currentIndex >= 1 && currentIndex <= 4) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        playTapSound("pop");
      }, 1400);
      return () => clearTimeout(timer);
    }

    // Index 5: STARK ARC REACTOR // ACCESS GRANTED (2.6s hold)
    if (currentIndex === 5) {
      playTapSound("access_granted");
      timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          handleComplete();
        }, 1000);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, currentIndex, questionChars, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem("hasSeenIntro_4dx_v3", "true");
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

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="intro-viewport"
          initial={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }}
          animate={
            isTransitioning
              ? {
                  opacity: [1, 1, 0],
                  clipPath: "circle(0% at 50% 50%)",
                }
              : {
                  opacity: 1,
                  clipPath: "circle(150% at 50% 50%)",
                }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-[#F8FAFC] select-none overflow-hidden"
        >
          {/* Stark HUD Anamorphic Background Flares */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-r from-cyan-500/20 via-sky-400/15 to-indigo-500/20 rounded-full blur-[120px] pointer-events-none opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-cyan-500/40 bg-black/80 backdrop-blur-md text-xs font-mono text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-black/95 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* Stage Container */}
          <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center min-h-[320px] text-center">
            <AnimatePresence mode="wait">
              {/* Question Phase */}
              {currentIndex === 0 && (
                <motion.div
                  key="question-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center text-2xl sm:text-4xl font-mono text-cyan-400 font-bold tracking-wider"
                >
                  <span>{questionText}</span>
                  <span className="inline-block w-3 h-7 sm:h-9 ml-2.5 bg-cyan-400 animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.9)]" />
                </motion.div>
              )}

              {/* Single Line Role Cards */}
              {currentIndex >= 1 && currentIndex <= 4 && (
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, y: 35, scale: 0.92, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -35, scale: 1.08, filter: "blur(12px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center space-y-4"
                >
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-100 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                    {activeCard.title ?? ""}
                  </h2>
                  <p className="text-xs sm:text-base font-mono text-cyan-400/90 tracking-widest uppercase">
                    — {activeCard.sub ?? ""} —
                  </p>
                </motion.div>
              )}

              {/* Authentic Iron Man Arc Reactor + ACCESS GRANTED Stage */}
              {currentIndex === 5 && (
                <motion.div
                  key="arc-reactor-card"
                  initial={{ opacity: 0, scale: 0.75, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center space-y-4"
                >
                  {/* Authentic Arc Reactor Glowing Core SVG */}
                  <div className="relative mb-1 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-2xl animate-pulse" />
                    <motion.svg
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.95, 1.05, 0.95] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      viewBox="0 0 200 200"
                      className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-[0_0_30px_rgba(56,189,248,0.95)]"
                    >
                      {/* Outer Counter-Rotating Segmented HUD Rings */}
                      <circle
                        cx="100"
                        cy="100"
                        r="88"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="4"
                        strokeDasharray="14 8"
                        className="animate-[spin_14s_linear_infinite]"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="76"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3"
                        strokeDasharray="4 10"
                        className="animate-[spin_9s_linear_infinite_reverse]"
                      />

                      {/* 10 Arc Reactor Energy Coils */}
                      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
                        <rect
                          key={deg}
                          x="95"
                          y="18"
                          width="10"
                          height="22"
                          rx="2"
                          fill="#38bdf8"
                          transform={`rotate(${deg} 100 100)`}
                          className="opacity-95"
                        />
                      ))}

                      {/* Inner Ring */}
                      <circle
                        cx="100"
                        cy="100"
                        r="46"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="5"
                      />

                      {/* Arc Reactor Triangular Vibranium Core */}
                      <polygon
                        points="100,62 132,118 68,118"
                        fill="none"
                        stroke="#f0f9ff"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />

                      {/* Center Power Gem */}
                      <circle
                        cx="100"
                        cy="100"
                        r="16"
                        fill="#ffffff"
                        className="drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
                      />
                    </motion.svg>
                  </div>

                  {/* Stark Clearance Status Line */}
                  <div className="z-10 flex items-center gap-2 font-mono text-[11px] sm:text-xs text-cyan-300 tracking-[0.3em] uppercase font-bold">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>STARK INDUSTRIES // ARC REACTOR ONLINE</span>
                  </div>

                  {/* Metallic Hologram Badge */}
                  <div className="z-10 relative px-8 sm:px-14 py-4 sm:py-5 rounded-2xl bg-black/90 border-2 border-cyan-400/90 backdrop-blur-2xl shadow-[0_0_80px_rgba(34,211,238,0.75)] text-center">
                    {/* Futuristic Corner Brackets */}
                    <div className="absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-300" />
                    <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-300" />
                    <div className="absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-300" />
                    <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-300" />

                    {/* ACCESS GRANTED Bold Gradient Header */}
                    <span className="font-mono text-2xl sm:text-4xl font-black tracking-[0.35em] bg-gradient-to-r from-cyan-300 via-white to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.95)] uppercase block">
                      ACCESS GRANTED
                    </span>

                    {/* Commander Subtitle */}
                    <span className="mt-2 block font-mono text-[10px] sm:text-xs text-amber-300 tracking-[0.3em] uppercase font-extrabold">
                      WELCOME COMMANDER VIVEK HINGU
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stark Repulsor Blast Iris Exit Pulse */}
          {isTransitioning && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 10, 30], opacity: [0, 0.95, 0] }}
              transition={{ duration: 1.0, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-300 to-amber-300 shadow-[0_0_120px_rgba(56,189,248,1)] pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
