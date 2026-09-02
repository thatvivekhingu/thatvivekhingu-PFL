"use client";

import React, { useState, useRef, useMemo } from "react";
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
  IconMapPin,
  IconCode,
  IconTerminal2,
  IconBrandWhatsapp,
  IconPlayerPlayFilled,
  IconFlame,
  IconCoffee,
  IconCrown,
  IconSparkles,
  IconSearch,
  IconAdjustmentsHorizontal,
  IconRefresh,
  IconCopy,
  IconCheck,
  IconBrain,
  IconDeviceTv,
  IconLayoutGrid,
  IconFileCode,
  IconShieldCheck,
  IconPlayerPauseFilled,
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
    location: "Raspan Arcade, Nikol, Ahmedabad",
    mapsUrl: "https://maps.app.goo.gl/mwWKYR9xQxzmoBR6A",
    image: "/teapost/nikol.jpg",
    badge: "KADAK • MASALA",
    footer: "DESI POWER",
    bgColor: "bg-[#ea580c]",
    textColor: "text-white",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Nikol પર મળીએ ને AI & કોડિંગ ડિસ્કસ કરીએ ☕",
  },
  {
    id: "science-city",
    name: "Tea Post — Science City",
    gujjuName: "ટી પોસ્ટ — સાયન્સ સીટી",
    location: "Science City Road, Sola, Ahmedabad",
    mapsUrl: "https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5",
    image: "/teapost/science-city.png",
    badge: "CODE • BRAINSTORM",
    footer: "AI MATRIX",
    bgColor: "bg-[#0284c7]",
    textColor: "text-white",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Science City પર મળીએ ને AI / Tech ડિસ્કસ કરીએ ☕",
  },
  {
    id: "maninagar",
    name: "Tea Post — Maninagar",
    gujjuName: "ટી પોસ્ટ — મણિનગર",
    location: "Near Kankaria Lake, Maninagar, Ahmedabad",
    mapsUrl: "https://maps.app.goo.gl/XQgNsuKokUm7CuBq8",
    image: "/teapost/maninagar.png",
    badge: "CHILL • KANKARIA",
    footer: "CALM VIBES",
    bgColor: "bg-[#16a34a]",
    textColor: "text-white",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Maninagar પર મળીએ ને કૉલેબોરેશન કરીએ ☕",
  },
  {
    id: "sghighway",
    name: "Tea Post — SG Highway",
    gujjuName: "ટી પોસ્ટ — એસ.જી. હાઈવે",
    location: "Prahlad Nagar / SG Highway, Ahmedabad",
    mapsUrl: "https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5",
    image: "/teapost/science-city.png",
    badge: "STARTUP • HUB",
    footer: "HIGH VOLTAGE",
    bgColor: "bg-[#eab308]",
    textColor: "text-zinc-950",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post SG Highway પર મળીએ ☕",
  },
];

