// src/components/Hero.tsx
"use client";

import { motion, Variants } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Rocket,
  ShieldCheck,
  CodeXml,
  Users,
  Eye,
} from "lucide-react";
import { FloatingDock } from "../ui/floating-dock";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const highlights = [
    {
      icon: Users,
      text: "HealthCare.gov Impact",
      subtext: "Serving millions during high-traffic enrollment periods",
    },
    {
      icon: ShieldCheck,
      text: "Accessibility Excellence",
      subtext: "WCAG/Section 508 compliance for government applications",
    },
    {
      icon: CodeXml,
      text: "React/TypeScript Expert",
      subtext: "7+ years building scalable frontend systems",
    },
    {
      icon: Rocket,
      text: "24/7 Production Support",
      subtext: "Critical incident response & system reliability",
    },
  ];

  return (
    <section
      id="home"
      className="relative section-primary min-h-[calc(100vh)] flex items-center">
      <div className="mx-auto max-w-7xl w-full py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Column - Avatar & Headline */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start">
              <Badge
                variant="outline"
                className="px-4 py-2 border-primary/50 text-primary font-semibold rounded-full shadow-sm">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Open to New Opportunities
              </Badge>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start">
              <div className="relative p-1 group inline-block">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary/70 opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-slow-spin"></div>
                <div className="relative bg-background/60 rounded-full p-1">
                  <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-transparent">
                    <AvatarImage src="/avatar.png" alt="Devon Hills" />
                    <AvatarFallback className="text-4xl font-bold bg-primary/10 text-primary">
                      DH
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Devon Hills
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg leading-8 text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Senior Software Engineer with 7+ years building mission-critical
              applications serving millions of users. Expert in React/TypeScript
              for HealthCare.gov and government systems with proven 24/7
              production reliability.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-8 font-medium"
                onClick={() => scrollToSection("experience")}>
                <Eye className="mr-2 h-4 w-4" />
                Explore My Work
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto h-12 px-8 font-medium">
                <a href="/Devon_Hills_Resume_2025_Newest.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Highlights & Contact */}
          <div className="lg:w-1/2 space-y-10">
            {/* Highlights Grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Core Expertise
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {highlights.map((highlight) => (
                  <motion.div
                    key={highlight.text}
                    variants={itemVariants}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary/3 transition-colors duration-300">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <highlight.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        {highlight.text}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {highlight.subtext}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Let&apos;s Connect
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Proven track record building user-centric applications at scale.
                Ready to bring my healthcare technology expertise and full-stack
                capabilities to your team.
              </p>
              <div className="flex justify-center lg:justify-start pt-2">
                <FloatingDock
                  items={[
                    {
                      title: "Email",
                      icon: <Mail className="h-4 w-4" />,
                      href: "mailto:devonjhills@gmail.com",
                    },
                    {
                      title: "GitHub",
                      icon: <Github className="h-4 w-4" />,
                      href: "https://github.com/devonjhills",
                    },
                    {
                      title: "LinkedIn",
                      icon: <Linkedin className="h-4 w-4" />,
                      href: "https://linkedin.com/in/devonjhills",
                    },
                  ]}
                  desktopClassName=""
                  mobileClassName=""
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
