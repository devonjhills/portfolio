// src/components/Contact.tsx
"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Zap,
  Download,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// Data can be kept outside for clarity
const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    label: "Email",
    value: "devonjhills@gmail.com",
    href: "mailto:devonjhills@gmail.com",
    primary: true,
  },
  {
    icon: <Linkedin className="h-6 w-6" />,
    label: "LinkedIn",
    value: "linkedin.com/in/devonjhills",
    href: "https://linkedin.com/in/devonjhills",
    primary: false,
  },
  {
    icon: <Github className="h-6 w-6" />,
    label: "GitHub",
    value: "github.com/devonjhills",
    href: "https://github.com/devonjhills",
    primary: false,
  },
];

const quickFacts = [
  {
    icon: <Zap className="h-5 w-5" />,
    label: "Response Time",
    value: "Within 24 hours",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Location",
    value: "Boston, MA Area",
  },
  {
    icon: <Calendar className="h-5 w-5" />,
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
      className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Let&apos;s Build Something Amazing
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-lg text-muted-foreground">
              Ready to discuss your next project? I&apos;m available for new
              opportunities and collaborative projects.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Contact Card */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
                    Available Now
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  Ready to Start Your Project
                </CardTitle>
                <CardDescription className="text-sm">
                  Experienced React/TypeScript engineer with healthcare domain
                  expertise.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Button className="w-full" asChild>
                    <a href="mailto:devonjhills@gmail.com">
                      <Mail className="mr-2 h-4 w-4" />
                      Get in Touch
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/Devon_Hills_Resume_2025_Newest.pdf" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Connect With Me</CardTitle>
                <CardDescription className="text-sm">
                  Multiple ways to reach out - choose what works best.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {contactInfo.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={
                      contact.href.startsWith("mailto") ? undefined : "_blank"
                    }
                    rel={
                      contact.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group cursor-pointer">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                      {contact.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                        {contact.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {contact.primary && (
                        <Badge variant="secondary" className="text-xs">
                          Preferred
                        </Badge>
                      )}
                      {!contact.href.startsWith("mailto") && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* What I Offer + Quick Details */}
            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">What I Offer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Full-stack React/TypeScript
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Healthcare & compliance
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Ruby on Rails backends
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Technical leadership
                  </div>
                </div>

                <div className="border-t border-border/50 pt-4">
                  <h4 className="font-semibold text-foreground mb-3 text-sm">
                    Quick Details
                  </h4>
                  <div className="space-y-2">
                    {quickFacts.map((fact) => (
                      <div key={fact.label} className="flex items-center gap-2">
                        <div className="p-1 bg-muted rounded text-primary">
                          {fact.icon}
                        </div>
                        <div>
                          <p className="font-medium text-xs">
                            {fact.label}:{" "}
                            <span className="font-normal text-muted-foreground">
                              {fact.value}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Message */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-muted/20 rounded-lg p-6 border border-primary/10">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ready to Build the Future Together?
              </h3>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Whether you&apos;re looking for a senior engineer or technical
                leader, I&apos;m excited to learn about your project and explore
                how we can collaborate.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
