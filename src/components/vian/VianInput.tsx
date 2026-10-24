import React, { useState, useRef, useEffect } from "react";
import {
  IconSend,
  IconPlayerStop,
  IconMicrophone,
  IconMicrophoneOff,
  IconMoodSmile,
  IconPaperclip,
} from "@tabler/icons-react";

interface VianInputProps {
  onSend: (text: string) => void;
  onStop: () => void;
  isGenerating: boolean;
  isListening?: boolean;
  onToggleVoice?: () => void;
  isSpeaking?: boolean;
}

const QUICK_EMOJIS = ["👋", "🚀", "☕", "🤖", "💡", "🔥", "🙌", "💻", "✨", "💯"];

export function VianInput({
  onSend,
  onStop,
  isGenerating,
  isListening = false,
  onToggleVoice,
  isSpeaking = false,
}: VianInputProps) {
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on line content (max 4 lines ~ 120px)
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isGenerating) {
      onStop();
      return;
    }

    const trimmed = input.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setInput("");
    setShowEmojiPicker(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const addEmoji = (emoji: string) => {
    setInput((prev) => prev + emoji);
    textareaRef.current?.focus();
  };

  const hasText = input.trim().length > 0;

  return (
    <div className="relative flex flex-col w-full bg-[#f0f2f5] dark:bg-[#202c33] border-t border-slate-200/80 dark:border-white/5 z-20">
      {/* Quick Emoji Shelf Drawer */}
      {showEmojiPicker && (
        <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1f2c34] border-b border-slate-200 dark:border-white/5 overflow-x-auto select-none animate-in fade-in slide-in-from-bottom-1 duration-150">
          <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-400 mr-1 shrink-0">Emojis:</span>
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => addEmoji(emoji)}
              className="text-base p-1 hover:scale-125 transition-transform cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Animated Jarvis Voice Audio Visualizer */}
      {(isListening || isSpeaking) && (
        <div className="flex items-center justify-center gap-1.5 py-1.5 bg-[#00a884]/15 border-b border-[#00a884]/30">
          <span className="text-[10.5px] font-mono text-[#00a884] dark:text-[#25d366] font-semibold mr-1">
            {isListening ? "Listening..." : "Vivek Speaking..."}
          </span>
          <div className="flex items-center gap-1 h-3">
            <span className="w-1 bg-[#00a884] rounded-full animate-bounce [animation-delay:0ms] h-2" />
            <span className="w-1 bg-[#25d366] rounded-full animate-bounce [animation-delay:150ms] h-3.5" />
            <span className="w-1 bg-[#53bdeb] rounded-full animate-bounce [animation-delay:300ms] h-4" />
            <span className="w-1 bg-[#25d366] rounded-full animate-bounce [animation-delay:450ms] h-2.5" />
            <span className="w-1 bg-[#00a884] rounded-full animate-bounce [animation-delay:600ms] h-1.5" />
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="relative flex w-full items-end gap-2 p-2 sm:p-2.5"
      >
        {/* WhatsApp Rounded Capsule Input Pill */}
        <div className="relative flex flex-1 items-center rounded-[24px] bg-white dark:bg-[#2a3942] border border-slate-200/80 dark:border-white/5 px-2.5 shadow-xs transition-all focus-within:ring-1 focus-within:ring-[#00a884]/40">
          {/* Emoji Toggle Icon */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            aria-label="Add Emoji"
            title="Add Emoji"
            className="p-1.5 text-slate-400 dark:text-[#8696a0] hover:text-slate-600 dark:hover:text-[#e9edef] transition-colors cursor-pointer shrink-0"
          >
            <IconMoodSmile className="h-5 w-5" />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening to your voice..." : "Message Vivek..."}
            className="w-full resize-none bg-transparent px-2 py-2.5 text-xs text-slate-900 dark:text-[#e9edef] placeholder-slate-400 dark:placeholder-[#8696a0] focus:outline-none max-h-28 font-sans leading-relaxed"
          />

          {/* Attachment Paperclip Icon */}
          <button
            type="button"
            onClick={() => {
              setInput((prev) => prev ? `${prev} [Sharing code/project idea]` : "Hey Vivek, I want to share a project idea with you: ");
              textareaRef.current?.focus();
            }}
            aria-label="Attach File / Code"
            title="Attach Project / Code"
            className="p-1.5 text-slate-400 dark:text-[#8696a0] hover:text-slate-600 dark:hover:text-[#e9edef] transition-colors cursor-pointer shrink-0"
          >
            <IconPaperclip className="h-5 w-5" />
          </button>
        </div>

        {/* WhatsApp Signature Floating Green Action Button */}
        {isGenerating ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop Generating"
            title="Stop Generating"
            className="h-10 w-10 shrink-0 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
          >
            <IconPlayerStop className="h-4.5 w-4.5" />
          </button>
        ) : hasText ? (
          <button
            type="submit"
            aria-label="Send Message"
            title="Send"
            className="h-10 w-10 shrink-0 rounded-full bg-[#00a884] hover:bg-[#06cf9c] text-white shadow-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
          >
            <IconSend className="h-4.5 w-4.5 ml-0.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleVoice}
            aria-label={isListening ? "Stop listening" : "Voice message"}
            title={isListening ? "Stop listening" : "Voice message"}
            className={`h-10 w-10 shrink-0 rounded-full text-white shadow-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
              isListening
                ? "bg-rose-500 animate-pulse"
                : "bg-[#00a884] hover:bg-[#06cf9c]"
            }`}
          >
            {isListening ? (
              <IconMicrophoneOff className="h-4.5 w-4.5" />
            ) : (
              <IconMicrophone className="h-4.5 w-4.5" />
            )}
          </button>
        )}
      </form>
    </div>
  );
}

