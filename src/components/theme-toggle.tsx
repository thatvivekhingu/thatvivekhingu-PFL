"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { IconMoonStars, IconSun, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { playTapSound } from "@/lib/sound";

const LIGHT_MODE_MEMES: string[] = [
  "☀️ Light Mode? Bhai meri life mein abhi tak light nahi aayi 😭",
  "☀️ Light Mode dabaya? Itni roshni mein bugs dikh jayenge bhai 💀",
  "☀️ Light Mode unavailable, developer abhi khud dark phase mein hai 😂",
  "☀️ Light Mode? Sorry bhai, ye feature developer ke budget ke bahar hai 😭",
  "☀️ Tumne Light Mode kyun dabaya, kya meri life already bright lag rahi hai 😂",
  "☀️ Light Mode loading… developer motivation ka wait ho raha hai 💀",
  "☀️ Light Mode chahiye? Bhai pehle meri sleep schedule fix karwao 😭",
  "☀️ Light Mode activated, ab bugs bhi clearly dikhne lagenge 😂",
  "☀️ Light Mode? Bold move bhai, ab code ki reality mat dekhna 💀",
  "☀️ Congratulations, tumne portfolio ka sabse suspicious button daba diya 😂",
  "☀️ Light Mode nahi milega, developer ne darkness ko permanent kar diya 💀",
  "☀️ Light Mode? Bhai ye portfolio hai, electricity board nahi 😂",
  "☀️ Tum light dhoond rahe ho, main abhi solution dhoond raha hoon 😭",
  "☀️ Light Mode cancelled, developer ne last minute dark kar diya 💀",
  "☀️ Light Mode? Sorry, developer ka brain already low brightness pe hai 😂",
  "☀️ Roshni chahiye thi? Galat website pe aa gaye bhai 😭",
  "☀️ Light Mode mil sakta tha, par developer ne procrastinate kar diya 💀",
  "☀️ Light Mode requested, developer ne request ko seen pe chhod diya 😂",
  "☀️ Itni curiosity? Bhai internship interview bhi aise hi dena 😭",
  "☀️ Light Mode nahi hai, par confidence unlimited hai 😂",
  "☀️ Tumne button daba diya, ab mujhe pretend karna padega ki ye intentional tha 💀",
  "☀️ Light Mode ka button tha, par developer ne kuch aur hi plan kiya tha 😂",
  "☀️ Warning: Light Mode se developer ki fake productivity expose ho sakti hai 😭",
  "☀️ Light Mode? Nahi bhai, bugs ko andhere mein hi comfortable lagta hai 💀",
  "☀️ Developer ne Light Mode banaya tha, phir khud hi delete kar diya 😂",
  "☀️ Light Mode unavailable, reason: developer ko khud nahi pata 😭",
  "☀️ Tum light ke liye aaye the, bonus mein confusion le jao 💀",
  "☀️ Light Mode ka sapna tha, phir deployment ne aukaat dikha di 😂",
  "☀️ Bhai Light Mode baad mein, pehle ye batao code chal kyun nahi raha 😭",
  "☀️ Light Mode? Ek minute, pehle developer ko apni life ka dark mode samajhne do 💀",
];

export function ModeToggle() {
  const [isToggling, setIsToggling] = useState(false);
  const [activeMeme, setActiveMeme] = useState<string | null>(null);
  const [unusedIndices, setUnusedIndices] = useState<number[]>([]);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Non-repeating randomized cycle engine across all 30 meme lines
  const getRandomMeme = useCallback(() => {
    const pool = unusedIndices.length > 0 ? [...unusedIndices] : Array.from({ length: LIGHT_MODE_MEMES.length }, (_, i) => i);

    // If pool has more than 1 item and contains lastIndex, filter out lastIndex to avoid consecutive repeats
    const validCandidates = (lastIndex !== null && pool.length > 1)
      ? pool.filter((idx) => idx !== lastIndex)
      : pool;

    const chosenIndex = validCandidates[Math.floor(Math.random() * validCandidates.length)];
    const remainingPool = pool.filter((idx) => idx !== chosenIndex);

    setUnusedIndices(remainingPool);
    setLastIndex(chosenIndex);

    return LIGHT_MODE_MEMES[chosenIndex];
  }, [unusedIndices, lastIndex]);

  // Handle Sun button click
  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    playTapSound("chime");
    setIsToggling(true);
    setTimeout(() => setIsToggling(false), 500);

    const meme = getRandomMeme();
    setActiveMeme(meme);

    // Clear existing auto-dismiss timer if any
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }

    // Auto-dismiss after 15 seconds (15000 ms)
    dismissTimerRef.current = setTimeout(() => {
      setActiveMeme(null);
    }, 15000);
  };

  const handleClosePopover = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }
    playTapSound("pop");
    setActiveMeme(null);
  };

  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-flex items-center">
      {/* Sun Icon Button (Triggers Meme Popover, No Theme Change) */}
      <button
        type="button"
        onClick={handleToggleClick}
        aria-label="Light Mode Meme Easter Egg"
        title="Light Mode (Click for a surprise!)"
        className="relative inline-flex items-center justify-center p-1.5 cursor-pointer focus:outline-none group rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
      >
        <IconSun
          className={`h-4.5 w-4.5 text-amber-500 hover:text-amber-400 transition-all duration-300 hover:scale-125 ${
            isToggling ? "animate-spin-grow" : ""
          }`}
        />
        <IconMoonStars
          className="hidden h-4.5 w-4.5 text-indigo-400"
        />
      </button>

      {/* Floating Popover Meme Card right below the Sun button */}
      <AnimatePresence>
        {activeMeme && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-11 right-0 z-[99999] w-72 sm:w-80 rounded-xl border border-amber-500/40 bg-zinc-950/95 p-3.5 shadow-2xl backdrop-blur-xl text-zinc-100 select-none"
          >
            {/* Top Row: Meme Text + Small Close 'X' Button */}
            <div className="flex items-start justify-between gap-2.5">
              <p className="text-xs sm:text-sm font-semibold leading-relaxed text-zinc-100">
                {activeMeme}
              </p>
              <button
                type="button"
                onClick={handleClosePopover}
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                title="Dismiss"
              >
                <IconX className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}