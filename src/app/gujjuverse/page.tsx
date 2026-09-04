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
  IconMapPin,
  IconTerminal2,
  IconBrandWhatsapp,
  IconPlayerPlayFilled,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconCoffee,
  IconCrown,
  IconArrowDown,
  IconSparkles,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";
import { SocialBentoBoard } from "@/components/social-cards";

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
    bgColor: "bg-[#7c2d12]", // Deep Terracotta
    textColor: "text-amber-100",
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
    bgColor: "bg-[#1e293b]", // Deep Slate Navy
    textColor: "text-sky-100",
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
    bgColor: "bg-[#14532d]", // Deep Forest Emerald
    textColor: "text-emerald-100",
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
    bgColor: "bg-[#78350f]", // Deep Burnished Bronze
    textColor: "text-amber-100",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post SG Highway પર મળીએ ☕",
  },
];

const GUJJU_DICTIONARY = [
  {
    term: "Bug in Code",
    gujju: "લોચો",
    desc: "કોડે કરેલી એવી ભૂલ જે આખી રાત ઊંઘ ના આવવા દે!",
    emoji: "🐛",
  },
  {
    term: "Debugging",
    gujju: "ફોડ પાડવો",
    desc: "કોડમાં ક્યાં લોચો થયો છે એ ખોળી કાઢીને દેશી લોજિકથી ફિક્સ કરવું.",
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
    categoryLabel: "લોક ગીત & રાસ",
    youtubeId: "g6f6t0X-R6U",
    thumbnail: "https://img.youtube.com/vi/g6f6t0X-R6U/hqdefault.jpg",
  },
  {
    id: "mayabhai-comedy-classic",
    artist: "માયાભાઈ આહીર",
    title: "હસી હસીને લોટપોટ થઈ જશો (સુપર કોમેડી ડાયરો)",
    category: "hasya",
    categoryLabel: "હાસ્ય ડાયરો",
    youtubeId: "1Y0s2YQZ38Q",
    thumbnail: "https://img.youtube.com/vi/1Y0s2YQZ38Q/hqdefault.jpg",
  },
  {
    id: "sanjay-raval-prerana",
    artist: "સંજય રાવલ",
    title: "યુવાનો માટે લાઈફ ચેન્જિંગ વાતો & મોટીવેશન",
    category: "veer-ras",
    categoryLabel: "મોટીવેશન",
    youtubeId: "FEZPU-4lMo8",
    thumbnail: "https://img.youtube.com/vi/FEZPU-4lMo8/hqdefault.jpg",
  },
];

