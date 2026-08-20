"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  BookOpen,
  Sparkles,
  ChevronDown,
  Store,
  Heart,
  CheckCircle2
} from "lucide-react";
import { useCart } from "../cart/CartContext";
import { POPULAR_BOOKS, FEATURED_BIG_THREE } from "@/data/mockData";
import { formatPrice } from "@/lib/utils";

interface HeaderProps {
  onOpenSellerModal?: () => void;
  onOpenQuickView?: (product: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSellerModal, onOpenQuickView }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allSearchable = [...FEATURED_BIG_THREE, ...POPULAR_BOOKS];
  const searchResults = searchQuery.trim()
    ? allSearchable.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Banner / Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase">
              Free Delivery
            </span>
            <span className="text-slate-200 font-medium">
              Free tracked UK delivery on all orders over <strong>£15</strong> • Under £15 only £2.99
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-slate-300 text-xs">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              100-Day Money Back Guarantee
            </span>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenSellerModal}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              Sell on Market Shop (5% Fee)
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">UK: 0800 999 66 55</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                Market<span className="text-amber-600">Shop</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 -mt-1">
                Books & Marketplace
              </span>
            </div>
          </Link>

          {/* Search Bar (Center) */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="flex w-full items-center rounded-xl border-2 border-slate-200 focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/20 bg-slate-50 focus-within:bg-white transition-all overflow-hidden shadow-2xs">
              {/* Category Dropdown */}
              <div className="relative border-r border-slate-200 bg-slate-100/80 hover:bg-slate-200/70 transition-colors">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-transparent py-2.5 pl-3 pr-7 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option>All Genres</option>
                  <option>Fiction</option>
                  <option>Children&apos;s</option>
                  <option>Self-Help</option>
                  <option>History</option>
                  <option>Rare Editions</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Search Input */}
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                  placeholder="Search 25,000+ books by title, author, ISBN..."
                  className="w-full py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-slate-400 hover:text-slate-600 mr-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Button */}
              <button
                type="button"
                className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 text-sm font-bold flex items-center gap-1.5 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Search</span>
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-slide-up">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span>Found {searchResults.length} matching books</span>
                  <span className="text-amber-700 font-bold">Press ESC to dismiss</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {searchResults.length > 0 ? (
                    searchResults.map((book) => (
                      <div
                        key={book.id}
                        onClick={() => {
                          if (onOpenQuickView) onOpenQuickView(book);
                        }}
                        className="p-3 hover:bg-amber-50/50 flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <div className="w-10 h-14 bg-slate-200 rounded overflow-hidden flex-shrink-0 relative">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {book.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">{book.author}</p>
                          <span className="text-xs text-slate-400">{book.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-amber-700">
                            {formatPrice(book.price)}
                          </span>
                          {book.originalPrice && (
                            <span className="block text-xs text-slate-400 line-through">
                              {formatPrice(book.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No books found matching &quot;{searchQuery}&quot;. Try &quot;Midnight&quot;, &quot;Habits&quot;, or &quot;Pirate&quot;.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Nav Links & Action Icons */}
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700">
              <a href="#featured-deals" className="hover:text-amber-600 transition-colors">
                Featured Deals
              </a>
              <a href="#categories" className="hover:text-amber-600 transition-colors">
                Browse Books
              </a>
              <a href="#bestsellers" className="hover:text-amber-600 transition-colors">
                Best Sellers
              </a>
              <button
                onClick={onOpenSellerModal}
                className="hover:text-amber-600 transition-colors font-bold text-slate-900"
              >
                Become a Seller
              </button>
            </nav>

            {/* Seller CTA Button */}
            <button
              onClick={onOpenSellerModal}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-amber-700" />
              <span>Sell Books</span>
            </button>

            {/* Account Icon */}
            <button
              onClick={() => alert("Market Shop Customer Portal: Sign In / Register")}
              className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1 text-xs font-medium"
              title="My Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Account</span>
            </button>

            {/* Cart Icon & Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-slate-900 hover:bg-amber-600 text-white rounded-xl shadow-md transition-all duration-200 flex items-center gap-2 group"
              aria-label="Open basket"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold">Basket</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="flex w-full items-center rounded-xl border border-slate-300 bg-slate-50 px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, ISBN..."
              className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="p-1 text-slate-400">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-slide-up">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <a
              href="#featured-deals"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-amber-50 hover:text-amber-700"
            >
              Featured Deals (Big 3)
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-amber-50 hover:text-amber-700"
            >
              Browse Genres
            </a>
            <a
              href="#bestsellers"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-amber-50 hover:text-amber-700"
            >
              Best Sellers
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-amber-50 hover:text-amber-700"
            >
              Why Choose Us
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-amber-50 hover:text-amber-700"
            >
              Customer Reviews
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenSellerModal) onOpenSellerModal();
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-center flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <Store className="w-4 h-4" />
              Become a Seller (5% Fee)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
