"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const sections = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const pages = [{ name: "Tools", href: "/md-to-pdf" }];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      // Handle anchor links
      if (pathname === "/") {
        // On home page, just scroll to section
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // On other pages, navigate to home with anchor
        window.location.href = `/${href}`;
      }
    } else {
      // Handle page navigation
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              if (pathname === "/") {
                // On home page, scroll to top
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                // On other pages, navigate to home
                window.location.href = "/";
              }
            }}
          >
            <Image
              src="/logo2.png"
              alt="Devon Hills Logo"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="ml-3 text-xl font-bold text-primary hidden sm:block">
              portfolio
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Page Sections */}
            {sections.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation(item.href)}
                  className={`text-sm font-medium ${
                    pathname === "/" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                  {pathname !== "/" && (
                    <svg
                      className="w-3 h-3 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                  )}
                </Button>
              </motion.div>
            ))}

            {/* Separator */}
            <div className="h-6 w-px bg-border" />

            {/* External Pages */}
            {pages.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation(item.href)}
                  className={`text-sm font-medium ${
                    pathname === item.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.name}
                  <svg
                    className="w-3 h-3 ml-1"
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
                </Button>
              </motion.div>
            ))}

            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden py-4 border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {/* Page Sections */}
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Portfolio Sections
              </div>
              {sections.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => handleNavigation(item.href)}
                  className={`justify-start py-2 pl-4 h-auto ${
                    pathname === "/" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                  {pathname !== "/" && (
                    <svg
                      className="w-3 h-3 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                  )}
                </Button>
              ))}

              {/* Separator */}
              <div className="h-px bg-border my-2" />

              {/* External Pages */}
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Tools & Pages
              </div>
              {pages.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => handleNavigation(item.href)}
                  className={`justify-start py-2 pl-4 h-auto ${
                    pathname === item.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.name}
                  <svg
                    className="w-3 h-3 ml-2"
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
                </Button>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}
