"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

const HINDI_LINES: string[] = [
  "अब तो दिखाना पड़ेगा भाई.",
  "चलो, अब देख ही लो.",
  "अब फँस गए भाई.",
  "अब वापस मत जाना.",
  "अब इज़्ज़त का सवाल है.",
  "चल भाई, शुरू करते हैं.",
  "अब क्या ही छुपाना.",
  "अब थोड़ा देख भी लो.",
  "चलो, अब देखते हैं क्या होता है.",
  "अब मेहनत दिखानी पड़ेगी.",
  "चल भाई, अंदर चलते हैं.",
  "अब भुगतो.",
  "अब judge मत करना भाई.",
  "चलो, शुरू करते हैं.",
  "देखते हैं क्या मिलता है.",
  "अब उम्मीदें कम रखना.",
  "भाई, respect.",
  "अब मेरी बारी है.",
  "अब दो मिनट दे दे.",
  "अब अपना ही समझो.",
];

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState(true);
  const [selectedLine, setSelectedLine] = useState(HINDI_LINES[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [phase, setPhase] = useState<"typing" | "holding" | "revealing" | "done">("typing");
  const [isComplete, setIsComplete] = useState(false);
  const soundPlayedRef = useRef(false);

  // Pick a random line on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * HINDI_LINES.length);
    setSelectedLine(HINDI_LINES[randomIndex]);
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

  // Typing Engine for Hindi Text
  useEffect(() => {
    if (!shouldShow || isComplete || !selectedLine) return;

    let index = 0;
    const typingInterval = setInterval(() => {
      index++;
      setDisplayedText(selectedLine.slice(0, index));

      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        playTapSound("hover");
      }

      if (index >= selectedLine.length) {
        clearInterval(typingInterval);
        setIsTypingDone(true);
        setPhase("holding");

        // Wait for exactly 1 second (1000ms) after typing finishes
        setTimeout(() => {
          setPhase("revealing");
          playTapSound("access_granted");
        }, 1000);
      }
    }, 48); // Smooth character-by-character typing pace

    return () => clearInterval(typingInterval);
  }, [shouldShow, isComplete, selectedLine]);

  if (!shouldShow || isComplete) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: "0%" }}
          animate={
            phase === "revealing"
              ? {
                  y: "-100%",
                  transition: {
                    duration: 1.3,
                    ease: [0.22, 1, 0.36, 1], // Cinematic smooth curtain easing
                  },
                }
              : { y: "0%" }
          }
          onAnimationComplete={() => {
            if (phase === "revealing") {
              handleComplete();
            }
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[99999] bg-black select-none cursor-pointer overflow-hidden flex flex-col justify-between"
        >
          {/* Left Vertical Thin Red Line stretching downward */}
          <div className="absolute left-6 sm:left-12 md:left-16 top-0 bottom-0 w-[2px] pointer-events-none z-30">
            <motion.div
              initial={{ height: "0%" }}
              animate={
                phase === "revealing"
                  ? {
                      height: "100%",
                      transition: {
                        duration: 1.25,
                        ease: [0.22, 1, 0.36, 1], // Stretches gradually downward
                      },
                    }
                  : { height: "0%" }
              }
              className="w-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9),0_0_24px_rgba(239,68,68,0.5)] origin-top rounded-full"
            />
          </div>

          {/* Hindi Text positioned in Upper / Center Area */}
          <div className="w-full flex-1 flex items-center justify-center pt-20 sm:pt-28 pb-12 px-8 sm:px-16">
            <div className="max-w-4xl text-center">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-sans tracking-tight text-white leading-tight">
                <span>{displayedText}</span>
                {!isTypingDone && (
                  <span className="inline-block w-1 sm:w-1.5 h-6 sm:h-10 bg-red-500 ml-1.5 align-middle animate-pulse shadow-[0_0_8px_#ef4444]" />
                )}
              </h1>
            </div>
          </div>

          {/* Minimalist Bottom Skip Indicator */}
          <div className="w-full pb-8 flex items-center justify-center pointer-events-none">
            <span className="text-[11px] font-mono text-zinc-600 tracking-wider uppercase opacity-60">
              Tap anywhere to skip
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
