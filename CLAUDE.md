# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based portfolio website for Devon Hills, a software engineer. The site features modern design, dark mode support, dynamic GitHub integration, and is optimized for performance and SEO.

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
```

## Architecture & Structure

### Tech Stack

- **Framework**: Astro v5.13.5 with TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk-inspired color palette
- **Fonts**: Inter (sans-serif) and Playfair Display (headings/serif)

### Project Structure

```
src/
├── components/          # Astro components (Hero, Services, Experience, etc.)
├── layouts/Layout.astro # Main layout with SEO, dark mode, and global styles
├── pages/
│   ├── index.astro     # Main page composition
│   ├── api/            # API routes
│   │   └── github-projects.ts  # GitHub API integration with caching
│   ├── sitemap.xml.ts  # Dynamic sitemap generation
│   └── og-image.png.ts # Dynamic OG image generation
└── styles/             # Global CSS
```

### Key Components

- **Layout.astro**: Main layout with comprehensive SEO meta tags, dark mode support, custom scrollbar styling, and global theme initialization
- **index.astro**: Homepage composition using diagonal separators between sections
- **API Routes**: GitHub projects endpoint with 30-minute caching and graceful fallback

### Design System

The project uses a custom Tailwind configuration with:

- **Color Palette**: Cyberpunk-inspired colors (primary blues, secondary teals, accent pinks, neutral grays)
- **Typography**: Inter for body text, Playfair Display for headings
- **Custom Animations**: fadeInUp, slideIn, float, pulse-soft with CSS keyframes
- **Dark Mode**: Class-based dark mode with automatic system preference detection

### API Integration

The `/api/github-projects` endpoint:

- Fetches repositories from GitHub API for user 'devonjhills'
- Filters out forks, archived, and private repos
- Includes language statistics for each repository
- Implements 30-minute server-side caching
- Provides fallback data on API failures

### Development Notes

- Uses Astro's strict TypeScript configuration
- Site URL configured for https://devonhills.dev
- HTML compression and automatic stylesheet inlining enabled
- Theme persistence handled via localStorage with system preference fallback
- Custom scrollbar styling for both light and dark modes
