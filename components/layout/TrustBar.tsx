import React from "react";
import { Truck, RotateCcw, ShieldCheck, Award } from "lucide-react";
import { TRUST_GUARANTEES } from "@/data/mockData";

export const TrustBar: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "truck":
        return <Truck className="w-4 h-4 text-brand-teal flex-shrink-0" />;
      case "undo-2":
        return <RotateCcw className="w-4 h-4 text-brand-coral flex-shrink-0" />;
      case "shield-check":
        return <ShieldCheck className="w-4 h-4 text-brand-teal flex-shrink-0" />;
      case "award":
        return <Award className="w-4 h-4 text-brand-coral flex-shrink-0" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-brand-teal flex-shrink-0" />;
    }
  };

  return (
    <section className="bg-slate-50 border-b border-slate-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {TRUST_GUARANTEES.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 ${
                idx > 0 ? "pt-2 md:pt-0 md:pl-4 lg:pl-6" : ""
              }`}
            >
              <div className="p-2 bg-white border border-slate-200 rounded-[2px]">
                {getIcon(item.iconName)}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">{item.title}</h4>
                <p className="text-[11px] text-slate-500 truncate font-mono">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
