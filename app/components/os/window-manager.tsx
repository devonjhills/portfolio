"use client";

import { useState, useRef, useCallback, useEffect, memo } from "react";
import {
  FolderOpen,
  FileText,
  Globe,
  User,
  Star,
  GitFork,
  Code,
  ExternalLink,
} from "lucide-react";

// --- DATA CONSTANTS --- //

const resumeData = {
  summary: [
    "Software Engineer with 7+ years of experience specializing in React, TypeScript, and modern JavaScript development.",
    "Expert in building responsive, accessible user interfaces for high-traffic applications serving millions of users.",
    "Proven track record in production support, UI/UX optimization, and full-stack development with strong CI/CD expertise in healthcare and government technology solutions.",
  ],
  experience: [
    {
      role: "Software Engineer",
      company: "Livefront",
      location: "Remote",
      date: "Aug 2025 - Present",
      color: "border-primary",
      points: [
        "Working on internal initiatives and tools with LLM integration.",
        "Developing AI-powered solutions for internal workflows and automation.",
      ],
    },
    {
      role: "Software Engineer III",
      company: "Ad Hoc LLC",
      location: "Remote",
      date: "Nov 2021 - Apr 2025",
      color: "border-blue-400",
      points: [
        "Built and maintained React/TypeScript applications for HealthCare.gov, serving millions of users.",
        "Redesigned health plan comparison cards using choice architecture principles based on customer feedback and UX research.",
        "Designed and implemented Redux-based state management for dynamic filtering and comparison features.",
        "Participated in on-call rotation shifts using PagerDuty for 24/7 production support during peak enrollment periods.",
        "Developed comprehensive accessibility testing infrastructure using axe-core and maintained WCAG/Section 508 compliance.",
        "Built automated testing suites with Playwright and React Testing Library.",
        "Executed complex backend Ruby logic for Medicare eligibility rules.",
        "Maintained and optimized Jenkins CI/CD pipelines with AWS cloud infrastructure.",
        "Led technical documentation efforts, establishing coding standards and best practices.",
      ],
    },
    {
      role: "Software Engineer",
      company: "Raytheon Technologies",
      location: "Tewksbury, MA",
      date: "Jul 2018 - Nov 2021",
      color: "border-orange-400",
      points: [
        "Architected and maintained mission-critical software components using C++.",
        "Led technical documentation initiatives and mentored junior developers.",
        "Collaborated in cross-functional Agile/SCRUM teams to deliver high-performance applications.",
        "Acquired a DoD Secret clearance for working on sensitive defense technology projects.",
      ],
    },
  ],
  education: {
    degree: "Bachelor of Science in Computer Science",
    school: "University of Massachusetts Lowell",
    location: "Lowell, MA",
    date: "Dec 2017",
    color: "border-indigo-400",
    points: ["Graduated cum laude", "Achieved Dean's List recognition"],
  },
  skills: {
    "Frontend Development": {
      color: "border-blue-400",
      items: [
        "React",
        "TypeScript",
        "JavaScript (ES6+)",
        "Next.js",
        "Redux",
        "Tailwind CSS",
        "HTML5 & CSS3",
        "UI/UX Development",
      ],
    },
    "Backend & Full-Stack": {
      color: "border-green-400",
      items: [
        "Ruby on Rails",
        "Node.js",
        "Python",
        "Flask",
        "RESTful APIs",
        "PostgreSQL",
        "JWT & OAuth 2.0",
      ],
    },
    "Testing & Quality Assurance": {
      color: "border-yellow-400",
      items: [
        "Playwright",
        "React Testing Library",
        "Jest",
        "Automated Testing",
        "Accessibility (axe-core)",
        "WCAG/Section 508",
      ],
    },
    "DevOps & Development Tools": {
      color: "border-purple-400",
      items: [
        "Git",
        "Jenkins",
        "CI/CD Pipelines",
        "AWS",
        "Docker",
        "GitHub Actions",
        "Build Automation",
      ],
    },
    "AI/ML & Data Integration": {
      color: "border-cyan-400",
      items: [
        "LLM Integration (OpenAI)",
        "Supabase",
        "SWR",
        "Python Automation",
        "SEO Optimization (JSON-LD)",
      ],
    },
    "Practices & Methodologies": {
      color: "border-orange-400",
      items: [
        "Agile/SCRUM",
        "Test-Driven Development",
        "Code Reviews",
        "Technical Documentation",
        "Performance Optimization",
      ],
    },
  },
};

