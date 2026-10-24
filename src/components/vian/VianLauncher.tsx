"use client";

import React from "react";
import Image from "next/image";

interface VianLauncherProps {
  onClick: () => void;
  isOpen: boolean;
}

export function VianLauncher({ onClick, isOpen }: VianLauncherProps) {
  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Chat with Vivek"
      aria-expanded={isOpen}
      className="fixed bottom-5 right-5 z-[9990] group relative flex h-13 w-13 items-center justify-center rounded-full border-2 border-[#00a884] bg-[#202c33] p-0.5 shadow-2xl transition-all duration-300 hover:scale-110 hover:border-[#25d366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] active:scale-95 cursor-pointer"
    >
      {/* Online Status Dot Badge */}
      <span className="absolute -top-0.5 -right-0.5 z-20 flex h-3.5 w-3.5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
      </span>

      {/* Profile Avatar Logo */}
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <Image
          src="/avatars/vivek.jpg"
          alt="Vivek Hingu"
          fill
          sizes="52px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Tooltip on Hover */}
      <span className="absolute right-15 whitespace-nowrap rounded-md bg-[#182229] px-2.5 py-1 text-xs font-semibold text-white opacity-0 transition-all duration-200 group-hover:opacity-100 pointer-events-none shadow-xl border border-white/10 flex items-center gap-1.5">
        <span>Chat with Vivek</span>
        <span className="text-[10px] text-[#25d366]">● online</span>
      </span>
    </button>
  );
}
