"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const AnimatedLogo = ({
  className = "w-10 h-10 sm:w-12 sm:h-12",
  onClick,
}: {
  theme?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.12, rotate: 4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-full border border-zinc-700/80 hover:border-zinc-500 shadow-md transition-all duration-300 ${className}`}
      title="Vivek Hingu • Home"
    >
      <Image
        src="/avatars/pixel-avatar.png"
        alt="Vivek Hingu Logo"
        fill
        sizes="48px"
        className="object-cover rounded-full"
        priority
      />
    </motion.div>
  );
};