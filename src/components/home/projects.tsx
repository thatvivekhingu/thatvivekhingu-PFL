"use client";

import React, { useState } from "react";
import { IconBrandGithub, IconExternalLink, IconSparkles, IconX } from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";
import { SectionHeading } from "@/components/layout/section-heading";

export interface ProjectVolume {
  id: string;
  code: string;
  spineTitle: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  rightMeta: string;
  coverStack: string;
  badgeText: string;
  heightPx: number;
  finish: "charcoal" | "parchment" | "accent";
  leaning?: boolean;
  inRowList: boolean;
  metrics: { label: string; value: string }[];
  highlights: string[];
  stack: string[];
  githubUrl: string;
  liveUrl: string;
}

const ACCENTS = [
  { name: "Warm Bronze", hex: "#C88A55" },
  { name: "Muted Indigo", hex: "#5B73B8" },
  { name: "Sage Emerald", hex: "#4D9078" },
  { name: "Terracotta Clay", hex: "#C25949" },
];

const VOLUMES: ProjectVolume[] = [
  {
    id: "bharatbhasha",
    code: "01",
    spineTitle: "BHARATBHASHA",
    title: "BHARATBHASHA AI",
    subtitle: "Multilingual Voice & Text AI Operating System",
    category: "AI PLATFORM & WEB SYSTEM",
    description:
      "Multilingual voice & text AI OS supporting Indian languages with real-time Grok API responses.",
    rightMeta: "GROK API • MULTILINGUAL NLP",
    coverStack: "GROK API • NODE.JS • NLP",
    badgeText: "VOICE AI",
    heightPx: 238,
    finish: "parchment",
    inRowList: true,
    metrics: [
      { label: "INFERENCE LATENCY", value: "< 50ms Stream" },
      { label: "LANGUAGES", value: "10+ Indian Dialects" },
      { label: "MODALITY", value: "Voice + Text AI" },
    ],
    highlights: [
      "Engineered an AI-powered multilingual communication platform supporting seamless text and voice interactions across diverse Indian languages.",
      "Integrated Grok API with custom NLP prompt orchestration to deliver culturally grounded, context-aware multilingual responses.",
      "Architected a scalable Node.js and Express.js backend pipeline enabling low-latency real-time AI conversations.",
    ],
    stack: ["Grok API", "NLP", "Node.js", "Express.js", "JavaScript", "HTML5", "CSS3", "Web Speech API"],
    githubUrl: "https://github.com/thatvivekhingu",
    liveUrl: "https://vivekhingu.vercel.app",
  },
  {
    id: "reverse-recipe",
    code: "02",
    spineTitle: "REVERSE RECIPE",
    title: "REVERSE RECIPE ENGINE",
    subtitle: "Zero-Shot Regional Culinary Synthesis Engine",
    category: "GENERATIVE AI WEB APPLICATION",
    description:
      "Generative AI culinary app creating regional recipes from local ingredients with Gemini & Unsplash.",
    rightMeta: "TOP 10 FINALIST • AIT HACKATHON",
    coverStack: "PYTHON • FLASK • GEMINI API",
    badgeText: "TOP 10",
    heightPx: 218,
    finish: "accent",
    inRowList: true,
    metrics: [
      { label: "HACKATHON RANK", value: "Top 10 Finalist" },
      { label: "COMPETITION", value: "AIT Hackathon 2K25" },
      { label: "SYNTHESIS", value: "Gemini + Unsplash" },
    ],
    highlights: [
      "Built a generative AI application that synthesizes authentic regional Indian recipes directly from user-supplied pantry ingredients.",
      "Combined Gemini API structured prompt engineering with dietary and regional cuisine constraints for step-by-step culinary instructions.",
      "Paired dynamic Unsplash API visual lookups with a clean Python Flask backend, earning Top 10 Finalist honors at AIT Hackathon 2K25.",
    ],
    stack: ["Python", "Flask", "Gemini API", "Prompt Engineering", "Unsplash API", "JavaScript", "HTML5", "CSS3"],
    githubUrl: "https://github.com/thatvivekhingu",
    liveUrl: "https://vivekhingu.vercel.app",
  },
  {
    id: "book-recommender",
    code: "03",
    spineTitle: "BOOK ENGINE",
    title: "BOOK RECOMMENDER",
    subtitle: "Vectorized Cosine Similarity Recommendation Engine",
    category: "MACHINE LEARNING APPLICATION",
    description:
      "Machine learning recommendation engine using cosine similarity and vectorized reader analytics.",
    rightMeta: "PYTHON • SCIKIT-LEARN • PANDAS",
    coverStack: "PYTHON • PANDAS • ML",
    badgeText: "ML ENGINE",
    heightPx: 228,
    finish: "charcoal",
    inRowList: true,
    metrics: [
      { label: "ALGORITHM", value: "Cosine Similarity" },
      { label: "DATA PIPELINE", value: "Pandas Vectorized" },
      { label: "ANALYTICS", value: "Genre & Trend BI" },
    ],
    highlights: [
      "Developed a machine learning-based book recommendation engine powered by high-dimensional matrix vectorization and Cosine Similarity.",
      "Executed large-scale data cleaning, feature preprocessing, and exploratory data analysis using Pandas and NumPy.",
      "Built an interactive reader analytics dashboard surfacing similarity scores, top-rated picks, and genre distribution insights.",
    ],
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Cosine Similarity", "Matplotlib", "Data Analytics"],
    githubUrl: "https://github.com/thatvivekhingu",
    liveUrl: "https://vivekhingu.vercel.app",
  },
  {
    id: "startup-predictor",
    code: "04",
    spineTitle: "STARTUP AI",
    title: "STARTUP PREDICTOR",
    subtitle: "Predictive ML Classification & Funding Intelligence Suite",
    category: "ML & PREDICTIVE ANALYTICS",
    description:
      "Predictive ML classification & BI dashboard evaluating startup funding probability and growth.",
    rightMeta: "FASTAPI • REACT • SCIKIT-LEARN",
    coverStack: "FASTAPI • REACT • SCIKIT",
    badgeText: "PREDICTIVE BI",
    heightPx: 208,
    finish: "parchment",
    inRowList: true,
    metrics: [
      { label: "ENSEMBLE MODELS", value: "Random Forest + ET" },
      { label: "API LAYER", value: "FastAPI + CSV Bulk" },
      { label: "FRONTEND", value: "React + Tailwind" },
    ],
    highlights: [
      "Engineered an end-to-end AI platform predicting startup funding probability and growth trajectory using ML classification ensembles.",
      "Benchmarked Random Forest and Extra Trees classifiers with feature engineering to maximize predictive accuracy.",
      "Delivered secure authentication, CSV bulk-prediction endpoints via FastAPI, and a real-time React + Tailwind BI dashboard.",
    ],
    stack: ["Python", "FastAPI", "React", "Scikit-learn", "SQL", "Tailwind CSS", "Random Forest", "Extra Trees"],
    githubUrl: "https://github.com/thatvivekhingu",
    liveUrl: "https://vivekhingu.vercel.app",
  },
  {
    id: "jarvis-os",
    code: "A1",
    spineTitle: "JARVIS OS",
    title: "JARVIS AGENTIC OS",
    subtitle: "Multi-Agent Autonomous Workflow & Voice Orchestrator",
    category: "AGENTIC AI ARCHIVE",
    description:
      "Autonomous multi-agent assistant executing tool-augmented tasks, code workflows, and voice commands.",
    rightMeta: "LANGGRAPH • PYTHON • AGENTS",
    coverStack: "LANGGRAPH • LLM AGENTS",
    badgeText: "AGENTIC AI",
    heightPx: 236,
    finish: "charcoal",
    inRowList: false,
    metrics: [
      { label: "ORCHESTRATION", value: "LangGraph Cyclic" },
      { label: "TOOL CALLING", value: "Autonomous Actions" },
      { label: "MEMORY", value: "Vector Context" },
    ],
    highlights: [
      "Architected a stateful multi-agent reasoning graph using LangGraph for autonomous task decomposition and tool execution.",
      "Integrated structured function calling, contextual memory retrieval, and voice command triggers.",
    ],
    stack: ["Python", "LangGraph", "LangChain", "OpenAI API", "Gemini API", "Vector Databases"],
    githubUrl: "https://github.com/thatvivekhingu",
    liveUrl: "https://vivekhingu.vercel.app",
  },
  {
    id: "robo-soccer",
    code: "A2",
    spineTitle: "ROBO SOCCER",
    title: "ROBO SOCCER BOT",
    subtitle: "Autonomous Robotics & Real-Time Arena Control System",
    category: "1ST PRIZE CHAMPIONSHIP BUILD",
    description:
      "1st Prize winning autonomous robotics and embedded control system engineered for competitive robo soccer.",
    rightMeta: "1ST PRIZE • EMBEDDED ROBOTICS",
    coverStack: "EMBEDDED • IOT • CONTROL",
    badgeText: "1ST PRIZE",
    heightPx: 220,
    finish: "parchment",
    inRowList: false,
    metrics: [
      { label: "AWARD", value: "1st Prize Winner" },
      { label: "ARCHITECTURE", value: "Embedded + IoT" },
      { label: "LATENCY", value: "Real-Time Control" },
    ],
    highlights: [
      "Designed and implemented an autonomous robotic solution that won 1st place in the Robo Soccer Championship.",
      "Engineered low-latency motor actuation, sensor fusion, and precision maneuverability for competitive matches.",
    ],
    stack: ["Embedded Systems", "IoT", "Robotics", "C++", "Python", "Hardware Control"],
    githubUrl: "https://github.com/thatvivekhingu",
    liveUrl: "https://vivekhingu.vercel.app",
  },
  {
    id: "gujjuverse",
    code: "A3",
    spineTitle: "GUJJUVERSE",
    title: "GUJJUVERSE",
    subtitle: "Regional Cultural & Generative AI Ecosystem",
    category: "SPECIAL EDITION VOLUME",
    description:
      "Interactive regional AI showcase built in Ahmedabad combining Gujarati cultural intelligence with modern LLMs.",
    rightMeta: "GENAI • REGIONAL NLP",
    coverStack: "GEMINI • NEXT.JS • NLP",
    badgeText: "SPECIAL VOL",
    heightPx: 200,
    finish: "accent",
    leaning: true,
    inRowList: false,
    metrics: [
      { label: "ORIGIN", value: "Ahmedabad, Gujarat" },
      { label: "FOCUS", value: "Regional AI & Culture" },
      { label: "EDITION", value: "Volume A3" },
    ],
    highlights: [
      "Designed and shipped GujjuVerse as a dedicated cultural-tech universe blending regional storytelling with interactive AI tools.",
      "Showcases localized Gujarati NLP and generative AI experiences on vivekhingu.vercel.app.",
    ],
    stack: ["Next.js", "Gemini API", "Tailwind CSS", "NLP", "TypeScript"],
    githubUrl: "https://github.com/thatvivekhingu",
    liveUrl: "https://vivekhingu.vercel.app",
  },
];

