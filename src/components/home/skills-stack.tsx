"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/layout/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { playTapSound } from "@/lib/sound";

interface TechIconItem {
  id: string;
  name: string;
  category: string;
  src: string;
  alt: string;
  bg?: string;
  border?: string;
  isMonoSvg?: boolean;
}

// ============================================================================
// ROW 1: 11 COMPLETELY UNIQUE TECHNOLOGIES (ZERO DUPLICATES)
// ============================================================================
const ROW_1: TechIconItem[] = [
  {
    id: "python",
    name: "Python",
    category: "Core Programming Language",
    src: "/tech-icons/python.svg",
    alt: "Python logo",
    bg: "bg-[#141B26]",
    border: "border-blue-500/30",
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "Deep Learning & Tensors",
    src: "/tech-icons/pytorch.svg",
    alt: "PyTorch logo",
    bg: "bg-[#211614]",
    border: "border-orange-500/30",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "Machine Learning Framework",
    src: "/tech-icons/tensorflow.svg",
    alt: "TensorFlow logo",
    bg: "bg-[#231A12]",
    border: "border-amber-500/30",
  },
  {
    id: "scikitlearn",
    name: "Scikit-Learn",
    category: "Classification & Regression",
    src: "/tech-icons/scikitlearn.svg",
    alt: "Scikit-learn logo",
    bg: "bg-[#121B28]",
    border: "border-sky-500/30",
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "Vector & Matrix Computing",
    src: "/tech-icons/numpy.svg",
    alt: "NumPy logo",
    bg: "bg-[#111C2C]",
    border: "border-blue-400/30",
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "Data Analysis & Feature Prep",
    src: "/tech-icons/pandas.svg",
    alt: "Pandas logo",
    bg: "bg-[#171622]",
    border: "border-indigo-400/30",
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "RAG & LLM Orchestration",
    src: "/tech-icons/langchain.svg",
    alt: "LangChain logo",
    bg: "bg-[#0E201B]",
    border: "border-emerald-500/35",
    isMonoSvg: true,
  },
  {
    id: "chatgpt",
    name: "OpenAI API",
    category: "GPT-4o & Embeddings",
    src: "/tech-icons/chatgpt.png",
    alt: "OpenAI ChatGPT logo",
  },
  {
    id: "claude",
    name: "Claude API",
    category: "Anthropic NLP Reasoning",
    src: "/tech-icons/claude.png",
    alt: "Claude logo",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Relational SQL & pgvector",
    src: "/tech-icons/postgresql.svg",
    alt: "PostgreSQL logo",
    bg: "bg-[#121C29]",
    border: "border-sky-600/30",
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Primary Engineering IDE",
    src: "/tech-icons/vscode.png",
    alt: "VS Code logo",
  },
];

// ============================================================================
// ROW 2: 11 COMPLETELY UNIQUE TECHNOLOGIES (ZERO DUPLICATES FROM ROW 1)
// ============================================================================
const ROW_2: TechIconItem[] = [
  {
    id: "javascript",
    name: "JavaScript",
    category: "Dynamic Scripting & Web APIs",
    src: "/tech-icons/javascript.svg",
    alt: "JavaScript logo",
    bg: "bg-[#252212]",
    border: "border-yellow-500/30",
  },
  {
    id: "gemini",
    name: "Gemini API",
    category: "Google Multimodal Intelligence",
    src: "/tech-icons/gemini.svg",
    alt: "Google Gemini logo",
    bg: "bg-[#10152B]",
    border: "border-indigo-500/40",
    isMonoSvg: true,
  },
  {
    id: "grok",
    name: "Grok API",
    category: "xAI Real-Time Reasoning",
    src: "/tech-icons/grok.png",
    alt: "Grok logo",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    category: "Open Transformers & Models",
    src: "/tech-icons/huggingface.svg",
    alt: "Hugging Face logo",
    bg: "bg-[#221E12]",
    border: "border-amber-500/30",
  },
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    category: "Interactive Model Evaluation",
    src: "/tech-icons/jupyter.svg",
    alt: "Jupyter Notebook logo",
    bg: "bg-[#231711]",
    border: "border-orange-500/30",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Document & Vector Store",
    src: "/tech-icons/mongodb.svg",
    alt: "MongoDB logo",
    bg: "bg-[#111F15]",
    border: "border-emerald-600/30",
  },
  {
    id: "git",
    name: "Git",
    category: "Version Control System",
    src: "/tech-icons/git.svg",
    alt: "Git logo",
    bg: "bg-[#231513]",
    border: "border-red-500/30",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Collaborative Code & CI/CD",
    src: "/tech-icons/github.svg",
    alt: "GitHub logo",
    bg: "bg-[#151921]",
    border: "border-white/20",
    isMonoSvg: true,
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "High-Speed Async Python API",
    src: "/tech-icons/fastapi.svg",
    alt: "FastAPI logo",
    bg: "bg-[#0E201F]",
    border: "border-teal-500/30",
  },
  {
    id: "html5",
    name: "HTML5",
    category: "Semantic Web Structure",
    src: "/tech-icons/html5.svg",
    alt: "HTML5 logo",
    bg: "bg-[#241512]",
    border: "border-orange-600/30",
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Responsive Styling & Layouts",
    src: "/tech-icons/css3.svg",
    alt: "CSS3 logo",
    bg: "bg-[#111A29]",
    border: "border-blue-500/30",
  },
];

