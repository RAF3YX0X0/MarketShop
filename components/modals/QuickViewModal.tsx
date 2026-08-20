"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Undo2,
  Copy,
  Check,
  BookOpen,
  Calendar,
  Sparkles,
  Award
} from "lucide-react";
import { Product } from "@/types";
import { RatingStars } from "../ui/RatingStars";
import { Button } from "../ui/Button";
import { useCart } from "../cart/CartContext";
import { formatPrice } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart, applyCoupon } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<string>("Hardcover");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleCopy = () => {
    if (product.couponCode) {
      navigator.clipboard.writeText(product.couponCode);
      applyCoupon(product.couponCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFormat);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-in my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Book Cover Image & Guarantee badges */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-56 h-80 sm:w-64 sm:h-92 rounded-2xl overflow-hidden shadow-book bg-slate-100 border border-slate-200">
                <Image
                  src={product.coverImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 224px, 256px"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-md shadow-md uppercase tracking-wider">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Verified Seller info */}
              <div className="w-full mt-6 bg-cream-50 rounded-2xl p-4 border border-cream-200 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Verified Marketplace Seller:
                  </span>
                  <span className="font-bold text-slate-900">{product.sellerName}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    Quality Condition:
                  </span>
                  <span className="font-semibold text-emerald-700">Brand New / Mint</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-slate-600" />
                    Dispatch Speed:
                  </span>
                  <span className="font-semibold text-slate-800">Within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Right: Book Details, Formats, and Purchase Options */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded">
                  {product.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 mt-2 leading-tight">
                  {product.title}
                </h2>
                <p className="text-sm font-semibold text-slate-600 mt-1">
                  Author: <span className="text-slate-900">{product.author}</span>
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    In Stock ({product.stockCount || 10} copies left)
                  </span>
                </div>
              </div>

              {/* Price & Savings */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-slate-100">
                <span className="text-3xl font-black text-slate-900 font-serif">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-slate-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-xs font-black text-rose-700 bg-rose-50 px-2 py-1 rounded">
                      Save {product.discountPercentage || 35}%
                    </span>
                  </>
                )}
              </div>

              {/* Coupon Code Banner */}
              {product.couponCode && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-amber-900">
                        Exclusive Promo Code:
                      </span>
                      <span className="text-xs text-amber-800 ml-1 font-mono font-bold bg-amber-200/70 px-1.5 py-0.5 rounded">
                        {product.couponCode}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 bg-amber-200/80 hover:bg-amber-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Applied!" : "Apply"}</span>
                  </button>
                </div>
              )}

              {/* Synopsis */}
              <div>
                <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1.5">
                  Synopsis & Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Book Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Format Selection */}
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
                  Select Format / Edition
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Hardcover", "Paperback", "Collector Deluxe"].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all text-center ${
                        selectedFormat === fmt
                          ? "border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-4">
                {/* Quantity Counter */}
                <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-bold text-slate-900 w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={isAdded ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                  onClick={handleAddToCart}
                  className="shadow-lg shadow-orange-500/20"
                >
                  {isAdded ? "Added to Basket!" : `Add to Basket • ${formatPrice(product.price * quantity)}`}
                </Button>
              </div>

              {/* 100-day risk free guarantee footer */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                <Undo2 className="w-4 h-4 text-amber-600" />
                <span>100-Day Satisfaction Guarantee • Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
