"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface WishlistDrawerProps {
  onOpenQuickView?: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onOpenQuickView }) => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    addToCart,
    wishlistCount,
  } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-charcoal/60 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer sliding from LEFT side (1/4 of page on desktop) */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-4 sm:pr-0 z-50 pointer-events-none">
        <div className="w-screen sm:w-[28vw] sm:min-w-[340px] max-w-md bg-paper-cream border-r border-muted-border shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-left duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 bg-surface-container border-b border-muted-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <div>
                <h2 className="font-title-md text-base font-bold text-ink-charcoal leading-none">
                  Saved Wishlist
                </h2>
                <span className="text-xs text-outline font-label-sm">
                  {wishlistCount} {wishlistCount === 1 ? "saved book" : "saved books"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-full hover:bg-surface-container-high text-outline hover:text-ink-charcoal transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader banner */}
          <div className="bg-sage-haze px-5 py-2.5 border-b border-muted-border text-xs flex items-center justify-between text-ink-charcoal">
            <span className="font-semibold">Items stored for your quiet reading moments</span>
            <span className="text-secondary font-bold text-[11px] uppercase tracking-wider">Saved</span>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {wishlist.length === 0 ? (
              <div className="py-16 text-center space-y-3 px-4">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto text-secondary">
                  <span className="material-symbols-outlined text-3xl">favorite_border</span>
                </div>
                <h3 className="font-title-md text-base text-ink-charcoal">Your wishlist is empty</h3>
                <p className="text-xs text-outline leading-relaxed max-w-xs mx-auto">
                  Click the heart icon on any title or author page to save editions you love.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline cursor-pointer"
                >
                  Explore Curator&apos;s Picks →
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="p-3 bg-surface-container-lowest border border-muted-border rounded-lg shadow-sm flex gap-3 hover:border-primary/40 transition-colors"
                >
                  {/* Book Cover */}
                  <div
                    onClick={() => onOpenQuickView && onOpenQuickView(product)}
                    className="relative w-16 h-24 flex-shrink-0 bg-surface-container rounded overflow-hidden cursor-pointer book-shadow"
                  >
                    <Image
                      src={product.coverImage}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4
                          onClick={() => onOpenQuickView && onOpenQuickView(product)}
                          className="font-title-md text-xs text-ink-charcoal truncate font-bold hover:text-primary transition-colors cursor-pointer"
                        >
                          {product.title}
                        </h4>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-outline hover:text-secondary p-0.5 transition-colors cursor-pointer"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-outline truncate">{product.author}</p>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-semibold bg-surface-container text-outline">
                        {product.category}
                      </span>
                    </div>

                    {/* Actions & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-bold text-xs text-ink-charcoal">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          removeFromWishlist(product.id);
                        }}
                        className="bg-primary hover:bg-primary-container text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Basket</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {wishlist.length > 0 && (
            <div className="p-4 bg-surface-container border-t border-muted-border space-y-2">
              <button
                onClick={() => {
                  wishlist.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full bg-primary hover:bg-primary-container text-white py-3 px-4 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Add All to Basket ({wishlistCount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="w-full bg-surface-container-high hover:bg-surface-container-highest text-ink-charcoal py-2 px-4 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
