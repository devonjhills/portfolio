// src/components/Contact.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Mail, Github, Linkedin, Zap, Coffee, Code2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

// Data can be kept outside for clarity
const quickFacts = [
  {
    icon: <Zap className="h-5 w-5" />,
    label: "Response Time",
    value: "< 24 hours",
  },
  {
    icon: <Coffee className="h-5 w-5" />,
    label: "Timezone",
    value: "EST (UTC-5)",
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    label: "Availability",
    value: "Full-time & Contract",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Correctly typed animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-background py-24 px-4 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-12 text-center">
          {/* Section Header */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
              Ready to turn your ideas into reality? I&apos;m currently
              available for new opportunities and would love to hear from you.
            </p>
          </motion.div>

          {/* Main Contact Card */}
          <motion.div variants={itemVariants} className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  The best way to reach me is by email. Feel free to connect on
                  other platforms as well.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg" asChild className="w-full sm:w-auto">
                    <a href="mailto:devonjhills@gmail.com">
                      <Mail className="mr-2 h-5 w-5" /> Email me
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto">
                    <a
                      href="https://linkedin.com/in/devonjhills"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto">
                    <a
                      href="https://github.com/devonjhills"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" /> GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-4 pt-6 border-t border-border/50">
                <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:justify-between">
                  {quickFacts.map((fact) => (
                    <div key={fact.label} className="flex items-center gap-3">
                      <div className="text-primary">{fact.icon}</div>
                      <div>
                        <p className="font-semibold text-left">{fact.label}</p>
                        <p className="text-sm text-muted-foreground text-left">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
