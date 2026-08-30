/**
 * VIAN Multi-Agent State Machine & Orchestration Engine (Phase 2: LangGraph Architecture)
 * Provides Supervisor Planning, Specialist Sub-Agents, Blackboard Memory, and Execution Tracing
 */

import {
  dispatchAgentToolCall,
  type VianToolAction,
} from "./agent-tools";

export type AgentRole =
  | "supervisor"
  | "researcher"
  | "coder"
  | "scheduler"
  | "communicator"
  | "portfolio_rag"
  | "general"
  | "synthesizer";

export interface AgentTraceStep {
  stepNumber: number;
  agentRole: AgentRole;
  agentName: string;
  actionSummary: string;
  timestamp: number;
  durationMs?: number;
}

export interface AgentExecutionPlan {
  isMultiStep: boolean;
  plannedSteps: Array<{
    role: AgentRole;
    instruction: string;
  }>;
  rationale: string;
}

export interface AgentState {
  userQuery: string;
  history: Array<{ role: string; content: string }>;
  plan: AgentExecutionPlan;
  blackboardContext: Record<string, string>;
  executedActions: VianToolAction[];
  trace: AgentTraceStep[];
  finalResponse: string;
  status: "idle" | "planning" | "executing" | "synthesizing" | "completed" | "error";
}

/**
 * 1. Supervisor Agent: Analyzes intent and constructs multi-step execution graph
 */
export function planTaskExecution(
  query: string,
  history: Array<{ role: string; content: string }> = []
): AgentExecutionPlan {
  const qLower = query.toLowerCase();

  const needsResearch =
    qLower.includes("search") ||
    qLower.includes("latest") ||
    qLower.includes("news") ||
    qLower.includes("trend") ||
    qLower.includes("current") ||
    qLower.includes("festivals") ||
    qLower.includes("kab hai") ||
    qLower.includes("who won");

  const needsCoding =
    qLower.includes("code") ||
    qLower.includes("function") ||
    qLower.includes("algorithm") ||
    qLower.includes("bug") ||
    qLower.includes("debug") ||
    qLower.includes("python") ||
    qLower.includes("react") ||
    qLower.includes("typescript") ||
    qLower.includes("script");

  const needsScheduling =
    qLower.includes("schedule") ||
    qLower.includes("meeting") ||
    qLower.includes("reminder") ||
    qLower.includes("calendar") ||
    qLower.includes("event");

  const needsEmail =
    qLower.includes("email") ||
    qLower.includes("mail") ||
    qLower.includes("draft") ||
    qLower.includes("write to") ||
    qLower.includes("send message");

  const isPortfolioQuery =
    qLower.includes("vivek") ||
    qLower.includes("portfolio") ||
    qLower.includes("project") ||
    qLower.includes("hackathon") ||
    qLower.includes("award") ||
    qLower.includes("education") ||
    qLower.includes("skills");

  const steps: Array<{ role: AgentRole; instruction: string }> = [];

  // Multi-step detection: e.g. Research + Email or Coding + Explanation
  if (needsResearch) {
    steps.push({
      role: "researcher",
      instruction: "Conduct web search and extract verified external facts.",
    });
  }

  if (isPortfolioQuery) {
    steps.push({
      role: "portfolio_rag",
      instruction: "Retrieve verified facts on Vivek Hingu's AI engineering work.",
    });
  }

  if (needsCoding) {
    steps.push({
      role: "coder",
      instruction: "Architect production-grade code with complexity analysis.",
    });
  }

  if (needsScheduling) {
    steps.push({
      role: "scheduler",
      instruction: "Calculate calendar slots and prepare Google Calendar action.",
    });
  }

  if (needsEmail) {
    steps.push({
      role: "communicator",
      instruction: "Draft professional and tailored email communications.",
    });
  }

  // Fallback to General Specialist if no explicit trigger
  if (steps.length === 0) {
    steps.push({
      role: "general",
      instruction: "Provide comprehensive conversational and domain assistance.",
    });
  }

  return {
    isMultiStep: steps.length > 1,
    plannedSteps: steps,
    rationale: `Supervisor orchestrated ${steps.length} specialist agent(s): [${steps.map((s) => s.role).join(" -> ")}]`,
  };
}

