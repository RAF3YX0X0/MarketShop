import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "hot" | "deal" | "exclusive" | "bestseller" | "discount" | "verified" | "neutral" | "gold";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  size = "md",
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] font-semibold tracking-wide",
    md: "px-2.5 py-1 text-xs font-bold tracking-wide uppercase",
  };

  const variantClasses = {
    hot: "bg-red-600 text-white shadow-sm",
    deal: "bg-amber-500 text-slate-950 font-black shadow-sm",
    exclusive: "bg-purple-700 text-white shadow-sm",
    bestseller: "bg-emerald-700 text-white shadow-sm",
    discount: "bg-rose-500 text-white font-extrabold shadow-sm",
    verified: "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold",
    gold: "bg-amber-100 text-amber-900 border border-amber-300 font-bold",
    neutral: "bg-slate-100 text-slate-700 border border-slate-200 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md font-sans select-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
