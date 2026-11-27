"use client";

import React from "react";
import {
  IconSchool,
  IconCalendar,
  IconMapPin,
  IconAward,
} from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";

const EDUCATION_DATA = {
  id: "be-it",
  degree: "B.E. in Information Technology",
  institution: "SAL College of Engineering",
  university: "GTU",
  location: "Ahmedabad, India",
  period: "2023 — 2027",
  status: "Final Year",
  grade: "8.61 / 10",
  gradeLabel: "CGPA • First Class with Distinction",
  description:
    "Specializing in Machine Learning, AI Systems, Probability & Statistics, and Distributed Enterprise Computing.",
  coursework: ["Machine Learning", "Deep Learning", "Data Science", "DSA", "DBMS"],
};

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

      {/* 3D Tilt Minimal Education Card */}
      <div className="w-full">
        <TiltCard maxTilt={4} glareOpacity={0.1} className="w-full">
          <div
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
                    {EDUCATION_DATA.status}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
                    <IconCalendar className="w-3 h-3" />
                    {EDUCATION_DATA.period}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                    <IconMapPin className="w-3 h-3" />
                    {EDUCATION_DATA.location}
                  </span>
                </div>

                {/* Degree & Institution */}
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#3B82F6] transition-colors">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <p className="text-sm text-zinc-300 font-medium mt-0.5">
                    {EDUCATION_DATA.institution} • {EDUCATION_DATA.university}
                  </p>
                </div>

                {/* Concise 1-sentence description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                  {EDUCATION_DATA.description}
                </p>

                {/* Essential Focus Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {EDUCATION_DATA.coursework.map((course, idx) => (
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
              <div className="md:w-52 shrink-0 bg-black/50 border border-zinc-800/80 rounded-xl p-4 text-center flex flex-col items-center justify-center space-y-1 self-stretch md:self-auto shadow-inner">
                <div className="w-9 h-9 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6] mb-1">
                  <IconAward className="w-5 h-5" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {EDUCATION_DATA.grade}
                </p>
                <p className="text-[11px] font-semibold text-[#3B82F6]">
                  {EDUCATION_DATA.gradeLabel}
                </p>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
