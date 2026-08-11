"use client";

import React, { useState, useCallback } from "react";
import { IconMoonStars, IconSun, IconX, IconSparkles } from "@tabler/icons-react";
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

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    playTapSound("chime");
    setIsToggling(true);
    setTimeout(() => setIsToggling(false), 500);

    const meme = getRandomMeme();
    setActiveMeme(meme);
  };

  const handleCloseModal = () => {
    playTapSound("pop");
    setActiveMeme(null);
  };

  return (
    <>
      <div className="flex relative items-center mr-1 sm:mr-4">
        {/* Sun Icon Button (Triggers Easter Egg Modal, No Theme Change) */}
        <button
          type="button"
          onClick={handleToggleClick}
          aria-label="Light Mode Easter Egg"
          title="Light Mode (Click for a surprise!)"
          className="relative inline-flex items-center justify-center p-1 cursor-pointer focus:outline-none group"
        >
          <IconSun
            className={`h-5 w-5 text-amber-500 hover:text-amber-400 transition-all duration-300 hover:scale-125 ${
              isToggling ? "animate-spin-grow" : ""
            }`}
          />
          <IconMoonStars
            className="hidden h-5 w-5 text-indigo-400"
          />
        </button>
      </div>

      {/* Easter Egg Playful Meme Modal Popup */}
      <AnimatePresence>
        {activeMeme && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            />

            {/* Meme Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 22, stiffness: 320 }}
              className="relative z-10 flex flex-col items-center text-center max-w-sm w-full rounded-2xl border border-amber-500/40 bg-zinc-950/95 p-6 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-zinc-100 backdrop-blur-xl select-none"
            >
              {/* Close 'X' Button Top Right */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-3.5 right-3.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
              >
                <IconX className="h-4 w-4" />
              </button>

              {/* Badge Header */}
              <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-mono font-bold text-amber-400 tracking-wider uppercase shadow-sm">
                <IconSparkles className="h-3.5 w-3.5 text-amber-400 animate-spin-grow" />
                <span>EASTER EGG UNLOCKED</span>
              </div>

              {/* Meme Quote Body */}
              <p className="text-sm sm:text-base font-semibold leading-relaxed text-zinc-100 my-2 px-1">
                {activeMeme}
              </p>

              {/* Action Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="mt-4 w-full rounded-xl border border-amber-500/50 bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-zinc-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer active:scale-95"
              >
                Got It 😂
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}