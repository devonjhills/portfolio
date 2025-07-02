// src/components/Hero.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants for the container and its children
  const containerVariants: Variants = {
    // <--- 2. Add the Variants type
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    // <--- 2. Add the Variants type
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background antialiased">
      {/* Background: Subtle dot pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]"></div>

      {/* Background: Gradient for visual depth */}
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/20 via-accent/10 to-transparent"></div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center">
          {/* Profile Avatar */}
          <motion.div variants={itemVariants}>
            <Avatar className="w-32 h-32 mb-8 border-4 border-primary/30 shadow-2xl shadow-primary/20 ring-4 ring-primary/10">
              <AvatarImage
                src="/avatar.png"
                alt="Devon Hills"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                DH
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-6 cursor-default border-primary/30 bg-card/50 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm hover:border-primary/50">
              <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-secondary"></div>
              Available for New Opportunities
            </Badge>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
              Devon Hills
            </h1>
            <div className="text-2xl font-medium text-primary md:text-3xl lg:text-4xl">
              Full-Stack Software Engineer
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
            I build mission-critical applications serving{" "}
            <span className="font-semibold text-primary">
              millions of users
            </span>{" "}
            at HealthCare.gov. Passionate about creating exceptional user
            experiences with{" "}
            <span className="font-semibold text-secondary">
              React, TypeScript
            </span>
            , and modern web technologies.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
            {[
              { text: "Millions of Users", subtext: "High-Traffic Apps" },
              { text: "React & TypeScript", subtext: "Architecture" },
              { text: "Mission-Critical", subtext: "Production Support" },
              { text: "Quality-Driven", subtext: "Automated Testing" },
            ].map((highlight) => (
              <div
                key={highlight.text}
                className="flex flex-col items-center rounded-lg border border-primary/20 bg-card/50 px-4 py-3 backdrop-blur-sm">
                <div className="text-lg font-bold text-primary">
                  {highlight.text}
                </div>
                <div className="text-xs text-muted-foreground">
                  {highlight.subtext}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection("projects")}>
              🚀 Explore My Work
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto">
              <a href="/Devon_Hills_Resume_2025_Newest.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Get Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection("contact")}>
              💬 Let&apos;s Talk
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex justify-center gap-4">
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
              <Button key={label} asChild variant="ghost" size="icon">
                <a
                  href={href}
                  {...(href.includes("mailto")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={label}>
                  <Icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
