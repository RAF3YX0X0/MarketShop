Role and Objective:
Act as an Expert Next.js Developer and UX/UI Designer. Your task is to build a high-converting landing page for an e-commerce platform called "Market Shop". This platform specializes in books and marketplace products.

Strict Project Requirements:

Landing Page Only: Focus entirely on building a single, comprehensive landing page. Do not build internal pages or routing yet.

Original Brand Design: Create a completely original design aligned with Market Shop branding. Do NOT copy the visual design of the reference sites.

Fully Responsive: The layout must be flawless across all device sizes (mobile, tablet, desktop) using Tailwind CSS breakpoints.

Clean, Reusable Components: Componentize the UI. Buttons, product cards, testimonials, and sections must be reusable and isolated.

Performance Optimized: Strictly adhere to Next.js performance best practices (e.g., use next/image with proper sizing/priority, optimal font loading, and semantic HTML).

Context & Inspiration:

Asset Source: Use [https://marketshop.vebryx.co.uk](https://marketshop.vebryx.co.uk) as the mental reference for the brand identity, logo, and existing book/product inventory. (Use placeholder image URLs that I can easily replace later, but size and format them for book covers and products).

Layout Inspiration: Reference the general sitemap, section flow, and conversion-focused elements of [https://musthaveideas.co.uk](https://musthaveideas.co.uk) (e.g., clear guarantees, trust badges, logical user journey).

Tech Stack & Architecture:

Framework: Next.js (App Router), React.

Styling: Tailwind CSS.

Language: TypeScript (strict mode).

UI Components: Build clean, custom components (you may use an accessible primitive library like Radix UI or Shadcn UI if necessary).

Icons: Lucide React or similar clean icon set.

Scalability Requirement: Structure the project architecture so it is primed for future backend integration. Create folders like /components, /lib, /types, and /data (for mock data). Separate UI components from business logic so APIs, authentication, seller dashboards, and marketplace functionalities can be easily plugged in later.

Typography & Design Language:

Fonts: Use a font pairing that perfectly matches the "book and publishing" niche—something trustworthy, elegant, and highly readable. Use a classic Serif font for Headings (e.g., Playfair Display, Merriweather, or Lora) and a clean Sans-Serif for Body text (e.g., Inter or Roboto). Configure these via next/font/google.

Styling: Generous whitespace, elegant typography, subtle shadows, and clear, high-contrast Call-to-Action (CTA) buttons.

Detailed Section Requirements (Top to Bottom):

Header / Navigation (Sticky):

Market Shop Logo (left).

Search bar placeholder (center).

Links: Home, Shop Books, Best Sellers, Become a Seller.

Icons: User Account (auth placeholder) and Shopping Cart.

Trust Bar (Below Header):

Include 3-4 guarantee banners inspired by standard e-commerce best practices (e.g., "Fast Delivery", "Secure Payments", "Quality Guaranteed").

Hero Section:

A compelling, large headline focusing on discovering great books and products.

A strong primary CTA button ("Shop the Collection") and a secondary CTA ("Join as a Seller").

An elegant hero graphic or placeholder for a high-quality lifestyle image featuring books.

Featured Products (The "Big 3"):

A dedicated section showcasing exactly 3 Featured Books/Products.

Design these cards to be large and prominent.

Each card must include: A large vertical book cover image area, Book Title, Author Name, Price, Star Rating, and a prominent "Add to Cart" button.

Benefits / Why Choose Us (Supporting Section):

A 3-column grid highlighting the benefits of buying from Market Shop (e.g., Curated Selection, Support Local Sellers, Best Prices). Use icons for each.

Seller Section:

A distinct, visually contrasting section inviting users to sell their books/products on the platform.

Include a bold headline ("Turn Your Books into Cash" or "Join Our Marketplace"), a brief value proposition (e.g., Low fees, massive audience), and a CTA ("Become a Seller").

Testimonials:

A clean grid or carousel of 3-4 customer reviews.

Include 5-star icons, customer names, and realistic placeholder review text praising the book selection and fast delivery.

Footer:

Organized into columns:

Column 1: Logo and brief "About Us" text.

Column 2: Quick Links (Shop, About, Contact).

Column 3: For Sellers (Seller Portal, Terms, FAQs).

Column 4: Newsletter signup input and button.

Bottom bar: Copyright 2026 Market Shop, and placeholder payment icons.

Coding Standards & Deliverables:

Provide the exact terminal commands to initialize the project and install necessary dependencies.

Provide the tailwind.config.ts and layout.tsx (including font configuration).

Generate the mock data file (/data/mockData.ts) containing the 3 featured books and testimonials to keep the components clean.

Provide the code for the clean, reusable components (e.g., ProductCard, Button, Section).

Provide the complete page.tsx file that stitches all these sections together perfectly.

Ensure all code has zero linting errors and follows modern React/Next.js best practices.

Please write the code step-by-step, starting with the project setup and architecture, followed by the mock data, components, and finally the main page assembly.