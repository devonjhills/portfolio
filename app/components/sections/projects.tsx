"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const projects = [
  {
    id: 1,
    title: "Etsy Digital Mockup Tools",
    description: "A comprehensive automation suite for digital product creators and Etsy sellers with AI-powered content generation and complete Etsy marketplace integration.",
    longDescription: "This powerful toolkit streamlines the entire workflow from product creation to Etsy listing, featuring advanced Python processing, Flask web interface, and complete OAuth 2.0 + PKCE authentication. Designed for scalability and professional use.",
    technologies: ["Python", "Flask", "Pillow", "MoviePy", "Google Gemini", "Etsy API", "OAuth 2.0"],
    categories: ["Full Stack", "Python"],
    features: [
      "Multi-product support (patterns, clipart, border clipart, journal papers)",
      "Intelligent resizing and quality optimization for each product type",
      "Batch processing for multiple product folders simultaneously", 
      "Professional mockup generation with dynamic color extraction",
      "Complete Etsy integration with OAuth 2.0 + PKCE authentication",
      "AI-powered content generation using Google Gemini",
      "Real-time logging with emoji indicators and progress tracking",
      "Modern Catppuccin-themed web interface"
    ],
    liveUrl: "https://github.com/devonjhills/etsy-digital-mockup-tools",
    githubUrl: "https://github.com/devonjhills/etsy-digital-mockup-tools",
    featured: true,
    metrics: {
      stars: "1",
      size: "220MB",
      impact: "Complete automation"
    }
  },
  {
    id: 2,
    title: "Government Grant Directory",
    description: "SEO-optimized directory for small business and nonprofit grants, sourced from Grants.gov API and designed for maximum discoverability.",
    longDescription: "Built with Next.js and TypeScript, this directory serves entrepreneurs and nonprofits by making funding opportunities easily discoverable. Optimized for search engines and AI parsers with structured data and semantic markup.",
    technologies: ["Next.js", "TypeScript", "Grants.gov API", "JSON-LD", "SEO"],
    categories: ["Full Stack", "Frontend"],
    features: [
      "Grants.gov API integration for live funding data",
      "Semantic HTML structure for optimal SEO",
      "JSON-LD structured data for AI parsing",
      "Mobile-responsive design with accessibility focus",
      "Advanced filtering and search capabilities",
      "Real-time grant opportunity notifications"
    ],
    githubUrl: "https://github.com/devonjhills/government-grant-directory",
    featured: false,
    metrics: {
      grants: "500+",
      categories: "12",
      impact: "SEO optimized"
    }
  }
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section 
      id="projects" 
      ref={ref} 
      className="py-20 bg-muted/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground mb-4">
              Featured <span className="text-catppuccin-pink">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work in full-stack development, automation tools, and government technology solutions.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      {project.featured && (
                        <Badge variant="secondary" className="ml-2">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="mb-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-sm font-semibold">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      
                      {project.liveUrl && (
                        <Button size="sm" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}