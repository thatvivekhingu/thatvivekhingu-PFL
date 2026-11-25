"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type SectionHeadingColor = "cyan" | "indigo" | "emerald" | "amber" | "orange" | "sky" | "blue";

interface SectionHeadingProps {
  icon?: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
  color?: SectionHeadingColor;
  accentColor?: string;
}

export const headingIconClass = "h-5 w-5 sm:h-6 sm:w-6 text-[#3B82F6]";

export function SectionHeading({
  children,
  className = "",
  align = "left",
  accentColor = "text-[#3B82F6]",
}: SectionHeadingProps) {
  const isLeft = align === "left";

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
        "relative w-full pt-3 sm:pt-6 pb-2 sm:pb-4 overflow-hidden select-none",
        isLeft ? "text-left" : "text-center",
        className
      )}
    >
      <h2 className="font-[family-name:var(--font-anton)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none uppercase">
        {content}
      </h2>
    </div>
  );
}