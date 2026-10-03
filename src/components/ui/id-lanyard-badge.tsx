"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IconCpu } from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";

export function IdLanyardBadge() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Mouse tilt physics for 3D card effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    damping: 20,
    stiffness: 180,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    damping: 20,
    stiffness: 180,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isDragging) return;
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
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[380px] mx-auto">
      {/* Lanyard Strap Starting Cleanly from Top */}
      <div className="relative z-20 flex flex-col items-center -mb-2">
        {/* Woven Fabric Strap with Electric Blue Stitching */}
        <div className="w-5 sm:w-6 h-16 sm:h-20 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 border-x border-zinc-700/60 shadow-lg flex items-center justify-center overflow-hidden">
          <div className="w-[2px] h-full bg-sky-400/80 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
        </div>

        {/* Metallic Clip Ring & Carabiner Hook */}
        <div className="relative flex flex-col items-center -mt-1">
          {/* Chrome Swivel Ring */}
          <div className="w-6 h-3 rounded-full border-2 border-slate-300 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 shadow-sm" />
          {/* Metallic Clip Clasp */}
          <div className="w-4 h-6 rounded-sm bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 shadow-md border border-slate-400/80 flex items-center justify-center">
            <div className="w-1.5 h-3 bg-zinc-900 rounded-sm" />
          </div>
        </div>
      </div>

      {/* 3D TILT + DRAGGABLE PHYSICS HANGING BADGE */}
      <motion.div
        ref={cardRef}
        drag
        dragConstraints={{ left: -70, right: 70, top: -20, bottom: 60 }}
        dragElastic={0.18}
        dragTransition={{ bounceStiffness: 450, bounceDamping: 22 }}
        onDragStart={() => {
          setIsDragging(true);
          playTapSound("pop");
        }}
        onDragEnd={() => {
          setIsDragging(false);
          playTapSound("chime");
          mouseX.set(0);
          mouseY.set(0);
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          isDragging
            ? {}
            : {
                y: isHovered ? 0 : [0, 4, -2, 0],
                rotateZ: isHovered ? 0 : [0, 1.2, -1.2, 0],
              }
        }
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-30 w-[290px] sm:w-[325px] md:w-[345px] aspect-[1/1.52] rounded-3xl p-3 sm:p-3.5 bg-gradient-to-b from-white/15 via-white/[0.06] to-black/70 backdrop-blur-2xl border-2 border-sky-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(14,165,233,0.25)] cursor-grab active:cursor-grabbing hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_45px_rgba(56,189,248,0.4)] transition-shadow duration-300"
      >
        {/* Badge Hole Punch Slot at Top for Clip */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-2.5 rounded-full bg-zinc-950 border border-white/25 shadow-inner z-30" />

        {/* Acrylic Glass Holographic Sheen Layer */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-sky-400/10 rotate-12 opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* INNER PRINTED ID BADGE - Matches Avatar Deep Navy/Electric Blue Tone */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#0a1835] via-[#071328] to-[#030914] border border-sky-500/20 p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden shadow-inner text-white">
          {/* Cyber Grid Pattern Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:14px_14px] opacity-15 pointer-events-none" />

          {/* Card Header Strip: ID & Verified Chip */}
          <div className="relative z-10 flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-emerald-300 font-bold uppercase">
                ALL ACCESS • 2026
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-sky-200 bg-sky-950/60 px-2.5 py-1 rounded-md border border-sky-400/30">
              <IconCpu className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-semibold">AI_ENG</span>
            </div>
          </div>

          {/* Portrait Photo Container with Deep Blue Halo Matching Vivek's Illustration */}
          <div className="relative z-10 my-1 py-1">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-2xl overflow-hidden border-2 border-sky-400/60 shadow-[0_0_24px_rgba(56,189,248,0.35)] bg-[#081b3b]">
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

          {/* Skill Chips (Eliminates dead space between Photo and Name) */}
          <div className="relative z-10 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-200">
              Agentic AI
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-200">
              PyTorch
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-200">
              Next.js
            </span>
          </div>

          {/* Name & Title Section */}
          <div className="relative z-10 space-y-1 text-center">
            {/* Bold Headline Name & Signature */}
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-sans">
                VIVEK
              </h2>
              <span className="font-serif italic text-lg sm:text-xl text-sky-300 tracking-normal opacity-95 select-none">
                Hingu
              </span>
            </div>

            {/* Targeted Role Line */}
            <p className="text-xs sm:text-[13px] font-bold text-white tracking-wide">
              AI/ML Engineer & Full-Stack Developer
            </p>
            <p className="text-[11px] sm:text-xs font-mono text-sky-300/80">
              SAL College of Engineering • Ahmedabad
            </p>
          </div>

          {/* Card Footer: Barcode & Availability Badge */}
          <div className="relative z-10 pt-2 border-t border-sky-500/20 flex items-center justify-between">
            {/* Barcode Graphic */}
            <div className="flex flex-col items-start gap-0.5">
              <div className="flex items-center gap-[2px] h-5 opacity-85">
                {[2, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2, 1, 4, 2].map((w, i) => (
                  <div key={i} style={{ width: `${w}px` }} className="h-full bg-white" />
                ))}
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-zinc-300">
                ID: VH-0504-2026
              </span>
            </div>

            {/* Available Worldwide Badge */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Available Worldwide
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300">
                Full-time / Remote
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
