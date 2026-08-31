"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft,
  IconBrandYoutube,
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconCircleCheckFilled,
  IconCoffee,
  IconMapPin,
  IconCode,
  IconTerminal2,
  IconBrandWhatsapp,
  IconPlayerPlayFilled,
  IconExternalLink,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

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
    location: "Raspan Arcade / SP Ring Road, Nikol",
    zone: "East Ahmedabad",
    desc: "કડક મસાલા ચા, મસ્કા બન અને ટેક આઈડિયાઝ પર ગહન ચર્ચા.",
    mapsUrl: "https://maps.app.goo.gl/mwWKYR9xQxzmoBR6A",
    image: "/teapost/nikol.jpg",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Nikol પર મળીએ ને આઈડિયા ડિસ્કસ કરીએ ☕",
  },
  {
    id: "science-city",
    name: "Tea Post — Science City",
    gujjuName: "ટી પોસ્ટ — સાયન્સ સીટી",
    location: "Science City Road, Sola",
    zone: "Tech & Startup Zone",
    desc: "AI, ડીપ લર્નિંગ, પ્રોડક્ટ બિલ્ડિંગ અને સ્ટાર્ટઅપ પ્લાનિંગ.",
    mapsUrl: "https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5",
    image: "/teapost/science-city.png",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Science City પર મળીએ ને AI / Tech ડિસ્કસ કરીએ ☕",
  },
  {
    id: "maninagar",
    name: "Tea Post — Maninagar",
    gujjuName: "ટી પોસ્ટ — મણિનગર",
    location: "Maninagar, Near Kankaria Lake",
    zone: "South Ahmedabad",
    desc: "કાંકરિયાની શાંત વાઇબ્સ, ગરમ ચા અને બિઝનેસ કૉલેબોરેશન.",
    mapsUrl: "https://maps.app.goo.gl/XQgNsuKokUm7CuBq8",
    image: "/teapost/maninagar.png",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Maninagar પર મળીએ ને કૉલેબોરેશન કરીએ ☕",
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

export default function GujjuversePage() {
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const dayroScrollRef = useRef<HTMLDivElement>(null);

  const filteredVideos =
    selectedVideoCategory === "all"
      ? ALL_DAYRO_VIDEOS
      : ALL_DAYRO_VIDEOS.filter((v) => v.category === selectedVideoCategory);

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

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-white selection:text-black font-gujarati antialiased relative overflow-x-hidden pt-28 sm:pt-36 pb-16 sm:pb-24">
      {/* Precision Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[350px] bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,rgba(255,255,255,0.04),rgba(0,0,0,0))] pointer-events-none -z-10" />

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
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-mono text-zinc-400 font-semibold uppercase">
                    {activeVideo.artist}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100 truncate max-w-md">
                    {activeVideo.title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    playTapSound("hover");
                    setActiveVideo(null);
                  }}
                  className="p-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>

              {/* YouTube Embed */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
        {/* ========================================================
            HERO HEADER (Clean, Professional & Free of Loud Yellow Badges)
            ======================================================== */}
        <BlurFade delay={0.05} inView>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
                <Image
                  src="/chai-kitli-logo.png"
                  alt="ચાની કિટલી લોગો"
                  fill
                  sizes="(max-width: 640px) 80px, 112px"
                  className="object-contain drop-shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:scale-105 transition-transform"
                  priority
                />
              </div>

              <div className="space-y-1 min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100 leading-snug">
                  મોટાભાગના તગડા આઈડિયા ચાની કિટલી પર જ બને છે!
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
                  ચાલો ચા પીતાં પીતાં ભેગા થઈએ ને કંઈક મોટું બનાવીએ. અમદાવાદના ડેવલપર્સ, કોડિંગ, લોકડાયરો અને દેશી મોજ.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
              <Link
                href="/#hero"
                onClick={() => playTapSound("pop")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
              >
                <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Hero</span>
              </Link>
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            UNIFIED BENTO GRID (Developer Telemetry Style)
            ======================================================== */}
        <BlurFade delay={0.08} inView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

            {/* 3 TEA POST LOCATION CARDS (Clean Minimalist Design) */}
            {CHAI_SPOTS.map((spot) => (
              <div
                key={spot.id}
                className="relative h-full rounded-xl border border-zinc-800 p-2 md:rounded-2xl md:p-2 bg-zinc-950/40 shadow-lg"
              >
                <GlowingEffect
                  spread={40}
                  glow={false}
                  disabled={true}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="group/glow relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-lg md:rounded-xl border border-zinc-800/80 p-4 bg-zinc-950/90 shadow-[0px_0px_27px_0px_#141414] transition-all hover:border-zinc-700">
                  <SpotlightGlow color="rgba(255, 255, 255, 0.08)" />

                  {/* Header */}
                  <div className="flex items-center gap-2 border-b border-zinc-900 pb-2.5">
                    <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                      <IconCoffee className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-100 tracking-tight">
                      {spot.gujjuName}
                    </h3>
                  </div>

                  {/* Image with Address */}
                  <div>
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800/80">
                      <Image
                        src={spot.image}
                        alt={spot.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover group-hover/glow:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 left-2 right-2 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm text-zinc-300 text-[10px] font-mono font-medium flex items-center gap-1 border border-zinc-800/60">
                        <IconMapPin className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="truncate">{spot.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
                    <a
                      href={spot.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTapSound("pop")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition-all group/btn"
                    >
                      <IconMapPin className="w-3 h-3 text-zinc-400" />
                      <span>Maps</span>
                      <IconExternalLink className="w-3 h-3 text-zinc-500 group-hover/btn:text-zinc-300 transition-colors" />
                    </a>

                    <a
                      href={`https://wa.me/918866688575?text=${encodeURIComponent(spot.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTapSound("pop")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer group/wa"
                    >
                      <IconBrandWhatsapp className="w-3.5 h-3.5" />
                      <span>મળવું છે?</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* ========================================================
                LOK DAYRO & HASYA DARBAR BENTO TILE (Full 3-Column Width)
                ======================================================== */}
            <div className="md:col-span-3 relative rounded-xl border border-zinc-800 p-2 md:rounded-2xl md:p-2 bg-zinc-950/40 shadow-lg">
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

                {/* Category Tabs (Clean Modern High-Contrast Filter) */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "બધા વિડીયો ✨" },
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
                          <IconCircleCheckFilled className="w-3 h-3 text-zinc-400 shrink-0" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ========================================================
                GUJJU TECH DICTIONARY BENTO TILE (col-span-2)
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
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 hover:border-cyan-500/40 transition-all space-y-1 group"
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
                GUJJU DEVELOPER MANIFESTO BENTO TILE (col-span-1)
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
                      className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1"
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
                BOTTOM CONNECT & JALSA BENTO TILE (Full Width)
                ======================================================== */}
            <div className="md:col-span-3 relative rounded-xl border border-zinc-800 p-2 md:rounded-2xl md:p-2 bg-zinc-950/40 shadow-lg">
              <GlowingEffect
                spread={40}
                glow={false}
                disabled={true}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="group/glow relative flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden rounded-lg md:rounded-xl border border-zinc-800/80 p-5 bg-zinc-950/90 shadow-[0px_0px_27px_0px_#141414]">
                <SpotlightGlow color="rgba(255, 255, 255, 0.08)" />

                <div className="flex items-center gap-3.5 text-left">
                  <div className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-2xl shrink-0">
                    ☕
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-100">
                      જલસા કરો બાપ, મોજમાં રહેવું! 🔥
                    </h3>
                    <p className="text-xs text-zinc-400">
                      ચાની ચૂસકી, દેશી ડાયરો અને ટેકનોલોજીની મોજ — ચાલો WhatsApp પર કનેક્ટ થઈએ!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
                  <a
                    href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%9A%E0%AA%BE%E0%AA%B2%E0%AB%8B%20%E0%AA%9A%E0%AA%BE%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AE%E0%AA%B3%E0%AB%80%E0%AA%8F%20%E0%AA%A8%E0%AB%87%20%E0%AA%95%E0%AA%82%E0%AA%88%E0%AA%95%20%E0%AA%AE%E0%AB%8B%E0%AA%9F%E0%AB%81%E0%AA%82%20%E0%AA%AC%E0%AA%A8%E0%AA%BE%E0%AA%B5%E0%AB%80%E0%AA%8F%20%E2%98%95"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTapSound("pop")}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <IconBrandWhatsapp className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <Link
                    href="/#hero"
                    onClick={() => playTapSound("pop")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    <IconArrowLeft className="w-3.5 h-3.5" />
                    <span>Hero</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </BlurFade>
      </div>
    </div>
  );
}
