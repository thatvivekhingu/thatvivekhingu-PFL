import React from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { SocialCardsShowcase } from "@/components/social-cards";

export const metadata = {
  title: "9:16 Social Embed Cards | Vivek Hingu",
  description: "Interactive 9:16 aspect ratio embed cards for Instagram, LinkedIn, and GitHub.",
};

export default function SocialCardsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors bg-zinc-100 dark:bg-zinc-800/80 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700/80"
          >
            <IconArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Social Cards Showcase */}
        <SocialCardsShowcase
          title="Social Embed Cards (9:16 Ratio)"
          subtitle="Pixel-perfect embed cards matching the exact Instagram embed UI style, with tailored variants for LinkedIn and GitHub in vertical 9:16 aspect ratio."
        />
      </div>
    </main>
  );
}
