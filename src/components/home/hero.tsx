"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
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
              {/* Full-Bleed Edge-to-Edge Angled Double Marquee Ribbons Layer */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen pointer-events-none z-[2] flex items-center justify-center select-none opacity-30 dark:opacity-25 transition-opacity [mask-image:radial-gradient(ellipse_460px_600px_at_center,transparent_45%,black_75%)] [-webkit-mask-image:radial-gradient(ellipse_460px_600px_at_center,transparent_45%,black_75%)]">
                {/* Cyan/Teal Angled Ribbon (-3.5deg) */}
                <div className="absolute w-[250vw] min-w-[2200px] -rotate-[3.5deg] bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 py-2 sm:py-2.5 shadow-[0_0_15px_rgba(6,182,212,0.1)] border-y border-cyan-200/30">
                  <Marquee repeat={10} className="[--duration:28s] py-0 text-xs sm:text-sm font-black font-mono tracking-[0.2em] text-zinc-950 uppercase">
                    <span>AI/ML</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>GENAI</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>COMPUTER VISION</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>PYTHON</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>AGENTIC AI</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                  </Marquee>
                </div>

                {/* Violet/Indigo Angled Ribbon (+3.5deg) */}
                <div className="absolute w-[250vw] min-w-[2200px] rotate-[3.5deg] bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400 py-2 sm:py-2.5 shadow-[0_0_15px_rgba(129,140,248,0.1)] border-y border-indigo-200/30">
                  <Marquee reverse repeat={10} className="[--duration:32s] py-0 text-xs sm:text-sm font-black font-mono tracking-[0.2em] text-zinc-950 uppercase">
                    <span>AI/ML</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>GENAI</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>COMPUTER VISION</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>PYTHON</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                    <span>AGENTIC AI</span>
                    <span className="mx-3 text-zinc-950 font-black">•</span>
                  </Marquee>
                </div>
              </div>

              {/* Ultra-Sleek Avatar Core & Concentric Marvel Arc Reactor Orbit */}
              <div className="relative group cursor-pointer z-30 my-3 flex items-center justify-center">
                {/* Concentric Marvel Arc Reactor & Avengers Orbit - Centered mathematically on Avatar Image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] pointer-events-none z-[10] select-none flex items-center justify-center opacity-25 dark:opacity-30 transition-opacity duration-500">
                  <div className="relative w-full h-full animate-[spin_80s_linear_infinite]">
                    <svg
                      viewBox="0 0 400 400"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full text-cyan-400/60 dark:text-cyan-400/70 drop-shadow-[0_0_10px_rgba(34,211,238,0.25)]"
                    >
                      <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 8" />
                      <circle cx="200" cy="200" r="172" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
                      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1.2" strokeDasharray="16 6" />
                      <circle cx="200" cy="200" r="128" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                      <circle cx="200" cy="200" r="105" stroke="currentColor" strokeWidth="1.2" strokeDasharray="8 12" />
                      <circle cx="200" cy="200" r="85" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />

                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                        <line
                          key={deg}
                          x1="200"
                          y1="8"
                          x2="200"
                          y2="26"
                          stroke="currentColor"
                          strokeWidth="2"
                          transform={`rotate(${deg} 200 200)`}
                        />
                      ))}

                      <g transform="translate(100, 100) scale(1)">
                        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="3" strokeDasharray="140 30" opacity="0.85" />
                        <path d="M30 115 L160 115 L145 95 L25 95 Z" fill="currentColor" opacity="0.8" />
                        <polygon points="155,90 185,105 155,120" fill="currentColor" />
                        <polygon points="98,35 118,35 142,145 122,145 114,105 92,105 95,95 112,95 106,62 86,145 68,145" fill="currentColor" />
                      </g>
                    </svg>
                  </div>
                  <div className="absolute inset-10 rounded-full bg-cyan-500/10 dark:bg-cyan-400/12 blur-xl pointer-events-none" />
                </div>

                {/* Gradient Ring & Photo */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse" />
                <div className="relative h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.35)] bg-slate-950 z-20">
                  <Image
                    src="/avatars/vivek.jpg"
                    alt="Vivek Hingu"
                    fill
                    sizes="(max-width: 640px) 112px, 160px"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                    priority
                  />
                </div>
                {/* Verified AI Pulse Indicator */}
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-md z-30">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
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
                <span className="whitespace-pre-wrap text-center font-semibold leading-none text-muted-foreground text-xs sm:text-sm py-[0.5]">
                  {status}
                </span>
              </ShimmerButton>

              {/* Visitor Badge below avatar */}
              <div className="mt-2 flex justify-center">
                <VisitorBadge />
              </div>
            </div>

            {/* Identity & Actions directly below Image */}
            <div className="w-full space-y-3 sm:space-y-4 pt-4 sm:pt-6 text-center z-30">
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