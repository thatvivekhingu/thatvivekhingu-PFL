"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { playTapSound } from "@/lib/sound";

interface SectionMarker {
  id: string;
  code: string;
  label: string;
}

const SECTIONS: SectionMarker[] = [
  { id: "hero", code: "01", label: "HERO // CORE" },
  { id: "dashboard", code: "02", label: "INTEL // HUD" },
  { id: "vian-assistant", code: "03", label: "VIAN // AGENT" },
  { id: "experience", code: "04", label: "TIMELINE // XP" },
  { id: "projects", code: "05", label: "BUILDS // CODE" },
  { id: "achievements", code: "06", label: "RECEIPTS // WINS" },
  { id: "earth", code: "07", label: "EARTH // ORBIT" },
];

export function ReadingRail() {
  const [activeId, setActiveId] = useState<string>("hero");
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    playTapSound("pop");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Section Navigation Rail"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-end gap-3.5 select-none pointer-events-auto"
    >
      {/* Background HUD Vertical Guide Track */}
      <div className="absolute right-[5px] top-0 bottom-0 w-[2px] bg-slate-800/40 dark:bg-zinc-800/60 rounded-full overflow-hidden">
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="w-full h-full bg-gradient-to-b from-cyan-400 via-sky-300 to-indigo-500"
        />
      </div>

      {/* Chapter Markers */}
      {SECTIONS.map((sec) => {
        const isActive = activeId === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group relative flex items-center gap-2.5 py-1 text-right cursor-pointer"
            title={sec.label}
          >
            {/* Hover Tooltip Label */}
            <span
              className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-200 px-2 py-0.5 rounded backdrop-blur-md border ${
                isActive
                  ? "text-cyan-300 bg-cyan-950/80 border-cyan-500/50 opacity-100 translate-x-0 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                  : "text-zinc-400 dark:text-zinc-500 bg-zinc-900/60 border-zinc-800/60 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
              }`}
            >
              {sec.label}
            </span>

            {/* Glowing Indicator Dot / Diamond */}
            <div className="relative flex items-center justify-center w-3 h-3 z-10">
              {isActive && (
                <span className="absolute w-5 h-5 rounded-full bg-cyan-400/20 animate-ping" />
              )}
              <div
                className={`transition-all duration-300 rounded-sm rotate-45 ${
                  isActive
                    ? "w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee] scale-110"
                    : "w-1.5 h-1.5 bg-zinc-600 group-hover:bg-cyan-400/70 group-hover:scale-125"
                }`}
              />
            </div>
          </button>
        );
      })}
    </aside>
  );
}
