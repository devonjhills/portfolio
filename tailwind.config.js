/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        ring: "hsl(var(--ring))",
        // Semantic colors for better theming
        star: "hsl(var(--star))",
        fork: "hsl(var(--fork))",
        success: "hsl(var(--success))",
        info: "hsl(var(--info))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // Retro 90s Matrix Mint OS colors - Nostalgic cyber aesthetic
        retro: {
          // Matrix-inspired greens
          matrix: {
            primary: "#00FF41", // Bright matrix green
            secondary: "#00D835", // Secondary matrix green
            tertiary: "#00B82D", // Darker matrix green
            dark: "#001A03", // Very dark matrix background
            glow: "#39FF14", // Neon green glow
          },
          // Windows 95/98 inspired grays
          win95: {
            panel: "#C0C0C0", // Classic Windows gray
            panelDark: "#808080", // Darker panel gray
            panelLight: "#E0E0E0", // Lighter panel gray
            border: "#000000", // Black borders
            borderLight: "#FFFFFF", // White highlight borders
            borderShadow: "#808080", // Shadow borders
            text: "#000000", // Black text
            textInverse: "#FFFFFF", // White text
            blue: "#000080", // Windows blue
            blueLight: "#0078D4", // Lighter blue
          },
          // Retro color palette
          cyber: {
            pink: "#FF00FF", // Cyber pink/magenta
            cyan: "#00FFFF", // Cyber cyan
            yellow: "#FFFF00", // Cyber yellow
            purple: "#8000FF", // Deep purple
            orange: "#FF8000", // Retro orange
          },
          // Combined matrix-mint scheme
          mint: {
            primary: "#00FF88", // Matrix mint primary
            secondary: "#00E678", // Matrix mint secondary
            background: "#0A0F0A", // Very dark green background
            panel: "#1A2E1A", // Dark green panel
            panelLight: "#2A3E2A", // Medium green panel
            window: "#F0FFF0", // Honeydew window background
            windowHeader: "#C8E6C9", // Light green window header
            text: "#000000", // Black text for readability
            textLight: "#FFFFFF", // White text
            textMatrix: "#00FF41", // Matrix green text
            border: "#004D1A", // Dark green border
            borderLight: "#66BB6A", // Light green border
            glow: "#39FF14", // Neon glow
            shadow: "rgba(0, 255, 65, 0.3)", // Matrix green shadow
          },
        },
        // Ubuntu OS specific colors with mint green
        ubuntu: {
          mint: "#00FF80",
          "mint-light": "#33FF99",
          "mint-dark": "#00CC66",
          purple: "#772953",
          "purple-light": "#9B4A73",
          aubergine: "#2C001E",
          black: "#2C2C2C",
          grey: "#AEA79F",
          "grey-dark": "#77216F",
          white: "#FFFFFF",
        },
        // Window and component specific colors (Ubuntu style)
        "ubuntu-panel": "#2C2C2C",
        "ubuntu-taskbar": "#2C2C2C",
        "ubuntu-window": "#FAFAFA",
        "ubuntu-window-header": "#E5E5E5",
        "ubuntu-terminal": "#300A24",
        "ubuntu-files": "#FFFFFF",
        "ubuntu-editor": "#FFFFFF",
        "ubuntu-browser": "#FFFFFF",
        "ubuntu-dock": "rgba(44, 44, 44, 0.9)",
      },
      fontFamily: {
        sans: ["var(--font-ubuntu)", "sans-serif"],
        mono: ["var(--font-ubuntu-mono)", "var(--font-code)", "monospace"],
        heading: ["var(--font-ubuntu)", "sans-serif"],
        ubuntu: ["var(--font-ubuntu)", "sans-serif"],
        "ubuntu-mono": ["var(--font-ubuntu-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // Professional shadows - subtle but effective depth
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        // Subtle focus effects
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.2s ease-out",
        "slide-down": "slide-down 0.2s ease-out",
        "scale-in": "scale-in 0.15s ease-out",
        "window-open": "window-open 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "dock-bounce":
          "dock-bounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "window-open": {
          "0%": { transform: "scale(0.9) translateY(-20px)", opacity: "0" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "1" },
        },
        "dock-bounce": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
          "100%": { transform: "translateY(0px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #87CEEB" },
          "100%": { boxShadow: "0 0 20px #87CEEB, 0 0 30px #87CEEB" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
