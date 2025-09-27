"use client";

import Image from "next/image";
import { Image as ImageIcon, Grid3X3, Grip } from "lucide-react";
import { Tooltip } from "@/app/components/ui/tooltip";

interface SideDockProps {
  onLaunchApp: (appName: string) => void;
  onActivateWindow: (appName: string) => void;
  onActivitiesOpen: () => void;
  openWindows: string[];
}

export function SideDock({
  onLaunchApp,
  onActivateWindow,
  onActivitiesOpen,
  openWindows,
}: SideDockProps) {
  const defaultApps = [
    { app: "terminal", iconPath: "/icons/Terminal.png", label: "Terminal" },
    { app: "files", iconPath: "/icons/Folder.png", label: "Projects" },
    { app: "editor", iconPath: "/icons/Document.png", label: "Experience" },
    { app: "browser", iconPath: "/icons/Contact.png", label: "Contact" },
    { app: "resume", iconPath: "/icons/File_Download.png", label: "Resume" },
  ];

  const nonDefaultApps = [
    { app: "wallpaper", iconPath: "lucide:Image", label: "Wallpaper Settings" },
  ];

  // Get default app names for filtering
  const defaultAppNames = defaultApps.map(app => app.app);

  // Get non-default apps that are currently open
  const openNonDefaultApps = nonDefaultApps.filter(app =>
    openWindows.includes(app.app)
  );

  // Helper function to render app icon
  const renderAppIcon = (iconPath: string, label: string) => {
    if (iconPath.startsWith("lucide:")) {
      const iconName = iconPath.replace("lucide:", "");
      if (iconName === "Image") {
        return <ImageIcon className="w-8 h-8 text-gray-200" />;
      }
      if (iconName === "Grid3X3") {
        return <Grid3X3 className="w-8 h-8 text-gray-200" />;
      }
    }

    return (
      <Image
        src={iconPath}
        alt={label}
        width={32}
        height={32}
        className="object-contain"
      />
    );
  };

  return (
    <div className="fixed left-0 top-0 h-full w-16 z-30 flex flex-col items-center py-4">
      {/* Enhanced dock background with gradient and blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-lg border-r border-ubuntu-mint/20 shadow-2xl"></div>

      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ubuntu-mint/5 to-transparent"></div>

      {/* Apps Container */}
      <div className="relative flex flex-col gap-3 mt-12 flex-1">
        {/* Default Apps */}
        {defaultApps.map(({ app, iconPath, label }) => {
          const isOpen = openWindows.includes(app);

          return (
            <div
              key={app}
              className="group relative flex flex-col items-center"
            >
              <Tooltip content={label} position="right" delay={0}>
                <button
                  onClick={() => {
                    if (isOpen) {
                      onActivateWindow(app);
                    } else {
                      onLaunchApp(app);
                    }
                  }}
                  className={`w-12 h-12 rounded-lg transition-all duration-200 flex items-center justify-center relative ${
                    isOpen ? "bg-white/15" : "hover:bg-white/10 hover:scale-105"
                  }`}
                >
                  {renderAppIcon(iconPath, label)}
                </button>
              </Tooltip>

              {/* Simple indicator */}
              {isOpen && (
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-ubuntu-mint rounded-full"></div>
              )}
            </div>
          );
        })}

        {/* Separator - only show if there are non-default apps open */}
        {openNonDefaultApps.length > 0 && (
          <div className="w-10 h-px bg-gray-600 my-3 self-center"></div>
        )}

        {/* Non-Default Apps (only show when open) */}
        {openNonDefaultApps.map(({ app, iconPath, label }) => {
          const isOpen = openWindows.includes(app);

          return (
            <div
              key={app}
              className="group relative flex flex-col items-center"
            >
              <Tooltip content={label} position="right" delay={0}>
                <button
                  onClick={() => {
                    if (isOpen) {
                      onActivateWindow(app);
                    } else {
                      onLaunchApp(app);
                    }
                  }}
                  className={`w-12 h-12 rounded-lg transition-all duration-200 flex items-center justify-center relative ${
                    isOpen ? "bg-white/15" : "hover:bg-white/10 hover:scale-105"
                  }`}
                >
                  {renderAppIcon(iconPath, label)}
                </button>
              </Tooltip>

              {/* Simple indicator */}
              {isOpen && (
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-ubuntu-mint rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Grip Icon - Separated at bottom */}
      <div className="relative">
        <Tooltip content="Activities Overview" position="right" delay={0}>
          <button
            onClick={onActivitiesOpen}
            className="w-12 h-12 rounded-lg transition-all duration-200 flex items-center justify-center hover:bg-white/10 hover:scale-105"
          >
            <Grip className="w-6 h-6 text-gray-200 hover:text-ubuntu-mint transition-colors" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
