"use client";

import { Grid3X3, X, Minimize2, XCircle } from "lucide-react";
import { getWindowIcon, getWindowTitle } from "@/app/utils/window-content";

interface WindowState {
  appName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  zIndex?: number;
}

interface ActivitiesWindowProps {
  openWindows: WindowState[];
  activeWindow: string | null;
  onActivateWindow: (appName: string) => void;
  onCloseWindow: (appName: string) => void;
  onMinimizeWindow: (appName: string) => void;
  onGridSnap: () => void;
  onCloseAll: () => void;
}

export function ActivitiesWindow({
  openWindows,
  activeWindow,
  onActivateWindow,
  onCloseWindow,
  onMinimizeWindow,
  onGridSnap,
  onCloseAll,
}: ActivitiesWindowProps) {
  return (
    <div className="h-full bg-black flex flex-col">
      {/* Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 p-4">
        <h2 className="text-lg font-semibold text-white">
          Activities Overview
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          Manage your open windows and desktop
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Window Management Actions */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-white mb-3">
            Window Management
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onGridSnap}
              className="flex items-center justify-center gap-3 p-4 bg-neutral-900 border border-neutral-700 rounded-lg hover:bg-neutral-800 hover:border-neutral-600 transition-colors"
            >
              <Grid3X3 className="w-5 h-5 text-primary" />
              <span className="text-white font-medium">Auto Grid</span>
            </button>

            <button
              onClick={onCloseAll}
              className="flex items-center justify-center gap-3 p-4 bg-neutral-900 border border-neutral-700 rounded-lg hover:bg-neutral-800 hover:border-red-500 transition-colors group"
              disabled={openWindows.length === 0}
            >
              <XCircle className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              <span className="text-white font-medium">Close All</span>
            </button>
          </div>
        </div>

        {/* Open Windows */}
        <div>
          <h3 className="text-md font-medium text-white mb-3">
            Open Windows ({openWindows.length})
          </h3>

          {openWindows.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <div className="text-lg mb-2">No open windows</div>
              <div className="text-sm">Use the dock to launch applications</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {openWindows.map((window) => {
                const isActive = activeWindow === window.appName;

                return (
                  <div
                    key={window.appName}
                    className={`flex items-center justify-between p-4 bg-neutral-900 border rounded-lg transition-all ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : "border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800"
                    }`}
                  >
                    {/* Window Info */}
                    <div
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                      onClick={() => onActivateWindow(window.appName)}
                    >
                      <div className="flex-shrink-0">
                        {getWindowIcon(window.appName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-medium truncate ${
                            isActive ? "text-primary" : "text-white"
                          }`}
                        >
                          {getWindowTitle(window.appName)}
                        </div>
                        <div className="text-sm text-gray-400 truncate">
                          {window.isMinimized
                            ? "Minimized"
                            : `${window.width}×${window.height}`}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      )}
                    </div>

                    {/* Window Actions */}
                    <div className="flex items-center gap-2 ml-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMinimizeWindow(window.appName);
                        }}
                        className="p-2 text-gray-400 hover:text-white hover:bg-neutral-700 rounded transition-colors"
                        title="Minimize"
                      >
                        <Minimize2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCloseWindow(window.appName);
                        }}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded transition-colors"
                        title="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
