"use client";

import { Timeline } from "../ui/timeline";

const timelineData = [
  {
    title: "Nov 2021 - Apr 2025",
    content: (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-1">
            Software Engineer III
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
            Ad Hoc LLC • Remote • Full-time • 3+ years
          </p>
        </div>
        
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-6">
          Built and maintained React/TypeScript applications for HealthCare.gov health plan enrollment workflows, serving millions of users during high-traffic enrollment periods.
        </p>
        
        <div className="mb-6">
          <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 text-sm">Key Achievements</h4>
          <div className="space-y-2">
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Redesigned health plan comparison cards using choice architecture principles based on customer feedback and UX research, improving enrollment completion rates</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Designed and implemented Redux-based state management for dynamic filtering and comparison features, optimizing performance under high loads</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Developed comprehensive accessibility testing infrastructure using axe-core and maintained WCAG/Section 508 compliance for government healthcare applications</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Built automated testing suites with Playwright and React Testing Library, including end-to-end user workflow validation</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Maintained and optimized Jenkins CI/CD pipelines with AWS cloud infrastructure, led Ruby version and critical gem upgrades</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Led technical documentation efforts and established coding standards that improved team velocity and reduced onboarding time</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Participated in on-call rotation using PagerDuty for 24/7 production support during peak enrollment periods</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {["React", "TypeScript", "Redux", "Ruby on Rails", "PostgreSQL", "AWS", "Jenkins", "Playwright"].map((tech) => (
            <span key={tech} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Jul 2018 - Nov 2021",
    content: (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-1">
            Software Engineer
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
            Raytheon Technologies • Tewksbury, MA • Full-time • 3+ years
          </p>
        </div>
        
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-6">
          Architected and maintained mission-critical software components using C++, conducting systematic debugging and root cause analysis for complex technical issues.
        </p>
        
        <div className="mb-6">
          <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 text-sm">Key Achievements</h4>
          <div className="space-y-2">
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Led technical documentation initiatives and mentored junior developers</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Established coding standards that improved team productivity and code quality</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Collaborated in cross-functional Agile/SCRUM teams to deliver high-performance applications on schedule</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Acquired DoD Secret clearance for job duties</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Conducted systematic debugging and root cause analysis for complex technical issues</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {["C++", "Agile/SCRUM", "Technical Documentation", "Debugging", "Root Cause Analysis"].map((tech) => (
            <span key={tech} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2013 - May 2017",
    content: (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-1">
            BS Computer Science
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
            University of Massachusetts Lowell • Lowell, MA • Education • 4 years
          </p>
        </div>
        
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-6">
          Bachelor of Science in Computer Science with focus on software engineering principles and computer systems.
        </p>
        
        <div className="mb-6">
          <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 text-sm">Academic Achievements</h4>
          <div className="space-y-2">
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Graduated cum laude with high academic honors</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Achieved Dean's List recognition multiple years</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Strong foundation in algorithms, data structures, and software design</span>
            </div>
            <div className="flex gap-2 items-start text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              <span className="text-primary mt-1">•</span>
              <span>Coursework in programming languages, databases, and computer architecture</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {["Java", "C++", "Python", "SQL", "Data Structures", "Algorithms"].map((tech) => (
            <span key={tech} className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export function Journey() {
  return (
    <section id="experience" className="py-20">
      <Timeline data={timelineData} />
    </section>
  );
}