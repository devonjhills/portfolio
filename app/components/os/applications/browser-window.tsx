"use client";

import { memo } from "react";
import {
  Globe,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Mail,
  Linkedin,
  Github,
} from "lucide-react";

export const BrowserWindow = memo(function BrowserWindow() {
  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Browser Header */}
      <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2 flex-1">
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-slate-700 rounded">
              <ChevronLeft className="w-4 h-4 text-gray-300" />
            </button>
            <button className="p-1 hover:bg-slate-700 rounded">
              <ChevronRight className="w-4 h-4 text-gray-300" />
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
                  color: "bg-red-600",
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
                    {contact.icon === "email" && (
                      <Mail className="w-6 h-6 text-white" />
                    )}
                    {contact.icon === "linkedin" && (
                      <Linkedin className="w-6 h-6 text-white" />
                    )}
                    {contact.icon === "github" && (
                      <Github className="w-6 h-6 text-white" />
                    )}
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
