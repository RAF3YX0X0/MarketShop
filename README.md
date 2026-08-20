# Market Shop 📚 — Next.js Books & Reader Marketplace

A modern, high-converting e-commerce landing page and marketplace platform for books, rare prints, and literary treasures built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Key Features

- **Classic Bookish Aesthetics & Typography**: Google Fonts pairing featuring **Playfair Display** (Headings) and **Inter** (Body), with warm cream and amber design tokens.
- **Sticky Navigation Header**:
  - Live interactive book search with auto-complete suggestions and keyboard dismissal.
  - Genre filter selector.
  - Dynamic shopping basket badge with real-time item counter.
  - Direct trigger for Seller Onboarding modal.
- **Trust & Guarantee Bar**: 4 key buyer protections (Free UK tracked shipping over £15, 100-Day money back guarantee, 256-bit SSL checkout, condition authenticity).
- **Hero Section**:
  - Compelling value proposition and social proof pill (4.9/5 from 18,400+ verified readers).
  - Quick book preview card with instant basket addition.
  - Dual CTAs (*Shop the Collection* & *Join as a Seller*).
- **The "Big 3" Featured Books Section**:
  - Dedicated spotlight cards for *The Midnight Library*, *Atomic Habits*, and *The Atlas of Ancient Horizons*.
  - Live discount tags, format specs, and one-click coupon copy.
- **Support Local Sellers & Benefits Grid**: 3-column value proposition highlighting hand-vetted curation, support for 4,500+ independent bookshops, and best price guarantees.
- **Interactive Trending Catalog**: Filterable book showcase by genre (*Children & YA*, *Thriller & Fantasy*, *Historical Fiction*) with search filtering.
- **Seller Hub & Interactive Profit Calculator**:
  - Distinct high-contrast dark theme seller showcase.
  - Real-time earnings slider comparing 5% flat marketplace fee against 15% industry standards.
  - 4-step onboarding workflow.
- **100-Day Risk-Free Guarantee Strip**: MustHaveIdeas-inspired confidence banner.
- **Customer Reviews & Testimonials**: 4 verified UK customer testimonials with 5-star ratings, aggregate Trustpilot-style 4.9/5 score, and helpful feedback buttons.
- **Slide-out Cart Drawer (`CartDrawer`)**:
  - Animated Free UK Delivery progress meter.
  - Promo code engine with discount application (`WELCOME5`, `READ20`, `READ41`, `HABIT38`, `ATLAS44`).
  - Item increment/decrement/removal controls and simulated checkout flow.
- **Quick View Modal (`QuickViewModal`)**: Format selector (Hardcover/Paperback/Deluxe), detailed synopsis, quantity counter, and book highlights.
- **Seller Onboarding Wizard (`SellerModal`)**: 3-step application form with contact info, book catalog selection, and payout details.
- **Toast Notification System**: Instant feedback for basket updates and promo code activations.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15.5+ (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript 5.7 (Strict Mode) |
| **Styling** | Tailwind CSS 3.4 & PostCSS |
| **Icons** | Lucide React |
| **State Management** | React Context API (`CartContext`) |
| **Image Optimization** | `next/image` with remote patterns |

---

## 📁 Directory Structure

```
Marketshop/
├── app/
│   ├── globals.css          # Tailwind base/components/utilities & custom animations
│   ├── layout.tsx           # Google Fonts (Playfair, Inter, Lora) + CartProvider + Metadata
│   └── page.tsx             # Master landing page layout & section integration
├── components/
│   ├── cart/
│   │   ├── CartContext.tsx  # Shopping cart state, coupon engine & localStorage sync
│   │   └── CartDrawer.tsx   # Slide-out interactive basket drawer
│   ├── layout/
│   │   ├── Header.tsx       # Sticky navbar with live search & cart trigger
│   │   ├── TrustBar.tsx     # 4-item guarantee strip
│   │   └── Footer.tsx       # 4-column footer with newsletter & payment badges
│   ├── modals/
│   │   ├── QuickViewModal.tsx # Book preview & format selector modal
│   │   └── SellerModal.tsx    # 3-step seller onboarding wizard
│   ├── sections/
│   │   ├── HeroSection.tsx            # Hero spotlight & dynamic book card
│   │   ├── FeaturedBigThree.tsx       # Big 3 featured products section
│   │   ├── BenefitsSection.tsx        # 3-column benefits & value propositions
│   │   ├── PopularCatalogSection.tsx  # Genre-filtered book catalog
│   │   ├── SellerSection.tsx          # Seller hub & earnings calculator
│   │   ├── GuaranteeBanner.tsx        # 100-day risk-free guarantee strip
│   │   └── TestimonialsSection.tsx    # Verified reviews & Trustpilot score
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── CountdownTimer.tsx
│       ├── Modal.tsx
│       ├── RatingStars.tsx
│       └── Toast.tsx
├── data/
│   └── mockData.ts          # Curated books, reviews, benefits & seller stats
├── lib/
│   └── utils.ts             # Currency formatters, discount calculators & clsx helpers
├── types/
│   └── index.ts             # TypeScript interfaces (Product, CartItem, Testimonial, etc.)
├── Prompt.md                # Project requirements specification
├── tailwind.config.ts       # Custom color tokens, font families, and shadows
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.17+ or 20+ installed.
- npm, yarn, or pnpm.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📜 License
Created for Market Shop. All rights reserved.
