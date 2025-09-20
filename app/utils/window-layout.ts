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
  windows: WindowState[] = [],
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
    // One column of two stacked, one full height column
    const leftColWidth = (availableWidth - PADDING) * 0.6; // Larger column
    const rightColWidth = (availableWidth - PADDING) * 0.4; // Smaller column
    const halfHeight = (availableHeight - PADDING) / 2;

    return [
      {
        x: startX,
        y: startY,
        width: leftColWidth,
        height: availableHeight,
      },
      {
        x: startX + leftColWidth + PADDING,
        y: startY,
        width: rightColWidth,
        height: halfHeight,
      },
      {
        x: startX + leftColWidth + PADDING,
        y: startY + halfHeight + PADDING,
        width: rightColWidth,
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
    // One row of 3 windows, one row of 2 windows - bottom row taller for more content
    const topRowHeight = (availableHeight - PADDING) * 0.45;
    const bottomRowHeight = (availableHeight - PADDING) * 0.55;
    const topWindowWidth = (availableWidth - 2 * PADDING) / 3;
    const bottomWindowWidth = (availableWidth - PADDING) / 2;

    const positions = [
      // Bottom row - 2 windows (wider, for complex content like projects/experience)
      {
        x: startX,
        y: startY + topRowHeight + PADDING,
        width: bottomWindowWidth,
        height: bottomRowHeight,
      },
      {
        x: startX + bottomWindowWidth + PADDING,
        y: startY + topRowHeight + PADDING,
        width: bottomWindowWidth,
        height: bottomRowHeight,
      },
      // Top row - 3 windows (smaller width, for simpler content)
      {
        x: startX,
        y: startY,
        width: topWindowWidth,
        height: topRowHeight,
      },
      {
        x: startX + topWindowWidth + PADDING,
        y: startY,
        width: topWindowWidth,
        height: topRowHeight,
      },
      {
        x: startX + 2 * (topWindowWidth + PADDING),
        y: startY,
        width: topWindowWidth,
        height: topRowHeight,
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
