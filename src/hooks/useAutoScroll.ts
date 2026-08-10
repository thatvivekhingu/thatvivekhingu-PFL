"use client";

import { useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement>(dependencies: unknown[]) {
  const containerRef = useRef<T | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (smooth = true) => {
    if (endRef.current) {
      endRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  };

  useEffect(() => {
    scrollToBottom(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { containerRef, endRef, scrollToBottom };
}
