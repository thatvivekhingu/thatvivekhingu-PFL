"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft,
  IconBrandYoutube,
  IconX,
  IconBook,
  IconQuote,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheckFilled,
  IconCoffee,
  IconMapPin,
  IconExternalLink,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";

interface DayroVideo {
  id: string;
  artist: string;
  title: string;
  category: "comedy" | "music" | "sahitya" | "jugalbandhi";
  categoryLabel: string;
  youtubeId: string;
  thumbnail: string;
}

const CHAI_SPOTS = [
  {
    id: "nikol",
    name: "Tea Post — Nikol",
    gujjuName: "ટી પોસ્ટ — નિકોલ",
    location: "Raspan Arcade / SP Ring Road, Nikol",
    desc: "કડક મસાલા ચા, મસ્કા બન અને નેક્સ્ટ-લેવલ ટેક આઈડિયાઝ પર ચર્ચા.",
    mapsUrl: "https://maps.app.goo.gl/mwWKYR9xQxzmoBR6A",
    tag: "East Ahmedabad Hub",
  },
  {
    id: "science-city",
    name: "Tea Post — Science City",
    gujjuName: "ટી પોસ્ટ — સાયન્સ સીટી",
    location: "Science City Road, Sola",
    desc: "AI, ડીપ લર્નિંગ, પ્રોડક્ટ બિલ્ડિંગ અને સ્ટાર્ટઅપ પ્લાનિંગ મીટઅપ.",
    mapsUrl: "https://maps.google.com/?q=Tea+Post+Science+City+Ahmedabad",
    tag: "Tech & Startup Zone",
  },
  {
    id: "maninagar",
    name: "Tea Post — Maninagar",
    gujjuName: "ટી પોસ્ટ — મણિનગર",
    location: "Maninagar, Near Kankaria Lake",
    desc: "કાંકરિયાની શાંત વાઇબ્સ, ગરમ ચા અને બિઝનેસ કૉલેબોરેશન.",
    mapsUrl: "https://maps.google.com/?q=Tea+Post+Maninagar+Ahmedabad",
    tag: "South Ahmedabad Hub",
  },
];

