"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Timeline } from "../ui/timeline";
import { journeyData, type JourneyItem } from "../../lib/experience-data";

// Sub-component for the content of each timeline item
const JourneyCard = React.memo(({ item }: { item: JourneyItem }) => (
  <Card
    className={`w-full transition-colors duration-300 ${
      item.date === "2025 - Present"
        ? "bg-secondary/10 border border-secondary/50"
        : "bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
    }`}
  >
    <CardHeader>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
          <CardDescription className="mt-1 font-medium">
            {item.company} • {item.location}
          </CardDescription>
          <CardDescription className="mt-1 text-xs opacity-80">
            {item.duration}
          </CardDescription>
        </div>
        {item.date === "2025 - Present" && (
          <Badge variant="default">Current</Badge>
        )}
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-muted-foreground">{item.description}</p>

      {item.achievements.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2 text-primary">
            {item.icon} Key Achievements
          </h4>
          <ul className="space-y-3 pl-2">
            {item.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-secondary transition-colors duration-300 group-hover:text-accent" />
                <span className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.technologies.length > 0 && (
        <div>
          <h4 className="font-semibold mb-3 text-primary">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="cursor-default">
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
    [],
  );

  return (
    <section
      id="experience"
      ref={ref}
      className="relative bg-background py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Professional Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From academic excellence to mission-critical software engineering
              - a progression of technical leadership, innovation, and impactful
              contributions across healthcare technology and defense systems.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="relative">
            <Timeline data={timelineItems} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
