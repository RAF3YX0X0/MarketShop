import { Product, Testimonial, TrustGuarantee, Benefit, SellerStat } from "@/types";

export const TRUST_GUARANTEES: TrustGuarantee[] = [
  {
    id: "g1",
    title: "Free UK Delivery",
    subtitle: "On all book orders over £15",
    iconName: "truck",
  },
  {
    id: "g2",
    title: "100-Day Money Back",
    subtitle: "No-quibble reader satisfaction guarantee",
    iconName: "undo-2",
  },
  {
    id: "g3",
    title: "100% Secure Checkout",
    subtitle: "256-bit encrypted card & PayPal payments",
    iconName: "shield-check",
  },
  {
    id: "g4",
    title: "Verified Authentic Books",
    subtitle: "Sourced directly from verified publishers & sellers",
    iconName: "award",
  },
];

export const FEATURED_BIG_THREE: Product[] = [
  {
    id: "prod-1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 9.99,
    originalPrice: 16.99,
    discountPercentage: 41,
    rating: 4.9,
    reviewCount: 3840,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    badge: "Today's Favourite Find",
    badgeType: "hot",
    category: "Literary Fiction",
    description: "Between life and death there is a library. Nora Seed finds herself faced with the possibility of changing her life for a new one, following a different path.",
    format: "Hardcover",
    pages: 304,
    publishYear: 2024,
    inStock: true,
    stockCount: 14,
    sellerName: "Bloomsbury Rare Books (UK)",
    couponCode: "READ41",
    highlights: [
      "New York Times Bestseller & Goodreads Winner",
      "Includes exclusive author afterword & bookmark",
      "Fast 24-48h dispatch in eco-protective sleeve"
    ]
  },
  {
    id: "prod-2",
    title: "Atomic Habits: Proven Framework for Growth",
    author: "James Clear",
    price: 12.50,
    originalPrice: 20.00,
    discountPercentage: 38,
    rating: 5.0,
    reviewCount: 9420,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    badge: "Discovery of the Week",
    badgeType: "deal",
    category: "Self Development",
    description: "An easy and proven way to build good habits and break bad ones. The definitive guide on daily 1% compounding improvements.",
    format: "Hardcover",
    pages: 320,
    publishYear: 2025,
    inStock: true,
    stockCount: 8,
    sellerName: "Vebryx Literary Central",
    couponCode: "HABIT38",
    highlights: [
      "Over 15 Million copies sold worldwide",
      "Premium tactile hardcover with ribbon marker",
      "Bonus digital companion habit tracker workbook"
    ]
  },
  {
    id: "prod-3",
    title: "The Atlas of Ancient Horizons & Mythologies",
    author: "Dr. Evelyn Vance & C. Thorne",
    price: 24.99,
    originalPrice: 45.00,
    discountPercentage: 44,
    rating: 4.95,
    reviewCount: 1210,
    coverImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80",
    badge: "Discovery of the Month",
    badgeType: "exclusive",
    category: "History & Art",
    description: "A breathtaking collector's tome containing hand-drawn antique maps, forgotten folklore, and stunning mythological artwork.",
    format: "Illustrated Deluxe",
    pages: 448,
    publishYear: 2026,
    inStock: true,
    stockCount: 5,
    sellerName: "Heritage Antiquarian Guild",
    couponCode: "ATLAS44",
    highlights: [
      "Foil-embossed collector's edition with gold edges",
      "Over 180 full-color archival illustrations",
      "Signed bookplate certificate of authenticity"
    ]
  }
];

