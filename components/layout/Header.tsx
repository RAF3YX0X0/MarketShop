"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User, Store, X, Menu, ShieldCheck } from "lucide-react";
import { useCart } from "../cart/CartContext";
import { FEATURED_BIG_THREE, REFERENCE_CATALOG_BOOKS } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface HeaderProps {
  onOpenSellerModal?: () => void;
  onOpenQuickView?: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSellerModal, onOpenQuickView }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const allBooks = [...FEATURED_BIG_THREE, ...REFERENCE_CATALOG_BOOKS];
  const searchResults = searchQuery.trim()
    ? allBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      {/* 1. Low-Friction Top Promo Bar */}
      <div className="bg-brand-teal text-white text-xs py-2 px-4 border-b border-brand-teal-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="bg-brand-coral px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-[2px]">
              Direct From Sellers
            </span>
            <span>Free UK Tracked Delivery over £15 • 100-Day Money-Back Guarantee</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-200">
            <button
              onClick={onOpenSellerModal}
              className="text-white hover:text-brand-coral-300 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-brand-coral-400" />
              Sell on Market Shop (5% Fee)
            </button>
            <span className="text-slate-400">|</span>
            <span className="font-mono text-slate-300">UK: 0800 999 66 55</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          {/* Brand Logo strictly using image_c30669.png */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative h-12 w-48 sm:w-56">
              <Image
                src="/images/logo.png"
                alt="Market Shop - Ocean of Book"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
          </Link>

          {/* Search Bar (Center) */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <div className="flex w-full items-center border border-slate-300 focus-within:border-brand-teal bg-slate-50 focus-within:bg-white rounded-[2px] overflow-hidden transition-all">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                placeholder="Search title, author, or ISBN..."
                className="w-full py-2.5 px-3.5 text-xs text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-slate-400 hover:text-slate-600 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                className="bg-brand-teal hover:bg-brand-teal-700 text-white px-4 py-2.5 text-xs font-bold flex items-center gap-1 transition-colors"
                aria-label="Search books"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

            {/* Live Search Dropdown */}
            {isSearchFocused && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 shadow-lg z-50 rounded-[2px] max-h-80 overflow-y-auto divide-y divide-slate-100">
                {searchResults.length > 0 ? (
                  searchResults.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => {
                        if (onOpenQuickView) onOpenQuickView(book);
                      }}
                      className="p-3 hover:bg-slate-50 flex items-center gap-3 cursor-pointer transition-colors"
                    >
                      <div className="w-9 h-13 bg-slate-100 border border-slate-200 relative overflow-hidden flex-shrink-0">
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {book.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-900 font-mono">
                          {formatPrice(book.price)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No books matching &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav Links & Actions */}
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700 tracking-wide uppercase">
              <a href="#featured-deals" className="hover:text-brand-teal transition-colors">
                Featured Offers
              </a>
              <a href="#catalog" className="hover:text-brand-teal transition-colors">
                Book Catalog
              </a>
              <a href="#why-us" className="hover:text-brand-teal transition-colors">
                Why Us
              </a>
              <a href="#reviews" className="hover:text-brand-teal transition-colors">
                Reviews
              </a>
            </nav>

            {/* Seller CTA button */}
            <button
              onClick={onOpenSellerModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 hover:border-slate-900 text-xs font-bold text-slate-900 rounded-[2px] transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-brand-coral" />
              <span>Start Selling</span>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-[2px] flex items-center gap-2 text-xs font-black tracking-wider uppercase transition-colors"
              aria-label="Open Basket"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span>Basket</span>
              {totalItems > 0 && (
                <span className="bg-brand-coral text-white font-black text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 border border-slate-200 rounded-[2px]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-xs font-bold uppercase tracking-wider text-slate-800">
            <a
              href="#featured-deals"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border-b border-slate-100 hover:text-brand-teal"
            >
              Featured Offers
            </a>
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border-b border-slate-100 hover:text-brand-teal"
            >
              Book Catalog
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border-b border-slate-100 hover:text-brand-teal"
            >
              Why Market Shop
            </a>
            <a
              href="#seller-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border-b border-slate-100 hover:text-brand-teal"
            >
              Seller Hub (5% Fee)
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:text-brand-teal"
            >
              Customer Reviews
            </a>
          </nav>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenSellerModal) onOpenSellerModal();
            }}
            className="w-full py-2.5 bg-brand-coral text-white font-bold text-xs uppercase tracking-wider rounded-[2px]"
          >
            Start Selling Books (Keep 95%)
          </button>
        </div>
      )}
    </header>
  );
};
