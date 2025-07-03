// src/components/Footer.tsx
"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const socialLinks = [
  {
    label: "Email",
    icon: Mail,
    href: "mailto:devonjhills@gmail.com",
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/devonjhills",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/devonjhills",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        {/* Left Side: Copyright */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Image
            src="/logo.png"
            alt="Devon Hills Logo"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <span>© {currentYear} Devon Hills</span>
        </div>

        {/* Center: Built With (hidden on mobile) */}
        <div className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          Built with{" "}
          <Button variant="link" asChild className="p-0 h-auto font-semibold">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer">
              Next.js
            </a>
          </Button>{" "}
          &{" "}
          <Button variant="link" asChild className="p-0 h-auto font-semibold">
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer">
              Tailwind CSS
            </a>
          </Button>
          .
        </div>

        {/* Right Side: Social Links */}
        <div className="flex items-center space-x-2">
          <TooltipProvider delayDuration={0}>
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon">
                    <a
                      href={href}
                      {...(href.includes("mailto")
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      aria-label={label}>
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </footer>
  );
}
