"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCoffee,
  IconArrowLeft,
  IconBrandGithub,
  IconVolume,
  IconCheck,
  IconCalculator,
  IconLanguage,
  IconRefresh,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";

// 1. Slang Translator Presets
const TRANSLATION_PRESETS = [
  {
    id: 1,
    corporate: "We need to align our deliverables for the next sprint.",
    gujju: "ભાઈ, પહેલા નક્કી કરી લો કોને શું કરવાનું છે, છેલ્લે ગોટા ના વળવા જોઈએ!",
    context: "Sprint Planning",
  },
  {
    id: 2,
    corporate: "There is a critical bug in production.",
    gujju: "લોચા પડી ગયા ભાઈ, સર્વર બેસી ગયું છે, ફટાફટ જુઓ!",
    context: "Production Alert",
  },
  {
    id: 3,
    corporate: "We have successfully closed our seed funding round.",
    gujju: "પાર્ટી બાકી છે હોં, પૈસા આવી ગયા છે, હવે જલસા કરો!",
    context: "Funding News",
  },
  {
    id: 4,
    corporate: "Can you please put in some extra hours over the weekend?",
    gujju: "શનિ-રવિ તો ફાફડા અને મેચનો ટાઈમ છે, સોમવારે સવારે વાત કરીએ!",
    context: "Weekend Overtime",
  },
  {
    id: 5,
    corporate: "The project timeline is extremely aggressive.",
    gujju: "ગાડી છૂટવાની તૈયારીમાં છે, ફટાફટ દેશી જુગાડ લગાવો!",
    context: "Tight Deadline",
  },
  {
    id: 6,
    corporate: "Let us take this offline and circle back later.",
    gujju: "હવે ચા પીવા ગલ્લે ચાલો, ત્યાં જઈને આરામથી ફોડ પાડીએ!",
    context: "Meeting Exit",
  },
];

// 2. Soundboard Lines
const SOUNDBOARD_ITEMS = [
  { id: 1, text: "જલસા કરો બાપ!", sub: "Pure Kathiyawadi Vibe", sound: "chime" as const },
  { id: 2, text: "હવે તું શાંતિ રાખ, આપણે જોઈ લઈશું.", sub: "Debugging Confidence", sound: "pop" as const },
  { id: 3, text: "ચા પીવી છે? ચાલો ગલ્લે!", sub: "4 PM Ritual", sound: "hover" as const },
  { id: 4, text: "આમાં કંઈ નવું નથી, આપણો દેશી જુગાડ છે.", sub: "Tech Innovation", sound: "access_granted" as const },
  { id: 5, text: "વાહ ભાઈ વાહ, મોજ પડી ગઈ!", sub: "Code Works on First Run", sound: "chime" as const },
  { id: 6, text: "જય શ્રી કૃષ્ણ, હવે પ્રોડક્શનમાં પુશ કરો!", sub: "Deploy Prayer", sound: "pop" as const },
];

// 3. Desi Karodiyo Chronicles
const KARODIYO_STORIES = [
  {
    id: 1,
    title: "Atal Bridge Web Swing",
    gujarati: "અટલ બ્રિજ પર જાળું ફેંક્યું પણ સાબરમતીની હવા એટલી મસ્ત હતી કે કરોડિયો રિવરફ્રન્ટે ચા પીવા બેસી ગયો!",
    emoji: "🌉",
  },
  {
    id: 2,
    title: "Manek Chowk Midnight Mission",
    gujarati: "રાતે ૨ વાગ્યે માણેક ચોકમાં ચોકલેટ સેન્ડવિચ ખાતા ખાતા કરોડિયો બગ ફિક્સ કરતો ઝડપાયો!",
    emoji: "🥪",
  },
  {
    id: 3,
    title: "Navratri Special Suit",
    gujarati: "નવરાત્રીમાં કરોડિયો કેડિયા વાળો સ્પાઈડર સૂટ પહેરીને દોઢિયાના સ્ટેપમાં જાળાં ફેંકે છે!",
    emoji: "💃",
  },
  {
    id: 4,
    title: "The Ultimate Rule",
    gujarati: "જ્યાં સુધી ગલ્લાની કડક કટિંગ ચા ના મળે, ત્યાં સુધી દેશી કરોડિયો એક પણ જાળું ના બનાવે!",
    emoji: "☕",
  },
];

