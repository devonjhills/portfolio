"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Star, TrendingUp, Code, Folder, ChevronRight, Eye } from "lucide-react";
import { Card, CardDescription, CardTitle } from "../ui/card";
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
      commits: "50+",
      impact: "Complete automation"
    },
    icon: <Code className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500"
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
      users: "Growing"
    },
    icon: <TrendingUp className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500"
  }
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  // const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
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
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Folder className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                Featured <span className="text-primary">Projects</span>
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A showcase of my recent work in full-stack development, automation tools, 
              and government technology solutions that demonstrate technical excellence and real-world impact.
            </p>
          </motion.div>

          {/* Enhanced Projects Grid */}
          <div className="space-y-8 max-w-6xl mx-auto">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group"
                // onHoverStart={() => setHoveredProject(project.id)}
                // onHoverEnd={() => setHoveredProject(null)}
              >
                <Card className={`cyber-card overflow-hidden transition-all duration-500 ${
                  project.featured 
                    ? 'border-primary/50 shadow-lg shadow-primary/10' 
                    : 'hover:border-primary/30'
                }`}>
                  <div className="grid lg:grid-cols-4 gap-0">
                    
                    {/* Project Icon & Header */}
                    <div className={`relative p-8 bg-gradient-to-br ${project.color} bg-opacity-10 lg:col-span-1`}>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} shadow-lg`}>
                            <div className="text-white">
                              {project.icon}
                            </div>
                          </div>
                          {project.featured && (
                            <Badge className="bg-primary text-primary-foreground border-0">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <CardTitle className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.categories.map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs bg-background/50">
                              {category}
                            </Badge>
                          ))}
                        </div>

                        {/* Quick Metrics */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                          {Object.entries(project.metrics).map(([key, value]) => (
                            <div key={key} className="bg-background/20 rounded-lg p-2">
                              <div className="text-sm font-bold text-foreground">{value}</div>
                              <div className="text-xs text-muted-foreground capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-8 lg:col-span-3">
                      <CardDescription className="text-base leading-relaxed mb-6 text-foreground">
                        {project.longDescription}
                      </CardDescription>

                      {/* Key Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Eye className="h-4 w-4 text-primary" />
                          Key Features
                        </h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {project.features.slice(0, 4).map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ delay: idx * 0.1 + 0.5 }}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <ChevronRight className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Code className="h-4 w-4 text-primary" />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                              transition={{ delay: idx * 0.05 + 0.3 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge 
                                variant="outline" 
                                className="text-xs bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button variant="outline" size="sm" asChild className="group/btn">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                              View Code
                            </a>
                          </Button>
                        </motion.div>
                        
                        {project.liveUrl && (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button size="sm" asChild className="group/btn">
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                Live Demo
                              </a>
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    initial={false}
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View More Projects CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" size="lg" asChild className="group">
                <a
                  href="https://github.com/devonjhills"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View All Projects on GitHub
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}