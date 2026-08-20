"use client";

import React, { useState } from "react";
import { BookOpeningLoader } from "@/components/ui/BookOpeningLoader";
import { Header } from "@/components/layout/Header";
import { TrustBar } from "@/components/layout/TrustBar";
import { HeroSection } from "@/components/hero/HeroSection";
import { CircularCategoryBar } from "@/components/categories/CircularCategoryBar";
import { FeaturedBigThree } from "@/components/products/FeaturedBigThree";
import { AuthorOfTheMonth } from "@/components/author/AuthorOfTheMonth";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
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
      {/* 0. Fast Book Opening Loading Animation */}
      <BookOpeningLoader />

      {/* 1. Header with Logo, Midnight Promo, and Category Sub-Nav */}
      <Header
        onOpenSellerModal={handleOpenSellerModal}
        onOpenQuickView={handleOpenQuickView}
      />

      {/* 2. 4-Item Guarantee Trust Bar */}
      <TrustBar />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 3. Hero Section (Stack Up, Save Big Promo Banner + Educational Direct Response) */}
        <HeroSection
          onOpenSellerModal={handleOpenSellerModal}
          onOpenQuickView={handleOpenQuickView}
        />

        {/* 4. Circular Book Category Icons Strip */}
        <CircularCategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
        />

        {/* 5. The "Big 3" Featured Offers */}
        <FeaturedBigThree onOpenQuickView={handleOpenQuickView} />

        {/* 6. Author of the Month Spotlight Section */}
        <AuthorOfTheMonth onOpenQuickView={handleOpenQuickView} />

        {/* 7. Trending Book Catalog (6 Reference Books from attached images) */}
        <ReferenceCatalogSection onOpenQuickView={handleOpenQuickView} />

        {/* 8. Why Us / Direct-Response Buyer Protection Grid */}
        <WhyUsSection />

        {/* 9. Independent Seller Section with 5% Fee & Profit Calculator */}
        <SellerSection onOpenSellerModal={handleOpenSellerModal} />

        {/* 10. Real-World Authentic Testimonials */}
        <TestimonialsSection />
      </main>

      {/* 11. 4-Column Editorial Footer */}
      <Footer onOpenSellerModal={handleOpenSellerModal} />

      {/* Slide-out Cart Drawer */}
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

      {/* Live Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
