"use client";

import React from "react";
import { ShieldCheck, Undo2, Truck, Headphones, Award, Sparkles } from "lucide-react";

export const GuaranteeBanner: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white relative overflow-hidden shadow-inner">
      {/* Background decorative pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Item 1 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-xs">
              <Undo2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-serif">100-Day Risk-Free Trial</h4>
              <p className="text-xs text-amber-100 mt-1 leading-relaxed">
                If you don&apos;t love your book, return it within 100 days for a full, no-quibble refund.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-xs">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-serif">Free UK Tracked Delivery</h4>
              <p className="text-xs text-amber-100 mt-1 leading-relaxed">
                Enjoy free Royal Mail tracked shipping on all book orders over £15 across England, Scotland, Wales & NI.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-xs">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-serif">100% Authentic Guarantee</h4>
              <p className="text-xs text-amber-100 mt-1 leading-relaxed">
                Every title is verified by our condition team. First editions and collectors&apos; books come with certification.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-xs">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-serif">Friendly UK Support</h4>
              <p className="text-xs text-amber-100 mt-1 leading-relaxed">
                Got a question about a title or order? Our friendly London-based support team is here 7 days a week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