const DAYRO_VIDEOS: DayroVideo[] = [
  // 1. Comedy Videos
  {
    id: "mayabhai-badhdati",
    artist: "માયાભાઈ આહીર",
    title: "હાસ્ય ની બધડાટી (હસવાની ૧૦૦% ગેરેંટી)",
    category: "comedy",
    categoryLabel: "હાસ્ય ડાયરો",
    youtubeId: "aE3_WjWz9tc",
    thumbnail: "https://img.youtube.com/vi/aE3_WjWz9tc/hqdefault.jpg",
  },
  {
    id: "sairam-hasya-varsad",
    artist: "સાંઈરામ દવે",
    title: "નોન-સ્ટોપ હાસ્યનો વરસાદ (હાસ્ય દરબાર)",
    category: "comedy",
    categoryLabel: "હાસ્ય દરબાર",
    youtubeId: "9N4--Ldqhuc",
    thumbnail: "https://img.youtube.com/vi/9N4--Ldqhuc/hqdefault.jpg",
  },
  {
    id: "hitesh-antala-jokes",
    artist: "હિતેશ અંટાળા",
    title: "સાવ નવા જથ્થાબંધ જોક્સ & હાસ્ય મહેફિલ",
    category: "comedy",
    categoryLabel: "હાસ્ય ડાયરો",
    youtubeId: "f2vHjuiIpqQ",
    thumbnail: "https://img.youtube.com/vi/f2vHjuiIpqQ/hqdefault.jpg",
  },
  {
    id: "dhirubhai-vandripanu",
    artist: "ધીરૂભાઈ સરવૈયા",
    title: "વાંદરીપાનું — સુપરહિટ દેશી જોક્સ",
    category: "comedy",
    categoryLabel: "દેશી રમૂજ",
    youtubeId: "FEZPU-4lMo8",
    thumbnail: "https://img.youtube.com/vi/FEZPU-4lMo8/hqdefault.jpg",
  },
  {
    id: "dhirubhai-lagan-hapta",
    artist: "ધીરૂભાઈ સરવૈયા",
    title: "લગન કરો હપ્તા ભરો (Lagan Karo Hapta Bharo)",
    category: "comedy",
    categoryLabel: "દેશી રમૂજ",
    youtubeId: "p7pA36rZJiw",
    thumbnail: "https://img.youtube.com/vi/p7pA36rZJiw/hqdefault.jpg",
  },
  {
    id: "jitubhai-doshi-jeans",
    artist: "જીતુભાઈ દ્વારકાવાળા",
    title: "ડોશીનું જીન્સ (Doshi Nu Jeans Comedy)",
    category: "comedy",
    categoryLabel: "હાસ્ય ડાયરો",
    youtubeId: "6LWx0N_MCZU",
    thumbnail: "https://img.youtube.com/vi/6LWx0N_MCZU/hqdefault.jpg",
  },

  // 2. Dayro & Folk Music
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
    category: "sahitya",
    categoryLabel: "વીર રસ",
    youtubeId: "LlsYNC4l0GA",
    thumbnail: "https://img.youtube.com/vi/LlsYNC4l0GA/hqdefault.jpg",
  },
  {
    id: "rajdan-vadodara",
    artist: "રાજદાન ગઢવી",
    title: "સુપર હિટ લોકડાયરો (વડોદરા લાઈવ ડાયરો)",
    category: "sahitya",
    categoryLabel: "લોક સાહિત્ય",
    youtubeId: "qW1ss5bq90A",
    thumbnail: "https://img.youtube.com/vi/qW1ss5bq90A/hqdefault.jpg",
  },
  {
    id: "kirtidan-kanudo",
    artist: "કીર્તિદાન ગઢવી",
    title: "દેશી તાલે કાનુડાના ગીતો & રાસ",
    category: "music",
    categoryLabel: "કાનુડાના ગીતો",
    youtubeId: "KpFUjNxGCbo",
    thumbnail: "https://img.youtube.com/vi/KpFUjNxGCbo/hqdefault.jpg",
  },
  {
    id: "kirtidan-rasiyo",
    artist: "કીર્તિદાન ગઢવી",
    title: "રસિયો રૂપાળો રંગરેલીયો (વેજાગામ લાઈવ)",
    category: "music",
    categoryLabel: "લોક સંગીત",
    youtubeId: "_IMnebRMPcY",
    thumbnail: "https://img.youtube.com/vi/_IMnebRMPcY/hqdefault.jpg",
  },
  {
    id: "kirtidan-dakor",
    artist: "કીર્તિદાન ગઢવી",
    title: "ડાકોરના ઠાકોર (અમરેલી લાઈવ પોલીસ ડાયરો)",
    category: "music",
    categoryLabel: "ભક્તિ ડાયરો",
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
                  <span>YouTube પર જુઓ</span>
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
              <span>Back to Portfolio</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>🕷️ દેશી કરોડિયો Approved</span>
            </div>
          </div>
        </BlurFade>

        {/* Hero Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                GUJJU VERSE
              </span>{" "}
              <span>🎭</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 font-medium leading-relaxed">
              કોડિંગ સાથે અસલ ગુજરાતી હાસ્ય ડાયરો, દેશી જોક્સ અને ચાની કિટલી વાળી મોજ.
            </p>
          </div>
        </BlurFade>

        {/* SECTION 1: ચા ની કિટલી પર મીટિંગ & કૉલેબોરેશન ☕ */}
        <BlurFade delay={0.12} inView>
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <div className="p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <IconCoffee className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                  ચા ની કિટલી પર મીટિંગ & કૉલેબોરેશન ☕
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  મોટાભાગના તગડા આઈડિયા ચાની કિટલી પર જ બને છે! ચાલો ચા પીતાં પીતાં ભેગા થઈએ ને કંઈક મોટું બનાવીએ.
                </p>
              </div>
            </div>

            {/* 3 Tea Post Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHAI_SPOTS.map((spot) => (
                <div
                  key={spot.id}
                  className="rounded-3xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/60 p-5 flex flex-col justify-between space-y-4 transition-all group shadow-lg"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold">
                        {spot.tag}
                      </span>
                      <IconCoffee className="w-4 h-4 text-amber-400/80 group-hover:scale-110 transition-transform" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                        {spot.gujjuName}
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 mt-0.5">
                        <IconMapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span className="truncate">{spot.location}</span>
                      </p>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {spot.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
                    <a
                      href={spot.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTapSound("pop")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-zinc-200 text-xs font-mono font-medium transition-all group/btn"
                    >
                      <IconMapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Google Maps</span>
                      <IconExternalLink className="w-3 h-3 text-zinc-500 group-hover/btn:text-amber-400 transition-colors" />
                    </a>

                    <a
                      href="mailto:hinguvivek05@gmail.com?subject=Chai%20Meetup%20Collab"
                      onClick={() => playTapSound("pop")}
                      className="text-[11px] font-mono text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                    >
                      મળવું છે? ☕
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* SECTION 2: હાસ્ય ડાયરો & લોકસંગીત (YouTube Card Carousel with Real Scrollbar) */}
        <BlurFade delay={0.15} inView>
          <div className="space-y-6">
            {/* Header Row 1: Title + Scroll Buttons */}
            <div className="flex items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <IconBrandYoutube className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                    લોકડાયરો & હાસ્ય મહેફિલ 📺
                  </h2>
                  <p className="text-xs text-zinc-400">
                    વિડીયો સ્ક્રોલ કરીને લાઈવ પ્લે કરવા ક્લિક કરો
                  </p>
                </div>
              </div>

              {/* Scroll Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleScroll("left")}
                  aria-label="Scroll Left"
                  className="p-2 sm:p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  aria-label="Scroll Right"
                  className="p-2 sm:p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Header Row 2: Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: "comedy", label: "હાસ્ય & જોક્સ 😂" },
                { id: "music", label: "લોક સંગીત 🎶" },
                { id: "sahitya", label: "વીર રસ ⚔️" },
                { id: "jugalbandhi", label: "મહા જુગલબંધી 🔥" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playTapSound("hover");
                    setSelectedCategory(tab.id);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Single-Row Horizontal Carousel with Real Hardware & Styled Scrollbar */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 pt-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-zinc-900/60 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-500/40 hover:[&::-webkit-scrollbar-thumb]:bg-amber-500 [&::-webkit-scrollbar-thumb]:rounded-full"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(245, 158, 11, 0.4) rgba(24, 24, 27, 0.6)",
              }}
            >
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handlePlayVideo(video)}
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-red-500/50 overflow-hidden cursor-pointer flex flex-col gap-3 transition-all shadow-xl group p-2.5"
                >
                  {/* YouTube Clean Thumbnail */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* YouTube Corner Logo Badge */}
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[10px] font-mono text-zinc-300 font-medium flex items-center gap-1">
                      <IconBrandYoutube className="w-3.5 h-3.5 text-red-500" />
                      <span>HD</span>
                    </div>
                  </div>

                  {/* YouTube Video Details */}
                  <div className="px-1 space-y-1.5">
                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <span className="truncate">{video.artist}</span>
                      <IconCircleCheckFilled className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* SECTION 3: ગુજ્જુ ટેક શબ્દકોશ (The Gujju Tech Dictionary) */}
        <BlurFade delay={0.2} inView>
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <IconBook className="w-6 h-6 text-cyan-400 shrink-0" />
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

        {/* SECTION 4: અમદાવાદી ડેવલપરના નિયમો (The Gujju Dev Rules) */}
        <BlurFade delay={0.25} inView>
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <IconQuote className="w-6 h-6 text-amber-400 shrink-0" />
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
              જલસા કરો બાપ, મોજમાં રહેવું! 🔥
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              ગુજરાતી લોકસંસ્કૃતિ, હાસ્ય દરબાર અને આર્ટિફિશિયલ ઇન્ટેલિજન્સનું અનોખું સંગમ.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                onClick={() => playTapSound("pop")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <IconArrowLeft className="w-4 h-4" />
                <span>મુખ્ય પોર્ટફોલિયો પર પાછા જાઓ</span>
              </Link>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
