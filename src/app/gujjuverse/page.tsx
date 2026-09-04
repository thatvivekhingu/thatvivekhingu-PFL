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
  IconChevronRight,
  IconMapPin,
  IconBrandWhatsapp,
  IconPlayerPlayFilled,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconCoffee,
  IconCrown,
  IconSparkles,
  IconCode,
  IconPlus,
  IconMinus,
  IconTerminal2,
  IconStar,
  IconGitFork,
  IconCheck,
  IconCopy,
  IconArrowUpRight,
  IconBrain,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";

// 4 Tea Spots
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
    bgColor: "bg-[#7c2d12]",
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
    bgColor: "bg-[#1e293b]",
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
    bgColor: "bg-[#14532d]",
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
    bgColor: "bg-[#78350f]",
    textColor: "text-amber-100",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post SG Highway પર મળીએ ☕",
  },
];

// 6 Accordion Dictionary Entries
const GUJJU_DICTIONARY = [
  {
    term: "Bug in Code",
    gujju: "લોચો",
    desc: "કોડે કરેલી એવી ભૂલ જે આખી રાત ઊંઘ ના આવવા દે! Unexpected runtime anomaly that demands cutting chai and patient root-cause debugging.",
    emoji: "🐛",
  },
  {
    term: "Debugging",
    gujju: "ફોડ પાડવો",
    desc: "કોડમાં ક્યાં લોચો થયો છે એ ખોળી કાઢીને દેશી લોજિકથી ફિક્સ કરવું. Deep investigative log tracing until the system yields expected output.",
    emoji: "🔍",
  },
  {
    term: "Merge Conflict",
    gujju: "ગોટો વળવો",
    desc: "બે જણાએ એક જ ફાઈલમાં હાથ નાખ્યો ને પંચાયત થઈ! Two divergent branch states colliding head-on into Git HEAD.",
    emoji: "⚡",
  },
  {
    term: "Client Meeting",
    gujju: "ચોરે પંચાત",
    desc: "જે વાત ૫ મિનિટમાં પતી જતી હોય એને ૨ કલાક ખેંચવી. Extensive agile deliberation over sprint requirements and deadline alignment.",
    emoji: "💼",
  },
  {
    term: "Production Deploy",
    gujju: "શ્રી ગણેશ / ભગવાન ભરોસે",
    desc: "ચાલ્યું તો મોજ અને ના ચાલ્યું તો 'આપણે જોઈ લઈશું'! Pushing build artifacts to production with high confidence and zero-downtime prayer.",
    emoji: "🚀",
  },
  {
    term: "Stack Overflow",
    gujju: "સંજય દ્રષ્ટિ",
    desc: "જ્યાં દુનિયાના તમામ કોડિંગ લોચાના દેશી ઉપાય મળી જાય. Omnipresent peer knowledge database rescuing developers at 3:00 AM.",
    emoji: "💡",
  },
];

// 4 Golden Rules
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

// Exactly 3 Dayro Artists
const TOP_3_DAYRO_ARTISTS = [
  {
    id: "gopal-sadhu",
    artist: "Gopal Sadhu",
    gujjuArtist: "ગોપાલ સાધુ",
    genre: "Traditional Folk & Sangeet",
    title: "લોકગીતો ની જોરદાર જમાવટ (જીનમ ડાયરો લાઈવ)",
    youtubeId: "K_ehyAc0TmU",
    thumbnail: "https://img.youtube.com/vi/K_ehyAc0TmU/hqdefault.jpg",
  },
  {
    id: "aditya-raj",
    artist: "Aditya Gadhvi & Raj Gadhvi",
    gujjuArtist: "આદિત્ય ગઢવી & રાજ ગઢવી",
    genre: "Maha Jugalbandhi & Folk Heritage",
    title: "ડાયરામાં પહેલીવાર આ જુગલબંધી 🔥 (બોટાદ લાઈવ)",
    youtubeId: "ZDW9SoRQi8A",
    thumbnail: "https://img.youtube.com/vi/ZDW9SoRQi8A/hqdefault.jpg",
  },
  {
    id: "kirtidan-gadhvi",
    artist: "Kirtidan Gadhvi",
    gujjuArtist: "કીર્તિદાન ગઢવી",
    genre: "Classical Dayro & Raas Sangeet",
    title: "દેશી તાલે કાનુડાના ગીતો & રાસ (લાઈવ ગરબા & સૂર)",
    youtubeId: "g6f6t0X-R6U",
    thumbnail: "https://img.youtube.com/vi/g6f6t0X-R6U/hqdefault.jpg",
  },
];

