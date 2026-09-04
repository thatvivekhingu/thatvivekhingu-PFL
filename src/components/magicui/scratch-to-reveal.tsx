"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface ScratchToRevealProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  minScratchPercentage?: number;
  className?: string;
  onComplete?: () => void;
  gradientColors?: [string, string, string];
  resetKey?: string | number;
}

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  width,
  height,
  minScratchPercentage = 35,
  onComplete,
  children,
  className,
  gradientColors = ["#4f46e5", "#7c3aed", "#db2777"],
  resetKey,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratchingRef = useRef(false);
  const scratchCountRef = useRef(0);
  const [isComplete, setIsComplete] = useState(false);

  const controls = useAnimation();

  const drawScratchSurface = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = containerRef.current;
    const rect = container?.getBoundingClientRect();
    const w = Math.round(rect?.width || width || 280);
    const h = Math.round(rect?.height || height || 140);

    if (w <= 0 || h <= 0) return;

    canvas.width = w;
    canvas.height = h;

    // Reset composite mode to solid painting
    ctx.globalCompositeOperation = "source-over";

    // 1. Solid opaque base
    ctx.fillStyle = "#1e1b4b";
    ctx.fillRect(0, 0, w, h);

    // 2. High-contrast gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, gradientColors[0] || "#4f46e5");
    gradient.addColorStop(0.5, gradientColors[1] || "#7c3aed");
    gradient.addColorStop(1, gradientColors[2] || "#db2777");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // 3. Diagonal metallic hatch lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1.5;
    for (let x = -h; x < w + h; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }

    // 4. Scratch Card Border inside canvas
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    // 5. Centered Instruction Badge
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 4;
    ctx.fillText("🪙 SCRATCH ME 🪙", w / 2, h / 2 - 8);

    ctx.font = "bold 10px monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.shadowBlur = 0;
    ctx.fillText("Drag or swipe to reveal", w / 2, h / 2 + 12);
  }, [width, height, gradientColors]);

  // Initial and resetKey mount
  useEffect(() => {
    setIsComplete(false);
    scratchCountRef.current = 0;
    isScratchingRef.current = false;

    const timer = setTimeout(() => {
      drawScratchSurface();
    }, 40);

    return () => clearTimeout(timer);
  }, [resetKey, drawScratchSurface]);

  const startAnimation = async () => {
    await controls.start({
      scale: [1, 1.05, 1],
      rotate: [0, 4, -4, 4, -4, 0],
      transition: { duration: 0.35 },
    });

    if (onComplete) {
      onComplete();
    }
  };

  const checkCompletion = React.useCallback(() => {
    if (isComplete || scratchCountRef.current < 12) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w <= 0 || h <= 0) return;

    try {
      const imageData = ctx.getImageData(0, 0, w, h);
      const pixels = imageData.data;
      const totalPixels = pixels.length / 4;
      let clearPixels = 0;

      for (let i = 3; i < pixels.length; i += 32) {
        if (pixels[i] < 30) {
          clearPixels++;
        }
      }

      const percentage = (clearPixels / (totalPixels / 8)) * 100;

      if (percentage >= minScratchPercentage) {
        setIsComplete(true);
        ctx.clearRect(0, 0, w, h);
        startAnimation();
      }
    } catch {
      // Ignore errors
    }
  }, [isComplete, minScratchPercentage]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    scratchCountRef.current += 1;

    if (scratchCountRef.current % 6 === 0) {
      checkCompletion();
    }
  };

  useEffect(() => {
    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!isScratchingRef.current) return;
      scratch(event.clientX, event.clientY);
    };

    const handleDocumentTouchMove = (event: TouchEvent) => {
      if (!isScratchingRef.current) return;
      if (event.touches.length > 0) {
        scratch(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    const handleDocumentMouseUp = () => {
      if (!isScratchingRef.current) return;
      isScratchingRef.current = false;
      checkCompletion();
    };

    const handleDocumentTouchEnd = () => {
      if (!isScratchingRef.current) return;
      isScratchingRef.current = false;
      checkCompletion();
    };

    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("touchmove", handleDocumentTouchMove, { passive: true });
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("touchend", handleDocumentTouchEnd);
    document.addEventListener("touchcancel", handleDocumentTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("touchmove", handleDocumentTouchMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("touchend", handleDocumentTouchEnd);
      document.removeEventListener("touchcancel", handleDocumentTouchEnd);
    };
  }, [checkCompletion]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isScratchingRef.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isScratchingRef.current = true;
    if (e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative select-none overflow-hidden", className)}
      style={{
        width,
        height,
        cursor: isComplete
          ? "default"
          : "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto",
      }}
      animate={controls}
    >
      {/* Scratch Canvas (Strictly on Top of children) */}
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 w-full h-full z-10 transition-opacity duration-300 touch-none",
          isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      {/* Meme / Sticker underneath */}
      <div className="relative z-0 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
