# Devon Hills — Portfolio OS

An interactive, Ubuntu-inspired desktop built with React and TypeScript. Explore my projects, engineering experience, and résumé through a windowed interface with a custom window manager, application dock, and keyboard shortcuts.

My background spans React/TypeScript applications for HealthCare.gov at Ad Hoc and LLM integration work at Livefront. This repo brings that frontend focus into a personal project: desktop-style interactions implemented in the browser.

[Live portfolio](https://devonhills.dev) · [Résumé](public/Devon_Hills_Resume_2025_Newest.pdf) · [LinkedIn](https://linkedin.com/in/devonjhills) · [Email](mailto:devonjhills@gmail.com)

<img width="1472" height="999" alt="Devon Hills portfolio: Ubuntu-inspired desktop with a dock and portfolio application windows" src="https://github.com/user-attachments/assets/faf8fe4e-e996-4fc0-a5ee-ea697df15bd1" />

## Explore the desktop

The desktop opens with a terminal-style introduction. Use its launch buttons or the dock to explore the portfolio:

| App | What you'll find |
| --- | --- |
| Terminal | A `neofetch`-inspired introduction, profile tab, and shortcuts to the other apps. |
| Projects | Six recently updated public GitHub repositories, with descriptions, topics, languages, stars, and forks. |
| Experience | Work history, skills, and education presented as an editor-style `resume.md` view. |
| Contact | Email, LinkedIn, and GitHub links in a browser-style window. |
| Résumé | A downloadable PDF. |

On desktop, windows automatically arrange into a grid and support dragging, resizing, minimizing, and maximizing. The Activities drawer lets you switch between windows, close them, or rearrange the grid. On mobile, apps use the available screen area above a bottom dock.

Right-click the desktop to change the wallpaper or arrange windows. Wallpaper selection persists in local storage, and the URL tracks which apps are open so you can share that selection. Keyboard shortcuts include `Alt + 1–5` to launch apps, `Alt + G` to arrange the grid, and `Alt + W` to close the active window.

## Engineering highlights

- **Window state separated from rendering.** `useWindowManager` owns application lifecycle, focus, stacking order, layout, and URL synchronization; `WindowManager` renders the window frames and controls.
- **Frame-based drag and resize handling.** `useWindowDrag` uses refs, `requestAnimationFrame`, and direct DOM updates during movement, then commits the final geometry to React state.
- **Layout adapts to both viewport and window size.** Grid calculations account for desktop chrome and app content complexity. A `ResizeObserver` hook lets content such as project cards respond to its own window width.
- **Small client-side data surface.** Experience content lives in a typed source module. Projects fetch directly from GitHub's public API with loading skeletons and an error state; local setup needs no API key or database.

## Tech stack

Versions below reflect the committed lockfile.

| Layer | Implementation |
| --- | --- |
| Framework | Next.js 16.1.6, App Router, React 19.2.4 |
| Language | TypeScript 5.8.3 |
| Styling | Tailwind CSS 3.4.19, custom CSS for the desktop and window chrome |
| UI assets | Lucide icons, local application icons and wallpapers |
| Typography | Ubuntu, Ubuntu Mono, and JetBrains Mono via `next/font` |
| Browser APIs | `ResizeObserver`, `requestAnimationFrame`, History API, local storage |
| Metadata | Next.js metadata, sitemap, and Open Graph image routes |
| Deployment config | Netlify's Next.js plugin and asset caching/security headers |

## Run locally

Requires Node.js **20.9+** and npm.

```bash
git clone https://github.com/devonjhills/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No environment variables are required. The Projects app needs network access to GitHub's public API, and builds fetch Google Fonts through `next/font`.

```bash
npm run build   # Create a production build
npm run start   # Serve the production build
npx tsc --noEmit # Check TypeScript separately
```

The current Next.js configuration skips type errors during builds, so a successful build alone does not verify type correctness.

## Code map

```text
app/
├── page.tsx                       # Desktop entry point
├── layout.tsx                     # Fonts, providers, and site metadata
├── globals.css                    # Desktop theme and global styles
├── components/
│   ├── os/
│   │   ├── ubuntu-desktop.tsx      # Desktop shell and UI wiring
│   │   ├── window-manager.tsx      # Window frames and controls
│   │   ├── side-dock.tsx           # Desktop/mobile app launcher
│   │   ├── activities-drawer.tsx   # Open-window overview
│   │   └── applications/          # Portfolio apps and wallpaper picker
│   ├── layout/                    # Theme provider
│   └── ui/                        # Tooltips, skeletons, favicon helper
├── hooks/                         # Window state, drag/resize, shortcuts
├── constants/layout.ts            # Dimensions, app titles, and icons
├── types/window.ts                # Shared window types
├── utils/                         # Grid geometry and app-to-window mapping
├── data/resume.ts                 # Experience, education, and skills
├── api/og/                        # Open Graph and Twitter image routes
└── sitemap.ts
public/                            # Résumé PDF, icons, avatar, wallpapers
netlify.toml                       # Build and hosting configuration
```

For a code walkthrough, start with [the desktop shell](app/components/os/ubuntu-desktop.tsx), then follow [window state](app/hooks/use-window-manager.ts), [drag and resize behavior](app/hooks/use-window-drag.ts), and [grid layout calculations](app/utils/window-layout.ts).
