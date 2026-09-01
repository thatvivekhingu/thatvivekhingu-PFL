"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle2,
  IconSend,
  IconBookmark,
  IconBookmarkFilled,
  IconBrandInstagram,
  IconMapPin,
  IconMusic,
  IconCircleCheckFilled,
} from "@tabler/icons-react";

export interface InstagramCardProps {
  username?: string;
  userHandle?: string;
  collaborator?: string;
  avatarUrl?: string;
  followersCount?: string;
  profileUrl?: string;
  postUrl?: string;
  mediaImage?: string;
  location?: string;
  audioTrack?: string;
  likesCount?: number;
  commentsCount?: number;
  caption?: string;
  eventDate?: string;
  eventTitle?: string;
  aspectRatio?: "9/16" | "4/5" | "1/1";
  className?: string;
}

export const InstagramCard: React.FC<InstagramCardProps> = ({
  username = "realvivek.py",
  userHandle = "realvivek.py",
  collaborator,
  avatarUrl = "/avatars/vivek.jpg",
  followersCount = "4,651 followers",
  profileUrl = "https://instagram.com/realvivek.py",
  postUrl = "https://instagram.com/realvivek.py",
  mediaImage = "/social/instagram-profile.png",
  location = "DAU (DA-IICT), Gandhinagar",
  audioTrack,
  likesCount = 710,
  commentsCount = 42,
  caption = "Building next-gen AI systems & exploring multilingual intelligence 🚀✨ #AI #Tech #Innovation",
  eventDate,
  eventTitle,
  aspectRatio = "9/16",
  className = "",
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(likesCount);
  const [commentText, setCommentText] = useState("");
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);

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
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 900);
  };

  const aspectClass =
    aspectRatio === "9/16"
      ? "aspect-[9/16]"
      : aspectRatio === "4/5"
      ? "aspect-[4/5]"
      : "aspect-square";

  return (
    <div
      className={`w-full max-w-[360px] mx-auto bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden font-sans transition-all duration-300 hover:shadow-2xl ${className}`}
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-zinc-100 dark:border-zinc-900/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Story Ring Avatar */}
          <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 flex-shrink-0 cursor-pointer">
            <div className="p-[1.5px] bg-white dark:bg-zinc-950 rounded-full">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={avatarUrl}
                  alt={username}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 leading-tight">
              <Link
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 hover:underline truncate"
              >
                {userHandle}
              </Link>
              {collaborator && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  and{" "}
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {collaborator}
                  </span>
                </span>
              )}
              <IconCircleCheckFilled className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
            </div>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
              {followersCount}
            </span>
          </div>
        </div>

        {/* View Profile Button */}
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0095f6] hover:bg-[#1877f2] active:scale-95 transition-all text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-sm flex-shrink-0 ml-2"
        >
          View profile
        </Link>
      </div>

      {/* 2. Media Container (9:16 Aspect Ratio) */}
      <div
        className={`relative w-full ${aspectClass} bg-zinc-950 select-none overflow-hidden cursor-pointer group`}
        onDoubleClick={handleDoubleTap}
      >
        <Image
          src={mediaImage}
          alt={eventTitle || caption || "Instagram Post"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 360px"
          priority
        />

        {/* Top Badges / Location Overlay */}
        {(location || audioTrack) && (
          <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none z-10">
            {location && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-black/60 text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                <IconMapPin className="w-3 h-3 text-rose-400" />
                {location}
              </span>
            )}
            {audioTrack && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-black/60 text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                <IconMusic className="w-3 h-3 text-emerald-400 animate-pulse" />
                {audioTrack}
              </span>
            )}
          </div>
        )}

        {/* Event Title or Date Overlay if provided */}
        {(eventTitle || eventDate) && (
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
            {eventDate && (
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                {eventDate}
              </span>
            )}
            {eventTitle && (
              <h4 className="text-sm font-bold leading-tight mt-0.5">
                {eventTitle}
              </h4>
            )}
          </div>
        )}

        {/* Double-Tap Heart Animation */}
        <AnimatePresence>
          {showHeartOverlay && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 15 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="relative">
                <IconHeartFilled className="w-24 h-24 text-rose-500 drop-shadow-[0_10px_25px_rgba(244,63,94,0.6)]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Footer */}
      <div className="p-3.5 space-y-2.5 bg-white dark:bg-zinc-950">
        {/* Link: View more on Instagram */}
        <div>
          <Link
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#0095f6] hover:underline"
          >
            View more on Instagram
          </Link>
        </div>

        {/* Thin separator */}
        <div className="border-t border-zinc-100 dark:border-zinc-800/80 my-1" />

        {/* Interaction Action Icons */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-4">
            {/* Heart / Like Button */}
            <button
              onClick={handleToggleLike}
              className="group focus:outline-none transition-transform active:scale-125 cursor-pointer"
              aria-label="Like post"
            >
              {isLiked ? (
                <IconHeartFilled className="w-6 h-6 text-rose-500 transition-colors" />
              ) : (
                <IconHeart className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-rose-500 transition-colors" />
              )}
            </button>

            {/* Comment Button */}
            <button
              className="group focus:outline-none transition-transform active:scale-110 cursor-pointer"
              aria-label="Comment"
            >
              <IconMessageCircle2 className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500 transition-colors" />
            </button>

            {/* Share / Direct Message */}
            <Link
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group focus:outline-none transition-transform active:scale-110"
              aria-label="Share post"
            >
              <IconSend className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-500 -rotate-12 transition-colors" />
            </Link>
          </div>

          {/* Bookmark / Save */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="group focus:outline-none transition-transform active:scale-110 cursor-pointer"
            aria-label="Save post"
          >
            {isSaved ? (
              <IconBookmarkFilled className="w-6 h-6 text-amber-500 transition-colors" />
            ) : (
              <IconBookmark className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-amber-500 transition-colors" />
            )}
          </button>
        </div>

        {/* Likes Count */}
        <div className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
          {likes.toLocaleString()} likes
        </div>

        {/* Caption */}
        {caption && (
          <p className="text-xs text-zinc-800 dark:text-zinc-200 line-clamp-2 leading-relaxed">
            <span className="font-bold mr-1.5">{userHandle}</span>
            {caption}
          </p>
        )}

        {/* Comments Count Link */}
        {commentsCount > 0 && (
          <Link
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[11px] text-zinc-500 dark:text-zinc-400 hover:underline"
          >
            View all {commentsCount} comments
          </Link>
        )}

        {/* Add Comment Bar with Instagram Logo */}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-900 text-xs text-zinc-400">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full bg-transparent border-none text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none pr-2"
          />
          <Link
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors flex-shrink-0"
            aria-label="Instagram"
          >
            <IconBrandInstagram className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
