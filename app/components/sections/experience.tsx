// src/components/Experience.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Target,
  Download,
  GraduationCap,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
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
    date: "..Future?",
    title: "Your Next Collaboration?",
    company: "Let's Build Something Amazing Together",
    location: "Remote / On-site",
    duration: "Ready to start",
    description:
      "Looking for a skilled React/TypeScript engineer with healthcare domain expertise? Let's discuss how I can contribute to your team's mission and build something impactful together.",
    achievements: [],
    technologies: [],
    icon: <Target className="h-5 w-5 text-primary" />,
  },
  {
    date: "2021 - 2025",
    title: "Software Engineer III",
    company: "Ad Hoc LLC",
    location: "Remote",
    duration: "Nov 2021 - Apr 2025",
    description:
      "Building and maintaining mission-critical React/TypeScript applications for HealthCare.gov's health plan enrollment workflows, serving millions of users.",
    achievements: [
      "Redesigned health plan comparison cards using choice architecture principles, improving enrollment completion rates.",
      "Engineered a Redux-based state management system for dynamic filtering, optimizing performance under high loads.",
      "Developed comprehensive accessibility testing infrastructure using axe-core to maintain WCAG/Section 508 compliance.",
      "Built automated end-to-end testing suites with Playwright and React Testing Library.",
      "Maintained and optimized Jenkins CI/CD pipelines with AWS cloud infrastructure.",
      "Led technical documentation efforts and established coding standards that improved team velocity.",
      "Participated in a 24/7 on-call rotation using PagerDuty during peak enrollment periods.",
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
    ],
    icon: <Target className="h-5 w-5 text-primary" />,
  },
  {
    date: "2018 - 2021",
    title: "Software Engineer",
    company: "Raytheon Technologies",
    location: "Tewksbury, MA",
    duration: "Jul 2018 - Nov 2021",
    description:
      "Architected and maintained mission-critical software components using C++, conducting systematic debugging and root cause analysis for complex technical issues.",
    achievements: [
      "Led technical documentation initiatives and mentored junior developers.",
      "Established coding standards that improved team productivity and code quality.",
      "Collaborated in cross-functional Agile/SCRUM teams to deliver high-performance applications.",
      "Acquired and maintained a DoD Secret security clearance.",
      "Conducted systematic debugging and root cause analysis for complex technical issues.",
    ],
    technologies: [
      "C++",
      "Agile/SCRUM",
      "Jira",
      "Debugging",
      "Embedded Systems",
    ],
    icon: <Target className="h-5 w-5 text-primary" />,
  },
  {
    date: "2017",
    title: "BS, Computer Science",
    company: "University of Massachusetts",
    location: "Lowell, MA",
    duration: "Graduated May 2017",
    description:
      "Graduated with a focus on software engineering principles, algorithms, and computer systems.",
    achievements: [
      "Graduated cum laude with high academic honors.",
      "Achieved Dean's List recognition for multiple semesters.",
      "Strong foundation in algorithms, data structures, and software design.",
      "Coursework in programming languages, databases, and computer architecture.",
    ],
    technologies: [
      "Java",
      "C++",
      "Python",
      "SQL",
      "Data Structures",
      "Algorithms",
    ],
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
  },
];

// Sub-component for the content of each timeline item
const JourneyCard = ({ item }: { item: JourneyItem }) => (
  <Card className="w-full">
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
);

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

  const timelineItems = journeyData.map((item) => ({
    title: item.date,
    content: <JourneyCard item={item} />,
  }));

  return (
    <section
      id="experience"
      ref={ref}
      className="relative bg-muted/30 py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-16">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              My Journey
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              A timeline of my professional experience, from foundational
              education to impactful engineering roles.
            </p>
          </motion.div>

          {/* Timeline */}
          <Timeline data={timelineItems} />

          {/* Download Resume CTA */}
          <motion.div variants={itemVariants}>
            <Button size="lg" asChild>
              <a href="/Devon_Hills_Resume_2025_Newest.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Full Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
