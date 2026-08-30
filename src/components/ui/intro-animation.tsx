"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

interface IntroPair {
  en: string;
  hi: string;
}

const INTRO_PAIRS: IntroPair[] = [
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
  const [activePair, setActivePair] = useState<IntroPair>(INTRO_PAIRS[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [currentStep, setCurrentStep] = useState<"en" | "hi">("en");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const soundPlayedRef = useRef(false);

  // Pick a random pair on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * INTRO_PAIRS.length);
    setActivePair(INTRO_PAIRS[randomIndex]);
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

  // Cinematic Relaxed Typing Engine: English -> Hold (1.4s) -> Hindi -> Hold (1.5s) -> Red line curtain (1.4s)
  useEffect(() => {
    if (!shouldShow || isComplete || !activePair) return;

    if (currentStep === "en") {
      let index = 0;
      const target = activePair.en;
      const enInterval = setInterval(() => {
        index++;
        setDisplayedText(target.slice(0, index));

        if (!soundPlayedRef.current) {
          soundPlayedRef.current = true;
          playTapSound("hover");
        }

        if (index >= target.length) {
          clearInterval(enInterval);
          setIsTypingDone(true);

          // Hold English for 1.4 seconds so user can read comfortably
          setTimeout(() => {
            setIsTypingDone(false);
            setDisplayedText("");
            setCurrentStep("hi");
            playTapSound("hover");
          }, 1400);
        }
      }, 55);

      return () => clearInterval(enInterval);
    } else if (currentStep === "hi") {
      let index = 0;
      const target = activePair.hi;
      const hiInterval = setInterval(() => {
        index++;
        setDisplayedText(target.slice(0, index));

        if (index >= target.length) {
          clearInterval(hiInterval);
          setIsTypingDone(true);

          // After Hindi finishes, hold for 1.5 seconds so punchline lands
          setTimeout(() => {
            setIsRevealing(true);
            playTapSound("access_granted");
          }, 1500);
        }
      }, 60);

      return () => clearInterval(hiInterval);
    }
  }, [shouldShow, isComplete, activePair, currentStep]);

  if (!shouldShow || isComplete) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: "0%" }}
          animate={
            isRevealing
              ? {
                  y: "-100%",
                  transition: {
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1], // Cinematic smooth curtain easing
                  },
                }
              : { y: "0%" }
          }
          onAnimationComplete={() => {
            if (isRevealing) {
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
                isRevealing
                  ? {
                      height: "100%",
                      transition: {
                        duration: 1.35,
                        ease: [0.22, 1, 0.36, 1], // Stretches gradually downward
                      },
                    }
                  : { height: "0%" }
              }
              className="w-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9),0_0_24px_rgba(239,68,68,0.5)] origin-top rounded-full"
            />
          </div>

          {/* Text Container positioned in Upper / Center Area */}
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
