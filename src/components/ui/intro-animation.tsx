"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("hasSeenIntro_real_arc_v1") !== "true";
      } catch {
        return true;
      }
    }
    return true;
  });

  // Time-driven animation phase: 0 (0-1.5s dark suit), 1 (1.5-3s core approach), 2 (3-4s lock & activate), 3 (4-5s ACCESS GRANTED), 4 (5-10s transition to portfolio)
  const [phase, setPhase] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hasSeenIntro_real_arc_v1");
      if (hasSeen === "true") {
        setShouldShow(false);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  // 10-Second Precise Cinematic Sequence Timeline
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    const t1 = setTimeout(() => {
      setPhase(1);
      playTapSound("hover");
    }, 1500);

    const t2 = setTimeout(() => {
      setPhase(2);
      playTapSound("pop");
    }, 3000);

    const t3 = setTimeout(() => {
      setPhase(3);
      playTapSound("access_granted");
    }, 4000);

    const t4 = setTimeout(() => {
      setPhase(4);
      setIsTransitioning(true);
    }, 5000);

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
      sessionStorage.setItem("hasSeenIntro_real_arc_v1", "true");
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

  // 10 Photorealistic 3D Copper Coil Assemblies matching reference photo (36° intervals)
  const copperCoilAssemblies = Array.from({ length: 10 }).map((_, i) => {
    const angle = (360 / 10) * i;
    return (
      <g key={`copper-coil-assembly-${i}`} transform={`rotate(${angle} 200 200)`}>
        {/* Dark Metal Mount Bracket Base */}
        <rect
          x={176}
          y={10}
          width={48}
          height={56}
          rx={6}
          fill="url(#metalBracketGrad)"
          stroke="#334155"
          strokeWidth={1.5}
        />

        {/* Silver Clamp Caps (Top & Bottom holding copper coils) */}
        <rect x={174} y={12} width={52} height={10} rx={3} fill="url(#metalBevelGrad)" stroke="#64748b" strokeWidth={1} />
        <rect x={174} y={54} width={52} height={10} rx={3} fill="url(#metalBevelGrad)" stroke="#64748b" strokeWidth={1} />
        <circle cx="178" cy="17" r="1.8" fill="#cbd5e1" />
        <circle cx="222" cy="17" r="1.8" fill="#cbd5e1" />
        <circle cx="178" cy="59" r="1.8" fill="#cbd5e1" />
        <circle cx="222" cy="59" r="1.8" fill="#cbd5e1" />

        {/* 3D Copper Wire Winding Block */}
        <rect x={180} y={22} width={40} height={32} rx={4} fill="url(#copperWireGrad)" stroke="#78350f" strokeWidth={1.2} />

        {/* 9 Tight Copper Wire Ribs */}
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

        {/* Specular Metallic Highlight Streak on Copper Wire */}
        <rect x={185} y={23} width={5} height={30} rx={1} fill="#fef08a" opacity={0.55} />
      </g>
    );
  });

  // 20 Notch Cutouts in Acrylic Ring
  const acrylicNotches = Array.from({ length: 20 }).map((_, i) => {
    const angle = (360 / 20) * i;
    return (
      <rect
        key={`acrylic-notch-${i}`}
        x={197}
        y={68}
        width={6}
        height={12}
        rx={2}
        fill="#e0f2fe"
        stroke="#38bdf8"
        strokeWidth={0.8}
        opacity={0.9}
        transform={`rotate(${angle} 200 200)`}
      />
    );
  });

  // 3 Radial Spokes/Tabs (at 0°, 120°, 240° matching reference photo)
  const radialSpokes = [0, 120, 240].map((angle, i) => (
    <g key={`radial-spoke-${i}`} transform={`rotate(${angle} 200 200)`}>
      <rect x={192} y={94} width={16} height={28} rx={3} fill="#0f172a" stroke="#475569" strokeWidth={1.5} />
      <circle cx={200} cy={102} r={3} fill="#38bdf8" />
      <line x1={194} y1={112} x2={206} y2={112} stroke="#334155" strokeWidth={1.5} />
    </g>
  ));

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="real-arc-intro-viewport"
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
          {/* Cyan Anamorphic Ambient Glow */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.35)_0%,rgba(2,4,10,0)_70%)] pointer-events-none transition-opacity duration-1000 ${
              phase >= 2 ? "opacity-100" : "opacity-30"
            }`}
          />

          {/* Cybernetic Dot Matrix Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-[#38bdf8]/40 bg-black/80 backdrop-blur-md text-xs font-mono text-[#38bdf8] hover:text-white hover:border-[#38bdf8] hover:bg-black/95 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* 16:9 Landscape Cinematic Stage */}
          <div className="relative w-full max-w-5xl aspect-video flex flex-col items-center justify-center overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* ORIGINAL FUTURISTIC EXOSUIT CHEST ARMOR SVG */}
              <svg viewBox="0 0 1000 562.5" className="w-full h-full block">
                <defs>
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
                  <linearGradient id="innerMechGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="50%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                </defs>

                {/* Dark Torso Structural Collar Frame */}
                <path d="M 300 100 L 700 100 L 750 480 L 250 480 Z" fill="#050b14" stroke="#1e293b" strokeWidth="2" />

                {/* Left Armored Pectoral Plate */}
                <g
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: phase >= 2 ? "translateX(-36px)" : "translateX(0px)",
                  }}
                >
                  <path
                    d="M 220 120 L 470 140 L 460 380 L 240 420 Z"
                    fill="url(#armorMetalLeft)"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />
                  <path d="M 260 160 L 440 175" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <path d="M 270 240 L 430 250" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <path
                    d="M 450 160 L 440 360"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    opacity={phase >= 2 ? 0.95 : 0.2}
                  />
                </g>

                {/* Right Armored Pectoral Plate */}
                <g
                  className="transition-transform duration-700 ease-out"
                  style={{
                    transform: phase >= 2 ? "translateX(36px)" : "translateX(0px)",
                  }}
                >
                  <path
                    d="M 780 120 L 530 140 L 540 380 L 760 420 Z"
                    fill="url(#armorMetalRight)"
                    stroke="#475569"
                    strokeWidth="2.5"
                  />
                  <path d="M 740 160 L 560 175" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <path d="M 730 240 L 570 250" fill="none" stroke="#334155" strokeWidth="1.5" />
                  <path
                    d="M 550 160 L 560 360"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    opacity={phase >= 2 ? 0.95 : 0.2}
                  />
                </g>

                {/* Center Core Housing Socket */}
                <circle cx="500" cy="270" r="118" fill="url(#innerMechGrad)" stroke="#334155" strokeWidth="3" />
                <circle cx="500" cy="270" r="102" fill="#080e1a" stroke="#475569" strokeWidth="2" />
              </svg>

              {/* PHOTOREALISTIC 3D ARC REACTOR (MATCHES USER'S REFERENCE IMAGE EXACTLY) */}
              <motion.div
                initial={{ scale: 2.2, z: 200, opacity: 0 }}
                animate={{
                  scale: phase === 0 ? 2.0 : phase === 1 ? 1.35 : 1.0,
                  opacity: phase === 0 ? 0 : 1,
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-68 sm:h-68 z-30 drop-shadow-[0_0_50px_rgba(56,189,248,0.9)]"
              >
                <svg viewBox="0 0 400 400" className="w-full h-full block overflow-visible">
                  <defs>
                    {/* Metallic Gradients */}
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

                    {/* 3D Copper Wire Metallic Gradient */}
                    <linearGradient id="copperWireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="25%" stopColor="#f59e0b" />
                      <stop offset="65%" stopColor="#b45309" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>

                    {/* Vibrant Energy Plasma Core */}
                    <radialGradient id="vibraniumCoreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="25%" stopColor="#e0f2fe" />
                      <stop offset="50%" stopColor="#38bdf8" />
                      <stop offset="80%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                    </radialGradient>

                    {/* 3D Honeycomb Mesh Grid */}
                    <pattern id="vibraniumHex" width="14" height="12" patternUnits="userSpaceOnUse">
                      <polygon
                        points="7,0 14,3.5 14,8.5 7,12 0,8.5 0,3.5"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.1"
                      />
                    </pattern>
                  </defs>

                  {/* Outer Steel Chassis Ring */}
                  <circle cx="200" cy="200" r="196" fill="url(#metalBevelGrad)" stroke="#64748b" strokeWidth="3" />
                  <circle cx="200" cy="200" r="184" fill="#070a10" stroke="#334155" strokeWidth="2.5" />

                  {/* Translucent Glowing Cyan Acrylic Ring */}
                  <circle cx="200" cy="200" r="172" fill="#0284c7" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="2" />

                  {/* 10 Photorealistic Copper Coil Assemblies (Rotates smoothly) */}
                  <g className={phase >= 2 ? "animate-[spin_18s_linear_infinite] origin-center transform-gpu will-change-transform" : ""}>
                    {copperCoilAssemblies}
                  </g>

                  {/* 20 Acrylic Notch Cutouts */}
                  <g className={phase >= 2 ? "animate-[spin_12s_linear_infinite_reverse] origin-center transform-gpu will-change-transform" : ""}>
                    {acrylicNotches}
                  </g>

                  {/* Inner Black Chassis Ring with 3 Radial Spokes */}
                  <circle cx="200" cy="200" r="118" fill="#090d16" stroke="#334155" strokeWidth="2.5" />
                  <circle cx="200" cy="200" r="106" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.85" />
                  
                  {/* 3 Radial Spokes */}
                  <g>{radialSpokes}</g>

                  {/* Concentric Neon Lens Glass Rings */}
                  <circle cx="200" cy="200" r="82" fill="none" stroke="#e0f2fe" strokeWidth="2.5" opacity="0.9" />
                  <circle cx="200" cy="200" r="60" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.95" />

                  {/* Center Vibranium Plasma Core with Honeycomb Grid & Specular Lens Highlight */}
                  <circle cx="200" cy="200" r="54" fill="url(#vibraniumCoreGlow)" />
                  <circle cx="200" cy="200" r="46" fill="#081014" stroke="#334155" strokeWidth="2" />
                  <circle cx="200" cy="200" r="42" fill="url(#vibraniumHex)" />
                  <circle cx="200" cy="200" r="42" fill="url(#vibraniumCoreGlow)" opacity="0.6" />

                  {/* Specular Glass Lens Reflection Arc */}
                  <path
                    d="M 165 170 A 40 40 0 0 1 235 170"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.8"
                  />

                  {/* Central Plasma Energy Orb */}
                  <circle cx="200" cy="200" r="22" fill="#ffffff" className={phase >= 2 ? "animate-pulse shadow-[0_0_30px_#ffffff]" : ""} />
                </svg>
              </motion.div>

              {/* CLEAN SLEEK ACCESS GRANTED TYPOGRAPHY (APPEARS IN PHASE >= 3) */}
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
