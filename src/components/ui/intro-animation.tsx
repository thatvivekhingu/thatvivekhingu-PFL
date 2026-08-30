"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

interface IntroLine {
  en: string;
  hi: string;
}

const INTRO_LINES: IntroLine[] = [
  { en: "You actually came...", hi: "अब तो दिखाना पड़ेगा भाई." },
  { en: "So you're here...", hi: "चलो, अब देख ही लो." },
  { en: "You clicked the link...", hi: "अब फँस गए भाई." },
  { en: "You made it here...", hi: "अब वापस मत जाना." },
  { en: "You actually opened it...", hi: "अब इज़्ज़त का सवाल है." },
  { en: "So you found me...", hi: "चल भाई, शुरू करते हैं." },
  { en: "You're here already...", hi: "अब क्या ही छुपाना." },
  { en: "You came this far...", hi: "अब थोड़ा देख भी लो." },
  { en: "You clicked it...", hi: "चलो, अब देखते हैं क्या होता है." },
  { en: "You're finally here...", hi: "अब मेहनत दिखानी पड़ेगी." },
  { en: "You made it...", hi: "चल भाई, अंदर चलते हैं." },
  { en: "You really wanted to see it...", hi: "अब भुगतो." },
  { en: "You opened my portfolio...", hi: "अब judge मत करना भाई." },
  { en: "So this is happening...", hi: "चलो, शुरू करते हैं." },
  { en: "You came looking for something...", hi: "देखते हैं क्या मिलता है." },
  { en: "You found the portfolio...", hi: "अब उम्मीदें कम रखना." },
  { en: "You're still here...", hi: "भाई, respect." },
  { en: "You clicked the button...", hi: "अब मेरी बारी है." },
  { en: "You made it this far...", hi: "अब दो मिनट दे दे." },
  { en: "Alright, you're here...", hi: "अब अपना ही समझो." },
];

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState(true);
  const [activeLine, setActiveLine] = useState<IntroLine>(INTRO_LINES[0]);
  const [phase, setPhase] = useState<"en" | "hi" | "arc" | "done">("en");
  const [isComplete, setIsComplete] = useState(false);

  // Pick a random line on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * INTRO_LINES.length);
    setActiveLine(INTRO_LINES[randomIndex]);
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    setShouldShow(false);
  }, []);

  const handleSkip = useCallback(() => {
    playTapSound("pop");
    handleComplete();
  }, [handleComplete]);

  // Keyboard shortcut (ESC or Space to skip) & Click anywhere to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  // 3-Step Timeline: English (2.0s) -> Hindi (2.2s) -> Arc Reactor Core Ignite (1.2s) -> Open
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    playTapSound("hover");

    // Phase 1: Show English setup for 2.0s
    const timer1 = setTimeout(() => {
      setPhase("hi");
      playTapSound("access_granted");

      // Phase 2: Show Hindi punchline for 2.2s
      const timer2 = setTimeout(() => {
        setPhase("arc");
        playTapSound("hover");

        // Phase 3: Arc Reactor ignition & power surge (1.2s), then reveal site
        const timer3 = setTimeout(() => {
          setPhase("done");
          playTapSound("access_granted");
          handleComplete();
        }, 1200);

        return () => clearTimeout(timer3);
      }, 2200);

      return () => clearTimeout(timer2);
    }, 2000);

    return () => clearTimeout(timer1);
  }, [shouldShow, isComplete, handleComplete]);

  if (!shouldShow || isComplete) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black px-6 select-none cursor-pointer overflow-hidden"
        >
          {/* Main Stage */}
          <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {/* Step 1: English Line */}
              {phase === "en" && (
                <motion.div
                  key="en-line"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-[140px] flex items-center justify-center"
                >
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans tracking-tight text-white leading-tight">
                    {activeLine.en}
                  </h1>
                </motion.div>
              )}

              {/* Step 2: Hindi Line */}
              {phase === "hi" && (
                <motion.div
                  key="hi-line"
                  initial={{ opacity: 0, scale: 0.92, y: 16, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-[140px] flex items-center justify-center"
                >
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-sans tracking-tight text-white leading-tight drop-shadow-[0_4px_30px_rgba(255,255,255,0.3)]">
                    {activeLine.hi}
                  </h1>
                </motion.div>
              )}

              {/* Step 3: Hypnotic Spinning Circular Rings Vortex (Gol Gol Ghume Animation Centered on Avatar) */}
              {phase === "arc" && (
                <motion.div
                  key="spinning-vortex-core"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  }}
                  exit={{
                    scale: 1.35,
                    opacity: 0,
                    transition: { duration: 0.35, ease: "easeIn" },
                  }}
                  className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80"
                >
                  {/* Ambient Cyan / White Backlight Glow */}
                  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />

                  {/* Outer Orbiting Dashed Ring (Clockwise Fast Spin) */}
                  <div className="absolute inset-2 sm:inset-4 rounded-full border-2 border-dashed border-cyan-400/60 animate-[spin_4s_linear_infinite]" />

                  {/* Second Glowing Gradient Ring (Counter-Clockwise Spin) */}
                  <div className="absolute inset-6 sm:inset-10 rounded-full border-2 border-t-cyan-300 border-r-transparent border-b-sky-400 border-l-transparent shadow-[0_0_25px_rgba(6,182,212,0.6)] animate-[spin_2.5s_linear_infinite_reverse]" />

                  {/* Third High-Speed Inner Ring with Glowing Satellite Dots */}
                  <div className="absolute inset-12 sm:inset-16 rounded-full border border-white/40 animate-[spin_1.8s_linear_infinite]">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee]" />
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_15px_#38bdf8]" />
                  </div>

                  {/* Fourth Concentric Precision Dot Ring (Counter-Clockwise) */}
                  <div className="absolute inset-20 sm:inset-24 rounded-full border border-dotted border-cyan-200/80 animate-[spin_3s_linear_infinite_reverse]" />

                  {/* Center Glowing White Core Pulse */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-200 to-white shadow-[0_0_40px_rgba(255,255,255,0.9)] animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_20px_#ffffff]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Skip Note */}
            <div className="absolute -bottom-24 text-xs font-mono text-zinc-600 flex items-center gap-2">
              <span>☕</span>
              <span>Tap anywhere to skip</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
