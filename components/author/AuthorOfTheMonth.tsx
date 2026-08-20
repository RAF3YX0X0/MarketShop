"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Award, Sparkles, ArrowRight, Quote, Check } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { useCart } from "../cart/CartContext";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface AuthorOfTheMonthProps {
  onOpenQuickView: (product: Product) => void;
}

export const AuthorOfTheMonth: React.FC<AuthorOfTheMonthProps> = ({ onOpenQuickView }) => {
  const { addToCart } = useCart();

  const authorFeaturedBook: Product = {
    id: "auth-1",
    title: "The Midnight Library (Special Author Edition)",
    author: "Matt Haig",
    price: 9.99,
    originalPrice: 16.99,
    discountPercentage: 41,
    rating: 4.9,
    reviewCount: 3840,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    badge: "Author Spotlight",
    badgeType: "deal",
    category: "Literary Fiction",
    description: "Between life and death there is a library. Nora Seed finds herself faced with the possibility of changing her life for a new one, following a different path.",
    format: "Hardcover",
    pages: 304,
    publishYear: 2024,
    inStock: true,
    stockCount: 14,
    sellerName: "Bloomsbury Rare Books (London)",
    highlights: [
      "Signed author bookplate included",
      "Over 9 million readers worldwide",
      "Royal Mail 24/48h tracked dispatch"
    ]
  };

  return (
    <section className="py-14 bg-brand-blue-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-slate-900 bg-white p-6 sm:p-10 shadow-flat rounded-[2px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Author Profile & Bio */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <Badge variant="coral">Author of the Month</Badge>
                <span className="text-[11px] font-mono font-bold text-brand-blue-700 uppercase">
                  August 2026 Spotlight
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-950 leading-tight">
                Matt Haig
              </h2>
              <p className="text-xs sm:text-sm font-mono text-slate-500 font-bold uppercase tracking-wider">
                #1 New York Times &amp; Sunday Times Bestselling Author
              </p>

              {/* Quote Block */}
              <div className="border-l-4 border-brand-coral bg-brand-pink-50/60 p-4 my-2">
                <p className="text-xs sm:text-sm italic text-slate-800 font-serif leading-relaxed">
                  &ldquo;A book is an act of magic. You read words written centuries or continents away, and in your mind a living person is talking directly to you.&rdquo;
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                Matt Haig is the acclaimed author of seven international bestselling novels. His work has been translated into over 54 languages, exploring hope, memory, mental health, and the multiverse of human choices.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-800">
                <span className="flex items-center gap-1 font-bold">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  9M+ Global Copies Sold
                </span>
                <span className="flex items-center gap-1 font-bold">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  Goodreads Choice Winner
                </span>
              </div>
            </div>

            {/* Right: Featured Author Title Card */}
            <div className="lg:col-span-5">
              <div className="border border-slate-300 bg-slate-50 p-5 rounded-[2px]">
                <span className="text-[10px] font-mono uppercase font-black text-brand-coral block mb-2">
                  Featured Author Edition
                </span>

                <div className="flex gap-4 items-center">
                  <div
                    className="relative w-28 h-40 bg-white border border-slate-300 flex-shrink-0 cursor-pointer overflow-hidden group"
                    onClick={() => onOpenQuickView(authorFeaturedBook)}
                  >
                    <Image
                      src={authorFeaturedBook.coverImage}
                      alt={authorFeaturedBook.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="112px"
                    />
                  </div>

                  <div className="flex-1 space-y-1.5 text-left">
                    <h4
                      onClick={() => onOpenQuickView(authorFeaturedBook)}
                      className="font-serif font-bold text-base text-slate-950 leading-snug cursor-pointer hover:text-brand-teal line-clamp-2"
                    >
                      {authorFeaturedBook.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Hardcover • 304 Pages
                    </p>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-lg font-black text-slate-950 font-mono">
                        {formatPrice(authorFeaturedBook.price)}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {formatPrice(authorFeaturedBook.originalPrice || 16.99)}
                      </span>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => addToCart(authorFeaturedBook)}
                      >
                        Add to Basket
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
