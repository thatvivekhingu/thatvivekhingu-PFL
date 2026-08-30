"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

const TYPE_TEXT = "It works on my machine... आशा है आपके यहाँ भी चलेगा!";

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const soundPlayedRef = useRef(false);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    setShouldShow(false);
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

  // Realistic, human-readable Typewriter Engine with comic timing pause
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      index++;
      setDisplayedText(TYPE_TEXT.slice(0, index));

      // Play soft tap sound once at start
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        playTapSound("hover");
      }

      if (index >= TYPE_TEXT.length) {
        setIsTypingDone(true);
        playTapSound("access_granted");

        // Comfortable reading hold time (2.2 seconds) so visitor can comfortably read and enjoy
        timeoutId = setTimeout(() => {
          handleComplete();
        }, 2200);
        return;
      }

      // Natural pause at "..." for dramatic comic timing
      let delay = 72; // Comfortable, clearly readable typing speed (72ms per char)
      if (TYPE_TEXT.slice(0, index).endsWith("...")) {
        delay = 450; // Dramatic pause after "machine..."
      } else if (TYPE_TEXT[index - 1] === " ") {
        delay = 90; // Natural word gap
      }

      timeoutId = setTimeout(typeNextChar, delay);
    };

    timeoutId = setTimeout(typeNextChar, 300); // Initial 300ms breather before typing starts

    return () => clearTimeout(timeoutId);
  }, [shouldShow, isComplete, handleComplete]);

  if (!shouldShow || isComplete) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-950 px-6 select-none cursor-pointer overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Center Typewriter Terminal Card */}
          <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center space-y-5">
            {/* Top Micro Terminal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TERMINAL // VIVEK_HINGU</span>
            </div>

            {/* Typewriter Line */}
            <div className="min-h-[70px] sm:min-h-[90px] flex items-center justify-center">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight text-white flex items-center justify-center flex-wrap gap-1.5 leading-snug">
                <span className="text-cyan-400 font-black mr-1">&gt;</span>
                <span className="text-zinc-100">{displayedText}</span>
                <span
                  className={`inline-block w-2.5 sm:w-3.5 h-6 sm:h-8 bg-cyan-400 ml-1 rounded-xs ${
                    isTypingDone ? "animate-pulse" : "opacity-100"
                  }`}
                />
              </h1>
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
