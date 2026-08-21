"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BASE_LOCATION,
  TRAVEL_LOCATIONS,
  TRAVEL_STATS,
  type TravelLocation,
} from "@/data/travel-data";
import { cn } from "@/lib/utils";
import {
  IconCheck,
  IconMapPin,
  IconMountain,
  IconFlame,
  IconSparkles,
  IconBuildingSkyscraper,
  IconArrowUpRight,
  IconRoute,
  IconCircleCheckFilled,
  IconSearch,
  IconCompass,
} from "@tabler/icons-react";

type CategoryFilter = "all" | "himalayas" | "sacred" | "heritage" | "urban";

// Geographic bounds for map projection
const MAP_BOUNDS = {
  minLng: 67.5,
  maxLng: 81.2,
  minLat: 18.0,
  maxLat: 32.2,
  svgWidth: 940,
  svgHeight: 560,
  padX: 45,
  padY: 45,
};

// Coordinate projection from (lat, lng) to SVG (x, y)
function projectCoords(lat: number, lng: number): { x: number; y: number } {
  const { minLng, maxLng, minLat, maxLat, svgWidth, svgHeight, padX, padY } = MAP_BOUNDS;
  const usableW = svgWidth - 2 * padX;
  const usableH = svgHeight - 2 * padY;

  const x = padX + ((lng - minLng) / (maxLng - minLng)) * usableW;
  const y = padY + ((maxLat - lat) / (maxLat - minLat)) * usableH;
  return { x, y };
}

