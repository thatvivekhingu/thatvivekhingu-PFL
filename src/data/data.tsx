import { IconHome, IconBrandGithub, IconBrush, IconBriefcase2, IconBrandLinkedin, IconMail, IconAward, IconFileText, IconCoffee } from "@tabler/icons-react"

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
      name: "GujjuVerse ☕",
      link: "/gujjuverse",
      icon: <IconCoffee className="subpixel-antialiased h-5 w-5 text-amber-500 hover:text-amber-400 dark:text-amber-400 hover:dark:text-amber-300 hover:animate-wiggle animate-wiggle transition-colors duration-100" />,
    },
  ],

  favoriteLanguage: [
    {
      name: "Python",
      icon: "python",
      themeDependent: false,
    }
  ],

  scratchGifs: [
    // 10 BRAND NEW HIGH-TECH / CYBERPUNK / MEME STICKERS FIRST
    // 1. Cyberpunk Matrix Code Rain
    "https://i.giphy.com/QHE5gWI0QjqF2.gif",
    // 2. Hacker typing high speed
    "https://i.giphy.com/26tn33aiTi1jkl6H6.gif",
    // 3. Bouncing Neon Synthwave
    "https://i.giphy.com/3oKIPnAiaMCws8nOsE.gif",
    // 4. Cyberpunk Glitch Grid
    "https://i.giphy.com/l41lFw05B8JZ3xaW4.gif",
    // 5. Lofi Anime Girl coding
    "https://i.giphy.com/d1E2GyfFiCTtSC40.gif",
    // 6. Spongebob typing furious
    "https://i.giphy.com/l1EtlhAXY8CG936vq.gif",
    // 7. Homer Simpson mashing keyboard
    "https://i.giphy.com/xT5LMWZxR6t32jYjXn.gif",
    // 8. Kermit writing fast
    "https://i.giphy.com/10FwycrnAkpshW.gif",
    // 9. AI Robot typing
    "https://i.giphy.com/3o7TKSjRrfIPjeiVyM.gif",
    // 10. Retro Pixel Art Gaming
    "https://i.giphy.com/26n6Wywq480SmNRY4.gif",

    // CLASSIC STICKERS
    // 11. Dog coding aggressively
    "https://i.giphy.com/13Hgw8T855C20M.gif",
    // 12. Cat Headbang Jamming
    "https://i.giphy.com/u01ioCe6G8URG.gif",
    // 13. Cat typing on laptop close up
    "https://i.giphy.com/LmN8OYiY4m0X4UrzUI.gif",
    // 14. Cat coding fast on laptop
    "https://i.giphy.com/JIX9t2j0ZTN9S.gif"
  ],

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