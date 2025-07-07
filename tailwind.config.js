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
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        base: "var(--radius-base)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        mono: ["var(--font-code)", "monospace"],
      },
      fontSize: {
        "6xl": "var(--font-scale-6xl)",
        "5xl": "var(--font-scale-5xl)",
        "4xl": "var(--font-scale-4xl)",
        "3xl": "var(--font-scale-3xl)",
        "2xl": "var(--font-scale-2xl)",
        xl: "var(--font-scale-xl)",
        lg: "var(--font-scale-lg)",
        base: "var(--font-scale-base)",
        sm: "var(--font-scale-sm)",
        xs: "var(--font-scale-xs)",
      },
      spacing: {
        px: "var(--space-px)",
        0: "var(--space-0)",
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        20: "var(--space-20)",
        24: "var(--space-24)",
        32: "var(--space-32)",
        40: "var(--space-40)",
        48: "var(--space-48)",
        56: "var(--space-56)",
        64: "var(--space-64)",
        brutal: "var(--space-8)",
        "brutal-sm": "var(--space-6)",
        "brutal-md": "var(--space-10)",
        "brutal-lg": "var(--space-12)",
      },
      borderWidth: {
        brutal: "var(--border-brutal)",
        "brutal-thick": "var(--border-brutal-thick)",
        "brutal-mega": "var(--border-brutal-mega)",
        "brutal-ultra": "var(--border-brutal-ultra)",
      },
      boxShadow: {
        brutal: "var(--shadow-brutal)",
        "brutal-secondary": "var(--shadow-brutal-secondary)",
        "brutal-accent": "var(--shadow-brutal-accent)",
        "brutal-soft": "var(--shadow-brutal-soft)",
        "brutal-hover": "var(--shadow-brutal-hover)",
        "glow-primary": "var(--glow-primary)",
        "glow-secondary": "var(--glow-secondary)",
        "glow-accent": "var(--glow-accent)",
        "glow-soft": "var(--glow-soft)",
      },
      dropShadow: {
        "glow-primary": "var(--glow-primary)",
        "glow-secondary": "var(--glow-secondary)",
        "glow-accent": "var(--glow-accent)",
        "glow-soft": "var(--glow-soft)",
      },
      textShadow: {
        brutal: "2px 2px 0px hsl(var(--primary) / 0.2)",
        "brutal-secondary": "1px 1px 0px hsl(var(--secondary) / 0.2)",
        "brutal-accent": "1px 1px 0px hsl(var(--accent) / 0.2)",
        glow: "var(--glow-primary)",
        "glow-secondary": "var(--glow-secondary)",
        "glow-accent": "var(--glow-accent)",
      },
      animation: {
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-brutal": "slide-brutal 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "bounce-brutal": "bounce-brutal 1s infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "slow-spin": "spin 3s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
          },
          "100%": {
            boxShadow: "0 0 30px hsl(var(--primary) / 0.8)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            filter: "drop-shadow(0 0 5px hsl(var(--primary) / 0.5))",
          },
          "50%": {
            opacity: "0.8",
            filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.8))",
          },
        },
        "slide-brutal": {
          "0%": {
            opacity: "0",
            transform: "translateX(-100px) translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0) translateY(0)",
          },
        },
        "bounce-brutal": {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "translateY(0)",
          },
          "40%": {
            transform: "translateY(-10px)",
          },
          "60%": {
            transform: "translateY(-5px)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in": {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      backgroundImage: {
        "gradient-brutal": "linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--secondary) / 0.1) 50%, hsl(var(--accent) / 0.1) 100%)",
        "gradient-cyber": "linear-gradient(45deg, hsl(var(--background)) 0%, hsl(var(--muted)) 50%, hsl(var(--background)) 100%)",
        "grid": "linear-gradient(hsl(var(--primary) / 0.2) 2px, transparent 2px), linear-gradient(90deg, hsl(var(--primary) / 0.2) 2px, transparent 2px)",
        "diagonal-stripes": "repeating-linear-gradient(45deg, hsl(var(--accent) / 0.1) 0px, hsl(var(--accent) / 0.1) 2px, transparent 2px, transparent 12px)",
        "brutal-blocks": "linear-gradient(90deg, hsl(var(--secondary) / 0.1) 50%, transparent 50%), linear-gradient(hsl(var(--primary) / 0.1) 50%, transparent 50%)",
      },
      backgroundSize: {
        "grid": "24px 24px",
        "brutal-blocks": "40px 40px",
      },
      transitionTimingFunction: {
        "brutal": "cubic-bezier(0.4, 0, 0.2, 1)",
        "brutal-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      containers: {
        "brutal": "1200px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    function({ addUtilities }) {
      addUtilities({
        ".text-shadow-brutal": {
          textShadow: "2px 2px 0px hsl(var(--primary) / 0.2)",
        },
        ".text-shadow-brutal-secondary": {
          textShadow: "1px 1px 0px hsl(var(--secondary) / 0.2)",
        },
        ".text-shadow-brutal-accent": {
          textShadow: "1px 1px 0px hsl(var(--accent) / 0.2)",
        },
        ".text-shadow-glow": {
          textShadow: "var(--glow-primary)",
        },
        ".text-shadow-glow-secondary": {
          textShadow: "var(--glow-secondary)",
        },
        ".text-shadow-glow-accent": {
          textShadow: "var(--glow-accent)",
        },
        ".transform-brutal": {
          transform: "translate(-4px, -4px)",
        },
        ".transform-brutal-hover": {
          "&:hover": {
            transform: "translate(-6px, -6px)",
            transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
        ".border-neon": {
          border: "2px solid hsl(var(--primary))",
          boxShadow: "0 0 5px hsl(var(--primary) / 0.5), inset 0 0 5px hsl(var(--primary) / 0.1)",
        },
        ".border-neon-secondary": {
          border: "2px solid hsl(var(--secondary))",
          boxShadow: "0 0 5px hsl(var(--secondary) / 0.5), inset 0 0 5px hsl(var(--secondary) / 0.1)",
        },
        ".border-neon-accent": {
          border: "2px solid hsl(var(--accent))",
          boxShadow: "0 0 5px hsl(var(--accent) / 0.5), inset 0 0 5px hsl(var(--accent) / 0.1)",
        },
        ".focus-brutal": {
          "&:focus-visible": {
            outline: "var(--border-brutal) solid hsl(var(--primary))",
            outlineOffset: "var(--space-1)",
            boxShadow: "var(--glow-primary)",
          },
        },
        ".container-brutal": {
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 var(--space-6)",
          "@media (min-width: 640px)": {
            padding: "0 var(--space-8)",
          },
          "@media (min-width: 1024px)": {
            padding: "0 var(--space-12)",
          },
        },
      });
    },
  ],
};