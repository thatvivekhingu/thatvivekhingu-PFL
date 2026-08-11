"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/layout/section-heading";
import { IconBrandGithub, IconExternalLink, IconSparkles, IconX, IconActivity, IconTopologyRing3 } from "@tabler/icons-react";
import { data, ProjectItem } from "@/data/data";
import { playTapSound } from "@/lib/sound";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleOpenModal = (project: ProjectItem) => {
    playTapSound("chime");
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    playTapSound("pop");
    setSelectedProject(null);
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
    <section id="projects" className="py-16 sm:py-24 relative">
      <div className="container px-4 mx-auto max-w-6xl">
        <BlurFade delay={0.1} inView>
          <SectionHeading
            badge="ENGINEERING SYSTEMS & BUILDS"
            icon={<IconBrandGithub className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />}
            subtitle="Explore Vivek's production-grade AI platforms, machine learning tools, and web applications built with Python, Grok API, Scikit-Learn, Next.js, and TypeScript."
          >
            Featured AI & Web Builds
          </SectionHeading>
        </BlurFade>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {data.projects.map((project, idx) => (
            <BlurFade key={project.title} delay={0.15 + idx * 0.05} inView>
              <div
                onClick={() => handleOpenModal(project)}
                className="group relative rounded-2xl border border-border/60 bg-background/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col h-full"
              >
                {/* Thumbnail Header */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                  {/* Active Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/70 backdrop-blur-md border border-white/10 text-slate-300">
                      {project.type}
                    </span>
                  </div>

                  {/* Ask VIAN Direct Trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerVianQuery(project.title);
                    }}
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-[11px] font-medium text-cyan-300 transition-all shadow-lg"
                  >
                    <IconSparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                    <span>Ask VIAN</span>
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <IconExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/80 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/40 text-slate-500">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>

      {/* Project Detail & Architecture Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-slate-950/90 text-slate-100 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-950/40 text-[10px]">
                  {selectedProject.type}
                </Badge>
                <span className="text-xs font-mono text-slate-400">{selectedProject.dates}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedProject.title}</h3>
            </div>

            {/* Modal Description */}
            <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.description}</p>

            {/* Key Engineering Metrics Section */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <IconActivity className="w-4 h-4" />
                <span>System Architecture Metrics & Highlights</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Inference Latency</div>
                  <div className="text-base font-bold text-cyan-300">~18 - 45 ms</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Deployment</div>
                  <div className="text-base font-bold text-slate-200">Vercel / Docker</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Core Engine</div>
                  <div className="text-base font-bold text-emerald-400">Groq / Gemini / PyTorch</div>
                </div>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <IconTopologyRing3 className="w-4 h-4" />
                <span>End-to-End System Pipeline</span>
              </h4>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between overflow-x-auto gap-2">
                <div className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-center">User Request</div>
                <span className="text-cyan-400">➔</span>
                <div className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-center">Next.js REST API</div>
                <span className="text-cyan-400">➔</span>
                <div className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-center">RAG Indexer</div>
                <span className="text-cyan-400">➔</span>
                <div className="px-3 py-1.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 text-center">LLM Engine</div>
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Technologies Used</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/40 border border-cyan-800/50 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => triggerVianQuery(selectedProject.title)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500/50 text-xs font-bold text-cyan-300 hover:bg-cyan-900 transition-colors shadow-lg"
              >
                <IconSparkles className="w-4 h-4 text-cyan-400" />
                <span>Ask VIAN AI Assistant</span>
              </button>

              <a
                href={selectedProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white hover:border-slate-500 transition-colors"
              >
                <IconBrandGithub className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}