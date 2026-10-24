import React, { useMemo } from "react";
import Image from "next/image";
import { IconSparkles, IconMessageCircle2 } from "@tabler/icons-react";

interface VianEmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

const WHATSAPP_PROMPT_CHIPS = [
  {
    label: "👋 Hey Vivek! Kya chal raha hai?",
    query: "Hey Vivek! Kaise ho bhai? Kya chal raha hai aaj kal?",
  },
  {
    label: "🚀 Flinders AI Hackathon Win",
    query: "Tell me about your 2nd place win at Flinders University AI Hackathon!",
  },
  {
    label: "💡 Top AI Projects",
    query: "What are your top AI builds like BharatBhasha AI and Reverse Recipe Engine?",
  },
  {
    label: "💼 Let's Collaborate on AI",
    query: "I'd love to collaborate with you on an AI/ML project. How can we connect?",
  },
  {
    label: "🍵 Chai & Tech Sync",
    query: "Are you free for a quick chat about agentic AI and multi-agent systems?",
  },
];

export function VianEmptyState({ onSelectPrompt }: VianEmptyStateProps) {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 text-center select-none">
      {/* WhatsApp Profile Avatar Card */}
      <div className="relative mb-2.5">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-emerald-500/60 shadow-xl p-0.5">
          <Image
            src="/avatars/vivek.jpg"
            alt="Vivek Hingu"
            fill
            sizes="80px"
            className="object-cover rounded-full"
            priority
          />
        </div>
        {/* WhatsApp Online Indicator Badge */}
        <span className="absolute bottom-1 right-1 h-4.5 w-4.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#202c33] flex items-center justify-center text-[10px] text-white">
          ●
        </span>
      </div>

      {/* Name and Status */}
      <div className="flex items-center gap-1.5 mb-0.5">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#e9edef] tracking-tight">
          Vivek Hingu
        </h3>
        <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-[#00a884] text-white text-[10px] shrink-0" title="Verified AI Engineer">
          ✓
        </span>
      </div>

      <p className="text-xs font-mono font-medium text-emerald-600 dark:text-[#25d366]">
        AI & Machine Learning Engineer
      </p>

      {/* WhatsApp Status Quote */}
      <div className="mt-2.5 max-w-xs px-3.5 py-1.5 rounded-xl bg-white/70 dark:bg-[#182229]/80 border border-slate-200/60 dark:border-white/5 text-[11px] text-slate-600 dark:text-[#8696a0] italic leading-relaxed">
        &ldquo;Hey there! I am using WhatsApp • Building agentic AI systems & training neural nets in Ahmedabad 🇮🇳&rdquo;
      </div>

      {/* Quick WhatsApp Tap-to-Chat Chips */}
      <div className="mt-4 w-full max-w-sm flex flex-col gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-[#8696a0]">
          Tap to start chatting:
        </span>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {WHATSAPP_PROMPT_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => onSelectPrompt(chip.query)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-[#202c33] border border-slate-200/80 dark:border-white/10 hover:border-[#00a884] dark:hover:border-[#25d366] text-xs font-medium text-slate-800 dark:text-[#e9edef] hover:text-[#00a884] dark:hover:text-[#25d366] shadow-2xs hover:shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer text-left"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

