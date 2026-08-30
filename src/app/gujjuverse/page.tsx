"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCoffee,
  IconSparkles,
  IconArrowLeft,
  IconBrandGithub,
  IconCode,
  IconShare,
  IconCheck,
  IconMoodSmile,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { BlurFade } from "@/components/ui/blur-fade";

interface GujjuMeme {
  id: number;
  gujarati: string;
  englishMeaning: string;
  tag: string;
  icon: string;
}

const GUJJU_MEMES: GujjuMeme[] = [
  {
    id: 1,
    gujarati: "એક કામ કર, સ્ટાર આપતો જા… બપોરની ચા મારી તરફથી ☕",
    englishMeaning: "Do one thing, drop a GitHub star... afternoon tea is on me!",
    tag: "GitHub Ritual",
    icon: "☕",
  },
  {
    id: 2,
    gujarati: "કોડિંગમાં Error આવે તો ગાંઠિયા ખાઈ લેવાના, લોજિક આપોઆપ આવી જાય 🥟",
    englishMeaning: "When code hits an error, have some Gathiya; logic follows automatically.",
    tag: "Debugging Tip",
    icon: "🥟",
  },
  {
    id: 3,
    gujarati: "Bug તો આવે ને જાય, પણ આપણો જલસો કાયમ રહેવો જોઈએ! 🚀",
    englishMeaning: "Bugs come and go, but the fun & vibe should stay forever!",
    tag: "Life Philosophy",
    icon: "🎉",
  },
  {
    id: 4,
    gujarati: "Client: આટલું જલ્દી કેમ થઈ ગયું? Dev: ભાઈ, ગુજરાતી છીએ, વેપાર અને કોડિંગ લોહીમાં છે! 💼",
    englishMeaning: "Client: How did you finish so fast? Dev: Bro, we are Gujarati, business & code are in our DNA!",
    tag: "Dev Hustle",
    icon: "💼",
  },
  {
    id: 5,
    gujarati: "Machine Learning મોડેલ ટ્રેઇન થાય ત્યાં સુધી એક કટિંગ ચા પી લઈએ ☕",
    englishMeaning: "While the ML model finishes training, let's grab a cutting chai.",
    tag: "AI & ML",
    icon: "🤖",
  },
  {
    id: 6,
    gujarati: "Production માં Bug? ચિંતા નહીં, ‘આપણે જોઈ લઈશું’ કહીને રીસ્ટાર્ટ મારી દો 😂",
    englishMeaning: "Bug in prod? No panic, say 'we will see' and hit restart.",
    tag: "DevOps Jugad",
    icon: "🛠️",
  },
  {
    id: 7,
    gujarati: "AI Agent બનાવવો હોય કે નવરાત્રીનો પાસ, આપણો જુગાડ ૧૦૦% કામ કરે 🔥",
    englishMeaning: "Whether building an AI agent or getting a Navratri pass, our jugad is 100% reliable.",
    tag: "Gujju Superpower",
    icon: "🔥",
  },
  {
    id: 8,
    gujarati: "Git commit message: ‘જય શ્રી કૃષ્ણ, હવે ચાલવું જોઈએ’ 🙏",
    englishMeaning: "Git commit: 'Jai Shree Krishna, it should work now.'",
    tag: "Version Control",
    icon: "🙏",
  },
];

const GUJJU_PRINCIPLES = [
  {
    title: "FDD (Fafda Driven Development)",
    desc: "Sunday morning sprint planning powered by hot fafda, jalebi, and green chutney.",
    emoji: "🥟",
  },
  {
    title: "The 4 PM Cutting Chai Protocol",
    desc: "All system errors dissolve automatically after one cup of masala tea.",
    emoji: "☕",
  },
  {
    title: "Jugad-First Architecture",
    desc: "Solving billion-dollar problems with efficient local optimization and zero waste.",
    emoji: "⚡",
  },
  {
    title: "Garba & Clean Code Rhythm",
    desc: "If your algorithms don't follow the 3-Taali rhythm, refactor them.",
    emoji: "💃",
  },
];

