"use client";

import React, { useState } from "react";
import {
  Store,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  PackageCheck,
  Sparkles,
  Calculator
} from "lucide-react";
import { SELLER_STATS } from "@/data/mockData";
import { Button } from "../ui/Button";
import { formatPrice } from "@/lib/utils";

interface SellerSectionProps {
  onOpenSellerModal: () => void;
}

export const SellerSection: React.FC<SellerSectionProps> = ({ onOpenSellerModal }) => {
  const [estimatedMonthlyBooks, setEstimatedMonthlyBooks] = useState(50);
  const [avgBookPrice, setAvgBookPrice] = useState(12);

  const monthlyGross = estimatedMonthlyBooks * avgBookPrice;
  const marketShopFee = monthlyGross * 0.05; // 5%
  const traditionalFee = monthlyGross * 0.15; // 15% standard
  const sellerEarnings = monthlyGross - marketShopFee;
  const sellerSavings = traditionalFee - marketShopFee;

  return (
    <section id="sell-books" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-16">
      {/* Background glowing gradient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Value Proposition & Steps */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Store className="w-3.5 h-3.5" />
                <span>Market Shop Seller Hub</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
                Turn Your Books into Cash.{" "}
                <span className="text-amber-400 underline decoration-amber-500/40 decoration-wavy decoration-2">
                  Keep 95% of Every Sale.
                </span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Whether you are an independent bookseller, rare collector, or decluttering your personal shelves, reach over 250,000 enthusiastic UK readers with the lowest commission in the book industry.
              </p>
            </div>

            {/* 4 Seller Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SELLER_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 text-left hover:border-amber-500/50 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-serif">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{stat.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{stat.subtext}</div>
                </div>
              ))}
            </div>

            {/* How Selling Works (4 Easy Steps) */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm uppercase font-bold text-slate-400 tracking-wider">
                How Selling On Market Shop Works:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Scan & List in 60s</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Enter the ISBN and our database auto-fills cover, synopsis, and author data.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Get Instant Orders</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Receive immediate notifications when verified buyers purchase your books.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Print Prepaid Label</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Use our discounted Royal Mail & courier integration or your own post.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-800/40 p-3.5 rounded-xl border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">48h Direct Payout</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Funds are automatically paid into your bank account 48h after dispatch confirmation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="xl"
                onClick={onOpenSellerModal}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto shadow-xl shadow-amber-500/20"
              >
                Become a Seller Today
              </Button>
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                No setup fees • No monthly subscription • Cancel anytime
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Earnings Calculator */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Seller Profit Calculator</h3>
                    <p className="text-xs text-slate-400">See what you take home vs. competitors</p>
                  </div>
                </div>
                <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Flat 5% Fee
                </span>
              </div>

              {/* Slider 1: Books per Month */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <label className="text-slate-300 font-medium">Estimated Books Sold / Month:</label>
                  <span className="font-bold text-amber-400 text-base">{estimatedMonthlyBooks} books</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={estimatedMonthlyBooks}
                  onChange={(e) => setEstimatedMonthlyBooks(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5 books</span>
                  <span>100 books</span>
                  <span>500+ books</span>
                </div>
              </div>

              {/* Slider 2: Average Book Price */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <label className="text-slate-300 font-medium">Average Book Price (£):</label>
                  <span className="font-bold text-amber-400 text-base">£{avgBookPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="100"
                  step="1"
                  value={avgBookPrice}
                  onChange={(e) => setAvgBookPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>£3 (Paperback)</span>
                  <span>£25 (Hardcover)</span>
                  <span>£100 (Rare / Collectible)</span>
                </div>
              </div>

              {/* Earnings Breakdown Box */}
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-700 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Gross Monthly Sales:</span>
                  <span className="font-semibold text-slate-200">{formatPrice(monthlyGross)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Market Shop Commission (5%):</span>
                  <span className="font-semibold text-rose-400">-{formatPrice(marketShopFee)}</span>
                </div>
                <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-slate-400 block">Your Net Monthly Earnings:</span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-serif">
                      {formatPrice(sellerEarnings)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-amber-400 font-bold block">
                      Save {formatPrice(sellerSavings)}/mo
                    </span>
                    <span className="text-[10px] text-slate-500">vs. 15% marketplace fees</span>
                  </div>
                </div>
              </div>

              {/* Instant Start Button */}
              <div className="mt-6">
                <button
                  onClick={onOpenSellerModal}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  Open Your Free Seller Account Now
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2.5">
                  Approval within 2 hours • Instant catalogue synchronization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
