"use client";

import Image from "next/image";
import { useState } from "react";
import { flushSync } from "react-dom";
import { SectionHeading } from "@/components/layout/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { Lens } from "@/components/magicui/lens";
import {
    SunsetLightbox,
    type LightboxState,
} from "@/components/home/sunset-lightbox";
import type { SunsetPhoto } from "@/lib/sunsets";
import { cn } from "@/lib/utils";

// Shared between the clicked thumbnail and the expanded image so the View
// Transitions API morphs one into the other.
const VT_NAME = "sunset-zoom";

/** Run a DOM update as a view transition, falling back to an instant update. */
function withViewTransition(update: () => void): { finished: Promise<void> } {
    const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    if (typeof doc.startViewTransition === "function") {
        return doc.startViewTransition(update);
    }
    update();
    return { finished: Promise.resolve() };
}

// Mountain Arch ("Pahad") height pattern: rises from low to peak and slopes down to create an undulating mountain crest
const MOUNTAIN_HEIGHTS = [
    "h-40 sm:h-56 md:h-64",          // Slope low
    "h-52 sm:h-72 md:h-80",          // Slope mid
    "h-64 sm:h-84 md:h-96",          // Slope high
    "h-76 sm:h-[390px] md:h-[450px]",// Mountain Peak
    "h-64 sm:h-84 md:h-96",          // Slope high
    "h-52 sm:h-72 md:h-80",          // Slope mid
    "h-40 sm:h-56 md:h-64",          // Slope low
];

export default function Earth({ photos }: { photos: SunsetPhoto[] }) {
    const [active, setActive] = useState<LightboxState | null>(null);
    // Track which sources have decoded so we can swap the skeleton for the
    // real image. Keyed by src, so all of the marquee's duplicated copies
    // reveal together the moment that photo loads once.
    const [loaded, setLoaded] = useState<Set<string>>(new Set());
    const markLoaded = (src: string) =>
        setLoaded((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

    const open = (
        photo: SunsetPhoto,
        e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => {
        const el = e.currentTarget;
        // Name only the clicked node (not via CSS) so it stays unique among the
        // marquee's duplicated copies, then morph it into the expanded image.
        el.style.setProperty("view-transition-name", VT_NAME);
        withViewTransition(() => {
            flushSync(() => setActive({ photo, trigger: el }));
            // The expanded image now carries the name; release it here so the
            // after-state has exactly one element named VT_NAME.
            el.style.removeProperty("view-transition-name");
        });
    };

    const close = () => {
        const el = active?.trigger;
        withViewTransition(() => {
            flushSync(() => setActive(null));
            // Hand the name back to the thumbnail so it becomes the morph target.
            el?.style.setProperty("view-transition-name", VT_NAME);
        }).finished.finally(() => el?.style.removeProperty("view-transition-name"));
    };

    return (
        <div className="flex flex-col gap-6">
            <SectionHeading
              number="08"
              chapter="CHAPTER 08 — BEYOND THE SCREEN"
            >
              <span className="text-[#3B82F6]">MOMENTS</span>{" "}
              <span className="text-white">&amp; HORIZONS</span>
            </SectionHeading>

            {photos.length > 0 && (
                <div className="relative border-b border-white/10">
                    <Marquee
                        pauseOnHover
                        paused={!!active}
                        innerClassName="items-end"
                        className="[--duration:55s] [--gap:0.75rem] sm:[--gap:1rem] px-0 pt-8 sm:pt-14 pb-0 items-end"
                    >
                        {photos.map((photo, index) => {
                            const heightClass = MOUNTAIN_HEIGHTS[index % MOUNTAIN_HEIGHTS.length];
                            return (
                                <div
                                    key={`${photo.src}-${index}`}
                                    className="group/card relative shrink-0 cursor-pointer self-end transition-transform duration-300 hover:scale-[1.03]"
                                    data-cursor="Zoom"
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View photo: ${photo.alt}`}
                                    onClick={(e) => open(photo, e)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            open(photo, e);
                                        }
                                    }}
                                >
                                    <Image
                                        src={photo.src}
                                        alt=""
                                        aria-hidden
                                        fill
                                        sizes="40px"
                                        className="pointer-events-none scale-105 rounded-t-2xl sm:rounded-t-3xl object-cover blur-lg saturate-150 opacity-0 transition-opacity duration-700 group-hover/card:opacity-70 motion-reduce:transition-none"
                                    />
                                    <Lens zoomFactor={1.75} lensSize={110} ariaLabel={photo.alt}>
                                        <div className={cn(
                                            "relative w-36 sm:w-52 md:w-60 overflow-hidden rounded-t-2xl sm:rounded-t-3xl border-t border-x border-white/15 bg-neutral-900/60 shadow-2xl",
                                            heightClass
                                        )}>
                                            {!photo.blurDataURL && !loaded.has(photo.src) && (
                                                <div className="absolute inset-0 animate-pulse rounded-t-2xl sm:rounded-t-3xl bg-muted" />
                                            )}
                                            <Image
                                                src={photo.src}
                                                alt={photo.alt}
                                                fill
                                                sizes="(min-width: 640px) 336px, 252px"
                                                placeholder={photo.blurDataURL ? "blur" : "empty"}
                                                blurDataURL={photo.blurDataURL}
                                                onLoad={() => markLoaded(photo.src)}
                                                className={cn(
                                                    "object-cover",
                                                    !photo.blurDataURL &&
                                                        "transition-opacity duration-500 motion-reduce:transition-none",
                                                    !photo.blurDataURL && !loaded.has(photo.src)
                                                        ? "opacity-0"
                                                        : "opacity-100",
                                                )}
                                            />
                                        </div>
                                    </Lens>
                                </div>
                            );
                        })}
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-background z-20" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-background z-20" />
                </div>
            )}

            {photos.length > 0 && <SunsetLightbox state={active} onClose={close} />}
        </div>
    );
}
