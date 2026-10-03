"use client";

import React, { useRef, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShimmerBorder } from "@/components/ui/shimmer-border";
import { IconArrowRight, IconFileText } from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { AnimatedName } from "@/components/ui/animated-name";
import { VisitorBadge } from "@/components/ui/visitor-badge";
import { ResumeModal } from "@/components/ui/resume-modal";
import { Marquee } from "@/components/ui/marquee";
import { IdLanyardBadge } from "@/components/ui/id-lanyard-badge";
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
    <div className="w-full min-h-[calc(100vh-4rem)] pt-20 sm:pt-28 pb-4 relative flex flex-col justify-between overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />

      <TooltipProvider>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* LEFT COLUMN: Recruiter Hook (Headline, Role, CTAs, Contact Icons) */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5">
              {/* Status Badge */}
              <BlurFade delay={0.01} inView>
                <ShimmerButton onClick={handleShimmerButtonClick} className="z-50">
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
              </BlurFade>

              {/* Headline */}
              <BlurFade delay={0.02} inView>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight select-none">
                  <span className="text-foreground">Hi, I&#39;m </span>
                  <AnimatedName className="inline-block" />
                </h1>
              </BlurFade>

              {/* Subtitle */}
              <BlurFade delay={0.03} inView>
                <p className="text-base sm:text-lg lg:text-xl font-medium tracking-tight text-muted-foreground max-w-xl">
                  AI/ML Engineer & Full-Stack Developer specializing in{" "}
                  <span className="text-sky-400 font-semibold underline decoration-sky-500/40 underline-offset-4">
                    autonomous agents
                  </span>
                  , neural systems, and high-performance intelligent software.
                </p>
              </BlurFade>

              {/* Action Buttons & Contact Icons */}
              <BlurFade delay={0.04} inView>
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
                  {/* View Projects CTA */}
                  <a
                    ref={ctaRef}
                    onMouseMove={handleCtaMove}
                    onClick={() => playTapSound("pop")}
                    href="#projects"
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-sky-400/40 bg-sky-500/10 hover:bg-sky-500/20 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-bold text-foreground transition-all hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] w-full sm:w-auto"
                  >
                    <span className="relative">View Projects</span>
                    <IconArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-sky-400" />
                    <ShimmerBorder />
                  </a>

                  {/* Resume Modal CTA */}
                  <button
                    ref={resumeBtnRef}
                    onMouseMove={handleResumeMove}
                    onClick={() => {
                      playTapSound("chime");
                      setIsResumeOpen(true);
                    }}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-border/70 bg-background/60 hover:bg-background backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-bold text-foreground transition-all hover:border-border hover:shadow-lg w-full sm:w-auto"
                  >
                    <IconFileText className="relative h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative">Download Resume</span>
                    <ShimmerBorder />
                  </button>

                  {/* Social / Contact Icons */}
                  <div
                    ref={contactRef}
                    onMouseMove={handleContactMove}
                    className="group relative inline-flex items-center overflow-hidden rounded-full border border-border/60 bg-background/50 backdrop-blur-md px-3.5 py-2 transition-all hover:border-border hover:shadow-lg mt-1 sm:mt-0"
                  >
                    <div className="relative z-10">
                      <ContactIcons wiggleIcon={wiggleIcon} handleIconClick={handleIconClick} />
                    </div>
                    <ShimmerBorder />
                  </div>
                </div>
              </BlurFade>

              {/* Visitor Counter */}
              <BlurFade delay={0.05} inView>
                <div className="pt-0.5">
                  <VisitorBadge />
                </div>
              </BlurFade>
            </div>

            {/* RIGHT COLUMN: 3D Physics Lanyard ID Badge */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative pt-4 lg:pt-0">
              <BlurFade delay={0.03} inView>
                <div className="relative flex items-center justify-center">
                  {/* Subtle Concentric Tech Rings Behind Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] pointer-events-none select-none flex items-center justify-center opacity-20">
                    <div className="relative w-full h-full animate-[spin_90s_linear_infinite]">
                      <svg
                        viewBox="0 0 400 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full text-sky-400/60 drop-shadow-[0_0_8px_rgba(56,189,248,0.2)]"
                      >
                        <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 8" />
                        <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                        <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1.2" strokeDasharray="16 6" />
                      </svg>
                    </div>
                  </div>

                  {/* 3D Draggable Lanyard ID Card */}
                  <IdLanyardBadge />
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </TooltipProvider>

      {/* BOTTOM DEDICATED MARQUEE RIBBON (Zero overlapping, single direction, no half-cut words!) */}
      <div className="w-full mt-6 sm:mt-10 pointer-events-none select-none z-10 border-y border-sky-400/20 bg-gradient-to-r from-sky-950/40 via-background/90 to-sky-950/40 backdrop-blur-md py-2.5 shadow-sm">
        <Marquee repeat={6} className="[--duration:32s] py-0 text-xs sm:text-sm font-bold font-mono tracking-[0.2em] text-sky-300/80 uppercase">
          <span>AI & ML ENGINEER</span>
          <span className="mx-4 text-sky-400 font-black">•</span>
          <span>AUTONOMOUS AGENTS</span>
          <span className="mx-4 text-sky-400 font-black">•</span>
          <span>BHARATBHASHA AI</span>
          <span className="mx-4 text-sky-400 font-black">•</span>
          <span>NEURAL NETWORKS & LLMS</span>
          <span className="mx-4 text-sky-400 font-black">•</span>
          <span>FULL-STACK DEVELOPMENT</span>
          <span className="mx-4 text-sky-400 font-black">•</span>
          <span>REAL-TIME STREAMING</span>
          <span className="mx-4 text-sky-400 font-black">•</span>
          <span>HACKATHON WINNER</span>
          <span className="mx-4 text-sky-400 font-black">•</span>
        </Marquee>
      </div>

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