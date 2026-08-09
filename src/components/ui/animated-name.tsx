"use client";

import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const INITIAL_REVEAL_MS = 1100;
export const SWAP_REVEAL_MS = 600;
export const HOLD_MS = 5000;

export type Phase = "initial" | "hold" | "exit" | "enter";
export type Suffix = "hingu" | "tag";

interface AnimatedNameProps {
  phase?: Phase;
  suffix?: Suffix;
  onExitComplete?: () => void;
  className?: string;
}

export function AnimatedName({ className }: AnimatedNameProps) {
  const fullText = "Vivek Hingu";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsTypingDone(false);

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "inline-inline items-center justify-center whitespace-nowrap cursor-pointer group relative",
        className
      )}
    >
      <span className="relative inline-block font-script text-transparent bg-clip-text bg-[length:200%_100%] bg-gradient-to-r from-cyan-400 via-indigo-400 via-amber-400 to-cyan-400 dark:from-cyan-300 dark:via-indigo-300 dark:via-amber-300 dark:to-cyan-300 animate-shimmer transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
        {displayedText}

        {/* Typing Blinking Cursor */}
        {!isTypingDone && (
          <span className="inline-block w-[3px] h-[0.8em] ml-1 bg-cyan-400 dark:bg-amber-400 animate-pulse align-middle rounded-full" />
        )}
      </span>

      {/* Subtle Bottom Accent Glow Line */}
      <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-500 opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
    </motion.span>
  );
}
