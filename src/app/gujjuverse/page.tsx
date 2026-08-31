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
  IconMapPin,
  IconExternalLink,
  IconMusic,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";

interface VideoItem {
  id: string;
  artist: string;
  title: string;
  category: string;
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
    image: "/teapost/nikol.jpg",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Nikol પર મળીએ ને આઈડિયા ડિસ્કસ કરીએ ☕",
  },
  {
    id: "science-city",
    name: "Tea Post — Science City",
    gujjuName: "ટી પોસ્ટ — સાયન્સ સીટી",
    location: "Science City Road, Sola",
    desc: "AI, ડીપ લર્નિંગ, પ્રોડક્ટ બિલ્ડિંગ અને સ્ટાર્ટઅપ પ્લાનિંગ મીટઅપ.",
    mapsUrl: "https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5",
    tag: "Tech & Startup Zone",
    image: "/teapost/science-city.png",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Science City પર મળીએ ને AI / Tech ડિસ્કસ કરીએ ☕",
  },
  {
    id: "maninagar",
    name: "Tea Post — Maninagar",
    gujjuName: "ટી પોસ્ટ — મણિનગર",
    location: "Maninagar, Near Kankaria Lake",
    desc: "કાંકરિયાની શાંત વાઇબ્સ, ગરમ ચા અને બિઝનેસ કૉલેબોરેશન.",
    mapsUrl: "https://maps.app.goo.gl/XQgNsuKokUm7CuBq8",
    tag: "South Ahmedabad Hub",
    image: "/teapost/maninagar.png",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Maninagar પર મળીએ ને કૉલેબોરેશન કરીએ ☕",
  },
];

// 1. Lok Sangeet Videos (First Section)
const LOK_SANGEET_VIDEOS: VideoItem[] = [
  {
    id: "kirtidan-kanudo",
    artist: "કીર્તિદાન ગઢવી",
    title: "દેશી તાલે કાનુડાના ગીતો & રાસ (લાઈવ ગરબા & સૂર)",
    category: "ras",
    categoryLabel: "કાનુડાના ગીતો",
    youtubeId: "KpFUjNxGCbo",
    thumbnail: "https://img.youtube.com/vi/KpFUjNxGCbo/hqdefault.jpg",
  },
  {
    id: "kirtidan-rasiyo",
    artist: "કીર્તિદાન ગઢવી",
    title: "રસિયો રૂપાળો રંગરેલીયો (વેજાગામ લાઈવ સંગીત)",
    category: "folk",
    categoryLabel: "લોક સંગીત",
    youtubeId: "_IMnebRMPcY",
    thumbnail: "https://img.youtube.com/vi/_IMnebRMPcY/hqdefault.jpg",
  },
  {
    id: "kirtidan-dakor",
    artist: "કીર્તિદાન ગઢવી",
    title: "ડાકોરના ઠાકોર (અમરેલી લાઈવ પોલીસ ડાયરો સંગીત)",
    category: "bhakti",
    categoryLabel: "ભક્તિ સંગીત",
    youtubeId: "w3O3aikm4xM",
    thumbnail: "https://img.youtube.com/vi/w3O3aikm4xM/hqdefault.jpg",
  },
  {
    id: "osman-mir-morbi",
    artist: "ઓસ્માન મીર",
    title: "મોરબીની વાણીયાણ & રૂડા ગીતો (દેશી ગઝલ & લોકસંગીત)",
    category: "folk",
    categoryLabel: "લોક ગીત",
    youtubeId: "gK6X4GvA9v8",
    thumbnail: "https://img.youtube.com/vi/gK6X4GvA9v8/hqdefault.jpg",
  },
  {
    id: "hemant-chauhan-bhajan",
    artist: "હેમંત ચૌહાણ",
    title: "શિવ તાંડવ સ્તોત્ર & દેશી પ્રભાતિયા",
    category: "bhakti",
    categoryLabel: "ભજન & સ્તોત્ર",
    youtubeId: "yN33Wk6023I",
    thumbnail: "https://img.youtube.com/vi/yN33Wk6023I/hqdefault.jpg",
  },
  {
    id: "geeta-rabari-rona",
    artist: "ગીતા રબારી",
    title: "રોણા શેરમાં રે (ઓરિજિનલ દેશી સૂર)",
    category: "folk",
    categoryLabel: "દેશી સૂર",
    youtubeId: "O9rYqgKq_oE",
    thumbnail: "https://img.youtube.com/vi/O9rYqgKq_oE/hqdefault.jpg",
  },
];

