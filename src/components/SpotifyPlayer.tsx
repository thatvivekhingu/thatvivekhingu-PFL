"use client";

import React, { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { IconBrandSpotify, IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface SpotifyPlayerProps {
  playlistId?: string;
  trackId?: string;
  spotifyUrl?: string;
  defaultExpanded?: boolean;
}

export default function SpotifyPlayer({
  playlistId = "37i9dQZF1DX0XUfTFmZeeg", // Default: Top Hits India (or Vivek's Playlist)
  trackId,
  spotifyUrl,
  defaultExpanded = false,
}: SpotifyPlayerProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [customInputUrl, setCustomInputUrl] = useState("");
  const [activeUrl, setActiveUrl] = useState(spotifyUrl || "");
  const [showInput, setShowInput] = useState(false);

  // Generate the clean Spotify embed URL
  const embedSrc = useMemo(() => {
    if (activeUrl) {
      if (activeUrl.includes("collection/tracks")) {
        return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
      }
      // Parse open.spotify.com links: /playlist/ID, /track/ID, /album/ID
      try {
        const urlObj = new URL(activeUrl);
        const parts = urlObj.pathname.split("/").filter(Boolean);
        if (parts.length >= 2) {
          const type = parts[0]; // "playlist" | "track" | "album"
          const id = parts[1].split("?")[0];
          return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
        }
      } catch {
        // Fallback to default
      }
    }

    if (trackId) {
      return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
    }

    return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  }, [activeUrl, trackId, playlistId]);

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl.trim()) {
      setActiveUrl(customInputUrl.trim());
      setShowInput(false);
      setIsExpanded(true);
    }
  };

  // If user is already on the dedicated full /music Spotify app page, we don't need the floating widget
  if (pathname === "/music") {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 z-[5500] select-none font-sans">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[340px] sm:w-[380px] max-w-[calc(100vw-28px)] rounded-2xl bg-[#121212]/95 backdrop-blur-xl border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            {/* Widget Top Header */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/60 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <IconBrandSpotify className="w-5 h-5 text-[#1DB954] animate-pulse" />
                <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  Spotify Embed Player
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                </span>
              </div>

              <div className="flex items-center gap-1 text-zinc-400">
                <button
                  onClick={() => setShowInput(!showInput)}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                  title="Change playlist or song link"
                >
                  {showInput ? "Cancel" : "Change Link"}
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 hover:text-white transition"
                  title="Minimize"
                >
                  <IconChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional URL Input Dropdown */}
            {showInput && (
              <form onSubmit={handleApplyUrl} className="p-2.5 bg-zinc-900 border-b border-zinc-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Paste Spotify playlist or track link..."
                  value={customInputUrl}
                  onChange={(e) => setCustomInputUrl(e.target.value)}
                  className="flex-1 bg-black text-xs text-white px-2.5 py-1.5 rounded-lg border border-zinc-700 outline-none focus:border-[#1DB954]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-bold rounded-lg transition"
                >
                  Play
                </button>
              </form>
            )}

            {/* If Liked Songs private link is active */}
            {activeUrl.includes("collection/tracks") && (
              <div className="px-3 py-1.5 bg-[#1DB954]/15 border-b border-[#1DB954]/20 flex items-center justify-between text-[11px]">
                <span className="text-[#1DB954] font-medium">❤️ Liked Songs (Private Library)</span>
                <a
                  href="https://open.spotify.com/collection/tracks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#1DB954] underline font-semibold"
                >
                  Open in Spotify ↗
                </a>
              </div>
            )}

            {/* Official Spotify Iframe Embed */}
            <div className="w-full bg-[#121212] p-1">
              <iframe
                title="Spotify Music Player"
                src={embedSrc}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full rounded-xl"
              />
            </div>
          </motion.div>
        ) : (
          /* Minimized Floating Pill Button */
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#121212]/95 hover:bg-black text-white border border-zinc-800 hover:border-[#1DB954]/60 shadow-xl transition-all duration-300 hover:scale-105"
            title="Open Spotify Embed Player"
          >
            <IconBrandSpotify className="w-5 h-5 text-[#1DB954] group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold tracking-tight pr-1">Spotify Player</span>
            <IconChevronUp className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
