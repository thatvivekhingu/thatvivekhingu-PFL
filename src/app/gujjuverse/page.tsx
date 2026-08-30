"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSparkles,
  IconArrowLeft,
  IconBrandYoutube,
  IconPlayerPlay,
  IconX,
  IconBook,
  IconQuote,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";

interface DayroVideo {
  id: string;
  artist: string;
  title: string;
  category: "comedy" | "music" | "sahitya" | "jugalbandhi";
  categoryLabel: string;
  tag: string;
  youtubeId: string;
  thumbnail: string;
}

const DAYRO_VIDEOS: DayroVideo[] = [
  // 1. Comedy Videos
  {
    id: "mayabhai-badhdati",
    artist: "માયાભાઈ આહીર",
    title: "હાસ્ય ની બધડાટી (હસવાની ૧૦૦% ગેરેંટી)",
    category: "comedy",
    categoryLabel: "Comedy Dayro",
    tag: "New Jokes",
    youtubeId: "aE3_WjWz9tc",
    thumbnail: "https://img.youtube.com/vi/aE3_WjWz9tc/hqdefault.jpg",
  },
  {
    id: "sairam-hasya-varsad",
    artist: "સાંઈરામ દવે",
    title: "નોન-સ્ટોપ હાસ્યનો વરસાદ (હાસ્ય દરબાર)",
    category: "comedy",
    categoryLabel: "Hasya Darbar",
    tag: "Full Comedy",
    youtubeId: "9N4--Ldqhuc",
    thumbnail: "https://img.youtube.com/vi/9N4--Ldqhuc/hqdefault.jpg",
  },
  {
    id: "hitesh-antala-jokes",
    artist: "હિતેશ અંટાળા",
    title: "સાવ નવા જથ્થાબંધ જોક્સ & હાસ્ય મહેફિલ",
    category: "comedy",
    categoryLabel: "Comedy Dayro",
    tag: "Non-Stop Jokes",
    youtubeId: "f2vHjuiIpqQ",
    thumbnail: "https://img.youtube.com/vi/f2vHjuiIpqQ/hqdefault.jpg",
  },
  {
    id: "dhirubhai-vandripanu",
    artist: "ધીરૂભાઈ સરવૈયા",
    title: "વાંદરીપાનું — સુપરહિટ દેશી જોક્સ",
    category: "comedy",
    categoryLabel: "Classic Comedy",
    tag: "Superhit Comedy",
    youtubeId: "FEZPU-4lMo8",
    thumbnail: "https://img.youtube.com/vi/FEZPU-4lMo8/hqdefault.jpg",
  },
  {
    id: "dhirubhai-lagan-hapta",
    artist: "ધીરૂભાઈ સરવૈયા",
    title: "લગન કરો હપ્તા ભરો (Lagan Karo Hapta Bharo)",
    category: "comedy",
    categoryLabel: "Classic Comedy",
    tag: "Family Comedy",
    youtubeId: "p7pA36rZJiw",
    thumbnail: "https://img.youtube.com/vi/p7pA36rZJiw/hqdefault.jpg",
  },
  {
    id: "jitubhai-doshi-jeans",
    artist: "જીતુભાઈ દ્વારકાવાળા",
    title: "ડોશીનું જીન્સ (Doshi Nu Jeans Comedy)",
    category: "comedy",
    categoryLabel: "Comedy Dayro",
    tag: "Viral Jokes",
    youtubeId: "6LWx0N_MCZU",
    thumbnail: "https://img.youtube.com/vi/6LWx0N_MCZU/hqdefault.jpg",
  },

  // 2. Dayro & Folk Music
  {
    id: "kirtidan-rajbha-jugalbandhi",
    artist: "કીર્તિદાન ગઢવી & રાજભા ગઢવી",
    title: "બેસ્ટ જુગલબંધી લોકડાયરો (રાપર કચ્છ લાઈવ)",
    category: "jugalbandhi",
    categoryLabel: "Grand Jugalbandhi",
    tag: "Historic Jugalbandhi",
    youtubeId: "i8POjs66f9g",
    thumbnail: "https://img.youtube.com/vi/i8POjs66f9g/hqdefault.jpg",
  },
  {
    id: "rajbha-kashtriya",
    artist: "રાજભા ગઢવી",
    title: "ક્ષત્રિયની વાત & રૂંવાડા ઊભા કરતો વીર રસ",
    category: "sahitya",
    categoryLabel: "Veer Ras Dayro",
    tag: "Veer Ras Dayro",
    youtubeId: "LlsYNC4l0GA",
    thumbnail: "https://img.youtube.com/vi/LlsYNC4l0GA/hqdefault.jpg",
  },
  {
    id: "rajdan-vadodara",
    artist: "રાજદાન ગઢવી",
    title: "સુપર હિટ લોકડાયરો (વડોદરા લાઈવ ડાયરો)",
    category: "sahitya",
    categoryLabel: "Lok Sahitya",
    tag: "Vadodara Live",
    youtubeId: "qW1ss5bq90A",
    thumbnail: "https://img.youtube.com/vi/qW1ss5bq90A/hqdefault.jpg",
  },
  {
    id: "kirtidan-kanudo",
    artist: "કીર્તિદાન ગઢવી",
    title: "દેશી તાલે કાનુડાના ગીતો & રાસ",
    category: "music",
    categoryLabel: "Krishna Raas",
    tag: "Krishna Songs",
    youtubeId: "KpFUjNxGCbo",
    thumbnail: "https://img.youtube.com/vi/KpFUjNxGCbo/hqdefault.jpg",
  },
  {
    id: "kirtidan-rasiyo",
    artist: "કીર્તિદાન ગઢવી",
    title: "રસિયો રૂપાળો રંગરેલીયો (વેજાગામ લાઈવ)",
    category: "music",
    categoryLabel: "Folk Music",
    tag: "Superhit Folk",
    youtubeId: "_IMnebRMPcY",
    thumbnail: "https://img.youtube.com/vi/_IMnebRMPcY/hqdefault.jpg",
  },
  {
    id: "kirtidan-dakor",
    artist: "કીર્તિદાન ગઢવી",
    title: "ડાકોરના ઠાકોર (અમરેલી લાઈવ પોલીસ ડાયરો)",
    category: "music",
    categoryLabel: "Folk & Bhajan",
    tag: "Dakor Na Thakor",
    youtubeId: "w3O3aikm4xM",
    thumbnail: "https://img.youtube.com/vi/w3O3aikm4xM/hqdefault.jpg",
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
    term: "Debugging (ડીબગિંગ)",
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
    title: "Morning Fuel Protocol",
    gujjuTitle: "સવારનો કડક નિયમ",
    desc: "કડક કટિંગ ચા અને ગાંઠિયા વગર મગજનું CPU સ્ટાર્ટ નથી થતું.",
    icon: "☕",
  },
  {
    num: "02",
    title: "The Business Ethos",
    gujjuTitle: "વેપારનો સોનેરી નિયમ",
    desc: "ક્લાયન્ટને હંમેશા સમય પહેલા ડિલિવરી આપવી — આ ગુજરાતીનો પાકો વેપાર છે.",
    icon: "🤝",
  },
  {
    num: "03",
    title: "Clean Logic Doctrine",
    gujjuTitle: "કોડિંગનો સ્પષ્ટ નિયમ",
    desc: "કોડ ભલે ગમે તેટલો મોટો હોય, લોજિક એકદમ સીધું અને પાણી જેવું ચોખ્ખું હોવું જોઈએ.",
    icon: "💻",
  },
  {
    num: "04",
    title: "Work-Life Jalsa Balance",
    gujjuTitle: "મોજનો કાયમી નિયમ",
    desc: "કામ ગમે તેટલું હોય, પણ ડાયરો, હાસ્ય, મિત્રો અને પરિવાર સાથે મોજ કાયમ રહેવી જોઈએ!",
    icon: "🎉",
  },
];

