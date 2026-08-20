import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs font-semibold rounded-lg gap-1.5",
      md: "px-5 py-2.5 text-sm font-semibold rounded-xl gap-2",
      lg: "px-6 py-3.5 text-base font-bold rounded-xl gap-2.5",
      xl: "px-8 py-4 text-lg font-bold rounded-2xl gap-3 shadow-lg",
    };

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-600 text-white shadow-md hover:shadow-orange-500/25 active:scale-[0.98] border border-orange-500/30 transition-all duration-200",
      secondary:
        "bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-slate-900/20 active:scale-[0.98] border border-slate-700 transition-all duration-200",
      gold:
        "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold shadow-md hover:shadow-amber-500/30 active:scale-[0.98] border border-amber-400/40 transition-all duration-200",
      outline:
        "border-2 border-slate-300 hover:border-amber-600 bg-transparent hover:bg-amber-50/50 text-slate-800 hover:text-amber-700 transition-all duration-200",
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all duration-200",
      white:
        "bg-white hover:bg-amber-50 text-slate-900 font-bold shadow-md hover:shadow-lg border border-slate-200 active:scale-[0.98] transition-all duration-200",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-sans select-none tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none cursor-pointer",
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
