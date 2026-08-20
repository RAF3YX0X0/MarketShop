import React from "react";
import { Store, Undo2, Truck, ShieldCheck, Check } from "lucide-react";
import { WHY_US_POINTS } from "@/data/mockData";

export const WhyUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "store":
        return <Store className="w-5 h-5 text-brand-teal" />;
      case "undo":
        return <Undo2 className="w-5 h-5 text-brand-coral" />;
      case "truck":
        return <Truck className="w-5 h-5 text-brand-teal" />;
      case "shield":
        return <ShieldCheck className="w-5 h-5 text-brand-coral" />;
      default:
        return <Check className="w-5 h-5 text-brand-teal" />;
    }
  };

  return (
    <section id="why-us" className="py-14 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-10 text-left">
          <div className="text-[11px] font-black uppercase tracking-widest text-brand-coral mb-1 font-mono">
            Direct-Response Buyer Protection
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-950 tracking-tight">
            The Market Shop Standard
          </h2>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US_POINTS.map((item) => (
            <div
              key={item.id}
              className="border border-slate-300 p-6 bg-slate-50 flex flex-col justify-between rounded-[2px]"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 bg-white border border-slate-300 flex items-center justify-center rounded-[2px]">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-serif font-black text-slate-950 text-lg">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] font-mono font-bold text-slate-500 uppercase">
                Guaranteed on every order
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
