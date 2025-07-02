"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Database, 
  Globe, 
  Brain, 
  Cloud, 
  Zap, 
  Users, 
  Target, 
  Download, 
  MapPin, 
  GraduationCap,
  Heart,
  Coffee,
  Gamepad2,
  Camera
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// Key achievements
const achievements = [
  {
    icon: <Target className="h-5 w-5" />,
    title: "HealthCare.gov Impact",
    description: "Redesigned health plan comparison cards improving enrollment completion rates for millions",
    highlight: "Millions of users served"
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Performance Optimization",
    description: "Built Redux-based state management optimizing performance under high loads",
    highlight: "Zero-downtime reliability"
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Accessibility Leadership",
    description: "Maintained WCAG/Section 508 compliance for government applications",
    highlight: "100% accessibility compliance"
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Technical Leadership",
    description: "Led documentation efforts and coding standards that improved team velocity",
    highlight: "Reduced onboarding time"
  },
];

// Skills categories with modern organization
const skillCategories = [
  {
    title: "Frontend Mastery",
    icon: <Globe className="h-5 w-5" />,
    colorClass: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    skills: ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS"],
    description: "Building responsive, accessible user interfaces"
  },
  {
    title: "Backend & Systems",
    icon: <Database className="h-5 w-5" />,
    colorClass: "bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    skills: ["Ruby on Rails", "Node.js", "PostgreSQL", "RESTful APIs"],
    description: "Full-stack development and database design"
  },
  {
    title: "Quality Assurance",
    icon: <Code2 className="h-5 w-5" />,
    colorClass: "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    skills: ["Playwright", "Jest", "axe-core", "TDD"],
    description: "Comprehensive testing and accessibility"
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud className="h-5 w-5" />,
    colorClass: "bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    skills: ["AWS", "Jenkins", "Docker", "CI/CD"],
    description: "Infrastructure and deployment automation"
  },
];

// Personal interests
const interests = [
  { icon: <Coffee className="h-4 w-4" />, name: "Coffee Enthusiast" },
  { icon: <Gamepad2 className="h-4 w-4" />, name: "Gaming" },
  { icon: <Camera className="h-4 w-4" />, name: "Photography" },
  { icon: <Heart className="h-4 w-4" />, name: "Open Source" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section 
      id="about" 
      ref={ref} 
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey showcasing growth, impact, and continuous learning in software development.
            </p>
          </motion.div>

          {/* Quick Info Cards */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <GraduationCap className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-sm text-muted-foreground">BS Computer Science</p>
                  <p className="text-xs text-muted-foreground">UMass Lowell (Cum Laude)</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">Remote (United States)</p>
                  <p className="text-xs text-muted-foreground">Open to opportunities</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <Download className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Resume</h3>
                  <motion.a
                    href="/Devon_Hills_Resume_2025_Newest.pdf"
                    download
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Download PDF
                  </motion.a>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Key Achievements Showcase */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">Impact & Achievements</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Card className="h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {achievement.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {achievement.highlight}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills & Expertise */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">Technical Expertise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: index % 2 === 0 ? 1 : -1 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Card className="h-full hover:border-primary/50 transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          {category.icon}
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {category.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ delay: skillIndex * 0.05 + index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge variant="outline" className={`text-xs ${category.colorClass}`}>
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Personal Touch */}
          <motion.div variants={itemVariants} className="text-center">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Beyond the Code</CardTitle>
                <CardDescription>
                  When I&apos;m not building user experiences, you&apos;ll find me exploring these interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="outline" className="flex items-center gap-2 py-2 px-3">
                        {interest.icon}
                        {interest.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="lg" asChild className="gap-2">
                    <a href="/Devon_Hills_Resume_2025_Newest.pdf" download>
                      <Download className="h-5 w-5" />
                      Download Full Resume
                    </a>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}