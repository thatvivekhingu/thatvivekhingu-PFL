"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Volume1,
  Heart,
  ListMusic,
  Mic2,
  Search,
  Laptop2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Clock,
  Sparkles,
  Music,
  Radio,
  Share2,
  Check,
} from "lucide-react";
import { IconBrandSpotify } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

export type TrackCategory = "all" | "bollywood" | "gujarati" | "coding" | "chill";

// --- Track Interface ---
interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  durationFormatted: string;
  coverUrl: string;
  audioUrl: string;
  category: "all" | "bollywood" | "gujarati" | "coding" | "chill";
  spotifyUrl: string;
  addedDate: string;
  lyrics: string[];
  musicalKey: string;
  tempo: number; // BPM
}

// --- Curated Tracks matching Vivek's Taste ---
const TRACKS_DATA: Track[] = [
  {
    id: "track-1",
    title: "Tabaahi (From \"Toxic\")",
    artist: "Vishal Mishra, Raj Shekhar",
    album: "Toxic",
    duration: 214,
    durationFormatted: "3:34",
    coverUrl: "/music/tabaahi.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    category: "bollywood",
    spotifyUrl: "https://open.spotify.com/track/0bRRLtD0Tmfg8ZaP9Qf1Sq",
    addedDate: "2 days ago",
    musicalKey: "Cm",
    tempo: 92,
    lyrics: [
      "Yeh tabaahi bhi gazab hai yaara...",
      "Tere ishq mein sab fanaa hai...",
      "Dil ke darwaaze pe teri dastak...",
      "Har lamha bas tera intezaar hai...",
      "Raat ke sannate mein teri aawaz...",
      "Dhadkano ka ye ajeeb sa saaz...",
      "Tabaahi hai... Haan tabaahi hai...",
      "Tere bina ye jahaan ajeeb hai...",
    ],
  },
  {
    id: "track-2",
    title: "Khalasi",
    artist: "Aditya Gadhvi, Achint",
    album: "Coke Studio Bharat",
    duration: 198,
    durationFormatted: "3:18",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    category: "gujarati",
    spotifyUrl: "https://open.spotify.com/track/4bH4g1qQo5o4F6y98sO1P9",
    addedDate: "3 days ago",
    musicalKey: "Am",
    tempo: 124,
    lyrics: [
      "Arere rangilo khalasi...",
      "Samandar na mojani sathe ladi jaay...",
      "Vahaal bharu dil ne tara naame chadi jaay...",
      "Dariya ne ghaate chhe taaro ahesaas...",
      "Hey ram... Arere rangilo khalasi!",
      "Hawaa na sangeet ma tara geet...",
      "Hoon chhu mast malang musafir...",
      "Arere rangilo khalasi...",
    ],
  },
  {
    id: "track-3",
    title: "Gotilo",
    artist: "Aditya Gadhvi, Sachin-Jigar",
    album: "Gujarati Folk Fusion",
    duration: 205,
    durationFormatted: "3:25",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    category: "gujarati",
    spotifyUrl: "https://open.spotify.com/search/gotilo%20aditya%20gadhvi",
    addedDate: "1 week ago",
    musicalKey: "D",
    tempo: 128,
    lyrics: [
      "Gotilo... Hey mara manuda ne gotilo...",
      "Kahe che falguni raaton ma...",
      "Tara sneha na taraano ma...",
      "Man mast thaine nache...",
      "Dhol na taale taal milave...",
      "Hey gotilo gotilo mara priyatama...",
    ],
  },
  {
    id: "track-4",
    title: "Midnight AI Flow (Deep Work)",
    artist: "Vivek Hingu, Lofi Beats",
    album: "Neural Synthesis Vol. 1",
    duration: 180,
    durationFormatted: "3:00",
    coverUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    category: "coding",
    spotifyUrl: "https://open.spotify.com/search/lofi%20beats%20deep%20work",
    addedDate: "Just now",
    musicalKey: "Fm",
    tempo: 85,
    lyrics: [
      "[Instrumental - Smooth Vinyl Crackle & Warm Piano]",
      "[Deep Synth Baseline & Gentle 808 Snares]",
      "Building neural nets under starlight...",
      "Zero latency, endless creativity...",
      "Tokens flowing like midnight rain...",
      "Agent loops converging in harmony...",
      "[Smooth Rhodes Chord Progression]",
    ],
  },
  {
    id: "track-5",
    title: "Chuttamalle",
    artist: "Anirudh Ravichander, Shilpa Rao",
    album: "Devara Part 1",
    duration: 222,
    durationFormatted: "3:42",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    category: "bollywood",
    spotifyUrl: "https://open.spotify.com/search/chuttamalle",
    addedDate: "4 days ago",
    musicalKey: "Gm",
    tempo: 104,
    lyrics: [
      "Chuttamalle chuttukora...",
      "Gundeloki ettu kora...",
      "Manasuki allukora prematho...",
      "Valapula veena meeta...",
      "Oorantha chuse vela...",
      "Nee jatha lo unte chaalu...",
    ],
  },
  {
    id: "track-6",
    title: "Starboy",
    artist: "The Weeknd, Daft Punk",
    album: "Starboy",
    duration: 230,
    durationFormatted: "3:50",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    category: "chill",
    spotifyUrl: "https://open.spotify.com/track/7MXVkk9YM5IZxh0WSlVIk0",
    addedDate: "2 weeks ago",
    musicalKey: "G",
    tempo: 93,
    lyrics: [
      "I'm tryna put you in the worst mood, ah",
      "P1 cleaner than your church shoes, ah",
      "Milli point two just to hurt you, ah",
      "All red Lamb' just to tease you, ah",
      "None of these toys on lease too, ah",
      "Look what you've done...",
      "I'm a motherf***ing starboy!",
    ],
  },
  {
    id: "track-7",
    title: "Kesariya",
    artist: "Arijit Singh, Pritam, Amitabh B.",
    album: "Brahmāstra",
    duration: 268,
    durationFormatted: "4:28",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    category: "bollywood",
    spotifyUrl: "https://open.spotify.com/track/6Wz0jZk4jG5Uuh0w3n1q3g",
    addedDate: "1 week ago",
    musicalKey: "C",
    tempo: 96,
    lyrics: [
      "Kesariya tera ishq hai piya...",
      "Rang jaaun jo main haath lagaun...",
      "Din beete saara teri fikr mein...",
      "Rain saari teri khair manaun...",
      "Kajal ki siyahi se likhi...",
      "Hain tune jaane kitno ki love storyan...",
    ],
  },
  {
    id: "track-8",
    title: "Agar Tum Saath Ho",
    artist: "Arijit Singh, Alka Yagnik, A.R. Rahman",
    album: "Tamasha",
    duration: 341,
    durationFormatted: "5:41",
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    category: "bollywood",
    spotifyUrl: "https://open.spotify.com/track/3hUxzQpSfdq8W0pjOGw1hU",
    addedDate: "3 weeks ago",
    musicalKey: "F",
    tempo: 88,
    lyrics: [
      "Pal bhar thehar jaao...",
      "Dil ye sambhal jaaye...",
      "Kaise tumhe roka karun...",
      "Meri taraf aata har gham phisal jaaye...",
      "Aankhon mein tum ko bharun...",
      "Agar tum saath ho...",
      "Dil ye sambhal jaaye...",
    ],
  },
  {
    id: "track-9",
    title: "Apna Bana Le",
    artist: "Arijit Singh, Sachin-Jigar",
    album: "Bhediya",
    duration: 261,
    durationFormatted: "4:21",
    coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    category: "bollywood",
    spotifyUrl: "https://open.spotify.com/search/apna%20bana%20le",
    addedDate: "2 weeks ago",
    musicalKey: "D",
    tempo: 90,
    lyrics: [
      "Tu mera koi na hoke bhi kuch laage...",
      "Kiya re jo bhi tune kaise kiya re...",
      "Jiya ko mere baandh aise liya re...",
      "Apna bana le piya...",
      "Apna bana le piya...",
      "Dil ke nagar mein shehar tu basa le piya...",
    ],
  },
  {
    id: "track-10",
    title: "Mor Bani Thanghat Kare",
    artist: "Osman Mir, Aditi Paul, Sanjay Leela Bhansali",
    album: "Goliyon Ki Raasleela Ram-Leela",
    duration: 236,
    durationFormatted: "3:56",
    coverUrl: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    category: "gujarati",
    spotifyUrl: "https://open.spotify.com/search/mor%20bani%20thanghat%20kare",
    addedDate: "1 month ago",
    musicalKey: "Em",
    tempo: 130,
    lyrics: [
      "Mor bani thanghat kare, man mor bani thanghat kare...",
      "Ghan ghan ghan ghan ghor ghor ghan...",
      "Megh ghanere aavi chadya re...",
      "Giri taleti zula jhule re...",
      "Man mor bani thanghat kare...",
    ],
  },
  {
    id: "track-11",
    title: "Synthwave Horizons (Silicon Nights)",
    artist: "Kavinsky Style Synth, Vivek AI",
    album: "Cyber Code 2099",
    duration: 210,
    durationFormatted: "3:30",
    coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    category: "coding",
    spotifyUrl: "https://open.spotify.com/search/synthwave%20cyberpunk",
    addedDate: "5 days ago",
    musicalKey: "Dm",
    tempo: 118,
    lyrics: [
      "[Pulsing Analog Arpeggio & Retro Drum Machine]",
      "[Neon Glow in the Rain, Cybernetic Overdrive]",
      "Compiling shaders at the speed of light...",
      "Driving through the virtual skyline...",
      "[Bass Drop & Retro Lead Melody]",
      "Infinite highway, zero barriers...",
    ],
  },
  {
    id: "track-12",
    title: "Pasoori",
    artist: "Ali Sethi, Shae Gill",
    album: "Coke Studio Season 14",
    duration: 224,
    durationFormatted: "3:44",
    coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    category: "chill",
    spotifyUrl: "https://open.spotify.com/search/pasoori",
    addedDate: "3 weeks ago",
    musicalKey: "Fm",
    tempo: 110,
    lyrics: [
      "Agg laavan majboori nu...",
      "Aan jaan di pasoori nu...",
      "Zehar bane haan teri...",
      "Pee jaavan main poori nu...",
      "Aana si o nai aaya...",
      "Dil baang baang mera takraaya...",
    ],
  },
];

