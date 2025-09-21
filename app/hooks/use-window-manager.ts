import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { WindowState } from "@/app/types/window";
import {
  calculateGridLayout,
  getWindowDefaultSize,
  getContentComplexity,
} from "@/app/utils/window-layout";
import {
  SIDE_DOCK_WIDTH,
  TOP_BAR_HEIGHT,
  PADDING,
  MIN_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
} from "@/app/constants/layout";

export function useWindowManager() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [hasManuallyPositioned, setHasManuallyPositioned] =
    useState<boolean>(false);

  const rearrangeWindows = useCallback(
    (windowsToArrange: WindowState[], forceRearrange = false) => {
      if (typeof window === "undefined") return windowsToArrange;

      // If windows have been manually positioned, don't override unless forced (like grid snap button)
      if (hasManuallyPositioned && !forceRearrange) {
        console.log("✅ Skipping rearrange - manually positioned");
        return windowsToArrange;
      }

      console.log(
        "🎯 Applying grid layout for",
        windowsToArrange.length,
        "windows",
      );
      const gridPositions = calculateGridLayout(
        windowsToArrange.length,
        window.innerWidth,
        window.innerHeight,
        windowsToArrange,
      );
      const sortedWindows = [...windowsToArrange].sort(
        (a, b) =>
          getContentComplexity(b.appName) - getContentComplexity(a.appName),
      );
      return sortedWindows.map((win, index) => ({
        ...win,
        ...gridPositions[index],
      }));
    },
    [hasManuallyPositioned],
  );

  const handleUpdateWindow = useCallback(
    (appName: string, updates: Partial<WindowState>) => {
      console.log("🔄 handleUpdateWindow:", appName, JSON.stringify(updates));

      // If updating position, mark as manually positioned to prevent auto-rearrangement
      if (updates.x !== undefined || updates.y !== undefined) {
        setHasManuallyPositioned(true);
      }
      setOpenWindows((prev) => {
        const newWindows = prev.map((w) => {
          if (w.appName === appName) {
            const updated = { ...w, ...updates };
            console.log(
              "📦 Window updated:",
              appName,
              "width from:",
              w.width,
              "to:",
              updated.width,
              "full update:",
              JSON.stringify(updated),
            );
            return updated;
          }
          return w;
        });
        return newWindows;
      });
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

  const handleLaunchApp = useCallback(
    (appName: string) => {
      const windowToActivate = appName;
      setOpenWindows((prev) => {
        const existingWindow = prev.find((w) => w.appName === appName);
        if (existingWindow) {
          return prev;
        }

        const newWindow: WindowState = {
          ...getWindowDefaultSize(appName),
          appName,
          x: SIDE_DOCK_WIDTH + PADDING + prev.length * 30,
          y: TOP_BAR_HEIGHT + PADDING + prev.length * 30,
          zIndex: Math.max(...prev.map((w) => w.zIndex || 1000), 999) + 1,
        };
        const newWindows = [...prev, newWindow];

        // Always auto-arrange new windows into grid layout
        return rearrangeWindows(newWindows, true);
      });

      handleActivateWindow(windowToActivate);
    },
    [handleActivateWindow, rearrangeWindows],
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

        // Always auto-arrange remaining windows to grid layout
        if (remainingWindows.length > 0) {
          return rearrangeWindows(remainingWindows, true);
        }

        return remainingWindows;
      });
    },
    [activeWindow, rearrangeWindows],
  );

  const handleGridSnap = useCallback(() => {
    if (typeof window === "undefined") return;

    setOpenWindows((prev) => {
      if (prev.length === 0) return prev;
      // Reset manual positioning flag and force grid arrangement
      setHasManuallyPositioned(false);
      return rearrangeWindows(prev, true);
    });
  }, [rearrangeWindows]);

  const handleCloseAll = useCallback(() => {
    setOpenWindows([]);
    setActiveWindow(null);
    setHasManuallyPositioned(false);
  }, []);


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
          x: SIDE_DOCK_WIDTH + PADDING + index * 30,
          y: TOP_BAR_HEIGHT + PADDING + index * 30,
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
        x: SIDE_DOCK_WIDTH + PADDING,
        y: TOP_BAR_HEIGHT + PADDING,
        zIndex: 1000,
      });
    }

    setOpenWindows(initialWindows);
    setActiveWindow(
      initialWindows.length > 0
        ? initialWindows[initialWindows.length - 1].appName
        : null,
    );
  }, []);

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
    window.history.replaceState({ path: newUrl }, "", newUrl);
  }, [openAppNamesString]);

  // Debounced effect for rearranging windows on browser resize - only if not manually positioned
  useEffect(() => {
    if (openWindows.length <= 1 || hasManuallyPositioned) return;

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setOpenWindows((prev) => rearrangeWindows(prev));
      }, 300);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openWindows.length, rearrangeWindows, hasManuallyPositioned]);

  return {
    openWindows,
    activeWindow,
    handleUpdateWindow,
    handleActivateWindow,
    handleDesktopClick,
    handleLaunchApp,
    handleCloseWindow,
    handleGridSnap,
    handleCloseAll,
  };
}
