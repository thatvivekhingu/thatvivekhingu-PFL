import Image from "next/image";
import {
  IconPlus,
  IconHistory,
  IconX,
  IconVolume,
  IconVolumeOff,
  IconBrain,
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
}: VianHeaderProps) {
  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/80 px-4 backdrop-blur-md">
      {/* Title & Avatar */}
      <div className="flex items-center gap-2.5">
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-cyan-500/40 shadow-sm shrink-0">
          <Image
            src="/vian-avatar.jpg"
            alt="VIAN Logo"
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900 dark:text-zinc-100 tracking-wide">VIAN</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" title="Online" />
          </div>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">Vivek&#39;s AI Assistant</span>
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
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 dark:border-transparent text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100 transition-all cursor-pointer"
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
              ? "border-cyan-500/40 bg-cyan-500/10 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300"
              : "border-slate-200 dark:border-transparent text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100"
          }`}
        >
          <IconHistory className="h-4 w-4" />
        </button>

        {/* Toggle Memory Bank */}
        {onToggleMemory && (
          <button
            type="button"
            onClick={onToggleMemory}
            aria-label="Jarvis Memory Bank"
            title={`Jarvis Memory Bank (${memoryCount} remembered facts)`}
            className={`relative inline-flex h-8 w-8 items-center justify-center rounded-md border transition-all cursor-pointer ${
              isMemoryOpen
                ? "border-purple-500/40 bg-purple-500/10 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300"
                : "border-slate-200 dark:border-transparent text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100"
            }`}
          >
            <IconBrain className="h-4 w-4" />
            {memoryCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-500 text-[9px] font-bold text-white shadow-xs">
                {memoryCount > 9 ? "9+" : memoryCount}
              </span>
            )}
          </button>
        )}

        {/* Toggle Sound */}
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          title={soundEnabled ? "Mute sound" : "Enable sound"}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 dark:border-transparent text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100 transition-all cursor-pointer"
        >
          {soundEnabled ? (
            <IconVolume className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          ) : (
            <IconVolumeOff className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
          )}
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Assistant"
          title="Close (Esc)"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 dark:border-transparent text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-zinc-100 transition-all cursor-pointer"
        >
          <IconX className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
