"use client";

import { useState, useEffect, useCallback } from "react";
import type { VianToolAction } from "@/lib/vian/agent-tools";
import type { AgentTraceStep } from "@/lib/vian/multi-agent";

export interface VianMessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  isError?: boolean;
  actions?: VianToolAction[];
  trace?: AgentTraceStep[];
}

export interface VianSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: VianMessageItem[];
}

export type DateGroup = "Today" | "Yesterday" | "Previous 7 Days" | "Earlier";

const STORAGE_KEY = "vian_sessions_v3";

const generateSessionId = () => `session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const getDateGroup = (timestamp: number): DateGroup => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "Previous 7 Days";
  return "Earlier";
};

export function useVianSessions() {
  const [sessions, setSessions] = useState<VianSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Initialize and load sessions from versioned localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: VianSession[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          setActiveSessionId(parsed[0].id);
          return;
        }
      }
    } catch (err) {
      console.warn("Failed to load vian_sessions_v3 from localStorage, creating fresh session:", err);
    }

    // Create default initial session if none exists
    const initId = generateSessionId();
    const defaultSession: VianSession = {
      id: initId,
      title: "New Conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setSessions([defaultSession]);
    setActiveSessionId(initId);
  }, []);

  // Save sessions to localStorage whenever sessions change
  const saveSessions = useCallback((updatedSessions: VianSession[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
    } catch (err) {
      console.error("Failed to persist vian_sessions_v3:", err);
    }
  }, []);

  const createNewSession = useCallback(() => {
    const newId = generateSessionId();
    const newSession: VianSession = {
      id: newId,
      title: "New Conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };

    setSessions((prev) => {
      const updated = [newSession, ...prev];
      saveSessions(updated);
      return updated;
    });

    setActiveSessionId(newId);
    return newId;
  }, [saveSessions]);

  const updateSessionMessages = useCallback(
    (sessionId: string, newMessages: VianMessageItem[], customTitle?: string) => {
      setSessions((prev) => {
        const updated = prev.map((s) => {
          if (s.id !== sessionId) return s;

          let title = s.title;
          if (customTitle) {
            title = customTitle;
          } else if (s.title === "New Conversation" && newMessages.length > 0) {
            const firstUserMsg = newMessages.find((m) => m.role === "user");
            if (firstUserMsg) {
              const rawText = firstUserMsg.content.trim();
              title = rawText.length > 32 ? `${rawText.slice(0, 30)}...` : rawText;
            }
          }

          return {
            ...s,
            title,
            updatedAt: Date.now(),
            messages: newMessages,
          };
        });

        // Re-sort by updatedAt descending
        updated.sort((a, b) => b.updatedAt - a.updatedAt);
        saveSessions(updated);
        return updated;
      });
    },
    [saveSessions]
  );

  const renameSession = useCallback(
    (sessionId: string, newTitle: string) => {
      const trimmed = newTitle.trim();
      if (!trimmed) return;

      setSessions((prev) => {
        const updated = prev.map((s) => (s.id === sessionId ? { ...s, title: trimmed, updatedAt: Date.now() } : s));
        saveSessions(updated);
        return updated;
      });
    },
    [saveSessions]
  );

  const deleteSession = useCallback(
    (sessionId: string) => {
      setSessions((prev) => {
        const filtered = prev.filter((s) => s.id !== sessionId);
        let updated = filtered;

        if (filtered.length === 0) {
          const newId = generateSessionId();
          const fallbackSession: VianSession = {
            id: newId,
            title: "New Conversation",
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messages: [],
          };
          updated = [fallbackSession];
          setActiveSessionId(newId);
        } else if (activeSessionId === sessionId) {
          setActiveSessionId(filtered[0].id);
        }

        saveSessions(updated);
        return updated;
      });
    },
    [activeSessionId, saveSessions]
  );

  const clearAllSessions = useCallback(() => {
    const newId = generateSessionId();
    const freshSession: VianSession = {
      id: newId,
      title: "New Conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setSessions([freshSession]);
    setActiveSessionId(newId);
    saveSessions([freshSession]);
  }, [saveSessions]);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Group filtered sessions by date
  const filteredSessions = sessions.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.messages.some((m) => m.content.toLowerCase().includes(q))
    );
  });

  const groupedSessions: Record<DateGroup, VianSession[]> = {
    Today: [],
    Yesterday: [],
    "Previous 7 Days": [],
    Earlier: [],
  };

  for (const s of filteredSessions) {
    const group = getDateGroup(s.updatedAt);
    groupedSessions[group].push(s);
  }

  return {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    searchQuery,
    setSearchQuery,
    groupedSessions,
    createNewSession,
    updateSessionMessages,
    renameSession,
    deleteSession,
    clearAllSessions,
  };
}
