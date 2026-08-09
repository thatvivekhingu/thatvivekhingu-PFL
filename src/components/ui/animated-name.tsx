"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedNameProps {
  className?: string;
}

export function AnimatedName({ className }: AnimatedNameProps) {
  return (
    <span className={cn("inline-block whitespace-nowrap select-none", className)}>
      <span className="font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 via-indigo-400 to-amber-300 bg-clip-text text-transparent">
        Vivek Hingu
      </span>
    </span>
  );
}
