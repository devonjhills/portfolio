"use client";

import { memo } from "react";
import { WindowManagerProps, WindowState } from "@/app/types/window";
import { useWindowDrag } from "@/app/hooks/use-window-drag";
import {
  getWindowIcon,
  getWindowContent,
  getWindowTitle,
} from "@/app/utils/window-content";
import { X } from "lucide-react";
import { Tooltip } from "@/app/components/ui/tooltip";

interface WindowComponentProps {
  window: WindowState;
  isActive: boolean;
  onUpdateWindow: (appName: string, updates: Partial<WindowState>) => void;
  onCloseWindow: (appName: string) => void;
  onActivateWindow: (appName: string) => void;
  handleMouseDown: (
    e: React.MouseEvent,
    appName: string,
    action: "drag" | "resize",
    direction?: string,
  ) => void;
}

// Memoized window component to prevent unnecessary re-renders
const WindowComponent = memo(
  ({
    window,
    isActive,
    onUpdateWindow,
    onCloseWindow,
    onActivateWindow,
    handleMouseDown,
  }: WindowComponentProps) => (
    <div
      className={`ubuntu-window absolute bg-gray-900 border border-gray-700 rounded-lg shadow-2xl pointer-events-auto ${
        isActive ? "ring-2 ring-primary shadow-primary/20" : ""
      }`}
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
        display: window.isMinimized ? "none" : "block",
        // Hardware acceleration optimizations
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
        willChange: "transform",
      }}
      onClick={() => onActivateWindow(window.appName)}
    >
      {/* Title Bar */}
      <div
        className={`window-title-bar flex items-center justify-between h-12 rounded-t-lg px-4 select-none ${
          isActive
            ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white border-b border-gray-700"
            : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-200 border-b border-gray-600"
        }`}
      >
        <div
          className="flex items-center space-x-3 cursor-move flex-1"
          onMouseDown={(e) => handleMouseDown(e, window.appName, "drag")}
        >
          {getWindowIcon(window.appName)}
          <div className="font-medium text-sm">
            {getWindowTitle(window.appName)}
          </div>
        </div>
        <div className="window-controls flex items-center space-x-2">
          <Tooltip content="Minimize" delay={0}>
            <button
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onUpdateWindow(window.appName, { isMinimized: true });
              }}
            >
              <div className="w-3 h-0.5 bg-gray-300"></div>
            </button>
          </Tooltip>
          <Tooltip content="Maximize" delay={0}>
            <button
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="w-3 h-3 border border-gray-300"></div>
            </button>
          </Tooltip>
          <Tooltip content="Close" delay={0}>
            <button
              className="w-6 h-6 flex items-center justify-center hover:bg-red-500 rounded transition-colors group"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onCloseWindow(window.appName);
              }}
            >
              <X className="w-3 h-3 text-gray-300" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="window-content overflow-auto rounded-b-lg bg-gray-900"
        style={{ height: `calc(100% - 3rem)` }}
      >
        {getWindowContent(window.appName)}
      </div>

      {/* Resize Handles */}
      <div
        className="absolute bottom-3 left-2 right-10 h-2 cursor-s-resize"
        onMouseDown={(e) => handleMouseDown(e, window.appName, "resize", "s")}
      />
      <div
        className="absolute top-12 bottom-10 left-0 w-2 cursor-w-resize"
        onMouseDown={(e) => handleMouseDown(e, window.appName, "resize", "w")}
      />
      <div
        className="absolute top-12 bottom-10 right-3 w-2 cursor-e-resize"
        onMouseDown={(e) => handleMouseDown(e, window.appName, "resize", "e")}
      />
      <div
        className="resize-handle absolute bottom-0 left-0 w-4 h-6 cursor-sw-resize"
        onMouseDown={(e) => handleMouseDown(e, window.appName, "resize", "sw")}
      />
      <div
        className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-se-resize hover:bg-primary/30 transition-colors rounded-tl-lg"
        onMouseDown={(e) => handleMouseDown(e, window.appName, "resize", "se")}
      />
    </div>
  ),
);

WindowComponent.displayName = "WindowComponent";

export function WindowManager({
  openWindows,
  activeWindow,
  onUpdateWindow,
  onCloseWindow,
  onActivateWindow,
}: WindowManagerProps) {
  const { handleMouseDown } = useWindowDrag(
    openWindows,
    onUpdateWindow,
    onActivateWindow,
  );

  return (
    <div className="window-manager absolute inset-0 pointer-events-none">
      {openWindows.map((window) => (
        <WindowComponent
          key={window.appName}
          window={window}
          isActive={activeWindow === window.appName}
          onUpdateWindow={onUpdateWindow}
          onCloseWindow={onCloseWindow}
          onActivateWindow={onActivateWindow}
          handleMouseDown={handleMouseDown}
        />
      ))}
    </div>
  );
}
