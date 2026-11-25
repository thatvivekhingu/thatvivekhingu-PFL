"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function InteractiveCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check for custom cursor targets or clickable elements
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;
      const interactiveTarget = target?.closest("button, a, input, [role='button'], [data-magnetic]");

      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor"));
        setIsHovered(true);
      } else if (interactiveTarget) {
        setCursorText(null);
        setIsHovered(true);
      } else {
        setCursorText(null);
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const render = () => {
      // Smooth linear interpolation for trailing ring
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.25s ease" }}
    >
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] pointer-events-none will-change-transform"
      />

      {/* Trailing Elastic Ring / Label Capsule */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none will-change-transform transition-all duration-200 ease-out ${
          cursorText
            ? "px-3 py-1 -ml-6 -mt-4 rounded-full bg-cyan-400 text-black font-mono text-[10px] font-extrabold tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.6)]"
            : isHovered
            ? "w-11 h-11 -ml-5.5 -mt-5.5 rounded-full border border-cyan-400/80 bg-cyan-400/10 backdrop-blur-[1px] shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            : "w-8 h-8 -ml-4 -mt-4 rounded-full border border-white/30 bg-transparent"
        }`}
      >
        {cursorText && <span className="uppercase">{cursorText}</span>}
      </div>
    </div>,
    document.body
  );
}
