"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Eye,
  Star,
  Check,
  Flame,
  Sparkles,
  Tag,
  Search,
  Filter
} from "lucide-react";
import { POPULAR_BOOKS, CATEGORIES } from "@/data/mockData";
import { Product } from "@/types";
import { RatingStars } from "../ui/RatingStars";
import { Button } from "../ui/Button";
import { useCart } from "../cart/CartContext";
import { formatPrice } from "@/lib/utils";

interface PopularCatalogSectionProps {
  onOpenQuickView: (product: Product) => void;
}

export const PopularCatalogSection: React.FC<PopularCatalogSectionProps> = ({ onOpenQuickView }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterSearch, setFilterSearch] = useState("");

  const filteredBooks = POPULAR_BOOKS.filter((book) => {
    const matchesCategory =
      selectedCategory === "all" ||
      book.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      book.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(filterSearch.toLowerCase()) ||
      book.category.toLowerCase().includes(filterSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeStyle = (badgeType?: string) => {
    switch (badgeType) {
      case "bestseller":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "hot":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "exclusive":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "deal":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <section id="bestsellers" className="py-16 lg:py-24 bg-white border-b border-slate-200/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
            <span>Community Favourites & Bestsellers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 tracking-tight">
            Explore Trending Reads
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Hand-picked titles loved by readers this month. Every copy checked for quality.
          </p>
        </div>

        {/* Category Pills & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100" id="categories">
          {/* Scrollable Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Genres ({POPULAR_BOOKS.length})
            </button>
            <button
              onClick={() => setSelectedCategory("children")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "children"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Children & Young Adult
            </button>
            <button
              onClick={() => setSelectedCategory("thriller")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "thriller"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Thriller & Fantasy
            </button>
            <button
              onClick={() => setSelectedCategory("historical")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "historical"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Historical Fiction
            </button>
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Filter by title..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Cover Image Container */}
              <div
                className="relative h-64 w-full bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => onOpenQuickView(book)}
              >
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Badge */}
                {book.badge && (
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border shadow-xs ${getBadgeStyle(book.badgeType)}`}>
                      {book.badge}
                    </span>
                  </div>
                )}

                {/* Discount Tag */}
                {book.discountPercentage && (
                  <div className="absolute top-3 right-3 bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded shadow-sm">
                    -{book.discountPercentage}%
                  </div>
                )}

                {/* Quick View Hover Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuickView(book);
                    }}
                    className="bg-white text-slate-900 text-xs font-bold py-2 px-4 rounded-xl shadow-lg hover:bg-amber-500 hover:text-slate-950 transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    Quick Preview
                  </button>
                </div>
              </div>

              {/* Book Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-amber-700">{book.category}</span>
                    <span>{book.format || "Paperback"}</span>
                  </div>

                  <h3
                    onClick={() => onOpenQuickView(book)}
                    className="font-serif font-bold text-slate-900 text-base line-clamp-1 group-hover:text-amber-700 transition-colors cursor-pointer"
                    title={book.title}
                  >
                    {book.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    By {book.author}
                  </p>

                  <div className="mt-2">
                    <RatingStars rating={book.rating} reviewCount={book.reviewCount} size="sm" />
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900">
                        {formatPrice(book.price)}
                      </span>
                      {book.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(book.originalPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock
                    </span>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    leftIcon={<ShoppingBag className="w-4 h-4" />}
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
