"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandGithub,
  IconCircleCheckFilled,
  IconStar,
  IconGitFork,
  IconCopy,
  IconCheck,
  IconDots,
  IconWorld,
  IconArrowUpRight,
  IconChevronDown,
  IconPlayerPlayFilled,
  IconPlus,
  IconSparkles,
  IconCode,
  IconBrain,
  IconVideo,
  IconTarget,
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

  // 6 Pinned Repositories Data
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
      desc: "AI Startup Success Predictor & Business Intelligence Dashboard — A full-stack machine learning application built with FastAPI, React, and Scikit-Learn to evaluate startup success probability, finan...",
      lang: "JavaScript",
      langColor: "#f1e05a",
      stars: 3,
    },
    {
      name: "Aerosync",
      href: "https://github.com/thatvivekhingu/Aerosync",
      desc: "Drone se zameen ki photo lo, AI usse 'yeh ghar hai, yeh sadak hai, yeh talab hai' bol ke seedha legal land-record bana deta hai. Basically Google Maps + Land Registry ka bacha, jo SVAMITVA scheme k...",
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
      desc: "BharatBhasha AI — Next-gen Indic vernacular AI assistant powered by Groq LLaMA 3.3 70B, real-time Speech-to-Text, Voice Call mode, and zero-hallucination prompt guardrails for 12+ Indian languages.",
      lang: "HTML",
      langColor: "#e34c26",
      stars: 1,
    },
  ];

  // 6 Machine Learning Reel Episodes
  const mlEpisodes = [
    { ep: "8", title: "RANDOM FOREST", color: "from-emerald-950/80 to-zinc-950", border: "border-emerald-500/30", tag: "EPISODE 8" },
    { ep: "7", title: "K-MEANS CLUSTERING", color: "from-amber-950/80 to-zinc-950", border: "border-amber-500/30", tag: "EPISODE 7" },
    { ep: "6", title: "SUPPORT VECTOR MACHINE", color: "from-lime-950/80 to-zinc-950", border: "border-lime-500/30", tag: "EPISODE 6" },
    { ep: "5", title: "KNN", color: "from-purple-950/80 to-zinc-950", border: "border-purple-500/30", tag: "EPISODE 5" },
    { ep: "4", title: "NAIVE BAYES", color: "from-cyan-950/80 to-zinc-950", border: "border-cyan-500/30", tag: "EPISODE 4" },
    { ep: "3", title: "DECISION TREE", color: "from-blue-950/80 to-zinc-950", border: "border-blue-500/30", tag: "EPISODE 3" },
  ];

  // Git Heatmap Rows (7 days x 28 weeks)
  const heatmapWeeks = Array.from({ length: 28 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      // Deterministic pattern matching the screenshot's dense matrix
      const val = (w * 3 + d * 7 + (w % 4) * 5) % 5;
      return val === 0 ? 0 : val === 1 ? 1 : val === 2 ? 2 : val === 3 ? 3 : 4;
    })
  );

  return (
    <div className={`w-full max-w-7xl mx-auto p-2 sm:p-4 font-sans text-zinc-100 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">

        {/* =========================================================================
            COLUMN 1 (Left, 3.8/12 cols): FULL INSTAGRAM CREATOR & REELS HUB
            ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-[24px] bg-[#0c1015]/95 border border-zinc-800/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            
            {/* Top Profile Section */}
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              {/* Glowing Story Ring Avatar */}
              <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 shadow-[0_0_25px_rgba(244,63,94,0.35)]">
                <div className="p-[2.5px] bg-[#0c1015] rounded-full">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden bg-zinc-900">
                    <Image
                      src="/avatars/vivek.jpg"
                      alt="realvivek.py"
                      fill
                      className="object-cover"
                      sizes="112px"
                      priority
                    />
                  </div>
                </div>
                {/* Audio/Status Badge */}
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-black/90 border border-zinc-700 flex items-center justify-center text-[10px] text-pink-400">
                  ⚡
                </div>
              </div>

              {/* Username & Verification */}
              <div>
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">realvivek.py</h3>
                  <IconCircleCheckFilled className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-xs text-zinc-400 font-medium">Pythonic Engineer</p>
              </div>

              {/* Bio bullet points */}
              <div className="text-left w-full space-y-1 text-xs text-zinc-300 font-normal px-2 pt-1">
                <div className="flex items-center gap-2">
                  <span>🧠</span>
                  <span>Powered by curiosity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎬</span>
                  <span>Creating AI Ads & Brand Videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🤖</span>
                  <span>AI Generated Content Creator</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>Real-life ML • Simple • Impactful</span>
                </div>
              </div>

              {/* Edit Profile & View Archive Buttons */}
              <div className="grid grid-cols-2 gap-2 w-full pt-2">
                <a
                  href="https://instagram.com/realvivek.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 text-white font-bold text-xs shadow-md text-center hover:opacity-95 transition-opacity"
                >
                  Edit Profile
                </a>
                <a
                  href="https://instagram.com/realvivek.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-xs text-center hover:bg-zinc-800 transition-colors"
                >
                  View Archive
                </a>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 w-full py-3 border-y border-zinc-800/80 text-center">
                <div>
                  <span className="block font-bold text-sm text-white">10</span>
                  <span className="text-[11px] text-zinc-400">Posts</span>
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">213</span>
                  <span className="text-[11px] text-zinc-400">Followers</span>
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">11</span>
                  <span className="text-[11px] text-zinc-400">Following</span>
                </div>
              </div>

              {/* Story Highlights */}
              <div className="grid grid-cols-4 gap-2 w-full py-1 text-center">
                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                  <div className="w-11 h-11 rounded-full border border-dashed border-zinc-700 bg-zinc-900 flex items-center justify-center text-zinc-400 group-hover:border-zinc-500">
                    <IconPlus className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">New</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                  <div className="w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/90 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <IconSparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">AI Ads</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                  <div className="w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/90 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                    <IconCode className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">ML Projects</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer group">
                  <div className="w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/90 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                    <IconPlayerPlayFilled className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-medium">All Reels</span>
                </div>
              </div>

              {/* 6 Episode ML Reels Grid (2 cols x 3 rows) */}
              <div className="grid grid-cols-3 gap-2 w-full pt-2">
                {mlEpisodes.map((item, idx) => (
                  <a
                    key={idx}
                    href="https://instagram.com/realvivek.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative aspect-[9/13] rounded-xl overflow-hidden bg-gradient-to-b ${item.color} border ${item.border} p-2 flex flex-col justify-between shadow-md transition-all hover:scale-105 hover:shadow-lg`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[7.5px] font-black uppercase tracking-wider px-1 py-0.5 rounded bg-black/70 text-amber-400">
                        {item.tag}
                      </span>
                      <IconPlayerPlayFilled className="w-2.5 h-2.5 text-zinc-400 group-hover:text-white" />
                    </div>

                    <div className="relative w-full aspect-square rounded-md overflow-hidden bg-zinc-900 my-auto">
                      <Image
                        src="/avatars/vivek.jpg"
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="80px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="text-center leading-none">
                      <span className="text-[8px] font-black text-white tracking-tight uppercase line-clamp-2">
                        {item.title}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Instagram Footer Link */}
              <div className="pt-2 w-full text-center">
                <a
                  href="https://instagram.com/realvivek.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <IconBrandInstagram className="w-4 h-4" />
                  <span>View more on Instagram</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* =========================================================================
            COLUMN 2 (Center, 4.5/12 cols): PINNED REPOSITORIES & CONTRIBUTION HEATMAP
            ========================================================================= */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Top Card: 6 Pinned Repositories Grid */}
          <div className="rounded-[24px] bg-[#0c1015]/95 border border-zinc-800/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
              <h3 className="text-sm font-bold text-white tracking-tight">Pinned</h3>
              <a
                href="https://github.com/thatvivekhingu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline"
              >
                Customize your pins
              </a>
            </div>

            {/* 6 Pinned Repos Grid (2 cols x 3 rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pinnedRepos.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between gap-2 text-left"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <IconBrandGithub className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="text-xs font-bold text-blue-400 group-hover:underline truncate">
                          {repo.name}
                        </span>
                      </div>
                      <span className="text-[9px] font-medium px-1.5 py-0.2 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 shrink-0">
                        Public
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-3">
                      {repo.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono pt-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span>{repo.lang}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-0.5">
                        <IconStar className="w-3 h-3 text-zinc-400" />
                        {repo.stars}
                      </span>
                      {repo.forks && (
                        <span className="flex items-center gap-0.5">
                          <IconGitFork className="w-3 h-3 text-zinc-400" />
                          {repo.forks}
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Card: 562 Contributions in the Last Year */}
          <div className="rounded-[24px] bg-[#0c1015]/95 border border-zinc-800/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                562 contributions in the last year
              </h3>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                <span>2026</span>
                <IconChevronDown className="w-3 h-3 text-zinc-400" />
              </div>
            </div>

            {/* Heatmap & Total Circle */}
            <div className="flex items-center gap-3">
              {/* Heatmap Matrix Grid */}
              <div className="flex-1 space-y-1 overflow-x-auto py-1">
                <div className="flex justify-between text-[9px] font-mono text-zinc-500 px-0.5">
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                  <span>Jan</span>
                </div>

                <div className="flex gap-1">
                  <div className="flex flex-col justify-between text-[8px] font-mono text-zinc-500 pr-1 leading-none py-0.5">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>
                  <div className="flex gap-1 flex-1">
                    {heatmapWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1 flex-1">
                        {week.map((level, dIdx) => (
                          <div
                            key={dIdx}
                            className={`w-full aspect-square rounded-[2px] transition-colors ${
                              level === 0
                                ? "bg-zinc-900"
                                : level === 1
                                ? "bg-emerald-950"
                                : level === 2
                                ? "bg-emerald-800"
                                : level === 3
                                ? "bg-emerald-600"
                                : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
                            }`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-1">
                  <span>Contribution settings</span>
                  <div className="flex items-center gap-1">
                    <span>Less</span>
                    <span className="w-2 h-2 rounded-[2px] bg-zinc-900" />
                    <span className="w-2 h-2 rounded-[2px] bg-emerald-950" />
                    <span className="w-2 h-2 rounded-[2px] bg-emerald-700" />
                    <span className="w-2 h-2 rounded-[2px] bg-emerald-400" />
                    <span>More</span>
                  </div>
                </div>
              </div>

              {/* Total Score Cyan/Green Glow Circle */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full border-2 border-emerald-400/80 shadow-[0_0_25px_rgba(52,211,153,0.35)] flex flex-col items-center justify-center bg-emerald-950/20">
                <span className="text-base sm:text-lg font-black text-emerald-300 leading-none">562</span>
                <span className="text-[9px] font-mono text-emerald-400/80 uppercase">Total</span>
              </div>
            </div>

            {/* Footer View on GitHub Link */}
            <div className="text-right pt-1 border-t border-zinc-900">
              <a
                href="https://github.com/thatvivekhingu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                <span>View on GitHub</span>
                <IconArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* =========================================================================
            COLUMN 3 (Right, 3.7/12 cols): LINKEDIN POST, COMPACT IG & TECH STACK
            ========================================================================= */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* 1. LinkedIn Post Card */}
          <div className="rounded-[24px] bg-[#0c1015]/95 border border-zinc-800/80 p-4 shadow-2xl backdrop-blur-xl space-y-2.5">
            {/* Top platform bar */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#0a66c2] text-white flex items-center justify-center font-bold text-xs">
                  in
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">Vivek Hingu</span>
                    <IconCircleCheckFilled className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="block text-[9px] text-zinc-400 leading-none">
                    GDG Cloud Gandhinagar
                  </span>
                </div>
              </div>
              <a
                href="https://linkedin.com/in/vivekhingu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-400 hover:underline inline-flex items-center"
              >
                LinkedIn ↗
              </a>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 shrink-0">
                <Image
                  src="/avatars/vivek.jpg"
                  alt="Vivek Hingu"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white truncate block">
                  Vivek Hingu <span className="text-zinc-500 font-normal">• You</span>
                </span>
                <span className="text-[10px] text-zinc-400 truncate block leading-tight">
                  AI/ML Engineer | Final Year IT Student | ...
                </span>
                <span className="text-[9px] text-zinc-500 block leading-tight">
                  4w • Edited • 🌐
                </span>
              </div>
            </div>

            {/* Post text */}
            <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
              Spent the day at Build with Antigravity: Final Edition by{" "}
              <span className="text-blue-400 font-medium">GDG Cloud Gandhinagar</span> ... more
            </p>

            {/* Event photo container */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black border border-zinc-800">
              <Image
                src="/social/linkedin-post.png"
                alt="Build with Antigravity GDG"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white">
                1/6
              </div>
            </div>

            {/* Reactions bar */}
            <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 border-t border-zinc-900">
              <div className="flex items-center gap-1">
                <span>👏 ❤️ 💡</span>
                <span>Panchal Vishal and 131 others</span>
              </div>
              <span>4 comments</span>
            </div>
          </div>

          {/* 2. Compact Instagram Card */}
          <div className="rounded-[24px] bg-[#0c1015]/95 border border-zinc-800/80 p-3.5 shadow-2xl backdrop-blur-xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 flex items-center justify-center text-white">
                  <IconBrandInstagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white">@realvivek.py</span>
                  <span className="block text-[9px] text-zinc-400">Pythonic Engineer • ML Series</span>
                </div>
              </div>
              <a
                href="https://instagram.com/realvivek.py"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-pink-400 hover:underline"
              >
                Instagram ↗
              </a>
            </div>

            {/* Mini avatar & stats strip */}
            <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-pink-500/50 bg-zinc-800 shrink-0">
                  <Image
                    src="/avatars/vivek.jpg"
                    alt="realvivek.py"
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-white block">realvivek.py ⌵</span>
                  <div className="flex items-center gap-2 text-[9px] text-zinc-400">
                    <span>10 posts</span>
                    <span>213 followers</span>
                    <span>11 following</span>
                  </div>
                </div>
              </div>
              <span className="text-base text-zinc-500">@</span>
            </div>
          </div>

          {/* 3. Tech Stack Distribution & Actions Card */}
          <div className="rounded-[24px] bg-[#0c1015]/95 border border-zinc-800/80 p-4 shadow-2xl backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white">Tech Stack Distribution</h4>
              <span className="text-[10px] font-mono font-bold text-emerald-400">100% Active</span>
            </div>

            {/* Gradient progress bar */}
            <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden flex">
              <div className="h-full w-[45%] bg-gradient-to-r from-blue-500 to-indigo-500" />
              <div className="h-full w-[30%] bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
              <div className="h-full w-[25%] bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5">
              {["#ai-ml", "#python", "#web-dev", "#data-science", "#apis"].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View Repo link */}
            <div className="pt-1">
              <a
                href="https://github.com/thatvivekhingu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View repository on GitHub</span>
                <span>➔</span>
              </a>
            </div>

            {/* Action buttons: Star, Fork, Clone */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                onClick={handleToggleStar}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  starred
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300"
                }`}
              >
                <IconStar className="w-3.5 h-3.5" />
                <span>Star {starCount}</span>
              </button>

              <a
                href="https://github.com/thatvivekhingu/thatvivekhingu-PFL/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <IconGitFork className="w-3.5 h-3.5" />
                <span>Fork 5</span>
              </a>

              <button
                onClick={handleCopyClone}
                className="py-1.5 px-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <IconCopy className="w-3.5 h-3.5" />
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
