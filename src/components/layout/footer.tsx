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
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { AnimatedLogo } from "@/components/ui/logo-animation";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { playTapSound } from "@/lib/sound";

const FALLBACK_REPO_URL = "https://github.com/thatvivekhingu/thatvivekhingu-PFL";

export const Footer = () => {
  const pathname = usePathname();
  const [sent, setSent] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // 3D tilt tracking for manga book
  const bookCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 7, y: -22 });

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { data: starsData, refetch: refetchStars } = useGitHubStars();
  const repoUrl = starsData?.url ?? FALLBACK_REPO_URL;
  const stars = starsData?.stars ?? 21;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bookCardRef.current) return;
    const rect = bookCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    const rotateY = -22 + normX * 14;
    const rotateX = 7 - normY * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 7, y: -22 });
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

  if (pathname === "/gujjuverse" || pathname === "/music") {
    return null;
  }

  const navLinks = [
    { name: "Home", link: "hero" },
    { name: "Projects", link: "projects" },
    { name: "Achievements", link: "achievements" },
    { name: "Education", link: "experience" },
    { name: "Resume", link: "/resume" },
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
    <footer className="relative w-full bg-background text-neutral-200 overflow-hidden select-none">
      {/* ============================================================== */}
      {/* 1. UPPER CTA & SIGNATURE ELEMENTS (Seamless bg-background)      */}
      {/* ============================================================== */}
      <div className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Centered Contact Button & Gujarati Star Banner */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center gap-4">
            {/* White Contact Me Button */}
            <a
              href="mailto:hinguvivek05@gmail.com"
              onClick={handleSendClick}
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <motion.span
                animate={sent ? { rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] } : {}}
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
      {/* 2. MAIN HERO SPLIT SECTION (END OF VOLUME 01 + LINKS + 3D MANGA BOOK) */}
      {/* ============================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 pt-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Side: Bold Display Typography + 3-Column Navigation */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Bold Headline */}
            <h2 className="font-[family-name:var(--font-anton)] text-5xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[96px] text-[#ECE7DC] tracking-tight leading-[0.88] uppercase select-none mb-8 sm:mb-12">
              END OF VOLUME 01
            </h2>

            {/* 3 Columns (Bio, Navigate, Connect) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-2 border-t border-white/5">
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
                <p className="text-xs text-neutral-400 leading-relaxed max-w-[240px] mt-2">
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
          </div>

          {/* Right Side: Tactile 3D Manga Book */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative pt-8 lg:pt-0">
            {/* 3D Tilted Manga Tankōbon Book */}
            <div
              ref={bookCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleBookClick}
              className="relative group cursor-pointer [perspective:1400px] select-none my-4"
              title="Click book to inspect front / synopsis"
            >
              {/* Background 4-pointed silver star sparkle */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 pointer-events-none select-none text-neutral-700/40 z-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                >
                  <path d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z" />
                </svg>
              </div>

              {/* Soft contact ground shadow */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-10 rounded-[100%] bg-black/80 blur-xl pointer-events-none z-0 transform -rotate-1 transition-opacity duration-300 group-hover:opacity-90"
                style={{
                  boxShadow: "0 20px 40px rgba(0,0,0,0.95), 0 8px 24px rgba(185,43,39,0.3)",
                }}
              />

              {/* 3D Book Volume Container */}
              <motion.div
                animate={{
                  rotateX: tilt.x,
                  rotateY: isFlipped ? 180 : tilt.y,
                  rotateZ: isFlipped ? 3 : -4,
                }}
                transition={{
                  duration: isFlipped ? 0.7 : 0.25,
                  ease: isFlipped ? [0.23, 1, 0.32, 1] : "easeOut",
                }}
                style={{
                  transformStyle: "preserve-3d",
                  width: "280px",
                  height: "395px",
                }}
                className="relative z-10 w-[260px] sm:w-[280px] md:w-[290px] h-[366px] sm:h-[395px] md:h-[410px] transition-shadow duration-300"
              >
                {/* 1. FRONT FACE (User Artwork Cover) */}
                <div
                  style={{
                    transform: "translateZ(18px)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                  className="absolute inset-0 w-full h-full rounded-r-[3px] rounded-l-[1px] overflow-hidden bg-[#FAF9F5] shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-neutral-900/60"
                >
                  <Image
                    src="/images/manga-cover.png"
                    alt="Vivek Hingu Manga Tankobon Volume 01"
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 300px"
                    priority
                    className="object-cover object-center w-full h-full"
                  />

                  {/* Tactile Book Crease Groove near spine hinge */}
                  <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute left-[9px] top-0 bottom-0 w-[1px] bg-white/25 pointer-events-none" />

                  {/* Subtle glossy paper sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    style={{
                      background: "linear-gradient(115deg, transparent 32%, rgba(255,255,255,0.18) 46%, rgba(255,255,255,0.28) 50%, transparent 62%)",
                    }}
                  />
                </div>

                {/* 2. LEFT SPINE FACE */}
                <div
                  style={{
                    position: "absolute",
                    left: "-18px",
                    top: 0,
                    bottom: 0,
                    width: "36px",
                    height: "100%",
                    transform: "rotateY(-90deg)",
                    transformStyle: "preserve-3d",
                    background: "linear-gradient(to right, #6b1412 0%, #B92B27 25%, #d43834 50%, #B92B27 75%, #6b1412 100%)",
                    boxShadow: "inset 0 0 10px rgba(0,0,0,0.6)",
                  }}
                  className="rounded-l-[2px] flex flex-col justify-between items-center py-4 text-white overflow-hidden border-y border-black/40"
                >
                  {/* Top Spine: Monogram & Volume */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 bg-black text-[#ECE7DC] flex items-center justify-center font-black text-[9px] tracking-widest font-sans rounded-[1px] border border-white/20 shadow-sm">
                      VH
                    </div>
                    <span className="font-[family-name:var(--font-anton)] text-[10px] tracking-wider text-amber-300 mt-1">
                      01
                    </span>
                  </div>

                  {/* Center Spine: Vertical Manga Title */}
                  <div className="flex flex-col items-center justify-center my-auto">
                    <div
                      className="font-bold text-[11px] tracking-[0.22em] text-white/95 uppercase font-mono select-none"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                      }}
                    >
                      VIVEK HINGU // ARCHITECT
                    </div>
                  </div>

                  {/* Bottom Spine: Shonen Star Emblem */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center text-[7px] font-mono font-bold bg-black/40 text-amber-300">
                      ★
                    </div>
                    <span className="text-[7px] font-mono tracking-tighter text-white/70">
                      2026
                    </span>
                  </div>
                </div>

                {/* 3. RIGHT FACE: STACKED PAPER PAGES */}
                <div
                  style={{
                    position: "absolute",
                    right: "-18px",
                    top: 0,
                    bottom: 0,
                    width: "36px",
                    height: "100%",
                    transform: "rotateY(90deg)",
                    transformStyle: "preserve-3d",
                    background: "repeating-linear-gradient(to bottom, #FAF7F0 0px, #FAF7F0 2px, #E8E3D7 2px, #E8E3D7 3px)",
                    boxShadow: "inset 6px 0 12px rgba(0,0,0,0.35), inset -6px 0 12px rgba(0,0,0,0.35)",
                  }}
                  className="flex items-center justify-center overflow-hidden border-y border-black/30"
                >
                  <div className="w-[1.5px] h-[92%] bg-neutral-400/40 rounded-full" />
                </div>

                {/* 4. TOP FACE: PAGE BLOCK HEAD */}
                <div
                  style={{
                    position: "absolute",
                    top: "-18px",
                    left: 0,
                    right: 0,
                    height: "36px",
                    width: "100%",
                    transform: "rotateX(90deg)",
                    transformStyle: "preserve-3d",
                    background: "repeating-linear-gradient(to right, #FAF7F0 0px, #FAF7F0 2px, #E8E3D7 2px, #E8E3D7 3px)",
                    boxShadow: "inset 0 6px 10px rgba(0,0,0,0.3)",
                  }}
                  className="overflow-hidden border-x border-black/30 flex items-center"
                >
                  <div className="w-5 h-full bg-[#B92B27] border-r border-black/40 shadow-sm" />
                </div>

                {/* 5. BOTTOM FACE: PAGE BLOCK FOOT */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-18px",
                    left: 0,
                    right: 0,
                    height: "36px",
                    width: "100%",
                    transform: "rotateX(-90deg)",
                    transformStyle: "preserve-3d",
                    background: "repeating-linear-gradient(to right, #FAF7F0 0px, #FAF7F0 2px, #E8E3D7 2px, #E8E3D7 3px)",
                    boxShadow: "inset 0 -6px 10px rgba(0,0,0,0.35)",
                  }}
                  className="overflow-hidden border-x border-black/30"
                />

                {/* 6. BACK COVER: SYNOPSIS, BARCODE, ISBN & SPECS */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: "translateZ(-18px) rotateY(180deg)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    backgroundColor: "#FAF9F5",
                  }}
                  className="w-full h-full rounded-l-[3px] rounded-r-[1px] text-black border-2 border-black p-4 flex flex-col justify-between overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between border-b border-black/20 pb-1.5 mb-2.5">
                        <span className="font-[family-name:var(--font-anton)] text-xs tracking-wider uppercase text-black">
                          VIVEK HINGU • VOL. 01
                        </span>
                        <span className="font-mono text-[9px] font-bold text-neutral-600">
                          FIRST EDITION 2026
                        </span>
                      </div>

                      {/* Manga Synopsis */}
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-black mb-1">
                        SYNOPSIS: THE AI ARCHITECT
                      </h4>
                      <p className="text-[10px] sm:text-[11px] leading-relaxed text-neutral-700 italic border-l-2 border-[#B92B27] pl-2 mb-3">
                        &quot;From training neural networks from scratch to engineering real-time multi-agent workflows and voice intelligence, Vivek Hingu chronicles his journey across Applied AI and creative web systems.&quot;
                      </p>

                      {/* Specifications Box */}
                      <div className="bg-black/5 rounded p-2.5 border border-black/15 text-[9px] sm:text-[10px] font-mono flex flex-col gap-1.5 text-neutral-800">
                        <div className="flex items-center gap-1.5">
                          <span className="text-black font-bold">▶ PRODUCTION:</span>
                          <span>10+ Autonomous AI Systems</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-black font-bold">▶ CORE STACK:</span>
                          <span>Next.js, PyTorch, LLMs, Three.js</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-black font-bold">▶ HONORS:</span>
                          <span>Flinders AI &amp; HackOut Winner</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Barcode & ISBN */}
                    <div className="border-t border-black/20 pt-2.5 flex items-end justify-between">
                      <div className="flex flex-col">
                        <div className="font-mono text-sm tracking-tighter leading-none select-none text-black">
                          |||| ||| || |||||| | |||| ||
                        </div>
                        <span className="font-mono text-[8px] text-neutral-600 mt-1">
                          ISBN 978-0-123456-78-9
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-mono font-bold text-amber-900 bg-amber-400/30 px-1.5 py-0.5 rounded-[2px] uppercase border border-amber-500/40">
                          1 CUP OF CHAI ☕
                        </span>
                        <span className="text-[8px] font-mono font-semibold text-neutral-500 uppercase mt-0.5">
                          MADE IN GUJARAT
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Separated by Subtle Border */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center border-t border-white/10 pt-6 mt-12">
          <p className="text-xs text-neutral-400 leading-none">
            &copy; {new Date().getFullYear()} Vivek Hingu. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400 leading-none">
            Crafted with 💖 by Vivek Hingu
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
