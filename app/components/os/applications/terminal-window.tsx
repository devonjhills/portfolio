"use client";

import { useState, memo } from "react";
import Image from "next/image";

export const TerminalWindow = memo(function TerminalWindow() {
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
            <div className="space-y-4">
              <div className="flex items-start gap-4 font-mono text-sm">
                <div className="mt-2">
                  <Image
                    src="/avatar.png"
                    alt="Devon Hills"
                    width={224}
                    height={224}
                    className="max-h-56 object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-start space-y-1">
                  <div className="text-lg mb-1">
                    <span className="text-primary font-bold">devon</span>
                    <span className="text-gray-400">@</span>
                    <span className="text-blue-400 font-bold">portfolio</span>
                  </div>
                  <div
                    className="w-fit border-t-2 border-dashed border-gray-500 mb-1"
                    style={{ width: "9.5em" }}
                  ></div>
                  <div className="space-y-0.5 text-sm">
                    {[
                      { label: "OS", value: "Portfolio OS 1.0" },
                      { label: "Host", value: "Livefront" },
                      { label: "Kernel", value: "React 19.0.0" },
                      { label: "Uptime", value: "7 years, 2 months" },
                      { label: "Shell", value: "TypeScript" },
                      { label: "WM", value: "Next.js" },
                      { label: "Theme", value: "Follow the white rabbit" },
                      { label: "CPU", value: "Full-Stack Engineer" },
                      {
                        label: "Memory",
                        value: "HealthCare.gov + Client Solutions",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex">
                        <span className="text-primary font-bold mr-1">
                          {item.label}
                        </span>
                        <span className="text-gray-400 mr-2">:</span>
                        <span className="text-gray-200">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Neofetch color palette */}
                  <div className="mt-4 space-y-0">
                    <div className="flex">
                      <div className="w-4 h-2 bg-gray-800"></div>
                      <div className="w-4 h-2 bg-red-500"></div>
                      <div className="w-4 h-2 bg-green-400"></div>
                      <div className="w-4 h-2 bg-yellow-400"></div>
                      <div className="w-4 h-2 bg-blue-400"></div>
                      <div className="w-4 h-2 bg-purple-400"></div>
                      <div className="w-4 h-2 bg-cyan-400"></div>
                      <div className="w-4 h-2 bg-gray-200"></div>
                    </div>
                    <div className="flex">
                      <div className="w-4 h-2 bg-gray-600"></div>
                      <div className="w-4 h-2 bg-red-400"></div>
                      <div className="w-4 h-2 bg-ubuntu-mint"></div>
                      <div className="w-4 h-2 bg-yellow-300"></div>
                      <div className="w-4 h-2 bg-blue-300"></div>
                      <div className="w-4 h-2 bg-purple-300"></div>
                      <div className="w-4 h-2 bg-cyan-300"></div>
                      <div className="w-4 h-2 bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
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
