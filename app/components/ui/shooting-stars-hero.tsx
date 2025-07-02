"use client";
import React from "react";
import { ShootingStars } from "./shooting-stars";
import { StarsBackground } from "./stars-background";
import { cn } from "../../lib/utils";

interface ShootingStarsHeroProps {
  children: React.ReactNode;
  className?: string;
}

export const ShootingStarsHero: React.FC<ShootingStarsHeroProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("relative", className)}>
      <ShootingStars 
        minSpeed={15}
        maxSpeed={40}
        minDelay={600}
        maxDelay={2000}
        starWidth={18}
        starHeight={2}
        className="absolute inset-0 z-0"
      />
      <StarsBackground 
        starDensity={0.0002}
        allStarsTwinkle={false}
        twinkleProbability={0.1}
        minTwinkleSpeed={0.1}
        maxTwinkleSpeed={0.2}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};