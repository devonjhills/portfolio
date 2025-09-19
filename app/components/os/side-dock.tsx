"use client";

interface SideDockProps {
  onLaunchApp: (appName: string) => void;
  onActivateWindow: (appName: string) => void;
  openWindows: string[];
}

export function SideDock({
  onLaunchApp,
  onActivateWindow,
  openWindows,
}: SideDockProps) {
  const dockApps = [
    { app: "terminal", iconPath: "/icons/Terminal.png", label: "Terminal" },
    { app: "files", iconPath: "/icons/Folder.png", label: "Projects" },
    { app: "editor", iconPath: "/icons/Document.png", label: "Experience" },
    { app: "browser", iconPath: "/icons/Contact.png", label: "Contact" },
    { app: "resume", iconPath: "/icons/File_Download.png", label: "Resume" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-ubuntu-black border-r border-white/10 z-30 flex flex-col items-center py-4">
      <div className="flex flex-col gap-3 mt-12">
        {dockApps.map(({ app, iconPath, label }) => {
          const isOpen = openWindows.includes(app);

          return (
            <div
              key={app}
              className="group relative flex flex-col items-center"
            >
              <button
                onClick={() => {
                  if (isOpen) {
                    onActivateWindow(app);
                  } else {
                    onLaunchApp(app);
                  }
                }}
                className="w-12 h-12 rounded-lg transition-all duration-200 hover:scale-110 hover:bg-white/10 flex items-center justify-center relative"
                title={label}
              >
                <img
                  src={iconPath}
                  alt={label}
                  className="w-8 h-8 object-contain filter drop-shadow-sm"
                />
              </button>

              {/* Ubuntu-style dot indicator */}
              {isOpen && (
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
