"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";
import { useVianSessions } from "@/hooks/useVianSessions";
import { useVianChat } from "@/hooks/useVianChat";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { IconWifi } from "@tabler/icons-react";

import { VianHeader } from "./VianHeader";
import { VianHistory } from "./VianHistory";
import { VianMemoryModal } from "./VianMemoryModal";
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

  // Prevent background scrolling when assistant modal is open (robust mobile touch + desktop lock)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      touchAction: document.body.style.touchAction,
    };
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.touchAction = "none";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyStyle.overflow;
      document.body.style.position = originalBodyStyle.position;
      document.body.style.top = originalBodyStyle.top;
      document.body.style.width = originalBodyStyle.width;
      document.body.style.touchAction = originalBodyStyle.touchAction;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

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
      {/* iPhone 17 Pro Max Interactive Phone Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2.5 sm:p-6 overflow-hidden overscroll-none touch-none">
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/65 dark:bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Apple Dynamic Island Expansion Frame (Blooms outward from top pill with Apple spring physics) */}
            <motion.div
              ref={phoneContainerRef}
              initial={{ opacity: 0, scale: 0.84, y: -45, scaleY: 0.72 }}
              animate={{ opacity: 1, scale: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, scale: 0.84, y: -45, scaleY: 0.72 }}
              transition={{ type: "spring", damping: 28, stiffness: 350, mass: 0.82 }}
              style={{ transformOrigin: "top center" }}
              className="relative z-10 flex flex-col overflow-hidden rounded-[44px] sm:rounded-[52px] border-[4px] sm:border-[5px] border-[#18181b] bg-[#0c0c0e] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.14)] w-full max-w-[360px] sm:max-w-[372px] h-[86vh] max-h-[770px] min-h-[540px] touch-auto overscroll-contain"
            >
              {/* Phone Inner Screen Display (Seamless Edge-to-Edge) */}
              <div className="relative flex flex-col flex-1 w-full h-full overflow-hidden rounded-[40px] sm:rounded-[47px] bg-[#f0ede6] dark:bg-[#0b141a] text-slate-900 dark:text-zinc-100 shadow-inner">
                
                {/* iPhone Status Bar & Dynamic Island (Matching Apple iOS) */}
                <div className="relative shrink-0 w-full pt-2.5 pb-1 px-5 flex items-center justify-between text-[11px] font-semibold text-slate-900 dark:text-zinc-200 z-30 select-none bg-[#f6f4f0]/95 dark:bg-[#1f2c34]">
                  {/* Left Clock */}
                  <span className="font-semibold tracking-tight text-slate-900 dark:text-zinc-100 pl-1 font-sans">09:41</span>

                  {/* Dynamic Island Notch Center */}
                  <div className="h-5.5 w-24 sm:w-26 rounded-full bg-black flex items-center justify-between px-2.5 shadow-md border border-white/5">
                    <span className="h-2 w-2 rounded-full bg-[#18181b] ring-1 ring-neutral-800 flex items-center justify-center">
                      <span className="h-0.5 w-0.5 rounded-full bg-cyan-400/90 shadow-[0_0_3px_#22d3ee]" />
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                  </div>

                  {/* Right Status Icons (4 Signal Bars, Wifi, Battery) */}
                  <div className="flex items-center gap-1.5 text-slate-900 dark:text-zinc-100 pr-1">
                    <div className="flex items-end gap-[1.5px] h-2.5">
                      <span className="w-[2px] h-[3px] bg-current rounded-[0.5px]" />
                      <span className="w-[2px] h-[5px] bg-current rounded-[0.5px]" />
                      <span className="w-[2px] h-[7px] bg-current rounded-[0.5px]" />
                      <span className="w-[2px] h-[9.5px] bg-current rounded-[0.5px]" />
                    </div>
                    <IconWifi className="h-3 w-3 stroke-[2.4]" />
                    <div className="flex items-center">
                      <div className="w-4.5 h-2.5 rounded-[3px] border border-current p-[1.5px] flex items-center">
                        <div className="h-full w-full bg-current rounded-[1px]" />
                      </div>
                      <div className="w-[1.5px] h-1 bg-current rounded-r-[0.5px] ml-[0.5px]" />
                    </div>
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
                  isGenerating={isGenerating}
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

                {/* Main Chat Screen View (Authentic WhatsApp Chat Wallpaper) */}
                <div className="relative flex flex-1 flex-col overflow-hidden bg-[#efeae2] dark:bg-[#0b141a]">
                  {/* WhatsApp Iconic Doodle Wallpaper Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.045] z-0"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140' fill='none' stroke='%238696a0' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'><path d='M20 20h22v14H28l-8 8z'/><circle cx='105' cy='30' r='9'/><path d='M90 95h22a4 4 0 0 1 4 4v14l-8-5h-18a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4z'/><path d='M25 85h14v12H25z'/><path d='M20 97h24'/><circle cx='60' cy='60' r='3.5'/><path d='M100 60l5 10-10 5z'/><path d='M50 115a6 6 0 0 0 6-6 6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 5 6 9 6 9z'/><circle cx='60' cy='20' r='2'/><circle cx='125' cy='115' r='2.5'/><path d='M115 15l10 10m0-10l-10 10'/></svg>")`,
                      backgroundSize: '140px 140px',
                    }}
                  />

                  <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
                    <VianMessageList
                      messages={messages}
                      isGenerating={isGenerating}
                      endRef={endRef}
                      onRegenerate={regenerateLastMessage}
                      onSelectPrompt={handleSendPrompt}
                    />
                  </div>
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

                {/* Interactive iPhone Bottom Home Indicator Bar (Tap or Swipe up to go Home) */}
                <div className="shrink-0 pt-2 pb-2.5 flex flex-col items-center justify-center bg-[#f0f2f5] dark:bg-[#202c33] select-none border-t border-black/[0.04] dark:border-white/5">
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={{ top: 0.65, bottom: 0 }}
                    onDragEnd={(_e, info) => {
                      if (info.offset.y < -25 || info.velocity.y < -200) {
                        handleClose();
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92, opacity: 0.6 }}
                    aria-label="Home Indicator - Tap or swipe up to go Home"
                    title="Tap or swipe up to return Home"
                    className="group relative flex items-center justify-center py-1.5 px-6 cursor-pointer touch-none"
                  >
                    <div className="w-32 h-1.5 bg-slate-400/90 dark:bg-neutral-500/90 group-hover:bg-slate-600 dark:group-hover:bg-white/80 active:bg-slate-800 dark:active:bg-white rounded-full transition-all duration-200 shadow-xs" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
