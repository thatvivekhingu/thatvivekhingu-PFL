"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export function SeamlessCodingLoop({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = 400);
    const height = (canvas.height = 200);

    const codeLines = [
      "import { TensorFlow, PyTorch } from '@ai/core';",
      "const model = new LLM.Transformer({ layers: 32 });",
      "async function trainPredictor(dataset) {",
      "  const RAG = await VectorDB.similaritySearch();",
      "  return model.optimize({ RAG, precision: 'fp16' });",
      "}",
      "// Vivek Hingu — Continuous AI Training Loop...",
      "export default async function runAgent() {",
      "  console.log('Building intelligent software...');",
      "}",
    ];

    let lineOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.font = "12px monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.85)"; // Cyan glow

      lineOffset = (lineOffset + 0.5) % (codeLines.length * 20);

      codeLines.concat(codeLines).forEach((line, i) => {
        const y = i * 20 - lineOffset + 40;
        if (y > 0 && y < height) {
          ctx.fillText(line, 15, y);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-zinc-950/90 shadow-2xl p-4 flex flex-col md:flex-row items-center gap-6 ${className}`}>
      {/* Animated Glowing Coding Character */}
      <div className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_25px_rgba(56,189,248,0.3)] group">
        <Image
          src="/coder-avatar.jpg"
          alt="Vivek Hingu Coding Loop"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Seamless Pulsing Neon Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-cyan-500/10 pointer-events-none" />
        
        {/* Pulsing Live Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>LIVE CODING</span>
        </div>
      </div>

      {/* Seamless Terminal Code Stream */}
      <div className="flex-1 w-full space-y-2">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-xs font-mono text-cyan-400/80 ml-2">vivek-hingu-ai-loop.ts</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">⚡ 60 FPS Seamless Loop</span>
        </div>

        <div className="relative h-32 w-full overflow-hidden rounded-lg bg-black/50 border border-border/40">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