export default function GujjuversePage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [chaiCount, setChaiCount] = useState(1);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleCopy = (meme: GujjuMeme) => {
    playTapSound("chime");
    navigator.clipboard.writeText(`${meme.gujarati}\n— ${meme.englishMeaning}`);
    setCopiedId(meme.id);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleChaiClick = () => {
    playTapSound("pop");
    setChaiCount((prev) => prev + 1);
    if (chaiCount % 5 === 0) {
      showToast(`☕ ${chaiCount + 1} Chai પી લીધી! હવે કોડિંગમાં આગ લગાવી દેશું!`);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white px-4 py-16 sm:py-24 overflow-x-hidden selection:bg-amber-500 selection:text-black">
      {/* Background Decorative Rings */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-40 right-10 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none -z-10" />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-2.5 rounded-full bg-zinc-900 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-xl flex items-center gap-2"
          >
            <IconSparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24">
        {/* Navigation Back */}
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

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-amber-400">
              <span>દેશી કરોડિયો APPROVED 🕷️</span>
            </div>
          </div>
        </BlurFade>

        {/* Hero Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase">
              <IconCoffee className="w-4 h-4 animate-bounce" />
              <span>GUJARATI TECH & CULTURE CORNER</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                GUJJU VERSE
              </span>{" "}
              <span>☕</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-400 font-medium leading-relaxed">
              Fafda, Jalebi, Masala Chai & Machine Learning. Where Gujarati humor meets AI engineering, clean code & pure jalsa!
            </p>

            {/* Interactive Chai Button */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleChaiClick}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
              >
                <IconCoffee className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>Offer Vivek a Chai ({chaiCount})</span>
              </button>

              <a
                href="https://github.com/thatvivekhingu/thatvivekhingu-PFL"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTapSound("pop")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all"
              >
                <IconBrandGithub className="w-4 h-4 text-amber-400" />
                <span>Star Portfolio on GitHub ⭐</span>
              </a>
            </div>
          </div>
        </BlurFade>

        {/* Gujju Dev Principles */}
        <BlurFade delay={0.15} inView>
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-4">
              <IconCode className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-200 uppercase font-mono">
                The Gujju Developer Manifesto
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GUJJU_PRINCIPLES.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/70 hover:border-amber-500/40 transition-all space-y-2 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <h3 className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-9">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Meme & Punchlines Grid */}
        <BlurFade delay={0.2} inView>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <div className="flex items-center gap-3">
                <IconMoodSmile className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-200 uppercase font-mono">
                  Gujju Tech Punchline Vault
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                Click card to copy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {GUJJU_MEMES.map((meme) => (
                <motion.div
                  key={meme.id}
                  whileHover={{ y: -3 }}
                  onClick={() => handleCopy(meme)}
                  className="relative p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800/80 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-amber-400">
                      <span>{meme.icon}</span>
                      <span>{meme.tag}</span>
                    </div>

                    <button
                      aria-label="Copy punchline"
                      className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-amber-400 group-hover:border-amber-500/40 transition-colors"
                    >
                      {copiedId === meme.id ? (
                        <IconCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <IconShare className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-amber-200 transition-colors leading-snug">
                      “{meme.gujarati}”
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-500 font-mono italic">
                      — {meme.englishMeaning}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-600 group-hover:text-amber-400/80 transition-colors">
                    <span>VIVEK_HINGU // GUJJU_VERSE</span>
                    <span>Tap to copy</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* Footer Callout */}
        <BlurFade delay={0.25} inView>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-amber-500/20 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              હવે જાવ અને GitHub પર એક સ્ટાર આપી દો! ☕⭐
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-mono">
              Because every star fuels more AI models, smart agents, and endless Gujarati banter.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/"
                onClick={() => playTapSound("pop")}
                className="px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs sm:text-sm font-semibold text-zinc-200 hover:text-white transition-all"
              >
                Back to Home
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
