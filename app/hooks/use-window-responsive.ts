import { useState, useRef, useEffect, useCallback } from "react";

export function useWindowResponsive() {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateContainerWidth = () => {
      setContainerWidth(container.offsetWidth);
    };

    const resizeObserver = new ResizeObserver(updateContainerWidth);
    resizeObserver.observe(container);
    updateContainerWidth();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const getBreakpoint = useCallback(() => {
    if (containerWidth >= 1000) return "xl";
    if (containerWidth >= 600) return "lg";
    if (containerWidth >= 400) return "md";
    return "sm";
  }, [containerWidth]);

  const getGridColumns = useCallback(
    (xl = 3, lg = 2, md = 2, sm = 1) => {
      const breakpoint = getBreakpoint();
      switch (breakpoint) {
        case "xl":
          return `repeat(${xl}, 1fr)`;
        case "lg":
          return `repeat(${lg}, 1fr)`;
        case "md":
          return `repeat(${md}, 1fr)`;
        default:
          return `repeat(${sm}, 1fr)`;
      }
    },
    [getBreakpoint],
  );

  const isAtLeast = useCallback(
    (breakpoint: "sm" | "md" | "lg" | "xl") => {
      const sizes = { sm: 0, md: 400, lg: 600, xl: 1000 };
      return containerWidth >= sizes[breakpoint];
    },
    [containerWidth],
  );

  return {
    containerRef,
    containerWidth,
    getGridColumns,
    isAtLeast,
  };
}
