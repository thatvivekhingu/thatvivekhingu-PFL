"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft,
  IconArrowUp,
  IconBrandYoutube,
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheckFilled,
  IconMapPin,
  IconCode,
  IconTerminal2,
  IconBrandWhatsapp,
  IconPlayerPlayFilled,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconFlame,
  IconCoffee,
  IconSparkles,
  IconCrown,
  IconArrowDown,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { InstagramCard, LinkedInCard, GitHubCard } from "@/components/social-cards";

interface VideoItem {
  id: string;
  artist: string;
  title: string;
  category: "music" | "hasya" | "veer-ras" | "jugalbandhi";
  categoryLabel: string;
  youtubeId: string;
  thumbnail: string;
}

const CHAI_SPOTS = [
  {
    id: "nikol",
    name: "Tea Post — Nikol",
    gujjuName: "ટી પોસ્ટ — નિકોલ",
    location: "Raspan Arcade, Nikol",
    mapsUrl: "https://maps.app.goo.gl/mwWKYR9xQxzmoBR6A",
    image: "/teapost/nikol.jpg",
    badge: "KADAK • MASALA",
    footer: "DESI POWER",
    bgColor: "bg-[#ea580c]", // Warm Orange
    textColor: "text-white",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Nikol પર મળીએ ને આઈડિયા ડિસ્કસ કરીએ ☕",
  },
  {
    id: "science-city",
    name: "Tea Post — Science City",
    gujjuName: "ટી પોસ્ટ — સાયન્સ સીટી",
    location: "Science City Road, Sola",
    mapsUrl: "https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5",
    image: "/teapost/science-city.png",
    badge: "CODE • BRAINSTORM",
    footer: "AI MATRIX",
    bgColor: "bg-[#0284c7]", // Electric Blue
    textColor: "text-white",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Science City પર મળીએ ને AI / Tech ડિસ્કસ કરીએ ☕",
  },
  {
    id: "maninagar",
    name: "Tea Post — Maninagar",
    gujjuName: "ટી પોસ્ટ — મણિનગર",
    location: "Near Kankaria Lake",
    mapsUrl: "https://maps.app.goo.gl/XQgNsuKokUm7CuBq8",
    image: "/teapost/maninagar.png",
    badge: "CHILL • KANKARIA",
    footer: "CALM VIBES",
    bgColor: "bg-[#16a34a]", // Emerald Green
    textColor: "text-white",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Maninagar પર મળીએ ને કૉલેબોરેશન કરીએ ☕",
  },
  {
    id: "sghighway",
    name: "Tea Post — SG Highway",
    gujjuName: "ટી પોસ્ટ — એસ.જી. હાઈવે",
    location: "Prahlad Nagar / SG Highway",
    mapsUrl: "https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5",
    image: "/teapost/science-city.png",
    badge: "STARTUP • HUB",
    footer: "HIGH VOLTAGE",
    bgColor: "bg-[#eab308]", // Vibrant Yellow (Not Red!)
    textColor: "text-zinc-950",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post SG Highway પર મળીએ ☕",
  },
];

const GUJJU_DICTIONARY = [
  {
    term: "Bug (બગ)",
    gujju: "લોચો",
    desc: "કોડે કરેલી એવી ભૂલ જે આખી રાત ઊંઘ ના આવવા દે!",
    emoji: "🐛",
  },
  {
    term: "Debugging",
    gujju: "ફોડ પાડવો",
    desc: "કોડમાં ક્યાં લોચો થયો છે એ ખોળી કાઢીને ફિક્સ કરવું.",
    emoji: "🔍",
  },
  {
    term: "Merge Conflict",
    gujju: "ગોટો વળવો",
    desc: "બે જણાએ એક જ ફાઈલમાં હાથ નાખ્યો ને પંચાયત થઈ!",
    emoji: "⚡",
  },
  {
    term: "Client Meeting",
    gujju: "ચોરે પંચાત",
    desc: "જે વાત ૫ મિનિટમાં પતી જતી હોય એને ૨ કલાક ખેંચવી.",
    emoji: "💼",
  },
  {
    term: "Production Deploy",
    gujju: "શ્રી ગણેશ / ભગવાન ભરોસે",
    desc: "ચાલ્યું તો મોજ અને ના ચાલ્યું તો 'આપણે જોઈ લઈશું'!",
    emoji: "🚀",
  },
  {
    term: "Stack Overflow",
    gujju: "સંજય દ્રષ્ટિ",
    desc: "જ્યાં દુનિયાના તમામ કોડિંગ લોચાના દેશી ઉપાય મળી જાય.",
    emoji: "💡",
  },
];

