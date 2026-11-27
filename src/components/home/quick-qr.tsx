"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  IconQrcode,
  IconDownload,
  IconCopy,
  IconCheck,
  IconTrash,
  IconSparkles,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";

export const QuickQrWidget = () => {
  const [inputVal, setInputVal] = useState("https://vivekhingu.vercel.app");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQR = async (text: string) => {
    if (!text.trim()) {
      setError("Please enter text or URL");
      setQrDataUrl("");
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      const url = await QRCode.toDataURL(text.trim(), {
        width: 480,
        margin: 1.5,
        color: {
          dark: "#08090a",
          light: "#22d3ee",
        },
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error("QR Generation Error:", err);
      setError("Failed to generate QR");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateQR("https://vivekhingu.vercel.app");
  }, []);

  const handleGenerate = () => {
    playTapSound("pop");
    generateQR(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGenerate();
    }
  };

  const handleCopyText = async () => {
    if (!inputVal) return;
    try {
      await navigator.clipboard.writeText(inputVal);
      playTapSound("chime");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    playTapSound("pop");
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `quick-qr-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClear = () => {
    playTapSound("pop");
    setInputVal("");
    setQrDataUrl("");
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="flex flex-col justify-between h-full pt-0.5 space-y-2 select-none">
      {/* Top Header Badge & Scanning Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
            QUICK QR
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Client-Side
          </span>
        </div>
      </div>

      {/* Main Interactive Content */}
      <div className="relative flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
        {/* QR Code Thumbnail Preview */}
        <div
          onClick={handleDownload}
          className="relative group/qr shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden border border-cyan-500/40 bg-cyan-950/50 flex items-center justify-center p-1 cursor-pointer transition-all hover:scale-105 hover:border-cyan-400 shadow-sm"
          title="Click to download PNG"
        >
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Generated QR Code"
              className="w-full h-full object-contain rounded-[4px]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-cyan-500/60">
              <IconQrcode className="w-8 h-8 animate-pulse" />
            </div>
          )}

          {/* Futuristic Scanning Line Overlay */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee] animate-[bounce_2s_infinite] pointer-events-none opacity-70" />
        </div>

        {/* Input & Action Panel */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-16 sm:h-18 py-0.5">
          {/* Text/URL Input */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste URL or type text..."
              className="w-full h-7 px-2 text-[11px] font-mono rounded-md bg-black/60 border border-zinc-700/80 focus:border-cyan-400 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all truncate"
            />
          </div>

          {/* Error Message */}
          {error && (
            <span className="text-[9px] font-mono text-rose-400 truncate">
              {error}
            </span>
          )}

          {/* Action Button Strip */}
          <div className="flex items-center justify-between gap-1 mt-1">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-[10px] transition-all hover:scale-102 active:scale-95 cursor-pointer shadow-xs"
              title="Generate QR"
            >
              <IconSparkles className="w-3 h-3" />
              <span>{qrDataUrl ? "Refresh" : "Create"}</span>
            </button>

            <div className="flex items-center gap-1">
              {/* Copy input text */}
              <button
                type="button"
                onClick={handleCopyText}
                disabled={!inputVal}
                className="p-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-cyan-300 border border-zinc-700/60 transition-all cursor-pointer disabled:opacity-40"
                title="Copy text to clipboard"
              >
                {copied ? (
                  <IconCheck className="w-3 h-3 text-emerald-400" />
                ) : (
                  <IconCopy className="w-3 h-3" />
                )}
              </button>

              {/* Download PNG */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={!qrDataUrl}
                className="p-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-cyan-300 border border-zinc-700/60 transition-all cursor-pointer disabled:opacity-40"
                title="Download high-res PNG"
              >
                <IconDownload className="w-3 h-3" />
              </button>

              {/* Clear */}
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded bg-zinc-800/80 hover:bg-rose-950/60 text-zinc-400 hover:text-rose-300 border border-zinc-700/60 hover:border-rose-500/40 transition-all cursor-pointer"
                title="Clear input"
              >
                <IconTrash className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
