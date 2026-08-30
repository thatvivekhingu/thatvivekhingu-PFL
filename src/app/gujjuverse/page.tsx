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
  category: "comedy" | "sahitya" | "music";
  categoryLabel: string;
  tag: string;
  youtubeId: string;
  thumbnail: string;
  description: string;
}

const DAYRO_VIDEOS: DayroVideo[] = [
  {
    id: "mayabhai-1",
    artist: "માયાભાઈ આહીર (Mayabhai Ahir)",
    title: "અસલ કાઠિયાવાડી હાસ્ય ડાયરો & જોક્સ",
    category: "comedy",
    categoryLabel: "હાસ્ય ડાયરો",
    tag: "Non-Stop Comedy",
    youtubeId: "d_jG-G12fR4",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    description: "માયાભાઈના દેશી અંદાજ અને ગામડાની વાતો સાથે પેટ પકડીને હસાવતો લોકડાયરો.",
  },
  {
    id: "sairam-1",
    artist: "સાંઈરામ દવે (Sairam Dave)",
    title: "ગ્લોબલ ગુજરાતી & હાસ્ય દરબાર",
    category: "comedy",
    categoryLabel: "હાસ્ય ડાયરો",
    tag: "Social Satire",
    youtubeId: "7GzZl73RzXk",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    description: "આધુનિક જીવનશૈલી, મોબાઈલ અને સમાજ પર સાંઈરામ દવેના તીખા અને મીઠા કટાક્ષ.",
  },
  {
    id: "kirtidan-1",
    artist: "કીર્તિદાન ગઢવી (Kirtidan Gadhvi)",
    title: "મોગલ છેડતા કાળો નાગ & તહૂકાર ડાયરો",
    category: "music",
    categoryLabel: "લોક સંગીત & ભજન",
    tag: "Live Mehfil",
    youtubeId: "K2yqP5FqK2I",
    thumbnail: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80",
    description: "કીર્તિદાન ગઢવીના દમદાર અવાજમાં મોગલ મા ની સ્તુતિ અને ભવ્ય લોકડાયરો.",
  },
  {
    id: "rajbha-1",
    artist: "રાજભા ગઢવી (Rajbha Gadhvi)",
    title: "ગીરની વાતો, સિંહ અને સૌરાષ્ટ્રની રસધાર",
    category: "sahitya",
    categoryLabel: "લોક સાહિત્ય & વીર રસ",
    tag: "Gir Culture",
    youtubeId: "t2fV6j6W8nI",
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
    description: "ગીરના માલધારીઓ, ડાલામથ્થા સિંહ અને ક્ષત્રિય વીરતાની અસલ ચારણી સાહિત્યિક વાતો.",
  },
  {
    id: "dhirubhai-1",
    artist: "ધીરૂભાઈ સરવૈયા (Dhirubhai Sarvaiya)",
    title: "કાઠિયાવાડની દેશી રમૂજ & નોન-સ્ટોપ જોક્સ",
    category: "comedy",
    categoryLabel: "હાસ્ય ડાયરો",
    tag: "Classic Humor",
    youtubeId: "LzE7s9wJ3mA",
    thumbnail: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    description: "ધીરૂભાઈ સરવૈયાના સહજ અને દેશી અંદાજના સદાબહાર હાસ્યના ફુવારા.",
  },
  {
    id: "osman-1",
    artist: "ઓસમાન મીર (Osman Mir)",
    title: "સૂફી, ગઝલ અને લોકડાયરાની રંગત",
    category: "music",
    categoryLabel: "લોક સંગીત & ભજન",
    tag: "Sufi & Folk",
    youtubeId: "fE_nF2bL_J4",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
    description: "રૂહાનિયત અને સુરીલા અવાજ સાથે ગુજરાતી-સૂફી સંગીતની અલૌકિક મહેફિલ.",
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
    desc: "કામ ગમે તેટલું હોય, પણ ગરબા, મિત્રો અને પરિવાર સાથે મોજ કાયમ રહેવી જોઈએ!",
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
              <span>અસલ ગુજરાતી સાહિત્ય & લોકડાયરો</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                ગુજ્જુ વર્સ
              </span>{" "}
              <span>🎭</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-400 font-medium leading-relaxed">
              કોડિંગ સાથે સાચો ગુજરાતી લોકડાયરો, હાસ્ય દરબાર અને અસલ સૌરાષ્ટ્રની રંગત!
            </p>
          </div>
        </BlurFade>

        {/* SECTION 1: લોકડાયરો & સંગીત (YouTube Dayro Lounge) */}
        <BlurFade delay={0.15} inView>
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <IconBrandYoutube className="w-6 h-6 text-red-500" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100">
                    ગુજરાતી લોકડાયરો & હાસ્ય મહેફિલ
                  </h2>
                  <p className="text-xs text-zinc-400">
                    ક્લિક કરીને લાઈવ ડાયરો સાંભળો અને મોજ કરો
                  </p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "બધા ડાયરા" },
                  { id: "comedy", label: "હાસ્ય ડાયરો 😂" },
                  { id: "sahitya", label: "લોક સાહિત્ય ⚔️" },
                  { id: "music", label: "લોક સંગીત 🎶" },
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
              ગુજરાતી લોકસાહિત્ય અને આર્ટિફિશિયલ ઇન્ટેલિજન્સનું અનોખું સંગમ.
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
