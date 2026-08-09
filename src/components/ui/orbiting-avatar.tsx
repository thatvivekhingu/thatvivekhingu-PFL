"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { playTapSound } from "@/lib/sound";

interface OrbitingAvatarProps {
  profilePic: StaticImageData;
  profilePicHover: StaticImageData;
}

const TECH_LOGOS = [
  {
    name: "Python",
    color: "#3776AB",
    bg: "from-blue-500/20 to-yellow-500/20",
    border: "border-blue-500/40",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.82 0 6.22 2.657 6.22 2.657L6.233 5.39h5.792v.817H3.94S0 5.76 0 11.896c0 6.13 3.418 5.92 3.418 5.92l2.046-.002v-2.888c0-3.268 2.825-3.076 2.825-3.076h5.736s2.695.06 2.695-2.612V3.48S17.26 0 11.914 0zM8.8 1.776a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm3.286 22.224c6.094 0 5.694-2.657 5.694-2.657l-.013-2.733H11.98v-.817h8.084s3.94.447 3.94-5.688c0-6.137-3.418-5.927-3.418-5.927l-2.046.002v2.888c0 3.268-2.825 3.076-2.825 3.076H9.98s-2.695-.06-2.695 2.612v5.748s-.542 3.48 4.802 3.48zm3.114-1.776a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" />
      </svg>
    ),
  },
  {
    name: "PyTorch",
    color: "#EE4C2C",
    bg: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/40",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L6.75 5.25v2.25L12 2.25l5.25 5.25V5.25L12 0zm-5.25 9.75v4.5L12 19.5l5.25-5.25v-4.5L12 15l-5.25-5.25z" />
      </svg>
    ),
  },
  {
    name: "TensorFlow",
    color: "#FF6F00",
    bg: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/40",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.292 5.856L11.54 0v24l-4.148-2.417V12.97l-6.1 3.528V5.856zM22.708 5.856L12.46 0v24l4.148-2.417V8.583l6.1 3.528V5.856z" />
      </svg>
    ),
  },
  {
    name: "Scikit-Learn",
    color: "#F7931E",
    bg: "from-blue-500/20 to-amber-500/20",
    border: "border-blue-400/40",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
      </svg>
    ),
  },
  {
    name: "React",
    color: "#61DAFB",
    bg: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-400/40",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7c-5.52 0-10 2.24-10 5s4.48 5 10 5 10-2.24 10-5-4.48-5-10-5zm0 17c-5.52 0-10-2.24-10-5s4.48-5 10-5 10 2.24 10 5-4.48 5-10 5z" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    color: "#FFFFFF",
    bg: "from-zinc-500/20 to-white/20",
    border: "border-zinc-400/40",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 16.5l-6-9V15H9V7.5l6 9v-1.5z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    bg: "from-blue-600/20 to-sky-400/20",
    border: "border-blue-500/40",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-1.077-.47 4.71 4.71 0 0 0-1.305-.183c-.632 0-1.109.13-1.431.391-.322.26-.483.626-.483 1.097 0 .342.09.619.27.831.18.212.428.397.744.555l.89.444c.905.444 1.558.91 1.958 1.398.401.488.601 1.118.601 1.89 0 1.258-.456 2.228-1.368 2.91-.912.682-2.184 1.023-3.816 1.023-.746 0-1.467-.068-2.163-.204a9.77 9.77 0 0 1-1.849-.556v-2.57c.683.392 1.385.69 2.106.895.72.205 1.388.307 2.003.307.696 0 1.218-.135 1.566-.405.348-.27.522-.656.522-1.158 0-.376-.098-.673-.294-.891-.196-.219-.485-.424-.867-.615l-.946-.477c-.856-.43-1.472-.888-1.848-1.373-.376-.485-.564-1.096-.564-1.833 0-1.184.444-2.112 1.332-2.784.888-.672 2.088-1.008 3.6-1.008zM11.5 10v2.227H9.273V22H6.5V12.227H4.273V10H11.5z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    color: "#2496ED",
    bg: "from-cyan-600/20 to-blue-500/20",
    border: "border-cyan-400/40",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 0 0 .186-.186V3.574a.185.185 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.186.186 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186zm-2.955 0h2.119a.186.186 0 0 0 .185-.186V6.29a.186.186 0 0 0-.185-.185H5.144a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186zm5.885 2.714h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186H8.1a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185zm-2.955 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.144a.186.186 0 0 0-.185.186v1.887c0 .102.083.185.185.185zm-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185z" />
      </svg>
    ),
  },
];

