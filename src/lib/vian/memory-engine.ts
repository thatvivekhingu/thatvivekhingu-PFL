/**
 * VIAN Long-Term Memory (LTM) & Semantic User Context Engine (Phase 3)
 * Provides Fact Extraction, Semantic Similarity Memory Retrieval, and Persistence
 */

export type MemoryCategory = "identity" | "preference" | "goal" | "context";

export interface UserMemoryItem {
  id: string;
  category: MemoryCategory;
  content: string;
  confidence: number;
  timestamp: number;
  tags: string[];
}

/**
 * 1. Semantic Memory Retrieval: Ranks stored memories by relevance to current query
 */
export function retrieveRelevantMemories(
  query: string,
  memoryBank: UserMemoryItem[] = [],
  topK: number = 4
): UserMemoryItem[] {
  if (!memoryBank || memoryBank.length === 0) return [];

  const qTokens = query
    .toLowerCase()
    .split(/\W+/)
    .filter((t) => t.length > 2);

  if (qTokens.length === 0) {
    return memoryBank.slice(0, topK);
  }

  const scored = memoryBank.map((mem) => {
    let score = 0;
    const memTokens = mem.content.toLowerCase().split(/\W+/).filter(Boolean);

    for (const qt of qTokens) {
      if (mem.content.toLowerCase().includes(qt)) {
        score += 3;
      }
      if (mem.tags.some((tag) => tag.toLowerCase().includes(qt) || qt.includes(tag.toLowerCase()))) {
        score += 4;
      }
      if (memTokens.some((mt) => mt === qt)) {
        score += 2;
      }
    }

    if (mem.category === "identity" || mem.category === "preference") {
      score += 1;
    }

    return { mem, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const relevant = scored.filter((s) => s.score > 0).map((s) => s.mem);
  if (relevant.length > 0) {
    return relevant.slice(0, topK);
  }

  return memoryBank
    .filter((m) => m.category === "identity" || m.category === "preference")
    .slice(0, topK);
}

/**
 * 2. Automated User Fact & Preference Extractor
 */
export function extractMemoriesFromMessage(
  message: string,
  existingMemories: UserMemoryItem[] = []
): UserMemoryItem[] {
  const newMemories: UserMemoryItem[] = [];
  const text = message.trim();
  const lower = text.toLowerCase();

  const isAlreadyKnown = (content: string) =>
    existingMemories.some(
      (m) => m.content.toLowerCase() === content.toLowerCase()
    );

  // Identity extraction: "My name is X", "I am X", "I work at X"
  const nameMatch = text.match(/(?:my name is|i am|call me|i'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameMatch && !lower.includes("ai") && !lower.includes("vian") && !lower.includes("vivek")) {
    const fact = `User's name is ${nameMatch[1].trim()}`;
    if (!isAlreadyKnown(fact)) {
      newMemories.push({
        id: `mem-${Date.now()}-name`,
        category: "identity",
        content: fact,
        confidence: 0.95,
        timestamp: Date.now(),
        tags: ["name", "identity", "user"],
      });
    }
  }

  // Role/Profession extraction: "I am a frontend developer"
  const roleMatch = text.match(/(?:i am a|i work as a|i'm a)\s+([a-zA-Z\s]+(?:developer|engineer|designer|founder|student|researcher|manager|scientist))/i);
  if (roleMatch) {
    const fact = `User's role/profession: ${roleMatch[1].trim()}`;
    if (!isAlreadyKnown(fact)) {
      newMemories.push({
        id: `mem-${Date.now()}-role`,
        category: "identity",
        content: fact,
        confidence: 0.9,
        timestamp: Date.now(),
        tags: ["role", "profession", "job"],
      });
    }
  }

  // Explicit preferences: "I prefer Python", "I like concise answers"
  const prefMatch = text.match(/(?:i prefer|i like|always write|my favorite language is|please use)\s+([^.,\n]+)/i);
  if (prefMatch) {
    const fact = `User preference: Prefers ${prefMatch[1].trim()}`;
    if (!isAlreadyKnown(fact)) {
      newMemories.push({
        id: `mem-${Date.now()}-pref`,
        category: "preference",
        content: fact,
        confidence: 0.9,
        timestamp: Date.now(),
        tags: ["preference", "style", "language"],
      });
    }
  }

  // Goal/Project extraction: "I am building X"
  const goalMatch = text.match(/(?:i am building|i'm creating|my project is|i am working on|preparing for)\s+([^.,\n]+)/i);
  if (goalMatch) {
    const fact = `User current project/goal: ${goalMatch[1].trim()}`;
    if (!isAlreadyKnown(fact)) {
      newMemories.push({
        id: `mem-${Date.now()}-goal`,
        category: "goal",
        content: fact,
        confidence: 0.85,
        timestamp: Date.now(),
        tags: ["project", "goal", "target"],
      });
    }
  }

  // Explicit "Remember that X" command
  const rememberMatch = text.match(/(?:remember that|note that|keep in mind that)\s+([^.,\n]+)/i);
  if (rememberMatch) {
    const fact = `User note: ${rememberMatch[1].trim()}`;
    if (!isAlreadyKnown(fact)) {
      newMemories.push({
        id: `mem-${Date.now()}-note`,
        category: "context",
        content: fact,
        confidence: 0.98,
        timestamp: Date.now(),
        tags: ["explicit_note", "memory"],
      });
    }
  }

  return newMemories;
}

/**
 * 3. Formats retrieved memories for prompt injection
 */
export function formatMemoriesForPrompt(memories: UserMemoryItem[]): string {
  if (!memories || memories.length === 0) return "";

  const items = memories.map((m) => `- [${m.category.toUpperCase()}] ${m.content}`).join("\n");

  return `
==================================================
USER LONG-TERM MEMORY & KNOWN PREFERENCES (JARVIS MEMORY BANK)
==================================================
The following facts are remembered from previous interactions with this user:
${items}
- Directives: Use these personal preferences, goals, and facts naturally to personalize your answers without explicitly reciting "as I remember from my database".
`;
}
