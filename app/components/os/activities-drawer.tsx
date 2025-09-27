"use client";

import { LayoutPanelLeft, X, Minimize2, XCircle, ChevronLeft } from "lucide-react";
import { getWindowIcon, getWindowTitle } from "@/app/utils/window-content";
import { useEffect, useState } from "react";

interface WindowState {
  appName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  zIndex?: number;
}

interface ActivitiesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  openWindows: WindowState[];
  activeWindow: string | null;
  onActivateWindow: (appName: string) => void;
  onCloseWindow: (appName: string) => void;
  onMinimizeWindow: (appName: string) => void;
  onGridSnap: () => void;
  onCloseAll: () => void;
}

export function ActivitiesDrawer({
  isOpen,
  onClose,
  openWindows,
  activeWindow,
  onActivateWindow,
  onCloseWindow,
  onMinimizeWindow,
  onGridSnap,
  onCloseAll,
}: ActivitiesDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Use setTimeout to ensure DOM is ready and trigger animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />

      {/* Drawer */}
      <div
        className={`fixed left-16 top-4 bottom-4 w-80 z-[9999] bg-gray-900/95 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-xl transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-700">
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors mr-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold text-white flex-1 text-center pr-10">Activities</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Actions</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onGridSnap();
                  onClose();
                }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LayoutPanelLeft className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white">Snap to Grid</span>
              </button>

              <button
                onClick={() => {
                  onCloseAll();
                  onClose();
                }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={openWindows.length === 0}
              >
                <XCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-white">Close All</span>
              </button>
            </div>
          </div>

          {/* Open Windows */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">
              Open Windows ({openWindows.length})
            </h3>

            {openWindows.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-sm">No open windows</div>
                <div className="text-xs mt-1 opacity-75">Use the dock to launch apps</div>
              </div>
            ) : (
              <div className="space-y-2">
                {openWindows.map((window) => {
                  const isActive = activeWindow === window.appName;

                  return (
                    <div
                      key={window.appName}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? "bg-green-900/30 border border-green-500/50"
                          : "bg-gray-800/50 hover:bg-gray-700/50"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        console.log('Activating window:', window.appName);
                        onActivateWindow(window.appName);
                        onClose();
                      }}
                    >
                      {/* App Icon */}
                      <div className="flex-shrink-0">
                        {getWindowIcon(window.appName)}
                      </div>

                      {/* App Name */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${
                          isActive ? "text-green-400" : "text-white"
                        }`}>
                          {getWindowTitle(window.appName)}
                        </div>
                      </div>

                      {/* Window Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMinimizeWindow(window.appName);
                          }}
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
                          title="Minimize"
                        >
                          <Minimize2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCloseWindow(window.appName);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Close"
                        >
                          <X className="w-3.5 h-3.5" />
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
    </>
  );
}