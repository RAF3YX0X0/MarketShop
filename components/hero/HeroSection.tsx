"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Store, ShieldCheck, Check, Sparkles, Tag } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { useCart } from "../cart/CartContext";
import { FEATURED_BIG_THREE } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface HeroSectionProps {
  onOpenSellerModal: () => void;
  onOpenQuickView: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSellerModal,
  onOpenQuickView,
}) => {
  const { addToCart } = useCart();
  const spotlightBook = FEATURED_BIG_THREE[0];

  return (
    <section className="bg-white border-b border-slate-200">
      {/* 1. Large High-Impact Promo Banner (Liberty Books Theme: STACK UP, SAVE BIG!) */}
      <div className="bg-gradient-to-r from-brand-coral via-[#D85C50] to-brand-coral text-white py-10 sm:py-14 px-4 relative overflow-hidden border-b-2 border-slate-900 shadow-inner">
        {/* Subtle decorative geometric lines */}
        <div className="absolute inset-0 border-8 border-white/10 pointer-events-none m-3" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center lg:text-left space-y-3">
            {/* Promo Stamp */}
            <div className="inline-block bg-slate-950 text-white font-black text-xs uppercase px-3 py-1 font-mono tracking-widest border border-white/30 rotate-[-1deg] shadow-flat">
              Limited Book Fair Special
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-none">
              STACK UP, <span className="text-amber-300 underline decoration-white decoration-2">SAVE BIG!</span>
            </h1>

            <p className="text-xl sm:text-2xl font-black font-mono text-slate-100 tracking-tight">
              UP TO <span className="text-amber-300">60% OFF</span> ON 30,000+ TITLES
            </p>
            <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-lg">
              Direct from verified UK bookshops &amp; publishers. Free Royal Mail tracked delivery on orders over £15.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a href="#catalog">
              <button className="px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-sm uppercase tracking-wider font-mono border-2 border-white rounded-[2px] shadow-flat hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-2 cursor-pointer">
                <span>Shop 60% Off Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>
            <button
              onClick={onOpenSellerModal}
              className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-black text-sm uppercase tracking-wider font-mono border-2 border-slate-950 rounded-[2px] shadow-flat transition-all cursor-pointer"
            >
              Sell Your Books (5% Fee)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Educational & Direct-Response Hero Overview Strip with Light Blue & Light Pink Contrast */}
      <div className="bg-brand-blue-50/60 py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Value proposition */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 border border-brand-blue-300 px-3 py-1 bg-white rounded-[2px]">
                <span className="w-2 h-2 bg-brand-coral rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 font-mono">
                  Educational &amp; Reader Marketplace
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-950 leading-tight">
                Buy Direct From Independent UK Bookshops.
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl font-normal">
                Connecting literature lovers with over 4,500 local bookshops, independent academic publishers, and rare collectors across Great Britain.
              </p>

              {/* Typography-Driven Trust Checkmarks */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono font-bold text-slate-800">
                <span className="text-brand-coral font-black">★ 4.9/5 (18,400+ reviews)</span>
                <span className="text-slate-300">•</span>
                <span>100-Day Money Back</span>
                <span className="text-slate-300">•</span>
                <span>Royal Mail 48 Tracked</span>
                <span className="text-slate-300">•</span>
                <span className="text-brand-blue-700">Verified Mint Condition</span>
              </div>
            </div>

            {/* Right: Quick Spotlight Card in Light Pink / White border */}
            <div className="lg:col-span-5">
              <div className="border-2 border-slate-900 bg-white p-5 rounded-[2px] shadow-flat">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-3">
                  <span className="text-[10px] font-mono font-black uppercase text-brand-coral">
                    Today&apos;s Featured Pick
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Save 41% Today
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <div
                    onClick={() => onOpenQuickView(spotlightBook)}
                    className="relative w-28 h-40 bg-slate-100 border border-slate-300 flex-shrink-0 cursor-pointer overflow-hidden group"
                  >
                    <Image
                      src={spotlightBook.coverImage}
                      alt={spotlightBook.title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="112px"
                    />
                  </div>

                  <div className="flex-1 space-y-1 text-left">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">
                      {spotlightBook.category} • {spotlightBook.format}
                    </span>
                    <h3
                      onClick={() => onOpenQuickView(spotlightBook)}
                      className="text-base font-serif font-black text-slate-950 leading-snug cursor-pointer hover:text-brand-coral transition-colors line-clamp-2"
                    >
                      {spotlightBook.title}
                    </h3>
                    <p className="text-[11px] text-slate-600">By {spotlightBook.author}</p>

                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="text-lg font-black text-slate-950 font-mono">
                        {formatPrice(spotlightBook.price)}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {formatPrice(spotlightBook.originalPrice || 16.99)}
                      </span>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => addToCart(spotlightBook)}
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
