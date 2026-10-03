"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IconCpu } from "@tabler/icons-react";

export function IdLanyardBadge() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt physics for 3D card effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 18,
    stiffness: 160,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    damping: 18,
    stiffness: 160,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none pt-2 sm:pt-4">
      {/* 4 AMBIENT ROLE KEYWORDS FRAMING THE BADGE (Matching the Reference Screenshot) */}
      <div className="absolute inset-0 -top-8 -bottom-8 pointer-events-none z-10 flex flex-col justify-between hidden sm:flex">
        {/* Top Row: DESIGNER & DEVELOPER */}
        <div className="flex justify-between items-center w-full px-4 md:px-12 lg:px-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-sans tracking-tight text-white/10 dark:text-cyan-400/[0.12] uppercase">
          <span className="hover:text-cyan-400/30 transition-colors">DESIGNER</span>
          <span className="hover:text-cyan-400/30 transition-colors">DEVELOPER</span>
        </div>
        {/* Bottom Row: CREATOR & ENGINEER */}
        <div className="flex justify-between items-center w-full px-4 md:px-12 lg:px-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-sans tracking-tight text-white/10 dark:text-cyan-400/[0.12] uppercase">
          <span className="hover:text-cyan-400/30 transition-colors">CREATOR</span>
          <span className="hover:text-cyan-400/30 transition-colors">ENGINEER</span>
        </div>
      </div>

      {/* Lanyard Strap Coming from Top */}
      <div className="relative z-40 flex flex-col items-center -mb-2">
        {/* Woven Lanyard Ribbon */}
        <div className="w-5 sm:w-6 h-16 sm:h-24 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-x border-white/20 shadow-md flex items-center justify-center overflow-hidden">
          <div className="w-[2px] h-full bg-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </div>

        {/* Metallic Clip Ring & Carabiner Hook */}
        <div className="relative flex flex-col items-center -mt-1">
          {/* Chrome Swivel Ring */}
          <div className="w-6 h-3.5 rounded-full border-2 border-slate-300 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 shadow-sm" />
          {/* Metallic Clip Hook */}
          <div className="w-4 h-6 rounded-sm bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 shadow-md border border-slate-400/60 flex items-center justify-center">
            <div className="w-1.5 h-3 bg-zinc-800 rounded-sm" />
          </div>
        </div>
      </div>

      {/* 3D TILT HANGING BADGE CARD */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: isHovered ? 0 : [0, 5, -2, 0],
          rotateZ: isHovered ? 0 : [0, 0.8, -0.8, 0],
        }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-50 w-[240px] sm:w-[270px] md:w-[290px] aspect-[1/1.55] rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-white/15 via-white/[0.05] to-black/60 backdrop-blur-2xl border-2 border-white/25 dark:border-cyan-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(6,182,212,0.25)] cursor-grab active:cursor-grabbing transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(6,182,212,0.4)]"
      >
        {/* Badge Hole Punch Slot at Top for Clip */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-2.5 rounded-full bg-zinc-950 border border-white/30 shadow-inner z-30" />

        {/* Glass Holographic Sheen Layer */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-cyan-400/10 rotate-12 opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* INNER PRINTED ID BADGE */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#0f172a] via-[#090d16] to-[#020617] border border-white/10 p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden shadow-inner text-white">
          {/* Subtle Cyber Circuit Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:14px_14px] opacity-15 pointer-events-none" />

          {/* Card Header Strip: ID & Verified Chip */}
          <div className="relative z-10 flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-300 font-bold uppercase">
                ALL ACCESS • 2026
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400 bg-white/[0.06] px-2 py-0.5 rounded-md border border-white/10">
              <IconCpu className="w-3 h-3 text-cyan-400" />
              <span>AI_ENG</span>
            </div>
          </div>

          {/* Photo Frame Container (Matching Reference Lanyard Photo) */}
          <div className="relative z-10 my-auto py-1">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-[#081b3b]">
              <Image
                src="/avatars/vivek-avatar.png"
                alt="Vivek Hingu"
                fill
                priority
                className="object-cover scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Name & Title Section */}
          <div className="relative z-10 space-y-1 text-center">
            {/* Bold Headline Name */}
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
                VIVEK
              </h2>
              {/* Cursive Handwriting Signature Accent */}
              <span className="font-serif italic text-base sm:text-lg text-cyan-300 tracking-normal opacity-90 select-none">
                Hingu
              </span>
            </div>

            {/* Role & Specialization */}
            <p className="text-[11px] sm:text-xs font-semibold text-zinc-300 tracking-wide">
              AI Engineer & Full-Stack Architect
            </p>
            <p className="text-[9px] font-mono text-cyan-400/80">
              SAL College of Engineering • Ahmedabad
            </p>
          </div>

          {/* Card Footer: Barcode & Status Badge */}
          <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between">
            {/* Barcode Graphic */}
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-[2px] h-5 opacity-75">
                {[2, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2, 1, 4, 2].map((w, i) => (
                  <div key={i} style={{ width: `${w}px` }} className="h-full bg-white" />
                ))}
              </div>
              <span className="text-[8px] font-mono tracking-widest text-zinc-400">
                ID: VH-0504-2026
              </span>
            </div>

            {/* Available Worldwide Badge */}
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-mono font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Available Worldwide
              </span>
              <span className="text-[8px] font-mono text-zinc-400">
                Full-time / Remote
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
