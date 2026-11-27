"use client";
import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../theme-toggle";
import { useTransitionRouter } from "next-view-transitions";
import { CommandPaletteButton } from "../command-palette/command-palette-button";
import { IconBrandGithub, IconStar } from "@tabler/icons-react";
import { useGitHubStars } from "@/hooks/useGitHubStars";
import { playTapSound } from "@/lib/sound";
import { Magnetic } from "@/components/ui/magnetic";

const FALLBACK_REPO_URL = "https://github.com/thatvivekhingu/thatvivekhingu-PFL";
import Image from "next/image";


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

  const { data: starsData, refetch: refetchStars } = useGitHubStars();
  const repoUrl = starsData?.url ?? FALLBACK_REPO_URL;
  const stars = starsData?.stars ?? 0;
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const router = useTransitionRouter();

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
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      try {
        sessionStorage.setItem("hasSeenIntro", "true");
      } catch {}
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
            <button
              onClick={handleLogoClick}
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-zinc-700/80 hover:border-cyan-400 ring-2 ring-cyan-500/30 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md flex items-center justify-center shrink-0 cursor-pointer"
              title="Vivek Hingu"
              aria-label="Vivek Hingu Home"
            >
              <Image
                src="/avatars/pixel-avatar.png"
                alt="Vivek Hingu"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                priority
              />
            </button>
          </div>

          {/* Links in the center */}
          <div className="flex items-center gap-1 sm:gap-2.5 ml-auto shrink-0">
            {navItems.map((navItem, idx) => (
              <Magnetic key={`link=${idx}`} strength={0.25}>
                <button
                  onClick={() => handleNavClick(navItem.link)}
                  className={cn(
                    "relative font-sans font-semibold text-zinc-900 dark:text-zinc-100 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white transition-all duration-200 cursor-pointer text-xs sm:text-[14.5px] tracking-normal sm:tracking-wide shrink-0"
                  )}
                >
                  <span className="block sm:hidden">{navItem.icon}</span>
                  <span className="hidden sm:block">{navItem.name}</span>
                </button>
              </Magnetic>
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