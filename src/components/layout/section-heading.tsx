"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  icon: React.ReactNode;
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
        "group relative flex flex-col mb-8 sm:mb-12 select-none",
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

      {/* MAIN TITLE WITH ICON */}
      <div
        className={cn(
          "flex items-center gap-3 sm:gap-4 flex-wrap",
          isLeft ? "justify-start" : "justify-center"
        )}
      >
        <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-500/10 dark:bg-zinc-900 border border-cyan-500/30 dark:border-zinc-800 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:border-cyan-400/60 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 shrink-0">
          {icon}
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground dark:text-white">
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-100 dark:to-cyan-300 bg-clip-text text-transparent">
            {children}
          </span>
        </h2>
      </div>

      {/* SUBTITLE */}
      {subtitle && (
        <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl font-medium leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* BOTTOM ACCENT DECORATION LINE */}
      <div
        className={cn(
          "mt-4 h-0.5 w-24 bg-gradient-to-r from-cyan-500 via-sky-400 to-transparent rounded-full opacity-60 group-hover:w-36 group-hover:opacity-100 transition-all duration-500",
          !isLeft && "mx-auto"
        )}
      />
    </div>
  );
}