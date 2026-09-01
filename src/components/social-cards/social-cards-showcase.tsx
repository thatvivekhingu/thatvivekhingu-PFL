"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandGithub,
  IconLayoutGrid,
  IconSparkles,
} from "@tabler/icons-react";
import { InstagramCard, InstagramCardProps } from "./instagram-card";
import { LinkedInCard, LinkedInCardProps } from "./linkedin-card";
import { GitHubCard, GitHubCardProps } from "./github-card";

export interface SocialCardsShowcaseProps {
  instagramProps?: Partial<InstagramCardProps>;
  linkedinProps?: Partial<LinkedInCardProps>;
  githubProps?: Partial<GitHubCardProps>;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const SocialCardsShowcase: React.FC<SocialCardsShowcaseProps> = ({
  instagramProps,
  linkedinProps,
  githubProps,
  title = "Social Cards Showcase (9:16)",
  subtitle = "Interactive 9:16 aspect ratio embed cards for Instagram, LinkedIn, and GitHub.",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "instagram" | "linkedin" | "github">("all");

  const tabs = [
    { id: "all", label: "All Cards", icon: <IconLayoutGrid className="w-4 h-4" /> },
    {
      id: "instagram",
      label: "Instagram",
      icon: <IconBrandInstagram className="w-4 h-4 text-rose-500" />,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <IconBrandLinkedin className="w-4 h-4 text-[#0a66c2]" />,
    },
    {
      id: "github",
      label: "GitHub",
      icon: <IconBrandGithub className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />,
    },
  ] as const;

  return (
    <div className={`w-full py-8 space-y-8 ${className}`}>
      {/* Header & Tabs */}
      <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
          <IconSparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>9:16 Vertical Cards Edition</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md scale-105"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid / Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 justify-items-center">
        {/* 1. Instagram Card */}
        {(activeTab === "all" || activeTab === "instagram") && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center"
          >
            <InstagramCard
              username="realvivek.py"
              userHandle="realvivek.py"
              avatarUrl="/avatars/vivek.jpg"
              mediaImage="/social/instagram-profile.png"
              location="DAU (DA-IICT), Gandhinagar"
              followersCount="4,651 followers"
              likesCount={710}
              caption="Live from the AI workshop at DA-IICT! Exploring next-gen multilingual models ⚡🤖 #TechFest #AI"
              eventTitle="THE 9TEEN • i.FEST"
              eventDate="15th November"
              {...instagramProps}
            />
          </motion.div>
        )}

        {/* 2. LinkedIn Card */}
        {(activeTab === "all" || activeTab === "linkedin") && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center"
          >
            <LinkedInCard
              name="Vivek Hingu"
              headline="AI & Machine Learning Engineer | B.E. IT @ SAL"
              avatarUrl="/avatars/vivek.jpg"
              mediaImage="/social/linkedin-post.png"
              badgeText="🏆 2nd Prize Winner — Flinders AI Competition"
              reactionsCount={842}
              commentsCount={48}
              repostsCount={19}
              postContent="Honored to receive the 2nd Prize at Flinders University AI Competition 2026! 🚀 Grateful to the mentors, teammates, and organizers."
              {...linkedinProps}
            />
          </motion.div>
        )}

        {/* 3. GitHub Card */}
        {(activeTab === "all" || activeTab === "github") && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-center"
          >
            <GitHubCard
              owner="thatvivekhingu"
              repoName="Bharat-Bhasha-Ai-2.0"
              avatarUrl="/avatars/vivek.jpg"
              mediaImage="/social/github-profile.png"
              starsCount={148}
              forksCount={34}
              watchersCount={52}
              primaryLanguage="Python"
              latestRelease="v2.1.0"
              description="Multilingual Voice & Text AI Operating System powered by Grok API with real-time Indian language synthesis."
              tags={["ai-os", "grok-api", "voice-synthesis", "gujarati", "nlp"]}
              {...githubProps}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};
