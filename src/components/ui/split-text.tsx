"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  mode?: "words" | "chars";
  accentFirst?: boolean;
  accentClass?: string;
}

export function SplitText({
  children,
  className = "",
  delay = 0,
  mode = "words",
  accentFirst = false,
  accentClass = "text-[#3B82F6]",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -5% 0px" });

  const items = mode === "words" ? children.split(" ") : children.split("");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {items.map((item, index) => {
        const isFirst = index === 0 && accentFirst;
        return (
          <span
            key={index}
            className="inline-block overflow-hidden align-top"
          >
            <motion.span
              initial={{ y: "115%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
              transition={{
                duration: 0.65,
                delay: delay + index * (mode === "words" ? 0.08 : 0.025),
                ease: [0.215, 0.61, 0.355, 1], // Smooth cubic out
              }}
              className={`inline-block ${isFirst ? accentClass : ""}`}
            >
              {item}
            </motion.span>
            {mode === "words" && index < items.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
}
