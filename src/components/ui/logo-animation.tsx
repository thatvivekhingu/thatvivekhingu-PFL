"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimatedLogo = ({
  className = "w-10 h-10 sm:w-12 sm:h-12",
  onClick,
}: {
  theme?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 6 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`group relative cursor-pointer flex items-center justify-center rounded-2xl bg-zinc-950/90 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 ${className}`}
      title="Vivek Hingu • Home"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-1.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="vhGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Outer Arc-Reactor Tech Ring */}
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="url(#vhGlow)"
          strokeWidth="2.5"
          strokeDasharray="14 6"
          className="animate-[spin_18s_linear_infinite] origin-center opacity-80"
        />

        {/* Inner Ring */}
        <circle
          cx="50"
          cy="50"
          r="36"
          stroke="#06b6d4"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />

        {/* "VH" Monogram Letters */}
        <text
          x="50"
          y="57"
          fontSize="30"
          fontWeight="900"
          fontFamily="var(--font-geist-mono), monospace"
          fill="url(#vhGlow)"
          textAnchor="middle"
          letterSpacing="-1.5"
          className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        >
          VH
        </text>

        {/* Glowing Center Core Dot */}
        <circle cx="50" cy="20" r="2.5" fill="#38bdf8" className="animate-pulse" />
      </svg>
    </motion.div>
  );
};