export interface WindowState {
  appName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  zIndex?: number;
}

export interface WindowManagerProps {
  openWindows: WindowState[];
  activeWindow: string | null;
  onUpdateWindow: (appName: string, updates: Partial<WindowState>) => void;
  onCloseWindow: (appName: string) => void;
  onActivateWindow: (appName: string) => void;
}
