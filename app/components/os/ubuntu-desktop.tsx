"use client";

import { useState, useEffect } from "react";
import { TopBar } from "./top-bar";
import { WindowManager } from "./window-manager";
import { SideDock } from "./side-dock";
import { useWindowManager } from "@/app/hooks/use-window-manager";

export function UbuntuDesktop() {
  const [wallpaperUrl, setWallpaperUrl] = useState<string>("/wallpaper.jpg");

  const {
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
  } = useWindowManager();

  useEffect(() => {
    // Check which wallpaper format exists
    const checkWallpaper = async () => {
      try {
        // Try PNG first
        const pngResponse = await fetch("/wallpaper.png", { method: "HEAD" });
        if (pngResponse.ok) {
          setWallpaperUrl("/wallpaper.png");
          return;
        }

        // Fall back to JPG
        const jpgResponse = await fetch("/wallpaper.jpg", { method: "HEAD" });
        if (jpgResponse.ok) {
          setWallpaperUrl("/wallpaper.jpg");
          return;
        }
      } catch {
        // If both fail, default to JPG
        setWallpaperUrl("/wallpaper.jpg");
      }
    };

    checkWallpaper();
  }, []);

  return (
    <div
      className="ubuntu-desktop fixed inset-0 w-full h-full overflow-hidden bg-gray-900"
      style={{
        backgroundImage: `url(${wallpaperUrl})`,
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
          onGridSnap={handleGridSnap}
          onCloseAll={handleCloseAll}
        />
        <WindowManager
          openWindows={openWindows}
          activeWindow={activeWindow}
          onUpdateWindow={handleUpdateWindow}
          onCloseWindow={handleCloseWindow}
          onActivateWindow={handleActivateWindow}
          onMaximizeWindow={handleMaximizeWindow}
        />
      </div>
    </div>
  );
}
