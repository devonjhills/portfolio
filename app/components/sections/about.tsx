"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Code2, Database, Globe, Brain, Cloud, Zap, Users, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const skillCategories = [
  {
    title: "Frontend Development",
    description: "Building responsive, accessible user interfaces with React, TypeScript, and modern JavaScript. Expert in Redux state management and responsive design patterns.",
    icon: <Globe className="h-5 w-5 text-primary" />,
  },
  {
    title: "Testing & Quality Assurance", 
    description: "Comprehensive testing strategies using Playwright and React Testing Library. Strong focus on accessibility testing and WCAG/Section 508 compliance.",
    icon: <Code2 className="h-5 w-5 text-primary" />,
  },
  {
    title: "Backend & Full-Stack",
    description: "Full-stack development with Ruby on Rails and Node.js. Experience building RESTful APIs and working with PostgreSQL databases.",
    icon: <Database className="h-5 w-5 text-primary" />,
  },
  {
    title: "DevOps & Automation",
    description: "CI/CD pipeline management with Jenkins, AWS cloud services, Docker containerization, and automated build processes.",
    icon: <Cloud className="h-5 w-5 text-primary" />,
  },
  {
    title: "Development Practices",
    description: "Agile/SCRUM methodologies, test-driven development, thorough code reviews, and comprehensive technical documentation.",
    icon: <Brain className="h-5 w-5 text-primary" />,
  },
  {
    title: "Performance Optimization",
    description: "Specializing in performance tuning for high-traffic applications, code splitting, lazy loading, and bundle optimization techniques.",
    icon: <Zap className="h-5 w-5 text-primary" />,
  },
  {
    title: "Team Leadership",
    description: "Mentoring junior developers, leading technical discussions, and collaborating effectively in cross-functional teams.",
    icon: <Users className="h-5 w-5 text-primary" />,
  },
  {
    title: "Mission-Critical Systems",
    description: "7+ years building healthcare and government applications serving millions of users with zero-downtime requirements.",
    icon: <Target className="h-5 w-5 text-primary" />,
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section 
      id="about" 
      ref={ref} 
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground mb-4">
              About <span className="text-catppuccin-mauve">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Software Engineer with 7+ years of experience specializing in
              React, TypeScript, and modern JavaScript development. Expert in
              building responsive, accessible user interfaces for high-traffic
              applications.
            </p>
          </motion.div>

          {/* Personal Story */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="max-w-4xl mx-auto catppuccin-card p-8 text-center">
              <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    I&apos;m a Software Engineer with 7+ years of experience
                    building mission-critical applications that serve millions of
                    users. Currently working at Ad Hoc LLC on HealthCare.gov
                    enrollment workflows.
                  </p>
                  <p className="text-sm leading-relaxed">
                    I specialize in React, TypeScript, and creating accessible, 
                    high-performance web applications with proven experience in 
                    healthcare and government technology solutions.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    Strong track record in production support, UI/UX optimization, 
                    and maintaining WCAG/Section 508 compliance for applications 
                    serving vulnerable populations.
                  </p>
                  <p className="text-sm leading-relaxed">
                    With a BS in Computer Science from UMass Lowell (graduated cum
                    laude), I bring both technical depth and real-world experience
                    to every project.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Technical Expertise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {skillCategories.map((skill) => (
                <motion.div key={skill.title} variants={itemVariants}>
                  <Card className="h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        {skill.icon}
                        <CardTitle className="text-lg">{skill.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {skill.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Key Technologies */}
            <div className="mt-12 max-w-4xl mx-auto">
              <h4 className="text-lg font-semibold text-foreground mb-6 text-center">Technologies & Tools</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "React", "TypeScript", "Next.js", "Redux", "Ruby on Rails", 
                  "PostgreSQL", "AWS", "Jenkins", "Playwright", "Docker",
                  "Git", "WCAG/508", "Agile/SCRUM", "TDD", "CI/CD"
                ].map((tech) => (
                  <Badge key={tech} variant="secondary" className="mb-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}