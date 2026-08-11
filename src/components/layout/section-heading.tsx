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
      {/* MAIN TITLE (Clean, Scaled-down Uppercase Cyan Gradient Title) */}
      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase">
        <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]">
          {children}
        </span>
      </h2>

      {/* SUBTITLE WITH '// ' MONO FORMAT */}
      {subtitle && (
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-cyan-400/90 max-w-2xl leading-relaxed">
          <span className="text-cyan-500 font-bold mr-1.5">{"//"}</span>
          {subtitle}
        </p>
      )}

      {/* GLOWING ACCENT UNDERLINE */}
      <div
        className={cn(
          "mt-3 h-0.5 w-20 sm:w-24 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 group-hover:w-32 group-hover:opacity-100 shadow-[0_0_12px_rgba(34,211,238,0.7)] transition-all duration-500",
          !isLeft && "mx-auto"
        )}
      />
    </div>
  );
}