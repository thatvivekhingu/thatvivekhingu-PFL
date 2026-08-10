/**
 * VIAN Multi-Agent Orchestration Engine (Phase 7)
 * Routes user queries to specialized sub-agents based on intent
 */

export type AgentRole = "research" | "coding" | "portfolio_rag" | "general";

export interface AgentRoutingResult {
  role: AgentRole;
  systemDirective: string;
}

export function routeQueryToSpecialistAgent(query: string): AgentRoutingResult {
  const qLower = query.toLowerCase();

  // 1. Coding Agent Routing
  if (
    qLower.includes("code") ||
    qLower.includes("bug") ||
    qLower.includes("function") ||
    qLower.includes("script") ||
    qLower.includes("error") ||
    qLower.includes("debug") ||
    qLower.includes("python") ||
    qLower.includes("react") ||
    qLower.includes("typescript") ||
    qLower.includes("nextjs") ||
    qLower.includes("api")
  ) {
    return {
      role: "coding",
      systemDirective:
        "Specialist Role: Senior AI & Full-Stack Coding Agent. Provide production-grade code, clear explanations, debugging steps, and exact fix commands.",
    };
  }

  // 2. Research Agent Routing
  if (
    qLower.includes("latest") ||
    qLower.includes("news") ||
    qLower.includes("current") ||
    qLower.includes("search") ||
    qLower.includes("trend") ||
    qLower.includes("paper") ||
    qLower.includes("article")
  ) {
    return {
      role: "research",
      systemDirective:
        "Specialist Role: Autonomous Research Agent. Execute search & external knowledge retrieval to provide current, verified information.",
    };
  }

  // 3. Portfolio & RAG Agent Routing
  if (
    qLower.includes("vivek") ||
    qLower.includes("project") ||
    qLower.includes("hackathon") ||
    qLower.includes("award") ||
    qLower.includes("education") ||
    qLower.includes("college") ||
    qLower.includes("sal") ||
    qLower.includes("contact") ||
    qLower.includes("email") ||
    qLower.includes("github")
  ) {
    return {
      role: "portfolio_rag",
      systemDirective:
        "Specialist Role: Principal Portfolio Knowledge Agent. Provide verified details on Vivek Hingu's AI builds, education (B.E. IT SAL 8.61 CGPA), hackathons, and direct contacts.",
    };
  }

  // 4. General Agent Routing
  return {
    role: "general",
    systemDirective:
      "Specialist Role: General VIAN Agent Controller. Provide structured, conversational, and helpful agentic assistance.",
  };
}
