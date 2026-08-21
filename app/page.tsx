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
      {/* 1. Top Bar */}
      <div className="bg-surface-container-highest text-on-surface text-center py-2 px-margin-mobile md:px-margin-desktop text-sm flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 border-b border-muted-border">
        <div className="flex items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: "16px" }}>star</span>
          <span className="ml-1 text-on-surface font-semibold text-xs">Trustpilot 4.9/5</span>
          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#3bff55]/20 text-[#127020] border border-[#3bff55]/40">
            Verified Store
          </span>
        </div>
        <span className="font-quote-text italic text-on-surface-variant text-sm md:text-base hidden md:block">
          &quot;A room without books is like a body without a soul.&quot;
        </span>
      </div>

      {/* 2 & 3. Navigation Header */}
      <header className="w-full top-0 bg-[#fafafa]/95 backdrop-blur-md flex flex-col w-full max-w-container-max mx-auto px-margin-desktop hidden md:flex border-b border-muted-border sticky z-40 transition-all">
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
                  ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                  : "text-on-surface-variant hover:text-secondary"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Fiction"); }}
            >
              Fiction
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-semibold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Non-Fiction"
                  ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                  : "text-on-surface-variant hover:text-secondary"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Non-Fiction"); }}
            >
              Non-Fiction
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-semibold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Rare Editions"
                  ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                  : "text-on-surface-variant hover:text-secondary"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Rare Editions"); }}
            >
              Rare Editions
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-semibold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Poetry"
                  ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                  : "text-on-surface-variant hover:text-secondary"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Poetry"); }}
            >
              Poetry
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-semibold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Children"
                  ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                  : "text-on-surface-variant hover:text-secondary"
              }`}
              href="#curators-picks"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Children"); }}
            >
              Children
            </a>
            <a
              className={`font-title-md text-sm lg:text-base font-bold transition-all duration-200 hover:scale-105 ${
                activeCategory === "Sale"
                  ? "text-secondary border-b-2 border-secondary pb-0.5"
                  : "text-secondary hover:text-secondary-container"
              }`}
              href="#seasonal-deals"
              onClick={(e) => { e.preventDefault(); setActiveCategory("Sale"); }}
            >
              Sale
            </a>
          </nav>

          {/* Right Controls: Search Expand Icon, Favorites, Cart */}
          <div className="flex items-center gap-4 relative">
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
                className={`p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isSearchOpen
                    ? "bg-primary text-white shadow-md scale-105"
                    : "text-primary hover:bg-surface-container hover:text-secondary"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>
                  {isSearchOpen ? "close" : "search"}
                </span>
              </button>

              {/* Expandable Search Bar Dropdown right below Search Button */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 sm:w-96 bg-white border border-muted-border shadow-2xl rounded-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">search</span>
                    <input
                      ref={searchInputRef}
                      className="w-full bg-[#f4f4f4] rounded-xl py-2.5 pl-10 pr-9 border border-muted-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-sm font-medium text-ink-charcoal"
                      placeholder="Search authors, titles, genres..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 p-1 text-outline hover:text-ink-charcoal text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-muted-border flex items-center justify-between text-[11px] text-outline font-mono">
                    <span>Search 6 verified titles</span>
                    <span className="text-secondary font-semibold">Instant results</span>
                  </div>
                </div>
              )}
            </div>

            {/* Favorites / Wishlist Button */}
            <button
              aria-label="Favorites"
              onClick={() => setIsWishlistOpen(true)}
              className="text-primary hover:text-secondary transition-colors duration-200 relative p-1.5 rounded-full hover:bg-surface-container cursor-pointer"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "26px", fontVariationSettings: wishlistCount > 0 ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
              {wishlistCount > 0 && (
                <span className="absolute 0 top-0 right-0 bg-secondary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              className="text-primary hover:text-secondary transition-colors duration-200 relative p-1.5 rounded-full hover:bg-surface-container cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "26px" }}>shopping_bag</span>
              <span className="absolute 0 top-0 right-0 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center px-margin-mobile py-3 bg-[#fafafa] sticky top-0 z-40 border-b border-muted-border">
        <a className="flex items-center" href="#">
          <img
            src="/images/logo.png"
            alt="Market Shop - Ocean of Book"
            className="h-8 w-auto object-contain mix-blend-multiply"
          />
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (!isSearchOpen) {
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }
            }}
            aria-label="Search"
            className="text-on-surface hover:text-primary p-1"
          >
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Favorites"
            className="text-on-surface hover:text-secondary relative p-1"
          >
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: wishlistCount > 0 ? "'FILL' 1" : "'FILL' 0" }}>
              favorite
            </span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
            className="text-on-surface hover:text-primary relative p-1"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Search Bar Dropdown */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-3 bg-white border-b border-muted-border shadow-md">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">search</span>
            <input
              ref={searchInputRef}
              className="w-full bg-[#f4f4f4] rounded-xl py-2.5 pl-10 pr-9 border border-muted-border focus:outline-none focus:border-primary text-sm font-medium text-ink-charcoal"
              placeholder="Search authors, titles, genres..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 p-1 text-outline hover:text-ink-charcoal text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Trust Bar */}
      <div className="bg-sage-haze py-3 border-y border-muted-border">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-center gap-8 md:gap-16 text-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
            <span className="font-label-sm text-label-sm text-ink-charcoal uppercase tracking-wider">Quick UK Delivery</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="material-symbols-outlined text-[#18a12d] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="font-label-sm text-label-sm text-ink-charcoal uppercase tracking-wider">Money Back Guarantee</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm">health_and_safety</span>
            <span className="font-label-sm text-label-sm text-ink-charcoal uppercase tracking-wider">Trusted Nationwide</span>
          </div>
        </div>
      </div>

      <main className="max-w-container-max mx-auto w-full">
        {/* 5. Hero Section */}
        <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop text-center">
          <h1 className="font-display-xl text-headline-lg-mobile md:text-display-xl text-ink-charcoal mb-6 max-w-3xl mx-auto font-extrabold tracking-tight">
            Curating Quiet Moments for Every Reader
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 font-normal">
            Discover a carefully selected collection of literature designed to inspire, comfort, and transport you. Explore our shelves and find your next escape with direct UK independent sellers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("curators-picks");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider py-4 px-8 rounded-xl transition-colors shadow-sm cursor-pointer font-bold"
            >
              Shop Collection
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("genres-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-ink-charcoal text-ink-charcoal hover:bg-surface-container font-label-sm text-label-sm uppercase tracking-wider py-4 px-8 rounded-xl transition-colors cursor-pointer font-bold"
            >
              Explore Genres
            </button>
          </div>
        </section>

        {/* Moving Marquee Bar (Relocated below Hero Section) */}
        <div className="bg-surface-container-high py-2.5 border-y border-muted-border marquee-container my-4">
          <div className="marquee-content font-label-sm text-label-sm text-on-surface uppercase tracking-wider flex gap-12 font-bold">
            <span>Excellent Reviews</span>
            <span className="text-primary">•</span>
            <span>New Arrivals Just In</span>
            <span className="text-secondary">•</span>
            <span>Seasonal Deals Now Live</span>
            <span className="text-[#18a12d]">•</span>
            <span>Direct UK Sellers</span>
            <span className="text-primary">•</span>
            <span>Excellent Reviews</span>
            <span className="text-primary">•</span>
            <span>New Arrivals Just In</span>
            <span className="text-secondary">•</span>
            <span>Seasonal Deals Now Live</span>
            <span className="text-[#18a12d]">•</span>
            <span>Direct UK Sellers</span>
          </div>
        </div>

        {/* 6. Featured Books: Curator's Picks */}
        <section id="curators-picks" className="px-margin-mobile md:px-margin-desktop py-12 scroll-mt-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-title-md text-title-md text-ink-charcoal font-bold">Curator&apos;s Picks</h2>
            <a className="font-label-sm text-label-sm text-primary uppercase hover:underline font-bold" href="#curators-picks">View All</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book 1 */}
            <div
              onClick={() => handleOpenProductModal("David Walliams Gangsta Granny", "info.vebryx@gmail.com", 5.99, "/images/books/gangsta-granny.png", "Curator's Choice", 7.99)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-container mb-4 overflow-hidden border border-muted-border rounded-xl book-shadow transition-all duration-300 lift-on-hover relative">
                <div className="absolute top-2 left-2 bg-secondary text-on-secondary text-xs px-2 py-0.5 uppercase font-bold rounded-lg shadow-sm z-10">
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
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow hover:bg-white text-secondary transition-transform hover:scale-110 z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isInWishlist("david-walliams-gangsta-granny") ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <img
                  className="w-full h-full object-cover"
                  data-alt="Cover of David Walliams Gangsta Granny"
                  alt="Cover of David Walliams Gangsta Granny"
                  src="/images/books/gangsta-granny.png"
                />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-outline mb-1 font-mono">
                  <span className="text-primary font-bold">★ (0)</span>
                </div>
                <h3 className="font-title-md text-title-md text-ink-charcoal mb-1">David Walliams Gangsta Granny</h3>
                <p className="font-body-md text-xs text-secondary mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-body-lg text-body-lg font-semibold mb-4">
                  <span className="text-secondary mr-2">$5.99</span>
                  <span className="text-outline line-through font-normal text-sm">$7.99</span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartQuick("David Walliams Gangsta Granny", "info.vebryx@gmail.com", 5.99, "/images/books/gangsta-granny.png", "Children's Fiction");
                  }}
                  className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-ink-charcoal font-label-sm text-label-sm uppercase py-3 border border-muted-border rounded-xl transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Book 2 */}
            <div
              onClick={() => handleOpenProductModal("Adventures of the magic star", "info.vebryx@gmail.com", 5.99, "/images/books/adventures-of-the-magic-star.png", "Curator's Choice", 7.00)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-container mb-4 overflow-hidden border border-muted-border rounded-xl book-shadow transition-all duration-300 lift-on-hover relative">
                <div className="absolute top-2 left-2 bg-secondary text-on-secondary text-xs px-2 py-0.5 uppercase font-bold rounded-lg shadow-sm z-10">
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
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow hover:bg-white text-secondary transition-transform hover:scale-110 z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isInWishlist("adventures-of-the-magic-star") ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <img
                  className="w-full h-full object-cover"
                  data-alt="Cover of Adventures of the magic star"
                  alt="Cover of Adventures of the magic star"
                  src="/images/books/adventures-of-the-magic-star.png"
                />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-outline mb-1 font-mono">
                  <span className="text-primary font-bold">★ (0)</span>
                </div>
                <h3 className="font-title-md text-title-md text-ink-charcoal mb-1">Adventures of the magic star</h3>
                <p className="font-body-md text-xs text-secondary mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-body-lg text-body-lg font-semibold mb-4">
                  <span className="text-secondary mr-2">$5.99</span>
                  <span className="text-outline line-through font-normal text-sm">$7.00</span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartQuick("Adventures of the magic star", "info.vebryx@gmail.com", 5.99, "/images/books/adventures-of-the-magic-star.png", "Adventure & Romance");
                  }}
                  className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-ink-charcoal font-label-sm text-label-sm uppercase py-3 border border-muted-border rounded-xl transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Book 3 */}
            <div
              onClick={() => handleOpenProductModal("Shadow of Decenit", "info.vebryx@gmail.com", 155.00, "/images/books/shadow-of-deceit.png", "Curator's Choice")}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-container mb-4 overflow-hidden border border-muted-border rounded-xl book-shadow transition-all duration-300 lift-on-hover relative">
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
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow hover:bg-white text-secondary transition-transform hover:scale-110 z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isInWishlist("shadow-of-decenit") ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <img
                  className="w-full h-full object-cover"
                  data-alt="Cover of Shadow of Decenit"
                  alt="Cover of Shadow of Decenit"
                  src="/images/books/shadow-of-deceit.png"
                />
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-outline mb-1 font-mono">
                  <span className="text-primary font-bold">★ (0)</span>
                </div>
                <h3 className="font-title-md text-title-md text-ink-charcoal mb-1">Shadow of Decenit</h3>
                <p className="font-body-md text-xs text-secondary mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-body-lg text-body-lg font-semibold mb-4 text-ink-charcoal">
                  $155.00
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartQuick("Shadow of Decenit", "info.vebryx@gmail.com", 155.00, "/images/books/shadow-of-deceit.png", "Mystery & Thriller");
                  }}
                  className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-ink-charcoal font-label-sm text-label-sm uppercase py-3 border border-muted-border rounded-xl transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Author of the Month (Placed below Curator's Picks) */}
        <section id="author-of-the-month" className="bg-surface-container-highest/70 py-16 px-margin-mobile md:px-margin-desktop my-8 border-y border-muted-border rounded-2xl mx-4 md:mx-0">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                alt="Author of the Month - Elara Vance"
                className="w-full h-full object-cover"
                src="/images/author-of-the-month.png"
              />
            </div>
            <div>
              <h2 className="font-title-md text-headline-lg text-ink-charcoal mb-4">Author of the Month</h2>
              <h3 className="font-title-md text-2xl text-primary mb-6">Elara Vance</h3>
              <p className="text-on-surface-variant mb-8 text-lg leading-relaxed">
                Elara Vance is a renowned novelist celebrated for her evocative prose and deep exploration of the human condition. With over a dozen bestselling titles, her work continues to captivate readers around the globe. Join us this month as we delve into her most compelling stories and uncover the inspiration behind her words.
              </p>
              <a
                className="inline-flex items-center gap-2 text-primary font-label-sm uppercase tracking-wider hover:text-primary-container transition-colors font-bold cursor-pointer"
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
        <section id="seasonal-deals" className="px-margin-mobile md:px-margin-desktop py-12 bg-sage-haze my-8 rounded-2xl mx-4 md:mx-0 border border-muted-border overflow-hidden">
          <div className="flex justify-between items-end mb-8 px-4">
            <div className="flex items-center gap-3">
              <h2 className="font-title-md text-headline-lg text-ink-charcoal">Seasonal Deals</h2>
              <span className="bg-[#3bff55]/20 text-[#106b1e] border border-[#3bff55]/50 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                Live Now
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollDeals("left")}
                aria-label="Previous Deals"
                className="w-10 h-10 rounded-full border border-ink-charcoal flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                onClick={() => scrollDeals("right")}
                aria-label="Next Deals"
                className="w-10 h-10 rounded-full border border-ink-charcoal flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
          <div
            ref={dealsContainerRef}
            className="flex overflow-x-auto gap-6 pb-8 px-4 no-scrollbar scroll-smooth"
          >
            {/* Deal Item 1 */}
            <div
              onClick={() => handleOpenProductModal("The story of the magic star", "info.vebryx@gmail.com", 105.00, "/images/books/the-story-of-the-magic-star.png", "Sci-Fi & Fantasy", 130.00)}
              className="min-w-[300px] flex-shrink-0 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-muted-border flex items-center gap-6 group cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-36 bg-surface-variant flex-shrink-0 book-shadow overflow-hidden rounded-xl">
                <img
                  alt="The story of the magic star"
                  className="w-full h-full object-cover"
                  src="/images/books/the-story-of-the-magic-star.png"
                />
              </div>
              <div>
                <span className="text-secondary font-label-sm uppercase tracking-wide block mb-1 font-bold">Save 19%</span>
                <h3 className="font-title-md text-ink-charcoal mb-1 group-hover:text-primary transition-colors">The story of the magic star</h3>
                <p className="text-xs text-secondary mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-semibold"><span className="text-secondary mr-2">$105.00</span><span className="line-through text-outline text-sm">$130.00</span></p>
              </div>
            </div>

            {/* Deal Item 2 */}
            <div
              onClick={() => handleOpenProductModal("Miss P the Pirate", "info.vebryx@gmail.com", 5.00, "/images/books/miss-p-the-pirate.png", "Adventure & Sci-Fi", 6.99)}
              className="min-w-[300px] flex-shrink-0 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-muted-border flex items-center gap-6 group cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-36 bg-surface-variant flex-shrink-0 book-shadow overflow-hidden rounded-xl">
                <img
                  alt="Miss P the Pirate"
                  className="w-full h-full object-cover"
                  src="/images/books/miss-p-the-pirate.png"
                />
              </div>
              <div>
                <span className="text-secondary font-label-sm uppercase tracking-wide block mb-1 font-bold">Save 28%</span>
                <h3 className="font-title-md text-ink-charcoal mb-1 group-hover:text-primary transition-colors">Miss P the Pirate</h3>
                <p className="text-xs text-secondary mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-semibold"><span className="text-secondary mr-2">$5.00</span><span className="line-through text-outline text-sm">$6.99</span></p>
              </div>
            </div>

            {/* Deal Item 3 */}
            <div
              onClick={() => handleOpenProductModal("The whitre Abbott", "info.vebryx@gmail.com", 7.99, "/images/books/the-white-abbott.png", "Philosophy & Art", 10.99)}
              className="min-w-[300px] flex-shrink-0 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-muted-border flex items-center gap-6 group cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-36 bg-surface-variant flex-shrink-0 book-shadow overflow-hidden rounded-xl">
                <img
                  alt="The whitre Abbott"
                  className="w-full h-full object-cover"
                  src="/images/books/the-white-abbott.png"
                />
              </div>
              <div>
                <span className="text-secondary font-label-sm uppercase tracking-wide block mb-1 font-bold">Save 27%</span>
                <h3 className="font-title-md text-ink-charcoal mb-1 group-hover:text-primary transition-colors">The whitre Abbott</h3>
                <p className="text-xs text-secondary mb-2 font-mono">By: info.vebryx@gmail.com</p>
                <p className="font-semibold"><span className="text-secondary mr-2">$7.99</span><span className="line-through text-outline text-sm">$10.99</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. About Us (Revamped section based on attached image, placed above Browse by Genre) */}
        <section id="about-us" className="py-16 px-margin-mobile md:px-margin-desktop my-8 bg-white border-y border-muted-border rounded-2xl mx-4 md:mx-0 shadow-sm">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
            
            {/* Left Column: 3 Value Props with Circular Outline Badges */}
            <div className="lg:col-span-6 space-y-9">
              {/* Feature 1: Quick Delivery */}
              <div className="flex items-center gap-5 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-200 bg-[#fafafa] flex items-center justify-center text-slate-800 flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl text-slate-800">
                    inventory_2
                  </span>
                </div>
                <div>
                  <h3 className="font-title-md text-lg sm:text-xl font-bold text-[#b90538] leading-snug">
                    Quick Delivery
                  </h3>
                  <p className="text-sm text-slate-600 font-medium mt-1">
                    Orders are delivered within 2 working days*
                  </p>
                </div>
              </div>

              {/* Feature 2: Money-back Guarantee */}
              <div className="flex items-center gap-5 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-200 bg-[#fafafa] flex items-center justify-center text-slate-800 flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl text-slate-800">
                    verified_user
                  </span>
                </div>
                <div>
                  <h3 className="font-title-md text-lg sm:text-xl font-bold text-[#b90538] leading-snug">
                    Money-back Guarantee
                  </h3>
                  <p className="text-sm text-slate-600 font-medium mt-1">
                    We&apos;re proud to offer a 100-day no-quibble money-back guarantee
                  </p>
                </div>
              </div>

              {/* Feature 3: Hassle-free Returns */}
              <div className="flex items-center gap-5 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-200 bg-[#fafafa] flex items-center justify-center text-slate-800 flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl text-slate-800">
                    shopping_cart_checkout
                  </span>
                </div>
                <div>
                  <h3 className="font-title-md text-lg sm:text-xl font-bold text-[#b90538] leading-snug">
                    Hassle-free Returns
                  </h3>
                  <p className="text-sm text-slate-600 font-medium mt-1">
                    We&apos;ve made returning items quick &amp; easy
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Family Photo + Oval Badge + Story Link */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src="/images/family-photo.png"
                  alt="Market Shop Family"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Red Curved Pill Badge */}
              <div className="mt-4 sm:mt-5 text-center">
                <div className="bg-[#c8102e] text-white px-8 py-3 rounded-full shadow-md inline-block">
                  <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase block">
                    FAMILY OWNED
                  </span>
                  <span className="font-extrabold text-sm sm:text-base tracking-wider uppercase block">
                    &amp; RUN SINCE 2018
                  </span>
                </div>

                {/* Read story link */}
                <div
                  onClick={() => showToast("Market Shop story: Founded as a family-run independent book seller.")}
                  className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-[#c8102e] hover:underline cursor-pointer"
                >
                  <span className="w-4 h-4 rounded-full bg-[#1b2a4a] text-white flex items-center justify-center text-[10px] font-bold">
                    ›
                  </span>
                  <span>Read about where it all began...</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 10. Browse by Genre (6 Genres in Circular Placeholders with Large Filling Icons) */}
        <section id="genres-section" className="px-margin-mobile md:px-margin-desktop py-14 scroll-mt-20">
          <h2 className="font-title-md text-headline-lg text-ink-charcoal text-center mb-10">Browse by Genre</h2>
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
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-white border-2 border-muted-border group-hover:border-primary group-hover:bg-primary/5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-4xl sm:text-5xl md:text-6xl text-primary group-hover:scale-110 transition-transform duration-300">
                    {genre.icon}
                  </span>
                </div>
                <span className="font-title-md text-sm sm:text-base font-bold text-ink-charcoal mt-3.5 group-hover:text-primary transition-colors">
                  {genre.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Second Marquee */}
        <div className="bg-surface-container-high py-2 border-y border-muted-border marquee-container my-8">
          <div className="marquee-content font-label-sm text-label-sm text-on-surface uppercase tracking-wider flex gap-12 font-bold">
            <span>Excellent Reviews</span>
            <span className="text-primary">•</span>
            <span>New Arrivals Just In</span>
            <span className="text-secondary">•</span>
            <span>Seasonal Deals Now Live</span>
            <span className="text-[#18a12d]">•</span>
            <span>Direct UK Sellers</span>
            <span className="text-primary">•</span>
            <span>Excellent Reviews</span>
            <span className="text-primary">•</span>
            <span>New Arrivals Just In</span>
            <span className="text-secondary">•</span>
            <span>Seasonal Deals Now Live</span>
            <span className="text-[#18a12d]">•</span>
            <span>Direct UK Sellers</span>
          </div>
        </div>

        {/* 11. New Releases Grid (6 books) */}
        <section id="new-releases" className="px-margin-mobile md:px-margin-desktop py-12 scroll-mt-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-title-md text-title-md text-ink-charcoal font-bold">New Releases</h2>
            <a className="font-label-sm text-label-sm text-primary uppercase hover:underline font-bold" href="#new-releases">View All</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Book 1 */}
            <div
              onClick={() => handleOpenProductModal("David Walliams Gangsta Granny", "info.vebryx@gmail.com", 5.99, "/images/books/gangsta-granny.png", "Children's Fiction", 7.99)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded-xl book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border relative">
                <div className="absolute top-1.5 left-1.5 bg-secondary text-on-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm z-10">
                  Sale -25%
                </div>
                <img
                  alt="David Walliams Gangsta Granny"
                  className="w-full h-full object-cover"
                  src="/images/books/gangsta-granny.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-outline mb-0.5 font-mono">
                <span className="text-primary font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-secondary truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5 font-bold">David Walliams Gangsta Granny</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5 font-bold">$5.99</span>
                <span className="text-outline line-through font-normal text-xs">$7.99</span>
              </p>
            </div>

            {/* Book 2 */}
            <div
              onClick={() => handleOpenProductModal("Adventures of the magic star", "info.vebryx@gmail.com", 5.99, "/images/books/adventures-of-the-magic-star.png", "Romance & Poetry", 7.00)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded-xl book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border relative">
                <div className="absolute top-1.5 left-1.5 bg-secondary text-on-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm z-10">
                  Sale -14%
                </div>
                <img
                  alt="Adventures of the magic star"
                  className="w-full h-full object-cover"
                  src="/images/books/adventures-of-the-magic-star.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-outline mb-0.5 font-mono">
                <span className="text-primary font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-secondary truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5 font-bold">Adventures of the magic star</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5 font-bold">$5.99</span>
                <span className="text-outline line-through font-normal text-xs">$7.00</span>
              </p>
            </div>

            {/* Book 3 */}
            <div
              onClick={() => handleOpenProductModal("Shadow of Decenit", "info.vebryx@gmail.com", 155.00, "/images/books/shadow-of-deceit.png", "Mystery & Thriller")}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded-xl book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border relative">
                <img
                  alt="Shadow of Decenit"
                  className="w-full h-full object-cover"
                  src="/images/books/shadow-of-deceit.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-outline mb-0.5 font-mono">
                <span className="text-primary font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-secondary truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5 font-bold">Shadow of Decenit</h3>
              <p className="font-body-lg text-sm font-semibold mt-1 text-ink-charcoal font-bold">$155.00</p>
            </div>

            {/* Book 4 */}
            <div
              onClick={() => handleOpenProductModal("The story of the magic star", "info.vebryx@gmail.com", 105.00, "/images/books/the-story-of-the-magic-star.png", "Sci-Fi & Fantasy", 130.00)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded-xl book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border relative">
                <div className="absolute top-1.5 left-1.5 bg-secondary text-on-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm z-10">
                  Sale -19%
                </div>
                <img
                  alt="The story of the magic star"
                  className="w-full h-full object-cover"
                  src="/images/books/the-story-of-the-magic-star.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-outline mb-0.5 font-mono">
                <span className="text-primary font-bold">★ (5.00)</span>
              </div>
              <p className="text-[11px] text-secondary truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5 font-bold">The story of the magic star</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5 font-bold">$105.00</span>
                <span className="text-outline line-through font-normal text-xs">$130.00</span>
              </p>
            </div>

            {/* Book 5 */}
            <div
              onClick={() => handleOpenProductModal("Miss P the Pirate", "info.vebryx@gmail.com", 5.00, "/images/books/miss-p-the-pirate.png", "Adventure & Sci-Fi", 6.99)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded-xl book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border relative">
                <div className="absolute top-1.5 left-1.5 bg-secondary text-on-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm z-10">
                  Sale -28%
                </div>
                <img
                  alt="Miss P the Pirate"
                  className="w-full h-full object-cover"
                  src="/images/books/miss-p-the-pirate.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-outline mb-0.5 font-mono">
                <span className="text-primary font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-secondary truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5 font-bold">Miss P the Pirate</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5 font-bold">$5.00</span>
                <span className="text-outline line-through font-normal text-xs">$6.99</span>
              </p>
            </div>

            {/* Book 6 */}
            <div
              onClick={() => handleOpenProductModal("The whitre Abbott", "info.vebryx@gmail.com", 7.99, "/images/books/the-white-abbott.png", "Philosophy & Art", 10.99)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded-xl book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border relative">
                <div className="absolute top-1.5 left-1.5 bg-secondary text-on-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-sm z-10">
                  Sale -27%
                </div>
                <img
                  alt="The whitre Abbott"
                  className="w-full h-full object-cover"
                  src="/images/books/the-white-abbott.png"
                />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-outline mb-0.5 font-mono">
                <span className="text-primary font-bold">★ (0)</span>
              </div>
              <p className="text-[11px] text-secondary truncate font-mono">By: info.vebryx@gmail.com</p>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5 font-bold">The whitre Abbott</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5 font-bold">$7.99</span>
                <span className="text-outline line-through font-normal text-xs">$10.99</span>
              </p>
            </div>
          </div>
        </section>

        {/* 12. Customer Reviews */}
        <section className="px-margin-mobile md:px-margin-desktop py-16">
          <h2 className="font-title-md text-headline-lg text-ink-charcoal text-center mb-10 font-bold">What Readers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-surface-container p-6 rounded-xl border border-muted-border relative shadow-sm">
              <span className="material-symbols-outlined text-outline-variant absolute top-4 right-4 text-4xl opacity-50">format_quote</span>
              <div className="flex text-primary mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-on-surface-variant italic mb-4 relative z-10">&quot;A truly magical bookstore experience online. The curation is exceptional, and my books arrived beautifully packaged within two days.&quot;</p>
              <p className="font-label-sm text-ink-charcoal uppercase font-bold">— Claire M.</p>
            </div>

            {/* Review 2 */}
            <div className="bg-surface-container p-6 rounded-xl border border-muted-border relative shadow-sm">
              <span className="material-symbols-outlined text-outline-variant absolute top-4 right-4 text-4xl opacity-50">format_quote</span>
              <div className="flex text-primary mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-on-surface-variant italic mb-4 relative z-10">&quot;I always find something unexpected and wonderful here. The rare editions section is a treasure trove for collectors.&quot;</p>
              <p className="font-label-sm text-ink-charcoal uppercase font-bold">— James T.</p>
            </div>

            {/* Review 3 */}
            <div className="bg-surface-container p-6 rounded-xl border border-muted-border relative shadow-sm">
              <span className="material-symbols-outlined text-outline-variant absolute top-4 right-4 text-4xl opacity-50">format_quote</span>
              <div className="flex text-primary mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
              </div>
              <p className="font-body-md text-on-surface-variant italic mb-4 relative z-10">&quot;The best place to discover new authors. The site is incredibly easy to navigate and aesthetically so pleasing. Highly recommend.&quot;</p>
              <p className="font-label-sm text-ink-charcoal uppercase font-bold">— Anita W.</p>
            </div>
          </div>
        </section>

        {/* 13. Join Our Newsletter */}
        <section className="bg-surface-container py-16 px-margin-mobile md:px-margin-desktop border-t border-muted-border">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                alt="Newsletter Sign Up"
                className="w-full h-full object-cover"
                src="/images/newsletter.png"
              />
            </div>
            <div>
              <h2 className="font-title-md text-headline-lg text-ink-charcoal mb-4 font-bold">Join Our Newsletter</h2>
              <p className="text-on-surface-variant mb-8 text-lg leading-relaxed">
                Subscribe to receive curated reading lists, exclusive offers, and the latest news from Market Shop directly to your inbox.
              </p>
              <form
                className="flex flex-col sm:flex-row gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Thank you for subscribing to Market Shop Newsletter!");
                }}
              >
                <input
                  className="flex-1 bg-surface-container-lowest rounded-xl py-3 px-4 border border-muted-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-body-md font-body-md"
                  placeholder="Enter your email address"
                  required
                  type="email"
                />
                <button
                  className="bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider py-3 px-8 rounded-xl transition-colors shadow-sm whitespace-nowrap font-bold cursor-pointer"
                  type="submit"
                >
                  Subscribe
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
