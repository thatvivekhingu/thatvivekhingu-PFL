import { IconHome, IconBrandGithub, IconBrush, IconBriefcase2, IconBrandLinkedin, IconBrandInstagram, IconMail, IconAward, IconFileText, IconSparkles } from "@tabler/icons-react"

export interface ProjectItem {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  type: string;
  technologies: string[];
  description: string;
  thumbnail: string;
  video?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  image: string;
  credentialUrl?: string;
}

export interface AchievementItem {
  title: string;
  description: string;
  category: string;
  date: string;
  metrics?: string;
  image?: string;
  link?: string;
}

export interface HackathonCertificateItem {
  id: string;
  title: string;
  event: string;
  organizer: string;
  date: string;
  location: string;
  team?: string;
  award: string;
  badgeType: "Appreciation" | "Participation" | "Winner" | "Special Mention";
  image: string;
  verificationUrl?: string;
  verificationId?: string;
  tags: string[];
  description: string;
}

export interface ScratchMemeItem {
  id: string;
  src: string;
  title: string;
  isNew: boolean;
  weight: number;
}

export const scratchMemes: ScratchMemeItem[] = [
  // ==========================================
  // 31 BRAND NEW DEVELOPER MEMES (High Priority ~98% Weighted)
  // ==========================================
  { id: "php-panic", src: "/memes/meme-php-panic.gif", title: "PHP Code Stressed Dev", isNew: true, weight: 15 },
  { id: "dog-computer", src: "/memes/meme-63-dog-computer.gif", title: "I Have No Idea What I'm Doing", isNew: true, weight: 15 },
  { id: "typing-pro", src: "/memes/meme-64-typing-pro.gif", title: "10x Developer Typing", isNew: true, weight: 15 },
  { id: "it-works-why", src: "/memes/meme-19-it-works-why.gif", title: "It Works... But Why?!", isNew: true, weight: 15 },
  { id: "cat-vibing", src: "/memes/meme-13-cat-vibing.gif", title: "Cat Vibing to Beats", isNew: true, weight: 15 },
  { id: "crying-dev", src: "/memes/meme-14-crying-dev.gif", title: "Crying Over Bugs at 3 AM", isNew: true, weight: 15 },
  { id: "smash-computer", src: "/memes/meme-15-smash-computer.gif", title: "Smash Computer Rage", isNew: true, weight: 15 },
  { id: "typing-speed", src: "/memes/meme-18-typing-speed.gif", title: "Keyboard on Fire", isNew: true, weight: 15 },
  { id: "coding-doge", src: "/memes/meme-20-coding-doge.gif", title: "Much Code Very Doge", isNew: true, weight: 15 },
  { id: "spongebob-typing", src: "/memes/meme-21-spongebob-typing.gif", title: "SpongeBob Fast Typing", isNew: true, weight: 15 },
  { id: "homer-keyboard", src: "/memes/meme-22-homer-keyboard.gif", title: "Homer Pressing Any Key", isNew: true, weight: 15 },
  { id: "kermit-laptop", src: "/memes/meme-23-kermit-laptop.gif", title: "Kermit Midnight Hack", isNew: true, weight: 15 },
  { id: "mr-bean-code", src: "/memes/meme-24-mr-bean-code.gif", title: "Mr Bean Inspecting Bug", isNew: true, weight: 15 },
  { id: "mind-blown", src: "/memes/meme-25-mind-blown.gif", title: "Mind Blown by Prompt", isNew: true, weight: 15 },
  { id: "hacker-matrix", src: "/memes/meme-26-hacker-matrix.gif", title: "Entering The Matrix", isNew: true, weight: 15 },
  { id: "programmer-burnout", src: "/memes/meme-27-programmer-burnout.gif", title: "Programmer Burnout Mode", isNew: true, weight: 15 },
  { id: "desk-flip", src: "/memes/meme-30-desk-flip.gif", title: "Table Flip Rage", isNew: true, weight: 15 },
  { id: "coffee-coding", src: "/memes/meme-32-coffee-coding.gif", title: "Fuelled by Chai and Coffee", isNew: true, weight: 15 },
  { id: "confused-travolta", src: "/memes/meme-34-confused-travolta.gif", title: "Where Did The Bug Go?", isNew: true, weight: 15 },
  { id: "matrix-neo", src: "/memes/meme-35-matrix-neo.gif", title: "Neo Dodging Merge Conflicts", isNew: true, weight: 15 },
  { id: "programmer-sleep", src: "/memes/meme-36-programmer-sleep.gif", title: "Dev Falling Asleep on Keyboard", isNew: true, weight: 15 },
  { id: "git-push-force", src: "/memes/meme-37-git-push-force.gif", title: "git push --force and Inshallah", isNew: true, weight: 15 },
  { id: "hackerman", src: "/memes/meme-38-hackerman.gif", title: "Hackerman In The Zone", isNew: true, weight: 15 },
  { id: "baby-success", src: "/memes/meme-39-baby-success.gif", title: "First Try Build Passed!", isNew: true, weight: 15 },
  { id: "keyboard-cat-classic", src: "/memes/meme-40-keyboard-cat-classic.gif", title: "Keyboard Cat Solo", isNew: true, weight: 15 },
  { id: "fry-squint", src: "/memes/meme-41-fry-squint.gif", title: "Not Sure If Feature Or Bug", isNew: true, weight: 15 },
  { id: "turning-it-off-and-on", src: "/memes/meme-43-turning-it-off-and-on.gif", title: "Tried Turning It Off & On?", isNew: true, weight: 15 },
  { id: "no-god-please-no", src: "/memes/meme-44-no-god-please-no.gif", title: "Deploying to Prod on Friday", isNew: true, weight: 15 },
  { id: "shocked-pikachu", src: "/memes/meme-55-shocked-pikachu.gif", title: "Shocked Pikachu: Runtime Error", isNew: true, weight: 15 },
  { id: "roll-safe-brain", src: "/memes/meme-56-roll-safe-brain.gif", title: "No Bugs If You Don't Write Code", isNew: true, weight: 15 },
  { id: "gandalf-confused", src: "/memes/meme-58-gandalf-confused.gif", title: "I Have No Memory of This Code", isNew: true, weight: 15 },

  // ==========================================
  // 10 CLASSIC MEMES (Rare Easter Eggs ~2% Weighted)
  // ==========================================
  { id: "feet-typing", src: "/memes/meme-1-feet-typing.gif", title: "Animaniacs Feet Typing", isNew: false, weight: 1 },
  { id: "hacker-typing", src: "/memes/meme-2-hacker-typing.gif", title: "Hollywood Fast Hacker", isNew: false, weight: 1 },
  { id: "synthwave-code", src: "/memes/meme-3-synthwave-code.gif", title: "Synthwave Cyberpunk Dev", isNew: false, weight: 1 },
  { id: "kermit-fast", src: "/memes/meme-4-kermit-fast.gif", title: "Kermit Supersonic Typing", isNew: false, weight: 1 },
  { id: "ai-robot", src: "/memes/meme-5-ai-robot.gif", title: "AI Robot Typing", isNew: false, weight: 1 },
  { id: "cat-jam", src: "/memes/meme-6-cat-jam.gif", title: "Cat Banging Head", isNew: false, weight: 1 },
  { id: "cat-coding", src: "/memes/meme-7-cat-coding.gif", title: "Cat Typing on Laptop", isNew: false, weight: 1 },
  { id: "matrix-typing", src: "/memes/meme-8-matrix-typing.gif", title: "Matrix Binary Code Stream", isNew: false, weight: 1 },
  { id: "hacker-green", src: "/memes/meme-9-hacker-green.gif", title: "Green Hacker Terminal", isNew: false, weight: 1 },
  { id: "chill-coding", src: "/memes/meme-10-chill-coding.gif", title: "Lofi Night Coding", isNew: false, weight: 1 },
];