// 2. Lok Dayro & Hasya Darbar (Second Last Section)
const LOK_DAYRO_VIDEOS: VideoItem[] = [
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
  {
    id: "rajdan-vadodara",
    artist: "રાજદાન ગઢવી",
    title: "સુપર હિટ લોકડાયરો (વડોદરા લાઈવ ડાયરો)",
    category: "veer-ras",
    categoryLabel: "લોક સાહિત્ય",
    youtubeId: "qW1ss5bq90A",
    thumbnail: "https://img.youtube.com/vi/qW1ss5bq90A/hqdefault.jpg",
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
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [selectedDayroCat, setSelectedDayroCat] = useState<string>("all");

  const sangeetScrollRef = useRef<HTMLDivElement>(null);
  const dayroScrollRef = useRef<HTMLDivElement>(null);

  const filteredDayroVideos =
    selectedDayroCat === "all"
      ? LOK_DAYRO_VIDEOS
      : LOK_DAYRO_VIDEOS.filter((v) => v.category === selectedDayroCat);

  const handlePlayVideo = (video: VideoItem) => {
    playTapSound("pop");
    setActiveVideo(video);
  };

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    playTapSound("hover");
    if (ref.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white px-4 py-16 sm:py-24 overflow-x-hidden selection:bg-amber-500 selection:text-black font-gujarati">
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
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-400 hover:text-white transition-colors cursor-pointer"
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
        <BlurFade delay={0.08} inView>
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                GUJJU VERSE
              </span>{" "}
              <span>🎭</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 font-medium leading-relaxed">
              કોડિંગ સાથે અસલ ગુજરાતી લોક સંગીત, હાસ્ય ડાયરો અને ચાની કિટલી વાળી મોજ.
            </p>
          </div>
        </BlurFade>

        {/* SECTION 1 (FIRST): લોક સંગીત 🎶 */}
        <BlurFade delay={0.1} inView>
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <IconMusic className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                    ગુજરાતી લોક સંગીત & સુરીલા ગીતો 🎶
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    કીર્તિદાન ગઢવી અને દિગ્ગજ કલાકારોના કર્ણપ્રિય દેશી ગીતો, રાસ અને ભક્તિ સંગીત
                  </p>
                </div>
              </div>

              {/* Scroll Arrows */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleScroll(sangeetScrollRef, "left")}
                  aria-label="Scroll Left"
                  className="p-2 sm:p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScroll(sangeetScrollRef, "right")}
                  aria-label="Scroll Right"
                  className="p-2 sm:p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sangeet Horizontal Carousel */}
            <div
              ref={sangeetScrollRef}
              className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 pt-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-zinc-900/60 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-500/40 hover:[&::-webkit-scrollbar-thumb]:bg-amber-500 [&::-webkit-scrollbar-thumb]:rounded-full"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(245, 158, 11, 0.4) rgba(24, 24, 27, 0.6)",
              }}
            >
              {LOK_SANGEET_VIDEOS.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handlePlayVideo(video)}
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/60 overflow-hidden cursor-pointer flex flex-col gap-3 transition-all shadow-xl group p-2.5"
                >
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[10px] font-mono text-zinc-300 font-medium flex items-center gap-1">
                      <IconBrandYoutube className="w-3.5 h-3.5 text-red-500" />
                      <span>HD</span>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-500/90 text-black text-[10px] font-bold">
                      {video.categoryLabel}
                    </div>
                  </div>

                  <div className="px-1 space-y-1.5">
                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <span className="truncate">{video.artist}</span>
                      <IconCircleCheckFilled className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* SECTION 2: મોટાભાગના તગડા આઈડિયા ચાની કિટલી પર જ બને છે! ☕ */}
        <BlurFade delay={0.14} inView>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-zinc-900 pb-6">
              {/* Chai Kitli Illustration Logo */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden bg-white/95 p-1.5 shadow-[0_0_25px_rgba(245,158,11,0.25)] border border-amber-500/30 flex items-center justify-center">
                <Image
                  src="/chai-kitli-logo.png"
                  alt="ચાની કિટલી આઈડિયાઝ લોગો"
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-bold">
                  <span>☕ ચાની કિટલી x ટેક કૉલેબોરેશન</span>
                </div>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-zinc-100 leading-snug sm:leading-tight tracking-tight">
                  મોટાભાગના તગડા આઈડિયા ચાની કિટલી પર જ બને છે! ચાલો ચા પીતાં પીતાં ભેગા થઈએ ને કંઈક મોટું બનાવીએ. ☕
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  અમદાવાદના ફેવરિટ ચા અડ્ડા (Tea Post) જ્યાં ચર્ચા થાય છે ટેક, AI અને નેક્સ્ટ-લેવલ કૉલેબોરેશન પર.
                </p>
              </div>
            </div>

            {/* Tea Post Location Cards: Horizontal on mobile, Grid on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CHAI_SPOTS.map((spot) => (
                <div
                  key={spot.id}
                  className="rounded-3xl bg-zinc-950/90 border border-zinc-800 hover:border-amber-500/60 p-3 sm:p-4 md:p-5 flex flex-row md:flex-col justify-between gap-3.5 sm:gap-4 transition-all group shadow-xl hover:shadow-amber-500/5"
                >
                  {/* Left (Mobile) / Top (Desktop) Image */}
                  <div className="relative w-28 sm:w-36 md:w-full h-auto min-h-[120px] md:h-44 rounded-2xl overflow-hidden shrink-0 bg-zinc-900 border border-zinc-800/80">
                    <Image
                      src={spot.image}
                      alt={spot.name}
                      fill
                      sizes="(max-width: 768px) 150px, 320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-black text-[10px] font-bold font-mono tracking-tight shadow">
                        Tea Post ☕
                      </span>
                    </div>
                  </div>

                  {/* Right (Mobile) / Bottom (Desktop) Details & Buttons */}
                  <div className="flex-1 flex flex-col justify-between space-y-3 min-w-0">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-bold">
                          {spot.tag}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug">
                          {spot.gujjuName}
                        </h3>
                        <p className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 mt-0.5">
                          <IconMapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span className="truncate">{spot.location}</span>
                        </p>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 md:line-clamp-none">
                        {spot.desc}
                      </p>
                    </div>

                    {/* Action Buttons: Google Maps & WhatsApp */}
                    <div className="pt-2 border-t border-zinc-900 flex flex-wrap items-center gap-2 justify-between">
                      <a
                        href={spot.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTapSound("pop")}
                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-white text-[11px] font-mono transition-all group/btn shrink-0"
                      >
                        <IconMapPin className="w-3 h-3 text-amber-400" />
                        <span>Maps</span>
                        <IconExternalLink className="w-3 h-3 text-zinc-500 group-hover/btn:text-amber-400 transition-colors" />
                      </a>

                      {/* WhatsApp Connect Link with 8866688575 */}
                      <a
                        href={`https://wa.me/918866688575?text=${encodeURIComponent(spot.whatsappMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTapSound("pop")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 text-[11px] font-mono font-bold transition-all shrink-0 cursor-pointer shadow-sm group/wa"
                      >
                        <svg
                          className="w-3.5 h-3.5 fill-current text-emerald-400 group-hover/wa:scale-110 transition-transform shrink-0"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span>મળવું છે? 💬</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* SECTION 3: ગુજ્જુ ટેક શબ્દકોશ (The Gujju Tech Dictionary) */}
        <BlurFade delay={0.18} inView>
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
        <BlurFade delay={0.22} inView>
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

        {/* SECTION 5 (SECOND LAST): લોકડાયરો & હાસ્ય દરબાર 🎭 */}
        <BlurFade delay={0.26} inView>
          <div className="space-y-6">
            {/* Header Row 1: Title + Scroll Buttons */}
            <div className="flex items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400">
                  <IconBrandYoutube className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                    લોકડાયરો & હાસ્ય દરબાર 🎭
                  </h2>
                  <p className="text-xs text-zinc-400">
                    માયાભાઈ આહીર, સાંઈરામ દવે, ધીરૂભાઈ સરવૈયા અને રાજભા ગઢવીનો અસલ હાસ્ય ડાયરો & વીર રસ
                  </p>
                </div>
              </div>

              {/* Scroll Arrows */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleScroll(dayroScrollRef, "left")}
                  aria-label="Scroll Left"
                  className="p-2 sm:p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScroll(dayroScrollRef, "right")}
                  aria-label="Scroll Right"
                  className="p-2 sm:p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs for Dayro */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: "all", label: "બધા વિડીયો ✨" },
                { id: "hasya", label: "હાસ્ય ડાયરો & જોક્સ 😂" },
                { id: "veer-ras", label: "વીર રસ & સાહિત્ય ⚔️" },
                { id: "jugalbandhi", label: "મહા જુગલબંધી 🔥" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playTapSound("hover");
                    setSelectedDayroCat(tab.id);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedDayroCat === tab.id
                      ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dayro Horizontal Carousel */}
            <div
              ref={dayroScrollRef}
              className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 pt-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-zinc-900/60 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-500/40 hover:[&::-webkit-scrollbar-thumb]:bg-amber-500 [&::-webkit-scrollbar-thumb]:rounded-full"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(245, 158, 11, 0.4) rgba(24, 24, 27, 0.6)",
              }}
            >
              {filteredDayroVideos.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handlePlayVideo(video)}
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-red-500/50 overflow-hidden cursor-pointer flex flex-col gap-3 transition-all shadow-xl group p-2.5"
                >
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[10px] font-mono text-zinc-300 font-medium flex items-center gap-1">
                      <IconBrandYoutube className="w-3.5 h-3.5 text-red-500" />
                      <span>HD</span>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-500/90 text-white text-[10px] font-bold">
                      {video.categoryLabel}
                    </div>
                  </div>

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

        {/* SECTION 6 (LAST): Bottom Outro CTA */}
        <BlurFade delay={0.3} inView>
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-amber-500/20 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-100 font-sans">
              જલસા કરો બાપ, મોજમાં રહેવું! 🔥
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              ગુજરાતી લોકસંસ્કૃતિ, લોક સંગીત, હાસ્ય દરબાર અને આર્ટિફિશિયલ ઇન્ટેલિજન્સનું અનોખું સંગમ.
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
