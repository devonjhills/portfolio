import { WindowState } from "@/app/types/window";
import {
  SIDE_DOCK_WIDTH,
  TOP_BAR_HEIGHT,
  PADDING,
  MIN_WINDOW_WIDTH,
  MIN_WINDOW_HEIGHT,
  CONTENT_COMPLEXITY_SCORES,
} from "@/app/constants/layout";

export const getContentComplexity = (appName: string): number => {
  return (
    CONTENT_COMPLEXITY_SCORES[
      appName as keyof typeof CONTENT_COMPLEXITY_SCORES
    ] || 60
  );
};

export const getWindowDefaultSize = (appName: string) => {
  if (typeof window === "undefined") return { width: 800, height: 600 };

  switch (appName) {
    case "resume":
      return { width: 450, height: 350 };
    case "browser":
      return { width: 600, height: 700 };
    case "terminal":
      return { width: 800, height: 750 };
    case "editor":
      return { width: 1000, height: 900 };
    case "files":
      return { width: 900, height: 800 };
    default:
      return { width: 800, height: 600 };
  }
};

export const calculateGridLayout = (
  windowCount: number,
  containerWidth: number,
  containerHeight: number,
): Array<Pick<WindowState, "x" | "y" | "width" | "height">> => {
  if (windowCount === 0) return [];

  const availableWidth = containerWidth - SIDE_DOCK_WIDTH - PADDING * 1.5;
  const availableHeight = containerHeight - TOP_BAR_HEIGHT - PADDING * 1.5;
  const startX = SIDE_DOCK_WIDTH + PADDING * 0.75;
  const startY = TOP_BAR_HEIGHT + PADDING * 0.75;

  if (windowCount === 1) {
    return [
      {
        x: startX,
        y: startY,
        width: Math.min(1000, availableWidth),
        height: Math.min(750, availableHeight),
      },
    ];
  }

  if (windowCount === 2) {
    // Split screen layout
    const windowWidth = (availableWidth - PADDING) / 2;
    return [
      {
        x: startX,
        y: startY,
        width: windowWidth,
        height: availableHeight,
      },
      {
        x: startX + windowWidth + PADDING,
        y: startY,
        width: windowWidth,
        height: availableHeight,
      },
    ];
  }

  if (windowCount === 3) {
    // Two smaller windows on the left (stacked), one larger window on the right for projects
    // Windows are sorted by complexity: [0]=highest (files/projects), [1]=medium, [2]=lowest
    const leftColWidth = (availableWidth - PADDING) * 0.4; // Two smaller columns
    const rightColWidth = (availableWidth - PADDING) * 0.6; // One larger column for projects
    const halfHeight = (availableHeight - PADDING) / 2;

    return [
      // Position 0: Projects (highest complexity) gets the large right column
      {
        x: startX + leftColWidth + PADDING,
        y: startY,
        width: rightColWidth,
        height: availableHeight,
      },
      // Position 1: Second highest complexity gets top left
      {
        x: startX,
        y: startY,
        width: leftColWidth,
        height: halfHeight,
      },
      // Position 2: Lowest complexity gets bottom left
      {
        x: startX,
        y: startY + halfHeight + PADDING,
        width: leftColWidth,
        height: halfHeight,
      },
    ];
  }

  if (windowCount === 4) {
    // Simple 2x2 grid
    const windowWidth = (availableWidth - PADDING) / 2;
    const windowHeight = (availableHeight - PADDING) / 2;

    return [
      {
        x: startX,
        y: startY,
        width: windowWidth,
        height: windowHeight,
      },
      {
        x: startX + windowWidth + PADDING,
        y: startY,
        width: windowWidth,
        height: windowHeight,
      },
      {
        x: startX,
        y: startY + windowHeight + PADDING,
        width: windowWidth,
        height: windowHeight,
      },
      {
        x: startX + windowWidth + PADDING,
        y: startY + windowHeight + PADDING,
        width: windowWidth,
        height: windowHeight,
      },
    ];
  }

  if (windowCount === 5) {
    // Two columns on left (2 stacked in each), one larger column on right
    // Windows sorted by complexity: [0]=files, [1]=editor, [2]=terminal, [3]=browser, [4]=resume
    const leftColWidth = (availableWidth - PADDING) * 0.25; // Each left column
    const rightColWidth = (availableWidth - PADDING) * 0.5; // Right column for projects
    const halfHeight = (availableHeight - PADDING) / 2;

    const positions = [
      // Position 0: Projects (files) gets the large right column
      {
        x: startX + 2 * (leftColWidth + PADDING),
        y: startY,
        width: rightColWidth,
        height: availableHeight,
      },
      // Position 1: Editor (second highest) gets top left
      {
        x: startX,
        y: startY,
        width: leftColWidth,
        height: halfHeight,
      },
      // Position 2: Terminal gets bottom left
      {
        x: startX,
        y: startY + halfHeight + PADDING,
        width: leftColWidth,
        height: halfHeight,
      },
      // Position 3: Browser gets top right of left columns
      {
        x: startX + leftColWidth + PADDING,
        y: startY,
        width: leftColWidth,
        height: halfHeight,
      },
      // Position 4: Resume (lowest complexity) gets bottom right of left columns
      {
        x: startX + leftColWidth + PADDING,
        y: startY + halfHeight + PADDING,
        width: leftColWidth,
        height: halfHeight,
      },
    ];

    return positions;
  }

  // Fallback to original algorithm for 6+ windows
  const cols = Math.ceil(
    Math.sqrt(windowCount * (availableWidth / availableHeight)),
  );
  const rows = Math.ceil(windowCount / cols);

  const windowWidth = Math.max(
    MIN_WINDOW_WIDTH,
    (availableWidth - (cols - 1) * PADDING) / cols,
  );
  const windowHeight = Math.max(
    MIN_WINDOW_HEIGHT,
    (availableHeight - (rows - 1) * PADDING) / rows,
  );

  return Array.from({ length: windowCount }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    return {
      x: startX + col * (windowWidth + PADDING),
      y: startY + row * (windowHeight + PADDING),
      width: windowWidth,
      height: windowHeight,
    };
  });
};
