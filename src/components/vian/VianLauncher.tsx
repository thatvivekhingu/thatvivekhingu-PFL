"use client";

import React from "react";
import { IconSparkles } from "@tabler/icons-react";

interface VianLauncherProps {
  onClick: () => void;
  isOpen: boolean;
}

export function VianLauncher({ onClick, isOpen }: VianLauncherProps) {
  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open VIAN AI Assistant"
      aria-expanded={isOpen}
      className="fixed bottom-5 right-5 z-[9990] group relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-slate-800 dark:text-zinc-100 shadow-xl transition-all duration-300 hover:scale-110 hover:border-cyan-500/60 dark:hover:border-cyan-500/60 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-95 cursor-pointer"
    >
      {/* Online Status Dot Badge */}
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
      </span>

      {/* Center AI Sparkles Icon */}
      <IconSparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

      {/* Tooltip on Hover */}
      <span className="absolute right-14 whitespace-nowrap rounded-md bg-slate-900 dark:bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-white opacity-0 transition-all duration-200 group-hover:opacity-100 pointer-events-none shadow-md border border-slate-800 dark:border-zinc-700">
        Ask VIAN (⌘K)
      </span>
    </button>
  );
}
