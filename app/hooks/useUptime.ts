"use client";

import { useState, useEffect } from "react";

const GRADUATION_DATE = new Date("2017-12-01T00:00:00");

export function useUptime() {
  const [uptime, setUptime] = useState("");

  useEffect(() => {
    const calculateUptime = () => {
      const now = new Date();
      const diff = now.getTime() - GRADUATION_DATE.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // Calculate years and months
      let years = now.getFullYear() - GRADUATION_DATE.getFullYear();
      let months = now.getMonth() - GRADUATION_DATE.getMonth();

      if (months < 0) {
        years--;
        months += 12;
      }

      // Calculate remaining days after years and months
      const tempDate = new Date(GRADUATION_DATE);
      tempDate.setFullYear(tempDate.getFullYear() + years);
      tempDate.setMonth(tempDate.getMonth() + months);
      const remainingDays = Math.floor(
        (now.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Calculate hours, minutes, seconds for the current day
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();

      // Build the uptime string
      const parts = [];
      if (years > 0) parts.push(`${years}y`);
      if (months > 0) parts.push(`${months}mo`);
      if (remainingDays > 0) parts.push(`${remainingDays}d`);
      parts.push(`${currentHours}h`);
      parts.push(`${currentMinutes}m`);
      parts.push(`${currentSeconds}s`);

      setUptime(parts.join(" "));
    };

    calculateUptime();
    const interval = setInterval(calculateUptime, 1000);

    return () => clearInterval(interval);
  }, []);

  return uptime;
}