export function pickWeightedScratchMeme(currentSrc?: string): ScratchMemeItem {
  // Filter out current so it's always different on refresh
  const candidates = currentSrc
    ? scratchMemes.filter((m) => m.src !== currentSrc)
    : scratchMemes;
  const pool = candidates.length > 0 ? candidates : scratchMemes;

  const totalWeight = pool.reduce((acc, m) => acc + m.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of pool) {
    if (random < item.weight) {
      return item;
    }
    random -= item.weight;
  }

  return pool[0];
}

export function getNextScratchMeme(currentSrc?: string): string {
  if (typeof window === "undefined") {
    const newPool = scratchMemes.filter((m) => m.isNew);
    return newPool[0]?.src || scratchMemes[0].src;
  }

  const STORAGE_KEY_SHOWN_NEW = "scratch_shown_new_v3";
  const STORAGE_KEY_SHOWN_OLD = "scratch_shown_old_v3";

  let shownNew: string[] = [];
  let shownOld: string[] = [];

  try {
    const rawNew = sessionStorage.getItem(STORAGE_KEY_SHOWN_NEW);
    if (rawNew) shownNew = JSON.parse(rawNew);
    const rawOld = sessionStorage.getItem(STORAGE_KEY_SHOWN_OLD);
    if (rawOld) shownOld = JSON.parse(rawOld);
  } catch {}

  const allNewMemes = scratchMemes.filter((m) => m.isNew).map((m) => m.src);
  const allOldMemes = scratchMemes.filter((m) => !m.isNew).map((m) => m.src);

  // 1. Prioritize all new memes randomly until every single one is shown
  const unshownNew = allNewMemes.filter((src) => !shownNew.includes(src));

  if (unshownNew.length > 0) {
    const candidates = unshownNew.filter((src) => src !== currentSrc);
    const pool = candidates.length > 0 ? candidates : unshownNew;
    const picked = pool[Math.floor(Math.random() * pool.length)];

    shownNew.push(picked);
    try {
      sessionStorage.setItem(STORAGE_KEY_SHOWN_NEW, JSON.stringify(shownNew));
    } catch {}
    return picked;
  }

  // 2. All 31 new memes have been shown! Now randomly pick from the remaining old memes
  const unshownOld = allOldMemes.filter((src) => !shownOld.includes(src));

  if (unshownOld.length > 0) {
    const candidates = unshownOld.filter((src) => src !== currentSrc);
    const pool = candidates.length > 0 ? candidates : unshownOld;
    const picked = pool[Math.floor(Math.random() * pool.length)];

    shownOld.push(picked);
    try {
      sessionStorage.setItem(STORAGE_KEY_SHOWN_OLD, JSON.stringify(shownOld));
    } catch {}
    return picked;
  }

  // 3. Both pools exhausted! Reset cycle: all new memes first again
  shownNew = [];
  shownOld = [];
  try {
    sessionStorage.removeItem(STORAGE_KEY_SHOWN_NEW);
    sessionStorage.removeItem(STORAGE_KEY_SHOWN_OLD);
  } catch {}

  const candidates = allNewMemes.filter((src) => src !== currentSrc);
  const pool = candidates.length > 0 ? candidates : allNewMemes;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  shownNew.push(picked);
  try {
    sessionStorage.setItem(STORAGE_KEY_SHOWN_NEW, JSON.stringify(shownNew));
  } catch {}
  return picked;
}

