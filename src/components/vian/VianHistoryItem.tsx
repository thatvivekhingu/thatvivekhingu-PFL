"use client";

import React, { useState } from "react";
import { IconMessage, IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { VianSession } from "@/hooks/useVianSessions";

interface VianHistoryItemProps {
  session: VianSession;
  isActive: boolean;
  onSelect: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export function VianHistoryItem({
  session,
  isActive,
  onSelect,
  onRename,
  onDelete,
}: VianHistoryItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(session.title);

  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (editTitle.trim()) {
      onRename(session.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditTitle(session.title);
  };

  return (
    <div
      onClick={() => !isEditing && onSelect(session.id)}
      className={`group relative flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs transition-all cursor-pointer ${
        isActive
          ? "border-cyan-500/40 bg-cyan-950/30 text-cyan-200 font-medium"
          : "border-transparent text-zinc-300 hover:border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-100"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <IconMessage className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-cyan-400" : "text-zinc-500"}`} />

        {isEditing ? (
          <form onSubmit={handleSaveRename} className="flex flex-1 items-center gap-1 min-w-0">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
              className="flex-1 rounded border border-zinc-700 bg-zinc-950 px-2 py-0.5 text-xs text-zinc-100 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              className="p-0.5 text-emerald-400 hover:text-emerald-300"
            >
              <IconCheck className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="p-0.5 text-zinc-400 hover:text-zinc-200"
            >
              <IconX className="h-3.5 w-3.5" />
            </button>
          </form>
        ) : (
          <span className="truncate font-mono">{session.title}</span>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            aria-label="Rename session"
            className="p-1 text-zinc-400 hover:text-cyan-300 transition-colors"
          >
            <IconEdit className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(session.id);
            }}
            aria-label="Delete session"
            className="p-1 text-zinc-400 hover:text-rose-400 transition-colors"
          >
            <IconTrash className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
