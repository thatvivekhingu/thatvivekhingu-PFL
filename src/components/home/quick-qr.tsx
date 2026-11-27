"use client";

import React, { useState, useRef } from "react";
import QRCode from "qrcode";
import { IconQrcode, IconX, IconDownload, IconCheck } from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";

export const QuickQrWidget = () => {
  const [inputVal, setInputVal] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQR = async () => {
    const textToEncode = inputVal.trim() || "https://vivekhingu.vercel.app";
    try {
      setIsGenerating(true);
      playTapSound("pop");
      const url = await QRCode.toDataURL(textToEncode, {
        width: 300,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    playTapSound("pop");
    setQrDataUrl("");
    setInputVal("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    playTapSound("pop");
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qr-code-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="relative flex flex-col justify-center h-full select-none py-0.5">
      {qrDataUrl ? (
        /* Generated QR Code Preview with corner Cancel button */
        <div className="relative flex items-center justify-between gap-2.5 p-1">
          {/* Corner cancel button */}
          <button
            type="button"
            onClick={handleClear}
            aria-label="Cancel and close QR"
            title="Cancel & Clear"
            className="absolute -top-6 right-0 p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <IconX className="w-4 h-4" />
          </button>

          <div
            onClick={handleDownload}
            className="group/preview relative w-16 h-16 sm:w-18 sm:h-18 bg-white p-1 rounded-md shadow-md cursor-pointer shrink-0 hover:scale-105 transition-transform"
            title="Click to Download PNG"
          >
            <img
              src={qrDataUrl}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center rounded-md transition-opacity">
              <IconDownload className="w-4 h-4 text-white drop-shadow" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full inline-flex items-center justify-center gap-1.5 h-7 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs rounded transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              {downloaded ? <IconCheck className="w-3.5 h-3.5 text-emerald-600" /> : <IconDownload className="w-3.5 h-3.5" />}
              <span>{downloaded ? "Saved" : "Download"}</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full inline-flex items-center justify-center gap-1 h-6 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 font-mono text-[11px] rounded transition-all cursor-pointer"
            >
              <IconX className="w-3 h-3" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        /* Input & Generate QR Button State */
        <div className="flex flex-col gap-1.5 w-full">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generateQR()}
            placeholder="Enter text or URL..."
            className="w-full h-7 px-2.5 text-xs font-mono rounded bg-neutral-900 border border-neutral-700 focus:border-white text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
          />

          <button
            type="button"
            onClick={generateQR}
            disabled={isGenerating}
            className="w-full h-7 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs rounded transition-all active:scale-98 cursor-pointer shadow-sm"
          >
            <span>{isGenerating ? "Generating..." : "Generate QR"}</span>
          </button>
        </div>
      )}
    </div>
  );
};
