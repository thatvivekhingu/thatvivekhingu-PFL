"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { SectionHeading } from "@/components/layout/section-heading";
import {
    SunsetLightbox,
    type LightboxState,
} from "@/components/home/sunset-lightbox";
import type { SunsetPhoto } from "@/lib/sunsets";

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

import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

export default function Earth({ photos }: { photos: SunsetPhoto[] }) {
    const [active, setActive] = useState<LightboxState | null>(null);

    const open = (
        photo: SunsetPhoto,
        e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => {
        const el = e.currentTarget;
        // Name only the clicked node (not via CSS) so it stays unique, then morph it into expanded image
        el.style.setProperty("view-transition-name", VT_NAME);
        withViewTransition(() => {
            flushSync(() => setActive({ photo, trigger: el }));
            el.style.removeProperty("view-transition-name");
        });
    };

    const close = () => {
        const el = active?.trigger;
        withViewTransition(() => {
            flushSync(() => setActive(null));
            el?.style.setProperty("view-transition-name", VT_NAME);
        }).finished.finally(() => el?.style.removeProperty("view-transition-name"));
    };

    // Transform photos into CoverflowCarousel items
    const coverflowItems = photos.map((p) => ({
        image: p.src,
        title: p.alt,
        alt: p.alt,
        blurDataURL: p.blurDataURL,
    }));

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
                <div className="relative border-b border-white/10 pb-2">
                    <CoverflowCarousel
                        items={coverflowItems}
                        autoPlay={!active}
                        interval={2500}
                        onCardClick={(item, index, e) => {
                            const photo = photos[index % photos.length] || { src: item.image, alt: item.title || "" };
                            open(photo, e);
                        }}
                    />
                </div>
            )}

            {photos.length > 0 && <SunsetLightbox state={active} onClose={close} />}
        </div>
    );
}
