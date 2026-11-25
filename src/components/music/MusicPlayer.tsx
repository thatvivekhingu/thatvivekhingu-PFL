"use client";

import React, { useMemo } from "react";
import type { Track, ChannelCategory } from "@/lib/music-data";
import { CATEGORIES } from "@/lib/music-data";
import { formatTime, useMusicPlayer } from "@/hooks/use-music-player";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconRepeat,
  IconVolume,
  IconVolume3,
  IconAdjustmentsHorizontal,
  IconDeviceTv,
  IconArrowsMaximize,
  IconArrowsMinimize,
} from "@tabler/icons-react";

interface MusicPlayerProps {
  playlistMode: "default" | "custom";
  customTracks: Track[];
  onOpenPanel: () => void;
  selectedCategory?: ChannelCategory | "all";
  onSelectCategory?: (cat: ChannelCategory | "all") => void;
}

export default function MusicPlayer({
  playlistMode,
  customTracks,
  onOpenPanel,
}: MusicPlayerProps) {
  const {
    activeTracks,
    currentTime,
    currentTrack,
    duration,
    handleNextTrack,
    handlePlayPause,
    handlePrevTrack,
    handleSeekChange,
    handleVolumeChange,
    isMinimized,
    isMuted,
    isPlaying,
    isRepeat,
    progressPercent,
    repeatCount,
    setIsMinimized,
    setShowVideo,
    showVideo,
    toggleMute,
    toggleRepeat,
    trackIndex,
    volume,
  } = useMusicPlayer({ playlistMode, customTracks });

  const currentCat = currentTrack?.category || "focus";
  const catMeta = CATEGORIES[currentCat] || CATEGORIES.focus;

  // 14 EQ spectrum bars with staggered animation delays
  const eqDelays = useMemo(
    () => [0.1, 0.35, 0.15, 0.5, 0.25, 0.6, 0.2, 0.45, 0.1, 0.3, 0.55, 0.18, 0.4, 0.22],
    []
  );

  return (
    <div className="flex flex-col items-center select-none relative w-full mx-auto px-2">
      {/* 
        Persistent YouTube Player Frame in DOM.
        Kept active in DOM to prevent browser from throttling audio.
      */}
      <div
        className={`fixed z-50 transition-all duration-300 ${
          showVideo
            ? "bottom-6 right-6 w-68 h-38 sm:w-80 sm:h-44 opacity-100 scale-100 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            : "bottom-2 right-2 w-72 h-40 opacity-[0.01] pointer-events-none -z-10"
        }`}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-black group">
          <div id="youtube-player-frame" className="w-full h-full object-cover" />
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-2 right-2 bg-black/80 hover:bg-black text-zinc-300 hover:text-white px-2 py-0.5 rounded-md border border-zinc-700 text-[10px] font-mono cursor-pointer transition-colors"
            title="Hide video display"
          >
            ✕ CLOSE
          </button>
        </div>
      </div>

      {/* Cybernetic Studio Console Card */}
      <div
        className={`relative z-20 mx-auto select-none font-mono text-white backdrop-blur-3xl border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.95)] bg-black/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
          isMinimized
            ? "w-auto max-w-md rounded-full px-4 py-2 border-cyan-500/40"
            : "w-full max-w-2xl rounded-3xl"
        }`}
      >
        {/* ── Minimized Capsule Dock ── */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-3 ${
            isMinimized
              ? "max-h-12 opacity-100 scale-100 pointer-events-auto"
              : "max-h-0 py-0 opacity-0 scale-95 pointer-events-none overflow-hidden"
          }`}
        >
          {/* Signal Indicator & Frequency Pill */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] text-cyan-400 font-bold shrink-0">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying ? "bg-cyan-400 animate-ping" : "bg-zinc-600"
              }`}
            />
            <span>{currentTrack?.frequency ? `${currentTrack.frequency} MHz` : "FM LIVE"}</span>
          </div>

          {/* Live Mini EQ Visualizer */}
          <div className="flex items-end gap-0.5 h-3.5 shrink-0 px-1">
            {[40, 90, 60, 100, 70].map((h, i) => (
              <span
                key={i}
                className="w-0.5 bg-gradient-to-t from-cyan-500 to-emerald-400 rounded-full transition-all duration-150"
                style={{
                  height: isPlaying ? `${h}%` : "20%",
                  animation: isPlaying
                    ? `pulse 0.7s infinite alternate ease-in-out ${i * 0.12}s`
                    : "none",
                }}
              />
            ))}
          </div>

          {/* Track Name */}
          <div className="flex items-center gap-1.5 min-w-0 max-w-36 sm:max-w-56">
            <span className="text-xs text-white font-medium truncate">
              {currentTrack?.title}
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-7 h-7 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center text-xs font-bold active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
          >
            {isPlaying ? <IconPlayerPause className="w-3.5 h-3.5 fill-black" /> : <IconPlayerPlay className="w-3.5 h-3.5 fill-black ml-0.5" />}
          </button>

          {/* Expand Button */}
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white text-[10px] uppercase tracking-wider cursor-pointer shrink-0 transition-colors"
            title="Expand studio console"
          >
            <span>CONSOLE</span>
            <IconArrowsMaximize className="w-3 h-3 text-cyan-400" />
          </button>
        </div>

        {/* ── Expanded Studio Console Layer ── */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            !isMinimized
              ? "max-h-[500px] opacity-100 scale-100 pointer-events-auto"
              : "max-h-0 opacity-0 scale-95 pointer-events-none overflow-hidden"
          }`}
        >
          {/* Console Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 text-[10px] text-zinc-400 tracking-wider">
            <div className="flex items-center gap-2.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlaying
                    ? "bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"
                    : "bg-zinc-600"
                }`}
              />
              <span className="text-white font-bold tracking-widest uppercase">
                STUDIO 88.5 // FREQUENCY DECK
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-semibold bg-white/5 border border-white/10 text-cyan-300">
                {catMeta.label}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="tabular-nums text-zinc-300 font-semibold text-xs">
                CH {String(trackIndex + 1).padStart(2, "0")} / {String(activeTracks.length).padStart(2, "0")}
              </span>
              <span className="w-px h-3.5 bg-white/15" />
              <button
                onClick={() => setIsMinimized(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-400 hover:text-white text-[10px] uppercase tracking-wider cursor-pointer transition-colors"
                title="Dock to minimal capsule"
              >
                <span>DOCK</span>
                <IconArrowsMinimize className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Main Console Content Grid */}
          <div className="p-5 sm:p-6 flex flex-col gap-5">
            {/* Upper Tier: OLED Spectrum Display & Track Telemetry */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-black/70 border border-white/10 shadow-inner">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                    style={{
                      backgroundColor: `${catMeta.color}15`,
                      color: catMeta.color,
                      borderColor: `${catMeta.color}40`,
                    }}
                  >
                    {currentTrack?.frequency ? `${currentTrack.frequency} MHz` : catMeta.tag}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase">
                    320 KBPS • LOSSLESS STREAM
                  </span>
                </div>

                <h3 className="text-white font-extrabold text-lg sm:text-xl truncate tracking-tight">
                  {currentTrack?.title}
                </h3>
                <p className="text-xs text-zinc-400 truncate">
                  {currentTrack?.artist}
                </p>
              </div>

              {/* Dynamic 14-Bar Audio Spectrum Visualizer */}
              <div className="flex items-end gap-1 h-10 px-3 py-1 bg-zinc-950/90 rounded-xl border border-white/10 shrink-0 self-end sm:self-center">
                {eqDelays.map((delay, idx) => (
                  <span
                    key={idx}
                    className="w-1 rounded-full transition-all duration-200"
                    style={{
                      height: isPlaying ? `${Math.max(20, (Math.sin(idx + 1) * 40 + 55))}%` : "15%",
                      backgroundColor: idx % 3 === 0 ? "#06B6D4" : idx % 2 === 0 ? "#10B981" : "#F59E0B",
                      boxShadow: isPlaying ? "0 0 8px currentColor" : "none",
                      animation: isPlaying
                        ? `pulse 0.6s infinite alternate ease-in-out ${delay}s`
                        : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hairline Progress Scrubber with Timecode */}
            <div className="space-y-1.5">
              <div className="relative w-full group/progress cursor-pointer pt-1">
                <div className="relative w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-400 rounded-full transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.5"
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="seek-slider"
                  aria-label="Seek track position"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span className="text-zinc-600">LIVE FEED</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Master Console Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              {/* Transport Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevTrack}
                  aria-label="Previous track"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
                  title="Previous frequency"
                >
                  <IconPlayerSkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="w-12 h-12 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center active:scale-95 transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer"
                  title={isPlaying ? "Pause audio stream" : "Play audio stream"}
                >
                  {isPlaying ? (
                    <IconPlayerPause className="w-6 h-6 fill-black" />
                  ) : (
                    <IconPlayerPlay className="w-6 h-6 fill-black ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNextTrack}
                  aria-label="Next track"
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-sm"
                  title="Next frequency"
                >
                  <IconPlayerSkipForward className="w-4 h-4" />
                </button>

                {/* Repeat Loop Toggle */}
                <button
                  onClick={toggleRepeat}
                  aria-label="Toggle repeat loop"
                  className={`relative w-9 h-9 rounded-xl border flex items-center justify-center text-xs transition-all cursor-pointer ${
                    isRepeat
                      ? "bg-cyan-500/20 border-cyan-400/60 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                      : "bg-zinc-900 hover:bg-zinc-800 border-white/10 text-zinc-400 hover:text-zinc-200"
                  }`}
                  title={isRepeat ? `Loop active (${repeatCount} loops)` : "Enable loop"}
                >
                  <IconRepeat className="w-4 h-4" />
                  {isRepeat && repeatCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 px-1 py-0.2 rounded-full bg-cyan-400 text-black text-[9px] font-bold">
                      {repeatCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Auxiliary Tools: Video Frame & Custom Playlist */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  aria-label="Toggle video feed"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                    showVideo
                      ? "bg-white/15 border-white/30 text-white"
                      : "bg-zinc-900 hover:bg-zinc-800 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                  title="Toggle YouTube video screen"
                >
                  <IconDeviceTv className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SCREEN</span>
                </button>

                <button
                  onClick={onOpenPanel}
                  aria-label="Custom playlist manager"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-[11px] font-semibold transition-all cursor-pointer"
                  title="Configure custom tracks"
                >
                  <IconAdjustmentsHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>MANAGE</span>
                </button>
              </div>

              {/* Volume Scrubber with Mute Toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="text-zinc-400 hover:text-white cursor-pointer transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <IconVolume3 className="w-4 h-4 text-red-400" />
                  ) : (
                    <IconVolume className="w-4 h-4" />
                  )}
                </button>
                <div className="relative w-18 sm:w-24 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="vol-slider w-full cursor-pointer"
                    aria-label="Volume level slider"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
