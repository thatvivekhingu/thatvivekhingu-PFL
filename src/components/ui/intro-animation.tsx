"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("hasSeenIntro_exosuit_v1") !== "true";
      } catch {
        return true;
      }
    }
    return true;
  });

  // Time-driven animation phase: 0 (0-1.5s dark chest), 1 (1.5-3s approaching core), 2 (3-4s mechanical locking), 3 (4-5s energy pulse & access granted), 4 (5-10s transition to portfolio)
  const [phase, setPhase] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hasSeenIntro_exosuit_v1");
      if (hasSeen === "true") {
        setShouldShow(false);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  // 10-Second Precise Cinematic Exosuit Sequence Timeline
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    // 0 -> 1.5s: Dark futuristic suit chest close-up
    const t1 = setTimeout(() => {
      setPhase(1); // Energy core appears floating in front
      playTapSound("hover");
    }, 1500);

    // 1.5s -> 3.0s: Energy core moves into chest alignment
    const t2 = setTimeout(() => {
      setPhase(2); // Mechanical chest armor opens & locks core
      playTapSound("pop");
    }, 3000);

    // 3.0s -> 4.0s: Locking mechanisms engage & core activates
    const t3 = setTimeout(() => {
      setPhase(3); // Cyan energy pulse & ACCESS GRANTED
      playTapSound("access_granted");
    }, 4000);

    // 4.0s -> 5.0s: Core reaches stable brightness
    const t4 = setTimeout(() => {
      setPhase(4); // Smooth transition into portfolio
      setIsTransitioning(true);
    }, 5000);

    // Complete transition after 6.0s total
    const t5 = setTimeout(() => {
      handleComplete();
    }, 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [shouldShow, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem("hasSeenIntro_exosuit_v1", "true");
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

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="exosuit-intro-viewport"
          initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          animate={
            isTransitioning
              ? {
                  opacity: 0,
                  filter: "blur(24px)",
                  scale: 1.08,
                }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                }
          }
          exit={{ opacity: 0, filter: "blur(30px)" }}
          transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#02040a] text-[#F8FAFC] select-none overflow-hidden transform-gpu will-change-[opacity,filter,transform]"
        >
          {/* Cyan Anamorphic Volumetric Lighting Overlay */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.35)_0%,rgba(2,4,10,0)_70%)] pointer-events-none transition-opacity duration-1000 ${
              phase >= 3 ? "opacity-100" : "opacity-30"
            }`}
          />

          {/* Cybernetic Grid Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-[#38bdf8]/40 bg-black/80 backdrop-blur-md text-xs font-mono text-[#38bdf8] hover:text-white hover:border-[#38bdf8] hover:bg-black/95 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* 16:9 Landscape Cinematic Framed Stage (Tight Torso/Chest Close-Up) */}
          <div className="relative w-full max-w-5xl aspect-video flex flex-col items-center justify-center overflow-hidden">
            {/* ORIGINAL FUTURISTIC POWERED EXOSUIT CHEST ARMOR (ONLY UPPER CHEST & TORSO) */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Armored Chest SVG Graphics */}
              <svg viewBox="0 0 1000 562.5" className="w-full h-full block">
                <defs>
                  {/* Brushed Carbon Metallic Torso Gradients */}
                  <linearGradient id="armorMetalLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="40%" stopColor="#1e293b" />
                    <stop offset="80%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                  <linearGradient id="armorMetalRight" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="40%" stopColor="#1e293b" />
                    <stop offset="80%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>

                  {/* Mechanical Internal Bevel */}
                  <linearGradient id="innerMechGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="50%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>

                  {/* Energy Core Plasma Glow */}
                  <radialGradient id="corePlasmaGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="30%" stopColor="#bae6fd" />
                    <stop offset="60%" stopColor="#38bdf8" />
                    <stop offset="90%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background Dark Collar & Pectoral Muscle Structural Frames */}
                <path d="M 300 100 L 700 100 L 750 480 L 250 480 Z" fill="#050b14" stroke="#1e293b" strokeWidth="2" />

                {/* Left Armored Pectoral Plate (Mechanically Separates outwards when phase >= 2) */}
                <g
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: phase >= 2 ? "translateX(-32px)" : "translateX(0px)",
                  }}
                >
                  <path
                    d="M 220 120 L 470 140 L 460 380 L 240 420 Z"
                    fill="url(#armorMetalLeft)"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />
                  {/* Subtle Chiseled Armor Plate Grooves */}
                  <path d="M 260 160 L 440 175" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <path d="M 270 240 L 430 250" fill="none" stroke="#334155" strokeWidth="1.5" />
                  {/* Cyan Tech Line Inset */}
                  <path
                    d="M 450 160 L 440 360"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    opacity={phase >= 3 ? 0.9 : 0.2}
                  />
                </g>

                {/* Right Armored Pectoral Plate (Mechanically Separates outwards when phase >= 2) */}
                <g
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: phase >= 2 ? "translateX(32px)" : "translateX(0px)",
                  }}
                >
                  <path
                    d="M 780 120 L 530 140 L 540 380 L 760 420 Z"
                    fill="url(#armorMetalRight)"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />
                  {/* Subtle Chiseled Armor Plate Grooves */}
                  <path d="M 740 160 L 560 175" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <path d="M 730 240 L 570 250" fill="none" stroke="#334155" strokeWidth="1.5" />
                  {/* Cyan Tech Line Inset */}
                  <path
                    d="M 550 160 L 560 360"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    opacity={phase >= 3 ? 0.9 : 0.2}
                  />
                </g>

                {/* Center Mechanical Core Housing Socket (Revealed when plates separate) */}
                <circle cx="500" cy="270" r="110" fill="url(#innerMechGrad)" stroke="#334155" strokeWidth="3" />
                <circle cx="500" cy="270" r="95" fill="#080e1a" stroke="#475569" strokeWidth="2" />

                {/* Mechanical Locking Teeth Clamps (Engage around Core when phase >= 2) */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = (360 / 6) * i;
                  return (
                    <g key={`clamp-${i}`} transform={`rotate(${angle} 500 270)`}>
                      <rect
                        x={492}
                        y={178}
                        width={16}
                        height={24}
                        rx={3}
                        fill="#475569"
                        stroke="#94a3b8"
                        strokeWidth="1"
                        className="transition-transform duration-500"
                        style={{
                          transform: phase >= 2 ? "translateY(8px)" : "translateY(0px)",
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* REAL PHYSICAL MECHANICAL ENERGY CORE (Approaches from front and locks into chest) */}
              <motion.div
                initial={{ scale: 2.2, z: 200, opacity: 0 }}
                animate={{
                  scale: phase === 0 ? 2.0 : phase === 1 ? 1.4 : 1.0,
                  opacity: phase === 0 ? 0 : 1,
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 z-30"
              >
                {/* Photorealistic Mechanical Core SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                  <defs>
                    <radialGradient id="coreMetalBevel" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="40%" stopColor="#334155" />
                      <stop offset="80%" stopColor="#0f172a" />
                    </radialGradient>
                    <linearGradient id="copperRibGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="30%" stopColor="#f59e0b" />
                      <stop offset="70%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>
                  </defs>

                  {/* Outer Mechanical Steel Ring */}
                  <circle cx="100" cy="100" r="92" fill="url(#coreMetalBevel)" stroke="#64748b" strokeWidth="2.5" />
                  <circle cx="100" cy="100" r="84" fill="#090d16" stroke="#334155" strokeWidth="2" />

                  {/* 8 Mechanical Copper Coils Wire Block Ring */}
                  <g className={phase >= 2 ? "animate-[spin_18s_linear_infinite] origin-center" : ""}>
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = (360 / 8) * i;
                      return (
                        <rect
                          key={`coil-rib-${i}`}
                          x={91}
                          y={16}
                          width={18}
                          height={26}
                          rx={3}
                          fill="url(#copperRibGrad)"
                          stroke="#78350f"
                          strokeWidth="1"
                          transform={`rotate(${angle} 100 100)`}
                        />
                      );
                    })}
                  </g>

                  {/* Concentric Lens Rings */}
                  <circle cx="100" cy="100" r="54" fill="none" stroke="#38bdf8" strokeWidth="2" opacity={phase >= 3 ? 0.9 : 0.3} />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity={phase >= 3 ? 0.95 : 0.4} />

                  {/* Central Energy Plasma Core Orb */}
                  <circle
                    cx="100"
                    cy="100"
                    r="28"
                    fill="url(#corePlasmaGlow)"
                    className={phase >= 3 ? "animate-pulse" : ""}
                    opacity={phase >= 3 ? 1 : 0.4}
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="12"
                    fill="#ffffff"
                    opacity={phase >= 3 ? 1 : 0.5}
                    className={phase >= 3 ? "shadow-[0_0_20px_#ffffff]" : ""}
                  />
                </svg>
              </motion.div>

              {/* ACCESS GRANTED TYPOGRAPHY DISPLAY (APPEARS IN PHASE >= 3) */}
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute bottom-6 z-40 flex flex-col items-center text-center gap-1"
                  >
                    <h2 className="font-mono text-3xl sm:text-5xl font-black tracking-[0.35em] bg-gradient-to-r from-cyan-300 via-white to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(56,189,248,0.95)] uppercase">
                      ACCESS GRANTED
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-[#38bdf8] tracking-[0.4em] uppercase font-bold opacity-90">
                      VIVEK HINGU // PORTFOLIO UNLOCKED
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
