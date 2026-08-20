import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "deal" | "exclusive" | "stock" | "outline" | "coral";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const base = "inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[2px] border";

  const variants = {
    default: "bg-slate-100 text-slate-800 border-slate-300",
    coral: "bg-brand-coral-50 text-brand-coral-700 border-brand-coral-200",
    sale: "bg-red-50 text-red-700 border-red-200 font-extrabold",
    deal: "bg-amber-50 text-amber-900 border-amber-300 font-extrabold",
    exclusive: "bg-brand-teal-50 text-brand-teal-700 border-brand-teal-200 font-extrabold",
    stock: "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold",
    outline: "bg-transparent text-slate-700 border-slate-300",
  };

  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
};
