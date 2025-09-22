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
}
