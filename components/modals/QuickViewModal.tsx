"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ShoppingBag, ShieldCheck, Check, Copy, Undo2 } from "lucide-react";
import { Product } from "@/types";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
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
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFormat);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-3xl bg-white border-2 border-slate-900 shadow-flat-lg rounded-[2px] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-brand-coral uppercase tracking-wider">
            Item Inspection • {product.category}
          </span>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Book Cover */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-48 h-68 sm:w-56 sm:h-80 bg-slate-100 border border-slate-300">
                <Image
                  src={product.coverImage}
                  alt={product.title}
                  fill
                  className="object-contain p-2"
                  sizes="224px"
                />
              </div>
              <div className="w-full mt-4 bg-slate-50 border border-slate-200 p-3 text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Seller:</span>
                  <span className="font-bold text-slate-900">{product.sellerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Condition:</span>
                  <span className="text-emerald-700 font-bold">Mint / Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dispatch:</span>
                  <span>Royal Mail 48</span>
                </div>
              </div>
            </div>

            {/* Book Meta & Order Controls */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div>
                <h2 className="text-2xl font-serif font-black text-slate-950 leading-tight">
                  {product.title}
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Author: <strong className="text-slate-900">{product.author}</strong>
                </p>
                <div className="mt-2 text-xs font-mono flex items-center gap-3">
                  <span className="text-brand-coral font-bold">★ {product.rating.toFixed(1)} / 5.0</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-emerald-700 font-bold">In Stock ({product.stockCount || 8} left)</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-slate-200">
                <span className="text-3xl font-black text-slate-950 font-mono">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-slate-400 line-through font-mono">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-xs font-black text-red-700 font-mono">
                      Save {product.discountPercentage || 25}%
                    </span>
                  </>
                )}
              </div>

              {/* Synopsis */}
              <div>
                <h4 className="text-[11px] font-mono font-bold uppercase text-slate-500 mb-1">
                  Synopsis
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Format selection */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-500 mb-1.5">
                  Select Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Hardcover", "Paperback", "Collector Edition"].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`py-2 px-2 text-xs font-bold font-mono border rounded-[2px] transition-all text-center ${
                        selectedFormat === fmt
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-300 text-slate-700 hover:border-slate-900"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Basket Button */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-[2px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs font-black hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-bold w-9 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs font-black hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  onClick={handleAddToCart}
                >
                  {isAdded ? "Added to Basket" : `Add to Basket • ${formatPrice(product.price * quantity)}`}
                </Button>
              </div>

              <p className="text-[11px] font-mono text-slate-500 text-center pt-1">
                100-Day Money-Back Guarantee • Free returns within UK
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
