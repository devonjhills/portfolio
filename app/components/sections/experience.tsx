"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Target, 
  Download, 
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Timeline } from "../ui/timeline";

// Journey data for timeline - Full Work Experience Details
const journeyData = [
  {
    title: "Present",
    content: (
      <div className="space-y-4">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              Software Engineer III
              <Badge className="bg-accent text-accent-foreground">Current</Badge>
            </CardTitle>
            <div className="space-y-1">
              <CardDescription>Ad Hoc LLC • Remote • Full-time</CardDescription>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Nov. 2021 - Apr. 2025 • 3+ years</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Built and maintained React/TypeScript applications for HealthCare.gov health plan enrollment 
              workflows, serving millions of users during high-traffic enrollment periods.
            </p>
            
            {/* Key Achievements */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Key Achievements
              </h4>
              <ul className="space-y-1">
                {[
                  "Redesigned health plan comparison cards using choice architecture principles based on customer feedback and UX research, improving enrollment completion rates",
                  "Designed and implemented Redux-based state management for dynamic filtering and comparison features, optimizing performance under high loads",
                  "Developed comprehensive accessibility testing infrastructure using axe-core and maintained WCAG/Section 508 compliance for government healthcare applications",
                  "Built automated testing suites with Playwright and React Testing Library, including end-to-end user workflow validation",
                  "Maintained and optimized Jenkins CI/CD pipelines with AWS cloud infrastructure, led Ruby version and critical gem upgrades",
                  "Led technical documentation efforts and established coding standards that improved team velocity and reduced onboarding time",
                  "Participated in on-call rotation using PagerDuty for 24/7 production support during peak enrollment periods"
                ].map((achievement, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Redux", "Ruby on Rails", "PostgreSQL", "AWS", "Jenkins", "Playwright"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs bg-primary/10">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    ),
  },
  {
    title: "2018-2021",
    content: (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Software Engineer</CardTitle>
            <div className="space-y-1">
              <CardDescription>Raytheon Technologies • Tewksbury, MA • Full-time</CardDescription>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Jul. 2018 - Nov. 2021 • 3+ years</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Architected and maintained mission-critical software components using C++, conducting 
              systematic debugging and root cause analysis for complex technical issues.
            </p>
            
            {/* Key Achievements */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Key Achievements
              </h4>
              <ul className="space-y-1">
                {[
                  "Led technical documentation initiatives and mentored junior developers",
                  "Established coding standards that improved team productivity and code quality",
                  "Collaborated in cross-functional Agile/SCRUM teams to deliver high-performance applications on schedule",
                  "Acquired DoD Secret clearance for job duties",
                  "Conducted systematic debugging and root cause analysis for complex technical issues"
                ].map((achievement, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {["C++", "Agile/SCRUM", "Technical Documentation", "Debugging", "Root Cause Analysis"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    ),
  },
  {
    title: "2017",
    content: (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>BS Computer Science</CardTitle>
            <div className="space-y-1">
              <CardDescription>University of Massachusetts Lowell • Lowell, MA • Education</CardDescription>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>2013 - May 2017 • 4 years</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Bachelor of Science in Computer Science with focus on software engineering 
              principles and computer systems.
            </p>
            
            {/* Key Achievements */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Academic Achievements
              </h4>
              <ul className="space-y-1">
                {[
                  "Graduated cum laude with high academic honors",
                  "Achieved Dean's List recognition multiple years",
                  "Strong foundation in algorithms, data structures, and software design",
                  "Coursework in programming languages, databases, and computer architecture"
                ].map((achievement, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Core Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {["Java", "C++", "Python", "SQL", "Data Structures", "Algorithms"].map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    ),
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="experience" ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}>
          
          {/* Professional Journey Timeline */}
          <motion.div variants={itemVariants}>
            <Timeline data={journeyData} />
          </motion.div>

          {/* Download Resume */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Button size="lg" asChild className="gap-2">
              <motion.a
                href="/Devon_Hills_Resume_2025_Newest.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <Download className="h-5 w-5" />
                Download Full Resume
              </motion.a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}