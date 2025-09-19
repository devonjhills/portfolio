"use client";

import { TopBar } from "./top-bar";
import { WindowManager } from "./window-manager";
import { SideDock } from "./side-dock";
import { useWindowManager } from "@/app/hooks/use-window-manager";

export function UbuntuDesktop() {
  const {
    openWindows,
    activeWindow,
    handleUpdateWindow,
    handleActivateWindow,
    handleDesktopClick,
    handleLaunchApp,
    handleCloseWindow,
    handleTileWindows,
  } = useWindowManager();

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
