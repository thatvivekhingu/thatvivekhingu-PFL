import React, { useState } from "react";
import Image from "next/image";
import {
  IconCopy,
  IconCheck,
  IconRefresh,
  IconCalendarEvent,
  IconMail,
  IconWorld,
  IconCalculator,
  IconCompass,
  IconExternalLink,
} from "@tabler/icons-react";
import { VianMessageItem } from "@/hooks/useVianSessions";
import type { VianToolAction } from "@/lib/vian/agent-tools";
import type { AgentTraceStep } from "@/lib/vian/multi-agent";

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
              {/* Render Agentic Workflow Trace if present */}
              {message.trace && message.trace.length > 1 && (
                <VianAgentWorkflowTrace trace={message.trace} />
              )}

              <MarkdownContent content={message.content} />

              {/* Render Tool Action Cards if any */}
              {message.actions && message.actions.length > 0 && (
                <div className="mt-3 space-y-2 border-t border-slate-100 dark:border-zinc-800/60 pt-2.5">
                  {message.actions.map((act) => (
                    <VianActionCard key={act.id} action={act} />
                  ))}
                </div>
              )}
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

function VianActionCard({ action }: { action: VianToolAction }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNavigate = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  switch (action.actionType) {
    case "calendar": {
      const data = action.data as {
        title?: string;
        startDate?: string;
        startTime?: string;
        duration?: string;
        location?: string;
      };
      return (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 p-3 text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
            <IconCalendarEvent className="h-4 w-4 shrink-0" />
            <span>{action.title}</span>
          </div>
          <div className="text-[11px] text-zinc-600 dark:text-zinc-300 space-y-0.5 pl-6">
            {data.startDate && (
              <div>
                📅 Date: {data.startDate} at {data.startTime} ({data.duration})
              </div>
            )}
            {data.location && <div>📍 Location: {data.location}</div>}
          </div>
          {action.link && (
            <div className="pt-1 pl-6">
              <a
                href={action.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white dark:text-black font-medium px-3 py-1.5 text-[11px] transition-colors shadow-sm"
              >
                <span>{action.linkText || "Add to Google Calendar"}</span>
                <IconExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      );
    }

    case "email": {
      const data = action.data as {
        recipient?: string;
        subject?: string;
        body?: string;
      };
      return (
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/20 p-3 text-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
            <IconMail className="h-4 w-4 shrink-0" />
            <span>{action.title}</span>
          </div>
          <div className="text-[11px] text-zinc-600 dark:text-zinc-300 space-y-1 pl-6">
            <div>
              <span className="text-zinc-500">To:</span> {data.recipient}
            </div>
            <div>
              <span className="text-zinc-500">Subject:</span> {data.subject}
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1 pl-6">
            {action.link && (
              <a
                href={action.link}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1.5 text-[11px] transition-colors shadow-sm"
              >
                <span>{action.linkText || "Open in Mail Client"}</span>
                <IconExternalLink className="h-3 w-3" />
              </a>
            )}
            {data.body && (
              <button
                type="button"
                onClick={() => handleCopy(data.body || "")}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                {copied ? (
                  <IconCheck className="h-3 w-3 text-emerald-400" />
                ) : (
                  <IconCopy className="h-3 w-3" />
                )}
                <span>{copied ? "Copied Draft" : "Copy Body"}</span>
              </button>
            )}
          </div>
        </div>
      );
    }

    case "navigation": {
      const data = action.data as { section?: string; label?: string };
      return (
        <div className="flex items-center justify-between rounded-xl border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-950/20 p-2.5 text-xs">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium">
            <IconCompass className="h-4 w-4 shrink-0" />
            <span>{action.title}</span>
          </div>
          <button
            type="button"
            onClick={() => handleNavigate(data.section || "projects")}
            className="inline-flex items-center gap-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-2.5 py-1 text-[11px] transition-colors cursor-pointer shadow-sm"
          >
            <span>{action.linkText || "Jump to Section"}</span>
            <span>↓</span>
          </button>
        </div>
      );
    }

    case "calculator": {
      return (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 px-3 py-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
          <IconCalculator className="h-4 w-4 shrink-0" />
          <span>{action.title}</span>
        </div>
      );
    }

    case "web_search": {
      return (
        <div className="flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/5 dark:bg-sky-950/20 px-3 py-1.5 text-[11px] text-sky-600 dark:text-sky-400">
          <IconWorld className="h-3.5 w-3.5 shrink-0" />
          <span>{action.title}</span>
        </div>
      );
    }

    default:
      return null;
  }
}

function VianAgentWorkflowTrace({ trace }: { trace: AgentTraceStep[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!trace || trace.length <= 1) return null;

  return (
    <div className="mb-2.5 rounded-lg border border-purple-500/20 bg-purple-500/5 dark:bg-purple-950/20 text-[11px]">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-2.5 py-1.5 font-mono text-[10px] text-purple-600 dark:text-purple-400 hover:opacity-90 cursor-pointer"
      >
        <span className="flex items-center gap-1.5 font-semibold">
          <span>⚡</span>
          <span>Agentic Workflow Trace ({trace.length} steps)</span>
        </span>
        <span className="text-zinc-400">{isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div className="border-t border-purple-500/10 px-2.5 py-2 space-y-1.5 font-sans">
          {trace.map((step) => (
            <div
              key={step.stepNumber}
              className="flex items-start gap-1.5 text-[10px] leading-tight"
            >
              <span className="font-mono text-purple-500 font-bold">
                #{step.stepNumber}
              </span>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                {step.agentName}:
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">
                {step.actionSummary}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


