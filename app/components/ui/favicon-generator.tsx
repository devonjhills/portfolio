"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function FaviconGenerator() {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    // Get exact colors that match the Logo component
    const getColors = () => {
      if (currentTheme === "dark") {
        return {
          background: "hsl(150 100% 55%)", // exact primary color from CSS vars
          foreground: "hsl(210 20% 10%)", // exact primary-foreground from CSS vars
        };
      } else {
        return {
          background: "hsl(150 75% 36%)", // exact primary color from CSS vars
          foreground: "hsl(0 0% 100%)", // exact primary-foreground from CSS vars
        };
      }
    };

    // Create simple SVG favicon using the exact logo structure
    const createFavicon = () => {
      const colors = getColors();

      const svg = `
        <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 555 555" width="32" height="32">
          <defs>
            <clipPath id="circleClip">
              <circle cx="277.5" cy="277.5" r="277.5"/>
            </clipPath>
          </defs>
          <circle cx="277.5" cy="277.5" r="277.5" fill="${colors.background}"/>
          <g clip-path="url(#circleClip)">
            <path fill="${colors.background}" d="m-247-238h1024v1024h-1024zm491.5 336.5l-0.3 350.4 71.7 0.1c1.4-3.2 0.2-222.1 0.2-240.3l0.2-110.1zm-66.7 68.7c-39.5 1.5-74.7 15.3-101.8 44.4-52.2 55.9-50.4 150.7 6.7 202.5 21.1 19.2 47.1 31.3 75.6 34 10 0.9 21.4 0.7 31.5 0.7l40.3 0.1 0.2-20.4c0-22.1-0.3-45 0.1-67-17.1 14.5-31.8 22.1-54.7 20.2-64.3-5.4-90.1-86.5-39.6-127.4 15.3-12.4 33.1-17.9 52.8-15.9 18.1 2 27.9 7 41.6 18v-89c-17-0.3-35.8-0.7-52.7-0.2zm152.8 0.2l-0.1 81c23.4-16.3 56.4-12.5 75 9.3 15.2 17.8 16.1 38.4 16.1 60.5v29.6l0.1 101 61.6 0.1h9.1v-98.8c0-26.9 2.1-57.5-4.2-83.4-8.1-33.6-29.9-61.6-58.8-79.9-30.3-19.1-64-21.1-98.8-19.4z"/>
            <path fill="${colors.foreground}" d="m244.2 448.9 l0.3-400 71.8 0.1 -0.2 400 z"/>
            <path fill="${colors.foreground}" d="m230.1 448.9l-40.3-0.1c-10.1 0-21.5 0.2-31.5-0.7-28.5-2.6-54.5-14.8-75.6-33.9-57.1-51.8-58.9-146.7-6.8-202.6 27.2-29.1 62.3-42.9 101.9-44.4 16.9-0.5 35.7-0.1 52.7 0.2v89c-13.7-10.9-23.5-15.9-41.6-18-19.7-1.9-37.5 3.5-52.9 15.9-50.4 41-24.6 122 39.7 127.4 22.9 2 37.6-5.6 54.7-20.2-0.4 22.1-0.1 44.9-0.1 67.1z"/>
            <path fill="${colors.foreground}" d="m330.5 248.4l0.1-81c34.8-1.6 68.5 0.4 98.8 19.5 28.9 18.2 50.7 46.3 58.8 79.8 6.2 25.9 4.2 56.5 4.2 83.4v98.9h-9.1l-61.6-0.2-0.1-100.9v-29.7c0-22-0.9-42.7-16.1-60.5-18.6-21.7-51.6-25.6-75-9.3z"/>
          </g>
        </svg>
      `.trim();

      return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    };

    // Update favicon
    const updateFavicon = () => {
      let favicon = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }

      favicon.href = createFavicon();
    };

    // Update on theme change
    updateFavicon();

    // Also update apple-touch-icon
    let appleTouchIcon = document.querySelector(
      'link[rel="apple-touch-icon"]',
    ) as HTMLLinkElement;
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement("link");
      appleTouchIcon.rel = "apple-touch-icon";
      appleTouchIcon.sizes = "180x180";
      document.head.appendChild(appleTouchIcon);
    }
    appleTouchIcon.href = createFavicon();
  }, [theme, systemTheme]);

  return null; // This component only manages favicon, no render
}
