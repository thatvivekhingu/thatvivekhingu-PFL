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
  IconCode,
  IconRocket,
  IconFileText,
  IconSparkles,
  IconUsers,
  IconCalendar,
  IconHandRock,
  IconTerminal2,
  IconGitBranch,
  IconFlame,
  IconBrandWhatsapp,
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
    desc: "કડક મસાલા ચા, મસ્કા બન અને નેક્સ્ટ-લેવલ ટેક આઈડિયાઝ પર ચર્ચા.",
    mapsUrl: "https://maps.app.goo.gl/mwWKYR9xQxzmoBR6A",
    tag: "East Ahmedabad Hub",
    tagColor: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
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
    tagColor: "from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30",
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
    tagColor: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    image: "/teapost/maninagar.png",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Maninagar પર મળીએ ને કૉલેબોરેશન કરીએ ☕",
  },
];

// Developer Resources Grid Items
const DEV_RESOURCES = [
  {
    icon: <IconCode className="w-6 h-6 text-indigo-400" />,
    title: "Useful Links",
    desc: "ડેવલપર માટે બેસ્ટ હેન્ડ-પિક લિંક્સ.",
    action: "Explore →",
    color: "group-hover:border-indigo-500/50",
  },
  {
    icon: <IconRocket className="w-6 h-6 text-cyan-400" />,
    title: "Dev Tools",
    desc: "પ્રોડક્ટિવિટી વધારતા ટૂલ્સ એક જ જગ્યાએ.",
    action: "Explore →",
    color: "group-hover:border-cyan-500/50",
  },
  {
    icon: <IconBook className="w-6 h-6 text-amber-400" />,
    title: "Cheatsheets",
    desc: "DSA, Git, Linux, SQL, Docker અને ઘણું.",
    action: "Explore →",
    color: "group-hover:border-amber-500/50",
  },
  {
    icon: <IconFileText className="w-6 h-6 text-orange-400" />,
    title: "Interview Prep",
    desc: "ઇન્ટરવ્યુ પ્રશ્નો, રોડમેપ અને તૈયારી ગાઈડ.",
    action: "Explore →",
    color: "group-hover:border-orange-500/50",
  },
  {
    icon: <IconSparkles className="w-6 h-6 text-emerald-400" />,
    title: "AI for Developers",
    desc: "AI ટૂલ્સ, પ્રોમ્પ્ટ્સ અને બેસ્ટ યુઝ કેસ.",
    action: "Explore →",
    color: "group-hover:border-emerald-500/50",
  },
  {
    icon: <IconUsers className="w-6 h-6 text-rose-400" />,
    title: "Community",
    desc: "કનેક્ટ કરો, કોલેબ કરો, સાથે શીખો, સાથે બિલ્ડ કરો.",
    action: "Join Now →",
    color: "group-hover:border-rose-500/50",
  },
];