// 4. Kitli Menu Items
const KITLI_MENU = [
  { id: "cutting", name: "કટિંગ ચા", price: 10, emoji: "☕" },
  { id: "maskabun", name: "મસ્કાબન", price: 30, emoji: "🍞" },
  { id: "fafda", name: "ફાફડા-જલેબી", price: 60, emoji: "🥟" },
  { id: "kadak", name: "સ્પેશિયલ કડક ચા", price: 20, emoji: "🔥" },
];

export default function GujjuversePage() {
  // Tapri Simulator state
  const [tapriBill, setTapriBill] = useState<{ [key: string]: number }>({ cutting: 1 });
  const [tapriTotal, setTapriTotal] = useState(10);
  const [tapriDialogue, setTapriDialogue] = useState("કાકા, ચા જરા કડક અને મીઠી ઓછી રાખજો!");

  // Slang Translator state
  const [selectedPreset, setSelectedPreset] = useState(TRANSLATION_PRESETS[0]);
  const [customText, setCustomText] = useState("");
  const [customTranslation, setCustomTranslation] = useState<string | null>(null);

  // ROI Calculator state
  const [codingHours, setCodingHours] = useState(6);

  // General Toast & Copy
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeVoice, setActiveVoice] = useState<number | null>(null);

  const handleOrderTapriItem = (itemId: string, price: number, name: string) => {
    playTapSound("pop");
    setTapriBill((prev) => {
      const nextCount = (prev[itemId] || 0) + 1;
      return { ...prev, [itemId]: nextCount };
    });
    setTapriTotal((prev) => prev + price);

    const dialogues = [
      "એક " + name + " નો ઓર્ડર આવી ગયો ભાઈ!",
      "કાકા, ચા જરા કડક અને મીઠી ઓછી રાખજો!",
      "સવારે ૭ થી રાતે ૨ વાગ્યા સુધી કિટલી ઓપન છે!",
      "ચા સાથે મસ્કાબન બોળવાની મજા જ અલગ છે!",
      "લોજિક મીઠું અને ચા કડક — આ જ આપણો સિક્રેટ કોડ!",
    ];
    setTapriDialogue(dialogues[Math.floor(Math.random() * dialogues.length)]);
  };

  const handleResetTapri = () => {
    playTapSound("hover");
    setTapriBill({ cutting: 1 });
    setTapriTotal(10);
    setTapriDialogue("ટેબલ સાફ થઈ ગયું! નવો ઓર્ડર આપો!");
  };

  const handleSpeak = (text: string, id: number, soundType: "pop" | "chime" | "hover" | "access_granted") => {
    playTapSound(soundType);
    setActiveVoice(id);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.lang = "gu-IN";
      utterance.onend = () => setActiveVoice(null);
      utterance.onerror = () => setActiveVoice(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setActiveVoice(null), 1200);
    }
  };

  const handleCopy = (text: string) => {
    playTapSound("chime");
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleCustomTranslate = () => {
    if (!customText.trim()) return;
    playTapSound("access_granted");
    const gujjuSuffixes = [
      "ભાઈ, આમાં કંઈ ટેન્શન લેવા જેવું નથી, આપણે જોઈ લઈશું!",
      "આ કામ તો ૧૦ મિનિટમાં પતી જશે, પહેલા ચા પીવા ગલ્લે ચાલો!",
      "આપણા દેશી જુગાડ આગળ દુનિયાની કોઈ AI ના ટકી શકે!",
      "વાહ ભાઈ વાહ, આમાં તો મોજ પડી જશે!",
    ];
    const randomOutput = gujjuSuffixes[Math.floor(Math.random() * gujjuSuffixes.length)];
    setCustomTranslation(randomOutput);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white px-4 py-16 sm:py-24 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Background Decorative Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 right-10 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Floating Notification */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-2.5 rounded-full bg-zinc-900 border border-amber-500/50 text-amber-300 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-xl flex items-center gap-2"
          >
            <IconCheck className="w-4 h-4 text-emerald-400" />
            <span>Copied to Clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24">
        {/* Top Bar Navigation */}
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
              <span>દેશી કરોડિયો APPROVED 🕷️</span>
            </div>
          </div>
        </BlurFade>

        {/* Hero Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase">
              <IconCoffee className="w-4 h-4 animate-bounce" />
              <span>AHMEDABAD TECH & TAPRI UNIVERSE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                GUJJU VERSE
              </span>{" "}
              <span>☕</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-400 font-medium leading-relaxed">
              ગલ્લાની કટિંગ ચા, મસ્કાબન અને આર્ટિફિશિયલ ઇન્ટેલિજન્સ. Where pure Gujarati humor meets deep AI engineering!
            </p>
          </div>
        </BlurFade>

        {/* FEATURE 1: અમદાવાદી કિટલી / ચા નો ગલ્લો (Virtual Tapri Simulator) */}
        <BlurFade delay={0.15} inView>
          <div className="relative p-6 sm:p-10 rounded-3xl bg-zinc-950/90 border border-amber-500/30 space-y-8 shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <IconCoffee className="w-4 h-4" />
                  <span>Interactive Simulator</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                  અમદાવાદી કિટલી / ચા નો ગલ્લો ☕
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Click to order your favorite kitli refreshments & see the live bill!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-2xl bg-zinc-900 border border-amber-500/40 text-amber-300 font-mono font-bold text-sm">
                  કુલ બિલ: ₹{tapriTotal}
                </div>
                <button
                  onClick={handleResetTapri}
                  title="Clear Table"
                  className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                >
                  <IconRefresh className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {KITLI_MENU.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleOrderTapriItem(item.id, item.price, item.name)}
                  className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/60 hover:bg-zinc-900 transition-all text-left flex flex-col justify-between space-y-3 group cursor-pointer active:scale-95 select-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-950 text-[11px] font-mono text-amber-400 font-bold">
                      {tapriBill[item.id] || 0} ordered
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500">₹{item.price} / item</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Tapri Master Dialogue Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900/80 to-zinc-950 border border-amber-500/30 flex items-center gap-3">
              <span className="text-2xl">👨‍🍳</span>
              <p className="text-xs sm:text-sm font-medium text-amber-200">
                <span className="font-bold font-mono text-amber-400">કિટલી વાળા ભાઈ: </span>
                {tapriDialogue}
              </p>
            </div>
          </div>
        </BlurFade>

        {/* FEATURE 2: Gujju Slang & Corporate Translator */}
        <BlurFade delay={0.2} inView>
          <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950/90 border border-cyan-500/30 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <IconLanguage className="w-4 h-4" />
                  <span>AI Slang Engine</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                  કોર્પોરેટ ➔ ગુજ્જુ સ્લેંગ કન્વર્ટર ⚡
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Translate boring corporate buzzwords into authentic Amdavad slang!
                </p>
              </div>
            </div>

            {/* Preset Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {TRANSLATION_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    playTapSound("hover");
                    setSelectedPreset(preset);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                    selectedPreset.id === preset.id
                      ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                  }`}
                >
                  {preset.context}
                </button>
              ))}
            </div>

            {/* Active Translation Comparison Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  💼 Corporate English
                </span>
                <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                  &ldquo;{selectedPreset.corporate}&rdquo;
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                      🔥 Pure Gujju Translation
                    </span>
                    <button
                      onClick={() => handleCopy(selectedPreset.gujju)}
                      className="text-xs font-mono text-zinc-400 hover:text-cyan-300 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-base sm:text-lg text-cyan-200 font-bold leading-relaxed pt-1">
                    &ldquo;{selectedPreset.gujju}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Input Translator */}
            <div className="pt-2 space-y-3">
              <span className="text-xs font-mono text-zinc-400">
                અથવા તમારો પોતાનો કોર્પોરેટ મેસેજ લખો:
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. Please approve my PR before EOD..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/60 font-sans"
                />
                <button
                  onClick={handleCustomTranslate}
                  className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs sm:text-sm transition-all shrink-0"
                >
                  Convert to Gujju 🔥
                </button>
              </div>

              {customTranslation && (
                <div className="p-4 rounded-2xl bg-zinc-900 border border-cyan-500/40 text-cyan-300 text-sm sm:text-base font-bold animate-fadeIn">
                  &ldquo;{customTranslation}&rdquo;
                </div>
              )}
            </div>
          </div>
        </BlurFade>

        {/* FEATURE 3: Gujju Audio Soundboard */}
        <BlurFade delay={0.25} inView>
          <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950/90 border border-amber-500/30 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <IconVolume className="w-4 h-4" />
                  <span>Audio Punchlines</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                  Gujju Audio Soundboard 🎙️
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Click any punchline to play sound & hear it spoken live!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SOUNDBOARD_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSpeak(item.text, item.id, item.sound)}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer select-none group active:scale-95 ${
                    activeVoice === item.id
                      ? "bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                      : "bg-zinc-900/80 border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-amber-400 transition-colors">
                      {item.sub}
                    </span>
                    <IconVolume
                      className={`w-4 h-4 ${
                        activeVoice === item.id ? "text-amber-400 animate-pulse" : "text-zinc-600 group-hover:text-amber-400"
                      }`}
                    />
                  </div>
                  <p className="text-base font-bold text-zinc-100 group-hover:text-amber-200 transition-colors leading-snug">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </button>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* FEATURE 4: ધંધો & ફાફડા Energy ROI Calculator */}
        <BlurFade delay={0.3} inView>
          <div className="p-6 sm:p-10 rounded-3xl bg-zinc-950/90 border border-emerald-500/30 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <IconCalculator className="w-4 h-4" />
                  <span>Gujju Dev Mindset</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                  ધંધો & ફાફડા ROI કેલ્ક્યુલેટર 📊
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Track how much Gujarati fuel power you burn during engineering!
                </p>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center justify-between text-sm font-mono">
                <span className="text-zinc-400">આજે કેટલા કલાક કોડિંગ કર્યું?</span>
                <span className="text-emerald-400 font-bold text-lg">{codingHours} કલાક</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                value={codingHours}
                onChange={(e) => {
                  playTapSound("hover");
                  setCodingHours(parseInt(e.target.value, 10));
                }}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Metrics Output Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1 text-center">
                <span className="text-2xl">☕</span>
                <div className="text-xl font-bold font-mono text-amber-400">{codingHours * 2} કપ</div>
                <p className="text-xs text-zinc-400">કટિંગ ચા ની ઉર્જા</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1 text-center">
                <span className="text-2xl">🥟</span>
                <div className="text-xl font-bold font-mono text-yellow-400">{codingHours * 50}g</div>
                <p className="text-xs text-zinc-400">ફાફડા-જલેબી ફ્યુઅલ</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1 text-center">
                <span className="text-2xl">⚡</span>
                <div className="text-xl font-bold font-mono text-cyan-400">{codingHours * 4}</div>
                <p className="text-xs text-zinc-400">બગ્સ સોલ્વ કર્યા</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1 text-center">
                <span className="text-2xl">📈</span>
                <div className="text-xl font-bold font-mono text-emerald-400">100% નફો</div>
                <p className="text-xs text-zinc-400">ધંધો સફળ!</p>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* FEATURE 5: દેશી કરોડિયો Chronicles 🕷️ */}
        <BlurFade delay={0.35} inView>
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <span className="text-2xl">🕷️</span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-200 uppercase font-mono">
                દેશી કરોડિયો (Desi Karodiyo) Chronicles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {KARODIYO_STORIES.map((story) => (
                <div
                  key={story.id}
                  className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-red-500/40 transition-all space-y-2 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{story.emoji}</span>
                    <h3 className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-red-400 transition-colors">
                      {story.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-9">
                    {story.gujarati}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Footer Callout */}
        <BlurFade delay={0.4} inView>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-amber-500/20 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              હવે જાવ અને GitHub પર એક સ્ટાર આપી દો! ☕⭐
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-mono">
              Because every star fuels more cutting chai, machine learning models, and pure Gujarati jalsa.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/"
                onClick={() => playTapSound("pop")}
                className="px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-all"
              >
                Back to Portfolio
              </Link>
              <a
                href="https://github.com/thatvivekhingu/thatvivekhingu-PFL"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTapSound("chime")}
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-bold transition-all"
              >
                Star on GitHub (21 ⭐)
              </a>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
