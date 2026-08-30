"use client";

import React from "react";
import { IconBrain, IconTrash, IconX } from "@tabler/icons-react";
import type { UserMemoryItem } from "@/lib/vian/memory-engine";

interface VianMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memories: UserMemoryItem[];
  onClearAll: () => void;
  onRemoveMemory: (id: string) => void;
}

export function VianMemoryModal({
  isOpen,
  onClose,
  memories,
  onClearAll,
  onRemoveMemory,
}: VianMemoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-y-14 left-0 z-30 flex w-full flex-col border-r border-slate-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl transition-all text-slate-900 dark:text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-zinc-800/60">
        <div className="flex items-center gap-2">
          <IconBrain className="h-4 w-4 text-purple-500" />
          <span className="text-xs font-bold tracking-wide">Jarvis Memory Bank</span>
          <span className="rounded-full bg-purple-500/10 dark:bg-purple-950/50 px-2 py-0.5 text-[10px] font-mono font-semibold text-purple-600 dark:text-purple-400">
            {memories.length} facts
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-200 cursor-pointer"
        >
          <IconX className="h-4 w-4" />
        </button>
      </div>

      {/* Info / Description */}
      <div className="bg-purple-500/5 dark:bg-purple-950/20 px-3.5 py-2 text-[11px] text-zinc-600 dark:text-zinc-400 border-b border-purple-500/10">
        VIAN autonomously learns and remembers your name, role, coding styles, and project preferences across sessions.
      </div>

      {/* Memories List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {memories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-2 text-zinc-400">
            <IconBrain className="h-8 w-8 text-zinc-500 opacity-50" />
            <p className="text-xs font-medium">No remembered facts yet</p>
            <p className="text-[11px] text-zinc-500 max-w-[200px]">
              Chat naturally with VIAN (e.g. &quot;My name is Alex&quot; or &quot;I prefer Python&quot;) and facts will appear here.
            </p>
          </div>
        ) : (
          memories.map((mem) => (
            <div
              key={mem.id}
              className="group relative flex items-start justify-between gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-2.5 text-xs shadow-xs"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-purple-500/10 dark:bg-purple-950/60 px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase text-purple-600 dark:text-purple-400">
                    {mem.category}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {new Date(mem.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-zinc-800 dark:text-zinc-200 font-medium text-[11px] leading-snug">
                  {mem.content}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRemoveMemory(mem.id)}
                title="Forget this memory"
                className="opacity-0 group-hover:opacity-100 transition-opacity rounded p-1 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 cursor-pointer shrink-0"
              >
                <IconTrash className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer / Clear All */}
      {memories.length > 0 && (
        <div className="p-3 border-t border-slate-200 dark:border-zinc-800/60">
          <button
            type="button"
            onClick={onClearAll}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 dark:bg-red-950/20 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <IconTrash className="h-3.5 w-3.5" />
            <span>Clear All Memories</span>
          </button>
        </div>
      )}
    </div>
  );
}
