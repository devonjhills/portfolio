export interface Project {
  name: string;
  description: string;
  technologies: string[];
  repositoryUrl: string;
  liveUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  dates: string;
  highlights: string[];
}

export const profile = {
  name: "Devon Hills",
  role: "Software Engineer",
  introduction:
    "Software Engineer with 7+ years of experience specializing in React, TypeScript, and modern JavaScript development. Expert in building responsive, accessible user interfaces for high-traffic applications serving millions of users.",
  email: "devonjhills@gmail.com",
  github: "https://github.com/devonjhills",
  linkedin: "https://linkedin.com/in/devonjhills",
};

export const projects: Project[] = [
  {
    name: "Film Fatale",
    description:
      "A production-ready, responsive movie and TV discovery platform built with cutting-edge technologies. This project demonstrates proficiency in Next.js 15, TypeScript, modern React patterns, and responsive design principles.",
    technologies: ["Next.js 15", "TypeScript", "TMDB API"],
    repositoryUrl: "https://github.com/devonjhills/film-fatale",
    liveUrl: "https://filmfatale.app/",
  },
  {
    name: "Etsy Digital Mockup Tools",
    description:
      "Mockup Tools is a powerful automation suite designed for digital product creators, Etsy sellers, and e-commerce entrepreneurs. This project showcases advanced Python development skills, API integration expertise, and AI implementation capabilities.",
    technologies: ["Python", "Flask", "Etsy API", "LLM integration"],
    repositoryUrl: "https://github.com/devonjhills/etsy-digital-mockup-tools",
  },
  {
    name: "Government Grant Directory",
    description:
      "A modern, performant web application for discovering federal funding opportunities. Built with Next.js 14, TypeScript, and Tailwind CSS, this application provides a clean interface for searching and exploring government grants through the Grants.gov API.",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Grants.gov API"],
    repositoryUrl: "https://github.com/devonjhills/government-grant-directory",
  },
];

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "Livefront",
    location: "Remote",
    dates: "Aug 2025 — Present",
    highlights: [
      "Working on internal initiatives and tools with LLM integration.",
      "Developing AI-powered solutions for internal workflows and automation.",
    ],
  },
  {
    role: "Software Engineer III",
    company: "Ad Hoc LLC",
    location: "Remote",
    dates: "Nov 2021 — Apr 2025",
    highlights: [
      "Built and maintained React/TypeScript applications for HealthCare.gov, serving millions of users.",
      "Redesigned health plan comparison cards using choice architecture principles based on customer feedback and UX research.",
      "Developed comprehensive accessibility testing infrastructure using axe-core and maintained WCAG/Section 508 compliance.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Raytheon Technologies",
    location: "Tewksbury, MA",
    dates: "Jul 2018 — Nov 2021",
    highlights: [
      "Architected and maintained mission-critical software components using C++.",
      "Led technical documentation initiatives and mentored junior developers.",
    ],
  },
];

export const capabilities = [
  "TypeScript", "React", "Next.js", "Ruby", "Python", "Accessibility",
  "Testing", "CI/CD", "AWS", "LLM integration",
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "University of Massachusetts Lowell",
  date: "Dec 2017",
  honors: "Graduated cum laude · Dean's List",
};
