"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  FolderOpen,
  FileText,
  Globe,
  User,
  Star,
  GitFork,
  Code,
  Calendar,
  ExternalLink,
  Github,
} from "lucide-react";

interface WindowState {
  appName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized?: boolean;
  zIndex?: number;
}

interface WindowManagerProps {
  openWindows: WindowState[];
  activeWindow: string | null;
  onUpdateWindow: (appName: string, updates: Partial<WindowState>) => void;
  onCloseWindow: (appName: string) => void;
  onActivateWindow: (appName: string) => void;
}

export function WindowManager({
  openWindows,
  activeWindow,
  onUpdateWindow,
  onCloseWindow,
  onActivateWindow,
}: WindowManagerProps) {
  const [activeTab, setActiveTab] = useState("experience");
  const [terminalTab, setTerminalTab] = useState("hero");
  const dragStateRef = useRef<{
    isDragging: boolean;
    isResizing: boolean;
    resizeDirection: string;
    startX: number;
    startY: number;
    startWindowX: number;
    startWindowY: number;
    startWidth: number;
    startHeight: number;
    currentWindow: string | null;
  }>({
    isDragging: false,
    isResizing: false,
    resizeDirection: "",
    startX: 0,
    startY: 0,
    startWindowX: 0,
    startWindowY: 0,
    startWidth: 0,
    startHeight: 0,
    currentWindow: null,
  });

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent,
      appName: string,
      action: "drag" | "resize",
      direction: string = "se",
    ) => {
      e.preventDefault();
      const window = openWindows.find((w) => w.appName === appName);
      if (!window) return;

      dragStateRef.current = {
        isDragging: action === "drag",
        isResizing: action === "resize",
        resizeDirection: direction,
        startX: e.clientX,
        startY: e.clientY,
        startWindowX: window.x,
        startWindowY: window.y,
        startWidth: window.width,
        startHeight: window.height,
        currentWindow: appName,
      };

      onActivateWindow(appName);

      // Use RAF for smooth animation
      let animationId: number;
      let lastUpdate = 0;
      const throttleMs = 16; // ~60fps

      const handleMouseMove = (e: MouseEvent) => {
        if (!dragStateRef.current.currentWindow) return;

        const now = performance.now();
        if (now - lastUpdate < throttleMs) return;
        lastUpdate = now;

        const deltaX = e.clientX - dragStateRef.current.startX;
        const deltaY = e.clientY - dragStateRef.current.startY;

        if (dragStateRef.current.isDragging) {
          onUpdateWindow(dragStateRef.current.currentWindow, {
            x: Math.max(0, dragStateRef.current.startWindowX + deltaX),
            y: Math.max(32, dragStateRef.current.startWindowY + deltaY), // Account for top bar
          });
        } else if (dragStateRef.current.isResizing) {
          const direction = dragStateRef.current.resizeDirection;
          const updates: Partial<WindowState> = {};

          // Handle horizontal resizing
          if (direction.includes("e")) {
            // Resize from right edge
            updates.width = Math.max(
              400,
              dragStateRef.current.startWidth + deltaX,
            );
          }
          if (direction.includes("w")) {
            // Resize from left edge - move window and change width
            const newWidth = Math.max(
              400,
              dragStateRef.current.startWidth - deltaX,
            );
            updates.width = newWidth;
            updates.x =
              dragStateRef.current.startWindowX +
              (dragStateRef.current.startWidth - newWidth);
          }

          // Handle vertical resizing
          if (direction.includes("s")) {
            // Resize from bottom edge
            updates.height = Math.max(
              300,
              dragStateRef.current.startHeight + deltaY,
            );
          }

          onUpdateWindow(dragStateRef.current.currentWindow, updates);
        }
      };

      const handleMouseUp = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        dragStateRef.current = {
          isDragging: false,
          isResizing: false,
          resizeDirection: "",
          startX: 0,
          startY: 0,
          startWindowX: 0,
          startWindowY: 0,
          startWidth: 0,
          startHeight: 0,
          currentWindow: null,
        };
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      document.addEventListener("mouseup", handleMouseUp);
    },
    [openWindows, onUpdateWindow, onActivateWindow],
  );

  const getWindowIcon = (appName: string) => {
    const iconPaths = {
      terminal: "/icons/terminal.png",
      files: "/icons/folder.png",
      editor: "/icons/document.png",
      browser: "/icons/contact.png",
      resume: "/icons/file_download.png",
    };
    const iconPath =
      iconPaths[appName as keyof typeof iconPaths] || "/icons/terminal.png";
    return (
      <img src={iconPath} alt={appName} className="w-4 h-4 object-contain" />
    );
  };

  const getWindowContent = (appName: string) => {
    switch (appName) {
      case "terminal":
        return (
          <div className="bg-slate-900 text-gray-100 font-mono text-sm h-full flex flex-col">
            {/* Terminal Header */}
            <div className="bg-slate-800 px-4 py-2 text-gray-200 text-xs flex items-center border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-primary font-semibold">Terminal</span>
              </div>
              <div className="ml-4 text-gray-400">devon@portfolio</div>
            </div>

            {/* Terminal Tabs */}
            <div className="flex bg-slate-800 border-b border-slate-700">
              <div
                className={`px-4 py-2 text-sm border-r border-slate-600 flex items-center space-x-2 cursor-pointer transition-colors ${
                  terminalTab === "hero"
                    ? "bg-slate-700 text-primary"
                    : "text-gray-400 hover:text-gray-200 hover:bg-slate-750"
                }`}
                onClick={() => setTerminalTab("hero")}
              >
                <span>neofetch</span>
              </div>
              <div
                className={`px-4 py-2 text-sm border-r border-slate-600 flex items-center space-x-2 cursor-pointer transition-colors ${
                  terminalTab === "profile"
                    ? "bg-slate-700 text-primary"
                    : "text-gray-400 hover:text-gray-200 hover:bg-slate-750"
                }`}
                onClick={() => setTerminalTab("profile")}
              >
                <span>profile</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-3 sm:p-6 flex-1 overflow-y-auto">
              {terminalTab === "hero" ? (
                <div className="space-y-6">
                  {/* Command prompt */}
                  <div className="flex items-center space-x-1 mb-4">
                    <span className="text-primary font-semibold">
                      devon@portfolio
                    </span>
                    <span className="text-gray-400">:</span>
                    <span className="text-blue-400 font-semibold">~</span>
                    <span className="text-gray-400">$</span>
                    <span className="text-amber-300 font-semibold">
                      neofetch
                    </span>
                  </div>

                  {/* Neofetch output */}
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 font-mono text-sm">
                    {/* ASCII Art / Avatar */}
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div className="relative">
                        <img
                          src="/avatar.png"
                          alt="Devon Hills"
                          className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg"
                        />
                        {/* ASCII-style border */}
                        <div
                          className="absolute -top-1 -left-1 border-2 border-primary/50 rounded-lg pointer-events-none"
                          style={{
                            width: "calc(100% + 8px)",
                            height: "calc(100% + 8px)",
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* System Info */}
                    <div className="flex-1 space-y-1 w-full sm:w-auto">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-primary font-bold text-lg">
                          devon
                        </span>
                        <span className="text-gray-400">@</span>
                        <span className="text-blue-400 font-bold text-lg">
                          portfolio
                        </span>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-slate-700 to-transparent mb-2"></div>

                      <div className="space-y-1 text-xs sm:text-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-primary font-bold w-full sm:w-20 sm:inline-block">
                            OS
                          </span>
                          <span className="text-gray-300 break-words">
                            Ubuntu 22.04 LTS
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-primary font-bold w-full sm:w-20 sm:inline-block">
                            Host
                          </span>
                          <span className="text-gray-300 break-words">
                            Livefront
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-primary font-bold w-full sm:w-20 sm:inline-block">
                            Uptime
                          </span>
                          <span className="text-gray-300 break-words">
                            7 years, 2 months
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-primary font-bold w-full sm:w-20 sm:inline-block">
                            Shell
                          </span>
                          <span className="text-gray-300 break-words">
                            bash 5.1.16
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-primary font-bold w-full sm:w-20 sm:inline-block">
                            WM
                          </span>
                          <span className="text-gray-300 break-words">
                            React + TypeScript
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-primary font-bold w-full sm:w-20 sm:inline-block">
                            CPU
                          </span>
                          <span className="text-gray-300 break-words">
                            Full-Stack Engineer
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-primary font-bold w-full sm:w-20 sm:inline-block">
                            Memory
                          </span>
                          <span className="text-gray-300 break-words">
                            HealthCare.gov + Defense
                          </span>
                        </div>
                      </div>

                      {/* Color blocks */}
                      <div className="flex space-x-1 mt-3">
                        <div className="w-3 h-3 bg-black border border-gray-600"></div>
                        <div className="w-3 h-3 bg-red-600"></div>
                        <div className="w-3 h-3 bg-green-600"></div>
                        <div className="w-3 h-3 bg-yellow-600"></div>
                        <div className="w-3 h-3 bg-blue-600"></div>
                        <div className="w-3 h-3 bg-purple-600"></div>
                        <div className="w-3 h-3 bg-cyan-600"></div>
                        <div className="w-3 h-3 bg-white border border-gray-600"></div>
                      </div>
                    </div>
                  </div>

                  {/* Hero description */}
                  <div className="mt-8">
                    <div className="flex items-center space-x-1 mb-3">
                      <span className="text-primary font-semibold">
                        devon@portfolio
                      </span>
                      <span className="text-gray-400">:</span>
                      <span className="text-blue-400 font-semibold">~</span>
                      <span className="text-gray-400">$</span>
                      <span className="text-amber-300 font-semibold">
                        cat README.md
                      </span>
                    </div>

                    <div className="ml-4 p-4 bg-slate-800/50 rounded-lg border-l-4 border-primary">
                      <div className="text-lg font-bold text-primary mb-3">
                        Building scalable web applications that millions depend
                        on.
                      </div>
                      <div className="text-gray-300 leading-relaxed space-y-2">
                        <p>
                          Full-stack engineer with{" "}
                          <span className="text-primary font-semibold">
                            7+ years
                          </span>{" "}
                          crafting mission-critical software. From healthcare
                          platforms serving{" "}
                          <span className="text-green-400">10M+ users</span> to
                          defense systems requiring
                          <span className="text-blue-400">
                            {" "}
                            bulletproof reliability
                          </span>
                          , I deliver production-grade solutions with modern
                          <span className="text-purple-400">
                            {" "}
                            React, TypeScript,
                          </span>{" "}
                          and{" "}
                          <span className="text-yellow-400">
                            cloud architecture
                          </span>
                          .
                        </p>
                        <p className="mt-3">
                          Currently{" "}
                          <span className="text-primary font-semibold">
                            architecting client solutions at Livefront
                          </span>
                          , building the next generation of web experiences.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cursor */}
                  <div className="flex items-center space-x-1 mt-6">
                    <span className="text-primary font-semibold">
                      devon@portfolio
                    </span>
                    <span className="text-gray-400">:</span>
                    <span className="text-blue-400 font-semibold">~</span>
                    <span className="text-gray-400">$</span>
                    <span className="text-primary animate-pulse font-bold">
                      █
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* About Command */}
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-primary font-semibold">
                        devon@portfolio
                      </span>
                      <span className="text-gray-400">:</span>
                      <span className="text-blue-400 font-semibold">~</span>
                      <span className="text-gray-400">$</span>
                      <span className="text-amber-300 font-semibold">
                        whoami
                      </span>
                    </div>
                    <div className="ml-4 p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-white font-semibold text-lg text-primary">
                        Devon Hills
                      </div>
                      <div className="text-gray-300 mt-1">
                        Software Engineer
                      </div>
                      <div className="text-gray-400 text-sm mt-1">
                        7+ years experience • React & TypeScript specialist
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-primary font-semibold">
                        devon@portfolio
                      </span>
                      <span className="text-gray-400">:</span>
                      <span className="text-blue-400 font-semibold">~</span>
                      <span className="text-gray-400">$</span>
                      <span className="text-amber-300 font-semibold">
                        cat summary.md
                      </span>
                    </div>
                    <div className="ml-4 p-4 bg-slate-800/50 rounded-lg space-y-2 text-sm">
                      <div className="text-gray-100">
                        <span className="text-primary font-semibold">
                          Professional Summary:
                        </span>
                      </div>
                      <div className="text-gray-300 leading-relaxed">
                        Software Engineer with{" "}
                        <span className="text-primary">7+ years</span> of
                        experience specializing in
                        <span className="text-blue-400">
                          {" "}
                          React, TypeScript,
                        </span>{" "}
                        and modern JavaScript development. Expert in building
                        responsive, accessible user interfaces for
                        <span className="text-green-400">
                          {" "}
                          high-traffic applications
                        </span>{" "}
                        serving millions of users.
                      </div>
                      <div className="text-gray-300 leading-relaxed">
                        Proven track record in production support, UI/UX
                        optimization, and full-stack development with strong{" "}
                        <span className="text-purple-400">CI/CD expertise</span>{" "}
                        in healthcare and government technology solutions.
                      </div>
                    </div>
                  </div>

                  {/* Current Role */}
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-primary font-semibold">
                        devon@portfolio
                      </span>
                      <span className="text-gray-400">:</span>
                      <span className="text-blue-400 font-semibold">~</span>
                      <span className="text-gray-400">$</span>
                      <span className="text-amber-300 font-semibold">
                        cat current_role.txt
                      </span>
                    </div>
                    <div className="ml-4 p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-primary font-semibold">
                        Livefront
                      </div>
                      <div className="text-gray-300 text-sm">
                        Software Engineer | Aug 2025 - Present
                      </div>
                      <div className="text-gray-400 text-sm mt-1">
                        Working on internal initiatives and tools with{" "}
                        <span className="text-green-400">LLM integration</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Command */}
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-primary font-semibold">
                        devon@portfolio
                      </span>
                      <span className="text-gray-400">:</span>
                      <span className="text-blue-400 font-semibold">~</span>
                      <span className="text-gray-400">$</span>
                      <span className="text-amber-300 font-semibold">
                        ls -la skills/
                      </span>
                    </div>
                    <div className="ml-4 p-4 bg-slate-800/50 rounded-lg">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center space-x-3">
                          <span className="text-blue-400 font-mono">
                            📁 frontend/
                          </span>
                          <span className="text-gray-300">
                            React, TypeScript, JavaScript, HTML5, CSS3, Next.js,
                            Redux, Tailwind CSS
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-green-400 font-mono">
                            📁 backend/
                          </span>
                          <span className="text-gray-300">
                            Ruby on Rails, Node.js, Python, Flask, PostgreSQL,
                            RESTful APIs
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-purple-400 font-mono">
                            📁 testing/
                          </span>
                          <span className="text-gray-300">
                            Playwright, React Testing Library, axe-core,
                            WCAG/Section 508
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-yellow-400 font-mono">
                            📁 devops/
                          </span>
                          <span className="text-gray-300">
                            Git, Jenkins, CI/CD, AWS, Docker, Production
                            Deployment
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-primary font-mono">
                            📁 ai-ml/
                          </span>
                          <span className="text-gray-300">
                            LLM Integration, Python Automation, Machine Learning
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <div className="flex items-center space-x-1 mb-2">
                      <span className="text-primary font-semibold">
                        devon@portfolio
                      </span>
                      <span className="text-gray-400">:</span>
                      <span className="text-blue-400 font-semibold">~</span>
                      <span className="text-gray-400">$</span>
                      <span className="text-amber-300 font-semibold">
                        cat education.txt
                      </span>
                    </div>
                    <div className="ml-4 p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-blue-400 font-semibold">
                        University of Massachusetts Lowell
                      </div>
                      <div className="text-gray-300 text-sm">
                        BS Computer Science | Dec 2017
                      </div>
                      <div className="text-gray-400 text-sm">
                        Graduated cum laude • Dean's List multiple years
                      </div>
                    </div>
                  </div>

                  {/* Cursor */}
                  <div className="flex items-center space-x-1">
                    <span className="text-primary font-semibold">
                      devon@portfolio
                    </span>
                    <span className="text-gray-400">:</span>
                    <span className="text-blue-400 font-semibold">~</span>
                    <span className="text-gray-400">$</span>
                    <span className="text-primary animate-pulse font-bold">
                      █
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "files":
        return <ProjectsWindow />;
      case "editor":
        return (
          <div className="h-full flex flex-col bg-gray-900 text-gray-100">
            {/* Code Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium">
                  {activeTab === "experience" ? "experience.md" : "skills.md"}
                </div>
                <div className="text-xs text-gray-400">• Markdown</div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>UTF-8</span>
                <span>•</span>
                <span>LF</span>
              </div>
            </div>

            {/* File Tabs */}
            <div className="flex bg-gray-800 border-b border-gray-700">
              <div
                className={`px-2 sm:px-4 py-2 text-xs sm:text-sm border-r border-gray-600 flex items-center space-x-1 sm:space-x-2 cursor-pointer transition-colors ${
                  activeTab === "experience"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-750"
                }`}
                onClick={() => setActiveTab("experience")}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">experience.md</span>
                <span className="sm:hidden">exp</span>
              </div>
              <div
                className={`px-2 sm:px-4 py-2 text-xs sm:text-sm border-r border-gray-600 flex items-center space-x-1 sm:space-x-2 cursor-pointer transition-colors ${
                  activeTab === "skills"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-750"
                }`}
                onClick={() => setActiveTab("skills")}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">skills.md</span>
                <span className="sm:hidden">skills</span>
              </div>
            </div>

            {/* Code Editor Content */}
            <div className="flex-1 flex">
              {/* Line Numbers */}
              <div className="hidden sm:block bg-gray-800 px-1 sm:px-2 py-2 sm:py-4 text-xs text-gray-500 border-r border-gray-700 select-none">
                {Array.from({ length: 50 }, (_, i) => (
                  <div key={i} className="leading-6 text-right">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Editor Content */}
              <div className="flex-1 p-2 sm:p-4 overflow-y-auto max-h-full">
                {activeTab === "experience" ? (
                  <div className="space-y-6 font-sans text-sm text-gray-100">
                    {/* Professional Experience Header */}
                    <div className="border-b border-gray-600 pb-2">
                      <h1 className="text-xl font-bold text-blue-300">
                        Professional Experience
                      </h1>
                    </div>

                    {/* Current Role - Livefront */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-primary">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-lg font-semibold text-green-300">
                            Software Engineer
                          </h2>
                          <h3 className="text-primary font-medium">
                            Livefront
                          </h3>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                          Aug 2025 - Present
                        </span>
                      </div>
                      <div className="text-gray-300 space-y-1">
                        <p>
                          • Working on internal initiatives and tools with LLM
                          integration
                        </p>
                        <p>
                          • Developing AI-powered solutions for internal
                          workflows and automation
                        </p>
                      </div>
                    </div>

                    {/* Ad Hoc LLC */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-blue-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-lg font-semibold text-green-300">
                            Software Engineer III
                          </h2>
                          <h3 className="text-blue-400 font-medium">
                            Ad Hoc LLC, Remote
                          </h3>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                          Nov 2021 - Apr 2025
                        </span>
                      </div>
                      <div className="text-gray-300 space-y-1 text-xs leading-relaxed">
                        <p>
                          • Built and maintained React/TypeScript applications
                          for{" "}
                          <span className="text-blue-400">HealthCare.gov</span>{" "}
                          health plan enrollment workflows, serving millions of
                          users during high-traffic enrollment periods
                        </p>
                        <p>
                          • Redesigned health plan comparison cards using{" "}
                          <span className="text-green-400">
                            choice architecture principles
                          </span>{" "}
                          based on customer feedback and UX research, improving
                          enrollment completion rates
                        </p>
                        <p>
                          • Designed and implemented{" "}
                          <span className="text-purple-400">
                            Redux-based state management
                          </span>{" "}
                          for dynamic filtering and comparison features,
                          optimizing performance under high loads
                        </p>
                        <p>
                          • Participated in{" "}
                          <span className="text-red-400">
                            on-call rotation shifts
                          </span>{" "}
                          using PagerDuty for 24/7 production support during
                          peak enrollment periods
                        </p>
                        <p>
                          • Developed comprehensive{" "}
                          <span className="text-yellow-400">
                            accessibility testing infrastructure
                          </span>{" "}
                          using axe-core and maintained WCAG/Section 508
                          compliance for government healthcare applications
                        </p>
                        <p>
                          • Built automated testing suites with{" "}
                          <span className="text-blue-400">
                            Playwright and React Testing Library
                          </span>
                          , including end-to-end user workflow validation
                        </p>
                        <p>
                          • Executed complex backend{" "}
                          <span className="text-red-300">Ruby logic</span> for
                          Medicare eligibility rules and coverage transitions
                        </p>
                        <p>
                          • Maintained and optimized{" "}
                          <span className="text-green-400">
                            Jenkins CI/CD pipelines
                          </span>{" "}
                          with AWS cloud infrastructure and led Ruby version
                          upgrades
                        </p>
                        <p>
                          • Collaborated with UX researchers, policy experts,
                          and support staff to identify user friction points and
                          implement technical solutions
                        </p>
                      </div>
                    </div>

                    {/* Raytheon Technologies */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-orange-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-lg font-semibold text-green-300">
                            Software Engineer
                          </h2>
                          <h3 className="text-orange-400 font-medium">
                            Raytheon Technologies, Tewksbury, MA
                          </h3>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                          Jul 2018 - Nov 2021
                        </span>
                      </div>
                      <div className="text-gray-300 space-y-1 text-xs leading-relaxed">
                        <p>
                          • Architected and maintained{" "}
                          <span className="text-cyan-400">
                            mission-critical software components
                          </span>{" "}
                          using C++, conducting systematic debugging and root
                          cause analysis
                        </p>
                        <p>
                          • Led technical documentation initiatives and{" "}
                          <span className="text-purple-400">
                            mentored junior developers
                          </span>
                          , establishing coding standards that improved team
                          productivity
                        </p>
                        <p>
                          • Collaborated in cross-functional{" "}
                          <span className="text-green-400">
                            Agile/SCRUM teams
                          </span>{" "}
                          to deliver high-performance applications on schedule
                        </p>
                        <p>
                          • Acquired a{" "}
                          <span className="text-red-400">
                            DoD Secret clearance
                          </span>{" "}
                          for job duties
                        </p>
                      </div>
                    </div>

                    {/* Education Header */}
                    <div className="border-b border-gray-600 pb-2 mt-8">
                      <h1 className="text-xl font-bold text-blue-300">
                        Education
                      </h1>
                    </div>

                    {/* Education */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-indigo-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-lg font-semibold text-green-300">
                            Bachelor of Science in Computer Science
                          </h2>
                          <h3 className="text-indigo-400 font-medium">
                            University of Massachusetts Lowell, Lowell MA
                          </h3>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                          Dec 2017
                        </span>
                      </div>
                      <div className="text-gray-300 space-y-1 text-xs">
                        <p>
                          •{" "}
                          <span className="text-yellow-400">
                            Graduated cum laude
                          </span>
                        </p>
                        <p>
                          • Achieved{" "}
                          <span className="text-green-400">
                            Dean's List recognition
                          </span>{" "}
                          multiple years
                        </p>
                      </div>
                    </div>

                    {/* Technical Skills */}
                    <div className="border-b border-gray-600 pb-2 mt-8">
                      <h1 className="text-xl font-bold text-blue-300">
                        Technical Skills
                      </h1>
                    </div>

                    <div className="mt-6 text-primary animate-pulse">●</div>
                  </div>
                ) : (
                  <div className="space-y-6 font-sans text-sm text-gray-100">
                    {/* Skills Header */}
                    <div className="border-b border-gray-600 pb-2">
                      <h1 className="text-xl font-bold text-blue-300">
                        Technical Skills
                      </h1>
                    </div>

                    {/* Frontend Development */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-blue-400">
                      <h2 className="text-lg font-semibold text-blue-400 mb-3">
                        Frontend Development
                      </h2>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            Core Technologies
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              • <span className="text-blue-300">React</span> -
                              7+ years, hooks, context, performance optimization
                            </li>
                            <li>
                              •{" "}
                              <span className="text-blue-300">TypeScript</span>{" "}
                              - Strong typing, generics, advanced patterns
                            </li>
                            <li>
                              •{" "}
                              <span className="text-blue-300">
                                JavaScript (ES6+)
                              </span>{" "}
                              - Modern syntax, async/await, modules
                            </li>
                            <li>
                              •{" "}
                              <span className="text-blue-300">
                                HTML5 & CSS3
                              </span>{" "}
                              - Semantic markup, flexbox, grid
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            Frameworks & Libraries
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              • <span className="text-purple-300">Next.js</span>{" "}
                              - SSR, SSG, API routes, optimization
                            </li>
                            <li>
                              • <span className="text-purple-300">Redux</span> -
                              State management, middleware, toolkit
                            </li>
                            <li>
                              •{" "}
                              <span className="text-purple-300">
                                Tailwind CSS
                              </span>{" "}
                              - Utility-first styling, responsive design
                            </li>
                            <li>
                              •{" "}
                              <span className="text-purple-300">
                                Responsive Design
                              </span>{" "}
                              - Mobile-first, cross-browser
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Backend & Full-Stack */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-green-400">
                      <h2 className="text-lg font-semibold text-green-400 mb-3">
                        Backend & Full-Stack
                      </h2>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            Server Technologies
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              •{" "}
                              <span className="text-red-300">
                                Ruby on Rails
                              </span>{" "}
                              - MVC, ActiveRecord, RESTful APIs
                            </li>
                            <li>
                              • <span className="text-green-300">Node.js</span>{" "}
                              - Express, middleware, async programming
                            </li>
                            <li>
                              • <span className="text-yellow-300">Python</span>{" "}
                              - Flask, automation scripts, data processing
                            </li>
                            <li>
                              •{" "}
                              <span className="text-blue-300">
                                RESTful APIs
                              </span>{" "}
                              - Design, implementation, documentation
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            Databases & Auth
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              •{" "}
                              <span className="text-blue-300">PostgreSQL</span>{" "}
                              - Complex queries, indexing, optimization
                            </li>
                            <li>
                              • <span className="text-green-300">MongoDB</span>{" "}
                              - NoSQL, aggregation pipelines
                            </li>
                            <li>
                              •{" "}
                              <span className="text-purple-300">
                                JWT Authentication
                              </span>{" "}
                              - Secure token implementation
                            </li>
                            <li>
                              •{" "}
                              <span className="text-purple-300">OAuth 2.0</span>{" "}
                              - Third-party integration, security
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Testing & Quality Assurance */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-purple-400">
                      <h2 className="text-lg font-semibold text-purple-400 mb-3">
                        Testing & Quality Assurance
                      </h2>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            Testing Frameworks
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              •{" "}
                              <span className="text-purple-300">
                                Playwright
                              </span>{" "}
                              - End-to-end testing, cross-browser automation
                            </li>
                            <li>
                              •{" "}
                              <span className="text-blue-300">
                                React Testing Library
                              </span>{" "}
                              - Component testing, user-centric
                            </li>
                            <li>
                              • <span className="text-green-300">Jest</span> -
                              Unit testing, mocking, coverage reports
                            </li>
                            <li>
                              •{" "}
                              <span className="text-yellow-300">
                                Automated Testing
                              </span>{" "}
                              - CI/CD integration, test strategies
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            Accessibility & Compliance
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              • <span className="text-red-300">axe-core</span> -
                              Automated accessibility testing
                            </li>
                            <li>
                              • <span className="text-blue-300">WCAG 2.1</span>{" "}
                              - Web accessibility guidelines compliance
                            </li>
                            <li>
                              •{" "}
                              <span className="text-purple-300">
                                Section 508
                              </span>{" "}
                              - Government accessibility standards
                            </li>
                            <li>
                              •{" "}
                              <span className="text-green-300">
                                Cross-browser Testing
                              </span>{" "}
                              - Compatibility validation
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* DevOps & Development Tools */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-400">
                      <h2 className="text-lg font-semibold text-yellow-400 mb-3">
                        DevOps & Development Tools
                      </h2>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            Version Control & CI/CD
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              • <span className="text-orange-300">Git</span> -
                              Advanced workflows, branching strategies
                            </li>
                            <li>
                              • <span className="text-blue-300">Jenkins</span> -
                              Pipeline automation, build orchestration
                            </li>
                            <li>
                              •{" "}
                              <span className="text-green-300">
                                GitHub Actions
                              </span>{" "}
                              - Workflow automation, deployment
                            </li>
                            <li>
                              •{" "}
                              <span className="text-purple-300">
                                CI/CD Pipelines
                              </span>{" "}
                              - Automated testing, deployment
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            Cloud & Infrastructure
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              • <span className="text-yellow-300">AWS</span> -
                              EC2, S3, CloudFront, Lambda functions
                            </li>
                            <li>
                              • <span className="text-blue-300">Docker</span> -
                              Containerization, multi-stage builds
                            </li>
                            <li>
                              •{" "}
                              <span className="text-green-300">
                                Production Deployment
                              </span>{" "}
                              - Zero-downtime strategies
                            </li>
                            <li>
                              •{" "}
                              <span className="text-purple-300">
                                Build Automation
                              </span>{" "}
                              - Webpack, Vite, optimization
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* AI/ML & Emerging Technologies */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-primary">
                      <h2 className="text-lg font-semibold text-primary mb-3">
                        AI/ML & Emerging Technologies
                      </h2>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            AI Integration
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              •{" "}
                              <span className="text-primary">
                                LLM Integration
                              </span>{" "}
                              - OpenAI APIs, prompt engineering
                            </li>
                            <li>
                              •{" "}
                              <span className="text-blue-300">
                                Python Automation
                              </span>{" "}
                              - Scripting, data processing
                            </li>
                            <li>
                              •{" "}
                              <span className="text-green-300">
                                Machine Learning
                              </span>{" "}
                              - TensorFlow basics, model integration
                            </li>
                            <li>
                              •{" "}
                              <span className="text-purple-300">
                                API Integration
                              </span>{" "}
                              - Third-party services, data fetching
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-green-300 font-medium mb-2">
                            Development Practices
                          </h3>
                          <ul className="text-gray-300 space-y-1">
                            <li>
                              •{" "}
                              <span className="text-blue-300">Agile/SCRUM</span>{" "}
                              - Sprint planning, retrospectives
                            </li>
                            <li>
                              •{" "}
                              <span className="text-green-300">
                                Code Reviews
                              </span>{" "}
                              - Best practices, mentoring
                            </li>
                            <li>
                              •{" "}
                              <span className="text-yellow-300">
                                Performance Optimization
                              </span>{" "}
                              - Profiling, monitoring
                            </li>
                            <li>
                              •{" "}
                              <span className="text-red-300">
                                Security Best Practices
                              </span>{" "}
                              - OWASP, secure coding
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-primary animate-pulse">●</div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Bar */}
            <div className="px-4 py-1 bg-gray-800 border-t border-gray-700 text-xs text-gray-400 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span>Ln 25, Col 1</span>
                <span>Spaces: 2</span>
              </div>
              <div>Markdown</div>
            </div>
          </div>
        );
      case "browser":
        return (
          <div className="h-full flex flex-col bg-white">
            {/* Browser Header */}
            <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
              <div className="flex items-center space-x-2 flex-1">
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-slate-700 rounded text-gray-300 hover:text-white">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-slate-700 rounded text-gray-300 hover:text-white">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-slate-700 rounded text-gray-300 hover:text-white">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 mx-4">
                  <div className="flex items-center px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg">
                    <Globe className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-300">
                      devonhills.dev/contact
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Browser Content */}
            <div className="flex-1 p-3 sm:p-6 overflow-y-auto bg-slate-900">
              <div className="max-w-full sm:max-w-lg mx-auto">
                <div className="bg-slate-800 rounded-lg shadow-lg p-3 sm:p-6 border border-slate-700">
                  <div className="text-center mb-4 sm:mb-6">
                    <h1 className="text-lg sm:text-2xl font-bold text-white mb-2">
                      Let's Connect
                    </h1>
                    <p className="text-sm sm:text-base text-gray-300">
                      Ready to discuss your next project
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {/* Email Contact */}
                    <a
                      href="mailto:devonjhills@gmail.com"
                      className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-primary/60 hover:bg-primary/10 transition-all duration-200"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white group-hover:text-primary transition-colors">
                          Email
                        </div>
                        <div className="text-sm text-gray-300">
                          devonjhills@gmail.com
                        </div>
                      </div>
                      <div className="text-primary group-hover:translate-x-1 transition-transform">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </a>

                    {/* LinkedIn Contact */}
                    <a
                      href="https://linkedin.com/in/devonjhills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-primary/60 hover:bg-primary/10 transition-all duration-200"
                    >
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white group-hover:text-primary transition-colors">
                          LinkedIn
                        </div>
                        <div className="text-sm text-gray-300">
                          linkedin.com/in/devonjhills
                        </div>
                      </div>
                      <div className="text-primary group-hover:translate-x-1 transition-transform">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </a>

                    {/* GitHub Contact */}
                    <a
                      href="https://github.com/devonjhills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-primary/60 hover:bg-primary/10 transition-all duration-200"
                    >
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white group-hover:text-primary transition-colors">
                          GitHub
                        </div>
                        <div className="text-sm text-gray-300">
                          github.com/devonjhills
                        </div>
                      </div>
                      <div className="text-primary group-hover:translate-x-1 transition-transform">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "resume":
        return (
          <div className="h-full flex flex-col bg-slate-900">
            {/* Document Viewer Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
              <div className="flex items-center space-x-4">
                <User className="w-5 h-5 text-primary" />
                <div className="text-sm font-medium text-white">
                  Devon_Hills_Resume_2025_Newest.pdf
                </div>
              </div>
            </div>

            {/* Download Content */}
            <div className="flex-1 flex items-center justify-center p-3 sm:p-4">
              <div className="text-center max-w-full sm:max-w-sm px-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                </div>

                <h1 className="text-lg sm:text-xl font-bold text-white mb-2">
                  My Resume
                </h1>
                <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
                  Download my professional resume in PDF format.
                </p>

                <a
                  href="/Devon_Hills_Resume_2025_Newest.pdf"
                  download="Devon_Hills_Resume_2025_Newest.pdf"
                  className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-primary text-slate-900 rounded-lg hover:bg-primary/90 transition-colors font-medium text-xs sm:text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-4">Unknown application</div>;
    }
  };

  const getWindowTitle = (appName: string) => {
    const titles = {
      terminal: "Terminal",
      files: "Projects - Files",
      editor: "Experience - Text Editor",
      browser: "Contact - Firefox",
      resume: "Resume - Document Viewer",
    };
    return titles[appName as keyof typeof titles] || appName;
  };

  return (
    <div className="window-manager absolute inset-0 pointer-events-none">
      {openWindows.map((window) => (
        <div
          key={window.appName}
          className={`ubuntu-window absolute ${
            window.appName === "terminal" ||
            window.appName === "editor" ||
            window.appName === "files"
              ? "bg-gray-900"
              : window.appName === "browser" || window.appName === "resume"
                ? "bg-slate-900"
                : "bg-white"
          } border border-gray-300 rounded-lg shadow-2xl pointer-events-auto transition-all duration-300 animate-window-open ${
            activeWindow === window.appName
              ? "ring-2 ring-primary shadow-primary/20"
              : ""
          }`}
          style={{
            left: isNaN(window.x) ? 0 : window.x,
            top: isNaN(window.y) ? 36 : window.y,
            width: isNaN(window.width) ? 800 : window.width,
            height: isNaN(window.height) ? 600 : window.height,
            zIndex: window.zIndex || 100,
            display: window.isMinimized ? "none" : "block",
          }}
          onClick={() => onActivateWindow(window.appName)}
        >
          {/* Title Bar */}
          <div
            className={`window-title-bar flex items-center justify-between h-12 rounded-t-lg px-4 cursor-move select-none ${
              activeWindow === window.appName
                ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white border-b border-gray-700"
                : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-200 border-b border-gray-600"
            }`}
            onMouseDown={(e) => handleMouseDown(e, window.appName, "drag")}
          >
            <div className="flex items-center space-x-3">
              <div className="window-icon">{getWindowIcon(window.appName)}</div>
              <div className="window-title font-medium text-sm">
                {getWindowTitle(window.appName)}
              </div>
            </div>
            <div className="window-controls flex items-center space-x-2">
              {/* Minimize */}
              <button
                className={`w-6 h-6 flex items-center justify-center rounded transition-colors group ${
                  activeWindow === window.appName
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-500"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateWindow(window.appName, { isMinimized: true });
                }}
                title="Minimize"
              >
                <div
                  className={`w-3 h-0.5 transition-colors ${
                    activeWindow === window.appName
                      ? "bg-gray-300 group-hover:bg-white"
                      : "bg-gray-300 group-hover:bg-white"
                  }`}
                ></div>
              </button>
              {/* Maximize */}
              <button
                className={`w-6 h-6 flex items-center justify-center rounded transition-colors group ${
                  activeWindow === window.appName
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-500"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  // Maximize logic could go here
                }}
                title="Maximize"
              >
                <div
                  className={`w-3 h-3 border transition-colors ${
                    activeWindow === window.appName
                      ? "border-gray-300 group-hover:border-white"
                      : "border-gray-300 group-hover:border-white"
                  }`}
                ></div>
              </button>
              {/* Close */}
              <button
                className="w-6 h-6 flex items-center justify-center hover:bg-red-500 rounded transition-colors group"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseWindow(window.appName);
                }}
                title="Close"
              >
                <div className="relative w-3 h-3 flex items-center justify-center">
                  <div
                    className={`w-3 h-0.5 group-hover:bg-white rotate-45 absolute transition-colors ${
                      activeWindow === window.appName
                        ? "bg-gray-300"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`w-3 h-0.5 group-hover:bg-white -rotate-45 absolute transition-colors ${
                      activeWindow === window.appName
                        ? "bg-gray-300"
                        : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div
            className={`window-content overflow-auto rounded-b-lg ${
              window.appName === "terminal" ||
              window.appName === "editor" ||
              window.appName === "files"
                ? "bg-gray-900"
                : window.appName === "browser" || window.appName === "resume"
                  ? "bg-slate-900"
                  : "bg-white"
            }`}
            style={{ height: `calc(100% - 3rem)` }}
          >
            {getWindowContent(window.appName)}
          </div>

          {/* Resize Handles - Positioned to avoid scrollbar conflicts */}

          {/* Bottom edge - positioned well above scrollbar area */}
          <div
            className="absolute bottom-0 left-2 right-10 h-3 cursor-s-resize hover:bg-primary/20 transition-colors"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "s")
            }
          />

          {/* Left edge */}
          <div
            className="absolute top-12 bottom-10 left-0 w-2 cursor-w-resize hover:bg-primary/20 transition-colors"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "w")
            }
          />

          {/* Right edge - positioned well away from vertical scrollbar */}
          <div
            className="absolute top-12 bottom-10 right-0 w-4 cursor-e-resize hover:bg-primary/20 transition-colors"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "e")
            }
          />

          {/* Bottom corner resize handles - positioned outside scrollbar zone */}
          {/* Bottom-left */}
          <div
            className="resize-handle absolute bottom-0 left-0 w-4 h-6 cursor-sw-resize hover:bg-primary/30 transition-colors rounded-tr-lg"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "sw")
            }
          />

          {/* Bottom-right - main resize handle positioned outside scrollbar corner */}
          <div
            className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-se-resize hover:bg-primary/30 transition-colors rounded-tl-lg bg-gray-50/20 border border-gray-400/30"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "se")
            }
            style={{ zIndex: 1000 }} // Ensure it's above scrollbars
          />

          {/* Additional bottom-right resize area - larger hit target over scrollbar corner */}
          <div
            className="absolute bottom-0 right-0 w-12 h-12 cursor-se-resize opacity-0 hover:opacity-20 hover:bg-primary transition-opacity"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "se")
            }
            style={{ zIndex: 999 }} // Above content but below main handle
          />
        </div>
      ))}
    </div>
  );
}

