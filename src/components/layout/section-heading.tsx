"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type SectionHeadingColor = "cyan" | "indigo" | "emerald" | "amber" | "orange" | "sky" | "blue";

interface SectionHeadingProps {
  number?: string;
  chapter?: string;
  icon?: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  color?: SectionHeadingColor;
  accentColor?: string;
  rightElement?: React.ReactNode;
  hideDivider?: boolean;
}

export const headingIconClass = "h-5 w-5 sm:h-6 sm:w-6 text-[#3B82F6]";

export function SectionHeading({
  number,
  chapter,
  children,
  className = "",
  align = "left",
  accentColor = "text-[#3B82F6]",
  rightElement,
  hideDivider = false,
}: SectionHeadingProps) {
  const isLeft = align === "left";

  const chapterText = chapter !== undefined ? chapter : (number ? `CHAPTER ${number}` : "");

  // If children is a plain string, automatically style the first word with accent color and the rest in white
  let content = children;
  if (typeof children === "string") {
    const trimmed = children.trim();
    const firstSpaceIndex = trimmed.indexOf(" ");
    if (firstSpaceIndex !== -1) {
      const firstWord = trimmed.slice(0, firstSpaceIndex);
      const restWords = trimmed.slice(firstSpaceIndex + 1);
      content = (
        <>
          <span className={accentColor}>{firstWord}</span>{" "}
          <span className="text-white">{restWords}</span>
        </>
      );
    } else {
      content = <span className={accentColor}>{trimmed}</span>;
    }
  }

  return (
    <div
      className={cn(
        "relative w-full pt-3 sm:pt-6 pb-2 sm:pb-4 select-none flex items-end justify-between gap-3 overflow-hidden",
        !hideDivider && "border-b border-zinc-200/80 dark:border-zinc-800/80 mb-4 sm:mb-8",
        isLeft ? "text-left" : "text-center",
        className
      )}
    >
      {/* Left Column: Chapter Subtitle & Anton Heading */}
      <div className="flex flex-col z-10 max-w-[85%] sm:max-w-[75%] pr-2">
        {chapterText && (
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-mono uppercase tracking-wider mb-1 sm:mb-2 select-none">
            <span className="text-[#3B82F6] font-bold">{"//"}</span>
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{chapterText}</span>
          </div>
        )}
        <h2 className="font-[family-name:var(--font-anton)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none uppercase">
          {content}
        </h2>
      </div>

      {/* Right Column: Custom Controls & Giant Outline Number */}
      <div className="flex items-end gap-3 sm:gap-6 z-10 shrink-0">
        {rightElement && <div className="mb-1 sm:mb-2">{rightElement}</div>}
        {number && (
          <span
            aria-hidden="true"
            className="font-[family-name:var(--font-anton)] text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black leading-none tracking-tighter select-none pointer-events-none text-transparent [-webkit-text-stroke:1.5px_rgba(0,0,0,0.18)] dark:[-webkit-text-stroke:2px_rgba(255,255,255,0.18)] pr-1 sm:pr-2 transition-all duration-300"
          >
            {number}
          </span>
        )}
      </div>
    </div>
  );
}