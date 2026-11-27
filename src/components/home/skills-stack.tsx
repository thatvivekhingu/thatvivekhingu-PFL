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
    src: "/tech-icons/python-app.svg",
    alt: "Python app icon",
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "Deep Learning & Tensors",
    src: "/tech-icons/pytorch-app.svg",
    alt: "PyTorch app icon",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "Machine Learning Framework",
    src: "/tech-icons/tensorflow-app.svg",
    alt: "TensorFlow app icon",
  },
  {
    id: "scikitlearn",
    name: "Scikit-Learn",
    category: "Classification & Regression",
    src: "/tech-icons/scikitlearn-app.svg",
    alt: "Scikit-learn app icon",
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "Vector & Matrix Computing",
    src: "/tech-icons/numpy-app.svg",
    alt: "NumPy app icon",
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "Data Analysis & Feature Prep",
    src: "/tech-icons/pandas-app.svg",
    alt: "Pandas app icon",
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "RAG & LLM Orchestration",
    src: "/tech-icons/langchain-app.svg",
    alt: "LangChain app icon",
  },
  {
    id: "chatgpt",
    name: "OpenAI API",
    category: "GPT-4o & Embeddings",
    src: "/tech-icons/chatgpt.png",
    alt: "OpenAI ChatGPT app icon",
  },
  {
    id: "claude",
    name: "Claude API",
    category: "Anthropic NLP Reasoning",
    src: "/tech-icons/claude.png",
    alt: "Claude app icon",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Relational SQL & pgvector",
    src: "/tech-icons/postgresql-app.svg",
    alt: "PostgreSQL app icon",
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Primary Engineering IDE",
    src: "/tech-icons/vscode.png",
    alt: "VS Code app icon",
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
    src: "/tech-icons/javascript-app.svg",
    alt: "JavaScript app icon",
  },
  {
    id: "gemini",
    name: "Gemini API",
    category: "Google Multimodal Intelligence",
    src: "/tech-icons/gemini-app.svg",
    alt: "Google Gemini app icon",
  },
  {
    id: "grok",
    name: "Grok API",
    category: "xAI Real-Time Reasoning",
    src: "/tech-icons/grok.png",
    alt: "Grok app icon",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    category: "Open Transformers & Models",
    src: "/tech-icons/huggingface-app.svg",
    alt: "Hugging Face app icon",
  },
  {
    id: "jupyter",
    name: "Jupyter Notebook",
    category: "Interactive Model Evaluation",
    src: "/tech-icons/jupyter-app.svg",
    alt: "Jupyter Notebook app icon",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Document & Vector Store",
    src: "/tech-icons/mongodb-app.svg",
    alt: "MongoDB app icon",
  },
  {
    id: "git",
    name: "Git",
    category: "Version Control System",
    src: "/tech-icons/git-app.svg",
    alt: "Git app icon",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Collaborative Code & CI/CD",
    src: "/tech-icons/github-app.svg",
    alt: "GitHub app icon",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "High-Speed Async Python API",
    src: "/tech-icons/fastapi-app.svg",
    alt: "FastAPI app icon",
  },
  {
    id: "html5",
    name: "HTML5",
    category: "Semantic Web Structure",
    src: "/tech-icons/html5-app.svg",
    alt: "HTML5 app icon",
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Responsive Styling & Layouts",
    src: "/tech-icons/css3-app.svg",
    alt: "CSS3 app icon",
  },
];

export default function SkillsStack() {
  const [hoveredItem, setHoveredItem] = useState<TechIconItem | null>(null);

  const handleTileClick = (item: TechIconItem) => {
    playTapSound("pop");
    setHoveredItem(item);
  };

  const renderSquircle = (item: TechIconItem) => {
    return (
      <div
        key={item.id}
        onClick={() => handleTileClick(item)}
        onMouseEnter={() => setHoveredItem(item)}
        onMouseLeave={() => setHoveredItem(null)}
        className="group relative shrink-0 cursor-pointer select-none p-1.5"
      >
        {/* Mobile App Icon Squircle Tile (Full Bleed, ZERO Padding) */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-[22px] sm:rounded-[26px] md:rounded-[30px] overflow-hidden transition-all duration-300 transform group-hover:scale-115 group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.95)] shadow-[0_12px_28px_rgba(0,0,0,0.7)] relative p-0 bg-black/40">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
            className="w-full h-full object-cover rounded-[22px] sm:rounded-[26px] md:rounded-[30px] pointer-events-none"
          />
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
      <SectionHeading
        number="04"
        chapter="CHAPTER 04 — TECH ARSENAL"
      >
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
