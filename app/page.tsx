"use client";

import React, { useState, useRef } from "react";
import { useCart } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/cart/WishlistDrawer";
import { QuickViewModal } from "@/components/modals/QuickViewModal";
import { ToastContainer, ToastMessage } from "@/components/ui/Toast";
import { Product } from "@/types";

export default function Home() {
  const {
    addToCart,
    totalItems,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useCart();

  const dealsContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Fiction");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string) => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      type: "success",
      title: "Market Shop Notice",
      message: message,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddToCartQuick = (title: string, author: string, price: number, image: string, category = "Curator's Choice") => {
    const product: Product = {
      id: title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      title,
      author,
      price,
      rating: 4.9,
      reviewCount: 128,
      coverImage: image,
      category,
      description: `A masterfully crafted edition of "${title}" by ${author}. Carefully curated for Market Shop readers.`,
      format: "Hardcover",
      inStock: true,
      sellerName: "Market Shop Direct (UK)",
    };
    addToCart(product, 1);
  };

  const handleOpenProductModal = (title: string, author: string, price: number, image: string, category = "Fiction", originalPrice?: number) => {
    setSelectedProduct({
      id: title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      title,
      author,
      price,
      originalPrice,
      rating: 4.9,
      reviewCount: 142,
      coverImage: image,
      category,
      description: `Discover "${title}" by ${author}. A timeless work of exceptional quality curated for discerning readers. Enjoy tracked UK delivery and a 100-day return guarantee.`,
      format: "Hardcover",
      inStock: true,
      sellerName: "Market Shop UK Verified Independent Seller",
    });
    setIsQuickViewOpen(true);
  };

  const scrollDeals = (direction: "left" | "right") => {
    if (dealsContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      dealsContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const genresList = [
    { id: "fiction", name: "Fiction", icon: "auto_stories" },
    { id: "non-fiction", name: "Non-Fiction", icon: "science" },
    { id: "rare-editions", name: "Rare Editions", icon: "diamond" },
    { id: "poetry", name: "Poetry", icon: "history_edu" },
    { id: "children", name: "Children's", icon: "child_care" },
    { id: "sci-fi", name: "Sci-Fi & Fantasy", icon: "rocket_launch" },
  ];

  return (
    <>
      {/* 1. Top Bar - Vibrant Royal Indigo Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-center py-2.5 px-margin-mobile md:px-margin-desktop text-sm flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 shadow-sm">
        <div className="flex items-center gap-1 text-amber-300">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="ml-1 text-white font-bold text-xs">Trustpilot 4.9/5</span>
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400/25 text-emerald-200 border border-emerald-400/40">
            ✓ Verified Independent Store
          </span>
        </div>
        <span className="font-quote-text italic text-blue-100 text-sm md:text-base hidden md:block">
          &quot;A room without books is like a body without a soul.&quot;
        </span>
      </div>

      {/* 2 & 3. Navigation Header */}
      <header className="w-full top-0 bg-white/95 backdrop-blur-md flex flex-col w-full max-w-container-max mx-auto px-margin-desktop hidden md:flex border-b border-slate-200 sticky z-40 transition-all shadow-sm">
        <div className="py-4 flex justify-between items-center w-full relative">
          {/* Logo */}
          <a className="hover:scale-105 transition-transform flex items-center flex-shrink-0" href="#">
            <img
              src="/images/logo.png"
              alt="Market Shop - Ocean of Book"
              className="h-11 w-auto object-contain mix-blend-multiply"
            />
          </a>

          {/* Categories in the middle between Logo and Favorites/Cart/Search */}
          <nav className="flex items-center gap-5 lg:gap-7 mx-4">
            <a
              className={`font-title-md text-sm lg:text-base font-semibold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Fiction"
                  ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5"
                  : "text-slate-700 hover:text-rose-600"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Fiction"); }}
            >
              Fiction
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-semibold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Non-Fiction"
                  ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5"
                  : "text-slate-700 hover:text-rose-600"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Non-Fiction"); }}
            >
              Non-Fiction
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-semibold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Rare Editions"
                  ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5"
                  : "text-slate-700 hover:text-rose-600"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Rare Editions"); }}
            >
              Rare Editions
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-semibold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Poetry"
                  ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5"
                  : "text-slate-700 hover:text-rose-600"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Poetry"); }}
            >
              Poetry
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-semibold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Children"
                  ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5"
                  : "text-slate-700 hover:text-rose-600"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Children"); }}
            >
              Children
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-bold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Sale"
                  ? "text-rose-600 border-b-2 border-rose-600 pb-0.5"
                  : "text-rose-600 hover:text-rose-700"
              }`}
              href="#seasonal-deals"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Sale"); }}
            >
              Sale
            </a>
          </nav>

          {/* Right Controls: Search Expand Icon, Favorites, Cart */}
          <div className="flex items-center gap-3.5 relative">
            {/* Search Icon with Click-to-Expand Dropdown below */}
            <div className="relative">
              <button
                aria-label="Search"
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (!isSearchOpen) {
                    setTimeout(() => searchInputRef.current?.focus(), 100);
                  }
                }}
                className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isSearchOpen
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "text-blue-600 hover:bg-blue-50 hover:text-rose-600"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                  {isSearchOpen ? "close" : "search"}
                </span>
              </button>

              {/* Expandable Search Bar Dropdown right below Search Button */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-200 shadow-2xl rounded-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px]">search</span>
                    <input
                      ref={searchInputRef}
                      className="w-full bg-slate-50 rounded-xl py-2.5 pl-10 pr-9 border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-colors text-sm font-medium text-slate-900"
                      placeholder="Search authors, titles, genres..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 p-1 text-slate-400 hover:text-slate-900 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Search 6 verified titles</span>
                    <span className="text-rose-600 font-semibold">Instant results</span>
                  </div>
                </div>
              )}
            </div>

            {/* Favorites / Wishlist Button */}
            <button
              aria-label="Favorites"
              onClick={() => setIsWishlistOpen(true)}
              className="text-rose-500 hover:text-rose-600 transition-colors duration-200 relative p-2 rounded-full hover:bg-rose-50 cursor-pointer"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "26px", fontVariationSettings: wishlistCount > 0 ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
              {wishlistCount > 0 && (
                <span className="absolute 0 top-0 right-0 bg-rose-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 relative p-2 rounded-full hover:bg-blue-50 cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "26px" }}>shopping_bag</span>
              <span className="absolute 0 top-0 right-0 bg-blue-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center px-margin-mobile py-3 bg-white sticky top-0 z-40 border-b border-slate-200 shadow-sm">
        <a className="flex items-center" href="#">
          <img
            src="/images/logo.png"
            alt="Market Shop - Ocean of Book"
            className="h-8 w-auto object-contain mix-blend-multiply"
          />
        </a>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (!isSearchOpen) {
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }
            }}
            aria-label="Search"
            className="text-slate-700 hover:text-blue-600 p-1.5"
          >
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Favorites"
            className="text-rose-500 hover:text-rose-600 relative p-1.5"
          >
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: wishlistCount > 0 ? "'FILL' 1" : "'FILL' 0" }}>
              favorite
            </span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
            className="text-blue-600 hover:text-blue-700 relative p-1.5"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Search Bar Dropdown */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-3 bg-white border-b border-slate-200 shadow-md">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px]">search</span>
            <input
              ref={searchInputRef}
              className="w-full bg-slate-50 rounded-xl py-2.5 pl-10 pr-9 border border-slate-200 focus:outline-none focus:border-blue-600 text-sm font-medium text-slate-900"
              placeholder="Search authors, titles, genres..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-900 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Trust Bar - Radiant sky/blue gradient */}
      <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 py-3.5 border-y border-blue-100/80">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-center gap-8 md:gap-16 text-center">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-blue-600 text-base">local_shipping</span>
            <span className="font-label-sm text-label-sm text-slate-800 uppercase tracking-wider font-bold">Quick UK Delivery</span>
          </div>
          <div className="hidden sm:flex items-center gap-2.5">
            <span className="material-symbols-outlined text-emerald-600 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="font-label-sm text-label-sm text-slate-800 uppercase tracking-wider font-bold">Money Back Guarantee</span>
          </div>
          <div className="hidden md:flex items-center gap-2.5">
            <span className="material-symbols-outlined text-indigo-600 text-base">health_and_safety</span>
            <span className="font-label-sm text-label-sm text-slate-800 uppercase tracking-wider font-bold">Trusted Nationwide</span>
          </div>
        </div>
      </div>

      <main className="max-w-container-max mx-auto w-full">
        {/* 5. Hero Section - Vibrant and Radiant */}
        <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200 text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span>✨ UK&apos;s Independent Literary Marketplace</span>
          </div>

          <h1 className="font-display-xl text-3xl sm:text-5xl md:text-6xl text-slate-900 mb-6 max-w-4xl mx-auto font-extrabold tracking-tight leading-tight">
            Curating Quiet Moments for Every Reader
          </h1>
          <p className="font-body-lg text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            Discover a carefully selected collection of literature designed to inspire, comfort, and transport you. Explore our shelves and find your next escape with direct UK independent sellers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("curators-picks");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-label-sm text-sm uppercase tracking-wider py-4 px-9 rounded-2xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 cursor-pointer font-bold"
            >
              Shop Collection
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("genres-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-slate-800 text-slate-800 hover:bg-slate-900 hover:text-white font-label-sm text-sm uppercase tracking-wider py-4 px-9 rounded-2xl transition-all hover:-translate-y-0.5 cursor-pointer font-bold shadow-sm"
            >
              Explore Genres
            </button>
          </div>
        </section>

        {/* Moving Marquee Bar - Vibrant Gradient Banner (Relocated below Hero Section) */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3 shadow-md marquee-container my-6">
          <div className="marquee-content font-label-sm text-label-sm text-white uppercase tracking-widest flex gap-12 font-bold">
            <span>✨ 5-Star Trustpilot Reviews</span>
            <span className="text-yellow-300">•</span>
            <span>🔥 Seasonal Deals Now Live</span>
            <span className="text-yellow-300">•</span>
            <span>📦 Fast UK Tracked Delivery</span>
            <span className="text-yellow-300">•</span>
            <span>📚 Direct Independent UK Sellers</span>
            <span className="text-yellow-300">•</span>
            <span>✨ 5-Star Trustpilot Reviews</span>
            <span className="text-yellow-300">•</span>
            <span>🔥 Seasonal Deals Now Live</span>
            <span className="text-yellow-300">•</span>
            <span>📦 Fast UK Tracked Delivery</span>
            <span className="text-yellow-300">•</span>
            <span>📚 Direct Independent UK Sellers</span>
          </div>
        </div>

        {/* 6. Featured Books: Curator's Picks */}
        <section id="curators-picks" className="px-margin-mobile md:px-margin-desktop py-12 scroll-mt-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-2">
                Handpicked Treasures
              </span>
              <h2 className="font-title-md text-title-md text-slate-900 font-bold">Curator&apos;s Picks</h2>
            </div>
            <a className="font-label-sm text-label-sm text-blue-600 uppercase hover:underline font-bold" href="#curators-picks">View All</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book 1 */}
            <div
              onClick={() => handleOpenProductModal("David Walliams Gangsta Granny", "info.vebryx@gmail.com", 5.99, "/images/books/gangsta-granny.png", "Curator's Choice", 7.99)}
              className="flex flex-col group cursor-pointer bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="aspect-[2/3] w-full bg-slate-100 mb-4 overflow-hidden border border-slate-200 rounded-xl book-shadow transition-all duration-300 lift-on-hover relative">
                <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs px-2.5 py-0.5 uppercase font-extrabold rounded-lg shadow-sm z-10">
                  Sale -25%
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const inList = isInWishlist("david-walliams-gangsta-granny");
                    if (inList) {
                      removeFromWishlist("david-walliams-gangsta-granny");
                    } else {
                      addToWishlist({
                        id: "david-walliams-gangsta-granny",
                        title: "David Walliams Gangsta Granny",
                        author: "info.vebryx@gmail.com",
                        price: 5.99,
                        originalPrice: 7.99,
                        rating: 4.9,
                        reviewCount: 0,
                        coverImage: "/images/books/gangsta-granny.png",
                        category: "Children's Fiction",
                        description: "Ben thought his granny was boring... until he discovered she was an international jewel thief! A hilarious and heartwarming modern classic.",
                        format: "Hardcover",
                        inStock: true,
                        sellerName: "info.vebryx@gmail.com"
                      });
                    }
                  }}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/95 shadow-md hover:bg-white text-rose-500 transition-transform hover:scale-110 z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isInWishlist("david-walliams-gangsta-granny") ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Cover of David Walliams Gangsta Granny"
                  alt="Cover of David Walliams Gangsta Granny"
                  src="/images/books/gangsta-granny.png"
                />
              </div>
              <div className="text-center mt-1">
                <div className="flex items-center justify-center gap-1 text-xs text-amber-500 mb-1 font-mono">
                  <span className="font-bold">★ (0)</span>
                </div>
                <h3 className="font-title-md text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors font-bold">David Walliams Gangsta Granny</h3>
                <p className="font-body-md text-xs text-rose-600 mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-body-lg text-lg font-bold mb-4">
                  <span className="text-rose-600 mr-2">$5.99</span>
                  <span className="text-slate-400 line-through font-normal text-sm">$7.99</span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartQuick("David Walliams Gangsta Granny", "info.vebryx@gmail.com", 5.99, "/images/books/gangsta-granny.png", "Children's Fiction");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-label-sm text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer font-bold"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Book 2 */}
            <div
              onClick={() => handleOpenProductModal("Adventures of the magic star", "info.vebryx@gmail.com", 5.99, "/images/books/adventures-of-the-magic-star.png", "Curator's Choice", 7.00)}
              className="flex flex-col group cursor-pointer bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="aspect-[2/3] w-full bg-slate-100 mb-4 overflow-hidden border border-slate-200 rounded-xl book-shadow transition-all duration-300 lift-on-hover relative">
                <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs px-2.5 py-0.5 uppercase font-extrabold rounded-lg shadow-sm z-10">
                  Sale -14%
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const inList = isInWishlist("adventures-of-the-magic-star");
                    if (inList) {
                      removeFromWishlist("adventures-of-the-magic-star");
                    } else {
                      addToWishlist({
                        id: "adventures-of-the-magic-star",
                        title: "Adventures of the magic star",
                        author: "info.vebryx@gmail.com",
                        price: 5.99,
                        originalPrice: 7.00,
                        rating: 4.9,
                        reviewCount: 0,
                        coverImage: "/images/books/adventures-of-the-magic-star.png",
                        category: "Adventure & Romance",
                        description: "A whimsical tale of wonder and celestial courage across uncharted galaxies.",
                        format: "Hardcover",
                        inStock: true,
                        sellerName: "info.vebryx@gmail.com"
                      });
                    }
                  }}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/95 shadow-md hover:bg-white text-rose-500 transition-transform hover:scale-110 z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isInWishlist("adventures-of-the-magic-star") ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Cover of Adventures of the magic star"
                  alt="Cover of Adventures of the magic star"
                  src="/images/books/adventures-of-the-magic-star.png"
                />
              </div>
              <div className="text-center mt-1">
                <div className="flex items-center justify-center gap-1 text-xs text-amber-500 mb-1 font-mono">
                  <span className="font-bold">★ (0)</span>
                </div>
                <h3 className="font-title-md text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors font-bold">Adventures of the magic star</h3>
                <p className="font-body-md text-xs text-rose-600 mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-body-lg text-lg font-bold mb-4">
                  <span className="text-rose-600 mr-2">$5.99</span>
                  <span className="text-slate-400 line-through font-normal text-sm">$7.00</span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartQuick("Adventures of the magic star", "info.vebryx@gmail.com", 5.99, "/images/books/adventures-of-the-magic-star.png", "Adventure & Romance");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-label-sm text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer font-bold"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Book 3 */}
            <div
              onClick={() => handleOpenProductModal("Shadow of Decenit", "info.vebryx@gmail.com", 155.00, "/images/books/shadow-of-deceit.png", "Curator's Choice")}
              className="flex flex-col group cursor-pointer bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="aspect-[2/3] w-full bg-slate-100 mb-4 overflow-hidden border border-slate-200 rounded-xl book-shadow transition-all duration-300 lift-on-hover relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist({
                      id: "shadow-of-decenit",
                      title: "Shadow of Decenit",
                      author: "info.vebryx@gmail.com",
                      price: 155.00,
                      rating: 4.9,
                      reviewCount: 0,
                      coverImage: "/images/books/shadow-of-deceit.png",
                      category: "Mystery & Thriller",
                      description: "Some secrets are meant to stay hidden. A gripping noir thriller with embossed crimson title lettering.",
                      format: "Hardcover",
                      inStock: true,
                      sellerName: "info.vebryx@gmail.com"
                    });
                  }}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/95 shadow-md hover:bg-white text-rose-500 transition-transform hover:scale-110 z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isInWishlist("shadow-of-decenit") ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-alt="Cover of Shadow of Decenit"
                  alt="Cover of Shadow of Decenit"
                  src="/images/books/shadow-of-deceit.png"
                />
              </div>
              <div className="text-center mt-1">
                <div className="flex items-center justify-center gap-1 text-xs text-amber-500 mb-1 font-mono">
                  <span className="font-bold">★ (0)</span>
                </div>
                <h3 className="font-title-md text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors font-bold">Shadow of Decenit</h3>
                <p className="font-body-md text-xs text-rose-600 mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-body-lg text-lg font-bold mb-4 text-slate-900">
                  $155.00
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartQuick("Shadow of Decenit", "info.vebryx@gmail.com", 155.00, "/images/books/shadow-of-deceit.png", "Mystery & Thriller");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-label-sm text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md shadow-blue-500/20 hover:shadow-lg cursor-pointer font-bold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Author of the Month (Deep Indigo Modern Card, placed below Curator's Picks) */}
        <section id="author-of-the-month" className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-margin-mobile md:px-margin-desktop my-12 rounded-3xl mx-4 md:mx-0 shadow-2xl border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <img
                alt="Author of the Month - Elara Vance"
                className="w-full h-full object-cover"
                src="/images/author-of-the-month.png"
              />
            </div>
            <div>
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md inline-block mb-4">
                Featured Spotlight
              </span>
              <h2 className="font-display-xl text-3xl sm:text-4xl text-white mb-2 font-extrabold">Author of the Month</h2>
              <h3 className="font-title-md text-2xl text-yellow-300 mb-6 font-bold">Elara Vance</h3>
              <p className="text-slate-300 mb-8 text-base sm:text-lg leading-relaxed font-normal">
                Elara Vance is a renowned novelist celebrated for her evocative prose and deep exploration of the human condition. With over a dozen bestselling titles, her work continues to captivate readers around the globe. Join us this month as we delve into her most compelling stories and uncover the inspiration behind her words.
              </p>
              <a
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-label-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-all font-bold cursor-pointer border border-white/20 shadow-sm hover:scale-105"
                onClick={() => {
                  const el = document.getElementById("curators-picks");
                  el?.scrollIntoView({ behavior: "smooth" });
                  showToast("Discovering other authors on Market Shop");
                }}
              >
                Discover other authors
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* 8. Seasonal Deals & New Releases Slideshow */}
        <section id="seasonal-deals" className="px-margin-mobile md:px-margin-desktop py-12 bg-gradient-to-br from-rose-50/60 via-amber-50/40 to-blue-50/60 my-10 rounded-3xl mx-4 md:mx-0 border border-rose-200/70 shadow-md overflow-hidden">
          <div className="flex justify-between items-end mb-8 px-4">
            <div className="flex items-center gap-3">
              <div>
                <span className="bg-gradient-to-r from-rose-500 to-red-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm inline-block mb-1.5">
                  🔥 Limited Time Offers
                </span>
                <h2 className="font-title-md text-2xl sm:text-3xl text-slate-900 font-bold">Seasonal Deals</h2>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollDeals("left")}
                aria-label="Previous Deals"
                className="w-10 h-10 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                onClick={() => scrollDeals("right")}
                aria-label="Next Deals"
                className="w-10 h-10 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div
            ref={dealsContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 px-4 no-scrollbar scroll-smooth"
          >
            {/* Deal Item 1 */}
            <div
              onClick={() => handleOpenProductModal("The story of the magic star", "info.vebryx@gmail.com", 105.00, "/images/books/the-story-of-the-magic-star.png", "Sci-Fi & Fantasy", 130.00)}
              className="min-w-[320px] flex-shrink-0 bg-white p-5 rounded-2xl shadow-md border border-slate-200 flex items-center gap-5 group cursor-pointer hover:shadow-xl hover:border-rose-300 transition-all duration-300"
            >
              <div className="w-24 h-36 bg-slate-100 flex-shrink-0 book-shadow overflow-hidden rounded-xl">
                <img
                  alt="The story of the magic star"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="/images/books/the-story-of-the-magic-star.png"
                />
              </div>
              <div>
                <span className="bg-rose-100 text-rose-700 font-label-sm uppercase tracking-wide text-xs px-2.5 py-0.5 rounded-md inline-block mb-1.5 font-bold">Save 19%</span>
                <h3 className="font-title-md text-base text-slate-900 mb-1 group-hover:text-blue-600 transition-colors font-bold">The story of the magic star</h3>
                <p className="text-xs text-rose-600 mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-bold"><span className="text-rose-600 mr-2 text-lg">$105.00</span><span className="line-through text-slate-400 text-sm">$130.00</span></p>
              </div>
            </div>

            {/* Deal Item 2 */}
            <div
              onClick={() => handleOpenProductModal("Miss P the Pirate", "info.vebryx@gmail.com", 5.00, "/images/books/miss-p-the-pirate.png", "Adventure & Sci-Fi", 6.99)}
              className="min-w-[320px] flex-shrink-0 bg-white p-5 rounded-2xl shadow-md border border-slate-200 flex items-center gap-5 group cursor-pointer hover:shadow-xl hover:border-rose-300 transition-all duration-300"
            >
              <div className="w-24 h-36 bg-slate-100 flex-shrink-0 book-shadow overflow-hidden rounded-xl">
                <img
                  alt="Miss P the Pirate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="/images/books/miss-p-the-pirate.png"
                />
              </div>
              <div>
                <span className="bg-rose-100 text-rose-700 font-label-sm uppercase tracking-wide text-xs px-2.5 py-0.5 rounded-md inline-block mb-1.5 font-bold">Save 28%</span>
                <h3 className="font-title-md text-base text-slate-900 mb-1 group-hover:text-blue-600 transition-colors font-bold">Miss P the Pirate</h3>
                <p className="text-xs text-rose-600 mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-bold"><span className="text-rose-600 mr-2 text-lg">$5.00</span><span className="line-through text-slate-400 text-sm">$6.99</span></p>
              </div>
            </div>

            {/* Deal Item 3 */}
            <div
              onClick={() => handleOpenProductModal("The whitre Abbott", "info.vebryx@gmail.com", 7.99, "/images/books/the-white-abbott.png", "Philosophy & Art", 10.99)}
              className="min-w-[320px] flex-shrink-0 bg-white p-5 rounded-2xl shadow-md border border-slate-200 flex items-center gap-5 group cursor-pointer hover:shadow-xl hover:border-rose-300 transition-all duration-300"
            >
              <div className="w-24 h-36 bg-slate-100 flex-shrink-0 book-shadow overflow-hidden rounded-xl">
                <img
                  alt="The whitre Abbott"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="/images/books/the-white-abbott.png"
                />
              </div>
              <div>
                <span className="bg-rose-100 text-rose-700 font-label-sm uppercase tracking-wide text-xs px-2.5 py-0.5 rounded-md inline-block mb-1.5 font-bold">Save 27%</span>
                <h3 className="font-title-md text-base text-slate-900 mb-1 group-hover:text-blue-600 transition-colors font-bold">The whitre Abbott</h3>
                <p className="text-xs text-rose-600 mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-bold"><span className="text-rose-600 mr-2 text-lg">$7.99</span><span className="line-through text-slate-400 text-sm">$10.99</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. About Us (Revamped with AI bookstore image, diagonal overlapping tile, and genuine story details) */}
        <section id="about-us" className="py-16 px-margin-mobile md:px-margin-desktop my-10 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border border-slate-200/80 rounded-3xl mx-4 md:mx-0 shadow-lg relative overflow-hidden">
          {/* Subtle decorative background blur shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            
            {/* Left Column: Rich About Us Narrative & Core Pillars */}
            <div className="lg:col-span-6 space-y-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Our Heritage &amp; Philosophy</span>
              </div>

              {/* Main Headline */}
              <h2 className="font-display-xl text-3xl sm:text-4xl lg:text-[40px] text-slate-900 font-extrabold leading-tight tracking-tight">
                More Than A Bookstore — <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">A Sanctuary for Passionate Readers</span>
              </h2>

              {/* Story Description */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                Market Shop began around a cozy kitchen table piled high with cherished paperbacks. We believed that in a fast-paced digital world, holding a physical book, smelling its pages, and finding quiet moments of wonder is one of life&apos;s purest joys.
              </p>

              {/* 3 Genuine About Us Pillars with Vibrant Gradient Icons */}
              <div className="space-y-5 pt-2">
                {/* Pillar 1: Handpicked Literary Curation */}
                <div className="flex items-start gap-4 sm:gap-5 p-3.5 rounded-2xl hover:bg-white/80 transition-colors border border-transparent hover:border-slate-200/60 shadow-none hover:shadow-sm">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/25">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">auto_stories</span>
                  </div>
                  <div>
                    <h3 className="font-title-md text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Handpicked Literary Curation
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Every book on our shelves is individually selected, inspected for pristine condition, and recommended by passionate bibliophiles who truly care about what you read.
                    </p>
                  </div>
                </div>

                {/* Pillar 2: Independent Heritage & Community */}
                <div className="flex items-start gap-4 sm:gap-5 p-3.5 rounded-2xl hover:bg-white/80 transition-colors border border-transparent hover:border-slate-200/60 shadow-none hover:shadow-sm">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-rose-500/25">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">diversity_3</span>
                  </div>
                  <div>
                    <h3 className="font-title-md text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Independent Heritage &amp; Direct UK Sellers
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      We champion independent UK publishers, local bookbinders, and rare edition hunters — ensuring literary treasures stay accessible, sustainable, and celebrated.
                    </p>
                  </div>
                </div>

                {/* Pillar 3: Packaged with Warmth */}
                <div className="flex items-start gap-4 sm:gap-5 p-3.5 rounded-2xl hover:bg-white/80 transition-colors border border-transparent hover:border-slate-200/60 shadow-none hover:shadow-sm">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/25">
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">favorite</span>
                  </div>
                  <div>
                    <h3 className="font-title-md text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Packaged With Personal Care
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      From our family to your doorstep, every single book is hand-wrapped in eco-friendly protective packaging, accompanied by curated bookmarks and quiet reading notes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistics & Story Trigger */}
              <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-slate-200/80">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">50K+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Happy Readers</div>
                </div>
                <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-rose-600">10K+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Curated Titles</div>
                </div>
                <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Family Run</div>
                </div>
              </div>
            </div>

            {/* Right Column: AI Bookstore Image + Diagonal Overlapping Tile */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-lg">
                {/* Main AI Image Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 group bg-slate-100">
                  <img
                    src="/images/about-us-bookstore.jpg"
                    alt="Market Shop Literary Sanctuary & Bookstore"
                    className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle gradient overlay at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Diagonal Overlapping Tile at the bottom of the image */}
                <div
                  onClick={() => showToast("Market Shop: Independent family-owned bookstore founded in 2018.")}
                  className="absolute -bottom-6 sm:-bottom-7 right-2 sm:right-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-2xl border-2 border-white/90 z-20 flex items-center gap-4 cursor-pointer hover:shadow-rose-600/40 hover:scale-105"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-inner">
                    <span className="material-symbols-outlined text-2xl">family_restroom</span>
                  </div>
                  <div>
                    <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase block leading-tight">
                      FAMILY OWNED &amp; RUN
                    </span>
                    <span className="font-medium text-[11px] sm:text-xs text-rose-100 block mt-0.5">
                      Curating with love since 2018
                    </span>
                  </div>
                </div>
              </div>

              {/* Story link below image */}
              <div
                onClick={() => showToast("Market Shop story: Founded as a family-run independent book seller.")}
                className="mt-12 sm:mt-14 flex items-center justify-center gap-2.5 text-sm font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer group"
              >
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold group-hover:translate-x-0.5 transition-transform">
                  ›
                </span>
                <span>Read about where it all began...</span>
              </div>
            </div>

          </div>
        </section>

        {/* 10. Browse by Genre (6 Genres in Circular Placeholders with Vibrant Gradients and Large Icons) */}
        <section id="genres-section" className="px-margin-mobile md:px-margin-desktop py-14 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-3">
              Explore Collections
            </span>
            <h2 className="font-title-md text-headline-lg text-ink-charcoal font-bold">Browse by Genre</h2>
            <p className="text-sm text-slate-600 mt-2 font-normal">Discover hand-curated shelves organized by mood, theme, and genre.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center">
            {genresList.map((genre) => (
              <a
                key={genre.id}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategory(genre.name);
                  showToast(`Browsing ${genre.name} collection`);
                }}
                className="group flex flex-col items-center cursor-pointer text-center"
                href={`#${genre.id}`}
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 group-hover:border-blue-500 group-hover:bg-blue-50/50 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center shadow-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="material-symbols-outlined text-4xl sm:text-5xl md:text-6xl text-blue-600 group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300 relative z-10">
                    {genre.icon}
                  </span>
                </div>
                <span className="font-title-md text-sm sm:text-base font-bold text-slate-900 mt-3.5 group-hover:text-blue-600 transition-colors">
                  {genre.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Second Marquee - Vibrant Gradient Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3 shadow-md marquee-container my-10">
          <div className="marquee-content font-label-sm text-label-sm text-white uppercase tracking-widest flex gap-12 font-bold">
            <span>✨ 5-Star Trustpilot Reviews</span>
            <span className="text-yellow-300">•</span>
            <span>🔥 Seasonal Deals Now Live</span>
            <span className="text-yellow-300">•</span>
            <span>📦 Fast UK Tracked Delivery</span>
            <span className="text-yellow-300">•</span>
            <span>📚 100% Handpicked Literary Editions</span>
            <span className="text-yellow-300">•</span>
            <span>✨ 5-Star Trustpilot Reviews</span>
            <span className="text-yellow-300">•</span>
            <span>🔥 Seasonal Deals Now Live</span>
            <span className="text-yellow-300">•</span>
            <span>📦 Fast UK Tracked Delivery</span>
            <span className="text-yellow-300">•</span>
            <span>📚 100% Handpicked Literary Editions</span>
          </div>
        </div>

        {/* 11. New Releases Grid (6 books) */}
        <section id="new-releases" className="px-margin-mobile md:px-margin-desktop py-12 scroll-mt-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block mb-2">
                Fresh Off The Press
              </span>
              <h2 className="font-title-md text-title-md text-ink-charcoal font-bold">New Releases</h2>
            </div>
            <a className="font-label-sm text-label-sm text-blue-600 uppercase hover:underline font-bold" href="#new-releases">View All</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Book 1 */}
            <div
              onClick={() => handleOpenProductModal("David Walliams Gangsta Granny", "info.vebryx@gmail.com", 5.99, "/images/books/gangsta-granny.png", "Children's Fiction", 7.99)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-slate-100 mb-3 rounded-2xl book-shadow overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-slate-200 relative">
                <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm z-10">
                  Sale -25%
                </div>
                <img
                  alt="David Walliams Gangsta Granny"
                  className="w-full h-full object-cover"
                  src="/images/books/gangsta-granny.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-0.5 font-mono">
                <span className="font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-rose-600 truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-slate-900 truncate mt-0.5 font-bold group-hover:text-blue-600 transition-colors">David Walliams Gangsta Granny</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-rose-600 mr-1.5 font-bold">$5.99</span>
                <span className="text-slate-400 line-through font-normal text-xs">$7.99</span>
              </p>
            </div>

            {/* Book 2 */}
            <div
              onClick={() => handleOpenProductModal("Adventures of the magic star", "info.vebryx@gmail.com", 5.99, "/images/books/adventures-of-the-magic-star.png", "Romance & Poetry", 7.00)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-slate-100 mb-3 rounded-2xl book-shadow overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-slate-200 relative">
                <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm z-10">
                  Sale -14%
                </div>
                <img
                  alt="Adventures of the magic star"
                  className="w-full h-full object-cover"
                  src="/images/books/adventures-of-the-magic-star.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-0.5 font-mono">
                <span className="font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-rose-600 truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-slate-900 truncate mt-0.5 font-bold group-hover:text-blue-600 transition-colors">Adventures of the magic star</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-rose-600 mr-1.5 font-bold">$5.99</span>
                <span className="text-slate-400 line-through font-normal text-xs">$7.00</span>
              </p>
            </div>

            {/* Book 3 */}
            <div
              onClick={() => handleOpenProductModal("Shadow of Decenit", "info.vebryx@gmail.com", 155.00, "/images/books/shadow-of-deceit.png", "Mystery & Thriller")}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-slate-100 mb-3 rounded-2xl book-shadow overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-slate-200 relative">
                <img
                  alt="Shadow of Decenit"
                  className="w-full h-full object-cover"
                  src="/images/books/shadow-of-deceit.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-0.5 font-mono">
                <span className="font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-rose-600 truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-slate-900 truncate mt-0.5 font-bold group-hover:text-blue-600 transition-colors">Shadow of Decenit</h3>
              <p className="font-body-lg text-sm font-semibold mt-1 text-slate-900 font-bold">$155.00</p>
            </div>

            {/* Book 4 */}
            <div
              onClick={() => handleOpenProductModal("The story of the magic star", "info.vebryx@gmail.com", 105.00, "/images/books/the-story-of-the-magic-star.png", "Sci-Fi & Fantasy", 130.00)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-slate-100 mb-3 rounded-2xl book-shadow overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-slate-200 relative">
                <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm z-10">
                  Sale -19%
                </div>
                <img
                  alt="The story of the magic star"
                  className="w-full h-full object-cover"
                  src="/images/books/the-story-of-the-magic-star.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-0.5 font-mono">
                <span className="font-bold">★ (5.00)</span>
              </div>
              <p className="text-[11px] text-rose-600 truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-slate-900 truncate mt-0.5 font-bold group-hover:text-blue-600 transition-colors">The story of the magic star</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-rose-600 mr-1.5 font-bold">$105.00</span>
                <span className="text-slate-400 line-through font-normal text-xs">$130.00</span>
              </p>
            </div>

            {/* Book 5 */}
            <div
              onClick={() => handleOpenProductModal("Miss P the Pirate", "info.vebryx@gmail.com", 5.00, "/images/books/miss-p-the-pirate.png", "Adventure & Sci-Fi", 6.99)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-slate-100 mb-3 rounded-2xl book-shadow overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-slate-200 relative">
                <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm z-10">
                  Sale -28%
                </div>
                <img
                  alt="Miss P the Pirate"
                  className="w-full h-full object-cover"
                  src="/images/books/miss-p-the-pirate.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-0.5 font-mono">
                <span className="font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-rose-600 truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-slate-900 truncate mt-0.5 font-bold group-hover:text-blue-600 transition-colors">Miss P the Pirate</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-rose-600 mr-1.5 font-bold">$5.00</span>
                <span className="text-slate-400 line-through font-normal text-xs">$6.99</span>
              </p>
            </div>

            {/* Book 6 */}
            <div
              onClick={() => handleOpenProductModal("The whitre Abbott", "info.vebryx@gmail.com", 7.99, "/images/books/the-white-abbott.png", "Philosophy & Art", 10.99)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-slate-100 mb-3 rounded-2xl book-shadow overflow-hidden group-hover:scale-105 transition-transform duration-300 border border-slate-200 relative">
                <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm z-10">
                  Sale -27%
                </div>
                <img
                  alt="The whitre Abbott"
                  className="w-full h-full object-cover"
                  src="/images/books/the-white-abbott.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-500 mb-0.5 font-mono">
                <span className="font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-rose-600 truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-slate-900 truncate mt-0.5 font-bold group-hover:text-blue-600 transition-colors">The whitre Abbott</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-rose-600 mr-1.5 font-bold">$7.99</span>
                <span className="text-slate-400 line-through font-normal text-xs">$10.99</span>
              </p>
            </div>
          </div>
        </section>

        {/* 12. Customer Reviews */}
        <section className="px-margin-mobile md:px-margin-desktop py-16 bg-slate-50/50 rounded-3xl my-8 border border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
              Verified Reader Feedback
            </span>
            <h2 className="font-title-md text-headline-lg text-ink-charcoal font-bold">What Readers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 relative shadow-md hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined text-blue-200 absolute top-5 right-5 text-4xl">format_quote</span>
              <div className="flex text-amber-400 mb-3.5">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-slate-700 italic mb-5 relative z-10 leading-relaxed">&quot;A truly magical bookstore experience online. The curation is exceptional, and my books arrived beautifully packaged within two days with custom bookmarks!&quot;</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">CM</div>
                <div>
                  <p className="font-label-sm text-slate-900 font-bold text-xs uppercase">— Claire M.</p>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px]">verified</span> Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 relative shadow-md hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined text-rose-200 absolute top-5 right-5 text-4xl">format_quote</span>
              <div className="flex text-amber-400 mb-3.5">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-slate-700 italic mb-5 relative z-10 leading-relaxed">&quot;I always find something unexpected and wonderful here. The rare editions section is a genuine treasure trove for collectors and enthusiasts.&quot;</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">JT</div>
                <div>
                  <p className="font-label-sm text-slate-900 font-bold text-xs uppercase">— James T.</p>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px]">verified</span> Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 relative shadow-md hover:shadow-lg transition-shadow">
              <span className="material-symbols-outlined text-purple-200 absolute top-5 right-5 text-4xl">format_quote</span>
              <div className="flex text-amber-400 mb-3.5">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
              </div>
              <p className="font-body-md text-slate-700 italic mb-5 relative z-10 leading-relaxed">&quot;The best place to discover new authors and hidden gems. The site is so vibrant, easy to browse, and customer service is outstanding!&quot;</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">AW</div>
                <div>
                  <p className="font-label-sm text-slate-900 font-bold text-xs uppercase">— Anita W.</p>
                  <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5"><span className="material-symbols-outlined text-[12px]">verified</span> Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Join Our Newsletter - Vibrant Gradient Card */}
        <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-16 px-margin-mobile md:px-margin-desktop rounded-3xl my-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <img
                alt="Newsletter Sign Up"
                className="w-full h-64 sm:h-80 object-cover"
                src="/images/newsletter.png"
              />
            </div>
            <div>
              <span className="bg-white/20 text-yellow-300 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider inline-block mb-3">
                Join 25,000+ Booklovers
              </span>
              <h2 className="font-display-xl text-3xl sm:text-4xl text-white mb-4 font-extrabold leading-tight">
                Curated Literary Joy in Your Inbox
              </h2>
              <p className="text-blue-100 mb-8 text-base sm:text-lg leading-relaxed font-normal">
                Subscribe to receive handpicked seasonal reading lists, author interviews, and exclusive subscriber-only rare edition discounts directly to your inbox.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-3.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Thank you for subscribing to Market Shop Newsletter!");
                }}
              >
                <input
                  className="flex-1 bg-white text-slate-900 placeholder-slate-400 rounded-xl py-3.5 px-5 border-2 border-white focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all text-sm font-medium shadow-md"
                  placeholder="Enter your email address..."
                  required
                  type="email"
                />
                <button
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap cursor-pointer text-sm"
                  type="submit"
                >
                  Subscribe Free
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Comprehensive Footer */}
      <footer className="bg-ink-charcoal text-surface-container py-16 px-margin-mobile md:px-margin-desktop mt-12 pb-24 md:pb-16 border-t border-outline">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            {/* Logo in footer without white background box */}
            <a href="#" className="inline-block mb-4">
              <img
                src="/images/logo.png"
                alt="Market Shop - Ocean of Book"
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
              />
            </a>
            <p className="text-outline-variant text-sm mb-6 leading-relaxed">
              Curating quiet moments and literary escapes since 2015. Buy direct from independent UK book sellers with fast tracked Royal Mail delivery.
            </p>
            <div className="flex gap-4">
              <a className="text-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">language</span></a>
              <a className="text-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
            </div>
          </div>
          <div>
            <h3 className="font-label-sm uppercase text-surface-bright tracking-wider mb-4 border-b border-outline pb-2 inline-block">Explore</h3>
            <ul className="space-y-3 text-sm text-outline-variant">
              <li><a className="hover:text-primary transition-colors" href="#fiction">Fiction &amp; Literature</a></li>
              <li><a className="hover:text-primary transition-colors" href="#non-fiction">Non-Fiction &amp; Biography</a></li>
              <li><a className="hover:text-primary transition-colors" href="#children">Children&apos;s Books</a></li>
              <li><a className="hover:text-primary transition-colors" href="#rare-editions">Rare &amp; Signed Editions</a></li>
              <li><a className="hover:text-primary transition-colors" href="#sale">Gift Cards</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-label-sm uppercase text-surface-bright tracking-wider mb-4 border-b border-outline pb-2 inline-block">About Us</h3>
            <ul className="space-y-3 text-sm text-outline-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Our Story</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Book Club</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Affiliate Program</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-label-sm uppercase text-surface-bright tracking-wider mb-4 border-b border-outline pb-2 inline-block">Support</h3>
            <ul className="space-y-3 text-sm text-outline-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Shipping &amp; Returns</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-container-max mx-auto mt-12 pt-8 border-t border-outline/30 text-center text-outline-variant text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 Market Shop • Ocean of Book. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-2xl">payments</span>
            <span className="material-symbols-outlined text-2xl">credit_card</span>
            <span className="material-symbols-outlined text-2xl">account_balance</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Home, Account, Shop, Cart) */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white rounded-t-3xl shadow-[0_-6px_25px_rgba(0,0,0,0.12)] border-t border-slate-100 px-3 py-2.5">
        <div className="grid grid-cols-4 items-center">
          {/* 1. Home */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-center justify-center text-slate-900 hover:text-primary transition-colors py-1 cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">home</span>
            <span className="text-[11px] font-bold text-slate-900 mt-1">Home</span>
          </a>

          {/* 2. Account / Wishlist */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsWishlistOpen(true);
            }}
            className="flex flex-col items-center justify-center text-slate-900 hover:text-primary transition-colors py-1 cursor-pointer group relative"
          >
            <div className="relative inline-flex">
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">person</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-secondary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-slate-900 mt-1">Account</span>
          </a>

          {/* 3. Shop */}
          <a
            href="#curators-picks"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("curators-picks");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center justify-center text-slate-900 hover:text-primary transition-colors py-1 cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">shopping_bag</span>
            <span className="text-[11px] font-bold text-slate-900 mt-1">Shop</span>
          </a>

          {/* 4. Cart (opens Cart drawer from left) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsCartOpen(true);
            }}
            className="flex flex-col items-center justify-center text-slate-900 hover:text-primary transition-colors py-1 cursor-pointer group relative"
          >
            <div className="relative inline-flex">
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">shopping_cart</span>
              <span className="absolute -top-1.5 -right-2.5 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none shadow-sm">
                {totalItems}
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-900 mt-1">Cart</span>
          </a>
        </div>
      </nav>

      {/* Slide-out Cart Drawer from LEFT (1/4 of page) */}
      <CartDrawer onOpenQuickView={(prod) => {
        setSelectedProduct(prod);
        setIsQuickViewOpen(true);
      }} />

      {/* Slide-out Wishlist / Favorites Drawer from LEFT (1/4 of page) */}
      <WishlistDrawer onOpenQuickView={(prod) => {
        setSelectedProduct(prod);
        setIsQuickViewOpen(true);
      }} />

      {/* Quick View Inspection Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setSelectedProduct(null);
        }}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </>
  );
}
