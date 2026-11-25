"use client";

import React, { useState } from "react";
import { IconSchool, IconCertificate, IconSparkles } from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { playTapSound } from "@/lib/sound";

export interface EducationVolume {
  id: string;
  code: string;
  spineTitle: string;
  title: string;
  subtitle: string;
  institution: string;
  category: string;
  description: string;
  rightMeta: string;
  coverStack: string;
  badgeText: string;
  heightPx: number;
  finish: "charcoal" | "parchment" | "accent";
  metrics: { label: string; value: string }[];
  highlights: string[];
  coursework: string[];
  timeline: string;
  grade: string;
}

const ACCENTS = [
  { name: "Academic Gold", hex: "#D4AF37" },
  { name: "Electric Blue", hex: "#3B82F6" },
  { name: "Emerald Sage", hex: "#10B981" },
  { name: "Crimson Rose", hex: "#E11D48" },
];

const VOLUMES: EducationVolume[] = [
  {
    id: "be-it",
    code: "01",
    spineTitle: "B.E. INFORMATION TECH",
    title: "B.E. IN INFORMATION TECHNOLOGY",
    subtitle: "SAL College of Engineering • Gujarat Technological University (GTU)",
    institution: "SAL College of Engineering",
    category: "UNDERGRADUATE DEGREE • 2023 – 2027",
    description:
      "Four-year intensive Bachelor of Engineering curriculum specializing in Machine Learning, Artificial Intelligence, and enterprise computing systems. Maintained First Class with Distinction standing with 8.61 / 10 CGPA.",
    rightMeta: "AHMEDABAD, GUJARAT, INDIA",
    coverStack: "GTU • IT MAJOR • CGPA 8.61",
    badgeText: "ACTIVE SENIOR",
    heightPx: 254,
    finish: "accent",
    timeline: "July 2023 – June 2027",
    grade: "8.61 / 10 CGPA",
    metrics: [
      { label: "CUMULATIVE CGPA", value: "8.61 / 10" },
      { label: "ACADEMIC TIMELINE", value: "2023 – 2027" },
      { label: "MAJOR / DISCIPLINE", value: "Information Technology" },
    ],
    highlights: [
      "Consistently ranked in the top academic tier across 8 semesters of core computer science and software engineering curriculum.",
      "In-depth theoretical and applied coursework in Machine Learning, AI Systems, Probability & Statistics, and Relational Databases.",
      "Engineered real-world multilingual voice AI and generative systems concurrently alongside university academics.",
      "Participated in university technical symposiums, robotics championships, and national hackathons.",
    ],
    coursework: [
      "Machine Learning",
      "Artificial Intelligence",
      "Data Science",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Python Programming",
      "Probability & Statistics",
      "Linear Algebra",
      "Computer Networks",
    ],
  },
  {
    id: "ai-labs",
    code: "02",
    spineTitle: "APPLIED AI & ML LABS",
    title: "ADVANCED AI & CS SPECIALIZATION",
    subtitle: "Applied Machine Learning, Neural Networks & Autonomous Agents",
    institution: "AI Systems & Lab Research",
    category: "SPECIALIZED RESEARCH & LAB TRACKS",
    description:
      "Advanced technical laboratory curriculum focused on deep learning pipelines, transformer architectures, low-latency inference, and agentic LLM orchestration.",
    rightMeta: "DEEP LEARNING & LABS",
    coverStack: "PYTORCH • TENSORS • NLP • RAG",
    badgeText: "SPECIALIZATION",
    heightPx: 236,
    finish: "charcoal",
    timeline: "2023 – Present",
    grade: "Distinction in Labs",
    metrics: [
      { label: "CORE DOMAIN", value: "Generative AI & LLMs" },
      { label: "PRACTICAL LABS", value: "10+ Deployed Prototypes" },
      { label: "HONORS & AWARDS", value: "Global Hackathon Wins" },
    ],
    highlights: [
      "Architected low-latency streaming inference pipelines using Grok, Gemini, and open transformer models.",
      "Conducted research on Retrieval-Augmented Generation (RAG) using dense vector embeddings and pgvector storage.",
      "Trained custom vision, classification, and regression neural networks using PyTorch and Scikit-learn.",
      "Secured 2nd Place in the Flinders International AI Hackathon and Top 10 in AIT Hackathon 2K25.",
    ],
    coursework: [
      "Deep Learning",
      "Transformer Architectures",
      "Natural Language Processing",
      "Vector Databases",
      "RAG Orchestration",
      "Model Evaluation",
      "Computer Vision",
      "FastAPI & Microservices",
    ],
  },
  {
    id: "hsc-science",
    code: "03",
    spineTitle: "HIGHER SECONDARY SCIENCE",
    title: "SCIENCE & MATHEMATICS (HSC / SSC)",
    subtitle: "Pre-Engineering Science Stream • Analytical Foundations",
    institution: "Gujarat Board of Secondary & Higher Education (GSEB)",
    category: "PRE-ENGINEERING SECONDARY EDUCATION",
    description:
      "Rigorous foundational training in Higher Mathematics (Calculus, Coordinate Geometry, Probability), Classical Physics, and Chemistry, cultivating algorithmic problem-solving instincts.",
    rightMeta: "GSEB BOARD OF EDUCATION",
    coverStack: "CALCULUS • MECHANICS • LOGIC",
    badgeText: "FOUNDATION",
    heightPx: 218,
    finish: "parchment",
    timeline: "Completed with Honors",
    grade: "First Class with Distinction",
    metrics: [
      { label: "ACADEMIC STREAM", value: "Science (PCM)" },
      { label: "MATHEMATICS", value: "Calculus & Algebra" },
      { label: "CORE FOUNDATION", value: "Quantitative Logic" },
    ],
    highlights: [
      "Mastered rigorous Pre-Engineering curriculum emphasizing advanced Calculus, Probability, and Vector Algebra.",
      "Developed deep mathematical intuition and physical reasoning that underpins current machine learning algorithms.",
      "Demonstrated analytical discipline and academic rigor leading into University Computer Engineering.",
    ],
    coursework: [
      "Differential Calculus",
      "Integral Calculus",
      "Probability & Statistics",
      "Vector Algebra",
      "Classical Mechanics",
      "Electromagnetism",
      "Analytical Logic",
    ],
  },
];

