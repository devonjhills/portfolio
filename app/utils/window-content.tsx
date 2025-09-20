import { WINDOW_ICONS, WINDOW_TITLES } from "@/app/constants/layout";
import { TerminalWindow } from "@/app/components/os/applications/terminal-window";
import { ProjectsWindow } from "@/app/components/os/applications/projects-window";
import { CodeEditorWindow } from "@/app/components/os/applications/code-editor-window";
import { BrowserWindow } from "@/app/components/os/applications/browser-window";
import { ResumeWindow } from "@/app/components/os/applications/resume-window";

export const getWindowIcon = (appName: string) => {
  const iconPath = WINDOW_ICONS[appName] || WINDOW_ICONS.terminal;
  return (
    <img src={iconPath} alt={appName} className="w-4 h-4 object-contain" />
  );
};

export const getWindowContent = (appName: string) => {
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

export const getWindowTitle = (appName: string) => {
  return WINDOW_TITLES[appName] || appName;
};
