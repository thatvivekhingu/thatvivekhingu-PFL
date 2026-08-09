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
  const name = "Vivek Hingu";
  const [typedIndex, setTypedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIndex((prev) => {
        if (prev < name.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className={cn(
        "relative inline-flex items-center select-none cursor-pointer group whitespace-nowrap",
        className
      )}
    >
      {name.split("").map((char, i) => {
        const isVisible = i < typedIndex;
        if (char === " ") {
          return (
            <span key={i} className="w-2.5 sm:w-4 inline-block">
              &nbsp;
            </span>
          );
        }
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 25, rotateX: -90, scale: 0.4 }}
            animate={
              isVisible
                ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
                : { opacity: 0, y: 25, rotateX: -90, scale: 0.4 }
            }
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            <span className="font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 via-indigo-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(56,189,248,0.45)]">
              {char}
            </span>
          </motion.span>
        );
      })}

      {/* Typing Cursor */}
      {typedIndex < name.length && (
        <span className="inline-block w-1.5 sm:w-2 h-[0.75em] ml-1 bg-cyan-400 dark:bg-amber-400 animate-ping align-middle rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
      )}

      {/* Dynamic Underline Light Glow Sweep */}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: typedIndex === name.length ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 via-indigo-500 to-amber-400 shadow-[0_0_15px_rgba(34,211,238,0.9)] origin-left group-hover:scale-y-125 transition-transform"
      />
    </span>
  );
}
