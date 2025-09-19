import { useRef, useCallback } from "react";
import { WindowState } from "@/app/types/window";

interface DragState {
  isDragging: boolean;
  isResizing: boolean;
  resizeDirection: string;
  startX: number;
  startY: number;
  startWindowX: number;
  startWindowY: number;
  startWidth: number;
  startHeight: number;
  currentWindow: string | null;
}

export function useWindowDrag(
  openWindows: WindowState[],
  onUpdateWindow: (appName: string, updates: Partial<WindowState>) => void,
  onActivateWindow: (appName: string) => void,
) {
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    isResizing: false,
    resizeDirection: "",
    startX: 0,
    startY: 0,
    startWindowX: 0,
    startWindowY: 0,
    startWidth: 0,
    startHeight: 0,
    currentWindow: null,
  });

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent,
      appName: string,
      action: "drag" | "resize",
      direction: string = "se",
    ) => {
      e.preventDefault();
      const window = openWindows.find((w) => w.appName === appName);
      if (!window) return;

      dragStateRef.current = {
        isDragging: action === "drag",
        isResizing: action === "resize",
        resizeDirection: direction,
        startX: e.clientX,
        startY: e.clientY,
        startWindowX: window.x,
        startWindowY: window.y,
        startWidth: window.width,
        startHeight: window.height,
        currentWindow: appName,
      };

      onActivateWindow(appName);

      const handleMouseMove = (e: MouseEvent) => {
        const state = dragStateRef.current;
        if (!state.currentWindow) return;

        const deltaX = e.clientX - state.startX;
        const deltaY = e.clientY - state.startY;

        requestAnimationFrame(() => {
          if (state.isDragging) {
            onUpdateWindow(state.currentWindow!, {
              x: Math.max(0, state.startWindowX + deltaX),
              y: Math.max(32, state.startWindowY + deltaY), // Account for top bar
            });
          } else if (state.isResizing) {
            const updates: Partial<WindowState> = {};
            if (state.resizeDirection.includes("e")) {
              updates.width = Math.max(400, state.startWidth + deltaX);
            }
            if (state.resizeDirection.includes("w")) {
              const newWidth = Math.max(400, state.startWidth - deltaX);
              updates.width = newWidth;
              updates.x = state.startWindowX + (state.startWidth - newWidth);
            }
            if (state.resizeDirection.includes("s")) {
              updates.height = Math.max(300, state.startHeight + deltaY);
            }
            onUpdateWindow(state.currentWindow!, updates);
          }
        });
      };

      const handleMouseUp = () => {
        dragStateRef.current.isDragging = false;
        dragStateRef.current.isResizing = false;
        dragStateRef.current.currentWindow = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      document.addEventListener("mouseup", handleMouseUp);
    },
    [openWindows, onUpdateWindow, onActivateWindow],
  );

  return { handleMouseDown };
}