// Playlists Navigation
interface Playlist {
  id: string;
  name: string;
  creator: string;
  icon: string;
  filter: "all" | "bollywood" | "gujarati" | "coding" | "chill";
  description: string;
  coverUrl: string;
}

const PLAYLISTS: Playlist[] = [
  {
    id: "pl-heavy",
    name: "Vivek's Heavy Rotation",
    creator: "Vivek Hingu",
    icon: "🔥",
    filter: "all",
    description: "Personal heavy rotation: AI engineer deep work, Gujarati soul, and Bollywood anthems.",
    coverUrl: "/music/tabaahi.jpg",
  },
  {
    id: "pl-liked",
    name: "Liked Songs",
    creator: "Vivek Hingu",
    icon: "❤️",
    filter: "all",
    description: "Your favorite saved tracks across all genres.",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "pl-coding",
    name: "Deep Work & AI Code",
    creator: "Vivek Hingu",
    icon: "⚡",
    filter: "coding",
    description: "Zero distraction flow state, lofi rhythms & synthwave beats.",
    coverUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "pl-gujarati",
    name: "Gujju Beats & Folk Hits",
    creator: "Vivek Hingu",
    icon: "🪕",
    filter: "gujarati",
    description: "Khalasi, Gotilo, and vibrant modern Gujarati folk fusion.",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "pl-bollywood",
    name: "Bollywood Euphoria",
    creator: "Vivek Hingu",
    icon: "✨",
    filter: "bollywood",
    description: "Tabaahi, Kesariya, Agar Tum Saath Ho, and timeless melodies.",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "pl-chill",
    name: "Late Night Chill & Lofi",
    creator: "Vivek Hingu",
    icon: "🌌",
    filter: "chill",
    description: "Mellow vibes for late night coffee and reflection.",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
  },
];

