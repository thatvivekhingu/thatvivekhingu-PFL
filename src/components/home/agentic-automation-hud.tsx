"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCpu,
  IconPlayerPlay,
  IconPlayerPause,
  IconRotate,
  IconCheck,
  IconTerminal2,
  IconNetwork,
} from "@tabler/icons-react";

const SCENARIOS = [
  {
    id: "web-scrape",
    title: "Autonomous Web Research",
    tag: "LangGraph • ReAct",
    steps: [
      { id: "1", name: "User Intent", role: "Trigger query parsed", duration: "12ms", icon: "⚡" },
      { id: "2", name: "Planner Agent", role: "ReAct decomposition", duration: "180ms", icon: "🧠" },
      { id: "3", name: "Browser Tool", role: "Headless DOM scraping", duration: "240ms", icon: "🌐" },
      { id: "4", name: "Evaluator LLM", role: "Hallucination check", duration: "95ms", icon: "🛡️" },
      { id: "5", name: "Final Synthesis", role: "Structured JSON output", duration: "45ms", icon: "✨" },
    ],
    logs: [
      "[0.01s] Trigger received: 'Extract arXiv LLM agent papers'",
      "[0.19s] Planner: Decomposed into 3 parallel retrieval tasks",
      "[0.43s] ToolExecutor: Headless browser scraped 14 paper abstracts",
      "[0.52s] Evaluator: Context verification score 0.99 (Passed)",
      "[0.57s] Output: Dispatched 1.8KB verified structured summary",
    ],
  },
  {
    id: "code-heal",
    title: "Self-Healing Python Code",
    tag: "Auto-Debug • Sandbox",
    steps: [
      { id: "1", name: "Runtime Error", role: "Traceback captured", duration: "15ms", icon: "⚠️" },
      { id: "2", name: "AST Analyzer", role: "AST tree parsing", duration: "110ms", icon: "🔍" },
      { id: "3", name: "Coder Agent", role: "Generates diff patch", duration: "320ms", icon: "💻" },
      { id: "4", name: "Docker Test", role: "PyTest sandbox run", duration: "210ms", icon: "🧪" },
      { id: "5", name: "Hot Patch", role: "Auto-PR merged", duration: "60ms", icon: "🚀" },
    ],
    logs: [
      "[0.02s] Detected: IndexError: list index out of range at line 42",
      "[0.13s] AST parser isolated boundary condition mutation",
      "[0.45s] Coder Agent synthesized defensive boundary check diff",
      "[0.66s] Sandbox PyTest: 18 passed, 0 failed in 0.21s",
      "[0.72s] Auto-healed: Patch committed to main branch",
    ],
  },
  {
    id: "multi-swarm",
    title: "Multi-Agent Swarm Sync",
    tag: "Consensus • Distributed",
    steps: [
      { id: "1", name: "Swarm Init", role: "Cluster heartbeat OK", duration: "10ms", icon: "🛰️" },
      { id: "2", name: "Leader Agent", role: "Task partitioning", duration: "140ms", icon: "👑" },
      { id: "3", name: "Worker Nodes", role: "Parallel tensor ops", duration: "290ms", icon: "🤖" },
      { id: "4", name: "Raft Consensus", role: "State replication", duration: "80ms", icon: "🔗" },
      { id: "5", name: "Sync Complete", role: "Zero-latency dispatch", duration: "40ms", icon: "🏁" },
    ],
    logs: [
      "[0.01s] Swarm active: 8 worker agents connected across nodes",
      "[0.15s] Leader assigned batch embeddings across workers 1-8",
      "[0.44s] Vector embedding finished: 50,000 documents indexed",
      "[0.52s] Raft consensus verified: quorum reached (8/8)",
      "[0.56s] Swarm synchronised. All agents idle & waiting",
    ],
  },
];

