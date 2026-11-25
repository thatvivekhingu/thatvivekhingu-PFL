"use client";

import React, { useState, useEffect } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

export interface LottiePlayerProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  className?: string;
  hover?: boolean;
  fallbackIcon?: React.ReactNode;
}

export function LottiePlayer({
  src,
  autoplay = true,
  loop = true,
  speed = 1,
  className = "w-12 h-12",
  hover = false,
  fallbackIcon,
}: LottiePlayerProps) {
  const [mounted, setMounted] = useState(false);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = () => {
    if (hover && dotLottie) {
      dotLottie.play();
    }
  };

  const handleMouseLeave = () => {
    if (hover && dotLottie) {
      dotLottie.pause();
    }
  };

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center opacity-60 ${className}`}>
        {fallbackIcon || <div className="w-full h-full rounded-lg bg-zinc-800/40 animate-pulse" />}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {fallbackIcon || null}
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={hover ? false : autoplay}
        speed={speed}
        dotLottieRefCallback={(ref) => setDotLottie(ref)}
        onError={() => setHasError(true)}
        className="w-full h-full object-contain pointer-events-none select-none"
      />
    </div>
  );
}
