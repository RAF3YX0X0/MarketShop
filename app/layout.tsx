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
  title: "Market Shop | Ocean of Book - Direct UK Book Marketplace",
  description:
    "Buy books direct from independent UK sellers. Save up to 45% on new, used, and collector copies with Royal Mail tracked delivery and a 100-day money-back guarantee.",
  keywords: [
    "Market Shop",
    "Ocean of Book",
    "buy books online UK",
    "independent bookshop UK",
    "sell books online",
    "cheap books",
    "bestsellers",
    "rare books",
  ],
  authors: [{ name: "Market Shop Ltd" }],
  openGraph: {
    title: "Market Shop | Ocean of Book - Direct UK Book Marketplace",
    description:
      "Buy books direct from independent UK sellers with flat 5% seller fee and 100-day returns.",
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
      <body className="font-sans antialiased text-slate-900 bg-white min-h-screen flex flex-col selection:bg-brand-coral selection:text-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