export default function GujjuversePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("comedy");
  const [activeVideo, setActiveVideo] = useState<DayroVideo | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredVideos = DAYRO_VIDEOS.filter((v) => v.category === selectedCategory);

  const handlePlayVideo = (video: DayroVideo) => {
    playTapSound("pop");
    setActiveVideo(video);
  };

  const handleScroll = (direction: "left" | "right") => {
    playTapSound("hover");
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white px-4 py-16 sm:py-24 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Ambient Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 right-10 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                    {activeVideo.artist}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100">
                    {activeVideo.title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    playTapSound("hover");
                    setActiveVideo(null);
                  }}
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-400 hover:text-white transition-colors"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>

              {/* Responsive YouTube Embed */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              <div className="flex items-center justify-end pt-1">
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTapSound("pop")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-mono font-bold shrink-0 transition-colors"
                >
                  <IconBrandYoutube className="w-4 h-4 text-red-500" />
                  <span>Watch on YouTube / યુટ્યુબ પર જુઓ</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24">
        {/* Top Navigation */}
        <BlurFade delay={0.05} inView>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => playTapSound("pop")}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 hover:text-white transition-colors group"
            >
              <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Portfolio / પોર્ટફોલિયો</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>🕷️ DESI KARODIYO SPACE</span>
            </div>
          </div>
        </BlurFade>

        {/* Hero Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase font-mono">
              <IconSparkles className="w-4 h-4 animate-bounce" />
              <span>GUJJU VERSE // 🎭 GUJARATI CULTURE & HUMOR CORNER</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                GUJJU VERSE
              </span>{" "}
              <span className="text-zinc-400 text-3xl sm:text-5xl font-light">|</span>{" "}
              <span className="text-zinc-100">ગુજ્જુ વર્સ</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 font-medium leading-relaxed">
              Where Modern AI Engineering meets Saurashtra’s Authentic Lok Dayro, Comedy & Pure Jalsa!
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 font-sans">
              કોડિંગ સાથે અસલ ગુજરાતી હાસ્ય ડાયરો, દેશી જોક્સ અને લોકસંગીતની મોજ.
            </p>
          </div>
        </BlurFade>

        {/* SECTION 1: હાસ્ય ડાયરો & લોકસંગીત (Single-Line Horizontal Carousel) */}
        <BlurFade delay={0.15} inView>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <IconBrandYoutube className="w-6 h-6 text-red-500" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100 font-sans">
                    Lok Dayro & Comedy Lounge 📺
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Scroll horizontally & click any video to play live
                  </p>
                </div>
              </div>

              {/* Filter Tabs + Left/Right Arrows */}
              <div className="flex items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "comedy", label: "Comedy & Jokes 😂" },
                    { id: "music", label: "Folk & Music 🎶" },
                    { id: "sahitya", label: "Veer Ras ⚔️" },
                    { id: "jugalbandhi", label: "Grand Jugalbandhi 🔥" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playTapSound("hover");
                        setSelectedCategory(tab.id);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedCategory === tab.id
                          ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                          : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="hidden sm:flex items-center gap-1.5 border-l border-zinc-800 pl-3">
                  <button
                    onClick={() => handleScroll("left")}
                    aria-label="Scroll Left"
                    className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <IconChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleScroll("right")}
                    aria-label="Scroll Right"
                    className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <IconChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Single-Row Horizontal Scrolling Carousel */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handlePlayVideo(video)}
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start rounded-3xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-500/60 overflow-hidden cursor-pointer flex flex-col justify-between transition-all shadow-xl group"
                >
                  {/* Thumbnail / Header */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                    {/* Play Badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <IconPlayerPlay className="w-5 h-5 fill-black translate-x-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-zinc-700 text-[10px] font-mono text-amber-400 font-bold">
                      {video.tag}
                    </div>
                  </div>

                  {/* Clean Minimalist Body Content */}
                  <div className="p-4 space-y-1.5">
                    <span className="text-xs font-mono text-amber-400 font-semibold block truncate">
                      {video.artist}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* SECTION 2: ગુજ્જુ ટેક શબ્દકોશ (The Gujju Tech Dictionary) */}
        <BlurFade delay={0.2} inView>
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <IconBook className="w-6 h-6 text-cyan-400" />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100 font-sans">
                  The Gujju Tech Dictionary 📖
                </h2>
                <p className="text-xs text-zinc-400">
                  ગુજ્જુ ટેક શબ્દકોશ — Everyday coding terminology in authentic Gujarati slang
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {GUJJU_DICTIONARY.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 hover:border-cyan-500/40 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                      {item.term}
                    </span>
                    <span className="text-xl">{item.emoji}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                    {item.gujju}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* SECTION 3: અમદાવાદી ડેવલપરના નિયમો (The Gujju Dev Rules) */}
        <BlurFade delay={0.25} inView>
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <IconQuote className="w-6 h-6 text-amber-400" />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100 font-sans">
                  The Gujju Developer Manifesto 📜
                </h2>
                <p className="text-xs text-zinc-400">
                  અમદાવાદી ડેવલપરના નિયમો — Golden rules of coding, business & life
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GUJJU_RULES.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/40 transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                        {rule.num}
                      </span>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-amber-300 transition-colors">
                          {rule.title}
                        </h3>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          {rule.gujjuTitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-2xl">{rule.icon}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-11">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Bottom Back Button */}
        <BlurFade delay={0.3} inView>
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-amber-500/20 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-100 font-sans">
              Keep Calm & Jalsa Karo! 🔥
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
              The sweet fusion of Saurashtra’s Folk Culture, Comedy & Artificial Intelligence.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                onClick={() => playTapSound("pop")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <IconArrowLeft className="w-4 h-4" />
                <span>← Back to Main Portfolio</span>
              </Link>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
