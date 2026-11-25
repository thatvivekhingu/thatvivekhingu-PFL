"use client";

import { useState } from "react";
import { Track } from "@/lib/music-data";
import {
  extractYouTubeId,
  validateImportData,
  buildExportJson,
} from "@/lib/custom-playlist";

interface Props {
  tracks: Track[];
  onTracksChange: (tracks: Track[]) => void;
  onClose: () => void;
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function CustomPlaylistPanel({ tracks, onTracksChange, onClose }: Props) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [showBackup, setShowBackup] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const exportJson = buildExportJson(tracks);

  const handleAdd = () => {
    setError(null);
    const id = extractYouTubeId(url.trim());
    if (!id) {
      setError("Invalid YouTube URL — paste a youtube.com or youtu.be link.");
      return;
    }
    if (!title.trim()) {
      setError("Track name is required.");
      return;
    }
    const updated = [...tracks, { id, title: title.trim(), artist: artist.trim() || "Custom Artist", category: "chill" as const }];
    onTracksChange(updated);
    setUrl("");
    setTitle("");
    setArtist("");
  };

  const handleRemove = (idx: number) => {
    const updated = tracks.filter((_, i) => i !== idx);
    onTracksChange(updated);
  };

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(exportJson);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = exportJson;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch { }
    }
  };

  const handleImport = (mode: "replace" | "append") => {
    setImportError(null);
    setImportSuccess(null);

    const trimmed = importText.trim();
    if (!trimmed) {
      setImportError("Please paste your JSON playlist data into the field.");
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      setImportError("Malformed JSON — check for syntax errors.");
      return;
    }

    try {
      const payload = validateImportData(parsed);

      if (payload.tracks.length === 0) {
        setImportError("Payload does not contain any valid tracks.");
        return;
      }

      if (mode === "replace") {
        onTracksChange(payload.tracks);
        setImportSuccess(`Imported ${payload.tracks.length} tracks.`);
      } else {
        const existingIds = new Set(tracks.map((t) => t.id));
        const newTracks = payload.tracks.filter((t) => !existingIds.has(t.id));
        const duplicateCount = payload.tracks.length - newTracks.length;
        const updated = [...tracks, ...newTracks];
        onTracksChange(updated);

        if (newTracks.length === 0) {
          setImportSuccess("All tracks are already in your playlist.");
        } else {
          setImportSuccess(`Appended ${newTracks.length} tracks (${duplicateCount} skipped duplicates).`);
        }
      }
      setImportText("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Validation failed.";
      setImportError(message);
    }
  };

  return (
    <div className="fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-3xl pointer-events-none">
      <div className="panel-enter w-full font-mono text-white backdrop-blur-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.95)] bg-[#0a0a0a]/95 rounded-2xl overflow-hidden pointer-events-auto">

        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span className="text-xs tracking-wider uppercase text-zinc-200 font-bold">
              Custom Playlist
            </span>
            <span className="text-zinc-600 text-[10px] tracking-widest hidden sm:inline">{"// YOUTUBE"}</span>
            {tracks.length > 0 && (
              <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px]">
                {tracks.length} TRACKS
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowBackup((v) => !v);
                setImportError(null);
                setImportSuccess(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                showBackup
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{showBackup ? "Playlist View" : "Import / Export"}</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-7 h-7 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close panel"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Panel Content */}
        {showBackup ? (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 p-4 sm:p-6 gap-5">
            <div className="flex flex-col gap-3">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                {"Export JSON //"}
              </span>
              <p className="text-zinc-400 text-xs">
                Copy this JSON payload to backup your custom playlist or transfer it between devices.
              </p>
              <textarea
                readOnly
                value={exportJson}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                className="w-full h-44 bg-zinc-950 border border-white/10 rounded-lg p-3 text-xs font-mono text-zinc-300 focus:outline-none select-all resize-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                {copied ? "✓ Copied to Clipboard!" : "Copy JSON Payload"}
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                {"Import JSON //"}
              </span>
              <p className="text-zinc-400 text-xs">
                Paste valid JSON data below to load tracks into your playlist.
              </p>
              <textarea
                placeholder="Paste JSON here..."
                value={importText}
                onChange={(e) => {
                  setImportText(e.target.value);
                  setImportError(null);
                  setImportSuccess(null);
                }}
                className="w-full h-44 bg-zinc-950 border border-white/10 rounded-lg p-3 text-xs font-mono text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-amber-500/40 resize-none"
              />
              {importError && <p className="text-xs text-red-400">{importError}</p>}
              {importSuccess && <p className="text-xs text-emerald-400">{importSuccess}</p>}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleImport("replace")}
                  className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Replace All
                </button>
                <button
                  onClick={() => handleImport("append")}
                  className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/5 text-zinc-300 text-xs uppercase tracking-wider cursor-pointer"
                >
                  + Append
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] divide-y md:divide-y-0 md:divide-x divide-white/10 max-h-[60vh] overflow-hidden">
            {/* Add Track Form */}
            <div className="p-5 sm:p-6 flex flex-col gap-3.5 shrink-0 bg-black/40">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                {"Add YouTube Track //"}
              </span>
              <div className="relative">
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <YouTubeIcon className="w-4 h-4 text-red-500" />
                </div>
                <input
                  type="text"
                  placeholder="Paste YouTube Link"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setError(null); }}
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <input
                type="text"
                placeholder="Track Title *"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setError(null); }}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />

              <input
                type="text"
                placeholder="Artist (optional)"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                onClick={handleAdd}
                className="mt-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                + Add Song
              </button>
            </div>

            {/* Track List */}
            <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-2">
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider mb-1">
                Playlist Queue ({tracks.length}) {"//"}
              </span>
              {tracks.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs">
                  No custom tracks added yet.<br />
                  Paste any YouTube music link on the left to add songs.
                </div>
              ) : (
                <ul className="divide-y divide-white/5">
                  {tracks.map((t, idx) => (
                    <li key={`${t.id}-${idx}`} className="flex items-center justify-between py-2.5 group">
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <span className="text-zinc-600 text-xs font-mono tabular-nums">{String(idx + 1).padStart(2, "0")}</span>
                        <div className="min-w-0">
                          <p className="text-xs text-white font-medium truncate">{t.title}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{t.artist}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(idx)}
                        className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded text-zinc-500 hover:text-red-400 hover:bg-red-500/10 text-xs transition-all cursor-pointer"
                        title="Remove song"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
