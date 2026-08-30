"use client";

import React, { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import profilePic from "@/images/profile-color.jpg";
import { HeroConstellation } from "@/components/ui/hero-constellation";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShimmerBorder } from "@/components/ui/shimmer-border";
import { IconArrowRight, IconFileText } from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { AnimatedName } from "@/components/ui/animated-name";
import { VisitorBadge } from "@/components/ui/visitor-badge";
import { ResumeModal } from "@/components/ui/resume-modal";
import { Marquee } from "@/components/ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { data } from "@/data/data";

interface AvatarCharacter {
  id: string;
  name: string;
  badge: string;
  icon: string;
  src: string | StaticImageData;
  borderColor: string;
  shadowColor: string;
  badgeBorder: string;
  badgeText: string;
  haloGradient: string;
}

const HERO_AVATARS: AvatarCharacter[] = [
  {
    id: "default",
    name: "Vivek Hingu",
    badge: "AI / ML",
    icon: "⚡",
    src: profilePic,
    borderColor: "border-cyan-400/60",
    shadowColor: "shadow-[0_0_40px_rgba(34,211,238,0.45)]",
    badgeBorder: "border-cyan-400/60 text-cyan-300",
    badgeText: "text-cyan-300",
    haloGradient: "from-cyan-500 via-sky-400 to-indigo-500",
  },
  {
    id: "ironman",
    name: "Iron Man",
    badge: "IRON MAN",
    icon: "🦾",
    src: "/avatars/ironman.jpg",
    borderColor: "border-red-500/90",
    shadowColor: "shadow-[0_0_45px_rgba(239,68,68,0.6)]",
    badgeBorder: "border-amber-400/80 text-amber-300",
    badgeText: "text-amber-300",
    haloGradient: "from-red-500 via-amber-500 to-yellow-400",
  },
  {
    id: "spiderman",
    name: "Spider-Man",
    badge: "SPIDER-MAN",
    icon: "🕷️",
    src: "/avatars/spiderman.jpg",
    borderColor: "border-red-500/90",
    shadowColor: "shadow-[0_0_45px_rgba(239,68,68,0.6)]",
    badgeBorder: "border-red-500/80 text-red-400",
    badgeText: "text-red-400",
    haloGradient: "from-red-600 via-rose-500 to-blue-600",
  },
  {
    id: "blackpanther",
    name: "Black Panther",
    badge: "BLACK PANTHER",
    icon: "🐆",
    src: "/avatars/blackpanther.jpg",
    borderColor: "border-purple-500/90",
    shadowColor: "shadow-[0_0_45px_rgba(168,85,247,0.6)]",
    badgeBorder: "border-purple-400/80 text-purple-300",
    badgeText: "text-purple-300",
    haloGradient: "from-purple-600 via-indigo-500 to-slate-900",
  },
  {
    id: "thor",
    name: "Thor",
    badge: "THOR",
    icon: "⚡",
    src: "/avatars/thor.jpg",
    borderColor: "border-sky-400/90",
    shadowColor: "shadow-[0_0_45px_rgba(56,189,248,0.6)]",
    badgeBorder: "border-sky-400/80 text-sky-300",
    badgeText: "text-sky-300",
    haloGradient: "from-sky-400 via-blue-500 to-red-600",
  },
  {
    id: "drstrange",
    name: "Doctor Strange",
    badge: "DR. STRANGE",
    icon: "🔮",
    src: "/avatars/drstrange.jpg",
    borderColor: "border-amber-500/90",
    shadowColor: "shadow-[0_0_45px_rgba(245,158,11,0.6)]",
    badgeBorder: "border-amber-400/80 text-amber-300",
    badgeText: "text-amber-300",
    haloGradient: "from-amber-500 via-orange-600 to-red-700",
  },
];

