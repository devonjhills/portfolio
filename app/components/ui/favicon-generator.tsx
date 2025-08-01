"use client";

import { useEffect } from "react";

export function FaviconGenerator() {
  useEffect(() => {
    // Update favicon to use the PNG logo
    const updateFavicon = () => {
      let favicon = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }

      favicon.href = "/logo2.png";
    };

    // Update favicon
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
    appleTouchIcon.href = "/logo2.png";
  }, []);

  return null; // This component only manages favicon, no render
}
