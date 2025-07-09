// Modern Projects Component with 3D Cards & Interactive Effects
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
  techStackLearning: string;
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
    techStackLearning: "Deep dive into Python automation, API integrations, OAuth 2.0 security, and Flask web development. This project enhanced my skills in image processing, AI integration, and building production-ready tools for real business use cases.",
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
    techStackLearning: "Mastered Next.js 15 App Router, TypeScript best practices, Supabase backend integration, and SWR for data fetching. This project strengthened my full-stack development skills and modern React patterns for production applications.",
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
    techStackLearning: "Specialized in SEO optimization, structured data implementation, and government API integration. This project expanded my knowledge in search engine optimization, JSON-LD markup, and building discoverable web applications.",
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
    techStackLearning: "Gained expertise in Ruby on Rails backend development, PostgreSQL database design, JWT authentication, and Rails-React integration. This project broadened my full-stack capabilities beyond JavaScript ecosystems.",
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
    <Card className="bg-card border-2 border-primary/30 shadow-lg hover:shadow-xl transition-shadow group flex h-full flex-col overflow-hidden">
      <CardContent className="flex-1 p-5 flex flex-col">
        {/* Header - Fixed height for alignment */}
        <div className="flex items-start justify-between mb-4 min-h-[3rem]">
          <CardTitle className="text-lg font-semibold leading-tight text-foreground group-hover:text-accent transition-colors flex-1">
            {project.title}
          </CardTitle>
          <div className="flex items-center gap-2 ml-2 flex-shrink-0">
            {project.featured && (
              <Badge className="bg-accent text-accent-foreground text-xs px-2 py-1 shadow-lg hover:shadow-xl transition-shadow border border-accent">
                <Star className="mr-1 h-3 w-3" />
                Featured
              </Badge>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 w-8 p-0 opacity-70 hover:opacity-100 hover:text-accent transition-all">
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        
        {/* Description - Fixed height for alignment */}
        <CardDescription className="text-sm mb-4 leading-relaxed text-muted-foreground min-h-[4.5rem] flex items-start">
          <span className="line-clamp-3">
            {project.description}
          </span>
        </CardDescription>
        
        {/* Tech Stack Learning Section - Fixed height for alignment */}
        <div className="mb-4 p-3 bg-accent/5 rounded-lg border border-accent/10 min-h-[4.5rem] flex flex-col">
          <div className="text-xs font-medium text-accent mb-1 flex items-center gap-1">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Tech Stack Growth
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {project.techStackLearning}
          </p>
        </div>
        
        {/* Technologies - Spacer to push footer to bottom */}
        <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
          <div className="flex flex-wrap gap-1.5 w-full">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="default" className="text-xs px-2.5 py-1 bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 transition-colors">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs px-2.5 py-1 border-accent bg-accent/10 text-accent hover:bg-accent/20">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      {/* Footer - Always at bottom */}
      <CardFooter className="flex gap-3 p-5 pt-0 mt-auto">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2.5 font-semibold transition-all shadow-lg hover:shadow-xl transition-shadow flex-1 inline-flex items-center justify-center rounded-lg">
          <Github className="mr-2 h-4 w-4" /> Code
        </a>
        <button
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-2.5 font-semibold transition-all shadow-lg hover:shadow-xl transition-shadow flex-1 inline-flex items-center justify-center rounded-lg"
          onClick={() => onViewDetails(project)}>
          <Eye className="mr-2 h-4 w-4" /> Details
        </button>
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
      className="relative section-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of my technical expertise and continuous learning across full-stack
              development, API integrations, and modern web technologies. Each project represents
              a deliberate expansion of my technical capabilities.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <Card className="bg-card border-2 border-dashed border-border shadow-md group flex h-full flex-col justify-center items-center text-center overflow-hidden">
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
                    <a
                      href="https://github.com/devonjhills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 font-semibold transition-all shadow-lg hover:shadow-xl transition-shadow inline-flex items-center rounded-lg">
                      <Github className="mr-2 h-4 w-4" />
                      View All Projects
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills Highlight */}
          <motion.div variants={itemVariants} className="w-full">
            <Card className="bg-card">
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
          className="w-[95vw] max-w-4xl max-h-[90vh] p-0 overflow-hidden"
          forceMount>
          {selectedProject && (
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Header */}
              <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b bg-background/95 backdrop-blur flex-shrink-0">
                <DialogTitle className="text-lg sm:text-xl pr-8">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-sm mt-1 sm:mt-2 pr-8">
                  {selectedProject.longDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Main content area - fully scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 space-y-6">
                  {/* Tech Stack Learning Section */}
                  <div className="bg-accent/5 border border-accent/10 rounded-lg p-4">
                    <h3 className="text-base font-semibold mb-2 text-accent flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full"></span>
                      Tech Stack Growth
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.techStackLearning}
                    </p>
                  </div>

                  {/* Image */}
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
                        <Badge className="bg-accent text-accent-foreground border border-accent shadow-lg hover:shadow-xl transition-shadow">
                          <Star className="mr-1 h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                      {selectedProject.liveUrl && (
                        <Badge
                          variant="outline"
                          className="border-accent bg-accent/15 text-accent">
                          Live
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-base font-semibold mb-3">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="default"
                          className="text-sm bg-primary/20 text-primary border border-primary/40">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-base font-semibold mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer with action buttons */}
              <DialogFooter className="p-4 sm:p-6 pt-3 sm:pt-4 bg-muted/30 border-t flex-shrink-0">
                <div className="flex gap-3 w-full sm:w-auto">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold transition-all hover:bg-secondary/80 flex-1 sm:flex-none inline-flex items-center justify-center">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </a>
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-all hover:bg-accent/90 flex-1 sm:flex-none inline-flex items-center justify-center">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
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
