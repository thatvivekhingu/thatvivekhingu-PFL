"use client";

import React, { useState } from "react";
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
  description: string;
}

const DAYRO_VIDEOS: DayroVideo[] = [
  // 1. Comedy Videos (New)
  {
    id: "mayabhai-badhdati",
    artist: "માયાભાઈ આહીર (Mayabhai Ahir)",
    title: "હાસ્ય ની બધડાટી (હસવાની ૧૦૦% ગેરેંટી)",
    category: "comedy",
    categoryLabel: "હાસ્ય ડાયરો",
    tag: "New Jokes",
    youtubeId: "aE3_WjWz9tc",
    thumbnail: "https://img.youtube.com/vi/aE3_WjWz9tc/hqdefault.jpg",
    description: "માયાભાઈ આહીરના અસલ દેશી અંદાજમાં નોન-સ્ટોપ પેટ પકડીને હસાવતા જોક્સ.",
  },
  {
    id: "sairam-hasya-varsad",
    artist: "સાંઈરામ દવે (Sairam Dave)",
    title: "નોન-સ્ટોપ હાસ્યનો વરસાદ (સાંઈરામ નો હાસ્ય દરબાર)",
    category: "comedy",
    categoryLabel: "હાસ્ય દરબાર",
    tag: "Full Comedy",
    youtubeId: "9N4--Ldqhuc",
    thumbnail: "https://img.youtube.com/vi/9N4--Ldqhuc/hqdefault.jpg",
    description: "સાંઈરામ દવેનો જાણીતો હાસ્ય દરબાર — આધુનિક જીવન અને સમાજ પર મજેદાર કટાક્ષ.",
  },
  {
    id: "hitesh-antala-jokes",
    artist: "હિતેશ અંટાળા (Hitesh Antala)",
    title: "સાવ નવા જથ્થાબંધ જોક્સ & હાસ્ય મહેફિલ",
    category: "comedy",
    categoryLabel: "હાસ્ય ડાયરો",
    tag: "Non-Stop Jokes",
    youtubeId: "f2vHjuiIpqQ",
    thumbnail: "https://img.youtube.com/vi/f2vHjuiIpqQ/hqdefault.jpg",
    description: "હિતેશ અંટાળાના અંદાજમાં કાઠિયાવાડની દેશી રમૂજ અને જથ્થાબંધ જોક્સ.",
  },
  {
    id: "dhirubhai-vandripanu",
    artist: "ધીરૂભાઈ સરવૈયા (Dhirubhai Sarvaiya)",
    title: "વાંદરીપાનું — સુપરહિટ દેશી જોક્સ",
    category: "comedy",
    categoryLabel: "દેશી રમૂજ",
    tag: "Superhit Comedy",
    youtubeId: "FEZPU-4lMo8",
    thumbnail: "https://img.youtube.com/vi/FEZPU-4lMo8/hqdefault.jpg",
    description: "ધીરૂભાઈ સરવૈયાનું લોકપ્રિય 'વાંદરીપાનું' સ્પેશિયલ હાસ્ય પર્ફોર્મન્સ.",
  },
  {
    id: "dhirubhai-lagan-hapta",
    artist: "ધીરૂભાઈ સરવૈયા (Dhirubhai Sarvaiya)",
    title: "લગન કરો હપ્તા ભરો (Lagan Karo Hapta Bharo)",
    category: "comedy",
    categoryLabel: "દેશી રમૂજ",
    tag: "Family Comedy",
    youtubeId: "p7pA36rZJiw",
    thumbnail: "https://img.youtube.com/vi/p7pA36rZJiw/hqdefault.jpg",
    description: "લગ્ન જીવન અને સંસારની વાતો પર ધીરૂભાઈ સરવૈયાના સદાબહાર હાસ્યના ફુવારા.",
  },
  {
    id: "jitubhai-doshi-jeans",
    artist: "જીતુભાઈ દ્વારકાવાળા (Jitubhai Dwarkawada)",
    title: "ડોશીનું જીન્સ (Doshi Nu Jeans Comedy)",
    category: "comedy",
    categoryLabel: "હાસ્ય ડાયરો",
    tag: "Viral Jokes",
    youtubeId: "6LWx0N_MCZU",
    thumbnail: "https://img.youtube.com/vi/6LWx0N_MCZU/hqdefault.jpg",
    description: "જીતુભાઈ દ્વારકાવાળાની વાર્તાશૈલી અને હસાવીને લોટપોટ કરી દેતો ડાયરો.",
  },

  // 2. Dayro & Folk Videos
  {
    id: "kirtidan-rajbha-jugalbandhi",
    artist: "કીર્તિદાન ગઢવી & રાજભા ગઢવી",
    title: "બેસ્ટ જુગલબંધી લોકડાયરો (રાપર કચ્છ લાઈવ)",
    category: "jugalbandhi",
    categoryLabel: "મહા જુગલબંધી",
    tag: "Historic Jugalbandhi",
    youtubeId: "i8POjs66f9g",
    thumbnail: "https://img.youtube.com/vi/i8POjs66f9g/hqdefault.jpg",
    description: "કીર્તિદાન ગઢવી અને રાજભા ગઢવીની ઐતિહાસિક જુગલબંધી — રાપર કચ્છ લાઈવ પ્રોગ્રામ.",
  },
  {
    id: "rajbha-kashtriya",
    artist: "રાજભા ગઢવી (Rajbha Gadhvi)",
    title: "ક્ષત્રિયની વાત & રૂંવાડા ઊભા કરતો વીર રસ",
    category: "sahitya",
    categoryLabel: "વીર રસ & સાહિત્ય",
    tag: "Veer Ras Dayro",
    youtubeId: "LlsYNC4l0GA",
    thumbnail: "https://img.youtube.com/vi/LlsYNC4l0GA/hqdefault.jpg",
    description: "ક્ષત્રિય ધર્મ, બલિદાન અને શૌર્યની વાતો કરતાં રૂંવાડા ઊભા કરી દેતો રાજભા ગઢવીનો ડાયરો.",
  },
  {
    id: "rajdan-vadodara",
    artist: "રાજદાન ગઢવી (Rajdan Gadhvi)",
    title: "સુપર હિટ લોકડાયરો (વડોદરા લાઈવ ડાયરો)",
    category: "sahitya",
    categoryLabel: "લોક સાહિત્ય & ડાયરો",
    tag: "Vadodara Live",
    youtubeId: "qW1ss5bq90A",
    thumbnail: "https://img.youtube.com/vi/qW1ss5bq90A/hqdefault.jpg",
    description: "રાજદાન ગઢવીનો વડોદરા લાઈવ કાર્યક્રમ — અસલ ચારણી સાહિત્ય અને ભવ્ય લોકડાયરો.",
  },
  {
    id: "kirtidan-kanudo",
    artist: "કીર્તિદાન ગઢવી (Kirtidan Gadhvi)",
    title: "દેશી તાલે કાનુડાના ગીતો & રાસ",
    category: "music",
    categoryLabel: "કાનુડાના ગીતો",
    tag: "Krishna Songs",
    youtubeId: "KpFUjNxGCbo",
    thumbnail: "https://img.youtube.com/vi/KpFUjNxGCbo/hqdefault.jpg",
    description: "કીર્તિદાન ગઢવીના સૂર અને દેશી ઢોલના તાલે કાનુડાના અલ્ટીમેટ ગીતોની રમઝટ.",
  },
  {
    id: "kirtidan-rasiyo",
    artist: "કીર્તિદાન ગઢવી (Kirtidan Gadhvi)",
    title: "રસિયો રૂપાળો રંગરેલીયો (વેજાગામ લાઈવ)",
    category: "music",
    categoryLabel: "લોક સંગીત & ગરબા",
    tag: "Superhit Folk",
    youtubeId: "_IMnebRMPcY",
    thumbnail: "https://img.youtube.com/vi/_IMnebRMPcY/hqdefault.jpg",
    description: "વેજાગામ લાઈવ પ્રોગ્રામમાં કીર્તિદાન ગઢવીનું સુપરહિટ લોકગીત 'રસિયો રૂપાળો રંગરેલીયો'.",
  },
  {
    id: "kirtidan-dakor",
    artist: "કીર્તિદાન ગઢવી (Kirtidan Gadhvi)",
    title: "ડાકોરના ઠાકોર (અમરેલી લાઈવ પોલીસ ડાયરો)",
    category: "music",
    categoryLabel: "ભક્તિ & ડાયરો",
    tag: "Dakor Na Thakor",
    youtubeId: "w3O3aikm4xM",
    thumbnail: "https://img.youtube.com/vi/w3O3aikm4xM/hqdefault.jpg",
    description: "અમરેલી લાઈવ પોલીસ ડાયરામાં કીર્તિદાન ગઢવીના કંઠે ગવાયેલું પ્રખ્યાત ભજન 'ડાકોરના ઠાકોર'.",
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
    num: "૧",
    title: "સવારનો નિયમ",
    desc: "કડક કટિંગ ચા અને ગાંઠિયા વગર મગજનું CPU સ્ટાર્ટ નથી થતું.",
    icon: "☕",
  },
  {
    num: "૨",
    title: "વેપારનો નિયમ",
    desc: "ક્લાયન્ટને હંમેશા સમય પહેલા ડિલિવરી આપવી — આ ગુજરાતીનો પાકો વેપાર છે.",
    icon: "🤝",
  },
  {
    num: "૩",
    title: "કોડિંગનો નિયમ",
    desc: "કોડ ભલે ગમે તેટલો મોટો હોય, લોજિક એકદમ સીધું અને પાણી જેવું ચોખ્ખું હોવું જોઈએ.",
    icon: "💻",
  },
  {
    num: "૪",
    title: "જલસાનો નિયમ",
    desc: "કામ ગમે તેટલું હોય, પણ ડાયરો, હાસ્ય, મિત્રો અને પરિવાર સાથે મોજ કાયમ રહેવી જોઈએ!",
    icon: "🎉",
  },
];

