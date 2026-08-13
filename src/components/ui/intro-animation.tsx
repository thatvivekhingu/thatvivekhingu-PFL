"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { playTapSound } from "@/lib/sound";

interface IntroCardItem {
  id: string;
  text?: string;
  title?: string;
  sub?: string;
  isQuestion?: boolean;
  isGranted?: boolean;
}

const INTRO_CARDS: IntroCardItem[] = [
  { id: "q", text: "> Who am I?", isQuestion: true },
  { id: "aiml", title: "AI/ML Engineer", sub: "Autonomous Systems & Neural Models" },
  { id: "creator", title: "Content Creator", sub: "Sharing Tech & AI Knowledge" },
  { id: "hackathon", title: "Hackathon Addict", sub: "Building Intelligent Software Under Pressure" },
  { id: "explorer", title: "Tech Explorer", sub: "Pushing the Frontiers of Innovation" },
  { id: "granted", title: "ACCESS GRANTED.", isGranted: true },
];

const INTRO_STORAGE_KEY = "hasSeenIntro_v26_who_am_i_restored";

// REAL 3D TECH LOGOS DISTRIBUTED ACROSS 3 CONCENTRIC RINGS
const CONCENTRIC_TECH_ITEMS = [
  // Ring 1 (Inner Orbit - 3 items)
  {
    name: "Python",
    ring: 1,
    color: "#3776AB",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <path d="M11.87 2.005c-4.94 0-4.63 2.15-4.63 2.15l.004 2.22h4.72v.66H5.29s-3.2.36-3.2 5.34c0 4.98 2.78 4.81 2.78 4.81l1.66-.002v-2.35c0-2.66 2.3-2.5 2.3-2.5h4.66s2.19.05 2.19-2.12V4.83s.43-2.825-3.96-2.825zm-2.53 1.44a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7z" fill="#3776AB"/>
        <path d="M12.13 21.995c4.94 0 4.63-2.15 4.63-2.15l-.004-2.22h-4.72v-.66h6.674s3.2-.36 3.2-5.34c0-4.98-2.78-4.81-2.78-4.81l-1.66.002v2.35c0 2.66-2.3 2.5-2.3 2.5h-4.66s-2.19-.05-2.19 2.12v4.67s-.43 2.825 3.96 2.825zm2.53-1.44a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7z" fill="#FFD43B"/>
      </svg>
    ),
  },
  {
    name: "PyTorch",
    ring: 1,
    color: "#EE4C2C",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a.75.75 0 0 1 .75.75v1.859l2.846-2.847a.75.75 0 0 1 1.06 1.06L13.81 5.67h2.94a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75V2.75A.75.75 0 0 1 12 2z" fill="#EE4C2C"/>
        <path d="M15.5 8.5a5.5 5.5 0 1 1-7.778 7.778.75.75 0 1 1 1.06-1.06 4 4 0 1 0 5.658-5.658.75.75 0 0 1 1.06-1.06z" fill="#EE4C2C"/>
      </svg>
    ),
  },
  {
    name: "TensorFlow",
    ring: 1,
    color: "#FF6F00",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24">
        <path d="M1.292 5.856L11.54 0v24l-4.148-2.417V12.97l-6.1 3.528V5.856z" fill="#FF6F00"/>
        <path d="M22.708 5.856L12.46 0v24l4.148-2.417V8.583l6.1 3.528V5.856z" fill="#FF9200"/>
      </svg>
    ),
  },

  // Ring 2 (Middle Orbit - 4 items)
  {
    name: "OpenCV",
    ring: 2,
    color: "#00FF00",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="3.5" stroke="#FF3333" strokeWidth="2.2"/>
        <circle cx="7" cy="16" r="3.5" stroke="#33FF33" strokeWidth="2.2"/>
        <circle cx="17" cy="16" r="3.5" stroke="#3388FF" strokeWidth="2.2"/>
      </svg>
    ),
  },
  {
    name: "Scikit-Learn",
    ring: 2,
    color: "#F7931E",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#F7931E"/>
        <path d="M10 7.5v9l6.5-4.5z" fill="#3499CC"/>
      </svg>
    ),
  },
  {
    name: "JavaScript",
    ring: 2,
    color: "#F7DF1E",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
        <path d="M6.75 19.5l1.8-1.08c.45.81.99 1.35 2.07 1.35.9 0 1.44-.45 1.44-1.08 0-.72-.54-1.08-1.8-1.62l-.63-.27c-1.8-.72-2.97-1.62-2.97-3.6 0-2.07 1.62-3.6 4.14-3.6 1.8 0 3.06.72 3.96 2.34l-1.8 1.17c-.45-.72-.99-1.08-1.98-1.08-.9 0-1.44.45-1.44.99 0 .63.45.99 1.62 1.44l.63.27c2.16.9 3.24 1.8 3.24 3.78 0 2.43-1.89 3.78-4.5 3.78-2.34 0-3.96-.99-4.95-2.79zm9.9 0v-9.9h2.52v9.9h-2.52z" fill="#000000"/>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    ring: 2,
    color: "#3178C6",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#3178C6"/>
        <path d="M11.5 10v2.227H9.273V22H6.5V12.227H4.273V10H11.5zm7.363-.25c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-1.077-.47 4.71 4.71 0 0 0-1.305-.183c-.632 0-1.109.13-1.431.391-.322.26-.483.626-.483 1.097 0 .342.09.619.27.831.18.212.428.397.744.555l.89.444c.905.444 1.558.91 1.958 1.398.401.488.601 1.118.601 1.89 0 1.258-.456 2.228-1.368 2.91-.912.682-2.184 1.023-3.816 1.023-.746 0-1.467-.068-2.163-.204a9.77 9.77 0 0 1-1.849-.556v-2.57c.683.392 1.385.69 2.106.895.72.205 1.388.307 2.003.307.696 0 1.218-.135 1.566-.405.348-.27.522-.656.522-1.158 0-.376-.098-.673-.294-.891-.196-.219-.485-.424-.867-.615l-.946-.477c-.856-.43-1.472-.888-1.848-1.373-.376-.485-.564-1.096-.564-1.833 0-1.184.444-2.112 1.332-2.784.888-.672 2.088-1.008 3.6-1.008z" fill="#FFFFFF"/>
      </svg>
    ),
  },

  // Ring 3 (Outer Orbit - 5 items)
  {
    name: "C++",
    ring: 3,
    color: "#00599C",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24">
        <path d="M11.5 2L2 7.5v9L11.5 22l9.5-5.5v-9L11.5 2zm-2.2 13.5c-1.8 0-3.3-1.5-3.3-3.5s1.5-3.5 3.3-3.5c1.1 0 2 .5 2.5 1.3l-1.3.8c-.3-.4-.7-.7-1.2-.7-.9 0-1.7.8-1.7 2s.8 2 1.7 2c.5 0 .9-.3 1.2-.7l1.3.8c-.5.8-1.4 1.5-2.5 1.5zm5.7-2.7h-1v1.3h-1.3v-1.3H11.4v-1.4h1.3V10h1.4v1.3H15v1.4zm3.8 0h-1v1.3h-1.3v-1.3h-1.3v-1.4h1.3V10h1.4v1.3h1.3v1.4z" fill="#00599C"/>
      </svg>
    ),
  },
  {
    name: "React",
    ring: 3,
    color: "#61DAFB",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)"/>
        <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
      </svg>
    ),
  },
  {
    name: "Next.js",
    ring: 3,
    color: "#FFFFFF",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#000000" stroke="#FFFFFF" strokeWidth="1.5"/>
        <path d="M15.5 16.5L9.5 7.5V16.5H8V7.5H9.5L15.5 16.5Z" fill="#FFFFFF"/>
        <rect x="15" y="7.5" width="1.5" height="9" fill="#FFFFFF"/>
      </svg>
    ),
  },
  {
    name: "Docker",
    ring: 3,
    color: "#2496ED",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24">
        <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 0 0 .186-.186V3.574a.185.185 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.186.186 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186zm-2.955 0h2.119a.186.186 0 0 0 .185-.186V6.29a.186.186 0 0 0-.185-.185H5.144a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186zm5.885 2.714h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186H8.1a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185zm-2.955 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.144a.186.186 0 0 0-.185.186v1.887c0 .102.083.185.185.185zm-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185z" fill="#2496ED"/>
      </svg>
    ),
  },
  {
    name: "Git",
    ring: 3,
    color: "#F05032",
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.216 1.38.006 1.807.57.43.565.43 1.348 0 1.913a1.536 1.536 0 0 1-1.807.57L8.683 11.23v6.494a1.538 1.538 0 0 1-.798 1.342 1.538 1.538 0 0 1-1.597 0 1.538 1.538 0 0 1-.797-1.342V10.87a1.538 1.538 0 0 1 .797-1.342 1.538 1.538 0 0 1 1.597 0c.264.148.472.37.594.636l2.67-2.67c-.266-.122-.488-.33-.636-.594a1.538 1.538 0 0 1 0-1.597c.148-.264.37-.472.636-.594L8.03.73 1.07 7.69c-.603.603-.603 1.582 0 2.188l10.479 10.48c.604.603 1.582.603 2.188 0l9.809-9.808c.603-.604.603-1.582 0-2.188z" fill="#F05032"/>
      </svg>
    ),
  },
];