// --- CUSTOM HOOK --- //

function useWindowResponsive() {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateContainerWidth = () => {
      setContainerWidth(container.offsetWidth);
    };

    const resizeObserver = new ResizeObserver(updateContainerWidth);
    resizeObserver.observe(container);
    updateContainerWidth();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const getBreakpoint = useCallback(() => {
    if (containerWidth >= 900) return "xl";
    if (containerWidth >= 700) return "lg";
    if (containerWidth >= 500) return "md";
    return "sm";
  }, [containerWidth]);

  const getGridColumns = useCallback(
    (xl = 3, lg = 2, md = 2, sm = 1) => {
      const breakpoint = getBreakpoint();
      switch (breakpoint) {
        case "xl":
          return `repeat(${xl}, 1fr)`;
        case "lg":
          return `repeat(${lg}, 1fr)`;
        case "md":
          return `repeat(${md}, 1fr)`;
        default:
          return `repeat(${sm}, 1fr)`;
      }
    },
    [getBreakpoint],
  );

  const isAtLeast = useCallback(
    (breakpoint: "sm" | "md" | "lg" | "xl") => {
      const sizes = { sm: 0, md: 500, lg: 700, xl: 900 };
      return containerWidth >= sizes[breakpoint];
    },
    [containerWidth],
  );

  return {
    containerRef,
    containerWidth,
    getGridColumns,
    isAtLeast,
  };
}

