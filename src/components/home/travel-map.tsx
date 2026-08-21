"use client";

import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { IconMaximize } from "@tabler/icons-react";

interface Station {
  id: string;
  name: string;
  state: string;
  region: "gujarat" | "himalayas" | "rajasthan" | "maharashtra";
  lat: number;
  lng: number;
  icon: string;
  tag: string;
  elevation?: string;
  // Offset positioning for label leader line to prevent overlapping
  labelOffsetX: number;
  labelOffsetY: number;
  labelAlign: "left" | "right" | "center";
}

// 20 Destinations with smart label offsets so zero labels ever overlap
const STATIONS: Station[] = [
  // Gujarat Circuit
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", region: "gujarat", lat: 23.0225, lng: 72.5714, icon: "🏠", tag: "Home & Origin", labelOffsetX: 25, labelOffsetY: 5, labelAlign: "left" },
  { id: "thol", name: "Thol Lake", state: "Gujarat", region: "gujarat", lat: 23.1416, lng: 72.4042, icon: "🦩", tag: "Bird Sanctuary", labelOffsetX: -20, labelOffsetY: -22, labelAlign: "right" },
  { id: "gift-city", name: "GIFT City", state: "Gujarat", region: "gujarat", lat: 23.1610, lng: 72.6840, icon: "🏙️", tag: "FinTech Metropolis", labelOffsetX: 25, labelOffsetY: -18, labelAlign: "left" },
  { id: "pavagadh", name: "Pavagadh", state: "Gujarat", region: "gujarat", lat: 22.4827, lng: 73.5303, icon: "🪔", tag: "Mahakali Shaktipeeth (762m)", labelOffsetX: 25, labelOffsetY: 12, labelAlign: "left" },
  { id: "surat", name: "Surat", state: "Gujarat", region: "gujarat", lat: 21.1702, lng: 72.8311, icon: "💎", tag: "Diamond Capital", labelOffsetX: 25, labelOffsetY: 0, labelAlign: "left" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", region: "maharashtra", lat: 19.0760, lng: 72.8777, icon: "🌆", tag: "Marine Drive Coast", labelOffsetX: 25, labelOffsetY: 5, labelAlign: "left" },
  { id: "somnath", name: "Somnath", state: "Gujarat", region: "gujarat", lat: 20.8880, lng: 70.4012, icon: "🔱", tag: "1st Shiva Jyotirlinga", labelOffsetX: -25, labelOffsetY: 18, labelAlign: "right" },
  { id: "junagadh", name: "Junagadh", state: "Gujarat", region: "gujarat", lat: 21.5222, lng: 70.4579, icon: "🧗", tag: "Mount Girnar (1,031m)", labelOffsetX: -25, labelOffsetY: -5, labelAlign: "right" },
  { id: "chotila", name: "Chotila", state: "Gujarat", region: "gujarat", lat: 22.4219, lng: 71.1969, icon: "🚩", tag: "Chamunda Mataji Hill", labelOffsetX: -25, labelOffsetY: -18, labelAlign: "right" },
  { id: "dwarka", name: "Dwarka", state: "Gujarat", region: "gujarat", lat: 22.2442, lng: 68.9685, icon: "🦚", tag: "Lord Krishna Kingdom", labelOffsetX: -30, labelOffsetY: 5, labelAlign: "right" },
  { id: "kutch", name: "Rann of Kutch", state: "Gujarat", region: "gujarat", lat: 23.7337, lng: 69.8597, icon: "🐪", tag: "White Salt Desert", labelOffsetX: -30, labelOffsetY: -12, labelAlign: "right" },
  { id: "ambaji", name: "Ambaji", state: "Gujarat", region: "gujarat", lat: 24.3323, lng: 72.8530, icon: "🌸", tag: "Shaktipeeth (480m)", labelOffsetX: -25, labelOffsetY: -18, labelAlign: "right" },

  // Rajasthan Circuit
  { id: "udaipur", name: "Udaipur", state: "Rajasthan", region: "rajasthan", lat: 24.5854, lng: 73.7125, icon: "🏰", tag: "City of Lakes (598m)", labelOffsetX: 25, labelOffsetY: -15, labelAlign: "left" },
  { id: "chittorgarh", name: "Chittorgarh", state: "Rajasthan", region: "rajasthan", lat: 24.8887, lng: 74.6269, icon: "🛡️", tag: "Historic Fort (394m)", labelOffsetX: 25, labelOffsetY: 5, labelAlign: "left" },

  // Himalayan Char Dham & Devbhoomi Circuit
  { id: "haridwar", name: "Haridwar", state: "Uttarakhand", region: "himalayas", lat: 29.9457, lng: 78.1642, icon: "🔥", tag: "Ganga Aarti Gateway", labelOffsetX: -25, labelOffsetY: 15, labelAlign: "right" },
  { id: "uttarkashi", name: "Uttarkashi", state: "Uttarakhand", region: "himalayas", lat: 30.7268, lng: 78.4354, icon: "⛰️", tag: "Vishwanath Shrine", labelOffsetX: -25, labelOffsetY: -5, labelAlign: "right" },
  { id: "yamunotri", name: "Yamunotri", state: "Uttarakhand", region: "himalayas", lat: 31.0140, lng: 78.4600, icon: "💧", tag: "Origin of Yamuna (3,293m)", labelOffsetX: -25, labelOffsetY: -25, labelAlign: "right" },
  { id: "gangotri", name: "Gangotri", state: "Uttarakhand", region: "himalayas", lat: 30.9947, lng: 78.9398, icon: "🌊", tag: "Origin of Ganga (3,100m)", labelOffsetX: 0, labelOffsetY: -30, labelAlign: "center" },
  { id: "kedarnath", name: "Kedarnath", state: "Uttarakhand", region: "himalayas", lat: 30.7346, lng: 79.0669, icon: "🏔️", tag: "Lord Shiva Dham (3,583m)", labelOffsetX: 25, labelOffsetY: -12, labelAlign: "left" },
  { id: "badrinath", name: "Badrinath", state: "Uttarakhand", region: "himalayas", lat: 30.7433, lng: 79.4938, icon: "🛕", tag: "Maha Vishnu Dham (3,300m)", labelOffsetX: 30, labelOffsetY: 10, labelAlign: "left" },
];

// Sequential Hogwarts Express route
const ROUTE_SEQUENCE = [
  "ahmedabad", "thol", "chotila", "junagadh", "somnath", "dwarka", "kutch",
  "ambaji", "udaipur", "chittorgarh", "haridwar", "uttarkashi", "yamunotri",
  "gangotri", "kedarnath", "badrinath", "pavagadh", "gift-city", "surat", "mumbai", "ahmedabad"
];

type RegionView = "all" | "himalayas" | "gujarat" | "rajasthan";

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

export default function TravelMap() {
  const [activeRegion, setActiveRegion] = useState<RegionView>("all");
  const [activeStation, setActiveStation] = useState<Station>(STATIONS[0]);
  const [nextStation, setNextStation] = useState<Station>(STATIONS[1]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Train animation state
  const [trainPos, setTrainPos] = useState({ x: 340, y: 410, angle: 0 });
  const [smokeParticles, setSmokeParticles] = useState<SmokeParticle[]>([]);

  // Bounding box for the map projection
  const mapBounds = useMemo(() => {
    if (activeRegion === "himalayas") {
      return { minLng: 77.8, maxLng: 79.8, minLat: 29.6, maxLat: 31.3 };
    }
    if (activeRegion === "gujarat") {
      return { minLng: 68.5, maxLng: 74.0, minLat: 18.8, maxLat: 24.6 };
    }
    if (activeRegion === "rajasthan") {
      return { minLng: 72.0, maxLng: 76.0, minLat: 23.5, maxLat: 26.5 };
    }
    // "all" - Full India Corridor
    return { minLng: 67.5, maxLng: 81.0, minLat: 18.0, maxLat: 32.2 };
  }, [activeRegion]);

  const svgWidth = 960;
  const svgHeight = 580;
  const padX = 60;
  const padY = 60;

  // Project lat/lng to SVG (x, y)
  const project = useCallback(
    (lat: number, lng: number) => {
      const usableW = svgWidth - 2 * padX;
      const usableH = svgHeight - 2 * padY;
      const x = padX + ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * usableW;
      const y = padY + ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * usableH;
      return { x, y };
    },
    [mapBounds]
  );

  // Build sequential polyline points and smooth bezier curves
  const routePoints = useMemo(() => {
    return ROUTE_SEQUENCE.map((id) => {
      const station = STATIONS.find((s) => s.id === id) || STATIONS[0];
      return project(station.lat, station.lng);
    });
  }, [project]);

  // Smooth SVG path definition
  const routePathD = useMemo(() => {
    if (routePoints.length === 0) return "";
    let d = `M ${routePoints[0].x} ${routePoints[0].y}`;
    for (let i = 0; i < routePoints.length - 1; i++) {
      const p0 = routePoints[i];
      const p1 = routePoints[i + 1];
      const midX = (p0.x + p1.x) / 2;
      const midY = (p0.y + p1.y) / 2;
      d += ` Q ${p0.x} ${p0.y} ${midX} ${midY}`;
    }
    const last = routePoints[routePoints.length - 1];
    d += ` L ${last.x} ${last.y}`;
    return d;
  }, [routePoints]);

  const pathRef = useRef<SVGPathElement>(null);

  // Train animation loop with Hogwarts Express Steam Puffs
  useEffect(() => {
    let animId: number;
    let progress = 0;
    let smokeCounter = 0;

    const animate = () => {
      const path = pathRef.current;
      if (path) {
        const totalLen = path.getTotalLength();
        if (totalLen > 0) {
          progress = (progress + 0.5) % totalLen;
          const point = path.getPointAtLength(progress);
          const nextPoint = path.getPointAtLength(Math.min(totalLen, progress + 2));
          const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

          setTrainPos({ x: point.x, y: point.y, angle });

          // Calculate closest station
          let closestIdx = 0;
          let minDist = Infinity;
          routePoints.forEach((p, idx) => {
            const dist = Math.hypot(p.x - point.x, p.y - point.y);
            if (dist < minDist) {
              minDist = dist;
              closestIdx = idx;
            }
          });

          const currStationId = ROUTE_SEQUENCE[closestIdx] || ROUTE_SEQUENCE[0];
          const nextStationId = ROUTE_SEQUENCE[(closestIdx + 1) % ROUTE_SEQUENCE.length];
          const curr = STATIONS.find((s) => s.id === currStationId) || STATIONS[0];
          const nxt = STATIONS.find((s) => s.id === nextStationId) || STATIONS[1];
          setActiveStation(curr);
          setNextStation(nxt);

          // Emit Hogwarts Steam Puffs every few frames
          smokeCounter++;
          if (smokeCounter % 4 === 0) {
            setSmokeParticles((prev) => [
              ...prev.slice(-18),
              {
                id: Date.now() + Math.random(),
                x: point.x - Math.cos((angle * Math.PI) / 180) * 12,
                y: point.y - Math.sin((angle * Math.PI) / 180) * 12 - 4,
                size: 6,
                opacity: 0.8,
                vx: -Math.cos((angle * Math.PI) / 180) * 0.4 + (Math.random() - 0.5) * 0.5,
                vy: -0.6 - Math.random() * 0.5,
              },
            ]);
          }
        }
      }

      // Update smoke particles
      setSmokeParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            size: p.size + 0.4,
            opacity: p.opacity - 0.025,
          }))
          .filter((p) => p.opacity > 0)
      );

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [routePoints]);

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Hogwarts Express Live Journey Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border border-amber-900/40 bg-linear-to-r from-neutral-950 via-neutral-900 to-amber-950/30 text-white shadow-xl">
        <div className="flex items-center gap-3">
          {/* Scarlet Red Hogwarts Locomotive Icon */}
          <div className="relative flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-red-700 via-red-900 to-amber-900 border border-amber-500/50 shadow-lg text-lg">
            🚂
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-amber-200 tracking-tight flex items-center gap-1.5">
                The Hogwarts Express — Vivek&apos;s Expedition
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 text-amber-300 px-2 py-0.2 text-[10px] font-bold border border-amber-500/40">
                20 Stations Visited
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Live steam train chugging across West & North India heritage circuits
            </p>
          </div>
        </div>

        {/* Region View Selector */}
        <div className="flex items-center gap-1.5 bg-neutral-900/80 p-1 rounded-xl border border-amber-900/40 text-xs">
          {[
            { id: "all", label: "🇮🇳 All-India" },
            { id: "himalayas", label: "🏔️ Himalayas" },
            { id: "gujarat", label: "🕉️ Gujarat" },
            { id: "rajasthan", label: "🏰 Rajasthan" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRegion(tab.id as RegionView)}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-all",
                activeRegion === tab.id
                  ? "bg-amber-600/30 text-amber-200 border border-amber-500/50 shadow-xs"
                  : "text-neutral-400 hover:text-white"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Expedition Landscape Canvas */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-amber-900/50 shadow-2xl bg-neutral-950 transition-all",
          isFullscreen
            ? "fixed inset-4 z-50 h-[calc(100vh-2rem)] rounded-2xl"
            : "aspect-16/10 sm:aspect-16/9.5 min-h-[520px] max-h-[680px]"
        )}
      >
        {/* Top-Left Live Station HUD */}
        <div className="absolute top-3 left-3 z-30 flex items-center gap-2.5 bg-black/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-amber-500/40 text-xs text-white shadow-2xl">
          <span className="flex size-6 items-center justify-center rounded-full bg-red-900/80 border border-amber-500/60 text-amber-300 font-bold text-xs">
            🚂
          </span>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span className="text-amber-400 font-bold">Platform:</span>
            <span className="font-semibold text-white">{activeStation.name}</span>
            <span className="text-amber-400">➔</span>
            <span className="text-neutral-400">{nextStation.name}</span>
            {activeStation.elevation && (
              <span className="hidden sm:inline-block text-[10px] text-sky-300 bg-sky-950/70 px-1.5 py-0.2 rounded border border-sky-600/40">
                {activeStation.elevation}
              </span>
            )}
          </div>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute bottom-3 right-3 z-30 flex items-center justify-center size-9 bg-black/85 backdrop-blur-md rounded-xl border border-amber-500/30 text-amber-200 hover:bg-neutral-900 transition-all shadow-lg"
          title="Toggle Fullscreen"
        >
          <IconMaximize className="size-4" />
        </button>

        {/* High-Resolution Satellite & Topographic Canvas */}
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full select-none bg-linear-to-b from-neutral-950 via-[#0c121e] to-neutral-950"
          style={{ shapeRendering: "geometricPrecision" }}
        >
          <defs>
            {/* Hogwarts Scarlet & Brass Gradients */}
            <linearGradient id="hogwartsRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="50%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>

            <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#713F12" />
            </linearGradient>

            <linearGradient id="railwayTrackGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#EAB308" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
            </linearGradient>

            {/* Glowing Lantern Filter */}
            <filter id="lanternGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="smokeBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Topographic Background Grid & Cartographic Meridian Lines */}
          <g className="stroke-amber-900/15" strokeWidth="0.8" strokeDasharray="4 6">
            {[100, 220, 340, 460].map((y) => (
              <line key={`lat-${y}`} x1="30" y1={y} x2={svgWidth - 30} y2={y} />
            ))}
            {[160, 320, 480, 640, 800].map((x) => (
              <line key={`lng-${x}`} x1={x} y1="30" x2={x} y2={svgHeight - 30} />
            ))}
          </g>

          {/* Subtle Region Silhouettes */}
          {/* Garhwal Himalayas Mountain Ridges */}
          <g className="opacity-40">
            <path
              d="M 640 180 L 690 90 L 730 140 L 780 60 L 830 110 L 890 50 L 930 130"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <text x="740" y="45" fill="#38BDF8" className="text-[10px] font-mono font-bold select-none opacity-80">
              ▲ Garhwal Himalayas (3,583m+)
            </text>
          </g>

          {/* Arabian Sea Coastline */}
          <g className="opacity-40">
            <path
              d="M 60 420 Q 140 400 180 470 T 260 490 T 340 510 T 360 560"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />
            <text x="90" y="520" fill="#38BDF8" className="text-[9px] font-mono select-none opacity-60">
              ≈ Arabian Sea
            </text>
          </g>

          {/* 1. Railway Track: Wooden Sleepers (Underlying dash) */}
          <path
            d={routePathD}
            fill="none"
            stroke="#522e11"
            strokeWidth="7"
            strokeOpacity="0.8"
            strokeDasharray="3 4"
          />

          {/* 2. Railway Track: Dual Steel/Brass Rails */}
          <path
            d={routePathD}
            fill="none"
            stroke="url(#railwayTrackGold)"
            strokeWidth="3.5"
            strokeOpacity="0.95"
          />

          {/* Hidden reference path for train traversal calculation */}
          <path ref={pathRef} d={routePathD} fill="none" stroke="transparent" />

          {/* 3. Hogwarts Express Steam Smoke Particles */}
          <g filter="url(#smokeBlur)">
            {smokeParticles.map((p) => (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.size}
                fill="#FFFFFF"
                opacity={p.opacity * 0.45}
              />
            ))}
          </g>

          {/* 4. Hogwarts Express Steam Locomotive Train */}
          <g transform={`translate(${trainPos.x}, ${trainPos.y}) rotate(${trainPos.angle})`}>
            {/* Front Headlight Light Beam Cone */}
            <polygon
              points="14,-4 14,4 90,26 90,-26"
              fill="url(#brassGold)"
              opacity="0.3"
              filter="url(#lanternGlow)"
            />

            {/* Train Shadow */}
            <rect x="-16" y="-8" width="34" height="16" rx="4" fill="#000000" opacity="0.6" />

            {/* Locomotive Boiler & Cab (Scarlet Red Body) */}
            <rect x="-14" y="-7" width="28" height="14" rx="3" fill="url(#hogwartsRed)" stroke="#B45309" strokeWidth="1" />

            {/* Brass Boiler Bands */}
            <line x1="-6" y1="-7" x2="-6" y2="7" stroke="#FDE047" strokeWidth="1.2" />
            <line x1="2" y1="-7" x2="2" y2="7" stroke="#FDE047" strokeWidth="1.2" />

            {/* Driver Cab Windows */}
            <rect x="-12" y="-5" width="4" height="10" rx="1" fill="#FBBF24" opacity="0.8" />

            {/* Chimney Funnel */}
            <rect x="8" y="-3" width="4" height="6" rx="1" fill="#18181B" stroke="#CA8A04" strokeWidth="0.8" />

            {/* Golden Front Lantern */}
            <circle cx="14" cy="0" r="3.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" filter="url(#lanternGlow)" />
          </g>

          {/* 5. 20 Station Markers with Zero-Overlap Fanned-Out Leader Lines */}
          {STATIONS.map((station) => {
            const pos = project(station.lat, station.lng);
            const isHome = station.id === "ahmedabad";
            const isCurrent = activeStation.id === station.id;

            const pinColor = isHome
              ? "#10B981"
              : station.region === "himalayas"
              ? "#38BDF8"
              : "#F59E0B";

            // Target label coordinate with offset
            const labelX = pos.x + station.labelOffsetX;
            const labelY = pos.y + station.labelOffsetY;

            return (
              <g key={`station-${station.id}`} className="select-none">
                {/* Leader Pointer Line from Station Dot to Label */}
                <line
                  x1={pos.x}
                  y1={pos.y}
                  x2={labelX}
                  y2={labelY}
                  stroke={isCurrent ? "#F59E0B" : pinColor}
                  strokeWidth={isCurrent ? "1.5" : "0.8"}
                  strokeOpacity={isCurrent ? "1" : "0.5"}
                  strokeDasharray="2 2"
                />

                {/* Station Ground Pin on Exact GPS Coordinate */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isCurrent ? 7 : isHome ? 5.5 : 4}
                  fill={pinColor}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  filter={isCurrent ? "url(#lanternGlow)" : undefined}
                />

                {/* Pulsing ring when active */}
                {isCurrent && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="12"
                    fill={pinColor}
                    fillOpacity="0.3"
                  />
                )}

                {/* Fanned-out Station Callout Badge (No overlapping!) */}
                <g
                  transform={`translate(${labelX}, ${labelY})`}
                  className="cursor-pointer"
                  onClick={() => setActiveStation(station)}
                >
                  {/* Badge Plate */}
                  <rect
                    x={station.labelAlign === "right" ? -100 : station.labelAlign === "center" ? -50 : 0}
                    y="-10"
                    width={station.name.length > 10 ? "105" : "90"}
                    height="20"
                    rx="5"
                    fill={isCurrent ? "#B45309" : "#0f172a"}
                    fillOpacity="0.92"
                    stroke={isCurrent ? "#FDE047" : "#334155"}
                    strokeWidth={isCurrent ? "1.5" : "0.8"}
                  />

                  {/* Icon & Station Name Text */}
                  <text
                    x={
                      station.labelAlign === "right"
                        ? -94
                        : station.labelAlign === "center"
                        ? -44
                        : 6
                    }
                    y="4"
                    fill="#FFFFFF"
                    className={cn(
                      "text-[10px] font-bold tracking-tight",
                      isCurrent && "fill-amber-200 font-extrabold"
                    )}
                  >
                    ✓ {station.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Station Snapshot */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl border border-amber-900/30 bg-neutral-900/60 text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="text-xl">{activeStation.icon}</span>
          <div>
            <span className="font-bold text-amber-300 text-sm">{activeStation.name}</span>
            <span className="text-neutral-400 text-xs ml-2">({activeStation.state})</span>
            <div className="text-[11px] text-neutral-400">{activeStation.tag}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-400">
          <span>GPS: {activeStation.lat.toFixed(4)}° N, {activeStation.lng.toFixed(4)}° E</span>
          <span className="text-emerald-400 font-bold">✓ 100% Explored</span>
        </div>
      </div>
    </div>
  );
}




