"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type SectionHeadingColor = "cyan" | "indigo" | "emerald" | "amber" | "orange" | "sky";

interface SectionHeadingProps {
  icon?: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  color?: SectionHeadingColor;
}

export const headingIconClass = "h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300";

const colorVariants: Record<SectionHeadingColor, { title: string; subtitle: string; line: string }> = {
  cyan: {
    title: "from-cyan-300 via-sky-300 to-teal-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]",
    subtitle: "text-cyan-400",
    line: "from-cyan-400 via-sky-400 to-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.6)]",
  },
  indigo: {
    title: "from-indigo-300 via-violet-300 to-purple-400 drop-shadow-[0_0_25px_rgba(129,140,248,0.35)]",
    subtitle: "text-indigo-400",
    line: "from-indigo-400 via-violet-400 to-indigo-500 shadow-[0_0_15px_rgba(129,140,248,0.6)]",
  },
  emerald: {
    title: "from-emerald-300 via-teal-300 to-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.35)]",
    subtitle: "text-emerald-400",
    line: "from-emerald-400 via-teal-400 to-emerald-500 shadow-[0_0_15px_rgba(52,211,153,0.6)]",
  },
  amber: {
    title: "from-amber-300 via-yellow-300 to-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.35)]",
    subtitle: "text-amber-400",
    line: "from-amber-400 via-yellow-400 to-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.6)]",
  },
  orange: {
    title: "from-orange-300 via-amber-300 to-yellow-300 drop-shadow-[0_0_25px_rgba(251,146,60,0.35)]",
    subtitle: "text-orange-400",
    line: "from-orange-400 via-amber-400 to-orange-500 shadow-[0_0_15px_rgba(251,146,60,0.6)]",
  },
  sky: {
    title: "from-sky-300 via-cyan-300 to-blue-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]",
    subtitle: "text-sky-400",
    line: "from-sky-400 via-blue-400 to-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.6)]",
  },
};

export function SectionHeading({
  children,
  subtitle,
  className = "",
  align = "center",
  color = "cyan",
}: SectionHeadingProps) {
  const isLeft = align === "left";
  const palette = colorVariants[color] || colorVariants.cyan;

  return (
    <div
      className={cn(
        "group relative flex flex-col mb-8 sm:mb-10 select-none",
        isLeft ? "items-start text-left" : "items-center text-center",
        className
      )}
    >
      {/* MAIN TITLE (Distinct Palette Per Section) */}
      <h2 className="text-2xl sm:text-4xl font-black tracking-wider uppercase font-mono">
        <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", palette.title)}>
          {children}
        </span>
      </h2>

      {/* SHORT CONCISE SUBTITLE WITH '// ' MONO FORMAT */}
      {subtitle && (
        <p className="mt-2.5 font-mono text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-zinc-300 max-w-2xl leading-relaxed">
          <span className={cn("font-black mr-2", palette.subtitle)}>{"//"}</span>
          {subtitle}
        </p>
      )}

      {/* GLOWING DISTINCT ACCENT UNDERLINE */}
      <div
        className={cn(
          "mt-3.5 h-0.5 w-24 sm:w-32 rounded-full bg-gradient-to-r opacity-80 group-hover:w-44 group-hover:opacity-100 transition-all duration-500",
          palette.line,
          !isLeft && "mx-auto"
        )}
      />
    </div>
  );
}