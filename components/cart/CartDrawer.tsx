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
      setCouponError("Invalid code. Try: WELCOME5 or READ41");
    }
  };

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 2.99;
  const grandTotal = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l-2 border-slate-900 shadow-2xl flex flex-col">
          {/* Cart Header */}
          <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-serif font-bold">Shopping Basket</h2>
              <span className="text-xs font-mono text-slate-300">
                ({totalItems} items)
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Strip */}
          <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-200 text-xs font-mono">
            <div className="flex items-center justify-between font-bold mb-1">
              <span className="text-slate-800">
                {amountForFreeShipping === 0
                  ? "✓ Free UK Tracked Shipping Unlocked"
                  : `Add ${formatPrice(amountForFreeShipping)} for FREE Delivery`}
              </span>
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-slate-300 h-1.5 overflow-hidden">
              <div
                className="bg-brand-teal h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-sm font-serif font-bold text-slate-800 mb-1">Your basket is empty</p>
                <p className="text-xs text-slate-500 mb-4 font-mono">
                  Select titles from our featured collection or catalog.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  Explore Collection
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-slate-50 border border-slate-200"
                >
                  {/* Book Cover Thumbnail */}
                  <div className="relative w-14 h-20 flex-shrink-0 bg-white border border-slate-300">
                    <Image
                      src={item.product.coverImage}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate font-serif">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-red-600 p-0.5"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{item.product.author}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-300 bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-black text-slate-950 font-mono">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Promo Code */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-xs font-mono">
                    <span className="text-emerald-800 font-bold">
                      Code <strong>{appliedCoupon}</strong> (-{formatPrice(discountAmount)})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-red-600 underline font-bold"
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
                      placeholder="Promo code (e.g. WELCOME5)"
                      className="flex-1 px-2.5 py-1.5 text-xs font-mono border border-slate-300 bg-white focus:outline-none focus:border-brand-teal"
                    />
                    <Button variant="secondary" size="sm" type="submit">
                      Apply
                    </Button>
                  </form>
                )}
                {couponError && <p className="text-[10px] text-red-600 mt-1 font-mono">{couponError}</p>}
              </div>

              {/* Summary */}
              <div className="space-y-1 text-xs font-mono text-slate-700 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal + discountAmount)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Royal Mail 48 Tracked</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-300">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  alert("Proceeding to secure checkout! (Market Shop Demo)");
                }}
              >
                Checkout • {formatPrice(grandTotal)}
              </Button>

              <p className="text-[10px] text-center font-mono text-slate-500">
                100-Day Money-Back Guarantee • 256-Bit SSL Encrypted
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
