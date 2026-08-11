"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  badge?: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}

export const headingIconClass = "h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300";

export function SectionHeading({
  icon,
  children,
  badge,
  subtitle,
  className = "",
  align = "center",
}: SectionHeadingProps) {
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "group relative flex flex-col mb-10 sm:mb-14 select-none",
        isLeft ? "items-start text-left" : "items-center text-center",
        className
      )}
    >
      {/* OPTIONAL BADGE OVERLAY */}
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-950/40 text-cyan-400 border border-cyan-500/30 text-[11px] font-mono font-bold tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      {/* MAIN TITLE (Futuristic Big Uppercase Cyan Gradient Title) */}
      <div
        className={cn(
          "flex items-center gap-3 flex-wrap",
          isLeft ? "justify-start" : "justify-center"
        )}
      >
        {icon && (
          <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-zinc-900 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0">
            {icon}
          </div>
        )}

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-wider uppercase">
          <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            {children}
          </span>
        </h2>
      </div>

      {/* SUBTITLE WITH '// ' MONO FORMAT */}
      {subtitle && (
        <p className="mt-3 font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-cyan-400/90 max-w-2xl leading-relaxed">
          <span className="text-cyan-500 font-extrabold mr-1.5">{"//"}</span>
          {subtitle}
        </p>
      )}

      {/* GLOWING ACCENT UNDERLINE */}
      <div
        className={cn(
          "mt-3.5 h-1 w-24 sm:w-28 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 group-hover:w-36 group-hover:opacity-100 shadow-[0_0_15px_rgba(34,211,238,0.7)] transition-all duration-500",
          !isLeft && "mx-auto"
        )}
      />
    </div>
  );
}