"use client";

import { useEffect } from "react";

interface KeyboardShortcutsProps {
  onLaunchApp: (appName: string) => void;
  onCloseWindow: (appName: string) => void;
  onGridSnap: () => void;
  activeWindow: string | null;
  openWindows: { appName: string }[];
}

const DEFAULT_APPS = ["terminal", "files", "editor", "browser", "resume"];

export function useKeyboardShortcuts({
  onLaunchApp,
  onCloseWindow,
  onGridSnap,
  activeWindow,
  openWindows,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Number (1-5): Launch/focus default apps
      if (e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
        const key = e.key;
        const num = parseInt(key);

        if (num >= 1 && num <= 5) {
          e.preventDefault();
          const appName = DEFAULT_APPS[num - 1];
          onLaunchApp(appName);
          return;
        }

        // Alt + G: Grid snap
        if (key.toLowerCase() === "g") {
          e.preventDefault();
          onGridSnap();
          return;
        }
      }

      // Escape: Close active window
      if (e.key === "Escape" && activeWindow && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Don't close if user is typing in an input or textarea
        const activeElement = document.activeElement;
        if (
          activeElement?.tagName === "INPUT" ||
          activeElement?.tagName === "TEXTAREA"
        ) {
          return;
        }

        e.preventDefault();
        onCloseWindow(activeWindow);
        return;
      }

      // Alt + W: Close active window
      if (
        e.altKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.metaKey &&
        e.key.toLowerCase() === "w" &&
        activeWindow
      ) {
        e.preventDefault();
        onCloseWindow(activeWindow);
        return;
      }

      // Alt + Tab: Cycle through windows (basic implementation)
      if (e.altKey && e.key === "Tab" && openWindows.length > 1) {
        e.preventDefault();
        const currentIndex = openWindows.findIndex(
          (w) => w.appName === activeWindow
        );
        const nextIndex = (currentIndex + 1) % openWindows.length;
        const nextWindow = openWindows[nextIndex];
        onLaunchApp(nextWindow.appName); // This will focus it
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onLaunchApp, onCloseWindow, onGridSnap, activeWindow, openWindows]);
}