// Upcoming Meetups
const MEETUPS = [
  {
    title: "AI in Everyday Apps",
    location: "Tea Post — Science City",
    date: "01 JUN",
    time: "5:00 PM",
    badge: "AI / ML",
    color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
  },
  {
    title: "JavaScript & Next.js in Depth",
    location: "Tea Post — Nikol",
    date: "08 JUN",
    time: "5:30 PM",
    badge: "Frontend",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  {
    title: "Dev Networking & Startup Evening",
    location: "Tea Post — Maninagar",
    date: "15 JUN",
    time: "6:00 PM",
    badge: "Networking",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
];

// Work & Build Together Features
const COLLAB_FEATURES = [
  {
    icon: <IconUsers className="w-5 h-5 text-amber-400" />,
    title: "પ્રોજેક્ટ પર કોલેબ કરો",
    desc: "ઓપન સોર્સ અને રિયલ વર્લ્ડ પ્રોજેક્ટ્સ.",
  },
  {
    icon: <IconFlame className="w-5 h-5 text-orange-400" />,
    title: "આઈડિયા થી પ્રોડક્ટ",
    desc: "તમારો આઈડિયા શેર કરો અને ફીડબેક મેળવો.",
  },
  {
    icon: <IconHandRock className="w-5 h-5 text-emerald-400" />,
    title: "Find Your Co-founder",
    desc: "ટેક પાર્ટનર કે કોફાઉન્ડર શોધો.",
  },
];

// Quick Dev Commands
const QUICK_COMMANDS = [
  {
    icon: <IconCode className="w-4 h-4 text-amber-400" />,
    title: "Code Snippets",
    desc: "ઝટપટ ઉપયોગી કોડ.",
  },
  {
    icon: <IconGitBranch className="w-4 h-4 text-orange-400" />,
    title: "Git Commands",
    desc: "ડેઇલી Git કમાન્ડ રેફરન્સ.",
  },
  {
    icon: <IconTerminal2 className="w-4 h-4 text-cyan-400" />,
    title: "Terminal Commands",
    desc: "Linux ટર્મિનલ કમાન્ડ્સ.",
  },
  {
    icon: <IconBook className="w-4 h-4 text-emerald-400" />,
    title: "API Collection",
    desc: "ઉપયોગી APIs ની લિસ્ટ.",
  },
];

// All Videos for the unified "લોકડાયરો & હાસ્ય દરબાર" section
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const dayroScrollRef = useRef<HTMLDivElement>(null);

  const filteredVideos =
    selectedCategory === "all"
      ? ALL_DAYRO_VIDEOS
      : ALL_DAYRO_VIDEOS.filter((v) => v.category === selectedCategory);

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

  const scrollToLocations = () => {
    playTapSound("pop");
    const el = document.getElementById("locations");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080808] text-white px-4 py-12 sm:py-20 overflow-x-hidden selection:bg-amber-500 selection:text-black font-gujarati">
      {/* Warm Ambient Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-amber-500/8 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] rounded-full bg-orange-600/5 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-amber-600/5 blur-[160px] pointer-events-none -z-10" />

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
              href="/#hero"
              onClick={() => playTapSound("pop")}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 hover:text-white transition-colors group"
            >
              <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-xs font-mono text-amber-400 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>🕷️ દેશી કરોડિયો Approved</span>
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            HERO: ચાલો મળીએ, આઈડિયા શેર કરીએ ☕ (Reference Top Section)
            ======================================================== */}
        <BlurFade delay={0.08} inView>
          <div className="relative rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-[#0d0d0d] to-black p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Heading, Subtitle, Buttons, Social Proof */}
              <div className="md:col-span-7 space-y-6 text-left">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-semibold">
                    <IconCoffee className="w-3.5 h-3.5" />
                    <span>મોટાભાગના તગડા આઈડિયા ચાની કિટલી પર જ બને છે!</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-100 leading-tight">
                    ચાલો મળીએ, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-200">
                      આઈડિયા શેર કરીએ. ☕
                    </span>
                  </h1>

                  <p className="text-sm sm:text-base text-zinc-400 font-medium leading-relaxed max-w-lg">
                    ડેવલપર, ડિઝાઇનર, બિલ્ડર કે સ્ટુડન્ટ — બધા માટે એક જગ્યા. કોડ, કૉન્વર્સેશન અને કટિંગ ચા. ☕
                  </p>
                </div>

                {/* Hero CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={scrollToLocations}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600/30 to-orange-600/30 hover:from-amber-600/40 hover:to-orange-600/40 border border-amber-500/50 text-amber-300 hover:text-amber-200 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
                  >
                    <IconMapPin className="w-4 h-4 text-amber-400" />
                    <span>નજીકનો Tea Post શોધો</span>
                  </button>

                  <a
                    href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%9A%E0%AA%BE%E0%AA%B2%E0%AB%8B%20%E0%AA%9A%E0%AA%BE%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AE%E0%AA%B3%E0%AB%80%E0%AA%8F%20%E0%AA%A8%E0%AB%87%20%E0%AA%95%E0%AA%82%E0%AA%88%E0%AA%95%20%E0%AA%AE%E0%AB%8B%E0%AA%9F%E0%AB%81%E0%AA%82%20%E0%AA%AC%E0%AA%A8%E0%AA%BE%E0%AA%B5%E0%AB%80%E0%AA%8F%20%E2%98%95"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTapSound("pop")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 text-emerald-400 hover:text-emerald-300 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
                  >
                    <IconBrandWhatsapp className="w-4 h-4 text-emerald-400" />
                    <span>મળવું છે? WhatsApp</span>
                  </a>
                </div>

                {/* Social Proof Badges */}
                <div className="flex items-center gap-3 pt-3 border-t border-zinc-900">
                  <div className="flex -space-x-2 overflow-hidden">
                    {["/avatars/avatar1.png", "/avatars/avatar2.png", "/avatars/avatar3.png"].map((src, i) => (
                      <div
                        key={i}
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-zinc-900 overflow-hidden bg-zinc-800"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-[10px] font-bold text-black">
                          {["VH", "JD", "AK"][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">
                    <span className="text-zinc-200 font-bold">1K+ ડેવલપર</span> જોડાયા છે • તમે ક્યારે જોડાશો? 🚀
                  </p>
                </div>
              </div>

              {/* Right Column: Hero Tea & Laptop Visual */}
              <div className="md:col-span-5 flex justify-center items-center">
                <div className="relative w-full max-w-[340px] aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 group">
                  <Image
                    src="/chai-hero-cup.jpg"
                    alt="Steaming Cup of Tea on Desk"
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      Tea Post Meetups
                    </span>
                    <span>Ahmedabad, GJ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            SECTION 1: 3 TEA POST LOCATION CARDS (with id="locations")
            ======================================================== */}
        <BlurFade delay={0.12} inView>
          <div id="locations" className="space-y-6 scroll-mt-20">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-2.5">
                <IconCoffee className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
                  નજીકના ફેવરિટ ચા અડ્ડા ☕
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                Ahmedabad Outlets
              </span>
            </div>

            {/* 3-Column Card Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CHAI_SPOTS.map((spot) => (
                <div
                  key={spot.id}
                  className="relative mx-auto h-full w-full rounded-2xl border border-zinc-800/80 p-2 bg-zinc-950/60 shadow-lg group/container"
                >
                  <GlowingEffect
                    spread={40}
                    glow={false}
                    disabled={true}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="group/glow relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border border-zinc-800/70 p-4 bg-zinc-950/90 shadow-[0px_0px_27px_0px_#141414] transition-all hover:border-amber-500/50">
                    <SpotlightGlow color="rgba(245, 158, 11, 0.15)" />

                    {/* Card Top: Tag Badge + Image */}
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800/80">
                        <Image
                          src={spot.image}
                          alt={spot.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover group-hover/glow:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <span
                          className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md bg-gradient-to-r ${spot.tagColor}`}
                        >
                          {spot.tag}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold text-zinc-100 group-hover/glow:text-amber-300 transition-colors flex items-center gap-1.5">
                          <span>☕</span> {spot.gujjuName}
                        </h3>
                        <p className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                          <IconMapPin className="w-3 h-3 text-red-400 shrink-0" />
                          <span className="truncate">{spot.location}</span>
                        </p>
                        <p className="text-xs text-zinc-400 leading-relaxed pt-1 line-clamp-2">
                          {spot.desc}
                        </p>
                      </div>
                    </div>

                    {/* Card Buttons */}
                    <div className="pt-3 border-t border-zinc-900 flex items-center justify-between gap-2">
                      <a
                        href={spot.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTapSound("pop")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-white text-xs font-mono transition-all group/btn"
                      >
                        <IconMapPin className="w-3 h-3 text-amber-400" />
                        <span>Google Maps</span>
                      </a>

                        <a
                          href={`https://wa.me/918866688575?text=${encodeURIComponent(spot.whatsappMsg)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playTapSound("pop")}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer group/wa"
                        >
                          <IconBrandWhatsapp className="w-3.5 h-3.5 text-emerald-400 group-hover/wa:scale-110 transition-transform shrink-0" />
                          <span>મળવું છે?</span>
                        </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            SECTION 2: ડેવલપર માટે ઉપયોગી રીસોર્સ (Dev Resources Grid)
            ======================================================== */}
        <BlurFade delay={0.15} inView>
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 border-b border-zinc-900 pb-4">
              <span className="text-amber-400 font-mono font-bold text-lg">&lt;/&gt;</span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-100">
                ડેવલપર માટે ઉપયોગી રીસોર્સ
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {DEV_RESOURCES.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => playTapSound("pop")}
                  className={`p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 hover:bg-zinc-900/60 transition-all flex flex-col justify-between space-y-3 cursor-pointer group ${item.color}`}
                >
                  <div className="space-y-2">
                    <div className="p-2 w-fit rounded-xl bg-zinc-900/90 border border-zinc-800">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-amber-400/90 group-hover:text-amber-300 flex items-center gap-1 pt-1">
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            SECTION 3: UPCOMING MEETUPS & WORK / BUILD TOGETHER
            ======================================================== */}
        <BlurFade delay={0.18} inView>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Upcoming Meetups */}
            <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-2">
                    <IconCalendar className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base sm:text-lg font-bold text-zinc-100">
                      Upcoming Meetups 📅
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer">
                    બધા ઇવેન્ટ્સ જુઓ →
                  </span>
                </div>

                <div className="space-y-3">
                  {MEETUPS.map((meetup, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-850 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${meetup.color}`}
                          >
                            {meetup.badge}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-amber-300 transition-colors truncate">
                            {meetup.title}
                          </h4>
                        </div>
                        <p className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                          <IconMapPin className="w-3 h-3 text-red-400 shrink-0" />
                          <span className="truncate">{meetup.location}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0 font-mono">
                        <div className="text-xs sm:text-sm font-bold text-amber-400">
                          {meetup.date}
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          {meetup.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%AE%E0%AA%BE%E0%AA%B0%E0%AB%87%20%E0%AA%A8%E0%AA%B5%E0%AB%8B%20%E0%AA%9A%E0%AA%BE%20%E0%AA%AE%E0%AB%80%E0%AA%9F%E0%AA%85%E0%AA%AA%20%E0%AA%87%E0%AA%B5%E0%AB%87%E0%AA%A8%E0%AB%8D%E0%AA%9F%20%E0%AA%B6%E0%AB%87%E0%AA%B0%20%E0%AA%95%E0%AA%B0%E0% his%AB%8B%20%E0%AA%9B%E0%AB%87%20%E2%98%95"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTapSound("pop")}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-white text-xs font-mono font-bold text-center transition-all block"
              >
                તમારો ઇવેન્ટ શેર કરો →
              </a>
            </div>

            {/* Box 2: Work & Build Together */}
            <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <IconHandRock className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100">
                    Work & Build Together 🤝
                  </h3>
                </div>

                <div className="space-y-3">
                  {COLLAB_FEATURES.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 hover:border-amber-500/40 transition-all flex items-center gap-3.5 group"
                    >
                      <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0">
                        {feature.icon}
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-amber-300 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 leading-snug">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%AE%E0%AA%BE%E0%AA%B0%E0%AB%80%20%E0%AA%AA%E0%AA%BE%E0%AA%B8%E0%AB%87%20%E0%AA%8F%E0%AA%95%20%E0%AA%A4%E0%AA%97%E0%AA%A1%E0%AB%8B%20%E0%AA%86%E0%AA%88%E0%AA%A1%E0%AA%BF%E0%AA%AF%E0%AA%BE%20/%20%E0%AA%AA%E0%AB%8D%E0%AA%B0%E0%AA%B5%E0%AB%87%E0%AA%95%E0%AB%8D%E0%AA%9F%20%E0%AA%9B%E0%AB%87%20%E0%AA%95%E0%AB%89%E0%AA%B2%E0%AB%87%E0%AA%AC%E0%AA%B0%E0%AB%87%E0%AA%B6%E0%AA%A8%20%E0%AA%AE%E0%AA%BE%E0%AA%9F%E0%AB%87!%20%F0%9F%9A%80"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTapSound("pop")}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600/30 to-orange-600/30 hover:from-amber-600/40 hover:to-orange-600/40 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold text-center transition-all block shadow-lg shadow-amber-500/10"
              >
                Post Your Idea / Project →
              </a>
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            SECTION 4: QUICK DEV COMMANDS PILL BAR
            ======================================================== */}
        <BlurFade delay={0.2} inView>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {QUICK_COMMANDS.map((cmd, idx) => (
              <div
                key={idx}
                onClick={() => playTapSound("pop")}
                className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/40 transition-all flex items-center justify-between gap-2.5 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                    {cmd.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-zinc-200 group-hover:text-amber-300 transition-colors truncate">
                      {cmd.title}
                    </h4>
                    <p className="text-[10px] text-zinc-500 truncate">
                      {cmd.desc}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-zinc-500 group-hover:text-amber-400 transition-colors">
                  →
                </span>
              </div>
            ))}
          </div>
        </BlurFade>

        {/* ========================================================
            SECTION 5: THE GUJJU TECH DICTIONARY 📖
            ======================================================== */}
        <BlurFade delay={0.22} inView>
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

        {/* ========================================================
            SECTION 6: THE GUJJU DEVELOPER MANIFESTO 📜
            ======================================================== */}
        <BlurFade delay={0.24} inView>
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

        {/* ========================================================
            SECTION 7: લોકડાયરો & હાસ્ય દરબાર 🎭 (Video Section)
            ======================================================== */}
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
                    ગોપાલ સાધુ, આદિત્ય ગઢવી, કીર્તિદાન ગઢવી, માયાભાઈ આહીર, સાંઈરામ દવે અને રાજભા ગઢવીનો અસલ ડાયરો & લોકસંગીત
                  </p>
                </div>
              </div>

              {/* Scroll Arrows */}
              <div className="flex items-center gap-1.5 shrink-0">
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

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 pt-1">
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

            {/* Video Horizontal Carousel */}
            <div
              ref={dayroScrollRef}
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
                  className="w-[280px] sm:w-[320px] shrink-0 snap-start rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/50 overflow-hidden cursor-pointer flex flex-col gap-3 transition-all shadow-xl group p-2.5"
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
                      <IconCircleCheckFilled className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* ========================================================
            SECTION 8: BOTTOM CHAI COLLABORATION BANNER (Reference Bottom)
            ======================================================== */}
        <BlurFade delay={0.28} inView>
          <div className="relative rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-amber-500/30 p-6 sm:p-8 md:p-10 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Side */}
              <div className="md:col-span-6 space-y-2 text-left">
                <h3 className="text-xl sm:text-2xl font-black text-zinc-100">
                  આવો, મળીએ અને કંઈક નવું બનાવીએ.
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  એક ચા, એક વાત અને એક નવી શરૂઆત. ☕
                </p>
              </div>

              {/* Center Clinking Illustration */}
              <div className="md:col-span-2 flex justify-center items-center py-2 md:py-0">
                <div className="relative w-20 h-16 opacity-90 hover:opacity-100 transition-opacity">
                  <Image
                    src="/chai-cheers.png"
                    alt="Chai Cheers"
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right Side Buttons */}
              <div className="md:col-span-4 flex flex-col gap-2.5 items-stretch md:items-end">
                <span className="text-[11px] font-mono text-zinc-400 text-center md:text-right">
                  હમણાં જ જોડાઓ WhatsApp પર
                </span>
                <a
                  href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%9A%E0%AA%BE%E0%AA%B2%E0%AB%8B%20%E0%AA%9A%E0%AA%BE%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AA%E0%AB%80%E0%AA%A4%E0%AA%BE%E0%AA%82%20%E0%AA%AE%E0%AA%B3%E0%AB%80%E0%AA%8F%20%E0%AA%A8%E0%AB%87%20%E0%AA%95%E0%AA%82%E0%AA%88%E0%AA%95%20%E0%AA%AE%E0%AB%8B%E0%AA%9F%E0%AB%81%E0%AA%82%20%E0%AA%AC%E0%AA%A8%E0%AA%BE%E0%AA%B5%E0%AB%80%E0%AA%8F%20%E2%98%95"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTapSound("pop")}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <IconBrandWhatsapp className="w-4 h-4" />
                  <span>મળવું છે? (WhatsApp)</span>
                </a>

                <div className="w-full flex items-center justify-center md:justify-end gap-2 text-[10px] font-mono text-zinc-500">
                  <span>અથવા</span>
                  <button
                    onClick={scrollToLocations}
                    className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <IconMapPin className="w-3 h-3" />
                    <span>નજીકનો Tea Post શોધો</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
