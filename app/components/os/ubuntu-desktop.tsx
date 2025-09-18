"use client";

import { useState, useEffect } from "react";
import { TopBar } from "./top-bar";
import { WindowManager } from "./window-manager";
import { SideDock } from "./side-dock";

interface WindowState {
  appName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  zIndex?: number;
}

export function UbuntuDesktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const getWindowSize = (appName: string) => {
    if (typeof window === "undefined") {
      return { width: 800, height: 600 }; // Fallback for SSR
    }

    switch (appName) {
      case "resume":
        return {
          width: 450,
          height: 350,
        };
      case "browser":
        return {
          width: Math.min(600, window.innerWidth - 200),
          height: Math.min(700, window.innerHeight - 150),
        };
      case "terminal":
        return {
          width: Math.min(800, window.innerWidth - 150),
          height: Math.min(750, window.innerHeight - 100),
        };
      case "files":
        return {
          width: window.innerWidth - 100, // Maximum width minus side dock (64px) + margins
          height: window.innerHeight - 80, // Maximum height minus top bar (36px) + margins
        };
      case "editor":
        return {
          width: Math.min(1000, window.innerWidth - 100),
          height: Math.min(window.innerHeight - 80, 900),
        };
      default:
        return {
          width: Math.min(800, window.innerWidth - 150),
          height: Math.min(600, window.innerHeight - 150),
        };
    }
  };

  // Load window state from URL on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const openAppsParam = params.get("apps");
    if (openAppsParam) {
      try {
        const appNames = JSON.parse(atob(openAppsParam));
        // Open windows in default positions (offset for side dock)
        const defaultWindows = appNames.map(
          (appName: string, index: number) => {
            const windowSize = getWindowSize(appName);
            return {
              appName,
              x: 80 + index * 30, // Offset for side dock (64px + 16px margin)
              y: 50 + index * 30,
              width: windowSize.width,
              height: windowSize.height,
              zIndex: 1000 + index,
            };
          },
        );
        setOpenWindows(defaultWindows);
        if (appNames.length > 0) {
          setActiveWindow(appNames[appNames.length - 1]);
        }
      } catch {
        console.warn("Failed to parse apps from URL");
      }
    } else {
      // Auto-open terminal if no apps in URL (offset for side dock)
      const windowSize = getWindowSize("terminal");
      const terminalWindow: WindowState = {
        appName: "terminal",
        x: 80, // Offset for side dock
        y: 50,
        width: windowSize.width,
        height: windowSize.height,
        zIndex: 1000, // Start with base z-index since it's the only window
      };
      setOpenWindows([terminalWindow]);
      setActiveWindow("terminal");
    }
  }, []);

  // Update URL only when windows open/close, not when moved
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const openAppNames = openWindows.map((w) => w.appName);

    if (openAppNames.length > 0) {
      params.set("apps", btoa(JSON.stringify(openAppNames)));
    } else {
      params.delete("apps");
    }

    const newUrl = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
    window.history.replaceState({}, "", newUrl);
  }, [openWindows]); // Only trigger on window count change

  const handleLaunchApp = (appName: string) => {
    // Check if app is already open
    const existingWindow = openWindows.find((w) => w.appName === appName);
    if (existingWindow) {
      // Bring to front
      setActiveWindow(appName);
      return;
    }

    // Create new window (offset for side dock)
    // Find the highest current z-index and add 1 to ensure new window is on top
    const maxZIndex = Math.max(...openWindows.map((w) => w.zIndex || 0), 999);
    const windowSize = getWindowSize(appName);

    const newWindow: WindowState = {
      appName,
      x: 80 + openWindows.length * 30, // Offset for side dock
      y: 50 + openWindows.length * 30,
      width: windowSize.width,
      height: windowSize.height,
      zIndex: maxZIndex + 1,
    };

    setOpenWindows((prev) => [...prev, newWindow]);
    setActiveWindow(appName);
  };

  const handleCloseWindow = (appName: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.appName !== appName));
    if (activeWindow === appName) {
      setActiveWindow(null);
    }
  };

  const handleUpdateWindow = (
    appName: string,
    updates: Partial<WindowState>,
  ) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.appName === appName ? { ...w, ...updates } : w)),
    );
  };

  const handleActivateWindow = (appName: string) => {
    // Find the highest current z-index
    const maxZIndex = Math.max(...openWindows.map((w) => w.zIndex || 0));

    // Update the clicked window to have the highest z-index and restore if minimized
    setOpenWindows((prev) =>
      prev.map((w) =>
        w.appName === appName
          ? { ...w, zIndex: maxZIndex + 1, isMinimized: false }
          : w,
      ),
    );

    setActiveWindow(appName);
  };

  const handleDesktopClick = () => {
    setActiveWindow(null);
  };

  const handleTileWindows = (mode: "grid" | "cascade") => {
    if (typeof window === "undefined" || openWindows.length === 0) return;

    const screenWidth = window.innerWidth - 80; // Account for side dock
    const screenHeight = window.innerHeight - 50; // Account for top bar
    const startX = 80; // Side dock offset
    const startY = 50; // Top bar offset

    let newWindows: WindowState[] = [];

    switch (mode) {
      case "grid": {
        const windowCount = openWindows.length;

        // Better grid algorithm that maximizes space usage
        let cols, rows;
        if (windowCount <= 1) {
          cols = 1;
          rows = 1;
        } else if (windowCount <= 2) {
          cols = 2;
          rows = 1;
        } else if (windowCount <= 4) {
          cols = 2;
          rows = 2;
        } else if (windowCount <= 6) {
          cols = 3;
          rows = 2;
        } else if (windowCount <= 9) {
          cols = 3;
          rows = 3;
        } else if (windowCount <= 12) {
          cols = 4;
          rows = 3;
        } else {
          // For larger numbers, use optimal arrangement
          cols = Math.ceil(Math.sqrt(windowCount));
          rows = Math.ceil(windowCount / cols);
        }

        const windowWidth = Math.floor(screenWidth / cols);
        const windowHeight = Math.floor(screenHeight / rows);

        newWindows = openWindows.map((window, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;

          // For the last row, spread windows evenly if there are fewer than cols
          const windowsInThisRow = Math.min(cols, windowCount - row * cols);
          const isLastRow = row === rows - 1 && windowsInThisRow < cols;

          let actualX, actualWidth;
          if (isLastRow) {
            // Distribute remaining windows evenly across the full width
            const totalWidthForRow = screenWidth;
            const widthPerWindow = Math.floor(
              totalWidthForRow / windowsInThisRow,
            );
            actualX = startX + col * widthPerWindow;
            actualWidth = widthPerWindow - 8;
          } else {
            actualX = startX + col * windowWidth;
            actualWidth = windowWidth - 8;
          }

          return {
            ...window,
            x: actualX,
            y: startY + row * windowHeight,
            width: actualWidth,
            height: windowHeight - 8,
            isMinimized: false,
          };
        });
        break;
      }
      case "cascade": {
        newWindows = openWindows.map((window, index) => ({
          ...window,
          x: startX + index * 40,
          y: startY + index * 40,
          width: Math.min(800, screenWidth - index * 40 - 50),
          height: Math.min(600, screenHeight - index * 40 - 50),
          isMinimized: false,
        }));
        break;
      }
    }

    // Apply tiling with smooth animation
    setOpenWindows(newWindows);

    // Brief visual feedback
    const windowElements = document.querySelectorAll(".ubuntu-window");
    windowElements.forEach((el) => {
      el.classList.add("animate-tile-snap");
      setTimeout(() => {
        el.classList.remove("animate-tile-snap");
      }, 300);
    });
  };

  return (
    <div
      className="ubuntu-desktop fixed inset-0 w-full h-full overflow-hidden"
      style={{
        backgroundImage: "url(/wallpaper.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#1a1a1a",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      onClick={handleDesktopClick}
    >
      {/* Side Dock */}
      <div onClick={(e) => e.stopPropagation()}>
        <SideDock
          onLaunchApp={handleLaunchApp}
          onActivateWindow={handleActivateWindow}
          openWindows={openWindows.map((w) => w.appName)}
        />
      </div>

      {/* Top Bar */}
      <div onClick={handleDesktopClick}>
        <TopBar
          openWindows={openWindows}
          activeWindow={activeWindow}
          onActivateWindow={handleActivateWindow}
          onCloseWindow={handleCloseWindow}
          onMinimizeWindow={(appName) => {
            handleUpdateWindow(appName, { isMinimized: true });
          }}
          onTileWindows={handleTileWindows}
        />
      </div>

      {/* Window Manager */}
      <div onClick={(e) => e.stopPropagation()}>
        <WindowManager
          openWindows={openWindows}
          activeWindow={activeWindow}
          onUpdateWindow={handleUpdateWindow}
          onCloseWindow={handleCloseWindow}
          onActivateWindow={handleActivateWindow}
        />
      </div>
    </div>
  );
}
