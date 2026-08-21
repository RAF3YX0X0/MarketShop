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

  const [searchQuery, setSearchQuery] = useState("");
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

      {/* 2 & 3. Navigation */}
      <header className="w-full top-0 bg-paper-cream flex flex-col w-full max-w-container-max mx-auto px-margin-desktop hidden md:flex border-b border-muted-border sticky z-40">
        <div className="py-5 flex justify-between items-center w-full">
          {/* Logo with transparent background using mix-blend-multiply */}
          <a className="hover:scale-105 transition-transform flex items-center" href="#">
            <img
              src="/images/logo.png"
              alt="Market Shop - Ocean of Book"
              className="h-12 w-auto object-contain mix-blend-multiply"
            />
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full bg-surface-container rounded-full py-3 pl-12 pr-6 border border-muted-border focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-body-md font-body-md"
              placeholder="Search authors, titles, or genres..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* User Controls: Favorites & Cart both slide out from LEFT side */}
          <div className="flex items-center gap-6">
            {/* Favorites / Wishlist Button */}
            <button
              aria-label="Favorites"
              onClick={() => setIsWishlistOpen(true)}
              className="text-primary hover:text-secondary transition-colors duration-200 relative p-1 cursor-pointer"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "28px", fontVariationSettings: wishlistCount > 0 ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              className="text-primary hover:text-secondary transition-colors duration-200 relative p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>shopping_bag</span>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
        <nav className="flex justify-center gap-8 pb-4">
          <a
            className={`font-title-md text-title-md transition-all duration-200 hover:scale-105 ${
              activeCategory === "Fiction"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-secondary"
            }`}
            href="#fiction"
            onClick={(e) => { e.preventDefault(); setActiveCategory("Fiction"); }}
          >
            Fiction
          </a>
          <a
            className={`font-title-md text-title-md transition-all duration-200 hover:scale-105 ${
              activeCategory === "Non-Fiction"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-secondary"
            }`}
            href="#non-fiction"
            onClick={(e) => { e.preventDefault(); setActiveCategory("Non-Fiction"); }}
          >
            Non-Fiction
          </a>
          <a
            className={`font-title-md text-title-md transition-all duration-200 hover:scale-105 ${
              activeCategory === "Rare Editions"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-secondary"
            }`}
            href="#rare-editions"
            onClick={(e) => { e.preventDefault(); setActiveCategory("Rare Editions"); }}
          >
            Rare Editions
          </a>
          <a
            className={`font-title-md text-title-md transition-all duration-200 hover:scale-105 ${
              activeCategory === "Poetry"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-secondary"
            }`}
            href="#poetry"
            onClick={(e) => { e.preventDefault(); setActiveCategory("Poetry"); }}
          >
            Poetry
          </a>
          <a
            className={`font-title-md text-title-md transition-all duration-200 hover:scale-105 ${
              activeCategory === "Children"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-secondary"
            }`}
            href="#children"
            onClick={(e) => { e.preventDefault(); setActiveCategory("Children"); }}
          >
            Children
          </a>
          <a
            className={`font-title-md text-title-md transition-all duration-200 hover:scale-105 ${
              activeCategory === "Sale"
                ? "text-secondary font-bold border-b-2 border-secondary pb-1"
                : "text-secondary hover:text-secondary-container"
            }`}
            href="#sale"
            onClick={(e) => { e.preventDefault(); setActiveCategory("Sale"); }}
          >
            Sale
          </a>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center px-margin-mobile py-3 bg-paper-cream sticky top-0 z-40 border-b border-muted-border">
        <a className="flex items-center" href="#">
          <img
            src="/images/logo.png"
            alt="Market Shop - Ocean of Book"
            className="h-8 w-auto object-contain mix-blend-multiply"
          />
        </a>
        <div className="flex items-center gap-3">
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
            onClick={() => {
              const query = prompt("Search Market Shop by author, title, or genre:", searchQuery);
              if (query !== null) setSearchQuery(query);
            }}
            aria-label="Search"
            className="text-on-surface hover:text-primary p-1"
          >
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
        </div>
      </header>

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

      {/* First Marquee */}
      <div className="bg-surface-container-high py-2 border-b border-muted-border marquee-container">
        <div className="marquee-content font-label-sm text-label-sm text-on-surface uppercase tracking-wider flex gap-12">
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

      <main className="max-w-container-max mx-auto w-full">
        {/* 5. Hero Section */}
        <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop text-center">
          <h1 className="font-display-xl text-headline-lg-mobile md:text-display-xl text-ink-charcoal mb-6 max-w-3xl mx-auto">
            Curating Quiet Moments for Every Reader
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            Discover a carefully selected collection of literature designed to inspire, comfort, and transport you. Explore our shelves and find your next escape with direct UK independent sellers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("curators-picks");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider py-4 px-8 rounded transition-colors shadow-sm"
            >
              Shop Collection
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("genres-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-ink-charcoal text-ink-charcoal hover:bg-surface-container font-label-sm text-label-sm uppercase tracking-wider py-4 px-8 rounded transition-colors"
            >
              Explore Genres
            </button>
          </div>
        </section>

        {/* 6. Featured Books */}
        <section id="curators-picks" className="px-margin-mobile md:px-margin-desktop py-12 scroll-mt-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-title-md text-title-md text-ink-charcoal">Curator&apos;s Picks</h2>
            <a className="font-label-sm text-label-sm text-primary uppercase hover:underline" href="#curators-picks">View All</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pick 1 */}
            <div
              className="flex flex-col group cursor-pointer"
              onClick={() => handleOpenProductModal("The Silent Echo", "Elena Rostova", 14.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuA2hRt3nflzL572lhboo0z-oM5QqblQKdxtBjr5uZ4Yo3vE1pBLR8UsLdU6IE1zhmgnxizLOaoVTmXe4uLdwken3H7lDihNa8CMxpsgZbTtkLkUR_mnTDvEksUMBVY5wYXnTLMiG8sAtzSusvH1xe2E14hX9F_9AoYbXlLv-zdA3mcjlFS1wy-726qKp0hWLvQ5wsTS5KXzmFghEFuBOJeU0u3FZmM5sVUEAIxn2OaHJvt_pJutkvU", "Literary Fiction")}
            >
              <div className="aspect-[2/3] w-full bg-surface-container mb-4 overflow-hidden border border-muted-border rounded book-shadow transition-all duration-300 lift-on-hover relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist({
                      id: "the-silent-echo",
                      title: "The Silent Echo",
                      author: "Elena Rostova",
                      price: 14.99,
                      rating: 4.9,
                      reviewCount: 128,
                      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2hRt3nflzL572lhboo0z-oM5QqblQKdxtBjr5uZ4Yo3vE1pBLR8UsLdU6IE1zhmgnxizLOaoVTmXe4uLdwken3H7lDihNa8CMxpsgZbTtkLkUR_mnTDvEksUMBVY5wYXnTLMiG8sAtzSusvH1xe2E14hX9F_9AoYbXlLv-zdA3mcjlFS1wy-726qKp0hWLvQ5wsTS5KXzmFghEFuBOJeU0u3FZmM5sVUEAIxn2OaHJvt_pJutkvU",
                      category: "Literary Fiction",
                      description: "A masterfully crafted edition of The Silent Echo.",
                      format: "Hardcover",
                      inStock: true,
                      sellerName: "Market Shop Direct"
                    });
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow hover:bg-white text-secondary transition-transform hover:scale-110 z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isInWishlist("the-silent-echo") ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <img
                  className="w-full h-full object-cover"
                  data-alt="Cover of The Silent Echo"
                  alt="Cover of The Silent Echo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2hRt3nflzL572lhboo0z-oM5QqblQKdxtBjr5uZ4Yo3vE1pBLR8UsLdU6IE1zhmgnxizLOaoVTmXe4uLdwken3H7lDihNa8CMxpsgZbTtkLkUR_mnTDvEksUMBVY5wYXnTLMiG8sAtzSusvH1xe2E14hX9F_9AoYbXlLv-zdA3mcjlFS1wy-726qKp0hWLvQ5wsTS5KXzmFghEFuBOJeU0u3FZmM5sVUEAIxn2OaHJvt_pJutkvU"
                />
              </div>
              <div className="text-center">
                <h3 className="font-title-md text-title-md text-ink-charcoal mb-1">The Silent Echo</h3>
                <p className="font-body-md text-body-md text-outline mb-2">Elena Rostova</p>
                <p className="font-body-lg text-body-lg text-ink-charcoal font-semibold mb-4">£14.99</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartQuick("The Silent Echo", "Elena Rostova", 14.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuA2hRt3nflzL572lhboo0z-oM5QqblQKdxtBjr5uZ4Yo3vE1pBLR8UsLdU6IE1zhmgnxizLOaoVTmXe4uLdwken3H7lDihNa8CMxpsgZbTtkLkUR_mnTDvEksUMBVY5wYXnTLMiG8sAtzSusvH1xe2E14hX9F_9AoYbXlLv-zdA3mcjlFS1wy-726qKp0hWLvQ5wsTS5KXzmFghEFuBOJeU0u3FZmM5sVUEAIxn2OaHJvt_pJutkvU");
                  }}
                  className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-ink-charcoal font-label-sm text-label-sm uppercase py-3 border border-muted-border rounded transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Pick 2 */}
            <div
              className="flex flex-col group cursor-pointer"
              onClick={() => handleOpenProductModal("Architecture of the Mind", "Dr. Julian Hayes", 18.50, "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqhMVW19RD8lwVDkVG2ldd-joFRVeGCcNj9Ju0A1D7vYroSl9ab6EYzgBrKp8D_XjgfsOILDxxtpVcFO8mzcbEKS74KiPCJs0tIWv2LHsQqMWAJyq4jXYg5XbTfdKAfbNS7ujtS7bcw8zxF5-4HdZqKgGwTWfeP7qPemRfWAc0KLSyDcMurOvGO6cPfrPsWWoJdXst-3NaT75ZHfbScmQe5GI_KabpY_ZaYBDSiX0H5dYHIbySlM", "Non-Fiction")}
            >
              <div className="aspect-[2/3] w-full bg-surface-container mb-4 overflow-hidden border border-muted-border rounded book-shadow transition-all duration-300 lift-on-hover relative">
                <div className="absolute top-2 left-2 bg-secondary text-on-secondary text-xs px-2 py-1 uppercase font-bold rounded shadow-sm z-10">Bestseller</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist({
                      id: "architecture-of-the-mind",
                      title: "Architecture of the Mind",
                      author: "Dr. Julian Hayes",
                      price: 18.50,
                      rating: 4.9,
                      reviewCount: 94,
                      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqhMVW19RD8lwVDkVG2ldd-joFRVeGCcNj9Ju0A1D7vYroSl9ab6EYzgBrKp8D_XjgfsOILDxxtpVcFO8mzcbEKS74KiPCJs0tIWv2LHsQqMWAJyq4jXYg5XbTfdKAfbNS7ujtS7bcw8zxF5-4HdZqKgGwTWfeP7qPemRfWAc0KLSyDcMurOvGO6cPfrPsWWoJdXst-3NaT75ZHfbScmQe5GI_KabpY_ZaYBDSiX0H5dYHIbySlM",
                      category: "Non-Fiction",
                      description: "Bestselling exploration of space, mind, and culture.",
                      format: "Hardcover",
                      inStock: true,
                      sellerName: "Market Shop UK"
                    });
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow hover:bg-white text-secondary transition-transform hover:scale-110 z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isInWishlist("architecture-of-the-mind") ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <img
                  className="w-full h-full object-cover"
                  data-alt="Cover of Architecture of the Mind"
                  alt="Cover of Architecture of the Mind"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKqhMVW19RD8lwVDkVG2ldd-joFRVeGCcNj9Ju0A1D7vYroSl9ab6EYzgBrKp8D_XjgfsOILDxxtpVcFO8mzcbEKS74KiPCJs0tIWv2LHsQqMWAJyq4jXYg5XbTfdKAfbNS7ujtS7bcw8zxF5-4HdZqKgGwTWfeP7qPemRfWAc0KLSyDcMurOvGO6cPfrPsWWoJdXst-3NaT75ZHfbScmQe5GI_KabpY_ZaYBDSiX0H5dYHIbySlM"
                />
              </div>
              <div className="text-center">
                <h3 className="font-title-md text-title-md text-ink-charcoal mb-1">Architecture of the Mind</h3>
                <p className="font-body-md text-body-md text-outline mb-2">Dr. Julian Hayes</p>
                <p className="font-body-lg text-body-lg text-ink-charcoal font-semibold mb-4">£18.50</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartQuick("Architecture of the Mind", "Dr. Julian Hayes", 18.50, "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqhMVW19RD8lwVDkVG2ldd-joFRVeGCcNj9Ju0A1D7vYroSl9ab6EYzgBrKp8D_XjgfsOILDxxtpVcFO8mzcbEKS74KiPCJs0tIWv2LHsQqMWAJyq4jXYg5XbTfdKAfbNS7ujtS7bcw8zxF5-4HdZqKgGwTWfeP7qPemRfWAc0KLSyDcMurOvGO6cPfrPsWWoJdXst-3NaT75ZHfbScmQe5GI_KabpY_ZaYBDSiX0H5dYHIbySlM");
                  }}
                  className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-ink-charcoal font-label-sm text-label-sm uppercase py-3 border border-muted-border rounded transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Pick 3 */}
            <div
              className="flex flex-col group cursor-pointer"
              onClick={() => handleOpenProductModal("Whispers in the Glass", "Sarah Lin", 9.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuBP9EUPxxR5ZhKdNwbT2tGhHqG4vvKp31oQ-2RUXhJKN-dbNIbnugvpJR0zFsJmF3e6WD9XAGKbPMtHcWLG_i55Cw2y9AVGYXwaI8GwQ_H2NpD9dwPCJKROrCESEdrDujVgVcNdoFt6waG0NV18YSae0LdjKl7zx8oHJEzXlUO72Ov3B3_fSC7IvI4c__dAWZ-JJmQ9MCLtlbSGg0jlWH5ZRQtL6gggH-Nm6bsATKPn77_S2WouR9c", "Poetry", 12.99)}
            >
              <div className="aspect-[2/3] w-full bg-surface-container mb-4 overflow-hidden border border-muted-border rounded book-shadow transition-all duration-300 lift-on-hover relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist({
                      id: "whispers-in-the-glass",
                      title: "Whispers in the Glass",
                      author: "Sarah Lin",
                      price: 9.99,
                      rating: 4.8,
                      reviewCount: 67,
                      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP9EUPxxR5ZhKdNwbT2tGhHqG4vvKp31oQ-2RUXhJKN-dbNIbnugvpJR0zFsJmF3e6WD9XAGKbPMtHcWLG_i55Cw2y9AVGYXwaI8GwQ_H2NpD9dwPCJKROrCESEdrDujVgVcNdoFt6waG0NV18YSae0LdjKl7zx8oHJEzXlUO72Ov3B3_fSC7IvI4c__dAWZ-JJmQ9MCLtlbSGg0jlWH5ZRQtL6gggH-Nm6bsATKPn77_S2WouR9c",
                      category: "Poetry",
                      description: "Contemporary poetry capturing quiet moments of nature.",
                      format: "Hardcover",
                      inStock: true,
                      sellerName: "Market Shop Direct"
                    });
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 shadow hover:bg-white text-secondary transition-transform hover:scale-110 z-10 cursor-pointer"
                  aria-label="Save to wishlist"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isInWishlist("whispers-in-the-glass") ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
                <img
                  className="w-full h-full object-cover"
                  data-alt="Cover of Whispers in the Glass"
                  alt="Cover of Whispers in the Glass"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP9EUPxxR5ZhKdNwbT2tGhHqG4vvKp31oQ-2RUXhJKN-dbNIbnugvpJR0zFsJmF3e6WD9XAGKbPMtHcWLG_i55Cw2y9AVGYXwaI8GwQ_H2NpD9dwPCJKROrCESEdrDujVgVcNdoFt6waG0NV18YSae0LdjKl7zx8oHJEzXlUO72Ov3B3_fSC7IvI4c__dAWZ-JJmQ9MCLtlbSGg0jlWH5ZRQtL6gggH-Nm6bsATKPn77_S2WouR9c"
                />
              </div>
              <div className="text-center">
                <h3 className="font-title-md text-title-md text-ink-charcoal mb-1">Whispers in the Glass</h3>
                <p className="font-body-md text-body-md text-outline mb-2">Sarah Lin</p>
                <p className="font-body-lg text-body-lg font-semibold mb-4">
                  <span className="text-secondary mr-2">£9.99</span>
                  <span className="text-outline line-through font-normal text-sm">£12.99</span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartQuick("Whispers in the Glass", "Sarah Lin", 9.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuBP9EUPxxR5ZhKdNwbT2tGhHqG4vvKp31oQ-2RUXhJKN-dbNIbnugvpJR0zFsJmF3e6WD9XAGKbPMtHcWLG_i55Cw2y9AVGYXwaI8GwQ_H2NpD9dwPCJKROrCESEdrDujVgVcNdoFt6waG0NV18YSae0LdjKl7zx8oHJEzXlUO72Ov3B3_fSC7IvI4c__dAWZ-JJmQ9MCLtlbSGg0jlWH5ZRQtL6gggH-Nm6bsATKPn77_S2WouR9c");
                  }}
                  className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-ink-charcoal font-label-sm text-label-sm uppercase py-3 border border-muted-border rounded transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Seasonal Deals & New Releases Slideshow */}
        <section className="px-margin-mobile md:px-margin-desktop py-12 bg-sage-haze my-8 rounded-xl mx-4 md:mx-0 border border-muted-border overflow-hidden">
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
              onClick={() => handleOpenProductModal("Wintering", "Katherine May", 8.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuA-xiT39Ukh2KvmvyYQSMJfSKI77Mkwj_eQXoz-qgCDpx5DMS-Z242nHffetXx7yCATO1pa8PXVizBrxmvW_DcgP0rLwgYHT2RVCvFNtPcFKHKvldXBh7aW0OltHTGibjoNhWjcA1hexgbYAoU9iBJ8xmW5Y_jcYNSiNKvqv9vIxQeMULe1loZOUYwtkRb1EIMWGa6-PdxbvNv2rUPWE8_mI7WC9Vx6UAFa32w2xMpgIlYhLdd5tEw", "Non-Fiction", 10.99)}
              className="min-w-[300px] flex-shrink-0 bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-muted-border flex items-center gap-6 group cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-36 bg-surface-variant flex-shrink-0 book-shadow overflow-hidden rounded">
                <img
                  alt="Book"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-xiT39Ukh2KvmvyYQSMJfSKI77Mkwj_eQXoz-qgCDpx5DMS-Z242nHffetXx7yCATO1pa8PXVizBrxmvW_DcgP0rLwgYHT2RVCvFNtPcFKHKvldXBh7aW0OltHTGibjoNhWjcA1hexgbYAoU9iBJ8xmW5Y_jcYNSiNKvqv9vIxQeMULe1loZOUYwtkRb1EIMWGa6-PdxbvNv2rUPWE8_mI7WC9Vx6UAFa32w2xMpgIlYhLdd5tEw"
                />
              </div>
              <div>
                <span className="text-secondary font-label-sm uppercase tracking-wide block mb-1 font-bold">Save 20%</span>
                <h3 className="font-title-md text-ink-charcoal mb-1 group-hover:text-primary transition-colors">Wintering</h3>
                <p className="text-sm text-outline mb-2">Katherine May</p>
                <p className="font-semibold"><span className="text-secondary mr-2">£8.99</span><span className="line-through text-outline text-sm">£10.99</span></p>
              </div>
            </div>

            {/* Deal Item 2 */}
            <div
              onClick={() => handleOpenProductModal("The Alchemist", "Paulo Coelho", 12.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuC900G178DAqgWsGjTCHSmCjPx5iA6yyAtOHSoTD6j9ALlXlSi0TIYckc3SOu0alrAngZelbz01fQSKwoOPDhv0mirFF4mmI_ifAlKjXFAYEc6QGDC6ico8MRPYZ_X6AyIa4SxvI8YaZsSR3xiQQfq-LtMi5OSMdtprBPsrcf0YN3ztLkmxGDpwaF9g37x0EK5kCtuDyZvaEXx3UeKtHCJ4bw71RIhNRBO3NRdRx9rL5iIT8n1ZyH4", "Fiction")}
              className="min-w-[300px] flex-shrink-0 bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-muted-border flex items-center gap-6 group cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-36 bg-surface-variant flex-shrink-0 book-shadow overflow-hidden rounded">
                <img
                  alt="Book"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC900G178DAqgWsGjTCHSmCjPx5iA6yyAtOHSoTD6j9ALlXlSi0TIYckc3SOu0alrAngZelbz01fQSKwoOPDhv0mirFF4mmI_ifAlKjXFAYEc6QGDC6ico8MRPYZ_X6AyIa4SxvI8YaZsSR3xiQQfq-LtMi5OSMdtprBPsrcf0YN3ztLkmxGDpwaF9g37x0EK5kCtuDyZvaEXx3UeKtHCJ4bw71RIhNRBO3NRdRx9rL5iIT8n1ZyH4"
                />
              </div>
              <div>
                <span className="text-secondary font-label-sm uppercase tracking-wide block mb-1 font-bold">Buy 1 Get 1</span>
                <h3 className="font-title-md text-ink-charcoal mb-1 group-hover:text-primary transition-colors">The Alchemist</h3>
                <p className="text-sm text-outline mb-2">Paulo Coelho</p>
                <p className="font-semibold">£12.99</p>
              </div>
            </div>

            {/* Deal Item 3 */}
            <div
              onClick={() => handleOpenProductModal("Classic Poems", "Various Artists", 15.00, "https://lh3.googleusercontent.com/aida-public/AB6AXuBhkj-qJgt1iSzLLpV3bog07pQDawy69it9VZFs4IxlzzO5yf3e1RG4UeWa1kpDWMxHfBghfGbg_PapkGierDQ96lL-a5jsUR7b99UKGixqaTvJcTbRXhm-4XvBwCsK4B54qSnHUf5H9ZZEH7Y9BnErjqTxS24Eq4uUj2YjuRy6xhmJQxr9nFqMXd2sf39AWdkxenAVe3WPKH1arpzZT4p6nneK1Bc9lpPhlyYahcd7vUuQIqF9IWY", "Poetry", 22.00)}
              className="min-w-[300px] flex-shrink-0 bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-muted-border flex items-center gap-6 group cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-36 bg-surface-variant flex-shrink-0 book-shadow overflow-hidden rounded">
                <img
                  alt="Book"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhkj-qJgt1iSzLLpV3bog07pQDawy69it9VZFs4IxlzzO5yf3e1RG4UeWa1kpDWMxHfBghfGbg_PapkGierDQ96lL-a5jsUR7b99UKGixqaTvJcTbRXhm-4XvBwCsK4B54qSnHUf5H9ZZEH7Y9BnErjqTxS24Eq4uUj2YjuRy6xhmJQxr9nFqMXd2sf39AWdkxenAVe3WPKH1arpzZT4p6nneK1Bc9lpPhlyYahcd7vUuQIqF9IWY"
                />
              </div>
              <div>
                <span className="text-secondary font-label-sm uppercase tracking-wide block mb-1 font-bold">Bundle Deal</span>
                <h3 className="font-title-md text-ink-charcoal mb-1 group-hover:text-primary transition-colors">Classic Poems</h3>
                <p className="text-sm text-outline mb-2">Various Artists</p>
                <p className="font-semibold"><span className="text-secondary mr-2">£15.00</span><span className="line-through text-outline text-sm">£22.00</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Browse by Genre */}
        <section id="genres-section" className="px-margin-mobile md:px-margin-desktop py-12 scroll-mt-20">
          <h2 className="font-title-md text-headline-lg text-ink-charcoal text-center mb-10">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <a
              onClick={(e) => { e.preventDefault(); setActiveCategory("Fiction"); showToast("Browsing Fiction titles"); }}
              className="group relative aspect-square bg-surface-container-high rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center border border-muted-border hover:border-primary transition-colors cursor-pointer"
              href="#fiction"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-primary group-hover:scale-110 transition-transform">auto_stories</span>
              <span className="font-title-md text-ink-charcoal">Fiction</span>
            </a>
            <a
              onClick={(e) => { e.preventDefault(); setActiveCategory("Non-Fiction"); showToast("Browsing Non-Fiction titles"); }}
              className="group relative aspect-square bg-surface-container-high rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center border border-muted-border hover:border-primary transition-colors cursor-pointer"
              href="#non-fiction"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-primary group-hover:scale-110 transition-transform">science</span>
              <span className="font-title-md text-ink-charcoal">Non-Fiction</span>
            </a>
            <a
              onClick={(e) => { e.preventDefault(); setActiveCategory("Poetry"); showToast("Browsing Poetry titles"); }}
              className="group relative aspect-square bg-surface-container-high rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center border border-muted-border hover:border-primary transition-colors cursor-pointer"
              href="#poetry"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-primary group-hover:scale-110 transition-transform">history_edu</span>
              <span className="font-title-md text-ink-charcoal">Poetry</span>
            </a>
            <a
              onClick={(e) => { e.preventDefault(); setActiveCategory("Rare Editions"); showToast("Browsing Rare & Signed Editions"); }}
              className="group relative aspect-square bg-surface-container-high rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center border border-muted-border hover:border-primary transition-colors cursor-pointer"
              href="#rare-editions"
            >
              <span className="material-symbols-outlined text-4xl mb-3 text-primary group-hover:scale-110 transition-transform">diamond</span>
              <span className="font-title-md text-ink-charcoal">Rare Editions</span>
            </a>
          </div>
        </section>

        {/* Second Marquee */}
        <div className="bg-surface-container-high py-2 border-y border-muted-border marquee-container my-8">
          <div className="marquee-content font-label-sm text-label-sm text-on-surface uppercase tracking-wider flex gap-12">
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

        {/* 9. New Releases Grid (6 books) */}
        <section id="new-releases" className="px-margin-mobile md:px-margin-desktop py-12 scroll-mt-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-title-md text-title-md text-ink-charcoal">New Releases</h2>
            <a className="font-label-sm text-label-sm text-primary uppercase hover:underline" href="#new-releases">View All</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Book 1 */}
            <div
              onClick={() => handleOpenProductModal("The Lost City", "Amanda Wells", 12.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuB2onXBOs8n9f9rWGVctc9v7Zm0Qv-0lF1gOm-LoX2hEBsH6T-dTP54GgdKE_FCsPI3R20N2zyuBkzJZo9XaeFIe-0m-iorr0U1dIyZ3Xell1SxB3Wwb_hhuMFXbzy0nX6J5uw2u8jxB-5TrZzyjQydLIgtIMgC-PRY2eMyX1bGMP6Tn2h0c0-Hxj_tN6d3ngC5nzzejJjvPpLyhRlOZa9DsLwJHDBpnClJh3mmCQhm4PCExaflqj4", "Fiction")}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border">
                <img
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2onXBOs8n9f9rWGVctc9v7Zm0Qv-0lF1gOm-LoX2hEBsH6T-dTP54GgdKE_FCsPI3R20N2zyuBkzJZo9XaeFIe-0m-iorr0U1dIyZ3Xell1SxB3Wwb_hhuMFXbzy0nX6J5uw2u8jxB-5TrZzyjQydLIgtIMgC-PRY2eMyX1bGMP6Tn2h0c0-Hxj_tN6d3ngC5nzzejJjvPpLyhRlOZa9DsLwJHDBpnClJh3mmCQhm4PCExaflqj4"
                />
              </div>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate">The Lost City</h3>
              <p className="font-body-md text-xs text-outline mb-1">Amanda Wells</p>
              <p className="font-body-lg text-sm font-semibold">£12.99</p>
            </div>

            {/* Book 2 */}
            <div
              onClick={() => handleOpenProductModal("Midnight Thoughts", "R. K. Sterling", 10.50, "https://lh3.googleusercontent.com/aida-public/AB6AXuDdZyPT1vz7oMNDhghsTy-kI3XoJ4gatH_VY2JxmlibnUp0lHNTNQafEfcSiPhHpg1-7c4PisH3BecLAg1tF8XtCvakUaOWPYDfoVGDpB8CMt6PDnby_Mx5c1Zo5kB17QbqzeGYXAHB_8JGlPSzwNWO4DDTKWKadD76573EVJrHPPeMszPylfkJq1_v3OLFOHFbWbGxeYq05pzpJqPiBfi4oFjOUNEH36gJMpu4cq4_LmjyxpwzY-o", "Poetry")}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border">
                <img
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdZyPT1vz7oMNDhghsTy-kI3XoJ4gatH_VY2JxmlibnUp0lHNTNQafEfcSiPhHpg1-7c4PisH3BecLAg1tF8XtCvakUaOWPYDfoVGDpB8CMt6PDnby_Mx5c1Zo5kB17QbqzeGYXAHB_8JGlPSzwNWO4DDTKWKadD76573EVJrHPPeMszPylfkJq1_v3OLFOHFbWbGxeYq05pzpJqPiBfi4oFjOUNEH36gJMpu4cq4_LmjyxpwzY-o"
                />
              </div>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate">Midnight Thoughts</h3>
              <p className="font-body-md text-xs text-outline mb-1">R. K. Sterling</p>
              <p className="font-body-lg text-sm font-semibold">£10.50</p>
            </div>

            {/* Book 3 */}
            <div
              onClick={() => handleOpenProductModal("Ocean Waves", "T. H. White", 14.00, "https://lh3.googleusercontent.com/aida-public/AB6AXuAePQbF8dSYdAIpAU6mjO461nW2RVta3xPEh7E5ID4vO5kHo3Xan9uYV1D0t2--vSM2DX9QPf4o0j7jZAeJIEomT4Rpwv5gRSDerYvAaqrMupgfKcaGW2THrN0fOKUDRq9sxjplmW8LrIR5_zse7QwKxdKmAD8eetAuU3rq-QoU8eEdt4HNumaiLdE7ULxmyULMIN7sAJkUzl7ezgVZIEzp4cEK_WypLtxONvf-0PtD-iqS4iJtzwQ", "Fiction")}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border">
                <img
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAePQbF8dSYdAIpAU6mjO461nW2RVta3xPEh7E5ID4vO5kHo3Xan9uYV1D0t2--vSM2DX9QPf4o0j7jZAeJIEomT4Rpwv5gRSDerYvAaqrMupgfKcaGW2THrN0fOKUDRq9sxjplmW8LrIR5_zse7QwKxdKmAD8eetAuU3rq-QoU8eEdt4HNumaiLdE7ULxmyULMIN7sAJkUzl7ezgVZIEzp4cEK_WypLtxONvf-0PtD-iqS4iJtzwQ"
                />
              </div>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate">Ocean Waves</h3>
              <p className="font-body-md text-xs text-outline mb-1">T. H. White</p>
              <p className="font-body-lg text-sm font-semibold">£14.00</p>
            </div>

            {/* Book 4 */}
            <div
              onClick={() => handleOpenProductModal("Modern Art", "Julia Stone", 25.00, "https://lh3.googleusercontent.com/aida-public/AB6AXuBTyVgASNE_biXyqxmCwjzsDfiLJW0Pfe5nQuLWBgJoaRhOJ1FNPNsvvy0VP_8Tg7T_WpNRabeefu0fzDybbOhM_Tko34RQaXmM6NpNDk-emu8SO6tLNPdwmNAzDksuNtzUXcwpmTSBbqlj7J_Qhcv4Nhx1VdHN__b2M2TzyWTI3RKkQRzHe8uyePORP9wmgqWgnSPazveJfYlLdnz0TMgigM0Pt-HPLWTuzpTLIUa8KbHkKdA7NTE", "Art & Architecture")}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border">
                <img
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTyVgASNE_biXyqxmCwjzsDfiLJW0Pfe5nQuLWBgJoaRhOJ1FNPNsvvy0VP_8Tg7T_WpNRabeefu0fzDybbOhM_Tko34RQaXmM6NpNDk-emu8SO6tLNPdwmNAzDksuNtzUXcwpmTSBbqlj7J_Qhcv4Nhx1VdHN__b2M2TzyWTI3RKkQRzHe8uyePORP9wmgqWgnSPazveJfYlLdnz0TMgigM0Pt-HPLWTuzpTLIUa8KbHkKdA7NTE"
                />
              </div>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate">Modern Art</h3>
              <p className="font-body-md text-xs text-outline mb-1">Julia Stone</p>
              <p className="font-body-lg text-sm font-semibold">£25.00</p>
            </div>

            {/* Book 5 */}
            <div
              onClick={() => handleOpenProductModal("History Repeats", "Martin King", 18.99, "https://lh3.googleusercontent.com/aida-public/AB6AXuDZQ2Y_ske2vc0SP32eeDvSPa9ozO8wREJC1GFtdCCErEmgqM61BJozRAIJg8sp8wUm1pKXh3ibmm41URk19aY7oA-iDS7VnO-oUbDimc4wIGoD0Df3ArzjCk-ekNYzAw48348X2xwF2AlWPXzpBaEE_EYUePcWzUlc42ZzMAosuPMpH1qrp093ocvuQc6rZBiS7BrWCB4BcX6uBHfP14pd9095TxXOacYYYNCQTOlZELj9iSDuTmQ", "History")}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border">
                <img
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZQ2Y_ske2vc0SP32eeDvSPa9ozO8wREJC1GFtdCCErEmgqM61BJozRAIJg8sp8wUm1pKXh3ibmm41URk19aY7oA-iDS7VnO-oUbDimc4wIGoD0Df3ArzjCk-ekNYzAw48348X2xwF2AlWPXzpBaEE_EYUePcWzUlc42ZzMAosuPMpH1qrp093ocvuQc6rZBiS7BrWCB4BcX6uBHfP14pd9095TxXOacYYYNCQTOlZELj9iSDuTmQ"
                />
              </div>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate">History Repeats</h3>
              <p className="font-body-md text-xs text-outline mb-1">Martin King</p>
              <p className="font-body-lg text-sm font-semibold">£18.99</p>
            </div>

            {/* Book 6 */}
            <div
              onClick={() => handleOpenProductModal("Cooking Basics", "Chef Mario", 16.50, "https://lh3.googleusercontent.com/aida-public/AB6AXuCW-cAvnLXfcCULqPblJ4eLpBPvnWr4zzhsAtJK2nKX2wgN_KKhxK-yi-DnIV8mWS5Df8retEoknjTGUX7MM-wvvaadH353AuSPg2fNxL16r_cZr8UEPtSAfrVDCPdvO4w4fruXJdCpyzDS_YEnzLSTQp0XMEhEHtcjaCdcvKN1DxgKWTiMHcitKd0BQ2eP1AWkSP0pz1oVKIc9NaNQHlPFjGUJfZvF3qzX3ZEPpz5VRCC_OT-7myA", "Culinary")}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[2/3] w-full bg-surface-variant mb-3 rounded book-shadow overflow-hidden hover:scale-105 transition-transform duration-300 border border-muted-border">
                <img
                  alt="Book Cover"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW-cAvnLXfcCULqPblJ4eLpBPvnWr4zzhsAtJK2nKX2wgN_KKhxK-yi-DnIV8mWS5Df8retEoknjTGUX7MM-wvvaadH353AuSPg2fNxL16r_cZr8UEPtSAfrVDCPdvO4w4fruXJdCpyzDS_YEnzLSTQp0XMEhEHtcjaCdcvKN1DxgKWTiMHcitKd0BQ2eP1AWkSP0pz1oVKIc9NaNQHlPFjGUJfZvF3qzX3ZEPpz5VRCC_OT-7myA"
                />
              </div>
              <h3 className="font-title-md text-sm text-ink-charcoal truncate">Cooking Basics</h3>
              <p className="font-body-md text-xs text-outline mb-1">Chef Mario</p>
              <p className="font-body-lg text-sm font-semibold">£16.50</p>
            </div>
          </div>
        </section>

        {/* 10. Featured Authors */}
        <section className="bg-surface-container-highest py-16 px-margin-mobile md:px-margin-desktop mt-8 border-y border-muted-border">
          <div className="max-w-container-max mx-auto text-center">
            <h2 className="font-title-md text-headline-lg text-ink-charcoal mb-4">Featured Authors</h2>
            <p className="text-on-surface-variant mb-12 max-w-xl mx-auto">Discover the brilliant minds behind this month&apos;s most talked-about literature.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Author 1 */}
              <div className="bg-paper-cream p-6 rounded-lg shadow-sm border border-muted-border flex flex-col items-center text-center">
                <img
                  alt="Author"
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-TKoeVViLvYEl4QQ6Z-WXtJWs9gzWscr-AP-OphhT3H25mf6ZsRM3NX6p-V6IV20rSkop8mHlilmWsx4-VT3wO_QR41mgbae6P0uKWAjHQCY2Kfv0cQLHFkWWO1yGRTiqjtA0I6c5mrnyx7S3SzrKLmQhkLyfAZHSoRbpvibJDgFAPjdYZJe9RZKfMaMFEeb43qcLsnk3iA_rBbN6nCxk5D3hFraXBoKArYow4sIoxRs-vytyeKY"
                />
                <h3 className="font-title-md text-lg text-ink-charcoal mb-2">Elena Rostova</h3>
                <p className="text-sm text-on-surface-variant mb-4">Award-winning novelist known for exploring the depths of human emotion and memory.</p>
                <a
                  className="text-primary font-label-sm uppercase hover:underline mt-auto cursor-pointer font-semibold"
                  onClick={() => {
                    const el = document.getElementById("curators-picks");
                    el?.scrollIntoView({ behavior: "smooth" });
                    showToast("Showing books by Elena Rostova");
                  }}
                >
                  View Books
                </a>
              </div>

              {/* Author 2 */}
              <div className="bg-paper-cream p-6 rounded-lg shadow-sm border border-muted-border flex flex-col items-center text-center">
                <img
                  alt="Author"
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdxeoNULIF09w_EtxZCJTZFYVkt4LAUlorQy829eCCgOYHVeRzukO5gSQi8t253x5LMkFkZdEW4ZzAAbuZAeojFE0_VWaXLQr8SlcOncrSzlkeeVwZrriSAIUVuAXkSPex6RJ1PrhP4kVV7txGObP3r_fGxP-MO3jSRFkg8X75anCsQuKZxgcD7Ie_gUfTL2Bf4gFWwo_EYLPg8FL0t7VZqltFx9rlDofa5dO_qAMEPy3h-WaLjQo"
                />
                <h3 className="font-title-md text-lg text-ink-charcoal mb-2">Dr. Julian Hayes</h3>
                <p className="text-sm text-on-surface-variant mb-4">Architect and philosopher writing on the intersection of space, mind, and culture.</p>
                <a
                  className="text-primary font-label-sm uppercase hover:underline mt-auto cursor-pointer font-semibold"
                  onClick={() => {
                    const el = document.getElementById("curators-picks");
                    el?.scrollIntoView({ behavior: "smooth" });
                    showToast("Showing books by Dr. Julian Hayes");
                  }}
                >
                  View Books
                </a>
              </div>

              {/* Author 3 */}
              <div className="bg-paper-cream p-6 rounded-lg shadow-sm border border-muted-border flex flex-col items-center text-center">
                <img
                  alt="Author"
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOJYQl6Nttej1Y_5xOPH0Ja0kxx_FPwW_NJVeCNgLKOnRPRMQXsFu_mdkFY7bH5SKR4c-5pS6KzUxImlDUYJZAYJ5ryfucNz0Evn1zaFuIXpYACkzY2YnWot_rpWqjp1UiKkfBF-cTwmw0kBqKfbNIY4NDLIXnOS4CqPnNQSvpetevmUEcPzlyyNc-_C_tGQgDdhrIO52zjo0gfnu19lf-mSJ2A2Yurt4S4hE22HKAy5sxkFPcH7c"
                />
                <h3 className="font-title-md text-lg text-ink-charcoal mb-2">Sarah Lin</h3>
                <p className="text-sm text-on-surface-variant mb-4">Contemporary poet capturing the quiet moments of nature and modern existence.</p>
                <a
                  className="text-primary font-label-sm uppercase hover:underline mt-auto cursor-pointer font-semibold"
                  onClick={() => {
                    const el = document.getElementById("curators-picks");
                    el?.scrollIntoView({ behavior: "smooth" });
                    showToast("Showing books by Sarah Lin");
                  }}
                >
                  View Books
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Customer Reviews */}
        <section className="px-margin-mobile md:px-margin-desktop py-16">
          <h2 className="font-title-md text-headline-lg text-ink-charcoal text-center mb-10">What Readers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-surface-container p-6 rounded-lg border border-muted-border relative">
              <span className="material-symbols-outlined text-outline-variant absolute top-4 right-4 text-4xl opacity-50">format_quote</span>
              <div className="flex text-primary mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-on-surface-variant italic mb-4 relative z-10">&quot;A truly magical bookstore experience online. The curation is exceptional, and my books arrived beautifully packaged within two days.&quot;</p>
              <p className="font-label-sm text-ink-charcoal uppercase">— Claire M.</p>
            </div>

            {/* Review 2 */}
            <div className="bg-surface-container p-6 rounded-lg border border-muted-border relative">
              <span className="material-symbols-outlined text-outline-variant absolute top-4 right-4 text-4xl opacity-50">format_quote</span>
              <div className="flex text-primary mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <p className="font-body-md text-on-surface-variant italic mb-4 relative z-10">&quot;I always find something unexpected and wonderful here. The rare editions section is a treasure trove for collectors.&quot;</p>
              <p className="font-label-sm text-ink-charcoal uppercase">— James T.</p>
            </div>

            {/* Review 3 */}
            <div className="bg-surface-container p-6 rounded-lg border border-muted-border relative">
              <span className="material-symbols-outlined text-outline-variant absolute top-4 right-4 text-4xl opacity-50">format_quote</span>
              <div className="flex text-primary mb-3">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
              </div>
              <p className="font-body-md text-on-surface-variant italic mb-4 relative z-10">&quot;The best place to discover new authors. The site is incredibly easy to navigate and aesthetically so pleasing. Highly recommend.&quot;</p>
              <p className="font-label-sm text-ink-charcoal uppercase">— Anita W.</p>
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
