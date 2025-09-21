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
  windowElement: HTMLElement | null;
  rafId: number | null;
  hasActuallyMoved: boolean;
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
    windowElement: null,
    rafId: null,
    hasActuallyMoved: false,
  });

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent,
      appName: string,
      action: "drag" | "resize",
      direction: string = "se",
    ) => {
      // Don't start drag if clicking on window control buttons
      const target = e.target as HTMLElement;
      console.log(
        "🔍 Click target:",
        target.className,
        "closest button:",
        target.closest("button"),
      );
      if (target.closest(".window-controls") || target.closest("button")) {
        console.log("🚫 Ignoring drag - clicked on window controls");
        return;
      }

      e.preventDefault();
      const window = openWindows.find((w) => w.appName === appName);
      if (!window) return;

      // Get the window element for direct DOM manipulation
      const windowElement = (e.target as HTMLElement).closest(
        ".ubuntu-window",
      ) as HTMLElement;
      if (!windowElement) return;

      // Cancel any pending animation frame
      if (dragStateRef.current.rafId) {
        cancelAnimationFrame(dragStateRef.current.rafId);
      }

      // Enable hardware acceleration and disable transitions during drag
      windowElement.style.willChange = "transform";
      windowElement.style.transition = "none";

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
        windowElement,
        rafId: null,
        hasActuallyMoved: false,
      };

      onActivateWindow(appName);
      console.log("🎯 Drag started for", appName, "action:", action);

      const handleMouseMove = (e: MouseEvent) => {
        const state = dragStateRef.current;
        if (!state.currentWindow || !state.windowElement) return;

        // Cancel previous frame if still pending
        if (state.rafId) {
          cancelAnimationFrame(state.rafId);
        }

        const deltaX = e.clientX - state.startX;
        const deltaY = e.clientY - state.startY;

        // Check if user has actually moved the mouse (minimum 5px to avoid accidental clicks)
        if (
          !state.hasActuallyMoved &&
          (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)
        ) {
          state.hasActuallyMoved = true;
          console.log("✅ User started actual drag movement");
        }

        // Use RAF for smooth 60fps updates
        state.rafId = requestAnimationFrame(() => {
          if (state.isDragging) {
            // Simple boundary constraints - allow some movement beyond edges to prevent sticking
            const newX = Math.max(-50, state.startWindowX + deltaX); // Allow 50px past left edge
            const newY = Math.max(32, state.startWindowY + deltaY); // Keep title bar accessible

            // Direct DOM manipulation for immediate visual feedback - ONLY position
            state.windowElement!.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
            state.windowElement!.style.left = "0px";
            state.windowElement!.style.top = "0px";
          } else if (state.isResizing) {
            let newWidth = state.startWidth;
            let newHeight = state.startHeight;
            let newX = state.startWindowX;

            // Simple resize constraints - just enforce minimums
            if (state.resizeDirection.includes("e")) {
              newWidth = Math.max(300, state.startWidth + deltaX);
            }
            if (state.resizeDirection.includes("w")) {
              newWidth = Math.max(300, state.startWidth - deltaX);
              newX = state.startWindowX + (state.startWidth - newWidth);
            }
            if (state.resizeDirection.includes("s")) {
              newHeight = Math.max(200, state.startHeight + deltaY);
            }

            // Direct DOM manipulation for resizing
            state.windowElement!.style.width = `${newWidth}px`;
            state.windowElement!.style.height = `${newHeight}px`;
            if (state.resizeDirection.includes("w")) {
              state.windowElement!.style.transform = `translate3d(${newX}px, ${state.startWindowY}px, 0)`;
              state.windowElement!.style.left = "0px";
              state.windowElement!.style.top = "0px";
            }
          }
          state.rafId = null;
        });
      };

      const handleMouseUp = () => {
        const state = dragStateRef.current;

        // Cancel any pending animation frame
        if (state.rafId) {
          cancelAnimationFrame(state.rafId);
          state.rafId = null;
        }

        // Restore normal rendering and clean up DOM optimizations
        if (state.windowElement) {
          state.windowElement.style.willChange = "auto";
          state.windowElement.style.transition = "";

          // Sync final position back to React state - ONLY if user actually moved the window
          if (
            state.isDragging &&
            state.currentWindow &&
            state.hasActuallyMoved
          ) {
            const transform = state.windowElement.style.transform;
            console.log("🎯 Transform at drag end:", transform);
            const translateMatch = transform.match(
              /translate3d\(([^,]+)px,\s*([^,]+)px,/,
            );
            if (translateMatch) {
              const finalX = parseFloat(translateMatch[1]);
              const finalY = parseFloat(translateMatch[2]);
              console.log("🎯 Parsed position:", { finalX, finalY });
              // Only update position during drag - don't change dimensions
              onUpdateWindow(state.currentWindow, { x: finalX, y: finalY });
            } else {
              console.log("❌ NO TRANSFORM MATCH - this is the bug!");
            }
          } else if (
            state.isDragging &&
            state.currentWindow &&
            !state.hasActuallyMoved
          ) {
            console.log(
              "🚫 Skipping position update - user just clicked, didn't drag",
            );
          } else if (state.isResizing && state.currentWindow) {
            // For resizing, get the actual dimensions from DOM
            const updates: Partial<WindowState> = {};

            const computedWidth = parseFloat(state.windowElement.style.width);
            const computedHeight = parseFloat(state.windowElement.style.height);

            if (!isNaN(computedWidth) && computedWidth > 0) {
              updates.width = computedWidth;
            }
            if (!isNaN(computedHeight) && computedHeight > 0) {
              updates.height = computedHeight;
            }

            // Handle position changes for west resizing
            const transform = state.windowElement.style.transform;
            if (transform.includes("translate3d")) {
              const translateMatch = transform.match(
                /translate3d\(([^,]+)px,\s*([^,]+)px,/,
              );
              if (translateMatch) {
                updates.x = parseFloat(translateMatch[1]);
                updates.y = parseFloat(translateMatch[2]);
              }
            }

            onUpdateWindow(state.currentWindow, updates);
          }

          // Only reset DOM styles if user actually moved the window
          if (state.hasActuallyMoved) {
            console.log("🧹 Cleaning up DOM styles after actual drag");
            state.windowElement.style.transform = "";
            state.windowElement.style.left = "";
            state.windowElement.style.top = "";
          } else {
            console.log("🚫 Not cleaning up styles - user just clicked");
          }
          // DON'T reset width/height to avoid full width bug
          // state.windowElement.style.width = '';
          // state.windowElement.style.height = '';
        }

        dragStateRef.current.isDragging = false;
        dragStateRef.current.isResizing = false;
        dragStateRef.current.currentWindow = null;
        dragStateRef.current.windowElement = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove, {
        passive: false, // Need to be able to preventDefault
      });
      document.addEventListener("mouseup", handleMouseUp);
    },
    [openWindows, onUpdateWindow, onActivateWindow],
  );

  return { handleMouseDown };
}