export default function SpotifyMusicPage() {
  // --- States ---
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>(PLAYLISTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "bollywood" | "gujarati" | "coding" | "chill">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(214);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("all");
  const [likedTrackIds, setLikedTrackIds] = useState<Set<string>>(new Set(["track-1", "track-2", "track-4", "track-7"]));
  const [viewMode, setViewMode] = useState<"list" | "lyrics" | "embed">("list");
  const [showQueue, setShowQueue] = useState(false);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLiveSynthesizerActive, setIsLiveSynthesizerActive] = useState(false);

  // Audio References
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    let list = TRACKS_DATA;
    if (currentPlaylist.filter !== "all") {
      list = list.filter((t) => t.category === currentPlaylist.filter);
    } else if (selectedCategory !== "all") {
      list = list.filter((t) => t.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q) || t.album.toLowerCase().includes(q));
    }
    return list;
  }, [currentPlaylist, selectedCategory, searchQuery]);

  const currentTrack = filteredTracks[currentTrackIndex] || TRACKS_DATA[0];

  // --- Sound Synthesizer Fallback Engine ---
  // Guarantees rich, melodic, atmospheric sound playback in all browsers even if third-party audio URL has network / CORS restrictions.
  const startSynthMelody = (track: Track) => {
    try {
      if (!synthCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        synthCtxRef.current = new AudioContextClass();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (synthGainRef.current) {
        try { synthGainRef.current.disconnect(); } catch { /* ignore */ }
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      synthGainRef.current = masterGain;

      // Note frequencies based on track category
      const chordNotes = track.category === "gujarati" 
        ? [293.66, 329.63, 369.99, 440.0, 493.88] // D Major Folk
        : track.category === "coding"
        ? [174.61, 207.65, 261.63, 311.13, 349.23] // Fm Deep Lofi
        : track.category === "chill"
        ? [196.0, 246.94, 293.66, 392.0, 440.0] // G Major Mellow
        : [261.63, 329.63, 392.0, 523.25, 659.25]; // C Major Romance

      let step = 0;
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);

      synthIntervalRef.current = setInterval(() => {
        if (!synthCtxRef.current || synthCtxRef.current.state === "closed") return;
        const now = synthCtxRef.current.currentTime;
        const osc = synthCtxRef.current.createOscillator();
        const noteGain = synthCtxRef.current.createGain();

        const freq = chordNotes[step % chordNotes.length];
        step++;

        osc.type = track.category === "coding" ? "sine" : track.category === "gujarati" ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Envelope
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.08, now + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.6);
      }, (60 / track.tempo) * 1000);

      setIsLiveSynthesizerActive(true);
    } catch (err) {
      console.warn("Synth initialization note:", err);
    }
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthGainRef.current && synthCtxRef.current) {
      try {
        synthGainRef.current.gain.setValueAtTime(0, synthCtxRef.current.currentTime);
      } catch { /* ignore */ }
    }
    setIsLiveSynthesizerActive(false);
  };

  // --- HTML5 Audio Engine ---
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.volume = isMuted ? 0 : volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || currentTrack.duration);
    };

    const handleEnded = () => {
      handleNextTrack();
    };

    const handleError = () => {
      // Audio source failed / blocked by CORS: gracefully rely on Web Audio Synth!
      console.log("Using Web Audio synthesized player for:", currentTrack.title);
      startSynthMelody(currentTrack);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      stopSynthMelody();
      if (synthCtxRef.current) {
        synthCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Sync volume with both Audio element and Synth
  useEffect(() => {
    const effectiveVol = isMuted ? 0 : volume;
    if (audioRef.current) {
      audioRef.current.volume = effectiveVol;
    }
    if (synthGainRef.current && synthCtxRef.current) {
      synthGainRef.current.gain.setValueAtTime(effectiveVol * 0.15, synthCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // Track change handler
  const loadAndPlayTrack = (track: Track, shouldPlay = true) => {
    stopSynthMelody();
    setCurrentTime(0);
    setDuration(track.duration);

    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.currentTime = 0;
      if (shouldPlay) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Browser autoplay policy or CORS blocked: start synth engine
              setIsPlaying(true);
              startSynthMelody(track);
            });
        }
      }
    }
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      stopSynthMelody();
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioRef.current.src) {
        const p = audioRef.current.play();
        if (p !== undefined) {
          p.then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(true);
            startSynthMelody(currentTrack);
          });
        }
      } else {
        loadAndPlayTrack(currentTrack, true);
      }
    }
  };

  // Track progress ticker when synth is active
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && isLiveSynthesizerActive) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isLiveSynthesizerActive, duration]);

  // Skip controls
  const handleNextTrack = () => {
    if (repeatMode === "one") {
      loadAndPlayTrack(currentTrack, true);
      return;
    }
    let nextIdx = currentTrackIndex + 1;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * filteredTracks.length);
    } else if (nextIdx >= filteredTracks.length) {
      nextIdx = 0;
    }
    setCurrentTrackIndex(nextIdx);
    loadAndPlayTrack(filteredTracks[nextIdx], true);
  };

  const handlePrevTrack = () => {
    if (currentTime > 4) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    let prevIdx = currentTrackIndex - 1;
    if (prevIdx < 0) {
      prevIdx = filteredTracks.length - 1;
    }
    setCurrentTrackIndex(prevIdx);
    loadAndPlayTrack(filteredTracks[prevIdx], true);
  };

  // Toggle Like Track
  const toggleLike = (trackId: string) => {
    setLikedTrackIds((prev) => {
      const next = new Set(prev);
      if (next.has(trackId)) {
        next.delete(trackId);
      } else {
        next.add(trackId);
      }
      return next;
    });
  };

  // Scrubber / Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Copy share link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Dynamic Background Gradient based on category
  const gradientClass = useMemo(() => {
    switch (currentTrack.category) {
      case "gujarati":
        return "from-amber-900/60 via-[#181818] to-[#121212]";
      case "coding":
        return "from-emerald-950/70 via-[#181818] to-[#121212]";
      case "chill":
        return "from-indigo-950/70 via-[#181818] to-[#121212]";
      case "bollywood":
        return "from-rose-950/60 via-[#181818] to-[#121212]";
      default:
        return "from-zinc-900 via-[#181818] to-[#121212]";
    }
  }, [currentTrack]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#1DB954] selection:text-black font-sans pb-28 pt-20 sm:pt-24 px-2 sm:px-6">
      {/* Outer Spotify Desktop App Shell */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-3 h-[calc(100vh-160px)] min-h-[640px]">
        {/* ========================================================
            LEFT SIDEBAR: Spotify Branding, Nav & Library Playlists
           ======================================================== */}
        <aside className="hidden lg:flex flex-col w-72 shrink-0 gap-2 select-none">
          {/* Main Navigation Card */}
          <div className="bg-[#121212] rounded-xl p-4 flex flex-col gap-4 border border-zinc-800/40">
            {/* Spotify Brand */}
            <div className="flex items-center gap-2 px-2 py-1">
              <IconBrandSpotify className="w-8 h-8 text-[#1DB954] animate-pulse" />
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Spotify
                <span className="text-[10px] uppercase font-semibold bg-[#1DB954]/20 text-[#1DB954] px-1.5 py-0.5 rounded-full">
                  App
                </span>
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 text-sm font-semibold">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setCurrentPlaylist(PLAYLISTS[0]);
                  setViewMode("list");
                }}
                className="flex items-center gap-4 px-3 py-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors text-left"
              >
                <Music className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                Home
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById("spotify-search-input");
                  if (input) input.focus();
                }}
                className="flex items-center gap-4 px-3 py-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors text-left"
              >
                <Search className="w-5 h-5 text-zinc-400" />
                Search
              </button>
              <button
                onClick={() => setViewMode(viewMode === "embed" ? "list" : "embed")}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors text-left"
              >
                <span className="flex items-center gap-4">
                  <Radio className="w-5 h-5 text-[#1DB954]" />
                  Spotify Web Player
                </span>
                <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                  {viewMode === "embed" ? "ON" : "OFF"}
                </span>
              </button>
            </nav>
          </div>

          {/* Your Library Card */}
          <div className="bg-[#121212] rounded-xl flex-1 p-3 flex flex-col border border-zinc-800/40 overflow-hidden">
            <div className="flex items-center justify-between px-2 py-2 text-zinc-400">
              <div className="flex items-center gap-2 font-semibold text-sm hover:text-white transition cursor-pointer">
                <ListMusic className="w-5 h-5" />
                <span>Your Library</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-medium bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                  {PLAYLISTS.length} Playlists
                </span>
              </div>
            </div>

            {/* Playlists list */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 mt-2 scrollbar-thin scrollbar-thumb-zinc-700">
              {PLAYLISTS.map((pl) => {
                const isActive = currentPlaylist.id === pl.id;
                return (
                  <button
                    key={pl.id}
                    onClick={() => {
                      setCurrentPlaylist(pl);
                      setSelectedCategory(pl.filter);
                      setCurrentTrackIndex(0);
                    }}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all ${
                      isActive
                        ? "bg-zinc-800/90 text-white shadow-sm"
                        : "hover:bg-zinc-800/40 text-zinc-300 hover:text-white"
                    }`}
                  >
                    <div className="w-11 h-11 rounded-md overflow-hidden bg-zinc-800 shrink-0 relative flex items-center justify-center text-lg font-bold">
                      {pl.coverUrl ? (
                        <Image
                          src={pl.coverUrl}
                          alt={pl.name}
                          width={44}
                          height={44}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{pl.icon}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-semibold truncate ${isActive ? "text-[#1DB954]" : "text-white"}`}>
                        {pl.name}
                      </p>
                      <p className="text-xs text-zinc-400 truncate">
                        Playlist • {pl.creator}
                      </p>
                    </div>
                    {isActive && isPlaying && (
                      <div className="flex items-center gap-0.5 shrink-0 pr-1">
                        <span className="w-1 h-3 bg-[#1DB954] rounded-full animate-bounce" />
                        <span className="w-1 h-4 bg-[#1DB954] rounded-full animate-bounce [animation-delay:0.15s]" />
                        <span className="w-1 h-2 bg-[#1DB954] rounded-full animate-bounce [animation-delay:0.3s]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Curator profile badge */}
            <div className="mt-2 pt-2 border-t border-zinc-800/60 flex items-center gap-3 px-2">
              <div className="relative">
                <Image
                  src="/hero/vivek-profile.png"
                  alt="Vivek Hingu"
                  width={34}
                  height={34}
                  className="w-8 h-8 rounded-full border border-[#1DB954]/50 object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#1DB954] rounded-full border-2 border-[#121212]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate flex items-center gap-1">
                  Vivek Hingu
                  <span className="w-3 h-3 text-[#1DB954]">✓</span>
                </p>
                <p className="text-[10px] text-zinc-400">Verified Spotify Curator</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================
            MAIN PANEL: Dynamic Hero, Search, Filter Pills & Songs Table
           ======================================================== */}
        <main className={`flex-1 rounded-xl bg-gradient-to-b ${gradientClass} border border-zinc-800/50 flex flex-col overflow-hidden relative shadow-2xl`}>
          {/* Top Bar Header with Search & Filter Controls */}
          <div className="sticky top-0 z-20 backdrop-blur-md bg-black/40 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 border-b border-zinc-800/40">
            {/* Left navigation arrows & search bar */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-xl">
              <div className="hidden sm:flex items-center gap-1.5 text-zinc-400">
                <button
                  onClick={handlePrevTrack}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black flex items-center justify-center text-white transition"
                  title="Previous Track"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextTrack}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black flex items-center justify-center text-white transition"
                  title="Next Track"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="spotify-search-input"
                  type="text"
                  placeholder="What do you want to play? (Song, artist, genre)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] text-sm text-white placeholder-zinc-400 rounded-full pl-9 pr-8 py-2 border border-transparent focus:border-zinc-600 outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-2">
              {/* Lyrics Toggle */}
              <button
                onClick={() => setViewMode(viewMode === "lyrics" ? "list" : "lyrics")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  viewMode === "lyrics"
                    ? "bg-[#1DB954] text-black border-[#1DB954]"
                    : "bg-black/40 text-zinc-300 border-zinc-700/60 hover:text-white hover:border-zinc-500"
                }`}
              >
                <Mic2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lyrics</span>
              </button>

              {/* Spotify Embed Toggle */}
              <button
                onClick={() => setViewMode(viewMode === "embed" ? "list" : "embed")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  viewMode === "embed"
                    ? "bg-[#1DB954] text-black border-[#1DB954]"
                    : "bg-black/40 text-zinc-300 border-zinc-700/60 hover:text-white hover:border-zinc-500"
                }`}
              >
                <IconBrandSpotify className="w-4 h-4" />
                <span className="hidden sm:inline">Spotify Player</span>
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="w-8 h-8 rounded-full bg-black/40 border border-zinc-700/60 flex items-center justify-center text-zinc-300 hover:text-white transition"
                title="Share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-[#1DB954]" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Scrollable Main Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-700">
            {/* View Mode 1: Spotify Embed Mode */}
            {viewMode === "embed" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-zinc-900/80 p-4 rounded-xl border border-zinc-800">
                  <div>
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      <IconBrandSpotify className="w-5 h-5 text-[#1DB954]" />
                      Official Spotify Player Embed
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Stream directly from Vivek Hingu&apos;s heavy rotation on Spotify.
                    </p>
                  </div>
                  <button
                    onClick={() => setViewMode("list")}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-semibold transition"
                  >
                    Switch to Interactive App Player
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                  <iframe
                    title="Spotify Web Player"
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUfTFmZeeg?utm_source=generator&theme=0"
                    width="100%"
                    height="480"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full rounded-xl bg-[#121212]"
                  />
                </div>
              </div>
            ) : viewMode === "lyrics" ? (
              /* View Mode 2: Fullscreen Lyrics Mode */
              <div className="max-w-2xl mx-auto py-8 text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <Image
                    src={currentTrack.coverUrl}
                    alt={currentTrack.title}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-lg shadow-lg object-cover"
                  />
                  <div className="text-left">
                    <h2 className="text-lg font-bold text-white">{currentTrack.title}</h2>
                    <p className="text-sm text-zinc-400">{currentTrack.artist}</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {currentTrack.lyrics.map((line, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`text-xl sm:text-2xl font-bold cursor-pointer transition-all duration-300 ${
                        idx === 1
                          ? "text-white scale-105"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setViewMode("list")}
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold transition"
                  >
                    Back to Track List
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode 3: Spotify Standard Playlist & Tracklist View */
              <>
                {/* Playlist Hero Banner */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 pb-2">
                  <div className="relative group w-44 h-44 sm:w-52 sm:h-52 shrink-0 rounded-lg overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.7)] bg-zinc-900">
                    <Image
                      src={currentPlaylist.coverUrl || currentTrack.coverUrl}
                      alt={currentPlaylist.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs bg-black/70 px-2 py-1 rounded text-white">
                        Curated Playlist
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-center sm:text-left flex-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center justify-center sm:justify-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#1DB954]" />
                      Public Playlist
                    </span>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white truncate">
                      {currentPlaylist.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2">
                      {currentPlaylist.description}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-zinc-300 pt-1">
                      <span className="font-bold text-white flex items-center gap-1">
                        Vivek Hingu
                        <span className="text-[#1DB954]">✓</span>
                      </span>
                      <span>•</span>
                      <span>{filteredTracks.length} songs</span>
                      <span>•</span>
                      <span className="text-zinc-400">about 48 min</span>
                      <span>•</span>
                      <span className="text-[#1DB954] font-semibold">492,810 saves</span>
                    </div>
                  </div>
                </div>

                {/* Playlist Action Bar */}
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="flex items-center gap-4">
                    {/* Big Spotify Green Play Button */}
                    <button
                      onClick={togglePlay}
                      className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition duration-200"
                      title={isPlaying ? "Pause" : "Play Playlist"}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-black" />
                      ) : (
                        <Play className="w-6 h-6 fill-black ml-1" />
                      )}
                    </button>

                    {/* Shuffle toggle */}
                    <button
                      onClick={() => setIsShuffle(!isShuffle)}
                      className={`p-2 rounded-full transition ${
                        isShuffle ? "text-[#1DB954]" : "text-zinc-400 hover:text-white"
                      }`}
                      title="Shuffle"
                    >
                      <Shuffle className="w-6 h-6" />
                    </button>

                    {/* Like Playlist */}
                    <button
                      onClick={() => toggleLike("current-playlist")}
                      className={`p-2 rounded-full transition ${
                        likedTrackIds.has("current-playlist")
                          ? "text-[#1DB954]"
                          : "text-zinc-400 hover:text-white"
                      }`}
                      title="Save to Your Library"
                    >
                      <Heart
                        className={`w-7 h-7 ${
                          likedTrackIds.has("current-playlist") ? "fill-[#1DB954]" : ""
                        }`}
                      />
                    </button>

                    {/* External Spotify Link */}
                    <a
                      href={currentTrack.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-zinc-400 hover:text-white transition"
                      title="Open in Spotify App"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Category Filter Chips */}
                  <div className="hidden md:flex items-center gap-1.5 bg-black/30 p-1 rounded-full border border-zinc-800/60">
                    {[
                      { key: "all", label: "All Songs" },
                      { key: "bollywood", label: "Bollywood" },
                      { key: "gujarati", label: "Gujarati Pop" },
                      { key: "coding", label: "AI & Coding" },
                      { key: "chill", label: "Lofi & Chill" },
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key as TrackCategory)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                          selectedCategory === cat.key
                            ? "bg-white text-black shadow"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tracklist Table */}
                <div className="w-full">
                  {/* Table Header */}
                  <div className="grid grid-cols-[16px_1fr_40px] sm:grid-cols-[24px_4fr_3fr_2fr_60px] gap-4 px-4 py-2 border-b border-zinc-800/80 text-xs font-bold text-zinc-400 uppercase tracking-wider select-none">
                    <span className="text-center">#</span>
                    <span>Title</span>
                    <span className="hidden sm:block">Album</span>
                    <span className="hidden sm:block">Date Added</span>
                    <span className="flex justify-end">
                      <Clock className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Track rows */}
                  <div className="space-y-0.5 mt-2">
                    {filteredTracks.length === 0 ? (
                      <div className="py-12 text-center text-zinc-500 text-sm">
                        No songs found matching &ldquo;{searchQuery}&rdquo;. Try another search!
                      </div>
                    ) : (
                      filteredTracks.map((track, index) => {
                        const isThisPlaying = currentTrack.id === track.id && isPlaying;
                        const isSelected = currentTrack.id === track.id;
                        const isLiked = likedTrackIds.has(track.id);

                        return (
                          <div
                            key={track.id}
                            onDoubleClick={() => {
                              setCurrentTrackIndex(index);
                              loadAndPlayTrack(track, true);
                            }}
                            className={`group grid grid-cols-[16px_1fr_40px] sm:grid-cols-[24px_4fr_3fr_2fr_60px] gap-4 px-4 py-2.5 rounded-lg items-center cursor-pointer transition-all duration-150 ${
                              isSelected
                                ? "bg-zinc-800/80"
                                : "hover:bg-zinc-800/40"
                            }`}
                          >
                            {/* Track number / play icon / equalizer */}
                            <div className="flex items-center justify-center text-sm">
                              {isThisPlaying ? (
                                <div className="flex items-center gap-0.5">
                                  <span className="w-0.5 h-3 bg-[#1DB954] rounded-full animate-bounce" />
                                  <span className="w-0.5 h-4 bg-[#1DB954] rounded-full animate-bounce [animation-delay:0.15s]" />
                                  <span className="w-0.5 h-2.5 bg-[#1DB954] rounded-full animate-bounce [animation-delay:0.3s]" />
                                </div>
                              ) : (
                                <>
                                  <span className="group-hover:hidden text-xs text-zinc-400 font-medium">
                                    {index + 1}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (isSelected) {
                                        togglePlay();
                                      } else {
                                        setCurrentTrackIndex(index);
                                        loadAndPlayTrack(track, true);
                                      }
                                    }}
                                    className="hidden group-hover:flex items-center justify-center text-white"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-white" />
                                  </button>
                                </>
                              )}
                            </div>

                            {/* Title & Artist & Thumbnail */}
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-zinc-800 relative">
                                <Image
                                  src={track.coverUrl}
                                  alt={track.title}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p
                                  className={`text-sm font-semibold truncate transition ${
                                    isSelected
                                      ? "text-[#1DB954]"
                                      : "text-white group-hover:text-white"
                                  }`}
                                >
                                  {track.title}
                                </p>
                                <p className="text-xs text-zinc-400 truncate group-hover:text-zinc-300">
                                  {track.artist}
                                </p>
                              </div>
                            </div>

                            {/* Album */}
                            <div className="hidden sm:block text-xs text-zinc-400 truncate group-hover:text-zinc-300">
                              {track.album}
                            </div>

                            {/* Date added */}
                            <div className="hidden sm:block text-xs text-zinc-400 truncate">
                              {track.addedDate}
                            </div>

                            {/* Actions & Duration */}
                            <div className="flex items-center justify-end gap-2 text-xs text-zinc-400">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLike(track.id);
                                }}
                                className={`p-1 transition ${
                                  isLiked
                                    ? "text-[#1DB954]"
                                    : "text-zinc-400 group-hover:text-white opacity-0 group-hover:opacity-100"
                                }`}
                                title="Like"
                              >
                                <Heart
                                  className={`w-4 h-4 ${isLiked ? "fill-[#1DB954]" : ""}`}
                                />
                              </button>
                              <span className="font-mono text-zinc-400 group-hover:text-zinc-200">
                                {track.durationFormatted}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* ========================================================
          BOTTOM PERSISTENT PLAYER BAR: Spotify Web Player Experience
         ======================================================== */}
      <footer className="fixed bottom-0 inset-x-0 h-24 bg-[#181818]/95 backdrop-blur-xl border-t border-zinc-800/80 z-[6000] px-4 sm:px-6 flex items-center justify-between shadow-2xl">
        {/* Left Section: Current Song Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-[180px] max-w-[280px]">
          <div className="relative group w-14 h-14 rounded-md overflow-hidden bg-zinc-800 shrink-0 shadow-md">
            <Image
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setViewMode(viewMode === "lyrics" ? "list" : "lyrics")}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
              title="View Lyrics"
            >
              <Mic2 className="w-5 h-5" />
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">
              {currentTrack.title}
            </p>
            <p className="text-xs text-zinc-400 truncate hover:underline cursor-pointer">
              {currentTrack.artist}
            </p>
          </div>

          <button
            onClick={() => toggleLike(currentTrack.id)}
            className={`p-1.5 transition ${
              likedTrackIds.has(currentTrack.id)
                ? "text-[#1DB954]"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Save to Your Library"
          >
            <Heart
              className={`w-5 h-5 ${
                likedTrackIds.has(currentTrack.id) ? "fill-[#1DB954]" : ""
              }`}
            />
          </button>
        </div>

        {/* Center Section: Player Controls & Scrubbing Bar */}
        <div className="flex flex-col items-center gap-1.5 w-2/4 max-w-xl">
          {/* Main Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Shuffle */}
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`relative transition ${
                isShuffle ? "text-[#1DB954]" : "text-zinc-400 hover:text-white"
              }`}
              title="Enable shuffle"
            >
              <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
              {isShuffle && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1DB954] rounded-full" />
              )}
            </button>

            {/* Previous */}
            <button
              onClick={handlePrevTrack}
              className="text-zinc-300 hover:text-white transition"
              title="Previous"
            >
              <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </button>

            {/* Play / Pause button */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:scale-105 active:scale-95 text-black flex items-center justify-center transition shadow-lg"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-black" />
              ) : (
                <Play className="w-5 h-5 fill-black ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={handleNextTrack}
              className="text-zinc-300 hover:text-white transition"
              title="Next"
            >
              <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </button>

            {/* Repeat */}
            <button
              onClick={() => {
                if (repeatMode === "off") setRepeatMode("all");
                else if (repeatMode === "all") setRepeatMode("one");
                else setRepeatMode("off");
              }}
              className={`relative transition ${
                repeatMode !== "off" ? "text-[#1DB954]" : "text-zinc-400 hover:text-white"
              }`}
              title="Repeat"
            >
              {repeatMode === "one" ? (
                <Repeat1 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              {repeatMode !== "off" && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1DB954] rounded-full" />
              )}
            </button>
          </div>

          {/* Scrubber seek bar */}
          <div className="w-full flex items-center gap-2 text-xs text-zinc-400 font-mono select-none">
            <span className="w-10 text-right">{formatTime(currentTime)}</span>
            <div className="relative flex-1 flex items-center group">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#1DB954] group-hover:h-1.5 transition-all"
              />
            </div>
            <span className="w-10 text-left">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Section: Lyrics, Queue, Connect, Volume */}
        <div className="hidden sm:flex items-center justify-end gap-3 w-1/4 min-w-[180px]">
          {/* Lyrics mode toggle */}
          <button
            onClick={() => setViewMode(viewMode === "lyrics" ? "list" : "lyrics")}
            className={`p-1.5 transition ${
              viewMode === "lyrics" ? "text-[#1DB954]" : "text-zinc-400 hover:text-white"
            }`}
            title="Lyrics"
          >
            <Mic2 className="w-4 h-4" />
          </button>

          {/* Queue toggle */}
          <button
            onClick={() => setShowQueue(!showQueue)}
            className={`p-1.5 transition ${
              showQueue ? "text-[#1DB954]" : "text-zinc-400 hover:text-white"
            }`}
            title="Queue"
          >
            <ListMusic className="w-4 h-4" />
          </button>

          {/* Connect to device */}
          <button
            onClick={() => setShowDeviceModal(!showDeviceModal)}
            className="text-zinc-400 hover:text-white p-1.5 transition relative"
            title="Connect to a device"
          >
            <Laptop2 className="w-4 h-4 text-[#1DB954]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#1DB954] rounded-full animate-ping" />
          </button>

          {/* Volume control */}
          <div className="flex items-center gap-2 group w-28">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-zinc-400 group-hover:text-white transition"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#1DB954] group-hover:h-1.5 transition-all"
            />
          </div>
        </div>
      </footer>

      {/* ========================================================
          QUEUE MODAL / DRAWER
         ======================================================== */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-4 bottom-28 w-80 max-h-96 bg-[#181818]/95 backdrop-blur-xl border border-zinc-700/80 rounded-xl p-4 shadow-2xl z-[7000] overflow-y-auto space-y-3"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-[#1DB954]" />
                Play Queue
              </h4>
              <button
                onClick={() => setShowQueue(false)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Now Playing</p>
              <div className="flex items-center gap-3 p-2 bg-zinc-800/60 rounded-lg mt-1">
                <Image
                  src={currentTrack.coverUrl}
                  alt={currentTrack.title}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#1DB954] truncate">{currentTrack.title}</p>
                  <p className="text-[10px] text-zinc-400 truncate">{currentTrack.artist}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Next In Queue</p>
              <div className="space-y-1 mt-1">
                {filteredTracks.slice(currentTrackIndex + 1, currentTrackIndex + 6).map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentTrackIndex(currentTrackIndex + 1 + i);
                      loadAndPlayTrack(t, true);
                    }}
                    className="w-full flex items-center gap-2.5 p-1.5 rounded hover:bg-zinc-800/40 text-left transition"
                  >
                    <span className="text-[10px] text-zinc-500 w-3">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-300 font-medium truncate">{t.title}</p>
                      <p className="text-[10px] text-zinc-500 truncate">{t.artist}</p>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">{t.durationFormatted}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          SPOTIFY CONNECT DEVICE MODAL
         ======================================================== */}
      <AnimatePresence>
        {showDeviceModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed right-6 bottom-28 w-72 bg-[#181818]/95 backdrop-blur-xl border border-zinc-700/80 rounded-xl p-4 shadow-2xl z-[7000] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Laptop2 className="w-4 h-4 text-[#1DB954]" />
                Connect to a device
              </h4>
              <button
                onClick={() => setShowDeviceModal(false)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2.5 bg-zinc-800/80 rounded-lg border border-[#1DB954]/40">
                <Laptop2 className="w-5 h-5 text-[#1DB954] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#1DB954]">This Web Browser</p>
                  <p className="text-[10px] text-zinc-400">High Fidelity 320kbps • Audio Engine Active</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-zinc-800/40 opacity-60">
                <Radio className="w-5 h-5 text-zinc-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white">Vivek&apos;s AirDrop / Headphones</p>
                  <p className="text-[10px] text-zinc-500">Spotify Connect Ready</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
