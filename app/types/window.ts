export type ViewMode = "snap" | "floating";

export interface WindowState {
  appName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  isMaximized?: boolean;
  previousPosition?: { x: number; y: number; width: number; height: number };
  zIndex?: number;
}

export interface WindowManagerProps {
  openWindows: WindowState[];
  activeWindow: string | null;
  onUpdateWindow: (appName: string, updates: Partial<WindowState>) => void;
  onCloseWindow: (appName: string) => void;
  onActivateWindow: (appName: string) => void;
  onMaximizeWindow: (appName: string) => void;
  wallpaperProps?: {
    onWallpaperChange: (wallpaper: string) => void;
    currentWallpaper: string;
    onCloseWindow: (appName: string) => void;
  };
  activitiesProps?: {
    openWindows: WindowState[];
    activeWindow: string | null;
    onActivateWindow: (appName: string) => void;
    onCloseWindow: (appName: string) => void;
    onMinimizeWindow: (appName: string) => void;
    onGridSnap: () => void;
    onCloseAll: () => void;
  };
  terminalProps?: {
    onLaunchApp: (appName: string) => void;
  };
}
