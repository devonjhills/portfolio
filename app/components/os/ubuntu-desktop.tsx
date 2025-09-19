"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { TopBar } from "./top-bar";
import { WindowManager } from "./window-manager";
import { SideDock } from "./side-dock";

// --- TYPE DEFINITION --- //
interface WindowState {
  appName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  zIndex?: number;
}

// --- LAYOUT CONSTANTS --- //
const SIDE_DOCK_WIDTH = 80;
const TOP_BAR_HEIGHT = 50;
const PADDING = 20;
const MIN_WINDOW_WIDTH = 400;
const MIN_WINDOW_HEIGHT = 300;

/**
 * A robust, pure function to calculate grid positions for a given number of windows.
 * It intelligently determines rows/columns and distributes windows evenly.
 */
const calculateGridLayout = (
  windowCount: number,
  containerWidth: number,
  containerHeight: number,
): Array<Pick<WindowState, "x" | "y" | "width" | "height">> => {
  if (windowCount === 0) return [];

  const availableWidth = containerWidth - SIDE_DOCK_WIDTH - PADDING;
  const availableHeight = containerHeight - TOP_BAR_HEIGHT - PADDING;

  if (windowCount === 1) {
    return [
      {
        x: SIDE_DOCK_WIDTH + PADDING,
        y: TOP_BAR_HEIGHT + PADDING,
        width: Math.min(1000, availableWidth - PADDING),
        height: Math.min(750, availableHeight - PADDING),
      },
    ];
  }

  // Intelligently determine the number of columns and rows
  const cols = Math.ceil(
    Math.sqrt(windowCount * (availableWidth / availableHeight)),
  );
  const rows = Math.ceil(windowCount / cols);

  const windowWidth = Math.max(
    MIN_WINDOW_WIDTH,
    (availableWidth - (cols - 1) * PADDING) / cols,
  );
  const windowHeight = Math.max(
    MIN_WINDOW_HEIGHT,
    (availableHeight - (rows - 1) * PADDING) / rows,
  );

  return Array.from({ length: windowCount }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    return {
      x: SIDE_DOCK_WIDTH + col * (windowWidth + PADDING),
      y: TOP_BAR_HEIGHT + row * (windowHeight + PADDING),
      width: windowWidth,
      height: windowHeight,
    };
  });
};

