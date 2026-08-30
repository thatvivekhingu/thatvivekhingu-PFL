"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

const INTRO_STORAGE_KEY = "hasSeenIntro_v40_works_on_my_machine";
const TYPE_TEXT = "It works on my machine... आशा है आपके यहाँ भी चलेगा!";

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const soundPlayedRef = useRef(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem(INTRO_STORAGE_KEY);
      if (hasSeen !== "true") {
        setShouldShow(true);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
    setIsComplete(true);
  }, []);

  const handleSkip = useCallback(() => {
    playTapSound("pop");
    handleComplete();
  }, [handleComplete]);

  // Keyboard shortcut (ESC to skip) & Click anywhere to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  // Typewriter Engine
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(TYPE_TEXT.slice(0, index));

      // Play soft tap sound once at start
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        playTapSound("hover");
      }

      if (index >= TYPE_TEXT.length) {
        clearInterval(interval);
        setIsTypingDone(true);
        playTapSound("access_granted");

        // Pause for 350ms, then slide up reveal curtain
        setTimeout(() => {
          handleComplete();
        }, 400);
      }
    }, 24); // Types full line in ~1.2s

    return () => clearInterval(interval);
  }, [shouldShow, isComplete, handleComplete]);

  if (!shouldShow || isComplete) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-950 px-6 select-none cursor-pointer overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Center Typewriter Terminal Card */}
          <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center space-y-4">
            {/* Top Micro Terminal Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TERMINAL // VIVEK_HINGU</span>
            </div>

            {/* Typewriter Line */}
            <div className="min-h-[64px] sm:min-h-[80px] flex items-center justify-center">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight text-white flex items-center justify-center flex-wrap gap-1 leading-snug">
                <span className="text-cyan-400 mr-2 font-black">&gt;</span>
                <span className="text-zinc-100">{displayedText}</span>
                <span
                  className={`inline-block w-2.5 sm:w-3.5 h-6 sm:h-8 bg-cyan-400 ml-1 rounded-xs transition-opacity duration-100 ${
                    isTypingDone ? "animate-pulse" : "opacity-100"
                  }`}
                />
              </h1>
            </div>

            {/* Sub-hint */}
            <div className="pt-2 text-xs font-mono text-zinc-600 flex items-center gap-2">
              <span>☕</span>
              <span>Tap anywhere or press ESC to skip</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