// CONCENTRIC CIRCULAR ORBIT COMPONENT (MATCHING USER REFERENCE DESIGN)
function ConcentricTechOrbit({ isTransitioning }: { isTransitioning: boolean }) {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      setAngle((prev) => (prev + 0.005) % (Math.PI * 2));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const ring1Items = CONCENTRIC_TECH_ITEMS.filter((item) => item.ring === 1);
  const ring2Items = CONCENTRIC_TECH_ITEMS.filter((item) => item.ring === 2);
  const ring3Items = CONCENTRIC_TECH_ITEMS.filter((item) => item.ring === 3);

  return (
    <motion.div
      animate={
        isTransitioning
          ? { scale: [1, 1.35, 1.9], opacity: [1, 0.8, 0] }
          : { scale: [0.98, 1.02, 0.98] }
      }
      transition={
        isTransitioning
          ? { duration: 0.8, ease: "easeIn" }
          : { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }
      className="relative flex items-center justify-center w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] my-2 select-none"
    >
      {/* 3 Concentric Dashed Circular Orbit Rings */}
      {/* Inner Ring (Ring 1) */}
      <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed border-cyan-400/30 dark:border-cyan-400/25 pointer-events-none" />

      {/* Middle Ring (Ring 2) */}
      <div className="absolute w-[310px] h-[310px] sm:w-[410px] sm:h-[410px] rounded-full border border-dashed border-sky-400/25 dark:border-sky-400/20 pointer-events-none" />

      {/* Outer Ring (Ring 3) */}
      <div className="absolute w-[400px] h-[400px] sm:w-[540px] sm:h-[540px] rounded-full border border-dashed border-indigo-400/20 dark:border-indigo-400/15 pointer-events-none" />

      {/* CENTER GLOWING AVATAR CONTAINER */}
      <div className="relative z-30 flex items-center justify-center">
        {/* Soft Radial Green/Cyan Aura Glow Halo (Matching reference image) */}
        <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(16,185,129,0.18)_50%,transparent_75%)] blur-2xl pointer-events-none animate-pulse" />

        {/* Center Circular Profile Card */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-emerald-400 to-sky-500 shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950 border-2 border-white/90">
            <Image
              src="/profile-color.jpg"
              alt="Vivek Hingu"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-3 py-0.5 rounded-full bg-black/90 backdrop-blur-md border border-cyan-500/40 text-[9px] sm:text-[10px] font-extrabold text-cyan-300 tracking-wider uppercase shadow-lg">
            AI / ML & FULL STACK
          </div>
        </div>
      </div>

      {/* RING 1 ORBITING BADGES (Inner Ring: Clockwise) */}
      {ring1Items.map((tech, i) => {
        const itemAngle = angle + (i * Math.PI * 2) / ring1Items.length;
        const r = typeof window !== "undefined" && window.innerWidth < 640 ? 110 : 140;
        const x = Math.cos(itemAngle) * r;
        const y = Math.sin(itemAngle) * r;

        return (
          <div
            key={tech.name}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0)`,
            }}
            className="absolute z-20 flex items-center justify-center transition-transform duration-75"
          >
            {/* White Glossy Circular Badge with Outer Soft Glow Halo */}
            <div className="relative p-2.5 sm:p-3 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 shadow-[0_10px_25px_rgba(0,0,0,0.25)] flex items-center justify-center transition-transform duration-300 hover:scale-125">
              <div className="absolute -inset-1 rounded-full bg-white/40 dark:bg-cyan-500/20 blur-[3px] pointer-events-none" />
              <div className="relative z-10">{tech.icon}</div>
            </div>
          </div>
        );
      })}

      {/* RING 2 ORBITING BADGES (Middle Ring: Counter-Clockwise) */}
      {ring2Items.map((tech, i) => {
        const itemAngle = -angle * 0.8 + (i * Math.PI * 2) / ring2Items.length;
        const r = typeof window !== "undefined" && window.innerWidth < 640 ? 155 : 205;
        const x = Math.cos(itemAngle) * r;
        const y = Math.sin(itemAngle) * r;

        return (
          <div
            key={tech.name}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0)`,
            }}
            className="absolute z-20 flex items-center justify-center transition-transform duration-75"
          >
            <div className="relative p-2.5 sm:p-3 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 shadow-[0_10px_25px_rgba(0,0,0,0.25)] flex items-center justify-center transition-transform duration-300 hover:scale-125">
              <div className="absolute -inset-1 rounded-full bg-white/40 dark:bg-cyan-500/20 blur-[3px] pointer-events-none" />
              <div className="relative z-10">{tech.icon}</div>
            </div>
          </div>
        );
      })}

      {/* RING 3 ORBITING BADGES (Outer Ring: Clockwise) */}
      {ring3Items.map((tech, i) => {
        const itemAngle = angle * 0.65 + (i * Math.PI * 2) / ring3Items.length;
        const r = typeof window !== "undefined" && window.innerWidth < 640 ? 200 : 270;
        const x = Math.cos(itemAngle) * r;
        const y = Math.sin(itemAngle) * r;

        return (
          <div
            key={tech.name}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0)`,
            }}
            className="absolute z-20 flex items-center justify-center transition-transform duration-75"
          >
            <div className="relative p-2.5 sm:p-3 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 shadow-[0_10px_25px_rgba(0,0,0,0.25)] flex items-center justify-center transition-transform duration-300 hover:scale-125">
              <div className="absolute -inset-1 rounded-full bg-white/40 dark:bg-cyan-500/20 blur-[3px] pointer-events-none" />
              <div className="relative z-10">{tech.icon}</div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

export function IntroAnimation() {
  const [shouldShow, setShouldShow] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem(INTRO_STORAGE_KEY) !== "true";
      } catch {
        return true;
      }
    }
    return true;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionChars, setQuestionChars] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem(INTRO_STORAGE_KEY);
      if (hasSeen === "true") {
        setShouldShow(false);
      }
    } catch {
      setShouldShow(false);
    }
  }, []);

  // Timeline Engine
  useEffect(() => {
    if (!shouldShow || isComplete) return;

    let timer: NodeJS.Timeout;

    // Index 0: Typing out "> Who am I?"
    if (currentIndex === 0) {
      const qText = INTRO_CARDS[0]?.text ?? "> Who am I?";
      if (questionChars < qText.length) {
        timer = setTimeout(() => {
          setQuestionChars((prev) => prev + 1);
          playTapSound("hover");
        }, 25);
      } else {
        timer = setTimeout(() => {
          setCurrentIndex(1);
          playTapSound("pop");
        }, 350);
      }
      return () => clearTimeout(timer);
    }

    // Index 1 to 4: Single line role cards (1.2s display per card)
    if (currentIndex >= 1 && currentIndex <= 4) {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        playTapSound("pop");
      }, 1200);
      return () => clearTimeout(timer);
    }

    // Index 5: CONCENTRIC TECH LOGO ORBIT SYSTEM -> ACCESS GRANTED -> EXIT
    if (currentIndex === 5) {
      playTapSound("access_granted");
      timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          handleComplete();
        }, 900);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [shouldShow, currentIndex, questionChars, isComplete]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
    setIsComplete(true);
  };

  const handleSkip = () => {
    playTapSound("pop");
    handleComplete();
  };

  if (!shouldShow || isComplete) return null;

  const activeCard = INTRO_CARDS[currentIndex] ?? INTRO_CARDS[0];
  const questionText = (INTRO_CARDS[0]?.text ?? "> Who am I?").slice(0, questionChars);

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="intro-viewport"
          initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          animate={
            isTransitioning
              ? {
                  opacity: 0,
                  filter: "blur(28px)",
                  scale: 1.08,
                }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                }
          }
          exit={{ opacity: 0, filter: "blur(30px)" }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-[#F8FAFC] select-none overflow-hidden transform-gpu will-change-[opacity,filter,transform]"
        >
          {/* Cyan Ambient Energy Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12)_0%,rgba(0,0,0,0)_68%)] pointer-events-none opacity-70" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-50 px-4 py-1.5 rounded-full border border-[#38bdf8]/40 bg-black/80 backdrop-blur-md text-xs font-mono text-[#38bdf8] hover:text-white hover:border-[#38bdf8] hover:bg-black/95 transition-all duration-300 shadow-2xl cursor-pointer"
          >
            Skip Intro →
          </button>

          {/* Main Stage Container */}
          <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center min-h-[380px] text-center">
            <AnimatePresence mode="wait">
              {/* Question Phase */}
              {currentIndex === 0 && (
                <motion.div
                  key="question-card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center text-4xl sm:text-6xl md:text-7xl font-mono text-[#38bdf8] font-bold tracking-wider"
                >
                  <span>{questionText}</span>
                  <span className="inline-block w-4 h-9 sm:h-14 ml-3 bg-[#38bdf8] animate-pulse shadow-[0_0_20px_rgba(56,189,248,0.9)]" />
                </motion.div>
              )}

              {/* Single Line Role Cards */}
              {currentIndex >= 1 && currentIndex <= 4 && (
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, y: 25, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -25, scale: 1.06 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center space-y-4"
                >
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]">
                    {activeCard.title ?? ""}
                  </h2>
                  <p className="text-sm sm:text-lg font-mono text-[#38bdf8]/90 tracking-widest uppercase">
                    — {activeCard.sub ?? ""} —
                  </p>
                </motion.div>
              )}

              {/* CONCENTRIC TECH LOGOS ORBIT SYSTEM + ACCESS GRANTED TEXT */}
              {currentIndex === 5 && (
                <motion.div
                  key="concentric-tech-orbit-stage"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative flex flex-col items-center"
                >
                  {/* Concentric Tech Orbit Component */}
                  <ConcentricTechOrbit isTransitioning={isTransitioning} />

                  {/* SLEEK ACCESS GRANTED TEXT */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-2 flex flex-col items-center text-center gap-1.5"
                  >
                    <h2 className="font-mono text-3xl sm:text-5xl font-black tracking-[0.3em] bg-gradient-to-r from-cyan-300 via-white to-sky-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.95)] uppercase">
                      ACCESS GRANTED
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-[#38bdf8] tracking-[0.35em] uppercase font-bold opacity-90">
                      VIVEK HINGU // PORTFOLIO UNLOCKED
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
