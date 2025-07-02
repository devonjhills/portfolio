"use client";
import { cn } from "../../lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

interface StarsBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

export const StarsBackground: React.FC<StarsBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = false,
  twinkleProbability = 0.2,
  minTwinkleSpeed = 0.1,
  maxTwinkleSpeed = 0.3,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const generateStars = () => {
      const stars: Star[] = [];
      const numStars = Math.floor(window.innerWidth * window.innerHeight * starDensity);

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random(),
          size: Math.random() * 2 + 0.5,
        });
      }

      starsRef.current = stars;
    };

    const renderStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        const twinkle = allStarsTwinkle || Math.random() < twinkleProbability;
        let opacity = 0.5 + 0.5 * Math.random();

        if (twinkle) {
          const twinkleSpeed = minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed);
          opacity = 0.5 + 0.5 * Math.sin(Date.now() * 0.001 * twinkleSpeed + star.z * 10);
        }

        // Use white stars in dark mode, dark stars in light mode
        // Only check theme after component is mounted to prevent hydration mismatch
        const isDark = mounted && (
          document.documentElement.classList.contains('dark') ||
          (document.documentElement.getAttribute('data-theme') === 'dark') ||
          (!document.documentElement.getAttribute('data-theme') && 
           window.matchMedia('(prefers-color-scheme: dark)').matches)
        );
        const starColor = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity * 0.4})`;
        ctx.fillStyle = starColor;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      animationFrameRef.current = requestAnimationFrame(renderStars);
    };

    resizeCanvas();
    generateStars();
    renderStars();

    const handleResize = () => {
      resizeCanvas();
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed, mounted]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none", className)}
    />
  );
};