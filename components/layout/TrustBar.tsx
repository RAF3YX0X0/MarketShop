import React from "react";
import { Truck, ShieldCheck, RotateCcw, Award } from "lucide-react";
import { TRUST_GUARANTEES } from "@/data/mockData";

export const TrustBar: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "truck":
        return <Truck className="w-5 h-5 text-amber-600 flex-shrink-0" />;
      case "undo-2":
        return <RotateCcw className="w-5 h-5 text-amber-600 flex-shrink-0" />;
      case "shield-check":
        return <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />;
      case "award":
        return <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />;
    }
  };

  return (
    <section className="bg-cream-100 border-b border-cream-300/80 py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {TRUST_GUARANTEES.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 ${
                idx > 0 ? "pt-2 md:pt-0 md:pl-4 lg:pl-6" : ""
              }`}
            >
              <div className="p-2.5 bg-white rounded-xl shadow-xs border border-cream-300">
                {getIcon(item.iconName)}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">{item.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
