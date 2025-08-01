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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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
    value: "Lowell, MA (Remote Ready)",
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
      className="relative bg-background overflow-hidden py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Ready to Hire a Proven Engineer?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              7+ years building mission-critical applications for millions of
              users. Available for your next role - let&apos;s build something
              great together.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Primary Contact Card */}
            <Card className="bg-card/40 backdrop-blur-md shadow-xl border border-secondary/40">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="default" className="animate-pulse-soft">
                    Available Now
                  </Badge>
                </div>
                <CardTitle className="text-lg text-secondary">
                  Hire an Expert Engineer
                </CardTitle>
                <CardDescription className="text-sm">
                  HealthCare.gov engineer with proven track record serving
                  millions of users. Ready to start immediately.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="shadow-lg w-full">
                    <a href="mailto:devonjhills@gmail.com">
                      <Mail className="mr-2 h-4 w-4" />
                      Schedule Interview
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
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
                <CardTitle className="text-lg text-secondary">
                  Connect With Me
                </CardTitle>
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
                    className="flex items-center gap-3 p-4 rounded-lg border border-border/50 transition-all duration-300 cursor-pointer hover:bg-muted/30 hover:shadow-[0_0_0_2px_hsl(var(--primary)/0.3)] group"
                  >
                    <div className="p-2 rounded-lg text-accent transition-colors duration-300 bg-accent/10 group-hover:bg-accent/20">
                      {contact.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground group-hover:text-accent transition-colors">
                        {contact.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.value}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!contact.href.startsWith("mailto") && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-accent transition-colors" />
                      )}
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* What I Offer + Quick Details */}
            <Card className="bg-card/40 backdrop-blur-md shadow-xl border border-border/50 md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-secondary">
                  What I Offer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full transition-colors duration-300 bg-primary group-hover:bg-accent"></div>
                    Full-stack React/TypeScript
                  </div>
                  <div className="flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full transition-colors duration-300 bg-primary group-hover:bg-accent"></div>
                    Healthcare & compliance
                  </div>
                  <div className="flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full transition-colors duration-300 bg-primary group-hover:bg-accent"></div>
                    Ruby on Rails backends
                  </div>
                  <div className="flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full transition-colors duration-300 bg-primary group-hover:bg-accent"></div>
                    Technical leadership
                  </div>
                </div>

                <div className="border-t border-border/50 pt-4">
                  <h4 className="font-semibold text-secondary mb-3 text-sm">
                    Quick Details
                  </h4>
                  <div className="space-y-2">
                    {quickFacts.map((fact) => (
                      <div key={fact.label} className="flex items-center gap-2">
                        <div className="p-1 rounded text-accent bg-accent/10">
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
            <div className="bg-card/40 backdrop-blur-md shadow-xl border border-border/50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-secondary mb-3">
                Why Choose Me for Your Team?
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Proven experience with HealthCare.gov scale, accessibility
                compliance, and 24/7 production support. Ready to deliver
                results from day one.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
