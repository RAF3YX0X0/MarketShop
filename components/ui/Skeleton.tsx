import React from "react";

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <div className={`bg-slate-200 animate-pulse rounded-[2px] ${className}`} />;
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="border border-slate-200 bg-white p-4 space-y-3">
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-2/3 h-4" />
      <div className="pt-2 flex justify-between items-center">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-24 h-8" />
      </div>
    </div>
  );
};
