"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  label?: string;
  className?: string;
  theme?: "light" | "dark" | "amber";
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialHours = 8,
  initialMinutes = 34,
  initialSeconds = 20,
  label = "OFFER ENDS IN",
  className,
  theme = "dark",
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, "0");

  const themeClasses = {
    dark: "bg-slate-900 text-white border-slate-800",
    light: "bg-white text-slate-900 border-slate-200 shadow-sm",
    amber: "bg-amber-950 text-amber-100 border-amber-800",
  };

  const blockClasses = {
    dark: "bg-slate-800 text-amber-400 border border-slate-700",
    light: "bg-slate-100 text-slate-900 border border-slate-200",
    amber: "bg-amber-900/80 text-amber-300 border border-amber-700",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs",
        themeClasses[theme],
        className
      )}
    >
      <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse flex-shrink-0" />
      <span className="font-sans font-bold text-[11px] tracking-wider text-slate-300 uppercase">
        {label}
      </span>
      <div className="flex items-center gap-1 font-bold text-xs">
        <span className={cn("px-1.5 py-0.5 rounded", blockClasses[theme])}>
          {format(timeLeft.hours)}
        </span>
        <span className="text-amber-500 font-extrabold">:</span>
        <span className={cn("px-1.5 py-0.5 rounded", blockClasses[theme])}>
          {format(timeLeft.minutes)}
        </span>
        <span className="text-amber-500 font-extrabold">:</span>
        <span className={cn("px-1.5 py-0.5 rounded", blockClasses[theme])}>
          {format(timeLeft.seconds)}
        </span>
      </div>
    </div>
  );
};
