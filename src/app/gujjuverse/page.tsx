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
  IconRocket,
  IconUsers,
  IconTerminal2,
  IconBrandWhatsapp,
  IconPlayerPlayFilled,
  IconCpu,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

interface VideoItem {
  id: string;
  artist: string;
  title: string;
  category: "music" | "hasya" | "veer-ras" | "jugalbandhi";
  categoryLabel: string;
  youtubeId: string;
  thumbnail: string;
  duration?: string;
}

const CHAI_SPOTS = [
  {
    id: "nikol",
    name: "Tea Post — Nikol",
    gujjuName: "ટી પોસ્ટ — નિકોલ",
    location: "Raspan Arcade / SP Ring Road, Nikol",
    zone: "East Ahmedabad Hub",
    desc: "કડક મસાલા ચા, મસ્કા બન અને નેક્સ્ટ-લેવલ ટેક આઈડિયાઝ પર ગહન ચર્ચા.",
    mapsUrl: "https://maps.app.goo.gl/mwWKYR9xQxzmoBR6A",
    image: "/teapost/nikol.jpg",
    tags: ["Masala Chai", "Maska Bun", "Tech Talk"],
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Nikol પર મળીએ ને આઈડિયા ડિસ્કસ કરીએ ☕",
  },
  {
    id: "science-city",
    name: "Tea Post — Science City",
    gujjuName: "ટી પોસ્ટ — સાયન્સ સીટી",
    location: "Science City Road, Sola",
    zone: "Tech & Startup Zone",
    desc: "AI, ડીપ લર્નિંગ, પ્રોડક્ટ બિલ્ડિંગ અને સ્ટાર્ટઅપ પ્લાનિંગ મીટઅપ.",
    mapsUrl: "https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5",
    image: "/teapost/science-city.png",
    tags: ["AI Meetups", "Product Collab", "Startups"],
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Science City પર મળીએ ને AI / Tech ડિસ્કસ કરીએ ☕",
  },
  {
    id: "maninagar",
    name: "Tea Post — Maninagar",
    gujjuName: "ટી પોસ્ટ — મણિનગર",
    location: "Maninagar, Near Kankaria Lake",
    zone: "South Ahmedabad Hub",
    desc: "કાંકરિયાની શાંત વાઇબ્સ, ગરમ ચા અને બિઝનેસ કૉલેબોરેશન.",
    mapsUrl: "https://maps.app.goo.gl/XQgNsuKokUm7CuBq8",
    image: "/teapost/maninagar.png",
    tags: ["Kankaria Vibes", "Networking", "Founder Meet"],
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Maninagar પર મળીએ ને કૉલેબોરેશન કરીએ ☕",
  },
];

const MEETUPS = [
  {
    id: "m1",
    title: "AI in Everyday Apps & Web",
    location: "Tea Post — Science City",
    date: "01 JUN",
    time: "5:00 PM",
    badge: "AI / ML",
    color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    desc: "LLMs, Agentic Coding અને Web integration પર લાઈવ ડેમો & ચર્ચા.",
  },
  {
    id: "m2",
    title: "Modern Fullstack & Next.js Architecture",
    location: "Tea Post — Nikol",
    date: "08 JUN",
    time: "5:30 PM",
    badge: "Fullstack",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    desc: "Server components, Caching અને Production ready Next.js 15 apps.",
  },
  {
    id: "m3",
    title: "Founder Meetup & Networking Evening",
    location: "Tea Post — Maninagar",
    date: "15 JUN",
    time: "6:00 PM",
    badge: "Networking",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    desc: "ડેવલપર્સ, ડિઝાઇનર્સ અને બિઝનેસ માઇન્ડ્સ માટે ઓપન નેટવર્કિંગ.",
  },
];

const COLLAB_TRACKS = [
  {
    id: "c1",
    title: "ઓપન સોર્સ પ્રોજેક્ટ્સ પર કોલેબ",
    desc: "રિયલ વર્લ્ડ સોફ્ટવેર ટૂલ્સ, લાઈબ્રેરીઓ અને UI કમ્પોનન્ટ્સ સાથે મળીને બિલ્ડ કરીએ.",
    icon: <IconCode className="w-5 h-5 text-indigo-400" />,
    badge: "Open Source",
  },
  {
    id: "c2",
    title: "આઈડિયા થી પ્રોડક્ટ (0 to 1)",
    desc: "તમારો નવો આઈડિયા શેર કરો, ફીડબેક મેળવો અને પ્રોટોટાઈપ ઝડપથી લોન્ચ કરો.",
    icon: <IconRocket className="w-5 h-5 text-amber-400" />,
    badge: "MVP Building",
  },
  {
    id: "c3",
    title: "ટેક પાર્ટનર & કોફાઉન્ડર શૉધ",
    desc: "બિઝનેસ માટે વિશ્વાસપાત્ર ટેક પાર્ટનર અથવા સ્માર્ટ કોફાઉન્ડર સાથે કનેક્ટ થાઓ.",
    icon: <IconUsers className="w-5 h-5 text-emerald-400" />,
    badge: "Co-founder",
  },
];

