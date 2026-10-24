import Image from "next/image";
import React, { useState } from "react";
import {
  IconChevronLeft,
  IconVideo,
  IconPhone,
  IconDotsVertical,
  IconPlus,
  IconHistory,
  IconVolume,
  IconVolumeOff,
  IconBrain,
  IconCheck,
} from "@tabler/icons-react";

interface VianHeaderProps {
  onNewChat: () => void;
  onToggleHistory: () => void;
  onClose: () => void;
  isHistoryOpen: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  memoryCount?: number;
  onToggleMemory?: () => void;
  isMemoryOpen?: boolean;
  isGenerating?: boolean;
}

export function VianHeader({
  onNewChat,
  onToggleHistory,
  onClose,
  isHistoryOpen,
  soundEnabled,
  onToggleSound,
  memoryCount = 0,
  onToggleMemory,
  isMemoryOpen = false,
  isGenerating = false,
}: VianHeaderProps) {
  const [callToast, setCallToast] = useState<string | null>(null);

  const triggerCallToast = (msg: string) => {
    setCallToast(msg);
    setTimeout(() => setCallToast(null), 3000);
  };

  return (
    <header className="relative flex h-14 w-full shrink-0 items-center justify-between border-b border-black/[0.06] dark:border-white/5 bg-[#f6f4f0]/95 dark:bg-[#1f2c34] px-2.5 sm:px-3 text-slate-800 dark:text-zinc-100 z-30 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">
      {/* Fun Call Notice Toast */}
      {callToast && (
        <div className="absolute top-15 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-full bg-black/90 text-white text-[11px] font-sans font-medium border border-white/20 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 whitespace-nowrap">
          {callToast}
        </div>
      )}

      {/* WhatsApp Left Bar: Back Chevron + DP + Contact Name & Online */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        {/* iOS Back Chevron */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Back"
          title="Back"
          className="p-1 -ml-1 text-slate-800 dark:text-zinc-200 hover:opacity-70 transition-opacity cursor-pointer"
        >
          <IconChevronLeft className="h-6 w-6 stroke-[2.5]" />
        </button>

        {/* Profile Avatar */}
        <div
          onClick={onNewChat}
          title="Start fresh chat with Vivek"
          className="relative h-9 w-9 shrink-0 rounded-full overflow-hidden border border-slate-300 dark:border-zinc-700 cursor-pointer shadow-xs hover:scale-105 transition-transform"
        >
          <Image
            src="/avatars/vivek.jpg"
            alt="Vivek Hingu"
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>

        {/* Contact Name & Status */}
        <div className="flex flex-col min-w-0 ml-1">
          <div className="flex items-center gap-1 leading-tight">
            <span className="text-sm font-semibold text-slate-900 dark:text-[#e9edef] truncate tracking-tight font-sans">
              Vivek Hingu 🧠
            </span>
          </div>
          {isGenerating ? (
            <span className="text-[11px] font-medium text-[#00a884] dark:text-[#25d366] italic tracking-wide animate-pulse">
              typing...
            </span>
          ) : (
            <span className="text-[11px] text-slate-500 dark:text-[#8696a0] font-sans">
              Online
            </span>
          )}
        </div>
      </div>

      {/* WhatsApp Right Action Icons: Video Camera & Phone Receiver */}
      <div className="flex items-center gap-2 sm:gap-3 text-slate-800 dark:text-[#e9edef] pr-1">
        {/* Video Call */}
        <button
          type="button"
          onClick={() => triggerCallToast("Vivek is currently coding models ☕")}
          aria-label="Video call"
          title="Video call"
          className="p-1 text-slate-800 dark:text-zinc-200 hover:opacity-70 transition-opacity cursor-pointer"
        >
          <IconVideo className="h-6 w-6 stroke-[1.8]" />
        </button>

        {/* Audio Call */}
        <button
          type="button"
          onClick={() => triggerCallToast("Busy training neural nets on GPU 🤖")}
          aria-label="Audio call"
          title="Audio call"
          className="p-1 text-slate-800 dark:text-zinc-200 hover:opacity-70 transition-opacity cursor-pointer"
        >
          <IconPhone className="h-5.5 w-5.5 stroke-[1.8]" />
        </button>

        {/* New Chat */}
        <button
          type="button"
          onClick={onNewChat}
          aria-label="New Chat"
          title="New Chat"
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <IconPlus className="h-5 w-5" />
        </button>

        {/* Chat History */}
        <button
          type="button"
          onClick={onToggleHistory}
          aria-label="Chat History"
          title="Chat History"
          className={`p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer ${
            isHistoryOpen
              ? "text-emerald-600 dark:text-[#25d366] bg-emerald-500/10"
              : "hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <IconHistory className="h-4.5 w-4.5" />
        </button>

        {/* Memory Bank */}
        {onToggleMemory && (
          <button
            type="button"
            onClick={onToggleMemory}
            aria-label="Memory Bank"
            title={`Memory Bank (${memoryCount} remembered facts)`}
            className={`relative p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer ${
              isMemoryOpen
                ? "text-purple-600 dark:text-purple-400 bg-purple-500/10"
                : "hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <IconBrain className="h-4.5 w-4.5" />
            {memoryCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-500 text-[8.5px] font-bold text-white shadow-xs">
                {memoryCount > 9 ? "9+" : memoryCount}
              </span>
            )}
          </button>
        )}

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          title={soundEnabled ? "Mute sound" : "Enable sound"}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <IconVolume className="h-4.5 w-4.5 text-emerald-600 dark:text-[#25d366]" />
          ) : (
            <IconVolumeOff className="h-4.5 w-4.5 text-slate-400 dark:text-zinc-500" />
          )}
        </button>
      </div>
    </header>
  );
}
