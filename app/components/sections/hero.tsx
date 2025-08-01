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
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { DotBackground } from "../ui/grid-background";
import { Spotlight } from "../ui/spotlight";

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
      className="relative bg-background min-h-screen flex items-center py-12 lg:py-20"
    >
      <DotBackground className="absolute inset-0 z-0">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
      </DotBackground>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto"
        >
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8 lg:pr-8">
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative p-1 group inline-block">
                <div className="absolute inset-0 rounded-full bg-primary/60 group-hover:bg-primary/90 transition-colors duration-500 animate-slow-spin group-hover:animate-pulse-soft"></div>
                <div className="relative bg-background/60 rounded-full p-1 backdrop-blur-sm">
                  <Avatar className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 border-4 border-transparent transition-all duration-300 group-hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.2)]">
                    <AvatarImage src="/avatar.png" alt="Devon Hills" />
                    <AvatarFallback className="text-4xl font-bold bg-primary/20 text-primary">
                      DH
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-6 text-primary"
            >
              Devon Hills
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Senior Software Engineer with 7+ years building mission-critical
              applications serving millions of users. Expert in React/TypeScript
              for HealthCare.gov and government systems with proven 24/7
              production reliability.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="lg:px-8 lg:py-6 lg:text-lg"
                onClick={() => scrollToSection("experience")}
              >
                <Eye className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                Explore My Work
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="lg:px-8 lg:py-6 lg:text-lg"
              >
                <a href="/Devon_Hills_Resume_2025_Newest.pdf" download>
                  <Download className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Highlights & Contact */}
          <div className="space-y-8">
            {/* Highlights Grid */}
            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-heading font-bold text-primary mb-4">
                Core Expertise
              </h2>
              <div className="grid gap-4">
                {highlights.map((highlight) => (
                  <motion.div key={highlight.text} variants={itemVariants}>
                    <Card className="group">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div>
                            <highlight.icon className="h-6 w-6 text-secondary group-hover:text-accent transition-colors duration-300" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground text-base transition-colors duration-300 group-hover:text-secondary">
                              {highlight.text}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {highlight.subtext}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 bg-card/40 backdrop-blur-md shadow-xl border border-border/50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-heading font-bold text-secondary">
                Let&apos;s Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Proven track record building user-centric applications at scale.
                Ready to bring my healthcare technology expertise to your team.
              </p>
              <div className="flex justify-center lg:justify-start">
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
