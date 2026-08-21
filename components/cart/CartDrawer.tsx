"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

interface CartDrawerProps {
  onOpenQuickView?: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenQuickView }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
    amountForFreeShipping,
    appliedCoupon,
    discountAmount,
    applyCoupon,
    removeCoupon,
    totalItems,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput("");
      setCouponError("");
    } else {
      setCouponError("Invalid code. Try: WELCOME5 or READ20");
    }
  };

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 2.99;
  const grandTotal = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-charcoal/60 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer sliding from LEFT side (1/4 of page on desktop) */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-4 sm:pr-0 z-50 pointer-events-none">
        <div className="w-screen sm:w-[28vw] sm:min-w-[340px] max-w-md bg-paper-cream border-r border-muted-border shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-left duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 bg-surface-container border-b border-muted-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
              <div>
                <h2 className="font-title-md text-base font-bold text-ink-charcoal leading-none">
                  Shopping Basket
                </h2>
                <span className="text-xs text-outline font-label-sm">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-surface-container-high text-outline hover:text-ink-charcoal transition-colors cursor-pointer"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Strip */}
          <div className="bg-sage-haze px-5 py-2.5 border-b border-muted-border text-xs">
            <div className="flex items-center justify-between font-semibold text-ink-charcoal mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-primary" />
                <span>
                  {amountForFreeShipping === 0
                    ? "✓ Free UK Tracked Delivery Unlocked!"
                    : `Add ${formatPrice(amountForFreeShipping)} for FREE Delivery`}
                </span>
              </div>
              <span className="font-bold text-primary">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-muted-border/60 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3 px-4">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto text-outline">
                  <span className="material-symbols-outlined text-3xl">shopping_basket</span>
                </div>
                <h3 className="font-title-md text-base text-ink-charcoal">Your basket is empty</h3>
                <p className="text-xs text-outline leading-relaxed max-w-xs mx-auto">
                  Explore our curated catalogue to discover signed editions and quiet moments.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline cursor-pointer"
                >
                  Start Browsing Books →
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-surface-container-lowest border border-muted-border rounded-lg shadow-sm flex gap-3 hover:border-primary/40 transition-colors"
                >
                  {/* Book Cover */}
                  <div
                    onClick={() => onOpenQuickView && onOpenQuickView(item.product)}
                    className="relative w-16 h-24 flex-shrink-0 bg-surface-container rounded overflow-hidden cursor-pointer book-shadow"
                  >
                    <Image
                      src={item.product.coverImage}
                      alt={item.product.title}
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
                          onClick={() => onOpenQuickView && onOpenQuickView(item.product)}
                          className="font-title-md text-xs text-ink-charcoal truncate font-bold hover:text-primary transition-colors cursor-pointer"
                        >
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-outline hover:text-secondary p-0.5 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-outline truncate">{item.product.author}</p>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-semibold bg-surface-container text-outline">
                        {item.selectedFormat || "Hardcover"}
                      </span>
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-muted-border rounded bg-surface-container-lowest">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-outline hover:text-ink-charcoal transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-ink-charcoal min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-outline hover:text-ink-charcoal transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-xs text-ink-charcoal">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="block text-[10px] line-through text-outline">
                            {formatPrice(item.product.originalPrice * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-4 bg-surface-container border-t border-muted-border space-y-3">
              {/* Promo Code Box */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[#3bff55]/15 border border-[#3bff55]/40 rounded text-xs">
                    <div className="flex items-center gap-1.5 text-[#106b1e] font-semibold">
                      <Tag className="w-3 h-3" />
                      <span>Code <strong>{appliedCoupon}</strong> (-{formatPrice(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-secondary font-bold hover:underline text-[11px] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon code (e.g. WELCOME5)"
                      className="flex-1 px-3 py-1.5 text-xs bg-surface-container-lowest rounded border border-muted-border focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-bold uppercase bg-surface-container-high hover:bg-primary hover:text-white rounded border border-muted-border transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[10px] text-secondary mt-1">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal + discountAmount)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#106b1e] font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tracked UK Delivery</span>
                  <span>{shippingCost === 0 ? <strong className="text-[#106b1e]">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-ink-charcoal pt-2 border-t border-muted-border">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => alert("Proceeding to secure UK checkout! (Market Shop Demo)")}
                className="w-full bg-primary hover:bg-primary-container text-white py-3 px-4 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Checkout</span>
                <span className="opacity-80">•</span>
                <span>{formatPrice(grandTotal)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-outline text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>100-Day Money-Back Guarantee • 256-Bit SSL</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
