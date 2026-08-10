"use client";

import React from "react";
import {
  IconPlus,
  IconHistory,
  IconX,
  IconSparkles,
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";

interface VianHeaderProps {
  onNewChat: () => void;
  onToggleHistory: () => void;
  onClose: () => void;
  isHistoryOpen: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function VianHeader({
  onNewChat,
  onToggleHistory,
  onClose,
  isHistoryOpen,
  soundEnabled,
  onToggleSound,
}: VianHeaderProps) {
  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-4 backdrop-blur-md">
      {/* Title & Avatar */}
      <div className="flex items-center gap-2.5">
        <div className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/50 text-cyan-400 shadow-sm">
          <IconSparkles className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-zinc-100 tracking-wide">VIAN</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" title="Online" />
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">Vivek&#39;s AI Assistant</span>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1">
        {/* New Chat */}
        <button
          type="button"
          onClick={onNewChat}
          aria-label="New Chat"
          title="New Chat"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100 transition-all cursor-pointer"
        >
          <IconPlus className="h-4 w-4" />
        </button>

        {/* Toggle History */}
        <button
          type="button"
          onClick={onToggleHistory}
          aria-label="Chat History"
          title="Chat History"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-md border transition-all cursor-pointer ${
            isHistoryOpen
              ? "border-cyan-500/40 bg-cyan-950/40 text-cyan-300"
              : "border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100"
          }`}
        >
          <IconHistory className="h-4 w-4" />
        </button>

        {/* Toggle Sound */}
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          title={soundEnabled ? "Mute sound" : "Enable sound"}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100 transition-all cursor-pointer"
        >
          {soundEnabled ? (
            <IconVolume className="h-4 w-4 text-cyan-400" />
          ) : (
            <IconVolumeOff className="h-4 w-4 text-zinc-500" />
          )}
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Assistant"
          title="Close (Esc)"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100 transition-all cursor-pointer"
        >
          <IconX className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