export default function Hero() {
  const [wiggleIcon, setWiggleIcon] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [avatarIdx, setAvatarIdx] = useState(0);

  const currentAvatar = HERO_AVATARS[avatarIdx];

  const handleAvatarClick = () => {
    playTapSound("pop");
    setAvatarIdx((prev) => (prev + 1) % HERO_AVATARS.length);
  };

  const { status, dotColor } = getStatus();

  const handleIconClick = (iconName: string) => {
    playTapSound("pop");
    setWiggleIcon(iconName);
    setTimeout(() => setWiggleIcon(null), 600);
  };

  const handleShimmerButtonClick = () => {
    playTapSound("chime");
    handleIconClick("email");
  };

  const ctaRef = useRef<HTMLAnchorElement>(null);
  const handleCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const resumeBtnRef = useRef<HTMLButtonElement>(null);
  const handleResumeMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = resumeBtnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="pt-28 pb-14 sm:pt-40 sm:pb-16 relative flex items-center justify-center overflow-hidden">
      <HeroConstellation desktopDots={300} mobileDots={75} />

      <TooltipProvider>
        <BlurFade delay={0.005} inView>
          <div className="relative flex-col space-y-1">
            <div className="relative flex flex-col items-center justify-center">
              {/* High-Tech Angled Double Marquee Ribbons Centered Directly Behind DP Avatar */}
              <div className="absolute top-18 sm:top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen pointer-events-none z-0 flex items-center justify-center overflow-hidden h-72 select-none opacity-90">
                {/* Cyan/Teal Angled Ribbon (-3.5deg) - Thicker & Bold Black Text */}
                <div className="absolute w-[145vw] min-w-[1600px] -rotate-[3.5deg] bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 py-3 sm:py-4 shadow-[0_0_40px_rgba(6,182,212,0.5)] border-y-2 border-cyan-200/60">
                  <Marquee repeat={6} className="[--duration:26s] py-0 text-sm sm:text-base font-black font-mono tracking-[0.2em] text-zinc-950 uppercase">
                    <span>VIVEK HINGU // AI & MACHINE LEARNING ENGINEER</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>AUTONOMOUS AGENTS</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>NEURAL ARCHITECTURES</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>GROK API & LLMS</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>DATA SCIENCE & PYTHON</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                  </Marquee>
                </div>

                {/* Violet/Indigo Angled Ribbon (+3.5deg) - Thicker & Bold Black Text */}
                <div className="absolute w-[145vw] min-w-[1600px] rotate-[3.5deg] bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400 py-3 sm:py-4 shadow-[0_0_40px_rgba(129,140,248,0.5)] border-y-2 border-indigo-200/60">
                  <Marquee reverse repeat={6} className="[--duration:30s] py-0 text-sm sm:text-base font-black font-mono tracking-[0.2em] text-zinc-950 uppercase">
                    <span>BHARATBHASHA AI</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>REAL-TIME STREAMING</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>HACKATHON WINNER</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>DISRUPT & DEPLOY</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>SYSTEM ARCHITECTURE</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                  </Marquee>
                </div>
              </div>

              {/* Interactive Superhero Profile Avatar - Cycles sequentially on Click / Touch */}
              <div
                className="group relative z-50 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 select-none"
                onClick={handleAvatarClick}
                onTouchStart={handleAvatarClick}
                role="button"
                tabIndex={0}
                aria-label={`Current Avatar: ${currentAvatar.name}. Tap to switch avatar character.`}
              >
                {/* Dynamic Ambient Glowing Halo */}
                <div
                  className={`absolute -inset-3 rounded-full bg-gradient-to-tr ${currentAvatar.haloGradient} opacity-60 blur-xl group-hover:opacity-95 transition-all duration-500 animate-pulse`}
                />

                {/* Avatar Border Ring */}
                <div
                  className={`relative h-44 w-44 sm:h-52 sm:w-52 md:h-56 md:w-56 overflow-hidden rounded-full border-2 transition-all duration-500 bg-zinc-950 ${currentAvatar.borderColor} ${currentAvatar.shadowColor}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentAvatar.id}
                      initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 1.08, rotate: 4 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={currentAvatar.src}
                        alt={`Vivek Hingu (${currentAvatar.name})`}
                        priority
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Character Hero Badge (e.g. AI / ML, IRON MAN, SPIDER-MAN, etc.) */}
                  <div
                    className={`absolute bottom-2.5 sm:bottom-3 inset-x-0 mx-auto w-max px-3.5 py-1 rounded-full bg-black/90 backdrop-blur-md border transition-all duration-300 text-[10px] sm:text-xs font-black tracking-widest uppercase z-20 flex items-center justify-center gap-1.5 shadow-lg ${currentAvatar.badgeBorder}`}
                  >
                    <span>{currentAvatar.icon}</span>
                    <span>{currentAvatar.badge}</span>
                  </div>
                </div>

                {/* Interactive Tap Hint Pill */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none px-3 py-0.5 rounded-full bg-zinc-950/90 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 shadow-xl whitespace-nowrap z-30">
                  Tap to swap ({avatarIdx + 1}/{HERO_AVATARS.length})
                </div>
              </div>

              <ShimmerButton onClick={handleShimmerButtonClick} className="z-50 mt-5">
                <div className="z-50 relative flex items-center justify-center">
                  <div
                    className={`absolute h-1.5 w-1.5 rounded-full border-1 ${
                      dotColor === "green"
                        ? "border-green-600/80 bg-green-500 animate-ping"
                        : "border-orange-600/80 bg-orange-500 animate-ping"
                    } mr-2`}
                  ></div>
                  <div
                    className={`relative h-1 w-1 rounded-full border-1 ${
                      dotColor === "green"
                        ? "border-green-600/80 bg-green-500 animate-pulse"
                        : "border-orange-600/80 bg-orange-500 animate-pulse"
                    } mr-2`}
                  ></div>
                </div>
                <span className="whitespace-pre-wrap text-center font-semibold leading-none text-muted-foreground text-xs sm:text-base py-[0.5]">
                  {status}
                </span>
              </ShimmerButton>
              <div className="mt-3 flex justify-center">
                <VisitorBadge />
              </div>
            </div>

            <div className="w-full space-y-6 pt-2">
              <div className="z-50 text-center px-2">
                <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight break-words sm:whitespace-nowrap select-none">
                  <span className="text-foreground">Hi, I&#39;m </span>
                  <AnimatedName className="inline-block" />
                </h1>
              </div>

                <p className="mt-3 text-sm sm:text-2xl font-medium tracking-tight text-center text-muted-foreground px-4 max-w-2xl mx-auto">
                  AI & ML Engineer building{" "}
                  <span className="text-cyan-400 font-semibold underline decoration-cyan-500/40 underline-offset-4">
                    intelligent software
                  </span>
                  .
                </p>
              <BlurFade delay={0.005 * 2} direction="down" inView>
                <div className="z-50 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                  <div className="px-4 py-2 rounded-full border border-border/60 bg-background/50 backdrop-blur-md shadow-lg">
                    <ContactIcons wiggleIcon={wiggleIcon} handleIconClick={handleIconClick} />
                  </div>
                  <span className="hidden sm:inline-block h-5 w-px bg-border/60" aria-hidden />
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <a
                      ref={ctaRef}
                      onMouseMove={handleCtaMove}
                      onClick={() => playTapSound("pop")}
                      href="#projects"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md px-5 py-2 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-border hover:shadow-lg"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                        style={{
                          background:
                            "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), currentColor, transparent 60%)",
                        }}
                      />
                      <span className="relative">View my work</span>
                      <IconArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      <ShimmerBorder />
                    </a>
                    <button
                      ref={resumeBtnRef}
                      onMouseMove={handleResumeMove}
                      onClick={() => {
                        playTapSound("chime");
                        setIsResumeOpen(true);
                      }}
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md px-5 py-2 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-border hover:shadow-lg"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                        style={{
                          background:
                            "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), currentColor, transparent 60%)",
                        }}
                      />
                      <IconFileText className="relative h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="relative font-bold">Resume</span>
                      <ShimmerBorder />
                    </button>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </BlurFade>
      </TooltipProvider>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}

const getStatus = () => {
  const now = new Date();
  const localTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  }).format(now);

  const currentHour = parseInt(localTime, 10);

  if (currentHour >= 9 && currentHour < 23) {
    return { status: "Available for Building & Collaborating", dotColor: "green" };
  } else {
    return { status: "Building in Stealth Mode", dotColor: "amber" };
  }
};

const iconClass = (label: string, wiggleIcon: string | null) =>
  `text-secondary-foreground ${
    wiggleIcon === label.toLowerCase()
      ? "animate-wiggle scale-150 transition-transform duration-200"
      : ""
  } hover:scale-130 hover:animate-wiggle transition-transform duration-300`;

function ContactIcons({
  wiggleIcon,
  handleIconClick,
}: {
  wiggleIcon: string | null;
  handleIconClick: (label: string) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-center space-x-6">
      {data.contact.map((link) => (
        <Tooltip key={link.label}>
          <TooltipTrigger asChild>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.aria}
              onClick={() => handleIconClick(link.label.toLowerCase())}
            >
              {React.cloneElement(link.icon, {
                className: iconClass(link.label, wiggleIcon),
              })}
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">{link.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}