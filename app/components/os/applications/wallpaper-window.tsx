"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface WallpaperInfo {
  filename: string;
  displayName: string;
}

interface WallpaperWindowProps {
  onWallpaperChange: (wallpaper: string) => void;
  currentWallpaper: string;
}

export function WallpaperWindow({ onWallpaperChange, currentWallpaper }: WallpaperWindowProps) {
  const [wallpapers, setWallpapers] = useState<WallpaperInfo[]>([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>(currentWallpaper);

  useEffect(() => {
    // Get wallpapers from the public/wallpapers folder
    const loadWallpapers = async () => {
      const wallpaperList: WallpaperInfo[] = [
        { filename: "wallpaper.jpg", displayName: "Default Ubuntu" },
        { filename: "matrix.jpg", displayName: "Matrix Code" },
      ];

      // Filter out wallpapers that don't exist
      const existingWallpapers: WallpaperInfo[] = [];
      for (const wallpaper of wallpaperList) {
        try {
          const response = await fetch(`/wallpapers/${wallpaper.filename}`, { method: "HEAD" });
          if (response.ok) {
            existingWallpapers.push(wallpaper);
          }
        } catch {
          // Skip wallpapers that don't exist
        }
      }

      setWallpapers(existingWallpapers);
    };

    loadWallpapers();
  }, []);

  const handleWallpaperSelect = (filename: string) => {
    const wallpaperPath = `/wallpapers/${filename}`;
    setSelectedWallpaper(wallpaperPath);
  };

  const handleApply = () => {
    onWallpaperChange(selectedWallpaper);
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-white">Change Desktop Background</h2>
        <p className="text-sm text-gray-300 mt-1">Select a wallpaper from the available options</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-3 gap-4">
          {wallpapers.map((wallpaper) => {
            const wallpaperPath = `/wallpapers/${wallpaper.filename}`;
            const isSelected = selectedWallpaper === wallpaperPath;
            const isCurrent = currentWallpaper.includes(wallpaper.filename);

            return (
              <div
                key={wallpaper.filename}
                className={`relative cursor-pointer rounded-lg border-2 overflow-hidden transition-all ${
                  isSelected
                    ? "border-green-500 ring-2 ring-green-500/30"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                onClick={() => handleWallpaperSelect(wallpaper.filename)}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative bg-gray-800">
                  <Image
                    src={wallpaperPath}
                    alt={wallpaper.displayName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 400px) 100vw, 200px"
                  />

                  {/* Current indicator */}
                  {isCurrent && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                      Current
                    </div>
                  )}

                  {/* Selection indicator - just checkmark, no overlay */}
                  {isSelected && (
                    <div className="absolute bottom-2 right-2 bg-green-600 rounded-full p-2">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 bg-gray-800">
                  <h3 className="font-medium text-white text-sm">{wallpaper.displayName}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 p-4 flex justify-between items-center">
        <div className="text-sm text-gray-300">
          {wallpapers.length} wallpaper{wallpapers.length !== 1 ? 's' : ''} available
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleApply}
            disabled={!selectedWallpaper}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}