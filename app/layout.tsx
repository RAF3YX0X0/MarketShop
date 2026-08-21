import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
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
    <html lang="en" className={`light bg-[#fafafa] ${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#fafafa] text-on-surface font-body-md antialiased pb-24 md:pb-0 relative min-h-screen">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}


