"use client";
import React, { JSX, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../theme-toggle";
import { useTheme } from "next-themes";
import { AnimatedLogo } from "../ui/logo-animation"
import { useTransitionRouter } from "next-view-transitions";
import { CommandPaletteButton } from "../command-palette/command-palette-button";
import { IconBrandGithub, IconStar } from "@tabler/icons-react";
import { useGitHubStars } from "@/hooks/useGitHubStars";

const FALLBACK_REPO_URL = "https://github.com/thatvivekhingu/thatvivekhingu-PFL";
// import Link from "next/link";
// import Image from "next/image";


export const Navbar = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: starsData } = useGitHubStars();
  const repoUrl = starsData?.url ?? FALLBACK_REPO_URL;
  const stars = starsData?.stars ?? 0;
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const router = useTransitionRouter();


  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (current) => {

    if (typeof current === "number") {
      const previous = scrollY.getPrevious();
      const direction = previous !== undefined ? current - previous : 0;

      if (current < 50) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

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

  const handleLogoClick = () => {
    router.push("/"); // Navigate to the home page
  };



  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className={cn(
            "fixed top-3 sm:top-5 inset-x-0 mx-auto w-[92%] sm:w-auto max-w-4xl z-[5000] flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 rounded-full border border-white/15 dark:border-white/10 bg-background/60 dark:bg-zinc-950/70 backdrop-blur-xl shadow-2xl shadow-black/20 transition-all duration-300",
            className
          )}
        >
          {/* Logo on the left */}
          <div className="flex items-center">
            {mounted && (
              <AnimatedLogo
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:scale-110 transition-transform"
                onClick={handleLogoClick}
              />
            )}
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((navItem, idx) => (
              <button
                key={`link=${idx}`}
                onClick={() => handleNavClick(navItem.link)}
                className={cn(
                  "relative px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block">{navItem.name}</span>
              </button>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="hidden sm:inline-block h-4 w-px bg-border/60"
            />
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Star this site on GitHub`}
              className="group inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/50 px-3 py-1 text-xs font-semibold text-amber-400 dark:text-amber-300 transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
            >
              <IconBrandGithub className="h-3.5 w-3.5" />
              <span className="flex items-center gap-1 tabular-nums">
                <IconStar className="h-3 w-3 fill-amber-400 text-amber-400 transition-transform group-hover:scale-125" />
                <span>{stars > 0 ? stars : 1}</span>
              </span>
            </a>
            <CommandPaletteButton />
            <ModeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};