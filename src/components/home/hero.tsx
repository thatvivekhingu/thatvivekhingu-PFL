"use client";

import React, { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
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
  src: string | StaticImageData;
  borderColor: string;
  shadowColor: string;
  badgeText: string;
  haloGradient: string;
}

const HERO_AVATARS: AvatarCharacter[] = [
  {
    id: "default",
    name: "Vivek Hingu",
    badge: "AI / ML",
    src: "/avatars/vivek.jpg",
    borderColor: "border-cyan-400/50",
    shadowColor: "shadow-[0_0_20px_rgba(34,211,238,0.25)]",
    badgeText: "text-cyan-400",
    haloGradient: "from-cyan-500/40 via-sky-400/30 to-indigo-500/30",
  },
  {
    id: "spiderman",
    name: "દેશી કરોડિયો 🕷️",
    badge: "દેશી કરોડિયો 🕷️",
    src: "/avatars/spiderman.jpg",
    borderColor: "border-red-500/80",
    shadowColor: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    badgeText: "text-red-400",
    haloGradient: "from-red-600/40 via-rose-500/30 to-blue-600/30",
  },
];

export default function Hero() {
  const [wiggleIcon, setWiggleIcon] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [avatarIdx, setAvatarIdx] = useState(0);

  const currentAvatar = HERO_AVATARS[avatarIdx];

  const handleMouseEnter = () => {
    playTapSound("pop");
    setAvatarIdx(1);
  };

  const handleMouseLeave = () => {
    setAvatarIdx(0);
  };

  const handleAvatarClick = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    playTapSound("pop");
    setAvatarIdx((prev) => (prev === 0 ? 1 : 0));
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

  const contactRef = useRef<HTMLDivElement>(null);
  const handleContactMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = contactRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
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
    <div className="w-full pt-12 pb-6 sm:min-h-screen sm:pt-28 sm:pb-16 relative flex flex-col items-center justify-center overflow-hidden">
      <HeroConstellation desktopDots={340} mobileDots={80} />

      <TooltipProvider>
        <BlurFade delay={0.005} inView>
          <div className="relative flex-col space-y-3 sm:space-y-4 z-20">
            <div className="relative flex flex-col items-center justify-center">
              {/* Avatar Center Wrapper with Concentric Marvel Arc Reactor Orbit & Angled Ribbons Perfectly Aligned */}
              <div className="relative flex items-center justify-center my-2 sm:my-3 z-30">
                {/* Full-Bleed Edge-to-Edge Angled Double Marquee Ribbons Layer - Centered Directly Behind Avatar */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen pointer-events-none z-[5] flex items-center justify-center select-none opacity-80">
                  {/* Cyan/Teal Angled Ribbon (-3.5deg) - 100% Screen Edge-to-Edge Bleed */}
                  <div className="absolute w-[250vw] min-w-[2200px] -rotate-[3.5deg] bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 py-3 sm:py-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] border-y border-cyan-200/40">
                    <Marquee repeat={8} className="[--duration:26s] py-0 text-xs sm:text-sm font-black font-mono tracking-[0.2em] text-zinc-950 uppercase">
                      <span>VIVEK HINGU // AI & ML ENGINEER</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                      <span>JARVIS & AGENTIC AI</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                      <span>AUTONOMOUS AGENTS</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                      <span>NEURAL NETWORKS</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                      <span>DATA SCIENCE & PYTHON</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                    </Marquee>
                  </div>

                  {/* Violet/Indigo Angled Ribbon (+3.5deg) - 100% Screen Edge-to-Edge Bleed */}
                  <div className="absolute w-[250vw] min-w-[2200px] rotate-[3.5deg] bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400 py-3 sm:py-4 shadow-[0_0_15px_rgba(129,140,248,0.15)] border-y border-indigo-200/40">
                    <Marquee reverse repeat={8} className="[--duration:30s] py-0 text-xs sm:text-sm font-black font-mono tracking-[0.2em] text-zinc-950 uppercase">
                      <span>BHARATBHASHA AI</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                      <span>REAL-TIME STREAMING</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                      <span>HACKATHON WINNER</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                      <span>DISRUPT & DEPLOY</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                      <span>QUANTUM ARCHITECTURE</span>
                      <span className="mx-3 text-zinc-950 font-black">•</span>
                    </Marquee>
                  </div>
                </div>

                {/* Concentric Marvel Arc Reactor & Avengers Orbit (Mathematically Centered Behind Avatar) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] sm:w-[540px] sm:h-[540px] md:w-[600px] md:h-[600px] pointer-events-none z-[10] select-none flex items-center justify-center opacity-20 dark:opacity-25">
                  <div className="relative w-full h-full animate-[spin_80s_linear_infinite]">
                    <svg
                      viewBox="0 0 400 400"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full text-cyan-500/30 dark:text-cyan-400/35"
                    >
                      {/* Outer Tech Coordinate Rings */}
                      <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
                      <circle cx="200" cy="200" r="172" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" strokeDasharray="16 6" />
                      <circle cx="200" cy="200" r="128" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                      <circle cx="200" cy="200" r="105" stroke="currentColor" strokeWidth="1" strokeDasharray="8 12" />
                      <circle cx="200" cy="200" r="85" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />

                      {/* Radial Arc Reactor Notches */}
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                        <line
                          key={deg}
                          x1="200"
                          y1="10"
                          x2="200"
                          y2="28"
                          stroke="currentColor"
                          strokeWidth="2"
                          transform={`rotate(${deg} 200 200)`}
                        />
                      ))}

                      {/* Iconic Avengers 'A' Logo Embedded at Center */}
                      <g transform="translate(100, 100) scale(1)">
                        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="3" strokeDasharray="140 30" opacity="0.85" />
                        <path
                          d="M30 115 L160 115 L145 95 L25 95 Z"
                          fill="currentColor"
                          opacity="0.85"
                        />
                        <polygon
                          points="155,90 185,105 155,120"
                          fill="currentColor"
                        />
                        <polygon
                          points="98,35 118,35 142,145 122,145 114,105 92,105 95,95 112,95 106,62 86,145 68,145"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                  </div>
                  {/* Ambient Marvel Core Glow */}
                  <div className="absolute inset-16 rounded-full bg-cyan-500/5 dark:bg-cyan-500/5 blur-xl" />
                </div>

                {/* Interactive Superhero Profile Avatar - Smooth Crossfade & Auto-Reset on Mouse Leave */}
                <div
                  className="group relative z-50 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 select-none"
                  onClick={handleAvatarClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleAvatarClick();
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Current Persona: ${currentAvatar.name}`}
                >
                  {/* Dynamic Ambient Glowing Halo */}
                  <div
                    className={`absolute -inset-3 rounded-full bg-gradient-to-tr ${currentAvatar.haloGradient} opacity-25 blur-lg group-hover:opacity-50 transition-all duration-500 animate-pulse`}
                  />

                  {/* Avatar Border Ring with Smooth Crossfade Layers */}
                  <div
                    className={`relative h-48 w-48 sm:h-56 sm:w-56 md:h-60 md:w-60 overflow-hidden rounded-full border-2 transition-all duration-500 bg-zinc-950 ${currentAvatar.borderColor} ${currentAvatar.shadowColor}`}
                  >
                    {HERO_AVATARS.map((avatar, idx) => (
                      <div
                        key={avatar.id}
                        className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                          idx === avatarIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <Image
                          src={avatar.src}
                          alt={`Vivek Hingu (${avatar.name})`}
                          priority={idx === 0}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Character Name Label under Avatar - Small, Clean, No Background, No Emoji, No Number */}
              <div className="mt-1.5 text-center text-xs font-mono font-medium tracking-wide text-zinc-400 select-none z-50">
                <span className={currentAvatar.badgeText}>
                  {currentAvatar.name}
                </span>
              </div>

              <ShimmerButton onClick={handleShimmerButtonClick} className="z-50 mt-2.5">
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
                <span className="whitespace-pre-wrap text-center font-semibold leading-none text-muted-foreground text-xs sm:text-sm py-[0.5]">
                  {status}
                </span>
              </ShimmerButton>
              <div className="mt-2 flex justify-center">
                <VisitorBadge />
              </div>
            </div>

            <div className="w-full space-y-3 sm:space-y-4 pt-1 sm:pt-2">
              <div className="z-50 text-center px-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight break-words sm:whitespace-nowrap select-none">
                  <span className="text-foreground">Hi, I&#39;m </span>
                  <AnimatedName className="inline-block" />
                </h1>
              </div>

              <p className="mt-1 text-sm sm:text-xl font-medium tracking-tight text-center text-muted-foreground px-4 max-w-2xl mx-auto">
                AI & ML Engineer building{" "}
                <span className="text-cyan-400 font-semibold underline decoration-cyan-500/40 underline-offset-4">
                  intelligent software
                </span>
                .
              </p>

              <BlurFade delay={0.005 * 2} direction="down" inView>
                <div className="z-50 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                  <div
                    ref={contactRef}
                    onMouseMove={handleContactMove}
                    className="group relative inline-flex items-center overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md px-3.5 py-1.5 transition-all hover:border-border hover:shadow-lg"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-full text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                      style={{
                        background:
                          "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), currentColor, transparent 60%)",
                      }}
                    />
                    <div className="relative z-10">
                      <ContactIcons wiggleIcon={wiggleIcon} handleIconClick={handleIconClick} />
                    </div>
                    <ShimmerBorder />
                  </div>
                  <span className="hidden sm:inline-block h-4 w-px bg-border/60" aria-hidden />
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <a
                      ref={ctaRef}
                      onMouseMove={handleCtaMove}
                      onClick={() => playTapSound("pop")}
                      href="#projects"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-border hover:shadow-lg"
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
                      <IconArrowRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      <ShimmerBorder />
                    </a>
                    <button
                      ref={resumeBtnRef}
                      onMouseMove={handleResumeMove}
                      onClick={() => {
                        playTapSound("chime");
                        setIsResumeOpen(true);
                      }}
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-border hover:shadow-lg"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-full text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                        style={{
                          background:
                            "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), currentColor, transparent 60%)",
                        }}
                      />
                      <IconFileText className="relative h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
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