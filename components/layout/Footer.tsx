"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MapPin,
  Heart,
  CreditCard,
  Sparkles
} from "lucide-react";

interface FooterProps {
  onOpenSellerModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSellerModal }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Newsletter Promo Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reader VIP Club</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Get 15% Off Your Next Book Order
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Join 50,000+ UK readers receiving weekly curated book recommendations, secret flash discounts, and author interviews.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-3 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-6 py-4 rounded-2xl animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">You&apos;re on the VIP list!</p>
                  <p className="text-xs text-emerald-300">Use promo code <strong className="text-amber-300">WELCOME15</strong> at checkout for 15% off.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Logo & About Us (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-black tracking-tight text-white">
                  Market<span className="text-amber-500">Shop</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 -mt-1">
                  Books &amp; Marketplace
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Market Shop is the UK&apos;s premier community marketplace for books, connecting passionate readers directly with independent bookshops, publishers, and rare collectors with unmatched value and protection.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Market Shop Ltd, 71-75 Shelton St, Covent Garden, London, WC2H 9JQ</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>UK Freephone: 0800 999 66 55 (Mon-Sat 9am-6pm)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Shop Books
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#featured-deals" className="hover:text-amber-400 transition-colors">
                  Featured Big 3 Deals
                </a>
              </li>
              <li>
                <a href="#bestsellers" className="hover:text-amber-400 transition-colors">
                  Best Sellers & Trending
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  Fiction & Novels
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  Children & YA Books
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  Rare & Antiquarian
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-amber-400 transition-colors">
                  Art & Illustrated Tomes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: For Sellers & Company (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              For Sellers &amp; Info
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={onOpenSellerModal}
                  className="hover:text-amber-400 transition-colors text-left font-bold text-amber-300 flex items-center gap-1"
                >
                  Become a Seller (5% Fee) →
                </button>
              </li>
              <li>
                <a href="#sell-books" className="hover:text-amber-400 transition-colors">
                  Seller Profit Calculator
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-400 transition-colors">
                  Why Sell With Us
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Customer Reviews & Trust
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-400 transition-colors">
                  100-Day Satisfaction Policy
                </a>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">
                  Seller Terms & Packaging Guidelines
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Guarantee Summary (3 cols) */}
          <div className="lg:col-span-3 space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-850">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Reader Safe
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every book purchase on Market Shop is safeguarded with encrypted payment gateways and our guaranteed 100-day money-back promise.
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>All Systems Operational • 256-bit SSL</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="mt-12 pt-8 border-t border-slate-850 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Market Shop Ltd. All rights reserved. Registered in England &amp; Wales.
          </p>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[11px] text-slate-400 mr-2">Secure Checkout via:</span>
            <div className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-bold text-[10px]">
              VISA
            </div>
            <div className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-bold text-[10px]">
              Mastercard
            </div>
            <div className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-bold text-[10px]">
              AMEX
            </div>
            <div className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-bold text-[10px]">
              PayPal
            </div>
            <div className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-bold text-[10px]">
              Apple Pay
            </div>
            <div className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-slate-300 font-bold text-[10px]">
              Google Pay
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
