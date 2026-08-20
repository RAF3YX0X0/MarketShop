import type { Metadata } from "next";
import { Playfair_Display, Inter, Lora } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Market Shop | The UK's Premier Books & Reader Marketplace",
  description:
    "Discover curated bestsellers, rare collector editions, and indie gems with up to 45% off. Free UK delivery over £15, 100-day money-back guarantee, and 5% flat fee for sellers.",
  keywords: [
    "Market Shop",
    "books",
    "buy books online",
    "independent bookshop UK",
    "sell books online",
    "cheap books",
    "bestsellers",
    "rare books",
  ],
  authors: [{ name: "Market Shop Ltd" }],
  openGraph: {
    title: "Market Shop | Books & Reader Marketplace",
    description:
      "Curated bestsellers, rare editions, and fair marketplace selling. 100-day reader satisfaction guarantee.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${lora.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-900 bg-cream-50 min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-950">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
