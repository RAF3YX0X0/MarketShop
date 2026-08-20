import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  showScore?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  isTrustpilot?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  reviewCount,
  showScore = true,
  size = "md",
  className,
  isTrustpilot = false,
}) => {
  const starSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  if (isTrustpilot) {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <div className="flex items-center gap-1 bg-[#00b67a] text-white px-2 py-0.5 rounded text-xs font-bold tracking-tight">
          <Star className="w-3.5 h-3.5 fill-current text-white" />
          <span>Trustpilot</span>
        </div>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-[#00b67a] p-0.5 rounded-[2px] text-white">
              <Star className="w-3 h-3 fill-current" />
            </div>
          ))}
        </div>
        <span className={cn("font-medium text-slate-700", textSizes[size])}>
          <strong className="font-bold text-slate-900">{rating.toFixed(1)}</strong>
          {reviewCount && <span className="text-slate-500 ml-1">({reviewCount.toLocaleString()} reviews)</span>}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5 text-amber-500">
        {[...Array(maxRating)].map((_, i) => {
          const isFilled = i < Math.floor(rating);
          const isHalf = !isFilled && i < rating;
          return (
            <Star
              key={i}
              className={cn(
                starSizes[size],
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : isHalf
                  ? "fill-amber-400/50 text-amber-400"
                  : "text-slate-300 fill-slate-100"
              )}
            />
          );
        })}
      </div>
      {showScore && (
        <span className={cn("font-medium text-slate-700 tracking-tight", textSizes[size])}>
          <span className="font-bold text-slate-900">{rating.toFixed(1)}</span>
          {reviewCount !== undefined && (
            <span className="text-slate-500 ml-1">({reviewCount.toLocaleString()})</span>
          )}
        </span>
      )}
    </div>
  );
};
