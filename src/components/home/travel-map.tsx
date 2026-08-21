"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import type * as LeafletType from "leaflet";
import {
  BASE_LOCATION,
  TRAVEL_LOCATIONS,
  TRAVEL_STATS,
  type TravelLocation,
} from "@/data/travel-data";
import { cn } from "@/lib/utils";
import {
  IconCheck,
  IconMountain,
  IconFlame,
  IconSparkles,
  IconRoute,
  IconMaximize,
  IconCompass,
  IconLayersSubtract,
} from "@tabler/icons-react";

type MapLayer = "satellite" | "dark" | "streets";
type CategoryFilter = "all" | "himalayas" | "sacred" | "heritage" | "urban";

export default function TravelMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletType.Map | null>(null);
  const layerGroupRef = useRef<LeafletType.LayerGroup | null>(null);
  const tileLayerRef = useRef<LeafletType.TileLayer | null>(null);
  const labelsLayerRef = useRef<LeafletType.TileLayer | null>(null);

  const [activeLayer, setActiveLayer] = useState<MapLayer>("satellite");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const allPlaces: TravelLocation[] = useMemo(
    () => [BASE_LOCATION, ...TRAVEL_LOCATIONS],
    []
  );

  const renderMarkersAndRoutes = useCallback(
    (
      L: typeof LeafletType,
      map: LeafletType.Map,
      layerGroup: LeafletType.LayerGroup
    ) => {
      const baseCoords: [number, number] = [BASE_LOCATION.lat, BASE_LOCATION.lng];

      const placesToRender =
        selectedCategory === "all"
          ? allPlaces
          : allPlaces.filter(
              (p) => p.id === "ahmedabad" || p.category === selectedCategory
            );

      // 1. Draw Great-Circle / Curved Route Lines from Ahmedabad to all destinations
      placesToRender.forEach((loc) => {
        if (loc.id === "ahmedabad") return;

        const isSelected = selectedLocation?.id === loc.id;
        const destCoords: [number, number] = [loc.lat, loc.lng];

        // Generate curved arc trajectory between base & dest
        const latMid = (baseCoords[0] + destCoords[0]) / 2;
        const lngMid = (baseCoords[1] + destCoords[1]) / 2;
        const dLat = destCoords[0] - baseCoords[0];
        const dLng = destCoords[1] - baseCoords[1];
        const offset = Math.sqrt(dLat * dLat + dLng * dLng) * 0.12;

        const curveLat = latMid - (dLng / (Math.abs(dLng) + 1)) * offset * 0.4;
        const curveLng = lngMid + (dLat / (Math.abs(dLat) + 1)) * offset * 0.4;

        const arcPoints: [number, number][] = [];
        const steps = 25;
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const lat =
            (1 - t) * (1 - t) * baseCoords[0] +
            2 * (1 - t) * t * curveLat +
            t * t * destCoords[0];
          const lng =
            (1 - t) * (1 - t) * baseCoords[1] +
            2 * (1 - t) * t * curveLng +
            t * t * destCoords[1];
          arcPoints.push([lat, lng]);
        }

        const routeColor = isSelected
          ? "#F59E0B"
          : loc.category === "himalayas"
          ? "#38BDF8"
          : loc.category === "sacred"
          ? "#F59E0B"
          : loc.category === "heritage"
          ? "#EC4899"
          : "#10B981";

        const polyline = L.polyline(arcPoints, {
          color: routeColor,
          weight: isSelected ? 3.5 : 1.8,
          opacity: isSelected ? 1 : 0.65,
          dashArray: isSelected ? undefined : "6, 6",
        });

        polyline.addTo(layerGroup);
      });

      // 2. Draw Real GPS Location Markers with Tickmark Badges
      placesToRender.forEach((loc) => {
        const isBase = loc.id === "ahmedabad";
        const isSelected = selectedLocation?.id === loc.id;

        const markerColor = isBase
          ? "#10B981"
          : loc.category === "himalayas"
          ? "#38BDF8"
          : loc.category === "sacred"
          ? "#F59E0B"
          : loc.category === "heritage"
          ? "#EC4899"
          : "#A855F7";

        const customHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group -translate-x-1/2 -translate-y-1/2">
            <!-- Outer Pulsing Glow -->
            <div class="absolute -inset-2 rounded-full opacity-60 animate-ping" style="background-color: ${markerColor};"></div>
            
            <!-- Marker Core -->
            <div class="relative flex size-6 items-center justify-center rounded-full border-2 border-white shadow-xl text-white font-bold text-[11px] transition-transform group-hover:scale-125" style="background-color: ${markerColor};">
              ✓
            </div>

            <!-- Label Tag -->
            <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-tight shadow-md transition-all ${
              isSelected
                ? "bg-amber-400 text-black scale-110 font-bold"
                : "bg-black/85 text-white backdrop-blur-sm border border-white/20"
            }">
              ${loc.name}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: "custom-travel-marker",
          html: customHtml,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon });

        marker.on("click", () => {
          setSelectedLocation(loc);
          map.flyTo([loc.lat, loc.lng], Math.max(map.getZoom(), 8), {
            duration: 1.2,
          });
        });

        marker.addTo(layerGroup);
      });
    },
    [allPlaces, selectedCategory, selectedLocation]
  );

  // Initialize Leaflet Map
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

      // Initialize map centered on Western / Northern India
      const map = L.map(mapContainerRef.current, {
        center: [24.8, 74.2],
        zoom: 6,
        minZoom: 4,
        maxZoom: 17,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Add Zoom Control at top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Base Tile Layer
      const getTileUrl = (type: MapLayer) => {
        if (type === "satellite") {
          return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
        }
        if (type === "dark") {
          return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
        }
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      };

      const tileLayer = L.tileLayer(getTileUrl(activeLayer), {
        maxZoom: 18,
        subdomains: ["a", "b", "c", "d"],
      }).addTo(map);
      tileLayerRef.current = tileLayer;

      // For Satellite mode, add subtle boundary & place labels overlay
      if (activeLayer === "satellite") {
        const labelsLayer = L.tileLayer(
          "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 18, opacity: 0.85 }
        ).addTo(map);
        labelsLayerRef.current = labelsLayer;
      }

      // Create Layer Group for markers & routes
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;

      renderMarkersAndRoutes(L, map, layerGroup);

      // Fit bounds to show all places
      const bounds = L.latLngBounds(allPlaces.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Layer Switch
  useEffect(() => {
    async function switchLayer() {
      if (!mapInstanceRef.current || !tileLayerRef.current) return;
      const L = (await import("leaflet")).default;

      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }
      if (labelsLayerRef.current) {
        mapInstanceRef.current.removeLayer(labelsLayerRef.current);
        labelsLayerRef.current = null;
      }

      if (activeLayer === "satellite") {
        tileLayerRef.current = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 18 }
        ).addTo(mapInstanceRef.current);

        labelsLayerRef.current = L.tileLayer(
          "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 18, opacity: 0.85 }
        ).addTo(mapInstanceRef.current);
      } else if (activeLayer === "dark") {
        tileLayerRef.current = L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          { maxZoom: 18, subdomains: ["a", "b", "c", "d"] }
        ).addTo(mapInstanceRef.current);
      } else {
        tileLayerRef.current = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          { maxZoom: 18 }
        ).addTo(mapInstanceRef.current);
      }

      // Layer switch complete
    }
    switchLayer();
  }, [activeLayer]);

  // Update Markers & Routes based on category
  useEffect(() => {
    async function updateElements() {
      if (!mapInstanceRef.current || !layerGroupRef.current) return;
      const L = (await import("leaflet")).default;
      layerGroupRef.current.clearLayers();
      renderMarkersAndRoutes(L, mapInstanceRef.current, layerGroupRef.current);
    }
    updateElements();
  }, [renderMarkersAndRoutes]);

  const resetView = async () => {
    if (!mapInstanceRef.current) return;
    const L = (await import("leaflet")).default;
    setSelectedLocation(null);
    const bounds = L.latLngBounds(allPlaces.map((p) => [p.lat, p.lng]));
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], animate: true });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Header & Summary Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-xs">
            <IconCheck className="size-6 stroke-[3]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base text-foreground tracking-tight">
                India Satellite Travel Map
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <IconCheck className="size-3 stroke-[3]" /> 20 Places Visited
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Real high-resolution satellite imagery across Gujarat, Uttarakhand, Rajasthan & Maharashtra
            </p>
          </div>
        </div>

        {/* Quick Badges */}
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

      {/* Map Controls & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-muted/40 rounded-xl border border-border/50">
          {[
            { id: "all", label: "All Visited (20)" },
            { id: "himalayas", label: "Himalayas 🏔️" },
            { id: "sacred", label: "Shakti & Shrines 🕉️" },
            { id: "heritage", label: "Royal Forts 🏰" },
            { id: "urban", label: "Urban & Coast 🏙️" },
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
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                  isActive
                    ? "bg-background text-foreground shadow-xs border border-border/80"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Map Layer Mode Switcher & Reset Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-muted/40 rounded-xl border border-border/50 text-xs">
            <button
              onClick={() => setActiveLayer("satellite")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all",
                activeLayer === "satellite"
                  ? "bg-background text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <IconLayersSubtract className="size-3.5 text-emerald-400" />
              <span>🛰️ Satellite</span>
            </button>
            <button
              onClick={() => setActiveLayer("dark")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all",
                activeLayer === "dark"
                  ? "bg-background text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>🌙 Dark</span>
            </button>
            <button
              onClick={() => setActiveLayer("streets")}
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all",
                activeLayer === "streets"
                  ? "bg-background text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>🗺️ Terrain</span>
            </button>
          </div>

          <button
            onClick={resetView}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card/60 border border-border/50 text-xs text-muted-foreground hover:text-foreground hover:bg-card transition-all"
            title="Reset to Full India View"
          >
            <IconCompass className="size-3.5" />
            <span className="hidden sm:inline">Reset View</span>
          </button>
        </div>
      </div>

      {/* Real Satellite Leaflet Map Viewport */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-border/70 shadow-xl transition-all duration-300",
          isFullscreen
            ? "fixed inset-4 z-50 h-[calc(100vh-2rem)] rounded-2xl"
            : "aspect-16/10 sm:aspect-16/9.5 min-h-[480px] max-h-[640px]"
        )}
      >
        {/* Origin Badge */}
        <div className="absolute top-3 left-3 z-400 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs text-white shadow-lg pointer-events-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Origin: <strong>Ahmedabad</strong> (23.02° N, 72.57° E)</span>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute bottom-3 right-3 z-400 flex items-center gap-1 bg-black/80 backdrop-blur-md p-2 rounded-lg border border-white/20 text-white hover:bg-black transition-all shadow-lg"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
        >
          <IconMaximize className="size-4" />
        </button>

        {/* Map Container */}
        <div ref={mapContainerRef} className="size-full bg-neutral-950 z-0" />
      </div>

      {/* Selected Location Card */}
      {selectedLocation && (
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-emerald-500/5 dark:bg-emerald-500/10 p-5 shadow-sm">
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
                <span>Distance from Ahmedabad: <strong className="text-foreground">{selectedLocation.distanceFromBase}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <IconRoute className="size-4 text-amber-400" />
              <span>Real GPS: <strong className="text-foreground font-mono">{selectedLocation.lat.toFixed(4)}° N, {selectedLocation.lng.toFixed(4)}° E</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


