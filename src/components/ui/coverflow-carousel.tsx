"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CoverflowItem {
  image: string;
  title?: string;
  subtitle?: string;
  alt?: string;
  blurDataURL?: string;
}

export interface CoverflowCarouselProps {
  /** Array of items containing image url, title, and optional blurDataURL */
  items: CoverflowItem[];
  /** Whether to automatically advance cards (default: true) */
  autoPlay?: boolean;
  /** Interval in milliseconds between advances (default: 2500) */
  interval?: number;
  /** Optional custom class name for the outer container */
  className?: string;
  /** Callback when the center (active) card or any card is clicked */
  onCardClick?: (
    item: CoverflowItem,
    index: number,
    event: React.MouseEvent<HTMLElement>
  ) => void;
}

/**
 * Reusable CoverflowCarousel Component
 *
 * Implements a coverflow-style stacked card carousel in React + TypeScript
 * using Framer Motion spring physics and Tailwind CSS.
 *
 * Layout:
 * - Horizontal row of portrait cards (~270px desktop, ~220px mobile) overlapping slightly.
 * - Aligned to bottom edge with originY: 1, forming a pyramid/staircase shape.
 * - Center card is tallest, fully opaque, and full color.
 * - Side cards get progressively shorter, scaled down, and lower opacity (1 -> 0.65 -> 0.35 -> 0.15).
 * - Grayscale filter on side cards fades to full color when active.
 * - Edges fade out smoothly via gradient masks.
 *
 * Interactions:
 * - 2.5s auto-play with infinite loop (wrap-around).
 * - Pauses auto-play on hover.
 * - Supports drag/swipe, mouse wheel, keyboard arrows, and clicking any side card.
 */
export function CoverflowCarousel({
  items,
  autoPlay = true,
  interval = 2500,
  className,
  onCardClick,
}: CoverflowCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef<number>(0);

  // Responsive breakpoint tracking: 3 cards on mobile, 5 on tablet, 7 on desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure minimum pool size so infinite wrap-around never breaks even with small item arrays
  const pool = useMemo(() => {
    if (!items || items.length === 0) return [];
    let list = items;
    while (list.length < 14) {
      list = [...list, ...items];
    }
    return list;
  }, [items]);

  const total = pool.length;

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer: advances every interval (2.5s) unless hovered or dragged
  useEffect(() => {
    if (!autoPlay || isHovered || isDragging || total === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isHovered, isDragging, total, handleNext]);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Mouse wheel horizontal navigation (throttled)
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const now = Date.now();
      if (now - wheelLockRef.current < 260) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 22) {
        wheelLockRef.current = now;
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    },
    [handleNext, handlePrev]
  );

  if (!items || items.length === 0) {
    return null;
  }

  // Maximum offset to render: mobile shows 3 cards (offset -1, 0, 1), desktop shows 7-9 cards (offset -3..3)
  const maxRenderOffset = isMobile ? 1 : 3;

  // Responsive dimensions
  const cardWidth = isMobile ? 220 : 270;
  const baseHeight = isMobile ? 360 : 440;
  const stepX = isMobile ? 140 : 185;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Coverflow photo carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full overflow-hidden select-none outline-none flex items-end justify-center",
        "h-[390px] sm:h-[470px] md:h-[500px] pb-2",
        className
      )}
    >
      {/* Pan / Drag Capture Layer across full carousel width */}
      <motion.div
        className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing touch-pan-y"
        onPanStart={() => setIsDragging(true)}
        onPanEnd={(_e, info) => {
          setIsDragging(false);
          if (info.offset.x > 35 || info.velocity.x > 200) {
            handlePrev();
          } else if (info.offset.x < -35 || info.velocity.x < -200) {
            handleNext();
          }
        }}
      />

      {/* Render Stacked Cards anchored to the bottom */}
      <div className="relative w-full h-full flex items-end justify-center">
        {pool.map((item, index) => {
          // Compute shortest modular distance from activeIndex
          let offset = index - activeIndex;
          while (offset > total / 2) offset -= total;
          while (offset < -total / 2) offset += total;

          const absOffset = Math.abs(offset);

          // Cull cards outside the visible pyramid window
          if (absOffset > maxRenderOffset + 1) {
            return null;
          }

          // Exact formula requested:
          // height = baseHeight - |offset| * 40px
          // opacity = 1 -> 0.65 -> 0.35 -> 0.15
          // zIndex = 10 - |offset|
          const calculatedHeight = Math.max(180, baseHeight - absOffset * 40);
          const translateX = offset * stepX;
          const scale = Math.max(0.72, 1 - absOffset * 0.08);

          let opacity = 0;
          if (absOffset === 0) opacity = 1;
          else if (absOffset === 1) opacity = 0.65;
          else if (absOffset === 2) opacity = 0.35;
          else if (absOffset === 3) opacity = 0.15;
          else opacity = 0;

          const zIndex = 20 - absOffset;
          const isCenter = absOffset === 0;

          return (
            <motion.div
              key={`${item.image}-${index}`}
              role="button"
              tabIndex={0}
              aria-label={item.title || `Photo ${index + 1}`}
              onClick={(e) => {
                if (!isCenter) {
                  e.stopPropagation();
                  setActiveIndex(index);
                } else if (onCardClick) {
                  onCardClick(item, index % items.length, e);
                }
              }}
              initial={false}
              animate={{
                x: `calc(-50% + ${translateX}px)`,
                height: calculatedHeight,
                scale,
                opacity,
                filter: isCenter ? "grayscale(0%)" : "grayscale(65%)",
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 0.8,
              }}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                width: cardWidth,
                transformOrigin: "bottom center",
                zIndex,
              }}
              className={cn(
                "group/card overflow-hidden rounded-2xl border-2 shadow-2xl",
                isCenter
                  ? "border-cyan-400/80 shadow-[0_16px_40px_rgba(34,211,238,0.25)] cursor-pointer"
                  : "border-white/10 hover:border-white/30 cursor-pointer"
              )}
            >
              {/* Card Image */}
              <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                <Image
                  src={item.image}
                  alt={item.alt || item.title || "Photo"}
                  fill
                  sizes="(min-width: 640px) 270px, 220px"
                  placeholder={item.blurDataURL ? "blur" : "empty"}
                  blurDataURL={item.blurDataURL}
                  className="object-cover transition-transform duration-500 group-hover/card:scale-105 pointer-events-none"
                  priority={isCenter}
                />

                {/* Subtle Bottom Ambient Gradient Overlay for text readability */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Card Title Stamp */}
                {item.title && (
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                    <span className="font-[family-name:var(--font-anton)] text-sm sm:text-base tracking-wider uppercase drop-shadow-md truncate">
                      {item.title}
                    </span>
                    {isCenter && (
                      <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-400/30 px-2 py-0.5 rounded-full shrink-0 shadow-sm">
                        VIEW
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Left and Right Edge Gradient Fade-out Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-40" />

      {/* Interactive Navigation Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 select-none">
        {items.map((_, dotIdx) => {
          const isActive = activeIndex % items.length === dotIdx;
          return (
            <button
              key={dotIdx}
              type="button"
              aria-label={`Go to slide ${dotIdx + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                // Find nearest index in pool corresponding to dotIdx
                const target = pool.findIndex(
                  (_, pIdx) => pIdx % items.length === dotIdx
                );
                if (target !== -1) setActiveIndex(target);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                isActive
                  ? "w-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CoverflowCarousel;
