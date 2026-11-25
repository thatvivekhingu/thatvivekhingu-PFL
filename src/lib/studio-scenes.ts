export interface StudioScene {
  src: string;
  title: string;
  vibe: string;
  slot: string;
  hours: string;
  accent: string;
}

export const STUDIO_SCENES: StudioScene[] = [
  {
    src: "/studio-scene-2.jpg",
    title: "Acoustic Dawn Sanctuary",
    vibe: "Warm Analog Sunbeams & Organic Tones",
    slot: "Dawn & Morning",
    hours: "06:00 — 12:59",
    accent: "#F59E0B",
  },
  {
    src: "/studio-scene-4.jpg",
    title: "Raindrops & Tube Glow",
    vibe: "Mellow Bokeh & Atmospheric Rain Lounge",
    slot: "Afternoon & Twilight",
    hours: "13:00 — 19:59",
    accent: "#10B981",
  },
  {
    src: "/studio-scene-3.jpg",
    title: "Neural Waveform Penthouse",
    vibe: "Deep Code Synthesis & Harmonic Waves",
    slot: "Night Prime",
    hours: "20:00 — 23:59",
    accent: "#8B5CF6",
  },
  {
    src: "/studio-scene-1.jpg",
    title: "Cyberpunk 3 AM Studio",
    vibe: "Neon Rain Skyline & Modular Synthesizers",
    slot: "Late Night Grind",
    hours: "00:00 — 05:59",
    accent: "#06B6D4",
  },
];

export const SCENE_END_HOURS = [13, 20, 24, 6];

/** Returns a Date whose H/M/S reflects Indian Standard Time (IST) */
export function getISTNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
}

/** Maps an IST hour (0–23) to the appropriate studio scene */
export function indexForHour(h: number): number {
  if (h >= 6 && h < 13) return 0;  // Morning (06:00 - 12:59)
  if (h >= 13 && h < 20) return 1; // Afternoon & Twilight (13:00 - 19:59)
  if (h >= 20 && h < 24) return 2; // Night (20:00 - 23:59)
  return 3;                        // Late Night (00:00 - 05:59)
}

/** Milliseconds until next time slot transition */
export function msUntilNextSlot(slotIdx: number, istNow: Date): number {
  const endHour = SCENE_END_HOURS[slotIdx];
  const target = new Date(istNow);
  if (endHour === 24) {
    target.setDate(target.getDate() + 1);
    target.setHours(0, 0, 0, 0);
  } else {
    target.setHours(endHour, 0, 0, 0);
    if (target <= istNow) target.setDate(target.getDate() + 1);
  }
  return target.getTime() - istNow.getTime();
}