export function UbuntuDesktop() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  // --- MEMOIZED HELPER FUNCTIONS (ORDER MATTERS) --- //

  const rearrangeWindows = useCallback((windowsToArrange: WindowState[]) => {
    if (typeof window === "undefined") return windowsToArrange;
    const gridPositions = calculateGridLayout(
      windowsToArrange.length,
      window.innerWidth,
      window.innerHeight,
    );
    // Sort by appName to maintain a consistent order during rearrangements
    const sortedWindows = [...windowsToArrange].sort((a, b) =>
      a.appName.localeCompare(b.appName),
    );
    return sortedWindows.map((win, index) => ({
      ...win,
      ...gridPositions[index],
    }));
  }, []);

  const getWindowDefaultSize = useCallback((appName: string) => {
    if (typeof window === "undefined") return { width: 800, height: 600 };
    const maxWidth = window.innerWidth - SIDE_DOCK_WIDTH - PADDING * 2;
    const maxHeight = window.innerHeight - TOP_BAR_HEIGHT - PADDING * 2;

    switch (appName) {
      case "resume":
        return { width: 450, height: 350 };
      case "browser":
        return {
          width: Math.max(MIN_WINDOW_WIDTH, Math.min(600, maxWidth)),
          height: Math.max(MIN_WINDOW_HEIGHT, Math.min(700, maxHeight)),
        };
      case "terminal":
        return {
          width: Math.max(MIN_WINDOW_WIDTH, Math.min(800, maxWidth)),
          height: Math.max(MIN_WINDOW_HEIGHT, Math.min(750, maxHeight)),
        };
      case "editor":
        return {
          width: Math.max(MIN_WINDOW_WIDTH, Math.min(1000, maxWidth)),
          height: Math.max(MIN_WINDOW_HEIGHT, Math.min(900, maxHeight)),
        };
      case "files":
        return {
          width: Math.max(MIN_WINDOW_WIDTH, Math.min(1200, maxWidth)),
          height: Math.max(MIN_WINDOW_HEIGHT, Math.min(800, maxHeight)),
        };
      default:
        return {
          width: Math.max(MIN_WINDOW_WIDTH, Math.min(800, maxWidth)),
          height: Math.max(MIN_WINDOW_HEIGHT, Math.min(600, maxHeight)),
        };
    }
  }, []);

  // --- MEMOIZED HANDLERS (ORDER MATTERS) --- //

  // Level 1 Callbacks (no dependencies on other handlers)
  const handleUpdateWindow = useCallback(
    (appName: string, updates: Partial<WindowState>) => {
      setOpenWindows((prev) =>
        prev.map((w) => (w.appName === appName ? { ...w, ...updates } : w)),
      );
    },
    [],
  );

  const handleActivateWindow = useCallback((appName: string) => {
    setOpenWindows((prev) => {
      const maxZIndex = Math.max(...prev.map((w) => w.zIndex || 1000));
      return prev.map((w) =>
        w.appName === appName
          ? { ...w, zIndex: maxZIndex + 1, isMinimized: false }
          : w,
      );
    });
    setActiveWindow(appName);
  }, []);

  const handleDesktopClick = useCallback(() => {
    setActiveWindow(null);
  }, []);

  // Level 2 Callbacks (depend on Level 1 handlers)
  const handleLaunchApp = useCallback(
    (appName: string) => {
      const windowToActivate = appName;
      setOpenWindows((prev) => {
        const existingWindow = prev.find((w) => w.appName === appName);
        if (existingWindow) {
          // If window exists, we just need to activate it. No state change here.
          return prev;
        }

        const newWindow: WindowState = {
          ...getWindowDefaultSize(appName),
          appName,
          x: 0,
          y: 0, // Will be set by rearrange
          zIndex: Math.max(...prev.map((w) => w.zIndex || 1000), 999) + 1,
        };
        const updatedWindows = [...prev, newWindow];
        return rearrangeWindows(updatedWindows);
      });

      // Activation logic always runs
      handleActivateWindow(windowToActivate);
    },
    [getWindowDefaultSize, rearrangeWindows, handleActivateWindow],
  );

  const handleCloseWindow = useCallback(
    (appName: string) => {
      setOpenWindows((prev) => {
        const remainingWindows = prev.filter((w) => w.appName !== appName);
        if (activeWindow === appName) {
          const nextActive =
            remainingWindows.length > 0
              ? remainingWindows.reduce((a, b) =>
                  (a.zIndex || 0) > (b.zIndex || 0) ? a : b,
                ).appName
              : null;
          setActiveWindow(nextActive);
        }
        return rearrangeWindows(remainingWindows);
      });
    },
    [activeWindow, rearrangeWindows],
  );

  const handleTileWindows = useCallback(
    (mode: "grid" | "cascade") => {
      if (typeof window === "undefined") return;

      setOpenWindows((prev) => {
        if (prev.length === 0) return prev;
        if (mode === "grid") {
          return rearrangeWindows(prev);
        } else {
          // cascade
          const baseWidth = Math.min(
            800,
            window.innerWidth - SIDE_DOCK_WIDTH - PADDING * 2,
          );
          const baseHeight = Math.min(
            600,
            window.innerHeight - TOP_BAR_HEIGHT - PADDING * 2,
          );
          return prev.map((win, index) => ({
            ...win,
            x: SIDE_DOCK_WIDTH + index * 40,
            y: TOP_BAR_HEIGHT + index * 40,
            width: Math.max(MIN_WINDOW_WIDTH, baseWidth - index * 40),
            height: Math.max(MIN_WINDOW_HEIGHT, baseHeight - index * 40),
            isMinimized: false,
          }));
        }
      });
    },
    [rearrangeWindows],
  );

  // --- EFFECTS --- //

  // Effect for initial load from URL or default state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const openAppsParam = params.get("apps");
    let initialWindows: WindowState[] = [];

    if (openAppsParam) {
      try {
        const appNames: string[] = JSON.parse(atob(openAppsParam));
        initialWindows = appNames.map((appName, index) => ({
          ...getWindowDefaultSize(appName),
          appName,
          x: 0,
          y: 0,
          zIndex: 1000 + index,
        }));
      } catch (e) {
        console.warn(
          "Failed to parse apps from URL, falling back to default.",
          e,
        );
      }
    }

    if (initialWindows.length === 0) {
      initialWindows.push({
        ...getWindowDefaultSize("terminal"),
        appName: "terminal",
        x: 0,
        y: 0,
        zIndex: 1000,
      });
    }

    setOpenWindows(rearrangeWindows(initialWindows));
    setActiveWindow(
      initialWindows.length > 0
        ? initialWindows[initialWindows.length - 1].appName
        : null,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Optimized effect to update URL only when app list changes
  const openAppNamesString = useMemo(
    () =>
      openWindows
        .map((w) => w.appName)
        .sort()
        .join(","),
    [openWindows],
  );
  useEffect(() => {
    const openAppNames = openAppNamesString
      ? openAppNamesString.split(",")
      : [];
    const params = new URLSearchParams(window.location.search);
    if (openAppNames.length > 0) {
      params.set("apps", btoa(JSON.stringify(openAppNames)));
    } else {
      params.delete("apps");
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    // Use replaceState to avoid cluttering browser history
    window.history.replaceState({ path: newUrl }, "", newUrl);
  }, [openAppNamesString]);

  // Debounced effect for rearranging windows on browser resize
  useEffect(() => {
    if (openWindows.length <= 1) return;

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setOpenWindows((prev) => rearrangeWindows(prev));
      }, 300); // 300ms debounce delay
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openWindows.length, rearrangeWindows]);

  return (
    <div
      className="ubuntu-desktop fixed inset-0 w-full h-full overflow-hidden bg-gray-900"
      style={{
        backgroundImage: "url(/wallpaper.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleDesktopClick}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <SideDock
          onLaunchApp={handleLaunchApp}
          onActivateWindow={handleActivateWindow}
          openWindows={openWindows.map((w) => w.appName)}
        />
        <TopBar
          openWindows={openWindows}
          activeWindow={activeWindow}
          onActivateWindow={handleActivateWindow}
          onCloseWindow={handleCloseWindow}
          onMinimizeWindow={(appName) =>
            handleUpdateWindow(appName, { isMinimized: true })
          }
          onTileWindows={handleTileWindows}
        />
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
