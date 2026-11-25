"use client";

import React from "react";
import {
  IconSchool,
  IconCertificate,
  IconCalendar,
  IconMapPin,
  IconAward,
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
  coursework: string[];
  featured?: boolean;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: "be-it",
    degree: "B.E. in Information Technology",
    institution: "SAL College of Engineering",
    university: "GTU",
    location: "Ahmedabad, India",
    period: "2023 — 2027",
    status: "Final Year",
    grade: "8.61 CGPA",
    gradeLabel: "First Class with Distinction",
    description:
      "Specializing in Machine Learning, AI Systems, Probability & Statistics, and Distributed Enterprise Computing.",
    coursework: ["Machine Learning", "Deep Learning", "Data Science", "DSA", "DBMS"],
    featured: true,
  },
  {
    id: "ai-specialization",
    degree: "Applied AI & Systems Research",
    institution: "Independent Lab Architecture",
    location: "Research & Systems",
    period: "2023 — Present",
    status: "Specialization",
    grade: "10+ Systems",
    gradeLabel: "Hackathon Honors",
    description:
      "Architecting low-latency LLM agent pipelines, RAG frameworks, and real-time neural inference systems.",
    coursework: ["Transformers", "RAG", "PyTorch", "Vector DBs"],
    featured: false,
  },
  {
    id: "hsc-science",
    degree: "Higher Secondary Science (HSC)",
    institution: "GSEB Board",
    location: "Ahmedabad, India",
    period: "Completed",
    status: "PCM Stream",
    grade: "Distinction",
    gradeLabel: "Pre-Engineering",
    description:
      "Core analytical foundation in Higher Mathematics, Advanced Calculus, Probability, and Classical Physics.",
    coursework: ["Calculus", "Linear Algebra", "Physics"],
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

      {/* Clean, Minimal Education Cards */}
      <div className="space-y-4 sm:space-y-5 w-full">
        {/* Featured Degree Card */}
        {EDUCATION_DATA.filter((e) => e.featured).map((edu) => (
          <div
            key={edu.id}
            className="group relative bg-[#121211]/90 hover:bg-[#151514] border border-zinc-800/80 hover:border-blue-500/40 rounded-2xl p-5 sm:p-7 transition-all duration-300 shadow-xl overflow-hidden"
          >
            {/* Ambient Accent Line */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#3B82F6] via-blue-400/40 to-transparent opacity-80" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-2.5 flex-1">
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30">
                    <IconSchool className="w-3.5 h-3.5" />
                    {edu.status}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
                    <IconCalendar className="w-3 h-3" />
                    {edu.period}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                    <IconMapPin className="w-3 h-3" />
                    {edu.location}
                  </span>
                </div>

                {/* Degree & Institution */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#3B82F6] transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-zinc-300 font-medium mt-0.5">
                    {edu.institution} {edu.university && `• ${edu.university}`}
                  </p>
                </div>

                {/* Concise 1-sentence description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                  {edu.description}
                </p>

                {/* Essential Focus Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {edu.coursework.map((course, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800/90"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              {/* Distinction & CGPA Badge */}
              <div className="md:w-52 shrink-0 bg-black/50 border border-zinc-800/80 rounded-xl p-4 text-center flex flex-col items-center justify-center space-y-1 self-stretch md:self-auto">
                <div className="w-9 h-9 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] mb-1">
                  <IconAward className="w-5 h-5" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {edu.grade}
                </p>
                <p className="text-[11px] font-semibold text-[#3B82F6]">
                  {edu.gradeLabel}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Secondary Education Grid (Minimal & Punchy) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
          {EDUCATION_DATA.filter((e) => !e.featured).map((edu) => (
            <div
              key={edu.id}
              className="group bg-[#121211]/90 hover:bg-[#151514] border border-zinc-800/80 hover:border-zinc-700/90 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800">
                    <IconCertificate className="w-3.5 h-3.5 text-[#3B82F6]" />
                    {edu.status}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {edu.period}
                  </span>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#3B82F6] transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
                    {edu.institution}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/40 border border-zinc-800/80 text-xs">
                  <IconAward className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span className="font-bold text-white">{edu.grade}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400">{edu.gradeLabel}</span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>

              {/* Minimal Tags */}
              <div className="pt-2 border-t border-zinc-800/60 flex flex-wrap gap-1">
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
          ))}
        </div>
      </div>
    </div>
  );
}