// GitHub Repository Interface
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  readme?: string;
}

// Projects Window Component with GitHub Integration
function ProjectsWindow() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.github.com/users/devonjhills/repos?sort=updated&per_page=6",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const repoData: GitHubRepo[] = await response.json();

        // Use repository description/about field directly
        const reposWithAbout = repoData.map((repo) => {
          // Use the repository's "about" field (description) as it's more reliable
          repo.readme = repo.description || "No description available";
          return repo;
        });

        setRepos(reposWithAbout);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load repositories",
        );
        // Fallback data
        setRepos([
          {
            id: 1,
            name: "my_portfolio",
            full_name: "devonjhills/my_portfolio",
            description:
              "A modern portfolio website built with Next.js featuring an Ubuntu-inspired desktop interface",
            html_url: "https://github.com/devonjhills/my_portfolio",
            stargazers_count: 12,
            forks_count: 3,
            language: "TypeScript",
            updated_at: new Date().toISOString(),
            topics: ["portfolio", "nextjs", "typescript", "ubuntu"],
            readme:
              "A modern portfolio website built with Next.js featuring an Ubuntu-inspired desktop interface",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubRepos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#1572B6",
      Vue: "#41b883",
      React: "#61dafb",
      Go: "#00ADD8",
      Rust: "#dea584",
    };
    return colors[language || ""] || "#6b7280";
  };

  const formatRepositoryName = (name: string) => {
    return name
      .split(/[-_]/) // Split on dashes and underscores
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Title case each word
      .join(" "); // Join with spaces
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100">
      {/* File Manager Header - Dark Mode */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-gray-700 rounded-md transition-colors">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-md transition-colors">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-md transition-colors">
              <FolderOpen className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1 bg-gray-700 border border-gray-600 rounded-md min-w-0 flex-1 max-w-sm">
            <FolderOpen className="w-4 h-4 text-primary" />
            <span className="text-sm text-gray-300 truncate">
              /home/devon/GitHub
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-700 rounded-md transition-colors">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Dark Mode */}
        <div className="w-16 sm:w-24 md:w-32 bg-gray-800 border-r border-gray-700 p-1 sm:p-2">
          <div className="space-y-1 text-xs">
            <div className="px-1 sm:px-2 py-1 font-semibold text-gray-300 text-xs uppercase tracking-wider hidden md:block">
              Repos
            </div>
            <button
              className="w-full flex items-center justify-center md:justify-start md:space-x-2 px-1 sm:px-2 py-2 text-left rounded-md hover:bg-gray-700 text-gray-300"
              title="Home"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V15a3 3 0 003 3h6a3 3 0 003-3v-2.586l.293.293a1 1 0 001.414-1.414l-9-9z" />
              </svg>
              <span className="hidden md:inline text-xs">Home</span>
            </button>
            <button
              className="w-full flex items-center justify-center md:justify-start md:space-x-2 px-1 sm:px-2 py-2 text-left rounded-md bg-primary/20 text-primary font-medium"
              title="GitHub Repos"
            >
              <FolderOpen className="w-4 h-4 flex-shrink-0" />
              <span className="hidden md:inline text-xs">GitHub</span>
            </button>
          </div>
        </div>

        {/* Main Content - Dark Mode */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">
              Latest GitHub Repositories
            </h2>
            <p className="text-sm text-gray-400">
              My most recently updated repositories from GitHub
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-400">Loading repositories...</div>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4">
              Error: {error}
            </div>
          ) : null}

          <div
            className="grid gap-3 sm:gap-4 auto-cols-fr"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            }}
          >
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="group relative p-3 sm:p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 cursor-pointer hover:bg-gray-750 min-h-[140px] sm:min-h-[160px]"
                onClick={() => window.open(repo.html_url, "_blank")}
                title={`Click to view ${formatRepositoryName(
                  repo.name,
                )} on GitHub`}
              >
                {/* GitHub Indicator Badge */}
                <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center space-x-1 px-2 py-1 bg-gray-900/80 rounded-md text-xs text-gray-300">
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </div>
                </div>

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-100 truncate flex items-center space-x-2 group-hover:text-primary transition-colors">
                        <span>{formatRepositoryName(repo.name)}</span>
                        <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                      </div>
                      <div className="text-xs text-gray-400 flex items-center space-x-2">
                        <Github className="w-3 h-3" />
                        <span>devonjhills/{repo.name}</span>
                        {repo.language && (
                          <>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: getLanguageColor(
                                    repo.language,
                                  ),
                                }}
                              />
                              <span>{repo.language}</span>
                            </div>
                          </>
                        )}
                        <span>•</span>
                        <span>{formatDate(repo.updated_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3 leading-relaxed line-clamp-3">
                  {repo.readme ||
                    repo.description ||
                    "No description available"}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {repo.topics.slice(0, 4).map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-primary text-xs rounded-md border border-gray-600"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 4 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-md border border-gray-600">
                        +{repo.topics.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-3 h-3 text-gray-400" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Updated {formatDate(repo.updated_at)}</span>
                  </div>
                </div>

                {/* Call-to-Action Button */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>Click to view repository</span>
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium group-hover:bg-primary/20 transition-colors">
                    <Github className="w-3 h-3" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar - Dark Mode */}
      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400 flex items-center justify-between">
        <span>{repos.length} repositories loaded</span>
        <span>GitHub API • devonjhills</span>
      </div>
    </div>
  );
}
