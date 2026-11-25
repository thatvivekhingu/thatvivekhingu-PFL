"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { TRACKS, Track } from "@/lib/music-data";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

const STORAGE_KEY = "frequency-deck-player-state";

interface PlayerState {
  trackIndex: number;
  currentTime: number;
  volume: number;
  isRepeat: boolean;
}

function loadPlayerState(): PlayerState | null {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return null;
    const parsed = JSON.parse(item);
    if (
      parsed &&
      typeof parsed.trackIndex === "number" &&
      !isNaN(parsed.trackIndex) &&
      parsed.trackIndex >= 0 &&
      parsed.trackIndex < TRACKS.length
    ) {
      return {
        trackIndex: parsed.trackIndex,
        currentTime: typeof parsed.currentTime === "number" && !isNaN(parsed.currentTime) ? parsed.currentTime : 0,
        volume: typeof parsed.volume === "number" && !isNaN(parsed.volume) ? parsed.volume : 70,
        isRepeat: Boolean(parsed.isRepeat),
      };
    }
  } catch {
    // Return null on error
  }
  return null;
}

function savePlayerState(state: PlayerState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}

export type PlaylistMode = "default" | "custom";

interface UsePlayerProps {
  playlistMode: PlaylistMode;
  customTracks: Track[];
}

