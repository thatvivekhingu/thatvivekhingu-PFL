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
  minScratchPercentage = 20,
  onComplete,
  children,
  className,
  gradientColors = ["#A97CF8", "#F38CB8", "#FDCC92"],
  resetKey,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const controls = useAnimation();

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    const w = width || container?.offsetWidth || 300;
    const h = height || container?.offsetHeight || 150;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, w, h);

    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, gradientColors[0]);
    gradient.addColorStop(0.5, gradientColors[1]);
    gradient.addColorStop(1, gradientColors[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  };

  useEffect(() => {
    initializeCanvas();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!isComplete) {
        initializeCanvas();
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradientColors]);

  useEffect(() => {
    // Reset the scratch area when resetKey changes
    setIsComplete(false);
    initializeCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!isScratching) return;
      scratch(event.clientX, event.clientY);
    };

    const handleDocumentTouchMove = (event: TouchEvent) => {
      if (!isScratching) return;
      const touch = event.touches[0];
      scratch(touch.clientX, touch.clientY);
    };

    const handleDocumentMouseUp = () => {
      setIsScratching(false);
      checkCompletion();
    };

    const handleDocumentTouchEnd = () => {
      setIsScratching(false);
      checkCompletion();
    };

    document.addEventListener("mousedown", handleDocumentMouseMove);
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("touchstart", handleDocumentTouchMove);
    document.addEventListener("touchmove", handleDocumentTouchMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("touchend", handleDocumentTouchEnd);
    document.addEventListener("touchcancel", handleDocumentTouchEnd);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseMove);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("touchstart", handleDocumentTouchMove);
      document.removeEventListener("touchmove", handleDocumentTouchMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("touchend", handleDocumentTouchEnd);
      document.removeEventListener("touchcancel", handleDocumentTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScratching]);

  const handleMouseDown = () => setIsScratching(true);
  const handleTouchStart = () => setIsScratching(true);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const startAnimation = async () => {
    await controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 },
    });

    if (onComplete) {
      onComplete();
    }
  };

  const checkCompletion = () => {
    if (isComplete) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx && canvas.width > 0 && canvas.height > 0) {
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const totalPixels = pixels.length / 4;
        let clearPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
          if (pixels[i] === 0) clearPixels++;
        }

        const percentage = (clearPixels / totalPixels) * 100;

        if (percentage >= minScratchPercentage) {
          setIsComplete(true);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          startAnimation();
        }
      } catch {}
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative select-none touch-none overflow-hidden", className)}
      style={{
        width,
        height,
        cursor: isComplete
          ? "default"
          : "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto",
      }}
      animate={controls}
    >
      <div className="relative z-0 w-full h-full flex items-center justify-center">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 z-10 w-full h-full transition-opacity duration-300 pointer-events-auto",
          isComplete && "opacity-0 pointer-events-none"
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
    </motion.div>
  );
};
