"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import type * as LeafletType from "leaflet";
import { cn } from "@/lib/utils";
import { IconMaximize } from "@tabler/icons-react";

interface CircuitStation {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  icon: string;
  tag: string;
  elevation?: string;
}

// 20 Destinations connected in continuous circuit
const STATIONS: CircuitStation[] = [
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, icon: "🏠", tag: "Home Base & Origin" },
  { id: "thol", name: "Thol Lake", state: "Gujarat", lat: 23.1416, lng: 72.4042, icon: "🦩", tag: "Bird Sanctuary Wetland" },
  { id: "chotila", name: "Chotila", state: "Gujarat", lat: 22.4219, lng: 71.1969, icon: "🚩", tag: "Chamunda Mataji Hill" },
  { id: "junagadh", name: "Junagadh", state: "Gujarat", lat: 21.5222, lng: 70.4579, icon: "🧗", tag: "Mount Girnar (1,031m)" },
  { id: "somnath", name: "Somnath", state: "Gujarat", lat: 20.8880, lng: 70.4012, icon: "🔱", tag: "1st Jyotirlinga of Shiva" },
  { id: "dwarka", name: "Dwarka", state: "Gujarat", lat: 22.2442, lng: 68.9685, icon: "🦚", tag: "Krishna Kingdom & Char Dham" },
  { id: "kutch", name: "Rann of Kutch", state: "Gujarat", lat: 23.7337, lng: 69.8597, icon: "🐪", tag: "Great White Salt Desert" },
  { id: "ambaji", name: "Ambaji", state: "Gujarat", lat: 24.3323, lng: 72.8530, icon: "🌸", tag: "Arasur Shaktipeeth (480m)" },
  { id: "udaipur", name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, icon: "🏰", tag: "City of Lakes & Palaces" },
  { id: "chittorgarh", name: "Chittorgarh", state: "Rajasthan", lat: 24.8887, lng: 74.6269, icon: "🛡️", tag: "India's Largest Hill Fort" },
  { id: "haridwar", name: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, icon: "🔥", tag: "Ganga Aarti Ghats" },
  { id: "uttarkashi", name: "Uttarkashi", state: "Uttarakhand", lat: 30.7268, lng: 78.4354, icon: "⛰️", tag: "Vishwanath Temple Gateway" },
  { id: "yamunotri", name: "Yamunotri", state: "Uttarakhand", lat: 31.0140, lng: 78.4600, icon: "💧", tag: "Origin of Holy Yamuna (3,293m)", elevation: "3,293m" },
  { id: "gangotri", name: "Gangotri", state: "Uttarakhand", lat: 30.9947, lng: 78.9398, icon: "🌊", tag: "Origin of Holy Ganga (3,100m)", elevation: "3,100m" },
  { id: "kedarnath", name: "Kedarnath", state: "Uttarakhand", lat: 30.7346, lng: 79.0669, icon: "🏔️", tag: "Lord Shiva Jyotirlinga (3,583m)", elevation: "3,583m" },
  { id: "badrinath", name: "Badrinath", state: "Uttarakhand", lat: 30.7433, lng: 79.4938, icon: "🛕", tag: "Maha Vishnu Char Dham (3,300m)", elevation: "3,300m" },
  { id: "pavagadh", name: "Pavagadh", state: "Gujarat", lat: 22.4827, lng: 73.5303, icon: "🪔", tag: "Mahakali Shaktipeeth (762m)" },
  { id: "gift-city", name: "GIFT City", state: "Gujarat", lat: 23.1610, lng: 72.6840, icon: "🏙️", tag: "Global FinTech Metropolis" },
  { id: "surat", name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, icon: "💎", tag: "Diamond & Silk Capital" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, icon: "🌆", tag: "Marine Drive Coast" },
  // Complete the continuous circuit loop back to home base
  { id: "ahmedabad-return", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, icon: "🏠", tag: "Home Base & Origin" },
];

