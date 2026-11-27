"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconDownload,
  IconPrinter,
  IconExternalLink,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconMapPin,
  IconPhone,
  IconAward,
  IconBook,
  IconCode,
  IconCpu,
  IconSparkles,
  IconArrowLeft,
  IconCheck,
  IconSchool,
  IconTerminal2,
} from "@tabler/icons-react";
import Link from "next/link";
import { playTapSound } from "@/lib/sound";

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<"interactive" | "document">("interactive");
  const [copied, setCopied] = useState(false);
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

  const handleCopyEmail = () => {
    playTapSound("chime");
    navigator.clipboard.writeText("hinguvivek05@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    playTapSound("pop");
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Vivek_Hingu_Resume.pdf";
    link.click();
  };

  const handlePrint = () => {
    playTapSound("pop");
    window.print();
  };

  const skillsData = [
    {
      category: "Machine Learning & Data Science",
      skills: ["Machine Learning", "Scikit-learn", "Data Science", "NumPy", "Pandas", "EDA", "Data Preprocessing", "Model Evaluation"],
      accent: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20",
    },
    {
      category: "Generative AI & NLP",
      skills: ["Generative AI", "Large Language Models (LLMs)", "RAG Architecture", "Prompt Engineering", "NLP", "Grok API", "Gemini API"],
      accent: "text-purple-400 border-purple-500/30 bg-purple-950/20",
    },
    {
      category: "Backend & Systems",
      skills: ["Python", "FastAPI", "Flask", "Node.js", "Express.js", "REST APIs", "SQLite", "PostgreSQL", "Database Design"],
      accent: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
    },
    {
      category: "Frontend & Full Stack",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
      accent: "text-blue-400 border-blue-500/30 bg-blue-950/20",
    },
    {
      category: "Developer Tools & Cloud",
      skills: ["Git", "GitHub", "Docker", "VS Code", "Postman", "Vercel", "Google Cloud", "Linux CLI"],
      accent: "text-amber-400 border-amber-500/30 bg-amber-950/20",
    },
  ];

  const projects = [
    {
      title: "AI Startup Success Predictor",
      tech: ["Python", "FastAPI", "React", "Scikit-learn", "SQLite", "Tailwind CSS"],
      points: [
        "Developed an AI-powered platform that predicts startup success using Machine Learning classification models.",
        "Implemented authentication, analytics dashboard, CSV-based bulk prediction, and business intelligence features.",
        "Built REST APIs using FastAPI and integrated an interactive React dashboard for real-time predictions and insights.",
        "Evaluated multiple ML algorithms, including Random Forest and Extra Trees, to optimize predictive performance.",
      ],
      link: "https://github.com/thatvivekhingu/Ai_Startup_Success_Predictor",
      badge: "FEATURED AI/ML",
    },
    {
      title: "BharatBhasha AI",
      tech: ["Grok API", "HTML", "CSS", "JavaScript", "NLP", "Node.js", "Express.js"],
      points: [
        "Developed an AI-powered multilingual communication platform supporting text and voice interactions across multiple Indian languages.",
        "Integrated Grok API to generate context-aware multilingual responses using NLP prompt orchestration, boosting accessibility.",
        "Built a scalable backend using Node.js and Express.js to support low-latency real-time AI-powered conversations.",
      ],
      link: "https://github.com/thatvivekhingu/Bharat-Bhasha-Ai-2.0",
      badge: "VOICE & TEXT AI",
    },
    {
      title: "Reverse Recipe Engine with Local Flavor",
      tech: ["Python", "Flask", "Gemini API", "HTML", "CSS", "JavaScript", "Unsplash API"],
      points: [
        "Developed an AI-powered application that synthesizes regional recipes directly from user-provided pantry ingredients.",
        "Integrated Gemini API with advanced prompt engineering to deliver personalized recipe recommendations and cooking instructions.",
        "Leveraged Unsplash API to dynamically present visual culinary representations, improving user engagement.",
        "Earned Top 10 Finalist honors at AIT Hackathon 2K25 among hundreds of participating engineering teams.",
      ],
      link: "https://github.com/thatvivekhingu/Recipe-Recommender-system-",
      badge: "TOP 10 HACKATHON",
    },
  ];

  const achievements = [
    {
      title: "Flinders University AI Hackathon",
      metric: "🥈 2nd Place | AUD 300 Cash Prize",
      desc: "Ranked 2nd in the prestigious International AI Hackathon hosted by Flinders University for innovative generative AI implementation.",
      date: "2026",
    },
    {
      title: "Google Cloud Arcade Champion 2025",
      metric: "🏆 Champion Milestone",
      desc: "Achieved Champion status in Google Cloud Arcade 2025 for hands-on cloud AI, infrastructure, and DevOps architecture labs.",
      date: "2025",
    },
    {
      title: "Top 10 Finalist – AIT Hackathon 2K25",
      metric: "🏅 Top 10 Finalist",
      desc: "Recognized as Top 10 finalist out of hundreds of competing engineering teams with the Reverse Recipe Engine.",
      date: "2025",
    },
    {
      title: "Robo Soccer Competition",
      metric: "🥇 1st Prize Winner",
      desc: "Awarded First Prize in the high-stakes autonomous robotics and hardware engineering tournament.",
      date: "2024",
    },
  ];

  const certs = [
    {
      title: "Machine Learning (Elite)",
      issuer: "NPTEL",
      date: "2026",
      skills: "Supervised Learning, Regression, Classification, Model Evaluation",
    },
    {
      title: "Build RAG Chatbot with Python",
      issuer: "LetsUpgrade",
      date: "2025",
      skills: "RAG Architecture, Vector DBs, LLM Orchestration, Prompt Engineering",
    },
    {
      title: "Data Analysis with Python",
      issuer: "freeCodeCamp",
      date: "2025",
      skills: "Python, Pandas, NumPy, Data Preprocessing, Exploratory Data Analysis",
    },
    {
      title: "Python for Data Science, AI & Dev",
      issuer: "IBM SkillsBuild",
      date: "2025",
      skills: "Python Programming, Data Structures, Data Visualization, AI Foundations",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-[#FAF9F5] pt-24 sm:pt-32 pb-20 px-3 sm:px-6 md:px-8 select-none">
      {/* Top Floating Control Bar */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl border border-white/10 bg-[#0E0E10] backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
        <Link
          href="/"
          onClick={() => {
            playTapSound("pop");
            try {
              sessionStorage.setItem("hasSeenIntro", "true");
            } catch {}
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <IconArrowLeft className="h-4 w-4" />
          <span>PORTFOLIO HOME</span>
        </Link>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => {
              playTapSound("pop");
              setActiveTab("interactive");
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "interactive"
                ? "bg-[#FAF9F5] text-black shadow-md font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            ✨ INTERACTIVE DOSSIER
          </button>
          <button
            onClick={() => {
              playTapSound("pop");
              setActiveTab("document");
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "document"
                ? "bg-[#FAF9F5] text-black shadow-md font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            📄 1-PAGE DOCUMENT
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 bg-[#161618] hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Print Resume"
          >
            <IconPrinter className="h-4 w-4" />
            <span className="hidden sm:inline">PRINT</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-mono font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <IconDownload className="h-4 w-4" />
            <span>DOWNLOAD PDF</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {activeTab === "interactive" ? (
          <div className="space-y-8">
            {/* Header Hero Dossier Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E10] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
              {/* Carbon Halftone Background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                  backgroundSize: "8px 8px",
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#3B82F6] font-mono font-bold text-xs">{"//"}</span>
                    <span className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                      OFFICIAL CURRICULUM VITAE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-1" />
                  </div>

                  <h1 className="font-[family-name:var(--font-anton)] text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
                    <span className="text-[#3B82F6]">VIVEK</span> HINGU
                  </h1>

                  <p className="font-mono text-xs sm:text-sm text-cyan-400 font-semibold tracking-wide uppercase">
                    AI &amp; Machine Learning Engineer • B.E. Information Technology
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed font-sans">
                    Aspiring AI &amp; Machine Learning Engineer with a strong foundation in Python, Machine Learning, Data Science, and Generative AI. Proven experience building full-stack intelligent systems, RAG pipelines, and ML classification architectures.
                  </p>
                </div>

                {/* Direct Contact Pills */}
                <div className="flex flex-wrap md:flex-col gap-2 shrink-0 text-xs font-mono relative z-10">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-black/60 hover:bg-white/10 transition-colors text-zinc-300 hover:text-white cursor-pointer"
                  >
                    {copied ? <IconCheck className="h-4 w-4 text-emerald-400" /> : <IconMail className="h-4 w-4 text-cyan-400" />}
                    <span>{copied ? "COPIED EMAIL" : "hinguvivek05@gmail.com"}</span>
                  </button>

                  <a
                    href="tel:+918866688575"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-black/60 hover:bg-white/10 transition-colors text-zinc-300 hover:text-white"
                  >
                    <IconPhone className="h-4 w-4 text-emerald-400" />
                    <span>+91 88666 88575</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/thatvivekhingu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-black/60 hover:bg-white/10 transition-colors text-zinc-300 hover:text-white"
                  >
                    <IconBrandLinkedin className="h-4 w-4 text-blue-400" />
                    <span>linkedin.com/in/thatvivekhingu</span>
                  </a>

                  <a
                    href="https://github.com/thatvivekhingu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-black/60 hover:bg-white/10 transition-colors text-zinc-300 hover:text-white"
                  >
                    <IconBrandGithub className="h-4 w-4 text-purple-400" />
                    <span>github.com/thatvivekhingu</span>
                  </a>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-black/40 text-zinc-400">
                    <IconMapPin className="h-4 w-4 text-amber-400" />
                    <span>Ahmedabad, Gujarat, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Highlight Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0E0E10] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <IconSchool className="h-5 w-5 text-cyan-400" />
                    <h2 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl uppercase tracking-wide text-white">
                      SAL COLLEGE OF ENGINEERING, AHMEDABAD
                    </h2>
                  </div>
                  <p className="text-sm font-semibold text-cyan-400 font-mono">
                    Bachelor of Engineering — Information Technology
                  </p>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    Core Coursework: Machine Learning, Artificial Intelligence, Data Science, Probability &amp; Statistics, Linear Algebra, Data Structures &amp; Algorithms, DBMS, Python Programming
                  </p>
                </div>
                <div className="flex sm:flex-col items-start sm:items-end gap-1.5 shrink-0">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-black">
                    CGPA: 8.61 / 10
                  </span>
                  <span className="text-xs font-mono text-zinc-400">2023 – 2027</span>
                </div>
              </div>
            </div>

            {/* Interactive Technical Skills Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#3B82F6] font-mono font-bold text-xs">{"//"}</span>
                  <h2 className="font-[family-name:var(--font-anton)] text-2xl uppercase tracking-wide text-white">
                    TECHNICAL SKILLS &amp; COMPETENCIES
                  </h2>
                </div>
                {activeSkillFilter && (
                  <button
                    onClick={() => setActiveSkillFilter(null)}
                    className="text-xs font-mono font-bold text-cyan-400 hover:underline cursor-pointer"
                  >
                    [CLEAR FILTER]
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsData.map((group) => (
                  <div
                    key={group.category}
                    className={`p-5 rounded-2xl border ${group.accent} backdrop-blur-xl space-y-3 transition-all`}
                  >
                    <h3 className="text-xs font-mono font-black tracking-wider uppercase">
                      {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => {
                            playTapSound("pop");
                            setActiveSkillFilter(activeSkillFilter === skill ? null : skill);
                          }}
                          className={`text-xs px-2.5 py-1 rounded-lg font-mono font-medium transition-all cursor-pointer ${
                            activeSkillFilter === skill
                              ? "bg-white text-black font-bold scale-105 shadow-md"
                              : "bg-black/60 hover:bg-black text-zinc-200 border border-white/10"
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Featured Projects */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[#3B82F6] font-mono font-bold text-xs">{"//"}</span>
                <h2 className="font-[family-name:var(--font-anton)] text-2xl uppercase tracking-wide text-white">
                  FEATURED ENGINEERING PROJECTS
                </h2>
              </div>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.title}
                    className="group rounded-2xl border border-white/10 bg-[#0E0E10] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:border-cyan-400/50 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/40 uppercase">
                          {proj.badge}
                        </span>
                        <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-white uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
                          {proj.title}
                        </h3>
                      </div>
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTapSound("pop")}
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 hover:underline shrink-0"
                      >
                        <span>GITHUB REPOSITORY</span>
                        <IconExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#18181C] text-zinc-300 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-400 list-disc list-inside leading-relaxed pt-2 font-sans">
                      {proj.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Certifications Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Achievements */}
              <div className="rounded-2xl border border-white/10 bg-[#0E0E10] p-6 space-y-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <IconAward className="h-5 w-5 text-amber-400" />
                  <h3 className="font-[family-name:var(--font-anton)] text-xl uppercase tracking-wide text-white">
                    KEY HONORS &amp; AWARDS
                  </h3>
                </div>
                <div className="space-y-3">
                  {achievements.map((ach) => (
                    <div key={ach.title} className="p-3.5 rounded-xl border border-white/10 bg-[#161618] space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-mono font-black text-amber-400">{ach.metric}</p>
                        <span className="text-[11px] font-mono text-zinc-500">{ach.date}</span>
                      </div>
                      <p className="text-sm font-bold text-white font-sans">{ach.title}</p>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed">{ach.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Certifications */}
              <div className="rounded-2xl border border-white/10 bg-[#0E0E10] p-6 space-y-4 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <IconBook className="h-5 w-5 text-cyan-400" />
                  <h3 className="font-[family-name:var(--font-anton)] text-xl uppercase tracking-wide text-white">
                    VERIFIED CERTIFICATIONS
                  </h3>
                </div>
                <div className="space-y-3">
                  {certs.map((c) => (
                    <div key={c.title} className="p-3.5 rounded-xl border border-white/10 bg-[#161618] space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-white font-sans">{c.title}</p>
                        <span className="text-[11px] font-mono text-cyan-400 font-bold shrink-0">{c.date}</span>
                      </div>
                      <p className="text-xs font-mono text-zinc-400 font-semibold">{c.issuer}</p>
                      <p className="text-[11px] font-mono text-zinc-500">{c.skills}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Document Sheet View Mode */
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E0E10] border border-white/10 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <IconTerminal2 className="h-4 w-4 text-cyan-400" />
                <span>OFFICIAL 1-PAGE RESUME DOCUMENT</span>
              </span>
              <button
                onClick={handleDownload}
                className="text-cyan-400 hover:text-cyan-300 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <IconDownload className="h-3.5 w-3.5" />
                <span>DOWNLOAD FILE</span>
              </button>
            </div>

            <div className="relative w-full rounded-2xl border border-white/10 bg-black p-2 sm:p-6 shadow-2xl overflow-hidden flex flex-col items-center">
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0"
                className="w-full max-w-4xl h-[750px] sm:h-[950px] rounded-lg border border-zinc-800 bg-white"
                title="Vivek Hingu Resume PDF Document"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
