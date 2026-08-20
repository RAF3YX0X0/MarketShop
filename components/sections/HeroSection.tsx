"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, ShieldCheck, Star, Sparkles, Store, Check, Tag } from "lucide-react";
import { Button } from "../ui/Button";
import { RatingStars } from "../ui/RatingStars";
import { useCart } from "../cart/CartContext";
import { FEATURED_BIG_THREE } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";

interface HeroSectionProps {
  onOpenSellerModal: () => void;
  onOpenQuickView: (product: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSellerModal,
  onOpenQuickView,
}) => {
  const { addToCart } = useCart();
  const heroBook = FEATURED_BIG_THREE[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 via-cream-50 to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-cream-200">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Social Proof Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-200 shadow-xs">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-xs font-bold text-slate-800">
                4.9 / 5 <span className="font-normal text-slate-500">• 18,400+ Verified UK Readers</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-slate-900 leading-[1.15]">
              Discover Great Books,{" "}
              <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 bg-clip-text text-transparent underline decoration-amber-300 decoration-wavy decoration-2">
                Unbeatable Deals
              </span>{" "}
              & Support Local Sellers.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Market Shop brings together curated bestsellers, rare collector editions, and marketplace treasures. Enjoy up to <strong className="text-slate-900 font-bold">45% off retail</strong>, free UK delivery over £15, and our ironclad 100-day reader satisfaction guarantee.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a href="#featured-deals" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="xl"
                  fullWidth
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="shadow-xl shadow-orange-600/20"
                >
                  Shop the Collection
                </Button>
              </a>

              <Button
                variant="outline"
                size="xl"
                fullWidth
                leftIcon={<Store className="w-5 h-5 text-amber-700" />}
                onClick={onOpenSellerModal}
                className="w-full sm:w-auto bg-white/80 hover:bg-amber-50"
              >
                Join as a Seller (5% Fee)
              </Button>
            </div>

            {/* Key Trust Checkmarks */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Free UK Post over £15</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>100-Day Money Back</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Verified UK Sellers</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Book Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Highlight Card */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/80 relative overflow-hidden">
                {/* Floating Tag */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  Save 41% Today
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  {/* Book Image */}
                  <div
                    className="relative w-44 h-64 rounded-xl overflow-hidden shadow-book flex-shrink-0 cursor-pointer group bg-slate-100 border border-slate-300"
                    onClick={() => onOpenQuickView(heroBook)}
                  >
                    <Image
                      src={heroBook.coverImage}
                      alt={heroBook.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 176px, 176px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="text-xs text-white font-bold bg-slate-900/90 px-2.5 py-1 rounded-md">
                        Quick Preview
                      </span>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 space-y-2.5 text-left">
                    <div className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded text-[11px] font-bold">
                      {heroBook.badge}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-950 leading-snug">
                      {heroBook.title}
                    </h3>
                    <p className="text-xs text-slate-600">By {heroBook.author}</p>

                    <div className="pt-1">
                      <RatingStars rating={heroBook.rating} reviewCount={heroBook.reviewCount} size="sm" />
                    </div>

                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">
                        {formatPrice(heroBook.price)}
                      </span>
                      {heroBook.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {formatPrice(heroBook.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        onClick={() => addToCart(heroBook)}
                      >
                        Add to Basket
                      </Button>
                      <button
                        onClick={() => onOpenQuickView(heroBook)}
                        className="text-xs font-semibold text-slate-600 hover:text-amber-700 text-center transition-colors"
                      >
                        Read Synopsis & Details →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seller Trust Banner inside Hero Card */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-cream-50 -mx-6 -mb-6 p-4 px-6 rounded-b-3xl">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Sold by <strong>{heroBook.sellerName}</strong>
                  </span>
                  <span className="text-emerald-700 font-bold">In Stock (14 left)</span>
                </div>
              </div>

              {/* Floating review card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-slate-900 text-white p-3.5 px-4 rounded-2xl shadow-xl border border-slate-800 items-center gap-3 animate-fade-in">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                  BF
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">&quot;Arrived next day in perfect condition!&quot;</p>
                  <p className="text-[10px] text-slate-400">Barry F. • Verified UK Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
