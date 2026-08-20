"use client";

import React, { useState } from "react";
import {
  X,
  Store,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  Mail,
  User,
  BookOpen,
  Sparkles,
  Zap,
  Lock
} from "lucide-react";
import { Button } from "../ui/Button";

interface SellerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellerModal: React.FC<SellerModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    shopName: "",
    sellerType: "independent_seller",
    catalogSize: "100-500",
    bankSortCode: "",
    bankAccountNumber: "",
    agreeTerms: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as any);
    } else {
      setStep(4); // Success step
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-in my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-black tracking-widest text-amber-400">
                Market Shop Seller Onboarding
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white">
                Start Selling Books in 60 Seconds
              </h3>
            </div>
          </div>

          {/* Step Progress Bar */}
          {step < 4 && (
            <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-850 pt-4 text-xs">
              <div className={`flex items-center gap-2 ${step >= 1 ? "text-amber-400 font-bold" : "text-slate-500"}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                  1
                </span>
                <span>Contact Info</span>
              </div>
              <div className="h-0.5 flex-1 bg-slate-800">
                <div className={`h-full bg-amber-500 transition-all ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"}`} />
              </div>
              <div className={`flex items-center gap-2 ${step >= 2 ? "text-amber-400 font-bold" : "text-slate-500"}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                  2
                </span>
                <span>Shop Profile</span>
              </div>
              <div className="h-0.5 flex-1 bg-slate-800">
                <div className={`h-full bg-amber-500 transition-all ${step >= 3 ? "w-full" : "w-0"}`} />
              </div>
              <div className={`flex items-center gap-2 ${step >= 3 ? "text-amber-400 font-bold" : "text-slate-500"}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                  3
                </span>
                <span>Payouts</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {step === 4 ? (
            /* Success State */
            <div className="text-center py-6 space-y-5 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-2xl font-serif font-black text-slate-900">
                  Seller Application Approved!
                </h4>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Welcome to Market Shop, <strong className="text-slate-900">{formData.fullName || "Seller"}</strong>! Your shop <strong className="text-amber-700">{formData.shopName || "My Book Shop"}</strong> is now provisioned with 5% flat fee status.
                </p>
              </div>

              <div className="bg-cream-50 p-4 rounded-2xl border border-cream-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Seller ID:</span>
                  <span className="font-mono text-slate-900">MS-UK-88421</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Commission Rate:</span>
                  <span className="text-emerald-700 font-bold">5% Fixed (Lowest in UK)</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>Payout Schedule:</span>
                  <span className="text-slate-900">48h after tracking confirmation</span>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => {
                    onClose();
                    setStep(1);
                  }}
                >
                  Go to Seller Dashboard Preview
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Arthur Conan Doyle"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. arthur@bakerstreetbooks.co.uk"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      UK Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 07700 900077"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Shop / Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      placeholder="e.g. Piccadilly Antiquarian Books"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Seller Category
                    </label>
                    <select
                      value={formData.sellerType}
                      onChange={(e) => setFormData({ ...formData, sellerType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                    >
                      <option value="independent_seller">Independent Bookshop / Store</option>
                      <option value="rare_collector">Rare & Antiquarian Specialist</option>
                      <option value="small_publisher">Small Indie Publisher</option>
                      <option value="individual">Individual Collector / Declutterer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Estimated Initial Inventory
                    </label>
                    <select
                      value={formData.catalogSize}
                      onChange={(e) => setFormData({ ...formData, catalogSize: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                    >
                      <option value="10-50">10 – 50 Books</option>
                      <option value="50-250">50 – 250 Books</option>
                      <option value="250-1000">250 – 1,000 Books</option>
                      <option value="1000+">1,000+ Titles (Bulk CSV / API)</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-900">
                    <Lock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span>Your banking information is protected by 256-bit encryption for automatic 48h direct payouts.</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Sort Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.bankSortCode}
                        onChange={(e) => setFormData({ ...formData, bankSortCode: e.target.value })}
                        placeholder="20-00-00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Account Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.bankAccountNumber}
                        onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                        placeholder="12345678"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 pt-2 cursor-pointer text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                      required
                    />
                    <span>
                      I agree to the Market Shop 5% seller fee policy, Royal Mail dispatch standards, and 100-day return guideline for verified buyers.
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((step - 1) as any)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl"
                  >
                    Back
                  </button>
                ) : <div />}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {step === 3 ? "Complete Registration" : "Continue →"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
