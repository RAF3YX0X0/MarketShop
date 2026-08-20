"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User, Store, X, Menu, Phone, Mail, Sparkles, Tag } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-subtle">
      {/* 1. Top Announcement Bar (Liberty Books Style) */}
      <div className="bg-brand-teal text-white text-[11px] font-mono py-1.5 px-4 border-b border-brand-teal-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Promo code badge */}
          <div className="flex items-center gap-2">
            <span className="bg-brand-coral text-white px-2 py-0.2 rounded-[2px] font-black uppercase text-[10px]">
              MIDNIGHT10
            </span>
            <span className="font-medium text-slate-100">
              Extra 10% OFF all orders from 12 to 9 am with code <strong>MIDNIGHT10</strong>
            </span>
          </div>

          {/* Contact and Support */}
          <div className="hidden md:flex items-center gap-5 text-slate-300">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-brand-coral" />
              <span>0800 999 66 55</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-brand-coral" />
              <span>cs@marketshop.co.uk</span>
            </span>
            <span>•</span>
            <button
              onClick={onOpenSellerModal}
              className="text-white hover:text-brand-coral-300 font-bold flex items-center gap-1 transition-colors"
            >
              <Store className="w-3 h-3 text-brand-coral" />
              Sell on Market Shop (5% Fee)
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Brand Logo strictly using provided logo asset */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
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

          {/* Centered Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <div className="flex w-full items-center border border-slate-300 focus-within:border-brand-teal bg-slate-50 focus-within:bg-white rounded-[2px] overflow-hidden transition-all">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                placeholder="Search By Title, Author, Publisher or ISBN..."
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
                className="bg-brand-teal hover:bg-brand-teal-700 text-white px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
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
                  <div className="p-4 text-center text-xs text-slate-500 font-mono">
                    No books found matching &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav Actions: Sign In & Basket */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Account Placeholder */}
            <button
              onClick={() => alert("Market Shop Reader Portal: Sign In / Register")}
              className="p-2 text-slate-700 hover:text-slate-950 flex items-center gap-1.5 text-xs font-bold font-mono transition-colors"
            >
              <User className="w-4 h-4 text-brand-teal" />
              <span className="hidden sm:inline">Hello, Sign In</span>
            </button>

            {/* Shopping Basket Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-[2px] flex items-center gap-2 text-xs font-black tracking-wider uppercase transition-colors"
              aria-label="Open Basket"
            >
              <ShoppingBag className="w-4 h-4 text-brand-coral" />
              <span className="hidden sm:inline">Basket</span>
              {totalItems > 0 && (
                <span className="bg-brand-coral text-white font-black text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 border border-slate-200 rounded-[2px]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3. Category Sub-Navigation Bar (Liberty Books Style) */}
        <div className="hidden md:flex items-center justify-between border-t border-slate-100 py-2.5 text-xs font-bold text-slate-800 font-mono uppercase tracking-wide overflow-x-auto scrollbar-none">
          <a href="#featured-deals" className="hover:text-brand-coral whitespace-nowrap transition-colors">
            New &amp; Notable
          </a>
          <span className="text-slate-300">|</span>
          <a href="#catalog" className="text-red-700 hover:text-red-800 font-black whitespace-nowrap transition-colors flex items-center gap-1">
            <Tag className="w-3 h-3" />
            Sale
          </a>
          <span className="text-slate-300">|</span>
          <a href="#catalog" className="hover:text-brand-teal whitespace-nowrap transition-colors">
            Fiction
          </a>
          <span className="text-slate-300">|</span>
          <a href="#catalog" className="hover:text-brand-teal whitespace-nowrap transition-colors">
            Non Fiction
          </a>
          <span className="text-slate-300">|</span>
          <a href="#catalog" className="hover:text-brand-teal whitespace-nowrap transition-colors">
            Children&apos;s Books
          </a>
          <span className="text-slate-300">|</span>
          <a href="#catalog" className="hover:text-brand-teal whitespace-nowrap transition-colors">
            Classics
          </a>
          <span className="text-slate-300">|</span>
          <a href="#catalog" className="hover:text-brand-teal whitespace-nowrap transition-colors">
            Gifts &amp; Stationery
          </a>
          <span className="text-slate-300">|</span>
          <a href="#catalog" className="bg-brand-coral text-white px-2 py-0.5 rounded-[2px] font-black whitespace-nowrap hover:bg-brand-coral-600 transition-colors">
            Online Book Bazar Up To 60%
          </a>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-3">
          <div className="flex w-full items-center border border-slate-300 bg-slate-50 px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, ISBN..."
              className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
            />
          </div>
          <nav className="flex flex-col space-y-2 text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
            <a href="#featured-deals" onClick={() => setMobileMenuOpen(false)} className="p-2 border-b border-slate-100">
              New &amp; Notable
            </a>
            <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="p-2 border-b border-slate-100 text-brand-coral font-black">
              Online Book Bazar (Up to 60% Off)
            </a>
            <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="p-2 border-b border-slate-100">
              Browse Categories
            </a>
            <a href="#seller-hub" onClick={() => setMobileMenuOpen(false)} className="p-2 border-b border-slate-100">
              Become a Seller (5% Fee)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
