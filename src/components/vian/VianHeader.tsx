import Image from "next/image";
import React, { useState } from "react";
import {
  IconChevronLeft,
  IconVideo,
  IconPhone,
  IconPlus,
  IconHistory,
  IconVolume,
  IconVolumeOff,
  IconBrain,
  IconX,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showOptions, setShowOptions] = useState(false);

  const triggerCallToast = (msg: string) => {
    setCallToast(msg);
    setTimeout(() => setCallToast(null), 3000);
  };

  return (
    <>
      <header className="relative flex h-13 w-full shrink-0 items-center justify-between border-b border-black/[0.06] dark:border-white/5 bg-[#f6f4f0]/95 dark:bg-[#1f2c34] px-2 text-slate-800 dark:text-zinc-100 z-30 shadow-[0_1px_1px_rgba(0,0,0,0.03)]">
        {/* Fun Call Notice Toast */}
        {callToast && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-full bg-black/90 text-white text-[11px] font-sans font-medium border border-white/20 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 whitespace-nowrap">
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

          {/* Contact Bar (Clickable to open Contact Sheet & Settings) */}
          <button
            type="button"
            onClick={() => setShowOptions(true)}
            title="Tap for contact info & chat settings"
            className="flex items-center gap-2 min-w-0 text-left hover:opacity-85 transition-opacity cursor-pointer"
          >
            {/* Profile Avatar */}
            <div className="relative h-8.5 w-8.5 shrink-0 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shadow-xs">
              <Image
                src="/avatars/vivek.jpg"
                alt="Vivek Hingu"
                fill
                sizes="34px"
                className="object-cover"
              />
            </div>

            {/* Contact Name & Status */}
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-slate-900 dark:text-[#e9edef] truncate tracking-tight font-sans leading-tight">
                Vivek Hingu
              </span>
              {isGenerating ? (
                <span className="text-[10.5px] font-medium text-[#00a884] dark:text-[#25d366] italic tracking-wide animate-pulse leading-none mt-0.5">
                  typing...
                </span>
              ) : (
                <span className="text-[10.5px] text-slate-500 dark:text-[#8696a0] font-sans leading-none mt-0.5">
                  Online
                </span>
              )}
            </div>
          </button>
        </div>

        {/* WhatsApp Right Action Icons: EXACTLY 2 ICONS (Video & Phone) as in screenshot */}
        <div className="flex items-center gap-3 text-slate-800 dark:text-[#e9edef] pr-1.5">
          {/* Video Call */}
          <button
            type="button"
            onClick={() => triggerCallToast("Vivek is currently coding models ☕")}
            aria-label="Video call"
            title="Video call"
            className="p-1 text-slate-800 dark:text-zinc-200 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <IconVideo className="h-5.5 w-5.5 stroke-[1.8]" />
          </button>

          {/* Audio Call */}
          <button
            type="button"
            onClick={() => triggerCallToast("Busy training neural nets on GPU 🤖")}
            aria-label="Audio call"
            title="Audio call"
            className="p-1 text-slate-800 dark:text-zinc-200 hover:opacity-70 transition-opacity cursor-pointer"
          >
            <IconPhone className="h-5 w-5 stroke-[1.8]" />
          </button>
        </div>
      </header>

      {/* iOS Contact Options Action Sheet Modal */}
      <AnimatePresence>
        {showOptions && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptions(false)}
              className="absolute inset-0 cursor-pointer"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="relative z-10 w-full rounded-t-[28px] bg-white dark:bg-[#1f2c34] text-slate-900 dark:text-[#e9edef] p-4 shadow-2xl border-t border-black/10 dark:border-white/10"
            >
              {/* Handlebar */}
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-300 dark:bg-neutral-600" />

              {/* Contact Profile Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-black/[0.06] dark:border-white/10">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-black/10 shadow-xs shrink-0">
                  <Image
                    src="/avatars/vivek.jpg"
                    alt="Vivek Hingu"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">Vivek Hingu</h4>
                  <p className="text-xs text-slate-500 dark:text-[#8696a0]">AI & ML Engineer • Always Active</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOptions(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              {/* Chat Actions Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {/* New Chat */}
                <button
                  type="button"
                  onClick={() => {
                    onNewChat();
                    setShowOptions(false);
                  }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-left text-xs font-semibold"
                >
                  <div className="h-7 w-7 rounded-lg bg-[#00a884]/15 text-[#00a884] dark:text-[#25d366] flex items-center justify-center shrink-0">
                    <IconPlus className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  <span>New Chat</span>
                </button>

                {/* History */}
                <button
                  type="button"
                  onClick={() => {
                    onToggleHistory();
                    setShowOptions(false);
                  }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-left text-xs font-semibold"
                >
                  <div className="h-7 w-7 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center shrink-0">
                    <IconHistory className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  <span>History</span>
                </button>

                {/* Memory Bank */}
                {onToggleMemory && (
                  <button
                    type="button"
                    onClick={() => {
                      onToggleMemory();
                      setShowOptions(false);
                    }}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-left text-xs font-semibold relative"
                  >
                    <div className="h-7 w-7 rounded-lg bg-purple-500/15 text-purple-500 flex items-center justify-center shrink-0">
                      <IconBrain className="h-4 w-4 stroke-[2.2]" />
                    </div>
                    <div className="flex flex-col">
                      <span>Memory</span>
                      {memoryCount > 0 && (
                        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-normal">
                          {memoryCount} facts
                        </span>
                      )}
                    </div>
                  </button>
                )}

                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={onToggleSound}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-left text-xs font-semibold"
                >
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                    soundEnabled ? "bg-[#00a884]/15 text-[#00a884] dark:text-[#25d366]" : "bg-slate-200 dark:bg-white/10 text-slate-400"
                  }`}>
                    {soundEnabled ? (
                      <IconVolume className="h-4 w-4 stroke-[2.2]" />
                    ) : (
                      <IconVolumeOff className="h-4 w-4 stroke-[2.2]" />
                    )}
                  </div>
                  <span>{soundEnabled ? "Sound: On" : "Sound: Off"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

