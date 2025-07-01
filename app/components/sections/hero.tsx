"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { ShootingStarsHero } from "../ui/shooting-stars-hero";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ShootingStarsHero className="min-h-screen w-full flex md:items-center md:justify-center bg-background antialiased overflow-hidden">
      <div className="p-4 max-w-7xl mx-auto w-full pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground mb-4">
            Hi, I&apos;m <span className="text-primary">Devon Hills</span>
          </h1>
          
          <p className="mt-4 font-normal text-base text-muted-foreground max-w-lg text-center mx-auto mb-8">
            Software Engineer III with 7+ years building mission-critical React/TypeScript applications for HealthCare.gov, serving millions of users. Expert in accessibility, performance optimization, and production support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              onClick={() => scrollToSection("projects")}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.button>

            <motion.a
              href="/Devon_Hills_Resume_2025_Newest.pdf"
              download
              className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold text-lg hover:bg-accent transition-all flex items-center gap-2 justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="h-5 w-5" />
              Resume
            </motion.a>
          </div>

          <div className="flex justify-center gap-4">
            <motion.a
              href="https://github.com/devonjhills"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-border text-foreground hover:bg-accent hover:border-primary rounded-lg transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/devonjhills"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-border text-foreground hover:bg-accent hover:border-primary rounded-lg transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>

            <motion.a
              href="mailto:devonjhills@gmail.com"
              className="p-3 border border-border text-foreground hover:bg-accent hover:border-primary rounded-lg transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </ShootingStarsHero>
  );
}