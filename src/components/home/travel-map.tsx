"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring, motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  BASE_LOCATION,
  TRAVEL_LOCATIONS,
  TRAVEL_STATS,
  type TravelLocation,
} from "@/data/travel-data";
import { cn } from "@/lib/utils";
import {
  IconCompass,
  IconMapPin,
  IconMountain,
  IconFlame,
  IconSparkles,
  IconBuildingSkyscraper,
  IconArrowUpRight,
  IconInfoCircle,
} from "@tabler/icons-react";

type CategoryFilter = "all" | "himalayas" | "sacred" | "heritage" | "urban";

const MOVEMENT_DAMPING = 1200;

export default function TravelMap() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<TravelLocation | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();

  // Motion value for interactive rotation
  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 45,
    stiffness: 400,
  });

  const filteredLocations = useMemo(() => {
    if (selectedCategory === "all") return TRAVEL_LOCATIONS;
    return TRAVEL_LOCATIONS.filter((loc) => loc.category === selectedCategory);
  }, [selectedCategory]);

  // Target phi calculation for centering a location on the globe
  const rotateToLocation = (loc: TravelLocation) => {
    setSelectedLocation(loc);
    // Convert longitude to phi offset so it faces front (India is ~73°E)
    // Longitude to radians:
    const targetLngRad = (loc.lng * Math.PI) / 180;
    // Base front-facing offset in cobe
    const desiredPhi = 4.75 - targetLngRad;
    r.set(desiredPhi);
  };

  // Convert lat/lng to unrotated 3D sphere coordinate
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

  // Precompute arc points from Ahmedabad to each destination
  const allArcs = useMemo(() => {
    const vBase = toVec(BASE_LOCATION.lat, BASE_LOCATION.lng);
    const N = 40;
    const ARC_LIFT = 0.12;

    return TRAVEL_LOCATIONS.map((loc) => {
      const vDest = toVec(loc.lat, loc.lng);
      const dotProd = vBase.x * vDest.x + vBase.y * vDest.y + vBase.z * vDest.z;
      const omega = Math.acos(Math.max(-1, Math.min(1, dotProd)));
      const sinOmega = Math.sin(omega) || 0.0001;

      const points: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const a = Math.sin((1 - t) * omega) / sinOmega;
        const b = Math.sin(t * omega) / sinOmega;
        const x = a * vBase.x + b * vDest.x;
        const y = a * vBase.y + b * vDest.y;
        const z = a * vBase.z + b * vDest.z;
        const lift = 1 + Math.sin(Math.PI * t) * ARC_LIFT;
        points.push({ x: x * lift, y: y * lift, z: z * lift });
      }

      return {
        id: loc.id,
        category: loc.category,
        destination: loc,
        points,
      };
    });
  }, []);

  useEffect(() => {
    let phi = 4.8; // Initial focus on India
    let width = 0;
    let currentPhi = phi;
    let overlayAnimId = 0;
    const theta = 0.42; // Tilt so Northern hemisphere & India are nicely in view
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

    // Map markers for cobe
    const cobeMarkers = [
      { location: [BASE_LOCATION.lat, BASE_LOCATION.lng], size: 0.08 },
      ...TRAVEL_LOCATIONS.map((loc) => ({
        location: [loc.lat, loc.lng] as [number, number],
        size: loc.category === "himalayas" ? 0.06 : 0.045,
      })),
    ];

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 4.8,
      theta: 0.42,
      dark: isDark ? 1 : 0,
      diffuse: 0.6,
      mapSamples: 24000,
      mapBrightness: isDark ? 1.4 : 1.1,
      baseColor: isDark ? [0.8, 0.9, 1.2] : [0.95, 0.95, 0.98],
      markerColor: [245 / 255, 158 / 255, 11 / 255],
      glowColor: isDark ? [0.3, 0.4, 0.7] : [0.8, 0.8, 0.9],
      markers: cobeMarkers,
      onRender: (state) => {
        if (!isVisible) return;
        // Gentle auto rotation when user is not dragging
        if (!pointerInteracting.current && !selectedLocation) {
          phi += 0.0025;
        }
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
        currentPhi = state.phi;
      },
    } as COBEOptions);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 50);

    const project = (p: { x: number; y: number; z: number }, phiRot: number) => {
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

    let beamProgress = 0;

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

      // Draw Travel Arcs
      beamProgress = (beamProgress + 0.006) % 1.4;

      allArcs.forEach((arc) => {
        const isHighlighted =
          selectedLocation?.id === arc.id ||
          hoveredLocation?.id === arc.id ||
          selectedCategory === "all" ||
          selectedCategory === arc.category;

        if (!isHighlighted) return;

        const projected = arc.points.map((p) => {
          const pr = project(p, currentPhi);
          return {
            sx: cx + pr.x * radius,
            sy: cy - pr.y * radius,
            z: pr.z,
          };
        });

        // Arc line with z-based opacity
        const activeArc = selectedLocation?.id === arc.id || hoveredLocation?.id === arc.id;
        const lineRgb = activeArc
          ? "245, 158, 11" // Amber
          : arc.category === "himalayas"
          ? "56, 189, 248" // Sky blue
          : isDark
          ? "255, 255, 255"
          : "80, 80, 80";

        ctx.lineWidth = activeArc ? 2.2 : 1.1;
        ctx.lineCap = "round";

        for (let i = 0; i < projected.length - 1; i++) {
          const a = projected[i];
          const b = projected[i + 1];
          const zAvg = (a.z + b.z) / 2;
          if (zAvg < -0.05) continue;
          const baseAlpha = activeArc ? 0.85 : 0.35;
          const alpha = Math.max(0, Math.min(baseAlpha, ((zAvg + 0.05) / 0.6) * baseAlpha));
          ctx.strokeStyle = `rgba(${lineRgb}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }

        // Animated traveling photons along active or all arcs
        if (beamProgress <= 1) {
          const idx = Math.min(
            projected.length - 1,
            Math.floor(beamProgress * (projected.length - 1))
          );
          const p = projected[idx];
          if (p && p.z >= -0.05) {
            const zAlpha = Math.max(0, Math.min(1, (p.z + 0.05) / 0.6));
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, activeArc ? 3 : 1.8, 0, Math.PI * 2);
            ctx.fillStyle = activeArc
              ? `rgba(255, 220, 100, ${zAlpha})`
              : `rgba(255, 255, 255, ${zAlpha * 0.7})`;
            ctx.fill();
          }
        }
      });

      // City Pin Dots
      const drawCityPin = (loc: TravelLocation, isBase: boolean = false) => {
        const pr = project(toVec(loc.lat, loc.lng), currentPhi);
        if (pr.z < -0.02) return;
        const sx = cx + pr.x * radius;
        const sy = cy - pr.y * radius;
        const zAlpha = Math.max(0.3, Math.min(1, pr.z + 0.4));

        const isSelected = selectedLocation?.id === loc.id;
        const isHovered = hoveredLocation?.id === loc.id;
        const pinColor = isBase
          ? "rgb(34, 197, 94)" // Green for base
          : loc.category === "himalayas"
          ? "rgb(56, 189, 248)" // Blue for Himalayas
          : loc.category === "sacred"
          ? "rgb(245, 158, 11)" // Amber
          : loc.category === "heritage"
          ? "rgb(236, 72, 153)" // Pink
          : "rgb(168, 85, 247)"; // Purple

        // Glow ring
        const glowRadius = isSelected || isHovered ? 14 : isBase ? 10 : 7;
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
        glow.addColorStop(0, pinColor);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = zAlpha * (isSelected || isHovered ? 0.8 : 0.45);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Center dot
        ctx.globalAlpha = zAlpha;
        ctx.fillStyle = pinColor;
        ctx.beginPath();
        ctx.arc(sx, sy, isSelected || isHovered ? 4.5 : isBase ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      };

      // Draw base
      drawCityPin(BASE_LOCATION, true);

      // Draw all destinations
      TRAVEL_LOCATIONS.forEach((loc) => drawCityPin(loc, false));

      overlayAnimId = requestAnimationFrame(drawOverlay);
    };

    overlayAnimId = requestAnimationFrame(drawOverlay);

    return () => {
      cancelAnimationFrame(overlayAnimId);
      observer.disconnect();
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, resolvedTheme, allArcs, selectedLocation, hoveredLocation, selectedCategory]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Travel Stats Bento Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/40 backdrop-blur-md p-4 transition-all hover:border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono uppercase tracking-wider">
            <IconCompass className="size-4 text-amber-500" />
            <span>Destinations</span>
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {TRAVEL_STATS.totalDestinations}+
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Across 4 States</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/40 backdrop-blur-md p-4 transition-all hover:border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono uppercase tracking-wider">
            <IconMountain className="size-4 text-sky-400" />
            <span>Peak Elevation</span>
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            3,583m
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Kedarnath Mandir</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/40 backdrop-blur-md p-4 transition-all hover:border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono uppercase tracking-wider">
            <IconFlame className="size-4 text-orange-500" />
            <span>Sacred Dhams</span>
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            2 / 4
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Dwarka & Badrinath</div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/40 backdrop-blur-md p-4 transition-all hover:border-border">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono uppercase tracking-wider">
            <IconSparkles className="size-4 text-emerald-400" />
            <span>Jyotirlingas</span>
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            2 Shrines
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Somnath & Kedarnath</div>
        </div>
      </div>

      {/* Main Interactive Map & Explorer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left/Top: 3D Interactive WebGL Globe */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px] rounded-2xl border border-border/40 bg-radial from-card/80 to-background p-4 overflow-hidden shadow-sm">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Base: Ahmedabad (23.02° N, 72.57° E)</span>
          </div>

          <div className="absolute bottom-4 right-4 z-10 text-[11px] text-muted-foreground/80 bg-background/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-border/30">
            Drag to rotate • Click pin to explore
          </div>

          <div
            className="relative aspect-square w-full max-w-[380px] sm:max-w-[420px] cursor-grab active:cursor-grabbing"
            onPointerDown={(e) => {
              pointerInteracting.current = e.clientX;
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
            }}
            onMouseMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                r.set(r.get() + delta / MOVEMENT_DAMPING);
              }
            }}
            onTouchMove={(e) => {
              if (e.touches[0] && pointerInteracting.current !== null) {
                const delta = e.touches[0].clientX - pointerInteracting.current;
                r.set(r.get() + delta / MOVEMENT_DAMPING);
              }
            }}
          >
            <canvas
              ref={canvasRef}
              className="size-full opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
            />
            <canvas
              ref={overlayRef}
              className="absolute inset-0 size-full pointer-events-none"
            />
          </div>
        </div>

        {/* Right/Bottom: Category Filters & Location Cards Explorer */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-muted/40 rounded-xl border border-border/50">
            {[
              { id: "all", label: "All (20)", icon: IconCompass },
              { id: "himalayas", label: "Himalayas 🏔️", icon: IconMountain },
              { id: "sacred", label: "Shakti & Shrines 🕉️", icon: IconFlame },
              { id: "heritage", label: "Heritage 🏰", icon: IconSparkles },
              { id: "urban", label: "Urban & Nature 🌿", icon: IconBuildingSkyscraper },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(tab.id as CategoryFilter);
                    setSelectedLocation(null);
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                    isActive
                      ? "bg-background text-foreground shadow-xs border border-border/80"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                  )}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active / Selected Location Spotlight Card */}
          <AnimatePresence mode="wait">
            {selectedLocation ? (
              <motion.div
                key={selectedLocation.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedLocation.icon || "📍"}</span>
                    <div>
                      <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                        {selectedLocation.name}
                        <span className="text-xs font-normal text-muted-foreground">
                          ({selectedLocation.state})
                        </span>
                      </h4>
                      <span className="inline-block text-[11px] font-medium text-amber-500 dark:text-amber-400">
                        {selectedLocation.tag}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded bg-background/60 border border-border/50"
                  >
                    Reset
                  </button>
                </div>

                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                  {selectedLocation.highlight}
                </p>

                <div className="mt-3 pt-3 border-t border-border/40 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
                  {selectedLocation.elevation && (
                    <span className="flex items-center gap-1">
                      <IconMountain className="size-3.5 text-sky-400" />
                      Elevation: <strong className="text-foreground">{selectedLocation.elevation}</strong>
                    </span>
                  )}
                  {selectedLocation.distanceFromBase && (
                    <span className="flex items-center gap-1">
                      <IconMapPin className="size-3.5 text-emerald-400" />
                      From Ahmedabad: <strong className="text-foreground">{selectedLocation.distanceFromBase}</strong>
                    </span>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/40 text-xs text-muted-foreground">
                <IconInfoCircle className="size-4 text-primary shrink-0" />
                <span>Select or hover any destination below to rotate the 3D globe and inspect its coordinates & elevation.</span>
              </div>
            )}
          </AnimatePresence>

          {/* Location Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-muted">
            {filteredLocations.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => rotateToLocation(loc)}
                  onMouseEnter={() => setHoveredLocation(loc)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  className={cn(
                    "flex flex-col items-start p-2.5 rounded-lg border text-left transition-all group",
                    isSelected
                      ? "border-amber-500/60 bg-amber-500/10 shadow-xs"
                      : "border-border/40 bg-card/30 hover:border-border hover:bg-card/70"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-base">{loc.icon || "📍"}</span>
                    <IconArrowUpRight className="size-3 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                  </div>
                  <span className="font-medium text-xs text-foreground mt-1 truncate w-full">
                    {loc.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate w-full">
                    {loc.state}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
