"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
        return sessionStorage.getItem("hasSeenIntro_unique_arc_v5") !== "true";
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

  const coilRingRef = useRef<SVGGElement | null>(null);
  const slotRingRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hasSeenIntro_unique_arc_v5");
      if (hasSeen === "true") {
        setShouldShow(false);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  // Continuous spin for copper coil & slot ring
  useEffect(() => {
    let animId: number;
    let a1 = 0;
    let a2 = 0;

    const spin = () => {
      a1 = (a1 + 0.12) % 360;
      a2 = (a2 - 0.18 + 360) % 360;
      if (coilRingRef.current) {
        coilRingRef.current.setAttribute("transform", `rotate(${a1} 200 200)`);
      }
      if (slotRingRef.current) {
        slotRingRef.current.setAttribute("transform", `rotate(${a2} 200 200)`);
      }
      animId = requestAnimationFrame(spin);
    };

    animId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animId);
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

    // Index 5: UNIQUE ARC REACTOR BLINK & REPULSOR BLAST
    if (currentIndex === 5) {
      playTapSound("access_granted");
      timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          handleComplete();
        }, 1100);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, currentIndex, questionChars, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem("hasSeenIntro_unique_arc_v5", "true");
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

  // Generate 12 Copper Coils SVG elements
  const coilElements = Array.from({ length: 12 }).map((_, i) => {
    const angle = (360 / 12) * i;
    return (
      <g key={`coil-${i}`} transform={`rotate(${angle} 200 200)`}>
        <rect
          x={183}
          y={17}
          width={34}
          height={46}
          rx={4}
          fill="#b9702f"
          stroke="#5c3a1a"
          strokeWidth={1.5}
        />
        {Array.from({ length: 6 }).map((_, w) => (
          <line
            key={`wire-${i}-${w}`}
            x1={186 + w * 5}
            y1={19}
            x2={186 + w * 5}
            y2={59}
            stroke="#7a4a24"
            strokeWidth={1}
          />
        ))}
      </g>
    );
  });

  // Generate 28 Glowing Slot Dashes
  const slotElements = Array.from({ length: 28 }).map((_, i) => {
    const angle = (360 / 28) * i;
    return (
      <rect
        key={`slot-${i}`}
        x={196.5}
        y={72}
        width={7}
        height={10}
        rx={3}
        fill="#5fe0ff"
        opacity={0.8}
        transform={`rotate(${angle} 200 200)`}
      />
    );
  });

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
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05070a] text-[#F8FAFC] select-none overflow-hidden"
        >
          {/* Cyan Anamorphic Radial Flare & Scanlines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(95,224,255,0.15)_0%,rgba(5,7,10,0)_60%)] pointer-events-none opacity-80" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.015)_0px,rgba(255,255,255,0.015)_1px,transparent_1px,transparent_3px)] pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-[#5fe0ff]/40 bg-black/80 backdrop-blur-md text-xs font-mono text-[#5fe0ff] hover:text-white hover:border-[#5fe0ff] hover:bg-black/95 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* Stage Container */}
          <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center min-h-[360px] text-center gap-6">
            <AnimatePresence mode="wait">
              {/* Question Phase */}
              {currentIndex === 0 && (
                <motion.div
                  key="question-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center text-2xl sm:text-4xl font-mono text-[#5fe0ff] font-bold tracking-wider"
                >
                  <span>{questionText}</span>
                  <span className="inline-block w-3 h-7 sm:h-9 ml-2.5 bg-[#5fe0ff] animate-pulse shadow-[0_0_15px_rgba(95,224,255,0.9)]" />
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
                  <p className="text-xs sm:text-base font-mono text-[#5fe0ff]/90 tracking-widest uppercase">
                    — {activeCard.sub ?? ""} —
                  </p>
                </motion.div>
              )}

              {/* UNIQUE BLINKING ARC REACTOR & PORTFOLIO ENTRANCE */}
              {currentIndex === 5 && (
                <motion.div
                  key="unique-arc-stage"
                  initial={{ opacity: 0, scale: 0.6, filter: "blur(14px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                  className="relative flex flex-col items-center space-y-5"
                >
                  {/* HUD Header Status Line */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-[#5fe0ff] tracking-[0.3em] uppercase font-bold drop-shadow-[0_0_12px_rgba(95,224,255,0.8)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#5fe0ff] animate-ping" />
                    <span>SYSTEM INITIALIZATION // NEURAL CORE ONLINE</span>
                  </motion.div>

                  {/* Arc Reactor Graphic Wrapper */}
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing Ambient Halo */}
                    <motion.div
                      animate={{
                        scale: [0.92, 1.08, 0.92],
                        opacity: [0.4, 0.85, 0.4],
                      }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full bg-[radial-gradient(circle,rgba(95,224,255,0.35)_0%,rgba(95,224,255,0.1)_40%,transparent_70%)] pointer-events-none filter blur-md"
                    />

                    {/* Arc Reactor SVG & Real Image Overlay */}
                    <motion.div
                      animate={
                        isTransitioning
                          ? { scale: [1, 1.6, 2.8], filter: "brightness(4)" }
                          : { scale: [0.96, 1.04, 0.96] }
                      }
                      transition={
                        isTransitioning
                          ? { duration: 0.8, ease: "easeIn" }
                          : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                      }
                      className="relative w-64 h-64 sm:w-80 sm:h-80 drop-shadow-[0_0_50px_rgba(95,224,255,0.9)]"
                    >
                      <svg viewBox="0 0 400 400" className="w-full h-full block overflow-visible">
                        <defs>
                          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="4" result="b" />
                            <feMerge>
                              <feMergeNode in="b" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="45%" stopColor="#8fefff" />
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
                          <path id="topArc" d="M 60,200 A 140,140 0 1,1 340,200" fill="none" />
                        </defs>

                        {/* Outer metal housing */}
                        <circle cx="200" cy="200" r="192" fill="#0a0d10" stroke="#3a4048" strokeWidth="2" />
                        <circle cx="200" cy="200" r="184" fill="#12161a" stroke="#4a525c" strokeWidth="1.5" />

                        {/* Rotating copper coil ring */}
                        <g ref={coilRingRef} id="coilRing">
                          {coilElements}
                        </g>

                        {/* Counter-rotating slot ring */}
                        <g ref={slotRingRef} id="slotRing">
                          {slotElements}
                        </g>

                        {/* Concentric cyan glow rings */}
                        <circle cx="200" cy="200" r="105" fill="none" stroke="#5fe0ff" strokeWidth="3" opacity="0.6" filter="url(#glow)" />
                        <circle cx="200" cy="200" r="82" fill="none" stroke="#5fe0ff" strokeWidth="2.5" opacity="0.75" filter="url(#glow)" />
                        <circle cx="200" cy="200" r="58" fill="none" stroke="#5fe0ff" strokeWidth="2" opacity="0.9" filter="url(#glow)" />

                        {/* Core */}
                        <circle cx="200" cy="200" r="52" fill="url(#coreGlow)" />
                        <circle cx="200" cy="200" r="44" fill="#081014" stroke="#2a3238" strokeWidth="2" />
                        <circle cx="200" cy="200" r="40" fill="url(#hex)" />
                        <circle cx="200" cy="200" r="40" fill="url(#coreGlow)" opacity="0.35" />

                        {/* Curved VIVEK HINGU // ACCESS GRANTED text on topArc */}
                        <g filter="url(#glow)">
                          <text
                            fontFamily="Orbitron, sans-serif"
                            fontWeight="700"
                            fontSize="17"
                            letterSpacing="5"
                            fill="#5fe0ff"
                          >
                            <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                              VIVEK HINGU // ACCESS GRANTED
                            </textPath>
                          </text>
                        </g>
                      </svg>

                      {/* Real Arc Reactor Center Image Overlay */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#5fe0ff]/80 shadow-[0_0_25px_rgba(95,224,255,0.9)]">
                        <Image
                          src="/logo/arc-reactor-top.jpg"
                          alt="Real Arc Reactor"
                          fill
                          className="object-cover rounded-full"
                          priority
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Repulsor Beam Light Blast Explosion to Open Dashboard */}
          {isTransitioning && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 10, 45], opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#5fe0ff_30%,rgba(95,224,255,0.6)_60%,transparent_80%)] shadow-[0_0_180px_rgba(95,224,255,1)] pointer-events-none z-[100000]"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
