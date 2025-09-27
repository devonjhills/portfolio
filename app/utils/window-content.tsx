import Image from "next/image";
import { Image as ImageIcon, Grid3X3 } from "lucide-react";
import { WINDOW_ICONS, WINDOW_TITLES } from "@/app/constants/layout";
import { TerminalWindow } from "@/app/components/os/applications/terminal-window";
import { ProjectsWindow } from "@/app/components/os/applications/projects-window";
import { CodeEditorWindow } from "@/app/components/os/applications/code-editor-window";
import { BrowserWindow } from "@/app/components/os/applications/browser-window";
import { ResumeWindow } from "@/app/components/os/applications/resume-window";
import { WallpaperWindow } from "@/app/components/os/applications/wallpaper-window";
import { ActivitiesWindow } from "@/app/components/os/applications/activities-window";
import { WindowState } from "@/app/types/window";

export const getWindowIcon = (appName: string) => {
  const iconPath = WINDOW_ICONS[appName] || WINDOW_ICONS.terminal;

  // Handle lucide icons
  if (iconPath.startsWith("lucide:")) {
    const iconName = iconPath.replace("lucide:", "");
    if (iconName === "Image") {
      return <ImageIcon className="w-4 h-4" />;
    }
    if (iconName === "Grid3X3") {
      return <Grid3X3 className="w-4 h-4" />;
    }
  }

  // Handle PNG icons
  return (
    <Image
      src={iconPath}
      alt={appName}
      width={16}
      height={16}
      className="object-contain"
    />
  );
};

type WindowProps =
  | {
      onWallpaperChange: (wallpaper: string) => void;
      currentWallpaper: string;
    }
  | {
      openWindows: WindowState[];
      activeWindow: string | null;
      onActivateWindow: (appName: string) => void;
      onCloseWindow: (appName: string) => void;
      onMinimizeWindow: (appName: string) => void;
      onGridSnap: () => void;
      onCloseAll: () => void;
    }
  | undefined;

export const getWindowContent = (appName: string, props?: WindowProps) => {
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
    case "wallpaper":
      return <WallpaperWindow {...props} />;
    case "activities":
      return <ActivitiesWindow {...props} />;
    default:
      return <div className="p-4">Unknown application</div>;
  }
};

export const getWindowTitle = (appName: string) => {
  return WINDOW_TITLES[appName] || appName;
};
