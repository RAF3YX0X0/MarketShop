"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, format?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  amountForFreeShipping: number;
  appliedCoupon: string | null;
  discountAmount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  lastAddedProduct: Product | null;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: {
        id: "prod-1",
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 9.99,
        originalPrice: 16.99,
        discountPercentage: 41,
        rating: 4.9,
        reviewCount: 3840,
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
        badge: "Today's Favourite Find",
        category: "Literary Fiction",
        description: "Between life and death there is a library.",
        format: "Hardcover",
        inStock: true,
        sellerName: "Bloomsbury Rare Books (UK)"
      },
      quantity: 1,
      selectedFormat: "Hardcover"
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("WELCOME5");
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const freeShippingThreshold = 15.0;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon === "WELCOME5") {
    discountAmount = Math.min(rawSubtotal, 5.0);
  } else if (appliedCoupon?.startsWith("READ") || appliedCoupon?.startsWith("HABIT") || appliedCoupon?.startsWith("ATLAS")) {
    discountAmount = rawSubtotal * 0.15;
  }

  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const freeShippingProgress = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  const addToCart = (product: Product, quantity = 1, format?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedFormat: format || product.format || "Standard" }];
      }
    });

    setLastAddedProduct(product);
    setToastMessage(`Added "${product.title}" to your cart!`);
    setIsCartOpen(true);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "WELCOME5" || clean === "READ41" || clean === "HABIT38" || clean === "ATLAS44" || clean === "READ20" || clean === "BOOKLOVE") {
      setAppliedCoupon(clean);
      setToastMessage(`Coupon "${clean}" applied successfully!`);
      return true;
    }
    setToastMessage(`Coupon "${clean}" is invalid or expired.`);
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        freeShippingThreshold,
        freeShippingProgress,
        amountForFreeShipping,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon,
        lastAddedProduct,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
