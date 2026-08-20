"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Sparkles,
  Check,
  Copy,
  CheckCheck,
  Eye,
  Flame,
  Clock,
  ShieldCheck
} from "lucide-react";
import { FEATURED_BIG_THREE } from "@/data/mockData";
import { Product } from "@/types";
import { RatingStars } from "../ui/RatingStars";
import { Button } from "../ui/Button";
import { CountdownTimer } from "../ui/CountdownTimer";
import { useCart } from "../cart/CartContext";
import { formatPrice } from "@/lib/utils";

interface FeaturedBigThreeProps {
  onOpenQuickView: (product: Product) => void;
}

export const FeaturedBigThree: React.FC<FeaturedBigThreeProps> = ({ onOpenQuickView }) => {
  const { addToCart, applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    applyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  const getBadgeStyle = (badgeType?: string) => {
    switch (badgeType) {
      case "hot":
        return {
          headerBg: "bg-gradient-to-r from-red-600 to-rose-700 text-white",
          tagBg: "bg-red-50 text-red-700 border-red-200",
          icon: <Flame className="w-4 h-4 text-amber-300" />,
        };
      case "deal":
        return {
          headerBg: "bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950",
          tagBg: "bg-amber-50 text-amber-900 border-amber-200",
          icon: <Sparkles className="w-4 h-4 text-slate-950" />,
        };
      case "exclusive":
        return {
          headerBg: "bg-gradient-to-r from-purple-800 to-indigo-800 text-white",
          tagBg: "bg-purple-50 text-purple-800 border-purple-200",
          icon: <Sparkles className="w-4 h-4 text-yellow-300" />,
        };
      default:
        return {
          headerBg: "bg-slate-900 text-white",
          tagBg: "bg-slate-50 text-slate-900 border-slate-200",
          icon: <Sparkles className="w-4 h-4 text-amber-400" />,
        };
    }
  };

  return (
    <section id="featured-deals" className="py-16 lg:py-24 bg-cream-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Curated Discoveries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
            The Big 3 Featured Discoveries
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Hand-picked by our literary curators. Limited-quantity releases with exclusive coupon savings and fast tracked shipping.
          </p>
        </div>

        {/* The Big 3 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {FEATURED_BIG_THREE.map((product, idx) => {
            const badgeInfo = getBadgeStyle(product.badgeType);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 group"
              >
                {/* Header Banner on Card */}
                <div
                  className={`px-6 py-3.5 flex items-center justify-between font-bold text-xs tracking-wider uppercase ${badgeInfo.headerBg}`}
                >
                  <div className="flex items-center gap-1.5">
                    {badgeInfo.icon}
                    <span>{product.badge}</span>
                  </div>
                  <span className="font-mono text-[11px] bg-black/20 px-2 py-0.5 rounded">
                    Save {product.discountPercentage}%
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Book Cover Image Area */}
                    <div
                      className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-book bg-slate-100 border border-slate-200/80 cursor-pointer mb-6"
                      onClick={() => onOpenQuickView(product)}
                    >
                      <Image
                        src={product.coverImage}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Format Badge */}
                      {product.format && (
                        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-md">
                          {product.format}
                        </div>
                      )}

                      {/* Quick View Button overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <span className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Eye className="w-4 h-4 text-amber-600" />
                          Quick Synopsis
                        </span>
                      </div>
                    </div>

                    {/* Category & Rating */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-amber-700 tracking-wider uppercase">
                        {product.category}
                      </span>
                      <RatingStars
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                        size="sm"
                      />
                    </div>

                    {/* Title & Author */}
                    <h3
                      onClick={() => onOpenQuickView(product)}
                      className="text-xl sm:text-2xl font-serif font-black text-slate-900 hover:text-amber-700 cursor-pointer line-clamp-2 transition-colors mb-1.5"
                    >
                      {product.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mb-4">
                      By <span className="text-slate-800">{product.author}</span>
                    </p>

                    {/* Highlights */}
                    {product.highlights && (
                      <ul className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                        {product.highlights.map((h, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Pricing, Coupon & CTA */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    {/* Countdown Timer */}
                    <div className="flex justify-center">
                      <CountdownTimer
                        initialHours={7 + idx * 3}
                        initialMinutes={45 - idx * 10}
                        label="Offer ends in"
                        theme="amber"
                      />
                    </div>

                    {/* Coupon Code Pill */}
                    {product.couponCode && (
                      <div className="flex items-center justify-between bg-amber-50/80 border border-dashed border-amber-300 rounded-xl px-3.5 py-2">
                        <div className="text-xs">
                          <span className="text-slate-600 block text-[10px] font-bold uppercase tracking-wider">
                            Exclusive Voucher
                          </span>
                          <span className="font-mono font-black text-slate-900">
                            CODE: {product.couponCode}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopyCode(product.couponCode)}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          {copiedCode === product.couponCode ? (
                            <>
                              <CheckCheck className="w-3.5 h-3.5 text-slate-950" />
                              <span>Applied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Apply Code</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Price display */}
                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">Special Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-slate-900">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm font-semibold text-slate-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          In Stock ({product.stockCount || 10} left)
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      leftIcon={<ShoppingBag className="w-5 h-5" />}
                      onClick={() => addToCart(product)}
                      className="shadow-lg shadow-orange-600/20"
                    >
                      Add to Basket
                    </Button>

                    {/* Seller attribution */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Fulfilled by <strong>{product.sellerName}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
