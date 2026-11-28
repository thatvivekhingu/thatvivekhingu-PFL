"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShimmerBorder } from "@/components/ui/shimmer-border";
import { IconArrowRight, IconFileText } from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { AnimatedName } from "@/components/ui/animated-name";
import { ResumeModal } from "@/components/ui/resume-modal";
import { Marquee } from "@/components/ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { data } from "@/data/data";
import { LottiePlayer } from "@/components/ui/lottie-player";
import { Magnetic } from "@/components/ui/magnetic";


export default function Hero() {
  const [wiggleIcon, setWiggleIcon] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

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
    <div className="w-full relative flex flex-col items-center justify-center overflow-visible">
      <TooltipProvider>
        <BlurFade delay={0.005} inView>
          <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center z-20">
            {/* Center Avatar & Arc Reactor Showcase */}
            <div className="relative flex flex-col items-center justify-center z-30 mx-auto my-3">
              {/* Ultra-Sleek Avatar Core with Concentric Marvel Arc Reactor Orbit & Full-Bleed Angled Ribbons */}
              <div className="relative group cursor-pointer z-30 my-3 flex items-center justify-center">
                {/* Full-Bleed Edge-to-Edge Editorial Tapes Layer - Centered Mathematically Behind Avatar */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen pointer-events-none z-[2] flex items-center justify-center select-none">
                  {/* Tape A: Dark / Ink Tape - High-contrast crisp border and wider angle on mobile */}
                  <div className="absolute w-[250vw] min-w-[2200px] -rotate-[7.5deg] sm:-rotate-[3.2deg] bg-[#121214] border-y border-white/40 py-3 sm:py-5 md:py-6 shadow-[0_8px_32px_rgba(0,0,0,0.9)] z-[1]">
                    <Marquee repeat={4} className="[--duration:30s] py-0 text-xl sm:text-3xl md:text-[38px] lg:text-[42px] font-[family-name:var(--font-anton)] tracking-wider text-white uppercase leading-none">
                      <span className="mx-3 sm:mx-5 text-zinc-400 font-normal">✦</span>
                      <span>VIVEK HINGU // AI &amp; ML ENGINEER</span>
                      <span className="mx-3 sm:mx-5 text-zinc-400 font-normal">✦</span>
                      <span>JARVIS &amp; AGENTIC AI</span>
                      <span className="mx-3 sm:mx-5 text-zinc-400 font-normal">✦</span>
                      <span>AUTONOMOUS AGENTS</span>
                      <span className="mx-3 sm:mx-5 text-zinc-400 font-normal">✦</span>
                      <span>NEURAL NETWORKS</span>
                      <span className="mx-3 sm:mx-5 text-zinc-400 font-normal">✦</span>
                      <span>DATA SCIENCE &amp; PYTHON</span>
                      <span className="mx-3 sm:mx-5 text-zinc-400 font-normal">✦</span>
                      <span>COMPUTER VISION</span>
                    </Marquee>
                  </div>

                  {/* Tape B: Paper / Cream Tape - Crossing in Front with Bold Black Typography */}
                  <div className="absolute w-[250vw] min-w-[2200px] rotate-[6.5deg] sm:rotate-[2.8deg] bg-[#ECE7DC] border-y-2 border-black py-3 sm:py-5 md:py-6 shadow-[0_12px_40px_rgba(0,0,0,0.7)] z-[2]">
                    <Marquee reverse repeat={4} className="[--duration:34s] py-0 text-xl sm:text-3xl md:text-[38px] lg:text-[42px] font-[family-name:var(--font-anton)] tracking-tight text-black uppercase leading-none">
                      <span className="mx-3 sm:mx-5 text-black font-normal">✦</span>
                      <span>BHARATBHASHA AI</span>
                      <span className="mx-3 sm:mx-5 text-black font-normal">✦</span>
                      <span>REAL-TIME STREAMING</span>
                      <span className="mx-3 sm:mx-5 text-black font-normal">✦</span>
                      <span>HACKATHON WINNER</span>
                      <span className="mx-3 sm:mx-5 text-black font-normal">✦</span>
                      <span>DISRUPT &amp; DEPLOY</span>
                      <span className="mx-3 sm:mx-5 text-black font-normal">✦</span>
                      <span>GENAI ARCHITECT</span>
                      <span className="mx-3 sm:mx-5 text-black font-normal">✦</span>
                      <span>FLINDERS AI WINNER</span>
                    </Marquee>
                  </div>
                </div>

                {/* Photo with clean neutral border */}
                <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 lg:h-56 lg:w-56 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-950 z-20">
                  <Image
                    src="/avatars/vivek.jpg"
                    alt="Vivek Hingu"
                    fill
                    sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 224px"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                    priority
                  />
                </div>
                {/* Verified AI Pulse Indicator */}
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 md:bottom-2.5 md:right-2.5 flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-slate-950 border-2 border-white/30 shadow-md z-30">
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Status Shimmer Button */}
              <ShimmerButton onClick={handleShimmerButtonClick} className="z-50 mt-1">
                <div className="z-50 relative flex items-center justify-center">
                  <div
                    className={`absolute h-1.5 w-1.5 rounded-full border-1 ${
                      dotColor === "green"
                        ? "border-green-600/80 bg-green-500 animate-ping"
                        : "border-orange-600/80 bg-orange-500 animate-ping"
                    } mr-2`}
                  />
                  <div
                    className={`relative h-1 w-1 rounded-full border-1 ${
                      dotColor === "green"
                        ? "border-green-600/80 bg-green-500 animate-pulse"
                        : "border-orange-600/80 bg-orange-500 animate-pulse"
                    } mr-2`}
                  />
                </div>
                <LottiePlayer src="/lottie/terminal.json" className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                <span className="whitespace-pre-wrap text-center font-semibold leading-none text-muted-foreground text-xs sm:text-sm py-[0.5]">
                  {status}
                </span>
              </ShimmerButton>
            </div>

            {/* Identity & Actions directly below Image */}
            <div className="w-full space-y-2.5 sm:space-y-3 pt-1 sm:pt-2 text-center z-30">
              <div className="z-50 text-center px-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight break-words sm:whitespace-nowrap select-none">
                  <span className="text-foreground">Hi, I&#39;m </span>
                  <AnimatedName className="inline-block" />
                </h1>
              </div>

              <p className="mt-1 text-sm sm:text-xl font-medium tracking-tight text-center text-muted-foreground px-4 max-w-2xl mx-auto">
                AI/ML Engineer building{" "}
                <span className="text-cyan-400 font-semibold underline decoration-cyan-500/40 underline-offset-4">
                  intelligent software
                </span>
                .
              </p>

              <BlurFade delay={0.005 * 2} direction="down" inView>
                <div className="z-50 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                  <Magnetic strength={0.25}>
                    <div
                      ref={contactRef}
                      onMouseMove={handleContactMove}
                      className="group relative inline-flex items-center overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md px-3.5 py-1.5 transition-all hover:border-border hover:shadow-lg active:scale-95"
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
                  </Magnetic>
                  <span className="hidden sm:inline-block h-4 w-px bg-border/60" aria-hidden />
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Magnetic strength={0.35}>
                      <a
                        ref={ctaRef}
                        onMouseMove={handleCtaMove}
                        onClick={() => playTapSound("pop")}
                        href="#projects"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-border hover:shadow-lg active:scale-95"
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
                    </Magnetic>
                    <Magnetic strength={0.35}>
                      <button
                        ref={resumeBtnRef}
                        onMouseMove={handleResumeMove}
                        onClick={() => {
                          playTapSound("chime");
                          setIsResumeOpen(true);
                        }}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-foreground transition-all hover:border-border hover:shadow-lg active:scale-95 cursor-pointer"
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
                    </Magnetic>
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

const getBrandClasses = (label: string, isWiggling: boolean) => {
  const base = "transition-all duration-300 transform";
  const wiggle = isWiggling ? "animate-wiggle scale-150" : "hover:scale-130 hover:animate-wiggle";

  switch (label.toLowerCase()) {
    case "email":
      return `${base} ${wiggle} ${
        isWiggling
          ? "text-[#EA4335] drop-shadow-[0_0_10px_rgba(234,67,53,0.7)]"
          : "text-zinc-400 hover:text-[#EA4335] hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.6)]"
      }`;
    case "linkedin":
      return `${base} ${wiggle} ${
        isWiggling
          ? "text-[#0A66C2] drop-shadow-[0_0_10px_rgba(10,102,194,0.7)]"
          : "text-zinc-400 hover:text-[#0A66C2] hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.6)]"
      }`;
    case "github":
      return `${base} ${wiggle} ${
        isWiggling
          ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          : "text-zinc-400 hover:text-white dark:hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
      }`;
    case "instagram":
      return `${base} ${wiggle} ${
        isWiggling
          ? "[stroke:url(#ig-brand-gradient)] text-[#E4405F] drop-shadow-[0_0_10px_rgba(225,48,108,0.8)]"
          : "text-zinc-400 hover:[stroke:url(#ig-brand-gradient)] hover:text-[#E4405F] hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.7)]"
      }`;
    default:
      return `${base} ${wiggle} text-zinc-400 hover:text-primary`;
  }
};

function ContactIcons({
  wiggleIcon,
  handleIconClick,
}: {
  wiggleIcon: string | null;
  handleIconClick: (label: string) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-center space-x-6 relative">
      {/* SVG Gradient Def for Instagram */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="ig-brand-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#fdf497" offset="0%" />
            <stop stopColor="#fd5949" offset="45%" />
            <stop stopColor="#d6249f" offset="65%" />
            <stop stopColor="#285AEB" offset="90%" />
          </linearGradient>
        </defs>
      </svg>
      {data.contact.map((link) => {
        const isWiggling = wiggleIcon === link.label.toLowerCase();
        return (
          <Tooltip key={link.label}>
            <TooltipTrigger asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.aria}
                onClick={() => handleIconClick(link.label.toLowerCase())}
                className="group p-1"
              >
                {React.cloneElement(link.icon, {
                  className: `h-5 w-5 ${getBrandClasses(link.label, isWiggling)}`,
                })}
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs font-medium">
              {link.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}