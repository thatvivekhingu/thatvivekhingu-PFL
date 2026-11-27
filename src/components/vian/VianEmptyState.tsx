import React from "react";
import Image from "next/image";

export function VianEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 text-center select-none">
      {/* WhatsApp Profile Avatar Card */}
      <div className="relative mb-2.5">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-emerald-500/60 shadow-xl p-0.5">
          <Image
            src="/avatars/pixel-avatar.png"
            alt="Vian"
            fill
            sizes="80px"
            className="object-cover rounded-full"
            priority
          />
        </div>
        {/* WhatsApp Online Indicator Badge */}
        <span className="absolute bottom-1 right-1 h-4.5 w-4.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#202c33] flex items-center justify-center text-[10px] text-white">
          ●
        </span>
      </div>

      {/* Name and Status */}
      <div className="flex items-center gap-1.5 mb-0.5">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#e9edef] tracking-tight">
          Vian
        </h3>
        <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-[#00a884] text-white text-[10px] shrink-0" title="Verified AI Assistant">
          ✓
        </span>
      </div>

      <p className="text-xs font-mono font-medium text-emerald-600 dark:text-[#25d366]">
        Vivek&apos;s AI Assistant • Multi-Agent RAG
      </p>

      {/* WhatsApp Status Quote */}
      <div className="mt-2.5 max-w-xs px-3.5 py-1.5 rounded-xl bg-white/70 dark:bg-[#182229]/80 border border-slate-200/60 dark:border-white/5 text-[11px] text-slate-600 dark:text-[#8696a0] italic leading-relaxed">
        &ldquo;Hey there! I am Vian, Vivek Hingu&apos;s personal AI Assistant. Ask me anything about Vivek&apos;s engineering projects, ML models, or background! 🚀&rdquo;
      </div>
    </div>
  );
}

