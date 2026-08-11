"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  icon?: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}

export const headingIconClass = "h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300";

export function SectionHeading({
  children,
  subtitle,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "group relative flex flex-col mb-8 sm:mb-10 select-none",
        isLeft ? "items-start text-left" : "items-center text-center",
        className
      )}
    >
      {/* MAIN TITLE (Multi-color Vibrant Gradient per reference screenshot) */}
      <h2 className="text-2xl sm:text-4xl font-black tracking-wider uppercase font-mono">
        <span className="bg-gradient-to-r from-cyan-400 via-sky-300 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(217,70,239,0.3)]">
          {children}
        </span>
      </h2>

      {/* SHORT CONCISE SUBTITLE WITH '// ' MONO FORMAT */}
      {subtitle && (
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-zinc-300 max-w-2xl leading-relaxed">
          <span className="text-cyan-400 font-black mr-2">{"//"}</span>
          {subtitle}
        </p>
      )}

      {/* GLOWING DUAL-COLOR ACCENT UNDERLINE */}
      <div
        className={cn(
          "mt-3.5 h-0.5 w-24 sm:w-32 rounded-full bg-gradient-to-r from-cyan-500 via-pink-500 to-fuchsia-500 opacity-80 group-hover:w-44 group-hover:opacity-100 shadow-[0_0_15px_rgba(217,70,239,0.6)] transition-all duration-500",
          !isLeft && "mx-auto"
        )}
      />
    </div>
  );
}