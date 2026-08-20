import React from "react";
import { Check } from "lucide-react";
import { TESTIMONIALS } from "@/data/mockData";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-14 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-brand-coral mb-1 font-mono">
              Unedited Customer Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-950 tracking-tight">
              Verified Reader Reviews
            </h2>
          </div>
          <div className="text-left sm:text-right font-mono">
            <span className="text-xl font-black text-slate-950">4.9 / 5.0 Rating</span>
            <p className="text-xs text-slate-500">Based on 18,400+ completed UK deliveries</p>
          </div>
        </div>

        {/* 4 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="border border-slate-300 p-5 bg-white flex flex-col justify-between rounded-[2px]"
            >
              <div>
                {/* Bold Typography Rating instead of generic star icons */}
                <div className="flex items-center justify-between text-xs font-mono font-black mb-3 border-b border-slate-100 pb-2">
                  <span className="text-brand-coral">RATING: 5.0 / 5.0</span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 flex items-center gap-1 text-[10px]">
                    <Check className="w-3 h-3 stroke-[3]" />
                    Verified Order
                  </span>
                </div>

                <h3 className="font-serif font-bold text-slate-950 text-base mb-2 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {review.content}
                </p>

                {review.bookPurchased && (
                  <div className="mt-3 pt-2 text-[11px] text-slate-500 border-t border-slate-100 font-mono">
                    Item: <strong>{review.bookPurchased}</strong>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-mono">
                <span className="font-bold text-slate-950 block">{review.name}</span>
                <span className="text-[11px] text-slate-500">{review.location} • {review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