const GUJJU_RULES = [
  {
    num: "01",
    title: "Morning Fuel",
    gujjuTitle: "સવારનો કડક નિયમ",
    desc: "કડક કટિંગ ચા અને ગાંઠિયા વગર મગજનું CPU સ્ટાર્ટ નથી થતું.",
    icon: "☕",
  },
  {
    num: "02",
    title: "Business Ethos",
    gujjuTitle: "વેપારનો સોનેરી નિયમ",
    desc: "ક્લાયન્ટને હંમેશા સમય પહેલા ડિલિવરી આપવી — પાકો વેપાર છે.",
    icon: "🤝",
  },
  {
    num: "03",
    title: "Clean Logic",
    gujjuTitle: "કોડિંગનો નિયમ",
    desc: "કોડ ભલે ગમે તેટલો મોટો હોય, લોજિક પાણી જેવું ચોખ્ખું હોવું જોઈએ.",
    icon: "💻",
  },
  {
    num: "04",
    title: "Jalsa Balance",
    gujjuTitle: "મોજનો નિયમ",
    desc: "કામ સાથે ડાયરો, હાસ્ય અને પરિવાર સાથે મોજ કાયમ રહેવી જોઈએ!",
    icon: "🎉",
  },
];

const ALL_DAYRO_VIDEOS: VideoItem[] = [
  {
    id: "gopal-sadhu-lokgeet",
    artist: "ગોપાલ સાધુ",
    title: "લોકગીતો ની જોરદાર જમાવટ (જીનમ ડાયરો લાઈવ)",
    category: "music",
    categoryLabel: "લોક ગીત",
    youtubeId: "K_ehyAc0TmU",
    thumbnail: "https://img.youtube.com/vi/K_ehyAc0TmU/hqdefault.jpg",
  },
  {
    id: "aditya-raj-jugalbandhi",
    artist: "આદિત્ય ગઢવી & રાજ ગઢવી",
    title: "ડાયરામાં પહેલીવાર આ જુગલબંધી 🔥 (બોટાદ લાઈવ ડાયરો)",
    category: "jugalbandhi",
    categoryLabel: "મહા જુગલબંધી",
    youtubeId: "ZDW9SoRQi8A",
    thumbnail: "https://img.youtube.com/vi/ZDW9SoRQi8A/hqdefault.jpg",
  },
  {
    id: "rajdan-gadhvi-vadodara",
    artist: "રાજદાન ગઢવી",
    title: "સુપર હિટ લોકડાયરો & સાહિત્ય (વડોદરા લાઈવ ડાયરો)",
    category: "music",
    categoryLabel: "લોક સાહિત્ય",
    youtubeId: "qW1ss5bq90A",
    thumbnail: "https://img.youtube.com/vi/qW1ss5bq90A/hqdefault.jpg",
  },
  {
    id: "kirtidan-kanudo",
    artist: "કીર્તિદાન ગઢવી",
    title: "દેશી તાલે કાનુડાના ગીતો & રાસ (લાઈવ ગરબા & સૂર)",
    category: "music",
    categoryLabel: "લોક સંગીત",
    youtubeId: "KpFUjNxGCbo",
    thumbnail: "https://img.youtube.com/vi/KpFUjNxGCbo/hqdefault.jpg",
  },
  {
    id: "kirtidan-rasiyo",
    artist: "કીર્તિદાન ગઢવી",
    title: "રસિયો રૂપાળો રંગરેલીયો (વેજાગામ લાઈવ સંગીત)",
    category: "music",
    categoryLabel: "લોક સંગીત",
    youtubeId: "_IMnebRMPcY",
    thumbnail: "https://img.youtube.com/vi/_IMnebRMPcY/hqdefault.jpg",
  },
  {
    id: "kirtidan-dakor",
    artist: "કીર્તિદાન ગઢવી",
    title: "ડાકોરના ઠાકોર (અમરેલી લાઈવ પોલીસ ડાયરો સંગીત)",
    category: "music",
    categoryLabel: "ભક્તિ સંગીત",
    youtubeId: "w3O3aikm4xM",
    thumbnail: "https://img.youtube.com/vi/w3O3aikm4xM/hqdefault.jpg",
  },
  {
    id: "mayabhai-badhdati",
    artist: "માયાભાઈ આહીર",
    title: "હાસ્ય ની બધડાટી (હસવાની ૧૦૦% ગેરેંટી)",
    category: "hasya",
    categoryLabel: "હાસ્ય ડાયરો",
    youtubeId: "aE3_WjWz9tc",
    thumbnail: "https://img.youtube.com/vi/aE3_WjWz9tc/hqdefault.jpg",
  },
  {
    id: "sairam-hasya-varsad",
    artist: "સાંઈરામ દવે",
    title: "નોન-સ્ટોપ હાસ્યનો વરસાદ (હાસ્ય દરબાર)",
    category: "hasya",
    categoryLabel: "હાસ્ય દરબાર",
    youtubeId: "9N4--Ldqhuc",
    thumbnail: "https://img.youtube.com/vi/9N4--Ldqhuc/hqdefault.jpg",
  },
  {
    id: "hitesh-antala-jokes",
    artist: "હિતેશ અંટાળા",
    title: "સાવ નવા જથ્થાબંધ જોક્સ & હાસ્ય મહેફિલ",
    category: "hasya",
    categoryLabel: "હાસ્ય ડાયરો",
    youtubeId: "f2vHjuiIpqQ",
    thumbnail: "https://img.youtube.com/vi/f2vHjuiIpqQ/hqdefault.jpg",
  },
  {
    id: "dhirubhai-vandripanu",
    artist: "ધીરૂભાઈ સરવૈયા",
    title: "વાંદરીપાનું — સુપરહિટ દેશી જોક્સ",
    category: "hasya",
    categoryLabel: "દેશી રમૂજ",
    youtubeId: "FEZPU-4lMo8",
    thumbnail: "https://img.youtube.com/vi/FEZPU-4lMo8/hqdefault.jpg",
  },
  {
    id: "dhirubhai-lagan-hapta",
    artist: "ધીરૂભાઈ સરવૈયા",
    title: "લગન કરો હપ્તા ભરો (Lagan Karo Hapta Bharo)",
    category: "hasya",
    categoryLabel: "દેશી રમૂજ",
    youtubeId: "p7pA36rZJiw",
    thumbnail: "https://img.youtube.com/vi/p7pA36rZJiw/hqdefault.jpg",
  },
  {
    id: "jitubhai-doshi-jeans",
    artist: "જીતુભાઈ દ્વારકાવાળા",
    title: "ડોશીનું જીન્સ (Doshi Nu Jeans Comedy)",
    category: "hasya",
    categoryLabel: "હાસ્ય ડાયરો",
    youtubeId: "6LWx0N_MCZU",
    thumbnail: "https://img.youtube.com/vi/6LWx0N_MCZU/hqdefault.jpg",
  },
  {
    id: "kirtidan-rajbha-jugalbandhi",
    artist: "કીર્તિદાન ગઢવી & રાજભા ગઢવી",
    title: "બેસ્ટ જુગલબંધી લોકડાયરો (રાપર કચ્છ લાઈવ)",
    category: "jugalbandhi",
    categoryLabel: "મહા જુગલબંધી",
    youtubeId: "i8POjs66f9g",
    thumbnail: "https://img.youtube.com/vi/i8POjs66f9g/hqdefault.jpg",
  },
  {
    id: "rajbha-kashtriya",
    artist: "રાજભા ગઢવી",
    title: "ક્ષત્રિયની વાત & રૂંવાડા ઊભા કરતો વીર રસ",
    category: "veer-ras",
    categoryLabel: "વીર રસ",
    youtubeId: "LlsYNC4l0GA",
    thumbnail: "https://img.youtube.com/vi/LlsYNC4l0GA/hqdefault.jpg",
  },
];

