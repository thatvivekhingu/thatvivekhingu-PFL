"use client";

import React from "react";
import { IconSparkles, IconArrowUpRight } from "@tabler/icons-react";

interface VianEmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

const PROMPT_SUGGESTIONS = [
  {
    title: "Strongest AI Project",
    query: "What's Vivek's strongest AI project?",
    category: "Projects",
  },
  {
    title: "Technical Skills",
    query: "Tell me about Vivek's technical skills and engineering stack.",
    category: "Skills",
  },
  {
    title: "Hackathons & Awards",
    query: "Which hackathons and awards has Vivek won?",
    category: "Achievements",
  },
  {
    title: "Contact & Resume",
    query: "How can I contact Vivek Hingu?",
    category: "Contact",
  },
];

export function VianEmptyState({ onSelectPrompt }: VianEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
      {/* Product Avatar Badge */}
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shadow-md">
        <IconSparkles className="h-6 w-6" />
      </div>

      <h3 className="text-base font-semibold text-zinc-100 tracking-tight">
        Hi, I&#39;m VIAN.
      </h3>

      <p className="mt-1 text-xs text-zinc-400 max-w-xs leading-relaxed font-mono">
        I can help you explore Vivek&#39;s engineering projects, machine learning skills, education, and hackathons.
      </p>

      {/* Suggested Questions Matrix */}
      <div className="mt-6 grid w-full max-w-sm grid-cols-1 gap-2 sm:grid-cols-2">
        {PROMPT_SUGGESTIONS.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => onSelectPrompt(item.query)}
            className="group flex flex-col items-start justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 text-left transition-all hover:border-cyan-500/40 hover:bg-zinc-900 hover:shadow-md cursor-pointer"
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-[10px] font-mono font-medium text-cyan-400 uppercase tracking-wider">
                {item.category}
              </span>
              <IconArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300" />
            </div>
            <span className="mt-1.5 text-xs font-medium text-zinc-200 group-hover:text-white line-clamp-2">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
