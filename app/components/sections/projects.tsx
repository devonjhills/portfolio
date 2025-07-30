"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  ExternalLink,
  Github,
  Star,
  Loader2,
  RefreshCw,
  AlertCircle,
  GitFork,
  Calendar,
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
import { useGitHubRepos, GitHubProject } from "../../lib/use-github-repos";

// GitHub-style Languages Component
const LanguagesBar = ({ languageStats }: { languageStats: { name: string; percentage: number; color: string }[] }) => {
  if (!languageStats || languageStats.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {/* Language Bar */}
      <div className="flex h-2 rounded-full overflow-hidden bg-muted">
        {languageStats.map((lang) => (
          <div
            key={lang.name}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
          />
        ))}
      </div>
      
      {/* Language Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {languageStats.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-foreground font-medium">
              {lang.name}
            </span>
            <span className="text-muted-foreground">
              {lang.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);
  const diffTime = Math.abs(now.getTime() - past.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
  return `${Math.ceil(diffDays / 365)} years ago`;
};

// Animation Variants
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

// Project Card Component
const ProjectCard = React.memo(({ project }: { project: GitHubProject }) => (
  <Card className="project-card group flex flex-col h-full">
    <CardContent className="p-6 flex-1 flex flex-col">
      {/* Header - Fixed height */}
      <div className="flex items-start justify-between mb-3 min-h-[3rem]">
        <CardTitle className="project-title line-clamp-2 flex-1">
          {project.title}
        </CardTitle>
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          {project.stars > 0 && (
            <Badge variant="outline" className="text-xs">
              <Star className="w-3 h-3 mr-1 text-yellow-500" />
              {project.stars}
            </Badge>
          )}
          {project.forks > 0 && (
            <Badge variant="outline" className="text-xs">
              <GitFork className="w-3 h-3 mr-1 text-blue-500" />
              {project.forks}
            </Badge>
          )}
        </div>
      </div>

      {/* Description - Fixed height */}
      <CardDescription className="project-description mb-4 min-h-[3rem] line-clamp-3">
        {project.description}
      </CardDescription>

      {/* Metadata - Fixed height */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 min-h-[1.25rem]">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {getTimeAgo(project.pushed_at)}
        </span>
        {project.primaryLanguage && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            {project.primaryLanguage}
          </span>
        )}
      </div>

      {/* Topics - Fixed height container */}
      <div className="mb-4 min-h-[2rem] flex items-start">
        {project.topics.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {project.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
            {project.topics.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.topics.length - 3}
              </Badge>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* Languages - GitHub style with color bar */}
      <div className="flex-1 flex flex-col justify-end">
        {project.languageStats && project.languageStats.length > 0 ? (
          <LanguagesBar languageStats={project.languageStats} />
        ) : (
          <div className="flex flex-wrap gap-1">
            {project.languages.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="badge-tech text-xs">
                {tech}
              </Badge>
            ))}
            {project.languages.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.languages.length - 4}
              </Badge>
            )}
          </div>
        )}
      </div>
    </CardContent>

    {/* Footer with Action Buttons - Always at bottom */}
    <CardFooter className="flex gap-3 p-6 pt-0">
      <Button
        asChild
        variant="secondary"
        size="sm"
        className="flex-1 bg-background border border-border hover:bg-muted text-foreground">
        <a href={project.html_url} target="_blank" rel="noopener noreferrer">
          <Github className="w-4 h-4 mr-2" />
          Code
        </a>
      </Button>

      {project.homepage && (
        <Button asChild size="sm" className="flex-1">
          <a href={project.homepage} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live
          </a>
        </Button>
      )}
    </CardFooter>
  </Card>
));

ProjectCard.displayName = "ProjectCard";

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { projects, loading, error, refetch } = useGitHubRepos();


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
            <h2 className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-6">
              Recent Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              My latest development work, automatically updated from{" "}
              <a
                href="https://github.com/devonjhills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
                GitHub
              </a>
              . These projects showcase my recent focus areas and technical
              growth.
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">
                Loading recent projects...
              </p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <Card className="border-destructive/50 bg-destructive/5 max-w-md mx-auto">
                <CardContent className="p-6">
                  <AlertCircle className="h-8 w-8 mx-auto mb-4 text-destructive" />
                  <CardTitle className="text-destructive mb-2">
                    Unable to load projects
                  </CardTitle>
                  <CardDescription className="mb-4">{error}</CardDescription>
                  <Button onClick={refetch} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Projects Grid */}
          {!loading && !error && projects.length > 0 && (
            <motion.div variants={itemVariants} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};
