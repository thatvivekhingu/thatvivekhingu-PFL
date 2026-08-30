"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";
import { useVianSessions } from "@/hooks/useVianSessions";
import { useVianChat } from "@/hooks/useVianChat";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { IconWifi, IconBattery4 } from "@tabler/icons-react";

import { VianHeader } from "./VianHeader";
import { VianHistory } from "./VianHistory";
import { VianMemoryModal } from "./VianMemoryModal";
import { VianEmptyState } from "./VianEmptyState";
import { VianMessageList } from "./VianMessageList";
import { VianInput } from "./VianInput";

export function VianAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const phoneContainerRef = useRef<HTMLDivElement>(null);

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
    userMemories,
    clearUserMemories,
    removeUserMemory,
  } = useVianChat({
    sessionId: activeSessionId,
    initialMessages: activeSession?.messages || [],
    onMessagesChange: updateSessionMessages,
  });

  // Sync internal chat messages whenever active session updates
  useEffect(() => {
    if (activeSession) {
      setSessionMessages(activeSession.messages);
    }
  }, [activeSessionId, activeSession, setSessionMessages]);

  // Auto-scroll hook
  const { endRef } = useAutoScroll<HTMLDivElement>([messages, isGenerating]);

  // Open with a fresh conversation session every time
  const handleOpenFresh = useCallback(() => {
    const newId = createNewSession();
    setActiveSessionId(newId);
    setIsHistoryOpen(false);
    setIsOpen(true);
    if (soundEnabled) playTapSound("chime");
  }, [createNewSession, setActiveSessionId, soundEnabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsHistoryOpen(false);
    if (soundEnabled) playTapSound("pop");
  }, [soundEnabled]);

  // Global listeners (Keyboard ⌘K, ESC, and custom event triggers)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!isOpen) {
          handleOpenFresh();
        } else {
          handleClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    const handleCustomFresh = () => {
      handleOpenFresh();
    };

    const handleCustomQuery = (e: Event) => {
      const customEvent = e as CustomEvent<{ query: string }>;
      handleOpenFresh();
      if (customEvent.detail && customEvent.detail.query) {
        setTimeout(() => {
          sendMessage(customEvent.detail.query);
        }, 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("openVianFresh", handleCustomFresh);
    window.addEventListener("openVianWithQuery", handleCustomQuery);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("openVianFresh", handleCustomFresh);
      window.removeEventListener("openVianWithQuery", handleCustomQuery);
    };
  }, [isOpen, handleOpenFresh, handleClose, sendMessage]);

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
      {/* iPhone 17 Pro Max Interactive Phone Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md cursor-pointer"
            />

            {/* iPhone 17 Pro Max Device Frame Container */}
            <motion.div
              ref={phoneContainerRef}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 flex flex-col overflow-hidden rounded-[46px] sm:rounded-[54px] border-[7px] sm:border-[9px] border-slate-300 dark:border-neutral-700 bg-slate-900 dark:bg-neutral-950 p-2 sm:p-2.5 shadow-2xl ring-1 ring-black/10 dark:ring-white/15 w-full max-w-[400px] sm:max-w-[420px] h-[85vh] max-h-[780px] min-h-[580px]"
            >
              {/* Phone Inner Screen Display */}
              <div className="relative flex flex-col flex-1 w-full h-full overflow-hidden rounded-[36px] sm:rounded-[44px] bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 shadow-inner">
                
                {/* iPhone Status Bar & Dynamic Island */}
                <div className="relative shrink-0 w-full pt-1.5 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-800 dark:text-zinc-200 z-30 select-none">
                  {/* Left Clock */}
                  <span className="font-mono tracking-tight text-slate-800 dark:text-zinc-200">9:41</span>

                  {/* Dynamic Island Notch Center */}
                  <div className="h-5 sm:h-5.5 w-24 sm:w-26 rounded-full bg-black flex items-center justify-between px-2 mx-auto shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-900 ring-1 ring-neutral-800" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                  </div>

                  {/* Right Status Icons */}
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-zinc-300">
                    <span className="text-[9px] font-mono font-bold">5G</span>
                    <IconWifi className="h-3 w-3" />
                    <IconBattery4 className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Header Navbar */}
                <VianHeader
                  onNewChat={handleNewChat}
                  onToggleHistory={() => {
                    setIsHistoryOpen((prev) => !prev);
                    setIsMemoryOpen(false);
                  }}
                  onClose={handleClose}
                  isHistoryOpen={isHistoryOpen}
                  soundEnabled={soundEnabled}
                  onToggleSound={() => setSoundEnabled((prev) => !prev)}
                  memoryCount={userMemories.length}
                  onToggleMemory={() => {
                    setIsMemoryOpen((prev) => !prev);
                    setIsHistoryOpen(false);
                  }}
                  isMemoryOpen={isMemoryOpen}
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

                {/* Jarvis Memory Bank Modal */}
                <VianMemoryModal
                  isOpen={isMemoryOpen}
                  onClose={() => setIsMemoryOpen(false)}
                  memories={userMemories}
                  onClearAll={clearUserMemories}
                  onRemoveMemory={removeUserMemory}
                />

                {/* Main Chat Screen View */}
                <div className="relative flex flex-1 flex-col overflow-hidden bg-slate-50 dark:bg-zinc-950">
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

                {/* iPhone Bottom Home Indicator Bar */}
                <div className="shrink-0 pt-1 pb-1 flex justify-center bg-slate-50 dark:bg-zinc-950">
                  <div className="w-32 h-1 bg-slate-400 dark:bg-neutral-700 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
