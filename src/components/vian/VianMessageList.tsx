import Image from "next/image";
import { IconLock } from "@tabler/icons-react";
import { VianMessageItem } from "@/hooks/useVianSessions";
import { VianMessage } from "./VianMessage";

interface VianMessageListProps {
  messages: VianMessageItem[];
  isGenerating: boolean;
  endRef: React.RefObject<HTMLDivElement | null>;
  onRegenerate: () => void;
}

export function VianMessageList({
  messages,
  isGenerating,
  endRef,
  onRegenerate,
}: VianMessageListProps) {
  // Find index of the last assistant message
  const lastAssistantIdx = [...messages].reverse().findIndex((m) => m.role === "assistant");
  const actualLastAssistantIdx = lastAssistantIdx !== -1 ? messages.length - 1 - lastAssistantIdx : -1;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto px-3 py-3 sm:px-4 sm:py-3.5 space-y-3">
      {/* WhatsApp Encryption Security Banner */}
      <div className="mx-auto my-1 max-w-[92%] text-center px-3 py-1.5 rounded-lg bg-[#ffeecd] dark:bg-[#182229] border border-[#f5c344]/30 dark:border-white/5 text-[10px] text-amber-950 dark:text-[#ffd279] shadow-xs flex items-center justify-center gap-1.5 leading-tight select-none">
        <IconLock className="w-3 h-3 text-[#d97706] dark:text-[#ffd279] shrink-0" />
        <span>Messages are end-to-end encrypted • Tap to verify profile</span>
      </div>

      {/* WhatsApp Centered Date Pill */}
      <div className="flex justify-center my-1 select-none">
        <span className="px-3 py-0.5 rounded-md bg-white/80 dark:bg-[#182229] text-slate-600 dark:text-[#8696a0] text-[10px] font-medium uppercase tracking-wider shadow-xs border border-slate-200/40 dark:border-white/5">
          TODAY
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

      {/* WhatsApp Real-time Typing Bubble */}
      {isGenerating && (
        <div className="flex w-full items-start gap-2 max-w-[85%] animate-in fade-in duration-200">
          <div className="mt-0.5 relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-emerald-500/40 shadow-xs">
            <Image
              src="/avatars/vivek.jpg"
              alt="Vivek Hingu"
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <div className="rounded-[18px] rounded-tl-[3px] bg-white dark:bg-[#202c33] border border-slate-200/60 dark:border-white/5 px-3.5 py-2.5 shadow-[0_1px_1px_rgba(0,0,0,0.15)] flex items-center gap-1.5">
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
