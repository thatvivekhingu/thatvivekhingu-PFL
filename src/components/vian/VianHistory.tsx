"use client";

import React from "react";
import { IconSearch, IconPlus, IconTrash } from "@tabler/icons-react";
import { VianSession, DateGroup } from "@/hooks/useVianSessions";
import { VianHistoryItem } from "./VianHistoryItem";

interface VianHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  groupedSessions: Record<DateGroup, VianSession[]>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewChat: () => void;
  onRenameSession: (id: string, title: string) => void;
  onDeleteSession: (id: string) => void;
  onClearAll: () => void;
}

const DATE_GROUPS: DateGroup[] = ["Today", "Yesterday", "Previous 7 Days", "Earlier"];

export function VianHistory({
  isOpen,
  activeSessionId,
  onSelectSession,
  groupedSessions,
  searchQuery,
  onSearchChange,
  onNewChat,
  onRenameSession,
  onDeleteSession,
  onClearAll,
}: VianHistoryProps) {
  if (!isOpen) return null;

  const totalFilteredCount = Object.values(groupedSessions).reduce((acc, list) => acc + list.length, 0);

  return (
    <div className="absolute inset-y-14 left-0 z-30 flex w-full max-w-[280px] flex-col border-r border-slate-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl transition-all text-slate-900 dark:text-zinc-100">
      {/* Header & Search */}
      <div className="flex flex-col gap-2.5 p-3 border-b border-slate-200 dark:border-zinc-800/60">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 dark:bg-cyan-950/40 px-3 py-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 dark:hover:bg-cyan-900/60 hover:text-cyan-900 dark:hover:text-white transition-all cursor-pointer"
        >
          <IconPlus className="h-3.5 w-3.5" />
          <span>New Chat</span>
        </button>

        <div className="relative flex items-center">
          <IconSearch className="absolute left-2.5 h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/80 pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Sessions Grouped List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {totalFilteredCount === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-xs text-slate-400 dark:text-zinc-500">
            <span>No conversations found</span>
          </div>
        ) : (
          DATE_GROUPS.map((group) => {
            const list = groupedSessions[group];
            if (!list || list.length === 0) return null;

            return (
              <div key={group} className="space-y-1">
                <span className="px-2 text-[10px] font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  {group}
                </span>
                <div className="space-y-0.5">
                  {list.map((session) => (
                    <VianHistoryItem
                      key={session.id}
                      session={session}
                      isActive={session.id === activeSessionId}
                      onSelect={onSelectSession}
                      onRename={onRenameSession}
                      onDelete={onDeleteSession}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Clear All */}
      <div className="border-t border-slate-200 dark:border-zinc-800/60 p-2.5">
        <button
          type="button"
          onClick={onClearAll}
          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1.5 text-xs text-slate-500 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-rose-600 dark:hover:text-rose-400 transition-all cursor-pointer"
        >
          <IconTrash className="h-3.5 w-3.5" />
          <span>Clear History</span>
        </button>
      </div>
    </div>
  );
}
