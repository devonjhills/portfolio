// src/components/Experience.tsx
"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Target, GraduationCap, CheckCircle2, ChevronDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Timeline } from "../ui/timeline"; // Your custom timeline component

// Define a type for your journey items
type JourneyItem = {
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

const journeyData: JourneyItem[] = [
  {
    date: "Next",
    title: "Your Next Team Member?",
    company: "Ready for New Challenges",
    location: "Remote / Hybrid / On-site",
    duration: "Ready to Start",
    description:
      "Seeking a React/TypeScript engineer with 7+ years of experience and healthcare domain expertise? I bring proven skills in building mission-critical applications, leading technical initiatives, and driving impactful solutions.",
    achievements: [
      "7+ years of full-stack development experience",
      "Mission-critical application expertise serving millions of users",
      "Government security clearance and compliance experience",
      "Technical leadership and mentorship background",
      "24/7 production support and incident response experience",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Ruby on Rails",
      "PostgreSQL",
      "AWS",
      "CI/CD",
    ],
    icon: <Target className="h-5 w-5 text-primary" />,
  },
  {
    date: "2021 - Present",
    title: "Software Engineer III",
    company: "Ad Hoc LLC",
    location: "Remote",
    duration: "Nov 2021 - Present (3+ years)",
    description:
      "Building and maintaining full-stack React/TypeScript applications for HealthCare.gov health plan enrollment workflows, serving millions of Americans during high-traffic enrollment periods.",
    achievements: [
      "Drove projects from concept to completion, redesigning health plan comparison cards using choice architecture principles based on UX research",
      "Built robust backend APIs and executed complex Ruby logic for Medicare eligibility rules and coverage transitions",
      "Engineered Redux-based state management for dynamic filtering and comparison features, optimizing performance under peak loads",
      "Developed comprehensive accessibility testing infrastructure using axe-core, maintaining WCAG/Section 508 compliance",
      "Built automated testing suites with Playwright and React Testing Library, including end-to-end workflow validation",
      "Established coding standards and best practices that improved team velocity and reduced onboarding time",
      "Maintained 24/7 production support using PagerDuty, responding to critical incidents during peak enrollment periods",
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
    icon: <Target className="h-5 w-5 text-primary" />,
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
    icon: <Target className="h-5 w-5 text-primary" />,
  },
  {
    date: "2013 - 2017",
    title: "BS, Computer Science",
    company: "University of Massachusetts Lowell",
    location: "Lowell, MA",
    duration: "Graduated May 2017",
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
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
  },
];

// Sub-component for the content of each timeline item
const JourneyCard = React.memo(({ item }: { item: JourneyItem }) => (
  <Card
    className={`w-full ${
      item.date === "Next"
        ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/20"
        : ""
    }`}>
    <CardHeader>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl">{item.title}</CardTitle>
          <CardDescription className="mt-1">
            {item.company} • {item.location}
          </CardDescription>
          <CardDescription className="mt-1 text-xs">
            {item.duration}
          </CardDescription>
        </div>
        {item.date === "Present" && <Badge>Current</Badge>}
        {item.date === "Next" && (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/30 dark:text-green-400">
            Available
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-muted-foreground">{item.description}</p>

      {item.achievements.length > 0 && (
        <Collapsible>
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              {item.icon} Key Achievements
            </h4>
            <ul className="space-y-3 pl-2">
              {item.achievements.slice(0, 3).map((achievement, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
            <CollapsibleContent className="space-y-3 pl-2">
              {item.achievements.slice(3).map((achievement, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </CollapsibleContent>
          </div>
          {item.achievements.length > 3 && (
            <CollapsibleTrigger asChild>
              <Button variant="link" className="group p-0 text-sm mt-4">
                Show {item.achievements.length - 3} more
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
          )}
        </Collapsible>
      )}

      {item.technologies.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
));

JourneyCard.displayName = "JourneyCard";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Correctly typed animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const timelineItems = useMemo(() => journeyData.map((item) => ({
    title: item.date,
    content: <JourneyCard item={item} />,
  })), []);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative bg-muted/30 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Professional Journey
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground">
              From academic excellence to mission-critical software engineering
              - a progression of technical leadership, innovation, and impactful
              contributions across healthcare technology and defense systems.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants}>
            <Timeline data={timelineItems} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
