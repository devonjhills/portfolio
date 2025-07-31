import { NextResponse } from "next/server";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  private: boolean;
}

interface GitHubLanguages {
  [key: string]: number;
}

interface ProcessedRepo {
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

const GITHUB_USERNAME = "devonjhills";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

let cachedData: ProcessedRepo[] | null = null;
let cacheTimestamp: number = 0;

// Repositories to exclude
const EXCLUDED_REPOS = [
  "devonjhills", // GitHub profile repo
];

// GitHub language colors (subset of popular languages)
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#306998",
  Java: "#b07219",
  "C#": "#239120",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  R: "#198CE7",
  MATLAB: "#e16737",
  Shell: "#89e051",
  PowerShell: "#012456",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Astro: "#ff5a03",
  Lua: "#000080",
  Perl: "#0298c3",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Erlang: "#B83998",
  Clojure: "#db5855",
  OCaml: "#3be133",
  "F#": "#b845fc",
  Vim: "#199f4b",
  Emacs: "#c065db",
  Makefile: "#427819",
  CMake: "#DA3434",
  Dockerfile: "#384d54",
  YAML: "#cb171e",
  JSON: "#292929",
  XML: "#0060ac",
  Markdown: "#083fa1",
  Default: "#858585", // fallback color
};

const formatRepoName = (name: string): string => {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const fetchRepositoryLanguages = async (
  languagesUrl: string,
): Promise<{
  languages: string[];
  languageStats: { name: string; percentage: number; color: string }[];
}> => {
  try {
    const response = await fetch(languagesUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Devon-Portfolio-App",
      },
    });

    if (!response.ok) {
      return { languages: [], languageStats: [] };
    }

    const languages: GitHubLanguages = await response.json();
    const sortedLanguages = Object.keys(languages).sort(
      (a, b) => languages[b] - languages[a],
    );

    // Calculate total bytes
    const totalBytes = Object.values(languages).reduce(
      (sum, bytes) => sum + bytes,
      0,
    );

    // Calculate percentages and create stats (show top 5 languages)
    const languageStats = sortedLanguages
      .slice(0, 5)
      .map((lang) => ({
        name: lang,
        percentage: Math.round((languages[lang] / totalBytes) * 100 * 10) / 10, // Round to 1 decimal
        color: LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.Default,
      }))
      .filter((stat) => stat.percentage >= 0.1); // Only show languages with >0.1%

    return {
      languages: sortedLanguages,
      languageStats,
    };
  } catch (error) {
    console.error("Error fetching languages:", error);
    return { languages: [], languageStats: [] };
  }
};

const fetchGitHubRepositories = async (): Promise<ProcessedRepo[]> => {
  try {
    // Fetch repositories sorted by most recently pushed
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=20&sort=pushed&direction=desc&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "Devon-Portfolio-App",
        },
      },
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Filter out excluded, forked, archived, and private repos, then take top 6
    const filteredRepos = repos
      .filter(
        (repo) =>
          !EXCLUDED_REPOS.includes(repo.name) &&
          !repo.fork &&
          !repo.archived &&
          !repo.disabled &&
          !repo.private,
      )
      .slice(0, 6);

    // Process repos in parallel
    const processedRepos = await Promise.all(
      filteredRepos.map(async (repo) => {
        const { languages, languageStats } = await fetchRepositoryLanguages(
          repo.languages_url,
        );

        const processedRepo: ProcessedRepo = {
          id: repo.id,
          name: repo.name,
          title: formatRepoName(repo.name),
          description:
            repo.description ||
            `A ${repo.language || "software"} project showcasing development skills.`,
          html_url: repo.html_url,
          homepage: repo.homepage || undefined,
          topics: repo.topics || [],
          languages,
          languageStats,
          primaryLanguage: repo.language || languages[0] || "Unknown",
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
        };

        return processedRepo;
      }),
    );

    return processedRepos;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw error;
  }
};

export const GET = async () => {
  try {
    const now = Date.now();

    // Check if we have cached data that's still fresh
    if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
        timestamp: new Date(cacheTimestamp).toISOString(),
      });
    }

    // Fetch fresh data
    const repositories = await fetchGitHubRepositories();

    // Update cache
    cachedData = repositories;
    cacheTimestamp = now;

    return NextResponse.json({
      success: true,
      data: repositories,
      cached: false,
      timestamp: new Date(now).toISOString(),
    });
  } catch (error) {
    console.error("GitHub API route error:", error);

    // Return cached data if available, even if stale
    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
        error: "Using cached data due to API error",
        timestamp: new Date(cacheTimestamp).toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch repositories",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
