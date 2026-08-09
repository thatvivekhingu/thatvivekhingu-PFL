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
      className={`relative cursor-pointer overflow-hidden rounded-full border border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] transition-all duration-300 ${className}`}
      title="Vivek Hingu • Home"
    >
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