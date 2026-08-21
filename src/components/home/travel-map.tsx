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
  // Offset class to ensure stations never collide visually
  offsetClass: string;
}

// 20 Destinations connected sequentially with staggered label placements
const STATIONS: CircuitStation[] = [
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, icon: "🏠", tag: "Home Base & Origin", offsetClass: "translate-x-3 translate-y-1" },
  { id: "thol", name: "Thol Lake", state: "Gujarat", lat: 23.1416, lng: 72.4042, icon: "🦩", tag: "Bird Sanctuary Wetland", offsetClass: "-translate-x-16 -translate-y-6" },
  { id: "chotila", name: "Chotila", state: "Gujarat", lat: 22.4219, lng: 71.1969, icon: "🚩", tag: "Chamunda Mataji Hill", offsetClass: "-translate-x-14 -translate-y-4" },
  { id: "junagadh", name: "Junagadh", state: "Gujarat", lat: 21.5222, lng: 70.4579, icon: "🧗", tag: "Mount Girnar (1,031m)", offsetClass: "-translate-x-16 translate-y-2" },
  { id: "somnath", name: "Somnath", state: "Gujarat", lat: 20.8880, lng: 70.4012, icon: "🔱", tag: "1st Jyotirlinga of Shiva", offsetClass: "-translate-x-12 translate-y-5" },
  { id: "dwarka", name: "Dwarka", state: "Gujarat", lat: 22.2442, lng: 68.9685, icon: "🦚", tag: "Krishna Kingdom & Char Dham", offsetClass: "-translate-x-16 -translate-y-2" },
  { id: "kutch", name: "Rann of Kutch", state: "Gujarat", lat: 23.7337, lng: 69.8597, icon: "🐪", tag: "Great White Salt Desert", offsetClass: "-translate-x-14 -translate-y-6" },
  { id: "ambaji", name: "Ambaji", state: "Gujarat", lat: 24.3323, lng: 72.8530, icon: "🌸", tag: "Arasur Shaktipeeth (480m)", offsetClass: "-translate-x-14 -translate-y-5" },
  { id: "udaipur", name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, icon: "🏰", tag: "City of Lakes & Palaces", offsetClass: "translate-x-3 -translate-y-4" },
  { id: "chittorgarh", name: "Chittorgarh", state: "Rajasthan", lat: 24.8887, lng: 74.6269, icon: "🛡️", tag: "India's Largest Hill Fort", offsetClass: "translate-x-4 translate-y-1" },
  { id: "haridwar", name: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, icon: "🔥", tag: "Ganga Aarti Ghats", offsetClass: "-translate-x-14 translate-y-3" },
  { id: "uttarkashi", name: "Uttarkashi", state: "Uttarakhand", lat: 30.7268, lng: 78.4354, icon: "⛰️", tag: "Vishwanath Temple Gateway", offsetClass: "-translate-x-16 -translate-y-2" },
  { id: "yamunotri", name: "Yamunotri", state: "Uttarakhand", lat: 31.0140, lng: 78.4600, icon: "💧", tag: "Origin of Holy Yamuna (3,293m)", elevation: "3,293m", offsetClass: "-translate-x-16 -translate-y-6" },
  { id: "gangotri", name: "Gangotri", state: "Uttarakhand", lat: 30.9947, lng: 78.9398, icon: "🌊", tag: "Origin of Holy Ganga (3,100m)", elevation: "3,100m", offsetClass: "-translate-x-4 -translate-y-7" },
  { id: "kedarnath", name: "Kedarnath", state: "Uttarakhand", lat: 30.7346, lng: 79.0669, icon: "🏔️", tag: "Lord Shiva Jyotirlinga (3,583m)", elevation: "3,583m", offsetClass: "translate-x-4 -translate-y-3" },
  { id: "badrinath", name: "Badrinath", state: "Uttarakhand", lat: 30.7433, lng: 79.4938, icon: "🛕", tag: "Maha Vishnu Char Dham (3,300m)", elevation: "3,300m", offsetClass: "translate-x-4 translate-y-3" },
  { id: "pavagadh", name: "Pavagadh", state: "Gujarat", lat: 22.4827, lng: 73.5303, icon: "🪔", tag: "Mahakali Shaktipeeth (762m)", offsetClass: "translate-x-4 translate-y-2" },
  { id: "gift-city", name: "GIFT City", state: "Gujarat", lat: 23.1610, lng: 72.6840, icon: "🏙️", tag: "Global FinTech Metropolis", offsetClass: "translate-x-4 -translate-y-4" },
  { id: "surat", name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, icon: "💎", tag: "Diamond & Silk Capital", offsetClass: "translate-x-4 translate-y-0" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, icon: "🌆", tag: "Marine Drive Coast", offsetClass: "translate-x-4 translate-y-2" },
  // Complete the continuous circuit loop back to home base
  { id: "ahmedabad-return", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, icon: "🏠", tag: "Home Base & Origin", offsetClass: "translate-x-3 translate-y-1" },
];

