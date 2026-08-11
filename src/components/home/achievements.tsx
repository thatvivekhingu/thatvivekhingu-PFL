"use client";

import React, { useState } from "react";
import Image from "next/image";
import { data } from "@/data/data";
import {
  IconAward,
  IconCertificate,
  IconExternalLink,
  IconMaximize,
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


      {/* Key Achievements */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <IconAward className="h-5 w-5 text-cyan-400" />
            Key Achievements & Recognition
          </h3>
          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            Infinite Loop • Pause on Hover • Click Image for Full View
          </span>
        </div>

        <Marquee pauseOnHover repeat={4} className="[--duration:35s] [--gap:1.5rem] py-2">
          {data.achievements.map((item) => (
            <div
              key={item.title}
              className="w-80 sm:w-96 shrink-0 group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-zinc-900/80 backdrop-blur-md transition-all duration-500 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02]"
            >
              {/* Photo Preview Container */}
              {item.image && (
                <div
                  className="relative w-full h-56 sm:h-64 overflow-hidden border-b border-slate-200 dark:border-border/40 bg-slate-100 dark:bg-zinc-950/90 cursor-pointer"
                  onClick={() =>
                    handleOpenPhoto({
                      src: item.image!,
                      alt: item.title,
                      title: item.title,
                      subtitle: item.category,
                      description: item.description,
                      metrics: item.metrics,
                      link: item.link,
                    })
                  }
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover blur-xl scale-110 opacity-45 pointer-events-none"
                    aria-hidden="true"
                  />

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105 z-10"
                    sizes="384px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300 z-20" />

                  <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 text-amber-400 text-xs font-medium backdrop-blur-md border border-amber-500/40">
                      <IconMaximize className="h-3.5 w-3.5" />
                      <span>Full View</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/90 backdrop-blur-sm text-black">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-zinc-200 tabular-nums">
                      {item.date}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h4 className="text-base font-bold tracking-tight text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2">
                  {item.metrics ? (
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      ✨ {item.metrics}
                    </span>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-3">
                    {item.image && (
                      <button
                        onClick={() =>
                          handleOpenPhoto({
                            src: item.image!,
                            alt: item.title,
                            title: item.title,
                            subtitle: item.category,
                            description: item.description,
                            metrics: item.metrics,
                            link: item.link,
                          })
                        }
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline transition-colors"
                      >
                        <IconMaximize className="h-3.5 w-3.5" />
                        <span>Full View</span>
                      </button>
                    )}

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playTapSound("pop")}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline transition-colors"
                      >
                        <span>Details</span>
                        <IconExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Certifications */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <IconCertificate className="h-5 w-5 text-cyan-400" />
            Certifications & Specializations
          </h3>
          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            Infinite Loop • Reverse Scroll • Click Card for 3D Flip
          </span>
        </div>

        <Marquee reverse pauseOnHover repeat={4} className="[--duration:30s] [--gap:1.5rem] py-2">
          {data.certificates.map((cert) => (
            <div key={cert.title} className="shrink-0">
              <CertFlipCard cert={cert} handleOpenPhoto={handleOpenPhoto} />
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
  handleOpenPhoto,
}: {
  cert: (typeof data.certificates)[number];
  handleOpenPhoto: (item: PhotoLightboxItem) => void;
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
            <span>Click / Tap to flip ↻</span>
            <span className="text-[11px] text-muted-foreground font-normal">Interactive</span>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border border-indigo-500/60 bg-gradient-to-br from-indigo-950/90 via-background to-zinc-950 p-5 flex flex-col justify-between overflow-hidden shadow-2xl text-foreground">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-indigo-500/30 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                Skills & Verification
              </span>
              <span className="text-xs text-muted-foreground font-mono">{cert.date}</span>
            </div>

            <h4 className="text-sm font-bold text-foreground">{cert.title}</h4>

            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-indigo-300 uppercase">Core Skills</p>
              <div className="flex flex-wrap gap-1">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-indigo-500/30">
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  playTapSound("pop");
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <span>Verify Credential</span>
                <IconExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPhoto({
                  src: cert.image,
                  alt: cert.title,
                  title: cert.title,
                  subtitle: cert.issuer,
                  description: `Issued by ${cert.issuer} (${cert.date}). Skills: ${cert.skills.join(", ")}`,
                  link: cert.credentialUrl,
                });
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-background/60 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
            >
              <IconMaximize className="h-3.5 w-3.5" />
              <span>Full View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


