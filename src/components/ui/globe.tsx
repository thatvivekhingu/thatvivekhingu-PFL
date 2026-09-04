"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// Coordinates
const AHMEDABAD = { lat: 23.0225, lng: 72.5714, name: "Ahmedabad", label: "Ahmedabad, IN" };

const DESTINATIONS = [
  {
    id: "usa",
    name: "USA",
    label: "USA",
    city: "New York",
    lat: 40.7128,
    lng: -74.0060,
    color: "rgb(56, 189, 248)", // Sky Blue
    accent: "#38bdf8",
    speed: 0.0032,
    offset: 0.0,
    lift: 0.25,
  },
  {
    id: "uk",
    name: "UK",
    label: "UK",
    city: "London",
    lat: 51.5074,
    lng: -0.1278,
    color: "rgb(168, 85, 247)", // Violet
    accent: "#a855f7",
    speed: 0.0040,
    offset: 0.28,
    lift: 0.18,
  },
  {
    id: "germany",
    name: "Germany",
    label: "Germany",
    city: "Frankfurt",
    lat: 50.1109,
    lng: 8.6821,
    color: "rgb(34, 197, 94)", // Emerald Green
    accent: "#22c55e",
    speed: 0.0038,
    offset: 0.54,
    lift: 0.16,
  },
  {
    id: "canada",
    name: "Canada",
    label: "Canada",
    city: "Toronto",
    lat: 43.6532,
    lng: -79.3832,
    color: "rgb(244, 63, 94)", // Rose
    accent: "#f43f5e",
    speed: 0.0034,
    offset: 0.78,
    lift: 0.26,
  },
];

const AMBER = "rgb(245, 158, 11)";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 4.6,
  theta: 0.3,
  dark: 0,
  diffuse: 0.5,
  mapSamples: 22000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [245 / 255, 158 / 255, 11 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [AHMEDABAD.lat, AHMEDABAD.lng], size: 0.08 },
    { location: [40.7128, -74.0060], size: 0.06 }, // USA
    { location: [51.5074, -0.1278], size: 0.06 },  // UK
    { location: [50.1109, 8.6821], size: 0.06 },   // Germany
    { location: [43.6532, -79.3832], size: 0.06 }, // Canada
  ],
};

