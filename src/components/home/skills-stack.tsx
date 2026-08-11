"use client";

import React, { useState } from "react";
import { SectionHeading, headingIconClass } from "@/components/layout/section-heading";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { IconCpu, IconBrain, IconDatabase, IconServer, IconSparkles, IconRobot } from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";

export default function SkillsStack() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const domains = [
    {
      id: "agentic",
      title: "Agentic AI & Orchestration Frameworks",
      icon: <IconRobot className="h-6 w-6 text-indigo-400" />,
      description: "Building autonomous AI agents, multi-agent workflows with LangGraph, LangChain pipelines, and RAG architectures.",
      proficiency: 96,
      color: "from-indigo-500 to-purple-500",
      skills: ["Agentic AI", "LangGraph", "LangChain", "RAG", "LLMs", "Prompt Engineering", "Vector DBs"],
    },
    {
      id: "ml",
      title: "Machine Learning & Computer Vision",
      icon: <IconBrain className="h-6 w-6 text-amber-400" />,
      description: "Hands-on expertise building ML classification, regression models from scratch, NLP tokenization, and CV object detection.",
      proficiency: 93,
      color: "from-amber-500 to-orange-500",
      skills: ["Scikit-learn", "NLP", "Computer Vision (CV)", "Classification", "Regression", "KNN", "Decision Trees", "Naive Bayes"],
    },
    {
      id: "analytics",
      title: "Data Science & Vector Search",
      icon: <IconDatabase className="h-6 w-6 text-cyan-400" />,
      description: "Exploratory data analysis, data cleaning pipelines, numerical computing, and vector search algorithms.",
      proficiency: 90,
      color: "from-cyan-500 to-blue-500",
      skills: ["NumPy", "Pandas", "EDA", "Data Cleaning", "Data Preprocessing", "Cosine Similarity"],
    },
    {
      id: "web",
      title: "Full-Stack AI Web Architecture",
      icon: <IconServer className="h-6 w-6 text-emerald-400" />,
      description: "Building production REST backends, reactive UI platforms, and Docker containerized web applications.",
      proficiency: 88,
      color: "from-emerald-500 to-teal-500",
      skills: ["Python", "Flask", "Node.js", "Express.js", "React", "Next.js 15", "Docker", "Git", "REST APIs"],
    },
  ];

  const filteredDomains = activeTab === "all" ? domains : domains.filter((d) => d.id === activeTab);

  const handleTabChange = (tabId: string) => {
    playTapSound("pop");
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col space-y-8" id="skills">
      <SectionHeading
        badge="TECH MATRIX & TOOLS"
        icon={<IconCpu className={headingIconClass} />}
        subtitle="Generative AI, LLMs, RAG Architecture, Machine Learning pipelines, and full-stack software development"
      >
        Core Engineering & AI Stack
      </SectionHeading>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: "all", label: "All Skills" },
          { id: "agentic", label: "Agentic AI & RAG" },
          { id: "ml", label: "Machine Learning" },
          { id: "analytics", label: "Data Science" },
          { id: "web", label: "Full-Stack & DevOps" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-cyan-950 border border-cyan-500/50 text-cyan-300 shadow-md"
                : "bg-background/40 border border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDomains.map((domain, index) => (
          <BlurFade key={domain.title} delay={0.05 * index} inView>
            <div className="group relative flex flex-col justify-between h-full p-6 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-secondary/80 border border-border/40">
                      {domain.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-cyan-400 transition-colors">
                        {domain.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground flex items-center gap-1">
                    <IconSparkles className="h-3.5 w-3.5 text-amber-400" />
                    {domain.proficiency}%
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {domain.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-secondary/60 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${domain.color} transition-all duration-500`}
                    style={{ width: `${domain.proficiency}%` }}
                  />
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {domain.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-[11px] px-2 py-0.5 font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
