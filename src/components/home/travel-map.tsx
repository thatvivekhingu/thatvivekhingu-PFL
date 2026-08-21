"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import type * as LeafletType from "leaflet";
import { cn } from "@/lib/utils";
import { IconMaximize, IconTrain } from "@tabler/icons-react";

interface CircuitStation {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  icon: string;
  tag: string;
}

// Complete sequential travel circuit connecting all 20 destinations in a loop
const CIRCUIT_ROUTE: CircuitStation[] = [
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, icon: "🏠", tag: "Home & Origin" },
  { id: "thol", name: "Thol Lake", state: "Gujarat", lat: 23.1416, lng: 72.4042, icon: "🦩", tag: "Bird Sanctuary" },
  { id: "chotila", name: "Chotila", state: "Gujarat", lat: 22.4219, lng: 71.1969, icon: "🚩", tag: "Chamunda Mataji Hill" },
  { id: "junagadh", name: "Junagadh", state: "Gujarat", lat: 21.5222, lng: 70.4579, icon: "🧗", tag: "Girnar Mountain" },
  { id: "somnath", name: "Somnath", state: "Gujarat", lat: 20.8880, lng: 70.4012, icon: "🔱", tag: "1st Jyotirlinga" },
  { id: "dwarka", name: "Dwarka", state: "Gujarat", lat: 22.2442, lng: 68.9685, icon: "🦚", tag: "Krishna Kingdom & Char Dham" },
  { id: "kutch", name: "Rann of Kutch", state: "Gujarat", lat: 23.7337, lng: 69.8597, icon: "🐪", tag: "White Desert" },
  { id: "ambaji", name: "Ambaji", state: "Gujarat", lat: 24.3323, lng: 72.8530, icon: "🌸", tag: "Shaktipeeth" },
  { id: "udaipur", name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, icon: "🏰", tag: "City of Lakes" },
  { id: "chittorgarh", name: "Chittorgarh", state: "Rajasthan", lat: 24.8887, lng: 74.6269, icon: "🛡️", tag: "Historic Fort" },
  { id: "haridwar", name: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, icon: "🔥", tag: "Ganga Aarti" },
  { id: "uttarkashi", name: "Uttarkashi", state: "Uttarakhand", lat: 30.7268, lng: 78.4354, icon: "⛰️", tag: "Vishwanath Shrine" },
  { id: "yamunotri", name: "Yamunotri", state: "Uttarakhand", lat: 31.0140, lng: 78.4600, icon: "💧", tag: "Origin of Yamuna" },
  { id: "gangotri", name: "Gangotri", state: "Uttarakhand", lat: 30.9947, lng: 78.9398, icon: "🌊", tag: "Origin of Ganga" },
  { id: "kedarnath", name: "Kedarnath", state: "Uttarakhand", lat: 30.7346, lng: 79.0669, icon: "🏔️", tag: "Lord Shiva Jyotirlinga (3,583m)" },
  { id: "badrinath", name: "Badrinath", state: "Uttarakhand", lat: 30.7433, lng: 79.4938, icon: "🛕", tag: "Maha Vishnu Char Dham" },
  { id: "pavagadh", name: "Pavagadh", state: "Gujarat", lat: 22.4827, lng: 73.5303, icon: "🪔", tag: "Mahakali Shaktipeeth" },
  { id: "gift-city", name: "GIFT City", state: "Gujarat", lat: 23.1610, lng: 72.6840, icon: "🏙️", tag: "FinTech Metropolis" },
  { id: "surat", name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, icon: "💎", tag: "Diamond Capital" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, icon: "🌆", tag: "Maximum City" },
  // Loop back to start
  { id: "ahmedabad-return", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, icon: "🏠", tag: "Home & Origin" },
];

