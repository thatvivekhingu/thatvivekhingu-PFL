"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconBrandSpotify } from "@tabler/icons-react";

export default function GujjuversePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/music");
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-[#121212] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
      <div className="w-16 h-16 rounded-full bg-[#1DB954] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(29,185,84,0.5)] animate-pulse">
        <IconBrandSpotify className="w-9 h-9 text-black" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Redirecting to Spotify Music Player...</h1>
      <p className="text-zinc-400 text-sm mb-6 max-w-sm">
        GujjuVerse has been upgraded to Vivek&apos;s full Spotify Music Player application.
      </p>
      <Link
        href="/music"
        className="px-6 py-2.5 rounded-full bg-[#1DB954] text-black font-bold text-sm hover:scale-105 transition-transform"
      >
        Open Music Player →
      </Link>
    </div>
  );
}
