"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  LayoutPanelLeft,
  ChevronUpSquare,
  ChevronDownSquare,
  Minimize2,
  X,
  XCircle,
  Wifi,
  Volume2,
  BatteryFull,
} from "lucide-react";
import { Tooltip } from "@/app/components/ui/tooltip";

interface WindowState {
  appName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  zIndex?: number;
}

interface TopBarProps {
  openWindows?: WindowState[];
  activeWindow?: string | null;
  onActivateWindow?: (appName: string) => void;
  onCloseWindow?: (appName: string) => void;
  onMinimizeWindow?: (appName: string) => void;
  onGridSnap?: () => void;
  onCloseAll?: () => void;
}

export function TopBar({
  openWindows = [],
  activeWindow,
  onActivateWindow,
  onCloseWindow,
  onMinimizeWindow,
  onGridSnap,
  onCloseAll,
}: TopBarProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const appButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentDate(date);
      setCurrentTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getWindowTitle = (appName: string) => {
    const titles = {
      terminal: "Terminal",
      files: "Projects",
      editor: "Experience",
      browser: "Contact",
      resume: "Resume",
    };
    return titles[appName as keyof typeof titles] || appName;
  };

  return (
    <div className="ubuntu-panel fixed top-0 left-0 right-0 h-9 z-50 text-sm flex items-center px-3">
      {/* Enhanced background with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/98 via-slate-800/95 to-slate-900/98 backdrop-blur-xl shadow-2xl border-b border-ubuntu-mint/15"></div>

      {/* Subtle accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ubuntu-mint/3 to-transparent"></div>
      {/* Left - Logo + Portfolio OS + Taskbar */}
      <div className="topbar-left relative flex items-center space-x-4 flex-1 text-white">
        <div className="flex items-center space-x-2">
          <img
            src="/logo2.png"
            alt="Portfolio Logo"
            className="w-6 h-6 object-contain filter drop-shadow-sm"
          />
          <div className="text-white font-medium tracking-wide">
            Portfolio OS
          </div>
        </div>

        {/* Taskbar - Open Windows */}
        <div className="flex items-center space-x-2">
          {openWindows.map((window) => (
            <div key={window.appName} className="relative">
              <div className="flex items-center">
                <button
                  ref={(el) => (appButtonRefs.current[window.appName] = el)}
                  className={`flex items-center space-x-2 px-3 py-1.5 text-sm transition-colors duration-300 ${
                    activeWindow === window.appName && !window.isMinimized
                      ? "text-ubuntu-mint"
                      : window.isMinimized
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-200 hover:text-white"
                  }`}
                  onClick={() => {
                    // Focus/activate the app
                    if (onActivateWindow) {
                      onActivateWindow(window.appName);
                    }

                    // Also toggle dropdown
                    if (openDropdown === window.appName) {
                      setOpenDropdown(null);
                    } else {
                      const appButton = appButtonRefs.current[window.appName];
                      if (appButton) {
                        const rect = appButton.getBoundingClientRect();
                        setDropdownPosition({
                          top: rect.bottom + 4,
                          left: rect.left,
                        });
                      }
                      setOpenDropdown(window.appName);
                    }
                  }}
                >
                  <span>{getWindowTitle(window.appName)}</span>
                  {openDropdown === window.appName ? (
                    <ChevronUpSquare
                      className={`w-4 h-4 transition-colors duration-300 ${
                        activeWindow === window.appName && !window.isMinimized
                          ? "text-ubuntu-mint"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    />
                  ) : (
                    <ChevronDownSquare
                      className={`w-4 h-4 transition-colors duration-300 ${
                        activeWindow === window.appName && !window.isMinimized
                          ? "text-ubuntu-mint"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center - Clock and Date (absolutely positioned) */}
      <div className="topbar-center absolute left-1/2 transform -translate-x-1/2 z-10">
        <div className="clock font-medium px-3 py-1 text-white flex items-center space-x-2">
          <span>{currentDate}</span>
          <span>{currentTime}</span>
        </div>
      </div>

      {/* Right - System Tray */}
      <div className="topbar-right relative flex items-center space-x-2 flex-1 justify-end text-white">
        {/* Window Management Buttons */}
        <div className="flex items-center space-x-1">
          {/* Grid Snap Button */}
          <Tooltip content="Auto grid" delay={0} position="bottom">
            <button
              className="system-indicator p-2 hover:bg-gradient-to-r hover:from-white/15 hover:to-white/5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/10 group"
              onClick={() => {
                if (onGridSnap) {
                  onGridSnap();
                }
              }}
            >
              <LayoutPanelLeft className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors duration-300" />
            </button>
          </Tooltip>

          {/* Close All Button */}
          {openWindows.length > 0 && (
            <Tooltip content="Close all" delay={0} position="bottom">
              <button
                className="system-indicator p-2 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/10 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group"
                onClick={() => {
                  if (onCloseAll) {
                    onCloseAll();
                  }
                }}
              >
                <XCircle className="w-4 h-4 text-gray-300 group-hover:text-red-400 transition-colors duration-300" />
              </button>
            </Tooltip>
          )}
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-gradient-to-b from-transparent via-gray-500/50 to-transparent mx-3"></div>

        {/* OS Flavor Icons */}
        <div className="flex items-center space-x-1">
          <div className="p-2 hover:bg-gradient-to-r hover:from-ubuntu-mint/15 hover:to-ubuntu-mint/5 rounded-lg transition-all duration-300 group">
            <Wifi className="w-4 h-4 text-gray-300 group-hover:text-ubuntu-mint transition-colors duration-300" />
          </div>

          <div className="p-2 hover:bg-gradient-to-r hover:from-ubuntu-mint/15 hover:to-ubuntu-mint/5 rounded-lg transition-all duration-300 group">
            <Volume2 className="w-4 h-4 text-gray-300 group-hover:text-ubuntu-mint transition-colors duration-300" />
          </div>

          <div className="p-2 hover:bg-gradient-to-r hover:from-ubuntu-mint/15 hover:to-ubuntu-mint/5 rounded-lg transition-all duration-300 group">
            <BatteryFull className="w-4 h-4 text-gray-300 group-hover:text-ubuntu-mint transition-colors duration-300" />
          </div>
        </div>
      </div>

      {/* Dropdown portal - rendered outside normal DOM hierarchy */}
      {openDropdown &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed bg-gradient-to-br from-slate-800/95 to-slate-900/95 text-white rounded-lg shadow-2xl shadow-black/50 border border-ubuntu-mint/20 py-2 min-w-[140px] z-[9999] backdrop-blur-xl"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-gradient-to-r hover:from-ubuntu-mint/20 hover:to-ubuntu-mint/10 transition-all duration-300 flex items-center space-x-3 rounded-md group"
              onClick={() => {
                if (onMinimizeWindow) {
                  onMinimizeWindow(openDropdown);
                }
                setOpenDropdown(null);
              }}
            >
              <Minimize2 className="w-4 h-4 text-gray-400 group-hover:text-ubuntu-mint transition-colors duration-300" />
              <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                Minimize
              </span>
            </button>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-2 my-1"></div>
            <button
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/10 transition-all duration-300 flex items-center space-x-3 rounded-md group"
              onClick={() => {
                if (onCloseWindow) {
                  onCloseWindow(openDropdown);
                }
                setOpenDropdown(null);
              }}
            >
              <X className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
              <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                Close
              </span>
            </button>
          </div>,
          document.body,
        )}

      {/* Click outside handler */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => {
            setOpenDropdown(null);
          }}
        />
      )}
    </div>
  );
}