// Sleek Supersonic Airplane Drawing Routine
function drawAirplane(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  color: string,
  scale = 0.9,
  alpha = 1
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

  // Jet thruster glow
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;

  // Supersonic Airplane Silhouette
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  // Nose
  ctx.moveTo(11, 0);
  // Right Wing
  ctx.lineTo(-1, 5);
  ctx.lineTo(-4, 11);
  ctx.lineTo(-6, 11);
  ctx.lineTo(-4, 2.5);
  // Right Tail Fin
  ctx.lineTo(-9, 4.5);
  ctx.lineTo(-9.5, 4.5);
  ctx.lineTo(-8.5, 1);
  // Fuselage back
  ctx.lineTo(-10.5, 0);
  // Left Tail Fin
  ctx.lineTo(-8.5, -1);
  ctx.lineTo(-9.5, -4.5);
  ctx.lineTo(-9, -4.5);
  // Left Wing
  ctx.lineTo(-4, -2.5);
  ctx.lineTo(-6, -11);
  ctx.lineTo(-4, -11);
  ctx.lineTo(-1, -5);
  ctx.closePath();
  ctx.fill();

  // Engine exhaust flame
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(-10.5, 0, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const { resolvedTheme } = useTheme();

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 50,
    stiffness: 500,
  });

  const globeConfig = useMemo(
    () => ({
      ...config,
      dark: resolvedTheme === "dark" ? 1 : 0,
      baseColor: (resolvedTheme === "dark"
        ? [0.8, 0.9, 1.2]
        : [1, 1, 1]) as [number, number, number],
    }),
    [config, resolvedTheme]
  );

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let currentPhi = 0;
    let overlayAnimId = 0;
    const theta = globeConfig.theta ?? 0.4;
    const isDark = resolvedTheme === "dark";

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...globeConfig,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!isVisible) return;
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
        currentPhi = state.phi;
      },
    } as COBEOptions);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    // Coordinate Vector conversion matching cobe (lng=0 on +X)
    const toVec = (lat: number, lng: number) => {
      const latR = (lat * Math.PI) / 180;
      const lngR = (lng * Math.PI) / 180;
      const cosLat = Math.cos(latR);
      return {
        x: cosLat * Math.cos(lngR),
        y: Math.sin(latR),
        z: -cosLat * Math.sin(lngR),
      };
    };

    const vOrigin = toVec(AHMEDABAD.lat, AHMEDABAD.lng);

    // Precompute the 4 great-circle flight routes
    const N_POINTS = 90;
    const routes = DESTINATIONS.map((dest) => {
      const vDest = toVec(dest.lat, dest.lng);
      const dotProd =
        vOrigin.x * vDest.x + vOrigin.y * vDest.y + vOrigin.z * vDest.z;
      const omega = Math.acos(Math.max(-1, Math.min(1, dotProd)));
      const sinOmega = Math.sin(omega);

      const arcPoints: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i <= N_POINTS; i++) {
        const t = i / N_POINTS;
        const a = Math.sin((1 - t) * omega) / sinOmega;
        const b = Math.sin(t * omega) / sinOmega;
        const x = a * vOrigin.x + b * vDest.x;
        const y = a * vOrigin.y + b * vDest.y;
        const z = a * vOrigin.z + b * vDest.z;
        const lift = 1 + Math.sin(Math.PI * t) * dest.lift;
        arcPoints.push({ x: x * lift, y: y * lift, z: z * lift });
      }

      return {
        ...dest,
        arcPoints,
        progress: dest.offset,
      };
    });

    // 3D Matrix Projection
    const project = (
      p: { x: number; y: number; z: number },
      phiRot: number
    ) => {
      const cosP = Math.cos(phiRot);
      const sinP = Math.sin(phiRot);
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const x1 = cosP * p.x + sinP * p.z;
      const y1 = p.y;
      const z1 = -sinP * p.x + cosP * p.z;
      return {
        x: x1,
        y: cosT * y1 - sinT * z1,
        z: sinT * y1 + cosT * z1,
      };
    };

    let pulsePhase = 0;

    const drawOverlay = () => {
      if (!isVisible) {
        overlayAnimId = requestAnimationFrame(drawOverlay);
        return;
      }
      const overlay = overlayRef.current;
      if (!overlay || width === 0) {
        overlayAnimId = requestAnimationFrame(drawOverlay);
        return;
      }
      const ctx = overlay.getContext("2d");
      if (!ctx) return;

      const dpr = 1.25;
      const W = width;
      if (overlay.width !== W * dpr) {
        overlay.width = W * dpr;
        overlay.height = W * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, W);

      const cx = W / 2;
      const cy = W / 2;
      const radius = (W / 2) * 0.8;

      pulsePhase += 0.04;

      // ----------------------------------------------------
      // 1. RENDER 4 INDIVIDUAL FLIGHT ROUTES & AIRPLANES
      // ----------------------------------------------------
      routes.forEach((route) => {
        // Project all points along this route's great-circle arc
        const projected = route.arcPoints.map((p) => {
          const pr = project(p, currentPhi);
          return {
            sx: cx + pr.x * radius,
            sy: cy - pr.y * radius,
            z: pr.z,
          };
        });

        // Draw Flight Path Line with subtle fade behind globe
        ctx.lineWidth = 1.1;
        ctx.lineCap = "round";
        for (let i = 0; i < projected.length - 1; i++) {
          const a = projected[i];
          const b = projected[i + 1];
          const zAvg = (a.z + b.z) / 2;
          if (zAvg < -0.05) continue;
          const alpha = Math.max(0, Math.min(0.45, ((zAvg + 0.05) / 0.6) * 0.45));
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }

        // Advance individual flight progress (each plane flies independently!)
        route.progress = (route.progress + route.speed) % 1.25;

        // Render Airplane & Comet Trail if in active flight (0 <= progress <= 1)
        if (route.progress <= 1) {
          const curIdx = Math.min(
            projected.length - 1,
            Math.floor(route.progress * (projected.length - 1))
          );
          const nextIdx = Math.min(projected.length - 1, curIdx + 1);

          const currentP = projected[curIdx];
          const nextP = projected[nextIdx];

          // Heading Angle of plane along projected screen path
          const heading = Math.atan2(nextP.sy - currentP.sy, nextP.sx - currentP.sx);

          // Glowing Comet Particle Trail Behind the Jet
          const trailLength = 16;
          for (let i = 1; i <= trailLength; i++) {
            const t = route.progress - i * 0.015;
            if (t < 0 || t > 1) continue;
            const tIdx = Math.min(
              projected.length - 1,
              Math.floor(t * (projected.length - 1))
            );
            const tp = projected[tIdx];
            if (tp.z < -0.05) continue;

            const trailFade = 1 - i / trailLength;
            const zAlpha = Math.max(0, Math.min(1, (tp.z + 0.05) / 0.6));
            const pSize = Math.max(0.6, 2.5 - i * 0.13);

            ctx.beginPath();
            ctx.arc(tp.sx, tp.sy, pSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${route.color.replace("rgb(", "").replace(")", "")}, ${
              trailFade * zAlpha * 0.8
            })`;
            ctx.fill();
          }

          // Draw the Airplane (hidden when on back side of globe)
          if (currentP.z >= -0.05) {
            const planeAlpha = Math.max(0, Math.min(1, (currentP.z + 0.05) / 0.45));
            drawAirplane(
              ctx,
              currentP.sx,
              currentP.sy,
              heading,
              route.accent,
              0.88,
              planeAlpha
            );
          }
        }
      });

      // ----------------------------------------------------
      // 2. RENDER CITY DOTS, LABELS & RADAR BEACONS
      // ----------------------------------------------------
      const drawCityPin = (
        lat: number,
        lng: number,
        color: string,
        label: string,
        isOrigin = false
      ) => {
        const pr = project(toVec(lat, lng), currentPhi);
        if (pr.z < -0.02) return;
        const sx = cx + pr.x * radius;
        const sy = cy - pr.y * radius;
        const zAlpha = Math.max(0.2, Math.min(1, pr.z + 0.4));

        // Radar Expanding Wave on Origin (Ahmedabad)
        if (isOrigin) {
          const waveRadius = 4 + (Math.sin(pulsePhase) + 1) * 6;
          const waveAlpha = (1 - (Math.sin(pulsePhase) + 1) * 0.4) * zAlpha * 0.5;
          ctx.beginPath();
          ctx.arc(sx, sy, waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(245, 158, 11, ${Math.max(0, waveAlpha)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Glowing Ambient Pin
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 11);
        glow.addColorStop(0, color);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = zAlpha * 0.5;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, 11, 0, Math.PI * 2);
        ctx.fill();

        // Pin Solid Dot
        ctx.globalAlpha = zAlpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(sx, sy, isOrigin ? 3.5 : 3, 0, Math.PI * 2);
        ctx.fill();

        // City Label Badge
        if (pr.z > 0.15) {
          ctx.font = "bold 9px monospace";
          ctx.fillStyle = isDark ? "#ffffff" : "#1e293b";
          ctx.textAlign = "center";
          ctx.fillText(label, sx, sy - 7);
        }

        ctx.globalAlpha = 1;
      };

      // Draw Origin (Ahmedabad)
      drawCityPin(AHMEDABAD.lat, AHMEDABAD.lng, AMBER, "Ahmedabad", true);

      // Draw 4 Destinations (USA, UK, Germany, Canada)
      DESTINATIONS.forEach((d) => {
        drawCityPin(d.lat, d.lng, d.color, d.label, false);
      });

      overlayAnimId = requestAnimationFrame(drawOverlay);
    };

    overlayAnimId = requestAnimationFrame(drawOverlay);

    return () => {
      cancelAnimationFrame(overlayAnimId);
      observer.disconnect();
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, globeConfig, resolvedTheme]);

  return (
    <div
      className={cn(
        "absolute inset-0 mt-8 mx-auto aspect-[1/1] w-full max-w-[450px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      <canvas
        ref={overlayRef}
        className="absolute inset-0 size-full pointer-events-none"
      />
    </div>
  );
}
