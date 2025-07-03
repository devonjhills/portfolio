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
  ArrowRight,
  MapPin,
  Briefcase,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  // --- THE FIX IS HERE ---
  // We explicitly tell TypeScript this object is of type 'Variants'
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const highlights = [
    { icon: Users, text: "Millions of Users", subtext: "High-Traffic Apps" },
    {
      icon: CodeXml,
      text: "React & TypeScript",
      subtext: "Modern Architecture",
    },
    {
      icon: ShieldCheck,
      text: "Mission-Critical",
      subtext: "Production Reliability",
    },
    {
      icon: Rocket,
      text: "Quality-Driven",
      subtext: "Automated Testing & CI/CD",
    },
  ];

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden antialiased">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          {/* ====== Left Column: Identity & Details ====== */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              variants={itemVariants}
              className="flex flex-col lg:flex-row items-center gap-8">
              <Avatar className="w-32 h-32 lg:w-40 lg:h-40 border-4 border-primary/30 shadow-lg">
                <AvatarImage src="/avatar.png" alt="Devon Hills" />
                <AvatarFallback className="text-4xl font-semibold bg-primary/10 text-primary">
                  DH
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground">
                  Devon Hills
                </h1>
                <p className="mt-1 text-2xl font-medium text-primary">
                  Full-Stack Software Engineer
                </p>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              I build mission-critical applications serving{" "}
              <span className="font-semibold text-primary/90">
                millions of users
              </span>{" "}
              at HealthCare.gov with{" "}
              <span className="font-semibold text-secondary/90">
                React & TypeScript
              </span>
              . Beyond my professional work, I create full-stack solutions using{" "}
              <span className="font-semibold text-accent/90">
                Next.js, Python, Ruby on Rails
              </span>
              , and modern tools like{" "}
              <span className="font-semibold text-primary/90">
                AI APIs, Docker, and cloud platforms
              </span>
              .
            </motion.p>

            {/* --- Key Strengths Grid --- */}
            <motion.div variants={itemVariants} className="mt-12 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.text}
                    className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
                    <highlight.icon className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-bold text-foreground">
                        {highlight.text}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {highlight.subtext}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ====== Right Column: Action Panel ====== */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:sticky lg:top-24 h-full flex flex-col">
            <div className="w-full h-full rounded-xl border border-border bg-card/50 p-6 shadow-lg backdrop-blur-md flex flex-col justify-between">
              {/* Status Badge */}
              <div className="text-center">
                <Badge className="w-full flex items-center justify-center gap-2 p-4 text-sm font-medium border-teal-500/30 bg-teal-500/10 text-teal-400 rounded-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Available for New Opportunities
                </Badge>
              </div>

              {/* Info Section */}
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Based near Boston, MA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Work Style</p>
                      <p className="text-sm text-muted-foreground">
                        Remote • Hybrid
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full group h-12 font-medium"
                  onClick={() => scrollToSection("projects")}>
                  Explore My Work{" "}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full h-12 font-medium">
                  <a href="/Devon_Hills_Resume_2025_Newest.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </a>
                </Button>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 py-1 text-muted-foreground font-medium tracking-wide">
                      Get in Touch
                    </span>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  {[
                    {
                      icon: Github,
                      href: "https://github.com/devonjhills",
                      label: "GitHub",
                    },
                    {
                      icon: Linkedin,
                      href: "https://linkedin.com/in/devonjhills",
                      label: "LinkedIn",
                    },
                    {
                      icon: Mail,
                      href: "mailto:devonjhills@gmail.com",
                      label: "Email",
                    },
                  ].map(({ icon: Icon, href, label }) => (
                    <Button
                      key={label}
                      asChild
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}>
                        <Icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
