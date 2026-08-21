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
              className="bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider py-4 px-8 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Shop Collection
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("genres-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-ink-charcoal text-ink-charcoal hover:bg-surface-container font-label-sm text-label-sm uppercase tracking-wider py-4 px-8 rounded-xl transition-colors cursor-pointer"
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
              onClick={() => handleOpenProductModal("David Walliams Gangsta Granny", "info.vebryx@gmail.com", 5.99, "/images/books/gangsta-granny.png", "Children's Fiction", 7.99)}
            >
              <div className="aspect-[2/3] w-full bg-surface-container mb-4 overflow-hidden border border-muted-border rounded-xl book-shadow transition-all duration-300 lift-on-hover relative">
                <div className="absolute top-2 left-2 bg-secondary text-on-secondary text-xs px-2 py-0.5 uppercase font-bold rounded-lg shadow-sm z-10">
                  Sale -25%
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist({
                      id: "david-walliams-gangsta-granny",
                      title: "David Walliams Gangsta Granny",
                      author: "info.vebryx@gmail.com",
                      price: 5.99,
                      originalPrice: 7.99,
                      rating: 0.0,
                      reviewCount: 0,
                      coverImage: "/images/books/gangsta-granny.png",
                      category: "Children's Fiction",
                      description: "Ben thinks his cabbage-soup-eating grandmother is utterly dull—until he finds out she is a master international jewel thief.",
                      format: "Paperback",
                      inStock: true,
                      sellerName: "info.vebryx@gmail.com"
                    });
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

            {/* Pick 2 */}
            <div
              className="flex flex-col group cursor-pointer"
              onClick={() => handleOpenProductModal("Adventures of the magic star", "info.vebryx@gmail.com", 5.99, "/images/books/adventures-of-the-magic-star.png", "Romance & Poetry", 7.00)}
            >
              <div className="aspect-[2/3] w-full bg-surface-container mb-4 overflow-hidden border border-muted-border rounded-xl book-shadow transition-all duration-300 lift-on-hover relative">
                <div className="absolute top-2 left-2 bg-secondary text-on-secondary text-xs px-2 py-0.5 uppercase font-bold rounded-lg shadow-sm z-10">
                  Sale -14%
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist({
                      id: "adventures-of-the-magic-star",
                      title: "Adventures of the magic star",
                      author: "info.vebryx@gmail.com",
                      price: 5.99,
                      originalPrice: 7.00,
                      rating: 0.0,
                      reviewCount: 0,
                      coverImage: "/images/books/adventures-of-the-magic-star.png",
                      category: "Romance & Poetry",
                      description: "A tender graphic novella tracing love, serendipity, and quiet moments beneath blossom trees.",
                      format: "Paperback",
                      inStock: true,
                      sellerName: "info.vebryx@gmail.com"
                    });
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
                    handleAddToCartQuick("Adventures of the magic star", "info.vebryx@gmail.com", 5.99, "/images/books/adventures-of-the-magic-star.png", "Romance & Poetry");
                  }}
                  className="w-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-ink-charcoal font-label-sm text-label-sm uppercase py-3 border border-muted-border rounded-xl transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Pick 3 */}
            <div
              className="flex flex-col group cursor-pointer"
              onClick={() => handleOpenProductModal("Shadow of Decenit", "info.vebryx@gmail.com", 155.00, "/images/books/shadow-of-deceit.png", "Mystery & Thriller")}
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
                      rating: 0.0,
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

        {/* 7. Seasonal Deals & New Releases Slideshow */}
        <section className="px-margin-mobile md:px-margin-desktop py-12 bg-sage-haze my-8 rounded-2xl mx-4 md:mx-0 border border-muted-border overflow-hidden">
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
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5">David Walliams Gangsta Granny</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5">$5.99</span>
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
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5">Adventures of the magic star</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5">$5.99</span>
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
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5">Shadow of Decenit</h3>
              <p className="font-body-lg text-sm font-semibold mt-1 text-ink-charcoal">$155.00</p>
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
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5">The story of the magic star</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5">$105.00</span>
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
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5">Miss P the Pirate</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5">$5.00</span>
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
              <h3 className="font-title-md text-sm text-ink-charcoal truncate mt-0.5">The whitre Abbott</h3>
              <p className="font-body-lg text-sm font-semibold mt-1">
                <span className="text-secondary mr-1.5">$7.99</span>
                <span className="text-outline line-through font-normal text-xs">$10.99</span>
              </p>
            </div>
          </div>
        </section>

        {/* 10. Author of the Month */}
        <section className="bg-surface-container-highest py-16 px-margin-mobile md:px-margin-desktop mt-8 border-y border-muted-border">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                alt="Author of the Month"
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

        {/* 11. Customer Reviews */}
        <section className="px-margin-mobile md:px-margin-desktop py-16">
          <h2 className="font-title-md text-headline-lg text-ink-charcoal text-center mb-10">What Readers Say</h2>
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
              <p className="font-label-sm text-ink-charcoal uppercase">— Claire M.</p>
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
              <p className="font-label-sm text-ink-charcoal uppercase">— James T.</p>
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
              <p className="font-label-sm text-ink-charcoal uppercase">— Anita W.</p>
            </div>
          </div>
        </section>

        {/* 12. About Us */}
        <section id="about-us" className="py-16 px-margin-mobile md:px-margin-desktop border-t border-muted-border bg-paper-cream">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-title-md text-headline-lg text-ink-charcoal mb-4">About Us</h2>
              <p className="text-on-surface-variant mb-6 text-lg leading-relaxed">
                Established in 2015, Market Shop was founded on a simple belief: the right book can transform a moment, a day, or a life. We strive to be more than just a retailer; we are a community of readers dedicated to the quiet joy of getting lost in a story.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                Our mission is to curate a selection that surprises and delights, bridging the gap between beloved classics and fresh, new voices. We&apos;re proud of the excellent reviews we receive from our community, reflecting our commitment to quality, curation, and exceptional service.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md order-1 md:order-2">
              <img
                alt="About Market Shop"
                className="w-full h-full object-cover"
                src="/images/about-us.png"
              />
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
              <h2 className="font-title-md text-headline-lg text-ink-charcoal mb-4">Join Our Newsletter</h2>
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
