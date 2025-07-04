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
      "Redesigned health plan comparison cards using choice architecture principles, serving millions of users during high-traffic enrollment periods.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Full-Stack Leadership",
    description:
      "Drove projects from concept to completion, building React/TypeScript frontends and Ruby APIs for Medicare eligibility rules and coverage transitions.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Accessibility Excellence",
    description:
      "Developed comprehensive accessibility testing infrastructure using axe-core and maintained WCAG/Section 508 compliance for government applications.",
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Technical Leadership",
    description:
      "Established coding standards and best practices that improved team velocity and reduced onboarding time while mentoring junior developers.",
  },
];

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Globe className="h-6 w-6" />,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Redux",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "SPA",
    ],
  },
  {
    title: "Backend & Full-Stack",
    icon: <Database className="h-6 w-6" />,
    skills: [
      "Ruby on Rails",
      "Node.js",
      "PostgreSQL",
      "RESTful APIs",
      "Server-side Development",
    ],
  },
  {
    title: "Testing & Quality",
    icon: <Code2 className="h-6 w-6" />,
    skills: [
      "Playwright",
      "React Testing Library",
      "axe-core",
      "WCAG/Section 508",
      "TDD",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Cloud className="h-6 w-6" />,
    skills: ["AWS", "Jenkins", "CI/CD", "Docker", "Git", "Firebase"],
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
      className="relative bg-muted/30 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Me
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground">
              Full-Stack Software Developer with 7+ years of experience
              specializing in React, TypeScript, and modern JavaScript
              development. Expert in building accessible, high-traffic
              applications serving millions of users with strong problem-solving
              skills in healthcare technology solutions.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Key Impact & Achievements */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Key Impact & Achievements
                </h3>
                <div className="grid gap-6">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.title}
                      className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                            {achievement.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-2">
                              {achievement.title}
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Technical Skills - Horizontal Layout */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Technical Expertise
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {skillCategories.map((category) => (
                    <Card
                      key={category.title}
                      className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            {category.icon}
                          </div>
                          <CardTitle className="text-lg">
                            {category.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Facts & Personal */}
            <div className="space-y-8">
              {/* Professional Background */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Target className="h-6 w-6 text-primary" />
                    Professional Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Current Role
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Software Engineer III at Ad Hoc LLC (Nov 2021 - Present)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Previous Experience
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Software Engineer at Raytheon Technologies (Jul 2018 -
                        Nov 2021)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Education
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        BS Computer Science, UMass Lowell (2017) - Graduated cum
                        laude
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Security Clearance
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        DoD Secret clearance (acquired at Raytheon)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Core Strengths */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Brain className="h-6 w-6 text-primary" />
                    Core Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "24/7 Production Support",
                      "Agile/SCRUM Leadership",
                      "Performance Optimization",
                      "Cross-functional Collaboration",
                      "Technical Documentation",
                    ].map((strength) => (
                      <div key={strength} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Personal Interests - Compact */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Unplug className="h-6 w-6 text-primary" />
                    Personal Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {interests.map((interest) => (
                      <div
                        key={interest.name}
                        className="flex items-center gap-2 text-sm">
                        {interest.icon}
                        <span>{interest.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