export default function Projects() {
  const [accent, setAccent] = useState("#C88A55");
  const [motionOn, setMotionOn] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<ProjectVolume | null>(null);

  const rowProjects = VOLUMES.filter((v) => v.inRowList);

  const handleOpenCaseStudy = (vol: ProjectVolume) => {
    playTapSound("chime");
    setSelectedVolume(vol);
    setActiveId(vol.id);
  };

  const handleCloseCaseStudy = () => {
    playTapSound("pop");
    setSelectedVolume(null);
  };

  const triggerVianQuery = (projectTitle: string) => {
    playTapSound("chime");
    if (typeof window !== "undefined") {
      const event = new CustomEvent("openVianWithQuery", {
        detail: { query: `Tell me about the architecture, tech stack, and key metrics of ${projectTitle}` },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      id="projects"
      style={{ "--accent-color": accent } as React.CSSProperties}
      className={`relative w-full ${!motionOn ? "motion-off" : ""}`}
    >
      {/* Upper Split Shelf Section */}
      <div className="w-full pt-3 sm:pt-6">
        {/* Top Header & Controls Bar */}
        <SectionHeading
          number="05"
          chapter="CHAPTER 05 — SELECTED WORKS"
          rightElement={
            <div className="flex items-center gap-5 sm:gap-7 shrink-0">
              {/* 4 Natural Editorial Accent Swatches */}
              <div className="flex items-center gap-2.5" role="group" aria-label="Natural Accent Color Swatches">
                {ACCENTS.map((item) => (
                  <button
                    key={item.hex}
                    type="button"
                    onClick={() => {
                      playTapSound("pop");
                      setAccent(item.hex);
                    }}
                    style={{ backgroundColor: item.hex }}
                    title={`${item.name} (${item.hex})`}
                    aria-label={`${item.name} Theme`}
                    className={`w-3 h-3 rounded-full transition-transform hover:scale-125 cursor-pointer ${
                      accent === item.hex
                        ? "ring-2 ring-offset-2 ring-offset-[#121211] ring-[#C88A55]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>

              {/* Functional MOTION ON / OFF Toggle */}
              <button
                type="button"
                onClick={() => {
                  playTapSound("pop");
                  setMotionOn((prev) => !prev);
                }}
                aria-pressed={motionOn}
                className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#ECE7DD]/85 hover:text-[#ECE7DD] transition-colors cursor-pointer"
              >
                <span
                  style={{ backgroundColor: accent }}
                  className={`w-2 h-2 rounded-full inline-block ${motionOn ? "animate-pulse" : ""}`}
                />
                <span>{motionOn ? "MOTION ON" : "MOTION OFF"}</span>
              </button>
            </div>
          }
        >
          <span className="text-[#3B82F6]">SELECTED</span>{" "}
          <span className="text-white">PROJECTS &amp; WORK</span>
        </SectionHeading>

        {/* Shelf Split Container Resting on Warm Charcoal Line */}
        <div className="w-full border-b border-[#282725] flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-6 relative pb-0">
          {/* Left Editorial Heading */}
          <div className="pb-4 lg:pb-8 max-w-md">
            <p className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-[#9C968B] mb-2 sm:mb-3">
              ALSO ON THE SHELF
            </p>
            <h2 className="font-serif text-[34px] sm:text-[48px] lg:text-[56px] leading-[0.98] tracking-[-0.01em] text-[#ECE7DD]">
              Every project as a<br />
              volume.{" "}
              <span className="italic" style={{ color: accent }}>
                Pull one out.
              </span>
            </h2>
            <p className="text-[10.5px] font-mono text-[#9C968B] lg:hidden mt-2 select-none flex items-center gap-1.5">
              <span>👆 Tap volume to pull out • Swipe shelf</span>
            </p>
          </div>



          {/* Right Side: True 3D CSS Perspective Hardcover Manga Shelf */}
          <div className="shelf-stage w-full lg:w-auto overflow-x-auto lg:overflow-visible pt-4 lg:pt-6 pb-2 flex items-end justify-start lg:justify-end no-scrollbar snap-x snap-mandatory touch-pan-x">
            <div
              className="flex items-end gap-[3px] sm:gap-[2px] min-w-max pr-6 pl-2"
              role="list"
              aria-label="Interactive 3D Project Volumes Shelf"
            >
              {VOLUMES.map((vol) => {
                const isPulled = activeId === vol.id;
                const finishStyle =
                  vol.finish === "charcoal"
                    ? { backgroundColor: "#181817", color: "#ECE7DD" }
                    : vol.finish === "accent"
                    ? { backgroundColor: accent, color: "#121211" }
                    : { backgroundColor: "#ECE7DD", color: "#121211" };

                const badgeClass =
                  vol.finish === "charcoal"
                    ? "bg-[#ECE7DD] text-[#121211]"
                    : "bg-[#121211] text-[#ECE7DD]";

                const stampStyle =
                  vol.finish === "accent"
                    ? { backgroundColor: "#121211", color: "#ECE7DD" }
                    : { backgroundColor: accent, color: "#121211" };

                const leaningClass = vol.leaning ? "is-leaning" : "";
                const pulledClass = isPulled ? "is-pulled" : "";

                return (
                  <div
                    key={vol.id}
                    role="listitem"
                    tabIndex={0}
                    style={{ "--book-h": `${vol.heightPx}px` } as React.CSSProperties}
                    className={`book-slot ${leaningClass} ${pulledClass} snap-center shrink-0 active:scale-95 transition-transform`}
                    data-cursor="Open"
                    aria-label={`Volume ${vol.code}: ${vol.title}`}
                    onMouseEnter={() => {
                      playTapSound("pop");
                      setActiveId(vol.id);
                    }}
                    onMouseLeave={() => {
                      if (!selectedVolume) setActiveId(null);
                    }}
                    onClick={() => {
                      if (activeId === vol.id) {
                        handleOpenCaseStudy(vol);
                      } else {
                        playTapSound("pop");
                        setActiveId(vol.id);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenCaseStudy(vol);
                      }
                    }}
                  >
                    {/* Realistic Shelf Cast Shadow */}
                    <div className="book-shadow" aria-hidden="true" />

                    {/* 3D Hardcover Volume Object */}
                    <div className="book-3d">
                      {/* 1. 3D Front Cover Face */}
                      <div
                        style={{
                          ...finishStyle,
                          borderColor: isPulled ? accent : "#3A3835",
                        }}
                        className="book-face-front"
                      >
                        <div className="flex items-center justify-between pl-1.5">
                          <span className="font-mono text-[10px] font-bold tracking-wider opacity-80">{vol.code}</span>
                          <span className="font-mono text-[8px] uppercase tracking-widest opacity-55">VOL.</span>
                        </div>

                        <div className="my-auto py-1 pl-1.5">
                          <h3 className="font-[family-name:var(--font-anton)] text-[22px] leading-[0.94] uppercase tracking-tight">
                            {vol.title}
                          </h3>
                          <p className="font-mono text-[7.5px] font-semibold uppercase tracking-wider opacity-75 mt-1.5">
                            {vol.coverStack}
                          </p>
                        </div>

                        <div className="flex items-end justify-between gap-1 pt-1 pl-1.5">
                          <span className={`px-1.5 py-0.5 ${badgeClass} font-mono text-[8px] font-bold uppercase tracking-wider`}>
                            {vol.badgeText}
                          </span>

                          <span
                            style={stampStyle}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenCaseStudy(vol);
                            }}
                            className="w-11 h-11 rounded-full font-mono text-[8.5px] font-extrabold uppercase tracking-wider flex items-center justify-center shrink-0 shadow-md active:scale-90 transition-transform cursor-pointer"
                          >
                            OPEN
                          </span>
                        </div>
                      </div>

                      {/* 2. 3D Hardcover Spine Face */}
                      <div
                        style={{
                          ...finishStyle,
                          borderColor: isPulled ? accent : "#3A3835",
                        }}
                        className="book-face-spine"
                      >
                        <span className="spine-title">{vol.spineTitle}</span>
                        <span className="spine-code">{vol.code}</span>
                      </div>

                      {/* 3. 3D Ribbed Parchment Page-Edge Block */}
                      <div className="book-face-pages" aria-hidden="true" />

                      {/* 4. 3D Top Page Thickness */}
                      <div className="book-face-top" aria-hidden="true" />

                      {/* 5. 3D Back Cover Board */}
                      <div
                        style={{
                          ...finishStyle,
                          borderColor: isPulled ? accent : "#3A3835",
                        }}
                        className="book-face-back"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Horizontal Project Index Rows */}
      <div className="w-full flex flex-col pt-2 sm:pt-4">
        {rowProjects.map((proj) => {
          const isActive = activeId === proj.id;
          return (
            <article
              key={proj.id}
              tabIndex={0}
              className={`work-row py-4 sm:py-7 lg:py-8 px-3 sm:px-4 grid grid-cols-12 items-center gap-y-2 sm:gap-y-3 gap-x-4 rounded-xl sm:rounded-none active:bg-white/5 active:scale-[0.99] transition-all cursor-pointer ${
                isActive ? "is-active" : ""
              }`}
              data-cursor="Open"
              aria-label={`${proj.code} ${proj.title}`}
              onMouseEnter={() => {
                setActiveId(proj.id);
              }}
              onMouseLeave={() => {
                if (!selectedVolume) setActiveId(null);
              }}
              onClick={() => handleOpenCaseStudy(proj)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenCaseStudy(proj);
                }
              }}
            >
              {/* Col 1: Index Code */}
              <div className="col-span-2 sm:col-span-1">
                <span className="font-mono text-xs font-bold tracking-widest opacity-60">
                  {proj.code}
                </span>
              </div>

              {/* Col 2: Huge Condensed Anton Title */}
              <div className="col-span-10 sm:col-span-11 lg:col-span-4">
                <h3 className="work-row-title font-[family-name:var(--font-anton)] text-[34px] sm:text-[44px] xl:text-[50px] uppercase leading-[0.92] tracking-tight">
                  {proj.title}
                </h3>
              </div>

              {/* Col 3: Concise Description */}
              <div className="col-span-12 lg:col-span-4 lg:pr-4">
                <p className="work-row-desc text-[13px] sm:text-[14px] leading-relaxed font-normal">
                  {proj.description}
                </p>
              </div>

              {/* Col 4: Right Tag • Venue + Diagonal Arrow ↗ */}
              <div className="col-span-12 lg:col-span-3 flex items-center justify-between lg:justify-end gap-5 pt-1 lg:pt-0">
                <span className="work-row-meta font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em]">
                  {proj.rightMeta}
                </span>
                <span
                  style={{ color: isActive ? "#121211" : accent }}
                  className="work-row-arrow font-mono text-lg font-bold leading-none"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Case Study Modal (Native App Bottom Sheet on Mobile, Centered Modal on Desktop) */}
      {selectedVolume && (
        <div
          className="fixed inset-0 z-50 bg-[#121211]/88 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={handleCloseCaseStudy}
        >
          <div
            className="w-full max-w-2xl bg-[#181817] text-[#ECE7DD] border-t-2 sm:border-2 border-[#3A3835] shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[90vh] rounded-t-[28px] sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator Bar */}
            <div className="w-full flex items-center justify-center pt-2.5 pb-1 sm:hidden bg-[#121211]">
              <span className="w-10 h-1 bg-neutral-600 rounded-full" />
            </div>

            {/* Modal Top Strip */}
            <div className="px-5 sm:px-6 py-3 bg-[#121211] border-b border-[#282725] text-[#ECE7DD] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.16em]">
                <span style={{ backgroundColor: accent }} className="px-2 py-0.5 text-[#121211] font-extrabold rounded-sm">
                  VOL. {selectedVolume.code}
                </span>
                <span className="text-[#9C968B] text-[10px] sm:text-xs truncate max-w-[200px] sm:max-w-none">{selectedVolume.category}</span>
              </div>
              <button
                type="button"
                onClick={handleCloseCaseStudy}
                className="w-8 h-8 rounded-full sm:rounded-none border border-[#3A3835] text-[#ECE7DD] hover:bg-[#ECE7DD] hover:text-[#121211] font-mono text-xs flex items-center justify-center transition-all active:scale-90 cursor-pointer"
                aria-label="Close Case Study"
              >
                <IconX className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <p style={{ color: accent }} className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] mb-1.5">
                  {selectedVolume.rightMeta}
                </p>
                <h2 className="font-[family-name:var(--font-anton)] text-3xl sm:text-5xl uppercase leading-[0.95] text-[#ECE7DD]">
                  {selectedVolume.title}
                </h2>
                <p className="font-serif italic text-xl sm:text-2xl text-[#9C968B] mt-1">
                  {selectedVolume.subtitle}
                </p>
              </div>

              {/* Architecture & Impact Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedVolume.metrics.map((m, idx) => (
                  <div key={idx} className="border border-[#282725] bg-[#121211] p-3">
                    <span className="block font-mono text-[9px] font-bold uppercase tracking-widest text-[#9C968B]">
                      {m.label}
                    </span>
                    <span className="block font-[family-name:var(--font-anton)] text-lg sm:text-xl uppercase tracking-wide text-[#ECE7DD] mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Engineering Highlights */}
              <div className="border-t border-b border-[#282725] py-4 space-y-2.5">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-[#9C968B]">
                  ENGINEERING ARCHITECTURE &amp; IMPACT
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#ECE7DD]/90 leading-relaxed list-disc pl-5">
                  {selectedVolume.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Tags */}
              <div>
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#9C968B] mb-2.5">
                  TECH STACK &amp; INFRASTRUCTURE
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVolume.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 border border-[#3A3835] bg-[#121211] text-[#ECE7DD] font-mono text-[11px] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#282725]">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={selectedVolume.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: accent }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[#121211] hover:opacity-90 text-xs font-mono font-extrabold uppercase tracking-wider transition-opacity shadow-sm"
                  >
                    <IconBrandGithub className="w-4 h-4" />
                    <span>SOURCE ON GITHUB</span>
                    <span>↗</span>
                  </a>

                  <a
                    href={selectedVolume.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#3A3835] bg-[#121211] hover:bg-[#ECE7DD] text-[#ECE7DD] hover:text-[#121211] text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                  >
                    <IconExternalLink className="w-4 h-4" />
                    <span>LIVE DEPLOYMENT</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* Ask VIAN Trigger */}
                <button
                  type="button"
                  onClick={() => triggerVianQuery(selectedVolume.title)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#282725] hover:bg-[#3A3835] text-[#ECE7DD] text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <IconSparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask VIAN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}