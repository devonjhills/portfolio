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
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

// Data can be kept outside the component for clarity
const achievements = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "HealthCare.gov Impact",
    description:
      "Redesigned health plan comparison cards using choice architecture principles based on customer feedback, improving enrollment completion rates for millions of users during high-traffic enrollment periods.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Production Reliability",
    description:
      "Maintained 24/7 on-call rotation for critical HealthCare.gov systems, ensuring minimal downtime during peak enrollment periods while resolving frontend bugs affecting millions of users.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Accessibility Excellence",
    description:
      "Built comprehensive accessibility testing infrastructure using axe-core, maintaining WCAG/Section 508 compliance for government healthcare applications serving vulnerable populations.",
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "Team Leadership",
    description:
      "Led technical documentation efforts and established coding standards that improved team velocity and reduced onboarding time, while mentoring junior developers across cross-functional teams.",
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
      "End-to-End Testing",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: <Cloud className="h-6 w-6" />,
    skills: ["AWS", "Jenkins", "CI/CD", "Docker", "Git", "Firebase"],
  },
];

export function About() {
  const ref = useRef(null);
  // Trigger animation when the section is 20% in view, but only once.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const scrollToExperience = () => {
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
  };

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
      className="relative section-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="gradient-text">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Proven Software Engineer with 7+ years building mission-critical
              React/TypeScript applications for HealthCare.gov, serving millions
              of users during high-traffic enrollment periods. Expert in
              accessibility compliance, 24/7 production support, and government
              healthcare technology.
            </p>
          </motion.div>

          {/* Hero Stats & Key Info Row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card text-center p-6">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">7+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card text-center p-6">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  Millions
                </div>
                <div className="text-sm text-muted-foreground">
                  Users Served
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card text-center p-6">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  Full-Stack
                </div>
                <div className="text-sm text-muted-foreground">Expertise</div>
              </CardContent>
            </Card>
            <Card className="bg-card text-center p-6">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary mb-1">
                  Always
                </div>
                <div className="text-sm text-muted-foreground">Learning</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content - Optimized Layout */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Professional Timeline & Core Strengths - Horizontal */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-primary" />
                    Professional Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-primary/20">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <h4 className="font-semibold">Software Engineer III</h4>
                      <p className="text-sm text-primary">
                        Ad Hoc LLC • Nov 2021 - Present
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        HealthCare.gov development & optimization
                      </p>
                    </div>
                  </div>
                  <div className="relative pl-6 border-l-2 border-primary/20">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary/60 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold">Software Engineer</h4>
                      <p className="text-sm text-primary">
                        Raytheon Technologies • Jul 2018 - Nov 2021
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Defense systems & secure applications • DoD Secret
                        clearance
                      </p>
                    </div>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary/40 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold">BS Computer Science</h4>
                      <p className="text-sm text-primary">
                        UMass Lowell • 2017
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Graduated cum laude • Dean&apos;s List
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <button
                      onClick={scrollToExperience}
                      className="w-full bg-primary/10 hover:bg-primary/20 text-primary px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group">
                      <span>View Full Experience Timeline</span>
                      <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Brain className="h-6 w-6 text-primary" />
                    Core Strengths & Specializations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "HealthCare.gov Development",
                      "React/TypeScript Expert",
                      "WCAG/Section 508 Compliance",
                      "Million+ User Applications",
                      "24/7 Production Support",
                      "Choice Architecture Design",
                      "Government Technology",
                      "Performance at Scale",
                    ].map((strength) => (
                      <div key={strength} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Achievements - Horizontal Cards */}
            <div>
              <h3 className="mb-6">Key Impact & Achievements</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.title}
                    className="bg-card h-full">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          {achievement.icon}
                        </div>
                        <div>
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

            {/* Technical Skills - Inline Badge Layout */}
            <div>
              <h3 className="mb-6">Technical Expertise</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((category) => (
                  <Card
                    key={category.title}
                    className="bg-card h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                          {category.icon}
                        </div>
                        {category.title}
                      </CardTitle>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
