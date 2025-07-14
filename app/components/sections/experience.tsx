"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Target, GraduationCap, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Timeline } from "../ui/timeline";

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
    duration: "",
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
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
  },
];

// Sub-component for the content of each timeline item
const JourneyCard = React.memo(({ item }: { item: JourneyItem }) => (
  <Card
    className={`w-full transition-colors duration-300 ${
      item.date === "Next"
        ? "glass-card border-accent/50 bg-gradient-to-br from-accent/10 to-accent/5"
        : "card-professional"
    }`}>
    <CardHeader>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl gradient-text">{item.title}</CardTitle>
          <CardDescription className="mt-1 font-medium">
            {item.company} • {item.location}
          </CardDescription>
          <CardDescription className="mt-1 text-xs opacity-80">
            {item.duration}
          </CardDescription>
        </div>
        {item.date === "Present" && <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Current</Badge>}
        {item.date === "Next" && (
          <Badge className="badge-available">
            Available
          </Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-muted-foreground">{item.description}</p>

      {item.achievements.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2 gradient-text">
            {item.icon} Key Achievements
          </h4>
          <ul className="achievement-list">
            {item.achievements.map((achievement, i) => (
              <li key={i} className="achievement-item group">
                <CheckCircle2 className="achievement-icon" />
                <span className="achievement-text">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.technologies.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3 gradient-text">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <Badge 
                key={tech} 
                variant="default" 
                className="badge-tech cursor-default"
              >
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

  const timelineItems = useMemo(
    () =>
      journeyData.map((item) => ({
        title: item.date,
        content: <JourneyCard item={item} />,
      })),
    []
  );

  return (
    <section
      id="experience"
      ref={ref}
      className="relative section-primary py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-6">
              Professional Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
