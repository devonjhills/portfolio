"use client";

import React, { useState, useEffect, memo } from "react";
import { FolderOpen, Star, GitFork, ExternalLink } from "lucide-react";
import { useWindowResponsive } from "@/app/hooks/use-window-responsive";
import { ProjectSkeleton } from "@/app/components/ui/skeleton";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

export const ProjectsWindow = memo(function ProjectsWindow() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { containerRef, getGridColumns } = useWindowResponsive();

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.github.com/users/devonjhills/repos?sort=updated&per_page=6",
        );
        if (!response.ok)
          throw new Error("Failed to fetch repositories from GitHub API.");
        const data: GitHubRepo[] = await response.json();
        setRepos(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubRepos();
  }, []);

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      Ruby: "#701516",
    };
    return colors[language || ""] || "#6b7280";
  };

  const formatTitle = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return React.createElement(
    "div",
    { className: "h-full flex flex-col bg-black text-gray-100" },
    React.createElement(
      "div",
      { className: "bg-neutral-900 border-b border-neutral-800 px-4 py-2" },
      React.createElement(
        "div",
        { className: "flex items-center space-x-2 text-sm text-gray-300" },
        React.createElement(FolderOpen, { className: "w-4 h-4 text-primary" }),
        React.createElement(
          "span",
          { className: "text-gray-400" },
          "/home/devon/github/repositories",
        ),
      ),
    ),
    React.createElement(
      "div",
      { ref: containerRef, className: "flex-1 p-4 sm:p-6 overflow-y-auto" },
      React.createElement(
        "div",
        { className: "mb-6" },
        React.createElement(
          "h2",
          { className: "text-xl font-semibold text-gray-100" },
          "Latest GitHub Repositories",
        ),
        React.createElement(
          "p",
          { className: "text-sm text-gray-400" },
          "My most recently updated public projects.",
        ),
      ),
      loading &&
        React.createElement(
          "div",
          {
            className: "grid gap-4",
            style: { gridTemplateColumns: getGridColumns(2, 1, 1, 1) },
          },
          Array.from({ length: 6 }).map((_, i) =>
            React.createElement(ProjectSkeleton, { key: i }),
          ),
        ),
      error &&
        React.createElement(
          "div",
          {
            className:
              "bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg",
          },
          "Error: ",
          error,
        ),
      React.createElement(
        "div",
        {
          className: "grid gap-4",
          style: { gridTemplateColumns: getGridColumns(2, 1, 1, 1) },
        },
        repos.map((repo) =>
          React.createElement(
            "a",
            {
              key: repo.id,
              href: repo.html_url,
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "group p-4 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-primary/50 transition-all flex flex-col justify-between",
            },
            React.createElement(
              "div",
              {},
              React.createElement(
                "div",
                { className: "mb-2" },
                React.createElement(
                  "h3",
                  {
                    className:
                      "font-semibold text-gray-100 group-hover:text-primary transition-colors truncate",
                  },
                  formatTitle(repo.name),
                ),
              ),
              React.createElement(
                "p",
                {
                  className:
                    "text-sm text-gray-300 mb-4 leading-relaxed line-clamp-3 h-15",
                },
                repo.description || "No description available.",
              ),
              repo.topics.length > 0 &&
                React.createElement(
                  "div",
                  { className: "flex flex-wrap gap-1 mb-3" },
                  repo.topics.slice(0, 3).map((topic) =>
                    React.createElement(
                      "span",
                      {
                        key: topic,
                        className:
                          "px-2 py-0.5 bg-neutral-800 text-primary text-xs rounded-md",
                      },
                      topic,
                    ),
                  ),
                ),
            ),
            React.createElement(
              "div",
              {
                className:
                  "flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-neutral-800",
              },
              React.createElement(
                "div",
                { className: "flex items-center space-x-4" },
                React.createElement(
                  "div",
                  { className: "flex items-center space-x-1" },
                  React.createElement(Star, {
                    className: "w-3 h-3 text-primary",
                  }),
                  React.createElement("span", {}, repo.stargazers_count),
                ),
                React.createElement(
                  "div",
                  { className: "flex items-center space-x-1" },
                  React.createElement(GitFork, { className: "w-3 h-3" }),
                  React.createElement("span", {}, repo.forks_count),
                ),
                repo.language &&
                  React.createElement(
                    "div",
                    { className: "flex items-center space-x-1.5" },
                    React.createElement("div", {
                      className: "w-2.5 h-2.5 rounded-full",
                      style: {
                        backgroundColor: getLanguageColor(repo.language),
                      },
                    }),
                    React.createElement("span", {}, repo.language),
                  ),
              ),
              React.createElement(
                "div",
                {
                  className:
                    "flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity",
                },
                React.createElement("span", {}, "View"),
                React.createElement(ExternalLink, { className: "w-3 h-3" }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
});
