"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  LayoutPanelLeft,
  ChevronUpSquare,
  ChevronDownSquare,
  Minimize2,
  X,
  Grid3X3,
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
    <div className="ubuntu-panel fixed top-0 left-0 right-0 h-9 bg-ubuntu-black text-white flex items-center px-3 z-50 text-sm shadow-lg">
      {/* Left - Logo + Portfolio OS + Taskbar */}
      <div className="topbar-left flex items-center space-x-4 flex-1">
        <div className="flex items-center space-x-2">
          <img
            src="/logo2.png"
            alt="Portfolio Logo"
            className="w-6 h-6 object-contain"
          />
          <div className="text-primary font-medium">Portfolio OS</div>
        </div>

        {/* Taskbar - Open Windows */}
        <div className="flex items-center space-x-4">
          {openWindows.map((window) => (
            <div key={window.appName} className="relative">
              <div className="flex items-center">
                <button
                  ref={(el) => (appButtonRefs.current[window.appName] = el)}
                  className={`flex items-center space-x-2 px-2 py-1 text-sm transition-all duration-200 hover:bg-gray-700 rounded ${
                    activeWindow === window.appName && !window.isMinimized
                      ? "text-primary font-medium"
                      : window.isMinimized
                        ? "text-gray-400"
                        : "text-gray-200"
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
                      className={`w-4 h-4 transition-colors ${
                        activeWindow === window.appName && !window.isMinimized
                          ? "text-primary"
                          : "text-gray-400 hover:text-gray-200"
                      }`}
                    />
                  ) : (
                    <ChevronDownSquare
                      className={`w-4 h-4 transition-colors ${
                        activeWindow === window.appName && !window.isMinimized
                          ? "text-primary"
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
      <div className="topbar-center absolute left-1/2 transform -translate-x-1/2">
        <div className="clock font-medium px-3 py-1.5 hover:bg-gray-700 rounded transition-all duration-200 cursor-pointer text-primary flex items-center space-x-3">
          <span>{currentDate}</span>
          <span>{currentTime}</span>
        </div>
      </div>

      {/* Right - System Tray */}
      <div className="topbar-right flex items-center space-x-1 flex-1 justify-end">
        {/* Window Management Buttons */}
        <div className="flex items-center space-x-1">
          {/* Grid Snap Button */}
          <Tooltip content="Auto grid" delay={0} position="bottom">
            <button
              className="system-indicator p-1.5 hover:bg-gray-700 rounded transition-all duration-200"
              onClick={() => {
                if (onGridSnap) {
                  onGridSnap();
                }
              }}
            >
              <LayoutPanelLeft className="w-4 h-4 text-white" />
            </button>
          </Tooltip>

          {/* Close All Button */}
          {openWindows.length > 0 && (
            <Tooltip content="Close all" delay={0} position="bottom">
              <button
                className="system-indicator p-1.5 hover:bg-gray-700 rounded transition-all duration-200"
                onClick={() => {
                  if (onCloseAll) {
                    onCloseAll();
                  }
                }}
              >
                <XCircle className="w-4 h-4 text-white" />
              </button>
            </Tooltip>
          )}
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-gray-600 mx-4"></div>

        {/* OS Flavor Icons */}
        <div className="flex items-center space-x-1">
          <div className="p-1.5">
            <Wifi className="w-4 h-4 text-white" />
          </div>

          <div className="p-1.5">
            <Volume2 className="w-4 h-4 text-white" />
          </div>

          <div className="p-1.5">
            <BatteryFull className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Dropdown portal - rendered outside normal DOM hierarchy */}
      {openDropdown &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed bg-slate-800 text-white rounded-lg shadow-xl border border-slate-600 py-2 min-w-[140px] z-[9999] backdrop-blur-sm"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-700 transition-colors flex items-center space-x-3"
              onClick={() => {
                if (onMinimizeWindow) {
                  onMinimizeWindow(openDropdown);
                }
                setOpenDropdown(null);
              }}
            >
              <Minimize2 className="w-4 h-4 text-gray-400" />
              <span className="text-gray-200">Minimize</span>
            </button>
            <div className="h-px bg-slate-600 mx-2 my-1"></div>
            <button
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-700 transition-colors flex items-center space-x-3"
              onClick={() => {
                if (onCloseWindow) {
                  onCloseWindow(openDropdown);
                }
                setOpenDropdown(null);
              }}
            >
              <X className="w-4 h-4 text-gray-400" />
              <span className="text-gray-200">Close</span>
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
