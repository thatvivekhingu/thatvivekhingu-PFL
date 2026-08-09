"use client";

import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNameProps {
  className?: string;
}

export function AnimatedName({ className }: AnimatedNameProps) {
  const name = "Vivek Hingu";
  const [sweepDone, setSweepDone] = useState(false);

  useEffect(() => {
    // Single light sweep runs once at t = 1.35s and completes at t = 2.15s
    const timer = setTimeout(() => {
      setSweepDone(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      className={cn(
        "relative inline-flex items-center select-none whitespace-nowrap overflow-hidden",
        className
      )}
    >
      <span className="relative inline-flex">
        {name.split("").map((char, i) => {
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
              initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.75,
                delay: 0.35 + i * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              <span className="font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 via-indigo-400 to-amber-300 bg-clip-text text-transparent">
                {char}
              </span>
            </motion.span>
          );
        })}

        {/* ONE Single Light Sweep Overlay across "Vivek Hingu" */}
        {!sweepDone && (
          <motion.span
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, 0.8, 0.8, 0] }}
            transition={{
              duration: 0.8,
              delay: 1.35,
              ease: "easeInOut",
            }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/80 to-transparent mix-blend-overlay"
          />
        )}
      </span>
    </span>
  );
}