export const POPULAR_BOOKS: Product[] = [
  {
    id: "prod-4",
    title: "Gangsta Granny: 10th Anniversary Deluxe",
    author: "David Walliams",
    price: 5.99,
    originalPrice: 7.99,
    discountPercentage: 25,
    rating: 4.85,
    reviewCount: 1650,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    badge: "Kids Bestseller",
    badgeType: "bestseller",
    category: "Children's Books",
    description: "Ben is bored beyond belief after being made to stay at his grandma's house. What he doesn't know is that she is an international jewel thief!",
    format: "Paperback",
    inStock: true,
    sellerName: "Market Shop Kids"
  },
  {
    id: "prod-5",
    title: "Shadow of Decenit: The Chronicle",
    author: "E. Emeher Mme",
    price: 5.00,
    originalPrice: 6.99,
    discountPercentage: 28,
    rating: 4.7,
    reviewCount: 420,
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    badge: "Trending Thriller",
    badgeType: "hot",
    category: "Thriller & Fantasy",
    description: "An epic tale of deception, forgotten crowns, and a magical star that guides the lost warriors through the dark forest.",
    format: "Paperback",
    inStock: true,
    sellerName: "Vebryx Indie Press"
  },
  {
    id: "prod-6",
    title: "Miss P The Pirate & The Secret Lagoon",
    author: "Captain Clara Sterling",
    price: 5.00,
    originalPrice: 6.99,
    discountPercentage: 28,
    rating: 4.9,
    reviewCount: 780,
    coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
    badge: "Award Winner",
    badgeType: "exclusive",
    category: "Adventure & Kids",
    description: "Join Miss P on an unforgettable high-seas quest across uncharted islands to uncover the secret of the singing shells.",
    format: "Hardcover",
    inStock: true,
    sellerName: "Seafarer Press"
  },
  {
    id: "prod-7",
    title: "The White Abbott: The Forbidden Monastery",
    author: "G. K. Masterson",
    price: 7.99,
    originalPrice: 10.99,
    discountPercentage: 27,
    rating: 4.8,
    reviewCount: 512,
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80",
    badge: "Historical Mystery",
    badgeType: "deal",
    category: "Historical Fiction",
    description: "A gripping Victorian mystery unravelling the secrets of a secluded mountain cloister with clues carved into old Latin manuscripts.",
    format: "Paperback",
    inStock: true,
    sellerName: "Old Town Book Emporium"
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: "b1",
    title: "Curated Literary Selection",
    description: "Every title on Market Shop is hand-vetted by book lovers. From bestselling fiction to rare antiquarian prints, discover quality you can trust.",
    iconName: "book-open-check",
    badgeText: "Hand-Picked Titles"
  },
  {
    id: "b2",
    title: "Empowering Independent Sellers",
    description: "Support over 4,500 passionate local independent bookshops, small publishers, and creative sellers with fair marketplace commissions.",
    iconName: "users",
    badgeText: "Support Local"
  },
  {
    id: "b3",
    title: "Guaranteed Best Value & Service",
    description: "Enjoy transparent pricing, verified customer condition reports, fast trackable delivery, and our 100-day hassle-free return promise.",
    iconName: "badge-percent",
    badgeText: "Price Match"
  }
];

export const SELLER_STATS: SellerStat[] = [
  {
    value: "5%",
    label: "Flat Seller Fee",
    subtext: "UK's lowest marketplace commission"
  },
  {
    value: "48h",
    label: "Fast Payouts",
    subtext: "Direct bank transfer upon dispatch"
  },
  {
    value: "250K+",
    label: "Active Monthly Readers",
    subtext: "Eager community searching for books"
  },
  {
    value: "60 Sec",
    label: "Quick Listing",
    subtext: "Instant ISBN scan & auto-fill catalog"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Barry Fahey",
    location: "Edinburgh, UK",
    rating: 5,
    title: "Easy to order and arrived within 24 hours!",
    content: "I ordered the deluxe collector's edition for my wife's birthday. The packaging was eco-friendly and sturdy, and the book arrived in pristine condition. Market Shop is now my first choice for book purchases!",
    date: "19 August 2026",
    verified: true,
    bookPurchased: "The Midnight Library (Deluxe Hardcover)"
  },
  {
    id: "t2",
    name: "Elaine Nunn",
    location: "Surrey, UK",
    rating: 5,
    title: "Superb condition and fast tracked delivery",
    content: "Exactly as described. Fast delivery with real-time tracking. It's so refreshing to support independent bookshops while enjoying modern e-commerce convenience and great coupon discounts.",
    date: "18 August 2026",
    verified: true,
    bookPurchased: "Atomic Habits: Proven Framework"
  },
  {
    id: "t3",
    name: "Sandra Staplehurst",
    location: "Manchester, UK",
    rating: 5,
    title: "Outstanding customer service & quality guarantee",
    content: "I had a question regarding the format of an illustrated edition and the live support team helped me within minutes. The 100-day guarantee gives complete peace of mind. Five stars all the way!",
    date: "16 August 2026",
    verified: true,
    bookPurchased: "The Atlas of Ancient Horizons"
  },
  {
    id: "t4",
    name: "Mrs. Christine Cannon",
    location: "Oxford, UK",
    rating: 5,
    title: "First class service every single time",
    content: "I have had consistently first-class service from Market Shop. Great value, wonderful selection of kids' and historical books, and seamless checkout. Highly recommended to any avid reader.",
    date: "14 August 2026",
    verified: true,
    bookPurchased: "Gangsta Granny & The White Abbott"
  }
];

export const CATEGORIES = [
  { name: "All Books", count: "12,400+", slug: "all" },
  { name: "Fiction & Novels", count: "4,200+", slug: "fiction" },
  { name: "Children & Young Adult", count: "2,850+", slug: "children" },
  { name: "Self-Help & Mindset", count: "1,420+", slug: "self-help" },
  { name: "History & Biographies", count: "1,980+", slug: "history" },
  { name: "Rare & Antiquarian", count: "950+", slug: "rare" },
  { name: "Art & Illustrated", count: "1,000+", slug: "art" },
];
