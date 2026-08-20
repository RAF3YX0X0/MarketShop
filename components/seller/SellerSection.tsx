"use client";

import React, { useState } from "react";
import { Store, ArrowRight, Check, Calculator, ShieldCheck } from "lucide-react";
import { SELLER_STATS } from "@/data/mockData";
import { Button } from "../ui/Button";
import { formatPrice } from "@/lib/utils";

interface SellerSectionProps {
  onOpenSellerModal: () => void;
}

export const SellerSection: React.FC<SellerSectionProps> = ({ onOpenSellerModal }) => {
  const [monthlyBooks, setMonthlyBooks] = useState(60);
  const [avgPrice, setAvgPrice] = useState(12);

  const grossSales = monthlyBooks * avgPrice;
  const marketShopFee = grossSales * 0.05; // 5%
  const competitorFee = grossSales * 0.15; // 15%
  const netEarnings = grossSales - marketShopFee;
  const monthlySavings = competitorFee - marketShopFee;

  return (
    <section id="seller-hub" className="py-14 bg-brand-teal text-white border-b border-brand-teal-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Direct Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-brand-coral font-mono block mb-1">
                Independent Seller Portal
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white leading-tight">
                Sell Books Online. Keep 95% of Every Order.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
                Major online marketplaces take 15% to 20% commission. Market Shop charges a flat 5% fee with direct 48-hour bank payouts.
              </p>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SELLER_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-brand-teal-800 border border-brand-teal-700 p-3.5 rounded-[2px]"
                >
                  <div className="text-2xl font-serif font-black text-white font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-brand-coral mt-0.5">{stat.label}</div>
                  <div className="text-[10px] text-slate-300 mt-1 leading-tight">{stat.subtext}</div>
                </div>
              ))}
            </div>

            {/* Verified Seller Spotlights */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase text-slate-300 mb-2">
                Active Verified Sellers:
              </h4>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="bg-brand-teal-900 px-2.5 py-1 border border-brand-teal-700">
                  Bloomsbury Rare Books (London)
                </span>
                <span className="bg-brand-teal-900 px-2.5 py-1 border border-brand-teal-700">
                  Vebryx Literary Central
                </span>
                <span className="bg-brand-teal-900 px-2.5 py-1 border border-brand-teal-700">
                  Heritage Antiquarian Guild
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Button
                variant="coral"
                size="lg"
                onClick={onOpenSellerModal}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Open Your Shop (Free Setup)
              </Button>
              <span className="text-xs text-slate-300">
                No monthly subscriptions • Cancel anytime
              </span>
            </div>
          </div>

          {/* Right Column: Flat Direct-Response Calculator */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 border-2 border-slate-900 p-6 rounded-[2px] shadow-flat">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-serif font-black text-slate-950 text-base">
                    Seller Net Calculator
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-black uppercase bg-emerald-100 text-emerald-900 px-2 py-0.5 border border-emerald-300">
                  Flat 5% Fee
                </span>
              </div>

              {/* Slider 1: Monthly Books */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Books Sold Per Month:</span>
                  <span className="font-mono text-brand-teal font-black text-sm">{monthlyBooks} books</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={monthlyBooks}
                  onChange={(e) => setMonthlyBooks(Number(e.target.value))}
                  className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-none"
                />
              </div>

              {/* Slider 2: Average Price */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Average Price Per Book:</span>
                  <span className="font-mono text-brand-teal font-black text-sm">£{avgPrice.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="100"
                  step="1"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(Number(e.target.value))}
                  className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-none"
                />
              </div>

              {/* Calculation Summary */}
              <div className="bg-slate-50 border border-slate-200 p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Gross Monthly Sales:</span>
                  <span>{formatPrice(grossSales)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Market Shop Fee (5%):</span>
                  <span>-{formatPrice(marketShopFee)}</span>
                </div>
                <div className="border-t border-slate-300 pt-2 flex justify-between items-baseline font-bold text-slate-950">
                  <span className="font-sans text-xs">Your Net Earnings:</span>
                  <span className="text-2xl font-black text-brand-teal font-serif">
                    {formatPrice(netEarnings)}
                  </span>
                </div>
                <div className="text-right text-[11px] text-brand-coral font-bold pt-1">
                  Save {formatPrice(monthlySavings)}/mo vs 15% marketplace rates
                </div>
              </div>

              <div className="mt-5">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={onOpenSellerModal}
                >
                  Start Listing in 60 Seconds
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
