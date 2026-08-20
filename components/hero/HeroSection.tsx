"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Store, ShieldCheck, Check, Star } from "lucide-react";
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
    <section className="bg-white border-b border-slate-200 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Direct-Response Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Direct-response tag */}
            <div className="inline-flex items-center gap-2 border border-slate-900 px-2.5 py-1 rounded-[2px] bg-slate-50">
              <span className="w-2 h-2 bg-brand-coral rounded-full" />
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                UK Independent Book Marketplace
              </span>
            </div>

            {/* Direct Benefit Headline (Max 6-8 words) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-slate-950 leading-[1.08]">
              Buy Books Direct From Local UK Sellers.
            </h1>

            {/* 1 Sentence Subtext: Risk Reversal + Value */}
            <p className="text-base sm:text-lg text-slate-700 max-w-xl font-normal leading-relaxed">
              Save up to 45% on new releases, everyday paperbacks, and rare editions with Royal Mail tracked dispatch and our 100-day money-back guarantee.
            </p>

            {/* High-Contrast Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a href="#featured-deals" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="xl"
                  fullWidth
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Shop Available Books
                </Button>
              </a>

              <Button
                variant="secondary"
                size="xl"
                fullWidth
                leftIcon={<Store className="w-4 h-4 text-brand-coral" />}
                onClick={onOpenSellerModal}
                className="w-full sm:w-auto"
              >
                Sell on Market Shop (5% Fee)
              </Button>
            </div>

            {/* Typography-Driven Trust Row */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1 text-slate-950 font-black">
                  <span className="text-brand-coral font-black">★ 4.9/5</span>
                  <span className="font-normal text-slate-600">(18,400+ reviews)</span>
                </span>
                <span className="text-slate-300">•</span>
                <span>100-Day Free Returns</span>
                <span className="text-slate-300">•</span>
                <span>Royal Mail Tracked</span>
                <span className="text-slate-300">•</span>
                <span className="text-brand-teal font-black">4,500+ Verified UK Sellers</span>
              </div>
            </div>
          </div>

          {/* Right Column: Flat Editorial Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="border-2 border-slate-900 bg-slate-50 p-6 rounded-[2px] shadow-flat">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <Badge variant="deal">Featured Spotlight</Badge>
                <span className="text-[11px] font-mono font-bold text-brand-coral">
                  Save 41% Today
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-center">
                {/* Book Cover */}
                <div
                  onClick={() => onOpenQuickView(spotlightBook)}
                  className="relative w-36 h-52 sm:w-40 sm:h-56 bg-white border border-slate-300 flex-shrink-0 cursor-pointer overflow-hidden group"
                >
                  <Image
                    src={spotlightBook.coverImage}
                    alt={spotlightBook.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-102 transition-transform duration-200"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-slate-950 text-[10px] font-black uppercase px-2 py-1 tracking-wider">
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2 text-left w-full">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    {spotlightBook.category} • {spotlightBook.format}
                  </span>
                  <h3
                    onClick={() => onOpenQuickView(spotlightBook)}
                    className="text-lg font-serif font-black text-slate-950 leading-snug cursor-pointer hover:text-brand-teal transition-colors line-clamp-2"
                  >
                    {spotlightBook.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    By {spotlightBook.author}
                  </p>

                  <div className="pt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-950 font-mono">
                      {formatPrice(spotlightBook.price)}
                    </span>
                    <span className="text-xs text-slate-400 line-through font-mono">
                      {formatPrice(spotlightBook.originalPrice || 16.99)}
                    </span>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      onClick={() => addToCart(spotlightBook)}
                    >
                      Add to Basket
                    </Button>
                    <span className="text-[10px] text-slate-500 font-medium text-center">
                      Dispatched by <strong>{spotlightBook.sellerName}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom stock bar */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  In Stock (14 copies left)
                </span>
                <span className="font-mono text-slate-500">Dispatch in 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
