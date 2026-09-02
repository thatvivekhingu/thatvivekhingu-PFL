"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowLeft,
  IconBrandYoutube,
  IconX,
  IconMapPin,
  IconCode,
  IconTerminal2,
  IconBrandWhatsapp,
  IconPlayerPlayFilled,
  IconFlame,
  IconCoffee,
  IconCrown,
  IconSparkles,
  IconArrowUpRight,
  IconCopy,
  IconCheck,
  IconBrain,
  IconLayoutGrid,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconCircleCheckFilled,
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
    name: "NIKOL",
    gujjuName: "ટી પોસ્ટ — નિકોલ",
    location: "Raspan Arcade, Nikol",
    vibe: "DESI POWER",
    color: "#EA4335", // Google Red
    bgLight: "bg-red-500/10 border-red-500/30 text-red-400",
    mapsUrl: "https://maps.app.goo.gl/mwWKYR9xQxzmoBR6A",
    image: "/teapost/nikol.jpg",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Nikol પર મળીએ ને AI & કોડિંગ ડિસ્કસ કરીએ ☕",
  },
  {
    id: "science-city",
    name: "SCIENCE CITY",
    gujjuName: "ટી પોસ્ટ — સાયન્સ સીટી",
    location: "Science City Road, Sola",
    vibe: "CODE • BRAINSTORM",
    color: "#4285F4", // Google Blue
    bgLight: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    mapsUrl: "https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5",
    image: "/teapost/science-city.png",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Science City પર મળીએ ને AI / Tech ડિસ્કસ કરીએ ☕",
  },
  {
    id: "maninagar",
    name: "MANINAGAR",
    gujjuName: "ટી પોસ્ટ — મણિનગર",
    location: "Near Kankaria Lake",
    vibe: "CHILL • KANKARIA",
    color: "#34A853", // Google Green
    bgLight: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    mapsUrl: "https://maps.app.goo.gl/XQgNsuKokUm7CuBq8",
    image: "/teapost/maninagar.png",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post Maninagar પર મળીએ ને કૉલેબોરેશન કરીએ ☕",
  },
  {
    id: "sghighway",
    name: "SG HIGHWAY",
    gujjuName: "ટી પોસ્ટ — એસ.જી. હાઈવે",
    location: "Prahlad Nagar / SG Highway",
    vibe: "STARTUP • HUB",
    color: "#FBBC04", // Google Yellow
    bgLight: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    mapsUrl: "https://maps.app.goo.gl/1SUaqrcGcLm7uF5w5",
    image: "/teapost/science-city.png",
    whatsappMsg: "નમસ્તે વિવેક! ચાલો Tea Post SG Highway પર મળીએ ☕",
  },
];

const GUJJU_DICTIONARY = [
  {
    term: "Bug in Code",
    gujju: "લોચો",
    desc: "કોડે કરેલી એવી ભૂલ જે આખી રાત ઊંઘ ના આવવા દે!",
    tag: "DEBUGGING",
    snippet: "def fix_locho():\n    drink_kadak_chai()\n    return 'Fixed!'",
  },
  {
    term: "Debugging",
    gujju: "ફોડ પાડવો",
    desc: "કોડમાં ક્યાં લોચો થયો છે એ ખોળી કાઢીને દેશી લોજિકથી ફિક્સ કરવું.",
    tag: "DIAGNOSTICS",
    snippet: "log.info('Phod Padyo: Analysis done.')",
  },
  {
    term: "Merge Conflict",
    gujju: "ગોટો વળવો",
    desc: "બે જણાએ એક જ ફાઈલમાં હાથ નાખ્યો ને પંચાયત થઈ!",
    tag: "GIT_VCS",
    snippet: "<<<<<<< HEAD\nmy_code()\n=======\ntheir_code()\n>>>>>>>",
  },
  {
    term: "Client Meeting",
    gujju: "ચોરે પંચાત",
    desc: "જે વાત ૫ મિનિટમાં પતી જતી હોય એને ૨ કલાક ખેંચવી.",
    tag: "SPRINT_SYNC",
    snippet: "for m in range(120):\n    say('Haa, pakku!')",
  },
  {
    term: "Production Deploy",
    gujju: "શ્રી ગણેશ / ભગવાન ભરોસે",
    desc: "ચાલ્યું તો મોજ અને ના ચાલ્યું તો 'આપણે જોઈ લઈશું'!",
    tag: "CI_CD",
    snippet: "try:\n    deploy()\nexcept:\n    print('Bhagwan Bharose!')",
  },
  {
    term: "Stack Overflow",
    gujju: "સંજય દ્રષ્ટિ",
    desc: "જ્યાં દુનિયાના તમામ કોડિંગ લોચાના દેશી ઉપાય મળી જાય.",
    tag: "INDIC_KNOWLEDGE",
    snippet: "solution = stackoverflow.find(query)",
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
    id: "mayabhai-comedy-classic",
    artist: "માયાભાઈ આહીર",
    title: "હસી હસીને લોટપોટ થઈ જશો (સુપર કોમેડી ડાયરો)",
    category: "hasya",
    categoryLabel: "હાસ્ય ડાયરો",
    youtubeId: "1Y0s2YQZ38Q",
    thumbnail: "https://img.youtube.com/vi/1Y0s2YQZ38Q/hqdefault.jpg",
  },
];

