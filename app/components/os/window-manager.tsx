"use client";

import { WindowManagerProps } from "@/app/types/window";
import { useWindowDrag } from "@/app/hooks/use-window-drag";
import { getWindowIcon, getWindowContent, getWindowTitle } from "@/app/utils/window-content";
import { X } from "lucide-react";

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
        <div
          key={window.appName}
          className={`ubuntu-window absolute bg-gray-900 border border-gray-700 rounded-lg shadow-2xl pointer-events-auto transition-all duration-300 animate-window-open ${
            activeWindow === window.appName
              ? "ring-2 ring-primary shadow-primary/20"
              : ""
          }`}
          style={{
            left: window.x,
            top: window.y,
            width: window.width,
            height: window.height,
            zIndex: window.zIndex,
            display: window.isMinimized ? "none" : "block",
          }}
          onClick={() => onActivateWindow(window.appName)}
        >
          {/* Title Bar */}
          <div
            className={`window-title-bar flex items-center justify-between h-12 rounded-t-lg px-4 cursor-move select-none ${
              activeWindow === window.appName
                ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white border-b border-gray-700"
                : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-200 border-b border-gray-600"
            }`}
            onMouseDown={(e) => handleMouseDown(e, window.appName, "drag")}
          >
            <div className="flex items-center space-x-3">
              {getWindowIcon(window.appName)}
              <div className="font-medium text-sm">
                {getWindowTitle(window.appName)}
              </div>
            </div>
            <div className="window-controls flex items-center space-x-2">
              <button
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateWindow(window.appName, { isMinimized: true });
                }}
                title="Minimize"
              >
                <div className="w-3 h-0.5 bg-gray-300"></div>
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700"
                title="Maximize"
              >
                <div className="w-3 h-3 border border-gray-300"></div>
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center hover:bg-red-500 rounded transition-colors group"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseWindow(window.appName);
                }}
                title="Close"
              >
                <X className="w-3 h-3 text-gray-300" />
              </button>
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
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "s")
            }
          />
          <div
            className="absolute top-12 bottom-10 left-0 w-2 cursor-w-resize"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "w")
            }
          />
          <div
            className="absolute top-12 bottom-10 right-3 w-2 cursor-e-resize"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "e")
            }
          />
          <div
            className="resize-handle absolute bottom-0 left-0 w-4 h-6 cursor-sw-resize"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "sw")
            }
          />
          <div
            className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-se-resize hover:bg-primary/30 transition-colors rounded-tl-lg"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "se")
            }
          />
        </div>
      ))}
    </div>
  );
}
