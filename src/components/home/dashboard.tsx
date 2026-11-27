
"use client";
import React, { useState, useEffect, useRef } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { IconTool, IconLink, IconCup, IconClockHour4, IconMapPin, IconHeart, IconHandClick, IconBrandGithub, IconBrandSpotifyFilled, IconRefresh, IconSun, IconMoon, IconSparkles, IconRobot, IconQrcode } from "@tabler/icons-react";
import { QuickQrWidget } from "./quick-qr";
import { SectionHeading } from "@/components/layout/section-heading";
import { Globe } from "@/components/ui/globe";
import styles from "./dashboard.module.css";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image";
import { data, getNextScratchMeme } from "@/data/data";
import { useTheme } from "next-themes";
import { ScratchToReveal } from "../magicui/scratch-to-reveal";
import { useWakaTime } from "@/hooks/useWakaTime";
import { useSpotify } from "@/hooks/useSpotify";
import { useGitHub } from "@/hooks/useGitHub";
import { Spotlight } from "@/components/ui/spotlight";
import { useAlbumColor } from "@/hooks/useAlbumColor";
import { GitHubHeatmap } from "./github-heatmap";
import { SoundWave } from "@/components/ui/sound-wave";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { playTapSound } from "@/lib/sound";
import { LottiePlayer } from "@/components/ui/lottie-player";


