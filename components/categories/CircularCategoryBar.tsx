"use client";

import React from "react";
import {
  BookOpen,
  Sparkles,
  Heart,
  Palette,
  Feather,
  Hourglass,
  Brain,
  Sword,
  Baby,
  Crown
} from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  icon: React.ReactNode;
  colorClass: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "manga",
    name: "Manga & Graphic",
    count: "1,200+",
    icon: <Sparkles className="w-6 h-6 text-brand-pink-700" />,
    colorClass: "bg-brand-pink-100 hover:bg-brand-pink-200 border-brand-pink-300",
  },
  {
    id: "spirituality",
    name: "Mindset & Life",
    count: "2,400+",
    icon: <BookOpen className="w-6 h-6 text-brand-blue-700" />,
    colorClass: "bg-brand-blue-100 hover:bg-brand-blue-200 border-brand-blue-300",
  },
  {
    id: "romance",
    name: "Romance & Drama",
    count: "3,800+",
    icon: <Heart className="w-6 h-6 text-brand-pink-700" />,
    colorClass: "bg-brand-pink-100 hover:bg-brand-pink-200 border-brand-pink-300",
  },
  {
    id: "art",
    name: "Art & Design",
    count: "950+",
    icon: <Palette className="w-6 h-6 text-brand-blue-700" />,
    colorClass: "bg-brand-blue-100 hover:bg-brand-blue-200 border-brand-blue-300",
  },
  {
    id: "classics",
    name: "Classics",
    count: "4,100+",
    icon: <Feather className="w-6 h-6 text-brand-pink-700" />,
    colorClass: "bg-brand-pink-100 hover:bg-brand-pink-200 border-brand-pink-300",
  },
  {
    id: "history",
    name: "History & Bios",
    count: "2,100+",
    icon: <Hourglass className="w-6 h-6 text-brand-blue-700" />,
    colorClass: "bg-brand-blue-100 hover:bg-brand-blue-200 border-brand-blue-300",
  },
  {
    id: "philosophy",
    name: "Philosophy",
    count: "1,400+",
    icon: <Brain className="w-6 h-6 text-brand-pink-700" />,
    colorClass: "bg-brand-pink-100 hover:bg-brand-pink-200 border-brand-pink-300",
  },
  {
    id: "thriller",
    name: "Thriller & Noir",
    count: "3,200+",
    icon: <Sword className="w-6 h-6 text-brand-blue-700" />,
    colorClass: "bg-brand-blue-100 hover:bg-brand-blue-200 border-brand-blue-300",
  },
  {
    id: "children",
    name: "Children's & YA",
    count: "2,850+",
    icon: <Baby className="w-6 h-6 text-brand-pink-700" />,
    colorClass: "bg-brand-pink-100 hover:bg-brand-pink-200 border-brand-pink-300",
  },
  {
    id: "rare",
    name: "Collector Prints",
    count: "650+",
    icon: <Crown className="w-6 h-6 text-brand-blue-700" />,
    colorClass: "bg-brand-blue-100 hover:bg-brand-blue-200 border-brand-blue-300",
  },
];

interface CircularCategoryBarProps {
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
}

export const CircularCategoryBar: React.FC<CircularCategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-black uppercase text-brand-coral tracking-widest block">
              Browse Genre Shelves
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-950">
              Popular Book Categories
            </h3>
          </div>
          <a
            href="#catalog"
            className="text-xs font-bold text-brand-teal hover:underline font-mono uppercase"
          >
            View All Genres →
          </a>
        </div>

        {/* Circular Category Badges Carousel / Grid */}
        <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto pb-3 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <a
                key={cat.id}
                href="#catalog"
                onClick={(e) => {
                  if (onSelectCategory) {
                    e.preventDefault();
                    onSelectCategory(cat.id);
                  }
                }}
                className="flex flex-col items-center text-center group flex-shrink-0 cursor-pointer w-20 sm:w-24"
              >
                {/* Circular Icon Circle with Light Blue / Pink Contrast */}
                <div
                  className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 flex items-center justify-center transition-all duration-200 shadow-xs group-hover:scale-105 ${
                    isSelected
                      ? "border-slate-900 bg-slate-900 text-white ring-2 ring-slate-900/20"
                      : `${cat.colorClass} border-slate-300 group-hover:border-slate-900`
                  }`}
                >
                  {cat.icon}
                </div>

                {/* Name Label */}
                <span className="mt-2 text-xs font-bold text-slate-900 group-hover:text-brand-coral transition-colors line-clamp-1 leading-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {cat.count}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
