"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { IconArrowUpRight, IconSparkles } from "@tabler/icons-react";

interface VianEmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

const PROMPT_SUGGESTIONS = [
  {
    title: "Schedule a Meeting",
    query: "Schedule a 30-minute sync with Vivek tomorrow at 4 PM to discuss AI collaboration.",
    category: "Jarvis Action",
  },
  {
    title: "Draft an Email to Vivek",
    query: "Draft a concise email to Vivek proposing an AI hackathon partnership.",
    category: "Jarvis Action",
  },
  {
    title: "Explore AI Projects",
    query: "What are Vivek's top AI projects like BharatBhasha and Recipe Engine?",
    category: "Portfolio",
  },
  {
    title: "Search AI Trends",
    query: "Search latest trends in agentic AI and multi-agent systems.",
    category: "Web Search",
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
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      {/* Product Avatar Badge */}
      <div className="mb-3 relative h-14 w-14 overflow-hidden rounded-full border-2 border-cyan-500/40 p-0.5 shadow-xl">
        <Image
          src="/vian-avatar.jpg"
          alt="VIAN Avatar Logo"
          fill
          sizes="56px"
          className="object-cover rounded-full"
        />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 font-mono mb-0.5">
        <IconSparkles className="h-3.5 w-3.5" />
        <span>{greeting}!</span>
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
        I&#39;m VIAN, your Autonomous Agent.
      </h3>

      <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 max-w-xs leading-relaxed font-sans">
        I can search live facts, draft emails, schedule meetings, write code, or explore Vivek&#39;s AI portfolio.
      </p>

      {/* Suggested Questions Matrix */}
      <div className="mt-5 grid w-full max-w-sm grid-cols-1 gap-2 sm:grid-cols-2">
        {PROMPT_SUGGESTIONS.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onSelectPrompt(item.query)}
            className="group flex flex-col items-start justify-between rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-3 text-left transition-all hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-zinc-900 shadow-sm hover:shadow-md cursor-pointer"
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-[10px] font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                {item.category}
              </span>
              <IconArrowUpRight className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-300" />
            </div>
            <span className="mt-1.5 text-xs font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-slate-950 dark:group-hover:text-white line-clamp-2">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

