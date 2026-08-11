import React, { useState } from "react";
import Image from "next/image";
import { IconCopy, IconCheck, IconRefresh } from "@tabler/icons-react";
import { VianMessageItem } from "@/hooks/useVianSessions";

interface VianMessageProps {
  message: VianMessageItem;
  isLastAssistant: boolean;
  onRegenerate?: () => void;
}

export function VianMessage({
  message,
  isLastAssistant,
  onRegenerate,
}: VianMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`group relative flex w-full flex-col ${
        isUser ? "items-end" : "items-start"
      }`}
    >
      {/* User Message */}
      {isUser ? (
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-cyan-600 dark:bg-cyan-950/70 border border-cyan-500/30 px-3.5 py-2.5 text-xs text-white dark:text-cyan-100 shadow-sm leading-relaxed font-sans font-medium">
          {message.content}
        </div>
      ) : (
        /* Assistant Message */
        <div className="flex w-full items-start gap-2.5">
          {/* Assistant Avatar */}
          <div className="mt-0.5 relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-cyan-500/40 shadow-sm">
            <Image
              src="/vian-avatar.jpg"
              alt="VIAN Avatar"
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col items-start min-w-0">
            {/* Assistant Body Container */}
            <div className="w-full rounded-2xl rounded-tl-sm border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 px-4 py-3 text-xs text-slate-900 dark:text-zinc-200 leading-relaxed shadow-sm">
              <MarkdownContent content={message.content} />
            </div>

            {/* Assistant Action Buttons */}
            {message.content && !message.isError && (
              <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-zinc-500 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
                  title="Copy response"
                >
                  {copied ? (
                    <>
                      <IconCheck className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {isLastAssistant && onRegenerate && (
                  <button
                    type="button"
                    onClick={onRegenerate}
                    className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
                    title="Regenerate response"
                  >
                    <IconRefresh className="h-3 w-3" />
                    <span>Retry</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Lightweight Markdown Parser Component
 * Parses headings, lists, bold text, links, and code blocks cleanly
 */
function MarkdownContent({ content }: { content: string }) {
  if (!content) {
    return <span className="inline-block h-3 w-2 animate-pulse rounded bg-cyan-400" />;
  }

  const paragraphs = content.split("\n\n");

  return (
    <div className="space-y-2.5 break-words">
      {paragraphs.map((para, idx) => {
        const trimmed = para.trim();

        // Code block handling (```lang ... ```)
        if (trimmed.startsWith("```")) {
          const lines = trimmed.split("\n");
          const codeLang = lines[0].replace("```", "").trim() || "code";
          const codeText = lines.slice(1, lines.length - 1).join("\n");

          return (
            <div key={idx} className="my-2 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-[11px]">
              <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-3 py-1 text-[10px] text-zinc-400">
                <span>{codeLang}</span>
              </div>
              <pre className="overflow-x-auto p-3 text-zinc-300">
                <code>{codeText}</code>
              </pre>
            </div>
          );
        }

        // List item handling
        if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || /^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split("\n");
          return (
            <ul key={idx} className="space-y-1 pl-1">
              {items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-1.5">
                  <span className="text-cyan-400 select-none">•</span>
                  <span>{formatInlineMarkdown(item.replace(/^[-•\d+\.]\s*/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }

        return <p key={idx}>{formatInlineMarkdown(trimmed)}</p>;
      })}
    </div>
  );
}

function formatInlineMarkdown(text: string): React.ReactNode {
  // Simple inline parser for **bold**, `code`, and [link](url)
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-zinc-100">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-[11px] text-cyan-300">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition-colors"
          >
            {match[1]}
          </a>
        );
      }
    }
    return part;
  });
}
