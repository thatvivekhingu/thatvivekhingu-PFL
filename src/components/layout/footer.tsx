"use client";

import Image from "next/image";
import {
  IconSend,
  IconStar,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandInstagram,
  IconRss,
  IconRotate,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { AnimatedLogo } from "@/components/ui/logo-animation";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { playTapSound } from "@/lib/sound";

const FALLBACK_REPO_URL = "https://github.com/thatvivekhingu/thatvivekhingu-PFL";

// Accent themes for the editorial manga volume
const ACCENT_THEMES = [
  { id: "crimson", name: "Crimson", hex: "#B92B27", border: "border-red-600", bg: "bg-[#B92B27]" },
  { id: "blue", name: "Cobalt Blue", hex: "#2563EB", border: "border-blue-600", bg: "bg-[#2563EB]" },
  { id: "emerald", name: "Emerald", hex: "#10B981", border: "border-emerald-600", bg: "bg-[#10B981]" },
  { id: "amber", name: "Amber", hex: "#F59E0B", border: "border-amber-600", bg: "bg-[#F59E0B]" },
];

export const Footer = () => {
  const pathname = usePathname();
  const [sent, setSent] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [activeAccent, setActiveAccent] = useState(ACCENT_THEMES[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isUnmasked, setIsUnmasked] = useState(false);
  const [isSquinting, setIsSquinting] = useState(false);
  const [isSpideyHovered, setIsSpideyHovered] = useState(false);

  // 3D tilt tracking for manga book
  const bookCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 6, y: -14 });

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { data: starsData, refetch: refetchStars } = useGitHubStars();
  const repoUrl = starsData?.url ?? FALLBACK_REPO_URL;
  const stars = starsData?.stars ?? 21;

  useEffect(() => {
    setMounted(true);
    const blinkInterval = setInterval(() => {
      setIsSquinting(true);
      setTimeout(() => setIsSquinting(false), 300);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bookCardRef.current || !motionEnabled) return;
    const rect = bookCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 6, y: -14 });
  };

  const handleBookClick = () => {
    playTapSound("pop");
    setIsFlipped(!isFlipped);
  };

  const handleSendClick = () => {
    if (sent) return;
    setSent(true);
    playTapSound("pop");
    window.setTimeout(() => setSent(false), 1200);
  };

  const handleNavClick = (link: string) => {
    if (link.startsWith("/")) {
      router.push(link);
      return;
    }
    if (window.location.pathname !== "/") {
      router.push(`/#${link}`);
      return;
    }
    const section = document.getElementById(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => router.push("/");

  if (pathname === "/gujjuverse") {
    return null;
  }

  const navLinks = [
    { name: "Home", link: "hero" },
    { name: "Projects", link: "projects" },
    { name: "Achievements", link: "achievements" },
    { name: "Education", link: "experience" },
    { name: "Resume", link: "/resume" },
    { name: "GujjuVerse", link: "/gujjuverse" },
  ];

  const connectLinks = [
    {
      label: "Email",
      href: "mailto:hinguvivek05@gmail.com",
      icon: <IconMail className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/thatvivekhingu/",
      icon: <IconBrandLinkedin className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />,
    },
    {
      label: "GitHub",
      href: "https://github.com/thatvivekhingu",
      icon: <IconBrandGithub className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/thatvivekhingu",
      icon: <IconBrandInstagram className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />,
    },
    {
      label: "RSS",
      href: "/feed.xml",
      icon: <IconRss className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />,
    },
  ];

  return (
    <footer className="relative w-full bg-[#121212] text-neutral-200 overflow-hidden border-t border-white/5 select-none">
      {/* ============================================================== */}
      {/* 1. TOP EDITORIAL CREAM BAR (#EAE6DF) */}
      {/* ============================================================== */}
      <div className="w-full bg-[#ECE7DC] border-b border-black/15 text-black px-4 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between z-20 relative">
        {/* Left: Square dark badge with "VH" monogram */}
        <div
          onClick={handleLogoClick}
          className="w-8 h-8 bg-black text-[#ECE7DC] flex items-center justify-center font-black text-xs tracking-widest font-sans cursor-pointer hover:scale-105 transition-transform shadow-sm rounded-[2px]"
          title="Vivek Hingu"
        >
          VH
        </div>

        {/* Center: Numbered monospace navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] font-bold tracking-wider text-black/75">
          <button
            onClick={() => handleNavClick("projects")}
            className="hover:text-black hover:underline underline-offset-4 transition-all"
          >
            02 WORK
          </button>
          <button
            onClick={() => handleNavClick("experience")}
            className="hover:text-black hover:underline underline-offset-4 transition-all"
          >
            03 STACK
          </button>
          <button
            onClick={() => handleNavClick("hero")}
            className="hover:text-black hover:underline underline-offset-4 transition-all"
          >
            04 ABOUT
          </button>
          <a
            href="mailto:hinguvivek05@gmail.com"
            className="hover:text-black hover:underline underline-offset-4 transition-all"
          >
            05 CONTACT
          </a>
          <button
            onClick={() => handleNavClick("/gujjuverse")}
            className="hover:text-black hover:underline underline-offset-4 transition-all"
          >
            06 GUJJUVERSE
          </button>
        </nav>

        {/* Right: Interactive Accent Color Switcher & Motion Toggle Pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Accent Color Dots */}
          <div className="flex items-center gap-1.5 bg-black/5 px-2 py-1 rounded-full border border-black/10">
            {ACCENT_THEMES.map((theme) => {
              const isActive = activeAccent.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    playTapSound("pop");
                    setActiveAccent(theme);
                  }}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive ? "scale-125 ring-2 ring-black ring-offset-1" : "opacity-70 hover:opacity-100 hover:scale-110"
                  }`}
                  style={{ backgroundColor: theme.hex }}
                  title={`Theme: ${theme.name}`}
                  aria-label={`Switch accent to ${theme.name}`}
                />
              );
            })}
          </div>

          {/* MOTION ON / OFF Toggle Pill */}
          <button
            type="button"
            onClick={() => {
              playTapSound("pop");
              setMotionEnabled((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/20 bg-black/5 hover:bg-black/10 text-[10px] font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer"
            title="Toggle Animations"
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                motionEnabled ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
              }`}
            />
            <span className="text-black">
              MOTION {motionEnabled ? "ON" : "OFF"}
            </span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. UPPER CTA & SIGNATURE ELEMENTS (Dark Matte Background #121212) */}
      {/* ============================================================== */}
      <div className="relative pt-14 pb-8 sm:pt-20 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Top-Right Hanging Spider-Man Suspended by Web Line */}
        <div
          className="absolute top-0 right-4 sm:right-10 md:right-16 z-30 pointer-events-auto cursor-pointer"
          onMouseEnter={() => setIsSpideyHovered(true)}
          onMouseLeave={() => setIsSpideyHovered(false)}
          onClick={() => {
            playTapSound("chime");
            setIsUnmasked((prev) => !prev);
          }}
          title={isUnmasked ? "Put Spider Mask back on" : "Click Spider-Man to Unmask Vivek!"}
        >
          {/* Subtle Ceiling Anchor Point */}
          <div className="w-3.5 h-1.5 bg-neutral-600 rounded-b-sm mx-auto shadow-sm" />

          {/* Hanging Web Strand with Pendulum Swing */}
          <motion.div
            animate={
              motionEnabled
                ? {
                    rotate: [-3.5, 3.5, -3.5],
                    transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
                  }
                : { rotate: 0 }
            }
            style={{ transformOrigin: "top center" }}
            className="flex flex-col items-center"
          >
            {/* The Web Line */}
            <div className="w-0.5 h-16 sm:h-20 bg-gradient-to-b from-neutral-400 via-neutral-200 to-white shadow-[0_0_4px_rgba(255,255,255,0.7)] relative">
              <span className="absolute top-1/2 -left-0.5 w-1.5 h-1.5 rounded-full bg-white opacity-80" />
            </div>

            {/* Inverted Hanging Spider-Man Mascot */}
            <div className="relative -mt-1 flex flex-col items-center">
              {/* Hands holding web line */}
              <div className="flex items-center gap-0.5 -mb-1 z-10">
                <div className="w-2.5 h-2 rounded-full bg-red-600 border border-red-950 shadow-sm transform -rotate-12" />
                <div className="w-2.5 h-2 rounded-full bg-red-600 border border-red-950 shadow-sm transform rotate-12" />
              </div>

              {/* Spider-Man Character / Mask / Avatar */}
              <div className="relative w-14 h-18 sm:w-16 sm:h-20 drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]">
                {isUnmasked ? (
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full overflow-hidden border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)] rotate-180 transition-transform">
                    <Image
                      src="/avatars/vivek.jpg"
                      alt="Unmasked Vivek"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <svg viewBox="0 0 120 150" className="w-full h-full overflow-visible">
                    <defs>
                      <filter id="spideyEyeGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="0" floodColor="#ffffff" floodOpacity="0.9" stdDeviation="2.5" />
                        <feDropShadow dx="0" dy="0" floodColor="#38bdf8" floodOpacity="0.5" stdDeviation="5" />
                      </filter>
                      <linearGradient id="suitCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="50%" stopColor="#e11d48" />
                        <stop offset="100%" stopColor="#881337" />
                      </linearGradient>
                      <linearGradient id="suitNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e3a8a" />
                        <stop offset="100%" stopColor="#090d16" />
                      </linearGradient>
                    </defs>

                    {/* Inverted Bent Legs */}
                    <g>
                      <path d="M 42 36 C 22 22 28 6 44 14 C 52 18 56 26 52 38 Z" fill="url(#suitNavy)" stroke="#0f172a" strokeWidth="1.5" />
                      <path d="M 34 16 Q 26 8 36 2 Q 44 4 42 14 Z" fill="url(#suitCrimson)" stroke="#881337" strokeWidth="1.2" />
                      <path d="M 78 36 C 98 22 92 6 76 14 C 68 18 64 26 68 38 Z" fill="url(#suitNavy)" stroke="#0f172a" strokeWidth="1.5" />
                      <path d="M 86 16 Q 94 8 84 2 Q 76 4 78 14 Z" fill="url(#suitCrimson)" stroke="#881337" strokeWidth="1.2" />
                    </g>

                    {/* Arms Holding Web */}
                    <path d="M 44 48 C 36 34 46 16 54 8 L 57 11 C 51 18 44 32 50 48 Z" fill="url(#suitCrimson)" stroke="#881337" strokeWidth="1.2" />
                    <path d="M 76 48 C 84 34 74 16 66 8 L 63 11 C 69 18 76 32 70 48 Z" fill="url(#suitCrimson)" stroke="#881337" strokeWidth="1.2" />

                    {/* Torso */}
                    <path d="M 44 36 Q 60 30 76 36 L 79 72 Q 60 78 41 72 Z" fill="url(#suitCrimson)" stroke="#881337" strokeWidth="1.5" />
                    <path d="M 44 36 L 41 72 Q 47 67 49 50 Z" fill="url(#suitNavy)" />
                    <path d="M 76 36 L 79 72 Q 73 67 71 50 Z" fill="url(#suitNavy)" />

                    {/* Chest Spider Emblem */}
                    <ellipse cx="60" cy="52" rx="3" ry="5" fill="#020617" />
                    <path d="M 58 48 Q 50 42 47 47 M 62 48 Q 70 42 73 47 M 57 52 Q 48 51 45 56 M 63 52 Q 72 51 75 56 M 57 55 Q 49 61 47 66 M 63 55 Q 71 61 73 66" stroke="#020617" strokeWidth="1.2" fill="none" />

                    {/* Inverted Head Mask */}
                    <path d="M 34 72 C 30 92 37 132 60 142 C 83 132 90 92 86 72 C 77 66 43 66 34 72 Z" fill="url(#suitCrimson)" stroke="#881337" strokeWidth="2" />
                    <path d="M 60 98 L 60 142 M 60 98 L 38 126 M 60 98 L 82 126 M 60 98 L 33 96 M 60 98 L 87 96 M 60 98 L 40 70 M 60 98 L 80 70" stroke="#4c0519" strokeWidth="1" opacity="0.7" />
                    <path d="M 46 86 Q 60 82 74 86 M 40 106 Q 60 98 80 106 M 45 124 Q 60 116 75 124" stroke="#4c0519" strokeWidth="1" fill="none" opacity="0.7" />

                    {/* Expressive Eyes / Lenses */}
                    <g>
                      <path d={isSquinting ? "M 39 96 Q 51 92 56 102 Q 48 106 39 96 Z" : isSpideyHovered ? "M 37 93 Q 51 86 58 103 Q 48 111 37 93 Z" : "M 38 94 Q 51 88 57 103 Q 48 110 38 94 Z"} fill="#020617" stroke="#020617" strokeWidth="2" />
                      <path d={isSquinting ? "M 41 96 Q 50 93 54 101 Q 48 104 41 96 Z" : isSpideyHovered ? "M 39 94 Q 50 88 56 102 Q 48 109 39 94 Z" : "M 40 95 Q 50 89 55 102 Q 48 108 40 95 Z"} fill="#ffffff" filter="url(#spideyEyeGlow)" />
                      <path d={isSquinting ? "M 81 96 Q 69 92 64 102 Q 72 106 81 96 Z" : isSpideyHovered ? "M 83 93 Q 69 86 62 103 Q 72 111 83 93 Z" : "M 82 94 Q 69 88 63 103 Q 72 110 82 94 Z"} fill="#020617" stroke="#020617" strokeWidth="2" />
                      <path d={isSquinting ? "M 79 96 Q 70 93 66 101 Q 72 104 79 96 Z" : isSpideyHovered ? "M 81 94 Q 70 88 64 102 Q 72 109 81 94 Z" : "M 80 95 Q 70 89 65 102 Q 72 108 80 95 Z"} fill="#ffffff" filter="url(#spideyEyeGlow)" />
                    </g>
                  </svg>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Centered Heading + Buttons */}
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white tracking-tight">
            Say{" "}
            <span className="font-script font-normal text-[1.1em] text-white">
              hello
            </span>
            .{" "}
            <span
              className={`inline-block origin-bottom-right ${
                motionEnabled ? "animate-wiggle" : ""
              }`}
            >
              👋
            </span>
          </h2>

          <div className="flex flex-col items-center gap-4">
            {/* White Contact Me Button */}
            <a
              href="mailto:hinguvivek05@gmail.com"
              onClick={handleSendClick}
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <motion.span
                animate={sent && motionEnabled ? { rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <IconSend className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.span>
              <span>Contact Me</span>
            </a>

            {/* Gujarati Star Counter Pill */}
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playTapSound("pop");
                setTimeout(refetchStars, 1500);
              }}
              aria-label="Star this site's repository on GitHub"
              className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-all shadow-sm hover:border-neutral-500"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors shrink-0" />
              <span className="tracking-tight whitespace-nowrap">
                એક કામ કર, સ્ટાર આપતો જા... બપોરની ચા મારી તરફથી ☕
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 group-hover:bg-amber-500/20 shrink-0 font-mono">
                <IconStar className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span>{stars}</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. MAIN HERO SPLIT SECTION (END OF VOLUME 01 + 3D MANGA BOOK) */}
      {/* ============================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Side: Bold Display Typography (NO red stamp) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="font-[family-name:var(--font-anton)] text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[104px] text-[#ECE7DC] tracking-tight leading-[0.88] uppercase select-none">
              END OF VOLUME 01
            </h2>
          </div>

          {/* Right Side: Interactive 3D Manga Book Mockup (Click to Flip!) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <div
              ref={bookCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleBookClick}
              className="relative group cursor-pointer [perspective:1400px]"
              title="Click to flip manga volume!"
            >
              {/* Background 4-pointed silver star sparkle */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 pointer-events-none select-none text-neutral-700/50 z-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                >
                  <path d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z" />
                </svg>
              </div>

              {/* 3D Tilted & Flippable Book Container */}
              <motion.div
                animate={{
                  rotateX: motionEnabled ? tilt.x : 0,
                  rotateY: isFlipped ? 180 : motionEnabled ? tilt.y : 0,
                }}
                transition={{
                  duration: isFlipped ? 0.7 : 0.25,
                  ease: isFlipped ? [0.23, 1, 0.32, 1] : "easeOut",
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="relative z-10 w-[270px] sm:w-[300px] md:w-[325px] aspect-[1/1.42] rounded-[4px] shadow-[12px_14px_0px_var(--accent-color,#B92B27),18px_22px_0px_#171717,26px_32px_45px_rgba(0,0,0,0.85)] transition-shadow duration-300"
              >
                {/* --- FRONT COVER --- */}
                <div
                  className="absolute inset-0 w-full h-full rounded-[4px] bg-[#FAF9F5] text-black border-2 border-black p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden [backface-visibility:hidden]"
                  style={{
                    backgroundColor: "#FAF9F5",
                  }}
                >
                  {/* Spine Strip on Left Edge (Color bound to active accent) */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-3.5 border-r-2 border-black flex flex-col justify-between py-4 items-center transition-colors duration-300"
                    style={{ backgroundColor: activeAccent.hex }}
                  >
                    <div className="w-1 h-6 bg-white/40 rounded-full" />
                    <div className="w-1 h-6 bg-white/40 rounded-full" />
                    <div className="w-1 h-6 bg-white/40 rounded-full" />
                  </div>

                  {/* Front Cover Inside Content */}
                  <div className="pl-3.5 flex flex-col justify-between h-full">
                    {/* Top Header */}
                    <div className="flex items-start justify-between">
                      {/* Monogram VH badge */}
                      <div className="bg-black text-white px-2.5 py-1 text-xs font-black tracking-widest uppercase rounded-[2px] font-sans shadow-sm">
                        VH
                      </div>

                      {/* VOL. 01 & Builder Box */}
                      <div className="flex flex-col items-end">
                        <span className="font-[family-name:var(--font-anton)] text-sm tracking-wider uppercase text-black">
                          VOL. 01
                        </span>
                        <div className="mt-1 border border-black/80 px-1.5 py-0.5 text-[8px] font-bold leading-tight uppercase tracking-tight text-center bg-white/95 shadow-sm">
                          AI/ML<br />ENGINEER<br />&amp; BUILDER
                        </div>
                      </div>
                    </div>

                    {/* Manga Halftone & Ink Framed Portrait */}
                    <div className="relative my-2 w-full aspect-square rounded-md border-2 border-black overflow-hidden bg-white shadow-inner flex items-center justify-center">
                      {/* Halftone Manga Rays Background */}
                      <div
                        className="absolute inset-0 opacity-25 pointer-events-none"
                        style={{
                          backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
                          backgroundSize: "6px 6px",
                        }}
                      />
                      {/* Comic Radial Speed Lines */}
                      <svg
                        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
                        viewBox="0 0 100 100"
                      >
                        <circle cx="50" cy="50" r="48" fill="none" stroke="#000" strokeWidth="0.5" strokeDasharray="1,2" />
                        <line x1="0" y1="0" x2="100" y2="100" stroke="#000" strokeWidth="0.5" />
                        <line x1="100" y1="0" x2="0" y2="100" stroke="#000" strokeWidth="0.5" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke="#000" strokeWidth="0.5" />
                        <line x1="0" y1="50" x2="100" y2="50" stroke="#000" strokeWidth="0.5" />
                      </svg>

                      {/* Vivek Ink Manga Art */}
                      <div className="relative w-full h-full">
                        <Image
                          src="/avatars/vivek.jpg"
                          alt="Vivek Hingu Manga Illustration"
                          fill
                          sizes="320px"
                          priority
                          className="object-cover object-center filter grayscale contrast-[185%] brightness-[105%]"
                        />
                      </div>
                    </div>

                    {/* Bottom Full-Width Anton Banner */}
                    <div className="pt-1 text-center">
                      <h3 className="font-[family-name:var(--font-anton)] text-3xl sm:text-4xl text-black tracking-tight leading-none uppercase">
                        VIVEK HINGU
                      </h3>
                    </div>
                  </div>
                </div>

                {/* --- BACK COVER (SYNOPSIS & SPECS) --- */}
                <div
                  className="absolute inset-0 w-full h-full rounded-[4px] bg-[#FAF9F5] text-black border-2 border-black p-4 flex flex-col justify-between overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]"
                  style={{ backgroundColor: "#FAF9F5" }}
                >
                  {/* Spine Strip on Right Edge when flipped */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-3.5 border-l-2 border-black flex flex-col justify-between py-4 items-center transition-colors duration-300"
                    style={{ backgroundColor: activeAccent.hex }}
                  >
                    <div className="w-1 h-6 bg-white/40 rounded-full" />
                    <div className="w-1 h-6 bg-white/40 rounded-full" />
                    <div className="w-1 h-6 bg-white/40 rounded-full" />
                  </div>

                  {/* Back Cover Inside Content */}
                  <div className="pr-3.5 flex flex-col justify-between h-full">
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between border-b border-black/20 pb-1.5 mb-2">
                        <span className="font-[family-name:var(--font-anton)] text-xs tracking-wider uppercase text-black">
                          VIVEK HINGU • VOL. 01
                        </span>
                        <span className="font-mono text-[9px] font-bold text-neutral-600">
                          EDITION 2026
                        </span>
                      </div>

                      {/* Manga Synopsis */}
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-black mb-1">
                        SYNOPSIS: THE AI ARCHITECT
                      </h4>
                      <p className="text-[10px] sm:text-[11px] leading-relaxed text-neutral-700 italic border-l-2 border-black/60 pl-2 mb-3">
                        &quot;From training deep neural networks to engineering real-time voice intelligence, Vivek Hingu documents his journey across the frontier of Applied Artificial Intelligence.&quot;
                      </p>

                      {/* Specifications Box */}
                      <div className="bg-black/5 rounded p-2 border border-black/15 text-[9px] sm:text-[10px] font-mono flex flex-col gap-1 text-neutral-800">
                        <div className="flex items-center gap-1.5">
                          <span className="text-black font-bold">▶ PRODUCTION:</span>
                          <span>10+ Autonomous AI Systems</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-black font-bold">▶ CORE STACK:</span>
                          <span>PyTorch, Next.js, LLMs, Voice</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-black font-bold">▶ HONORS:</span>
                          <span>2x Hackathon Finalist</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Barcode & ISBN */}
                    <div className="border-t border-black/20 pt-2 flex items-end justify-between">
                      <div className="flex flex-col">
                        {/* Realistic Monospace Barcode */}
                        <div className="font-mono text-sm tracking-tighter leading-none select-none text-black">
                          |||| ||| || |||||| | |||| ||
                        </div>
                        <span className="font-mono text-[8px] text-neutral-600 mt-0.5">
                          ISBN 978-0-123456-78-9
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                        MADE IN GUJARAT
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Dynamic CSS Variable for Accent Shadow */}
              <style jsx global>{`
                :root {
                  --accent-color: ${activeAccent.hex};
                }
              `}</style>
            </div>

            {/* Click to Flip Instruction Hint */}
            <button
              type="button"
              onClick={handleBookClick}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700/80 text-[10px] font-mono text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
            >
              <IconRotate className="w-3.5 h-3.5 text-neutral-400" />
              <span>{isFlipped ? "Click to view Front Cover" : "Click book to flip Synopsis ↺"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. BOTTOM FOOTER COLUMNS & COPYRIGHT BAR (Original Structure) */}
      {/* ============================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pb-10">
          {/* Column 1: Bio */}
          <div className="flex flex-col items-start">
            <div
              onClick={handleLogoClick}
              className="w-10 h-10 rounded-full border border-amber-500/40 bg-neutral-950 p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer hover:scale-105 transition-transform"
            >
              {mounted && (
                <AnimatedLogo
                  theme={resolvedTheme === "dark" ? "dark" : "light"}
                  className="w-7 h-7"
                />
              )}
            </div>
            <p className="text-sm font-semibold tracking-tight text-white mt-3.5">
              Vivek Hingu
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-[260px] mt-2">
              AI/ML Engineer, building intelligent products, predictive models, and voice AI systems.
            </p>
          </div>

          {/* Column 2: Navigate */}
          <div className="flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3.5">
              NAVIGATE
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.link)}
                    className="text-sm text-neutral-400 hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3.5">
              CONNECT
            </h3>
            <ul className="flex flex-col gap-2.5">
              {connectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar Separated by Subtle Border */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center border-t border-white/10 pt-6">
          <p className="text-xs text-neutral-400 leading-none">
            &copy; {new Date().getFullYear()} Vivek Hingu. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400 leading-none">
            Crafted with ❤️ by Vivek Hingu
          </p>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <Image
        src="/layout/background-ellipse3.svg"
        alt=""
        fill={false}
        width={100}
        height={900}
        className="absolute bottom-0 blur-md left-1/2 transform -translate-x-1/2 translate-y-3/5 w-auto z-0 pointer-events-none select-none opacity-30"
        aria-hidden="true"
      />
    </footer>
  );
};
