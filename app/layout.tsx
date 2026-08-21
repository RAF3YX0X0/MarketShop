import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Market Shop - Ocean of Book | Curating Quiet Moments",
  description:
    "Market Shop - Ocean of Book. Discover a carefully selected collection of literature designed to inspire, comfort, and transport you.",
  keywords: [
    "Market Shop",
    "Ocean of Book",
    "Curating Quiet Moments",
    "Fiction",
    "Non-Fiction",
    "Rare Editions",
    "Poetry",
    "Children Books",
    "Bestsellers",
  ],
  authors: [{ name: "Market Shop - Ocean of Book" }],
  openGraph: {
    title: "Market Shop - Ocean of Book | Curating Quiet Moments",
    description:
      "Market Shop - Ocean of Book. Discover a carefully selected collection of literature designed to inspire, comfort, and transport you.",
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
    <html lang="en" className={`light ${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper-cream text-on-surface font-body-md antialiased pb-24 md:pb-0 relative min-h-screen">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

