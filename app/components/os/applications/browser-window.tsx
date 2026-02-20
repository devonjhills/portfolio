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
    <div className="h-full flex flex-col bg-black text-gray-100">
      {/* Browser Header */}
      <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-2">
        <div className="flex items-center space-x-2 text-sm text-gray-300">
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-neutral-800 rounded">
              <ChevronLeft className="w-4 h-4 text-gray-300" />
            </button>
            <button className="p-1 hover:bg-neutral-800 rounded">
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          </div>
          <div className="flex-1 mx-4">
            <div className="flex items-center px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-lg">
              <Globe className="w-4 h-4 text-primary mr-2" />
              <span className="text-gray-400">/home/devon/</span>
              <span className="text-primary font-medium">contact</span>
            </div>
          </div>
        </div>
      </div>
      {/* Browser Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="grid gap-4 max-w-2xl">
          {[
            {
              icon: "email",
              title: "Email",
              value: "devonjhills@gmail.com",
              href: "mailto:devonjhills@gmail.com",
            },
            {
              icon: "linkedin",
              title: "LinkedIn",
              value: "linkedin.com/in/devonjhills",
              href: "https://linkedin.com/in/devonjhills",
            },
            {
              icon: "github",
              title: "GitHub",
              value: "github.com/devonjhills",
              href: "https://github.com/devonjhills",
            },
          ].map((contact) => (
            <a
              key={contact.icon}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-primary/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                  {contact.icon === "email" && (
                    <Mail className="w-5 h-5 text-primary" />
                  )}
                  {contact.icon === "linkedin" && (
                    <Linkedin className="w-5 h-5 text-primary" />
                  )}
                  {contact.icon === "github" && (
                    <Github className="w-5 h-5 text-primary" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-100 group-hover:text-primary transition-colors">
                    {contact.title}
                  </div>
                  <div className="text-sm text-gray-300">{contact.value}</div>
                </div>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm text-gray-400">Visit</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
