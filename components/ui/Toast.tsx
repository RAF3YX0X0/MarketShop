"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Sparkles, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "deal";
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md animate-slide-up transition-all ${
            toast.type === "success"
              ? "bg-slate-900/95 text-white border-emerald-500/40"
              : toast.type === "deal"
              ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-400"
              : "bg-slate-900/95 text-white border-slate-700"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-xs">
            <h4 className="font-bold text-white text-sm">{toast.title}</h4>
            <p className="text-slate-200 mt-0.5 leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
