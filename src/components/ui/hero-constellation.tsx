"use client";

import { useEffect, useRef } from "react";

interface HeroConstellationProps {
  desktopDots?: number;
  mobileDots?: number;
}

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  color: string;
  phase: number;
  pulseSpeed: number;
  repelled: number;
  driftRadius: number;
  driftSpeed: number;
}

export function HeroConstellation({
  desktopDots = 140,
  mobileDots = 45,
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
    let isMobile = false;

    // Subtle AI/ML futuristic Cyan & Sky Blue particle palette
    const CYAN_PALETTE = [
      "34, 211, 238", // Cyan-400
      "56, 189, 248", // Sky-400
      "96, 165, 250", // Blue-400
      "125, 211, 252", // Sky-300
    ];

    // Interaction Parameters
    const INTERACTION_RADIUS = 160; // 140px - 180px radius
    const RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;
    const MAX_LINE_DIST = 75; // Distance for subtle connecting constellation lines
    const MAX_LINE_DIST_SQ = MAX_LINE_DIST * MAX_LINE_DIST;

    // Center avatar buffer zone (keeps portrait clean)
    const PORTRAIT_AVOID_RADIUS = 145;
    const PORTRAIT_AVOID_RADIUS_SQ = PORTRAIT_AVOID_RADIUS * PORTRAIT_AVOID_RADIUS;

    // Mouse Tracking State
    let mouseX = -9999;
    let mouseY = -9999;

    const checkIsMobile = () => {
      isMobile =
        window.innerWidth < 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
    };
    checkIsMobile();

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Inside hero section
      if (x >= -50 && x <= width + 50 && y >= -50 && y <= height + 50) {
        mouseX = x;
        mouseY = y;
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }
    };

    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });

    // Pause canvas loop when hero scrolls off-screen for 60 FPS efficiency
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationId) {
          lastTime = 0;
          animationId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let particles: Particle[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      checkIsMobile();
    }

    function initParticles() {
      particles = [];
      const totalCount = isMobile ? mobileDots : desktopDots;

      const padX = width * 0.03;
      const padY = height * 0.04;
      const areaW = width - padX * 2;
      const areaH = height - padY * 2;

      const cx = width / 2;
      const cy = height * 0.42; // Avatar center approximate offset

      let attempts = 0;
      while (particles.length < totalCount && attempts < totalCount * 3) {
        attempts++;
        const originX = padX + Math.random() * areaW;
        const originY = padY + Math.random() * areaH;

        // Keep center portrait area clean
        const dpx = originX - cx;
        const dpy = originY - cy;
        if (dpx * dpx + dpy * dpy < PORTRAIT_AVOID_RADIUS_SQ) {
          // 85% chance to skip placing particle directly on portrait face
          if (Math.random() < 0.85) continue;
        }

        particles.push({
          originX,
          originY,
          x: originX,
          y: originY,
          vx: 0,
          vy: 0,
          radius: 0.75 + Math.random() * 0.85, // Tiny: 0.75px - 1.6px
          baseOpacity: 0.22 + Math.random() * 0.3, // Subtle opacity
          color: CYAN_PALETTE[Math.floor(Math.random() * CYAN_PALETTE.length)],
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.001 + Math.random() * 0.0015,
          repelled: 0,
          driftRadius: 2.5 + Math.random() * 4.5, // Subtle organic drift
          driftSpeed: 0.0006 + Math.random() * 0.001,
        });
      }
    }

    let lastTime = 0;

    function animate(time: number) {
      if (!isVisible) return;
      const dt = Math.min(lastTime ? time - lastTime : 16, 32); // Clamp dt to prevent jumping
      lastTime = time;

      ctx!.clearRect(0, 0, width, height);

      const count = particles.length;

      // ----------------------------------------------------
      // 1. UPDATE PARTICLES WITH REPULSION & ELASTIC RETURN
      // ----------------------------------------------------
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // Idle floating target around original coordinate
        const idleTargetX =
          p.originX + Math.cos(time * p.driftSpeed + p.phase) * p.driftRadius;
        const idleTargetY =
          p.originY + Math.sin(time * p.driftSpeed + p.phase) * p.driftRadius;

        // Smooth Mouse Repulsion (Desktop Only)
        if (!isMobile && mouseX > -1000) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < RADIUS_SQ && distSq > 1) {
            const dist = Math.sqrt(distSq);
            // Smooth quadratic easing: stronger close-up, subtle at edges
            const falloff = 1 - dist / INTERACTION_RADIUS;
            const force = falloff * falloff * 5.2;

            const nx = dx / dist;
            const ny = dy / dist;

            // Repel AWAY from cursor
            p.vx += nx * force * (dt / 16);
            p.vy += ny * force * (dt / 16);

            // Increase glow intensity
            p.repelled = Math.min(1, p.repelled + falloff * 0.25);
          } else {
            p.repelled *= 0.94; // Smooth decay
          }
        } else {
          p.repelled *= 0.94;
        }

        // Hooke's Elastic Spring Return towards idle anchor
        const springK = 0.038;
        const damping = 0.86;

        const ax = (idleTargetX - p.x) * springK;
        const ay = (idleTargetY - p.y) * springK;

        p.vx = (p.vx + ax) * damping;
        p.vy = (p.vy + ay) * damping;

        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);

        // Breathing pulse phase
        p.phase += p.pulseSpeed * dt;
      }

      // ----------------------------------------------------
      // 2. DRAW FAINT CONSTELLATION CONNECTING LINES
      // ----------------------------------------------------
      ctx!.lineWidth = 0.65;
      for (let i = 0; i < count; i++) {
        const p1 = particles[i];

        // Draw connections only to a subset to keep 60 FPS locked
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const ldx = p1.x - p2.x;
          const ldy = p1.y - p2.y;
          const ldistSq = ldx * ldx + ldy * ldy;

          if (ldistSq < MAX_LINE_DIST_SQ) {
            const ldist = Math.sqrt(ldistSq);
            const lineFactor = 1 - ldist / MAX_LINE_DIST;
            // Very faint connecting line opacity
            const lineAlpha =
              lineFactor * (0.07 + (p1.repelled + p2.repelled) * 0.12);

            ctx!.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
            ctx!.beginPath();
            ctx!.moveTo(p1.x, p1.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.stroke();
          }
        }
      }

      // ----------------------------------------------------
      // 3. DRAW PARTICLES & SUBTLE GLOW AROUND REPULSED ONES
      // ----------------------------------------------------
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        const pulse = (Math.sin(p.phase) + 1) * 0.5;
        const currentOpacity =
          (p.baseOpacity * (0.5 + pulse * 0.5) + p.repelled * 0.35);

        // Subtle faint halo glow ONLY on particles affected by cursor
        if (p.repelled > 0.08) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${p.color}, ${p.repelled * 0.2})`;
          ctx!.fill();
        }

        // Core Particle Dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius + p.repelled * 0.4, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color}, ${Math.min(0.85, currentOpacity)})`;
        ctx!.fill();
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
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [desktopDots, mobileDots]);

  return (
    <div className="absolute inset-0 pointer-events-none -z-30 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
