# Devon Hills - Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A sophisticated, modern portfolio website built with Next.js 15, showcasing my professional experience as a Software Engineer with expertise in React, TypeScript, and full-stack development.

<img width="1472" height="999" alt="Screenshot 2026-09-14 at 3 35 51 PM" src="https://github.com/user-attachments/assets/faf8fe4e-e996-4fc0-a5ee-ea697df15bd1" />


## 🚀 Live Site

[![Website](https://img.shields.io/badge/Website-devonhills.dev-0078D4?style=for-the-badge&logo=microsoft-edge&logoColor=white)](https://devonhills.dev)

## ✨ Features

### Modern Design & UX

- **Beautiful Animations** - Powered by Framer Motion with smooth transitions and micro-interactions
- **Responsive Design** - Mobile-first approach optimized for all device sizes
- **Dark/Light Mode** - Automatic theme switching with system preference detection
- **Glassmorphism Effects** - Modern UI with backdrop blur and transparency
- **Interactive Components** - Hover effects, 3D transformations, and scroll-triggered animations

### Advanced UI Components

- **Infinite Scrolling Project Cards** - Smooth horizontal scrolling with Aceternity UI
- **Aceternity UI Timeline** - Professional experience showcase with detailed achievements
- **Animated Backgrounds** - Shooting stars and twinkling stars effects
- **Floating Dock** - Social media links with smooth animations
- **shadcn/ui Components** - Consistent design system with cards, badges, and forms

### Technical Highlights

- **Next.js 15** with App Router for optimal performance
- **React 19** with modern hooks and patterns
- **TypeScript** with strict mode for type safety
- **Tailwind CSS v4** for responsive styling
- **Performance Optimized** - Fast loading with Turbopack

## 🛠️ Tech Stack

### Core Technologies

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

### Animation & UI

[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Aceternity UI](https://img.shields.io/badge/Aceternity_UI-Latest-FF6B6B?style=flat-square&logoColor=white)](https://ui.aceternity.com/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-Latest-F56565?style=flat-square&logo=lucide&logoColor=white)](https://lucide.dev/)

### Development Tools

[![Turbopack](https://img.shields.io/badge/Turbopack-Latest-000000?style=flat-square&logo=turbopack&logoColor=white)](https://turbo.build/pack)
[![ESLint](https://img.shields.io/badge/ESLint-8.0-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-Latest-F7B93E?style=flat-square&logo=prettier&logoColor=black)](https://prettier.io/)

## 📱 Portfolio Sections

### Hero Section

- Animated shooting stars background
- Professional introduction with call-to-action
- Floating social media dock

### About Me

- Professional overview with quick info cards
- Impact & achievements showcase
- Technical expertise with categorized skill badges
- Personal interests and downloadable resume

### Experience

- Interactive timeline with detailed work history
- Complete professional journey from education to current role
- Achievements, technologies, and responsibilities for each position

### Projects

- **Dynamic GitHub Integration** - Real-time project data fetched from GitHub API
- **Infinite Scrolling Display** - Smooth horizontal scrolling project cards with pause on hover
- **GitHub-style Language Statistics** - Visual language breakdown with color-coded bars
- **Project Cards** - Compact and detailed views with live/code links
- **Auto-updating Content** - Projects automatically sync with latest GitHub repositories

### Contact

- Animated stars background
- Professional networking focus
- Social media and professional links
- Modern contact interface

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository

```bash
git clone [repository-url]
cd my_portfolio
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint code quality checks
```

## 📁 Project Structure

```
app/
├── api/
│   ├── github-repos/      # GitHub API integration
│   └── og/               # Open Graph image generation
├── components/
│   ├── sections/          # Main portfolio sections
│   │   ├── hero.tsx       # Landing hero with animations
│   │   ├── about.tsx      # About section with skills
│   │   ├── experience.tsx # Professional timeline
│   │   ├── projects.tsx   # Dynamic GitHub project showcase
│   │   └── contact.tsx    # Networking contact section
│   └── ui/               # Reusable UI components
│       ├── card.tsx      # shadcn/ui cards
│       ├── timeline.tsx  # Aceternity timeline
│       ├── infinite-moving-cards.tsx # Infinite scroll
│       ├── stars-background.tsx
│       └── floating-dock.tsx
├── lib/                  # Utility functions and GitHub hooks
├── globals.css          # Global styles with CSS custom properties
├── layout.tsx           # Root layout
└── page.tsx            # Main page

components/ui/           # Shared Aceternity UI components
public/
└── Devon_Hills_Resume_2025_Newest.pdf
```

## 🎨 Design System

### Colors

- **Primary**: Used for accent colors and interactive elements
- **Muted**: For secondary text and subtle backgrounds
- **Background**: Adaptive light/dark theme support

### Typography

- **Font**: Geist Sans and Geist Mono
- **Responsive**: Scales appropriately across devices
- **Hierarchy**: Clear heading and body text distinction

### Components

- **Consistent Spacing**: Using Tailwind's spacing scale
- **Interactive States**: Hover, focus, and active states
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🔧 Customization

### Updating Content

- **Personal Info**: Update `app/components/sections/about.tsx`
- **Experience**: Modify `app/components/sections/experience.tsx`
- **Projects**: Edit `app/components/sections/projects.tsx`
- **Contact**: Update `app/components/sections/contact.tsx`

### Styling

- **Colors**: Modify CSS custom properties in `app/globals.css` for easy theming
- **Cyberpunk Synthwave Theme**: Electric magenta, neon cyan, and hot pink color scheme
- **Components**: Customize shadcn/ui components in `app/components/ui/`
- **Animations**: Adjust Framer Motion variants in component files
- **Infinite Scroll Speed**: Configurable animation duration in `infinite-moving-cards.tsx`

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with automatic builds

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 👨‍💻 About the Developer

**Devon Hills** - Software Engineer at Livefront

- 7+ years building mission-critical React/TypeScript applications
- Previously specialized in HealthCare.gov serving millions of users at Ad Hoc
- Expert in accessibility, performance optimization, and modern web development
- Currently focused on cutting-edge frontend development at Livefront

### Contact

- **Email**: devonjhills@gmail.com
- **LinkedIn**: [linkedin.com/in/devonjhills](https://linkedin.com/in/devonjhills)
- **GitHub**: [github.com/devonjhills](https://github.com/devonjhills)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js, React, and modern web technologies**
