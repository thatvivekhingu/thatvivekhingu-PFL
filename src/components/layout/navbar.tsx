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
import { playTapSound } from "@/lib/sound";

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
  const { data: starsData, refetch: refetchStars } = useGitHubStars();
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
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-[100vw] sm:max-w-5xl w-full justify-self-center backdrop-blur-xl fixed top-0 sm:top-4 inset-x-0 mx-auto md:rounded-full dark:bg-zinc-950/85 bg-white/85 border-b sm:border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl z-[5000] px-2 sm:px-6 py-1.5 sm:py-3 items-center justify-between transition-all duration-300 overflow-visible",
            className
          )}
        >
          {/* Logo on the left */}
          <div className="flex items-center mr-1 sm:mr-8 flex-shrink-0">
            {mounted && (
              <AnimatedLogo
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                className="w-7 h-7 sm:w-12 sm:h-12 cursor-pointer flex-shrink-0"
                onClick={handleLogoClick}
              />
            )}
          </div>

          {/* Links in the center */}
          <div className="flex items-center gap-0.5 sm:gap-2 ml-auto shrink-0">
            {navItems.map((navItem, idx) => (
              <button
                key={`link=${idx}`}
                onClick={() => handleNavClick(navItem.link)}
                className={cn(
                  "relative font-extrabold text-zinc-900 dark:text-zinc-50 px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-all duration-200 cursor-pointer text-xs sm:text-sm shrink-0"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-xs sm:text-sm tracking-wide">{navItem.name}</span>
              </button>
            ))}
            <span
              aria-hidden
              className="h-4 sm:h-5 w-px self-center bg-zinc-300 dark:bg-zinc-700 shrink-0 mx-0.5"
            />
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playTapSound("pop");
                setTimeout(refetchStars, 1500);
              }}
              aria-label={`Star this site on GitHub`}
              className="group inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/80 bg-background/80 hover:bg-background hover:border-amber-500/50 px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold text-foreground transition-all shrink-0"
            >
              <IconBrandGithub className="h-3.5 w-3.5" />
              <span className="flex items-center gap-0.5 tabular-nums">
                <IconStar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500 fill-amber-500/20 group-hover:fill-amber-500 transition-colors" />
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