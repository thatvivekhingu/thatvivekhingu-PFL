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
    <div className="relative flex flex-col items-center justify-center select-none pt-0">
      {/* Lanyard Strap Coming from Top (Compact & realistic) */}
      <div className="relative z-40 flex flex-col items-center -mb-2">
        {/* Woven Lanyard Ribbon */}
        <div className="w-5 sm:w-6 h-6 sm:h-8 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-x border-white/20 shadow-md flex items-center justify-center overflow-hidden">
          <div className="w-[2px] h-full bg-cyan-400/70 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </div>

        {/* Metallic Clip Ring & Carabiner Hook */}
        <div className="relative flex flex-col items-center -mt-0.5">
          {/* Chrome Swivel Ring */}
          <div className="w-5 sm:w-5.5 h-2.5 rounded-full border-2 border-slate-300 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 shadow-sm" />
          {/* Metallic Clip Hook */}
          <div className="w-3.5 sm:w-4 h-4.5 rounded-sm bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 shadow-md border border-slate-400/60 flex items-center justify-center">
            <div className="w-1.5 h-2 bg-zinc-800 rounded-sm" />
          </div>
        </div>
      </div>

      {/* 3D TILT HANGING BADGE CARD (Ergonomically scaled to fit viewport perfectly) */}
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
          y: isHovered ? 0 : [0, 4, -2, 0],
          rotateZ: isHovered ? 0 : [0, 0.6, -0.6, 0],
        }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-50 w-[260px] sm:w-[280px] md:w-[295px] aspect-[1/1.48] rounded-3xl p-2.5 sm:p-3 bg-[#060a12] border-2 border-white/25 dark:border-cyan-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(6,182,212,0.25)] cursor-grab active:cursor-grabbing transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(6,182,212,0.4)]"
      >
        {/* Badge Hole Punch Slot at Top for Clip */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 sm:w-11 h-2 rounded-full bg-zinc-950 border border-white/30 shadow-inner z-30" />

        {/* Glass Holographic Sheen Layer */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden z-20">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-cyan-400/10 rotate-12 opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* INNER PRINTED ID BADGE (Opaque dark background) */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#0f172a] via-[#090d16] to-[#030712] border border-white/10 p-3 sm:p-3.5 flex flex-col justify-between overflow-hidden shadow-inner text-white">
          {/* Subtle Cyber Circuit Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:14px_14px] opacity-15 pointer-events-none" />

          {/* Card Header Strip: ID & Verified Chip */}
          <div className="relative z-10 flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] sm:text-[9.5px] font-mono tracking-widest text-cyan-300 font-bold uppercase">
                ALL ACCESS • 2026
              </span>
            </div>
            <div className="flex items-center gap-1 text-[8.5px] font-mono text-zinc-300 bg-white/[0.08] px-2 py-0.5 rounded-md border border-white/15">
              <IconCpu className="w-3 h-3 text-cyan-400" />
              <span className="font-semibold tracking-wider">AI_ENG</span>
            </div>
          </div>

          {/* Photo Frame Container (Balanced 112px-128px for sharp, complete badge visibility) */}
          <div className="relative z-10 my-auto py-0.5">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-[#081b3b]">
              <Image
                src="/avatars/vivek-avatar.png"
                alt="Vivek Hingu"
                fill
                sizes="(max-width: 640px) 112px, 128px"
                priority
                className="object-cover scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Name & Title Section */}
          <div className="relative z-10 space-y-0.5 text-center">
            {/* Bold Headline Name */}
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase font-sans">
                VIVEK
              </h2>
              {/* Cursive Handwriting Signature Accent */}
              <span className="font-serif italic text-lg sm:text-xl text-cyan-300 tracking-normal select-none">
                Hingu
              </span>
            </div>

            {/* Primary Role & Specialization */}
            <div className="space-y-0.5">
              <p className="text-[11.5px] sm:text-xs font-bold text-zinc-100 tracking-wider uppercase">
                AI/ML Engineer
              </p>
              <p className="text-[9.5px] sm:text-[10px] font-medium text-cyan-300/90 tracking-wide">
                Generative AI • Computer Vision • Deep Learning
              </p>
            </div>

            {/* Secondary: College Information */}
            <p className="text-[8.5px] sm:text-[9px] font-mono text-zinc-400 pt-0.5">
              SAL College of Engineering • Ahmedabad
            </p>
          </div>

          {/* Card Footer: Barcode & Status Badge (Clean & 100% Fully Visible) */}
          <div className="relative z-10 pt-1.5 pb-0.5 border-t border-white/10 flex items-center justify-between mt-auto">
            {/* Barcode Graphic & ID */}
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-[2px] h-4 opacity-85">
                {[2, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 4].map((w, i) => (
                  <div key={i} style={{ width: `${w}px` }} className="h-full bg-white rounded-[0.5px]" />
                ))}
              </div>
              <span className="text-[8px] font-mono tracking-wider text-zinc-300 font-semibold">
                ID: VIVEK-2026
              </span>
            </div>

            {/* Available Worldwide Badge */}
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-[8px] font-mono font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Available
              </span>
              <span className="text-[7.5px] font-mono text-zinc-400">
                Remote • Full-time
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