export default function Education() {
  const [selectedAccentIndex, setSelectedAccentIndex] = useState(0);
  const [motionOn, setMotionOn] = useState(true);
  const [activeId, setActiveId] = useState<string>("be-it");

  const activeAccent = ACCENTS[selectedAccentIndex].hex;
  const activeVolume = VOLUMES.find((v) => v.id === activeId) || VOLUMES[0];

  const handleSelectVolume = (vol: EducationVolume) => {
    playTapSound("pop");
    setActiveId(vol.id);
  };

  return (
    <div className="flex flex-col space-y-6 sm:space-y-10 w-full select-none">
      <SectionHeading>
        <span className="text-[#3B82F6]">ACADEMIC</span>{" "}
        <span className="text-white">&amp; EDUCATION</span>
      </SectionHeading>

      {/* 3D HARDCOVER CREDENTIAL ARCHIVE CONTAINER */}
      <div className="w-full bg-[#121211] border border-[#282725] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_24px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
        {/* Top Control Bar: Controls matching Selected Work section */}
        <div className="flex items-center justify-between border-b border-[#282725] pb-4 sm:pb-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <span
              style={{ backgroundColor: activeAccent }}
              className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
            />
            <span className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#ECE7DD]">
              3D ACADEMIC DOSSIER ARCHIVE
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Palette Dots */}
            <div className="hidden sm:flex items-center gap-1.5" role="group" aria-label="Accent Palette">
              {ACCENTS.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    playTapSound("pop");
                    setSelectedAccentIndex(index);
                  }}
                  title={item.name}
                  style={{ backgroundColor: item.hex }}
                  className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer ${
                    selectedAccentIndex === index
                      ? "ring-2 ring-offset-2 ring-offset-[#121211] ring-white scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>

            {/* Motion Toggle */}
            <button
              type="button"
              onClick={() => {
                playTapSound("pop");
                setMotionOn((prev) => !prev);
              }}
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#ECE7DD]/80 hover:text-white transition-colors cursor-pointer"
            >
              <span
                style={{ backgroundColor: activeAccent }}
                className={`w-2 h-2 rounded-full inline-block ${motionOn ? "animate-pulse" : ""}`}
              />
              <span>{motionOn ? "MOTION ON" : "MOTION OFF"}</span>
            </button>
          </div>
        </div>

        {/* Shelf Split Container */}
        <div className="w-full border-b border-[#282725] flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 sm:pb-10">
          {/* Left Editorial Text */}
          <div className="max-w-md">
            <p className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-[#9C968B] mb-2 sm:mb-3">
              ACADEMIC FOUNDATION &amp; DEGREES
            </p>
            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[0.98] tracking-[-0.01em] text-[#ECE7DD]">
              Every degree as an<br />
              academic tome.{" "}
              <span className="italic" style={{ color: activeAccent }}>
                Pull one out.
              </span>
            </h2>
          </div>

          {/* Right Side: 3D Hardcover Credential Stage */}
          <div className="edu-stage w-full lg:w-auto overflow-x-auto lg:overflow-visible pt-4 pb-2 flex items-end justify-start lg:justify-end">
            <div className="flex items-end gap-3 sm:gap-4 min-w-max pr-4" role="list">
              {VOLUMES.map((vol) => {
                const isPulled = activeId === vol.id;
                const finishStyle =
                  vol.finish === "charcoal"
                    ? { backgroundColor: "#181817", color: "#ECE7DD" }
                    : vol.finish === "accent"
                    ? { backgroundColor: activeAccent, color: "#121211" }
                    : { backgroundColor: "#ECE7DD", color: "#121211" };

                const badgeClass =
                  vol.finish === "charcoal"
                    ? "bg-[#ECE7DD] text-[#121211]"
                    : "bg-[#121211] text-[#ECE7DD]";

                return (
                  <div
                    key={vol.id}
                    onClick={() => handleSelectVolume(vol)}
                    onMouseEnter={() => {
                      playTapSound("pop");
                      setActiveId(vol.id);
                    }}
                    style={{ "--edu-h": `${vol.heightPx}px` } as React.CSSProperties}
                    className={`edu-slot ${isPulled ? "is-pulled" : ""}`}
                  >
                    {/* Shelf Cast Shadow */}
                    <div className="edu-shadow" aria-hidden="true" />

                    {/* 3D Tome Object */}
                    <div className="edu-3d">
                      {/* Front Cover Face */}
                      <div
                        style={{
                          ...finishStyle,
                          borderColor: isPulled ? activeAccent : "#3A3835",
                        }}
                        className="edu-face-front"
                      >
                        <div className="flex items-center justify-between pl-1.5">
                          <span className="font-mono text-[10px] font-bold tracking-wider opacity-80">{vol.code}</span>
                          <span className="font-mono text-[8px] uppercase tracking-widest opacity-60">TOME</span>
                        </div>

                        <div className="my-auto py-1 pl-1.5">
                          <IconSchool className="w-5 h-5 mb-1.5 opacity-80" />
                          <h3 className="font-[family-name:var(--font-anton)] text-[20px] leading-[0.94] uppercase tracking-tight line-clamp-2">
                            {vol.title}
                          </h3>
                          <p className="font-mono text-[8px] font-semibold uppercase tracking-wider opacity-80 mt-1">
                            {vol.coverStack}
                          </p>
                        </div>

                        <div className="flex items-end justify-between gap-1 pt-1 pl-1.5">
                          <span className={`px-1.5 py-0.5 ${badgeClass} font-mono text-[7.5px] font-bold uppercase tracking-wider`}>
                            {vol.badgeText}
                          </span>
                          <span
                            style={{
                              backgroundColor: vol.finish === "accent" ? "#121211" : activeAccent,
                              color: vol.finish === "accent" ? activeAccent : "#121211",
                            }}
                            className="w-10 h-10 rounded-full font-mono text-[8px] font-extrabold uppercase tracking-wider flex items-center justify-center shrink-0 shadow-md"
                          >
                            OPEN
                          </span>
                        </div>
                      </div>

                      {/* Spine Face */}
                      <div
                        style={{
                          ...finishStyle,
                          borderColor: isPulled ? activeAccent : "#3A3835",
                        }}
                        className="edu-face-spine"
                      >
                        <span className="font-mono text-[9px] font-bold tracking-widest opacity-80">{vol.code}</span>
                        <span className="font-[family-name:var(--font-anton)] text-[15px] tracking-widest uppercase writing-vertical-lr rotate-180 my-auto">
                          {vol.spineTitle}
                        </span>
                        <IconCertificate className="w-4 h-4 opacity-70" />
                      </div>

                      {/* Page Block Top & Right */}
                      <div className="edu-face-pages-right" />
                      <div className="edu-face-pages-top" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ACTIVE EDUCATION DOSSIER INSPECTOR BELOW SHELF */}
        <div className="pt-6 sm:pt-8 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#282725] pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white">
                  VOL. {activeVolume.code}
                </span>
                <span className="text-zinc-500 font-mono text-xs">•</span>
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
                  {activeVolume.category}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-anton)] text-2xl sm:text-3xl lg:text-4xl uppercase text-white tracking-tight">
                {activeVolume.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#9C968B] mt-0.5">
                {activeVolume.subtitle}
              </p>
            </div>

            {/* Top Metrics Row */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {activeVolume.metrics.map((m) => (
                <div
                  key={m.label}
                  className="px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-center shadow-inner"
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#9C968B]">
                    {m.label}
                  </span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-white mt-0.5">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Key Academic Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm sm:text-base text-[#ECE7DD]/90 leading-relaxed font-sans">
                {activeVolume.description}
              </p>

              <div className="space-y-2 pt-1">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <IconSparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>KEY ACADEMIC PILLARS &amp; RESEARCH</span>
                </p>
                <ul className="space-y-2">
                  {activeVolume.highlights.map((h, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#9C968B] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span className="leading-snug">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Coursework Chips */}
            <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center justify-between">
                  <span>VERIFIED COURSEWORK</span>
                  <span className="text-[10px] font-normal text-[#9C968B]">
                    {activeVolume.coursework.length} Modules
                  </span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeVolume.coursework.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:border-cyan-400/50 transition-colors"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 mt-4 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <span>{activeVolume.institution}</span>
                <span className="text-emerald-400 font-bold font-mono">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D TOME CSS STYLES */}
      <style jsx>{`
        .edu-stage {
          perspective: 1200px;
        }
        .edu-slot {
          position: relative;
          height: var(--edu-h);
          width: 58px;
          cursor: pointer;
          transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-style: preserve-3d;
        }
        .edu-slot.is-pulled {
          width: 175px;
        }
        .edu-shadow {
          position: absolute;
          bottom: -8px;
          left: 5%;
          width: 90%;
          height: 14px;
          background: rgba(0, 0, 0, 0.95);
          filter: blur(8px);
          border-radius: 50%;
          transform: rotateX(85deg);
          transition: all 0.4s ease;
          pointer-events: none;
        }
        .edu-slot.is-pulled .edu-shadow {
          width: 105%;
          height: 22px;
          filter: blur(12px);
          transform: rotateX(85deg) translateZ(-20px);
        }
        .edu-3d {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-origin: bottom left;
          transform: rotateY(-36deg) rotateX(4deg);
        }
        .edu-slot:hover .edu-3d {
          transform: rotateY(-24deg) rotateX(2deg) translateY(-8px);
        }
        .edu-slot.is-pulled .edu-3d {
          transform: rotateY(-12deg) rotateX(1deg) translateY(-14px) translateZ(32px);
        }
        .edu-face-front {
          position: absolute;
          inset: 0;
          border: 2px solid #3a3835;
          border-radius: 4px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backface-hidden: false;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.45);
          transform: translateZ(24px);
        }
        .edu-face-spine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 48px;
          border: 2px solid #3a3835;
          border-radius: 4px 0 0 4px;
          padding: 12px 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          transform: rotateY(-90deg) translateZ(24px);
          box-shadow: inset -4px 0 10px rgba(0, 0, 0, 0.5);
        }
        .edu-face-pages-right {
          position: absolute;
          top: 3px;
          bottom: 3px;
          right: 0;
          width: 44px;
          background: repeating-linear-gradient(
            to right,
            #d6d0c2,
            #d6d0c2 2px,
            #ece6d6 2px,
            #ece6d6 4px
          );
          transform: rotateY(90deg) translateZ(22px);
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.35);
        }
        .edu-face-pages-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 44px;
          background: repeating-linear-gradient(
            to bottom,
            #d6d0c2,
            #d6d0c2 2px,
            #ece6d6 2px,
            #ece6d6 4px
          );
          transform: rotateX(90deg) translateZ(22px);
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </div>
  );
}