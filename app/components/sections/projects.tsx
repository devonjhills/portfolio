"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  ExternalLink,
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
import { InfiniteMovingCards } from "../../../components/ui/infinite-moving-cards";

// GitHub-style Languages Component
const LanguagesBar = ({
  languageStats,
}: {
  languageStats: { name: string; percentage: number; color: string }[];
}) => {
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
      <div
        className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs"
        style={{
          minHeight: "2.5rem",
          maxHeight: "2.5rem",
          overflow: "hidden",
        }}
      >
        {languageStats.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-border/20"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-foreground font-medium">{lang.name}</span>
            <span className="text-muted-foreground/80 font-mono text-[10px]">
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
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMinutes < 60) {
    if (diffMinutes < 1) return "just now";
    if (diffMinutes === 1) return "1 minute ago";
    return `${diffMinutes} minutes ago`;
  }

  if (diffHours < 24) {
    if (diffHours === 1) return "1 hour ago";
    return `${diffHours} hours ago`;
  }

  if (diffDays < 7) {
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  }

  if (diffDays < 30) {
    if (diffWeeks === 1) return "1 week ago";
    return `${diffWeeks} weeks ago`;
  }

  if (diffDays < 365) {
    if (diffMonths === 1) return "1 month ago";
    return `${diffMonths} months ago`;
  }

  if (diffYears === 1) return "1 year ago";
  return `${diffYears} years ago`;
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

// Compact Project Card Component for Infinite Scroll
const CompactProjectCard = React.memo(
  ({ project }: { project: GitHubProject }) => (
    <div className="h-[24rem] w-full p-1">
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-border hover:border-primary/50 bg-card shadow-md">
        <CardContent className="p-4 flex flex-col h-full">
          {/* Header - Fixed height */}
          <div className="flex items-start justify-between mb-3">
            <CardTitle
              className="text-sm font-semibold leading-tight text-primary flex-1"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.5rem",
              }}
            >
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary/80 transition-colors duration-200 cursor-pointer"
              >
                {project.title}
              </a>
            </CardTitle>
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              {project.stars > 0 && (
                <Badge variant="outline" className="text-xs">
                  <Star className="w-2.5 h-2.5 mr-0.5 text-star" />
                  {project.stars}
                </Badge>
              )}
              {project.forks > 0 && (
                <Badge variant="outline" className="text-xs">
                  <GitFork className="w-2.5 h-2.5 mr-0.5 text-fork" />
                  {project.forks}
                </Badge>
              )}
            </div>
          </div>

          {/* Description - Fixed height with ellipsis */}
          <CardDescription
            className="text-xs leading-relaxed text-muted-foreground mb-4"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "3.6rem",
              maxHeight: "3.6rem",
              textOverflow: "ellipsis",
            }}
          >
            {project.description}
          </CardDescription>

          {/* Metadata - Fixed height */}
          <div
            className="flex items-center gap-3 text-xs text-muted-foreground mb-3"
            style={{ minHeight: "1.5rem", maxHeight: "1.5rem" }}
          >
            <span className="flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" />
              {getTimeAgo(project.pushed_at)}
            </span>
            {project.primaryLanguage && (
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                {project.primaryLanguage}
              </span>
            )}
          </div>

          {/* Topics - Single row with +number badge */}
          <div className="flex items-center mb-4 min-h-6 max-h-6">
            {project.topics.length > 0 ? (
              <div className="flex items-center gap-1 w-full overflow-hidden">
                {project.topics.slice(0, 3).map((topic) => (
                  <Badge
                    key={topic}
                    variant="outline"
                    className="text-xs whitespace-nowrap flex-shrink-0"
                  >
                    {topic}
                  </Badge>
                ))}
                {project.topics.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs whitespace-nowrap flex-shrink-0 ml-1"
                  >
                    +{project.topics.length - 3}
                  </Badge>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {/* Languages - GitHub style with color bar */}
          <div
            className="flex-1 flex flex-col justify-end mb-4"
            style={{ minHeight: "3.5rem" }}
          >
            {project.languageStats && project.languageStats.length > 0 ? (
              <LanguagesBar languageStats={project.languageStats} />
            ) : (
              <div className="flex flex-wrap gap-1">
                {project.languages.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
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

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
            >
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitFork className="w-3 h-3 mr-1" />
                Code
              </a>
            </Button>
            {project.homepage && (
              <Button
                asChild
                variant="default"
                size="sm"
                className="flex-1 text-xs"
              >
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Live
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  ),
);

// Project Card Component
const ProjectCard = React.memo(({ project }: { project: GitHubProject }) => (
  <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-border hover:border-primary/50 bg-card shadow-md">
    <CardContent className="p-6 flex-1 flex flex-col">
      {/* Header - Fixed height */}
      <div className="flex items-start justify-between mb-3">
        <CardTitle
          className="text-lg font-semibold leading-tight text-primary flex-1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.5rem",
          }}
        >
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary/80 transition-colors duration-200 cursor-pointer"
          >
            {project.title}
          </a>
        </CardTitle>
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          {project.stars > 0 && (
            <Badge variant="outline" className="text-xs">
              <Star className="w-3 h-3 mr-1 text-star" />
              {project.stars}
            </Badge>
          )}
          {project.forks > 0 && (
            <Badge variant="outline" className="text-xs">
              <GitFork className="w-3 h-3 mr-1 text-fork" />
              {project.forks}
            </Badge>
          )}
        </div>
      </div>

      {/* Description - Fixed height */}
      <CardDescription
        className="text-sm leading-relaxed text-muted-foreground mb-5"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: "4rem",
          maxHeight: "4rem",
        }}
      >
        {project.description}
      </CardDescription>

      {/* Metadata - Fixed height */}
      <div
        className="flex items-center gap-4 text-xs text-muted-foreground mb-5"
        style={{ minHeight: "1.5rem", maxHeight: "1.5rem" }}
      >
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          {getTimeAgo(project.pushed_at)}
        </span>
        {project.primaryLanguage && (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            {project.primaryLanguage}
          </span>
        )}
      </div>

      {/* Topics - Fixed height container for two rows */}
      <div
        className="flex items-start mb-6"
        style={{ minHeight: "2.5rem", maxHeight: "2.5rem" }}
      >
        {project.topics.length > 0 ? (
          <div className="flex flex-wrap gap-1 overflow-hidden">
            {project.topics.slice(0, 6).map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="text-xs whitespace-nowrap"
              >
                {topic}
              </Badge>
            ))}
            {project.topics.length > 6 && (
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                +{project.topics.length - 6} more
              </Badge>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* Languages - GitHub style with color bar */}
      <div
        className="flex-1 flex flex-col justify-end"
        style={{ minHeight: "4rem" }}
      >
        {project.languageStats && project.languageStats.length > 0 ? (
          <LanguagesBar languageStats={project.languageStats} />
        ) : (
          <div className="flex flex-wrap gap-1">
            {project.languages.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="">
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
        variant="outline"
        size="sm"
        className="flex-1 transition-all duration-200"
      >
        <a href={project.html_url} target="_blank" rel="noopener noreferrer">
          <GitFork className="w-4 h-4 mr-2" />
          Code
        </a>
      </Button>

      {project.homepage && (
        <Button
          asChild
          variant="default"
          size="sm"
          className="flex-1 transition-all duration-200 hover:opacity-90"
        >
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
CompactProjectCard.displayName = "CompactProjectCard";

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { projects, loading, error, refetch } = useGitHubRepos();

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-muted/50 py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
              Recent Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              My latest development work, automatically updated from{" "}
              <a
                href="https://github.com/devonjhills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 underline underline-offset-4 transition-colors"
              >
                GitHub
              </a>
              . These projects showcase my recent focus areas and technical
              growth.
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-secondary" />
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

          {/* Projects Infinite Scroll */}
          {!loading && !error && projects.length > 0 && projects.length > 2 && (
            <motion.div variants={itemVariants} className="w-full">
              <div className="h-[28rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                  items={projects}
                  direction="right"
                  speed="slow"
                  pauseOnHover={true}
                  renderItem={(project: GitHubProject) => (
                    <CompactProjectCard project={project} />
                  )}
                />
              </div>
            </motion.div>
          )}

          {/* Fallback Grid for when there are few projects */}
          {!loading &&
            !error &&
            projects.length > 0 &&
            projects.length <= 2 && (
              <motion.div variants={itemVariants} className="w-full mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
