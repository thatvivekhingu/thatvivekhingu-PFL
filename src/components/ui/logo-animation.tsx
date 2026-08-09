"use client";

import { motion } from "motion/react";
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
      className={`relative cursor-pointer overflow-hidden rounded-full border border-cyan-400/60 shadow-[0_0_18px_rgba(34,211,238,0.5)] transition-all ${className}`}
    >
      {/* scale-[1.45] crops out the outer black background padding so the circular VIVEK HINGU emblem fills 100% of the box */}
      <Image
        src="/logo/personal-logo.png"
        alt="Vivek Hingu Logo"
        fill
        className="object-cover rounded-full scale-[1.45]"
        priority
      />
    </motion.div>
  );
};