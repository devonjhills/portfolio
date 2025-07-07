// src/components/Projects.tsx
"use client";

import React, { useRef, useState, useMemo, useCallback } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Star,
  ChevronRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

// Define a type for your project for better type safety
type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
  image: string; // Added image property
};

// Data array with updated image paths
const projects: Project[] = [
  {
    id: 1,
    title: "Etsy Digital Mockup Tools",
    description:
      "An automation suite for Etsy sellers with AI content generation and full marketplace integration.",
    longDescription:
      "This powerful toolkit streamlines the entire workflow from product creation to Etsy listing, featuring advanced Python processing, Flask web interface, and complete OAuth 2.0 + PKCE authentication. Designed for scalability and professional use.",
    technologies: [
      "Python",
      "Flask",
      "Pillow",
      "Google Gemini API",
      "Etsy API",
      "OAuth 2.0",
      "Docker",
    ],
    features: [
      "Multi-product support (patterns, clipart, etc.)",
      "Intelligent resizing and quality optimization",
      "Batch processing for multiple folders",
      "Professional mockup generation with dynamic color extraction",
      "Complete Etsy integration with OAuth 2.0 + PKCE",
      "AI-powered content generation for titles & tags",
      "Real-time logging with a modern web interface",
    ],
    githubUrl: "https://github.com/devonjhills/etsy-digital-mockup-tools",
    featured: true,
    image: "/projects/mockup-tools.png",
  },
  {
    id: 2,
    title: "What To Watch? - Movie & TV Discovery App",
    description:
      "A modern, full-stack movie and TV discovery platform with user authentication and personal watchlists.",
    longDescription:
      "A production-ready, responsive movie and TV discovery platform built with Next.js 15, TypeScript, and Supabase. Features comprehensive search, user authentication, dark/light mode, and personal watchlist management. Demonstrates modern React patterns, full-stack development, and responsive design principles.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "SWR",
      "TMDB API",
      "Framer Motion",
    ],
    features: [
      "Full-stack authentication with Supabase Auth",
      "Personal watchlist with real-time updates",
      "Advanced search across movies, TV shows, and people",
      "Dark/light mode with system preference detection",
      "Responsive design with mobile-first approach",
      "Performance optimized with SWR caching",
      "SEO optimization with dynamic meta tags",
      "WCAG compliant accessibility features",
    ],
    liveUrl: "https://movie-search-app-rho-ten.vercel.app/",
    githubUrl: "https://github.com/devonjhills/movie-search-app",
    featured: false,
    image: "/projects/movieapp.png",
  },
  {
    id: 3,
    title: "Government Grant Directory",
    description:
      "An SEO-optimized directory for small business and nonprofit grants, sourced from the Grants.gov API.",
    longDescription:
      "Built with Next.js and TypeScript, this directory serves entrepreneurs and nonprofits by making funding opportunities easily discoverable. Optimized for search engines and AI parsers with structured data and semantic markup.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Grants.gov API",
      "JSON-LD",
      "SEO",
    ],
    features: [
      "Live funding data from Grants.gov API",
      "Semantic HTML for optimal SEO performance",
      "JSON-LD structured data for rich snippets",
      "Fully responsive and accessible design",
      "Advanced filtering and search capabilities",
      "Automated sitemap generation for indexing",
      "Hosted on Vercel for high performance",
    ],
    githubUrl: "https://github.com/devonjhills/government-grant-directory",
    featured: false,
    image: "/projects/grants.png",
  },
  {
    id: 4,
    title: "Ruby Book Collection Manager",
    description:
      "A full-stack web application for managing personal book collections with real-time Rails processing visualization.",
    longDescription:
      "Built with Ruby on Rails backend and React frontend, this application allows users to track their reading progress, add ratings and notes, and search for books via the Open Library API. Features a unique educational component showing Rails backend processing in real-time for learning purposes.",
    technologies: [
      "Ruby on Rails",
      "React",
      "PostgreSQL",
      "JWT",
      "Open Library API",
      "Tailwind CSS",
      "Vite",
    ],
    features: [
      "Complete book management with reading status tracking",
      "Smart search integration with Open Library API",
      "JWT-based secure authentication system",
      "Real-time Rails processing visualization for education",
      "Rating and personal notes system",
      "Responsive design with Tailwind CSS",
      "Full CRUD operations for book management",
      "Demo account with sample data",
    ],
    githubUrl: "https://github.com/devonjhills/ruby-book-wishlist",
    featured: false,
    image: "/projects/ruby-book.png",
  },
];

