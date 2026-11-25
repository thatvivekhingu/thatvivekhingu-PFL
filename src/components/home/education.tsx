"use client";

import React from "react";
import {
  IconSchool,
  IconCertificate,
  IconCalendar,
  IconMapPin,
  IconAward,
  IconCheck,
} from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  university?: string;
  location: string;
  period: string;
  status: string;
  grade: string;
  gradeLabel: string;
  description: string;
  highlights: string[];
  coursework: string[];
  featured?: boolean;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: "be-it",
    degree: "Bachelor of Engineering in Information Technology",
    institution: "SAL College of Engineering",
    university: "Gujarat Technological University (GTU)",
    location: "Ahmedabad, Gujarat, India",
    period: "2023 — 2027",
    status: "Final Year / Senior",
    grade: "8.61 / 10 CGPA",
    gradeLabel: "First Class with Distinction",
    description:
      "Four-year intensive Bachelor of Engineering curriculum specializing in Machine Learning, Artificial Intelligence, and enterprise computing systems. Maintained First Class with Distinction standing with 8.61 / 10 CGPA.",
    highlights: [
      "Consistently ranked in the top academic tier across core computer science and engineering coursework.",
      "In-depth theoretical and applied curriculum in Machine Learning, AI Systems, Probability & Statistics, and Relational Databases.",
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
    featured: true,
  },
  {
    id: "ai-specialization",
    degree: "Applied Machine Learning & AI Specialization",
    institution: "Lab Research & Systems Architecture",
    location: "Independent Research",
    period: "2023 — Present",
    status: "Ongoing Specialization",
    grade: "10+ Deployed Prototypes",
    gradeLabel: "Hackathon Honors & Awards",
    description:
      "Advanced technical laboratory curriculum focused on deep learning pipelines, transformer architectures, low-latency inference, and agentic LLM orchestration.",
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
    featured: false,
  },
  {
    id: "hsc-science",
    degree: "Higher Secondary & Secondary Science (HSC / SSC)",
    institution: "Gujarat Secondary & Higher Secondary Education Board (GSEB)",
    location: "Ahmedabad, Gujarat, India",
    period: "Completed with Honors",
    status: "PCM Stream",
    grade: "Distinction Standing",
    gradeLabel: "Pre-Engineering Academic Honors",
    description:
      "Rigorous foundational training in Higher Mathematics (Calculus, Coordinate Geometry, Probability), Classical Physics, and Chemistry, cultivating algorithmic problem-solving instincts.",
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
    featured: false,
  },
];

export default function Education() {
  return (
    <div className="flex flex-col w-full select-none">
      {/* Editorial Chapter Heading */}
      <SectionHeading
        number="03"
        chapter="CHAPTER 03 — ACADEMIC ARCHIVE"
      >
        <span className="text-[#3B82F6]">ACADEMIC</span>{" "}
        <span className="text-white">&amp; EDUCATION</span>
      </SectionHeading>

      {/* Clean Education Cards Grid */}
      <div className="space-y-6 w-full">
        {/* Featured Undergraduate Degree Card */}
        {EDUCATION_DATA.filter((e) => e.featured).map((edu) => (
          <div
            key={edu.id}
            className="group relative bg-[#121211] border border-zinc-800/80 hover:border-zinc-700/90 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-xl overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#3B82F6] via-blue-500/40 to-transparent opacity-80" />

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Left Column: Degree & Details */}
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30">
                    <IconSchool className="w-3.5 h-3.5" />
                    {edu.status}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
                    <IconCalendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                    <IconMapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {edu.location}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#3B82F6] transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 font-medium mt-1">
                    {edu.institution} {edu.university && `• ${edu.university}`}
                  </p>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
                  {edu.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400">
                    Key Academic Highlights:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {edu.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <IconCheck className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coursework Tags */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-400">
                    Core Coursework &amp; Specializations:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800 hover:border-zinc-700 transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: CGPA / Grade Card */}
              <div className="lg:w-60 shrink-0 bg-black/40 border border-zinc-800/90 rounded-xl p-5 text-center flex flex-col items-center justify-center space-y-2 self-stretch lg:self-auto">
                <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                  <IconAward className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-white tracking-tight font-mono">
                    {edu.grade}
                  </p>
                  <p className="text-xs font-semibold text-[#3B82F6] mt-0.5">
                    {edu.gradeLabel}
                  </p>
                </div>
                <p className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/80 w-full">
                  Undergraduate Academic Tier
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Secondary Education Grid: Labs & High School */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {EDUCATION_DATA.filter((e) => !e.featured).map((edu) => (
            <div
              key={edu.id}
              className="group bg-[#121211] border border-zinc-800/80 hover:border-zinc-700/90 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                    <IconCertificate className="w-3.5 h-3.5 text-[#3B82F6]" />
                    {edu.status}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {edu.period}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-[#3B82F6] transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
                    {edu.institution}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
                  <IconAward className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span className="font-bold text-white">{edu.grade}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400">{edu.gradeLabel}</span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {edu.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-1">
                  {edu.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <IconCheck className="w-3.5 h-3.5 text-[#3B82F6] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coursework Tags */}
              <div className="pt-4 mt-4 border-t border-zinc-800/80">
                <div className="flex flex-wrap gap-1">
                  {edu.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-900 text-zinc-400 border border-zinc-800/80"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
