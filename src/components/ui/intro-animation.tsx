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
  const [phase, setPhase] = useState<"en" | "hi" | "done">("en");
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

  // 2-Step Seamless Flash Timeline: English (750ms) -> Hindi (900ms) -> Open
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    playTapSound("hover");

    // Phase 1: Show English setup for 750ms
    const timer1 = setTimeout(() => {
      setPhase("hi");
      playTapSound("access_granted");

      // Phase 2: Show Hindi punchline for 900ms, then slide open curtain
      const timer2 = setTimeout(() => {
        setPhase("done");
        handleComplete();
      }, 950);

      return () => clearTimeout(timer2);
    }, 800);

    return () => clearTimeout(timer1);
  }, [shouldShow, isComplete, handleComplete]);

  if (!shouldShow || isComplete) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-950 px-6 select-none cursor-pointer overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Center Card */}
          <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center space-y-6">
            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-400 shadow-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VIAN // VIVEK_HINGU</span>
            </div>

            {/* Word Flash Screen Container */}
            <div className="min-h-[80px] sm:min-h-[100px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {phase === "en" && (
                  <motion.h1
                    key="en-line"
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-zinc-300"
                  >
                    {activeLine.en}
                  </motion.h1>
                )}

                {phase === "hi" && (
                  <motion.h1
                    key="hi-line"
                    initial={{ opacity: 0, scale: 0.94, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-sans tracking-tight text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                  >
                    {activeLine.hi}
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            {/* Sub-hint */}
            <div className="pt-2 text-xs font-mono text-zinc-500 flex items-center gap-2">
              <span>☕</span>
              <span>Tap anywhere or press ESC to skip</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