export default function GujjuverseDevFestPage() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (snippet: string, index: number) => {
    navigator.clipboard.writeText(snippet);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f8fafc] font-sans selection:bg-[#EA4335] selection:text-white overflow-x-hidden">
      
      {/* ========================================================
          TOP CONFERENCE NAVBAR
          ======================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#07090e]/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Google DevFest 4-Color Dots Geometric */}
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC04]" />
            </div>
            <div className="flex items-center gap-1.5 pl-1">
              <span className="font-black text-sm tracking-tight text-white uppercase group-hover:text-amber-400 transition-colors">
                GUJJU AI
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300">
                DEVFEST 2026
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <Link
            href="/#hero"
            onClick={() => playTapSound("pop")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <IconArrowLeft className="w-3.5 h-3.5" />
            <span>Portfolio</span>
          </Link>
          <a
            href="https://github.com/thatvivekhingu/thatvivekhingu-PFL"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
          >
            <span>GitHub</span>
            <IconArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* ========================================================
          1. HERO SECTION (DevFest 2026 Editorial Headline)
          ======================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-zinc-800/80">
        {/* Subtle GDG Color Accent Glows */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#4285F4]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-[#EA4335]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="space-y-6 text-left max-w-5xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
            <span>AHMEDABAD • GUJARAT • INDIA</span>
          </div>

          {/* Main Huge Conference Headline */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.95] uppercase">
              GUJJU AI
            </h1>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#4285F4] leading-[0.95] uppercase">
              DEVFEST 2026
            </h2>
          </div>

          {/* Supporting Gujarati Headline */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-300 leading-tight">
            ચા, કોડ અને કાઠિયાવાડી ક્રિએટિવિટી.
          </p>

          {/* Supporting Tech Text */}
          <p className="text-sm sm:text-base font-mono text-zinc-400 max-w-2xl leading-relaxed">
            Python • AI • Machine Learning • GenAI • Developer Culture
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            <a
              href="#the-gujjuverse"
              onClick={() => playTapSound("pop")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-white/10 active:scale-95 cursor-pointer"
            >
              <span>EXPLORE THE GUJJUVERSE</span>
              <span>➔</span>
            </a>

            <a
              href="https://github.com/thatvivekhingu/thatvivekhingu-PFL"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTapSound("pop")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>VIEW SOURCE</span>
              <IconArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. BIG STATEMENT (Oversized Editorial Statement)
          ======================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-zinc-800/80">
        <BlurFade delay={0.04} inView>
          <div className="space-y-6 max-w-4xl">
            <span className="text-xs font-mono text-[#FBBC04] uppercase tracking-widest block font-bold">
              // CORE MANIFESTO
            </span>
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
                મોટાભાગના તગડા આઈડિયા
              </h3>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 leading-tight">
                ચાની કિટલી પર જ બને છે.
              </h3>
            </div>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 pt-2 border-t border-zinc-800/80 tracking-wide">
              Python · Machine Learning · Data Science · AI · GenAI · Gujarati Culture
            </p>
          </div>
        </BlurFade>
      </section>

      {/* ========================================================
          3. THE GUJJUVERSE (Asymmetric Modern Bento Layout)
          ======================================================== */}
      <section id="the-gujjuverse" className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-zinc-800/80 space-y-10">
        <BlurFade delay={0.06} inView>
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#4285F4] uppercase tracking-widest font-bold">
              // MODULES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              EXPLORE THE GUJJUVERSE
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-medium">
              Where developer culture meets Gujarati chaos.
            </p>
          </div>
        </BlurFade>

        {/* 4 Asymmetric Modules Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Module 01: CHAI TAPRI GPS (7 cols) */}
          <a
            href="#locations"
            className="md:col-span-7 group p-6 sm:p-8 rounded-3xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between gap-6 shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                01 // GPS ROUTE
              </span>
              <span className="text-zinc-500 group-hover:text-white transition-colors">➔</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
                ☕ CHAI TAPRI GPS
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                Find the perfect place to meet, brainstorm and build across Ahmedabad.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Nikol", "Science City", "Maninagar", "SG Highway"].map((loc, i) => (
                <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/60 border border-zinc-800 text-zinc-300">
                  {loc}
                </span>
              ))}
            </div>
          </a>

          {/* Module 02: GUJJU AI (5 cols) */}
          <a
            href="#ai-matrix"
            className="md:col-span-5 group p-6 sm:p-8 rounded-3xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between gap-6 shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                02 // TRANSLATOR
              </span>
              <span className="text-zinc-500 group-hover:text-white transition-colors">➔</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">
                🤖 GUJJU AI
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Gujarati slang × AI × Code: Real developer problems in raw Kathiyawadi.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-black/60 p-2.5 rounded-xl border border-zinc-800">
              <code>locho = fix_with_kadak_chai()</code>
            </div>
          </a>

          {/* Module 03: LOK DAYRO (5 cols) */}
          <a
            href="#dayro-videos"
            className="md:col-span-5 group p-6 sm:p-8 rounded-3xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-rose-500/50 transition-all duration-300 flex flex-col justify-between gap-6 shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
                03 // CULTURE
              </span>
              <span className="text-zinc-500 group-hover:text-white transition-colors">➔</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-rose-300 transition-colors">
                🎭 LOK DAYRO
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Hasya, culture and developer chaos — live performance streams.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <IconPlayerPlayFilled className="w-4 h-4 text-rose-500" />
              <span>Gopal Sadhu • Aditya Gadhvi • Mayabhai</span>
            </div>
          </a>

          {/* Module 04: DEVELOPER BENTO (7 cols) */}
          <a
            href="#developer-bento"
            className="md:col-span-7 group p-6 sm:p-8 rounded-3xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between gap-6 shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                04 // IDENTITY
              </span>
              <span className="text-zinc-500 group-hover:text-white transition-colors">➔</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-blue-300 transition-colors">
                📊 DEVELOPER BENTO
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                Tools, resources and developer life: GitHub commits, LinkedIn achievements, and Instagram ML series.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span>562 Commits</span>
              <span>•</span>
              <span>10 ML Episodes</span>
              <span>•</span>
              <span>GDG Cloud Speaker</span>
            </div>
          </a>

        </div>
      </section>

      {/* ========================================================
          4. AHMEDABAD TO SAURASHTRA (Map Route Visual)
          ======================================================== */}
      <section id="locations" className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-zinc-800/80 space-y-10">
        <BlurFade delay={0.08} inView>
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#34A853] uppercase tracking-widest font-bold">
              // CONNECTED ROUTE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              AHMEDABAD → SAURASHTRA
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-medium">
              Where the brainstorming starts.
            </p>
          </div>
        </BlurFade>

        {/* Visual Map-Inspired Connected Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {CHAI_SPOTS.map((spot, idx) => (
            <div
              key={spot.id}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between gap-5 group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${spot.bgLight}`}>
                    {spot.vibe}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">0{idx + 1}</span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {spot.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{spot.location}</p>
                </div>
              </div>

              {/* CTAs: Meet & Maps */}
              <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/80 font-mono text-xs">
                <a
                  href={`https://wa.me/918866688575?text=${encodeURIComponent(spot.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-3 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-center transition-colors text-[11px]"
                >
                  Meet ☕
                </a>
                <a
                  href={spot.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-center transition-colors text-[11px]"
                >
                  Maps ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. AI MATRIX (GUJJU AI × CODE)
          ======================================================== */}
      <section id="ai-matrix" className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-zinc-800/80 space-y-10">
        <BlurFade delay={0.1} inView>
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#EA4335] uppercase tracking-widest font-bold">
              // CODE & SLANG
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              GUJJU AI × CODE
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Gujarati Slang", "Prompt Engineering", "GenAI", "Python", "Machine Learning", "Indic AI"].map((c, i) => (
                <span key={i} className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                  #{c}
                </span>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Interactive Slang & Code Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GUJJU_DICTIONARY.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-4 shadow-lg group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold">{item.tag}</span>
                  <span className="text-zinc-500">{item.term}</span>
                </div>
                <h4 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {item.gujju}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>

              {/* Code Snippet Box */}
              <div className="p-3 rounded-xl bg-black/80 border border-zinc-800/80 font-mono text-[11px] text-emerald-400 flex items-start justify-between gap-2 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{item.snippet}</pre>
                <button
                  onClick={() => handleCopy(item.snippet, idx)}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy Code"
                >
                  {copiedIndex === idx ? <IconCheck className="w-3.5 h-3.5 text-emerald-400" /> : <IconCopy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          DAYRO & HASYA VIDEO JUKEOX
          ======================================================== */}
      <section id="dayro-videos" className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-zinc-800/80 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#FBBC04] uppercase tracking-widest font-bold">
              // LIVE STREAMS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              LOK DAYRO & HASYA
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_DAYRO_VIDEOS.map((video) => (
            <div
              key={video.id}
              onClick={() => {
                setActiveVideo(video);
                playTapSound("pop");
              }}
              className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-3 space-y-3 cursor-pointer group hover:border-[#EA4335] transition-all shadow-md"
            >
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="260px"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 flex items-center justify-center transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#EA4335] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <IconPlayerPlayFilled className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 text-[9px] font-mono text-zinc-200">
                  {video.categoryLabel}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h4>
                <span className="text-[10px] text-zinc-400 font-mono block mt-1">{video.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

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
              <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900">
                <span className="text-xs font-bold text-white truncate font-mono">
                  {activeVideo.title}
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

      {/* ========================================================
          6. DEVELOPER MANIFESTO (Dramatic Minimal Dark Section)
          ======================================================== */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-b border-zinc-800/80 text-left">
        <BlurFade delay={0.12} inView>
          <div className="space-y-8 max-w-4xl">
            <div className="space-y-3 font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none">
              <h2 className="text-white">CODE WITH PURPOSE.</h2>
              <h2 className="text-white">BUILD WITH PEOPLE.</h2>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                SHIP WITH CHAI. ☕
              </h2>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-6 text-sm sm:text-base font-mono text-zinc-400">
              <span className="text-amber-300 font-bold">અમદાવાદથી બનાવેલું.</span>
              <span>•</span>
              <span className="text-orange-400 font-bold">કાઠિયાવાડથી powered.</span>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ========================================================
          7. CREATOR PROFILE (Conference Speaker Format & Bento)
          ======================================================== */}
      <section id="developer-bento" className="py-20 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-zinc-800/80 space-y-12">
        <BlurFade delay={0.14} inView>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#4285F4] uppercase tracking-widest font-bold">
                // SPEAKER / CREATOR
              </span>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
                VIVEK HINGU
              </h2>
              <p className="text-sm font-mono text-zinc-400">
                B.E. IT • SAL College of Engineering · <span className="text-emerald-400 font-bold">8.61 CGPA</span>
              </p>
            </div>

            {/* Skills & Quick Conference Links */}
            <div className="flex flex-wrap items-center gap-2">
              {["AI", "Python", "Machine Learning", "Generative AI"].map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                  {skill}
                </span>
              ))}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href="https://github.com/thatvivekhingu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white"
                >
                  <IconBrandGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/vivekhingu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white"
                >
                  <IconBrandLinkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/realvivek.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white"
                >
                  <IconBrandInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* The 3-Column Compact Social Bento Hub */}
        <SocialBentoBoard />
      </section>

      {/* ========================================================
          8. FOOTER (Minimal Premium Conference Footer)
          ======================================================== */}
      <footer className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase">
              GUJJU AI
            </h3>
            <p className="text-xs font-mono text-zinc-500 mt-1">
              Made in Ahmedabad with ☕ + Python
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
            <Link href="/#hero" className="hover:text-white transition-colors">Portfolio</Link>
            <Link href="/social-cards" className="hover:text-white transition-colors">Social</Link>
            <a href="https://github.com/thatvivekhingu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub ↗</a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
          <span>DEVFEST 2026 • GUJARAT</span>
          <span>© 2026 Vivek Hingu. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}
