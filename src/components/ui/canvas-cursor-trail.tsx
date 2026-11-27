"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export function CanvasCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (desktop mouse/trackpad)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let mouseX = -100;
    let mouseY = -100;
    let animationId: number;
    const MAX_FRAMES = 20;
    let points: TrailPoint[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Add current position to ribbon trail
      points.push({ x: mouseX, y: mouseY, age: 0 });
    };

    const onMouseLeave = () => {
      mouseX = -100;
      mouseY = -100;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Age points and remove dead points (> MAX_FRAMES)
      for (let i = 0; i < points.length; i++) {
        points[i].age += 1;
      }
      points = points.filter((p) => p.age < MAX_FRAMES);

      // Draw Ribbon Tail: Connecting Line Segments (Tapering & Fading)
      if (points.length > 1) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const progress = p1.age / MAX_FRAMES; // 0 = newest, 1 = oldest
          const opacity = (1 - progress) * 0.65;
          const strokeWidth = Math.max(1, (1 - progress) * 10);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = strokeWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = "#06b6d4";
          ctx.shadowBlur = 8 * (1 - progress);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw Semi-Transparent Cyan Dots along the tail
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const progress = p.age / MAX_FRAMES;
        const radius = Math.max(0.8, (1 - progress) * 5.5);
        const opacity = (1 - progress) * 0.55;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.shadowColor = "#06b6d4";
        ctx.shadowBlur = 6 * (1 - progress);
        ctx.fill();
        ctx.restore();
      }

      // Render Solid Glowing Cyan Circle directly at cursor position (radius ~7px)
      if (mouseX > -50 && mouseY > -50) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#06b6d4";
        ctx.shadowColor = "#06b6d4";
        ctx.shadowBlur = 14;
        ctx.fill();

        // Crisp inner core highlight
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 0;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] select-none overflow-hidden"
    />
  );
}
