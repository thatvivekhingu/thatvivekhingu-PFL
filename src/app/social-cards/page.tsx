import React from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { SocialBentoBoard } from "@/components/social-cards";

export const metadata = {
  title: "Social Bento Board | Vivek Hingu",
  description: "Complete dark-glassmorphic social dashboard for Instagram, GitHub, and LinkedIn.",
};

export default function SocialCardsPage() {
  return (
    <main className="min-h-screen bg-[#05070a] text-foreground py-8 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header & Navigation */}
        <div className="flex items-center justify-between px-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors bg-zinc-900/80 px-3.5 py-1.5 rounded-full border border-zinc-800"
          >
            <IconArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
          <span className="text-xs font-mono text-zinc-500">
            Social Bento Grid • Vivek Hingu
          </span>
        </div>

        {/* The Exact Pixel-Perfect Bento Board */}
        <SocialBentoBoard />
      </div>
    </main>
  );
}
