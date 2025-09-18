"use client";

import { useState } from "react";
import {
  Terminal,
  FolderOpen,
  FileText,
  Globe,
  Menu,
  Home,
  Calculator,
  Music,
} from "lucide-react";

interface DockProps {
  onLaunchApp: (appName: string) => void;
  openApps: string[];
}

export function Dock({ onLaunchApp, openApps }: DockProps) {
  const [tooltip, setTooltip] = useState<{
    text: string;
    visible: boolean;
    x: number;
  }>({
    text: "",
    visible: false,
    x: 0,
  });

  const apps = [
    {
      name: "terminal",
      label: "Terminal",
      iconPath: "/icons/terminal.png",
    },
    {
      name: "files",
      label: "File Manager",
      iconPath: "/icons/folder.png",
    },
    {
      name: "editor",
      label: "Text Editor",
      iconPath: "/icons/document.png",
    },
    {
      name: "browser",
      label: "Web Browser",
      iconPath: "/icons/contact.png",
    },
  ];

  const systemApps = [
    { name: "home", label: "Home", iconPath: "/icons/home.png" },
    {
      name: "calculator",
      label: "Calculator",
      iconPath: "/icons/document.png",
    },
  ];

  const handleMouseEnter = (label: string, event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    setTooltip({ text: label, visible: true, x });
  };

  const handleMouseLeave = () => {
    setTooltip({ text: "", visible: false, x: 0 });
  };

  return (
    <div className="mint-dock fixed bottom-3 left-1/2 transform -translate-x-1/2 z-40 animate-slide-up">
      <div className="dock-container relative flex items-center space-x-1 bg-gray-800/95 backdrop-blur-xl rounded-2xl px-3 py-2 border border-gray-600/30 shadow-2xl">
        {/* Main Applications */}
        {apps.map((app) => {
          return (
            <button
              key={app.name}
              className="dock-app group relative transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 active:scale-95"
              onClick={() => onLaunchApp(app.name)}
              onMouseEnter={(e) => handleMouseEnter(app.label, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="app-icon w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl flex items-center justify-center relative transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-green-500/25">
                <img
                  src={app.iconPath}
                  alt={app.label}
                  className="w-8 h-8 object-contain"
                />

                {/* Running Indicator */}
                {openApps.includes(app.name) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-green-500 rounded-full animate-pulse" />
                )}

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-10 bg-gray-600/50 mx-2" />

        {/* System Applications */}
        {systemApps.map((app) => {
          return (
            <button
              key={app.name}
              className="dock-app group relative transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 active:scale-95"
              onMouseEnter={(e) => handleMouseEnter(app.label, e)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="app-icon w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center relative transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <img
                  src={app.iconPath}
                  alt={app.label}
                  className="w-6 h-6 object-contain"
                />
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          );
        })}

        {/* Application Menu */}
        <button
          className="dock-app group relative transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 active:scale-95"
          onMouseEnter={(e) => handleMouseEnter("Applications", e)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="app-icon w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center relative transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-green-500/25">
            <Menu className="w-6 h-6 text-white" />
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </button>
      </div>

      {/* Enhanced Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed bottom-20 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg pointer-events-none shadow-xl border border-gray-600 animate-scale-in z-50"
          style={{
            left: `${tooltip.x}px`,
            transform: "translateX(-50%)",
          }}
        >
          {tooltip.text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 border-r border-b border-gray-600 rotate-45 -mt-1" />
        </div>
      )}
    </div>
  );
}
