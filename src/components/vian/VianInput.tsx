"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  IconSend,
  IconPlayerStop,
  IconMicrophone,
  IconMicrophoneOff,
} from "@tabler/icons-react";

interface VianInputProps {
  onSend: (text: string) => void;
  onStop: () => void;
  isGenerating: boolean;
  isListening?: boolean;
  onToggleVoice?: () => void;
  isSpeaking?: boolean;
}

export function VianInput({
  onSend,
  onStop,
  isGenerating,
  isListening = false,
  onToggleVoice,
  isSpeaking = false,
}: VianInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on line content (max 4 lines ~ 120px)
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating) {
      onStop();
      return;
    }

    const trimmed = input.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const hasText = input.trim().length > 0;

  return (
    <div className="relative flex flex-col w-full border-t border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
      {/* Animated Jarvis Audio Soundwave Visualizer */}
      {(isListening || isSpeaking) && (
        <div className="flex items-center justify-center gap-1.5 py-1.5 bg-cyan-500/10 dark:bg-cyan-950/30 border-b border-cyan-500/20">
          <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold mr-1">
            {isListening ? "Listening..." : "Jarvis Speaking..."}
          </span>
          <div className="flex items-center gap-1 h-3">
            <span className="w-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:0ms] h-2" />
            <span className="w-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:150ms] h-3.5" />
            <span className="w-1 bg-purple-500 rounded-full animate-bounce [animation-delay:300ms] h-4" />
            <span className="w-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:450ms] h-2.5" />
            <span className="w-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:600ms] h-1.5" />
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="relative flex w-full items-end gap-2 p-3"
      >
        <div className="relative flex flex-1 items-center rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/80 transition-within focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500/40">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isListening
                ? "Listening to your voice..."
                : "Ask VIAN anything or use tools..."
            }
            className="w-full resize-none bg-transparent px-3.5 py-2.5 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none max-h-30 font-sans leading-relaxed"
          />
        </div>

        {/* Voice Input Toggle Button */}
        {onToggleVoice && (
          <button
            type="button"
            onClick={onToggleVoice}
            aria-label={isListening ? "Stop listening" : "Voice input"}
            title={isListening ? "Stop listening" : "Voice input"}
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all cursor-pointer shadow-sm active:scale-95 ${
              isListening
                ? "border-red-500/50 bg-red-500 text-white animate-pulse"
                : "border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400"
            }`}
          >
            {isListening ? (
              <IconMicrophoneOff className="h-4 w-4" />
            ) : (
              <IconMicrophone className="h-4 w-4" />
            )}
          </button>
        )}

        {isGenerating ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop generating"
            title="Stop Generating"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-500/40 bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/60 hover:text-rose-900 dark:hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <IconPlayerStop className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!hasText}
            aria-label="Send Message"
            title="Send (Enter)"
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all cursor-pointer shadow-sm active:scale-95 ${
              hasText
                ? "border-cyan-500/50 bg-cyan-600 text-white hover:bg-cyan-500"
                : "border-slate-200 dark:border-zinc-800 bg-slate-200 dark:bg-zinc-900 text-slate-400 dark:text-zinc-600 cursor-not-allowed"
            }`}
          >
            <IconSend className="h-4 w-4" />
          </button>
        )}
      </form>
    </div>
  );
}

