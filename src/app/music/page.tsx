"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Clock from "@/components/music/Clock";
import MusicPlayer from "@/components/music/MusicPlayer";
import CustomPlaylistPanel from "@/components/music/CustomPlaylistPanel";
import { loadCustomTracks, saveCustomTracks } from "@/lib/custom-playlist";
import { Track } from "@/lib/music-data";
import {
  STUDIO_SCENES,
  getISTNow,
  indexForHour,
  msUntilNextSlot,
} from "@/lib/studio-scenes";
import { IconBroadcast, IconSparkles } from "@tabler/icons-react";

export default function MusicPage() {
  // Initialize with the current Indian Standard Time (IST) studio scene
  const [current, setCurrent] = useState<number>(() =>
    indexForHour(getISTNow().getHours())
  );

  const [playlistMode, setPlaylistMode] = useState<"default" | "custom">("default");
  const [showPlaylistPanel, setShowPlaylistPanel] = useState<boolean>(false);
  const [customTracks, setCustomTracks] = useState<Track[]>([]);

  const handleSwitchMode = useCallback((mode: "default" | "custom") => {
    if (mode === "custom" && playlistMode !== "custom") {
      const stored = loadCustomTracks();
      setCustomTracks(stored);
    }
    setPlaylistMode(mode);
    if (mode === "default") setShowPlaylistPanel(false);
  }, [playlistMode]);

  const handleOpenPanel = useCallback(() => {
    const stored = loadCustomTracks();
    setCustomTracks(stored);
    setShowPlaylistPanel(true);
  }, []);

  const slotTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-switch at each IST time slot boundary
  useEffect(() => {
    const arm = () => {
      const istNow = getISTNow();
      const idx = indexForHour(istNow.getHours());
      const delay = msUntilNextSlot(idx, istNow);

      slotTimerRef.current = setTimeout(() => {
        setCurrent(indexForHour(getISTNow().getHours()));
        arm();
      }, delay);
    };

    arm();
    return () => {
      if (slotTimerRef.current) clearTimeout(slotTimerRef.current);
    };
  }, []);

  // Manual "Change Scene" cycle handler
  const handleCycleImage = () => {
    setCurrent((prev) => (prev + 1) % STUDIO_SCENES.length);
  };

  const scene = STUDIO_SCENES[current] || STUDIO_SCENES[0];

  return (
    <main className="relative w-full h-screen min-h-screen overflow-hidden font-sans select-none bg-black">
      {/* Background Architectural Studio Scene with Smooth Cross-Dissolve */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 92% 90% at 50% 50%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 92% 90% at 50% 50%, black 50%, transparent 100%)",
        }}
      >
        {STUDIO_SCENES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.title}
            fill
            priority={i === 0}
            sizes="100vw"
            draggable={false}
            className={[
              "object-cover select-none pointer-events-none",
              "transition-opacity duration-1000 ease-in-out",
              i === current ? "opacity-90 scale-100" : "opacity-0 scale-105",
            ].join(" ")}
            loading="eager"
          />
        ))}

        {/* Pure Black Radial Edge Blending */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: "radial-gradient(ellipse 90% 88% at 50% 50%, transparent 60%, #000000 100%)",
          }}
        />
      </div>

      {/* Cyber Ambient Scrims & Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85 pointer-events-none z-10" />

      {/* Hero Center Title: THE FREQUENCY LOUNGE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4 z-15 -translate-y-12 sm:-translate-y-18">
        <div className="flex flex-col items-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 border border-cyan-500/30 text-[10px] sm:text-xs font-mono font-bold text-cyan-400 tracking-[0.25em] uppercase mb-3 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>STUDIO 88.5 FM // NEURAL AUDIO LAB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase drop-shadow-[0_4px_40px_rgba(0,0,0,0.95)]">
            THE FREQUENCY LOUNGE
          </h1>

          <p className="font-mono text-xs sm:text-sm text-zinc-300 tracking-[0.2em] uppercase mt-2.5 drop-shadow-md">
            ANALOG HARMONICS &amp; CYBER SOUNDSCAPES FOR DEEP FOCUS
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {scene.title} ({scene.hours} IST)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-md">
              <IconBroadcast className="w-3.5 h-3.5" />
              {scene.vibe}
            </span>
          </div>
        </div>
      </div>

      {/* Top Header Navigation */}
      <header className="absolute top-0 left-0 right-0 flex items-start justify-between p-4 sm:p-6 gap-3 z-30">
        {/* Top Left: Back link & Clock */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <Link
            href="/"
            aria-label="Back to portfolio"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 font-mono text-xs text-white/90 shadow-md hover:bg-black hover:border-cyan-400/50 hover:text-cyan-300 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="text-[11px]">←</span>
            <span>Back</span>
          </Link>
          <Clock />
        </div>

        {/* Top Right: Studio Scene Switcher & Playlist Mode */}
        <nav className="flex flex-col items-end sm:flex-row sm:items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Change Studio Atmosphere Button */}
          <button
            onClick={handleCycleImage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 font-mono shadow-md hover:bg-black hover:border-cyan-400/50 active:scale-95 transition-all group cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Change Studio Scene"
          >
            <span className="text-cyan-400 font-mono text-[10px] tracking-wider shrink-0">
              SCENE // {current + 1} of {STUDIO_SCENES.length}
            </span>
            <span className="w-px h-3 bg-white/15 shrink-0" />
            <span className="text-zinc-300 font-mono text-xs tracking-tight group-hover:text-white flex items-center gap-1.5 whitespace-nowrap transition-colors">
              <span>Change Scene</span>
              <IconSparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300 shrink-0" />
            </span>
          </button>

          {/* Playlist Channel Toggle */}
          <div className="flex items-center gap-0 px-2.5 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 font-mono shadow-md whitespace-nowrap shrink-0">
            <span className="text-zinc-500 text-[10px] tracking-wider shrink-0 pr-2">MODE</span>
            <span className="w-px h-3 bg-white/15 shrink-0 mr-2" />

            <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-0.5">
              <button
                onClick={() => handleSwitchMode("default")}
                className={`px-2.5 py-0.5 rounded-md text-[10px] tracking-wide transition-all cursor-pointer ${
                  playlistMode === "default"
                    ? "bg-cyan-400 text-black font-extrabold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Curated Studio Master tracks"
              >
                Curated
              </button>
              <button
                onClick={() => handleSwitchMode("custom")}
                className={`px-2.5 py-0.5 rounded-md text-[10px] tracking-wide transition-all cursor-pointer ${
                  playlistMode === "custom"
                    ? "bg-amber-400 text-black font-extrabold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Your own custom YouTube playlist"
              >
                Custom
              </button>
            </div>

            {playlistMode === "custom" && (
              <>
                <span className="w-px h-3 bg-white/15 shrink-0 mx-2" />
                <button
                  onClick={() => setShowPlaylistPanel((v) => !v)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] tracking-wide border transition-all cursor-pointer ${
                    showPlaylistPanel
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                      : "border-white/15 text-zinc-400 hover:text-white hover:border-white/30"
                  }`}
                  title="Manage custom playlist"
                >
                  <span>{showPlaylistPanel ? "Close" : "Manage"}</span>
                  <span className="text-[9px]">{showPlaylistPanel ? "✕" : "✎"}</span>
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Custom Playlist Panel Modal */}
      {playlistMode === "custom" && showPlaylistPanel && (
        <CustomPlaylistPanel
          tracks={customTracks}
          onTracksChange={(updated) => {
            setCustomTracks(updated);
            saveCustomTracks(updated);
          }}
          onClose={() => setShowPlaylistPanel(false)}
        />
      )}

      {/* Bottom Center: Cybernetic Studio Music Player */}
      <footer className="absolute bottom-5 sm:bottom-8 left-0 right-0 flex justify-center px-4 z-30">
        <MusicPlayer
          playlistMode={playlistMode}
          customTracks={customTracks}
          onOpenPanel={handleOpenPanel}
        />
      </footer>
    </main>
  );
}
