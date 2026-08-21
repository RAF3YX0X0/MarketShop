"use client";

import React, { createContext, useContext, useState } from "react";
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
  // Wishlist / Favorites
  wishlist: Product[];
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  wishlistCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: {
        id: "the-silent-echo",
        title: "The Silent Echo",
        author: "Elena Rostova",
        price: 14.99,
        originalPrice: 19.99,
        rating: 4.9,
        reviewCount: 128,
        coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2hRt3nflzL572lhboo0z-oM5QqblQKdxtBjr5uZ4Yo3vE1pBLR8UsLdU6IE1zhmgnxizLOaoVTmXe4uLdwken3H7lDihNa8CMxpsgZbTtkLkUR_mnTDvEksUMBVY5wYXnTLMiG8sAtzSusvH1xe2E14hX9F_9AoYbXlLv-zdA3mcjlFS1wy-726qKp0hWLvQ5wsTS5KXzmFghEFuBOJeU0u3FZmM5sVUEAIxn2OaHJvt_pJutkvU",
        category: "Literary Fiction",
        description: "A masterfully crafted edition of The Silent Echo by Elena Rostova.",
        format: "Hardcover",
        inStock: true,
        sellerName: "Market Shop Direct (UK)"
      },
      quantity: 1,
      selectedFormat: "Hardcover"
    },
    {
      product: {
        id: "architecture-of-the-mind",
        title: "Architecture of the Mind",
        author: "Dr. Julian Hayes",
        price: 18.50,
        originalPrice: 24.00,
        rating: 4.9,
        reviewCount: 94,
        coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqhMVW19RD8lwVDkVG2ldd-joFRVeGCcNj9Ju0A1D7vYroSl9ab6EYzgBrKp8D_XjgfsOILDxxtpVcFO8mzcbEKS74KiPCJs0tIWv2LHsQqMWAJyq4jXYg5XbTfdKAfbNS7ujtS7bcw8zxF5-4HdZqKgGwTWfeP7qPemRfWAc0KLSyDcMurOvGO6cPfrPsWWoJdXst-3NaT75ZHfbScmQe5GI_KabpY_ZaYBDSiX0H5dYHIbySlM",
        category: "Non-Fiction",
        description: "Bestselling architectural and philosophical exploration.",
        format: "Hardcover",
        inStock: true,
        sellerName: "Market Shop Rare & Fine Books"
      },
      quantity: 1,
      selectedFormat: "Hardcover"
    }
  ]);

  const [wishlist, setWishlist] = useState<Product[]>([
    {
      id: "whispers-in-the-glass",
      title: "Whispers in the Glass",
      author: "Sarah Lin",
      price: 9.99,
      originalPrice: 12.99,
      rating: 4.8,
      reviewCount: 67,
      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP9EUPxxR5ZhKdNwbT2tGhHqG4vvKp31oQ-2RUXhJKN-dbNIbnugvpJR0zFsJmF3e6WD9XAGKbPMtHcWLG_i55Cw2y9AVGYXwaI8GwQ_H2NpD9dwPCJKROrCESEdrDujVgVcNdoFt6waG0NV18YSae0LdjKl7zx8oHJEzXlUO72Ov3B3_fSC7IvI4c__dAWZ-JJmQ9MCLtlbSGg0jlWH5ZRQtL6gggH-Nm6bsATKPn77_S2WouR9c",
      category: "Poetry",
      description: "Contemporary poetry capturing quiet moments of nature and modern existence.",
      format: "Paperback",
      inStock: true,
      sellerName: "Market Shop UK"
    },
    {
      id: "the-lost-city",
      title: "The Lost City",
      author: "Amanda Wells",
      price: 12.99,
      originalPrice: 16.99,
      rating: 4.7,
      reviewCount: 42,
      coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2onXBOs8n9f9rWGVctc9v7Zm0Qv-0lF1gOm-LoX2hEBsH6T-dTP54GgdKE_FCsPI3R20N2zyuBkzJZo9XaeFIe-0m-iorr0U1dIyZ3Xell1SxB3Wwb_hhuMFXbzy0nX6J5uw2u8jxB-5TrZzyjQydLIgtIMgC-PRY2eMyX1bGMP6Tn2h0c0-Hxj_tN6d3ngC5nzzejJjvPpLyhRlOZa9DsLwJHDBpnClJh3mmCQhm4PCExaflqj4",
      category: "Fiction",
      description: "A captivating journey through hidden history and lost civilizations.",
      format: "Hardcover",
      inStock: true,
      sellerName: "Market Shop UK"
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("WELCOME5");
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const freeShippingThreshold = 25.0;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
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
        return [...prevCart, { product, quantity, selectedFormat: format || product.format || "Hardcover" }];
      }
    });

    setLastAddedProduct(product);
    setToastMessage(`Added "${product.title}" to your basket!`);
    setIsCartOpen(true);
    setIsWishlistOpen(false);

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

  // Wishlist functions
  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
    setToastMessage(`Saved "${product.title}" to your wishlist!`);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setToastMessage(`Removed "${product.title}" from wishlist.`);
    } else {
      addToWishlist(product);
    }
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
        wishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        wishlistCount,
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
