"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandLinkedin,
  IconThumbUp,
  IconThumbUpFilled,
  IconMessageCircle,
  IconRepeat,
  IconSend,
  IconPlus,
  IconCheck,
  IconDots,
  IconWorld,
  IconSparkles,
  IconAward,
} from "@tabler/icons-react";

export interface LinkedInCardProps {
  name?: string;
  headline?: string;
  avatarUrl?: string;
  profileUrl?: string;
  postUrl?: string;
  timeAgo?: string;
  connectionsCount?: string;
  postContent?: string;
  mediaImage?: string;
  badgeText?: string;
  reactionsCount?: number;
  commentsCount?: number;
  repostsCount?: number;
  isFollowing?: boolean;
  aspectRatio?: "9/16" | "4/5" | "1/1";
  className?: string;
}

export const LinkedInCard: React.FC<LinkedInCardProps> = ({
  name = "Vivek Hingu",
  headline = "AI & Machine Learning Engineer | Building BharatBhasha AI",
  avatarUrl = "/avatars/vivek.jpg",
  profileUrl = "https://linkedin.com/in/vivekhingu",
  postUrl = "https://linkedin.com/in/vivekhingu",
  timeAgo = "3d • Edited",
  connectionsCount = "500+ connections",
  postContent = "Excited to share our latest milestone in Generative AI and Multilingual NLP! 🚀 Overcoming latency challenges with streaming responses and local language tokenization.",
  mediaImage = "/social/linkedin-post.png",
  badgeText = "🏆 2nd Prize Winner — Flinders AI Competition",
  reactionsCount = 842,
  commentsCount = 48,
  repostsCount = 19,
  isFollowing: initialFollowing = false,
  aspectRatio = "9/16",
  className = "",
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(reactionsCount);
  const [following, setFollowing] = useState(initialFollowing);
  const [thoughtText, setThoughtText] = useState("");
  const [showCelebrateOverlay, setShowCelebrateOverlay] = useState(false);

  const handleToggleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
    setShowCelebrateOverlay(true);
    setTimeout(() => setShowCelebrateOverlay(false), 900);
  };

  return (
    <div
      className={`w-full max-w-[360px] mx-auto bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden font-sans transition-all duration-300 hover:shadow-2xl ${className}`}
    >
      {/* 1. Header */}
      <div className="p-3.5 border-b border-zinc-100 dark:border-zinc-900/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-2">
          {/* Author info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 relative">
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              {/* Online status or LinkedIn badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#0a66c2] text-white rounded-full flex items-center justify-center p-0.5 border-2 border-white dark:border-zinc-950">
                <IconBrandLinkedin className="w-full h-full" />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 leading-tight">
                <Link
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:underline hover:text-[#0a66c2] truncate"
                >
                  {name}
                </Link>
                <span className="text-[10px] text-zinc-400 font-medium">• 1st</span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate leading-tight mt-0.5">
                {headline}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                <span>{timeAgo}</span>
                <span>•</span>
                <IconWorld className="w-3 h-3 text-zinc-400 inline" />
              </div>
            </div>
          </div>

          {/* Follow / Connect Button */}
          <button
            onClick={() => setFollowing(!following)}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 shadow-sm active:scale-95 ${
              following
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700"
                : "bg-[#0a66c2] hover:bg-[#004182] text-white"
            }`}
          >
            {following ? (
              <>
                <IconCheck className="w-3.5 h-3.5" />
                <span>Following</span>
              </>
            ) : (
              <>
                <IconPlus className="w-3.5 h-3.5" />
                <span>Follow</span>
              </>
            )}
          </button>
        </div>

        {/* Post text snippet */}
        {postContent && (
          <p className="mt-2.5 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed line-clamp-2">
            {postContent}
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
          alt={badgeText || "LinkedIn Post Media"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 360px"
          priority
        />

        {/* Badge Overlay */}
        {badgeText && (
          <div className="absolute top-3 left-3 right-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-black/70 text-white backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 shadow-md">
              <IconAward className="w-3.5 h-3.5 text-amber-400" />
              <span className="truncate">{badgeText}</span>
            </span>
          </div>
        )}

        {/* Celebrate / Like animation on double click */}
        <AnimatePresence>
          {showCelebrateOverlay && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 15 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="w-20 h-20 rounded-full bg-[#0a66c2]/90 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                <IconThumbUpFilled className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Footer */}
      <div className="p-3.5 space-y-2.5 bg-white dark:bg-zinc-950">
        {/* Link: View more on LinkedIn */}
        <div>
          <Link
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#0a66c2] hover:underline"
          >
            View more on LinkedIn
          </Link>
        </div>

        {/* Reactions Counter Bar */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5">
          <div className="flex items-center gap-1">
            {/* Reaction icons stack */}
            <div className="flex -space-x-1 items-center">
              <span className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center text-[9px] text-white border border-white dark:border-zinc-950 shadow-xs">
                👍
              </span>
              <span className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-[9px] text-white border border-white dark:border-zinc-950 shadow-xs">
                👏
              </span>
              <span className="w-4 h-4 rounded-full bg-rose-600 flex items-center justify-center text-[9px] text-white border border-white dark:border-zinc-950 shadow-xs">
                ❤️
              </span>
              <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[9px] text-white border border-white dark:border-zinc-950 shadow-xs">
                💡
              </span>
            </div>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
              {likes.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>{commentsCount} comments</span>
            <span>•</span>
            <span>{repostsCount} reposts</span>
          </div>
        </div>

        {/* Thin separator */}
        <div className="border-t border-zinc-100 dark:border-zinc-800/80 my-1" />

        {/* Action Buttons: Like, Comment, Repost, Send */}
        <div className="grid grid-cols-4 gap-1 pt-0.5">
          {/* Like */}
          <button
            onClick={handleToggleLike}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
              isLiked
                ? "text-[#0a66c2] bg-blue-50 dark:bg-blue-950/40"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            }`}
          >
            {isLiked ? (
              <IconThumbUpFilled className="w-4 h-4" />
            ) : (
              <IconThumbUp className="w-4 h-4" />
            )}
            <span>Like</span>
          </button>

          {/* Comment */}
          <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors active:scale-95">
            <IconMessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </button>

          {/* Repost */}
          <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors active:scale-95">
            <IconRepeat className="w-4 h-4" />
            <span>Repost</span>
          </button>

          {/* Send */}
          <Link
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors active:scale-95"
          >
            <IconSend className="w-4 h-4 -rotate-12" />
            <span>Send</span>
          </Link>
        </div>

        {/* Add thought bar with LinkedIn Logo */}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-400">
          <input
            type="text"
            placeholder="Share your thoughts..."
            value={thoughtText}
            onChange={(e) => setThoughtText(e.target.value)}
            className="w-full bg-transparent border-none text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none pr-2"
          />
          <Link
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-[#0a66c2] transition-colors flex-shrink-0"
            aria-label="LinkedIn"
          >
            <IconBrandLinkedin className="w-5 h-5 text-[#0a66c2]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