export default function TravelMap() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<TravelLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allPlaces = useMemo(() => [BASE_LOCATION, ...TRAVEL_LOCATIONS], []);

  const filteredLocations = useMemo(() => {
    return allPlaces.filter((loc) => {
      const matchesCategory =
        selectedCategory === "all" ? true : loc.category === selectedCategory;
      const matchesSearch =
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPlaces, selectedCategory, searchQuery]);

  const basePos = projectCoords(BASE_LOCATION.lat, BASE_LOCATION.lng);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Header & Verified Travel Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <IconCircleCheckFilled className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base text-foreground tracking-tight">
                Travel & Expedition Footprints
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <IconCheck className="size-3 stroke-[3]" /> 100% Visited
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {TRAVEL_STATS.totalDestinations} destinations explored across {TRAVEL_STATS.statesCovered}
            </p>
          </div>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/80 border border-border/60 text-muted-foreground">
            <IconMountain className="size-4 text-sky-400" />
            <span>Highest: <strong className="text-foreground">{TRAVEL_STATS.highestElevation}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/80 border border-border/60 text-muted-foreground">
            <IconFlame className="size-4 text-orange-500" />
            <span>Char Dhams: <strong className="text-foreground">{TRAVEL_STATS.charDhams}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/80 border border-border/60 text-muted-foreground">
            <IconSparkles className="size-4 text-amber-400" />
            <span>Jyotirlingas: <strong className="text-foreground">{TRAVEL_STATS.jyotirlingas}</strong></span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-muted/40 rounded-xl border border-border/50">
          {[
            { id: "all", label: "All Visited (20)", icon: IconCompass },
            { id: "himalayas", label: "Himalayas 🏔️", icon: IconMountain },
            { id: "sacred", label: "Shakti & Shrines 🕉️", icon: IconFlame },
            { id: "heritage", label: "Royal Forts 🏰", icon: IconSparkles },
            { id: "urban", label: "Urban & Coast 🏙️", icon: IconBuildingSkyscraper },
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

        {/* Search input */}
        <div className="relative w-full sm:w-60">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search place, state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-card/60 border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Landscape Interactive Vector Map Canvas */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-linear-to-b from-card/80 via-card/40 to-background shadow-lg">
        {/* Map Header Overlay */}
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 bg-background/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/60 text-xs text-muted-foreground shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Origin: <strong className="text-foreground font-semibold">Ahmedabad</strong> (Home Base)</span>
        </div>

        <div className="absolute top-3 right-4 z-10 hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground/90 bg-background/70 backdrop-blur-md px-3 py-1 rounded-md border border-border/40">
          <IconRoute className="size-3.5 text-amber-500" />
          <span>Curved routes radiate from Ahmedabad to all 20 visited spots</span>
        </div>

        {/* Landscape SVG */}
        <div className="w-full aspect-16/10 sm:aspect-16/9.5 min-h-[440px] max-h-[620px]">
          <svg
            viewBox="0 0 940 560"
            className="w-full h-full select-none"
            style={{ shapeRendering: "geometricPrecision" }}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
              </linearGradient>

              <linearGradient id="himalayaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="activeRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="1" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
              </linearGradient>

              {/* Glowing Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <filter id="glow-strong" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Grid Lines (Lat/Lng) */}
            <g className="stroke-border/25 stroke-dasharray-[4_4]" strokeWidth="0.8">
              {[120, 240, 360, 480].map((y) => (
                <line key={`lat-${y}`} x1="30" y1={y} x2="910" y2={y} />
              ))}
              {[200, 380, 560, 740].map((x) => (
                <line key={`lng-${x}`} x1={x} y1="30" x2={x} y2="530" />
              ))}
            </g>

            {/* Coordinate Grid Labels */}
            <g className="fill-muted-foreground/30 text-[9px] font-mono select-none">
              <text x="40" y="125">30° N (Himalayas)</text>
              <text x="40" y="245">26° N (Rajasthan)</text>
              <text x="40" y="365">23° N (Tropic of Cancer / Gujarat)</text>
              <text x="40" y="485">20° N (Maharashtra & Coast)</text>
              <text x="180" y="545">70° E</text>
              <text x="360" y="545">73° E (West Central)</text>
              <text x="540" y="545">76° E</text>
              <text x="720" y="545">79° E (Devbhoomi)</text>
            </g>

            {/* Stylized Regional Landscapes & Terrain Zones */}
            {/* 1. Himalayan Mountain Range Backdrop (Top-Right) */}
            <g className="opacity-70 dark:opacity-85">
              {/* Mountain Ridge Paths */}
              <path
                d="M 640 160 L 690 90 L 730 130 L 770 65 L 810 110 L 850 60 L 910 140 L 910 180 L 640 180 Z"
                className="fill-sky-500/5 stroke-sky-400/20"
                strokeWidth="1"
              />
              <path
                d="M 670 140 L 715 80 L 750 115 L 790 55 L 830 95 L 880 70 L 910 110"
                fill="none"
                className="stroke-sky-400/40"
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />
              {/* Snow Peak Icons */}
              <g className="fill-sky-400/70 text-[10px] font-semibold">
                <text x="740" y="45">▲ Garhwal Himalayas (3,583m+)</text>
              </g>
            </g>

            {/* 2. Rann of Kutch & Desert Plains (West) */}
            <g className="opacity-60 dark:opacity-75">
              <path
                d="M 60 330 Q 140 310 220 340 Q 240 380 180 400 Q 110 390 60 330 Z"
                className="fill-amber-500/5 stroke-amber-500/20"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text x="80" y="335" className="fill-amber-500/60 text-[9px] font-mono">
                ✦ Great Rann & Desert Circuit
              </text>
            </g>

            {/* 3. Arabian Sea Coastline (South-West) */}
            <g className="opacity-70">
              <path
                d="M 45 420 Q 90 410 120 440 T 180 490 T 260 500 T 330 520 T 360 550"
                fill="none"
                className="stroke-blue-400/30"
                strokeWidth="2"
              />
              <path
                d="M 40 430 Q 90 420 120 450 T 180 500 T 260 510 T 330 530"
                fill="none"
                className="stroke-blue-400/15"
                strokeWidth="1.2"
                strokeDasharray="2 4"
              />
              <text x="90" y="520" className="fill-blue-400/40 text-[9px] font-mono">
                ≈ Arabian Sea Coast
              </text>
            </g>

            {/* Connecting Travel Route Lines from Ahmedabad */}
            <g>
              {TRAVEL_LOCATIONS.map((loc) => {
                const destPos = projectCoords(loc.lat, loc.lng);
                const isSelected = selectedLocation?.id === loc.id;
                const isHovered = hoveredLocation?.id === loc.id;
                const isMatchingCategory =
                  selectedCategory === "all" || selectedCategory === loc.category;

                // Bezier curve control point (curved trajectory)
                const midX = (basePos.x + destPos.x) / 2;
                const midY = (basePos.y + destPos.y) / 2;
                const dx = destPos.x - basePos.x;
                const dy = destPos.y - basePos.y;
                const curveOffset = Math.sqrt(dx * dx + dy * dy) * 0.12;
                const ctrlX = midX - (dy / (Math.abs(dy) + 1)) * curveOffset;
                const ctrlY = midY + (dx / (Math.abs(dx) + 1)) * curveOffset;

                const pathD = `M ${basePos.x} ${basePos.y} Q ${ctrlX} ${ctrlY} ${destPos.x} ${destPos.y}`;

                return (
                  <g key={`route-${loc.id}`}>
                    {/* Shadow / Glow Line when Active */}
                    {(isSelected || isHovered) && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke="url(#activeRouteGradient)"
                        strokeWidth="3.5"
                        filter="url(#glow-strong)"
                        className="transition-all duration-300"
                      />
                    )}

                    {/* Standard Route Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={
                        isSelected || isHovered
                          ? "#F59E0B"
                          : loc.category === "himalayas"
                          ? "#38BDF8"
                          : isMatchingCategory
                          ? "url(#routeGradient)"
                          : "currentColor"
                      }
                      strokeWidth={isSelected || isHovered ? 2.2 : isMatchingCategory ? 1.2 : 0.6}
                      strokeOpacity={isSelected || isHovered ? 1 : isMatchingCategory ? 0.45 : 0.12}
                      strokeDasharray={isSelected || isHovered ? "none" : "4 3"}
                      className="transition-all duration-300"
                    />

                    {/* Animated moving pulse dot on route */}
                    {isMatchingCategory && (
                      <circle r={isSelected || isHovered ? 3.5 : 2} fill="#F59E0B">
                        <animateMotion
                          path={pathD}
                          dur={loc.category === "himalayas" ? "4.5s" : "3s"}
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Destination Pins & Verified Checkmarks */}
            {allPlaces.map((loc) => {
              const pos = projectCoords(loc.lat, loc.lng);
              const isBase = loc.id === "ahmedabad";
              const isSelected = selectedLocation?.id === loc.id;
              const isHovered = hoveredLocation?.id === loc.id;
              const isMatchingCategory =
                selectedCategory === "all" || loc.category === selectedCategory;

              // Color scheme by category
              const markerColor = isBase
                ? "#22C55E" // Emerald
                : loc.category === "himalayas"
                ? "#38BDF8" // Sky Blue
                : loc.category === "sacred"
                ? "#F59E0B" // Amber
                : loc.category === "heritage"
                ? "#EC4899" // Pink
                : "#A855F7"; // Purple

              return (
                <g
                  key={`pin-${loc.id}`}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className={cn(
                    "cursor-pointer transition-transform duration-300",
                    !isMatchingCategory && "opacity-30",
                    (isSelected || isHovered) && "scale-125 z-30"
                  )}
                  onClick={() => setSelectedLocation(loc)}
                  onMouseEnter={() => setHoveredLocation(loc)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  {/* Outer Pulsing Wave */}
                  <circle
                    r={isSelected || isHovered ? 18 : isBase ? 14 : 10}
                    fill={markerColor}
                    fillOpacity={isSelected || isHovered ? 0.35 : 0.18}
                  />

                  {/* Main Pin Body */}
                  <circle
                    r={isSelected || isHovered ? 9 : isBase ? 8 : 6.5}
                    fill={markerColor}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    filter="url(#glow)"
                  />

                  {/* Verified Checkmark (Tick Mark ✓) inside pin */}
                  <path
                    d="M -3 0 L -1 2.5 L 3.5 -2"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* City Label Badge */}
                  <g
                    transform={`translate(0, ${
                      loc.id === "mumbai" || loc.id === "somnath" ? 18 : -14
                    })`}
                    className="pointer-events-none select-none"
                  >
                    {/* Badge Background */}
                    <rect
                      x="-38"
                      y="-10"
                      width="76"
                      height="18"
                      rx="5"
                      className={cn(
                        "transition-colors",
                        isSelected || isHovered
                          ? "fill-foreground text-background"
                          : "fill-background/90 dark:fill-card/90 stroke-border/70"
                      )}
                      strokeWidth="0.8"
                    />

                    {/* Tick Mark Icon & City Text */}
                    <text
                      x="-30"
                      y="2.5"
                      className={cn(
                        "text-[9px] font-bold",
                        isSelected || isHovered
                          ? "fill-background"
                          : "fill-emerald-600 dark:fill-emerald-400"
                      )}
                    >
                      ✓
                    </text>
                    <text
                      x="-20"
                      y="2.5"
                      className={cn(
                        "text-[9px] font-medium tracking-tight",
                        isSelected || isHovered
                          ? "fill-background font-semibold"
                          : "fill-foreground"
                      )}
                    >
                      {loc.name.length > 9 ? loc.name.slice(0, 8) + ".." : loc.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Location Spotlight Card & Details Drawer */}
      <AnimatePresence mode="wait">
        {selectedLocation ? (
          <motion.div
            key={selectedLocation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10 p-5 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex size-12 items-center justify-center rounded-xl bg-background/80 border border-border/60 text-2xl shadow-xs">
                  {selectedLocation.icon || "📍"}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-lg font-bold text-foreground">
                      {selectedLocation.name}
                    </h4>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-xs font-semibold border border-emerald-500/30">
                      <IconCheck className="size-3 stroke-[3]" /> VISITED & EXPLORED
                    </span>
                    <span className="text-xs text-muted-foreground">
                      • {selectedLocation.state} ({selectedLocation.region})
                    </span>
                  </div>
                  <p className="text-xs font-medium text-amber-500 dark:text-amber-400 mt-0.5">
                    {selectedLocation.tag}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLocation(null)}
                className="self-start text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg bg-background/70 border border-border/60 transition-colors"
              >
                Close Card ✕
              </button>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {selectedLocation.highlight}
            </p>

            <div className="mt-4 pt-3.5 border-t border-border/40 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-muted-foreground">
              {selectedLocation.elevation && (
                <div className="flex items-center gap-1.5">
                  <IconMountain className="size-4 text-sky-400" />
                  <span>Elevation: <strong className="text-foreground">{selectedLocation.elevation}</strong></span>
                </div>
              )}
              {selectedLocation.distanceFromBase && (
                <div className="flex items-center gap-1.5">
                  <IconMapPin className="size-4 text-emerald-400" />
                  <span>Distance from Ahmedabad: <strong className="text-foreground">{selectedLocation.distanceFromBase}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <IconRoute className="size-4 text-amber-400" />
                <span>GPS: <strong className="text-foreground font-mono">{selectedLocation.lat.toFixed(2)}° N, {selectedLocation.lng.toFixed(2)}° E</strong></span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Visited Places Checklist Grid */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCheck className="size-4 text-emerald-500 stroke-[3]" />
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Verified Visited Checklist ({filteredLocations.length} Places)
            </h4>
          </div>
          <span className="text-[11px] text-muted-foreground">
            Click any place to highlight on landscape map
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {filteredLocations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                onMouseEnter={() => setHoveredLocation(loc)}
                onMouseLeave={() => setHoveredLocation(null)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border text-left transition-all group",
                  isSelected
                    ? "border-emerald-500/70 bg-emerald-500/10 shadow-sm"
                    : "border-border/40 bg-card/30 hover:border-border hover:bg-card/70"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <IconCheck className="size-3.5 stroke-[3]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-xs text-foreground truncate flex items-center gap-1">
                      <span>{loc.name}</span>
                      <span className="text-[11px]">{loc.icon}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {loc.state} • {loc.tag}
                    </div>
                  </div>
                </div>
                <IconArrowUpRight className="size-3.5 text-muted-foreground/40 group-hover:text-foreground shrink-0 transition-colors" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

