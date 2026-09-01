"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconBrandInstagram,
  IconBrandGithub,
  IconCircleCheckFilled,
  IconStar,
  IconGitFork,
  IconCopy,
  IconCheck,
  IconArrowUpRight,
  IconChevronDown,
  IconPlayerPlayFilled,
  IconSparkles,
  IconCode,
  IconBrain,
  IconTerminal2,
} from "@tabler/icons-react";

export const SocialBentoBoard: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [starred, setStarred] = useState(false);
  const [starCount, setStarCount] = useState(21);

  const handleCopyClone = () => {
    navigator.clipboard.writeText("git clone https://github.com/thatvivekhingu/thatvivekhingu-PFL.git");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleToggleStar = () => {
    if (starred) {
      setStarCount((prev) => prev - 1);
      setStarred(false);
    } else {
      setStarCount((prev) => prev + 1);
      setStarred(true);
    }
  };

  // Real Pinned Repositories Data
  const pinnedRepos = [
    {
      name: "thatvivekhingu-PFL",
      href: "https://github.com/thatvivekhingu/thatvivekhingu-PFL",
      desc: "If my work inspires a conversation, collaboration, or opportunity, then this portfolio has already done its job. 🚀",
      lang: "TypeScript",
      langColor: "#3178c6",
      stars: 21,
    },
    {
      name: "SmartPark-Enforcer",
      href: "https://github.com/thatvivekhingu/SmartPark-Enforcer",
      desc: "AI-powered system for detecting, tracking, and managing illegal parking violations in real time",
      lang: "Jupyter Notebook",
      langColor: "#DA5B0B",
      stars: 5,
    },
    {
      name: "AI_Startup_Success_Predictor",
      href: "https://github.com/thatvivekhingu/Startup-Success-Predictor",
      desc: "AI Startup Success Predictor & Business Intelligence Dashboard — A full-stack machine learning application built with FastAPI, React, and Scikit-Learn.",
      lang: "JavaScript",
      langColor: "#f1e05a",
      stars: 3,
    },
    {
      name: "Aerosync",
      href: "https://github.com/thatvivekhingu/Aerosync",
      desc: "Drone se zameen ki photo lo, AI usse 'yeh ghar hai, yeh sadak hai' bol ke seedha legal land-record bana deta hai. SVAMITVA scheme analytics.",
      lang: "Python",
      langColor: "#3572A5",
      stars: 1,
    },
    {
      name: "Globe-Trotter_odoo_Tech-Titans",
      href: "https://github.com/thatvivekhingu/Globe-Trotter_odoo_Tech-Titans",
      desc: "GlobeTrotter — A simple, personalized platform to plan, manage, budget, and share your trips in one place",
      lang: "TypeScript",
      langColor: "#3178c6",
      stars: 1,
      forks: 1,
    },
    {
      name: "Bharat_Bhasha_Ai",
      href: "https://github.com/thatvivekhingu/Bharat-Bhasha-Ai-2.0",
      desc: "BharatBhasha AI — Next-gen Indic vernacular AI assistant powered by Groq LLaMA 3.3 70B, real-time Speech-to-Text & Voice Call mode.",
      lang: "HTML",
      langColor: "#e34c26",
      stars: 1,
    },
  ];

  // 6 Real Machine Learning Reel Episodes from Screenshot
  const mlEpisodes = [
    { ep: "8", title: "RANDOM FOREST", color: "from-emerald-950/90 to-[#07090e]", border: "border-emerald-500/30", tag: "EPISODE 8" },
    { ep: "7", title: "K-MEANS CLUSTERING", color: "from-amber-950/90 to-[#07090e]", border: "border-amber-500/30", tag: "EPISODE 7" },
    { ep: "6", title: "SVM", titleFull: "SUPPORT VECTOR MACHINE", color: "from-lime-950/90 to-[#07090e]", border: "border-lime-500/30", tag: "EPISODE 6" },
    { ep: "5", title: "KNN", color: "from-purple-950/90 to-[#07090e]", border: "border-purple-500/30", tag: "EPISODE 5" },
    { ep: "4", title: "NAIVE BAYES", color: "from-cyan-950/90 to-[#07090e]", border: "border-cyan-500/30", tag: "EPISODE 4" },
    { ep: "3", title: "DECISION TREE", color: "from-blue-950/90 to-[#07090e]", border: "border-blue-500/30", tag: "EPISODE 3" },
  ];

  // Compact Heatmap Matrix (7 rows x 26 weeks)
  const heatmapWeeks = Array.from({ length: 26 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const val = (w * 3 + d * 7 + (w % 3) * 4) % 5;
      return val === 0 ? 0 : val === 1 ? 1 : val === 2 ? 2 : val === 3 ? 3 : 4;
    })
  );

  return (
    <div className={`w-full max-w-7xl mx-auto p-1 sm:p-2 font-sans text-zinc-100 ${className}`}>
      {/* 3-Column Compact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">

        {/* =========================================================================
            LEFT COLUMN (lg:col-span-4): COMPACT PROFILE + INSTAGRAM CREATOR
            ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-[#090d14]/95 border border-zinc-800/80 p-3.5 sm:p-4 shadow-xl backdrop-blur-xl">
          <div className="space-y-2.5">
            {/* Header: Compact Profile Header (Horizontal / Tight) */}
            <div className="flex items-center gap-3">
              {/* Avatar with Neon Gradient Ring */}
              <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 shadow-[0_0_15px_rgba(244,63,94,0.3)] shrink-0">
                <div className="p-[1.5px] bg-[#090d14] rounded-full">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-zinc-900">
                    <Image
                      src="/avatars/vivek.jpg"
                      alt="realvivek.py"
                      fill
                      className="object-cover"
                      sizes="56px"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-black border border-zinc-700 flex items-center justify-center text-[8px] text-pink-400">
                  ⚡
                </div>
              </div>

              {/* Username, Role & Stats */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-bold text-white tracking-tight truncate">realvivek.py</h3>
                  <IconCircleCheckFilled className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                </div>
                <p className="text-[11px] text-zinc-400 font-medium leading-none">Pythonic Engineer</p>

                {/* 10 Posts / 213 Followers / 11 Following */}
                <div className="flex items-center gap-2.5 text-[10px] text-zinc-400 pt-1.5 font-mono">
                  <span><strong className="text-white">10</strong> posts</span>
                  <span>•</span>
                  <span><strong className="text-white">213</strong> followers</span>
                  <span>•</span>
                  <span><strong className="text-white">11</strong> following</span>
                </div>
              </div>
            </div>

            {/* Shortened Bio Bullets */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10.5px] text-zinc-300 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800/60 leading-tight">
              <div className="flex items-center gap-1.5 truncate">
                <span>🧠</span>
                <span className="truncate">Powered by curiosity</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <span>🎬</span>
                <span className="truncate">AI Ads & Brand Videos</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <span>🤖</span>
                <span className="truncate">AI Content Creator</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <span>🎯</span>
                <span className="truncate">Real-life ML • Simple</span>
              </div>
            </div>

            {/* 3 Compact Navigation/Action Chips */}
            <div className="grid grid-cols-3 gap-1.5">
              <a
                href="https://instagram.com/realvivek.py"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 px-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-medium text-cyan-300 flex items-center justify-center gap-1 transition-colors"
              >
                <IconSparkles className="w-3 h-3 text-cyan-400" />
                <span>AI Ads</span>
              </a>
              <a
                href="https://instagram.com/realvivek.py"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 px-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-medium text-amber-300 flex items-center justify-center gap-1 transition-colors"
              >
                <IconCode className="w-3 h-3 text-amber-400" />
                <span>ML Projects</span>
              </a>
              <a
                href="https://instagram.com/realvivek.py"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 px-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-[10px] font-medium text-rose-300 flex items-center justify-center gap-1 transition-colors"
              >
                <IconPlayerPlayFilled className="w-2.5 h-2.5 text-rose-400" />
                <span>Reels</span>
              </a>
            </div>

            {/* 6 Real ML/AI Reel Thumbnails in Compact 3x2 Grid */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono px-0.5">
                <span>REELS SERIES</span>
                <span className="text-pink-400">ML Visualized</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {mlEpisodes.map((item, idx) => (
                  <a
                    key={idx}
                    href="https://instagram.com/realvivek.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative aspect-[9/11] rounded-lg overflow-hidden bg-gradient-to-b ${item.color} border ${item.border} p-1.5 flex flex-col justify-between shadow-sm transition-all hover:scale-105 hover:border-pink-500/50`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[6.5px] font-mono font-bold tracking-wider px-1 py-0.2 rounded bg-black/80 text-amber-300">
                        {item.tag}
                      </span>
                      <IconPlayerPlayFilled className="w-2 h-2 text-zinc-400 group-hover:text-white" />
                    </div>

                    <div className="relative w-full aspect-square rounded overflow-hidden bg-zinc-900 my-auto">
                      <Image
                        src="/avatars/vivek.jpg"
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="60px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="text-center leading-none">
                      <span className="text-[7.5px] font-bold text-white tracking-tight uppercase line-clamp-1">
                        {item.title}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Instagram Link */}
          <div className="pt-2 border-t border-zinc-800/80 mt-2 text-center">
            <a
              href="https://instagram.com/realvivek.py"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-pink-400 hover:text-pink-300 transition-colors"
            >
              <IconBrandInstagram className="w-3.5 h-3.5" />
              <span>View more on Instagram →</span>
            </a>
          </div>
        </div>

        {/* =========================================================================
            CENTER COLUMN (lg:col-span-5): COMPACT GITHUB HUB + PINNED + HEATMAP
            ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#090d14]/95 border border-zinc-800/80 p-3.5 sm:p-4 shadow-xl backdrop-blur-xl space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white">
                <IconBrandGithub className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">thatvivekhingu</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    562 commits
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400">Building AI systems & open-source ML tools</p>
              </div>
            </div>
            <a
              href="https://github.com/thatvivekhingu"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-[11px] font-semibold flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <IconArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* 6 Real Pinned Repositories Grid (2x3 Compact) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 px-0.5">
              <span>PINNED REPOSITORIES</span>
              <a href="https://github.com/thatvivekhingu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Customize pins
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {pinnedRepos.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between gap-1 text-left"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1 min-w-0">
                        <IconBrandGithub className="w-3 h-3 text-zinc-400 shrink-0" />
                        <span className="text-[11px] font-bold text-blue-400 group-hover:underline truncate">
                          {repo.name}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-zinc-950 text-zinc-400 border border-zinc-800 shrink-0">
                        Public
                      </span>
                    </div>

                    <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2 mt-0.5">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-zinc-400 font-mono pt-0.5 border-t border-zinc-800/40">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                      <span className="truncate max-w-[80px]">{repo.lang}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="flex items-center gap-0.5">
                        <IconStar className="w-2.5 h-2.5 text-zinc-400" />
                        {repo.stars}
                      </span>
                      {repo.forks && (
                        <span className="flex items-center gap-0.5">
                          <IconGitFork className="w-2.5 h-2.5 text-zinc-400" />
                          {repo.forks}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Compact Contribution Heatmap Section */}
          <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white tracking-tight">
                562 contributions in the last year
              </span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                <span>2026</span>
                <IconChevronDown className="w-2.5 h-2.5 text-zinc-400" />
              </div>
            </div>

            {/* Heatmap Grid + Total Circle */}
            <div className="flex items-center gap-2.5">
              <div className="flex-1 space-y-0.5 overflow-x-auto">
                <div className="flex justify-between text-[8px] font-mono text-zinc-500 px-0.5">
                  <span>Feb</span>
                  <span>Apr</span>
                  <span>Jun</span>
                  <span>Aug</span>
                  <span>Oct</span>
                  <span>Dec</span>
                  <span>Jan</span>
                </div>

                <div className="flex gap-0.5 flex-1">
                  {heatmapWeeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-0.5 flex-1">
                      {week.map((level, dIdx) => (
                        <div
                          key={dIdx}
                          className={`w-full aspect-square rounded-[1.5px] transition-colors ${
                            level === 0
                              ? "bg-zinc-900"
                              : level === 1
                              ? "bg-emerald-950"
                              : level === 2
                              ? "bg-emerald-800"
                              : level === 3
                              ? "bg-emerald-600"
                              : "bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.5)]"
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[8.5px] text-zinc-500 font-mono pt-0.5">
                  <span>Contribution settings</span>
                  <div className="flex items-center gap-1">
                    <span>Less</span>
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-zinc-900" />
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-emerald-950" />
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-emerald-700" />
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-emerald-400" />
                    <span>More</span>
                  </div>
                </div>
              </div>

              {/* Total Score Badge */}
              <div className="relative w-12 h-12 shrink-0 rounded-full border border-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.25)] flex flex-col items-center justify-center bg-emerald-950/30">
                <span className="text-xs font-black text-emerald-300 leading-none">562</span>
                <span className="text-[7px] font-mono text-emerald-400/80 uppercase">Total</span>
              </div>
            </div>

            {/* Bottom View on GitHub */}
            <div className="text-right pt-0.5">
              <a
                href="https://github.com/thatvivekhingu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10.5px] text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>View on GitHub</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (lg:col-span-3): LINKEDIN + AI ACTIVITY + TECH STACK
            ========================================================================= */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-3">
          
          {/* 1. Real LinkedIn Post Card */}
          <div className="rounded-2xl bg-[#090d14]/95 border border-zinc-800/80 p-3 shadow-xl backdrop-blur-xl space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-[#0a66c2] text-white flex items-center justify-center font-bold text-[10px]">
                  in
                </div>
                <div>
                  <div className="flex items-center gap-1 leading-none">
                    <span className="text-[11px] font-bold text-white">Vivek Hingu</span>
                    <IconCircleCheckFilled className="w-2.5 h-2.5 text-blue-400" />
                  </div>
                  <span className="text-[8.5px] text-zinc-400 leading-none">GDG Cloud Gandhinagar</span>
                </div>
              </div>
              <a
                href="https://linkedin.com/in/vivekhingu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-blue-400 hover:underline"
              >
                LinkedIn →
              </a>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-1.5">
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 shrink-0">
                <Image
                  src="/avatars/vivek.jpg"
                  alt="Vivek Hingu"
                  fill
                  className="object-cover"
                  sizes="24px"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10.5px] font-bold text-white truncate block leading-none">
                  Vivek Hingu <span className="text-zinc-500 font-normal">• You</span>
                </span>
                <span className="text-[9px] text-zinc-400 truncate block leading-tight">
                  AI/ML Engineer | Final Year IT
                </span>
              </div>
            </div>

            {/* Post text */}
            <p className="text-[10px] text-zinc-300 leading-relaxed line-clamp-2">
              Spent the day at Build with Antigravity: Final Edition by{" "}
              <span className="text-blue-400 font-medium">GDG Cloud Gandhinagar</span> ... more
            </p>

            {/* Event photo container */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-black border border-zinc-800">
              <Image
                src="/social/linkedin-post.png"
                alt="Build with Antigravity GDG"
                fill
                className="object-cover"
                sizes="260px"
              />
              <div className="absolute top-1.5 right-1.5 px-1 py-0.2 rounded bg-black/80 text-[8px] font-mono text-white">
                1/6
              </div>
            </div>

            {/* Reactions bar */}
            <div className="flex items-center justify-between text-[9px] text-zinc-400 pt-0.5 border-t border-zinc-800/60 font-mono">
              <div className="flex items-center gap-1">
                <span>👏 ❤️ 💡</span>
                <span className="truncate">131 others</span>
              </div>
              <span>4 comments</span>
            </div>
          </div>

          {/* 2. AI Activity Card (Replaces duplicate IG) */}
          <div className="rounded-2xl bg-[#090d14]/95 border border-zinc-800/80 p-3 shadow-xl backdrop-blur-xl space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-1.5">
              <div className="flex items-center gap-1.5">
                <IconBrain className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-bold text-white">AI ACTIVITY</span>
              </div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/50 px-1.5 py-0.2 rounded border border-cyan-500/30">
                Live Stats
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-center">
              <div className="p-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800">
                <span className="block text-xs font-bold text-white">12+</span>
                <span className="text-[9px] text-zinc-400">AI Projects</span>
              </div>
              <div className="p-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800">
                <span className="block text-xs font-bold text-white">8 Repos</span>
                <span className="text-[9px] text-zinc-400">Open Source</span>
              </div>
              <div className="p-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800">
                <span className="block text-xs font-bold text-white">Python/TS</span>
                <span className="text-[9px] text-zinc-400">Languages</span>
              </div>
              <div className="p-1.5 rounded-lg bg-zinc-900/70 border border-zinc-800">
                <span className="block text-xs font-bold text-emerald-400">560+</span>
                <span className="text-[9px] text-zinc-400">Contributions</span>
              </div>
            </div>
          </div>

          {/* 3. Tech Stack & Repository Actions Card */}
          <div className="rounded-2xl bg-[#090d14]/95 border border-zinc-800/80 p-3 shadow-xl backdrop-blur-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <IconTerminal2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-bold text-white">TECH STACK</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-400">100% Active</span>
            </div>

            {/* Activity Progress Bar */}
            <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden flex">
              <div className="h-full w-[45%] bg-gradient-to-r from-blue-500 to-indigo-500" />
              <div className="h-full w-[30%] bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
              <div className="h-full w-[25%] bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
            </div>

            {/* Tag Chips */}
            <div className="flex flex-wrap gap-1">
              {["#ai-ml", "#python", "#web-dev", "#data-science", "#apis"].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View Repo Link */}
            <div className="pt-0.5">
              <a
                href="https://github.com/thatvivekhingu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View repository on GitHub</span>
                <span>→</span>
              </a>
            </div>

            {/* Action Buttons: Star, Fork, Clone */}
            <div className="grid grid-cols-3 gap-1 pt-0.5">
              <button
                onClick={handleToggleStar}
                className={`py-1 px-1.5 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  starred
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300"
                }`}
              >
                <IconStar className="w-3 h-3" />
                <span>Star {starCount}</span>
              </button>

              <a
                href="https://github.com/thatvivekhingu/thatvivekhingu-PFL/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 px-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <IconGitFork className="w-3 h-3" />
                <span>Fork 5</span>
              </a>

              <button
                onClick={handleCopyClone}
                className="py-1 px-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <IconCheck className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Done</span>
                  </>
                ) : (
                  <>
                    <IconCopy className="w-3 h-3" />
                    <span>Clone</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
