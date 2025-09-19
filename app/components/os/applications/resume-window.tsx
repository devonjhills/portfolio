"use client";

import { memo } from "react";
import { User, FileText } from "lucide-react";

export const ResumeWindow = memo(function ResumeWindow() {
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