const GUJJU_DICTIONARY = [
  {
    term: "Bug (બગ)",
    gujju: "લોચો",
    desc: "કોડે કરેલી એવી ભૂલ જે આખી રાત ઊંઘ ના આવવા દે!",
    tag: "Core Term",
    emoji: "🐛",
  },
  {
    term: "Debugging",
    gujju: "ફોડ પાડવો",
    desc: "કોડમાં ક્યાં લોચો થયો છે એ ખોળી કાઢીને પાણી જેવું ચોખ્ખું કરવું.",
    tag: "Problem Solving",
    emoji: "🔍",
  },
  {
    term: "Merge Conflict",
    gujju: "ગોટો વળવો",
    desc: "બે જણાએ એક જ ફાઈલમાં હાથ નાખ્યો ને આખી ગિટ બ્રાન્ચમાં પંચાયત થઈ!",
    tag: "Git Slang",
    emoji: "⚡",
  },
  {
    term: "Client Meeting",
    gujju: "ચોરે પંચાત",
    desc: "જે વાત ૫ મિનિટના મેસેજમાં પતી જતી હોય એને ૨ કલાક મીટિંગમાં ખેંચવી.",
    tag: "Corporate",
    emoji: "💼",
  },
  {
    term: "Production Deploy",
    gujju: "શ્રી ગણેશ / ભગવાન ભરોસે",
    desc: "ચાલ્યું તો મોજ અને ના ચાલ્યું તો 'આપણે જોઈ લઈશું'!",
    tag: "DevOps",
    emoji: "🚀",
  },
  {
    term: "Stack Overflow",
    gujju: "સંજય દ્રષ્ટિ",
    desc: "જ્યાં દુનિયાના તમામ કોડિંગ લોચાના દેશી રામબાણ ઉપાય મળી જાય.",
    tag: "Knowledge Base",
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
  const [activeTab, setActiveTab] = useState<"spots" | "meetups" | "collab">("spots");
  const [activeDictionaryTab, setActiveDictionaryTab] = useState<"dictionary" | "manifesto">("dictionary");
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
    <div className="min-h-screen w-full bg-[#050507] text-zinc-100 selection:bg-amber-400 selection:text-black font-gujarati antialiased relative overflow-x-hidden pb-24">
      {/* Precision Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))] pointer-events-none -z-10" />
      <div className="absolute top-[1200px] right-0 w-[500px] h-[500px] bg-amber-500/[0.04] blur-[150px] pointer-events-none -z-10" />

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-zinc-950/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            >
              {/* Modal Window Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 pr-2 border-r border-white/10">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">
                      {activeVideo.artist}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-100 truncate max-w-md">
                      {activeVideo.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playTapSound("hover");
                    setActiveVideo(null);
                  }}
                  className="p-2 rounded-full bg-zinc-900 border border-white/10 hover:border-amber-400 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <IconX className="w-4 h-4" />
                </button>
              </div>

              {/* YouTube Embed */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-mono font-bold transition-all"
                >
                  <IconBrandYoutube className="w-4 h-4 text-red-500" />
                  <span>Open in YouTube</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-12 sm:space-y-16">
        {/* ========================================================
            1. macOS Style Top Menu Bar / Header
            ======================================================== */}
        <BlurFade delay={0.04} inView>
          <header className="flex items-center justify-between px-4 py-3 rounded-2xl bg-zinc-900/40 backdrop-blur-xl border border-white/[0.08] shadow-sm">
            <Link
              href="/#hero"
              onClick={() => playTapSound("pop")}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 hover:text-white transition-colors group"
            >
              <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Portfolio</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-200 font-semibold">GujjuVerse Pro</span>
            </Link>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-zinc-400">
                <IconCpu className="w-3.5 h-3.5 text-amber-400" />
                <span>Desi Engine 1.0</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active • Ahmedabad</span>
              </div>
            </div>
          </header>
        </BlurFade>

        {/* ========================================================
            2. Hero Banner: Chai & Code Studio
            ======================================================== */}
        <BlurFade delay={0.08} inView>
          <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-10 overflow-hidden shadow-2xl">
            <SpotlightGlow color="rgba(245, 158, 11, 0.12)" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Heading & Calls to Action */}
              <div className="md:col-span-7 space-y-6 text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-mono font-bold">
                  <IconCoffee className="w-3.5 h-3.5" />
                  <span>The Ahmedabad Tech & Chai Culture</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.15]">
                    ચાલો મળીએ, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                      આઈડિયા શેર કરીએ. ☕
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
                    મોટાભાગના તગડા આઈડિયા ચાની કિટલી પર જ બને છે! ડેવલપર, ડિઝાઇનર કે સ્ટુડન્ટ — બધા માટે કૉલેબોરેશન, કોડિંગ અને કટિંગ ચા.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%9A%E0%AA%BE%E0%AA%B2%E0%AB%8B%20%E0%AA%9A%E0%AA%BE%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AE%E0%AA%B3%E0%AB%80%E0%AA%8F%20%E0%AA%A8%E0%AB%87%20%E0%AA%95%E0%AA%82%E0%AA%88%E0%AA%95%20%E0%AA%AE%E0%AB%8B%E0%AA%9F%E0%AB%81%E0%AA%82%20%E0%AA%AC%E0%AA%A8%E0%AA%BE%E0%AA%B5%E0%AB%80%E0%AA%8F%20%E2%98%95"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTapSound("pop")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-bold transition-all shadow-sm group"
                  >
                    <IconBrandWhatsapp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>મળવું છે? WhatsApp (8866688575)</span>
                  </a>

                  <button
                    onClick={() => {
                      playTapSound("pop");
                      setActiveTab("spots");
                      const el = document.getElementById("studio-window");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-all"
                  >
                    <IconMapPin className="w-4 h-4 text-amber-400" />
                    <span>નજીકનો Tea Post શોધો</span>
                  </button>
                </div>

                {/* Social Counter */}
                <div className="flex items-center gap-3 pt-2 text-xs font-mono text-zinc-500">
                  <span className="flex h-2 w-2 rounded-full bg-amber-400" />
                  <span>1,000+ અમદાવાદ ડેવલપર્સ નેટવર્ક</span>
                </div>
              </div>

              {/* Right Column: Hero Visual Card */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group">
                  <Image
                    src="/chai-hero-cup.jpg"
                    alt="Steaming Cup of Tea on Desk"
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 bg-zinc-950/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      Tea Post Hubs
                    </span>
                    <span>Ahmedabad, GJ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            3. macOS Window: Chai & Collaboration Studio (Structured Tabs)
            ======================================================== */}
        <BlurFade delay={0.12} inView>
          <div
            id="studio-window"
            className="rounded-3xl bg-zinc-900/30 backdrop-blur-2xl border border-white/[0.08] overflow-hidden shadow-2xl space-y-6 p-4 sm:p-8"
          >
            {/* macOS Window Titlebar + Segmented Control */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <IconCoffee className="w-4 h-4 text-amber-400" />
                    <span>Ahmedabad Chai & Tech Studio</span>
                  </h2>
                </div>
              </div>

              {/* Apple Style Segmented Picker */}
              <div className="flex items-center bg-zinc-950/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
                {[
                  { id: "spots", label: "☕ Tea Post Hubs" },
                  { id: "meetups", label: "📅 Meetups" },
                  { id: "collab", label: "🤝 Collab & Co-founder" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playTapSound("hover");
                      setActiveTab(tab.id as typeof activeTab);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-zinc-800 text-white shadow-sm font-bold border border-white/10"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT 1: TEA POST HUBS (Structured Grid) */}
            {activeTab === "spots" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {CHAI_SPOTS.map((spot) => (
                  <div
                    key={spot.id}
                    className="group rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-amber-400/40 p-3.5 space-y-3.5 transition-all shadow-md hover:shadow-amber-500/5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Photo */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                        <Image
                          src={spot.image}
                          alt={spot.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-400 text-[10px] font-mono font-bold border border-amber-400/30">
                          {spot.zone}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="space-y-1.5 px-1">
                        <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                          {spot.gujjuName}
                        </h3>
                        <p className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                          <IconMapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span className="truncate">{spot.location}</span>
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                          {spot.desc}
                        </p>
                      </div>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-1.5 px-1 pt-1">
                        {spot.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-[10px] font-mono text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2 px-1">
                      <a
                        href={spot.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTapSound("pop")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
                      >
                        <IconMapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Google Maps</span>
                      </a>

                      <a
                        href={`https://wa.me/918866688575?text=${encodeURIComponent(spot.whatsappMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTapSound("pop")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                      >
                        <IconBrandWhatsapp className="w-3.5 h-3.5" />
                        <span>મળવું છે?</span>
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB CONTENT 2: MEETUPS */}
            {activeTab === "meetups" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {MEETUPS.map((meetup) => (
                  <div
                    key={meetup.id}
                    className="p-5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-amber-400/40 space-y-4 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${meetup.color}`}>
                          {meetup.badge}
                        </span>
                        <span className="text-xs font-mono text-amber-400 font-bold">
                          {meetup.date} • {meetup.time}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                        {meetup.title}
                      </h3>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {meetup.desc}
                      </p>

                      <p className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 pt-1">
                        <IconMapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{meetup.location}</span>
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/918866688575?text=${encodeURIComponent(`નમસ્તે વિવેક! મારે ${meetup.title} (${meetup.location}) Meetup માં RSVP કરવું છે.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTapSound("pop")}
                      className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      <IconBrandWhatsapp className="w-3.5 h-3.5" />
                      <span>RSVP on WhatsApp</span>
                    </a>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB CONTENT 3: COLLAB & CO-FOUNDER */}
            {activeTab === "collab" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {COLLAB_TRACKS.map((track) => (
                  <div
                    key={track.id}
                    className="p-5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-amber-400/40 space-y-4 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-zinc-900 border border-white/10">
                          {track.icon}
                        </div>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900 border border-white/10 text-zinc-300">
                          {track.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                        {track.title}
                      </h3>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {track.desc}
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/918866688575?text=${encodeURIComponent(`નમસ્તે વિવેક! મારે ${track.title} અંગે કૉલેબોરેશન / ચર્ચા કરવી છે.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playTapSound("pop")}
                      className="w-full py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold text-center transition-all flex items-center justify-center gap-1.5"
                    >
                      <IconBrandWhatsapp className="w-3.5 h-3.5" />
                      <span>Start Collab Discussion →</span>
                    </a>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </BlurFade>

        {/* ========================================================
            4. macOS Window: The Gujju Terminal (Dictionary & Manifesto)
            ======================================================== */}
        <BlurFade delay={0.16} inView>
          <div className="rounded-3xl bg-zinc-900/30 backdrop-blur-2xl border border-white/[0.08] overflow-hidden shadow-2xl space-y-6 p-4 sm:p-8">
            {/* Terminal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <IconTerminal2 className="w-4 h-4 text-cyan-400" />
                    <span>Gujju Tech Terminal & Slang</span>
                  </h2>
                </div>
              </div>

              {/* Segmented Picker */}
              <div className="flex items-center bg-zinc-950/80 p-1 rounded-xl border border-white/10 text-xs font-mono">
                <button
                  onClick={() => {
                    playTapSound("hover");
                    setActiveDictionaryTab("dictionary");
                  }}
                  className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeDictionaryTab === "dictionary"
                      ? "bg-zinc-800 text-white shadow-sm font-bold border border-white/10"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  📖 Tech Dictionary
                </button>
                <button
                  onClick={() => {
                    playTapSound("hover");
                    setActiveDictionaryTab("manifesto");
                  }}
                  className={`px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    activeDictionaryTab === "manifesto"
                      ? "bg-zinc-800 text-white shadow-sm font-bold border border-white/10"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  📜 Dev Manifesto
                </button>
              </div>
            </div>

            {/* Dictionary View */}
            {activeDictionaryTab === "dictionary" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              >
                {GUJJU_DICTIONARY.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-cyan-500/40 transition-all space-y-2.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-zinc-900 border border-white/[0.05]">
                        {item.tag}
                      </span>
                      <span className="text-xl">{item.emoji}</span>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-zinc-400">{item.term}</div>
                      <h3 className="text-lg font-extrabold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                        {item.gujju}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Manifesto View */}
            {activeDictionaryTab === "manifesto" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {GUJJU_RULES.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-zinc-950/70 border border-white/[0.08] hover:border-amber-400/40 transition-all space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
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
                    <p className="text-xs text-zinc-400 leading-relaxed pl-10">
                      {rule.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </BlurFade>

        {/* ========================================================
            5. macOS Window: Desi Dayro & Sangeet Theatre (Video Hub)
            ======================================================== */}
        <BlurFade delay={0.2} inView>
          <div className="rounded-3xl bg-zinc-900/30 backdrop-blur-2xl border border-white/[0.08] overflow-hidden shadow-2xl space-y-6 p-4 sm:p-8">
            {/* Theatre Window Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <IconBrandYoutube className="w-4 h-4 text-red-500" />
                    <span>લોકડાયરો & હાસ્ય દરબાર 🎭</span>
                  </h2>
                  <p className="text-[11px] text-zinc-400 hidden sm:block">
                    ગોપાલ સાધુ, આદિત્ય ગઢવી, રાજદાન ગઢવી, કીર્તિદાન ગઢવી અને માયાભાઈ આહીર
                  </p>
                </div>
              </div>

              {/* Scroll Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleScroll("left")}
                  aria-label="Scroll Left"
                  className="p-2 rounded-lg bg-zinc-950 border border-white/10 hover:border-amber-400 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  aria-label="Scroll Right"
                  className="p-2 rounded-lg bg-zinc-950 border border-white/10 hover:border-amber-400 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <IconChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Tabs in Apple Segmented Style */}
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
                      ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20"
                      : "bg-zinc-950 text-zinc-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Video Horizontal Carousel */}
            <div
              ref={dayroScrollRef}
              className="flex overflow-x-auto gap-4 sm:gap-5 pb-4 pt-1 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-zinc-950 [&::-webkit-scrollbar-thumb]:bg-amber-400/30 hover:[&::-webkit-scrollbar-thumb]:bg-amber-400 [&::-webkit-scrollbar-thumb]:rounded-full"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(245, 158, 11, 0.3) rgba(9, 9, 11, 0.8)",
              }}
            >
              {filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handlePlayVideo(video)}
                  className="w-[280px] sm:w-[310px] shrink-0 snap-start rounded-2xl bg-zinc-950/80 border border-white/[0.08] hover:border-amber-400/50 overflow-hidden cursor-pointer flex flex-col gap-3 transition-all shadow-xl group p-3"
                >
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="310px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        <IconPlayerPlayFilled className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[10px] font-mono text-zinc-300 font-medium">
                      HD
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-400/90 text-black text-[10px] font-bold">
                      {video.categoryLabel}
                    </div>
                  </div>

                  <div className="px-1 space-y-1">
                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <span className="truncate">{video.artist}</span>
                      <IconCircleCheckFilled className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            6. Bottom Outro / Connect Dock
            ======================================================== */}
        <BlurFade delay={0.24} inView>
          <div className="rounded-3xl bg-gradient-to-b from-zinc-900/40 to-zinc-950/80 backdrop-blur-2xl border border-white/[0.08] p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="flex items-center justify-center gap-3">
              <div className="relative w-14 h-12">
                <Image
                  src="/chai-cheers.png"
                  alt="Chai Cheers"
                  fill
                  sizes="60px"
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                આવો, મળીએ અને કંઈક નવું બનાવીએ! ☕
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              એક ચા, એક વાત અને એક નવી શરૂઆત. અમદાવાદમાં હોવ તો ચાલો Tea Post પર મળીએ!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%9A%E0%AA%BE%E0%AA%B2%E0%AB%8B%20%E0%AA%9A%E0%AA%BE%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AE%E0%AA%B3%E0%AB%80%E0%AA%8F%20%E0%AA%A8%E0%AB%87%20%E0%AA%95%E0%AA%82%E0%AA%88%E0%AA%95%20%E0%AA%AE%E0%AB%8B%E0%AA%9F%E0%AB%81%E0%AA%82%20%E0%AA%AC%E0%AA%A8%E0%AA%BE%E0%AA%B5%E0%AB%80%E0%AA%8F%20%E2%98%95"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTapSound("pop")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-xs sm:text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <IconBrandWhatsapp className="w-4 h-4" />
                <span>Connect on WhatsApp (8866688575)</span>
              </a>

              <Link
                href="/#hero"
                onClick={() => playTapSound("pop")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-all"
              >
                <IconArrowLeft className="w-4 h-4" />
                <span>Back to Portfolio Hero</span>
              </Link>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