// --- WINDOW MANAGER --- //

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
  const dragStateRef = useRef({
    isDragging: false,
    isResizing: false,
    resizeDirection: "",
    startX: 0,
    startY: 0,
    startWindowX: 0,
    startWindowY: 0,
    startWidth: 0,
    startHeight: 0,
    currentWindow: null as string | null,
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

      const handleMouseMove = (e: MouseEvent) => {
        const state = dragStateRef.current;
        if (!state.currentWindow) return;

        const deltaX = e.clientX - state.startX;
        const deltaY = e.clientY - state.startY;

        requestAnimationFrame(() => {
          if (state.isDragging) {
            onUpdateWindow(state.currentWindow!, {
              x: Math.max(0, state.startWindowX + deltaX),
              y: Math.max(32, state.startWindowY + deltaY), // Account for top bar
            });
          } else if (state.isResizing) {
            const updates: Partial<WindowState> = {};
            if (state.resizeDirection.includes("e")) {
              updates.width = Math.max(400, state.startWidth + deltaX);
            }
            if (state.resizeDirection.includes("w")) {
              const newWidth = Math.max(400, state.startWidth - deltaX);
              updates.width = newWidth;
              updates.x = state.startWindowX + (state.startWidth - newWidth);
            }
            if (state.resizeDirection.includes("s")) {
              updates.height = Math.max(300, state.startHeight + deltaY);
            }
            onUpdateWindow(state.currentWindow!, updates);
          }
        });
      };

      const handleMouseUp = () => {
        dragStateRef.current.isDragging = false;
        dragStateRef.current.isResizing = false;
        dragStateRef.current.currentWindow = null;
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
    const iconPaths: { [key: string]: string } = {
      terminal: "/icons/Terminal.png",
      files: "/icons/Folder.png",
      editor: "/icons/Document.png",
      browser: "/icons/Contact.png",
      resume: "/icons/File_Download.png",
    };
    const iconPath = iconPaths[appName] || "/icons/Terminal.png";
    return (
      <img src={iconPath} alt={appName} className="w-4 h-4 object-contain" />
    );
  };

  const getWindowContent = (appName: string) => {
    switch (appName) {
      case "terminal":
        return <TerminalWindow />;
      case "files":
        return <ProjectsWindow />;
      case "editor":
        return <CodeEditorWindow />;
      case "browser":
        return <BrowserWindow />;
      case "resume":
        return <ResumeWindow />;
      default:
        return <div className="p-4">Unknown application</div>;
    }
  };

  const getWindowTitle = (appName: string) => {
    const titles: { [key: string]: string } = {
      terminal: "Terminal",
      files: "Projects - File Manager",
      editor: "Resume - Text Editor",
      browser: "Contact - Browser",
      resume: "Download - Document Viewer",
    };
    return titles[appName] || appName;
  };

  return (
    <div className="window-manager absolute inset-0 pointer-events-none">
      {openWindows.map((window) => (
        <div
          key={window.appName}
          className={`ubuntu-window absolute bg-gray-900 border border-gray-700 rounded-lg shadow-2xl pointer-events-auto transition-all duration-300 animate-window-open ${
            activeWindow === window.appName
              ? "ring-2 ring-primary shadow-primary/20"
              : ""
          }`}
          style={{
            left: window.x,
            top: window.y,
            width: window.width,
            height: window.height,
            zIndex: window.zIndex,
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
              {getWindowIcon(window.appName)}
              <div className="font-medium text-sm">
                {getWindowTitle(window.appName)}
              </div>
            </div>
            <div className="window-controls flex items-center space-x-2">
              <button
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateWindow(window.appName, { isMinimized: true });
                }}
                title="Minimize"
              >
                <div className="w-3 h-0.5 bg-gray-300"></div>
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700"
                title="Maximize"
              >
                <div className="w-3 h-3 border border-gray-300"></div>
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center hover:bg-red-500 rounded transition-colors group"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseWindow(window.appName);
                }}
                title="Close"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="#E5E7EB"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div
            className="window-content overflow-auto rounded-b-lg bg-gray-900"
            style={{ height: `calc(100% - 3rem)` }}
          >
            {getWindowContent(window.appName)}
          </div>

          {/* Resize Handles */}
          <div
            className="absolute bottom-0 left-2 right-10 h-3 cursor-s-resize"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "s")
            }
          />
          <div
            className="absolute top-12 bottom-10 left-0 w-2 cursor-w-resize"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "w")
            }
          />
          <div
            className="absolute top-12 bottom-10 right-0 w-4 cursor-e-resize"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "e")
            }
          />
          <div
            className="resize-handle absolute bottom-0 left-0 w-4 h-6 cursor-sw-resize"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "sw")
            }
          />
          <div
            className="resize-handle absolute bottom-0 right-0 w-6 h-6 cursor-se-resize hover:bg-primary/30 transition-colors rounded-tl-lg"
            onMouseDown={(e) =>
              handleMouseDown(e, window.appName, "resize", "se")
            }
          />
        </div>
      ))}
    </div>
  );
}

// --- WINDOW COMPONENTS (MEMOIZED) --- //

