"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";
import { useVianSessions } from "@/hooks/useVianSessions";
import { useVianChat } from "@/hooks/useVianChat";
import { useAutoScroll } from "@/hooks/useAutoScroll";

import { VianLauncher } from "./VianLauncher";
import { VianHeader } from "./VianHeader";
import { VianHistory } from "./VianHistory";
import { VianEmptyState } from "./VianEmptyState";
import { VianMessageList } from "./VianMessageList";
import { VianInput } from "./VianInput";

export function VianAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const {
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
  } = useVianSessions();

  const {
    messages,
    setSessionMessages,
    isGenerating,
    sendMessage,
    stopGeneration,
    regenerateLastMessage,
  } = useVianChat({
    sessionId: activeSessionId,
    initialMessages: activeSession?.messages || [],
    onMessagesChange: updateSessionMessages,
  });

  // Sync internal chat messages whenever user switches active session
  useEffect(() => {
    if (activeSession) {
      setSessionMessages(activeSession.messages);
    }
  }, [activeSessionId, activeSession, setSessionMessages]);

  // Intelligent auto-scroll
  const { endRef } = useAutoScroll<HTMLDivElement>([messages, isGenerating]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (soundEnabled) playTapSound("chime");
  }, [soundEnabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsHistoryOpen(false);
    if (soundEnabled) playTapSound("pop");
  }, [soundEnabled]);

  // Keyboard Shortcuts (⌘K / Ctrl+K to toggle, Esc to close) and Custom Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    const handleCustomQuery = (e: Event) => {
      const customEvent = e as CustomEvent<{ query: string }>;
      if (customEvent.detail && customEvent.detail.query) {
        setIsOpen(true);
        sendMessage(customEvent.detail.query);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("openVianWithQuery", handleCustomQuery);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("openVianWithQuery", handleCustomQuery);
    };
  }, [isOpen, handleClose, sendMessage]);

  const handleNewChat = () => {
    const newId = createNewSession();
    setActiveSessionId(newId);
    setIsHistoryOpen(false);
    if (soundEnabled) playTapSound("pop");
  };

  const handleSendPrompt = (text: string) => {
    sendMessage(text);
    if (soundEnabled) playTapSound("pop");
  };

  return (
    <>
      {/* Product-Style Compact Launcher */}
      <VianLauncher onClick={handleOpen} isOpen={isOpen} />

      {/* Main Application Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-end justify-end p-0 sm:p-6 pointer-events-none">
            {/* Backdrop Overlay for Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden pointer-events-auto"
            />

            {/* Floating App Window Card (Desktop 460px x 680px, Mobile Full Screen) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto relative flex h-full w-full flex-col overflow-hidden bg-zinc-950 text-zinc-100 shadow-2xl sm:h-[680px] sm:max-h-[85vh] sm:w-[460px] sm:rounded-2xl sm:border sm:border-zinc-800/80"
            >
              {/* Header */}
              <VianHeader
                onNewChat={handleNewChat}
                onToggleHistory={() => setIsHistoryOpen((prev) => !prev)}
                onClose={handleClose}
                isHistoryOpen={isHistoryOpen}
                soundEnabled={soundEnabled}
                onToggleSound={() => setSoundEnabled((prev) => !prev)}
              />

              {/* History Drawer Sidebar Overlay */}
              <VianHistory
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                activeSessionId={activeSessionId}
                onSelectSession={(id) => {
                  setActiveSessionId(id);
                  setIsHistoryOpen(false);
                }}
                groupedSessions={groupedSessions}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onNewChat={handleNewChat}
                onRenameSession={renameSession}
                onDeleteSession={deleteSession}
                onClearAll={clearAllSessions}
              />

              {/* Main Content View (Empty State vs Conversation List) */}
              <div className="relative flex flex-1 flex-col overflow-hidden bg-zinc-950">
                {messages.length === 0 ? (
                  <VianEmptyState onSelectPrompt={handleSendPrompt} />
                ) : (
                  <VianMessageList
                    messages={messages}
                    isGenerating={isGenerating}
                    endRef={endRef}
                    onRegenerate={regenerateLastMessage}
                  />
                )}
              </div>

              {/* Input Footer */}
              <VianInput
                onSend={handleSendPrompt}
                onStop={stopGeneration}
                isGenerating={isGenerating}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
