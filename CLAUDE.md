# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based portfolio website for Devon Hills, a software engineer. The site features modern design, sophisticated monochromatic styling with dark mode support, dynamic GitHub integration, and is optimized for performance and SEO. The project is configured for deployment on Vercel.

## Development Commands

```bash
# Start development server (available at http://localhost:4321/)
npm run dev

# Build for production
npm run build

# Preview built site locally
npm run preview

# Run Astro CLI commands
npm run astro

# Format code with Prettier
npm run format

# Check formatting without making changes
npm run format:check
```

## Architecture & Structure

### Tech Stack

- **Framework**: Astro v5.13.5 with TypeScript (strict configuration)
- **Styling**: Tailwind CSS with sophisticated monochromatic color palette
- **Fonts**: Inter (sans-serif) and Lora (serif/headings)
- **Deployment**: Vercel with static site generation
- **Icons**: Astro Icon with Heroicons and Simple Icons

### Project Structure

```
src/
├── components/          # Astro components (Hero, Services, Experience, etc.)
├── layouts/Layout.astro # Main layout with comprehensive SEO and dark mode
├── pages/
│   ├── index.astro     # Main page composition with diagonal separators
│   ├── api/            # API routes
│   │   └── github-projects.ts  # GitHub API integration with caching
│   ├── sitemap.xml.ts  # Dynamic sitemap generation
│   └── og-image.png.ts # Dynamic OG image generation
└── styles/             # Global CSS
```

### Key Components Architecture

- **Layout.astro**: Main layout with comprehensive SEO meta tags, dark mode support, custom scrollbar styling, and theme initialization via localStorage
- **index.astro**: Homepage composition using DiagonalSeparator components between sections for visual flow
- **API Routes**: GitHub projects endpoint at `/api/github-projects` with server-side caching (30 minutes) and graceful fallback handling

### Design System & Theming

The project uses a sophisticated monochromatic design system with:

- **Color Palette**: Four-tier monochromatic system (primary, secondary, accent, neutral) with 11 shades each (50-950)
- **Typography**: Inter for body text, Lora for headings and serif elements
- **Dark Mode**: Class-based (`darkMode: 'class'`) with automatic system preference detection and localStorage persistence
- **Animations**: Custom CSS keyframes including fadeInUp, slideIn, float, and pulse-soft
- **Shadows**: Five-tier shadow system from subtle to deep
- **Custom Scrollbar**: Styled for both light and dark modes

### API Integration Pattern

The `/api/github-projects` endpoint demonstrates the project's API pattern:

- Fetches repositories from GitHub API for user 'devonjhills'
- Filters out forks, archived, and private repositories
- Includes language statistics for each repository via secondary API calls
- Implements server-side caching with 30-minute TTL
- Provides fallback data structure on API failures
- Returns TypeScript-typed responses with ProjectWithLanguages interface

### Configuration Details

- **Astro Config**: Static site generation with Vercel adapter, HTML compression, and automatic stylesheet inlining
- **Tailwind**: Custom color system, animations, and class-based dark mode
- **TypeScript**: Strict configuration extending `astro/tsconfigs/strict`
- **Site URL**: Configured for https://devonhills.dev
- **Prettier**: Configured with astro plugin for consistent code formatting

### Development Patterns

- **Component Structure**: Single-file Astro components with frontmatter for logic
- **API Routes**: TypeScript with proper interface definitions and error handling
- **Styling Approach**: Tailwind utility classes with custom design tokens
- **Theme Management**: Client-side theme persistence with system preference fallback
- **SEO**: Comprehensive meta tags, Open Graph, Twitter Cards, and canonical URLs