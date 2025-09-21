"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  delay?: number;
  position?: "top" | "right" | "bottom";
}

export function Tooltip({
  content,
  children,
  delay = 750,
  position: tooltipPosition = "top",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();

        if (tooltipPosition === "right") {
          setPosition({
            top: rect.top + rect.height / 2, // Center vertically
            left: rect.right + 8, // Position to the right
          });
        } else if (tooltipPosition === "bottom") {
          setPosition({
            top: rect.bottom + 8, // Position below the element
            left: rect.left + rect.width / 2, // Center horizontally
          });
        } else {
          setPosition({
            top: rect.top - 8, // Position above the element
            left: rect.left + rect.width / 2, // Center horizontally
          });
        }
        setIsVisible(true);
      }
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed bg-slate-800 text-white text-sm px-3 py-2 rounded-lg shadow-xl border border-slate-600 z-[10000] backdrop-blur-sm pointer-events-none"
            style={{
              top: position.top,
              left: position.left,
              transform:
                tooltipPosition === "right"
                  ? "translate(0, -50%)"
                  : tooltipPosition === "bottom"
                    ? "translate(-50%, 0)"
                    : "translate(-50%, -100%)",
            }}
          >
            <div className="text-gray-200">{content}</div>
            {/* Tooltip arrow */}
            {tooltipPosition === "right" ? (
              <div
                className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderRight: "6px solid #1e293b",
                }}
              />
            ) : tooltipPosition === "bottom" ? (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderBottom: "6px solid #1e293b",
                }}
              />
            ) : (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid #1e293b",
                }}
              />
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