export default function SkillsStack() {
  const [hoveredItem, setHoveredItem] = useState<TechIconItem | null>(null);

  const handleTileClick = (item: TechIconItem) => {
    playTapSound("pop");
    setHoveredItem(item);
  };

  const renderSquircle = (item: TechIconItem) => {
    const isPng = item.src.endsWith(".png");

    return (
      <div
        key={item.id}
        onClick={() => handleTileClick(item)}
        onMouseEnter={() => setHoveredItem(item)}
        onMouseLeave={() => setHoveredItem(null)}
        className="group relative shrink-0 cursor-pointer select-none p-1"
      >
        {/* 3D Glossy App Squircle Card (Framer MCP Aesthetic) */}
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-[22px] sm:rounded-[26px] md:rounded-[30px] overflow-hidden transition-all duration-300 transform group-hover:scale-115 group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_12px_28px_rgba(0,0,0,0.7)] ${
            item.bg || "bg-[#141416]"
          } border ${item.border || "border-white/15"} relative flex items-center justify-center p-3.5 sm:p-4`}
        >
          {/* Subtle 3D Top Specular Shine */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-white/20 to-transparent rounded-t-[22px] sm:rounded-t-[26px] md:rounded-t-[30px] z-10" />

          {/* Genuine Original Logo */}
          <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {isPng ? (
              <Image
                src={item.src}
                alt={item.alt}
                width={112}
                height={112}
                sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                className="w-full h-full object-cover rounded-[18px] sm:rounded-[22px] md:rounded-[26px] pointer-events-none"
              />
            ) : item.isMonoSvg ? (
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center text-white pointer-events-none">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain filter invert brightness-200 pointer-events-none"
                />
              </div>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center pointer-events-none">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Floating Tooltip Tag on Hover */}
        <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 whitespace-nowrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/95 backdrop-blur-md border border-white/20 text-[10.5px] font-mono text-white shadow-xl">
            <span className="font-bold text-cyan-400">{item.name}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-300">{item.category}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full" id="skills">
      {/* STANDARDIZED ANTON HEADLINE */}
      <SectionHeading>
        <span className="text-[#3B82F6]">TECH STACK</span>{" "}
        <span className="text-white">&amp; ARSENAL</span>
      </SectionHeading>

      {/* DUAL-ROW CONTINUOUS MARQUEE RUNWAY (ZERO DUPLICATES) */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6 select-none">
        {/* Left Edge Gradient Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-background via-background/70 to-transparent z-20" />

        {/* Right Edge Gradient Fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-background via-background/70 to-transparent z-20" />

        {/* Row 1: Leftward Infinite Marquee (11 Unique Tech) */}
        <Marquee pauseOnHover className="[--duration:36s] [--gap:1.25rem] sm:[--gap:1.5rem] py-2">
          {ROW_1.map((item) => renderSquircle(item))}
        </Marquee>

        {/* Row 2: Rightward Reverse Infinite Marquee (11 Unique Tech) */}
        <Marquee reverse pauseOnHover className="[--duration:38s] [--gap:1.25rem] sm:[--gap:1.5rem] py-2 mt-2 sm:mt-3">
          {ROW_2.map((item) => renderSquircle(item))}
        </Marquee>
      </div>

      {/* TACTILE ACTIVE INSPECTOR BAR */}
      <div className="flex items-center justify-center pt-3 sm:pt-5 text-center">
        <p className="font-mono text-xs sm:text-[13px] text-zinc-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>
            {hoveredItem ? (
              <>
                <strong className="text-white font-bold">{hoveredItem.name}</strong>
                <span className="text-zinc-500 mx-1.5">{"//"}</span>
                <span className="text-cyan-400">{hoveredItem.category}</span>
              </>
            ) : (
              "Hover or tap any 3D squircle to inspect engineering tools & AI engines"
            )}
          </span>
        </p>
      </div>
    </div>
  );
}