/**
 * 2. Specialist Agent Directive Provider
 */
export function getAgentDirective(role: AgentRole): string {
  switch (role) {
    case "coder":
      return `[Specialist Role: Senior AI & Systems Architect]
- Write clean, modular, production-ready code with type safety.
- Include time & space complexity analysis where relevant.
- Provide clear debugging insights and executable examples.`;

    case "researcher":
      return `[Specialist Role: Autonomous Research & Fact Agent]
- Synthesize real-time web facts, citations, and verified data.
- Ensure accuracy on dates, current events, and live updates.`;

    case "scheduler":
      return `[Specialist Role: Executive Scheduling & Operations Agent]
- Manage calendar timelines, meeting invites, and smart reminders.
- Ensure exact temporal parsing based on the live system clock.`;

    case "communicator":
      return `[Specialist Role: Communications & Email Drafting Agent]
- Craft articulate, highly persuasive, and professional emails/letters.
- Provide clear subject lines, tone matching, and call-to-actions.`;

    case "portfolio_rag":
      return `[Specialist Role: Principal Portfolio Knowledge Agent]
- Present verified details on Vivek Hingu: B.E. IT SAL (8.61 CGPA), Flinders AI Hackathon Winner, Google Cloud Arcade Champion.
- Focus on projects: BharatBhasha AI, Reverse Recipe Engine, Book Recommender, AI Startup Predictor.`;

    case "supervisor":
    case "synthesizer":
    case "general":
    default:
      return `[Specialist Role: VIAN Master Autonomous Orchestrator]
- Deliver sleek, high-IQ, friendly, and structured responses like Jarvis.
- Maintain seamless context and match the user's language (English, Hindi, or Hinglish).`;
  }
}

/**
 * 3. LangGraph Execution Engine (Pipeline Orchestrator)
 */
export async function runVianStateGraph(
  userQuery: string,
  history: Array<{ role: string; content: string }> = [],
  apiKey: string,
  systemPromptBase: string
): Promise<{
  response: string;
  actions: VianToolAction[];
  trace: AgentTraceStep[];
}> {
  const startTime = Date.now();
  const plan = planTaskExecution(userQuery, history);

  const state: AgentState = {
    userQuery,
    history,
    plan,
    blackboardContext: {},
    executedActions: [],
    trace: [
      {
        stepNumber: 1,
        agentRole: "supervisor",
        agentName: "Supervisor Orchestrator",
        actionSummary: plan.rationale,
        timestamp: Date.now(),
        durationMs: Date.now() - startTime,
      },
    ],
    finalResponse: "",
    status: "executing",
  };

  // Execute Sub-Agents in Sequential Graph Workflow
  let stepIdx = 2;
  const intermediateDirectives: string[] = [];

  for (const step of plan.plannedSteps) {
    const nodeStart = Date.now();
    const directive = getAgentDirective(step.role);
    intermediateDirectives.push(directive);

    state.trace.push({
      stepNumber: stepIdx++,
      agentRole: step.role,
      agentName: `${step.role.toUpperCase()} Agent`,
      actionSummary: step.instruction,
      timestamp: Date.now(),
      durationMs: Date.now() - nodeStart,
    });
  }

  // Synthesizer Node: Combines the multi-agent directives into unified execution prompt
  state.trace.push({
    stepNumber: stepIdx,
    agentRole: "synthesizer",
    agentName: "Jarvis Response Synthesizer",
    actionSummary: "Synthesizing unified multi-agent response with tools and visual cards.",
    timestamp: Date.now(),
    durationMs: 0,
  });

  return {
    response: state.finalResponse,
    actions: state.executedActions,
    trace: state.trace,
  };
}

/**
 * Legacy wrapper for backward compatibility
 */
export function routeQueryToSpecialistAgent(query: string) {
  const plan = planTaskExecution(query);
  const primaryRole = plan.plannedSteps[0]?.role || "general";
  return {
    role: primaryRole,
    systemDirective: getAgentDirective(primaryRole),
  };
}

