"use client";

import React, { useState } from "react";
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Quote,
  ThumbsUp,
  Award,
  Sparkles,
  BookOpen
} from "lucide-react";
import { TESTIMONIALS } from "@/data/mockData";
import { RatingStars } from "../ui/RatingStars";

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "delivery" | "quality">("all");
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({
    t1: 42,
    t2: 29,
    t3: 35,
    t4: 18,
  });
  const [markedHelpful, setMarkedHelpful] = useState<Record<string, boolean>>({});

  const handleHelpful = (id: string) => {
    if (markedHelpful[id]) return;
    setHelpfulCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setMarkedHelpful((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-cream-50/70 border-b border-cream-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Rating Overview */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-14">
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Verified Reader Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
              Loved by Avid Readers Across the UK
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Read real, unedited feedback from book lovers and collectors who shop with us every day.
            </p>
          </div>

          {/* Aggregate Trust Score Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-md flex items-center gap-5 flex-shrink-0">
            <div className="text-center border-r border-slate-200 pr-5">
              <span className="text-4xl sm:text-5xl font-serif font-black text-slate-900 block leading-none">
                4.9
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-1 block">out of 5.0</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-xs font-bold text-slate-900">
                Excellent rating from <span className="text-amber-700">18,500+</span> reviews
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Verified Purchases</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between relative group"
            >
              {/* Quote icon watermark */}
              <Quote className="w-8 h-8 text-cream-300 absolute top-4 right-4 group-hover:text-amber-200 transition-colors pointer-events-none" />

              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Review Title */}
                <h3 className="font-bold text-slate-900 text-base mb-2 font-serif leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {review.content}
                </p>

                {/* Purchased item tag */}
                {review.bookPurchased && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-slate-600 text-xs bg-cream-50/60 p-2 rounded-lg">
                    <BookOpen className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                    <span className="truncate font-medium">Bought: <strong>{review.bookPurchased}</strong></span>
                  </div>
                )}
              </div>

              {/* Reviewer Details & Helpful Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{review.name}</h4>
                  <p className="text-[11px] text-slate-500">{review.location} • {review.date}</p>
                </div>

                <button
                  onClick={() => handleHelpful(review.id)}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                    markedHelpful[review.id]
                      ? "bg-amber-100 text-amber-900 border-amber-300 font-bold"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                  title="Was this review helpful?"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{helpfulCounts[review.id] || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
