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
        id: "david-walliams-gangsta-granny",
        title: "David Walliams Gangsta Granny",
        author: "info.vebryx@gmail.com",
        price: 5.99,
        originalPrice: 7.99,
        discountPercentage: 25,
        rating: 0.0,
        reviewCount: 0,
        coverImage: "/images/books/gangsta-granny.png",
        category: "Children's Fiction",
        description: "Ben thinks his cabbage-soup-eating grandmother is utterly dull—until he finds out she is a master jewel thief.",
        format: "Paperback",
        inStock: true,
        sellerName: "info.vebryx@gmail.com"
      },
      quantity: 1,
      selectedFormat: "Paperback"
    },
    {
      product: {
        id: "the-story-of-the-magic-star",
        title: "The story of the magic star",
        author: "info.vebryx@gmail.com",
        price: 105.00,
        originalPrice: 130.00,
        discountPercentage: 19,
        rating: 5.0,
        reviewCount: 48,
        coverImage: "/images/books/the-story-of-the-magic-star.png",
        category: "Sci-Fi & Fantasy",
        description: "An expansive astronomical epic detailing the journey of a celestial traveler.",
        format: "Collector Edition",
        inStock: true,
        sellerName: "info.vebryx@gmail.com"
      },
      quantity: 1,
      selectedFormat: "Collector Edition"
    }
  ]);

  const [wishlist, setWishlist] = useState<Product[]>([
    {
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
    },
    {
      id: "miss-p-the-pirate",
      title: "Miss P the Pirate",
      author: "info.vebryx@gmail.com",
      price: 5.00,
      originalPrice: 6.99,
      discountPercentage: 28,
      rating: 0.0,
      reviewCount: 0,
      coverImage: "/images/books/miss-p-the-pirate.png",
      category: "Adventure & Sci-Fi",
      description: "Join Miss P and the towering forest guardian robot on an expedition through uncharted northern woods.",
      format: "Paperback",
      inStock: true,
      sellerName: "info.vebryx@gmail.com"
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
