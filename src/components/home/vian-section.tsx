"use client";

import React from "react";
import Image from "next/image";
import { IconSparkles, IconDeviceMobile, IconMessageCode } from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

export default function VianSection() {
  const handleOpenVian = () => {
    window.dispatchEvent(new CustomEvent("openVianFresh"));
  };

  return (
    <div className="flex flex-col">
      <SectionHeading
        subtitle="NATIVE IPHONE AI EXPERIENCE"
      >
        Meet VIAN — Personal AI Assistant
      </SectionHeading>

      <div className="group/glow relative overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-cyan-500/40 dark:hover:border-cyan-500/40">
        <SpotlightGlow />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          {/* Avatar Logo & Info Side */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left max-w-xl">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-cyan-500/50 shadow-lg">
              <Image
                src="/vian-avatar.jpg"
                alt="VIAN Avatar Logo"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <div className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Interactive AI System Online</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                Conversational AI Assistant
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                Launch VIAN in an interactive chat modal to explore Vivek Hingu&#39;s engineering projects, technical stack, hackathon wins, or general technical queries in real-time.
              </p>

              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-zinc-400 font-mono">
                <span className="flex items-center gap-1">
                  <IconMessageCode className="h-3.5 w-3.5 text-cyan-500" /> Instant Intelligent Responses
                </span>
                <span className="flex items-center gap-1">
                  <IconDeviceMobile className="h-3.5 w-3.5 text-cyan-500" /> Seamless Interface
                </span>
              </div>
            </div>
          </div>

          {/* Action Button CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleOpenVian}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-cyan-500/50 bg-cyan-500/10 dark:bg-cyan-950/40 backdrop-blur-md px-6 py-3 text-sm font-bold text-cyan-700 dark:text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500/20 dark:hover:bg-cyan-900/60 hover:text-cyan-900 dark:hover:text-white hover:border-cyan-500 shadow-md dark:shadow-[0_0_25px_rgba(34,211,238,0.25)] cursor-pointer"
            >
              <IconSparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>Talk to VIAN</span>
              <span className="ml-1 rounded border border-cyan-500/30 bg-cyan-500/20 dark:bg-cyan-900/50 px-1.5 py-0.5 text-[10px] font-mono text-cyan-800 dark:text-cyan-300">
                ⌘K
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
