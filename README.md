# Devon Hills - Portfolio Website

A modern, responsive portfolio website built with Astro and inspired by Livefront's design aesthetics. This site showcases my experience as a Software Engineer with a focus on React, TypeScript, and modern web development.

## 🚀 Features

- **Modern Design**: Inspired by Livefront.com's clean, professional aesthetic
- **Responsive Layout**: Mobile-first design that works perfectly on all devices
- **Dark Mode Support**: Automatic theme detection with manual toggle capability
- **Dynamic GitHub Integration**: Real-time project fetching from GitHub API with caching
- **Performance Optimized**: Built with Astro for lightning-fast loading
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, and sitemap
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.13.5
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3
- **Language**: TypeScript
- **Animations**: CSS animations with smooth transitions
- **Icons**: Custom SVG icons
- **Fonts**: Inter font family
- **Deployment**: Static site generation (SSG)

## 🔧 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
# Site will be available at http://localhost:4321/
```

### Build

```bash
npm run build
# Generates static files in dist/ directory
```

### Preview

```bash
npm run preview
# Preview the built site locally
```

## 🌐 API Endpoints

### GitHub Projects (`/api/github-projects`)

- Fetches latest repositories from GitHub API
- Includes language statistics and project metadata
- Implements 30-minute caching for performance
- Graceful fallback for API failures

## 🚀 Deployment

The site is optimized for deployment on:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting provider

---

**Devon Hills** - Software Engineer at Livefront  
📧 devonjhills@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/devonjhills)  
🐙 [GitHub](https://github.com/devonjhills)