export function useMusicPlayer({ playlistMode, customTracks }: UsePlayerProps) {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(70);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [repeatCount, setRepeatCount] = useState<number>(0);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const playerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const trackIndexRef = useRef<number>(trackIndex);
  const isPlayingRef = useRef<boolean>(false);
  const isUserPausedRef = useRef<boolean>(true);
  const userHasClickedPlayRef = useRef<boolean>(false);
  const isRepeatRef = useRef<boolean>(isRepeat);
  const volumeRef = useRef<number>(volume);
  const currentTimeRef = useRef<number>(0);
  const activeTracksRef = useRef<Track[]>(TRACKS);
  const navigationLockUntilRef = useRef<number>(0);

  useEffect(() => {
    const saved = loadPlayerState();
    if (saved) {
      setTrackIndex(saved.trackIndex);
      setVolume(saved.volume);
      setIsRepeat(saved.isRepeat);
      trackIndexRef.current = saved.trackIndex;
      volumeRef.current = saved.volume;
      isRepeatRef.current = saved.isRepeat;
    }
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isRepeatRef.current = isRepeat;
  }, [isRepeat]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  const activeTracks = playlistMode === "default" ? TRACKS : (customTracks.length > 0 ? customTracks : TRACKS);
  activeTracksRef.current = activeTracks;

  const currentTrack = activeTracks[trackIndex] ?? activeTracks[0] ?? TRACKS[0];

  const startProgressTracking = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        try {
          const cur = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || 0;
          setCurrentTime(cur);
          setDuration(dur);
          savePlayerState({
            trackIndex: trackIndexRef.current,
            currentTime: cur,
            volume: volumeRef.current,
            isRepeat: isRepeatRef.current,
          });
        } catch { }
      }
    }, 500);
  };

  const stopProgressTracking = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Watchdog keeping background tab playback active
  useEffect(() => {
    const watchdog = setInterval(() => {
      if (!isUserPausedRef.current && playerRef.current && typeof playerRef.current.getPlayerState === "function") {
        try {
          const state = playerRef.current.getPlayerState();
          const YTState = window.YT?.PlayerState;
          if (state === YTState?.PAUSED) {
            playerRef.current.playVideo();
          }
        } catch { }
      }
    }, 350);

    const handleVisibilityOrBlur = () => {
      if (!isUserPausedRef.current && playerRef.current) {
        setTimeout(() => {
          try {
            const state = playerRef.current?.getPlayerState?.();
            const YTState = window.YT?.PlayerState;
            if (state !== YTState?.PLAYING && state !== YTState?.BUFFERING) {
              playerRef.current?.playVideo();
            }
          } catch { }
        }, 100);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityOrBlur);
    window.addEventListener("blur", handleVisibilityOrBlur);

    return () => {
      clearInterval(watchdog);
      document.removeEventListener("visibilitychange", handleVisibilityOrBlur);
      window.removeEventListener("blur", handleVisibilityOrBlur);
    };
  }, []);

  const handleNextTrack = useCallback(() => {
    userHasClickedPlayRef.current = true;
    const tracks = activeTracksRef.current;
    if (!tracks.length) return;
    if (isRepeatRef.current) {
      setRepeatCount((prev) => prev + 1);
      setCurrentTime(0);
      savePlayerState({
        trackIndex: trackIndexRef.current,
        currentTime: 0,
        volume: volumeRef.current,
        isRepeat: isRepeatRef.current,
      });
      isUserPausedRef.current = false;
      if (playerRef.current && typeof playerRef.current.seekTo === "function") {
        playerRef.current.seekTo(0, true);
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
      return;
    }

    const nextIdx = (trackIndexRef.current + 1) % tracks.length;
    navigationLockUntilRef.current = Date.now() + 900;
    trackIndexRef.current = nextIdx;
    setTrackIndex(nextIdx);
    savePlayerState({
      trackIndex: nextIdx,
      currentTime: 0,
      volume: volumeRef.current,
      isRepeat: isRepeatRef.current,
    });
    setCurrentTime(0);
    setDuration(0);
    setRepeatCount(0);
    isUserPausedRef.current = false;
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      playerRef.current.loadVideoById(tracks[nextIdx].id);
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    const initPlayer = () => {
      if (playerRef.current) return;
      if (!window.YT || !window.YT.Player) return;
      if (!document.getElementById("youtube-player-frame")) {
        requestAnimationFrame(() => initPlayer());
        return;
      }

      const tracks = activeTracksRef.current;
      playerRef.current = new window.YT.Player("youtube-player-frame", {
        height: "180",
        width: "320",
        videoId: tracks[trackIndexRef.current]?.id || tracks[0]?.id || TRACKS[0].id,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            try {
              const saved = loadPlayerState();
              event.target.setVolume(saved?.volume ?? 70);
              if (saved && typeof saved.currentTime === "number" && saved.currentTime > 0) {
                event.target.seekTo(saved.currentTime, true);
                event.target.pauseVideo();
                setCurrentTime(saved.currentTime);
              }
            } catch { }
          },
          onStateChange: (event: any) => {
            const YTState = window.YT?.PlayerState;
            let eventVideoId: string | undefined;
            try {
              eventVideoId = event.target?.getVideoData?.().video_id;
            } catch {
              eventVideoId = undefined;
            }
            const currentVideoId = activeTracksRef.current[trackIndexRef.current]?.id;
            if (
              event.data === YTState?.ENDED &&
              eventVideoId &&
              currentVideoId &&
              eventVideoId !== currentVideoId
            ) {
              return;
            }
            if (
              event.data === YTState?.ENDED &&
              Date.now() < navigationLockUntilRef.current
            ) {
              return;
            }
            if (event.data === YTState?.PLAYING) {
              if (!userHasClickedPlayRef.current) {
                event.target.pauseVideo();
                isUserPausedRef.current = true;
                return;
              }
              setStatus("");
              setIsPlaying(true);
              isUserPausedRef.current = false;
              startProgressTracking();
            } else if (event.data === YTState?.PAUSED) {
              if (!isUserPausedRef.current && (document.hidden || !document.hasFocus())) {
                setTimeout(() => {
                  try {
                    playerRef.current?.playVideo();
                  } catch { }
                }, 100);
              } else {
                setIsPlaying(false);
                stopProgressTracking();
              }
            } else if (event.data === YTState?.ENDED) {
              setIsPlaying(false);
              stopProgressTracking();
              handleNextTrack();
            }
          },
          onError: (event: any) => {
            console.warn("YouTube player error code:", event.data);
            setStatus("Skipped restricted track");
            handleNextTrack();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initPlayer();
      };

      if (!document.getElementById("youtube-iframe-api-script")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }

    return () => {
      stopProgressTracking();
    };
  }, [hasHydrated, handleNextTrack]);

  const handlePlayPause = useCallback(() => {
    if (!playerRef.current || !isReady) return;
    if (isPlayingRef.current) {
      isUserPausedRef.current = true;
      playerRef.current.pauseVideo();
    } else {
      userHasClickedPlayRef.current = true;
      isUserPausedRef.current = false;
      playerRef.current.playVideo();
    }
  }, [isReady]);

  const handlePrevTrack = useCallback(() => {
    userHasClickedPlayRef.current = true;
    const tracks = activeTracksRef.current;
    if (!tracks.length) return;
    const prevIdx = (trackIndexRef.current - 1 + tracks.length) % tracks.length;
    navigationLockUntilRef.current = Date.now() + 900;
    trackIndexRef.current = prevIdx;
    setTrackIndex(prevIdx);
    savePlayerState({
      trackIndex: prevIdx,
      currentTime: 0,
      volume: volumeRef.current,
      isRepeat: isRepeatRef.current,
    });
    setCurrentTime(0);
    setDuration(0);
    setRepeatCount(0);
    isUserPausedRef.current = false;
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      playerRef.current.loadVideoById(tracks[prevIdx].id);
      setIsPlaying(true);
    }
  }, []);

  const goTo = useCallback((targetIndex: number) => {
    userHasClickedPlayRef.current = true;
    const tracks = activeTracksRef.current;
    if (!tracks.length || targetIndex < 0 || targetIndex >= tracks.length) return;
    navigationLockUntilRef.current = Date.now() + 900;
    trackIndexRef.current = targetIndex;
    setTrackIndex(targetIndex);
    savePlayerState({
      trackIndex: targetIndex,
      currentTime: 0,
      volume: volumeRef.current,
      isRepeat: isRepeatRef.current,
    });
    setCurrentTime(0);
    setDuration(0);
    setRepeatCount(0);
    isUserPausedRef.current = false;
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      playerRef.current.loadVideoById(tracks[targetIndex].id);
      setIsPlaying(true);
    }
  }, []);

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    const percent = parseFloat(e.target.value);
    const newTime = (percent / 100) * (duration || 0);
    setCurrentTime(newTime);
    if (playerRef.current && typeof playerRef.current.seekTo === "function") {
      playerRef.current.seekTo(newTime, true);
    }
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    volumeRef.current = newVol;
    if (isMuted && newVol > 0) setIsMuted(false);
    if (playerRef.current && typeof playerRef.current.setVolume === "function") {
      playerRef.current.setVolume(newVol);
      if (playerRef.current.isMuted()) playerRef.current.unMute();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const toggleRepeat = () => {
    const nextRepeat = !isRepeat;
    setIsRepeat(nextRepeat);
    isRepeatRef.current = nextRepeat;
    if (!nextRepeat) setRepeatCount(0);
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return {
    activeTracks,
    currentTrack,
    currentTime,
    duration,
    goTo,
    handleNextTrack,
    handlePlayPause,
    handlePrevTrack,
    handleSeekChange,
    handleVolumeChange,
    isMinimized,
    isMuted,
    isPlaying,
    isReady,
    isRepeat,
    progressPercent,
    repeatCount,
    setIsMinimized,
    setShowVideo,
    showVideo,
    status,
    toggleMute,
    toggleRepeat,
    trackIndex,
    volume,
  };
}
