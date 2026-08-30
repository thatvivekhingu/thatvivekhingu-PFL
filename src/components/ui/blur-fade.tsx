"use client";

import React from "react";
import { motion } from "framer-motion";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: unknown;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: unknown;
  blur?: string;
  id?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  blur = "6px",
}: BlurFadeProps) {
  const yOffset = direction === "down" ? -offset : direction === "up" ? offset : 0;
  const xOffset = direction === "right" ? -offset : direction === "left" ? offset : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, filter: `blur(${blur})` }}
      animate={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

