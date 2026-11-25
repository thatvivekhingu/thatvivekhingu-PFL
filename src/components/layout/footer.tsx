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
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { AnimatedLogo } from "@/components/ui/logo-animation";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { playTapSound } from "@/lib/sound";

const FALLBACK_REPO_URL = "https://github.com/thatvivekhingu/thatvivekhingu-PFL";

export const Footer = () => {
  const pathname = usePathname();
  const [sent, setSent] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { data: starsData, refetch: refetchStars } = useGitHubStars();
  const repoUrl = starsData?.url ?? FALLBACK_REPO_URL;
  const stars = starsData?.stars ?? 21;

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <footer className="relative w-full bg-[#0D0E11] text-neutral-200 overflow-hidden pt-12 sm:pt-16 pb-8 border-t border-white/5">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Centered CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 mb-16 sm:mb-20">
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

          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              playTapSound("pop");
              setTimeout(refetchStars, 1500);
            }}
            aria-label="Star repository on GitHub"
            className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 py-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-700/70 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-all duration-300 hover:border-neutral-500 shadow-sm"
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

        {/* Centerpiece Area: Left content (END OF VOLUME 01 + 3 Columns) & Right content (Manga Book) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start mb-16">
          {/* Left Column (spans 8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Giant Title */}
            <h2 className="font-[family-name:var(--font-anton)] text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] text-[#ECE7DC] tracking-tight leading-[0.9] uppercase select-none mb-12 sm:mb-16">
              END OF VOLUME 01
            </h2>

            {/* 3-Column Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 pt-4">
              {/* Col 1: Bio */}
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

              {/* Col 2: Navigate */}
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

              {/* Col 3: Connect */}
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

          {/* Right Column (spans 4 cols on desktop): Tilted 3D Manga Volume Book */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end pt-4 lg:pt-0">
            <div className="relative group [perspective:1400px]">
              {/* Background 4-pointed silver star sparkle */}
              <div className="absolute -bottom-8 -right-8 w-20 h-20 pointer-events-none select-none text-neutral-700/60 z-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]"
                >
                  <path d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z" />
                </svg>
              </div>

              {/* 3D Tilted Manga Book Card */}
              <div
                className="relative z-10 w-[270px] sm:w-[300px] md:w-[320px] aspect-[1/1.42] rounded-[3px] bg-[#FAF9F5] text-black border-2 border-black p-3.5 sm:p-4 flex flex-col justify-between select-none transition-all duration-500 ease-out shadow-[12px_14px_0px_#B4101C,16px_18px_0px_#171717,24px_30px_45px_rgba(0,0,0,0.85)] [transform:rotate(6deg)_rotateY(-14deg)_rotateX(6deg)] group-hover:[transform:rotate(2deg)_rotateY(-6deg)_rotateX(2deg)_scale(1.02)]"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Red Spine Band on Left Edge */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#B4101C] border-r-2 border-black flex flex-col justify-between py-4 items-center">
                  <div className="w-1 h-6 bg-white/40 rounded-full" />
                  <div className="w-1 h-6 bg-white/40 rounded-full" />
                  <div className="w-1 h-6 bg-white/40 rounded-full" />
                </div>

                {/* Book Cover Content */}
                <div className="pl-3 flex flex-col justify-between h-full">
                  {/* Top Header */}
                  <div className="flex items-start justify-between">
                    {/* VH Badge */}
                    <div className="bg-black text-white px-2.5 py-1 text-xs font-black tracking-widest uppercase rounded-[2px] font-sans shadow-sm">
                      VH
                    </div>

                    {/* VOL. 01 & Builder Box */}
                    <div className="flex flex-col items-end">
                      <span className="font-[family-name:var(--font-anton)] text-sm tracking-wider uppercase text-black">
                        VOL. 01
                      </span>
                      <div className="mt-1 border border-black/80 px-1.5 py-0.5 text-[8px] font-bold leading-tight uppercase tracking-tight text-center bg-white/90">
                        AI/ML<br />ENGINEER<br />&amp; BUILDER
                      </div>
                    </div>
                  </div>

                  {/* Center Manga Comic Framed Illustration */}
                  <div className="relative my-2 w-full aspect-square rounded-md border-2 border-black overflow-hidden bg-white shadow-inner flex items-center justify-center">
                    {/* Halftone Dot Pattern */}
                    <div
                      className="absolute inset-0 opacity-25 pointer-events-none"
                      style={{
                        backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
                        backgroundSize: "6px 6px",
                      }}
                    />

                    {/* Vivek Manga Portrait */}
                    <div className="relative w-full h-full">
                      <Image
                        src="/avatars/vivek.jpg"
                        alt="Vivek Hingu Manga Illustration"
                        fill
                        sizes="320px"
                        priority
                        className="object-cover object-center filter grayscale contrast-[180%] brightness-[105%]"
                      />
                    </div>
                  </div>

                  {/* Bottom Giant Anton Banner */}
                  <div className="pt-1 text-center">
                    <h3 className="font-[family-name:var(--font-anton)] text-3xl sm:text-4xl text-black tracking-tight leading-none uppercase">
                      VIVEK HINGU
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center border-t border-white/10 pt-6">
          <p className="text-xs text-neutral-400 leading-none">
            &copy; {new Date().getFullYear()} Vivek Hingu. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400 leading-none">
            Crafted with ❤️ by Vivek Hingu
          </p>
        </div>
      </div>

      <Image
        src="/layout/background-ellipse3.svg"
        alt=""
        fill={false}
        width={100}
        height={900}
        className="absolute bottom-0 blur-md left-1/2 transform -translate-x-1/2 translate-y-3/5 w-auto z-0 pointer-events-none select-none opacity-40"
        aria-hidden="true"
      />
    </footer>
  );
};
