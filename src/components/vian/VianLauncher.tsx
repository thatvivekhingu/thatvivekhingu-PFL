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
      className="fixed bottom-5 right-5 z-[9990] group inline-flex items-center gap-2.5 rounded-full border border-zinc-700/80 bg-zinc-900/90 backdrop-blur-md px-4 py-2 text-xs font-semibold text-zinc-100 shadow-xl transition-all duration-200 hover:border-cyan-500/50 hover:bg-zinc-800 hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95 cursor-pointer"
    >
      {/* Subtle Online Status Dot */}
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>

      <span className="flex items-center gap-1.5 font-medium tracking-wide">
        <IconSparkles className="h-3.5 w-3.5 text-cyan-400 transition-transform duration-200 group-hover:scale-110" />
        <span>Ask VIAN</span>
      </span>

      {/* Keyboard Shortcut Indicator */}
      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-700/60 bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-400 transition-colors group-hover:border-zinc-600 group-hover:text-zinc-200">
        <span className="text-[10px] leading-none">⌘</span>K
      </kbd>
    </button>
  );
}
