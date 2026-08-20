"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Eye, Star, Check, Flame } from "lucide-react";
import { REFERENCE_CATALOG_BOOKS } from "@/data/mockData";
import { Product } from "@/types";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { useCart } from "../cart/CartContext";
import { formatPrice } from "@/lib/utils";

interface ReferenceCatalogSectionProps {
  onOpenQuickView: (product: Product) => void;
}

export const ReferenceCatalogSection: React.FC<ReferenceCatalogSectionProps> = ({
  onOpenQuickView,
}) => {
  const { addToCart } = useCart();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredBooks = REFERENCE_CATALOG_BOOKS.filter((book) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "sale") return (book.discountPercentage || 0) > 0;
    if (selectedFilter === "collector") return book.price > 50;
    if (selectedFilter === "under10") return book.price < 10;
    return true;
  });

  return (
    <section id="catalog" className="py-14 bg-slate-50 border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-brand-coral mb-1 font-mono">
              Direct Inventory Feed
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-950 tracking-tight">
              Trending Seller Inventory
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: "all", label: "All Titles" },
              { id: "sale", label: "On Sale" },
              { id: "under10", label: "Under £10" },
              { id: "collector", label: "Collector Copies" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-[2px] border transition-colors cursor-pointer ${
                  selectedFilter === f.id
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-300 hover:border-slate-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Card Grid Matching Reference Visuals Exactly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredBooks.slice(0, visibleCount).map((book) => (
            <div
              key={book.id}
              className="border border-slate-300 bg-white flex flex-col justify-between hover:border-slate-900 transition-colors rounded-[2px] overflow-hidden group"
            >
              {/* Top Image Container */}
              <div
                className="relative h-64 w-full bg-slate-100 cursor-pointer overflow-hidden border-b border-slate-200"
                onClick={() => onOpenQuickView(book)}
              >
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-200"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 16vw"
                />

                {/* Direct Sale Pill matching reference image */}
                {book.discountPercentage && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-[2px] shadow-sm font-mono">
                    Sale -{book.discountPercentage}%
                  </div>
                )}
              </div>

              {/* Card Meta & Price */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  {/* Star Rating & Seller reference */}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <span className="text-brand-coral">★</span> ({book.rating.toFixed(2)})
                    </span>
                    <span className="truncate max-w-[90px]" title={book.sellerName}>
                      By: {book.sellerName}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenQuickView(book)}
                    className="font-serif font-black text-slate-950 text-sm leading-snug cursor-pointer hover:text-brand-teal line-clamp-2"
                    title={book.title}
                  >
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {book.author}
                  </p>
                </div>

                {/* Price Display matching reference image */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-base font-black text-slate-950 font-mono">
                      {formatPrice(book.price)}
                    </span>
                    {book.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {formatPrice(book.originalPrice)}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => addToCart(book)}
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
