"use client";

import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

export const BookOpeningLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Quick, delightful initial book opening transition (650ms max)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 650);

    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 900);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-300 pointer-events-none ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated 3D Opening Book Graphic */}
        <div className="book-loader mb-4">
          <div className="book-cover-left" />
          <div className="book-page page-1" />
          <div className="book-page page-2" />
          <div className="book-page page-3" />
          <div className="book-cover-right" />
        </div>

        {/* Brand Text & Indicator */}
        <div className="text-center space-y-1">
          <span className="font-serif font-black text-slate-950 text-xl tracking-tight">
            Market<span className="text-brand-pink-600">Shop</span>
          </span>
          <p className="text-[10px] font-mono uppercase tracking-widest text-brand-blue-700">
            Ocean of Book • Loading Catalog
          </p>
        </div>
      </div>

      <style jsx>{`
        .book-loader {
          position: relative;
          width: 64px;
          height: 48px;
          perspective: 300px;
        }

        .book-cover-left,
        .book-cover-right {
          position: absolute;
          top: 0;
          width: 32px;
          height: 48px;
          border: 2px solid #0f172a;
        }

        .book-cover-left {
          left: 0;
          background: #c86458;
          border-right: none;
          transform-origin: right center;
        }

        .book-cover-right {
          right: 0;
          background: #2c4653;
          border-left: none;
          transform-origin: left center;
        }

        .book-page {
          position: absolute;
          top: 3px;
          width: 30px;
          height: 42px;
          background: #fdf2f4;
          border: 1px solid #0f172a;
          transform-origin: left center;
        }

        .page-1 {
          right: 0;
          animation: flipPage 1s ease-in-out infinite alternate;
        }

        .page-2 {
          right: 0;
          animation: flipPage 1s 0.2s ease-in-out infinite alternate;
          background: #e2f0f8;
        }

        .page-3 {
          right: 0;
          animation: flipPage 1s 0.4s ease-in-out infinite alternate;
          background: #ffffff;
        }

        @keyframes flipPage {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }
      `}</style>
    </div>
  );
};