// Interactive Postage Stamp Card with Real-Time Lens Zoom
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
    <div className="rounded-2xl bg-[#0f141e] border border-white/[0.08] hover:border-white/20 p-3 sm:p-4 flex flex-row sm:flex-col justify-between items-center sm:items-stretch gap-3.5 shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* POSTAGE STAMP FRAME */}
      <div
        className={`relative ${spot.bgColor} w-28 h-32 sm:w-full sm:h-auto rounded-2xl p-2.5 sm:p-3.5 shrink-0 flex flex-col justify-between gap-2 overflow-hidden shadow-inner border border-white/10`}
      >
        {/* Top Scalloped Perforation Teeth */}
        <div className="absolute -top-1.5 sm:-top-2 left-0 right-0 flex justify-between px-1 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`t-${i}`}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0f141e] shadow-sm"
            />
          ))}
        </div>

        {/* Bottom Scalloped Perforation Teeth */}
        <div className="absolute -bottom-1.5 sm:-bottom-2 left-0 right-0 flex justify-between px-1 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0f141e] shadow-sm"
            />
          ))}
        </div>

        {/* Top Header Badge */}
        <div className="flex items-center justify-between z-10">
          <span
            className={`text-[8.5px] sm:text-[9.5px] font-mono font-bold uppercase tracking-widest ${spot.textColor}`}
          >
            {spot.badge}
          </span>
          <div className="flex items-center gap-1">
            <span
              className={`text-[9px] sm:text-[10.5px] font-bold font-mono ${spot.textColor}`}
            >
              ₹15
            </span>
            <IconCoffee
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${spot.textColor}`}
            />
          </div>
        </div>

        {/* Center Photo Container with Lens Magnifier */}
        <div
          ref={photoRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseLeave={handleLeave}
          onTouchEnd={handleLeave}
          className="relative aspect-square sm:aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/40 border border-black/40 cursor-crosshair touch-none select-none z-10 shadow-md"
        >
          <Image
            src={spot.image}
            alt={spot.name}
            fill
            sizes="(max-width: 640px) 112px, 240px"
            className="object-cover transition-transform duration-300"
          />

          {/* Lens Magnifier Circle */}
          {lensState.active && (
            <div
              style={{
                left: `${lensState.x}px`,
                top: `${lensState.y}px`,
                backgroundImage: `url(${spot.image})`,
                backgroundPosition: `${(lensState.x / (photoRef.current?.offsetWidth || 1)) * 100}% ${(lensState.y / (photoRef.current?.offsetHeight || 1)) * 100}%`,
                backgroundSize: "280%",
              }}
              className="absolute w-16 h-16 sm:w-20 sm:h-20 -ml-8 -mt-8 sm:-ml-10 sm:-mt-10 rounded-full border-2 border-white/90 shadow-[0_0_20px_rgba(0,0,0,0.8)] pointer-events-none z-20 hidden sm:block backdrop-blur-xs ring-2 ring-black/40"
            />
          )}

          {/* Stamp Circular Ink Seal Overlay */}
          <div className="absolute -bottom-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-dashed border-white/30 flex items-center justify-center pointer-events-none rotate-12 bg-black/30 backdrop-blur-[0.5px]">
            <span className="text-[7px] sm:text-[8px] font-mono font-bold uppercase text-white/70 tracking-tighter text-center leading-none">
              TEA POST
              <br />
              AHMEDABAD
            </span>
          </div>
        </div>

        {/* Bottom Postage Footer */}
        <div className="text-center z-10">
          <span
            className={`text-[8.5px] sm:text-[9.5px] font-mono font-bold uppercase tracking-widest ${spot.textColor}`}
          >
            {spot.footer}
          </span>
        </div>
      </div>

      {/* Info & Direct Actions */}
      <div className="flex-1 sm:w-full space-y-2 text-left">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight group-hover:text-amber-300 transition-colors">
            {spot.name}
          </h4>
          <p className="text-xs text-amber-400 font-medium">
            {spot.gujjuName}
          </p>
          <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5 font-sans">
            <IconMapPin className="w-3 h-3 text-red-400 shrink-0" />
            <span className="truncate">{spot.location}</span>
          </p>
        </div>

        {/* Action Buttons: Maps + WhatsApp Invite */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
          <a
            href={spot.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTapSound("pop")}
            className="flex-1 py-1.5 px-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[11px] font-mono text-zinc-300 hover:text-white transition-all text-center flex items-center justify-center gap-1 shadow-sm"
          >
            <span>Maps</span>
            <span>↗</span>
          </a>

          <a
            href={`https://wa.me/918866688575?text=${encodeURIComponent(spot.whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTapSound("pop")}
            className="flex-1 py-1.5 px-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[11px] font-semibold transition-all text-center flex items-center justify-center gap-1 shadow-sm"
          >
            <IconBrandWhatsapp className="w-3.5 h-3.5 text-amber-400" />
            <span>Meet ☕</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function GujjuversePage() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-[#f8fafc] font-sans antialiased overflow-x-hidden selection:bg-amber-500 selection:text-zinc-950">
      
      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-2xl bg-zinc-950 border border-zinc-700 overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-3.5 border-b border-zinc-800 bg-zinc-900">
                <span className="text-xs font-bold text-white truncate font-mono">
                  {activeVideo.title}
                </span>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container with ample padding to accommodate the global floating navbar smoothly */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16 pt-24 sm:pt-28 pb-12 sm:pb-16">
        
        {/* ========================================================
            1. HERO SECTION (REFINED, SOPHISTICATED LUXURY TECH)
            ======================================================== */}
        <BlurFade delay={0.02} inView>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center border-b border-white/[0.08] pb-10 sm:pb-14">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 text-left">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-400 text-xs font-mono font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span>AI & ML Engineer • Ahmedabad</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium backdrop-blur-md">
                  <IconCrown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>કાઠિયાવાડ સ્પેશિયલ • 100% દેશી પાવર</span>
                </div>
              </div>

              {/* Iconic Kathiyawadi Punchline Card (Sleek Dark Glass) */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-[#0f141e]/80 border border-amber-500/20 shadow-lg backdrop-blur-md space-y-2 group hover:border-amber-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 text-amber-400 text-[11px] font-bold uppercase tracking-widest font-mono">
                  <IconCrown className="w-3.5 h-3.5 text-amber-400" />
                  <span>KATHIYAWADI PUNCHLINE</span>
                </div>
                <blockquote className="text-base sm:text-lg md:text-xl font-bold text-zinc-100 leading-snug tracking-wide">
                  &ldquo;કાઠિયાવાડમાં જેમ ભગવાન પણ ભૂલા પડી જાય, તેમ આજે તમે પણ આ Gujjuverse માં ભૂલા પડી જશો!&rdquo;
                </blockquote>
              </div>

              {/* Refined Gujarati Headline (Clean Titanium White + Warm Amber) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.18]">
                મોટાભાગના તગડા{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300">
                  આઈડિયા ચાની કિટલી પર
                </span>{" "}
                જ બને છે!
              </h1>

              {/* Concise Subtitle */}
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                Ahmedabad developer building real-world AI systems with kadak chai, desi vibes, and pure passion for code.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/#projects"
                  onClick={() => playTapSound("pop")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
                >
                  <span>View My Projects</span>
                  <span className="text-sm">➔</span>
                </Link>

                <a
                  href="#chai-spots"
                  onClick={() => playTapSound("pop")}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <IconCoffee className="w-4 h-4 text-amber-400" />
                  <span>Explore Tea Spots & Culture ↓</span>
                </a>
              </div>
            </div>

            {/* Right Visual Card Column */}
            <div className="lg:col-span-6 xl:col-span-6 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-sky-500/10 rounded-[32px] blur-3xl pointer-events-none -z-10" />

              <div className="relative w-full aspect-[4/3] sm:aspect-[1.25/1] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d111a] group">
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] font-mono font-medium shadow-md">
                    <IconMapPin className="w-3 h-3 text-amber-400" />
                    <span>Ahmedabad Tech Hub 🇮🇳</span>
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

                <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-1 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
                  <span className="text-amber-400 font-semibold text-[11px]">
                    Python • Grok AI • Next.js • ML
                  </span>
                  <span className="text-zinc-400 text-[10px]">Chai & Code ☕</span>
                </div>

                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl sm:rounded-3xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
              </div>
            </div>

          </div>
        </BlurFade>

        {/* ========================================================
            2. RESTORED ICONIC POSTAGE STAMP TEA CARDS
            ======================================================== */}
        <section id="chai-spots" className="space-y-6">
          <BlurFade delay={0.04} inView>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-medium tracking-wide">
                  <IconCoffee className="w-3.5 h-3.5 text-amber-400" />
                  <span>AHMEDABAD ➔ SAURASHTRA TEA HUBS</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  અમદાવાદના લોકપ્રિય ચાના અડ્ડા
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Interactive Postage Stamp Cards with Real-Time Lens Magnifier on Hover.
                </p>
              </div>
            </div>
          </BlurFade>

          {/* 4 Authentic Postage Stamp Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CHAI_SPOTS.map((spot) => (
              <InteractiveStampCard key={spot.id} spot={spot} />
            ))}
          </div>
        </section>

        {/* ========================================================
            3. GUJJU TECH DICTIONARY & 4 DEVELOPER RULES BENTO
            ======================================================== */}
        <section className="space-y-6">
          <BlurFade delay={0.06} inView>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Left 7 cols: The Gujju Tech Dictionary */}
              <div className="md:col-span-7 rounded-2xl bg-[#0f141e] border border-white/[0.08] p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-cyan-400">
                      <IconTerminal2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      The Gujju Tech Dictionary 📖
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Gujarati Slang</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GUJJU_DICTIONARY.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] hover:border-cyan-500/30 transition-all space-y-1 group"
                    >
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                        <span>{item.term}</span>
                        <span className="text-base">{item.emoji}</span>
                      </div>
                      <h4 className="text-base font-bold text-cyan-300 group-hover:text-cyan-200">
                        {item.gujju}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 5 cols: 4 Golden Rules */}
              <div className="md:col-span-5 rounded-2xl bg-[#0f141e] border border-white/[0.08] p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-amber-400">
                      <IconCrown className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      4 Developer Rules 📜
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Desi Ethos</span>
                </div>

                <div className="space-y-2.5">
                  {GUJJU_RULES.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-start gap-3"
                    >
                      <span className="text-lg">{rule.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            RULE {rule.num}
                          </span>
                          <span className="text-xs font-bold text-white">
                            {rule.gujjuTitle}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5">
                          {rule.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </BlurFade>
        </section>

        {/* ========================================================
            4. LOK DAYRO & DESI SANGEET CAROUSEL
            ======================================================== */}
        <section className="space-y-5">
          <BlurFade delay={0.08} inView>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-rose-400">
                  <IconBrandYoutube className="w-4 h-4" />
                  <span>LOK DAYRO & SANGEET JUKEBOX</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  રંગીલો લોકડાયરો & સાહિત્ય 🎭
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleScroll("left")}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </BlurFade>

          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-zinc-800"
          >
            {ALL_DAYRO_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  setActiveVideo(video);
                  playTapSound("pop");
                }}
                className="w-[260px] sm:w-[280px] shrink-0 snap-start rounded-2xl bg-[#0f141e] border border-white/[0.08] p-3 space-y-2.5 cursor-pointer group hover:border-amber-500/40 transition-all shadow-lg"
              >
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                    <div className="w-9 h-9 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <IconPlayerPlayFilled className="w-4 h-4 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 text-[9px] font-mono text-zinc-300">
                    {video.categoryLabel}
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-mono block truncate">{video.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            5. DIGITAL FOOTPRINT & 3-COLUMN SOCIAL BENTO BOARD
            ======================================================== */}
        <section className="space-y-4">
          <BlurFade delay={0.1} inView>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-zinc-100">
                  Digital Footprint & Social Bento Hub 🌐
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-sky-400 border border-blue-500/20">
                  DEVELOPER IDENTITY
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                Live & Interactive
              </span>
            </div>

            <SocialBentoBoard />
          </BlurFade>
        </section>

        {/* ========================================================
            6. REFINED GUJJUVERSE FOOTER
            ======================================================== */}
        <BlurFade delay={0.12} inView>
          <footer className="pt-12 sm:pt-16 border-t border-white/[0.08] mt-12 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Brand Column */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-extrabold text-base text-white tracking-tight">
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
                      <IconMapPin className="w-3.5 h-3.5 text-amber-400" />
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
                      <IconMapPin className="w-3.5 h-3.5 text-amber-400" />
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
                      <IconMapPin className="w-3.5 h-3.5 text-amber-400" />
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
                      <IconMapPin className="w-3.5 h-3.5 text-amber-400" />
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
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <IconBrandWhatsapp className="w-4 h-4 text-amber-400" />
                    <span>WhatsApp Chat</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/vivekhingu"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTapSound("pop")}
                    className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                  >
                    <IconBrandLinkedin className="w-4 h-4 text-sky-400" />
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
            <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
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