export default function GujjuversePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<DayroVideo | null>(null);

  const filteredVideos =
    selectedCategory === "all"
      ? DAYRO_VIDEOS
      : DAYRO_VIDEOS.filter((v) => v.category === selectedCategory);

  const handlePlayVideo = (video: DayroVideo) => {
    playTapSound("pop");
    setActiveVideo(video);
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <p className="text-xs sm:text-sm text-zinc-400">
                  {activeVideo.description}
                </p>
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
              <span>મુખ્ય પોર્ટફોલિયો પર પાછા જાઓ</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>દેશી કરોડિયો સ્પેસ 🕷️</span>
            </div>
          </div>
        </BlurFade>

        {/* Hero Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase">
              <IconSparkles className="w-4 h-4 animate-bounce" />
              <span>ગુજરાતી હાસ્ય દરબાર & લોકડાયરો</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                ગુજ્જુ વર્સ
              </span>{" "}
              <span>🎭</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-400 font-medium leading-relaxed">
              કોડિંગ સાથે અસલ ગુજરાતી હાસ્ય ડાયરો, દેશી જોક્સ અને લોકસંગીતની મોજ!
            </p>
          </div>
        </BlurFade>

        {/* SECTION 1: હાસ્ય ડાયરો & લોકસંગીત (YouTube Lounge) */}
        <BlurFade delay={0.15} inView>
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <IconBrandYoutube className="w-6 h-6 text-red-500" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                    ગુજરાતી હાસ્ય & લોકડાયરો મહેફિલ
                  </h2>
                  <p className="text-xs text-zinc-400">
                    માયાભાઈ, સાંઈરામ, ધીરૂભાઈ, કીર્તિદાન અને રાજભાના લાઈવ વિડીયો
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "બધા વિડીયો (૧૨)" },
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
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handlePlayVideo(video)}
                  className="group relative rounded-3xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-500/60 overflow-hidden cursor-pointer flex flex-col justify-between transition-all shadow-xl"
                >
                  {/* Thumbnail / Header */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                    {/* Play Badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <IconPlayerPlay className="w-6 h-6 fill-black translate-x-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-zinc-700 text-[11px] font-mono text-amber-400 font-bold">
                      {video.tag}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <span className="text-xs font-mono text-amber-400 font-semibold block">
                      {video.artist}
                    </span>
                    <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {video.description}
                    </p>
                  </div>

                  <div className="p-4 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-amber-400 transition-colors">
                    <span>ક્લિક કરીને જુઓ</span>
                    <span className="text-amber-400">Play Video ▶</span>
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
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                  ગુજ્જુ ટેક શબ્દકોશ 📖
                </h2>
                <p className="text-xs text-zinc-400">
                  કોડિંગ અને એન્જિનિયરિંગ શબ્દોની અસલ ગુજરાતી વ્યાખ્યા
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
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
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
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                  અમદાવાદી ડેવલપરના નિયમો 📜
                </h2>
                <p className="text-xs text-zinc-400">
                  કોડિંગ, વેપાર અને જિંદગી જીવવાની સોનેરી કળા
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
                      <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold flex items-center justify-center text-sm">
                        {rule.num}
                      </span>
                      <h3 className="font-bold text-base text-zinc-100 group-hover:text-amber-300 transition-colors">
                        {rule.title}
                      </h3>
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
            <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
              જલસા કરો બાપ, મોજમાં રહેવું! 🔥
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
              ગુજરાતી લોકસાહિત્ય, હાસ્ય દરબાર અને આર્ટિફિશિયલ ઇન્ટેલિજન્સનું અનોખું સંગમ.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                onClick={() => playTapSound("pop")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-bold transition-all cursor-pointer"
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