const GUJJU_DICTIONARY = [
  {
    term: "Bug in Code",
    gujju: "લોચો",
    desc: "કોડે કરેલી એવી ભૂલ જે આખી રાત ઊંઘ ના આવવા દે!",
    emoji: "🐛",
    pythonSnippet: "def fix_locho():\n    while has_bug():\n        drink_kadak_chai()\n    return 'Done!'",
  },
  {
    term: "Debugging",
    gujju: "ફોડ પાડવો",
    desc: "કોડમાં ક્યાં લોચો થયો છે એ ખોળી કાઢીને દેશી લોજિકથી ફિક્સ કરવું.",
    emoji: "🔍",
    pythonSnippet: "import logging\nlogging.info('Phod Padyo: Log analysis complete.')",
  },
  {
    term: "Merge Conflict",
    gujju: "ગોટો વળવો",
    desc: "બે જણાએ એક જ ફાઈલમાં હાથ નાખ્યો ને પંચાયત થઈ!",
    emoji: "⚡",
    pythonSnippet: "<<<<<<< HEAD\nmy_kadak_code()\n=======\ntheir_code()\n>>>>>>> branch",
  },
  {
    term: "Client Meeting",
    gujju: "ચોરે પંચાત",
    desc: "જે વાત ૫ મિનિટમાં પતી જતી હોય એને ૨ કલાક ખેંચવી.",
    emoji: "💼",
    pythonSnippet: "for minute in range(120):\n    nod_and_say('Haa, ho jayega!')",
  },
  {
    term: "Production Deploy",
    gujju: "શ્રી ગણેશ / ભગવાન ભરોસે",
    desc: "ચાલ્યું તો મોજ અને ના ચાલ્યું તો 'આપણે જોઈ લઈશું'!",
    emoji: "🚀",
    pythonSnippet: "try:\n    deploy_to_prod()\nexcept Exception:\n    print('Bhagwan Bharose!')",
  },
  {
    term: "Stack Overflow",
    gujju: "સંજય દ્રષ્ટિ",
    desc: "જ્યાં દુનિયાના તમામ કોડિંગ લોચાના દેશી ઉપાય મળી જાય.",
    emoji: "💡",
    pythonSnippet: "answer = stackoverflow.get_accepted_solution(query='python bug')",
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
  {
    id: "kirtidan-rajbha-jugalbandhi",
    artist: "કીર્તિદાન ગઢવી & રાજભા ગઢવી",
    title: "બેસ્ટ જુગલબંધી લોકડાયરો (રાપર કચ્છ લાઈવ)",
    category: "jugalbandhi",
    categoryLabel: "મહા જુગલબંધી",
    youtubeId: "i8POjs66f9g",
    thumbnail: "https://img.youtube.com/vi/i8POjs66f9g/hqdefault.jpg",
  },
];

export default function GujjuversePage() {
  // Streamlit Interactive State
  const [activeTab, setActiveTab] = useState<"chai" | "ai-slang" | "dayro" | "bento" | "manifesto" | "code">("chai");
  const [selectedChaiSpotId, setSelectedChaiSpotId] = useState<string>("nikol");
  const [kadakLevel, setKadakLevel] = useState<number>(85);
  const [aiTemperature, setAiTemperature] = useState<number>(0.7);
  const [showRawCode, setShowRawCode] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDayroCategory, setSelectedDayroCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const selectedChaiSpot = useMemo(
    () => CHAI_SPOTS.find((s) => s.id === selectedChaiSpotId) || CHAI_SPOTS[0],
    [selectedChaiSpotId]
  );

  const filteredDictionary = useMemo(() => {
    if (!searchQuery.trim()) return GUJJU_DICTIONARY;
    return GUJJU_DICTIONARY.filter(
      (item) =>
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gujju.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredVideos = useMemo(() => {
    if (selectedDayroCategory === "all") return ALL_DAYRO_VIDEOS;
    return ALL_DAYRO_VIDEOS.filter((v) => v.category === selectedDayroCategory);
  }, [selectedDayroCategory]);

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const streamlitSourceCode = `# GujjuVerse AI — Streamlit Engine
import streamlit as st
import pandas as pd

st.set_page_config(page_title="GujjuVerse AI", page_icon="☕", layout="wide")

# Sidebar Controls
st.sidebar.title("🎛️ Gujju AI Controls")
kadak_level = st.sidebar.slider("Kadak Chai Level (%)", 1, 100, value=${kadakLevel})
ai_temp = st.sidebar.slider("Kathiyawadi Slang Temp", 0.1, 1.0, value=${aiTemperature})
selected_spot = st.sidebar.selectbox("Tea Post Hub", ["Nikol", "Science City", "Maninagar", "SG Highway"])

# Hero Callout
st.info("👑 કાઠિયાવાડમાં જેમ ભગવાન પણ ભૂલા પડી જાય, તેમ આજે તમે પણ આ Gujjuverse માં ભૂલા પડી જશો!")

# Metrics
col1, col2, col3, col4 = st.columns(4)
col1.metric("Location Hub", "Ahmedabad", "Kadak Desi")
col2.metric("AI Core", "Indic LLaMA 3.3", "Zero Hallucination")
col3.metric("CGPA Metric", "8.61 / 10", "SAL College")
col4.metric("Dayro Index", "High Voltage", "12+ Streams")
`;

  return (
    <div className="min-h-screen bg-[#0e1117] text-[#fafafa] font-sans antialiased overflow-x-hidden selection:bg-[#ff4b4b] selection:text-white">
      {/* ========================================================
          1. STREAMLIT TOP NAVIGATION BAR (Exact st.header)
          ======================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-[#262730] bg-[#0e1117]/95 backdrop-blur-md px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          {/* Streamlit Sidebar Toggle */}
          <button
            onClick={() => {
              playTapSound("hover");
              setIsSidebarOpen(!isSidebarOpen);
            }}
            className="p-1.5 rounded-md hover:bg-[#262730] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <IconAdjustmentsHorizontal className="w-4 h-4 text-[#ff4b4b]" />
          </button>

          {/* Streamlit Red Crown/Polygon Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#ff4b4b] to-[#ff8585] flex items-center justify-center text-white font-black text-xs shadow-[0_0_12px_rgba(255,75,75,0.4)]">
              👑
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white group-hover:text-[#ff4b4b] transition-colors">
                GujjuVerse
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#262730] text-zinc-400 border border-zinc-700">
                st.app v2.4
              </span>
            </div>
          </Link>
        </div>

        {/* Center Running Status Pill */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-[#262730]/80 px-3 py-1 rounded-full border border-zinc-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-zinc-200 font-semibold">● RUNNING</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">Rerun (R)</span>
        </div>

        {/* Right Actions: Back to Portfolio & Deploy Pill */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/#hero"
            onClick={() => playTapSound("pop")}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#262730] hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <IconArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          <a
            href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%9A%E0%AA%BE%E0%AA%B2%E0%AB%8B%20Tea%20Post%20%E0%AA%AA%E0%AA%B0%20%E0%AA%AE%E0%AA%B3%E0%AB%80%E0%AA%8F%20%E2%98%95"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTapSound("pop")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ff4b4b] hover:bg-[#ff3333] text-white font-bold text-xs shadow-md shadow-[#ff4b4b]/25 transition-all cursor-pointer active:scale-95"
          >
            <IconCoffee className="w-3.5 h-3.5" />
            <span>Chai Connect</span>
          </a>
        </div>
      </header>

      {/* Streamlit Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 right-4 z-50 px-4 py-2 rounded-xl bg-[#262730] border border-[#ff4b4b] text-white text-xs font-mono shadow-2xl flex items-center gap-2 backdrop-blur-md"
          >
            <IconSparkles className="w-4 h-4 text-[#ff4b4b] animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          2. MAIN STREAMLIT WORKSPACE (SIDEBAR + MAIN CANVAS)
          ======================================================== */}
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start min-h-[calc(100vh-50px)]">

        {/* ========================================================
            STREAMLIT SIDEBAR (st.sidebar)
            ======================================================== */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-[#262730] bg-[#11141c]/95 p-4 sm:p-5 space-y-5"
            >
              {/* Sidebar Title */}
              <div className="flex items-center justify-between pb-2 border-b border-[#262730]">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white font-mono">🎛️ st.sidebar</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">Gujju AI</span>
              </div>

              {/* Module Navigator Selectbox */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 font-mono">
                  st.selectbox(&quot;Choose Module&quot;)
                </label>
                <div className="space-y-1">
                  {[
                    { id: "chai", label: "☕ Chai Tapri GPS", icon: IconCoffee },
                    { id: "ai-slang", label: "🤖 Gujju AI Slang & Code", icon: IconTerminal2 },
                    { id: "dayro", label: "🎭 Lok Dayro Jukebox", icon: IconBrandYoutube },
                    { id: "bento", label: "📊 Developer Bento Hub", icon: IconLayoutGrid },
                    { id: "manifesto", label: "📜 Developer Manifesto", icon: IconShieldCheck },
                    { id: "code", label: "💻 Streamlit Source Code", icon: IconFileCode },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playTapSound("click");
                        setActiveTab(tab.id as any);
                        showToast(`Switched to: ${tab.label}`);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-[#ff4b4b] text-white font-bold shadow-md shadow-[#ff4b4b]/20"
                          : "bg-[#262730]/60 hover:bg-[#262730] text-zinc-300 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <tab.icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </div>
                      {activeTab === tab.id && <span className="text-xs">➔</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 1: Kadak Chai Concentration */}
              <div className="space-y-1.5 bg-[#262730]/40 p-3 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-300 font-semibold">Kadak Chai Level</span>
                  <span className="text-amber-400 font-bold">{kadakLevel}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={kadakLevel}
                  onChange={(e) => {
                    setKadakLevel(Number(e.target.value));
                    showToast(`Chai Kadak Factor: ${e.target.value}%`);
                  }}
                  className="w-full accent-[#ff4b4b] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                  <span>Light</span>
                  <span>Masala</span>
                  <span>Full Kadak 🔥</span>
                </div>
              </div>

              {/* Slider 2: Desi Humor Temperature */}
              <div className="space-y-1.5 bg-[#262730]/40 p-3 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-300 font-semibold">AI Slang Temp</span>
                  <span className="text-cyan-400 font-bold">{aiTemperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={aiTemperature}
                  onChange={(e) => {
                    setAiTemperature(Number(e.target.value));
                    showToast(`AI Temperature: ${e.target.value}`);
                  }}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                  <span>0.1 (Formal)</span>
                  <span>0.7 (Desi)</span>
                  <span>1.0 (Moj)</span>
                </div>
              </div>

              {/* Sidebar Metrics Stack */}
              <div className="space-y-2 pt-1 border-t border-[#262730]">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Live Streamlit Metrics
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#262730]/60 border border-zinc-800">
                    <span className="block text-[10px] font-mono text-zinc-400">Chai Consumed</span>
                    <span className="text-sm font-bold text-amber-400">1,420 ☕</span>
                    <span className="block text-[9px] text-emerald-400 font-mono">+12% today</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#262730]/60 border border-zinc-800">
                    <span className="block text-[10px] font-mono text-zinc-400">Gujju Bugs</span>
                    <span className="text-sm font-bold text-white">489 🐛</span>
                    <span className="block text-[9px] text-emerald-400 font-mono">100% Fixed</span>
                  </div>
                </div>
              </div>

              {/* Raw Code Toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#262730]/40 border border-zinc-800 text-xs font-mono">
                <span className="text-zinc-300">st.code Output</span>
                <button
                  onClick={() => setShowRawCode(!showRawCode)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    showRawCode ? "bg-emerald-500" : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      showRawCode ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Sidebar Footer */}
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-xs text-amber-300 font-mono space-y-1">
                <span className="font-bold block">💡 Pro-Tip:</span>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  અમદાવાદના Tea Post પર કડક ચા સાથે કૉલેબોરેશન માટે મળો!
                </p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ========================================================
            MAIN STREAMLIT CANVAS (Interactive st.main)
            ======================================================== */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 space-y-6">

          {/* 1. Streamlit Hero Callout Box */}
          <BlurFade delay={0.02} inView>
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#1e222d] to-[#161a24] border border-amber-500/30 shadow-xl space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#ff4b4b] text-white font-bold text-xs">
                    st.info
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    👑 KATHIYAWADI PUNCHLINE • AI MATRIX
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-0.5 rounded-full border border-zinc-800">
                  Ahmedabad • B.E. IT @ SAL (8.61 CGPA)
                </span>
              </div>

              <blockquote className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 leading-snug">
                &ldquo;કાઠિયાવાડમાં જેમ ભગવાન પણ ભૂલા પડી જાય, તેમ આજે તમે પણ આ Gujjuverse માં ભૂલા પડી જશો!&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                મોટાભાગના તગડા આઈડિયા ચાની કિટલી પર જ બને છે! Python, Machine Learning, Data Science અને રંગીલા લોકડાયરાનો અસલ દેશી સંગમ.
              </p>
            </div>
          </BlurFade>

          {/* 2. Streamlit Metrics Row (st.columns(4)) */}
          <BlurFade delay={0.04} inView>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3.5 rounded-xl bg-[#1a1c24] border border-[#262730] shadow-md space-y-1">
                <span className="text-[11px] font-mono text-zinc-400 block">Location Hub</span>
                <span className="text-sm sm:text-base font-bold text-white block truncate">Ahmedabad ➔ Saurashtra</span>
                <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <IconMapPin className="w-3 h-3 text-red-400" />
                  Kadak Desi Vibes
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1a1c24] border border-[#262730] shadow-md space-y-1">
                <span className="text-[11px] font-mono text-zinc-400 block">AI Engine</span>
                <span className="text-sm sm:text-base font-bold text-cyan-300 block truncate">BharatBhasha AI</span>
                <span className="text-[10px] font-mono text-emerald-400">Grok + Indic Voice OS</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1a1c24] border border-[#262730] shadow-md space-y-1">
                <span className="text-[11px] font-mono text-zinc-400 block">Coding Fuel</span>
                <span className="text-sm sm:text-base font-bold text-amber-300 block truncate">Masala Chai</span>
                <span className="text-[10px] font-mono text-amber-400">Kadak Level: {kadakLevel}%</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1a1c24] border border-[#262730] shadow-md space-y-1">
                <span className="text-[11px] font-mono text-zinc-400 block">Dayro & Hasya</span>
                <span className="text-sm sm:text-base font-bold text-rose-300 block truncate">12+ Live Streams</span>
                <span className="text-[10px] font-mono text-rose-400">High Voltage ⚡</span>
              </div>
            </div>
          </BlurFade>

          {/* ========================================================
              3. STREAMLIT INTERACTIVE TABS (st.tabs)
              ======================================================== */}
          <BlurFade delay={0.06} inView>
            <div className="space-y-4">
              {/* Horizontal Tabs Header Bar */}
              <div className="flex items-center gap-1 overflow-x-auto border-b border-[#262730] pb-2">
                {[
                  { id: "chai", label: "☕ Chai Tapri GPS", count: 4 },
                  { id: "ai-slang", label: "🤖 Gujju AI & Slang Matrix", count: 6 },
                  { id: "dayro", label: "🎭 Lok Dayro & Hasya", count: 7 },
                  { id: "bento", label: "📊 Social Bento Hub", count: 3 },
                  { id: "manifesto", label: "📜 Developer Manifesto", count: 4 },
                  { id: "code", label: "💻 Streamlit Source (app.py)", count: 1 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playTapSound("click");
                      setActiveTab(tab.id as any);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-[#262730] text-[#ff4b4b] border border-[#ff4b4b]/40 shadow-sm"
                        : "text-zinc-400 hover:text-white hover:bg-[#1a1c24]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-black/40 text-zinc-400">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* ========================================================
                  TAB 1: CHAI TAPRI GPS & INTERACTIVE STAMP CARDS
                  ======================================================== */}
              {activeTab === "chai" && (
                <div className="space-y-4">
                  {/* Streamlit st.radio / spot selector */}
                  <div className="p-4 rounded-2xl bg-[#1a1c24] border border-[#262730] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono text-zinc-300 font-bold">
                        st.radio(&quot;Select Ahmedabad Tea Post Branch&quot;)
                      </span>
                      <span className="text-[10px] font-mono text-amber-400">
                        Active GPS: {selectedChaiSpot.location}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CHAI_SPOTS.map((spot) => (
                        <button
                          key={spot.id}
                          onClick={() => {
                            setSelectedChaiSpotId(spot.id);
                            playTapSound("pop");
                            showToast(`Selected Branch: ${spot.name}`);
                          }}
                          className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                            selectedChaiSpotId === spot.id
                              ? "bg-[#ff4b4b]/10 border-[#ff4b4b] text-white shadow-md shadow-[#ff4b4b]/20"
                              : "bg-[#0e1117] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                          }`}
                        >
                          <span className="block text-xs font-bold text-white">{spot.gujjuName}</span>
                          <span className="block text-[10px] text-zinc-400 truncate">{spot.location}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4 Interactive Postage Stamp Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CHAI_SPOTS.map((spot) => (
                      <div
                        key={spot.id}
                        className={`rounded-2xl bg-[#16171a] border p-3 flex flex-col justify-between gap-3 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                          selectedChaiSpotId === spot.id ? "border-[#ff4b4b] ring-2 ring-[#ff4b4b]/30" : "border-[#25282f]"
                        }`}
                      >
                        {/* Stamp Header */}
                        <div className={`relative ${spot.bgColor} rounded-xl p-2.5 flex flex-col justify-between gap-2 overflow-hidden shadow-inner`}>
                          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white">
                            <span>{spot.badge}</span>
                            <IconCoffee className="w-3.5 h-3.5" />
                          </div>

                          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-black/50">
                            <Image
                              src={spot.image}
                              alt={spot.name}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-500"
                              sizes="200px"
                            />
                            <div className="absolute bottom-1 left-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-zinc-300 truncate">
                              {spot.location}
                            </div>
                          </div>

                          <div className="text-center font-mono text-[9px] font-black uppercase tracking-widest text-white">
                            {spot.footer}
                          </div>
                        </div>

                        {/* Details & WhatsApp invite */}
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-sm font-bold text-white">{spot.gujjuName}</h4>
                            <p className="text-[11px] text-zinc-400 truncate">{spot.location}</p>
                          </div>

                          <div className="flex items-center gap-2 pt-1 border-t border-zinc-800">
                            <a
                              href={spot.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-1 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono text-center transition-colors"
                            >
                              Maps ↗
                            </a>
                            <a
                              href={`https://wa.me/918866688575?text=${encodeURIComponent(spot.whatsappMsg)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
                            >
                              <IconBrandWhatsapp className="w-3.5 h-3.5" />
                              <span>Meet</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB 2: KATHIYAWADI AI SLANG & CODE PLAYGROUND
                  ======================================================== */}
              {activeTab === "ai-slang" && (
                <div className="space-y-4">
                  {/* Streamlit Input Box */}
                  <div className="p-4 rounded-2xl bg-[#1a1c24] border border-[#262730] space-y-3">
                    <label className="text-xs font-mono text-zinc-300 font-bold block">
                      st.text_input(&quot;Search / Translate Tech Term into Kathiyawadi Slang&quot;)
                    </label>
                    <div className="relative">
                      <IconSearch className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Bug, Merge Conflict, Production, Client Meeting..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0e1117] border border-zinc-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff4b4b]"
                      />
                    </div>

                    {/* Quick filter chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-zinc-500">Quick Prompts:</span>
                      {["Bug", "Debugging", "Merge Conflict", "Client Meeting", "Production Deploy"].map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            playTapSound("pop");
                          }}
                          className="px-2 py-0.5 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-[10px] font-mono text-cyan-300 border border-zinc-700 cursor-pointer"
                        >
                          #{term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slang Matrix Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredDictionary.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#1a1c24] border border-zinc-800 hover:border-cyan-500/50 transition-all space-y-2 group shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-400">{item.term}</span>
                          <span className="text-base">{item.emoji}</span>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-cyan-300 group-hover:text-cyan-200">
                            {item.gujju}
                          </h4>
                          <p className="text-xs text-zinc-300 leading-snug mt-0.5">{item.desc}</p>
                        </div>

                        {/* Python st.code Snippet */}
                        {showRawCode && (
                          <div className="p-2 rounded-lg bg-[#0e1117] border border-zinc-800/80 text-[10px] font-mono text-emerald-400 overflow-x-auto">
                            <pre className="whitespace-pre-wrap">{item.pythonSnippet}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB 3: LOK DAYRO & HASYA JUKEOX (st.video)
                  ======================================================== */}
              {activeTab === "dayro" && (
                <div className="space-y-4">
                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-[#1a1c24] border border-[#262730]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        { id: "all", label: "All Streams" },
                        { id: "music", label: "Lokgeet & Sangeet" },
                        { id: "jugalbandhi", label: "Maha Jugalbandhi 🔥" },
                        { id: "hasya", label: "Hasya Darbar 🎭" },
                        { id: "veer-ras", label: "Veer Ras & Motivation" },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedDayroCategory(cat.id);
                            playTapSound("click");
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            selectedDayroCategory === cat.id
                              ? "bg-[#ff4b4b] text-white font-bold"
                              : "bg-zinc-800 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Carousel navigation buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleScroll("left")}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                      >
                        <IconChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleScroll("right")}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                      >
                        <IconChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Dayro Cards */}
                  <div
                    ref={carouselRef}
                    className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-zinc-800"
                  >
                    {filteredVideos.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => {
                          setActiveVideo(video);
                          playTapSound("pop");
                        }}
                        className="w-[260px] sm:w-[280px] shrink-0 snap-start rounded-xl bg-[#1a1c24] border border-zinc-800 p-2.5 space-y-2 cursor-pointer group hover:border-[#ff4b4b] transition-all shadow-md"
                      >
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="280px"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                            <div className="w-8 h-8 rounded-full bg-[#ff4b4b] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <IconPlayerPlayFilled className="w-4 h-4 ml-0.5" />
                            </div>
                          </div>
                          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/80 text-[8.5px] font-mono text-zinc-200">
                            {video.categoryLabel}
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-white group-hover:text-[#ff4b4b] transition-colors line-clamp-2 leading-snug">
                            {video.title}
                          </h4>
                          <span className="text-[10px] text-zinc-400 block truncate">{video.artist}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Video Modal Player */}
                  <AnimatePresence>
                    {activeVideo && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setActiveVideo(null)}
                      >
                        <motion.div
                          initial={{ scale: 0.9, y: 20 }}
                          animate={{ scale: 1, y: 0 }}
                          exit={{ scale: 0.9, y: 20 }}
                          onClick={(e) => e.stopPropagation()}
                          className="relative w-full max-w-3xl rounded-2xl bg-[#11141c] border border-zinc-700 overflow-hidden shadow-2xl"
                        >
                          <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-[#1a1c24]">
                            <span className="text-xs font-bold text-white truncate font-mono">
                              st.video — {activeVideo.title}
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
                </div>
              )}

              {/* ========================================================
                  TAB 4: DEVELOPER IDENTITY BENTO GRID
                  ======================================================== */}
              {activeTab === "bento" && (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-[#1a1c24] border border-[#262730] flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-300 font-bold">
                      st.container — 3-Column Developer Bento Grid
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">100% Space Efficient</span>
                  </div>
                  <SocialBentoBoard />
                </div>
              )}

              {/* ========================================================
                  TAB 5: DEVELOPER MANIFESTO & RULES
                  ======================================================== */}
              {activeTab === "manifesto" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GUJJU_RULES.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#1a1c24] border border-zinc-800 space-y-1.5 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          RULE {rule.num}: {rule.title}
                        </span>
                        <span className="text-lg">{rule.icon}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{rule.gujjuTitle}</h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">{rule.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ========================================================
                  TAB 6: STREAMLIT PYTHON SOURCE CODE (app.py)
                  ======================================================== */}
              {activeTab === "code" && (
                <div className="p-4 rounded-2xl bg-[#1a1c24] border border-[#262730] space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2">
                      <IconFileCode className="w-4 h-4 text-[#ff4b4b]" />
                      <span className="text-xs font-mono font-bold text-white">gujjuverse_streamlit_app.py</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(streamlitSourceCode);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="py-1 px-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedCode ? <IconCheck className="w-3.5 h-3.5 text-emerald-400" /> : <IconCopy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0e1117] border border-zinc-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                    <pre>{streamlitSourceCode}</pre>
                  </div>
                </div>
              )}

            </div>
          </BlurFade>

          {/* Streamlit Footer */}
          <footer className="pt-6 border-t border-[#262730] flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500 gap-2">
            <span>Made with Streamlit aesthetic & pure Gujju passion ☕</span>
            <div className="flex items-center gap-3">
              <Link href="/#hero" className="hover:text-zinc-300 transition-colors">Portfolio</Link>
              <Link href="/social-cards" className="hover:text-zinc-300 transition-colors">Social Cards</Link>
              <a href="https://github.com/thatvivekhingu" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">GitHub ↗</a>
            </div>
          </footer>

        </main>

      </div>
    </div>
  );
}
