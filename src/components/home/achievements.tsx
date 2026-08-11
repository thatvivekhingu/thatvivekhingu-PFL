"use client";

import React, { useState } from "react";
import Image from "next/image";
import { data } from "@/data/data";
import {
  IconAward,
  IconCertificate,
} from "@tabler/icons-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { PhotoLightbox, PhotoLightboxItem } from "@/components/ui/photo-lightbox";
import { playTapSound } from "@/lib/sound";
import { Marquee } from "@/components/ui/marquee";

export default function Achievements() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoLightboxItem | null>(null);

  const handleOpenPhoto = (item: PhotoLightboxItem) => {
    playTapSound("chime");
    setSelectedPhoto(item);
  };

  return (
    <div className="flex flex-col space-y-12">
      {/* Section Heading */}
      <SectionHeading color="amber" subtitle="AWARDS & HONORS">
        Certificates, Awards & Key Achievements
      </SectionHeading>

      {/* Redesigned Native Aspect Ratio Bento Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <IconAward className="h-5 w-5 text-amber-400" />
            Key Achievements Bento Grid
          </h3>
          <span className="text-xs text-muted-foreground hidden sm:inline-block font-mono">
            {"// Click any photo card to expand full view"}
          </span>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[250px] sm:auto-rows-[270px]">
          
          {/* Card 1: Google Cloud Arcade 2025 (Wide 1024x561 Frame - Full Un-cropped Image Fit) */}
          <div
            onClick={() =>
              handleOpenPhoto({
                src: "/achievements/google-cloud-arcade.jpg",
                alt: "Google Cloud Arcade Champion 2025",
                title: "Google Cloud Arcade Champion 2025",
                subtitle: "Cloud & AI Milestone",
                description: "Achieved Champion status in Google Cloud Arcade 2025 for hands-on cloud AI, infrastructure, and DevOps milestones.",
                metrics: "🏆 Google Cloud Arcade Champion",
              })
            }
            className="md:col-span-2 row-span-1 group relative rounded-2xl border border-cyan-500/40 bg-zinc-950 overflow-hidden shadow-2xl cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Corner Tech Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none opacity-80" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none opacity-80" />

            <div className="relative w-full flex-1 bg-zinc-950/95 p-2 overflow-hidden flex items-center justify-center">
              {/* Blurred Ambient Photo Background */}
              <Image
                src="/achievements/google-cloud-arcade.jpg"
                alt=""
                fill
                className="object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                aria-hidden
              />
              <Image
                src="/achievements/google-cloud-arcade.jpg"
                alt="Google Cloud Arcade Champion"
                fill
                className="object-contain p-1 relative z-10 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-cyan-500/40 px-2.5 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">CLOUD MILESTONE</span>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-3.5 bg-zinc-950/95 border-t border-cyan-500/30 backdrop-blur-md z-10 flex flex-col justify-center">
              <h4 className="text-base sm:text-lg font-black uppercase tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                GOOGLE CLOUD ARCADE 2025
              </h4>
              <p className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mt-0.5">
                {"// 🏆 GOOGLE CLOUD ARCADE CHAMPION"}
              </p>
            </div>
          </div>

          {/* Card 2: Flinders AI Hackathon (Portrait 843x1024 Native Frame - Full Un-cropped Image Fit) */}
          <div
            onClick={() =>
              handleOpenPhoto({
                src: "/achievements/flinders-ai.jpg",
                alt: "Flinders University AI Hackathon",
                title: "Flinders University AI Hackathon",
                subtitle: "International Hackathon Award",
                description: "Secured 2nd Place in the prestigious International AI Hackathon hosted by Flinders University.",
                metrics: "🥈 2nd Place | AUD 300 Cash Prize",
              })
            }
            className="md:col-span-1 md:row-span-2 group relative rounded-2xl border border-emerald-500/40 bg-zinc-950 overflow-hidden shadow-2xl cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Corner Tech Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400 z-20 pointer-events-none opacity-80" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400 z-20 pointer-events-none opacity-80" />

            <div className="relative w-full flex-1 bg-zinc-950/95 p-2 overflow-hidden flex items-center justify-center">
              {/* Blurred Ambient Photo Background */}
              <Image
                src="/achievements/flinders-ai.jpg"
                alt=""
                fill
                className="object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                aria-hidden
              />
              <Image
                src="/achievements/flinders-ai.jpg"
                alt="Flinders AI Hackathon"
                fill
                className="object-contain p-1 relative z-10 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-emerald-500/40 px-2.5 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">{"INT'L AWARD"}</span>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-3.5 bg-zinc-950/95 border-t border-emerald-500/30 backdrop-blur-md z-10 flex flex-col justify-center">
              <h4 className="text-base sm:text-lg font-black uppercase tracking-wider text-white group-hover:text-emerald-300 transition-colors">
                {"FLINDERS INT'L AI HACKATHON"}
              </h4>
              <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mt-0.5">
                {"// 🥈 2ND PLACE | AUD 300 CASH PRIZE"}
              </p>
            </div>
          </div>

          {/* Card 3: AIT Hackathon 2K25 (Portrait 768x1024 Native Frame - Full Un-cropped Image Fit) */}
          <div
            onClick={() =>
              handleOpenPhoto({
                src: "/achievements/ait-hackathon.jpg",
                alt: "Top 10 Finalist – AIT Hackathon 2K25",
                title: "Top 10 Finalist – AIT Hackathon 2K25",
                subtitle: "Hackathon Finalist",
                description: "Ranked among the Top 10 finalists out of hundreds of competing teams in AIT Hackathon 2K25.",
                metrics: "🏅 Top 10 Finalist",
              })
            }
            className="md:col-span-1 md:row-span-2 group relative rounded-2xl border border-emerald-500/40 bg-zinc-950 overflow-hidden shadow-2xl cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Corner Tech Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-400 z-20 pointer-events-none opacity-80" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-400 z-20 pointer-events-none opacity-80" />

            <div className="relative w-full flex-1 bg-zinc-950/95 p-2 overflow-hidden flex items-center justify-center">
              {/* Blurred Ambient Photo Background */}
              <Image
                src="/achievements/ait-hackathon.jpg"
                alt=""
                fill
                className="object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                aria-hidden
              />
              <Image
                src="/achievements/ait-hackathon.jpg"
                alt="AIT Hackathon 2K25"
                fill
                className="object-contain p-1 relative z-10 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-emerald-500/40 px-2.5 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">FINALIST</span>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-3.5 bg-zinc-950/95 border-t border-emerald-500/30 backdrop-blur-md z-10 flex flex-col justify-center">
              <h4 className="text-base sm:text-lg font-black uppercase tracking-wider text-white group-hover:text-emerald-300 transition-colors">
                AIT HACKATHON 2K25
              </h4>
              <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mt-0.5">
                {"// 🏅 TOP 10 FINALIST OUT OF 500+ TEAMS"}
              </p>
            </div>
          </div>

          {/* Card 4: Robo Soccer Championship (Landscape 1024x768 Native Frame - Full Un-cropped Image Fit) */}
          <div
            onClick={() =>
              handleOpenPhoto({
                src: "/achievements/robo-soccer.jpg",
                alt: "Robo Soccer Competition",
                title: "Robo Soccer Competition",
                subtitle: "Engineering Competition",
                description: "Won 1st Prize in the high-stakes Robo Soccer engineering & robotics competition.",
                metrics: "🥇 1st Prize Winner",
              })
            }
            className="md:col-span-2 row-span-1 group relative rounded-2xl border border-amber-500/40 bg-zinc-950 overflow-hidden shadow-2xl cursor-pointer hover:border-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Corner Tech Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400 z-20 pointer-events-none opacity-80" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400 z-20 pointer-events-none opacity-80" />

            <div className="relative w-full flex-1 bg-zinc-950/95 p-2 overflow-hidden flex items-center justify-center">
              {/* Blurred Ambient Photo Background */}
              <Image
                src="/achievements/robo-soccer.jpg"
                alt=""
                fill
                className="object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                aria-hidden
              />
              <Image
                src="/achievements/robo-soccer.jpg"
                alt="Robo Soccer Competition"
                fill
                className="object-contain p-1 relative z-10 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">CHAMPION</span>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-3.5 bg-zinc-950/95 border-t border-amber-500/30 backdrop-blur-md z-10 flex flex-col justify-center">
              <h4 className="text-base sm:text-lg font-black uppercase tracking-wider text-white group-hover:text-amber-300 transition-colors">
                ROBO SOCCER CHAMPIONSHIP
              </h4>
              <p className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mt-0.5">
                {"// 🥇 1ST PRIZE WINNER"}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <IconCertificate className="h-5 w-5 text-amber-400" />
            Certifications & Specializations
          </h3>
          <span className="text-xs text-muted-foreground hidden sm:inline-block font-mono">
            {"// Click Card for 3D Flip View"}
          </span>
        </div>

        <Marquee reverse pauseOnHover repeat={4} className="[--duration:30s] [--gap:1.5rem] py-2">
          {data.certificates.map((cert) => (
            <div key={cert.title} className="shrink-0">
              <CertFlipCard cert={cert} />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox item={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}

function CertFlipCard({
  cert,
}: {
  cert: (typeof data.certificates)[number];
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-72 sm:w-80 h-[340px] shrink-0 group perspective-1000 select-none cursor-pointer"
      onClick={() => {
        playTapSound("pop");
        setIsFlipped((prev) => !prev);
      }}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border border-slate-200 dark:border-border/60 bg-white dark:bg-background/80 backdrop-blur-md p-4 flex flex-col justify-between overflow-hidden shadow-lg group-hover:border-indigo-500/60 transition-colors">
          <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-950/80 border border-slate-200 dark:border-border/40">
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-contain p-2"
              sizes="320px"
            />
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 text-indigo-300 text-[10px] font-bold backdrop-blur-sm border border-indigo-500/30 flex items-center gap-1">
              <span>3D Flip Card</span>
              <span>↻</span>
            </div>
            <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              {cert.issuer}
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-zinc-300 text-[10px] font-mono">
              {cert.date}
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <h4 className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-indigo-400 transition-colors">
              {cert.title}
            </h4>
            <p className="text-xs text-muted-foreground font-medium">{cert.issuer}</p>
          </div>

          <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-indigo-400 font-semibold">
            <span>Flip for Skills</span>
            <span>→</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border border-indigo-500/40 bg-zinc-950/95 backdrop-blur-xl p-5 flex flex-col justify-between text-white shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-indigo-500/30 pb-2">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                {cert.issuer}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">{cert.date}</span>
            </div>

            <h4 className="text-base font-bold text-white leading-snug">{cert.title}</h4>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                Key Skills Verified:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-indigo-500/30 flex items-center justify-between">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                playTapSound("pop");
              }}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1"
            >
              <span>Verify Credential</span>
              <span>↗</span>
            </a>
            <span className="text-[10px] font-mono text-zinc-400">Click to flip ↻</span>
          </div>
        </div>
      </div>
    </div>
  );
}
