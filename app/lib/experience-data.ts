import React from "react";
import { Target, GraduationCap } from "lucide-react";

export type JourneyItem = {
  date: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  icon: React.ReactNode;
};

export const journeyData: JourneyItem[] = [
  {
    date: "2025 - Present",
    title: "Software Engineer",
    company: "Livefront",
    location: "Remote",
    duration: "Aug 2025 - Present",
    description: "Details TBD",
    achievements: ["Details TBD"],
    technologies: ["Details TBD"],
    icon: React.createElement(Target, { className: "h-5 w-5 text-secondary" }),
  },
  {
    date: "2021 - 2025",
    title: "Software Engineer III",
    company: "Ad Hoc LLC",
    location: "Remote",
    duration: "Nov 2021 - April 2025 (3+ years)",
    description:
      "Built and maintained React/TypeScript applications for HealthCare.gov health plan enrollment workflows, serving millions of users during high-traffic enrollment periods with focus on accessibility and performance.",
    achievements: [
      "Redesigned health plan comparison cards using choice architecture principles based on customer feedback and UX research, improving user enrollment completion rates for millions of users",
      "Built robust backend APIs and executed complex Ruby logic for Medicare eligibility rules and coverage transitions",
      "Engineered Redux-based state management for dynamic filtering and comparison features, optimizing performance under peak loads",
      "Developed comprehensive accessibility testing infrastructure using axe-core, maintaining WCAG/Section 508 compliance",
      "Built automated testing suites with Playwright and React Testing Library, including end-to-end workflow validation",
      "Led technical documentation efforts and established coding standards that improved team velocity and reduced onboarding time",
      "Participated in 24/7 on-call rotation using PagerDuty, responding to critical incidents and maintaining system reliability during peak enrollment periods serving millions of users",
      "Led Ruby version and critical gem upgrades ensuring stable deployments",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Redux",
      "Ruby on Rails",
      "PostgreSQL",
      "AWS",
      "Jenkins",
      "Playwright",
      "React Testing Library",
      "axe-core",
    ],
    icon: React.createElement(Target, { className: "h-5 w-5 text-secondary" }),
  },
  {
    date: "2018 - 2021",
    title: "Software Engineer",
    company: "Raytheon Technologies",
    location: "Tewksbury, MA",
    duration: "Jul 2018 - Nov 2021 (3+ years)",
    description:
      "Architected and maintained mission-critical software components using C++ for defense applications, conducting systematic debugging and root cause analysis for complex technical issues.",
    achievements: [
      "Led technical documentation initiatives and mentored junior developers, establishing coding standards",
      "Improved team productivity and code quality through systematic code review processes",
      "Collaborated in cross-functional Agile/SCRUM teams to deliver high-performance applications on schedule",
      "Acquired and maintained DoD Secret security clearance for classified defense projects",
      "Conducted systematic debugging and root cause analysis for complex embedded systems issues",
      "Contributed to mission-critical defense applications with strict reliability requirements",
    ],
    technologies: [
      "C++",
      "Embedded Systems",
      "Agile/SCRUM",
      "JIRA",
      "Version Control",
      "Debugging Tools",
      "Defense Systems",
    ],
    icon: React.createElement(Target, { className: "h-5 w-5 text-secondary" }),
  },
  {
    date: "2014 - 2017",
    title: "BS, Computer Science",
    company: "University of Massachusetts Lowell",
    location: "Lowell, MA",
    duration: "Graduated December 2017",
    description:
      "Bachelor of Science in Computer Science with cum laude honors, focusing on software engineering principles, algorithms, and computer systems architecture.",
    achievements: [
      "Graduated cum laude with high academic honors (GPA distinction)",
      "Achieved Dean's List recognition for multiple consecutive semesters",
      "Built strong foundation in algorithms, data structures, and software design patterns",
      "Completed comprehensive coursework in programming languages, database systems, and computer architecture",
      "Developed problem-solving skills through rigorous mathematical and computational training",
    ],
    technologies: [
      "Java",
      "C++",
      "Python",
      "SQL",
      "Data Structures",
      "Algorithms",
      "Software Design",
      "Database Systems",
    ],
    icon: React.createElement(GraduationCap, {
      className: "h-5 w-5 text-secondary",
    }),
  },
];

// Helper function to get compact journey data for About section
export const getCompactJourneyData = () => {
  return journeyData.map((item) => ({
    title: item.title,
    company: item.company,
    duration: item.duration,
    description:
      item.description.length > 100
        ? item.description.substring(0, 100) + "..."
        : item.description,
    isEducation: item.icon.type === GraduationCap,
  }));
};
