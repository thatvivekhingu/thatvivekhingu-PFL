"use client";

import { useEffect, useRef } from "react";

interface HeroConstellationProps {
  desktopDots?: number;
  mobileDots?: number;
}

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  baseOpacity: number;
  opacity: number;
  color: string;
  glow: boolean;
  driftAngle: number;
  driftSpeed: number;
  idleSpeed: number;
  nearMouse: number; // 0 to 1 intensity
}

export function HeroConstellation({
  desktopDots = 320,
  mobileDots = 80,
}: HeroConstellationProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let isVisible = true;

    // Vibrant futuristic Cyan/Sky/Blue palette for dark background
    const CYAN_PALETTE = [
      "34, 211, 238",   // Cyan-400
      "56, 189, 248",   // Sky-400
      "96, 165, 250",   // Blue-400
      "0, 242, 254",    // Bright Electric Cyan
      "147, 197, 253",  // Ice Blue
    ];

    // Interaction Parameters
    const INTERACTION_RADIUS = 180;
    const RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
    const MAX_LINE_DIST = 85;
    const MAX_LINE_DIST_SQ = MAX_LINE_DIST * MAX_LINE_DIST;

    // Mouse Tracking State
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const updateMousePos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= -50 && x <= width + 50 && y >= -50 && y <= height + 50) {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
        mouse.active = false;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      updateMousePos(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    window.addEventListener("touchend", onMouseLeave, { passive: true });

    // Intersection Observer to keep 60 FPS when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) {
          animationId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let particles: Particle[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initParticles() {
      particles = [];
      const isSmallScreen = window.innerWidth < 768;
      const totalCount = isSmallScreen ? mobileDots : desktopDots;

      const padX = width * 0.02;
      const padY = height * 0.02;
      const areaW = width - padX * 2;
      const areaH = height - padY * 2;

      for (let i = 0; i < totalCount; i++) {
        const baseX = padX + Math.random() * areaW;
        const baseY = padY + Math.random() * areaH;
        const baseRadius = 1.5 + Math.random() * 1.5; // 1.5px to 3.0px
        const baseOpacity = 0.35 + Math.random() * 0.30; // 0.35 to 0.65

        particles.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          radius: baseRadius,
          baseRadius,
          baseOpacity,
          opacity: baseOpacity,
          color: CYAN_PALETTE[Math.floor(Math.random() * CYAN_PALETTE.length)],
          glow: Math.random() > 0.65, // ~35% particles have soft 3-6px glow
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: (Math.random() - 0.5) * 0.02,
          idleSpeed: 0.15 + Math.random() * 0.25, // Gentle visible ambient drift
          nearMouse: 0,
        });
      }
    }

    function animate() {
      if (!isVisible) return;

      ctx!.clearRect(0, 0, width, height);

      const count = particles.length;

      // ----------------------------------------------------
      // 1. UPDATE PARTICLES: REPULSION + RETURN + AMBIENT DRIFT
      // ----------------------------------------------------
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // Constant ambient motion so particles are VISIBLY MOVING even without mouse
        p.driftAngle += p.driftSpeed;
        p.baseX += Math.cos(p.driftAngle) * p.idleSpeed;
        p.baseY += Math.sin(p.driftAngle) * p.idleSpeed;

        // Viewport wrapping for continuous ambient flow
        if (p.baseX < -20) p.baseX = width + 20;
        if (p.baseX > width + 20) p.baseX = -20;
        if (p.baseY < -20) p.baseY = height + 20;
        if (p.baseY > height + 20) p.baseY = -20;

        // Mouse Repulsion Physics
        if (mouse.active && mouse.x > -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < RADIUS_SQ && distSq > 0.01) {
            const distance = Math.sqrt(distSq);
            // Linear falloff: stronger when closer
            const force = (INTERACTION_RADIUS - distance) / INTERACTION_RADIUS;
            const angle = Math.atan2(dy, dx);

            // Push particle AWAY from mouse
            p.vx += Math.cos(angle) * force * 2.5;
            p.vy += Math.sin(angle) * force * 2.5;

            // Visual excitation factor
            p.nearMouse = Math.min(1, p.nearMouse + force * 0.3);
          } else {
            p.nearMouse *= 0.92;
          }
        } else {
          p.nearMouse *= 0.92;
        }

        // Apply velocity to position
        p.x += p.vx;
        p.y += p.vy;

        // Damping / Friction
        p.vx *= 0.90;
        p.vy *= 0.90;

        // Smooth spring pull back toward baseX, baseY
        p.vx += (p.baseX - p.x) * 0.008;
        p.vy += (p.baseY - p.y) * 0.008;

        // Dynamic size & brightness transition
        p.radius = p.baseRadius + p.nearMouse * 1.2;
        p.opacity = Math.min(1.0, p.baseOpacity + p.nearMouse * 0.45);
      }

      // ----------------------------------------------------
      // 2. DRAW CONNECTING CONSTELLATION LINES
      // ----------------------------------------------------
      for (let i = 0; i < count; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const ldx = p1.x - p2.x;
          const ldy = p1.y - p2.y;
          const ldistSq = ldx * ldx + ldy * ldy;

          if (ldistSq < MAX_LINE_DIST_SQ) {
            const ldist = Math.sqrt(ldistSq);
            const lineFactor = 1 - ldist / MAX_LINE_DIST;
            // Lines brighten when near mouse
            const lineAlpha = lineFactor * (0.12 + (p1.nearMouse + p2.nearMouse) * 0.35);

            ctx!.lineWidth = 0.8 + (p1.nearMouse + p2.nearMouse) * 0.5;
            ctx!.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
            ctx!.beginPath();
            ctx!.moveTo(p1.x, p1.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.stroke();
          }
        }
      }

      // ----------------------------------------------------
      // 3. DRAW PARTICLES WITH SELECTIVE SOFT GLOW
      // ----------------------------------------------------
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        ctx!.save();
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Soft 3-6px glow on selected particles or repelled particles
        if (p.glow || p.nearMouse > 0.15) {
          ctx!.shadowColor = `rgba(${p.color}, ${Math.min(0.9, p.opacity + 0.3)})`;
          ctx!.shadowBlur = 4 + p.nearMouse * 4;
        }

        ctx!.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx!.fill();
        ctx!.restore();
      }

      // ----------------------------------------------------
      // 4. SUBTLE TRANSPARENT MOUSE CURSOR FIELD (MINIMAL)
      // ----------------------------------------------------
      if (mouse.active && mouse.x > -1000) {
        ctx!.save();
        const grad = ctx!.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          INTERACTION_RADIUS
        );
        grad.addColorStop(0, "rgba(34, 211, 238, 0.04)");
        grad.addColorStop(0.7, "rgba(56, 189, 248, 0.015)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, INTERACTION_RADIUS, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      animationId = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animationId = requestAnimationFrame(animate);

    let lastWidth = window.innerWidth;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const widthChanged = window.innerWidth !== lastWidth;
        lastWidth = window.innerWidth;
        resize();
        if (widthChanged) {
          initParticles();
        }
      }, 150);
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchend", onMouseLeave);
    };
  }, [desktopDots, mobileDots]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
