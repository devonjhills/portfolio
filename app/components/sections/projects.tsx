// src/components/Projects.tsx
"use client";

import { useRef, useState } from "react";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";

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
const ProjectCard = ({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: (project: Project) => void;
}) => (
  <Card className="group flex h-full flex-col overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
    <div className="relative aspect-video overflow-hidden bg-muted/30">
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        className="object-cover transition-transform group-hover:scale-105"
      />
      {project.featured && (
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
          <Star className="mr-1 h-3 w-3" />
          Featured
        </Badge>
      )}
      {project.liveUrl && (
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          asChild>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
    <CardContent className="flex-1 p-6">
      <CardTitle className="text-xl mb-3">{project.title}</CardTitle>
      <CardDescription className="text-base mb-4 leading-relaxed">
        {project.description}
      </CardDescription>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="flex gap-3 p-6 pt-0">
      <Button variant="outline" className="flex-1" asChild>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" /> Code
        </a>
      </Button>
      <Button className="flex-1" onClick={() => onViewDetails(project)}>
        <Eye className="mr-2 h-4 w-4" /> Details
      </Button>
    </CardFooter>
  </Card>
);

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-background py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard
                    project={project}
                    onViewDetails={setSelectedProject}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Highlight */}
          <motion.div variants={itemVariants} className="w-full">
            <Card className="bg-muted/30 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Technologies & Frameworks I Work With
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {Array.from(new Set(projects.flatMap((p) => p.technologies)))
                    .sort()
                    .map((tech) => (
                      <Badge key={tech} variant="outline" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                </div>
                <div className="mt-6">
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="https://github.com/devonjhills"
                      target="_blank"
                      rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View All Projects on GitHub
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Details Sheet */}
      <Sheet
        open={!!selectedProject}
        onOpenChange={(isOpen) => !isOpen && setSelectedProject(null)}>
        <SheetContent className="flex w-full flex-col p-0 sm:max-w-2xl">
          {selectedProject && (
            <>
              <SheetHeader className="p-6">
                <SheetTitle className="text-3xl">
                  {selectedProject.title}
                </SheetTitle>
                <SheetDescription className="text-base">
                  {selectedProject.longDescription}
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="flex-1">
                <div className="space-y-8 px-6 pb-6">
                  {/* Image */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <Image
                      src={selectedProject.image}
                      alt={`${selectedProject.title} screenshot`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Features */}
                  <div>
                    <h3 className="mb-4 text-xl font-semibold">Key Features</h3>
                    <ul className="space-y-3">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollArea>
              <SheetFooter className="p-6 pt-4 bg-muted/50">
                <Button variant="outline" asChild>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </a>
                </Button>
                {selectedProject.liveUrl && (
                  <Button asChild>
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