export default function TravelMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletType.Map | null>(null);
  const trainMarkerRef = useRef<LeafletType.Marker | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [currentStation, setCurrentStation] = useState(STATIONS[0]);
  const [nextStation, setNextStation] = useState(STATIONS[1]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pre-calculate smooth interpolated path coordinates along real natural curves
  const fullInterpolatedPath = useMemo(() => {
    const points: [number, number][] = [];
    const stepsPerSegment = 70;

    for (let s = 0; s < STATIONS.length - 1; s++) {
      const from = STATIONS[s];
      const to = STATIONS[s + 1];

      // Smooth realistic railway curve
      const midLat = (from.lat + to.lat) / 2;
      const midLng = (from.lng + to.lng) / 2;
      const dLat = to.lat - from.lat;
      const dLng = to.lng - from.lng;
      const curvature = Math.sqrt(dLat * dLat + dLng * dLng) * 0.08;

      const curveLat = midLat - (dLng / (Math.abs(dLng) + 1)) * curvature * 0.35;
      const curveLng = midLng + (dLat / (Math.abs(dLat) + 1)) * curvature * 0.35;

      for (let step = 0; step < stepsPerSegment; step++) {
        const t = step / stepsPerSegment;
        const lat = (1 - t) * (1 - t) * from.lat + 2 * (1 - t) * t * curveLat + t * t * to.lat;
        const lng = (1 - t) * (1 - t) * from.lng + 2 * (1 - t) * t * curveLng + t * t * to.lng;
        points.push([lat, lng]);
      }
    }
    const last = STATIONS[STATIONS.length - 1];
    points.push([last.lat, last.lng]);
    return points;
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initLeafletMap() {
      if (!mapContainerRef.current) return;
      const L = (await import("leaflet")).default;

      if (!isMounted) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize static real map of India (non-hijacking scroll)
      const map = L.map(mapContainerRef.current, {
        center: [25.0, 74.5],
        zoom: 5.6,
        minZoom: 5,
        maxZoom: 14,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        dragging: true,
      });
      mapInstanceRef.current = map;

      // Real Satellite Imagery Base Layer
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 18 }
      ).addTo(map);

      // Real State Boundaries & Natural Geographic Labels Overlay
      L.tileLayer(
        "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 18, opacity: 0.75 }
      ).addTo(map);

      // ==========================================
      // REAL RAILWAY TRACK CONSTRUCTION (3-LAYER)
      // ==========================================
      // Layer 1: Dark Track Bed / Ballast
      L.polyline(fullInterpolatedPath, {
        color: "#18181b",
        weight: 6,
        opacity: 0.9,
      }).addTo(map);

      // Layer 2: Real Wooden Sleepers / Cross-Ties (Dashed)
      L.polyline(fullInterpolatedPath, {
        color: "#78350f",
        weight: 6,
        dashArray: "3, 5",
        opacity: 1,
      }).addTo(map);

      // Layer 3: Dual Steel Rail Lines on top
      L.polyline(fullInterpolatedPath, {
        color: "#F59E0B",
        weight: 2,
        opacity: 0.95,
      }).addTo(map);

      // ==========================================
      // 20 CLEAN STATIONS (NO TEXT TAGS ON MAP!)
      // ==========================================
      STATIONS.slice(0, -1).forEach((station) => {
        const isBase = station.id === "ahmedabad";
        const pinColor = isBase ? "#10B981" : station.lat > 29 ? "#38BDF8" : "#F59E0B";

        // Pure clean glowing dot without any ugly black text tags!
        const stationHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group select-none">
            <!-- Pulsing Halo -->
            <div class="absolute -inset-2 rounded-full opacity-60 animate-ping" style="background-color: ${pinColor};"></div>
            
            <!-- Clean Real GPS Pin Dot -->
            <div class="relative flex size-4 items-center justify-center rounded-full border-2 border-white shadow-xl text-white font-bold text-[8px]" style="background-color: ${pinColor};">
              ✓
            </div>

            <!-- Hover-only Tooltip (Clean and non-intrusive) -->
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-black/90 text-white text-[10px] font-bold border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ${station.name} ${station.elevation ? `(${station.elevation})` : ""}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: "clean-station-dot",
          html: stationHtml,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const marker = L.marker([station.lat, station.lng], { icon: customIcon }).addTo(map);
        marker.on("click", () => {
          setCurrentStation(station);
        });
      });

      // ==========================================
      // REAL STEAM TRAIN LOCOMOTIVE SPRITE
      // ==========================================
      const realSteamTrainHtml = `
        <div id="real-steam-train-container" class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          <!-- Dynamic Steam Smoke Puffs -->
          <div class="absolute -left-6 top-0 flex items-center gap-1">
            <div class="size-4 rounded-full bg-white/70 blur-[1px] animate-ping"></div>
            <div class="size-3 rounded-full bg-white/50 blur-[1px] animate-pulse"></div>
          </div>

          <!-- Front Headlight Beam -->
          <div class="absolute left-10 top-1/2 -translate-y-1/2 w-14 h-8 bg-amber-300/35 blur-sm rounded-r-full pointer-events-none"></div>

          <!-- Realistic Steam Locomotive Engine (SVG Sprite) -->
          <svg width="60" height="24" viewBox="0 0 60 24" class="drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            <!-- Train Chassis / Wheels -->
            <rect x="2" y="16" width="56" height="4" rx="2" fill="#18181B" />
            <circle cx="10" cy="18" r="3.5" fill="#71717A" stroke="#27272A" strokeWidth="1" />
            <circle cx="20" cy="18" r="3.5" fill="#71717A" stroke="#27272A" strokeWidth="1" />
            <circle cx="30" cy="18" r="3.5" fill="#71717A" stroke="#27272A" strokeWidth="1" />
            <circle cx="44" cy="17" r="4.5" fill="#A1A1AA" stroke="#18181B" strokeWidth="1.5" />

            <!-- Scarlet Red Boiler Body (Harry Potter Style) -->
            <rect x="12" y="7" width="28" height="10" rx="3" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1" />
            
            <!-- Brass Boiler Rings -->
            <line x1="20" y1="7" x2="20" y2="17" stroke="#FDE047" strokeWidth="1" />
            <line x1="28" y1="7" x2="28" y2="17" stroke="#FDE047" strokeWidth="1" />
            <line x1="36" y1="7" x2="36" y2="17" stroke="#FDE047" strokeWidth="1" />

            <!-- Driver Cab (Black/Red) -->
            <rect x="40" y="3" width="16" height="14" rx="2" fill="#7F1D1D" stroke="#991B1B" strokeWidth="1" />
            <rect x="44" y="5" width="8" height="5" rx="1" fill="#FEF08A" opacity="0.85" />

            <!-- Chimney Funnel (Steam Pipe) -->
            <rect x="15" y="2" width="4" height="6" rx="1" fill="#18181B" stroke="#CA8A04" strokeWidth="0.8" />
            <polygon points="13,2 21,2 19,4 15,4" fill="#CA8A04" />

            <!-- Front Cowcatcher & Lantern -->
            <polygon points="2,12 8,12 8,18 2,19" fill="#27272A" />
            <circle cx="8" cy="12" r="2.5" fill="#FEF08A" stroke="#B45309" strokeWidth="0.8" />
          </svg>
        </div>
      `;

      const trainIcon = L.divIcon({
        className: "real-steam-locomotive",
        html: realSteamTrainHtml,
        iconSize: [60, 24],
        iconAnchor: [30, 12],
      });

      const initialCoord = fullInterpolatedPath[0];
      const trainMarker = L.marker(initialCoord, { icon: trainIcon, zIndexOffset: 2000 }).addTo(map);
      trainMarkerRef.current = trainMarker;

      // Fit map bounds to show India loop perfectly
      const bounds = L.latLngBounds(STATIONS.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });

      // ==========================================
      // REAL-TIME TRAIN MOVEMENT & ROTATION
      // ==========================================
      let currentIndex = 0;
      const totalPoints = fullInterpolatedPath.length;
      const stepsPerStation = 70;

      function animateRealTrain() {
        if (!isMounted || !trainMarkerRef.current) return;

        currentIndex = (currentIndex + 1) % totalPoints;
        const currentCoord = fullInterpolatedPath[currentIndex];
        const nextCoord = fullInterpolatedPath[(currentIndex + 1) % totalPoints];

        // Calculate heading angle
        const dLng = nextCoord[1] - currentCoord[1];
        const dLat = nextCoord[0] - currentCoord[0];
        const angle = Math.atan2(dLng, dLat) * (180 / Math.PI) - 90;

        trainMarkerRef.current.setLatLng(currentCoord);

        // Update rotation on train element if rendered
        const trainElem = document.getElementById("real-steam-train-container");
        if (trainElem) {
          trainElem.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        }

        const stationIdx = Math.floor(currentIndex / stepsPerStation);
        const curr = STATIONS[stationIdx] || STATIONS[0];
        const next = STATIONS[stationIdx + 1] || STATIONS[0];

        setCurrentStation(curr);
        setNextStation(next);

        animFrameRef.current = requestAnimationFrame(animateRealTrain);
      }

      animFrameRef.current = requestAnimationFrame(animateRealTrain);
    }

    initLeafletMap();

    return () => {
      isMounted = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [fullInterpolatedPath]);

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Real Satellite Map Viewport (Clean & Static) */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-border/80 shadow-2xl bg-neutral-950 transition-all",
          isFullscreen
            ? "fixed inset-4 z-50 h-[calc(100vh-2rem)] rounded-2xl"
            : "aspect-16/10 sm:aspect-16/9.5 min-h-[500px] max-h-[660px]"
        )}
      >
        {/* Live Station Arrival HUD */}
        <div className="absolute top-3 left-3 z-400 flex items-center gap-2.5 bg-black/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-amber-500/40 text-xs text-white shadow-2xl">
          <span className="flex size-6 items-center justify-center rounded-full bg-red-900 border border-amber-400 text-amber-300 text-xs font-bold">
            🚂
          </span>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span className="text-amber-400 font-bold">Hogwarts Express:</span>
            <span className="font-semibold">{currentStation.name}</span>
            <span className="text-amber-400">➔</span>
            <span className="text-neutral-300">{nextStation.name}</span>
            {currentStation.elevation && (
              <span className="hidden sm:inline-block text-[10px] text-sky-300 bg-sky-950 px-1.5 py-0.2 rounded border border-sky-600/40 font-mono">
                ▲ {currentStation.elevation}
              </span>
            )}
            <span className="hidden md:inline-block text-[10px] text-emerald-300 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-600/40 ml-1">
              ✓ 20 Visited
            </span>
          </div>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute bottom-3 right-3 z-400 flex items-center justify-center size-9 bg-black/85 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-neutral-900 transition-all shadow-lg"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
        >
          <IconMaximize className="size-4" />
        </button>

        {/* Leaflet Real Satellite Map Container */}
        <div ref={mapContainerRef} className="size-full bg-neutral-950 z-0" />
      </div>

      {/* Live Selected Station Information Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md text-xs text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{currentStation.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground text-sm">{currentStation.name}</span>
              <span className="text-xs text-muted-foreground">• {currentStation.state}</span>
              <span className="text-emerald-500 font-semibold text-[11px]">✓ Explored & Visited</span>
            </div>
            <p className="text-xs text-amber-500 dark:text-amber-400">{currentStation.tag}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span>Real GPS: <strong>{currentStation.lat.toFixed(4)}° N, {currentStation.lng.toFixed(4)}° E</strong></span>
        </div>
      </div>
    </div>
  );
}

