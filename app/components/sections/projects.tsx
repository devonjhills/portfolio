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
  Folder,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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

// Sub-component for individual project cards for cleanliness
const ProjectCard = ({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: (project: Project) => void;
}) => (
  <Card className="flex h-full flex-col overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
    <CardHeader>
      <div className="mb-4 flex items-center justify-between">
        <Folder className="h-8 w-8 text-primary" />
        {project.featured && (
          <Badge variant="secondary">
            <Star className="mr-1 h-3 w-3" />
            Featured
          </Badge>
        )}
      </div>
      <CardTitle className="text-xl">{project.title}</CardTitle>
      <CardDescription className="flex-grow">
        {project.description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="default">
            {tech}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="mt-auto flex gap-4 pt-6">
      <Button variant="outline" className="w-full" asChild>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          <Github className="mr-2 h-4 w-4" /> Code
        </a>
      </Button>
      <Button className="w-full" onClick={() => onViewDetails(project)}>
        <Eye className="mr-2 h-4 w-4" /> View Details
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
      className="relative bg-background py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-16">
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Featured Projects
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              A selection of my work, demonstrating technical skill and a
              passion for creating impactful software.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard
                  project={project}
                  onViewDetails={setSelectedProject}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA to GitHub */}
          <motion.div variants={itemVariants}>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/devonjhills"
                target="_blank"
                rel="noopener noreferrer">
                View All Projects on GitHub{" "}
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Details Sheet */}
      <Sheet
        open={!!selectedProject}
        onOpenChange={(isOpen) => !isOpen && setSelectedProject(null)}>
        <SheetContent className="flex w-full flex-col p-0 sm:max-w-3xl">
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