export default function Dashboard() {
  const { totalHours } = useWakaTime();

  const totalCoffees = Math.ceil(totalHours / 4);
  const { track } = useSpotify();
  const { data: githubData, isLoading: isLoadingGitHub } = useGitHub();
  const [scratchGif, setScratchGif] = useState("");
  const spotlightColor = useAlbumColor(track?.albumImageUrl || null);

  const dashboardIconClass = "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary";

  useEffect(() => {
    // Pick next unshown meme (all 31 new memes randomly first, then old memes)
    const initialGif = getNextScratchMeme();
    setScratchGif(initialGif);
  }, []);

  const pickNewGif = () => {
    playTapSound("pop");
    const nextGif = getNextScratchMeme(scratchGif);
    setScratchGif(nextGif);
  };


  const handleScratchComplete = () => {
    // Keep revealed meme visible
  };

  return (
    <div className="flex flex-col w-full">
      <CustomCursor />
      <SectionHeading 
        number="01" 
        chapter="CHAPTER 01 — TELEMETRY & MATRIX"
        rightElement={
          <div className="hidden sm:flex items-center gap-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <LottiePlayer src="/lottie/developer.json" className="w-16 h-16 md:w-20 md:h-20" />
          </div>
        }
      >
        <span className="text-[#3B82F6]">DEVELOPER</span>{" "}
        <span className="text-white">TELEMETRY &amp; MATRIX</span>
      </SectionHeading>

      <ul
        className={`grid w-full gap-4 ${styles.dashboardGrid}`}>
        <GridItem
          area="location"
          icon={<IconMapPin className={dashboardIconClass} />}
          title="Ahmedabad, Gujarat → Global"
          transitionDuration="100ms"
          cursorEmoji="✈️"
        >
          <div className="w-full h-[170px] sm:h-[178px] flex items-center justify-center">
            <Globe />
          </div>
        </GridItem>
        <GridItem
          area="music"
          icon={<SoundWave className={dashboardIconClass} color={spotlightColor} />}
          title="Last Played"
          transitionDuration="200ms"
          tooltip="Spotify"
          cursorEmoji="🎵"
        >
          <div className="w-full">
            {/* Spotify Last Played Section */}
            <LastPlayed track={track} />
          </div>
        </GridItem>
        <GridItem
          area="favorite"
          icon={<IconHeart className={dashboardIconClass} />}
          title="Fav Tool"
          transitionDuration="300ms"
          cursorEmoji="❤️"
        >
          <FavoriteLanguage />
        </GridItem>
        <GridItem
          area="tools"
          icon={<IconTool className={dashboardIconClass} />}
          title="Tools"
          transitionDuration="400ms"
          cursorEmoji="🔧"
        >
          <ToolsMarquee />
        </GridItem>
        <GridItem
          area="contact"
          icon={<IconLink className={dashboardIconClass} />}
          title="Connect"
          transitionDuration="500ms"
          cursorEmoji="🔗"
        >
          <ContactMe />
        </GridItem>
        <GridItem
          area="scratch"
          icon={<IconHandClick className={dashboardIconClass} />}
          title="Scratch Me"
          transitionDuration="600ms"
        >
          <div className="relative w-full h-[170px] sm:h-[178px]">
            <ScratchToReveal
              minScratchPercentage={25}
              className="relative w-full h-full overflow-hidden rounded-xl"
              coverColor="#D8D0DE"
              onComplete={handleScratchComplete}
              resetKey={scratchGif}
            >
              {scratchGif && (
                <Image
                  src={scratchGif}
                  alt="Scratch to reveal meme"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="w-full h-full object-cover rounded-xl select-none"
                  unoptimized
                />
              )}
            </ScratchToReveal>
            <button
              type="button"
              onClick={pickNewGif}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              aria-label="Refresh scratch"
              title="Refresh Meme"
              className="absolute top-2 right-2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white backdrop-blur-md transition-all shadow-xs group cursor-pointer border border-white/20"
            >
              <IconRefresh className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 duration-300" />
            </button>
          </div>
        </GridItem>
        <GridItem
          area="hours"
          icon={<IconQrcode className={dashboardIconClass} />}
          title="QR Generator"
          transitionDuration="800ms"
          tooltip="Client-Side QR Engine"
          cursorEmoji="⚡"
        >
          <QuickQrWidget />
        </GridItem>
        <GridItem
          area="coffees"
          icon={<IconSun className={dashboardIconClass} />}
          title="Weather & Time"
          transitionDuration="700ms"
          tooltip="Ahmedabad, Gujarat (IST)"
          cursorEmoji="🌤️"
        >
          <LiveWeatherTime />
        </GridItem>
        <GridItem
          area="github"
          icon={<IconBrandGithub className={dashboardIconClass} />}
          title="Activity"
          transitionDuration="900ms"
          tooltip="Last 7 Weeks"
          cursorEmoji="💻"
        >
          <div className="flex flex-col justify-center items-center h-[170px] sm:h-[178px] gap-2.5">
            {/* Heatmap */}
            <div className="flex items-center justify-center">
              <GitHubHeatmap
                contributions={githubData?.contributions || []}
                isLoading={isLoadingGitHub}
              />
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
              <span>Less</span>
              <div className="flex gap-1 sm:gap-[3px]">
                <div className="w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-[2px] bg-neutral-100 dark:bg-neutral-800/50" />
                <div className="w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-[2px] bg-green-200 dark:bg-green-900/70" />
                <div className="w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-[2px] bg-green-400 dark:bg-green-700/80" />
                <div className="w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-[2px] bg-green-600 dark:bg-green-500/90" />
                <div className="w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-[2px] bg-green-700 dark:bg-green-400" />
              </div>
              <span>More</span>
            </div>
          </div>
        </GridItem>
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  transitionDuration?: string;
  tooltip?: string;
  cursorEmoji?: string;
}

const GridItem = ({ area, icon, title, children, transitionDuration = "300ms", tooltip, cursorEmoji }: GridItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    if (!tooltip) return;

    setShowTooltip(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hide tooltip after 2 seconds
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const content = (
    <li
      ref={itemRef}
      data-cursor-emoji={cursorEmoji}
      className="min-h-[2rem] w-full list-none transition-all"
      style={{
        gridArea: area,
        transitionDuration,
        ...(cursorEmoji ? { cursor: "none" } : {}),
      }}
    >
      <div className="relative mx-auto h-full rounded-xl border p-2 md:rounded-2xl md:p-2">
        <GlowingEffect
          spread={40}
          glow={false}
          disabled={true}
          proximity={64}
          inactiveZone={0.01}
        />

        <div
          className="group/glow relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-lg border-0.75 p-4 shadow-[0px_0px_12px_0px_#ebecf0] dark:shadow-[0px_0px_27px_0px_#2D2D2D] bg-background transition-all"
          style={{
            transitionDuration,
          }}
        >
          <SpotlightGlow />
          <div className="relative flex flex-row items-center gap-2 sm:gap-3">
            <div className="pt-0">{icon}</div>
            <div className="space-y-2">
              <h3 className="text-sm sm:text-md md:text-base tracking-tight text-start font-semibold text-black dark:text-white">
                {title}
              </h3>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </li>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip open={showTooltip} delayDuration={0}>
          <TooltipTrigger
            asChild
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleTap}
          >
            {content}
          </TooltipTrigger>
          <TooltipContent
            sideOffset={-16}
            side="top"
            align="center"
            collisionPadding={0}
            className="pointer-events-none whitespace-nowrap"
          >
            <p className="flex items-center gap-1.5">
              {tooltip === "Spotify" && (
                <IconBrandSpotifyFilled className="h-4 w-4 text-green-500" />
              )}
              {tooltip}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

const ContactMe = () => {
  return (
    <div className="flex flex-col gap-4 sm:p-4">
      {data.contact.map(({ href, label, icon, aria }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={aria}
          className="flex items-center gap-2 group"
        >
          {React.cloneElement(icon, {
            className:
              "h-5 w-5 text-muted-foreground transition-all group-hover:animate-wiggle group-hover:scale-125 group-hover:text-primary",
          })}
          <span className="text-muted-foreground transition-all group-hover:text-primary group-hover:font-bold">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};
interface LastPlayedProps {
  track: {
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
  } | null;
}

const LastPlayed = ({ track }: LastPlayedProps) => {
  const [isReady, setIsReady] = useState(false);

  // Fallback to hardcoded data if no track
  const displayTrack = track || {
    title: "Tabaahi (From \"Toxic\")",
    artist: "Vishal Mishra, Raj Shekhar",
    album: "Toxic",
    albumImageUrl: "/music/tabaahi.jpg",
    songUrl: "https://open.spotify.com/track/0bRRLtD0Tmfg8ZaP9Qf1Sq",
  };

  // A real track can still arrive without cover art (the API returns an
  // optional images[0]?.url), so guard the image source independently of the
  // whole-track fallback above — next/image throws on an undefined src.
  const albumImageUrl = displayTrack.albumImageUrl || "/music/tabaahi.jpg";

  useEffect(() => {
    // Delay showing marquee to prevent flash on initial load
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={displayTrack.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row items-center gap-2 w-full overflow-hidden group"
    >
      <Image
        src={albumImageUrl}
        alt={`${displayTrack.title} album cover`}
        width={48}
        height={48}
        className="rounded-md shadow-lg sm:h-10 sm:w-10 h-8 w-8"
      />
      <div className="flex-1 min-w-0 max-w-full overflow-hidden relative">
        {isReady ? (
          <Marquee className="[--duration:12s] sm:[--duration:15s] [--gap:0.5rem]" pauseOnHover repeat={5}>
            <p className="text-sm whitespace-nowrap">
              <span className="text-foreground">{displayTrack.title}</span>
              <span className="text-muted-foreground"> • {displayTrack.artist} • {displayTrack.album} •</span>
            </p>
          </Marquee>
        ) : (
          <p className="text-sm whitespace-nowrap">
            <span className="text-foreground">{displayTrack.title}</span>
            <span className="text-muted-foreground"> • {displayTrack.artist} • {displayTrack.album}</span>
          </p>
        )}
      </div>
    </a>
  );
};

const Tool = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center">
            <Image
              src={`${icon}`}
              alt={`${name} icon`}
              width={30}
              height={30}
              className="h-8 w-8"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          <p className="text-sm font-semibold text-muted-foreground">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ToolsMarquee = () => {
  const { theme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const currentTheme = theme || resolvedTheme || "dark";

  const processedToolsData = data.tools.map(({ name, icon, themeDependent }) => ({
    name,
    icon: `/tools/${icon}${themeDependent && currentTheme === "dark" ? "-dark" : ""}.svg`,
  }));
  return (
    <div className="relative overflow-hidden">
      <div className="fade-mask-left transition-all duration-400" />
      <div className="fade-mask-right transition-all duration-400" />
      <Marquee pauseOnHover className="[--duration:20s]">
        <div className="flex items-center gap-6">
          {processedToolsData.map(({ name, icon }) => (
            <Tool key={name} name={name} icon={icon} />
          ))}
        </div>
      </Marquee>
    </div>
  );
};


const FavoriteLanguage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-start h-full">
      <Image
        src="/tools/python.svg"
        alt="Python Icon"
        width={24}
        height={24}
        className="h-6 w-6 sm:h-8 sm:w-8 ml-1 mb-1"
      />
      <span className="ml-2 sm:ml-3 mb-1 text-md sm:text-lg font-normal tracking-tight text-muted-foreground">
        Python
      </span>
    </div>
  );
};

const LiveWeatherTime = () => {
  const [timeStr, setTimeStr] = useState("");
  const [period, setPeriod] = useState("PM");
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const parts = formatter.formatToParts(now);
      const h = parts.find((p) => p.type === "hour")?.value || "12";
      const m = parts.find((p) => p.type === "minute")?.value || "00";
      const s = parts.find((p) => p.type === "second")?.value || "00";
      const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value || "PM";

      const hourNum = parseInt(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "numeric",
        }),
        10
      );
      setIsDay(hourNum >= 6 && hourNum < 19);
      setTimeStr(`${h}:${m}:${s}`);
      setPeriod(dayPeriod);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center h-full select-none py-0.5 space-y-1">
      <div className="flex items-baseline gap-1 font-mono">
        <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-mono">
          {timeStr || "04:45:00"}
        </span>
        <span className="text-[10px] font-bold text-white font-mono uppercase">
          {period} IST
        </span>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[10px] font-mono text-neutral-400">
        <span>Ahmedabad, IN</span>
        <span className="text-white font-semibold">{isDay ? "31°C Sunny" : "31°C Clear"}</span>
      </div>
    </div>
  );
};

const AskMyAI = () => {
  const handleOpenAI = (query?: string) => {
    playTapSound("chime");
    if (typeof window !== "undefined") {
      if (query) {
        window.dispatchEvent(new CustomEvent("openVianWithQuery", { detail: { query } }));
      } else {
        window.dispatchEvent(new CustomEvent("openVianFresh"));
      }
    }
  };

  return (
    <div className="flex flex-col justify-between h-full pt-0.5 space-y-2 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
            VIAN • ONLINE
          </span>
        </div>
        <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          Ask My AI
        </span>
      </div>

      <button
        type="button"
        onClick={() => handleOpenAI()}
        className="group/btn relative w-full flex items-center justify-between px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-all text-left cursor-pointer shadow-sm active:scale-95"
      >
        <div className="flex flex-col min-w-0 pr-2">
          <span className="text-xs font-bold text-foreground group-hover/btn:text-cyan-400 transition-colors truncate">
            Ask Vian anything...
          </span>
          <span className="text-[10px] text-muted-foreground truncate font-sans">
            Projects, skills, hackathons &amp; career
          </span>
        </div>
        <div className="h-6 w-6 rounded-lg bg-cyan-500 text-black flex items-center justify-center shrink-0 group-hover/btn:scale-110 transition-transform shadow-xs">
          <IconSparkles className="w-3.5 h-3.5 fill-black" />
        </div>
      </button>
    </div>
  );
};