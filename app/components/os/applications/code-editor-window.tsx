"use client";

import { memo } from "react";
import { FileText } from "lucide-react";
import { useWindowResponsive } from "@/app/hooks/use-window-responsive";
import { resumeData } from "@/app/data/resume";

export const CodeEditorWindow = memo(function CodeEditorWindow() {
  const { containerRef } = useWindowResponsive();

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col bg-black text-gray-100 font-mono"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer bg-neutral-800 text-white px-3 py-1 rounded-md">
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
      <div className="flex-1 overflow-y-auto">
        {/* Editor */}
        <div className="h-full p-4 sm:p-6">
          <div className="space-y-8 text-sm">
            {/* Summary */}
            <div>
              <h1 className="text-2xl font-bold text-primary mb-4">
                <span className="text-gray-500">#</span> Professional Summary
              </h1>
              <div
                className={`bg-neutral-900/50 rounded-lg p-4 border-l-4 border-primary space-y-2`}
              >
                {resumeData.summary.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h1 className="text-2xl font-bold text-primary mb-4">
                <span className="text-gray-500">#</span> Professional Experience
              </h1>
              <div className="space-y-6">
                {resumeData.experience.map((job) => (
                  <div
                    key={job.company}
                    className={`bg-neutral-900/50 rounded-lg p-4 border-l-4 ${job.color}`}
                  >
                    <div className="flex justify-between items-start mb-2 flex-col sm:flex-row">
                      <div>
                        <h2 className="text-lg font-semibold text-primary">
                          {job.role}
                        </h2>
                        <h3 className="text-primary font-medium">
                          {job.company} - {job.location}
                        </h3>
                      </div>
                      <span className="text-sm font-semibold text-primary bg-neutral-800 px-3 py-1 rounded mt-2 sm:mt-0">
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
              <h1 className="text-2xl font-bold text-primary mb-4">
                <span className="text-gray-500">#</span> Education
              </h1>
              <div
                className={`bg-neutral-900/50 rounded-lg p-4 border-l-4 ${resumeData.education.color}`}
              >
                <div className="flex justify-between items-start mb-2 flex-col sm:flex-row">
                  <div>
                    <h2 className="text-lg font-semibold text-primary">
                      {resumeData.education.degree}
                    </h2>
                    <h3 className="text-primary font-medium">
                      {resumeData.education.school} -{" "}
                      {resumeData.education.location}
                    </h3>
                  </div>
                  <span className="text-sm font-semibold text-primary bg-neutral-800 px-3 py-1 rounded mt-2 sm:mt-0">
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
              <h1 className="text-2xl font-bold text-primary mb-4">
                <span className="text-gray-500">#</span> Technical Skills
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(resumeData.skills).map(
                  ([category, details]) => (
                    <div
                      key={category}
                      className={`bg-neutral-900/50 rounded-lg p-4 border-l-4 ${details.color}`}
                    >
                      <h2 className="text-lg font-semibold text-primary mb-3">
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
