"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { TrustBar } from "@/components/layout/TrustBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedBigThree } from "@/components/sections/FeaturedBigThree";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { PopularCatalogSection } from "@/components/sections/PopularCatalogSection";
import { SellerSection } from "@/components/sections/SellerSection";
import { GuaranteeBanner } from "@/components/sections/GuaranteeBanner";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
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

  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Sticky Navigation Header */}
      <Header
        onOpenSellerModal={handleOpenSellerModal}
        onOpenQuickView={handleOpenQuickView}
      />

      {/* 2. Trust Bar (Guarantees & Badges) */}
      <TrustBar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <HeroSection
          onOpenSellerModal={handleOpenSellerModal}
          onOpenQuickView={handleOpenQuickView}
        />

        {/* 4. Featured Big Three Deals (The 'Big 3' Prominent Books) */}
        <FeaturedBigThree onOpenQuickView={handleOpenQuickView} />

        {/* 5. Benefits / Why Choose Us Section */}
        <BenefitsSection />

        {/* 6. Popular Catalog & Genre Explorer */}
        <PopularCatalogSection onOpenQuickView={handleOpenQuickView} />

        {/* 7. Seller Section (Marketplace Value Prop & Earnings Calculator) */}
        <SellerSection onOpenSellerModal={handleOpenSellerModal} />

        {/* 8. 100-Day Risk-Free Guarantee Banner */}
        <GuaranteeBanner />

        {/* 9. Verified Testimonials & Reviews */}
        <TestimonialsSection />
      </main>

      {/* 10. Multi-Column Footer with Newsletter & Payment Methods */}
      <Footer onOpenSellerModal={handleOpenSellerModal} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer onOpenQuickView={handleOpenQuickView} />

      {/* Quick View Book Preview Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />

      {/* Seller Onboarding Modal */}
      <SellerModal
        isOpen={isSellerModalOpen}
        onClose={handleCloseSellerModal}
      />

      {/* Live Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