export const data = {
  summary: "Aspiring AI & Machine Learning Engineer pursuing a B.E. in Information Technology at SAL College of Engineering (CGPA 8.61/10). Skilled in Python, Machine Learning, Data Science, NumPy, Pandas, Scikit-learn, and Generative AI with hands-on experience building AI-powered applications and intelligent systems.",

  experience: [
    {
      image: "/experience/foundr_ai.svg",
      company: "SAL College of Engineering",
      role: "B.E. in Information Technology (CGPA: 8.61 / 10)",
      date: "July 2023 – June 2027",
      description: "Pursuing Bachelor of Engineering in IT. Core Coursework: Machine Learning, Artificial Intelligence, Data Science, Probability & Statistics, Linear Algebra, Data Structures & Algorithms, DBMS, Python Programming.",
      location: "Ahmedabad, Gujarat, India",
      skills: ["Python", "Machine Learning", "Data Science", "AI", "DSA", "DBMS", "Linear Algebra"],
      href: "https://github.com/thatvivekhingu",
    },
  ],

  projects: [
    {
      title: "BharatBhasha AI | Multilingual Voice & Text AI OS",
      href: "https://github.com/thatvivekhingu/Bharat-Bhasha-Ai-2.0",
      dates: "2024 - Present",
      active: true,
      type: "AI Platform & Web System",
      technologies: ["Grok API", "HTML", "CSS", "JavaScript", "NLP", "Node.js", "Express.js"],
      description: "Developed an AI-powered multilingual communication platform supporting text and voice interactions across multiple Indian languages. Integrated Grok API to generate context-aware multilingual responses and built a scalable backend using Node.js and Express.js for real-time AI conversations.",
      thumbnail: "/projects/bharat-bhasha.jpg",
      video: "",
    },
    {
      title: "Reverse Recipe Engine with Local Flavor",
      href: "https://github.com/thatvivekhingu/Recipe-Recommender-system-",
      dates: "2024",
      active: true,
      type: "Generative AI Web Application",
      technologies: ["Python", "Flask", "Gemini API", "HTML", "CSS", "JavaScript", "Unsplash API"],
      description: "Developed an AI-powered application that generates regional recipes from user-provided ingredients. Integrated Gemini API to provide personalized recipe recommendations and cooking instructions, paired with Unsplash API for visual dish presentation.",
      thumbnail: "/projects/reverse-recipe.jpg",
      video: "",
    },
    {
      title: "Book Recommender System | Machine Learning Engine",
      href: "https://github.com/thatvivekhingu/Machine_learning",
      dates: "2024",
      active: false,
      type: "Machine Learning Application",
      technologies: ["Python", "Pandas", "Scikit-learn", "Cosine Similarity", "NumPy"],
      description: "Built a machine learning-based recommendation system using Cosine Similarity algorithms. Performed data cleaning, preprocessing, and exploratory data analysis on large datasets using Pandas to deliver personalized book recommendations based on user reading patterns.",
      thumbnail: "/projects/book-recommender.jpg",
      video: "",
    },
    {
      title: "AI Startup Success Predictor | Machine Learning Engine",
      href: "https://github.com/thatvivekhingu/Ai_Startup_Success_Predictor",
      dates: "2024",
      active: true,
      type: "Machine Learning & Predictive Analytics",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Predictive Analytics", "Machine Learning"],
      description: "Developed a machine learning prediction system designed to evaluate startup growth potential, funding success indicators, and market trends using data-driven classification algorithms.",
      thumbnail: "/projects/startup-predictor.jpg",
      video: "",
    },
  ] as ProjectItem[],

  certificates: [
    {
      title: "Machine Learning",
      issuer: "NPTEL",
      date: "2026",
      skills: ["Supervised Learning", "Regression", "Classification", "Model Evaluation"],
      image: "/certificates/nptel-ml.jpg",
      credentialUrl: "https://linkedin.com/in/vivekhingu",
    },
    {
      title: "Build RAG Chatbot with Python",
      issuer: "LetsUpgrade",
      date: "2025",
      skills: ["Retrieval-Augmented Generation", "LLMs", "Vector DBs", "Prompt Engineering"],
      image: "/certificates/letsupgrade-rag.jpg",
      credentialUrl: "https://linkedin.com/in/vivekhingu",
    },
    {
      title: "Data Analysis with Python",
      issuer: "freeCodeCamp",
      date: "2025",
      skills: ["Python", "Pandas", "NumPy", "Data Preprocessing", "EDA"],
      image: "/certificates/freecodecamp-data.jpg",
      credentialUrl: "https://linkedin.com/in/vivekhingu",
    },
    {
      title: "Python for Data Science",
      issuer: "IBM",
      date: "2025",
      skills: ["Python", "Data Science", "Data Cleaning", "Data Visualization"],
      image: "/certificates/ibm-python.jpg",
      credentialUrl: "https://linkedin.com/in/vivekhingu",
    },
  ] as CertificateItem[],

  achievements: [
    {
      title: "Flinders University AI Hackathon",
      description: "Secured 2nd Place in the prestigious International AI Hackathon hosted by Flinders University.",
      category: "Hackathon Award",
      date: "2026",
      metrics: "🥈 2nd Place | AUD 300 Cash Prize",
      image: "/achievements/flinders-ai.jpg",
      link: "https://github.com/thatvivekhingu",
    },
    {
      title: "Google Cloud Arcade Champion 2025",
      description: "Achieved Champion status in Google Cloud Arcade 2025 for hands-on cloud AI, infrastructure, and DevOps milestones.",
      category: "Cloud & AI Milestone",
      date: "2025",
      metrics: "🏆 Google Cloud Arcade Champion",
      image: "/achievements/google-cloud-arcade.jpg",
      link: "https://github.com/thatvivekhingu",
    },
    {
      title: "Top 10 Finalist – AIT Hackathon 2K25",
      description: "Ranked among the Top 10 finalists out of hundreds of competing teams in AIT Hackathon 2K25.",
      category: "Hackathon Finalist",
      date: "2025",
      metrics: "🏅 Top 10 Finalist",
      image: "/achievements/ait-hackathon.jpg",
      link: "https://github.com/thatvivekhingu",
    },
    {
      title: "Robo Soccer Competition",
      description: "Won 1st Prize in the high-stakes Robo Soccer engineering & robotics competition.",
      category: "Engineering Competition",
      date: "2024",
      metrics: "🥇 1st Prize Winner",
      image: "/achievements/robo-soccer.jpg",
      link: "https://github.com/thatvivekhingu",
    },
  ] as AchievementItem[],

  hackathons: [
    {
      id: "flinders-ai-competition-2026",
      title: "Flinders AI Competition",
      event: "Flinders AI Competition 2026",
      organizer: "Flinders University",
      date: "2026",
      location: "Ahmedabad",
      award: "2nd Prize",
      badgeType: "Winner",
      image: "/hackathons/flinders-ai-competition-2026.jpg",
      tags: ["Flinders University", "AI Competition", "2nd Prize Winner"],
      description: "Awarded Second Prize Winner in the Ahmedabad Round of the Flinders University AI Competition 2026.",
    },
    {
      id: "tic-tech-toe-25",
      title: "TIC-TECH-TOE '25",
      event: "TIC-TECH-TOE '25 Hackathon",
      organizer: "IEEE SB DA-IICT",
      date: "2025",
      location: "DA-IICT, Gandhinagar",
      team: "Astro Debuggers",
      award: "Appreciation",
      badgeType: "Appreciation",
      image: "/hackathons/tic-tech-toe-25.jpg",
      verificationId: "7900a832-6a1b-4b1c-9c13-",
      verificationUrl: "https://verification.givemycertificate.com/v/7900a832-6a1b-4b1c-9c13-",
      tags: ["IEEE SB DA-IICT", "3-Day Hackathon", "Certificate of Appreciation"],
      description: "Recognized for valuable participation and technical solution at TIC-TECH-TOE '25 organized by IEEE SB DAIICT.",
    },
    {
      id: "tarkshaastra-2k26",
      title: "tarkShaastra 2k26",
      event: "24 Hours Hackathon",
      organizer: "LDCE Ahmedabad",
      date: "2026",
      location: "LDCE, Ahmedabad",
      award: "Participation",
      badgeType: "Participation",
      image: "/hackathons/tarkshaastra-2k26.jpg",
      tags: ["24-Hour Hackathon", "LDCE TechFest 2026"],
      description: "Participated in the intense 24-hour sprint for tarkShaastra 2k26 during Lakshya 2.0 TechFest at LDCE Ahmedabad.",
    },
    {
      id: "hackout-25",
      title: "HACKOUT '25",
      event: "HACKOUT '25 Hackathon",
      organizer: "DA-IICT",
      date: "2025",
      location: "DA-IICT",
      award: "Participation",
      badgeType: "Participation",
      image: "/hackathons/hackout-25.jpg",
      tags: ["DA-IICT", "Hackathon Sprint"],
      description: "Participated in HACKOUT '25 organized by the Annual Festival Committee at DA-IICT.",
    },
    {
      id: "hackthestack-2026",
      title: "HackTheStack Hackathon 2026",
      event: "HackTheStack Hackathon 2026",
      organizer: "StackCode Training Institute",
      date: "August 8, 2026",
      location: "Ahmedabad",
      award: "Participation",
      badgeType: "Participation",
      image: "/hackathons/hackthestack-2026.jpg",
      verificationId: "HACK-3-P-2608-022",
      verificationUrl: "https://www.stackcodetraining.com",
      tags: ["StackCode", "HackTheStack", "Hackathon 2026", "Certificate of Participation"],
      description: "Successfully participated in HackTheStack Hackathon 2026 organized by StackCode Training Institute, recognized for dedication, innovation, and creative problem-solving.",
    },
  ] as HackathonCertificateItem[],



  contact: [
    {
      href: "mailto:hinguvivek05@gmail.com",
      label: "Email",
      icon: <IconMail className="h-5 w-5" />,
      aria: "Email",
    },
    {
      href: "https://linkedin.com/in/vivekhingu",
      label: "LinkedIn",
      icon: <IconBrandLinkedin className="h-5 w-5" />,
      aria: "LinkedIn",
    },
    {
      href: "https://github.com/thatvivekhingu",
      label: "GitHub",
      icon: <IconBrandGithub className="h-5 w-5" />,
      aria: "GitHub",
    },
    {
      href: "https://instagram.com/realvivek.py",
      label: "Instagram",
      icon: <IconBrandInstagram className="h-5 w-5" />,
      aria: "Instagram",
    },
  ],

  nav: [
    {
      name: "Home",
      link: "hero",
      icon: <IconHome className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
    {
      name: "Projects",
      link: "projects",
      icon: <IconBrush className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
    },
    {
      name: "Achievements",
      link: "achievements",
      icon: <IconAward className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
    },
    {
      name: "Education",
      link: "experience",
      icon: <IconBriefcase2 className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
    {
      name: "Resume",
      link: "/resume",
      icon: <IconFileText className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
    {
      name: "GujjuVerse",
      link: "/gujjuverse",
      icon: <IconSparkles className="subpixel-antialiased h-5 w-5 text-amber-500 hover:text-amber-400 dark:text-amber-400 hover:dark:text-amber-300 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
  ],

  favoriteLanguage: [
    {
      name: "Python",
      icon: "python",
      themeDependent: false,
    }
  ],

  scratchMemes: scratchMemes,
  scratchGifs: scratchMemes.map((m) => m.src),

  tools: [
    {
      name: "Python",
      icon: "python",
      themeDependent: false,
    },
    {
      name: "PyTorch",
      icon: "pytorch",
      themeDependent: false,
    },
    {
      name: "TensorFlow",
      icon: "tensorflow",
      themeDependent: false,
    },
    {
      name: "OpenAI",
      icon: "openai",
      themeDependent: false,
    },
    {
      name: "HuggingFace",
      icon: "huggingface",
      themeDependent: false,
    },
    {
      name: "FastAPI",
      icon: "fastapi",
      themeDependent: false,
    },
    {
      name: "Scikit-learn",
      icon: "scikitlearn",
      themeDependent: false,
    },
    {
      name: "NumPy",
      icon: "numpy",
      themeDependent: false,
    },
    {
      name: "Pandas",
      icon: "pandas",
      themeDependent: false,
    },
    {
      name: "TypeScript",
      icon: "typescript",
      themeDependent: false,
    },
    {
      name: "NextJS",
      icon: "nextjs",
      themeDependent: true,
    },
    {
      name: "React",
      icon: "react",
      themeDependent: false,
    },
    {
      name: "Docker",
      icon: "docker",
      themeDependent: false,
    },
    {
      name: "Git",
      icon: "git",
      themeDependent: false,
    },
    {
      name: "GitHub",
      icon: "github",
      themeDependent: true,
    },
    {
      name: "VS Code",
      icon: "vscode",
      themeDependent: false,
    },
  ],

  sunsets: [
    {
      src: "/sunsets/earth-01.jpg",
      alt: "Illuminated Night Art & Lotus Lamp Festival",
    },
    {
      src: "/sunsets/earth-02.jpg",
      alt: "Ancient Carved Stone Temple Architecture",
    },
    {
      src: "/sunsets/earth-03.jpg",
      alt: "Monsoon Lake Palace & Boat Ride in Udaipur",
    },
    {
      src: "/sunsets/earth-04.jpg",
      alt: "Historic Royal Palace Archway & Balcony Architecture",
    },
    {
      src: "/sunsets/earth-05.jpg",
      alt: "Welcome to Night Flower Park Neon Archway",
    },
  ]
};