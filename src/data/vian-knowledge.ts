import { data } from "@/data/data";

export interface PortfolioChunk {
  id: string;
  category: "profile" | "education" | "projects" | "skills" | "achievements" | "hackathons" | "contact";
  title: string;
  keywords: string[];
  content: string;
  links?: Array<{ label: string; url: string }>;
}

export const PORTFOLIO_KNOWLEDGE: PortfolioChunk[] = [
  {
    id: "profile",
    category: "profile",
    title: "Vivek Hingu Profile & Bio",
    keywords: ["who", "name", "vian", "vivek", "bio", "about", "role", "profile", "summary", "overview"],
    content: `Vivek Hingu is an aspiring AI & Machine Learning Engineer based in Ahmedabad, Gujarat, India. He builds AI-powered applications, machine learning systems, data science solutions, and modern full-stack web applications. Summary: "${data.summary}"`,
    links: [
      { label: "GitHub", url: "https://github.com/thatvivekhingu" },
      { label: "LinkedIn", url: "https://linkedin.com/in/vivekhingu" },
    ],
  },
  {
    id: "education",
    category: "education",
    title: "Education & Degree",
    keywords: ["education", "college", "degree", "university", "sal", "cgpa", "gpa", "be", "it", "coursework", "grades"],
    content: `Education Details:\n- **Degree**: Bachelor of Engineering (B.E.) in Information Technology\n- **Institution**: SAL College of Engineering, Ahmedabad, Gujarat, India\n- **Timeline**: July 2023 – June 2027\n- **CGPA**: 8.61 / 10\n- **Core Coursework**: Machine Learning, Artificial Intelligence, Data Science, Probability & Statistics, Linear Algebra, Data Structures & Algorithms, DBMS, Python Programming.`,
    links: [
      { label: "SAL College", url: "https://github.com/thatvivekhingu" },
    ],
  },
  {
    id: "projects",
    category: "projects",
    title: "Featured Engineering Projects",
    keywords: ["project", "projects", "build", "builds", "bharat", "bhasha", "recipe", "book", "startup", "recommender", "predictor"],
    content: `Vivek Hingu's Featured Projects:\n${data.projects
      .map(
        (p, idx) =>
          `${idx + 1}. **${p.title}** (${p.type}, ${p.dates})\n   - **Description**: ${p.description}\n   - **Tech Stack**: ${p.technologies.join(", ")}\n   - **Repository/Demo**: [GitHub Link](${p.href})`
      )
      .join("\n\n")}`,
  },
  {
    id: "skills",
    category: "skills",
    title: "Technical Skills & Tooling",
    keywords: ["skill", "skills", "stack", "tools", "python", "pytorch", "tensorflow", "scikitlearn", "pandas", "numpy", "nextjs", "react", "fastapi", "flask", "docker", "git", "nlp", "llm", "rag"],
    content: `Vivek Hingu's Technical Stack:\n- **Languages**: Python, JavaScript, C++, HTML, CSS\n- **Machine Learning & Data Science**: Scikit-learn, Pandas, NumPy, Cosine Similarity, Predictive Analytics, EDA, Data Preprocessing\n- **AI Architecture**: LLMs, Agentic AI, LangChain, LangGraph, Retrieval-Augmented Generation (RAG), NLP, Computer Vision\n- **Web & Backend**: Next.js 15, React, Node.js, Express.js, Flask, Tailwind CSS\n- **DevTools & Version Control**: Git, GitHub, VS Code, Vercel`,
  },
  {
    id: "achievements",
    category: "achievements",
    title: "Awards & Honors",
    keywords: ["achievement", "achievements", "award", "awards", "winner", "prize", "flinders", "google", "cloud", "robo", "soccer", "ait"],
    content: `Vivek Hingu's Major Awards & Competitions:\n${data.achievements
      .map(
        (a, idx) =>
          `${idx + 1}. **${a.title}** (${a.date})\n   - **Category**: ${a.category}\n   - **Milestone**: ${a.metrics}\n   - **Details**: ${a.description}`
      )
      .join("\n\n")}`,
  },
  {
    id: "hackathons",
    category: "hackathons",
    title: "Hackathon Competitions & Certificates",
    keywords: ["hackathon", "hackathons", "certificate", "certificates", "flinders", "tarkshaastra", "tic-tech-toe", "hackout", "ldce", "daiict"],
    content: `Vivek Hingu's Hackathon Portfolio:\n${data.hackathons
      .map(
        (h, idx) =>
          `${idx + 1}. **${h.title}** (${h.date}, ${h.organizer})\n   - **Location**: ${h.location}\n   - **Award**: ${h.award} (${h.badgeType})\n   - **Summary**: ${h.description}\n   - **Tags**: ${h.tags.join(", ")}`
      )
      .join("\n\n")}`,
  },
  {
    id: "contact",
    category: "contact",
    title: "Verified Contact Information",
    keywords: ["contact", "email", "hire", "reach", "github", "linkedin", "connect", "mail", "message"],
    content: `Verified Contact Information for Vivek Hingu:\n- **Email**: [hinguvivek05@gmail.com](mailto:hinguvivek05@gmail.com)\n- **GitHub**: [github.com/thatvivekhingu](https://github.com/thatvivekhingu)\n- **LinkedIn**: [linkedin.com/in/vivekhingu](https://linkedin.com/in/vivekhingu)\n- **Location**: Ahmedabad, Gujarat, India`,
    links: [
      { label: "Email Vivek", url: "mailto:hinguvivek05@gmail.com" },
      { label: "GitHub Profile", url: "https://github.com/thatvivekhingu" },
      { label: "LinkedIn Profile", url: "https://linkedin.com/in/vivekhingu" },
    ],
  },
];

/**
 * Keyword-based retrieval engine to score and return relevant knowledge chunks for RAG
 */
export function retrieveRelevantKnowledge(query: string): string {
  const qTokens = query.toLowerCase().split(/\W+/).filter((t) => t.length > 2);

  if (qTokens.length === 0) {
    return PORTFOLIO_KNOWLEDGE.map((k) => k.content).join("\n\n---\n\n");
  }

  const scored = PORTFOLIO_KNOWLEDGE.map((chunk) => {
    let score = 0;

    for (const token of qTokens) {
      if (chunk.keywords.some((kw) => kw.includes(token) || token.includes(kw))) {
        score += 3;
      }
      if (chunk.title.toLowerCase().includes(token)) {
        score += 2;
      }
      if (chunk.content.toLowerCase().includes(token)) {
        score += 1;
      }
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const matched = scored.filter((s) => s.score > 0).slice(0, 3).map((s) => s.chunk.content);

  if (matched.length === 0) {
    // Return profile + skills + projects as fallback context
    return [
      PORTFOLIO_KNOWLEDGE[0].content,
      PORTFOLIO_KNOWLEDGE[2].content,
      PORTFOLIO_KNOWLEDGE[3].content,
    ].join("\n\n---\n\n");
  }

  return matched.join("\n\n---\n\n");
}
