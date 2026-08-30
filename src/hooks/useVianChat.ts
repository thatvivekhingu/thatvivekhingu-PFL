"use client";

import { useState, useRef, useCallback } from "react";
import { VianMessageItem } from "./useVianSessions";

interface UseVianChatProps {
  sessionId: string;
  initialMessages: VianMessageItem[];
  onMessagesChange: (sessionId: string, messages: VianMessageItem[]) => void;
}

export function useVianChat({
  sessionId,
  initialMessages,
  onMessagesChange,
}: UseVianChatProps) {
  const [messages, setMessages] = useState<VianMessageItem[]>(initialMessages);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync internal state when active session changes
  const setSessionMessages = useCallback((newMsgs: VianMessageItem[]) => {
    setMessages(newMsgs);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isGenerating) return;

      setErrorMessage(null);

      const userMsgId = `usr-${Date.now()}`;
      const userMessage: VianMessageItem = {
        id: userMsgId,
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      const assistantMsgId = `ast-${Date.now()}`;
      const assistantPlaceholder: VianMessageItem = {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };

      const updatedWithUser = [...messages, userMessage, assistantPlaceholder];
      setMessages(updatedWithUser);
      setIsGenerating(true);

      abortControllerRef.current = new AbortController();

      try {
        const historyPayload = messages
          .filter((m) => !m.isError && m.content)
          .slice(-8)
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        const response = await fetch("/api/ai-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain, application/json",
          },
          body: JSON.stringify({
            message: trimmed,
            history: historyPayload,
            sessionId,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const jsonErr = await response.json().catch(() => null);
          const errMsg = jsonErr?.error || "VIAN is temporarily unavailable. Please try again in a moment.";
          throw new Error(errMsg);
        }

        const contentType = response.headers.get("content-type") || "";
        const actionsHeader = response.headers.get("x-vian-actions");
        const traceHeader = response.headers.get("x-vian-trace");

        let actions = [];
        if (actionsHeader) {
          try {
            actions = JSON.parse(decodeURIComponent(actionsHeader));
          } catch (e) {
            console.warn("Failed to parse x-vian-actions header:", e);
          }
        }

        let trace = [];
        if (traceHeader) {
          try {
            trace = JSON.parse(decodeURIComponent(traceHeader));
          } catch (e) {
            console.warn("Failed to parse x-vian-trace header:", e);
          }
        }

        let accumulatedText = "";

        if (contentType.includes("application/json")) {
          const json = await response.json();
          if (json.error) {
            throw new Error(json.error);
          }
          accumulatedText = json.response || json.reply || "No response received.";
          if (json.actions && Array.isArray(json.actions)) {
            actions = json.actions;
          }
          if (json.trace && Array.isArray(json.trace)) {
            trace = json.trace;
          }
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? {
                    ...m,
                    content: accumulatedText,
                    actions: actions.length > 0 ? actions : undefined,
                    trace: trace.length > 0 ? trace : undefined,
                  }
                : m
            )
          );
        } else if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            accumulatedText += chunk;

            // Update streaming assistant message in state
            setMessages((prev) => {
              const next = prev.map((m) =>
                m.id === assistantMsgId
                  ? {
                      ...m,
                      content: accumulatedText,
                      actions: actions.length > 0 ? actions : undefined,
                      trace: trace.length > 0 ? trace : undefined,
                    }
                  : m
              );
              return next;
            });
          }
        }

        // Finalize completed messages
        const finalMessages = messages.concat([
          userMessage,
          {
            ...assistantPlaceholder,
            content: accumulatedText || "No response received.",
            actions: actions.length > 0 ? actions : undefined,
            trace: trace.length > 0 ? trace : undefined,
          },
        ]);
        onMessagesChange(sessionId, finalMessages);
      } catch (err: unknown) {
        if ((err as Error).name === "AbortError") {
          console.log("Generation stopped by user.");
        } else {
          console.error("Vian chat error:", err);
          const errorMsg = (err as Error).message || "VIAN is temporarily unavailable. Please try again in a moment.";
          setErrorMessage(errorMsg);

          const finalWithErr = messages.concat([
            userMessage,
            {
              ...assistantPlaceholder,
              content: `⚠️ **Service Alert**: ${errorMsg}`,
              isError: true,
            },
          ]);
          setMessages(finalWithErr);
          onMessagesChange(sessionId, finalWithErr);
        }
      } finally {
        setIsGenerating(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isGenerating, sessionId, onMessagesChange]
  );

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);
    }
  }, []);

  const regenerateLastMessage = useCallback(() => {
    if (messages.length === 0 || isGenerating) return;

    // Find last user message
    const lastUserIdx = [...messages].reverse().findIndex((m) => m.role === "user");
    if (lastUserIdx === -1) return;

    const actualIdx = messages.length - 1 - lastUserIdx;
    const lastUserMsg = messages[actualIdx];

    // Remove last assistant message and retry
    const prunedMessages = messages.slice(0, actualIdx);
    setMessages(prunedMessages);
    sendMessage(lastUserMsg.content);
  }, [messages, isGenerating, sendMessage]);

  return {
    messages,
    setSessionMessages,
    isGenerating,
    errorMessage,
    sendMessage,
    stopGeneration,
    regenerateLastMessage,
  };
}
