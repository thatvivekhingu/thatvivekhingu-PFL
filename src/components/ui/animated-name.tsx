"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedNameProps {
  className?: string;
}

export function AnimatedName({ className }: AnimatedNameProps) {
  return (
    <span className={cn("inline-block whitespace-nowrap select-none", className)}>
      <span className="font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
        Vivek Hingu
      </span>

    </span>
  );
}