export function OrbitingAvatar({ profilePic, profilePicHover }: OrbitingAvatarProps) {
  const [angle, setAngle] = useState(0);

  // Smooth 60 FPS 3D Orbit Animation Loop
  useEffect(() => {
    let animId: number;
    const animate = () => {
      setAngle((prev) => (prev + 0.007) % (Math.PI * 2));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96 my-2 select-none">
      {/* 3D Orbit Ring Backing Trace */}
      <div className="absolute w-[240px] h-[100px] sm:w-[320px] sm:h-[130px] rounded-[100%] border border-cyan-500/25 dark:border-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.15)] rotate-[-12deg] pointer-events-none" />

      {/* Avatar Photo in Center */}
      <div
        className="group relative z-40 cursor-pointer transition-all duration-500 hover:scale-105"
        onClick={() => playTapSound("chime")}
      >
        {/* Outer Halo */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 opacity-50 blur-lg group-hover:opacity-85 transition-opacity duration-500 animate-pulse" />

        {/* Avatar Ring */}
        <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 overflow-hidden rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-amber-400 shadow-2xl">
          <div className="relative h-full w-full rounded-full overflow-hidden bg-zinc-950">
            <Image
              src={profilePic}
              alt="Vivek Hingu"
              priority
              fill
              className="object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
            />
            <Image
              src={profilePicHover}
              alt="Vivek Hingu Hover"
              fill
              className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            />
          </div>

          {/* AI / ML Badge */}
          <div className="absolute bottom-2 inset-x-0 mx-auto w-max px-3 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-cyan-500/40 text-[10px] font-extrabold text-cyan-300 tracking-wider uppercase shadow-lg">
            AI / ML
          </div>
        </div>
      </div>

      {/* 3D Orbiting Language Logos */}
      {TECH_LOGOS.map((tech, i) => {
        const itemAngle = angle + (i * Math.PI * 2) / TECH_LOGOS.length;
        // 3D Spatial Position Math
        const rx = 125; // Horizontal radius (Desktop: 155, Mobile: 125)
        const ry = 55; // Vertical tilt radius
        const x = Math.cos(itemAngle) * rx;
        const y = Math.sin(itemAngle) * ry;
        const z = Math.sin(itemAngle); // Depth factor (-1 to +1)

        // Depth projection calculations
        const zIndex = Math.round((z + 1) * 50); // Front logos (z > 0) have zIndex > 50 (in front of avatar)
        const scale = 0.78 + (z + 1) * 0.22; // Scale 0.78 to 1.22 based on depth
        const opacity = 0.5 + (z + 1) * 0.25; // Front logos brighter, back logos subtle

        return (
          <div
            key={tech.name}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
              zIndex,
              opacity,
            }}
            className="absolute flex items-center gap-1.5 p-2 rounded-2xl border border-white/20 bg-background/80 backdrop-blur-xl shadow-xl transition-transform duration-75 cursor-pointer hover:scale-125 hover:border-cyan-400 group"
            title={tech.name}
            onClick={() => playTapSound("pop")}
          >
            <div
              className={`p-1.5 rounded-xl bg-gradient-to-br ${tech.bg} border ${tech.border} text-white shadow-inner flex items-center justify-center`}
              style={{ color: tech.color }}
            >
              {tech.icon}
            </div>
            <span className="text-[11px] font-bold text-foreground pr-1 hidden sm:inline-block">
              {tech.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
