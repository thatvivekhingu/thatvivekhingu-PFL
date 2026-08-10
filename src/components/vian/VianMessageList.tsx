"use client";

import React from "react";
import { VianMessageItem } from "@/hooks/useVianSessions";
import { VianMessage } from "./VianMessage";

interface VianMessageListProps {
  messages: VianMessageItem[];
  isGenerating: boolean;
  endRef: React.RefObject<HTMLDivElement | null>;
  onRegenerate: () => void;
}

export function VianMessageList({
  messages,
  isGenerating,
  endRef,
  onRegenerate,
}: VianMessageListProps) {
  // Find index of the last assistant message
  const lastAssistantIdx = [...messages].reverse().findIndex((m) => m.role === "assistant");
  const actualLastAssistantIdx = lastAssistantIdx !== -1 ? messages.length - 1 - lastAssistantIdx : -1;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <VianMessage
          key={msg.id}
          message={msg}
          isLastAssistant={index === actualLastAssistantIdx && !isGenerating}
          onRegenerate={onRegenerate}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
}
