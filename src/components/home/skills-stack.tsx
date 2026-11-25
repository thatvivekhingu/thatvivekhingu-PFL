"use client";

import React, { useState } from "react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import {
  IconCpu,
  IconSparkles,
  IconLayout,
  IconCube,
  IconBrain,
  IconDatabase,
  IconTool,
} from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";

interface TechDomain {
  id: string;
  number: string;
  title: string;
  tag: string;
  icon: React.ReactNode;
  description: string;
  proficiency: number;
  color: string;
  borderColor: string;
  accentBg: string;
  skills: string[];
}

export default function SkillsStack() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const domains: TechDomain[] = [
    {
      id: "frontend",
      number: "01",
      title: "Frontend Engineering",
      tag: "UI & INTERACTIVITY",
      icon: <IconLayout className="h-5 w-5 text-cyan-400" />,
      description:
        "Building responsive, dynamic, and fluid web experiences with modern React ecosystem, type safety, and high-performance scrolling.",
      proficiency: 95,
      color: "from-cyan-500 to-blue-500",
      borderColor: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
      accentBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      skills: [
        "Next.js (React Framework)",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "GSAP",
        "Lenis (Smooth Scrolling)",
      ],
    },
    {
      id: "visual3d",
      number: "02",
      title: "3D & Visual Effects",
      tag: "IMMERSIVE GRAPHICS",
      icon: <IconCube className="h-5 w-5 text-purple-400" />,
      description:
        "Crafting real-time 3D canvases, custom shaders, and interactive vector animations to build tactile and memorable user journeys.",
      proficiency: 88,
      color: "from-purple-500 to-pink-500",
      borderColor: "hover:border-purple-500/50 hover:shadow-purple-500/10",
      accentBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      skills: [
        "Three.js",
        "React Three Fiber",
        "WebGL",
        "Lottie",
        "CSS Animations",
      ],
    },
    {
      id: "ai",
      number: "03",
      title: "AI Integration & LLMs",
      tag: "INTELLIGENT SYSTEMS",
      icon: <IconBrain className="h-5 w-5 text-amber-400" />,
      description:
        "Architecting autonomous agent workflows, high-speed LLM inference, structured RAG pipelines, and generative multi-model solutions.",
      proficiency: 96,
      color: "from-amber-500 to-orange-500",
      borderColor: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      accentBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      skills: [
        "Groq API",
        "Llama Models",
        "OpenAI API / Gemini API",
        "Agno Framework",
        "LangChain",
        "RAG Architecture",
      ],
    },
    {
      id: "backend",
      number: "04",
      title: "Backend & Database",
      tag: "DATA & ASYNC ENGINES",
      icon: <IconDatabase className="h-5 w-5 text-emerald-400" />,
      description:
        "Designing resilient backend services, high-throughput REST APIs, relational schemas, document stores, and managed serverless databases.",
      proficiency: 92,
      color: "from-emerald-500 to-teal-500",
      borderColor: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      accentBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      skills: [
        "Python",
        "FastAPI",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Supabase",
      ],
    },
    {
      id: "tools",
      number: "05",
      title: "Tools & Deployment",
      tag: "DEVOPS & WORKFLOW",
      icon: <IconTool className="h-5 w-5 text-blue-400" />,
      description:
        "Streamlining developer tooling, production deployments, containerization, API testing suites, and design system continuity.",
      proficiency: 94,
      color: "from-blue-500 to-indigo-500",
      borderColor: "hover:border-blue-500/50 hover:shadow-blue-500/10",
      accentBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      skills: [
        "Git & GitHub",
        "Vercel",
        "Docker",
        "VS Code",
        "Postman",
        "Figma",
      ],
    },
  ];

  const filteredDomains =
    activeTab === "all" ? domains : domains.filter((d) => d.id === activeTab);

  const totalSkillsCount = domains.reduce((acc, d) => acc + d.skills.length, 0);

  const handleTabChange = (tabId: string) => {
    playTapSound("pop");
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col space-y-8" id="skills">
      <SectionHeading
        badge="TECH MATRIX & TOOLS"
        icon={<IconCpu className={headingIconClass} />}
        subtitle="Modern frontend, real-time 3D graphics, generative AI agents, resilient backends, and cloud deployment pipelines"
      >
        Core Engineering & Tech Stack
      </SectionHeading>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: "all", label: `All Stack (${totalSkillsCount})` },
          { id: "frontend", label: "01 Frontend" },
          { id: "visual3d", label: "02 3D & Visual" },
          { id: "ai", label: "03 AI Integration" },
          { id: "backend", label: "04 Backend & DB" },
          { id: "tools", label: "05 Tools & Cloud" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-500/10"
                : "bg-background/40 border border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDomains.map((domain, index) => {
          const isSpanFull =
            activeTab === "all" &&
            index === filteredDomains.length - 1 &&
            filteredDomains.length % 2 !== 0;

          return (
            <BlurFade key={domain.title} delay={0.04 * index} inView>
              <div
                className={`group relative flex flex-col justify-between h-full p-6 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm transition-all duration-300 shadow-sm ${domain.borderColor} ${
                  isSpanFull ? "md:col-span-2" : ""
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-secondary/80 border border-border/50 group-hover:scale-105 transition-transform">
                        {domain.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono tracking-wider text-muted-foreground font-semibold">
                            {domain.number} {"//"} {domain.tag}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-cyan-400 transition-colors">
                          {domain.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold tabular-nums text-muted-foreground flex items-center gap-1 shrink-0 bg-secondary/50 px-2 py-1 rounded border border-border/40">
                      <IconSparkles className="h-3.5 w-3.5 text-amber-400" />
                      {domain.proficiency}%
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {domain.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-secondary/60 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${domain.color} transition-all duration-500`}
                      style={{ width: `${domain.proficiency}%` }}
                    />
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {domain.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[11px] px-2.5 py-1 font-medium bg-secondary/70 hover:bg-secondary border border-border/50 hover:border-cyan-500/40 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
