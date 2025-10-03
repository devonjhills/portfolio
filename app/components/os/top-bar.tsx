"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Wifi, Volume2, BatteryFull } from "lucide-react";

interface TopBarProps {
  onActivitiesOpen: () => void;
}

export function TopBar({ onActivitiesOpen }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ubuntu-panel fixed top-0 left-0 right-0 h-8 z-50 text-sm flex items-center px-4">
      {/* Darker silver-grey OS background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1d] to-[#16161a] border-b border-gray-900/80"></div>

      {/* Left Section - Logo and Activities */}
      <div className="relative flex items-center space-x-4">
        <Image
          src="/logo2.png"
          alt="Portfolio Logo"
          width={20}
          height={20}
          className="rounded-sm shadow-sm"
        />
        <span
          onClick={onActivitiesOpen}
          className="text-sm font-medium text-gray-200 hover:bg-white/10 px-3 py-1 rounded transition-all duration-200 cursor-pointer hover:text-ubuntu-mint"
        >
          Activities
        </span>
      </div>

      {/* Center Section - Time/Date */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center space-x-2">
          <div className="text-gray-300 text-sm">{currentDate}</div>
          <div className="text-white font-medium text-sm">{currentTime}</div>
        </div>
      </div>

      {/* Right Section - System tray */}
      <div className="relative flex items-center ml-auto">
        <div className="flex items-center space-x-1">
          <button className="p-2 hover:bg-white/10 rounded transition-all duration-200 group">
            <Wifi className="w-4 h-4 text-gray-300 group-hover:text-ubuntu-mint transition-colors duration-200" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded transition-all duration-200 group">
            <Volume2 className="w-4 h-4 text-gray-300 group-hover:text-ubuntu-mint transition-colors duration-200" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded transition-all duration-200 group">
            <BatteryFull className="w-4 h-4 text-gray-300 group-hover:text-ubuntu-mint transition-colors duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}
