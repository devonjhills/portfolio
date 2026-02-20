"use client";

import { X } from "lucide-react";

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  const shortcuts = [
    { keys: "Alt + 1-5", description: "Launch apps (Terminal, Projects, Experience, Contact, Resume)" },
    { keys: "Alt + G", description: "Snap windows to grid" },
    { keys: "Alt + W", description: "Close active window" },
    { keys: "Alt + Tab", description: "Cycle through windows" },
    { keys: "Esc", description: "Close active window" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10001]"
            onClick={onClose}
          />
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10002] w-full max-w-md mx-4">
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                <h2 className="text-lg font-semibold text-white">
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-800 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-gray-300" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {shortcuts.map((shortcut, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-4 p-3 bg-black/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="text-sm text-gray-300">
                        {shortcut.description}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <kbd className="px-2 py-1 text-xs font-mono bg-neutral-800 border border-neutral-700 rounded text-primary">
                        {shortcut.keys}
                      </kbd>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-neutral-800 bg-black/20">
                <p className="text-xs text-gray-400 text-center">
                  Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-neutral-800 border border-neutral-700 rounded">Esc</kbd> or click outside to close
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
