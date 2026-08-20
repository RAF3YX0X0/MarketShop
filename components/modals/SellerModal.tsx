"use client";

import React, { useState } from "react";
import { X, Store, Check, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { Button } from "../ui/Button";

interface SellerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellerModal: React.FC<SellerModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    shopName: "",
    email: "",
    phone: "",
    catalogSize: "50-200",
    bankSortCode: "",
    bankAccountNumber: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep((step + 1) as any);
    } else {
      setStep(3); // Success
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-xl bg-white border-2 border-slate-900 shadow-flat-lg rounded-[2px] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-brand-teal text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-brand-coral" />
            <h3 className="font-serif font-black text-lg">Market Shop Seller Hub</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {step === 3 ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto rounded-full">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-serif font-black text-slate-950">
                Seller Account Provisioned
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Welcome to Market Shop! Your seller fee is locked at <strong>5% flat</strong>. Start uploading inventory via ISBN scan or CSV feed.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-4 text-xs font-mono text-left space-y-1">
                <div>Shop: <strong>{formData.shopName || "My Bookshop"}</strong></div>
                <div>Commission: <strong className="text-emerald-700">5% Fixed</strong></div>
                <div>Payouts: <strong>Royal Mail scan + 48 hours</strong></div>
              </div>
              <Button variant="primary" size="md" fullWidth onClick={onClose}>
                Close &amp; Return to Shop
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-slate-200 pb-3 flex justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">Step {step} of 2</span>
                <span className="text-brand-coral font-bold">5% Flat Fee Guaranteed</span>
              </div>

              {step === 1 ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1">
                      Shop / Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      placeholder="e.g. Covent Garden Rare Books"
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-[2px] focus:outline-none focus:border-brand-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. books@coventgardenrare.co.uk"
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-[2px] focus:outline-none focus:border-brand-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1">
                      Approximate Book Inventory
                    </label>
                    <select
                      value={formData.catalogSize}
                      onChange={(e) => setFormData({ ...formData, catalogSize: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 bg-white rounded-[2px] focus:outline-none focus:border-brand-teal"
                    >
                      <option value="10-50">10 – 50 titles</option>
                      <option value="50-200">50 – 200 titles</option>
                      <option value="200-1000">200 – 1,000 titles</option>
                      <option value="1000+">1,000+ titles (Bulk sync)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 flex items-start gap-2">
                    <Lock className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                    <span>Enter your UK bank details for automatic 48h direct transfers after book dispatch.</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1">
                        Sort Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.bankSortCode}
                        onChange={(e) => setFormData({ ...formData, bankSortCode: e.target.value })}
                        placeholder="20-00-00"
                        className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-300 rounded-[2px] focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase font-bold text-slate-700 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.bankAccountNumber}
                        onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                        placeholder="12345678"
                        className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-300 rounded-[2px] focus:outline-none focus:border-brand-teal"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-mono font-bold text-slate-600 hover:text-slate-900"
                  >
                    ← Back
                  </button>
                ) : <div />}

                <Button variant="primary" size="md" type="submit">
                  {step === 1 ? "Next Step →" : "Complete Registration"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
