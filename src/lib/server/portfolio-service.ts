/**
 * Portfolio Data & Telemetry Service
 * Centralized data provider for portfolio metadata, skills, projects, and live stats aggregation
 */

import { data } from "@/data/data";

export interface PortfolioDataResponse {
  profile: {
    name: string;
    role: string;
    avatarUrl: string;
    summary: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
  };
  education: typeof data.education;
  projects: typeof data.projects;
  skills: typeof data.skills;
  achievements: typeof data.achievements;
  hackathons: typeof data.hackathons;
}

export class PortfolioService {
  public static getFullPortfolio(): PortfolioDataResponse {
    return {
      profile: {
        name: "Vivek Hingu",
        role: "AI & ML Engineer",
        avatarUrl: "/vian-avatar.png",
        summary: data.summary,
        location: "Ahmedabad, Gujarat, India",
        email: "hinguvivek05@gmail.com",
        github: "https://github.com/thatvivekhingu",
        linkedin: "https://linkedin.com/in/vivekhingu",
      },
      education: data.education,
      projects: data.projects,
      skills: data.skills,
      achievements: data.achievements,
      hackathons: data.hackathons,
    };
  }

  public static getProjects() {
    return data.projects;
  }

  public static getSkills() {
    return data.skills;
  }
}
