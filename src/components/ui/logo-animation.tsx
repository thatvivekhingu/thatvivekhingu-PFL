"use client";

import { motion } from "motion/react";
import Image from "next/image";

export const AnimatedLogo = ({
  className = "w-9 h-9 sm:w-10 sm:h-10",
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
      className={`relative cursor-pointer overflow-hidden rounded-full border-2 border-cyan-400 dark:border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.45)] ring-2 ring-cyan-500/20 transition-all ${className}`}
    >
      <Image
        src="/logo/personal-logo.png"
        alt="Vivek Hingu Logo"
        fill
        className="object-cover rounded-full p-0.5"
        priority
      />
    </motion.div>
  );
};