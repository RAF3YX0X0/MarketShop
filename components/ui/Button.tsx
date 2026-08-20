import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost" | "coral";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-tight uppercase transition-all duration-150 rounded-[2px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none text-center focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-1";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-xs font-black tracking-wider gap-2",
    lg: "px-6 py-3 text-sm font-black tracking-wider gap-2.5",
    xl: "px-8 py-4 text-base font-black tracking-wider gap-3",
  };

  const variantStyles = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 border border-slate-900 active:translate-x-[1px] active:translate-y-[1px]",
    coral:
      "bg-brand-coral-500 text-white hover:bg-brand-coral-600 border border-brand-coral-600 active:translate-x-[1px] active:translate-y-[1px]",
    secondary:
      "bg-white text-slate-900 hover:bg-slate-50 border border-slate-300 hover:border-slate-900 active:translate-x-[1px] active:translate-y-[1px]",
    outline:
      "bg-transparent text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white active:translate-x-[1px] active:translate-y-[1px]",
    danger:
      "bg-red-600 text-white hover:bg-red-700 border border-red-700 active:translate-x-[1px] active:translate-y-[1px]",
    ghost:
      "bg-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-transparent",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
