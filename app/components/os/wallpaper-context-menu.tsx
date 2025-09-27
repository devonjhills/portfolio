"use client";

import { LayoutPanelLeft, Image as ImageIcon, RotateCcw } from "lucide-react";

interface DesktopContextMenuProps {
  x: number;
  y: number;
  isVisible: boolean;
  onClose: () => void;
  onGridLayout: () => void;
  onWallpaperWindow: () => void;
}

export function DesktopContextMenu({
  x,
  y,
  isVisible,
  onClose,
  onGridLayout,
  onWallpaperWindow,
}: DesktopContextMenuProps) {
  const handleGridLayout = () => {
    onGridLayout();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop to close menu */}
      <div
        className="fixed inset-0 z-[9999]"
        onClick={onClose}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Main Context Menu */}
      <div
        className="fixed z-[10000] bg-gray-800 border border-gray-600 rounded-md shadow-lg min-w-52"
        style={{
          left: x,
          top: y,
        }}
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="py-1">
          {/* Grid Layout Option */}
          <button
            className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors flex items-center"
            onClick={handleGridLayout}
          >
            <LayoutPanelLeft className="w-4 h-4 mr-3" />
            Snap to Grid
          </button>

          {/* Separator */}
          <div className="h-px bg-gray-600 my-1" />

          {/* Change Wallpaper Option */}
          <button
            className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors flex items-center"
            onClick={() => {
              onWallpaperWindow();
              onClose();
            }}
          >
            <ImageIcon className="w-4 h-4 mr-3" />
            Change Wallpaper...
          </button>

          {/* Separator */}
          <div className="h-px bg-gray-600 my-1" />

          {/* Refresh Desktop Option */}
          <button
            className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors flex items-center"
            onClick={onClose}
          >
            <RotateCcw className="w-4 h-4 mr-3" />
            Refresh Desktop
          </button>
        </div>
      </div>

    </>
  );
}