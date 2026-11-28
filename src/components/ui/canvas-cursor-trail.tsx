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
    const MAX_FRAMES = 14;
    let points: TrailPoint[] = [];
    let isMouseMoving = false;
    let idleTimer: NodeJS.Timeout | null = null;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      points.push({ x: mouseX, y: mouseY, age: 0 });
      isMouseMoving = true;

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    const onMouseLeave = () => {
      mouseX = -100;
      mouseY = -100;
      isMouseMoving = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      // If no points and mouse is not moving, don't waste GPU cycles
      if (points.length === 0 && !isMouseMoving) {
        if (mouseX > -50 && mouseY > -50) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // Render stationary subtle gray cursor dot
          ctx.save();
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#a1a1aa";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.restore();
        }
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Age points and remove dead points (> MAX_FRAMES)
      for (let i = 0; i < points.length; i++) {
        points[i].age += 1;
      }
      points = points.filter((p) => p.age < MAX_FRAMES);

      // Draw Ribbon Tail: Connecting Line Segments (Smooth Gray/Silver)
      if (points.length > 1) {
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const progress = p1.age / MAX_FRAMES; // 0 = newest, 1 = oldest
          const opacity = (1 - progress) * 0.6;
          const strokeWidth = Math.max(1, (1 - progress) * 7);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(160, 165, 175, ${opacity})`;
          ctx.lineWidth = strokeWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw Semi-Transparent Silver/Gray Dots along the tail
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const progress = p.age / MAX_FRAMES;
        const radius = Math.max(0.8, (1 - progress) * 4);
        const opacity = (1 - progress) * 0.65;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 212, 216, ${opacity})`;
        ctx.fill();
        ctx.restore();
      }

      // Render Solid Glowing Gray/White Circle directly at cursor position
      if (mouseX > -50 && mouseY > -50) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#a1a1aa";
        ctx.shadowColor = "#71717a";
        ctx.shadowBlur = 6;
        ctx.fill();

        // Crisp inner core highlight
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2);
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
