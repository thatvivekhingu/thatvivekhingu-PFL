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
    id: "vian-identity",
    category: "profile",
    title: "VIAN - Vivek Hingu's Personal AI Assistant Identity",
    keywords: ["vian", "assistant", "bot", "who are you", "vivek ho ya vian", "kya ho", "identity", "vivek kaun hai", "tum kaun ho"],
    content: "I am VIAN (Vivek's Intelligent Neural Assistant). I am Vivek Hingu's personal AI Assistant. Vivek created and trained me to assist visitors, answer questions about his AI engineering projects, technical stack, achievements, education, and career. I am NOT Vivek himself — I am his personal AI assistant! When asked 'vivek ho ya vian', I clarify that I am Vian, Vivek's AI assistant.",
    links: [
      { label: "GitHub", url: "https://github.com/thatvivekhingu" },
      { label: "LinkedIn", url: "https://linkedin.com/in/thatvivekhingu" },
    ],
  },
  {
    id: "profile",
    category: "profile",
    title: "Vivek Hingu Profile & Bio",
    keywords: ["who", "name", "vian", "vivek", "bio", "about", "role", "profile", "summary", "overview"],
    content: `Vivek Hingu is an aspiring AI & Machine Learning Engineer based in Ahmedabad, Gujarat, India. He builds AI-powered applications, machine learning systems, data science solutions, and intelligent agentic workflows. Summary: "${data.summary}"`,
    links: [
      { label: "GitHub", url: "https://github.com/thatvivekhingu" },
      { label: "LinkedIn", url: "https://linkedin.com/in/vivekhingu" },
      { label: "Instagram", url: "https://instagram.com/realvivek.py" },
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
    title: "Technical Skills & Tech Stack",
    keywords: ["skill", "skills", "stack", "tools", "frontend", "3d", "ai", "backend", "nextjs", "react", "typescript", "tailwind", "framer motion", "gsap", "lenis", "threejs", "react three fiber", "webgl", "lottie", "groq", "llama", "openai", "gemini", "agno", "langchain", "rag", "python", "fastapi", "nodejs", "postgresql", "mongodb", "supabase", "docker", "git", "github", "vercel", "postman", "figma"],
    content: `Vivek Hingu's Core Tech Stack (5 Domains):\n1. **Frontend**: Next.js (React Framework), TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis (Smooth Scrolling)\n2. **3D & Visual Effects**: Three.js, React Three Fiber, WebGL, Lottie, CSS Animations\n3. **AI Integration**: Groq API, Llama Models, OpenAI API / Gemini API, Agno Framework, LangChain, RAG Architecture\n4. **Backend & Database**: Python, FastAPI, Node.js, PostgreSQL, MongoDB, Supabase\n5. **Tools & Deployment**: Git & GitHub, Vercel, Docker, VS Code, Postman, Figma`,
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
    keywords: ["contact", "email", "hire", "reach", "github", "linkedin", "instagram", "connect", "mail", "message"],
    content: `Verified Contact & Social Media Profiles for Vivek Hingu:\n- **Email**: [hinguvivek05@gmail.com](mailto:hinguvivek05@gmail.com)\n- **GitHub**: [github.com/thatvivekhingu](https://github.com/thatvivekhingu)\n- **LinkedIn**: [linkedin.com/in/vivekhingu](https://linkedin.com/in/vivekhingu)\n- **Instagram**: [@realvivek.py](https://instagram.com/realvivek.py) (Pythonic Engineer / ML Tutorials & AI Content)\n- **Location**: Ahmedabad, Gujarat, India`,
    links: [
      { label: "Email Vivek", url: "mailto:hinguvivek05@gmail.com" },
      { label: "GitHub Profile", url: "https://github.com/thatvivekhingu" },
      { label: "LinkedIn Profile", url: "https://linkedin.com/in/vivekhingu" },
      { label: "Instagram (@realvivek.py)", url: "https://instagram.com/realvivek.py" },
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