// 6 Core AI Projects for Tab 2
const AI_PROJECTS = [
  {
    name: "SmartPark-Enforcer",
    tagline: "Real-time AI Parking Violation Tracking",
    desc: "Computer-vision surveillance system detecting, classifying, and issuing illegal parking penalties using YOLOv8, OpenCV, and FastAPI.",
    lang: "Jupyter Notebook / Python",
    langColor: "#DA5B0B",
    stars: 5,
    href: "https://github.com/thatvivekhingu/SmartPark-Enforcer",
  },
  {
    name: "Aerosync",
    tagline: "Drone AI Land-Record & GIS Intelligence",
    desc: "Autonomous aerial mapping pipeline converting drone footage into verified cadastral parcel maps aligned with SVAMITVA guidelines.",
    lang: "Python / PyTorch",
    langColor: "#3572A5",
    stars: 1,
    href: "https://github.com/thatvivekhingu/Aerosync",
  },
  {
    name: "BharatBhasha AI 2.0",
    tagline: "Multilingual Indic Voice & Text OS",
    desc: "Next-generation Indic vernacular intelligence system powered by Groq LLaMA 3.3 70B, real-time STT, and voice synthesis across 12+ Indian languages.",
    lang: "Python / TypeScript",
    langColor: "#e34c26",
    stars: 1,
    href: "https://github.com/thatvivekhingu/Bharat-Bhasha-Ai-2.0",
  },
  {
    name: "AI Startup Success Predictor",
    tagline: "Venture Intelligence & Viability ML Engine",
    desc: "Predictive analytics dashboard evaluating funding probability, financial runway, and business model viability using Scikit-Learn and React.",
    lang: "JavaScript / FastAPI",
    langColor: "#f1e05a",
    stars: 3,
    href: "https://github.com/thatvivekhingu/Startup-Success-Predictor",
  },
  {
    name: "Globe-Trotter (Odoo Titans)",
    tagline: "Intelligent Trip Planning & Budget Platform",
    desc: "Full-stack collaborative itinerary manager organizing travel schedules, currency allocations, and live group expenses in one unified interface.",
    lang: "TypeScript / Next.js",
    langColor: "#3178c6",
    stars: 1,
    forks: 1,
    href: "https://github.com/thatvivekhingu/Globe-Trotter_odoo_Tech-Titans",
  },
  {
    name: "thatvivekhingu-PFL",
    tagline: "Developer Portfolio & AI Agent Hub",
    desc: "Production Next.js 15 portfolio engineered with interactive 3D elements, dark glassmorphism, and an integrated Vian AI conversational agent.",
    lang: "TypeScript / React",
    langColor: "#3178c6",
    stars: 21,
    href: "https://github.com/thatvivekhingu/thatvivekhingu-PFL",
  },
];

