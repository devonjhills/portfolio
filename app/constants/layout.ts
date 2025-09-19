export const SIDE_DOCK_WIDTH = 80;
export const TOP_BAR_HEIGHT = 50;
export const PADDING = 20;
export const MIN_WINDOW_WIDTH = 400;
export const MIN_WINDOW_HEIGHT = 300;

export const WINDOW_ICONS: { [key: string]: string } = {
  terminal: "/icons/Terminal.png",
  files: "/icons/Folder.png",
  editor: "/icons/Document.png",
  browser: "/icons/Contact.png",
  resume: "/icons/File_Download.png",
};

export const WINDOW_TITLES: { [key: string]: string } = {
  terminal: "Terminal",
  files: "Projects - File Manager",
  editor: "Resume - Text Editor",
  browser: "Contact - Browser",
  resume: "Download - Document Viewer",
};

export const CONTENT_COMPLEXITY_SCORES = {
  files: 100,     // File manager - lots of content
  editor: 90,     // Code editor - detailed content
  terminal: 80,   // Terminal - medium content
  browser: 70,    // Contact form - moderate content
  resume: 40,     // Simple document - less content
} as const;