export default function TravelMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletType.Map | null>(null);
  const trainMarkerRef = useRef<LeafletType.Marker | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [currentStationName, setCurrentStationName] = useState("Ahmedabad");
  const [nextStationName, setNextStationName] = useState("Thol Lake");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pre-calculate smooth interpolated path coordinates between all consecutive stations
  const fullInterpolatedPath = useMemo(() => {
    const points: [number, number][] = [];
    const stepsPerSegment = 50;

    for (let s = 0; s < CIRCUIT_ROUTE.length - 1; s++) {
      const from = CIRCUIT_ROUTE[s];
      const to = CIRCUIT_ROUTE[s + 1];

      for (let step = 0; step < stepsPerSegment; step++) {
        const t = step / stepsPerSegment;
        const lat = from.lat + (to.lat - from.lat) * t;
        const lng = from.lng + (to.lng - from.lng) * t;
        points.push([lat, lng]);
      }
    }
    // Add final point
    const last = CIRCUIT_ROUTE[CIRCUIT_ROUTE.length - 1];
    points.push([last.lat, last.lng]);
    return points;
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;
      const L = (await import("leaflet")).default;

      if (!isMounted) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize satellite map centered on West-North India circuit
      const map = L.map(mapContainerRef.current, {
        center: [25.0, 74.5],
        zoom: 6,
        minZoom: 4,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: false,
      });
      mapInstanceRef.current = map;

      // Add Zoom control at top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Real Satellite Imagery Base Layer
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 18 }
      ).addTo(map);

      // Satellite Place Names and Borders Overlay
      L.tileLayer(
        "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 18, opacity: 0.85 }
      ).addTo(map);

      // 1. Draw glowing outer track
      L.polyline(fullInterpolatedPath, {
        color: "#F59E0B",
        weight: 4,
        opacity: 0.45,
      }).addTo(map);

      // 2. Draw inner high-contrast dash line (Railway track effect)
      L.polyline(fullInterpolatedPath, {
        color: "#FFFFFF",
        weight: 2,
        opacity: 0.9,
        dashArray: "6, 6",
      }).addTo(map);

      // 3. Draw Station Markers at all 20 destinations
      CIRCUIT_ROUTE.slice(0, -1).forEach((station) => {
        const isBase = station.id === "ahmedabad";
        const pinColor = isBase
          ? "#10B981"
          : station.lat > 29.0
          ? "#38BDF8"
          : "#F59E0B";

        const stationHtml = `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
            <!-- Pulsing Ring -->
            <div class="absolute -inset-1.5 rounded-full opacity-60 animate-ping" style="background-color: ${pinColor};"></div>
            
            <!-- Pin Dot with Checkmark -->
            <div class="relative flex size-5 items-center justify-center rounded-full border-2 border-white text-white font-bold text-[10px] shadow-lg" style="background-color: ${pinColor};">
              ✓
            </div>

            <!-- Station Name Tag -->
            <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.2 bg-black/85 text-white text-[9px] font-semibold tracking-tight border border-white/20 shadow">
              ${station.name}
            </div>
          </div>
        `;

        const icon = L.divIcon({
          className: "circuit-station-pin",
          html: stationHtml,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        const marker = L.marker([station.lat, station.lng], { icon }).addTo(map);
        marker.on("click", () => {
          map.flyTo([station.lat, station.lng], Math.max(map.getZoom(), 8), {
            duration: 1.2,
          });
        });
      });

      // 4. Create Moving Train Marker
      const trainHtml = `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <!-- Train Headlight Glow -->
          <div class="absolute -inset-3 rounded-full bg-emerald-400 opacity-60 animate-ping"></div>

          <!-- Train Badge -->
          <div class="relative flex size-9 items-center justify-center rounded-full bg-emerald-600 border-2 border-white shadow-2xl text-white text-base">
            🚂
          </div>

          <!-- Live Train Banner -->
          <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-emerald-500 text-white font-bold text-[10px] px-2 py-0.5 shadow-xl border border-white/40">
            Vivek Express 🚂
          </div>
        </div>
      `;

      const trainIcon = L.divIcon({
        className: "moving-train-icon",
        html: trainHtml,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const initialPos = fullInterpolatedPath[0];
      const trainMarker = L.marker(initialPos, { icon: trainIcon, zIndexOffset: 1000 }).addTo(map);
      trainMarkerRef.current = trainMarker;

      // Fit map bounds to show the entire India circuit
      const bounds = L.latLngBounds(CIRCUIT_ROUTE.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });

      // 5. Continuous Smooth Animation Loop for the Train
      let currentIndex = 0;
      const totalPoints = fullInterpolatedPath.length;
      const stepsPerStation = 50;

      function animateTrain() {
        if (!isMounted || !trainMarkerRef.current) return;

        currentIndex = (currentIndex + 1) % totalPoints;
        const currentCoord = fullInterpolatedPath[currentIndex];
        trainMarkerRef.current.setLatLng(currentCoord);

        // Calculate which segment the train is currently travelling on
        const stationIdx = Math.floor(currentIndex / stepsPerStation);
        const currStation = CIRCUIT_ROUTE[stationIdx] || CIRCUIT_ROUTE[0];
        const nextStation = CIRCUIT_ROUTE[stationIdx + 1] || CIRCUIT_ROUTE[0];

        setCurrentStationName(currStation.name);
        setNextStationName(nextStation.name);

        animFrameRef.current = requestAnimationFrame(animateTrain);
      }

      // Start animation
      animFrameRef.current = requestAnimationFrame(animateTrain);
    }

    initMap();

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
      {/* Real Satellite Viewport with Live Train HUD */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-border/70 shadow-2xl transition-all duration-300 bg-neutral-950",
          isFullscreen
            ? "fixed inset-4 z-50 h-[calc(100vh-2rem)] rounded-2xl"
            : "aspect-16/10 sm:aspect-16/9.5 min-h-[500px] max-h-[660px]"
        )}
      >
        {/* Live Train Route HUD Banner */}
        <div className="absolute top-3 left-3 z-400 flex items-center gap-2.5 bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 text-xs text-white shadow-xl">
          <span className="flex size-7 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400">
            <IconTrain className="size-4 animate-bounce" />
          </span>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span className="text-emerald-400 font-bold">Vivek Express:</span>
            <span className="font-semibold">{currentStationName}</span>
            <span className="text-muted-foreground text-amber-400">→</span>
            <span className="text-muted-foreground">{nextStationName}</span>
            <span className="hidden sm:inline-block text-[10px] text-emerald-300/80 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-700/40">
              ✓ 20 Connected Stations
            </span>
          </div>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute bottom-3 right-3 z-400 flex items-center justify-center size-9 bg-black/80 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-black transition-all shadow-lg"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
        >
          <IconMaximize className="size-4" />
        </button>

        {/* Leaflet Satellite Map */}
        <div ref={mapContainerRef} className="size-full bg-neutral-950 z-0" />
      </div>
    </div>
  );
}



