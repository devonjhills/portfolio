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
  onCloseWindow: (appName: string) => void;
}

export function WallpaperWindow({
  onWallpaperChange,
  currentWallpaper,
  onCloseWindow,
}: WallpaperWindowProps) {
  const [wallpapers, setWallpapers] = useState<WallpaperInfo[]>([]);
  const [selectedWallpaper, setSelectedWallpaper] =
    useState<string>(currentWallpaper);

  useEffect(() => {
    // Get wallpapers from the public/wallpapers folder
    const loadWallpapers = async () => {
      // List of known wallpaper files (could be dynamically loaded from API)
      const wallpaperFilenames = [
        "default.jpg",
        "matrix.jpg",
        "planet_atom.jpg",
      ];

      // Helper function to format filename to display name
      const formatDisplayName = (filename: string): string => {
        // Remove file extension
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

        // Replace underscores with spaces and capitalize each word
        return nameWithoutExt
          .replace(/_/g, " ")
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");
      };

      // Check which wallpapers exist and create display names
      const existingWallpapers: WallpaperInfo[] = [];
      for (const filename of wallpaperFilenames) {
        try {
          const response = await fetch(`/wallpapers/${filename}`, {
            method: "HEAD",
          });
          if (response.ok) {
            existingWallpapers.push({
              filename,
              displayName: formatDisplayName(filename),
            });
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
    onCloseWindow("wallpaper");
  };

  return (
    <div className="h-full bg-black flex flex-col">
      {/* Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 p-4">
        <h2 className="text-lg font-semibold text-white">
          Change Desktop Background
        </h2>
        <p className="text-sm text-gray-300 mt-1">
          Select a wallpaper from the available options
        </p>
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
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-neutral-700 hover:border-neutral-600"
                }`}
                onClick={() => handleWallpaperSelect(wallpaper.filename)}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative bg-neutral-900">
                  <Image
                    src={wallpaperPath}
                    alt={wallpaper.displayName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 400px) 100vw, 200px"
                  />

                  {/* Current indicator */}
                  {isCurrent && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                      Current
                    </div>
                  )}

                  {/* Selection indicator - just checkmark, no overlay */}
                  {isSelected && (
                    <div className="absolute bottom-2 right-2 bg-primary rounded-full p-2">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3 bg-neutral-900">
                  <h3 className="font-medium text-white text-sm">
                    {wallpaper.displayName}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-neutral-900 border-t border-neutral-800 p-4 flex justify-between items-center">
        <div className="text-sm text-gray-300">
          {wallpapers.length} wallpaper{wallpapers.length !== 1 ? "s" : ""}{" "}
          available
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleApply}
            disabled={!selectedWallpaper}
          >
            Apply and Close
          </button>
        </div>
      </div>
    </div>
  );
}