function InteractiveStampCard({ spot }: { spot: (typeof CHAI_SPOTS)[0] }) {
  const photoRef = useRef<HTMLDivElement>(null);
  const [lensState, setLensState] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setLensState({ x, y, active: true });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches[0]) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleLeave = () => {
    setLensState((prev) => ({ ...prev, active: false }));
  };

  return (
    <div className="rounded-2xl sm:rounded-[24px] bg-[#16171a] border border-[#25282f] p-2.5 sm:p-3.5 flex flex-row sm:flex-col justify-between items-center sm:items-stretch gap-3 sm:gap-3.5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 group">
      {/* POSTAGE STAMP FRAME (Exact Match to Reference Image) */}
      <div
        className={`relative ${spot.bgColor} w-24 h-28 sm:w-full sm:h-auto rounded-2xl p-2 sm:p-3.5 shrink-0 flex flex-col justify-between gap-1 sm:gap-2.5 overflow-hidden shadow-inner`}
      >
        {/* Top Scalloped Perforation Teeth */}
        <div className="absolute -top-1.5 sm:-top-2 left-0 right-0 flex justify-between px-1 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`t-${i}`}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#16171a] shadow-sm"
            />
          ))}
        </div>

        {/* Bottom Scalloped Perforation Teeth */}
        <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 right-0 flex justify-between px-1 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#16171a] shadow-sm"
            />
          ))}
        </div>

        {/* Left Scalloped Perforation Teeth */}
        <div className="absolute top-0 bottom-0 -left-1.5 sm:-left-2 flex flex-col justify-between py-1 pointer-events-none">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={`l-${i}`}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#16171a] shadow-sm"
            />
          ))}
        </div>

        {/* Right Scalloped Perforation Teeth */}
        <div className="absolute top-0 bottom-0 -right-1.5 sm:-right-2 flex flex-col justify-between py-1 pointer-events-none">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={`r-${i}`}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#16171a] shadow-sm"
            />
          ))}
        </div>

        {/* Stamp Top Header Bar: Black eyelet hole - Monospace code - Black eyelet hole */}
        <div className="flex items-center justify-between px-0.5 pt-0.5 sm:pt-1 z-10">
          <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#16171a] shadow-inner" />
          <span
            className={`font-mono text-[8px] sm:text-[11px] font-black tracking-wider sm:tracking-widest ${spot.textColor} uppercase drop-shadow-sm truncate`}
          >
            {spot.badge}
          </span>
          <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#16171a] shadow-inner" />
        </div>

        {/* Center Photo Container with 100% Crystal Clear Image */}
        <div
          ref={photoRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
          onMouseLeave={handleLeave}
          onTouchEnd={handleLeave}
          className="relative aspect-square sm:aspect-[4/3.8] w-full rounded-xl overflow-hidden bg-black border border-black/50 shadow-inner z-10 flex-1 select-none group/photo"
        >
          {/* Base 100% Crisp High-Resolution Image */}
          <Image
            src={spot.image}
            alt={spot.name}
            fill
            sizes="(max-width: 640px) 120px, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover/photo:scale-105 transition-transform duration-500"
          />

          {/* Interactive Subtle Glow Lens following Mouse/Touch */}
          {lensState.active && (
            <div
              className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 shadow-[0_0_24px_rgba(255,255,255,0.4)] pointer-events-none transition-transform duration-75"
              style={{
                left: `${lensState.x}px`,
                top: `${lensState.y}px`,
              }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
          <span className="hidden sm:flex absolute bottom-1.5 left-1.5 right-1.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm text-zinc-200 text-[9px] font-mono font-medium items-center gap-1 border border-zinc-800/60">
            <IconMapPin className="w-2.5 h-2.5 text-red-400 shrink-0" />
            <span className="truncate">{spot.location}</span>
          </span>
        </div>

        {/* Stamp Bottom Label */}
        <div className="text-center z-10 pb-0.5">
          <span
            className={`font-mono text-[7px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.28em] ${spot.textColor} drop-shadow-sm`}
          >
            {spot.footer}
          </span>
        </div>
      </div>

      {/* Card Content & Action Buttons */}
      <div className="flex-1 min-w-0 space-y-1.5 sm:space-y-2 w-full">
        <div className="space-y-0.5">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
              {spot.gujjuName}
            </h3>
            <span className="sm:hidden font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold shrink-0">
              TEA POST
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 truncate flex items-center gap-1">
            <IconMapPin className="w-3 h-3 text-red-400 shrink-0" />
            <span>{spot.location}</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-800/80">
          <a
            href={spot.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTapSound("pop")}
            className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors flex-1 sm:flex-initial"
          >
            <IconMapPin className="w-3 h-3 text-red-400" />
            <span>Maps</span>
          </a>

          <a
            href={`https://wa.me/918866688575?text=${encodeURIComponent(spot.whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTapSound("pop")}
            className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-[11px] font-mono font-bold transition-colors flex-1 sm:flex-initial"
          >
            <IconBrandWhatsapp className="w-3 h-3" />
            <span>મળવું છે?</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function GujjuversePage() {
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>("music");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const dayroScrollRef = useRef<HTMLDivElement>(null);

  const filteredVideos = ALL_DAYRO_VIDEOS.filter((v) => v.category === selectedVideoCategory);

  const handlePlayVideo = (video: VideoItem) => {
    playTapSound("pop");
    setActiveVideo(video);
  };

  const handleScroll = (direction: "left" | "right") => {
    playTapSound("hover");
    if (dayroScrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      dayroScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    playTapSound("pop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-white selection:text-black font-gujarati antialiased relative overflow-x-hidden pt-16 sm:pt-24 md:pt-32 pb-16">
      {/* Precision Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[350px] bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(255,255,255,0.04),rgba(0,0,0,0))] pointer-events-none -z-10" />

      {/* Video Modal Player - Pure Edge-to-Edge YouTube Cinema Mode */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              {/* Floating Sleek Close Button */}
              <button
                onClick={() => {
                  playTapSound("hover");
                  setActiveVideo(null);
                }}
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/80 hover:bg-zinc-800 border border-white/15 text-white transition-all cursor-pointer shadow-lg backdrop-blur-md"
                aria-label="Close video"
              >
                <IconX className="w-4 h-4" />
              </button>

              {/* Edge-to-Edge YouTube Player */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Sleek YouTube Style Bottom Info Strip */}
              <div className="px-4 py-3 bg-zinc-950/95 border-t border-white/[0.08] flex items-center justify-between gap-3">
                <div className="min-w-0 space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-100 truncate">
                    {activeVideo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <span className="font-medium text-zinc-300">{activeVideo.artist}</span>
                    <IconCircleCheckFilled className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{activeVideo.categoryLabel}</span>
                  </div>
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTapSound("pop")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-mono font-bold shrink-0 transition-colors"
                >
                  <IconBrandYoutube className="w-4 h-4 text-red-500" />
                  <span className="hidden sm:inline">YouTube</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 space-y-6 sm:space-y-10">
        {/* ========================================================
            1. FIGMA 2-COLUMN SPLIT HERO SECTION (KATHIYAWADI MAAR-FAAD EDITION)
            ======================================================== */}
        <BlurFade delay={0.02} inView>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center border-b border-zinc-800/80 pb-8 sm:pb-12">
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-6 text-left">
              {/* Top Royal Kathiyawadi Hook Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-rose-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <IconFlame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                  <span>કાઠિયાવાડ સ્પેશિયલ • 100% દેશી પાવર</span>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-800">
                  <IconCoffee className="w-3 h-3 text-amber-400" />
                  <span>અમદાવાદ ➔ સૌરાષ્ટ્ર</span>
                </span>
              </div>

              {/* Iconic Kathiyawadi Punchline Card */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900/90 to-zinc-950 border border-amber-500/30 shadow-[0_4px_30px_rgba(245,158,11,0.15)] backdrop-blur-md space-y-2 group hover:border-amber-500/60 transition-all duration-300">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
                  <IconCrown className="w-4 h-4 text-amber-400" />
                  <span>KATHIYAWADI PUNCHLINE</span>
                </div>
                <blockquote className="text-base sm:text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 leading-snug tracking-wide">
                  &ldquo;કાઠિયાવાડમાં જેમ ભગવાન પણ ભૂલા પડી જાય, તેમ આજે તમે પણ આ Gujjuverse માં ભૂલા પડી જશો!&rdquo;
                </blockquote>
              </div>

              {/* Bold Gujarati Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] font-black tracking-tight text-white leading-[1.18]">
                મોટાભાગના તગડા{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 drop-shadow-[0_4px_24px_rgba(245,158,11,0.35)]">
                  આઈડિયા ચાની કિટલી પર
                </span>{" "}
                જ બને છે!
              </h1>

              {/* Natural Gujarati Subtitle */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl font-normal">
                જ્યાં આર્ટિફિશિયલ ઇન્ટેલિજન્સ મળે છે અસલ કાઠિયાવાડી મોજ, કડક કટિંગ ચા અને રંગીલા લોકડાયરા સાથે. આવો પધારો, ચા પીતાં પીતાં મોજ કરો ને કંઈક નવું બનાવીએ!
              </p>

              {/* Desi Badges Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 font-medium">
                  ☕ કડક કટિંગ વાઈબ્સ
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 font-medium">
                  🚀 AI + Tech Innovation
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 font-medium">
                  🎭 રંગીલો લોકડાયરો
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#chai-spots"
                  onClick={() => playTapSound("pop")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/25 active:scale-95 cursor-pointer"
                >
                  <IconCoffee className="w-4 h-4 text-zinc-950" />
                  <span>ચાની કિટલીઓ (Tea Spots)</span>
                  <IconArrowDown className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#dayro-section"
                  onClick={() => playTapSound("pop")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-rose-500/30 hover:border-rose-500/60 text-xs font-bold text-rose-300 transition-all uppercase tracking-wider cursor-pointer shadow-md active:scale-95"
                >
                  <IconPlayerPlayFilled className="w-3.5 h-3.5 text-rose-500" />
                  <span>લોકડાયરો & હાસ્ય</span>
                </a>

                <Link
                  href="/#hero"
                  onClick={() => playTapSound("pop")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white transition-all uppercase tracking-wider group cursor-pointer shadow-md"
                >
                  <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to Hero</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Card Column: Framed Cyber Tapri Looping Video Card */}
            <div className="lg:col-span-6 xl:col-span-6 relative">
              {/* Ambient Warm Orange Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-rose-500/15 rounded-[32px] blur-3xl pointer-events-none -z-10" />

              <div className="relative w-full aspect-[4/3] sm:aspect-[1.25/1] rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-zinc-950 group">
                {/* Floating Live Tag */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold tracking-wider shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>CYBER TAPRI • LIVE ON AIR</span>
                  </span>
                </div>

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover rounded-2xl sm:rounded-3xl transition-transform duration-700 group-hover:scale-105"
                >
                  <source src="/gujjuverse-banner.mp4" type="video/mp4" />
                </video>

                {/* Bottom Floating Location Ribbon */}
                <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
                  <span className="flex items-center gap-1 text-amber-300 font-semibold">
                    <IconMapPin className="w-3.5 h-3.5 text-red-400" />
                    Nikol • Science City • Maninagar
                  </span>
                  <span className="text-zinc-400 text-[11px] hidden sm:inline">24/7 Chai & Code</span>
                </div>

                {/* Subtle Inner Highlight & Gradient */}
                <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 rounded-2xl sm:rounded-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            3. UNIFIED BENTO GRID
            ======================================================== */}
        <BlurFade delay={0.08} inView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

            {/* 4 POSTAGE STAMP CARDS (Interactive Scalloped Frame & Mouse/Touch Unblur Lens) */}
            <div id="chai-spots" className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4.5 scroll-mt-20">
              {CHAI_SPOTS.map((spot) => (
                <InteractiveStampCard key={spot.id} spot={spot} />
              ))}
            </div>

            {/* ========================================================
                4. GUJJU TECH DICTIONARY BENTO TILE (col-span-2)
                ======================================================== */}
            <div className="md:col-span-2 relative rounded-xl border border-zinc-800 p-2 md:rounded-2xl md:p-2 bg-zinc-950/40 shadow-lg">
              <GlowingEffect
                spread={40}
                glow={false}
                disabled={true}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="group/glow relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-lg md:rounded-xl border border-zinc-800/80 p-4 sm:p-5 bg-zinc-950/90 shadow-[0px_0px_27px_0px_#141414]">
                <SpotlightGlow color="rgba(34, 211, 238, 0.08)" />

                <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-400">
                      <IconTerminal2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-100 tracking-tight">
                      The Gujju Tech Dictionary 📖
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">Gujarati Slang</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {GUJJU_DICTIONARY.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-855 hover:border-cyan-500/40 transition-all space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500">{item.term}</span>
                        <span>{item.emoji}</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-cyan-300 group-hover:text-cyan-200">
                        {item.gujju}
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================
                5. GUJJU DEVELOPER MANIFESTO BENTO TILE (col-span-1)
                ======================================================== */}
            <div className="md:col-span-1 relative rounded-xl border border-zinc-800 p-2 md:rounded-2xl md:p-2 bg-zinc-950/40 shadow-lg">
              <GlowingEffect
                spread={40}
                glow={false}
                disabled={true}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="group/glow relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-lg md:rounded-xl border border-zinc-800/80 p-4 sm:p-5 bg-zinc-950/90 shadow-[0px_0px_27px_0px_#141414]">
                <SpotlightGlow color="rgba(255, 255, 255, 0.08)" />

                <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                      <IconCode className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-100 tracking-tight">
                      Manifesto 📜
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">Golden Rules</span>
                </div>

                <div className="space-y-2.5">
                  {GUJJU_RULES.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-855 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
                        <span className="flex items-center gap-1.5 font-mono text-zinc-400">
                          <span>{rule.num}.</span>
                          <span className="text-zinc-200">{rule.title}</span>
                        </span>
                        <span>{rule.icon}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        {rule.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================
                6. LOK DAYRO & HASYA DARBAR (SECOND LAST SECTION!)
                ======================================================== */}
            <div id="dayro-section" className="md:col-span-3 relative rounded-xl border border-zinc-800 p-2 md:rounded-2xl md:p-2 bg-zinc-950/40 shadow-lg scroll-mt-20">
              <GlowingEffect
                spread={40}
                glow={false}
                disabled={true}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="group/glow relative flex flex-col justify-between gap-4 overflow-hidden rounded-lg md:rounded-xl border border-zinc-800/80 p-4 sm:p-6 bg-zinc-950/90 shadow-[0px_0px_27px_0px_#141414]">
                <SpotlightGlow color="rgba(255, 255, 255, 0.06)" />

                {/* Dayro Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                      <IconBrandYoutube className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                        <span>લોકડાયરો & હાસ્ય દરબાર 🎭</span>
                      </h3>
                      <p className="text-xs text-zinc-400">
                        ગોપાલ સાધુ, આદિત્ય ગઢવી, રાજદાન ગઢવી, કીર્તિદાન ગઢવી અને માયાભાઈ આહીરનો અસલ ડાયરો & સૂર
                      </p>
                    </div>
                  </div>

                  {/* Carousel Scroll Arrows */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      onClick={() => handleScroll("left")}
                      aria-label="Scroll Left"
                      className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <IconChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleScroll("right")}
                      aria-label="Scroll Right"
                      className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <IconChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Specific Curated Category Tabs (No "બધા વિડીયો" tab) */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "music", label: "લોક સંગીત & ગીતો 🎶" },
                    { id: "hasya", label: "હાસ્ય ડાયરો & જોક્સ 😂" },
                    { id: "jugalbandhi", label: "મહા જુગલબંધી 🔥" },
                    { id: "veer-ras", label: "વીર રસ & સાહિત્ય ⚔️" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playTapSound("hover");
                        setSelectedVideoCategory(tab.id);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                        selectedVideoCategory === tab.id
                          ? "bg-white text-black font-semibold shadow-sm"
                          : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Video Carousel */}
                <div
                  ref={dayroScrollRef}
                  className="flex overflow-x-auto gap-4 pb-2 pt-1 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar-thumb]:bg-zinc-700 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500 [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                  {filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => handlePlayVideo(video)}
                      className="w-[260px] sm:w-[280px] shrink-0 snap-start rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 overflow-hidden cursor-pointer flex flex-col gap-2.5 transition-all group p-2.5"
                    >
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-zinc-950">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          sizes="280px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                            <IconPlayerPlayFilled className="w-4 h-4 ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/85 text-[9px] font-mono text-zinc-300">
                          HD
                        </div>
                        <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-zinc-200 text-[9px] font-medium">
                          {video.categoryLabel}
                        </div>
                      </div>

                      <div className="px-0.5 space-y-1">
                        <h4 className="text-xs font-bold text-zinc-100 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                          {video.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                          <span className="truncate">{video.artist}</span>
                          <IconCircleCheckFilled className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================
                7. NATURAL CONNECT BANNER (Friendly, Authentic Tone)
                ======================================================== */}
            <div className="md:col-span-3 relative rounded-xl border border-zinc-800 p-2 md:rounded-2xl md:p-2 bg-zinc-950/40 shadow-lg">
              <GlowingEffect
                spread={40}
                glow={false}
                disabled={true}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="group/glow relative flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden rounded-lg md:rounded-xl border border-zinc-800/80 p-5 sm:p-6 bg-zinc-950/90 shadow-[0px_0px_27px_0px_#141414]">
                <SpotlightGlow color="rgba(255, 255, 255, 0.08)" />

                <div className="flex items-center gap-3.5 text-left">
                  <div className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-2xl shrink-0">
                    ☕
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-base sm:text-lg font-bold text-zinc-100">
                      ચાલો મળીએ, એક કપ ચા સાથે ગપ્પાં મારીએ! ☕
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400">
                      કોડિંગ, નવા આઈડિયાઝ કે બસ મોજમજા — અમદાવાદમાં હોવ તો Tea Post પર ચા પીવા જરૂર આવજો!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
                  <a
                    href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%9A%E0%AA%BE%E0%AA%B2%E0%AB%8B%20%E0%AA%9A%E0%AA%BE%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AE%E0%AA%B3%E0%AB%80%E0%AA%8F%20%E0%AA%A8%E0%AB%87%20%E0%AA%95%E0%AA%82%E0%AA%88%E0%AA%95%20%E0%AA%AE%E0%AB%8B%E0%AA%9F%E0%AB%81%E0%AA%82%20%E0%AA%AC%E0%AA%A8%E0%AA%BE%E0%AA%B5%E0%AB%80%E0%AA%8F%20%E2%98%95"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTapSound("pop")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <IconBrandWhatsapp className="w-4 h-4" />
                    <span>WhatsApp Connect</span>
                  </a>

                  <Link
                    href="/#hero"
                    onClick={() => playTapSound("pop")}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    <IconArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Hero</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </BlurFade>

        {/* ========================================================
            8. SOCIAL MEDIA SHOWCASE (Instagram, LinkedIn & GitHub in 9:16 Ratio)
            ======================================================== */}
        <BlurFade delay={0.09} inView>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-zinc-100">
                  Digital Footprint & Social Hub 🌐
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  9:16 VERTICAL CARDS
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                Live & Interactive
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
              {/* 1. Instagram 9:16 Embed Card */}
              <div className="w-full flex justify-center">
                <InstagramCard
                  username="realvivek.py"
                  userHandle="realvivek.py"
                  avatarUrl="/avatars/vivek.jpg"
                  mediaImage="/social/instagram-profile.png"
                  location="DAU (DA-IICT), Gandhinagar"
                  followersCount="4,651 followers"
                  likesCount={710}
                  commentsCount={42}
                  caption="Live from the AI & Tech session! Exploring next-gen multilingual models ⚡🤖 #TechFest #AI"
                  eventTitle="THE 9TEEN • i.FEST"
                  eventDate="15th November"
                />
              </div>

              {/* 2. LinkedIn 9:16 Post Card */}
              <div className="w-full flex justify-center">
                <LinkedInCard
                  name="Vivek Hingu"
                  headline="AI & Machine Learning Engineer | B.E. IT @ SAL"
                  avatarUrl="/avatars/vivek.jpg"
                  mediaImage="/social/linkedin-post.png"
                  badgeText="🏆 2nd Prize Winner — Flinders AI Competition"
                  reactionsCount={842}
                  commentsCount={48}
                  repostsCount={19}
                  postContent="Honored to receive the 2nd Prize at Flinders University AI Competition 2026! 🚀 Grateful to mentors and organizers."
                />
              </div>

              {/* 3. GitHub 9:16 Repo Card */}
              <div className="w-full flex justify-center">
                <GitHubCard
                  owner="thatvivekhingu"
                  repoName="Bharat-Bhasha-Ai-2.0"
                  avatarUrl="/avatars/vivek.jpg"
                  mediaImage="/social/github-profile.png"
                  starsCount={148}
                  forksCount={34}
                  watchersCount={52}
                  primaryLanguage="Python"
                  latestRelease="v2.1.0"
                  description="Multilingual Voice & Text AI Operating System powered by Grok API with real-time Indian language synthesis."
                  tags={["ai-os", "grok-api", "voice-synthesis", "gujarati", "nlp"]}
                />
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            8. GUJJUVERSE FOOTER (Styled like Main Portfolio Footer)
            ======================================================== */}
        <BlurFade delay={0.1} inView>
          <footer className="pt-12 sm:pt-16 border-t border-zinc-800/80 mt-12 space-y-10">
            {/* Top GujjuVerse Footer Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 shrink-0">
                    <Image
                      src="/chai-kitli-logo.png"
                      alt="GujjuVerse"
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-extrabold text-base text-zinc-100 tracking-tight">
                    GujjuVerse
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Vivek Hingu&apos;s cultural dimension — where Ahmedabad chai kitli culture meets modern web engineering & AI.
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ahmedabad, Gujarat</span>
                </div>
              </div>

              {/* Chai Spots Column */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Ahmedabad Tea Hubs
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li>
                    <a
                      href="https://maps.app.goo.gl/mwWKYR9xQxzmoBR6A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <IconMapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>Tea Post — Nikol</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <IconMapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>Tea Post — Science City</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://maps.app.goo.gl/XQgNsuKokUm7CuBq8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <IconMapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>Tea Post — Maninagar</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <IconMapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>Tea Post — SG Highway</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* GujjuVerse Modules */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  GujjuVerse Highlights
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="hover:text-white transition-colors cursor-pointer">
                    📖 The Gujju Tech Dictionary
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    📜 The Developer Manifesto
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    🎭 Desi Dayro & Lok Sangeet
                  </li>
                  <li className="hover:text-white transition-colors cursor-pointer">
                    🤝 Chai & Code Collaboration
                  </li>
                </ul>
              </div>

              {/* Connect Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Connect & Links
                </h4>
                <div className="space-y-2 text-xs text-zinc-400">
                  <a
                    href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%9A%E0%AA%BE%E0%AA%B2%E0%AB%8B%20%E0%AA%9A%E0%AA%BE%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AE%E0%AA%B3%E0%AB%80%E0%AA%8F%20%E2%98%95"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTapSound("pop")}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <IconBrandWhatsapp className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Chat</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/vivekhingu"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTapSound("pop")}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <IconBrandLinkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn Profile</span>
                  </a>

                  <a
                    href="https://instagram.com/realvivek.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTapSound("pop")}
                    className="hover:text-pink-400 transition-colors flex items-center gap-1.5"
                  >
                    <IconBrandInstagram className="w-4 h-4 text-pink-400" />
                    <span>Instagram (@realvivek.py)</span>
                  </a>

                  <a
                    href="https://github.com/thatvivekhingu"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTapSound("pop")}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <IconBrandGithub className="w-4 h-4" />
                    <span>GitHub (@thatvivekhingu)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Strip */}
            <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 font-mono">
              <p>
                © {new Date().getFullYear()} Vivek Hingu • Designed with Chai &amp; Code in Ahmedabad ☕
              </p>

              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>Back to Top</span>
                <IconArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </footer>
        </BlurFade>
      </div>
    </div>
  );
}
