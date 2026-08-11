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
      <SectionHeading
        badge="RECOGNITION & HONORS // 03"
        icon={
          <svg className="h-5 w-5 sm:h-6 sm:w-6 fill-cyan-400" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z"/>
          </svg>
        }
        subtitle="International AI hackathon awards, Google Cloud Arcade milestones, robotics championships, and industry certifications"
      >
        Certificates, Awards & Key Achievements
      </SectionHeading>

      {/* Futuristic Bento Grid Layout matching reference design */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <IconAward className="h-5 w-5 text-cyan-400" />
            Key Achievements Bento Grid
          </h3>
          <span className="text-xs text-muted-foreground hidden sm:inline-block font-mono">
            {"// Click any card to expand full view"}
          </span>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[250px] sm:auto-rows-[270px]">
          
          {/* Card 1: Flinders AI Hackathon (Wide Feature Bento 2 Cols x 1 Row) */}
          <div
            onClick={() =>
              handleOpenPhoto({
                src: "/achievements/flinders-ai.jpg",
                alt: "Flinders University AI Hackathon",
                title: "Flinders University AI Hackathon",
                subtitle: "Hackathon Award",
                description: "Secured 2nd Place in the prestigious International AI Hackathon hosted by Flinders University.",
                metrics: "🥈 2nd Place | AUD 300 Cash Prize",
              })
            }
            className="md:col-span-2 row-span-1 group relative rounded-2xl border border-emerald-500/40 bg-zinc-950 overflow-hidden shadow-2xl cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative w-full flex-1 overflow-hidden">
              <Image
                src="/achievements/flinders-ai.jpg"
                alt="Flinders AI Hackathon"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-emerald-500/40 px-2.5 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">ACTIVE RECORD</span>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-3.5 bg-zinc-950/95 border-t border-emerald-500/30 backdrop-blur-md z-10 flex flex-col justify-center">
              <h4 className="text-base sm:text-xl font-black uppercase tracking-wider text-white group-hover:text-emerald-300 transition-colors">
                FLINDERS AI HACKATHON
              </h4>
              <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mt-0.5">
                {"// 🥈 2ND PLACE | AUD 300 CASH PRIZE"}
              </p>
            </div>
          </div>

          {/* Card 2: Stat Bento 1 (1 Col x 1 Row) */}
          <div className="md:col-span-1 row-span-1 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 dark:bg-zinc-950/90 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] transition-all duration-300 select-none">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest border border-emerald-500/30 px-2 py-0.5 rounded-full bg-emerald-500/10">
                STAT // HACKATHON
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]">
                🥈 2ND
              </p>
              <p className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mt-1">
                INTERNATIONAL AI HACKATHON
              </p>
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
                FLINDERS UNIVERSITY AUSTRALIA
              </p>
            </div>
          </div>

          {/* Card 3: Google Cloud Arcade (Tall Vertical Bento 1 Col x 2 Rows) */}
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
            className="md:col-span-1 md:row-span-2 group relative rounded-2xl border border-cyan-500/40 bg-zinc-950 overflow-hidden shadow-2xl cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative w-full flex-1 overflow-hidden">
              <Image
                src="/achievements/google-cloud-arcade.jpg"
                alt="Google Cloud Arcade Champion"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute top-3 right-3 z-10">
                <span className="h-2 w-2 rounded-full bg-cyan-400 block shadow-[0_0_10px_#22d3ee] animate-pulse" />
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-3.5 bg-zinc-950/95 border-t border-cyan-500/30 backdrop-blur-md z-10 flex flex-col justify-center">
              <h4 className="text-base sm:text-lg font-black uppercase tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                GOOGLE CLOUD ARCADE
              </h4>
              <p className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mt-0.5">
                {"// 🏆 CHAMPION 2025"}
              </p>
            </div>
          </div>

          {/* Card 4: Stat Bento 2 (1 Col x 1 Row) */}
          <div className="md:col-span-1 row-span-1 rounded-2xl border border-cyan-500/40 bg-cyan-950/20 dark:bg-zinc-950/90 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all duration-300 select-none">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono font-extrabold text-cyan-400 uppercase tracking-widest border border-cyan-500/30 px-2 py-0.5 rounded-full bg-cyan-500/10">
                STAT // ACADEMICS
              </span>
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black font-mono text-cyan-400 tracking-tight drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">
                8.61 CGPA
              </p>
              <p className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest mt-1">
                B.E. INFORMATION TECHNOLOGY
              </p>
              <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
                SAL COLLEGE OF ENGINEERING
              </p>
            </div>
          </div>

          {/* Card 5: TIC-TECH-TOE '25 Certificate (2 Cols x 1 Row - Clean Landscape Fit) */}
          <div
            onClick={() =>
              handleOpenPhoto({
                src: "/hackathons/tic-tech-toe-25.jpg",
                alt: "TIC-TECH-TOE '25 Hackathon",
                title: "TIC-TECH-TOE '25 Hackathon",
                subtitle: "IEEE SB DAIICT & Eduget Global",
                description: "Recognized for valuable participation and technical solution at TIC-TECH-TOE '25 organized by IEEE SB DAIICT & Eduget Global.",
                metrics: "Certificate of Appreciation",
              })
            }
            className="md:col-span-2 row-span-1 group relative rounded-2xl border border-cyan-500/40 bg-zinc-950 overflow-hidden shadow-2xl cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Certificate Document Container (Full View, No Clipping) */}
            <div className="relative w-full flex-1 bg-zinc-950 p-2 overflow-hidden flex items-center justify-center">
              <Image
                src="/hackathons/tic-tech-toe-25.jpg"
                alt="TIC-TECH-TOE '25 Certificate"
                fill
                className="object-contain p-1 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-3 right-3 z-10">
                <span className="h-2 w-2 rounded-full bg-cyan-400 block shadow-[0_0_10px_#22d3ee]" />
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-3.5 bg-zinc-950/95 border-t border-cyan-500/30 backdrop-blur-md z-10 flex flex-col justify-center">
              <h4 className="text-base sm:text-lg font-black uppercase tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                {"TIC-TECH-TOE '25 HACKATHON"}
              </h4>
              <p className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mt-0.5">
                {"// IEEE SB DAIICT & EDUGET GLOBAL"}
              </p>
            </div>
          </div>

          {/* Card 6: AIT Hackathon 2K25 (2 Cols x 1 Row) */}
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
            className="md:col-span-2 row-span-1 group relative rounded-2xl border border-emerald-500/40 bg-zinc-950 overflow-hidden shadow-2xl cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative w-full flex-1 overflow-hidden">
              <Image
                src="/achievements/ait-hackathon.jpg"
                alt="AIT Hackathon 2K25"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-3 right-3 z-10">
                <span className="h-2 w-2 rounded-full bg-emerald-400 block shadow-[0_0_10px_#10b981]" />
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

          {/* Card 7: Robo Soccer (2 Cols x 1 Row) */}
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
            <div className="relative w-full flex-1 overflow-hidden">
              <Image
                src="/achievements/robo-soccer.jpg"
                alt="Robo Soccer Competition"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-3 right-3 z-10">
                <span className="h-2 w-2 rounded-full bg-amber-400 block shadow-[0_0_10px_#f59e0b]" />
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
            <IconCertificate className="h-5 w-5 text-cyan-400" />
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
