"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";
import { useVianSessions } from "@/hooks/useVianSessions";
import { useVianChat } from "@/hooks/useVianChat";
import { useAutoScroll } from "@/hooks/useAutoScroll";

import { VianHeader } from "./VianHeader";
import { VianHistory } from "./VianHistory";
import { VianMemoryModal } from "./VianMemoryModal";
import { VianEmptyState } from "./VianEmptyState";
import { VianMessageList } from "./VianMessageList";
import { VianInput } from "./VianInput";
import { VianVoiceEngine } from "@/lib/vian/voice-engine";

export function VianAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const voiceEngineRef = useRef<VianVoiceEngine | null>(null);

  useEffect(() => {
    voiceEngineRef.current = new VianVoiceEngine();
    return () => {
      voiceEngineRef.current?.stop();
    };
  }, []);

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

  // Voice Interaction Handlers (Speech-to-Text & Speech Synthesis)
  const toggleVoiceInput = useCallback(() => {
    if (!voiceEngineRef.current) return;

    if (isListening) {
      voiceEngineRef.current.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      if (soundEnabled) playTapSound("pop");

      voiceEngineRef.current.startListening(
        (transcript, isFinal) => {
          if (isFinal && transcript.trim()) {
            setIsListening(false);
            sendMessage(transcript.trim());
          }
        },
        () => setIsListening(false),
        (err) => {
          console.warn("Speech capture warning:", err);
          setIsListening(false);
        }
      );
    }
  }, [isListening, soundEnabled, sendMessage]);

  // Auto-speak responses when sound is enabled
  useEffect(() => {
    if (!soundEnabled || isGenerating || messages.length === 0) return;

    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === "assistant" && lastMsg.content && !lastMsg.isError) {
      setIsSpeaking(true);
      voiceEngineRef.current?.speak(lastMsg.content, () => {
        setIsSpeaking(false);
      });
    }
  }, [messages, isGenerating, soundEnabled]);

  // Open with a fresh conversation session every time
  const handleOpenFresh = useCallback(() => {
    const newId = createNewSession();
    setActiveSessionId(newId);
    setIsHistoryOpen(false);
    setIsMemoryOpen(false);
    setIsOpen(true);
    if (soundEnabled) playTapSound("chime");
  }, [createNewSession, setActiveSessionId, soundEnabled]);

  const handleClose = useCallback(() => {
    voiceEngineRef.current?.stop();
    setIsListening(false);
    setIsSpeaking(false);
    setIsOpen(false);
    setIsHistoryOpen(false);
    setIsMemoryOpen(false);
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
      {/* Futuristic Jarvis Command Center Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Dimmed Glassmorphic Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Sleek Glassmorphic Floating Panel Container */}
            <motion.div
              ref={phoneContainerRef}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative z-10 flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-500/30 dark:border-cyan-500/40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] ring-1 ring-white/10 w-full max-w-[620px] h-[82vh] max-h-[740px] min-h-[520px]"
            >
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
              <div className="relative flex flex-1 flex-col overflow-hidden bg-slate-50/50 dark:bg-zinc-950/50">
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
                isListening={isListening}
                onToggleVoice={toggleVoiceInput}
                isSpeaking={isSpeaking}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
