export type ChannelCategory = "synthwave" | "indie" | "focus" | "sacred" | "chill";

export interface Track {
  id: string;
  title: string;
  artist: string;
  category: ChannelCategory;
  duration?: string;
  frequency?: string;
}

export const CATEGORIES: Record<ChannelCategory, { color: string; label: string; tag: string }> = {
  synthwave: { color: "#06B6D4", label: "Cyber & Synthwave", tag: "88.1 MHz" },
  indie:     { color: "#F59E0B", label: "Indie & Acoustic",  tag: "94.5 MHz" },
  focus:     { color: "#8B5CF6", label: "Deep Flow Coding",  tag: "101.2 MHz" },
  sacred:    { color: "#10B981", label: "Sacred & Trance",   tag: "105.8 MHz" },
  chill:     { color: "#EC4899", label: "Midnight Lofi",     tag: "108.0 MHz" },
};

export const TRACKS: Track[] = [
  // ── Channel 01: Cyber & Synthwave ──
  { id: "8GW6sLrK40k", title: "Resonance", artist: "HOME", category: "synthwave", duration: "3:32", frequency: "88.1" },
  { id: "L_LUpnjgPso", title: "Sunset", artist: "The Midnight", category: "synthwave", duration: "5:26", frequency: "88.5" },
  { id: "4xDzrJKXOOY", title: "Midnight City Lights", artist: "Synthwave Radiance", category: "synthwave", duration: "4:15", frequency: "89.2" },

  // ── Channel 02: Indie & Acoustic ──
  { id: "sfl36N_0h4Y", title: "Kasoor (Acoustic)", artist: "Prateek Kuhad", category: "indie", duration: "3:17", frequency: "94.5" },
  { id: "gvyUuxdRdR4", title: "Baarishein", artist: "Anuv Jain", category: "indie", duration: "3:28", frequency: "95.1" },
  { id: "IltsZZ_Wptw", title: "Husn", artist: "Anuv Jain", category: "indie", duration: "3:38", frequency: "95.7" },
  { id: "f6Z2wO1pZt4", title: "Alag Aasmaan", artist: "Anuv Jain", category: "indie", duration: "3:53", frequency: "96.4" },
  { id: "4oB30_e0tC4", title: "Dil Mere", artist: "The Local Train", category: "indie", duration: "3:33", frequency: "97.0" },
  { id: "kLpH1nSLJSs", title: "When We Feel Young", artist: "When Chai Met Toast", category: "indie", duration: "3:44", frequency: "97.8" },

  // ── Channel 03: Deep Flow Coding ──
  { id: "UDVtMYqUAyw", title: "Interstellar Main Theme (Synth Re-score)", artist: "Hans Zimmer / Ambient Labs", category: "focus", duration: "4:45", frequency: "101.2" },
  { id: "L5s7o_N2QY4", title: "Time (Inception Cyber Ambient)", artist: "Hans Zimmer", category: "focus", duration: "4:35", frequency: "101.9" },
  { id: "7NOSDKb0HlU", title: "Yellow (Acoustic Ambient Drift)", artist: "Acoustic Lounge", category: "focus", duration: "4:05", frequency: "102.5" },

  // ── Channel 04: Sacred & Trance ──
  { id: "AETFvQonfV8", title: "Shri Hanuman Chalisa (Sacred Atmosphere)", artist: "Gulshan Kumar / Sacred Drift", category: "sacred", duration: "9:40", frequency: "105.8" },

  // ── Channel 05: Midnight Lofi ──
  { id: "jfKfPfyJRdk", title: "Midnight Coding Session", artist: "Lofi Girl", category: "chill", duration: "3:10", frequency: "108.0" },
  { id: "y4ph5zOq-zY", title: "Tu Aake Dekhle (Lofi Lounge)", artist: "King / Chill Room", category: "chill", duration: "3:22", frequency: "108.5" },
  { id: "1fuDDqU6n4o", title: "Barood (Lofi Keystrokes)", artist: "Chaar Diwaari", category: "chill", duration: "2:48", frequency: "108.9" },
];