export default function TravelMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletType.Map | null>(null);
  const trainMarkerRef = useRef<LeafletType.Marker | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [currentStation, setCurrentStation] = useState(STATIONS[0]);
  const [nextStation, setNextStation] = useState(STATIONS[1]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pre-calculate smooth interpolated path coordinates along real curves
  const fullInterpolatedPath = useMemo(() => {
    const points: [number, number][] = [];
    const stepsPerSegment = 60;

    for (let s = 0; s < STATIONS.length - 1; s++) {
      const from = STATIONS[s];
      const to = STATIONS[s + 1];

      // Generate curved natural railway path instead of rigid straight lines
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

      // Initialize real map of India
      const map = L.map(mapContainerRef.current, {
        center: [25.2, 74.8],
        zoom: 6,
        minZoom: 5,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
      });
      mapInstanceRef.current = map;

      // Add Zoom Control at top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Real Satellite Imagery Base Layer (ESRI World Imagery High-Res)
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 18 }
      ).addTo(map);

      // Real State Boundaries & City Reference Labels
      L.tileLayer(
        "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 18, opacity: 0.85 }
      ).addTo(map);

      // ==========================================
      // REAL RAILWAY TRACK CONSTRUCTION (3-LAYER)
      // ==========================================
      // Layer 1: Dark Track Bed / Ballast (Width 7px)
      L.polyline(fullInterpolatedPath, {
        color: "#18181b",
        weight: 7,
        opacity: 0.9,
      }).addTo(map);

      // Layer 2: Wooden Cross-Ties / Sleepers (Dash array creates real wooden ties)
      L.polyline(fullInterpolatedPath, {
        color: "#78350f",
        weight: 7,
        dashArray: "3, 5",
        opacity: 1,
      }).addTo(map);

      // Layer 3: Steel Rails on top (Glowing Golden Steel)
      L.polyline(fullInterpolatedPath, {
        color: "#F59E0B",
        weight: 2.2,
        opacity: 0.95,
      }).addTo(map);

      // ==========================================
      // 20 STATIONS (EXACT GPS PINS + CLEAR CALLOUTS)
      // ==========================================
      STATIONS.slice(0, -1).forEach((station) => {
        const isBase = station.id === "ahmedabad";
        const pinColor = isBase ? "#10B981" : station.lat > 29 ? "#38BDF8" : "#F59E0B";

        const stationHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group select-none">
            <!-- Outer Pulsing Glow -->
            <div class="absolute -inset-2 rounded-full opacity-70 animate-ping" style="background-color: ${pinColor};"></div>
            
            <!-- Real GPS Ground Pin with Checkmark -->
            <div class="relative flex size-5 items-center justify-center rounded-full border-2 border-white shadow-xl text-white font-bold text-[10px]" style="background-color: ${pinColor};">
              ✓
            </div>

            <!-- Fanned-Out Station Callout Name (Zero Overlap) -->
            <div class="absolute whitespace-nowrap px-2 py-0.5 rounded-md bg-black/90 text-white font-semibold text-[10px] tracking-tight border border-white/20 shadow-2xl transition-transform group-hover:scale-110 ${station.offsetClass}">
              ${station.name}
              ${station.elevation ? `<span class="text-sky-300 font-mono text-[9px] ml-1">▲${station.elevation}</span>` : ""}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: "custom-station-pin",
          html: stationHtml,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        const marker = L.marker([station.lat, station.lng], { icon: customIcon }).addTo(map);
        marker.on("click", () => {
          map.flyTo([station.lat, station.lng], Math.max(map.getZoom(), 9), { duration: 1.2 });
        });
      });

      // ==========================================
      // HOGWARTS EXPRESS VINTAGE STEAM LOCOMOTIVE
      // ==========================================
      const hogwartsExpressHtml = `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none">
          <!-- Billowing Steam Clouds (Smoke Puffs) -->
          <div class="absolute -top-6 -left-3 size-6 rounded-full bg-white/70 blur-xs animate-ping"></div>
          <div class="absolute -top-4 -left-1 size-5 rounded-full bg-white/50 blur-xs animate-pulse"></div>

          <!-- Forward Lantern Beam Glow -->
          <div class="absolute -right-7 top-1/2 -translate-y-1/2 w-10 h-7 bg-amber-400/40 blur-sm rounded-r-full"></div>

          <!-- Hogwarts Express Scarlet Red Locomotive Body -->
          <div class="relative flex items-center justify-center h-7 px-2.5 rounded-lg bg-linear-to-r from-red-900 via-red-700 to-red-950 border-2 border-amber-400 shadow-2xl text-white">
            <span class="text-sm mr-1">🚂</span>
            <span class="text-[10px] font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">
              Hogwarts Express
            </span>
          </div>
        </div>
      `;

      const trainIcon = L.divIcon({
        className: "hogwarts-express-train",
        html: hogwartsExpressHtml,
        iconSize: [120, 30],
        iconAnchor: [60, 15],
      });

      const initialCoord = fullInterpolatedPath[0];
      const trainMarker = L.marker(initialCoord, { icon: trainIcon, zIndexOffset: 2000 }).addTo(map);
      trainMarkerRef.current = trainMarker;

      // Fit map bounds to show all 20 stations across India
      const bounds = L.latLngBounds(STATIONS.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [45, 45] });

      // ==========================================
      // REAL-TIME TRAIN MOVEMENT ANIMATION LOOP
      // ==========================================
      let currentIndex = 0;
      const totalPoints = fullInterpolatedPath.length;
      const stepsPerStation = 60;

      function animateHogwartsExpress() {
        if (!isMounted || !trainMarkerRef.current) return;

        currentIndex = (currentIndex + 1) % totalPoints;
        const currentCoord = fullInterpolatedPath[currentIndex];
        trainMarkerRef.current.setLatLng(currentCoord);

        const stationIdx = Math.floor(currentIndex / stepsPerStation);
        const curr = STATIONS[stationIdx] || STATIONS[0];
        const next = STATIONS[stationIdx + 1] || STATIONS[0];

        setCurrentStation(curr);
        setNextStation(next);

        animFrameRef.current = requestAnimationFrame(animateHogwartsExpress);
      }

      animFrameRef.current = requestAnimationFrame(animateHogwartsExpress);
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

  const resetIndiaView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView([25.2, 74.8], 6, { animate: true });
  };

  const focusHimalayas = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([30.7, 78.9], 8, { duration: 1.5 });
  };

  const focusGujarat = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([22.5, 71.5], 7.5, { duration: 1.5 });
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Hogwarts Express Live Expedition Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border border-amber-500/30 bg-neutral-950/90 text-white backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-red-700 via-red-900 to-amber-950 border border-amber-400/60 shadow-lg text-xl">
            🚂
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-amber-200 tracking-tight">
                The Hogwarts Express — Real India Railway Expedition
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold border border-emerald-500/30">
                ✓ 20 Connected Stations
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Authentic satellite terrain & real wooden sleeper railway tracks running live across India
            </p>
          </div>
        </div>

        {/* Quick Zoom Focus Lenses */}
        <div className="flex items-center gap-1.5 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800 text-xs">
          <button
            onClick={resetIndiaView}
            className="px-2.5 py-1 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all font-medium"
          >
            🇮🇳 All-India
          </button>
          <button
            onClick={focusHimalayas}
            className="px-2.5 py-1 rounded-lg text-sky-300 hover:text-white hover:bg-sky-950/50 transition-all font-medium"
          >
            🏔️ Himalayas
          </button>
          <button
            onClick={focusGujarat}
            className="px-2.5 py-1 rounded-lg text-amber-300 hover:text-white hover:bg-amber-950/50 transition-all font-medium"
          >
            🕉️ Gujarat
          </button>
        </div>
      </div>

      {/* Real Satellite Viewport with Authentic Railway Track & Hogwarts Express */}
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
          <span className="flex size-6 items-center justify-center rounded-full bg-red-900 border border-amber-400 text-amber-300 text-xs">
            🚂
          </span>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span className="text-amber-400 font-bold">Platform:</span>
            <span className="font-semibold">{currentStation.name}</span>
            <span className="text-amber-400">➔</span>
            <span className="text-neutral-300">{nextStation.name}</span>
            {currentStation.elevation && (
              <span className="hidden sm:inline-block text-[10px] text-sky-300 bg-sky-950 px-1.5 py-0.2 rounded border border-sky-600/40 font-mono">
                ▲ {currentStation.elevation}
              </span>
            )}
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
              <span className="text-emerald-500 font-semibold text-[11px]">✓ Explored</span>
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
