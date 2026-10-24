import Image from "next/image";
import { IconLock } from "@tabler/icons-react";
import { VianMessageItem } from "@/hooks/useVianSessions";
import { VianMessage } from "./VianMessage";

interface VianMessageListProps {
  messages: VianMessageItem[];
  isGenerating: boolean;
  endRef: React.RefObject<HTMLDivElement | null>;
  onRegenerate: () => void;
  onSelectPrompt?: (prompt: string) => void;
}

const QUICK_PROMPTS = [
  "👋 Hey Vivek! Kya chal raha hai?",
  "🚀 Tell me about your top AI builds",
  "🏆 Flinders AI Hackathon Win",
  "💼 Let's collaborate on an AI project",
  "🍵 Chai & Tech Discussion",
];

export function VianMessageList({
  messages,
  isGenerating,
  endRef,
  onRegenerate,
  onSelectPrompt,
}: VianMessageListProps) {
  // Find index of the last assistant message
  const lastAssistantIdx = [...messages].reverse().findIndex((m) => m.role === "assistant");
  const actualLastAssistantIdx = lastAssistantIdx !== -1 ? messages.length - 1 - lastAssistantIdx : -1;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-2.5 py-2.5 sm:px-3 sm:py-3 space-y-2.5">
      {/* WhatsApp End-to-End Encryption Security Pill */}
      <div className="flex justify-center my-1 select-none px-2">
        <div className="px-3 py-1.5 rounded-lg bg-[#ffeecd] dark:bg-[#182229] border border-[#f5c344]/30 dark:border-white/5 text-[10.5px] text-[#734b00] dark:text-[#ffd279] shadow-xs flex items-center justify-center gap-1.5 text-center leading-tight max-w-[94%]">
          <IconLock className="w-3 h-3 text-[#d97706] dark:text-[#ffd279] shrink-0" />
          <span>Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.</span>
        </div>
      </div>

      {/* Centered WhatsApp Date Pill (Exact replica from reference screenshot) */}
      <div className="flex justify-center my-0.5 select-none">
        <span className="px-3.5 py-0.5 rounded-lg bg-white/90 dark:bg-[#182229] text-[#54656f] dark:text-[#8696a0] text-xs font-semibold shadow-[0_1px_0.5px_rgba(0,0,0,0.06)] border border-black/[0.04] dark:border-white/5">
          Today
        </span>
      </div>

      {/* Messages */}
      {messages.map((msg, index) => (
        <VianMessage
          key={msg.id}
          message={msg}
          isLastAssistant={index === actualLastAssistantIdx && !isGenerating}
          onRegenerate={onRegenerate}
        />
      ))}

      {/* WhatsApp Quick Reply Suggestion Chips (Visible on initial greeting) */}
      {messages.length <= 1 && onSelectPrompt && (
        <div className="pt-1 pl-9 pr-1 space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-[10px] font-mono font-medium text-slate-500 dark:text-[#8696a0] select-none">
            QUICK REPLIES:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onSelectPrompt(prompt)}
                className="px-3 py-1.5 rounded-full bg-white dark:bg-[#202c33] border border-[#00a884]/35 dark:border-[#25d366]/30 text-[11.5px] font-sans font-medium text-slate-800 dark:text-[#e9edef] hover:bg-[#00a884]/10 dark:hover:bg-[#25d366]/10 active:scale-95 transition-all shadow-[0_1px_0.5px_rgba(0,0,0,0.08)] cursor-pointer text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* WhatsApp Real-time Typing Bubble */}
      {isGenerating && (
        <div className="flex w-full items-start gap-2 max-w-[85%] animate-in fade-in duration-200">
          <div className="mt-0.5 relative h-7.5 w-7.5 shrink-0 overflow-hidden rounded-full border border-black/10 dark:border-white/10 shadow-xs">
            <Image
              src="/avatars/vivek.jpg"
              alt="Vivek Hingu"
              fill
              sizes="30px"
              className="object-cover"
            />
          </div>
          <div className="rounded-2xl rounded-tl-xs bg-white dark:bg-[#202c33] border border-black/[0.04] dark:border-white/5 px-3.5 py-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.12)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00a884] dark:bg-[#25d366] animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-[#00a884] dark:bg-[#25d366] animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-[#00a884] dark:bg-[#25d366] animate-bounce [animation-delay:300ms]" />
            <span className="text-[11px] italic font-medium text-[#00a884] dark:text-[#25d366] ml-1.5 font-sans">
              typing...
            </span>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}

