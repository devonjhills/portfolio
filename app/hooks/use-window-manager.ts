import { useState, useCallback, useEffect, useMemo } from "react";
import { WindowState } from "@/app/types/window";
import {
  calculateGridLayout,
  getWindowDefaultSize,
  getContentComplexity,
} from "@/app/utils/window-layout";
import {
  SIDE_DOCK_WIDTH,
  BOTTOM_DOCK_HEIGHT,
  TOP_BAR_HEIGHT,
  PADDING,
} from "@/app/constants/layout";

export function useWindowManager() {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [hasManuallyPositioned, setHasManuallyPositioned] =
    useState<boolean>(false);

  const rearrangeWindows = useCallback(
    (windowsToArrange: WindowState[], forceRearrange = false) => {
      if (typeof window === "undefined") return windowsToArrange;

      const isMobile = window.innerWidth < 768;

      // Mobile: full-screen layout for all windows
      if (isMobile) {
        return windowsToArrange.map((win, index) => ({
          ...win,
          x: 0,
          y: TOP_BAR_HEIGHT,
          width: window.innerWidth,
          height: window.innerHeight - TOP_BAR_HEIGHT - BOTTOM_DOCK_HEIGHT,
          // Only show the most recently active window (highest zIndex)
          isMinimized: index < windowsToArrange.length - 1,
        }));
      }

      // Desktop: If windows have been manually positioned, don't override unless forced
      if (hasManuallyPositioned && !forceRearrange) {
        return windowsToArrange;
      }

      const gridPositions = calculateGridLayout(
        windowsToArrange.length,
        window.innerWidth,
        window.innerHeight,
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
      // If updating position, mark as manually positioned to prevent auto-rearrangement
      if (updates.x !== undefined || updates.y !== undefined) {
        setHasManuallyPositioned(true);
      }
      setOpenWindows((prev) => {
        const newWindows = prev.map((w) => {
          if (w.appName === appName) {
            const updated = { ...w, ...updates };
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
      if (typeof window === "undefined") return;

      const isMobile = window.innerWidth < 768;
      const windowToActivate = appName;

      setOpenWindows((prev) => {
        const existingWindow = prev.find((w) => w.appName === appName);
        if (existingWindow) {
          // On mobile, minimize all other windows when activating this one
          if (isMobile) {
            return prev.map((w) =>
              w.appName === appName
                ? { ...w, isMinimized: false }
                : { ...w, isMinimized: true }
            );
          }
          return prev;
        }

        const newWindow: WindowState = {
          ...getWindowDefaultSize(appName),
          appName,
          x: isMobile ? 0 : SIDE_DOCK_WIDTH + PADDING + prev.length * 30,
          y: isMobile ? TOP_BAR_HEIGHT : TOP_BAR_HEIGHT + PADDING + prev.length * 30,
          width: isMobile ? window.innerWidth : getWindowDefaultSize(appName).width,
          height: isMobile
            ? window.innerHeight - TOP_BAR_HEIGHT - BOTTOM_DOCK_HEIGHT
            : getWindowDefaultSize(appName).height,
          zIndex: Math.max(...prev.map((w) => w.zIndex || 1000), 999) + 1,
        };

        // On mobile, minimize all existing windows
        let newWindows: WindowState[];
        if (isMobile) {
          newWindows = [...prev.map(w => ({ ...w, isMinimized: true })), newWindow];
        } else {
          newWindows = [...prev, newWindow];
          // Desktop: Always auto-arrange new windows into grid layout
          newWindows = rearrangeWindows(newWindows, true);
        }

        return newWindows;
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

      // Reset manual positioning flag and clear all maximized states
      setHasManuallyPositioned(false);

      // Clear maximized state from all windows before rearranging
      const unmaximizedWindows = prev.map((w) => ({
        ...w,
        isMaximized: false,
        previousPosition: undefined,
      }));

      return rearrangeWindows(unmaximizedWindows, true);
    });
  }, [rearrangeWindows]);

  const handleMaximizeWindow = useCallback(
    (appName: string) => {
      if (typeof window === "undefined") return;

      const isMobile = window.innerWidth < 768;

      // Focus the window when maximizing
      handleActivateWindow(appName);

      setOpenWindows((prev) => {
        return prev.map((w) => {
          if (w.appName === appName) {
            if (w.isMaximized) {
              // Restore to grid layout instead of previous position
              setHasManuallyPositioned(false);
              const restored = {
                ...w,
                isMaximized: false,
                previousPosition: undefined,
              };
              return restored;
            } else {
              // Maximize window with padding (account for mobile bottom dock)
              const maximized = {
                ...w,
                isMaximized: true,
                previousPosition: {
                  x: w.x,
                  y: w.y,
                  width: w.width,
                  height: w.height,
                },
                x: isMobile ? 0 : SIDE_DOCK_WIDTH + PADDING,
                y: isMobile ? TOP_BAR_HEIGHT : TOP_BAR_HEIGHT + PADDING,
                width: isMobile
                  ? window.innerWidth
                  : window.innerWidth - SIDE_DOCK_WIDTH - PADDING * 2,
                height: isMobile
                  ? window.innerHeight - TOP_BAR_HEIGHT - BOTTOM_DOCK_HEIGHT
                  : window.innerHeight - TOP_BAR_HEIGHT - PADDING * 2,
              };
              // Mark as manually positioned to prevent auto-rearrangement
              setHasManuallyPositioned(true);
              return maximized;
            }
          }
          return w;
        });
      });

      // After restoring from maximize, trigger grid layout rearrangement
      setTimeout(() => {
        setOpenWindows((prev) => {
          const targetWindow = prev.find((w) => w.appName === appName);
          if (targetWindow && !targetWindow.isMaximized) {
            return rearrangeWindows(prev, true);
          }
          return prev;
        });
      }, 0);
    },
    [rearrangeWindows, handleActivateWindow],
  );

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

    // Apply grid layout to initial windows
    const arrangedWindows = rearrangeWindows(initialWindows, true);
    setOpenWindows(arrangedWindows);
    setActiveWindow(
      arrangedWindows.length > 0
        ? arrangedWindows[arrangedWindows.length - 1].appName
        : null,
    );
  }, [rearrangeWindows]);

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
    handleMaximizeWindow,
    handleGridSnap,
    handleCloseAll,
  };
}