// Animation Variants (correctly typed)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// Project card component
const ProjectCard = React.memo(
  ({
    project,
    onViewDetails,
  }: {
    project: Project;
    onViewDetails: (project: Project) => void;
  }) => (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="flex-1 p-4">
        <div className="flex items-start justify-between mb-3">
          <CardTitle className="text-lg font-semibold leading-tight">
            {project.title}
          </CardTitle>
          <div className="flex items-center gap-2 ml-2">
            {project.featured && (
              <Badge className="bg-primary/90 text-primary-foreground text-xs px-2 py-1">
                <Star className="mr-1 h-3 w-3" />
                Featured
              </Badge>
            )}
            {project.liveUrl && (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 opacity-70 hover:opacity-100"
                asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        <CardDescription className="text-sm mb-3 leading-relaxed line-clamp-2">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="default" className="text-xs px-2 py-1">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" /> Code
          </a>
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails(project)}>
          <Eye className="mr-2 h-4 w-4" /> Details
        </Button>
      </CardFooter>
    </Card>
  )
);

ProjectCard.displayName = "ProjectCard";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleViewDetails = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleDialogClose = useCallback((isOpen: boolean) => {
    if (!isOpen) setSelectedProject(null);
  }, []);

  const uniqueTechnologies = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(),
    []
  );

  return (
    <section
      id="projects"
      ref={ref}
      className="relative section-secondary py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Projects
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg leading-8 text-muted-foreground">
              A showcase of my technical expertise across full-stack
              development, API integrations, and modern web technologies.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard
                    project={project}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))}

              {/* More to Come Card */}
              <motion.div variants={itemVariants}>
                <Card className="group flex h-full flex-col justify-center items-center text-center overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 border-dashed border-2">
                  <CardContent className="flex-1 p-6 flex flex-col justify-center items-center">
                    <div className="mb-4 p-4 bg-primary/10 rounded-full">
                      <Github className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold mb-3">
                      More Projects Coming Soon
                    </CardTitle>
                    <CardDescription className="text-sm mb-4 leading-relaxed">
                      I&apos;m always working on new projects and exploring
                      cutting-edge technologies. Check out my GitHub for the
                      latest updates!
                    </CardDescription>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                      asChild>
                      <a
                        href="https://github.com/devonjhills"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View All Projects
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills Highlight */}
          <motion.div variants={itemVariants} className="w-full">
            <Card className="bg-muted/30 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Technologies used in my projects
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {uniqueTechnologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={handleDialogClose}>
        <DialogContent
          className="!w-full !max-w-none sm:!max-w-7xl !h-[95vh] p-0 overflow-hidden"
          forceMount>
          {selectedProject && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b bg-background/95 backdrop-blur">
                <DialogTitle className="text-xl sm:text-2xl pr-8">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base mt-1 sm:mt-2 pr-8">
                  {selectedProject.longDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Main content area - optimized for space */}
              <div className="flex-1 overflow-y-auto">
                {/* Mobile layout: stacked vertically */}
                <div className="block lg:hidden">
                  <div className="p-4 space-y-6">
                    {/* Mobile: Large image at top */}
                    <div className="space-y-3">
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border shadow-lg">
                        <Image
                          src={selectedProject.image}
                          alt={`${selectedProject.title} screenshot`}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>

                      {/* Project status badges */}
                      <div className="flex gap-2">
                        {selectedProject.featured && (
                          <Badge className="bg-primary/90 text-primary-foreground">
                            <Star className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                        {selectedProject.liveUrl && (
                          <Badge
                            variant="outline"
                            className="border-green-500 text-green-600">
                            Live
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Mobile: Technologies */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="default"
                            className="text-sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Mobile: Features */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Key Features
                      </h3>
                      <ul className="space-y-3">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Desktop layout: two columns with larger image */}
                <div className="hidden lg:block">
                  <div className="p-6 h-full">
                    <div className="grid grid-cols-3 gap-8 h-full">
                      {/* Left column: Larger project image (2/3 width) */}
                      <div className="col-span-2 space-y-4">
                        <div
                          className="relative w-full overflow-hidden rounded-lg border shadow-lg"
                          style={{ aspectRatio: "16/10" }}>
                          <Image
                            src={selectedProject.image}
                            alt={`${selectedProject.title} screenshot`}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>

                        {/* Project status badges */}
                        <div className="flex gap-2">
                          {selectedProject.featured && (
                            <Badge className="bg-primary/90 text-primary-foreground">
                              <Star className="mr-1 h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                          {selectedProject.liveUrl && (
                            <Badge
                              variant="outline"
                              className="border-green-500 text-green-600">
                              Live
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Right column: Details (1/3 width) */}
                      <div className="col-span-1 space-y-6 overflow-y-auto">
                        {/* Technologies */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="default"
                                className="text-sm">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Key Features
                          </h3>
                          <ul className="space-y-3">
                            {selectedProject.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer with action buttons */}
              <DialogFooter className="p-4 sm:p-6 pt-3 sm:pt-4 bg-muted/30 border-t">
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button variant="outline" size="lg" asChild>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none">
                      <Github className="mr-2 h-4 w-4" /> View Code
                    </a>
                  </Button>
                  {selectedProject.liveUrl && (
                    <Button size="lg" asChild>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
