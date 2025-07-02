// src/components/About.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Brain,
  Cloud,
  Zap,
  Users,
  Target,
  Coffee,
  Gamepad2,
  FilmIcon,
  Unplug,
  PlaneTakeoff,
  BookOpen,
  Cat,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

// Data can be kept outside the component for clarity
const achievements = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "HealthCare.gov Impact",
    description:
      "Redesigned key enrollment UI, directly improving completion rates for millions of Americans.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Performance at Scale",
    description:
      "Engineered a Redux-based state management system that maintained high performance under peak traffic loads.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Accessibility Leadership",
    description:
      "Championed and maintained WCAG & Section 508 compliance, ensuring universal access to critical services.",
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Mentorship & Standards",
    description:
      "Led documentation efforts and established coding standards that significantly improved team velocity and onboarding.",
  },
];

const skillCategories = [
  {
    title: "Frontend Mastery",
    icon: <Globe className="h-6 w-6" />,
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Backend & Systems",
    icon: <Database className="h-6 w-6" />,
    skills: [
      "Ruby on Rails",
      "Node.js",
      "PostgreSQL",
      "RESTful APIs",
      "GraphQL",
    ],
  },
  {
    title: "Quality & Testing",
    icon: <Code2 className="h-6 w-6" />,
    skills: ["Playwright", "Jest", "RTL", "axe-core", "TDD", "Storybook"],
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud className="h-6 w-6" />,
    skills: ["AWS", "Jenkins", "Docker", "CI/CD", "Vercel"],
  },
];

const interests = [
  { icon: <Coffee className="h-4 w-4" />, name: "Coffee Enthusiast" },
  { icon: <Cat className="h-4 w-4" />, name: "My Cats" },
  { icon: <Gamepad2 className="h-4 w-4" />, name: "Gaming" },
  { icon: <FilmIcon className="h-4 w-4" />, name: "Movies" },
  { icon: <BookOpen className="h-4 w-4" />, name: "Reading" },
  { icon: <PlaneTakeoff className="h-4 w-4" />, name: "Traveling" },
];

export function About() {
  const ref = useRef(null);
  // Trigger animation when the section is 20% in view, but only once.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Correctly typed animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-muted/30 py-24 px-4 sm:px-6 lg:px-8">
      {/* Background grid pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {/* Tokyo Night gradient background */}
      <div
        className="absolute bottom-0 left-[-20%] right-0 top-[-10%] -z-10 aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/15 via-secondary/10 to-accent/15 opacity-60 blur-3xl"
        aria-hidden="true"></div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-20">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              About Me
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              A passionate software engineer with a proven track record of
              building scalable, accessible, and user-centric applications that
              make a difference.
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.title}
                  className="bg-card/50 backdrop-blur-sm border-border/50 flex items-start gap-6 p-6">
                  <div>{achievement.icon}</div>
                  <div>
                    <CardTitle className="mb-2 text-lg">
                      {achievement.title}
                    </CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Technical Expertise Section */}
          <motion.div variants={itemVariants} className="w-full">
            <h3 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Technical Expertise
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {skillCategories.map((category) => (
                <Card
                  key={category.title}
                  className="bg-card/50 backdrop-blur-sm border-border/50 group h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
                        {category.icon}
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Beyond the Code Section */}
          <motion.div variants={itemVariants} className="w-full">
            <Card className="mx-auto max-w-full text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl">
                  <Unplug className="h-7 w-7 text-primary" />
                  Beyond the Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-lg text-muted-foreground">
                  When I&apos;m not building user experiences, my interests
                  are...
                </p>
                <div className="mb-8 flex flex-wrap justify-center gap-4">
                  {interests.map((interest) => (
                    <Badge
                      key={interest.name}
                      variant="outline"
                      className="flex items-center gap-2 px-4 py-2 text-sm">
                      {interest.icon}
                      <span>{interest.name}</span>
                    </Badge>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  I believe the best software comes from understanding people.
                  My diverse interests in creativity and community help me bring
                  empathy and a fresh perspective to every project.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
