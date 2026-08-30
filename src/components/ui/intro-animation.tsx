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

              {/* Step 3: Arc Reactor Animation (Mathematically Centered Where Avatar Appears) */}
              {phase === "arc" && (
                <motion.div
                  key="arc-reactor-core"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  exit={{
                    scale: 1.4,
                    opacity: 0,
                    transition: { duration: 0.4, ease: "easeIn" },
                  }}
                  className="relative flex items-center justify-center"
                >
                  {/* Glowing Core Explosion Flare */}
                  <div className="absolute w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] rounded-full bg-cyan-500/25 blur-3xl animate-pulse" />

                  {/* Concentric Rotating Marvel Arc Reactor */}
                  <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] flex items-center justify-center">
                    <div className="relative w-full h-full animate-[spin_20s_linear_infinite]">
                      <svg
                        viewBox="0 0 400 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                      >
                        {/* Outer Tech Coordinate Rings */}
                        <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
                        <circle cx="200" cy="200" r="172" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                        <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="16 6" />
                        <circle cx="200" cy="200" r="128" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.9" />
                        <circle cx="200" cy="200" r="105" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 12" />
                        <circle cx="200" cy="200" r="85" stroke="currentColor" strokeWidth="2" opacity="0.7" />

                        {/* Radial Arc Reactor Notches */}
                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                          <line
                            key={deg}
                            x1="200"
                            y1="10"
                            x2="200"
                            y2="28"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            transform={`rotate(${deg} 200 200)`}
                          />
                        ))}

                        {/* Iconic Avengers 'A' Logo Embedded at Center */}
                        <g transform="translate(100, 100) scale(1)">
                          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="3.5" strokeDasharray="140 30" opacity="0.9" />
                          <path
                            d="M30 115 L160 115 L145 95 L25 95 Z"
                            fill="currentColor"
                            opacity="0.9"
                          />
                          <polygon
                            points="155,90 185,105 155,120"
                            fill="currentColor"
                          />
                          <polygon
                            points="98,35 118,35 142,145 122,145 114,105 92,105 95,95 112,95 106,62 86,145 68,145"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                    </div>

                    {/* Center Core Blue Hotspot */}
                    <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-cyan-300 bg-cyan-400/20 shadow-[0_0_50px_rgba(6,182,212,0.9)] animate-ping" />
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