const TerminalWindow = memo(function TerminalWindow() {
  const [terminalTab, setTerminalTab] = useState("hero");

  return (
    <div className="bg-slate-900 text-gray-100 font-mono text-sm h-full flex flex-col">
      {/* Header and Tabs */}
      <div className="bg-slate-800 px-4 py-2 text-gray-200 text-xs flex items-center border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-primary font-semibold">Terminal</span>
          <span className="text-gray-400">devon@portfolio</span>
        </div>
      </div>
      <div className="flex bg-slate-800 border-b border-slate-700">
        {["hero", "profile"].map((tab) => (
          <div
            key={tab}
            className={`px-4 py-2 text-sm border-r border-slate-600 cursor-pointer transition-colors ${
              terminalTab === tab
                ? "bg-slate-700 text-primary"
                : "text-gray-400 hover:bg-slate-750"
            }`}
            onClick={() => setTerminalTab(tab)}
          >
            {tab === "hero" ? "neofetch" : "profile"}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 lg:p-6 flex-1 overflow-y-auto">
        {terminalTab === "hero" ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-1 mb-4 text-sm">
              <span className="text-primary font-semibold">
                devon@portfolio
              </span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400 font-semibold">~</span>
              <span className="text-gray-400">$</span>
              <span className="text-amber-300 font-semibold">neofetch</span>
            </div>
            {/* Neofetch output */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 font-mono text-sm">
              <img
                src="/avatar.png"
                alt="Devon Hills"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg"
              />
              <div className="flex-1 space-y-2">
                <div className="text-xl sm:text-2xl">
                  <span className="text-primary font-bold">devon</span>
                  <span className="text-gray-400">@</span>
                  <span className="text-blue-400 font-bold">portfolio</span>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-primary to-transparent mb-3"></div>
                <div className="space-y-1.5 text-sm">
                  {[
                    { label: "OS", value: "Ubuntu 22.04 LTS" },
                    { label: "Host", value: "Livefront" },
                    { label: "Uptime", value: "7 years, 2 months" },
                    { label: "WM", value: "React + TypeScript" },
                    { label: "CPU", value: "Full-Stack Engineer" },
                    { label: "Memory", value: "HealthCare.gov + Defense" },
                  ].map((item, i) => (
                    <div key={i}>
                      <span className="text-primary font-bold w-20 inline-block text-right mr-2">
                        {item.label}
                      </span>
                      <span className="text-gray-400 mr-2">:</span>
                      <span className="text-gray-300">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center space-x-1 mb-3 text-sm">
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
                  Building scalable web applications that millions depend on.
                </div>
                <div className="text-gray-300 leading-relaxed space-y-2 text-sm">
                  <p>
                    Full-stack engineer with{" "}
                    <span className="text-primary font-semibold">7+ years</span>{" "}
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
                    <span className="text-yellow-400">cloud architecture</span>.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 mt-6 text-sm">
              <span className="text-primary font-semibold">
                devon@portfolio
              </span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400 font-semibold">~</span>
              <span className="text-gray-400">$</span>
              <span className="text-primary animate-pulse font-bold">█</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-sm">
            {/* Profile Content */}
            {[
              {
                cmd: "whoami",
                title: "Devon Hills",
                lines: [
                  "Software Engineer",
                  "7+ years experience • React & TypeScript specialist",
                ],
              },
              {
                cmd: "cat current_role.txt",
                title: "Livefront",
                lines: [
                  "Software Engineer | Aug 2025 - Present",
                  "Working on internal initiatives with LLM integration",
                ],
              },
              {
                cmd: "ls -la skills/",
                title: "Core Skills",
                lines: [
                  "📁 frontend/ React, TypeScript",
                  "📁 backend/ Ruby on Rails, Node.js",
                  "📁 testing/ Playwright, RTL",
                  "📁 devops/ Jenkins, CI/CD, AWS",
                ],
              },
              {
                cmd: "cat education.txt",
                title: "University of Massachusetts Lowell",
                lines: [
                  "BS Computer Science | Dec 2017",
                  "Graduated cum laude • Dean's List",
                ],
              },
            ].map((item) => (
              <div key={item.cmd}>
                <div className="flex items-center space-x-1 mb-2">
                  <span className="text-primary font-semibold">
                    devon@portfolio
                  </span>
                  <span className="text-gray-400">:</span>
                  <span className="text-blue-400 font-semibold">~</span>
                  <span className="text-gray-400">$</span>
                  <span className="text-amber-300 font-semibold">
                    {item.cmd}
                  </span>
                </div>
                <div className="ml-4 p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-primary font-semibold">{item.title}</div>
                  {item.lines.map((line, i) => (
                    <div
                      key={i}
                      className="text-gray-300 text-xs mt-1"
                      dangerouslySetInnerHTML={{
                        __html: line.replace(
                          /📁/g,
                          '<span class="text-blue-400">📁</span>',
                        ),
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center space-x-1 mt-4">
              <span className="text-primary font-semibold">
                devon@portfolio
              </span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-400 font-semibold">~</span>
              <span className="text-gray-400">$</span>
              <span className="text-primary animate-pulse font-bold">█</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

const CodeEditorWindow = memo(function CodeEditorWindow() {
  const { containerRef } = useWindowResponsive();

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col bg-gray-900 text-gray-100 font-mono"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer bg-gray-700 text-white px-3 py-1 rounded-md">
            <FileText className="w-4 h-4" />
            <span className="text-sm">resume.md</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span>UTF-8</span>
          <span>•</span>
          <span>LF</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div
          className={`hidden sm:block bg-gray-800 p-4 text-right text-gray-500 border-r border-gray-700 select-none`}
        >
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="space-y-8 text-sm">
            {/* Summary */}
            <div>
              <h1 className="text-2xl font-bold text-blue-300 mb-4">
                <span className="text-gray-500">#</span> Professional Summary
              </h1>
              <div
                className={`bg-gray-800/50 rounded-lg p-4 border-l-4 border-primary space-y-2`}
              >
                {resumeData.summary.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h1 className="text-2xl font-bold text-blue-300 mb-4">
                <span className="text-gray-500">#</span> Professional Experience
              </h1>
              <div className="space-y-6">
                {resumeData.experience.map((job) => (
                  <div
                    key={job.company}
                    className={`bg-gray-800/50 rounded-lg p-4 border-l-4 ${job.color}`}
                  >
                    <div className="flex justify-between items-start mb-2 flex-col sm:flex-row">
                      <div>
                        <h2 className="text-lg font-semibold text-green-300">
                          {job.role}
                        </h2>
                        <h3 className="text-primary font-medium">
                          {job.company} - {job.location}
                        </h3>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded mt-2 sm:mt-0">
                        {job.date}
                      </span>
                    </div>
                    <ul className="text-gray-300 space-y-1 list-disc list-inside">
                      {job.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h1 className="text-2xl font-bold text-blue-300 mb-4">
                <span className="text-gray-500">#</span> Education
              </h1>
              <div
                className={`bg-gray-800/50 rounded-lg p-4 border-l-4 ${resumeData.education.color}`}
              >
                <div className="flex justify-between items-start mb-2 flex-col sm:flex-row">
                  <div>
                    <h2 className="text-lg font-semibold text-green-300">
                      {resumeData.education.degree}
                    </h2>
                    <h3 className="text-primary font-medium">
                      {resumeData.education.school} -{" "}
                      {resumeData.education.location}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded mt-2 sm:mt-0">
                    {resumeData.education.date}
                  </span>
                </div>
                <ul className="text-gray-300 space-y-1 list-disc list-inside">
                  {resumeData.education.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h1 className="text-2xl font-bold text-blue-300 mb-4">
                <span className="text-gray-500">#</span> Technical Skills
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(resumeData.skills).map(
                  ([category, details]) => (
                    <div
                      key={category}
                      className={`bg-gray-800/50 rounded-lg p-4 border-l-4 ${details.color}`}
                    >
                      <h2 className="text-lg font-semibold text-green-300 mb-3">
                        {category}
                      </h2>
                      <ul className="text-gray-300 space-y-1 list-disc list-inside">
                        {details.items.map((skill, i) => (
                          <li key={i}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="text-primary animate-pulse">█</div>
          </div>
        </div>
      </div>
    </div>
  );
});

const BrowserWindow = memo(function BrowserWindow() {
  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Browser Header */}
      <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2 flex-1">
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-slate-700 rounded">
              <svg
                className="w-4 h-4 text-gray-300"
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
            <button className="p-1 hover:bg-slate-700 rounded">
              <svg
                className="w-4 h-4 text-gray-300"
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
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">
                Let&apos;s Connect
              </h1>
              <p className="text-base text-gray-300">
                Ready to discuss your next project
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: "email",
                  title: "Email",
                  value: "devonjhills@gmail.com",
                  href: "mailto:devonjhills@gmail.com",
                  color: "bg-primary",
                },
                {
                  icon: "linkedin",
                  title: "LinkedIn",
                  value: "linkedin.com/in/devonjhills",
                  href: "https://linkedin.com/in/devonjhills",
                  color: "bg-blue-600",
                },
                {
                  icon: "github",
                  title: "GitHub",
                  value: "github.com/devonjhills",
                  href: "https://github.com/devonjhills",
                  color: "bg-gray-900",
                },
              ].map((contact) => (
                <a
                  key={contact.icon}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-primary/60 hover:bg-primary/10 transition-all"
                >
                  <div
                    className={`w-12 h-12 ${contact.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {contact.icon === "email" && (
                        <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      )}
                      {contact.icon === "linkedin" && (
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      )}
                      {contact.icon === "github" && (
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      )}
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white group-hover:text-primary transition-colors">
                      {contact.title}
                    </div>
                    <div className="text-sm text-gray-300 truncate">
                      {contact.value}
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const ResumeWindow = memo(function ResumeWindow() {
  return (
    <div className="h-full flex flex-col bg-slate-900">
      <div className="flex items-center space-x-4 px-4 py-2 bg-slate-800 border-b border-slate-700">
        <User className="w-5 h-5 text-primary" />
        <div className="text-sm font-medium text-white">
          Devon_Hills_Resume_2025_Newest.pdf
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">My Resume</h1>
          <p className="text-gray-300 mb-4 text-sm">
            Download my professional resume in PDF format.
          </p>
          <a
            href="/Devon_Hills_Resume_2025_Newest.pdf"
            download
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-slate-900 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
});

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

const ProjectsWindow = memo(function ProjectsWindow() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { containerRef, getGridColumns } = useWindowResponsive();

  useEffect(() => {
    const fetchGitHubRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.github.com/users/devonjhills/repos?sort=updated&per_page=6",
        );
        if (!response.ok)
          throw new Error("Failed to fetch repositories from GitHub API.");
        const data: GitHubRepo[] = await response.json();
        setRepos(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubRepos();
  }, []);

  const getLanguageColor = (language: string | null) =>
    ({
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      Ruby: "#701516",
    })[language || ""] || "#6b7280";

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100">
      <div className="flex-1 flex overflow-hidden">
        <div className="hidden sm:block w-32 bg-gray-800 border-r border-gray-700 p-2">
          <button className="w-full flex items-center space-x-2 px-2 py-2 text-left rounded-md bg-primary/20 text-primary font-medium">
            <FolderOpen className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs">GitHub</span>
          </button>
        </div>
        <div ref={containerRef} className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-100">
              Latest GitHub Repositories
            </h2>
            <p className="text-sm text-gray-400">
              My most recently updated public projects.
            </p>
          </div>

          {loading && (
            <div className="text-gray-400">Loading repositories...</div>
          )}
          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
              Error: {error}
            </div>
          )}

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: getGridColumns(3, 2, 1, 1) }}
          >
            {repos.map((repo) => (
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                key={repo.id}
                className="group p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-primary/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Code className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-gray-100 group-hover:text-primary transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-2 h-10">
                    {repo.description || "No description available."}
                  </p>
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 bg-gray-700 text-primary text-xs rounded-md"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="w-3 h-3" />
                      <span>{repo.forks_count}</span>
                    </div>
                    {repo.language && (
                      <div className="flex items-center space-x-1.5">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: getLanguageColor(repo.language),
                          }}
                        />
                        <span>{repo.language}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
