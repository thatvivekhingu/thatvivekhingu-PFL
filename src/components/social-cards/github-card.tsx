"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandGithub,
  IconStar,
  IconStarFilled,
  IconGitFork,
  IconEye,
  IconHeart,
  IconHeartFilled,
  IconCopy,
  IconCheck,
  IconGitBranch,
  IconCode,
  IconTerminal2,
  IconFlame,
  IconSparkles,
} from "@tabler/icons-react";

export interface GitHubCardProps {
  repoName?: string;
  owner?: string;
  avatarUrl?: string;
  repoUrl?: string;
  profileUrl?: string;
  description?: string;
  mediaImage?: string;
  starsCount?: number;
  forksCount?: number;
  watchersCount?: number;
  primaryLanguage?: string;
  languageColor?: string;
  languages?: { name: string; percentage: number; color: string }[];
  tags?: string[];
  latestRelease?: string;
  aspectRatio?: "9/16" | "4/5" | "1/1";
  className?: string;
}

export const GitHubCard: React.FC<GitHubCardProps> = ({
  repoName = "Bharat-Bhasha-Ai-2.0",
  owner = "thatvivekhingu",
  avatarUrl = "/avatars/vivek.jpg",
  repoUrl = "https://github.com/thatvivekhingu/Bharat-Bhasha-Ai-2.0",
  profileUrl = "https://github.com/thatvivekhingu",
  description = "Multilingual Voice & Text AI Operating System powered by Grok API & Real-time NLP pipelines.",
  mediaImage = "/social/github-profile.png",
  starsCount = 148,
  forksCount = 34,
  watchersCount = 52,
  primaryLanguage = "Python",
  languageColor = "#3572A5",
  languages = [
    { name: "Python", percentage: 54, color: "#3572A5" },
    { name: "TypeScript", percentage: 28, color: "#3178c6" },
    { name: "CSS", percentage: 12, color: "#563d7c" },
    { name: "Other", percentage: 6, color: "#ededed" },
  ],
  tags = ["machine-learning", "voice-ai", "grok-api", "nlp", "gujarati"],
  latestRelease = "v2.1.0",
  aspectRatio = "9/16",
  className = "",
}) => {
  const [isStarred, setIsStarred] = useState(false);
  const [stars, setStars] = useState(starsCount);
  const [isCopied, setIsCopied] = useState(false);
  const [showStarOverlay, setShowStarOverlay] = useState(false);
  const [forks, setForks] = useState(forksCount);

  const handleToggleStar = () => {
    if (isStarred) {
      setStars((prev) => prev - 1);
      setIsStarred(false);
    } else {
      setStars((prev) => prev + 1);
      setIsStarred(true);
    }
  };

  const handleDoubleTap = () => {
    if (!isStarred) {
      setStars((prev) => prev + 1);
      setIsStarred(true);
    }
    setShowStarOverlay(true);
    setTimeout(() => setShowStarOverlay(false), 900);
  };

  const handleCopyClone = () => {
    navigator.clipboard.writeText(`git clone ${repoUrl}.git`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className={`w-full max-w-[360px] mx-auto bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden font-sans transition-all duration-300 hover:shadow-2xl ${className}`}
    >
      {/* 1. Header */}
      <div className="p-3.5 border-b border-zinc-100 dark:border-zinc-900/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2">
          {/* Repo / Author info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-900 relative">
                <Image
                  src={avatarUrl}
                  alt={owner}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-zinc-900 text-white rounded-full flex items-center justify-center p-0.5 border border-zinc-700">
                <IconBrandGithub className="w-full h-full" />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 leading-tight">
                <Link
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 hover:underline truncate"
                >
                  <span className="text-zinc-500 dark:text-zinc-400 font-normal">{owner}/</span>
                  {repoName}
                </Link>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
                  Public
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: languageColor }}
                  />
                  {primaryLanguage}
                </span>
              </div>
            </div>
          </div>

          {/* Star Button */}
          <button
            onClick={handleToggleStar}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              isStarred
                ? "bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold"
                : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
            }`}
          >
            {isStarred ? (
              <IconStarFilled className="w-3.5 h-3.5" />
            ) : (
              <IconStar className="w-3.5 h-3.5" />
            )}
            <span>{isStarred ? "Starred" : "Star"}</span>
          </button>
        </div>

        {/* Short description */}
        {description && (
          <p className="mt-2.5 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* 2. Media Container (9:16 Aspect Ratio) */}
      <div
        className="relative w-full aspect-[9/16] bg-zinc-950 select-none overflow-hidden cursor-pointer group"
        onDoubleClick={handleDoubleTap}
      >
        <Image
          src={mediaImage}
          alt={repoName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 360px"
          priority
        />

        {/* Top Dark Overlay Grid / Release badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium bg-zinc-950/80 text-emerald-400 backdrop-blur-md px-2.5 py-1 rounded-md border border-emerald-500/30 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {latestRelease}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-zinc-950/80 text-zinc-200 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-md">
            <IconGitBranch className="w-3 h-3 text-purple-400" />
            main
          </span>
        </div>

        {/* Bottom Interactive Tech / Stats Card Overlay inside 9:16 frame */}
        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 text-white space-y-2 pointer-events-auto">
          {/* Language Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>Stack Distribution</span>
              <span className="text-emerald-400">100% Active</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
          </div>

          {/* Tags Chips */}
          <div className="flex flex-wrap gap-1 pt-1">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Double-Tap Star Animation */}
        <AnimatePresence>
          {showStarOverlay && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -30 }}
              animate={{ scale: 1.25, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 15 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="w-24 h-24 rounded-2xl bg-amber-500/90 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.7)] backdrop-blur-sm">
                <IconStarFilled className="w-14 h-14 text-zinc-950" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Footer */}
      <div className="p-3.5 space-y-2.5 bg-white dark:bg-zinc-950">
        {/* Link: View repo on GitHub */}
        <div>
          <Link
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View repository on GitHub
          </Link>
        </div>

        {/* Metrics Counter Bar */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-zinc-800 dark:text-zinc-200 font-semibold">
              <IconStarFilled className="w-3.5 h-3.5 text-amber-500" />
              {stars.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <IconGitFork className="w-3.5 h-3.5 text-blue-500" />
              {forks}
            </span>
            <span className="flex items-center gap-1">
              <IconEye className="w-3.5 h-3.5 text-zinc-400" />
              {watchersCount}
            </span>
          </div>

          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            MIT Licensed
          </span>
        </div>

        {/* Thin separator */}
        <div className="border-t border-zinc-100 dark:border-zinc-800/80 my-1" />

        {/* Developer Action Bar */}
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          {/* Star Button */}
          <button
            onClick={handleToggleStar}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
              isStarred
                ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/50"
                : "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            {isStarred ? (
              <IconStarFilled className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <IconStar className="w-3.5 h-3.5" />
            )}
            <span>Star</span>
          </button>

          {/* Fork Button */}
          <Link
            href={`${repoUrl}/fork`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setForks((f) => f + 1)}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors active:scale-95"
          >
            <IconGitFork className="w-3.5 h-3.5" />
            <span>Fork</span>
          </Link>

          {/* Clone Copy Button */}
          <button
            onClick={handleCopyClone}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors active:scale-95"
            title="Copy git clone command"
          >
            {isCopied ? (
              <>
                <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <IconCopy className="w-3.5 h-3.5" />
                <span>Clone</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom prompt with GitHub logo */}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-400 font-mono text-[11px]">
          <span className="truncate">git clone {owner}/{repoName}</span>
          <Link
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex-shrink-0"
            aria-label="GitHub"
          >
            <IconBrandGithub className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
