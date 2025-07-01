"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

const experiences = [
  {
    id: 1,
    title: "Software Engineer III",
    company: "Ad Hoc LLC",
    location: "Remote",
    type: "Full-time",
    period: "Nov. 2021 - Apr. 2025",
    duration: "3+ years",
    description:
      "Built and maintained React/TypeScript applications for HealthCare.gov health plan enrollment workflows, serving millions of users during high-traffic enrollment periods.",
    achievements: [
      "Redesigned health plan comparison cards using choice architecture principles based on customer feedback and UX research, improving enrollment completion rates",
      "Designed and implemented Redux-based state management for dynamic filtering and comparison features, optimizing performance under high loads",
      "Developed comprehensive accessibility testing infrastructure using axe-core and maintained WCAG/Section 508 compliance for government healthcare applications",
      "Built automated testing suites with Playwright and React Testing Library, including end-to-end user workflow validation",
      "Maintained and optimized Jenkins CI/CD pipelines with AWS cloud infrastructure, led Ruby version and critical gem upgrades",
      "Led technical documentation efforts and established coding standards that improved team velocity and reduced onboarding time",
      "Participated in on-call rotation using PagerDuty for 24/7 production support during peak enrollment periods",
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
    current: true,
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Raytheon Technologies",
    location: "Tewksbury, MA",
    type: "Full-time",
    period: "Jul. 2018 - Nov. 2021",
    duration: "3+ years",
    description:
      "Architected and maintained mission-critical software components using C++, conducting systematic debugging and root cause analysis for complex technical issues.",
    achievements: [
      "Led technical documentation initiatives and mentored junior developers",
      "Established coding standards that improved team productivity and code quality",
      "Collaborated in cross-functional Agile/SCRUM teams to deliver high-performance applications on schedule",
      "Acquired DoD Secret clearance for job duties",
      "Conducted systematic debugging and root cause analysis for complex technical issues",
    ],
    technologies: [
      "C++",
      "Agile/SCRUM",
      "Technical Documentation",
      "Debugging",
      "Root Cause Analysis",
    ],
    current: false,
  },
  {
    id: 3,
    title: "BS Computer Science",
    company: "University of Massachusetts Lowell",
    location: "Lowell, MA",
    type: "Education",
    period: "2013 - May 2017",
    duration: "4 years",
    description:
      "Bachelor of Science in Computer Science with focus on software engineering principles and computer systems.",
    achievements: [
      "Graduated cum laude with high academic honors",
      "Achieved Dean's List recognition multiple years",
      "Strong foundation in algorithms, data structures, and software design",
      "Coursework in programming languages, databases, and computer architecture",
    ],
    technologies: [
      "Java",
      "C++",
      "Python",
      "SQL",
      "Data Structures",
      "Algorithms",
    ],
    current: false,
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
    <section id="experience" ref={ref} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}>
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Work <span className="text-primary">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey showcasing growth, impact, and continuous
              learning in software development.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-px"></div>

            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full border-4 border-background transform -translate-x-1/2 md:translate-x-0">
                    {experience.current && (
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping"></div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-5/12 ${
                      index % 2 === 0
                        ? "md:mr-auto md:pr-8"
                        : "md:ml-auto md:pl-8"
                    }`}>
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.01 }}>
                      <Card className="hover:border-primary/50 transition-colors">
                        {/* Current Badge */}
                        {experience.current && (
                          <div className="absolute -top-2 -right-2 z-10">
                            <Badge className="bg-accent text-accent-foreground">
                              Current
                            </Badge>
                          </div>
                        )}

                        <CardHeader className="pb-3">
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {experience.title}
                          </CardTitle>
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">
                                {experience.company}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {experience.location}
                              </span>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">
                                {experience.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{experience.period}</span>
                              <span>•</span>
                              <span>{experience.duration}</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Description */}
                          <p className="text-muted-foreground">
                            {experience.description}
                          </p>

                          {/* Achievements */}
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Award className="h-4 w-4 text-primary" />
                              Key Achievements
                            </h4>
                            <ul className="space-y-1">
                              {experience.achievements.map((achievement, i) => (
                                <li
                                  key={i}
                                  className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="font-semibold mb-2 text-sm">
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Download Resume */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Button size="lg" asChild className="gap-2">
              <motion.a
                href="/Devon_Hills_Resume_2025_Newest.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <Calendar className="h-5 w-5" />
                Download Full Resume
              </motion.a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