export default function GujjuversePage() {
  // 4 Tabs State: 'home' | 'ai-work' | 'gujjuverse' | 'connect'
  const [activeTab, setActiveTab] = useState<"home" | "ai-work" | "gujjuverse" | "connect">("home");
  
  // Accordion State: active slang index (null = all closed)
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(null);
  
  // Video Modal Player
  const [activeVideo, setActiveVideo] = useState<(typeof TOP_3_DAYRO_ARTISTS)[0] | null>(null);

  const toggleAccordion = (idx: number) => {
    playTapSound("click");
    setOpenAccordionIdx(openAccordionIdx === idx ? null : idx);
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
                  {activeVideo.artist} — {activeVideo.title}
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 space-y-8 sm:space-y-10">
        
        {/* ========================================================
            TAB BAR NAVIGATION (4 TABS: Home, AI Work, GujjuVerse, Connect)
            ======================================================== */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#0e131d] border border-white/[0.08] shadow-xl backdrop-blur-md">
            {[
              { id: "home", label: "Home" },
              { id: "ai-work", label: "AI Work" },
              { id: "gujjuverse", label: "GujjuVerse" },
              { id: "connect", label: "Connect" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playTapSound("click");
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================
            TAB 1: HOME (Intro, Tagline, 1 CTA, Tech Stack)
            ======================================================== */}
        {activeTab === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* 2-Column Hero Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-[#0d111a] border border-white/[0.08] shadow-2xl">
              
              {/* Left Column */}
              <div className="md:col-span-7 space-y-4 text-left">
                {/* Clean Professional Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sky-400 text-xs font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span>AI & ML Engineer • Ahmedabad</span>
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.18]">
                  Vivek Hingu
                </h1>

                {/* The Gujarati Tagline (Exclusive Location 1/3) */}
                <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300">
                  મોટાભાગના તગડા આઈડિયા ચાની કિટલી પર જ બને છે.
                </p>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg font-normal">
                  Building production Machine Learning architectures, multilingual voice operating systems, and intelligent web applications with real code and disciplined execution.
                </p>

                {/* 1 Single Primary CTA on Home */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      playTapSound("pop");
                      setActiveTab("ai-work");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/25 active:scale-95 cursor-pointer"
                  >
                    <span>View My AI Projects</span>
                    <span className="text-sm">➔</span>
                  </button>
                </div>
              </div>

              {/* Right Column Video Frame */}
              <div className="md:col-span-5 relative">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#080b11]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  >
                    <source src="/gujjuverse-banner.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center justify-between">
                    <span className="text-amber-400 font-semibold">Ahmedabad Tech Hub 🇮🇳</span>
                    <span>Chai & Code ☕</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Distribution Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d111a] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                Engineering Stack:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {["Python", "PyTorch", "FastAPI", "Next.js 15", "TypeScript", "YOLOv8", "LangChain", "Docker"].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            TAB 2: AI WORK (6 Projects + GitHub Stats)
            ======================================================== */}
        {activeTab === "ai-work" && (
          <motion.div
            key="ai-work"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* GitHub Stats Header Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d111a] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/[0.05] text-white">
                  <IconBrandGithub className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">thatvivekhingu / AI Systems</span>
                  <span className="text-xs text-zinc-400 font-mono">Open-source machine learning & Indic research</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                  562 Contributions in 2026
                </span>
                <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-sky-400 font-semibold">
                  8 Public Repositories
                </span>
              </div>
            </div>

            {/* 6 AI Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AI_PROJECTS.map((proj, idx) => (
                <a
                  key={idx}
                  href={proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl bg-[#0d111a] border border-white/[0.08] hover:border-amber-500/40 transition-all flex flex-col justify-between gap-4 shadow-lg hover:-translate-y-0.5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconBrain className="w-4 h-4 text-amber-400" />
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {proj.name}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400">
                        Public
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-sky-300">
                      {proj.tagline}
                    </p>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.langColor }} />
                      <span>{proj.lang}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <IconStar className="w-3.5 h-3.5 text-zinc-400" />
                        {proj.stars}
                      </span>
                      {proj.forks && (
                        <span className="flex items-center gap-1">
                          <IconGitFork className="w-3.5 h-3.5 text-zinc-400" />
                          {proj.forks}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================
            TAB 3: GUJJUVERSE (Tea Spots, Accordion Slang, Rules, 3 Dayro)
            ======================================================== */}
        {activeTab === "gujjuverse" && (
          <motion.div
            key="gujjuverse"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="space-y-10"
          >
            {/* 1. 4 Tea Spots Compact Cards (Exclusive Gujarati Names 2/3) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <IconCoffee className="w-4 h-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-bold text-white">
                    Ahmedabad Tea Hubs
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-400">4 Locations</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {CHAI_SPOTS.map((spot) => (
                  <div
                    key={spot.id}
                    className="p-3.5 rounded-2xl bg-[#0d111a] border border-white/[0.08] space-y-3 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40 border border-white/10">
                      <Image
                        src={spot.image}
                        alt={spot.name}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                      <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[8px] font-mono text-amber-300">
                        {spot.badge}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white">{spot.gujjuName}</h4>
                      <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                        <IconMapPin className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="truncate">{spot.location}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 border-t border-white/[0.06] text-[10px] font-mono">
                      <a
                        href={spot.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1 px-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 text-center transition-colors"
                      >
                        Maps ↗
                      </a>
                      <a
                        href={`https://wa.me/918866688575?text=${encodeURIComponent(spot.whatsappMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold text-center transition-colors"
                      >
                        Meet ☕
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. 6 Slang Tech Dictionary in Compact ACCORDION Format (Exclusive Gujarati Words 3/3) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <IconTerminal2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm sm:text-base font-bold text-white">
                    Tech Dictionary (Accordion)
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-400">Click to Expand</span>
              </div>

              <div className="space-y-2">
                {GUJJU_DICTIONARY.map((item, idx) => {
                  const isOpen = openAccordionIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#0d111a] border border-white/[0.08] overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left cursor-pointer hover:bg-white/[0.02]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base">{item.emoji}</span>
                          <span className="text-base font-extrabold text-cyan-300">
                            {item.gujju}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">
                            ({item.term})
                          </span>
                        </div>
                        <div className="p-1 rounded-lg bg-white/[0.05] text-zinc-400">
                          {isOpen ? <IconMinus className="w-3.5 h-3.5" /> : <IconPlus className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 pb-4 pt-1 border-t border-white/[0.04] text-xs text-zinc-300 leading-relaxed space-y-1.5"
                          >
                            <p>{item.desc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Exactly 3 Compressed Dayro Artists Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <IconBrandYoutube className="w-4 h-4 text-rose-400" />
                  <span className="text-sm sm:text-base font-bold text-white">
                    Lok Dayro & Sangeet (3 Artists)
                  </span>
                </div>
                <a
                  href="https://www.youtube.com/results?search_query=gujarati+dayro+live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  View Full Playlist →
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {TOP_3_DAYRO_ARTISTS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      playTapSound("pop");
                      setActiveVideo(item);
                    }}
                    className="p-3 rounded-2xl bg-[#0d111a] border border-white/[0.08] hover:border-amber-500/40 transition-all space-y-2.5 cursor-pointer group shadow-lg"
                  >
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
                      <Image
                        src={item.thumbnail}
                        alt={item.artist}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="260px"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <IconPlayerPlayFilled className="w-3.5 h-3.5 ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                        {item.artist}
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-mono truncate">
                        {item.genre}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. 4 Golden Rules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {GUJJU_RULES.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0d111a] border border-white/[0.08] flex items-start gap-3"
                >
                  <span className="text-lg">{rule.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        RULE {rule.num}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {rule.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================
            TAB 4: CONNECT (LinkedIn, GitHub, Instagram, WhatsApp)
            ======================================================== */}
        {activeTab === "connect" && (
          <motion.div
            key="connect"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d111a] border border-white/[0.08] space-y-6 text-center max-w-2xl mx-auto shadow-2xl">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Let&apos;s Build Together
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Connect with Vivek Hingu
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                  Open for machine learning engineering collaborations, enterprise AI consulting, and cutting chai conversations.
                </p>
              </div>

              {/* 4 Direct Social Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <a
                  href="https://linkedin.com/in/vivekhingu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600/20 text-sky-400">
                      <IconBrandLinkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">LinkedIn</span>
                      <span className="text-[11px] text-zinc-400 font-mono">/in/vivekhingu</span>
                    </div>
                  </div>
                  <IconChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://github.com/thatvivekhingu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 text-white">
                      <IconBrandGithub className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">GitHub</span>
                      <span className="text-[11px] text-zinc-400 font-mono">@thatvivekhingu</span>
                    </div>
                  </div>
                  <IconChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://instagram.com/realvivek.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-pink-600/20 text-pink-400">
                      <IconBrandInstagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Instagram</span>
                      <span className="text-[11px] text-zinc-400 font-mono">@realvivek.py</span>
                    </div>
                  </div>
                  <IconChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://wa.me/918866688575?text=%E0%AA%A8%E0%AA%AE%E0%AA%B8%E0%AB%8D%E0%AA%A4%E0%AB%87%20%E0%AA%B5%E0%AA%BF%E0%AA%B5%E0%AB%87%E0%AA%95!%20%E0%AA%9A%E0%AA%BE%E0%AA%B2%E0%AB%8B%20Tea%20Post%20%E0%AA%AA%E0%AA%B0%20%E0%AA%AE%E0%AA%B3%E0%AB%80%E0%AA%8F%20%E2%98%95"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400">
                      <IconBrandWhatsapp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">WhatsApp</span>
                      <span className="text-[11px] text-zinc-400 font-mono">+91 88666 88575</span>
                    </div>
                  </div>
                  <IconChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            CLEAN FOOTER (Only 1 Chai & Code mention, Zero Duplicates)
            ======================================================== */}
        <footer className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
          <p>© {new Date().getFullYear()} Vivek Hingu • Designed with Chai &amp; Code in Ahmedabad ☕</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="https://github.com/thatvivekhingu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub ↗</a>
          </div>
        </footer>

      </div>
    </div>
  );
}
