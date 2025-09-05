import type { APIRoute } from 'astro';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
  languages_url: string;
}

interface ProjectWithLanguages extends GitHubRepo {
  languages?: Record<string, number>;
}

// Cache for 30 minutes
let cache: { data: ProjectWithLanguages[]; timestamp: number } | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export const GET: APIRoute = async () => {
  try {
    // Check cache
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return new Response(JSON.stringify(cache.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=1800', // 30 minutes
        },
      });
    }

    const username = 'devonjhills';

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Filter out forks, archived repos, and private repos
    const publicRepos = repos.filter(
      repo => !repo.fork && !repo.archived && !repo.private && repo.description // Only include repos with descriptions
    );

    // Get top 6 most recently updated repos
    const topRepos = publicRepos
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
      .slice(0, 6);

    // Fetch languages for each repo
    const projectsWithLanguages: ProjectWithLanguages[] = await Promise.all(
      topRepos.map(async repo => {
        try {
          const languagesResponse = await fetch(repo.languages_url);
          if (languagesResponse.ok) {
            const languages = await languagesResponse.json();
            return { ...repo, languages };
          }
          return repo;
        } catch (error) {
          console.warn(`Failed to fetch languages for ${repo.name}:`, error);
          return repo;
        }
      })
    );

    // Update cache
    cache = {
      data: projectsWithLanguages,
      timestamp: Date.now(),
    };

    return new Response(JSON.stringify(projectsWithLanguages), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800', // 30 minutes
      },
    });
  } catch (error) {
    console.error('GitHub API error:', error);

    // Return fallback data
    const fallbackProjects: ProjectWithLanguages[] = [
      {
        id: 1,
        name: 'portfolio-website',
        full_name: 'devonjhills/portfolio-website',
        description: 'Modern portfolio website built with Next.js, TypeScript, and Tailwind CSS',
        html_url: 'https://github.com/devonjhills/portfolio-website',
        homepage: 'https://devonjhills.com',
        stargazers_count: 12,
        watchers_count: 12,
        forks_count: 3,
        language: 'TypeScript',
        topics: ['nextjs', 'typescript', 'tailwindcss', 'portfolio'],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-12-01T00:00:00Z',
        pushed_at: '2024-12-01T00:00:00Z',
        archived: false,
        fork: false,
        private: false,
        languages_url: '',
        languages: {
          TypeScript: 70,
          CSS: 20,
          JavaScript: 10,
        },
      },
      {
        id: 2,
        name: 'react-dashboard',
        full_name: 'devonjhills/react-dashboard',
        description: 'Healthcare data visualization dashboard built with React and D3.js',
        html_url: 'https://github.com/devonjhills/react-dashboard',
        homepage: null,
        stargazers_count: 8,
        watchers_count: 8,
        forks_count: 2,
        language: 'JavaScript',
        topics: ['react', 'dashboard', 'healthcare', 'd3js'],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-11-01T00:00:00Z',
        pushed_at: '2024-11-01T00:00:00Z',
        archived: false,
        fork: false,
        private: false,
        languages_url: '',
        languages: {
          JavaScript: 65,
          CSS: 25,
          HTML: 10,
        },
      },
    ];

    return new Response(JSON.stringify(fallbackProjects), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // 5 minutes for fallback
      },
    });
  }
};
