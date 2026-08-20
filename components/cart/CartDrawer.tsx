"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Tag, Truck } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
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
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-up">
          {/* Cart Header */}
          <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold">Your Book Basket</h2>
                <p className="text-xs text-slate-300">
                  {totalItems} {totalItems === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-amber-50 px-6 py-3 border-b border-amber-200/60">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-amber-900">
                <Truck className="w-4 h-4 text-amber-700" />
                {amountForFreeShipping === 0 ? (
                  <strong className="text-emerald-700">🎉 You unlocked FREE UK Delivery!</strong>
                ) : (
                  <span>
                    Add <strong>{formatPrice(amountForFreeShipping)}</strong> for <strong>FREE Delivery</strong>
                  </span>
                )}
              </span>
              <span className="text-amber-800 font-bold">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-800 mb-1">Your basket is empty</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Discover our bestselling books and limited-time deals to fill your shelf.
                </p>
                <Button
                  variant="primary"
                  onClick={() => setIsCartOpen(false)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Collection
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 bg-slate-50 hover:bg-cream-50 rounded-xl border border-slate-200 transition-colors"
                >
                  {/* Book Cover Thumbnail */}
                  <div className="relative w-16 h-22 flex-shrink-0 rounded-md overflow-hidden shadow-sm bg-slate-200 border border-slate-300">
                    <Image
                      src={item.product.coverImage}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.product.author}</p>
                      {item.selectedFormat && (
                        <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                          {item.selectedFormat}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 px-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 px-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="block text-[11px] text-slate-400 line-through">
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

          {/* Cart Footer / Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedCoupon}</strong> applied (-{formatPrice(discountAmount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-red-600 font-bold text-xs underline"
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
                      placeholder="Discount code (e.g. READ20)"
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotal + discountAmount)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>UK Tracked Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shippingCost === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => {
                  alert("Proceeding to secure checkout! (Market Shop Demo)");
                }}
              >
                Proceed to Checkout • {formatPrice(grandTotal)}
              </Button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100-Day Satisfaction Guarantee & 256-bit Encryption</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
