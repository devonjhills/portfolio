"use client";

import { useState, useEffect } from "react";
import { TopBar } from "./top-bar";
import { WindowManager } from "./window-manager";
import { SideDock } from "./side-dock";
import { DesktopContextMenu } from "./wallpaper-context-menu";
import { ActivitiesDrawer } from "./activities-drawer";
import { useWindowManager } from "@/app/hooks/use-window-manager";

export function UbuntuDesktop() {
  const [wallpaperUrl, setWallpaperUrl] = useState<string>("");
  const [isWallpaperLoaded, setIsWallpaperLoaded] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    isVisible: boolean;
  }>({
    x: 0,
    y: 0,
    isVisible: false,
  });

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
    // Load saved wallpaper from localStorage or use default
    const savedWallpaper = localStorage.getItem("desktop-wallpaper");
    const wallpaper = savedWallpaper || "/wallpapers/wallpaper.jpg";
    setWallpaperUrl(wallpaper);
    setIsWallpaperLoaded(true);
  }, []);

  const handleWallpaperChange = (newWallpaper: string) => {
    setWallpaperUrl(newWallpaper);
    localStorage.setItem("desktop-wallpaper", newWallpaper);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      isVisible: true,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu((prev) => ({ ...prev, isVisible: false }));
  };

  const handleWallpaperWindow = () => {
    handleLaunchApp("wallpaper");
  };

  const handleActivitiesOpen = () => {
    setIsActivitiesOpen(true);
  };

  const handleActivitiesClose = () => {
    setIsActivitiesOpen(false);
  };

  return (
    <div
      className="ubuntu-desktop fixed inset-0 w-full h-full overflow-hidden bg-black"
      style={
        isWallpaperLoaded && wallpaperUrl
          ? {
              backgroundImage: `url(${wallpaperUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.stopPropagation()}
      >
        <SideDock
          onLaunchApp={handleLaunchApp}
          onActivateWindow={handleActivateWindow}
          onActivitiesOpen={handleActivitiesOpen}
          openWindows={openWindows.map((w) => w.appName)}
        />
        <TopBar onActivitiesOpen={handleActivitiesOpen} />
        <WindowManager
          openWindows={openWindows}
          activeWindow={activeWindow}
          onUpdateWindow={handleUpdateWindow}
          onCloseWindow={handleCloseWindow}
          onActivateWindow={handleActivateWindow}
          onMaximizeWindow={handleMaximizeWindow}
          wallpaperProps={{
            onWallpaperChange: handleWallpaperChange,
            currentWallpaper: wallpaperUrl,
          }}
        />
      </div>

      <DesktopContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isVisible={contextMenu.isVisible}
        onClose={handleCloseContextMenu}
        onGridLayout={handleGridSnap}
        onWallpaperWindow={handleWallpaperWindow}
      />

      <ActivitiesDrawer
        isOpen={isActivitiesOpen}
        onClose={handleActivitiesClose}
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
    </div>
  );
}
