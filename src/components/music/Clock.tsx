"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      // Format Indian Standard Time (IST)
      const istStr = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTimeStr(istStr);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono text-xs text-white/90 shadow-md whitespace-nowrap shrink-0">
      <span className="text-white/40 font-mono text-[10px] tracking-wider shrink-0">IST // CLOCK</span>
      <span className="w-px h-3 bg-white/15 shrink-0" />
      <span className="tabular-nums tracking-wide whitespace-nowrap">{timeStr}</span>
    </div>
  );
}