export function AgenticAutomationHud() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [activeStep, setActiveStep] = useState(2);
  const [logIndex, setLogIndex] = useState(2);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scenario = SCENARIOS[activeScenarioIdx];

  // Auto-cycle through pipeline steps to create a live breathing animation
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % scenario.steps.length;
        setLogIndex(next);
        return next;
      });
    }, 1800);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, scenario.steps.length]);

  const handleScenarioChange = (idx: number) => {
    setActiveScenarioIdx(idx);
    setActiveStep(0);
    setLogIndex(0);
  };

  return (
    <div className="w-full max-w-[340px] xl:max-w-[365px] rounded-2xl border border-cyan-500/25 bg-slate-950/85 backdrop-blur-xl p-3.5 sm:p-4 text-zinc-100 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(6,182,212,0.12)] transition-all select-none hover:border-cyan-500/40">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
            <IconNetwork className="h-4 w-4 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold font-mono tracking-wider text-cyan-300 uppercase">
                Agent Automation
              </h3>
              <span className="rounded bg-cyan-950/80 px-1 py-0.2 text-[9px] font-mono font-semibold text-cyan-400 border border-cyan-500/30">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-sans">
              Multi-Agent Graph (ReAct)
            </p>
          </div>
        </div>

        {/* Play/Pause & Reset Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsRunning((prev) => !prev)}
            aria-label={isRunning ? "Pause Pipeline" : "Resume Pipeline"}
            title={isRunning ? "Pause" : "Play"}
            className="flex h-6.5 w-6.5 items-center justify-center rounded-md bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isRunning ? (
              <IconPlayerPause className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <IconPlayerPlay className="h-3.5 w-3.5 text-emerald-400" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveStep(0);
              setLogIndex(0);
            }}
            aria-label="Restart Scenario"
            title="Restart"
            className="flex h-6.5 w-6.5 items-center justify-center rounded-md bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <IconRotate className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Scenario Chips */}
      <div className="flex items-center gap-1.5 pt-2.5 pb-2 overflow-x-auto no-scrollbar">
        {SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            type="button"
            onClick={() => handleScenarioChange(idx)}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[10.5px] font-medium font-mono transition-all cursor-pointer ${
              activeScenarioIdx === idx
                ? "bg-cyan-500/25 border border-cyan-400/50 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.25)]"
                : "bg-white/5 border border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      {/* Interactive Visual DAG Pipeline Graph */}
      <div className="relative my-2 rounded-xl bg-black/40 border border-white/5 p-2.5">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pb-1.5 mb-1.5 border-b border-white/5">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            DAG Nodes ({scenario.steps.length} Steps)
          </span>
          <span className="text-cyan-400/80 font-bold">{scenario.tag}</span>
        </div>

        {/* Steps List with Pulse Highlights */}
        <div className="space-y-1.5">
          {scenario.steps.map((st, idx) => {
            const isCurrent = activeStep === idx;
            const isPast = activeStep > idx;

            return (
              <div
                key={st.id}
                onClick={() => {
                  setActiveStep(idx);
                  setLogIndex(idx);
                }}
                className={`relative flex items-center justify-between p-2 rounded-lg text-xs transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-cyan-500/20 border border-cyan-400/50 text-white shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                    : isPast
                    ? "bg-white/[0.03] border border-white/5 text-zinc-300"
                    : "bg-white/[0.01] border border-transparent text-zinc-500"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0">{st.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-[11px] truncate">
                        {st.name}
                      </span>
                      {isCurrent && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-[9px] text-zinc-400 truncate font-mono">
                      {st.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pl-1 font-mono text-[10px]">
                  {isPast ? (
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <IconCheck className="h-3 w-3 stroke-[2.5]" />
                      {st.duration}
                    </span>
                  ) : isCurrent ? (
                    <span className="text-cyan-300 animate-pulse font-bold">
                      running...
                    </span>
                  ) : (
                    <span className="text-zinc-600">queued</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streaming Terminal Log Console */}
      <div className="rounded-xl bg-black/60 border border-cyan-500/20 p-2.5 font-mono text-[10.5px]">
        <div className="flex items-center justify-between text-zinc-400 pb-1 mb-1 border-b border-white/5">
          <div className="flex items-center gap-1 text-[9px]">
            <IconTerminal2 className="h-3 w-3 text-cyan-400" />
            <span>REASONING LOG</span>
          </div>
          <span className="text-emerald-400 text-[9px] font-bold">1.4K TOK/s</span>
        </div>

        <div className="h-13 overflow-hidden flex flex-col justify-end text-zinc-300 space-y-0.5 leading-snug">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={logIndex}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-cyan-200 truncate font-semibold text-[10.5px]"
            >
              {scenario.logs[logIndex] || scenario.logs[0]}
            </motion.p>
          </AnimatePresence>
          <p className="text-zinc-500 text-[9px] truncate">
            {scenario.logs[(logIndex + scenario.logs.length - 1) % scenario.logs.length]}
          </p>
        </div>
      </div>

      {/* Bottom Live Metrics */}
      <div className="mt-2.5 pt-2 border-t border-white/10 grid grid-cols-3 gap-1 text-center font-mono">
        <div className="p-1 rounded bg-white/5">
          <div className="text-[8.5px] text-zinc-400">LATENCY</div>
          <div className="text-[10.5px] font-bold text-cyan-300">180ms</div>
        </div>
        <div className="p-1 rounded bg-white/5">
          <div className="text-[8.5px] text-zinc-400">SUCCESS</div>
          <div className="text-[10.5px] font-bold text-emerald-400">99.8%</div>
        </div>
        <div className="p-1 rounded bg-white/5">
          <div className="text-[8.5px] text-zinc-400">ORCHESTRATION</div>
          <div className="text-[10.5px] font-bold text-purple-300">AUTONOMOUS</div>
        </div>
      </div>
    </div>
  );
}
