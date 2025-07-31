import { useState, useEffect } from "react";

export interface GitHubProject {
  id: number;
  name: string;
  title: string;
  description: string;
  html_url: string;
  homepage?: string;
  topics: string[];
  languages: string[];
  languageStats: { name: string; percentage: number; color: string }[];
  primaryLanguage: string;
  stars: number;
  forks: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

interface GitHubReposResponse {
  success: boolean;
  data: GitHubProject[];
  cached: boolean;
  timestamp: string;
  error?: string;
}

interface UseGitHubReposReturn {
  projects: GitHubProject[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGitHubRepos = (): UseGitHubReposReturn => {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/github-repos");
      const data: GitHubReposResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch repositories");
      }

      setProjects(data.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch repositories";
      setError(errorMessage);
      console.error("Error fetching repos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchRepos,
  };
};
