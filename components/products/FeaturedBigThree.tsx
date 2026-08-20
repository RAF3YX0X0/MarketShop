"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Eye, Check, Sparkles, Copy, Clock, ShieldCheck } from "lucide-react";
import { FEATURED_BIG_THREE } from "@/data/mockData";
import { Product } from "@/types";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
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
    }, 2500);
  };

  return (
    <section id="featured-deals" className="py-14 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-brand-coral mb-1 font-mono">
              Limited Allocation Offers
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-950 tracking-tight">
              Featured Offers (The Big 3)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md font-medium">
            Strictly authentic copies direct from independent sellers. Verified mint condition and fast Royal Mail dispatch.
          </p>
        </div>

        {/* 3 Prominent Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_BIG_THREE.map((product) => (
            <div
              key={product.id}
              className="border-2 border-slate-900 bg-white flex flex-col justify-between shadow-flat hover:shadow-flat-lg transition-all duration-150 rounded-[2px]"
            >
              {/* Card Header Strip */}
              <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs font-bold font-mono">
                <span className="text-brand-coral">{product.badge}</span>
                <span className="text-emerald-400">In Stock: {product.stockCount} left</span>
              </div>

              {/* Book Cover Image */}
              <div
                className="relative h-72 w-full bg-slate-50 border-b border-slate-200 cursor-pointer overflow-hidden group"
                onClick={() => onOpenQuickView(product)}
              >
                <Image
                  src={product.coverImage}
                  alt={product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-102 transition-transform duration-200"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-slate-900 text-xs font-black uppercase tracking-wider px-3 py-1.5 border border-slate-900">
                    Preview Details
                  </span>
                </div>
              </div>

              {/* Details Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1">
                    <span>{product.category}</span>
                    <span>{product.format}</span>
                  </div>

                  <h3
                    onClick={() => onOpenQuickView(product)}
                    className="font-serif font-black text-slate-950 text-xl hover:text-brand-teal transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium mt-1">
                    By <strong>{product.author}</strong> • Sold by {product.sellerName}
                  </p>

                  {/* Bullet Highlights */}
                  {product.highlights && (
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 border border-slate-200">
                      {product.highlights.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5 stroke-[3]" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Coupon Copy Pill */}
                {product.couponCode && (
                  <div className="border border-dashed border-slate-400 bg-amber-50/70 p-2.5 flex items-center justify-between text-xs">
                    <span className="text-slate-800 font-medium">
                      Code: <strong className="font-mono text-slate-950">{product.couponCode}</strong>
                    </span>
                    <button
                      onClick={() => handleCopyCode(product.couponCode)}
                      className="text-[11px] font-black uppercase text-brand-teal hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === product.couponCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Applied</span>
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

                {/* Price & Action */}
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-950 font-mono">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through font-mono">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-black uppercase text-red-700 font-mono">
                      Save {product.discountPercentage}%
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    leftIcon={<ShoppingBag className="w-4 h-4" />}
                    onClick={() => addToCart(product)}
                  >
                    Add to Basket
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
