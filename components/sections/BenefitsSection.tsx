import React from "react";
import { BookOpenCheck, Users, BadgePercent, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";
import { BENEFITS } from "@/data/mockData";

export const BenefitsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "book-open-check":
        return <BookOpenCheck className="w-8 h-8 text-amber-600" />;
      case "users":
        return <HeartHandshake className="w-8 h-8 text-amber-600" />;
      case "badge-percent":
        return <BadgePercent className="w-8 h-8 text-amber-600" />;
      default:
        return <Sparkles className="w-8 h-8 text-amber-600" />;
    }
  };

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white border-y border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>The Market Shop Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
            Why Readers &amp; Collectors Choose Market Shop
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            We bridge the warmth and passion of independent bookshops with the speed, protection, and affordability of modern commerce.
          </p>
        </div>

        {/* 3-Column Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-cream-50/70 hover:bg-cream-100/90 rounded-3xl p-8 border border-cream-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-white border border-cream-300 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300">
                  {getIcon(benefit.iconName)}
                </div>

                {/* Badge */}
                {benefit.badgeText && (
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full mb-3">
                    {benefit.badgeText}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Bottom detail pill */}
              <div className="mt-6 pt-4 border-t border-cream-300/80 flex items-center gap-2 text-xs font-semibold text-amber-900">
                <span>Verified Quality Promise</span>
                <span className="text-amber-500">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
