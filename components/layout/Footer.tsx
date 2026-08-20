"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/Button";

interface FooterProps {
  onOpenSellerModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSellerModal }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t-2 border-slate-900">
      {/* Newsletter Strip */}
      <div className="border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8 bg-slate-900/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-lg">
            <span className="text-[11px] font-mono uppercase text-brand-coral font-bold block mb-1">
              Direct Mailer
            </span>
            <h3 className="text-2xl font-serif font-black text-white">
              Get £5 Off Your First Order Over £20
            </h3>
            <p className="text-slate-400 mt-1 text-xs">
              Weekly price drops on rare prints, bestsellers, and seller clearances. No spam.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {isSubscribed ? (
              <div className="bg-emerald-950 border border-emerald-700 text-emerald-300 px-4 py-3 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subscribed! Use code <strong>WELCOME5</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="bg-slate-950 border border-slate-700 text-white text-xs px-3.5 py-2.5 rounded-[2px] focus:outline-none focus:border-brand-coral flex-1"
                />
                <Button variant="coral" size="sm" type="submit">
                  Claim £5 Code
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Contact */}
          <div className="space-y-3">
            <div className="relative h-10 w-44">
              <Image
                src="/images/logo.png"
                alt="Market Shop Logo"
                fill
                className="object-contain object-left brightness-200"
                sizes="176px"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Market Shop is a registered UK marketplace connecting readers with independent bookshops and publishers.
            </p>
            <div className="font-mono text-[11px] text-slate-500 pt-2 space-y-1">
              <p>London, United Kingdom</p>
              <p>Support: 0800 999 66 55</p>
            </div>
          </div>

          {/* Col 2: Marketplace Links */}
          <div className="space-y-2">
            <h4 className="text-white font-serif font-black text-sm uppercase tracking-wider">
              Marketplace
            </h4>
            <ul className="space-y-1.5 font-mono">
              <li><a href="#featured-deals" className="hover:text-white transition-colors">Featured Offers</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Trending Inventory</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Collector Copies</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">100-Day Return Policy</a></li>
            </ul>
          </div>

          {/* Col 3: For Sellers */}
          <div className="space-y-2">
            <h4 className="text-white font-serif font-black text-sm uppercase tracking-wider">
              For Sellers
            </h4>
            <ul className="space-y-1.5 font-mono">
              <li>
                <button
                  onClick={onOpenSellerModal}
                  className="text-brand-coral hover:underline text-left font-bold"
                >
                  Start Selling (5% Fee)
                </button>
              </li>
              <li><a href="#seller-hub" className="hover:text-white transition-colors">Seller Profit Calculator</a></li>
              <li><span className="text-slate-600 cursor-not-allowed">Packaging Standards</span></li>
              <li><span className="text-slate-600 cursor-not-allowed">Payout Schedule</span></li>
            </ul>
          </div>

          {/* Col 4: Legal & Architecture Info */}
          <div className="space-y-2">
            <h4 className="text-white font-serif font-black text-sm uppercase tracking-wider">
              Legal &amp; Security
            </h4>
            <ul className="space-y-1.5 font-mono">
              <li><span className="text-slate-500">256-Bit SSL Encrypted</span></li>
              <li><span className="text-slate-500">PCI-DSS Compliant</span></li>
              <li><span className="text-slate-500">Terms of Marketplace</span></li>
              <li><span className="text-slate-500">Privacy &amp; Cookies</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} Market Shop Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Royal Mail 48 Tracked</span>
            <span>•</span>
            <span>Visa / Mastercard / PayPal / Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
