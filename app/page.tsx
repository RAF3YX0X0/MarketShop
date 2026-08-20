"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturedBigThree } from "@/components/products/FeaturedBigThree";
import { ReferenceCatalogSection } from "@/components/products/ReferenceCatalogSection";
import { WhyUsSection } from "@/components/why-us/WhyUsSection";
import { SellerSection } from "@/components/seller/SellerSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { Footer } from "@/components/layout/Footer";
import { QuickViewModal } from "@/components/modals/QuickViewModal";
import { SellerModal } from "@/components/modals/SellerModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ToastContainer, ToastMessage } from "@/components/ui/Toast";
import { Product } from "@/types";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const handleOpenQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenSellerModal = () => {
    setIsSellerModalOpen(true);
  };

  const handleCloseSellerModal = () => {
    setIsSellerModalOpen(false);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-brand-coral selection:text-white">
      {/* 1. Sticky Navigation Header with image_c30669.png Logo & Low-Friction Promo Bar */}
      <Header
        onOpenSellerModal={handleOpenSellerModal}
        onOpenQuickView={handleOpenQuickView}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 2. Direct-Response Hero Section */}
        <HeroSection
          onOpenSellerModal={handleOpenSellerModal}
          onOpenQuickView={handleOpenQuickView}
        />

        {/* 3. Featured Big Three Offers ("Must Have" Spotlight) */}
        <FeaturedBigThree onOpenQuickView={handleOpenQuickView} />

        {/* 4. Exact Reference Book Catalog (Matching User-Attached Images & Prices) */}
        <ReferenceCatalogSection onOpenQuickView={handleOpenQuickView} />

        {/* 5. Direct-Response "Why Us" Buyer Protection Section */}
        <WhyUsSection />

        {/* 6. Independent Seller Section with 5% Fee & Profit Calculator */}
        <SellerSection onOpenSellerModal={handleOpenSellerModal} />

        {/* 7. Real-World Authentic Testimonials */}
        <TestimonialsSection />
      </main>

      {/* 8. Scalable Editorial Footer */}
      <Footer onOpenSellerModal={handleOpenSellerModal} />

      {/* Interactive Cart Drawer */}
      <CartDrawer onOpenQuickView={handleOpenQuickView} />

      {/* Quick View Book Inspection Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />

      {/* Seller Registration Modal */}
      <SellerModal
        isOpen={isSellerModalOpen}
        onClose={handleCloseSellerModal}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
