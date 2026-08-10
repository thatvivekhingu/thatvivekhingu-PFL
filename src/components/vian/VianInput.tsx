"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconSend, IconPlayerStop } from "@tabler/icons-react";

interface VianInputProps {
  onSend: (text: string) => void;
  onStop: () => void;
  isGenerating: boolean;
}

export function VianInput({ onSend, onStop, isGenerating }: VianInputProps) {
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
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-end gap-2 border-t border-zinc-800/80 bg-zinc-950/90 p-3 backdrop-blur-md"
    >
      <div className="relative flex flex-1 items-center rounded-xl border border-zinc-800 bg-zinc-900/80 transition-within border-cyan-500/40 focus-within:ring-1 focus-within:ring-cyan-500/40">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask VIAN anything about Vivek..."
          className="w-full resize-none bg-transparent px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none max-h-30 font-sans leading-relaxed"
        />
      </div>

      {isGenerating ? (
        <button
          type="button"
          onClick={onStop}
          aria-label="Stop generating"
          title="Stop Generating"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
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
              : "border-zinc-800 bg-zinc-900 text-zinc-600 cursor-not-allowed"
          }`}
        >
          <IconSend className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
